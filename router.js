const express = require('express');
const passport = require('passport');

const HomeController = require('./controllers/home');
const UserController = require('./controllers/user');
const CodeController = require('./controllers/code');

const requireLogin = function (req, res, next) {
  if (req.user) {
    next()
  } else {
    res. redirect('/login/');
  }
};



module.exports = function(app) {
  const homeRouter = express.Router();
  const userRouter = express.Router();
  const codeRouter = express.Router();


  userRouter.get('/login', UserController.login);
  userRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/code',
    failureRedirect: '/login',
    failureFlash: true
  }));
  userRouter.get('/signup', UserController.signup);
  userRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/code',
    failureRedirect: '/signup',
    failureFlash: true
  }));



homeRouter.get('/', HomeController.home);

codeRouter.get('/', CodeController.list);
codeRouter.get('/form/', CodeController.form);
codeRouter.post('/add', CodeController.add);

app.use('/', homeRouter);
app.use('/', userRouter);
app.use('/code/', codeRouter);







};
