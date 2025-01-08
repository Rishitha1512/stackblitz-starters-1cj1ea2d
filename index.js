// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MenuItem = require('./schema');  // Assuming your schema file is called schema.js

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB', err.message));

// POST /menu route
app.post('/menu', async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const menuItem = new MenuItem({ name, description, price });
    await menuItem.save();
    res.status(201).json({
      message: 'Menu item created successfully',
      menuItem
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// GET /menu route
app.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch menu items'
    });
  }
});

// Start the server
PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
