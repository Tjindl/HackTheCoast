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

        // Generate dummy grants
        const universities = [
            'University of British Columbia',
            'Simon Fraser University',
            'University of Victoria',
            'British Columbia Institute of Technology',
            'University of Northern British Columbia',
            'Thompson Rivers University'
        ];

        const dummyGrants = [];
        universities.forEach(uni => {
            // Generate 15 grants per university
            for (let i = 1; i <= 15; i++) {
                const uniCode = uni.replace(/[^a-zA-Z]/g, '').substring(0, 3).toLowerCase();
                dummyGrants.push({
                    id: `${uniCode}-grant-${Math.random().toString(36).substring(7)}`,
                    name: `${uni} Opportunity Grant ${i}`,
                    type: 'Grant',
                    amount: Math.floor(Math.random() * 4000) + 1000,
                    description: `Financial assistance grant for students attending ${uni}. Based on financial need and academic standing.`,
                    category: 'University Grant',
                    university: uni,
                    eligibility: {
                        citizenshipRequired: ['Canadian Citizen', 'Permanent Resident'],
                        financialNeed: true,
                        minGPA: 2.5
                    },
                    applicationDeadline: 'Rolling',
                    sourceUrl: 'https://financialaid.example.com'
                });
            }
        });

        const allAwards = [...awardsData, ...dummyGrants];

        // Insert new data
        await Award.insertMany(allAwards);
        console.log(`Awards seeded successfully: ${allAwards.length} total (${dummyGrants.length} dummy grants)`);

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAwards();
