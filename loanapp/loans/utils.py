def calculate_monthly_payment(principal, annual_rate, term_months):
    monthly_rate = (annual_rate / 100) / 12
    if monthly_rate == 0:
        return principal / term_months
    return (principal * monthly_rate) / (1 - (1 + monthly_rate) ** -term_months)
