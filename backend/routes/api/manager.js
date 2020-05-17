var express = require('express');
var router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Stock = require('../../models/stock');
const {customer, manager} = require('../../models/users');


router.post('/AddAvailableStock', function (req, res, next) {
    var ticker = req.body.ticker;
    var managerEmail = req.body.email;
    if(ticker !== ""){
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
    }
    else{
        return res.send({error: "not valid stock"});
    }
});

router.post('/RemoveStock', function (req, res, next) {
    var ticker = req.body.ticker;
    var managerEmail = req.body.email;
    if(ticker !== ""){
        manager.findOneAndUpdate({email: managerEmail},  {
            '$pull': {'availableStocks': ticker}
        }, function (err, model) {
            if(err){
                return res.send(err);
            }
            else{
                return res.json(model);
            }
        });
    }
    else{
        return res.send({error: "not valid stock"});
    }
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

router.get('/GetCurrentAvailable', function (req, res, next) {
    manager.findOne({email: req.query.email}, function (err, account) {
        return res.json(account.availableStocks);
    });
});

router.get('/GetCustomers', function (req, res, next) {
    customer.aggregate([
        {
            '$match': {email: req.query.email}
        },
        {
            '$lookup':
                {
                    from: 'users',
                    localField: 'customers',
                    foreignField: 'email',
                    as: 'customerObjects'
                }
        }]).exec((err, cust) => {
        return res.json(cust);
    });
});


module.exports = router;