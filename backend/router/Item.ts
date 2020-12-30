import express, { Router } from "express";
import ItemDB from "../DB"
import { userSession, loginChecker } from './Login'
const ItemManager:Router = express.Router();

const db = new ItemDB();

ItemManager.get("/", async (req: express.Request, res: express.Response) => {
    let {score} = req.query
    let s:number;
    if(typeof score === "string"){
        try{
            s = parseInt(score);
        } catch(e){
            s = 5;
        }
    } else {
        s = 5;
    }
    let items = await db.select(s);
    res.status(200).json({data:items})
})

ItemManager.post("/owner", loginChecker, async (req: express.Request, res: express.Response) => {
    const {session} = req.body
    let items = await db.selectByUser(userSession[session])
    res.status(200).json({"data":items})
})

ItemManager.post("/insert", loginChecker, async (req: express.Request, res: express.Response) => {
    const body = req.body;
    await db.insert(body.item, userSession[body.session])
    res.status(200).send()
})

export default ItemManager; 