
import { Manager } from './Base';

class ReportDB extends Manager {

    constructor() {
        super();
    }

    async reportLst(){
        return this.query(`
        SELECT m.* FROM
        (SELECT 
            i.*,
            u.nickname as name,
            u.profile_img as img,
            ifnull(r.score, 0) as score,
            ru.score as recommended,
            1 as own
        FROM 
            items i
            left outer join (
                select rr.item_id, sum(rr.score) as score 
                from recommend rr 
                group by rr.item_id
            ) r on r.item_id = i.id
            left outer join recommend ru on ru.item_id = i.id
            inner join user u on u._id = i.user_id) m
            inner join (
                SELECT item_id, count(*) as count FROM report group by item_id order by item_id asc
            ) r on r.item_id = m.id
        `)
    }

    async report(_id:number, item:number){
        return this.query(`
        insert into report (item_id, report_user_id) values(?, ?);
        `, [item, _id])
    }
}

export default ReportDB;