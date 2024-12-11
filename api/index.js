import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/userRoute.js"
import authRouter from "./routes/authRoute.js";

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
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

//Middleware to handle errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

