
import { Manager, ItemType } from './Base';

class ItemDB extends Manager {

    constructor() {
        super();
    }

    async select(){
        return this.query(`
        SELECT 
            i.*,
            u.nickname as name,
            u.profile_img as img
        FROM 
            items i 
            inner join user u on u._id = i.user_id;
        `)
    }

    async insert(data:ItemType, userId:number){
        this.query(
            `insert into justscript.items (descript, script, type, user_id, width, height)
            values
            ("${data.descript}", "${data.script}", "${data.type}", "${userId}", "${data.width}", "${data.height}")`
        )
    }
}

export default ItemDB;