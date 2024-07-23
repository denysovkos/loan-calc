import React, { useState } from 'react';
import { LoanFormProps } from '../common/types';

const LoanForm: React.FC<LoanFormProps> = ({ customerId, setLoanResult }) => {
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/api/loanoffers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer: customerId,
                    loan_amount: loanAmount,
                    interest_rate: interestRate,
                    loan_term: loanTerm,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create loan offer');
            }

            const data = await response.json();
            setLoanResult(data);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Loan Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="loan_amount" className="block text-sm font-medium text-gray-700">Loan Amount</label>
                    <input
                        id="loan_amount"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="interest_rate" className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
                    <input
                        id="interest_rate"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="loan_term" className="block text-sm font-medium text-gray-700">Loan Term (months)</label>
                    <input
                        id="loan_term"
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(parseInt(e.target.value, 10))}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                {error && <div className="text-red-500 text-xs mb-4">{error}</div>}
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Calculate
                </button>
            </form>
        </div>
    );
};

export default LoanForm;
