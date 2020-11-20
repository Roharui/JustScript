
import express from "express";
import cors from "cors";
import router from "./router"

class App {
    public application : express.Application;

    constructor(){
        this.application = express();
        this.application.use(cors())
        this.application.use(express.json())
    }
}

const appbase = new App();
const app = appbase.application;
app.use("/", router);

app.listen(3001, () => console.log("Start backend at 3001"))