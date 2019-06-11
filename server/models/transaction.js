const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    user: {type: String, required: true},
    paymentMode: {type: String, required: true},
    amount: {type: Number, required: true}
});

module.exports = mongoose.model('Transaction', TransactionSchema);