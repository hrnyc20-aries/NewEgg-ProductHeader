const mongoose = require('mongoose');
// const performance = require('perf_hooks');

mongoose.connect('mongodb://test:A12345@ds351455.mlab.com:51455/product_header')

let db = mongoose.connection

db.on('error', () => console.log('cant connect to mongoDB'))
db.on('open', () => console.log('connected to mongoDB')) 

let productSchema = mongoose.Schema({
    id: {type: Number, unique: true, index: true},
    name: String,
    itemNumber: {type: Number, unique: true},
    reviewRate: Number,
    reviewNum: Number,
    questionNum: Number,
    answersNum: Number,
    stockAmount: Number,
    sellLimit: Number,
    lowestPrice: Number,
    logoOverlay: String,
    stockStatus: Number,
    sellFrom: String,
    shipOrigin: String,
    images: Array,
    descriptionBullets: Array,
    categories: Array,
    options: Array    
})

let Product = mongoose.model('Product', productSchema)

let getProduct = (id) => {
    return Product.find({id:id}).exec()
}

module.exports.getProduct = getProduct
module.exports.Product = Product
