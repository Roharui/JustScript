
import { Manager, ItemType } from './Base';

class ItemDB extends Manager {

    constructor() {
        super();
    }

    async select(score:number, id?:number){
        let _id = id ? id : -1
        return this.query(`
        SELECT 
            i.*,
            u.nickname as name,
            u.profile_img as img,
            ifnull(r.score, 0) as score,
            ru.score as recommended,
            (select i.user_id = ?) as own
        FROM 
            items i
            left outer join (
                select rr.item_id, sum(rr.score) as score 
                from recommend rr 
                group by rr.item_id
            ) r on r.item_id = i.id
            left outer join recommend ru on ru.user_id = i.user_id and ru.item_id = i.id
            inner join user u on u._id = i.user_id
        where ifnull(r.score, 0) >= ?;
        `, [_id, score])
    }

    async selectByUser(user_id:number){
        return this.query(`
        SELECT 
            i.*,
            u.nickname as name,
            u.profile_img as img,
            1 as own
        FROM 
            items i 
            inner join user u on u._id = i.user_id
        where i.user_id = ?;
        `, [user_id])
    }

    async insert(data:ItemType, user_id:number){
        let {descript, script, type, width, height} = data;
        this.query(
            `insert into justscript.items (descript, script, type, user_id, width, height)
            values
            (?, ?, ?, ?, ?, ?)`
            , [descript, script, type, user_id, width, height]
        )
    }

    async delete(id:number, user_id:number){
        this.query(
            'delete from items where id = ? and user_id = ?;'
            , [id, user_id]
        )
    }

    async recommend(item_id:number, user_id:number, flag:number){
        let [exist] = await this.query(
            `select count(*) as count from recommend where item_id = ? and user_id = ?;`, 
            [item_id, user_id]) as any
        
        if(exist.count) {
            await this.query(`update recommend set score = ? 
            where item_id = ? and user_id = ?;`,
            [flag, item_id, user_id])
        } else {
            await this.query(`INSERT INTO recommend (item_id, user_id, score) VALUES(?, ?, ?)`,
            [item_id, user_id, flag])
        }
    }
}

export default ItemDB;