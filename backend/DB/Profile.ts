
import { Manager } from './Base';

class ProfileDB extends Manager {

    constructor() {
        super();
    }

    async getProfile(id:number){
        return this.query(`
        select
            u.report_count,
            (select count(*) from items where user_id = ?) as write_count,
            u.recommend_count,
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
}

export default ProfileDB;