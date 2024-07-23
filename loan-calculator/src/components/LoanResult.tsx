import React from 'react';
import { LoanResultProps } from '../common/types';

const euroFormatter = Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
});

const LoanResult: React.FC<LoanResultProps> = ({ loanResult }) => {
    console.log('loanResult :>> ', loanResult);
    if (!loanResult) return null;

    return (
        <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg mt-4">
            <h2 className="text-2xl font-bold mb-4">Loan Result</h2>
            <p className="text-lg">Monthly Payment: ${euroFormatter.format(loanResult.monthly_payment)}</p>
        </div>
    );
}

export default LoanResult;
