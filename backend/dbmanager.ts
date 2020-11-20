
import * as mysql from 'mysql2/promise';

interface ItemType{
    id : number,
    img : string,
    name : string,
    descript: string,
    script: string
}

class Manager {
    private conn:Promise<mysql.Connection>;

    constructor() {
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'jack7073',
            database : 'justscript'
        }); 
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

export default Manager;

// // Connection

// connection.query('SELECT 1 + 1 AS solution', function (err: mysql.QueryError, rows: mysql.RowDataPacket[], fields: mysql.FieldPacket) {
//     if (err) {
//         throw err;
//     }

//     console.log('The solution is: ', rows[0]['solution']);
// });

// connection.end();