
import express from "express";

class App {
    public application : express.Application;

    constructor(){
        this.application = express();
    }
}

const app = new App().application;

app.get("/", (req: express.Request, res: express.Response) => {
    res.json({"state": 200})
})

app.listen(3001, () => console.log("Start backend at 3001"))