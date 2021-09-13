'use strict';

var yeast = require('yeast');

var express = require('express');
var router = express.Router();
var tapApi = require("tap-telco-api");
var app = express();

var session = require('express-session');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.get('/',function (req,res) {
    res.render('index')
})

router.post('/login',function (req,res) {
    console.log(req.body.user);
    console.log(req.body.password);
    //res.render('index')
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("unique");
        var query = {user_email: req.body.user , user_Password: req.body.password };
        dbo.collection("users_table").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result[0].user_type);
            app.use(session({
                secret: req.body.user ,
                email:req.body.password,
                resave: false,
                saveUnitialized : true
            }));
            console.log(session.email);
            if(result[0].user_type == 'company'){
                res.render('companyend');
            }else{
                res.render('clientend');
            }
            db.close();
            //res.render('clientend', { title: 'client subscribe', "messages" : result, record_no : 1});
            //res.render('ids/tadhack', { title: 'tadhack', "messages" : result});

        });
    });
})
module.exports = router;