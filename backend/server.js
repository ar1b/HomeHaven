require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter.js');
const listingRouter = require('./routes/listingRouter.js');

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Home Haven database'));

app.use('/api-users', userRouter);
app.use('/api-listings', listingRouter);

//temporary to make form to test photo upload

//plain html files have to be put into a folder for static items to be served
app.use( express.static( __dirname + '/photoTest' ));
//app.use( express.static( __dirname + '/routes/photoTest' ));
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/photoTest/testForm.html');
});
app.get('/pic', (req, res) =>{
    res.sendFile(__dirname + '/photoTest/testPhoto.html');
});
//end of temporary stuff

app.listen(process.env.BACKEND_PORT, () => console.log('Started Home Haven backend server'));