
from rest_framework import serializers
from .models import *
from accounts.serializers import UserDataSerializer



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model =Product
        fields= '__all__'
        
class CategoryListSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields=('id','name', 'products','image')
        
        
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'
        
        
# class ShippingAddressSerializer(serializers.ModelSerializer):
#     class Meta:
#         model =ShippingAdress
#         fields= '__all__'
        
# class OrderItemsSerializer(serializers.ModelSerializer):
   
#     class Meta:
#         model =OrderItem
#         fields= '__all__'
        
