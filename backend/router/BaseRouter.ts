import express, { Router } from "express";
import Manager from "../DB"

const router:Router = express.Router();

const db = new Manager();

router.get("/", async (req: express.Request, res: express.Response) => {
    let items = await db.select();
    res.json(items)
})

export default router; 