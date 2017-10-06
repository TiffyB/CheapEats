// server
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const auth = require('./middleware/auth.js');
const routes = require('./routes');
// const redis = require('redis').createClient();
// const RedisStore = require('connect-redis')(session);
const db = require('../database/index.js').pool;

const app = express();
const yelp = require('../helpers/yelp.js');

const PORT = process.env.PORT || 8080;
const sessionOpts = {
  saveUninitialized: true,
  resave: false,
  // store: new RedisStore({
  //   host: 'localhost',
  //   port: 6379,
  //   client: redis,
  // }),
  secret: 'albertchristineroscoetiffany',
  cookie: {
    httpOnly: true,     
  },
};

auth(app, passport);

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session(sessionOpts));
app.use((req, res, next) => {
  if (!req.session) {
    return next(new Error('session failed'));
  }
  next();
});
app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);


app.listen(PORT, () => {
  console.log(`server listening on PORT: ${PORT.toString()}`);
});



