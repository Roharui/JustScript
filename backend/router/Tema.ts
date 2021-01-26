
import express, { Router,Request,Response } from "express";
import TemaDB from "../DB/Tema";

const TemaManager:Router = express.Router();

const db = new TemaDB();

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
        if(x)
            res.status(200).send(x.script)
        else
            res.status(404).send()
    })
})

export default TemaManager; 