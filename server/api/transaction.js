const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

router.get('/', function (req, res) {
    Transaction.find({}, function (err, transactions) {
        const response = {
            transactions
        };
        res.send(response);
    });
});

router.post('/', function (req, res) {
    const transaction = new Transaction(req.body);

    transaction.save()
        .then(item => {
            res.send({status: true, transaction: item});
        })
        .catch(err => {
            res.status(400).send({status: false});
        });
});

module.exports = router;