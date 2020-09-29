
import express from "express";
import cors from "cors";

class App {
    public application : express.Application;

    constructor(){
        this.application = express();
        this.application.use(cors())
    }
}

const app = new App().application;

app.get("/", (req: express.Request, res: express.Response) => {
    res.json({
        items : [
            {
                id : 0,
                img : "Icon.png",
                name : "Twitch",
                descript : "TEST",
                script:"<h1>Hello!!!</h1>"
            },
            {
                id : 1,
                img : "Icon.png",
                name : "Twitch",
                descript : "TEST",
                script:'<script>document.write("hello")</script>'
            },
        ],
        cur_script: {
            id : 0,
            img : "Icon.png",
            name : "Twitch",
            descript : "TEST",
            script:"<h1>Hello!!!</h1>"
        },
        wirteAble: false,
        show_popup: false
    })
})

app.listen(3001, () => console.log("Start backend at 3001"))