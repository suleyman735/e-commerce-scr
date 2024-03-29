from django.urls import path,include,re_path
from .views import index
from .views import RegisterView,VerifyEmail,LoginAPIView,LogoutAPIView,UserDataView,PasswordTokenCheckAPI,SetNewPasswordAPIView,RequestPasswordResetEmail,index
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
#     TokenVerifyView
# )

urlpatterns = [
   
    path('register/',RegisterView.as_view(), name='register'),
    path('email-verify/',VerifyEmail.as_view(), name='email-verify'),
    path('login/',LoginAPIView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/',LogoutAPIView.as_view(), name='logout'),
    path('user-profile/', UserDataView.as_view(), name='user-profile'),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(),name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(),name='password-reset-complete'),
    
    path('index/',index, name='index')

 
    
]