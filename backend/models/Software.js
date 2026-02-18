import mongoose from 'mongoose';

const softwareSchema = new mongoose.Schema({
    name: { type: String, required: true },
    version: String,
    publisher: String,
    packageName: String,
    installDate: Date,
    status: { type: String, default: 'Active' },
    installedMachine: String // Can be updated to ObjectId ref to Hardware
}, { timestamps: true });

export const Software = mongoose.model('Software', softwareSchema);
