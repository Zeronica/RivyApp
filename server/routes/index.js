var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Rivys = mongoose.model('Rivys');


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

/*GET list of rivys*/
router.get('/rivys', function(req, res, next) {
    Rivys.find(function(err, rivys){
        if (err){return next(err);}

        res.json(rivys);
    });
});

/*POST a new rivy*/
router.post('/rivys', function(req, res, next) {
  var rivy = new Rivys(req.body);

  rivy.save(function(err, rivy){
    if(err){ return next(err); }

    res.json(rivy);
  });
});

module.exports = router;
