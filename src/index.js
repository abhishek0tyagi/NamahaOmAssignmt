import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Connect to the database (TypeORM connection)
createConnection().then(() => {
  console.log('Connected to database');
}).catch((error) => console.log('Database connection error:', error));

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
