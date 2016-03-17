var wait = 1;
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
var google_pings=[];

var findTimes = function(db, callback) {
    var cursor = db.collection('mbp').find( ).sort({"timestamp": -1}).limit(100);
   docs = [];
    cursor.each(function(err,doc) {
                assert.equal(err,null);
                //process.stdout.write("mongoing\n");
                if ( doc != null) {
                docs.unshift(doc);
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


/* do the mongo */
router.get('/times', function(req, res) {
    keith="driver";
    req.client.connect(url,function(err,db){
      assert.equal(err, null);
      findTimes(db,function() {
                        db.close();
                        var len = docs.length;
			google_pings=[];
			plus_pings=[];
			apple_pings=[];
			plus_rates=[];
			bradbury_rates=[];
			imac_rates=[];
                        scale=1000;
			the_time=docs[0].timestamp;
                        for ( var i = 0 ; i < len ; i++ ) {
                           google_pings.push(docs[i].google_ping);
                           plus_pings.push(docs[i].plus_ping);
                           apple_pings.push(docs[i].apple_ping);
			   plus_rates.push(docs[i].plus_rate/scale);
			   bradbury_rates.push(docs[i].bradbury_rate/scale);
			   imac_rates.push(docs[i].imac_rate/scale);
                        }
                           options= {
				"time_list" : docs,
                                "gpings"    : google_pings,
                                "apings"    : apple_pings,
                                "ppings"    : plus_pings,
                                "b_rates"    : bradbury_rates
                           };

			   res.render('times', options );
                    });
	});
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
