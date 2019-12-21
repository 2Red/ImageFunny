const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const validator = require('express-validator');

const User = require('./models/user');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');

const app = express();

mongoose.connect('mongodb://localhost:27017/ImageFunny', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    User.findOne({ 'username': 'admin' }, function (err, user) {
        if (err) {
            console.log(err);
            return;
        }

        if (user) {
            console.log('Connected!');
            return;
        }

        let userAdmin = new User();
        userAdmin.username = 'admin';
        userAdmin.password = userAdmin.encryptPassword('admin');
        userAdmin.save(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Admin is created!!!');
            return;
        });
    });
}).catch(err => {
    console('Connect failed!');
});

require('./config/passport');

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({ secret: 'mysupersecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

module.exports = app;
