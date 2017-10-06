/*
Install postgreSQL using the following steps:
	1.	Install Homebrew
	2.	Run this command: brew install postgres
	3.	Run this command: "initdb /usr/local/var/postgres"
	4.	Then run this command (fill in version w/ your postgres version): "/usr/local/Cellar/postgresql/<version>/bin/createuser -s postgres" (this creates the user 'postgres' on MAC)
  5.  Start the server: brew services start postgresql
  6.  Create the 'cheapeats' database: createdb cheapeats
  7.  Add database schema to cheapeats database: psql -d cheapeats -f <insert path to schema.sql here>, 
      i.e. "psql -d cheapeats -f schema.sql" if in root directory.
  8.  To view the tables (schema),
      - type: 'psql -U postgres'
      - followed by '\c cheapeats'
      - followed by '\dt'
      - to see all rows in a table: 'SELECT * FROM <tablename>;'
  9.  To drop the database,
      - (may need to run: 'brew services stop postgresql' followed by 'brew services start postgresql' to log all users off 'cheapeats')
      - dropdb cheapeats
*/

var pg = require('pg');
var Promise = require('bluebird');

var config = {
	user: 'postgres',
	password: '',
	database: 'cheapeats'
}
//does a max number of clients need to be added to the config?

var pool = new pg.Pool(config)
// var myClient
// pool.connect(function (err, client, done) {
//   if (err) console.log(err)
//   app.listen(8080, function () { //port to be changed for deployment
//     console.log('listening on 3000')
//   })
//   myClient = client
// })
pool.connect();

/* ===========================================================
The getCheapItems function takes in:
zip (integer): Optional parameter. Pulls all cheapItems in that zip code
cuisineType (string): Optional parameter. If provided, must also provide zip code. Pulls cheapItems that match that cuisine type and zip code.

Output: A promse that resolves to an array of all matching cheap items. (Currently not limiting to 25.)
=========================================================== */
const getCheapItems = (zip, cuisineType) => {
  var query;
  if (zip === undefined && cuisineType === undefined) {
    query = 'SELECT * FROM CheapItems';
  } else if (zip !== undefined && cuisineType === undefined) {
    query = 'SELECT * from cheapitems WHERE yelp_ID IN (SELECT id FROM YelpData WHERE ZIP = ' + zip + ')';
  } else {
    //SELECT * from cheapitems WHERE yelp_ID IN (SELECT id FROM YelpData WHERE ZIP = 94103 AND type LIKE '%Salad%');
    //may need to force cuisineType to lower case
    query = "SELECT * from cheapitems WHERE yelp_ID IN (SELECT id FROM YelpData WHERE ZIP = " + zip + " AND type LIKE '%" + cuisineType +"%')";
  }

	return new Promise(function(resolve, reject) {
		pool.query(query, function(err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		})
	})
}
/* ===========================================================
The getDeals function takes in:
zip (integer): Optional parameter. Pulls all deals in that zip code
cuisineType (string): Optional parameter. If provided, must also provide zip code. Pulls deals that match that cuisine type and zip code.

Output: A promise that resolves to an array of all matching deals. (Currently not limiting to 25.)
=========================================================== */
const getDeals = (zip, cuisineType) => {
  var query;
  if (zip === undefined && cuisineType === undefined) {
    query = 'SELECT * FROM Deals';
  } else if (zip !== undefined && cuisineType === undefined) {
    query = 'SELECT * from Deals WHERE yelp_ID IN (SELECT id FROM YelpData WHERE ZIP = ' + zip + ')';
  } else {
    //SELECT * from cheapitems WHERE yelp_ID IN (SELECT id FROM YelpData WHERE ZIP = 94103 AND type LIKE '%Salad%');
    //may need to force cuisineType to lower case
    query = "SELECT * from Deals WHERE yelp_ID IN (SELECT id FROM YelpData WHERE ZIP = " + zip + " AND type LIKE '%" + cuisineType +"%')";
  }

  return new Promise(function(resolve, reject) {
    pool.query(query, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

/* ===========================================================
The getOwnerById function takes in:
id (integer): unique id for that owner's database row

Output: A promise that resolves to an array containing one object with all the information about that owner. 
=========================================================== */
const getOwnerById = (id) => {

  var query = 'SELECT * FROM Owners WHERE id = ' + id;

  return new Promise(function(resolve, reject) {
    pool.query(query, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

/* ===========================================================
The getOwnerByLogin function takes in:
login (string): the username for that owner

Output: A promise that resolves to an array containing one object with all the information about that owner. 
=========================================================== */
const getOwnerByLogin = (login) => {

  var query = "SELECT * FROM Owners WHERE login = '" + login + "'";

  return new Promise(function(resolve, reject) {
    pool.query(query, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

/* ===========================================================
The saveOwner function takes in:
deal (object): has the following properties {dealName, yelp_ID, description, price, imageURL, startTime, startDate, endTime, endDate}

Output: A promise object resolving to the added row information.
=========================================================== */
const saveOwner = (owner) => {
  var login = owner.login;
  var password = owner.password;

  var query = "INSERT INTO Owners (login, password) VALUES ($1, $2)";
  var values = [login, password];

  return new Promise(function(resolve, reject) {
    pool.query(query, values, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

/* ===========================================================
The saveDeals function takes in:
deal (object): has the following properties {dealName, yelp_ID, description, price, imageURL, startTime, startDate, endTime, endDate}

Output: A promise object resolving to the added row information.
=========================================================== */
const saveDeals = (deal) => {
  var query = "INSERT INTO Deals (yelp_ID, price, dealName, description, imageURL, startTime, startDate, endTime, endDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
  var values = [deal.yelp_ID, deal.price, deal.dealName, deal.description, deal.imageURL, deal.startTime, deal.startDate, deal.endTime, deal.endDate];
  return new Promise(function(resolve, reject) {
    pool.query(query, values, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

/* ===========================================================
The saveCheapItems function takes in:
cheapItem (object): has the following properties {yelp_ID, price, menuItem, imageURL, description}

Output: A promise object resolving to the added row information.
=========================================================== */
const saveCheapItems = (cheapItem) => {
  var query = "INSERT INTO CheapItems (yelp_ID, price, menuItem, imageURL, description) VALUES ($1, $2, $3, $4, $5)";
  var values = [cheapItem.yelp_ID, cheapItem.price, cheapItem.menuItem, cheapItem.imageURL, cheapItem.description];
  return new Promise(function(resolve, reject) {
    pool.query(query, values, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

/* ===========================================================
The saveCheapItems function takes in:
yelpRow (object): has the following properties {yelp_api_ID, address, ZIP, type, imageURL, restaurantURL, name, owner_ID}

Output: A promise object resolving to the added row information.
=========================================================== */
const saveRestaurant = (yelpRow) => {

  var query = "INSERT INTO YelpData (yelp_api_ID, address, ZIP, type, imageURL, restaurantURL, name, owner_ID) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
  //need to figure out how to get owner_ID here
  var values = [yelpRow.yelp_api_ID, yelpRow.address, yelpRow.ZIP, yelpRow.type, yelpRow.imageURL, yelpRow.restaurantURL, yelpRow.name, yelp.owner_ID];
  return new Promise(function(resolve, reject) {
    pool.query(query, values, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}


module.exports = {
	pool: pool,
	getCheapItems: getCheapItems,
  getDeals: getDeals,
  getOwnerById: getOwnerById,
  getOwnerByLogin: getOwnerByLogin,
  saveOwner: saveOwner,
  saveDeals: saveDeals,
  saveCheapItems: saveCheapItems,
  saveRestaurant: saveRestaurant
};