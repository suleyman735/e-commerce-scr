
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
        
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentHistory
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    # order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all())
    # order = OrderSerializer(read_only=True)
    # product = ProductSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = '__all__'
        
class OrderSerializer(serializers.ModelSerializer):
    user = UserDataSerializer(read_only=True) 
   
    class Meta:
        model = Order
        # exclude = ('payment_history',)
        fields = '__all__'     
        
class OrderWithPaymentSerializer(serializers.ModelSerializer):
    user = UserDataSerializer(read_only=True)
    payment_history = PaymentSerializer(many=True, read_only=True)
    order = OrderItemSerializer(many=True,read_only=True)

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
        
