var mongoose = require('mongoose');

var RivySchema = new mongoose.Schema({
    title: String,
    body: String
});

mongoose.model('Rivys', RivySchema);