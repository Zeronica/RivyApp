var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: {type: String, required: true},  
  author: {type: String, required: true}, 
  upvotes: {type: Number, default: 0},
  rivy: { type: mongoose.Schema.Types.ObjectId, ref: 'Rivy', required: true }
});

CommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Comment', CommentSchema);