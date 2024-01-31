
from rest_framework import serializers
from .models import *
from accounts.serializers import UserDataSerializer
from rest_framework.parsers import MultiPartParser, FormParser




class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    parser_classes = (MultiPartParser, FormParser)
    productreview = ReviewSerializer(many=True,read_only=True)
    class Meta:
        model =Product
        fields= '__all__'
        
class ProductDetailSerializer(serializers.ModelSerializer):
    productreview = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
        
class CategoryListSerializer(serializers.ModelSerializer):
    # products = ProductSerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields=('id','name', 'products','image')
        
class ShippingAdressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAdress
        fields = '__all__'
        
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentHistory
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderItem
        fields = '__all__'
        
class OrderSerializer(serializers.ModelSerializer):
    user = UserDataSerializer(read_only=True) 
   
    class Meta:
        model = Order
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
        
