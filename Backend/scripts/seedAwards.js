const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Award = require('../models/Award');
const awardsData = require('../data/awards');

const seedAwards = async () => {
    try {
        // Connect to database
        await connectDB();

        // Clear existing data
        await Award.deleteMany();
        console.log('Awards cleared');

        // Insert new data
        await Award.insertMany(awardsData);
        console.log('Awards seeded successfully');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAwards();
