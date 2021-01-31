
import express, { Router,Request,Response } from "express";
import TemaDB from "../DB/Tema";
import { loginChecker } from "./Login";

const TemaManager:Router = express.Router();

const db = new TemaDB();

TemaManager.post("/", loginChecker, function (req:Request, res:Response){
    let _id = res.locals._id
    let {tema} = req.body;

    db.temaPush(tema, _id)
    .then(x => {
        res.status(200).json({})
    })
    .catch(e => {
        res.statusMessage = e.message
        res.status(500).json({})
    })
})

TemaManager.post("/record", loginChecker, function(req:Request, res:Response){
    let _id = res.locals._id

    db.recordTema(_id).then((x:any) => {
        res.status(200).json(x.map((i:{tema_id:number}) => {
            return i.tema_id
        }))
    })
})

TemaManager.delete("/", loginChecker, function (req:Request, res:Response) {
    let _id = res.locals._id
    let { tema } = req.body

    db.deleteTema(_id, tema)
    .then(x => {
        res.status(200).json({})
    })
    .catch(e => {
        res.statusMessage = e.message
        res.send(500).json({})
    })
})

TemaManager.get("/:id", function (req:Request, res:Response) {
    res.contentType("text/css")
    let id = req.params.id
    let _id:number = parseInt(id as string)

    if(_id === NaN){
        res.status(404).send()
        return
    }

    db.tema(_id).then(data => {
        let [x]:any = data
        if(x) res.status(200).send(x.script)
        else  res.status(404).send()
    })
})



export default TemaManager; 