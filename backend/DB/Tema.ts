
import { Manager } from './Base';

class TemaDB extends Manager {

    constructor() {
        super();
    }

    async tema(id:number){
        return this.query(`
            select script from items where id=? and type=?;
        `, [id, "tema"])
    }

    async temaPush(tema:number, _id:number){
        return this.query(`
            insert into tema(user_id, tema_id, priority) select ?, ?, count(*) from tema where user_id = ?;
        `, [tema, _id, _id])
    }

    async recordTema(_id:number) {
        return this.query(
            `select distinct tema_id from tema where user_id = ?;`, [_id]
        )
    }
}

export default TemaDB;