
import { Manager, ItemType } from './Base';

interface SearchByTag {
    descript?:string;
     script?:string;
      nickname?:string;
}

class ItemDB extends Manager {

    constructor() {
        super();
    }

    async select(score:number, filter:string[], id?:number){
        let _id = id ? id : -1
        return this.query(`
        SELECT 
            i.*,
            u.nickname as name,
            u.profile_img as img,
            ifnull(r.score, 0) as score,
            ru.score as recommended,
            (select i.user_id = ${_id}) as own
        FROM 
            items i
            left outer join (
                select rr.item_id, sum(rr.score) as score 
                from recommend rr 
                group by rr.item_id
            ) r on r.item_id = i.id
            left outer join recommend ru on ru.user_id = ${_id} and ru.item_id = i.id
            inner join user u on u._id = i.user_id
        where ifnull(r.score, 0) >= ${score} and i.type IN (?,?,?);
        `, filter)
    }

    async selectByUser(user_id:number, filter:string[]){
        const elementLst = ([user_id, user_id] as Array<number | string>).concat(filter)
        return this.query(`
        SELECT 
            i.*,
            u.nickname as name,
            u.profile_img as img,
            ifnull(r.score, 0) as score,
            ru.score as recommended,
            1 as own
        FROM 
            items i
            left outer join (
                select rr.item_id, sum(rr.score) as score 
                from recommend rr 
                group by rr.item_id
            ) r on r.item_id = i.id
            left outer join recommend ru on ru.user_id = ? and ru.item_id = i.id
            inner join user u on u._id = i.user_id
        where i.user_id = ? and i.type IN (?,?,?);
        `, elementLst)
    }

    async search(query:SearchByTag | string, filter:string[], id?:number){
        let _id = id || -1
        let sql = {descript:`i.descript like '%?%'`, script:`i.script like '%?%'` , nickname:`u.nickname like '%?%'`}
        let x = ""

        const isTag = (x: SearchByTag | string): x is SearchByTag => {
            return (<string>x).length === undefined
        }

        if(isTag(query)){
            Object.entries(query).forEach(([key, value]) => {
                const k = key as 'descript' | 'script' | 'nickname'
                if(x.length) x += " or ";
                x += sql[k].replace("?", value!)
            })
        } else {
            Object.values(sql).forEach((v:string) => {
                if(x.length) x += " or ";
                x += v.replace("?", query)
            })
        }

        return this.query(`
        SELECT 
            i.*,
            u.nickname as name,
            u.profile_img as img,
            ifnull(r.score, 0) as score,
            ru.score as recommended,
            (select i.user_id = ${_id}) as own
        FROM 
            items i
            left outer join (
                select rr.item_id, sum(rr.score) as score 
                from recommend rr 
                group by rr.item_id
            ) r on r.item_id = i.id
            left outer join recommend ru on ru.user_id = ${_id} and ru.item_id = i.id
            inner join user u on u._id = i.user_id
        where (${x}) and i.type IN (?,?,?);
        `,  filter)
    }

    async insert(data:ItemType, user_id:number){
        let {descript, script, type, width, height} = data;
        await this.query(
            `insert into items (descript, script, type, user_id, width, height)
            values
            (?, ?, ?, ?, ?, ?)`
            , [descript, script, type, user_id, width, height]
        )
    }

    async delete(id:number, user_id:number){
        await this.query(
            'delete from items where id = ? and user_id = ?;'
            , [id, user_id]
        )
    }

    async recommend(item_id:number, user_id:number, flag:number){
        let exist = await this.query(
            `select score from recommend where item_id = ? and user_id = ?;`, 
            [item_id, user_id]) as {score:number}[]
        
        if(exist.length) {
            if (exist[0].score == flag){
                await this.query(`update recommend set score = 0
                where item_id = ? and user_id = ?;`,
                [item_id, user_id])
            } else {
                await this.query(`update recommend set score = ? 
                where item_id = ? and user_id = ?;`,
                [flag, item_id, user_id])
            }
        } else {
            await this.query(`INSERT INTO recommend (item_id, user_id, score) VALUES(?, ?, ?)`,
            [item_id, user_id, flag])
        }
    }
}

export default ItemDB;