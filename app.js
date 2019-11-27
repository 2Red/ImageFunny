const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');

const app = express();

mongoose.connect('mongodb://localhost:27017/ImageFunny', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected!');
}).catch(err => {
    console('Connect failed!');
});

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

module.exports = app;
