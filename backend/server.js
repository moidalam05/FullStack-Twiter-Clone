import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import { connectMongoDB } from './db/connectMongoDB.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // to parse json data
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
	connectMongoDB();
});
