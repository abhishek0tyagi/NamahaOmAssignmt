"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv = require("dotenv"); // Fix dotenv import
var bodyParser = require("body-parser");
// import { createConnection } from 'typeorm';
var user_routes_1 = require("./routes/user.routes");
var admin_routes_1 = require("./routes/admin.routes");
var mongoose = require("mongoose");
dotenv.config();
var app = (0, express_1.default)();
app.use(bodyParser.json());
// Connect to the database (TypeORM connection)
// createConnection().then(() => {
//   console.log('Connected to database');
// }).catch((error) => console.log('Database connection error:', error));
mongoose
    .connect(process.env.MONGODB_URL)
    .then(function () { return console.log("MongoDB connected..."); })
    .catch(function (error) { return console.error("MongoDB connection error:", error); });
// Log requests middleware (for skill evaluation)
app.use(function (req, res, next) {
    console.log("[".concat(new Date().toISOString(), "] ").concat(req.method, " ").concat(req.url));
    next();
});
// Routes
app.use('/api', user_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
// Start server
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
