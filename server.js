// src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import instock_routes from './routes/instock_routes.js';
// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
//parse data
app.use(express.json());

// Routes
app.use('/data', instock_routes);

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