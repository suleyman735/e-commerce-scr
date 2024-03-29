from django.db import models

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

from rest_framework_simplejwt.tokens import RefreshToken
from collections import namedtuple
from datetime import timedelta, datetime

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self,email,password=None,**extra_fields):
        extra_fields.setdefault("is_staff",True)
        extra_fields.setdefault("is_superuser",True)
        return self.create_user(email,password,**extra_fields)
    
class TokenResponse(namedtuple('TokenResponse', ['refresh', 'access'])):
    def as_dict(self):
        return {'refresh': str(self.refresh), 'access': str(self.access)}

 
class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    # updated_at = models.DateTimeField(auto_now_add=True,blank=True,null=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return self.email
    
    

    
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        # return TokenResponse(refresh, refresh.access_token).as_dict()
        
        return  {    
            'refresh':str(refresh),
            'access':str(refresh.access_token)  
        }
        
        
        



    
