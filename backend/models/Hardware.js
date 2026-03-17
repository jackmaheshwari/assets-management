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
    assignee: String, 
    purchaseDate: Date,
    hostName: String,
    registeredOwner: String,
    systemType: String,
    processors: [String],
    biosVersion: String,
    totalPhysicalMemory: String,
    networkCards: [String],
    hyperVRequirements: {
        vmMonitorModeExtensions: Boolean,
        virtualizationEnabledInFirmware: Boolean,
        secondLevelAddressTranslation: Boolean,
        dataExecutionPreventionAvailable: Boolean
    }
}, { timestamps: true });

export const Hardware = mongoose.model('Hardware', hardwareSchema);
