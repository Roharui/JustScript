import express, { Router } from "express";
import multer from "multer";
import path from "path"

import LoginDB from "../DB/Login"
import { userSession } from './Login'

const ProfileManager:Router = express.Router();

const db = new LoginDB();

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


ProfileManager.post("/", async (req: express.Request, res: express.Response) => {
    let {session} = req.body
    if(userSession[session]){
        let [x]:any = await db.getProfile(userSession[session])
        res.status(200).json({data:x})
    }else {
        res.status(404)
    }
})

ProfileManager.post("/update", upload.single("upload_file"), async (req: express.Request, res: express.Response) => {
    let {session, nickname} = req.body
    if(userSession[session]){
        let [x]:any = await db.getProfile(userSession[session])
        let file = req.file != undefined ? req.file : {filename:x.profile_img}
        let nick = nickname != undefined ? nickname : x.nickname
        await db.updateProfile({
            _id:userSession[session], 
            nickname:nick, 
            profile_img: file.filename
        })
        let [c]:any = await db.getProfile(userSession[session])
        res.status(200).json({data:c})
    }else {
        res.status(404)
    }
})

export default ProfileManager; 