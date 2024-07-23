# Loan Application

## Overview

This project consists of a backend application built with Django and a frontend application built with React. The Django backend provides APIs for managing customers and loan offers, while the React frontend allows users to input loan details and view the calculated monthly payments.

### Technologies

- **Backend**: Django (Python)
- **Frontend**: React (TypeScript)
- **Database**: SQLite (used by Django)
- **Containerization**: Docker and Docker Compose

## Project Structure

- **Backend**: loanapp (Python)
- **Frontend**: loan-calculator (TypeScript)

## Prerequisites

- Docker
- Docker Compose

## Getting Started

Follow these steps to set up and run both the Django backend and React frontend:

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repo_url>
cd <repo_name>
docker-compose up --build
```

### 2. Access the Applications
- **Django Backend**: Accessible at http://localhost:8000
- **React Frontend**: Accessible at http://localhost:3000

### 3. API Endpoints
#### Customers
POST /customers: Create a new customer.

Request Body:
```json
{
  "email": "string",
  "name": "string",
  "phone": "string"
}
```   
GET /customers/{id}: Retrieve details of a customer.

#### Loan Offers
POST /loanoffers: Create a loan offer for a customer.
Request Body:
```json
{
  "customer_id": "integer",
  "loan_amount": "number",
  "interest_rate": "number",
  "loan_term": "number"
}
```   
Loan Calculation: The backend will compute monthly payments based on the provided loan details using the standard loan amortization formula.