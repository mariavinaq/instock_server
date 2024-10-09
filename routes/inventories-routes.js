import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router.get("/", async (_req, res)=>{
    const response = await knex("inventories");
    res.status(200).json(response);
});

export default router;