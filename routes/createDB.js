var express = require('express');
var router = express.Router();
var tapApi = require("tap-telco-api")

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET users listing. */
router.get('/', function(req, res, next) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("unique");
        // dbo.createCollection("users_table", function(err, res) {
        //     if (err) throw err;
        //     db.close();
        // });
        // dbo.createCollection("subscription_table", function(err, res) {
        //     if (err) throw err;
        //     db.close();
        // });
        // dbo.createCollection("msg_table", function(err, res) {
        //     if (err) throw err;
        //     db.close();
        // });
        dbo.createCollection("id_table", function(err, res) {
            if (err) throw err;
            db.close();
        });
        dbo.createCollection("status_table", function(err, res) {
            if (err) throw err;
            db.close();
        });
        dbo.createCollection("qr_table", function(err, res) {
            if (err) throw err;
            db.close();
        });

        //adding data
        var myobj = [
            { "msg_from" : "tadhack", "msg_to" : "gihan", "msg_body" : "promotion 1" },
            { "msg_from" : "dialog", "msg_to" : "gihan", "msg_body" : "promotion 1" },
            { "msg_from" : "tadhack", "msg_to" : "gihan", "msg_body" : null, "msg_date" : "2018-10-13T16:43:39.989Z" },
            { "msg_from" : "tadhack", "msg_to" : "gihan", "msg_body" : null, "msg_date" : "2018-10-13T16:45:55.447Z" },
            { "msg_from" : "tadhack", "msg_to" : "gihan", "msg_body" : null, "msg_date" : "2018-10-13T16:50:08.034Z" },
            { "msg_from" : "tadhack", "msg_to" : "gihan", "msg_body" : "send your data", "msg_date" : "2018-10-13T16:51:53.639Z" },
            { "msg_from" : "tadhack", "msg_to" : "gihan", "msg_body" : "msg", "msg_date" : "2018-10-13T17:45:40.873Z" },
            { "msg_from" : "tadhack", "msg_to" : "gihan", "msg_body" : "We need your NIC numbers and vehicle registration numbers for security purpose. Please find the attached, fill the details and get back to us ASAP.  \r\n \r\nThanks and Regards,\r\n\r\nM. S. M. Siyas\r\n", "msg_date" : "2018-10-14T02:09:15.574Z" }
        ]
        dbo.collection("msg_table").insertMany(myobj, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });

        var myobj2 = [
            { "user_email" : "tadHack@dialog.lk", "user_phoneNo" : "0774561237", "user_Password" : "123", "user_type" : "company", "user_name" : "TADHack" },
            { "user_email" : "slid@ac.lk", "user_phoneNo" : "0774561248", "user_Password" : "123", "user_type" : "company", "user_name" : "SLID" },
            { "user_email" : "pera@pdn.ac..lk", "user_phoneNo" : "0774545454", "user_Password" : "123", "user_type" : "company", "user_name" : "PeradeniyaUni" }
        ]
        dbo.collection("users_table").insertMany(myobj2, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });

        var myobj3 = [
            {"subscription_company" : "tadHack@dialog.lk", "subscription_by" : "shehan"},
            {"subscription_company" : "tadHack@dialog.lk", "subscription_by" : "gihan"},
            {"subscription_company" : "tadHack@dialog.lk", "subscription_by" : "geeth"},
            {"subscription_company" : "tadHack@dialog.lk", "subscription_by" : "hassana"},
            {"subscription_company" : "tadHack@dialog.lk", "subscription_by" : "Prabath"}
        ]
        dbo.collection("subscription_table").insertMany(myobj3, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });

        var myobj4 = [
            {"user_email" : "tadHack@dialog.lk", "pwd" : "123456" }
        ]
        dbo.collection("qr_table").insertMany(myobj4, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
        console.log("Database Created");
    });
    res.render('createDB', { title: 'Creating Database'});
})

//db.dropDatabase() -- drop database

module.exports = router;