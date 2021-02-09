
import { Manager } from './Base';

class LoginDB extends Manager {

    constructor() {
        super();
    }

    async login(logininfo:{id:string, pw:string}){
        let {id, pw} = logininfo;
        return this.query(`
            select
                _id
            from user where user_id=? and password=?;
        `, [id, pw])
    }

    async register(register:{id:string, pw:string, pwc:string, nickname:string}) {
        if(register.pw !== register.pwc) return false
        let {id, pw, nickname} = register
        return this.query(
            `insert into user (user_id, password, nickname)
            values
            (?, ?, ?)`, [id, pw, nickname]
        )
    }

    async permission(_id:number) {
        return this.query(
            `select permission = 1 as permission from user where _id = ?`, [_id]
        ).then((x:any) => x[0].permission)
    }

    async checkRedupId(id:string) {
        return this.query(
            `select count(*) as count from user where user_id = ?;`, [id]
        )
    }
}

export default LoginDB;