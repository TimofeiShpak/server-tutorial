const MongoClient = require("mongodb").MongoClient;
 
// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient("mongodb+srv://admin:Hora1234@cluster0.ouwqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

mongoClient.connect(function(err, client){
 
    if(err){
        return console.log(err);
    }
    // взаимодействие с базой данных
    client.close();
});