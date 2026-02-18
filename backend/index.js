import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Employee } from './models/Employee.js';
import { Hardware } from './models/Hardware.js';
import { Software } from './models/Software.js';
import { NonITAsset } from './models/NonITAsset.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/assets-management';

app.use(cors());
app.use(express.json());

// Basic Routes
app.get('/api/employees', async (req, res) => {
    const data = await Employee.find();
    res.json(data);
});

app.get('/api/hardware', async (req, res) => {
    const data = await Hardware.find();
    res.json(data);
});

app.get('/api/software', async (req, res) => {
    const data = await Software.find();
    res.json(data);
});

app.get('/api/non-it-assets', async (req, res) => {
    const data = await NonITAsset.find();
    res.json(data);
});

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));
