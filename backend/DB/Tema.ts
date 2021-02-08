
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

    async temaLst(id:number){
        return this.query(`
        select i.id, i.descript, i.script, u.nickname, t.priority
        from tema t
        inner join items i on i.id = t.tema_id
        inner join user  u on u._id = i.user_id
        where t.user_id = ?
        order by t.priority;
        `, [id])
    }

    async temaPush(tema:number, _id:number){
        return this.query(`
            insert into tema(user_id, tema_id, priority) select ?, ?, 
            (ifnull(max(priority), 0) + 1) from tema where user_id = ?;
        `, [_id, tema, _id])
    }

    async recordTema(_id:number) {
        return this.query(
            `select tema_id from tema where user_id = ? order by priority desc;`, [_id]
        )
    }

    async deleteTema(_id:number, tema:number) {
        return this.query(
            `delete from tema where user_id = ? and tema_id = ?;`
        , [_id, tema])
    }

    async updatePrio(_id:number, id:number, flag:number) {
        return this.query(`
        update tema set priority = priority + ?
        where user_id = ? and tema_id = ?;`,
        [flag, _id, id])
    }
}

export default TemaDB;