import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const getAllInventoryItems = async (_req, res) => {
  try {
    const inventoryItems = await knex('inventories')
      .select(
        'inventories.id', 
        'inventories.item_name', 
        'inventories.description', 
        'inventories.category', 
        'inventories.status', 
        'inventories.quantity', 
        'inventories.created_at', 
        'inventories.updated_at',
        'warehouses.warehouse_name'  
      )
      .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id');

    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(400).send(`Error getting inventory items: ${error}`);
  }
};

// Get a single inventory item by ID
export const getInventoryItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const inventoryItem = await knex('inventories')
      .select(
        'inventories.id', 
        'warehouses.warehouse_name',
        'inventories.item_name', 
        'inventories.description', 
        'inventories.category', 
        'inventories.status', 
        'inventories.quantity'
      )
      .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id')
      .where('inventories.id', id)
      .first();

    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found." });
    }

    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(400).send(`Error getting inventory item: ${error}`);
  }
};
