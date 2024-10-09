import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();
import {getAllInventoryItems, getInventoryItemById} from '../controllers/inventory-controller.js';

router.route("/")
	.get(getAllInventoryItems)

router.route('/:id')
	.get(getInventoryItemById)

export default router;