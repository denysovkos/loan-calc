// src/components/LoanForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoanForm from '../LoanForm';

// Mocking fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ monthly_payment: 123.45 }),
    })
) as jest.Mock;

describe('LoanForm Component', () => {
    const setup = (customerId: number) => {
        render(<LoanForm customerId={customerId} setLoanResult={() => {}} />);
    };

    test('renders loan form correctly', () => {
        setup(1);

        expect(screen.getByLabelText(/Loan Amount/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Interest Rate \(%\)/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Loan Term \(months\)/i)).toBeInTheDocument();
    });

    test('handles API errors', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({}),
            })
        );

        setup(1);

        fireEvent.change(screen.getByLabelText(/Loan Amount/i), { target: { value: '10000' } });
        fireEvent.change(screen.getByLabelText(/Interest Rate \(%\)/i), { target: { value: '5' } });
        fireEvent.change(screen.getByLabelText(/Loan Term \(months\)/i), { target: { value: '24' } });

        fireEvent.click(screen.getByText(/Calculate/i));

        await waitFor(() => {
            expect(screen.getByText(/Failed to create loan offer/i)).toBeInTheDocument();
        });
    });
});
