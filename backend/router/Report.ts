
import express, { Router,Request,Response } from "express";
import ReportDB from "../DB/Report";
import { AdminChecker, loginChecker } from "./Login";

const ReportManager:Router = express.Router();

const db = new ReportDB();

ReportManager.post("/list", loginChecker, AdminChecker, function (req:Request, res:Response){

    db.reportLst()
    .then(x => {
        res.status(200).json({data:x})
    })
    .catch(e => {
        res.statusMessage = e.message
        res.status(500).json({})
    })
})

ReportManager.post("/", loginChecker, function (req:Request, res:Response){
    let _id = res.locals._id
    let {item} = req.body;

    db.report(_id, item)
    .then(x => {
        res.status(200).json({})
    })
    .catch(e => {
        res.statusMessage = e.message
        res.status(500).json({})
    })
})


export default ReportManager; 