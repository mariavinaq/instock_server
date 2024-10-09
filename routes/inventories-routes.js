import express from "express";
const router = express.Router();
import {getAllInventoryItems, getInventoryItemById} from '../controllers/inventory-controller.js';

router.route("/")
	.get(getAllInventoryItems)

router.route('/:id')
	.get(getInventoryItemById)

export default router;