import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerForm from '../CustomerForm';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, email: 'test@example.com', name: 'John Doe', phone: '1234567890' }),
    })
) as jest.Mock;

describe('CustomerForm Component', () => {
    const setCustomer = jest.fn();
    const setStep = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders customer form correctly', () => {
        render(<CustomerForm setCustomer={setCustomer} setStep={setStep} />);

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    });

    test('handles API errors', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({}),
            })
        );

        render(<CustomerForm setCustomer={setCustomer} setStep={setStep} />);

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });

        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => {
            expect(screen.getByText(/Failed to create or retrieve customer/i)).toBeInTheDocument();
        });
    });
});
