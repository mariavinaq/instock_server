import express from "express";
const router = express.Router();
import {getAllInventoryItems, getInventoryItemById, edit} from '../controllers/inventory-controller.js';

router.route("/")
	.get(getAllInventoryItems)

router.route('/:id')
	.get(getInventoryItemById)
    .put(edit)

export default router;