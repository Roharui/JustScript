import express, { Router } from "express";
import LoginDB from "../DB/Login"
import { v4 as uuidv4 } from "uuid";

interface session{
    [key: string] : number
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
export const userSession:session = {}

loginManager.post("/", async (req: express.Request, res: express.Response) => {
    let [profile] = await db.login(req.body);
    if(profile){
        let uuid = uuidv4();
        userSession[uuid] = profile._id
        res.json({...profile, session:uuid, _id:-1})
    }else {
        res.json({})
    }
})

loginManager.post("/profile", async (req: express.Request, res: express.Response) => {
    let {session} = req.body
    if(userSession[session]){
        res.json(await db.getProfile(userSession[session]))
    }else {
        res.json({})
    }
})

loginManager.post("/logout", async (req: express.Request, res: express.Response) => {
    let {session} = req.body
    if(userSession[session]){
        delete userSession[session];
        res.json({state: 200})
    }else {
        res.json({state: 404})
    }
})


export default loginManager; 