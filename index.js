import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


// Create an express app
const app = express();

// use middlewares
app.use(express.json());
app.use(cors());

// Listen for inconming requests
app.listen(3000, () => {
    console.log('App listening on port 3000');  
});