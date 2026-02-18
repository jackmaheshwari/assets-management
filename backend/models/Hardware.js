import mongoose from 'mongoose';

const hardwareSchema = new mongoose.Schema({
    assetId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: String,
    modelName: String,
    modelNumber: String,
    serialNumber: { type: String, unique: true },
    macAddress: String,
    ipAddress: String,
    status: { 
        type: String, 
        enum: ['Active', 'Available', 'In Use', 'In Repair', 'Retired'],
        default: 'Available' 
    },
    assignee: String, // Can be updated to ObjectId ref later if needed
    purchaseDate: Date
}, { timestamps: true });

export const Hardware = mongoose.model('Hardware', hardwareSchema);
