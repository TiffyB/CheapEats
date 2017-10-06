const path = require('path');

const ownerRoutes = (app, passport) =>{

  const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      console.log('not logged in');
      return res.redirect('/login');
    }
  };


  app.post('/owner/login', 
    passport.authenticate('local-login', {
      successRedirect: '/owner',
      failureRedirect: '/login',
      session: true,
    })
  );

  app.get('/owner/logout', (req, res) => {
    console.log('GET owner/logout', req.user);
    req.logout();
    res.redirect('/owner/login');
  });

  app.post('/owner/signup', 
    passport.authenticate('local-signup', {
      successRedirect: '/owner',
      failureRedirect: '/signup',
      session: true,
    })
  );

  app.get('/owner',  (req, res, next) => {
    // isLoggedIn,
    // should display owner page
    console.log('GET owner');

    res.sendFile(path.join(__dirname, '../../../client/app/owner/owner.html'));
  });

  app.get('/owner/signup', (req, res, next) => {
    // should display owner signup page
    console.log('GET owner/signup');
    res.send('GET owner/signup');
  });

  app.get('/login', (req, res, next) => {
    // should display owenr login page
    console.log('GET owner/login');
    res.sendFile(path.join(__dirname, '../../../client/public/login.html'));
  });

  app.post('/owner/deals', isLoggedIn, (req, res) => {
    console.log('owner post deals');
    res.send('ok');
  });
  app.post('/owner/cheapItems', isLoggedIn, (req, res) => {
    console.log('owner post deals');
    res.send('ok');
  });
}

module.exports = ownerRoutes;