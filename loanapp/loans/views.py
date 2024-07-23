from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Customer, LoanOffer
from .serializers import CustomerSerializer, LoanOfferSerializer
from .utils import calculate_monthly_payment

@api_view(['POST'])
def create_customer(request):
    if request.method == 'POST':
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_customer(request, id):
    try:
        customer = Customer.objects.get(pk=id)
    except Customer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CustomerSerializer(customer)
    return Response(serializer.data)

@api_view(['POST'])
def create_loan_offer(request):
    if request.method == 'POST':
        serializer = LoanOfferSerializer(data=request.data)
        if serializer.is_valid():
            customer_id = serializer.validated_data.get('customer').id
            loan_amount = serializer.validated_data.get('loan_amount')
            interest_rate = serializer.validated_data.get('interest_rate')
            loan_term = serializer.validated_data.get('loan_term')

            if loan_term <= 0 or interest_rate <= 0:
                return Response({"error": "Loan term and interest rate must be positive values."},
                                status=status.HTTP_400_BAD_REQUEST)

            monthly_payment = calculate_monthly_payment(loan_amount, interest_rate, loan_term)
            serializer.save()
            return Response({"loan_offer": serializer.data, "monthly_payment": monthly_payment}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
