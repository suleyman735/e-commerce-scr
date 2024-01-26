from django.urls import path,include,re_path
from .views import *


urlpatterns = [
    path('category/',CategoryListAPIView.as_view(), name='category'),
   
  
    path('products/', ProductListView.as_view(), name='product-list'),
    path('orders/', OrderCreateView.as_view(), name='orders'),
    path('order-items/', OrderItemCreateView.as_view(), name='order-items'),
]
    
    # path('products/',getProducts, name='products')
