// const cDB = require('../../../database');
const cDB = require('../../../database/index.js');

const cheapitemsRoutes = (app) =>{

  app.get('/cheapitems', (req, res) => {
    console.log('list cheapitems', req.body);
    // query cheap items table and get 25 items  (how should we sort?)
    cDB.getCheapItems()
      .then(cheapItems => {
        console.log(cheapItems.rows)
        res.send(cheapItems.rows);
      }).catch(err => {
        console.log('GET cheapitems error!!!\n', err);
        res.redirect('/');
      }); 
  });

  app.get('/cheapitems/:zip', (req, res) => {
    console.log(`get cheap items at ${req.params.zip}`);
    // query cheap items table with ZIP and get 25 items  (how should we sort?)
    cDB.getCheapItems(req.params.zip)
      .then(cheapItems => {
        res.send(cheapItems.rows);
      }).catch(err => {
        console.log('GET cheapitems error!!!\n', err);
        res.redirect('/');
      }); 
  });

  app.get('/cheapitems/:zip/:cuisineType', (req, res) => {
    console.log(`get cheap items at ${req.params.zip} and type ${req.params.cuisineType}`);
    // query cheap items table with ZIP and cuisineType, and get 25 items  (how should we sort?)
    cDB.getCheapItems(req.params.zip, req.params.cuisineType)
      .then(cheapItems => {
        res.send(cheapItems.rows);
      }).catch(err => {
        console.log('GET cheapitems error!!!\n', err);
        res.redirect('/');
      }); 
  });


}

module.exports = cheapitemsRoutes;


//////////////////////
// list of database query request from server
/*
getCheapItems(zip = null, cuisineType = null)
expect to return promise object with list of cheapItems
*/