from django.shortcuts import render
from rest_framework import generics, status, views, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserAccount
from .serializers import RegisterSerializer,EmailVerificationSerializer,LoginSerializer,LogoutSerializer,UserDataSerializer,ChangePasswordSerializer,ResetPasswordEmailRequestSerializer,SetNewPasswordSerializer
from rest_framework.renderers import JSONRenderer
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
from .renderers import UserRenderer
from django.utils.html import format_html
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .jwt import JWTAuthentication
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.http import HttpResponsePermanentRedirect,HttpResponseRedirect

import os
# Create your views here.


class CustomRedirect(HttpResponsePermanentRedirect):

    allowed_schemes = [os.environ.get('APP_SCHEME'), 'http', 'https']



class RegisterView(generics.GenericAPIView):

    serializer_class = RegisterSerializer
    renderer_classes = [UserRenderer,JSONRenderer]
    
    def get_queryset(self):
        return UserAccount.objects.none()


    def post(self, request, *args, **kwargs):

        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        user_data = serializer.data
        user = UserAccount.objects.get(email=user_data['email'])
        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        print(current_site)
       
        
        relativeLink = reverse('email-verify')
        absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
        
        # Display the clickable link in your template
        # link_html = format_html('<a href="{absurl}">here</a>', absurl)
        
        # data = {'domain':absurl,"subject":'Verify your email'}
        email_body = 'Hi '+user.first_name + \
            ' Use the link below to verify your email \n' + absurl
        data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Verify your email'}

        Util.send_email(data)
        
          # Instead of returning the entire user object, return a serialized version
        serialized_user = self.serializer_class(user).data
        return Response(serialized_user, status=status.HTTP_201_CREATED)
    
class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer
    def get(self,request):
        token = request.GET.get('token')
        payload =  jwt.decode(token,settings.SECRET_KEY,algorithms=['HS256'])
        try:
           payload =  jwt.decode(token,settings.SECRET_KEY,algorithms=['HS256'])
           user = UserAccount.objects.get(id=payload['user_id'])
           if not user.is_verified:
           
                user.is_verified = True
                user.save()
           
           return Response({'email':"Successfully activated"},status=status.HTTP_200_OK)
           
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        
        
class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer


    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    
class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        data = {'request':request,"data":request.data}
        # serializer = self.serializer_class(data=data)
        # serializer.is_valid(raise_exception=True)

        email = request.data.get('email', '')
        
                # Check if email exists in the database
        user = UserAccount.objects.filter(email=email).first()

        if not user:
            return Response({'error': 'Email does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user is verified
        if not user.is_verified:
            return Response({'error': 'Email is not verified. Please verify your email first.'}, status=status.HTTP_403_FORBIDDEN)


        if UserAccount.objects.filter(email=email).exists():
            user = UserAccount.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(
                request=request).domain
            relativeLink = reverse(
                'password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})

            redirect_url = request.data.get('redirect_url', '')
            absurl = 'http://'+current_site + relativeLink
            email_body = 'Hello, \n Use link below to reset your password  \n' + \
                absurl+"?redirect_url="+redirect_url
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your passsword'}
            Util.send_email(data)
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
  
class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)  

class PasswordTokenCheckAPI(generics.GenericAPIView):
    # serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):
        

        redirect_url = request.GET.get('redirect_url')

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = UserAccount.objects.get(id=id)
            

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error':'Token is not valid, please request anew one'},status=status.HTTP_401_UNAUTHORIZED)
            
            redirect_url_params = f'?token_valid=True&message=Credentials Valid&uidb64={uidb64}&token={token}'
            
            if redirect_url and len(redirect_url) > 3:
                 if not redirect_url.startswith(('http://', 'https://')):
                        redirect_url = 'http://' + redirect_url  # Add the protocol if not present
                 return HttpResponseRedirect(redirect_url + redirect_url_params)
                # return CustomRedirect(redirect_url+'?token_valid=True&message=Credentials Valid&uidb64='+uidb64+'&token='+token)
            else:
                frontend_url = os.environ.get('FRONTEND_URL', 'localhost:3000/reset/')
                if not frontend_url.startswith(('http://', 'https://')):
                    frontend_url = 'http://' + frontend_url  # Add the protocol if not present
                return HttpResponseRedirect(frontend_url + redirect_url_params)

                # return CustomRedirect(os.environ.get('FRONTEND_URL', '')+'?token_valid=False')
            
            return Response({'success': True,'message':'Credentials Valid','uidb64':uidb64, 'tokens':token}, status=status.HTTP_200_OK)
                # if len(redirect_url) > 3:
                #     return CustomRedirect(redirect_url+'?token_valid=False')
                # else:
                #     return CustomRedirect(os.environ.get('FRONTEND_URL', '')+'?token_valid=False')

            # if redirect_url and len(redirect_url) > 3:
            #     return CustomRedirect(redirect_url+'?token_valid=True&message=Credentials Valid&uidb64='+uidb64+'&token='+token)
            # else:
            #     return CustomRedirect(os.environ.get('FRONTEND_URL', '')+'?token_valid=False')

        except DjangoUnicodeDecodeError as identifier:
            return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)
            try:
                if not PasswordResetTokenGenerator().check_token(user):
                    return CustomRedirect(redirect_url+'?token_valid=False')
                    
            except UnboundLocalError as e:
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)   
    


class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer

    # permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
    

    
    
class UserDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        # Your logic to retrieve user-specific data
        data = {
            'first_name': user.first_name,
            'last_name':user.last_name,
            'email': user.email,
            # 'password':user.password,
            'is_verified':user.is_verified,
            'is_active':user.is_active,
            'created_at':user.created_at
            # Add more fields as needed
        }
        return Response(data)
    
    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = UserDataSerializer(user, data=request.data)
        password_serializer = ChangePasswordSerializer(data=request.data)
        
        

        if serializer.is_valid() and password_serializer.is_valid():
            new_email = serializer.validated_data.get('email')
            
            if UserAccount.objects.filter(email=new_email).exclude(email=user.email).exists():
                return Response({'message': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer.save()
            # Change password if old password is correct
            old_password = password_serializer.validated_data.get('old_password')
            new_password = password_serializer.validated_data.get('new_password')

            if user.check_password(old_password):
                user.set_password(new_password)
                user.save()
                return Response({'message': 'Password changed successfully'})
            else:
                return Response({'message': 'Incorrect old password'}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)