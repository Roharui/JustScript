import express, { Router } from "express";
import ItemDB from "../DB"
import { userSession } from './Login'

const ItemManager:Router = express.Router();

const db = new ItemDB();

ItemManager.get("/", async (req: express.Request, res: express.Response) => {
    let items = await db.select();
    res.json(items)
})

ItemManager.post("/insert", async (req: express.Request, res: express.Response) => {
    const body = req.body;
    await db.insert(body.item, userSession[body.session])
    res.json({"state": 200})
})

export default ItemManager; 