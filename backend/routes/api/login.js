var express = require('express');
var router = express.Router();
const {customer, manager} = require('../../models/users');
var jwt = require('jsonwebtoken');


router.post('/', function (req, res, next) {
    console.log(req.body.email);
    console.log(req.body.password);

    customer.findOne({email: req.body.email}, function (err, user) {
        if(user) {
            if (user.password === req.body.password) {
                const payload = {
                    name: user.name,
                    email: user.email,
                    accountType: user.accountType
                };

                jwt.sign(payload, "MyDopeSecretKey", {expiresIn: 31556926}, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                });
            } else {
                return res.status(400).json({error: "something went really wrong!"});
            }
        }
    });
});

module.exports = router;