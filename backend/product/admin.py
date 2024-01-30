from django.contrib import admin

# Register your models here.
from .models import *

# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name',]
    # list_filter = ['lang']

admin.site.register(Category,CategoryAdmin)

class PaymentHistoryAdmin(admin.ModelAdmin):
    list_display = ['user',]
    # list_filter = ['lang']

admin.site.register(PaymentHistory,PaymentHistoryAdmin)

class ProducAdmin(admin.ModelAdmin):
    list_display = ['name',]
    # list_filter = ['lang']

admin.site.register(Product,ProducAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display = ['user',]
    # list_filter = ['lang']

admin.site.register(Order,OrderAdmin)

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['product','order']
    # list_filter = ['lang']

admin.site.register(OrderItem,OrderItemAdmin)

# class TaxPerProductAdmin(admin.ModelAdmin):
#     list_display = ['taxPerProduct']
#     # list_filter = ['lang']

# admin.site.register(TaxPerProduct,TaxPerProductAdmin)

# class ShippingAdressAdmin(admin.ModelAdmin):
#     list_display = ['_id',]
#     # list_filter = ['lang']

# admin.site.register(ShippingAdress,ShippingAdressAdmin)