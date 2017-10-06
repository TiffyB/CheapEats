/*
Install postgreSQL using the following steps:
	1.	Install Homebrew
	2.	brew install postgres
	3.	Run this command: "initdb /usr/local/var/postgres"
	4.	Then run this command: "/usr/local/Cellar/postgresql/<version>/bin/createuser -s postgres" (this creates the user postgres on MAC)
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



// query cheap items table and get 25 items  (how should we sort?)
const getCheapItems = () => {
	return new Promise(function(resolve, reject) {
		pool.query('SELECT * FROM CheapItems', function(err, result) {
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
	getCheapItems: getCheapItems
};