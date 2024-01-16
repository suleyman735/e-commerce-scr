from rest_framework.authentication import get_authorization_header,BaseAuthentication

from .models import UserAccount

from rest_framework import exceptions
import jwt
from rest_framework_simplejwt.tokens import RefreshToken

from django.conf import settings

class JWTAuthentication(BaseAuthentication):
    
    def authenticate(self, request):
        auth_header = get_authorization_header(request)
        auth_data = auth_header.decode('utf-8')
        auth_token = auth_data.split(" ")
        if len(auth_token) !=2:
            raise exceptions.AuthenticationFailed('Token is nit valid')
        
        token = auth_token[1]
    
        print(token)
        
        # payload = jwt.decode(token.access_token, settings.SECRET_KEY, algorithms=['HS256'])
       
        try:
          
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
          
            email = payload.get('email')
            print(email)

            if not email:
                raise exceptions.AuthenticationFailed('Token does not contain a valid email')

            try:
                user = UserAccount.objects.get(email=email)
            except UserAccount.DoesNotExist:
                raise exceptions.AuthenticationFailed('User does not exist for the given email')

            return (user, token)

        except jwt.ExpiredSignatureError as ex:
                raise exceptions.AuthenticationFailed('Token is expired, Login Again')

        except jwt.DecodeError as ex:
                raise exceptions.AuthenticationFailed('Token is invalid')
        
        # try:
        
        #     payload = jwt.decode(token,settings.SECRET_KEY,algorithms=['HS256'])
            
        #     email = payload.get('email')
        #     user = UserAccount.objects.get(email=email)
            
        #     return (user,token)
            
            
        # except jwt.ExpiredSignatureError as ex:
        #     raise exceptions.AuthenticationFailed('Token is expired,Login Again')
        
        # except jwt.DecodeError as ex:
        #     raise exceptions.AuthenticationFailed('Token is invalid')
            
        
        
        
        return super().authenticate(request)
        