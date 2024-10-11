import express from "express";
const router = express.Router();
import {getAllInventoryItems, getInventoryItemById, edit, add, deleteItem} from '../controllers/inventory-controller.js';

router.route("/")
	.get(getAllInventoryItems)
	.post(add)

router.route('/:id')
	.get(getInventoryItemById)
    .put(edit)
	.delete(deleteItem)

export default router;