// for hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;
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

//  model for testing auth
//  postgres -D /usr/local/var/postgres  <= for strating postgresql
const Sequelize = require('sequelize');
const sequelize = new Sequelize('cheapeats', '', '', {
  host: 'localhost',
  dialect: 'postgres',  
});
const Owner = sequelize.define('owner', {
  login: {type: Sequelize.STRING(30), unique: true},
  password: Sequelize.STRING(60)
}, {
  timestamps: false,
});
sequelize.sync();


const LocalStrategy = require('passport-local').Strategy;
const auth = (app,passport) => {

  passport.serializeUser((user, done) => {
    console.log('serializeUser user:', user.id);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserializeUser id:', id)
    Owner.findAll({where: {id: id}})
      .then( user => {
        done(null, user[0]);
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
    Owner.findAll({where: {login: login}})
      .then(owners => {
        if(owners.length !== 0) {
          throw new Error('signup: duplicate username!');

        } else {
          return genHash(password);
        }
      }).then(hash => {
        return Owner.create({ login: login, password: hash });
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
    Owner.findAll({ where: {login: login} })
      .then( owners => { 
        console.log(`login: ${login}, password: ${password}`);
        // console.log('inside findall owner login',owners);
        if (owners.length === 0) {
          console.log('Incorrect Username');
          return done(null, false); // Incorrect username.
        } else  {
          validPassword(password, owners[0].password)
            .then(valid => {
              if(valid) {
                console.log('username and password match');
                return done(null, owners[0]);    
              } else {
                console.log('Incorrect Password');
                return done(null, false); // Incorrect password.    
              }
            }).catch(err => {
              return done(err);
            });
        }
      });
    }
  ));

};




module.exports = auth;
