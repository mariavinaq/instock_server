import express from "express";
const router = express.Router();
import {getAllInventoryItems, 
			getInventoryItemById, 
			edit, add, deleteItem, 
			getStringMatchingRows,
			getInventoryItemByItemName
		} from '../controllers/inventory-controller.js';

router.route("/")
	.get(getAllInventoryItems)
	.post(add)


router.route('/match/:s')
	.get(getStringMatchingRows)

router.route('/sortBy/:order/:column').get(getInventoryItemByItemName)

router.route('/:id')
	.get(getInventoryItemById)
    .put(edit)
	.delete(deleteItem)
	.delete(deleteItem)



export default router;