import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router.get("/", async (_req, res) => {
    const response = await knex("warehouses");
    res.status(200).json(response);
});

router.get("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
    try {
        const completeDataValidation = () => {
            const requiredData = ["warehouse_name", "address", "city", "country", "contact_name", "contact_position", "contact_phone", "contact_email"];
            return requiredData.every(datum => Object.hasOwn(req.body, datum) && req.body[datum] !== "");
        };

        const phoneValidation = () => {
            const phone = req.body.contact_phone;
            return /^(\+1)\s(\(\d{3}\))\s(\d{3})-(\d{4})$/.test(phone);
        }

        const emailValidation = () => {
            const email = req.body.contact_email;
            return /^(\w+)@(\w+)\.(\w+)$/.test(email);
        }

        if (completeDataValidation() === false) {
            return res.status(400).json({
                message: `Unable to update warehouse information due to incomplete data`
            });
        }

        if (phoneValidation() === false) {
            return res.status(400).json({
                message: `Unsuccessful update. Please input contact phone in the format: +1 (###) ###-####`
            });
        }

        if (emailValidation() === false) {
            return res.status(400).json({
                message: `Unsuccessful update. Please input contact email in the format: example@mail.com`
            });
        }

        const response = await knex("warehouses")
            .where({ id: req.params.id })
            .update(req.body);

        if (!response) {
            return res.status(404).json({
                message: `Warehouse with id:${req.params.id} not found`
            });
        }

        const updatedWarehouse = await knex("warehouses")
            .where({ id: req.params.id })
            .first();

        res.status(200).json(updatedWarehouse);
    } catch (error) {
        res.status(500).json({
            message: `Unable to update data for warehouse with id:${req.params.id}`
        });
    }
});

export default router;