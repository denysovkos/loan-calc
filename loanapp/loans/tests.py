from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Customer, LoanOffer

class CustomerTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.valid_customer = {
            'name': 'John Doe',
            'email': 'john.doe@example.com',
            'phone': '1234567890'
        }
        self.invalid_customer = {
            'name': '',
            'email': 'not-an-email',
            'phone': ''
        }

    def test_create_customer(self):
        response = self.client.post(reverse('create_customer'), self.valid_customer, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Customer.objects.count(), 1)
        self.assertEqual(Customer.objects.get(id=response.data['id']).name, 'John Doe')

    def test_create_customer_invalid(self):
        response = self.client.post(reverse('create_customer'), self.invalid_customer, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Customer.objects.count(), 0)

    def test_get_customer(self):
        customer = Customer.objects.create(**self.valid_customer)
        response = self.client.get(reverse('get_customer', kwargs={'id': customer.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], customer.name)

    def test_get_customer_not_found(self):
        response = self.client.get(reverse('get_customer', kwargs={'id': 999}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class LoanOfferTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.customer = Customer.objects.create(name='John Doe', email='john.doe@example.com', phone='1234567890')
        self.valid_loan_offer = {
            'customer': self.customer.id,
            'loan_amount': 10000.00,
            'interest_rate': 5.00,
            'loan_term': 24
        }
        self.invalid_loan_offer = {
            'customer': self.customer.id,
            'loan_amount': 10000.00,
            'interest_rate': -5.00,
            'loan_term': 24
        }

    def test_create_loan_offer(self):
        response = self.client.post(reverse('create_loan_offer'), self.valid_loan_offer, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(LoanOffer.objects.count(), 1)
        self.assertIn('monthly_payment', response.data)

    def test_create_loan_offer_invalid(self):
        response = self.client.post(reverse('create_loan_offer'), self.invalid_loan_offer, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(LoanOffer.objects.count(), 0)
