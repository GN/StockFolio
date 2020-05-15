var express = require('express');
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Stock = require('../../models/stock');
const {customer, manager} = require('../../models/users');


router.post('/AddAvailableStock', function (req, res, next) {
    var ticker = req.body.ticker;
    var managerEmail = req.body.email;
    manager.findOneAndUpdate({email: managerEmail},  {
        '$push': {'availableStocks': ticker}
    }, function (err, model) {
        if(err){
            return res.send(err);
        }
        else{
            return res.json(model);
        }
    });
});

router.post('/AddStockToCustomerPortfolio', function (req, res, next) {

    let newStock = new Stock({
        symbol: req.body.ticker,
        quantity: req.body.squantity
    });

    customer.findOneAndUpdate({email: req.body.customerEmail},  {
        '$push': {'portfolio': newStock}
    }, function (err, model) {
        if(err){
            return res.send(err);
        }
        else{
            return res.json(model);
        }
    });
});

module.exports = router;