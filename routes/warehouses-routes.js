import express from "express";
const router = express.Router();
import { add, findOne, index, remove, update,  getWarehouseItemByItemName } from "../controllers/warehouse-controller.js";


router.get("/", index);
router.post("/", add);
// router.route('/match/:s')
// 	.get(getStringMatchingRows)
router.get("/sortBy/:order/:column",getWarehouseItemByItemName);
router.get("/:id", findOne);

router.put("/:id", update);
router.delete("/:id", remove)

export default router;