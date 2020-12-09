import express, { Router } from "express";
import ItemDB from "../DB"
import { userSession } from './Login'
import REST from "./REST";

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
    res.json(REST(items, 200))
})

ItemManager.post("/insert", async (req: express.Request, res: express.Response) => {
    const body = req.body;
    await db.insert(body.item, userSession[body.session])
    res.json(REST(null, 200))
})

export default ItemManager; 