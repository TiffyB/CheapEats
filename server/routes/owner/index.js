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

  app.get('/owner', isLoggedIn,  (req, res, next) => { // TODO: putback isLoggedIn
    // isLoggedIn,
    // should display owner page
    console.log('GET owner');

    res.sendFile(path.join(__dirname, '../../../client/app/owner/owner.html'));
  });

  app.get('/login', (req, res, next) => {
    // should display owenr login page
    console.log('GET owner/login');
    res.sendFile(path.join(__dirname, '../../../client/public/login.html'));
  });

  app.post('/owner/login', 
    passport.authenticate('local-login', {
      successRedirect: '/owner',
      failureRedirect: '/login',
      session: true,
    })
  );

  app.get('/owner/logout', isLoggedIn, (req, res) => {
    console.log('GET owner/logout', req.user);
    req.logout();
    // res.send('logout');
    res.redirect('/login');
  });


  // TODO: implement signup
  app.get('/owner/signup', (req, res, next) => {
    // should display owner signup page
    console.log('GET owner/signup');
    res.send('GET owner/signup');
  });

  // TODO: implement signup
  app.post('/owner/signup', 
    passport.authenticate('local-signup', {
      successRedirect: '/owner',
      failureRedirect: '/signup',
      session: true,
    })
  );


  app.get('/owner/restaurants', isLoggedIn, (req, res, next) => {
    // get owner restaurants from server
    console.log('get owner/restaurants of', req.query);
    res.send([
      {name:'Restaurant1', address:'123 S. Market st.', ZIP: 12345, type: 'American', imageURL:'', restaurantURL:'', YelpID:''},
      {name:'Restaurant2', address:'456 N. Mission ave.', ZIP: 67890, type: 'Indian', imageURL:'', restaurantURL:'', YelpID:''}
    ]);
  });
  app.post('/owner/restaurants', isLoggedIn, (req, res, next) => {
    console.log('post owner restaurants', req.body);
    res.send('ok');
  });

  app.get('/owner/deals', isLoggedIn, (req, res, next) => {
    // get owner restaurants from server
    console.log('get owner/deals of', req.query)
    res.send([
      {name:'Deal1', price:1.11, description:'hello', imageURL:'', startTime:undefined, startDate:undefined, endDate:undefined, endTime:undefined},
      {name:'Deal2', price:0.11, description:'hi', imageURL:'', startTime:undefined, startDate:undefined, endDate:undefined, endTime:undefined},
      {name:'Deal3', price:2.13, description:'good', imageURL:'', startTime:undefined, startDate:undefined, endDate:undefined, endTime:undefined},
      {name:'Deal4', price:4.56, description:'bye', imageURL:'', startTime:undefined, startDate:undefined, endDate:undefined, endTime:undefined}
    ]);
  });
  app.post('/owner/deals', isLoggedIn, (req, res) => {
    console.log('post owner deals', req.body);

    res.send('ok');
  });
  app.get('/owner/cheapitems', isLoggedIn, (req, res, next) => {
    // get owner restaurants from server
    console.log('get owner/cheapitems of', req.query)
    res.send([
      {name:'item1', price:99.99, description:'expensive', imageURL:''},
      {name:'item2', price:0.01, description:'cheap', imageURL:''},
      {name:'item3', price:0.09, description:'a bit less expensive', imageURL:''},
    ]);
  });

  app.post('/owner/cheapItems', isLoggedIn, (req, res) => {
    console.log('post owner cheapitems', req.body);
    res.send('ok');
  });


}

module.exports = ownerRoutes;



