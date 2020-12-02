
import { Manager } from './Base';

class LoginDB extends Manager {

    constructor() {
        super();
    }

    async login(logininfo:{id:string, pw:string}){
        let {id, pw} = logininfo;
        let [result, _] = await (await this.conn).query(`
            select
                _id
            from user where user_id="${id}" and password="${pw}";
        `)
        return JSON.parse(JSON.stringify(result));
    }

    async getProfile(id:number){
        let [result, _] = await (await this.conn).query(`
            select
                report_count,
                write_count,
                recomment_count,
                nickname,
                profile_img
            from user where _id="${id}";
        `)
        return JSON.parse(JSON.stringify(result));
    }

    async register(register:{id:string, pw:string, pwc:string, nickname:string}) {
        if(register.pw !== register.pwc) return false
        let [result, _] = await (await this.conn).query(
            `insert into justscript.user (user_id, password, nickname)
            values
            ("${register.id}", "${register.pw}", "${register.nickname}")`
        )
        return result
    }
}

export default LoginDB;