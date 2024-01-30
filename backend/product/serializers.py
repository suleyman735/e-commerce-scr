
from rest_framework import serializers
from .models import *
from accounts.serializers import UserDataSerializer
from rest_framework.parsers import MultiPartParser, FormParser




class ProductSerializer(serializers.ModelSerializer):
    parser_classes = (MultiPartParser, FormParser)
    class Meta:
        model =Product
        fields= '__all__'
        
class CategoryListSerializer(serializers.ModelSerializer):
    # products = ProductSerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields=('id','name', 'products','image')
        
        
class OrderItemSerializer(serializers.ModelSerializer):
    # parser_classes = (MultiPartParser, FormParser)
    # product = ProductSerializer(many=True,read_only=True)
    class Meta:
        model = OrderItem
        fields = '__all__'
        


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, required=False)

    # class Meta:
    #     model = Order
    #     fields = ['user', 'taxPrice', 'totalPrice', 'order_items']

    # def create(self, validated_data):
    #     order_items_data = validated_data.pop('order_items', [])
    #     print(order_item_data)

    #     order = Order.objects.create(**validated_data)

    #     for order_item_data in order_items_data:
    #         OrderItem.objects.create(order=order, **order_item_data)

    #     return order

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
        
