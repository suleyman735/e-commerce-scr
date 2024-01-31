from django.db import models
from accounts.models import  UserAccount
# Create your models here.

class Payment(models.Model):
    user = models.ForeignKey(UserAccount, blank=True, null=True,on_delete=models.SET_NULL)
    payment_id = models.CharField(max_length=50,blank=True, null=True)
    payment_method = models.CharField(max_length=50,blank=True, null=True)
   
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.email

class Category(models.Model):
    name = models.CharField(max_length=200,null=True, blank=True)
    image = models.FileField(max_length=255, upload_to='images',null=True)
    def __str__(self):
        return self.name
    

class Product(models.Model):
    name = models.CharField(max_length=200,null=True, blank=True)
    image = models.ImageField(max_length=255, upload_to='images',null=True)
    brand= models.CharField(max_length=200,null=True, blank=True)
    discount=models.FloatField(default=0)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL,null=True,related_name='products')
    isNewArrival = models.BooleanField(null=True, blank=True,default=False)
    isBestSelling = models.BooleanField(null=True, blank=True,default=False)
    description=models.TextField(null=True,blank=True)
    rating= models.FloatField(default=0)
    numReviews=models.IntegerField(null=True,blank=True,default=0)
    price= models.FloatField(default=0)
    createdAt=models.DateTimeField(auto_now_add=True)
    taxPerProduct=models.FloatField(default=0)
    _id =models.AutoField(primary_key=True,editable=False)
    
    def save(self, *args, **kwargs):
        if self.taxPerProduct > 1 :
            self.taxPerProduct = self.taxPerProduct/100
        if self.discount>1:
            self.discount = self.discount/100
            
        super(Product, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.name
    
    
    
    
class Order(models.Model):
    user = models.ForeignKey(UserAccount,on_delete=models.CASCADE)
    taxPrice =  models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
    totalPrice =  models.DecimalField(max_digits=7,decimal_places=2,null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)
    

    

    
class OrderItem(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    qty =models.IntegerField(default=1)
    price= models.FloatField(default=0)
    _id = models.AutoField(primary_key=True,editable=False)
        
    def __str__(self):
        return self.product.name or f"OrderItem_{self.pk}"
    
class PaymentHistory(models.Model):
    user=models.ForeignKey(UserAccount, on_delete=models.CASCADE, blank=True, null=True)
    orderpayment=models.ForeignKey(Order, on_delete=models.SET_NULL, blank=True, null=True)
    date=models.DateTimeField(auto_now_add=True)
    payment_status=models.BooleanField()


    # def __str__(self):
    #     return self.user.email
    
