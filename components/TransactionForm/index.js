import React, { useState, useContext } from 'react';
import classNames from 'classnames';

import { TransactionContext } from '../../utils/TransactionContextProvider';
import { ADD_TRANSACTION } from '../../utils/actionTypes';

const USERS = ['User 1', 'User 2', 'User 3'];

const PAYMENT_MODES = ['American Express', 'VISA', 'DBS PayLa'];

const isValidAmount = (amount) => {
    let re = /^\d+(\.\d{1,2})?$/;
    return re.test(amount);
};

const TransactionForm = () => {
    const [user, setUser] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [amount, setAmount] = useState(1);
    const [isFormSubmitted, setFormSubmitted] = useState(false);

    const { dispatch } = useContext(TransactionContext);

    const onSave = () => {
        setFormSubmitted(true);
        if (!validateFields()) return;
        saveTransaction({ user, paymentMode, amount });
        setUser('');
        setPaymentMode('');
        setAmount(1);
        setFormSubmitted(false);
    };

    const validateFields = () => {
        return user && paymentMode && isValidAmount(amount);
    };

    const saveTransaction = (data) => {

        fetch('/api/transactions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(json => {
                dispatch({ type: ADD_TRANSACTION, payload: json.transaction })
                console.log("success data", json)
            })
            .catch(error => console.log("post error", error));

    };

    return (
        <div className="container-fluid bg-light p-4">
            <div className="row">
                <div className="col-md-3">
                    {USERS.map((item, index) =>
                        <button
                            onClick={() => setUser(item)} key={`USER_${index}`}
                            className={classNames('btn', 'btn-block', { 'btn-outline-dark': user !== item }, { 'btn-dark': user === item })}>
                            {item}
                        </button>
                    )}
                    {isFormSubmitted && !user && <p className="text-danger font-weight-light small">Select User</p>}
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        {PAYMENT_MODES.map((mode, index) =>
                            <div key={`MODE_${index}`}>
                                <input type="radio" name="paymentMode" value={mode} checked={mode === paymentMode}
                                    onChange={() => setPaymentMode(mode)} /> {mode}
                            </div>
                        )}
                        {isFormSubmitted && !paymentMode &&
                            <p className="text-danger font-weight-light small">Select Payment Mode</p>}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <input type="number" name="amount" value={amount}
                            className={`form-control ${isFormSubmitted && !isValidAmount(amount) ? 'is-invalid' : ''}`}
                            onChange={e => setAmount(e.target.value)} />
                        {isFormSubmitted && !isValidAmount(amount) &&
                            <p className="text-danger font-weight-light small">Enter valid amount</p>}
                    </div>
                </div>
                <div className="col-md-3 text-center">
                    <button className="btn btn-primary" onClick={onSave}>
                        Transfer
                    </button>
                </div>
            </div>
        </div>
    )

};

export default TransactionForm;