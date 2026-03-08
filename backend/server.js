require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);

// Database Connection
// Suppress deprecation warnings by not passing them (mongoose 6+ handles these automatically)
mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
    .then(() => {
        console.log('MongoDB connected');
    }).catch((error) => {
        console.error('MongoDB connection error:', error.message);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
