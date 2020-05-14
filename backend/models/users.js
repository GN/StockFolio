var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Stock = require('./stock');

var customerSchema = new Schema({
    name: String,
    email: String,
    password: String,
    managerEmail: String,
    accountType: String,
    portfolio: [Stock.schema]
});


var managerSchema = new Schema({
    name: String,
    email: String,
    password: String,
    customers: [{type: String}],
    accountType: String,
    availableStocks: [{type: String}]
});


const manager = mongoose.model('Manager', managerSchema, 'users');
const customer = mongoose.model('Customer', customerSchema, 'users');
module.exports = {customer, manager};