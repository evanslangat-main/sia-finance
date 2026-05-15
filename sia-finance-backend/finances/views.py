from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum


from .models import (Category, Transaction)

from .serializers import (CategorySerializer, TransactionSerializer)



# Create your views here.

class CategoryListCreateView(generics.ListCreateAPIView):
    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class TransactionListCreateView(generics.ListCreateAPIView):
    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

class DashaboardAnalyticsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user

        #tota incomee
        total_income = Transaction.objects.filter(user=user, type='income').aggregate(total=Sum('amount'))['total'] or 0

        #total expense
        total_expense = Transaction.objects.filter(user=user, type='expense').aggregate(total=Sum('amount'))['total'] or 0

        #net balance
        net_balance = total_income - total_expense

        #recent transactions
        recent_transactions = Transaction.objects.filter(user=user).order_by('-date')[:5]
        recent_transactions_serializer = TransactionSerializer(recent_transactions, many=True).data

        return Response ({
            "total_income" : total_income,
            "total_expenses" : total_expense,
            "net_balance" : net_balance,
            "recent_transactions" : recent_transactions_serializer
        })

class CategoryAnalyticsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        #aggregate expenses by category
        category_expenses = Transaction.objects.filter(user=user, type='expense').values('category__name').annotate(total=Sum('amount')).order_by('-total')

        return Response(category_expenses)