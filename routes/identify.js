var yeast = require('yeast');

//npm install is-empty

var express = require('express');
var router = express.Router();
var tapApi = require("tap-telco-api");

// router.get('/',function (req,res) {
//     res.render('index')
// })

var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

var Jimp = require("jimp");
var QrCode = require('qrcode-reader');
//npm install --save jimp

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var empty = require('is-empty');

//npm install --save js-alert
var JSAlert = require("js-alert");

router.post('/fileupload',function (req,res) {
    //if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = 'public/images/ads/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    });

})

router.post('/qr',function (req,res) {

    //console.log("/qr : " + JSON.stringify(req.body.value));

    fs.writeFile('public/images/tmp/qr.jpeg',JSON.stringify(req.body.value), 'base64' , function (err) {
        if (err) throw err;
        console.log('Saved!');
        var buffer = fs.readFileSync('public/images/tmp/qr.jpeg');

        Jimp.read(buffer, function(err, image) {
            if (err) {
                console.error(err);
                // TODO handle error
            }
            var qr = new QrCode();
            qr.callback = function(err, value) {
                if (err) {
                    console.error(err);
                    // TODO handle error
                }
                if(value){
                    console.log(value.result);

                    var res = value.result.split(" ");
                    console.log(res[0]);
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("unique");
                        var query = { user_email: res[1] , pwd: res[0].toString()}
                        dbo.collection("qr_table").find(query).toArray(function(err, result) {
                            if (err) throw err;
                            console.log(result);
                            db.close();
                            if(empty(result)){
                                //JSAlert.alert("Wrong");
                                console.log("Wrong");
                                res.render('identify',{al: "WRONG"});
                            }else{
                                console.log("Correct");
                                //JSAlert.alert("Correct");
                                res.render('identify',{al: "Correct"});
                            }
                        });
                    });
                }
                console.log(value);


            };
            qr.decode(image.bitmap);
        });
    });
    console.log("Test");
    res.render('identify',{al: "Correct"});
})

router.get('/',function (req,res) {
        // res.writeHead(200, {'Content-Type': 'text/html'});
        // res.write('<form action="identify/fileupload" method="post" enctype="multipart/form-data">');
        // res.write('<input type="file" name="filetoupload"><br>');
        // res.write('<input type="submit">');
        // res.write('</form>');
        // return res.end();

    res.render('identify');
})



module.exports = router;