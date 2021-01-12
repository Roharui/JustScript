import express, { Router, Request, Response } from "express";
import ItemDB from "../DB"
import { userSession, loginChecker } from './Login'

const ItemManager:Router = express.Router();

const db = new ItemDB();

ItemManager.get("/owner", loginChecker, async (req: Request, res: Response) => {
    const {_id} = req.body
    let items = await db.selectByUser(_id)
    res.status(200).json({"data":items})
})

ItemManager.post("/recommend", loginChecker, async (req: Request, res: Response) => {
    const {item_id, _id, flag} = req.body;
    await db.recommend(item_id, _id, flag)
    res.status(200).send()
})

ItemManager.post("/", loginChecker, async (req: Request, res: Response) => {
    const {item, _id} = req.body;
    await db.insert(item, _id)
    res.status(200).send()
})

ItemManager.delete("/", loginChecker, async (req: Request, res: Response) => {
    const {id, _id} = req.body;

    db.delete(id, _id)
    .then(() => res.status(200))
    .catch(err => {
        res.statusMessage = err.message
        res.status(400)
    })
    
    res.send()
})

ItemManager.get("/", async (req: Request, res: Response) => {
    let {score, filter: _filter} = req.query
    let s:number = score ? parseInt(score as string) : 5 

    let f = _filter ? (_filter as string).split(",") : ["html", "canvas", "tema"]

    let items;
    if(req.session!.key) items = await db.select(s, f, userSession[req.session!.key]);
    else items = await db.select(s, f);
    res.status(200).json({data:items})
})

export default ItemManager; 