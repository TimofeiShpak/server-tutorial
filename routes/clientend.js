var express = require('express');
var router = express.Router();
var tapApi = require("tap-telco-api");

var rn = require('random-number'); //random number>>>> npm install random-number
var options = {
    min:  1000
    , max:  9999
    , integer: true
}

//var tadhack = require('./routes/ids/tadhack');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET users listing. */
router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("unique");
        var query = { user_type: "company" };
        dbo.collection("users_table").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.render('clientend', { title: 'client subscribe', "messages" : result, record_no : 1});
        });
    });
    //res.render('clientend', { title: 'Client'});
})

router.get('/tadhack', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("unique");
        var query = {msg_from: "tadhack" , msg_to: "gihan" };
        //var out1 = "",out2 = "";
        dbo.collection("msg_table").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            global.out1 = result;
            //res.render('clientend', { title: 'client subscribe', "messages" : result, record_no : 1});
            //res.render('ids/tadhack', { title: 'tadhack', "messages" : result , "pwd" : 'https://chart.googleapis.com/chart?cht=qr&chl='+'Hello+World'+'&chs=160x160&chld=L|0'});
        });

        var query2 = {user_email : "tadHack@dialog.lk"};
        dbo.collection("qr_table").remove(query2 , function(err, del) {
            if (err) throw err;
            console.log(del);
            db.close();
        });
        var ran = rn(options);
        var insRan = [
            {"user_email" : "tadHack@dialog.lk", "pwd" : ran.toString() }
        ];
        dbo.collection("qr_table").insertMany(insRan, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });

        // dbo.collection("qr_table").find(query2).toArray(function(err, password) {
        //     if (err) throw err;
        //     console.log(password);
        //     db.close();
        //     global.out2 = password[0].pwd;
        //     console.log("password: " + password[0].pwd);
        //     //res.render('clientend', { title: 'client subscribe', "messages" : result, record_no : 1});
        //     //res.render('ids/tadhack', { title: 'tadhack', "messages" : result , "pwd" : 'https://chart.googleapis.com/chart?cht=qr&chl='+'Hello+World'+'&chs=160x160&chld=L|0'});
        // });

        console.log("result: " + global.out1 );
        res.render('ids/tadhack', { title: 'tadhack', "messages" : global.out1 , "pwd" : 'https://chart.googleapis.com/chart?cht=qr&chl='+ran+' '+ 'tadHack@dialog.lk' +'&chs=160x160&chld=L|0'});
    });

})

router.get('/dialog', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("unique");
        var query = {msg_from: "dialog" , msg_to: "gihan" };
        dbo.collection("msg_table").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            //res.render('clientend', { title: 'client subscribe', "messages" : result, record_no : 1});
            res.render('ids/dialog', { title: 'dialog', "messages" : result});
        });
    });

})

module.exports = router;