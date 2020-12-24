import express, { Router } from "express";
import multer from "multer"
import path from "path"

import LoginDB from "../DB/Login"
import { userSession } from './Login'
import REST from "./REST";

const ImageManager:Router = express.Router();


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname + '../../../../build'))
    },
    filename: function(req, file, cb){
        cb(null, "img/" + file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ 
    storage : storage
    , limits : { fileSize: 5 * 1024 * 1024 }
});

const db = new LoginDB();

ImageManager.post("/profile_upload", upload.single("upload_file"), async (req: express.Request, res: express.Response) => {
    let {session} = req.body
    if(userSession[session]){
        let [x]:any = await db.getProfile(userSession[session])
        await db.updateProfile({_id:userSession[session], profile_img:req.file.filename})
        res.json(REST(x, 200))
    }else {
        res.json(REST(null, 404))
    }
})

export default ImageManager; 