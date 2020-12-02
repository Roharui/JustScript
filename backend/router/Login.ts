import express, { Router } from "express";
import LoginDB from "../DB/Login"
import { v4 as uuidv4 } from "uuid";
import REST from "./REST";

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
        let x = {...profile, session:uuid, _id:-1}
        res.json(REST(x, 200))
    }else {
        res.json(REST(null, 404))
    }
})

loginManager.post("/profile", async (req: express.Request, res: express.Response) => {
    let {session} = req.body
    if(userSession[session]){
        let x = await db.getProfile(userSession[session])
        res.json(REST(x, 200))
    }else {
        res.json(REST(null, 404))
    }
})

loginManager.post("/logout", async (req: express.Request, res: express.Response) => {
    let {session} = req.body
    if(userSession[session]){
        delete userSession[session];
        res.json(REST(null, 200))
    }else {
        res.json(REST(null, 404))
    }
})

loginManager.post("/register", async (req: express.Request, res: express.Response) => {
    db.register(req.body).then(x => {
        if(x) res.json(REST(null, 200))
        else  res.json(REST(null, 404))
    })
})


export default loginManager; 