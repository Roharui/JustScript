
import express from "express";
import cors from "cors";
import router from "./router"

class App {
    public application : express.Application;

    constructor(){
        this.application = express();
        this.application.use(cors())
        this.application.use(express.json())
        // this.application.use(express.static(path.join(__dirname + '../../../build/')))
    }
}

const appbase = new App();
const app = appbase.application;
app.use("/api", router);

app.get("/img/:path", function (req, res) {
    res.sendFile(__dirname + '/img/' + req.params.path)
})

// app.get('/*', function (req, res){
//     res.sendFile(path.resolve(__dirname + '../../../build/index.html'))
// })
  

app.listen(3001, () => console.log("Start backend at 3001"))