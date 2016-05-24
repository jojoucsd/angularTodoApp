var Post = require('../models/post.js')
, User = require('../models/user.js')
, auth = require('./auth')

module.exports = function(app) {
	app.post('/api/weather', function (req,res) {
		console.log('API Call', req.body)
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=e500ec79dcb6f2880bc5fc1e39bdc10e"; 
		request(url, function (error, response) {
			if (err) {
			    console.log(err) // Show the HTML for the Google homepage. 
			}
			res.send(response);					
		})
	})
}
