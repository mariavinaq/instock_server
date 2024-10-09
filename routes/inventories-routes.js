import express from "express";
const router = express.Router();
import {getAllInventoryItems, getInventoryItemById, add} from '../controllers/inventory-controller.js';

router.route("/")
	.get(getAllInventoryItems)
    .post(add)
    
router.route('/:id')
	.get(getInventoryItemById)

export default router;