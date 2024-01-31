from django.urls import path,include,re_path
from .views import *


urlpatterns = [
    path('category/',CategoryListAPIView.as_view(), name='category'),
   
  
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('review/', ReviewListView.as_view(), name='review'),

    path('order-items/', OrderItemListCreateView.as_view(), name='order-items'),
    path('orders/', OrderListCreateView.as_view(), name='order-list'),
    path('shipping/', ShippingAdressListCreateView.as_view(), name='shipping'),
    path ('create-checkout-session/<pk>/',CreateCheckOutSession.as_view(), name='checkout-session'),
    path('webhook/',my_webhook_view,name='webhook')

]
    
    # path('products/',getProducts, name='products')
