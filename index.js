// const express = require("express");
// const MongoClient = require("mongodb").MongoClient;
// const objectId = require("mongodb").ObjectId;
   
// const app = express();
// const jsonParser = express.json();
 
// const mongoClient = new MongoClient("mongodb+srv://admin:Hora1234@cluster0.ouwqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
 
// let dbClient;
 
// app.use(express.static(__dirname + "/public"));
 
// mongoClient.connect(function(err, client){
//     if(err) return console.log(err);
//     dbClient = client;
//     app.locals.collection = client.db("usersdb").collection("users");
//     app.listen(8095, function(){
//         console.log("Сервер ожидает подключения...");
//     });
// });
 
// app.get("/api/users", function(req, res){
        
//     const collection = req.app.locals.collection;
//     collection.find({}).toArray(function(err, users){
         
//         if(err) return console.log(err);
//         res.send(users)
//     });
     
// });
// app.get("/api/users/:id", function(req, res){
        
//     const id = new objectId(req.params.id);
//     const collection = req.app.locals.collection;
//     collection.findOne({_id: id}, function(err, user){
               
//         if(err) return console.log(err);
//         res.send(user);
//     });
// });
   
// app.post("/api/users", jsonParser, function (req, res) {
       
//     if(!req.body) return res.sendStatus(400);
       
//     const userName = req.body.name;
//     const userAge = req.body.age;
//     const user = {name: userName, age: userAge};
       
//     const collection = req.app.locals.collection;
//     collection.insertOne(user, function(err, result){
               
//         if(err) return console.log(err);
//         res.send(user);
//     });
// });
    
// app.delete("/api/users/:id", function(req, res){
        
//     const id = new objectId(req.params.id);
//     const collection = req.app.locals.collection;
//     collection.findOneAndDelete({_id: id}, function(err, result){
               
//         if(err) return console.log(err);    
//         let user = result.value;
//         res.send(user);
//     });
// });
   
// app.put("/api/users", jsonParser, function(req, res){
        
//     if(!req.body) return res.sendStatus(400);
//     const id = new objectId(req.body.id);
//     const userName = req.body.name;
//     const userAge = req.body.age;
       
//     const collection = req.app.locals.collection;
//     collection.findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
//          {returnDocument: "after" },function(err, result){
               
//         if(err) return console.log(err);     
//         const user = result.value;
//         res.send(user);
//     });
// });
 
// // прослушиваем прерывание работы программы (ctrl-c)
// process.on("SIGINT", () => {
//     dbClient.close();
//     process.exit();
// });

const http = require('http');
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
   
const app = express();
const jsonParser = express.json();
 
const mongoClient = new MongoClient("mongodb+srv://admin:Hora1234@cluster0.ouwqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
 
let dbClient;
 
app.use(express.static(__dirname + "/public"));
 
mongoClient.connect(function(err, client){
    if(err) return console.log('err', err);
    dbClient = client;
    app.locals.collection = client.db("usersdb").collection("users");
    app.listen(process.env.DB_PORT || 3001, function(){
        console.log("Сервер ожидает подключения...");
    });
});
 
app.get("/api/users", function(req, res){
        
    const collection = req.app.locals.collection;
    collection.find({}).toArray(function(err, users){
         
        if(err) return console.log(err);
        res.send(users)
    });
     
});
app.get("/api/users/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOne({_id: id}, function(err, user){
               
        if(err) return console.log(err);
        res.send(user);
    });
});
   
app.post("/api/users", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
       
    const userName = req.body.name;
    const userAge = req.body.age;
    const user = {name: userName, age: userAge};
       
    const collection = req.app.locals.collection;
    collection.insertOne(user, function(err, result){
               
        if(err) return console.log(err);
        res.send(user);
    });
});
    
app.delete("/api/users/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({_id: id}, function(err, result){
               
        if(err) return console.log(err);    
        let user = result.value;
        res.send(user);
    });
});
   
app.put("/api/users", jsonParser, function(req, res){
        
    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const userName = req.body.name;
    const userAge = req.body.age;
       
    const collection = req.app.locals.collection;
    collection.findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
         {returnDocument: "after" },function(err, result){
               
        if(err) return console.log(err);     
        const user = result.value;
        res.send(user);
    });
});
 
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});
// const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);