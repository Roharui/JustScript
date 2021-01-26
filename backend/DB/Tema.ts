
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
}

export default TemaDB;