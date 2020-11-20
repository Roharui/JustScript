
import { Manager } from './Base';

class LoginDB extends Manager {

    constructor() {
        super();
    }

    async login(logininfo:{id:string, pw:string}){
        let {id, pw} = logininfo;
        let [result, _] = await (await this.conn).query(`
            select
                _id,
                report_count,
                write_count,
                recomment_count,
                nickname,
                profile_img
            from user where user_id="${id}" and password="${pw}";
        `)
        return JSON.parse(JSON.stringify(result));
    }
}

export default LoginDB;