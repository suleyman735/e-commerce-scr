from django.contrib import admin

# Register your models here.
from .models import *

# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name',]
    # list_filter = ['lang']

admin.site.register(Category,CategoryAdmin)

class ProducAdmin(admin.ModelAdmin):
    list_display = ['name',]
    # list_filter = ['lang']

admin.site.register(Product,ProducAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display = ['user','createdAt',]
    # list_filter = ['lang']

admin.site.register(Order,OrderAdmin)

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['name',]
    # list_filter = ['lang']

admin.site.register(OrderItem,OrderItemAdmin)

class ShippingAdressAdmin(admin.ModelAdmin):
    list_display = ['_id',]
    # list_filter = ['lang']

admin.site.register(ShippingAdress,ShippingAdressAdmin)