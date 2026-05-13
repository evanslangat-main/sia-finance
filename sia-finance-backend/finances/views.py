from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

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
