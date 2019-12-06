var express = require('express');
var router = express.Router();
// var csrf = require('csurf');
var passport = require('passport');

// var csrfProtection = csrf();
// router.use(csrfProtection);

router.get('/logout', isLoggedIn, function (req, res, next) {
  cons
  req.logout();
  res
    .status(200)
    .json({ message: 'Logout successfully' });
});

router.use('/', notLoggedIn, function (req, res, next) {
  next();
});

router.post('/register', passport.authenticate('local.register', function (req, res) {
  res
    .status(200)
    .json(res.user);
}));

// router.post('/login', function (req, res, next) {
//   passport.authenticate('local.login', function (err, user, info) {
//     // res: false -> error
//     console.log('aaa');
//     if (info) {
//       console.log(info);
//       return res
//         .status(201)
//         .json(info);
//     }
//     console.log(user);
//     return res
//       .status(200)
//       .json(user);
//   })
// });

router.post('/login', function (req, res, next) {
  passport.authenticate('local.login', function (err, user, info) {
    // res: false -> error
    console.log('aaa');
    if (info) {
      console.log(info);
      return res
        .status(201)
        .json(info);
    }
    console.log(user);
    return res
      .status(200)
      .json(user);
  })(req, res, next);
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}