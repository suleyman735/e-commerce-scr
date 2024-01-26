from django.db import models

# Create your models here.
from accounts.models import  UserAccount
# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=200,null=True, blank=True)
    image = models.FileField(max_length=255, upload_to='images',null=True)
    def __str__(self):
        return self.name
    

class Product(models.Model):
    name = models.CharField(max_length=200,null=True, blank=True)
    image = models.FileField(max_length=255, upload_to='images',null=True)
    brand= models.CharField(max_length=200,null=True, blank=True)
    discount=models.DecimalField(null=True, blank=True,max_digits=5,decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL,null=True,related_name='products')
    isNewArrival = models.BooleanField(null=True, blank=True,default=False)
    isBestSelling = models.BooleanField(null=True, blank=True,default=False)
    description=models.TextField(null=True,blank=True)
    rating= models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
    numReviews=models.IntegerField(null=True,blank=True,default=0)
    price= models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
    countInStock=models.IntegerField(null=True,blank=True,default=0)
    createdAt=models.DateTimeField(auto_now_add=True)
    
    _id =models.AutoField(primary_key=True,editable=False)
    
    def __str__(self):
        return self.name
    

    
    
class Order(models.Model):
    user = models.ForeignKey(UserAccount,on_delete=models.SET_NULL,null=True)
    # items = models.ManyToManyField(OrderItem)
    paymentMethod=models.CharField(max_length=200,null=True, blank=True)
    taxPrice =  models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
    totalPrice =  models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)
    

    
class OrderItem(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    order = models.ForeignKey(Order,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=200,null=True, blank=True)
    qty =models.IntegerField(null=True, blank=True,default=0)
    price= models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    image= models.CharField(max_length=200, null=True,blank=True)
    _id = models.AutoField(primary_key=True,editable=False)
    date_added = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name or f"OrderItem_{self.pk}"
    
    

    
class ShippingAdress(models.Model):
    order = models.OneToOneField(Order,on_delete=models.CASCADE,null=True,blank=True)
    address = models.CharField(max_length=200,null=True, blank=True)
    city =models.CharField(max_length=200,null=True, blank=True)
    postalCode = models.CharField(max_length=200,null=True, blank=True)
    country = models.CharField(max_length=200,null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    _id = models.AutoField(primary_key=True,editable=False)
    
    def __str__(self):
        return self.name
    
    
class Payment(models.Model):
    stripe_charge_id = models.CharField(max_length=50)
    user = models.ForeignKey(UserAccount, blank=True, null=True,on_delete=models.SET_NULL)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.email