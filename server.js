// src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import warehousesRoutes from './routes/warehouses-routes.js';
import inventoriesRoutes from './routes/inventories-routes.js'
// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Warehouses Routes
app.use('/warehouses', warehousesRoutes);
app.use('/inventories', inventoriesRoutes);
// Basic API route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Press CTRL + C to stop server');
});