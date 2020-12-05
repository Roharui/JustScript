
import { connect } from 'http2';
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
    protected conn:Promise<mysql.Connection>;

    constructor() {
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'jack7073',
            database : 'justscript'
        }); 
    }

    async query(sql:string){
        let conn = await this.conn
        return conn.connect()
        .then(() => conn.query<mysql.RowDataPacket[]>(sql))
    }
}

export {Manager};