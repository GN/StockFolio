var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stockSchema = new Schema({
    owner: String,
    symbol: String,
    quantity: Number,
    price: Number
});
const stock = mongoose.model('Stock', stockSchema);
module.exports = stock;