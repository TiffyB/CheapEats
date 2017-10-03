const request = require('request');
const config = require('../yelp_config.js');

let getClosestMatches = (term, location) => {

  let options = {
    url: 'https://api.yelp.com/v3/businesses/search',
    qs: { term: term, location: location },
    headers: {
      authorization: `${config.YELP_TOKEN}`
    }
  };
  return new Promise(function(resolve, reject) {
    request.get(options, function(error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    })
  });
}

// Used below code to ensure search is working (should return an array of businesses within response body):
// getClosestMatches('tai kee won ton', 'san jose ca')
// .then((response) => {
//   console.log('Businesses: ', response);
// })
// .catch((error) => {
//   console.log('ERROR: ', error);
// })

let getRestaurantInfo = (yelpId) => {

  let options = {
    url: 'https://api.yelp.com/v3/businesses/' + yelpId,
    headers: {
      authorization: `${config.YELP_TOKEN}`
    }
  };
  return new Promise(function(resolve, reject) {
    request.get(options, function(error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    })
  });
}


module.exports = {
  getClosestMatches: getClosestMatches,
  getRestaurantInfo: getRestaurantInfo
}