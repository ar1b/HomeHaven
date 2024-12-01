import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

//Configuration to utilize environment variables
dotenv.config();

//MongoDB Connection
mongoose
    .connect(process.env.DB_STRING)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err)
    })

//Initiating Express server
const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})