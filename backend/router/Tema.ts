
import express, { Router,Request,Response } from "express";
const TemaManager:Router = express.Router();

TemaManager.get("/", function (req:Request, res:Response) {
    res.type('css')
    res.send(`
    * {
    }
    `)
})

export default TemaManager; 