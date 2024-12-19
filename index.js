import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/user-router.js';
import testimonyRouter from './routes/testimony-router.js';

// Connect to database
await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log("Error connecting to database", error));

// Create an express app
const app = express();

// use middlewares
app.use(express.json());
app.use(cors());

// Use routes
app.use(userRouter);
app.use(testimonyRouter);

// Listen for inconming requests
app.listen(7979, () => {
    console.log('App listening on port 7979');  
});