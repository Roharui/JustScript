import express from "express";
import ItemManager from "./Item"
import LoginManager from "./Login"

const router = express.Router();
router.use('/item', ItemManager)
router.use("/login", LoginManager)

export default router; 