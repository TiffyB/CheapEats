const cDB = require('../../../database');

const dealsRoutes = (app) =>{

  app.get('/deals', (req, res) => {
    console.log(cDB);
    console.log(cDB.getDeals);
    console.log('get deals');
    // query deals table and get 25 deals
    cDB.getDeals()
      .then(deals => {
        console.log(deals);
        res.send(deals);
      }).catch(err => {
        console.log('GET deals error');
      });
  })

  app.get('/deals/:zip', (req, res) => {
    console.log(`get deals at ${req.params.zip}`);
    // query deals with ZIP table, and get 25 deals
    cDB.getDeals(req.params.zip)
      .then(deals => {
        console.log(deals);
        res.send(deals);
      }).catch(err => {
        console.log('GET deals error');
      });
  });

  app.get('/deals/:zip/:cuisineType', (req, res) => {
    console.log(`get deals at ${req.params.zip} and type ${req.params.cuisineType}`);
    // query deals table with ZIP and cuisineType, and get 25 deals
    cDB.getDeals(req.params.zip, req.params.cuisineType)
      .then(deals => {
        console.log(deals);
        res.send(deals);
      }).catch(err => {
        console.log('GET deals error');
      });
  });

}

module.exports = dealsRoutes;


////////
// list of database query request from server
/*
getDeals(zip = null, cuisineType = null) 
expect to return promise object with list of deals
*/