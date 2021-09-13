var express = require('express');
var router = express.Router();
var tapApi = require("tap-telco-api");

var session = require('express-session');

router.get('/', function(req, res, next) {
    var sess = req.session;
   // console.log(sess.email);
    res.render('companyend', { title: 'Dashboard'});
})

router.get('/dashboard',function (req,res) {
    res.render('index')
})

router.get('/community',function (req,res) {
    res.render('index')
})

router.get('/identify',function (req,res) {
    res.render('index')
})



module.exports = router;
