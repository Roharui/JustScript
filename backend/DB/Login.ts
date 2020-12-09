
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

    async getProfile(id:number){
        return this.query(`
            select
                report_count,
                write_count,
                recomment_count,
                nickname,
                profile_img
            from user where _id=?;
        `, [id])
    }

    async register(register:{id:string, pw:string, pwc:string, nickname:string}) {
        if(register.pw !== register.pwc) return false
        let {id, pw, nickname} = register
        return this.query(
            `insert into justscript.user (user_id, password, nickname)
            values
            (?, ?, ?)`, [id, pw, nickname]
        )
    }

    async checkRedupId(id:string) {
        return this.query(
            `select count(*) as count from justscript.user where user_id = ?;`, [id]
        )
    }
}

export default LoginDB;