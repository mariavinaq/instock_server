import express from "express";
const router = express.Router();
import {getAllInventoryItems, getInventoryItemById, add, edit} from '../controllers/inventory-controller.js';

router.route("/")
	.get(getAllInventoryItems)
    .post(add)

router.route('/:id')
	.get(getInventoryItemById)
    .put(edit)

export default router;