import express from "express";
import ItemManager from "./Item"

const router = express.Router();
router.use('/item', ItemManager)

export default router; 