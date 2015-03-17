var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Rivy = mongoose.model('Rivy');
var Comment = mongoose.model('Comment');
var Location = mongoose.model('Location');

// view all rivys get /rivys
// Add a new rivy post /rivys
// upvote a rivy 
// view comments associated with a rivy
// add a comment to a rivy
// upvote a comment to rivy

// pre-loading objects
router.param('rivy', function(req, res, next, id) {
  var query = Rivy.findById(id);

  query.exec(function (err, rivy){
    if (err) { return next(err); }
    if (!rivy) { return next(new Error('can\'t find rivy')); }

    req.rivy = rivy;
    return next();
  });
});

router.param('comment', function(req, res, next, id) {
  console.log(id);
  var query = Comment.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
    return next();
  });
});

router.param('location', function(req, res, next, id) {
  var query = Location.findById(id);

  query.exec(function (err, location) {
    if (err) { return next(err); }
    if (!location) { return next(new Error('can\'t find location')); }

    req.location = location;
    return next();
  });
});


/*GET list of rivys with specified location*/
router.get('/:location', function(req, res, next) {
    Rivy.find({location: req.location}, function(err, rivys){
        if (err){return next(err);}
        res.json(rivys);
    });
});

/*POST a new rivy*/
router.post('/:location', function(req, res, next) {
	req.body.location = req.location;
	
  var rivy = new Rivy(req.body);

  rivy.save(function(err, rivy){
    if(err){ return next(err); }

    res.json(rivy);
  });
});

/*GET a single rivy*/
router.get('/:rivy', function(req, res) {
  req.rivy.populate('comments', function(err, rivy) {
    if (err) { return next(err); }

    res.json(rivy);
  });
});

/*upvote a single rivy*/
router.post('/:rivy/upvote', function(req, res, next) {
  req.rivy.upvote(function(err, rivy){
    if (err) { return next(err); }

    res.json(rivy);
  });
});

/*upvote a single comment*/
router.post('/:rivy/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }

    res.json(comment);
  });
});

/*POST a comment*/
router.post('/:rivy/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.rivy = req.rivy;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.rivy.comments.push(comment);
    req.rivy.save(function(err, rivy) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

module.exports = router;

