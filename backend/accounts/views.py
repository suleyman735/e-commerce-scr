from django.shortcuts import render
from rest_framework import generics, status, views, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserAccount
from .serializers import RegisterSerializer,EmailVerificationSerializer
from rest_framework.renderers import JSONRenderer
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
from .renderers import UserRenderer
from django.utils.html import format_html
# from django.contrib.auth.tokens import PasswordResetTokenGenerator
# from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
# from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
# Create your views here.
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
        return Response(user, status=status.HTTP_201_CREATED)
    
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