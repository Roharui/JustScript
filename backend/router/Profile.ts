import express, { Router } from "express";
import multer from "multer";
import path from "path"

import ProfileDB from "../DB/Profile"
import { loginChecker } from './Login'

const ProfileManager:Router = express.Router();

const db = new ProfileDB();

interface user{
    _id: number,
    report_count: number,
    write_count: number,
    recommend_count: number,
    nickname: string,
    profile_img: string,
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "../"))
    },
    filename: function(req, file, cb){
        cb(null, "img/" + file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ 
    storage : storage
    , limits : { fileSize: 5 * 1024 * 1024 }
});

ProfileManager.get("/", loginChecker, async (req: express.Request, res: express.Response) => {
    let {_id} = req.body
    let [x]:any = await db.getProfile(_id)
    res.status(200).json({data:x})
})

ProfileManager.put("/", loginChecker, upload.single("upload_file"), async (req: express.Request, res: express.Response) => {
    let {nickname, _id} = req.body

    let [x]:any = await db.getProfile(_id)
    let file = req.file != undefined ? req.file : {filename:x.profile_img}
    let nick = nickname != undefined ? nickname : x.nickname
    await db.updateProfile({
        _id:_id, 
        nickname:nick, 
        profile_img: file.filename
    })
    res.status(200).send()
})

export default ProfileManager; 