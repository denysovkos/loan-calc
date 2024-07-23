from django.urls import path
from . import views

urlpatterns = [
    path('customers', views.create_customer, name='create_customer'),
    path('customers/<int:id>', views.get_customer, name='get_customer'),
    path('loanoffers', views.create_loan_offer, name='create_loan_offer'),
]
