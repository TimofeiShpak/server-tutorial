var yeast = require('yeast');

const util = require('util');

var express = require('express');
var router = express.Router();
var tapApi = require("tap-telco-api");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET users listing. */
router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("unique");
        var query = { subscription_company: "tadHack@dialog.lk" };
        dbo.collection("subscription_table").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.render('subscription', { title: 'subscription', "messages" : result, record_no : 1});
        });
    });
    //res.render('subscription' , { title: 'subscriptions'})
})

module.exports = router;