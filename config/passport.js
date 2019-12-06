const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    });
});

passport.use('local.register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 8 });
    let errors = req.validationErrors();
    if (errors) {
        let messages = [];
        errors.forEach(function (error) {
            messages.push(error);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({ 'username': username }, function (err, user) {
        if (err)
            return done(err);
        if (user)
            return done(null, false, { message: 'Username already in use' });
        let newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            if (err)
                return done(err);
            return done(null, newUser);
        })
    });
}));

passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    let errors = req.validationErrors();
    if (errors) {
        let messages = [];
        errors.forEach(function (error) {
            messages.push(error);
        });
        return done(null, false, { message: messages });
    }
    User.findOne({ 'username': username }, function (err, user) {
        if (err)
            return done(err);
        if (!user || !user.validPassword(password))
            return done(null, false, { message: 'Account or password invalid' });
        return done(null, user);
    });
}));
