
import express, { Router,Request,Response } from "express";
import LoginDB from "../DB/Login"
import { v4 as uuidv4 } from "uuid";

interface session{
    [key: string] : number
}

const loginManager:Router = express.Router();

const db = new LoginDB();
export const userSession:session = {}

export function loginChecker(req:Request, res:Response, next:Function){
    if(req.session!.key){
        let key = req.session!.key
        if(userSession[key]){
            res.locals._id = userSession[key]
            next()
        } else {
            res.statusMessage = "Wrong Session"
            res.status(400).json({})
        }
    } else {
        res.statusMessage = 'Need To Login first'
        res.status(404).json({})
    }
}

loginManager.get("/", loginChecker, async (_, res:Response) => res.status(200).json({}))

loginManager.post("/", async (req:Request, res:Response) => {
    let [profile] = await db.login(req.body) as any[];

    if(profile){
        let key = uuidv4()
        req.session!.key = key
        userSession[key] = profile._id
        res.status(200).json({})
    }else {
        res.statusMessage = "Wrong id or password"
        res.status(404).json({})
    }
})

loginManager.delete("/", loginChecker ,async (req:Request, res:Response) => {
    req.session!.destroy((err:Error) => {
        if (err) {
            res.statusMessage = err.message
            res.status(400).json({})
        }
        else res.status(200).json({});
    })
})

loginManager.post("/register", async (req:Request, res:Response) => {
    let check:any = await db.checkRedupId(req.body.id)
    if(check[0].count){
        res.statusMessage = "Overlaped User ID"
        res.status(400).json({})
        return
    }

    let x = await db.register(req.body)
    if(x) res.status(200)
    else res.status(404)
    res.send({})
})

loginManager.post("/overlap", async (req:Request, res:Response) => {
    let check:any = await db.checkRedupId(req.body.id)
    res.status(200).json({able: Boolean(check[0].count)})
})

export default loginManager;  