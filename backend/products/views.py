from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
# Create your views here.
from rest_framework import generics
from .models import Product
from .serializers import *
from django.shortcuts import get_object_or_404
from django.http import JsonResponse


class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer
    search_fields = ("name",)





class ProductListAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

