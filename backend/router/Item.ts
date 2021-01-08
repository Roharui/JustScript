import express, { Router } from "express";
import ItemDB from "../DB"
import { userSession, loginChecker } from './Login'
const ItemManager:Router = express.Router();

const db = new ItemDB();

ItemManager.post("/owner", loginChecker, async (req: express.Request, res: express.Response) => {
    const {_id} = req.body
    let items = await db.selectByUser(_id)
    res.status(200).json({"data":items})
})

ItemManager.post("/insert", loginChecker, async (req: express.Request, res: express.Response) => {
    const {item, _id} = req.body;
    await db.insert(item, _id)
    res.status(200).send()
})

ItemManager.post("/recommend", loginChecker, async (req: express.Request, res: express.Response) => {
    const {item_id, _id, flag} = req.body;
    await db.recommend(item_id, _id, flag)
    res.status(200).send()
})

ItemManager.delete("/delete", loginChecker, async (req: express.Request, res: express.Response) => {
    const {id, _id} = req.body;

    db.delete(id, _id)
    .then(() => res.status(200))
    .catch(() => res.status(400))
    
    res.send()
})

ItemManager.get("/", async (req: express.Request, res: express.Response) => {
    let {score, session, filter} = req.query
    let s:number = 5;
    if(typeof score === "string"){
        try{ s = parseInt(score);} 
        catch(e){ s = 5; }
    }

    let f = (filter as string).split(",")

    let items = await db.select(s, f, userSession[(session as string)]);
    res.status(200).json({data:items})
})

export default ItemManager; 