
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

loginManager.use(function(req:express.Request, res:express.Response, next:Function){
    let body = req.body
    let null_ck = Object.values(body).filter((x) => !x)
    if(null_ck.length){
        res.status(404)
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
        res.status(200).send({data:x})
    }else {
        res.status(404)
    }
    res.send()
})

loginManager.post("/logout", async (req: express.Request, res: express.Response) => {
    let {session} = req.body
    if(userSession[session]){
        delete userSession[session];
        res.status(200)
    }else {
        res.status(400)
    }
    res.send()
})

loginManager.post("/register", async (req: express.Request, res: express.Response) => {
    let check:any = await db.checkRedupId(req.body.id)
    if(check[0].count){
        res.status(400)
        return
    }
    db.register(req.body).then(x => {
        if(x) res.status(200)
        else res.status(404)
    })
    res.send()
})

loginManager.post("/overlap", async (req: express.Request, res: express.Response) => {
    let check:any = await db.checkRedupId(req.body.id)
    if(check[0].count){
        res.status(400)
        return
    }
    res.status(200).send()
})

export default loginManager; 