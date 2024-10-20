"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv")); // Fix dotenv import
const bodyParser = __importStar(require("body-parser"));
// import { createConnection } from 'typeorm';
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const mongoose = require("mongoose");
dotenv.config();
const app = (0, express_1.default)();
app.use(bodyParser.json());
// Connect to the database (TypeORM connection)
// createConnection().then(() => {
//   console.log('Connected to database');
// }).catch((error) => console.log('Database connection error:', error));
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected..."))
    .catch((error) => console.error("MongoDB connection error:", error));
// Log requests middleware (for skill evaluation)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
// Routes
app.use('/api', user_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
