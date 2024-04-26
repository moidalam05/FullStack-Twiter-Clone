import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js'
import { connectMongoDB } from './db/connectMongoDB.js';

dotenv.config();
const app = express();

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
    connectMongoDB();
});
