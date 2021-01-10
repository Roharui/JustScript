
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
            sum(r.score) as recommend_count,
            u.nickname,
            u.profile_img,
            u.permission
        from 
            user u
            inner join items i on i.user_id = u._id
            inner join recommend r on r.item_id = i.id
        where u._id=?;
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