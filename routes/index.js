var express = require('express');
var router = express.Router();
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
var docs = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

var docs=[];

var findTimes = function(db, callback) {
    var cursor = db.collection('mbp').find( ).sort({"_id":-1}).limit(10);
   docs = [];
    cursor.each(function(err,doc) {
                assert.equal(err,null);
                //process.stdout.write("mongoing\n");
                if ( doc != null) {
                docs.push(doc);
                }
                else
                {
                process.stdout.write("total docs read " + docs.length );
                process.stdout.write("\nstopped mongoing\n");
                process.stdout.write(JSON.stringify(docs[0],null,4));
                    callback();
                }
              
                
                });
};

//   var cnt = db.collection('mbp').count();
//    var cursor = db.collection('mbp').find();
//process.stdout.write("mongoing count " + cnt  + "\n");
//	console.log(cnt);

/* do the mongo */
router.get('/times', function(req, res) {
    keith="driver";
    req.client.connect(url,function(err,db){
      assert.equal(err, null);
      findTimes(db,function() {
                        db.close();
                    });
	});
    process.stdout.write("render it " + docs.length + "\n");
	
           res.render('times', { "time_list" : docs , "number" : 1} );

//    res.render('times', { title: 'times' });
});

/* GET times page. 
router.get('/times', function(req, res) {
    var db = req.db;
    var collection = db.get('mbp');

    collection.find({},{},function(e,docs){
        res.render('times', {
            "userlist" : docs
        });
    });
});
*/

module.exports = router;
