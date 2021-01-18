import express, { Router, Request, Response } from "express";
import ItemDB from "../DB"
import { userSession, loginChecker } from './Login'

const ItemManager:Router = express.Router();

const db = new ItemDB();

ItemManager.get("/owner", loginChecker, async (req: Request, res: Response) => {
    const {_id} = res.locals
    const {filter:_filter} = req.query

    let f = _filter ? (_filter as string).split(",") : ["html", "canvas", "tema"]

    let items = await db.selectByUser(_id, f)
    res.status(200).json({"data":items})
})

ItemManager.post("/recommend", loginChecker, async (req: Request, res: Response) => {
    const {item_id, flag} = req.body;
    const {_id} = res.locals
    await db.recommend(item_id, _id, flag)
    res.status(200).json({})
})

ItemManager.post("/", loginChecker, async (req: Request, res: Response) => {
    const {item} = req.body;
    const {_id} = res.locals
    await db.insert(item, _id)
    res.status(200).json({})
})

ItemManager.delete("/", loginChecker, async (req: Request, res: Response) => {
    const {id} = req.body;
    const {_id} = res.locals

    db.delete(id, _id)
    .then(() => res.status(200))
    .catch(err => {
        res.statusMessage = err.message
        res.status(400)
    })
    
    res.json({})
})

ItemManager.get("/search", async (req: Request, res: Response) => {
    const {param, filter:_filter} = req.query

    let f = _filter ? (_filter as string).split(",") : ["html", "canvas", "tema"]

    let items;
    if(req.session!.key) items = await db.search((param as string), f, userSession[req.session!.key]);
    else items = await db.search((param as string), f);
    res.status(200).json({data:items})
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