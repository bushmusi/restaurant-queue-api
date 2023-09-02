"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db")); // Import the connectToDatabase function
const User_1 = __importDefault(require("./models/User"));
const app = (0, express_1.default)();
const port = 3001;
// Connect to the database by calling connectToDatabase
(0, db_1.default)().then(() => {
    // Define your routes and controllers here
    app.post('/users', async (req, res) => {
        try {
            const newUser = new User_1.default({
                username: 'john_doe',
                email: 'john@example.com',
            });
            await newUser.save();
            res.json(newUser);
        }
        catch (error) {
            res.status(500).json({ error: 'Error creating user' });
        }
    });
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
