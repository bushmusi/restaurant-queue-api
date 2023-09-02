"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbOptions = {
    user: 'hp',
    pass: 'pass',
    authSource: 'admin', // Authentication database (usually 'admin' for the admin database)
};
// Replace 'mydatabase' with your actual database name
const dbURL = 'mongodb://localhost:27017/restaurant';
// Create a function to connect to the database
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect(dbURL, dbOptions);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
exports.default = connectToDatabase;
