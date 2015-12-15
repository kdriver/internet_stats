var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});


/* GET times page. */
router.get('/times', function(req, res) {
    var db = req.db;
    var collection = db.get('mbp');

    collection.find({},{},function(e,docs){
        res.render('times', {
            "userlist" : docs
        });
    });
});

module.exports = router;
