import express, { Router } from "express";
import LoginDB from "../DB/Login"
import { userSession } from './Login'

const ProfileManager:Router = express.Router();

const db = new LoginDB();

ProfileManager.post("/", async (req: express.Request, res: express.Response) => {
    let {session} = req.body
    if(userSession[session]){
        let [x]:any = await db.getProfile(userSession[session])
        res.status(200).json({data:x})
    }else {
        res.status(404)
    }
})

export default ProfileManager; 