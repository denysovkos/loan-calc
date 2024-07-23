import React, { useState } from 'react';
import CustomerForm from './components/CustomerForm';
import LoanForm from './components/LoanForm';
import { LoanResult } from './common/types';

const App: React.FC = () => {
    const [customer, setCustomer] = useState<{ id: number; email: string; name: string, phone: string } | null>(null);
    const [loanResult, setLoanResult] = useState<LoanResult | null>(null);
    const [step, setStep] = useState(1);  // Step 1 for Customer, Step 2 for Loan

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            {step === 1 && (
                <CustomerForm setCustomer={setCustomer} setStep={setStep} />
            )}
            {step === 2 && customer && (
                <LoanForm customerId={customer.id} setLoanResult={setLoanResult} />
            )}
            {loanResult && (
                <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg mt-4">
                    <h2 className="text-xl font-bold mb-4">Loan Calculation Result</h2>
                    <p className="text-lg">Monthly Payment: ${loanResult.monthly_payment}</p>
                </div>
            )}
        </div>
    );
};

export default App;
