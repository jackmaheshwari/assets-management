import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Employee } from './models/Employee.js';
import { Hardware } from './models/Hardware.js';
import { Software } from './models/Software.js';
import { NonITAsset } from './models/NonITAsset.js';
import { Ticket } from './models/Ticket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/assets-management';

app.use(cors());
app.use(express.json());

// --- Routes ---

// Stats Route
app.get('/api/stats', async (req, res) => {
    try {
        const [hardware, software, nonIT, employees, tickets] = await Promise.all([
            Hardware.countDocuments(),
            Software.countDocuments(),
            NonITAsset.countDocuments(),
            Employee.countDocuments(),
            Ticket.countDocuments()
        ]);

        res.json({
            hardware,
            software,
            nonIT,
            employees,
            tickets,
            total: hardware + software + nonIT
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // In a real app, use bcrypt to compare hashed passwords
        if (employee.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Return user info (excluding password)
        const { password: _, ...userWithoutPassword } = employee.toObject();
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Verify Route
app.post('/api/verify', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(401).json({ message: "User not found" });
        }

        const { password: _, ...userWithoutPassword } = employee.toObject();
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Generic CRUD handler
const createCrudRoutes = (router, Model) => {
    // GET all
    router.get('/', async (req, res) => {
        try {
            const items = await Model.find();
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // POST create
    router.post('/', async (req, res) => {
        const item = new Model(req.body);
        try {
            const newItem = await item.save();
            res.status(201).json(newItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    // PUT update
    router.put('/:id', async (req, res) => {
        try {
            const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    // DELETE
    router.delete('/:id', async (req, res) => {
        try {
            await Model.findByIdAndDelete(req.params.id);
            res.json({ message: 'Deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

// Define Routers
const employeeRouter = express.Router();
createCrudRoutes(employeeRouter, Employee);
app.use('/api/employees', employeeRouter);

const hardwareRouter = express.Router();
createCrudRoutes(hardwareRouter, Hardware);
app.use('/api/hardware', hardwareRouter);

const softwareRouter = express.Router();
createCrudRoutes(softwareRouter, Software);
app.use('/api/software', softwareRouter);

const nonITRouter = express.Router();
createCrudRoutes(nonITRouter, NonITAsset);
app.use('/api/non-it-assets', nonITRouter);

const ticketRouter = express.Router();
createCrudRoutes(ticketRouter, Ticket);
app.use('/api/tickets', ticketRouter);

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));
