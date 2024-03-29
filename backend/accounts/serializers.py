from rest_framework import serializers

from .models import UserAccount
from django.contrib import auth 
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from datetime import timedelta, datetime


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)

    default_error_messages = {
        'firs_name': 'The username should only contain alphanumeric characters',
        'email_exists': 'This email address is already in use',}

    class Meta:
        model = UserAccount
        fields = ['email', 'first_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}
        
    def validate_email(self, value):
        """
        Check if the email address is already in use.
        """
        if UserAccount.objects.filter(email=value).exists():
            raise serializers.ValidationError(self.default_error_messages['email_exists'])
        return value

    def validate(self, attrs):
        email = attrs.get('email', '')
        first_name = attrs.get('first_name', '')

        if not first_name.isalnum():
            raise serializers.ValidationError(
                self.default_error_messages)
        return attrs

    def create(self, validated_data):
        return UserAccount.objects.create_user(**validated_data)
    
class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = UserAccount
        fields = ['token']
        
        
class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 255,min_length=3)
    password = serializers.CharField(max_length = 68,min_length=6,write_only = True)
    first_name = serializers.CharField(max_length = 255,min_length=3,read_only=True)
    last_name = serializers.CharField(max_length = 68,min_length=6,read_only=True)
    tokens = serializers.CharField(max_length = 68,min_length=6,read_only=True)
    
    class Meta:
        model = UserAccount
        fields = ['id','email','password','first_name','last_name','tokens']
    
    # def get_tokens(self, user):
    #     return {
    #         'refresh': str(user.tokens['refresh']),
    #         'access': str(user.tokens['access'])
    #     }
    def validate(self, attrs):
        email = attrs.get('email','')
        password = attrs.get('password','')
        
           # Check if user with provided email exists
        user = UserAccount.objects.filter(email=email).first()
        
        if not user:
            raise AuthenticationFailed('Email is not registered. Please sign up.')

        
        user = auth.authenticate(email=email,password = password)
        
        if not user:
            raise AuthenticationFailed('Invalid credentials , try again')
        
        if not user.is_active:
            raise AuthenticationFailed('Account disabled,contact admin')
        
        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified')
        return {
            'id':user.id,
            'email':user.email,
            # 'first_name':user.first_name,
            # 'last_name':user.last_name,
            'tokens':user.tokens
            
        }
        
        

        
class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)
    

    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']
        
        
class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = UserAccount.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)
        


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')
            
            

# it is for PUT request
class UserDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserAccount
        fields = ['first_name', 'last_name', 'email', 'is_verified', 'is_active',]
        
        
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
            
            
