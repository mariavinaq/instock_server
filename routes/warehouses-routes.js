import express from "express";
const router = express.Router();
import { add, findOne, index, remove, update } from "../controllers/warehouse-controller.js";


router.get("/", index);
router.post("/", add);
router.get("/:id", findOne);

router.put("/:id", update);
router.delete("/:id", remove)

export default router;