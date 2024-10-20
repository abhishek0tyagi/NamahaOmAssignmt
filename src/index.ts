import express from 'express';
import * as dotenv from 'dotenv';       // Fix dotenv import
import * as bodyParser from 'body-parser';
// import { createConnection } from 'typeorm';
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';
const mongoose = require("mongoose");


dotenv.config();

const app = express();
app.use(bodyParser.json());

// Connect to the database (TypeORM connection)
// createConnection().then(() => {
//   console.log('Connected to database');
// }).catch((error) => console.log('Database connection error:', error));
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected..."))
  .catch((error:any) => console.error("MongoDB connection error:",error));

// Log requests middleware (for skill evaluation)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api', userRoutes);
app.use('/api/admin', adminRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
