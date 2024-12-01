import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js"
import authRouter from "./routes/authRoute.js"
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to mongoDB");
}).catch((err) => {
    console.log("Error: "+ err)
})

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter );

//Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})