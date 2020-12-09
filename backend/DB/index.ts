
import { Manager, ItemType } from './Base';

class ItemDB extends Manager {

    constructor() {
        super();
    }

    async select(score:number){
        return this.query(`
        SELECT 
            i.*,
            u.nickname as name,
            u.profile_img as img
        FROM 
            items i 
            inner join user u on u._id = i.user_id
        where i.score >= ?;
        `, [score])
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
}

export default ItemDB;