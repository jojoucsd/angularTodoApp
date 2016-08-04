var auth = require('./auth')
, config = require('../config.js')
, request = require('request')

module.exports = function(app) {
	app.post('/api/sportnews', function (req,res) {
		console.log('API Call')
		var url = "https://fantasydata.com/rss/rotoworld/?format=jsonp"; 
		request(url, function (error, response) {
			if (error) {
			    console.log(error) // Show the HTML for the Google homepage. 
			}
			console.log('RSS Sport', response.body)
			res.send(response.body);					
		})
	})
}
