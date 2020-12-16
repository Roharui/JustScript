import express, { Router } from "express";
import LoginDB from "../DB/Login"
import { userSession } from './Login'
import REST from "./REST";

const ProfileManager:Router = express.Router();

const db = new LoginDB();

ProfileManager.post("/", async (req: express.Request, res: express.Response) => {
    let {session} = req.body
    if(userSession[session]){
        let x:any = await db.getProfile(userSession[session])
        res.json(REST(x[0], 200))
    }else {
        res.json(REST(null, 404))
    }
})

export default ProfileManager; 