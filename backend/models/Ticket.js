import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'], 
        default: 'Open' 
    },
    priority: { 
        type: String, 
        enum: ['Low', 'Medium', 'High', 'Urgent'], 
        default: 'Medium' 
    },
    category: { 
        type: String, 
        enum: ['Hardware', 'Software'], 
        required: true 
    },
    raisedBy: { 
        type: String, 
        required: true 
    },
    assetName: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export const Ticket = mongoose.model('Ticket', ticketSchema);
