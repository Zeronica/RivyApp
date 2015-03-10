var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Rivy = mongoose.model('Rivy');
var Comment = mongoose.model('Comment');

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

// view all rivys get /rivys
// Add a new rivy post /rivys
// upvote a rivy 
// view comments associated with a rivy
// add a comment to a rivy
// upvote a comment to rivy

// allow access
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/*GET list of rivys*/
router.get('/rivys', function(req, res, next) {
    Rivy.find(function(err, rivys){
        if (err){return next(err);}
        res.json(rivys);
    });
});

/*POST a new rivy*/
router.post('/rivys', function(req, res, next) {
  var rivy = new Rivy(req.body);

  rivy.save(function(err, rivy){
    if(err){ return next(err); }

    res.json(rivy);
  });
});

/*GET a single rivy*/
router.get('/rivys/:rivy', function(req, res) {
  req.rivy.populate('comments', function(err, rivy) {
    if (err) { return next(err); }

    res.json(rivy);
  });
});

/*upvote a single rivy*/
router.post('/rivys/:rivy/upvote', function(req, res, next) {
  req.rivy.upvote(function(err, rivy){
    if (err) { return next(err); }

    res.json(rivy);
  });
});

/*upvote a single comment*/
router.post('/rivys/:rivy/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }

    res.json(comment);
  });
});

/*POST a comment*/
router.post('/rivys/:rivy/comments', function(req, res, next) {
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

/*upvote a comment*/

// /*upvote a single rivy*/
// router.put('/rivys/:rivy/upvote', function(req, res, next) {
//   req.rivy.upvote(function(err, rivy){
//     if (err) { return next(err); }

//     res.json(rivy);
//   });
// });

module.exports = router;
