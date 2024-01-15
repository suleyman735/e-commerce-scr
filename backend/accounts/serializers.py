from rest_framework import serializers
from .models import UserAccount
from django.contrib import auth 
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
# from django.contrib.auth.tokens import PasswordResetTokenGenerator
# from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
# from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)

    default_error_messages = {
        'firs_name': 'The username should only contain alphanumeric characters'}

    class Meta:
        model = UserAccount
        fields = ['email', 'first_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

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
        fields = ['email','password','first_name','last_name','tokens']
    
    # def get_tokens(self, user):
    #     return {
    #         'refresh': str(user.tokens['refresh']),
    #         'access': str(user.tokens['access'])
    #     }
    def validate(self, attrs):
        email = attrs.get('email','')
        password = attrs.get('password','')
        
        user = auth.authenticate(email=email,password = password)
        if not user:
            raise AuthenticationFailed('Invalid credentials , try again')
        
        if not user.is_active:
            raise AuthenticationFailed('Account disabled,contact admin')
        
        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified')
            
        

        
        return {
            'email':user.email,
            'first_name':user.first_name,
            'last_name':user.last_name,
            'tokens':user.tokens
            
        }
        


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