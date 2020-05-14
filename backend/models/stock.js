var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stockSchema = new Schema({
    symbol: String,
    quantity: Number
});
const stock = mongoose.model('Stock', stockSchema);
module.exports = stock;