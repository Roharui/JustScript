
import express, { Router } from "express";
import LoginDB from "../DB/Login"
import { v4 as uuidv4 } from "uuid";
import REST from "./REST";
import { RowDataPacket } from 'mysql2'

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

loginManager.use(function(req:express.Request, res:express.Response, next:Function){
    let body = req.body
    let null_ck = Object.values(body).filter((x) => !x)
    if(null_ck.length){
        res.json(REST(null, 404));
        return;
    } else {
        next()
    }
})

loginManager.post("/", async (req: express.Request, res: express.Response) => {
    let profile:any = await db.login(req.body);

    if(profile){
        let uuid = uuidv4();
        userSession[uuid] = profile[0]._id
        let x = {session:uuid}
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
    let check:any = await db.checkRedupId(req.body.id)
    if(check[0].count){
        res.json(REST(null, 400))
        return
    }
    db.register(req.body).then(x => {
        if(x) res.json(REST(null, 200))
        else  res.json(REST(null, 404))
    })
})

loginManager.post("/overlap", async (req: express.Request, res: express.Response) => {
    let check:any = await db.checkRedupId(req.body.id)
    if(check[0].count){
        res.json(REST(null, 400))
        return
    }
    res.json(REST(null, 200))
})

export default loginManager; 