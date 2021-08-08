const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb://localhost/test01')
    .then(client=> {
        console.log("MongoDB Connect Success");
        _db = client.db();
        callback();
    }).catch(err => err? console.log(err): "");
}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw "No Database Found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;