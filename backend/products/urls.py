from django.urls import path,include,re_path
from .views import ProductListAPIView,CategoryListAPIView


urlpatterns = [
    path('category/',CategoryListAPIView.as_view(), name='category'),
   
    path('products/',ProductListAPIView.as_view(), name='products'),
    
    # path('products/',getProducts, name='products')

  
]