import express, { Router } from "express";
import LoginDB from "../DB/Login"
import { v4 as uuidv4 } from "uuid";

interface session{
    uuid: string,
    _id : number
}

interface user{
    _id: number,
    report_count: number,
    write_count: number,
    recomment_count: number,
    nickname: string,
    profile_img: string,
}

const loginManager:Router = express.Router();

const db = new LoginDB();
const userSession:session[] = []

loginManager.post("/", async (req: express.Request, res: express.Response) => {
    let [profile] = await db.login(req.body);
    if(profile){
        let uuid = uuidv4();
        userSession.push({uuid:uuid, _id:profile._id})
        res.json({...profile, session:uuid, _id:-1})
    }else {
        res.json({})
    }
})

export default loginManager; 