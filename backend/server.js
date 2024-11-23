require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter.js');

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Home Haven database'));

app.use('/api-users', userRouter);
//app.use('/api-listings', listingRouter);

app.listen(process.env.BACKEND_PORT, () => console.log('Started Home Haven backend server'));