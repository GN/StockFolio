var express = require('express');
var router = express.Router();
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
        owner: req.body.customerEmail,
        symbol: req.body.ticker,
        quantity: req.body.squantity,
        price: req.body.price
    });
    console.log(newStock);
    newStock.save().then(stock => res.json(stock)).catch(err => console.log(err))
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


router.get('/GetCustomerPortfolio', function (req, res, next) {
    Stock.find({owner: req.query.email}, function(err, stocks){
        return res.json(stocks);
    });

});

router.post('/UpdatePortfolio', function (req, res, next) {

    console.log(req.body.id);

    if(req.body.deleteStock === false){
        Stock.findByIdAndUpdate({_id: req.body.id}, {quantity: req.body.quantity, price: req.body.price}, function (err, updated) {
            console.log(updated);
            return res.json(updated);
        });
    }
    else{
        Stock.findByIdAndDelete({_id: req.body.id}, function (err, del) {
            return res.json(del);
        })
    }
});


router.get('/GetStock', function (req, res, next) {
    Stock.findOne({_id: req.query.id}, (err, stock) => {
        res.send(stock);
    });
});

router.get('/GetCustomerName', function (req, res, next) {
    customer.findOne({email: req.query.email}, function (err, account) {
        return res.json(account.name);
    });
});

module.exports = router;