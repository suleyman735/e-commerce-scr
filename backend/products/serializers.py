
from rest_framework import serializers
from .models import *



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model =Product
        fields= '__all__'
        
class CategoryListSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields=('id','name', 'products','image')
        
        
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model =ShippingAdress
        fields= '__all__'
        
class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model =OrderItem
        fields= '__all__'
        
class OrderSerializer(serializers.ModelSerializer):
    orders = serializers.SerializerMethodField(read_only =True)
    shippingAddress = serializers.SerializerMethodField(read_only =True)
    user = serializers.SerializerMethodField(read_only =True)
    
    class Meta:
        model =Order
        fields= '__all__'
    def get_orders(self,obj):
        items = obj.orderitem_set.all()
        serializers = OrderItemsSerializer(items,many=True)
        return serializers.data
    
    def get_shippingAddress(self,obj):
        try:
            address = ShippingAddressSerializer(obj.shippingAddress,many=True)
        except:
            address = False
        
            
        return address
    def get_user(self,obj):
        user = obj.user
        serializers = UserSerializer(user,many=False)
        return serializers.data