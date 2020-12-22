import express from "express";
import ItemManager from "./Item"
import LoginManager from "./Login"
import ProfileManager from "./Profile"
import ImageManager from "./Image"

const router = express.Router();
router.use('/item',    ItemManager)
router.use("/login",   LoginManager)
router.use("/profile", ProfileManager)
router.use("/image",   ImageManager)

export default router; 