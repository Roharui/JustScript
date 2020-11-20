
import { Manager, ItemType } from './Base';

class ItemDB extends Manager {

    constructor() {
        super();
    }

    async select(){
        let [x, _] = await (await this.conn).query(`
        SELECT 
            i.*,
            u.nickname as name,
            u.profile_img as img
        FROM 
            items i 
            inner join user u on u._id = i.user_id;
        `)
        return x;
    }

    async insert(data:ItemType){
        let conn = await (this.conn)
        await conn.query(
            `insert into justscript.items (img, name, descript, script)
            values
            ("${data.img}", "${data.name}", "${data.descript}", "${data.script}")`
        )
    }
}

export default ItemDB;