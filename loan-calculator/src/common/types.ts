export interface LoanOffer {
  customer_id: number;
  loan_amount: number;
  interest_rate: number;
  loan_term: number;
}

export interface LoanResult {
  monthly_payment: number;
}

export interface LoanResultProps {
  loanResult: LoanResult | null;
}

export interface LoanFormProps {
  customerId: number;
  setLoanResult: React.Dispatch<React.SetStateAction<LoanResult | null>>;
}

export interface Customer {
  id: number;
  email: string;
  name: string;
  phone: string;
}

export interface CustomerFormProps {
  setCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
