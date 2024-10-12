import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (_req, res) => {
    try {
        const response = await knex("warehouses");
        res.status(200).json(response);
      } catch (err) {
        res.status(500).send(`Error retrieving warehouses: ${err}`);
      }
   
}

const findOne = async (req, res) => {
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
}
 const update = async (req, res) => {
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
}

 const remove = async (req, res)=>{
    try {
        const rowsToDelete = await knex("warehouses")
          .where({ id: req.params.id })
          .delete();
    
        if (rowsToDelete === 0) {
          return res
            .status(404)
            .json({ message: `Warehouse with ID ${req.params.id} not found` });
        }
    
        res.sendStatus(204);
      } catch (error) {
        res.status(500).json({
          message: `Unable to delete warehouse: ${error}`
        });
      }
}

const add = async (req, res) => {
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
                message: `Unable to add warehouse information due to incomplete data`
            });
        }

        if (phoneValidation() === false) {
            return res.status(400).json({
                message: `Unsuccessful add. Please input contact phone in the format: +1 (###) ###-####`
            });
        }

        if (emailValidation() === false) {
            return res.status(400).json({
                message: `Unsuccessful add. Please input contact email in the format: example@mail.com`
            });
        }

        const addedWarehouse = await knex("warehouses").insert(req.body);

        const newWarehouse = addedWarehouse[0];
        const createdWarehouse = await knex("warehouses").where({id: newWarehouse});

        res.status(201).json(createdWarehouse);
        } catch (error) {
        res.status(500).json({
            message: `Unable to add data for warehouse with id:${req.params.id}`
        });
    }
}

export {
    index,
    findOne,
    update,
    remove,
    add
}