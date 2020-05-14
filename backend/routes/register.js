var express = require('express');
var router = express.Router();
const {customer, manager} = require('../models/users');


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/registerCustomer', function (req, res, next) {
    /**
        name: String,
        email: String,
        password: String,
        managerEmail: String,
        accountType: "customer",
        portfolio: [{type: stock}]
     */
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);

    let newCustomer = new customer({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        managerEmail: req.body.managerEmail,
        accountType: "Customer"
    });

    manager.findOneAndUpdate({email: req.body.managerEmail}, {'$push': {'customers': req.body.email}}, function (err,doc) {
        if(err){
            console.log(err);
        }
        else{
            console.log(doc);
        }
    });

    newCustomer.save().then(user => res.json(user)).catch(err => console.log(err));
});

router.post('/registerManager', function (req, res, next) {
    /**
     name: String,
     email: String,
     password: String,
     customers: [{type: String}],
     accountType: String,
     availableStocks: [{type: Stock.schema}]
     */

    let newManager = new manager({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        accountType: "Manager"
    });

    newManager.save().then(user => res.json(user)).catch(err => console.log(err));
});

module.exports = router;