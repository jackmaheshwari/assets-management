import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Employee } from '../models/Employee.js';
import { Hardware } from '../models/Hardware.js';
import { Software } from '../models/Software.js';
import { NonITAsset } from '../models/NonITAsset.js';
import { Ticket } from '../models/Ticket.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/assets-management';

const employees = [
    { name: "John Doe", username: "jdoe", email: "john.doe@example.com", password: "password123", workload: "High", status: "Active" },
    { name: "Jane Smith", username: "jsmith", email: "jane.smith@example.com", password: "password123", workload: "Medium", status: "Active" },
    { name: "Robert Wilson", username: "rwilson", email: "robert.wilson@example.com", password: "password123", workload: "Low", status: "Active" },
    { name: "Sarah Connor", username: "sconnor", email: "sarah.connor@example.com", password: "password123", workload: "High", status: "Active" },
    { name: "Michael Scott", username: "mscott", email: "michael.scott@example.com", password: "password123", workload: "Medium", status: "Active" },
];

const hardware = [
    { assetId: "AST-1", name: "MacBook Pro 16", status: "Active", assignee: "John Doe", purchaseDate: "2023-01-15", manufacturer: "Apple", modelName: "MacBook Pro", modelNumber: "A2780", serialNumber: "C02XYZ123", macAddress: "00:1A:2B:3C:4D:5E", ipAddress: "192.168.1.101" },
    { assetId: "AST-2", name: "Dell XPS 15", status: "Available", assignee: "-", purchaseDate: "2023-03-10", manufacturer: "Dell", modelName: "XPS 15", modelNumber: "9520", serialNumber: "DL123456", macAddress: "00:11:22:33:44:55", ipAddress: "192.168.1.102" },
    { assetId: "AST-3", name: "HP LaserJet Pro", status: "In Repair", assignee: "Office 3F", purchaseDate: "2022-11-05", manufacturer: "HP", modelName: "LaserJet Pro", modelNumber: "M404dn", serialNumber: "HP987654321", macAddress: "AA:BB:CC:DD:EE:FF", ipAddress: "192.168.1.50" },
    { assetId: "AST-4", name: "Lenovo ThinkPad X1", status: "Active", assignee: "Jane Smith", purchaseDate: "2023-06-20", manufacturer: "Lenovo", modelName: "ThinkPad X1 Carbon", modelNumber: "Gen 10", serialNumber: "LV555555", macAddress: "11:22:33:44:55:66", ipAddress: "192.168.1.103" },
    { assetId: "AST-5", name: "iPad Pro 12.9", status: "Active", assignee: "Design Team", purchaseDate: "2023-09-01", manufacturer: "Apple", modelName: "iPad Pro", modelNumber: "A2436", serialNumber: "DMPQ1234", macAddress: "A1:B2:C3:D4:E5:F6", ipAddress: "192.168.1.104" },
];

const software = [
    { name: "Adobe Creative Cloud", version: "5.11.0", publisher: "Adobe", packageName: "adobe-cc", installDate: "2023-01-01", status: "Active", installedMachine: "MacBook Pro 16" },
    { name: "Microsoft 365 Business", version: "16.0.1", publisher: "Microsoft", packageName: "o365-bus", installDate: "2023-01-01", status: "Active", installedMachine: "Dell XPS 15" },
    { name: "JetBrains All Products", version: "2023.2", publisher: "JetBrains", packageName: "jetbrains-toolbox", installDate: "2023-05-15", status: "Active", installedMachine: "Lenovo ThinkPad X1" },
    { name: "Slack", version: "4.36.1", publisher: "Slack Technologies", packageName: "com.slack.slack", installDate: "2023-02-01", status: "Active", installedMachine: "All Machines" },
    { name: "JIRA Cloud", version: "N/A", publisher: "Atlassian", packageName: "web-app", installDate: "2023-03-01", status: "Active", installedMachine: "MacBook Pro 16" },
];

const nonITAssets = [
    { assetId: "AST-N1", name: "Ergonomic Chair", status: "Active", assignee: "John Doe", purchaseDate: "2022-08-15" },
    { assetId: "AST-N2", name: "Standing Desk", status: "Active", assignee: "Jane Smith", purchaseDate: "2023-01-20" },
    { assetId: "AST-N3", name: "Meeting Room Table", status: "Active", assignee: "Conference A", purchaseDate: "2021-06-10" },
    { assetId: "AST-N4", name: "Whiteboard", status: "Active", assignee: "Meeting Room B", purchaseDate: "2021-07-01" },
    { assetId: "AST-N5", name: "Office Sofa", status: "Retired", assignee: "Lobby", purchaseDate: "2020-03-15" },
];

const tickets = [
    { title: "Screen Flickering", description: "My MacBook screen flickers randomly.", status: "Open", priority: "High", category: "Hardware", raisedBy: "John Doe", assetName: "MacBook Pro 16" },
    { title: "Adobe CC Activation", description: "Cannot activate Adobe CC license.", status: "In Progress", priority: "Medium", category: "Software", raisedBy: "Jane Smith", assetName: "Adobe Creative Cloud" },
    { title: "Printer Connectivity", description: "Unable to connect to HP LaserJet.", status: "Open", priority: "Medium", category: "Hardware", raisedBy: "Robert Wilson", assetName: "HP LaserJet Pro" },
    { title: "Slack Desktop App Crash", description: "Slack app crashes on startup.", status: "Resolved", priority: "Low", category: "Software", raisedBy: "Sarah Connor", assetName: "Slack" },
    { title: "Keyboard Keys Sticking", description: "Several keys on the Lenovo ThinkPad are not responding.", status: "Open", priority: "Medium", category: "Hardware", raisedBy: "Michael Scott", assetName: "Lenovo ThinkPad X1" },
    { title: "VPN Connection Issue", description: "Cannot connect to the corporate VPN from home.", status: "Open", priority: "High", category: "Software", raisedBy: "Jane Smith", assetName: "Cisco AnyConnect" },
    { title: "Mouse Battery Drain", description: "Wireless mouse battery dies every 2 days.", status: "Resolved", priority: "Low", category: "Hardware", raisedBy: "Robert Wilson", assetName: "Logitech MX Master" },
    { title: "Visual Studio Code Plugins", description: "Extensions are not syncing across devices.", status: "In Progress", priority: "Low", category: "Software", raisedBy: "John Doe", assetName: "VS Code" },
    { title: "Monitor No Signal", description: "The second monitor shows 'No Signal' error.", status: "Open", priority: "High", category: "Hardware", raisedBy: "Sarah Connor", assetName: "Dell 27-inch Monitor" },
];

async function seedDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Employee.deleteMany({});
        await Hardware.deleteMany({});
        await Software.deleteMany({});
        await NonITAsset.deleteMany({});
        await Ticket.deleteMany({});

        // Insert new data
        await Employee.insertMany(employees);
        await Hardware.insertMany(hardware);
        await Software.insertMany(software);
        await NonITAsset.insertMany(nonITAssets);
        await Ticket.insertMany(tickets);

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
