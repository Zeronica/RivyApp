var mongoose = require('mongoose');

var RivySchema = new mongoose.Schema({
    title: String,
    body: String,
    upvotes: {type: Number, default: 0},
  	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

RivySchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Rivy', RivySchema);