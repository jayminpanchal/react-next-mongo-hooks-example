import React, { useContext, useState } from 'react';

import { TransactionContext } from '../../utils/TransactionContextProvider';

const COLUMNS = [
    { key: '_id', label: 'ID' },
    { key: 'user', label: 'User' },
    { key: 'paymentMode', label: 'Payment Mode' },
    { key: 'amount', label: 'Amount' },
];

const Transactions = () => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const { state } = useContext(TransactionContext);

    const totalPages = Math.floor((state.transactions.length + rowsPerPage - 1) / rowsPerPage);
    const transactions = state.transactions.slice((currentPage - 1) * rowsPerPage, (currentPage * rowsPerPage));
    console.log("total", totalPages, currentPage);

    const paginationItems = [];
    for (let i = 0; i < totalPages; i++) {
        paginationItems.push(
            <li class="page-item">
                <button class="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
            </li>
        )
    }

    return (
        <div className="container-fluid bg-light p-4">
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                {COLUMNS.map((column) =>
                                    <th key={`COLUMN_${column.key}`}>{column.label}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((row, index) =>
                                <tr key={`ROW_${index}`}>
                                    {COLUMNS.map((column) =>
                                        <td key={`ROW_${index}_${column.key}`}>{row[column.key]}</td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Rows Per Page:</label>
                        <select className="form-controle" value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)}>
                            <option value={10}>10</option>
                            <option value={10}>25</option>
                            <option value={10}>50</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-8">
                    <nav aria-label="Page navigation">
                        <ul class="pagination" style={{ justifyContent: 'flex-end' }}>
                            <li class="page-item">
                                <button class="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                    Previous
                                </button>
                            </li>
                            {paginationItems}
                            <li class="page-item">
                                <button class="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
};

export default Transactions;