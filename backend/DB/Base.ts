
import * as mysql from 'mysql2/promise';

export interface ItemType{
    id : number,
    type: 'tema' | 'canvas' | 'html' | 'writer',
    img : string,
    name : string,
    descript: string,
    script: string,
    score : number,
    openAble: boolean,
    width: string,
    height: string
}

class Manager {
    protected conn:mysql.Pool;

    constructor() {
        this.conn = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'jack7073',
            database : 'justscript'
        }); 
    }

    async query(sql:string, args?:any[]){
        let conn = await this.conn.getConnection()
        const [row] = await conn.query(sql, args)
        conn.release()

        return row
    }
}

export {Manager};