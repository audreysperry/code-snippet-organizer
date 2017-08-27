const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('express-flash-messages');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./models/user');
const routes = require('./router');

const app = express();


//confic view and static layout
app.engine('handlebars', exphbs({
  defaultLayout: 'base'
}));
app.set('view engine', 'handlebars');

app.use('/static', express.static('public'));


// passport user auth config

passport.use('local-login', new LocalStrategy(
  {passReqToCallback: true},
  function(req, username, password, done) {
    User.authenticate(username, password, function(err, user) {
      if (err) {
        return done(err)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false, {
          message: "There is no user with that username and password."
        })
      }
    })
  }));

passport.use('local-signup', new LocalStrategy(
  {passReqToCallback: true},
  function(req, username, password, done) {
    User.signup(username, password, function(err, user) {
      if (err) {
        return done(err)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false, {
          message: "There is no user with that username and password."
        });
      }
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//middleware
app.use(bodyParser.urlencoded({
  extended:false
}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Router
routes(app);

var database = process.env.MONGODB_URI || 'mongodb://localhost:27017/codedb';
//connect to the database and start teh server once the connectionis made
mongoose.connect(database);
// mongo.connect(database, () => {
//   app.listen(process.env.PORT || 3000);
// });

app.listen(process.env.PORT || 3000);



module.exports = app;
