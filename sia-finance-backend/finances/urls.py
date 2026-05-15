from django.urls import path

from .views import (CategoryDetailView, CategoryListCreateView, CategoryDetailView,
                    TransactionListCreateView, TransactionDetailView, DashaboardAnalyticsView, CategoryAnalyticsView, MarketDataView)

urlpatterns = [
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'), 
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    path('transactions/', TransactionListCreateView.as_view(), name='transaction-list-create'),
    path('transactions/<int:pk>/', TransactionDetailView.as_view(), name='transaction-detail'),
    path('dashboard/analytics/', DashaboardAnalyticsView.as_view(), name='dashboard-analytics'),
    path('dashboard/category-analytics/', CategoryAnalyticsView.as_view(), name='category-analytics'),
    path('dashboard/market-data/', MarketDataView.as_view(), name='market-data'),
]