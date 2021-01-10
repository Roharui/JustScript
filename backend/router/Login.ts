
import express, { Router } from "express";
import LoginDB from "../DB/Login"
import { v4 as uuidv4 } from "uuid";

interface session{
    [key: string] : number
}

const loginManager:Router = express.Router();

const db = new LoginDB();
export const userSession:session = {}

export function loginChecker(req:express.Request, res:express.Response, next:Function){
    console.log(req.session!.key)
    if(req.session!.key){
        let key = req.session!.key
        if(userSession[key]){
            req.body._id = userSession[key]
            next()
        } else {
            res.status(400).send({error : "Wrong Session"})
        }
    } else {
        res.status(404).send({error : "Need To Login first"})
    }
}

loginManager.post("/", async (req: express.Request, res: express.Response) => {
    let [profile] = await db.login(req.body) as any[];

    if(profile){
        let key = uuidv4()
        req.session!.key = key
        userSession[key] = profile._id
        res.status(200).send()
    }else {
        res.status(404).send({error : "Wrong id or password"})
    }
})

loginManager.delete("/", loginChecker ,async (req: express.Request, res: express.Response) => {
    req.session!.destroy((err) => {
        if (err) res.status(400).send({error : err})
        else res.status(200).send();
    })
})

loginManager.post("/register", async (req: express.Request, res: express.Response) => {
    let check:any = await db.checkRedupId(req.body.id)
    if(check[0].count){
        res.status(400).send({error : "Overlaped User ID"})
        return
    }

    let x = await db.register(req.body)
    if(x) res.status(200)
    else res.status(404)
    res.send({})
})

loginManager.post("/overlap", async (req: express.Request, res: express.Response) => {
    let check:any = await db.checkRedupId(req.body.id)
    res.status(200).json({able: Boolean(check[0].count)})
})

export default loginManager; 