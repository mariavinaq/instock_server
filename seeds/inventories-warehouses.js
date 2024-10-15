//Import seed data files, Arrays of objects
import inventoriesData from "./seed-data/inventories.js";
import warehousesData from "./seed-data/warehouses.js";

export async function seed(knex) {
  // Deletes all existing entries
  await knex('inventories').del();
  await knex('warehouses').del();
  //Insert warehouse and inventory data
  await knex('warehouses').insert(warehousesData);
  await knex('inventories').insert(inventoriesData);
};