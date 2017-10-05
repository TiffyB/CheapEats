const cheapitemsRoutes = (app) =>{

  app.get('/cheapitems', (req, res) => {
    console.log('list cheapitems');
    // query cheap items table and get 25 items  (how should we sort?)
    // res.send(cheapitems);
    res.send('ok');
  });

  app.get('/cheapitems/:zip', (req, res) => {
    console.log(`get cheap items at ${req.params.zip}`);
    // query cheap items table with ZIP and get 25 items  (how should we sort?)
    // res.send(cheapitems)
    res.send('ok');
  });

  app.get('/cheapitems/:zip/:cuisineType', (req, res) => {
    console.log(`get cheap items at ${req.params.zip} and type ${req.params.cuisineType}`);
    // query cheap items table with ZIP and cuisineType, and get 25 items  (how should we sort?)
    // res.send(cheapitems);
    res.send('ok');
  });


}

module.exports = cheapitemsRoutes;