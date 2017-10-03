const LocalStrategy = require('passport-local').Strategy;

// TODO: require user database

const auth = (app,passport) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // find user in database 
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });


  // passport config
  passport.use(new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username: username }, (err, user) => { // database user redis??
        if (err) { 
          return done(err); 
        } else if (!user) {
          return done(null, false); // Incorrect username.
        }
        if (!user.validPassword(password)) {
          return done(null, false); // Incorrect password.
        }
        return done(null, user);
      });
    }
  ));

};


module.exports = auth;
