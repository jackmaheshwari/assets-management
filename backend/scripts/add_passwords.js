import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Employee } from '../models/Employee.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/assets-management';

async function migratePasswords() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const result = await Employee.updateMany(
            { password: { $exists: false } }, // Find docs without password
            { $set: { password: 'password123' } } // Set default password
        );

        console.log(`Updated ${result.modifiedCount} employees with default password.`);
        process.exit(0);
    } catch (error) {
        console.error('Error migrating passwords:', error);
        process.exit(1);
    }
}

migratePasswords();
