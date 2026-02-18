import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Added password field
    workload: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
    status: { type: String, default: 'Active' },
    createdAt: { type: Date, default: Date.now }
});

export const Employee = mongoose.model('Employee', employeeSchema);
