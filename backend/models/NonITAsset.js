import mongoose from 'mongoose';

const nonITAssetSchema = new mongoose.Schema({
    assetId: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, default: 'Active' },
    assignee: String,
    purchaseDate: Date
}, { timestamps: true });

export const NonITAsset = mongoose.model('NonITAsset', nonITAssetSchema);
