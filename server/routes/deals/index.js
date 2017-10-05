const dealsRoutes = (app) =>{

  app.get('/deals', (req, res) => {
    console.log('get deals');
    // query deals table and get 25 deals
    // res.send(deals)
    res.send('ok');
  })

  app.get('/deals/:zip', (req, res) => {
    console.log(`get deals at ${req.params.zip}`);
    // query deals with ZIP table, and get 25 deals
    // res.send(deals)
    res.send('ok');
  });

  app.get('/deals/:zip/:cuisineType', (req, res) => {
    console.log(`get deals at ${req.params.zip} and type ${req.params.cuisineType}`);
    // query deals table with ZIP and cuisineType, and get 25 deals
    // res.send(deals)
    res.send('ok');
  });

}

module.exports = dealsRoutes;