const ownerRoutes = require('./owner');
const cheapitemsRoutes = require('./cheapitems');
const dealsRoutes = require('./deals');
const yelp = require('../../helpers/yelp.js');

const routes = (app, passport) => {

  ownerRoutes(app, passport);

  cheapitemsRoutes(app);

  dealsRoutes(app);

  /*================================================================================
  This route will provide users with a list of the closest yelp restaurant 
  matches based on the term and location input.

  The request body query must be an object with the following properties:
  - term (string): name or general description of restaurant (i.e. coffee shop)
  - location (string): a combo of city, state, zip code etc (yelp API is not picky)

  This route will respond with an object that has the property 'businesses'. Businesses
  is an array of the 20 closest matches for the term and location searched on yelp's API.
  ================================================================================*/
  app.get('/find/restaurants', (req, res) => {
    var term = req.query.term;
    var location = req.query.location;
    yelp.getClosestMatches(term, location)
    .then((response) => {
      var body = response.body;
      res.send(body);
    })
    .catch((error) => {
      res.sendStatus(500);
    })
  });

  /*================================================================================
  This route allows a user to add a yelp restaurant to the database based on its 
  yelp id. This 'POST' route is to be used in conjunction with the 'GET' route above.

  The request parameters must contain an object with the following property:
  - yelpId (string): the id for a restaurant in yelp's database
  ================================================================================*/

  app.post('/find/restaurants/:yelpId', (req, res) => {
    var yelpId = req.params.yelpId;
    yelp.getRestaurantInfo(yelpId)
    .then((yelpResponse) => {
      //parse the response from yelp
      restaurantInfo = JSON.parse(yelpResponse.body);
      //pull the cuisine types from the yelp response
      var cuisineTypes = [];
      restaurantInfo.categories.forEach(function(cat) {
        cuisineTypes.push(cat.title);
      })
      //build the object to add to the database
      var yelpRow = {
        yelp_api_ID: restaurantInfo.id,
        name: restaurantInfo.name,
        imageURL: restaurantInfo.image_url,
        type: cuisineTypes.join(', '),
        restaurantURL: restaurantInfo.url,
        ZIP: restaurantInfo.location.zip_code,
        address: restaurantInfo.location.display_address.join('\n')
      }
      //TODO:
      //add the yelpRow object to the yelp table in database


      /*
CREATE TABLE YelpData (
  id INTEGER NOT NULL DEFAULT NEXTVAL ('YelpData_seq'),
  yelp_api_ID VARCHAR(100),
  address TEXT,
  ZIP INTEGER,
  type VARCHAR(25),
  imageURL VARCHAR(50),
  restaurantURL VARCHAR,
  owner_ID INTEGER,
  name VARCHAR(50),
  PRIMARY KEY (id)
);
      */

      res.send(JSON.stringify(yelpRow)); //boilerplate response until integrated with DB
    })
    .catch((error) => {
      res.sendStatus(500);
    })
  });

}

module.exports = routes;
