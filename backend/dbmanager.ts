
import * as mysql from 'mysql2/promise';

interface ItemType{
    id : number,
    img : string,
    name : string,
    descript: string,
    script: string
}

class Manager {
    constructor() {
    }

    async select(){
        let conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'jack7073'
        }); 
        let [x, _] = await conn.query("select * from justscript.items")
        return x;
    }

    async insert(data:ItemType){
        let conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'jack7073'
        }); 
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