
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
            u.report_count,
            (select count(*) from items where user_id = ?) as write_count,
            u.recomment_count,
            u.nickname,
            u.profile_img
        from user u where _id=?;
        `, [id, id])
    }

    async updateProfile(values:{
        _id:number, 
        nickname:string | null, 
        profile_img:string | null
    }){
        let {_id, nickname, profile_img} = values;
        return this.query(`
            update user
            set 
            profile_img = ?,
            nickname = ?
            where _id = ?;
        `, [profile_img, nickname, _id])
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