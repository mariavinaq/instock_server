import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router.get("/", async (_req, res)=>{
    const response = await knex("warehouses");
    res.status(200).json(response);
});

router.get("/:id", async (req, res)=>{
    try {
        const response = await knex("warehouses")
        .where({ id: req.params.id })
        .first();

        if (!response) {
            return res.status(404).json({
                message: `Warehouse with id:${req.params.id} not found`
            });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve data for warehouse with id:${req.params.id}`
        });
    }
});

export default router;