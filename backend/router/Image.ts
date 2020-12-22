import express, { Router } from "express";
import multer from "multer"

import LoginDB from "../DB/Login"
import { userSession } from './Login'
import REST from "./REST";

const ImageManager:Router = express.Router();

const upload = multer({ 
    dest: '../public/img/'
});

const db = new LoginDB();

ImageManager.get("/", upload.single("upload_file"), async (req: express.Request, res: express.Response) => {
    let {session} = req.body
    if(userSession[session]){
        let x:any = await db.getProfile(userSession[session])
        res.json(REST(x[0], 200))
    }else {
        res.json(REST(null, 404))
    }
})

export default ImageManager; 