var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Location = mongoose.model('Location');


// GET a list of all locations
/*needs to specify a center longitude and latitude,
as well as a radius*/
router.get('/', function(req, res, next) {
	Location.find(function(err, locations) {
		if (err) {
			return next(err);
		}
		res.json(locations);
	});
});

/*POST a new location*/
/*given an address in the body, make a gmaps call to get the 
longitude and latitude of the location*/
router.post('/', function(req, res, next) {
  var location = new Location(req.body);

  location.save(function(err, location){
    if(err){ return next(err); }

    res.json(location);
  });
});

module.exports = router;


