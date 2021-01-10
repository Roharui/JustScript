
import express from "express";
import cors from "cors";
import router from "./router"
import session from "express-session"

class App {
    public application : express.Application;

    constructor(){
        this.application = express();
        this.application.use(express.json())
        
        this.application.use(cors({
            origin: "http://localhost:3000",
            credentials: true
        }))
        this.application.use(session({
            resave: true,
            saveUninitialized: true,
            secret: "random value",
            cookie: { secure: false }
        }))
    }
}

const appbase = new App();
const app = appbase.application;

app.use("/api", router);

app.get("/img/:path", function (req, res) {
    res.sendFile(__dirname + '/img/' + req.params.path)
})

app.listen(3001, () => console.log("Start backend at 3001"))