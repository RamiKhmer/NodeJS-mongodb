const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id): id;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if(this._id){
      dbOp = db.collection('products')
      .updateOne({_id: this._id}, {$set: this});
    }else{
      dbOp = db.collection('products').insertOne(this);
    }

    return dbOp.then((result) => {
      console.log("Success!");
    }).catch((err) => {
      err ? console.log(err): "";
    });
  }

  static fetchAll(){
    const db = getDb();
    return db.collection('products')
    .find()
    .toArray()
    .then((products) => {
      // console.log(products);
      return products;
    }).catch((err) => {
      err ? console.log(err): "";
    });
  }

  static findById(id){
    const db = getDb();
    return db.collection('products').find({_id: new mongodb.ObjectId(id) })
    .next()
    .then((product) => {
      // console.log("find by ID",product);
      return product;
    }).catch((err) => {
      err ? console.log(err): "";
    });
  }

  static deleteById(id){
    const db = getDb();
    return db.collection('products').deleteOne({_id: new mongodb.ObjectId(id)})
    .then(result => {
      console.log('Deleted');
    })
    .catch(err => {
      err ? console.log(err): "";
    }) 
  }
}

module.exports = Product;