/*location data should be inserted through given an address,
then finds the longitude and latitude through a call to google maps
if the address appears fucked up, will throw an error
*/

var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
    address: {type: String, required: true, unique: true},
    longitude: Number,
    latitude: Number,
    upvotes: {type: Number, default: 0}
});

mongoose.model('Location', LocationSchema);