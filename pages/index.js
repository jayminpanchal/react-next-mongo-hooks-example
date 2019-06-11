import React from 'react';

import '../css/index.css';
import {TransactionProvider} from '../utils/TransactionContextProvider.js';
import TransactionForm from '../components/TransactionForm';
import Transactions from '../components/Transactions';

const App = () => {
    return (
        <TransactionProvider>
            <div className="container">
                <div className="form-container mt-5">
                    <TransactionForm/>
                </div>
                <div className="table-container mt-5">
                    <Transactions/>
                </div>
            </div>
        </TransactionProvider>
    )
};

export default App;