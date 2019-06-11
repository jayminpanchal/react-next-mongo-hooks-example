import React, {useReducer, useEffect} from 'react';

import {ADD_TRANSACTION, SET_TRANSACTIONS} from './actionTypes';

const initialState = {transactions: [], isLoading: true};
const TransactionContext = React.createContext(initialState);

let reducer = (state, action) => {
    switch (action.type) {
        case SET_TRANSACTIONS:
            return {transactions: action.payload, isLoading: false};
        case ADD_TRANSACTION:
            return {transactions: state.transactions.concat(action.payload)};
        default:
            return initialState;
    }
};

const TransactionProvider = (props) => {
    let [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        fetch('/api/transactions')
            .then(response => response.json())
            .then(jsonResponse => {
                console.log("response", jsonResponse);
                dispatch({type: SET_TRANSACTIONS, payload: jsonResponse.transactions});
            })
            .catch((error) => {
                console.log("error", error);
            });

    }, []);
    return (
        <TransactionContext.Provider value={{state, dispatch}}>
            {props.children}
        </TransactionContext.Provider>
    )
};

export {TransactionContext, TransactionProvider};