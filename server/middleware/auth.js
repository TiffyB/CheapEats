// for hashing
const bcrypt = require('bcrypt');
const saltRounds = 0;
// check if password is valid  
//    return promise object
const validPassword = (password, hash) => {
  return bcrypt.compare(password, hash);
}
// generate hash to store password
//    return promise object
const genHash = password => {
  return bcrypt.hash(password, saltRounds);
}


const LocalStrategy = require('passport-local').Strategy;
const models = require('../../database');


const auth = (app,passport) => {

  passport.serializeUser((user, done) => {
    console.log('serializeUser user:', user.id);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserializeUser id:', id);
    models.getOwnerById(id)
      .then( user => {
        console.log('!!!!! check if result is array: ',user);
        done(null, user); // TODO:   check if it's 
      })
      .catch( err => {
        done(err, null);
      });
  });

  // signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, login, password, done) => {
    console.log('local-signup');
    models.getOwnerByLogin(login)
      .then(owners => {
        console.log('!!!!!!!!!  check result type: ', owners);
        if(owners.length !== 0) {
          throw new Error('signup: duplicate username!');
        } else {
          return genHash(password);
        }
      }).then(hash => {
        return models.saveOwner({login:login, password: hash});
      }).then(newOwner => {
        return done(null, newOwner);
      }).catch(err => {
        console.log('signup error!!!!!!')
        return done(null, false);
      });
  }))

  // login 
  passport.use('local-login', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, login, password, done) => {
    console.log(`local-login login: ${login}, password: ${password}`);
    models.getOwnerByLogin(login)
      .then( owners => { 
        console.log(`login: ${login}, password: ${password}`);
        if (owners.length === 0) {
          console.log('Incorrect Username');
          throw new Error('login: Incorrect Username');
        } else {
          return validPassword(password, owners[0].password)
        }
      }).then(valid => {
        if(valid) {
          console.log('username and password match');
          return done(null, owners[0]);
        } else {
          console.log('Incorrect Password');
          throw new Error('Incorrect Password');
        }
      }).catch(err => {
        console.log('login error');
        return done(null, false);
      });
    }
  ));

};


module.exports = auth;
