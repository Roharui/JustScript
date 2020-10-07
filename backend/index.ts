
import express from "express";
import cors from "cors";
import Manager from "./dbmanager"

class App {
    public application : express.Application;
    public manager : Manager;

    constructor(){
        this.application = express();
        this.application.use(cors())
        this.manager = new Manager();

        this.application.use(express.json())
    }
}

const appbase = new App();
const app = appbase.application;
const db = appbase.manager;

app.get("/", async (req: express.Request, res: express.Response) => {
    let items = await db.select();
    res.json(items)
})

app.post("/insert", async (req: express.Request, res: express.Response) => {
    await db.insert(req.body)
    res.json({"state": 200})
})

app.listen(3001, () => console.log("Start backend at 3001"))