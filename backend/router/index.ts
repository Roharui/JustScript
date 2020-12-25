import express from "express";
import ItemManager from "./Item"
import LoginManager from "./Login"
import ProfileManager from "./Profile"

const router = express.Router();
router.use('/item',    ItemManager)
router.use("/login",   LoginManager)
router.use("/profile", ProfileManager)

export default router; 