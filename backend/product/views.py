from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
# Create your views here.
from rest_framework import generics
from .models import Product,Order
from .serializers import *
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView

from django.conf import settings
from django.shortcuts import redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail

import stripe

# This is your test secret API key.
stripe.api_key = settings.SRIPE_SECRET_KEY

class CreateCheckOutSession(APIView):
    def post(self, request, *args, **kwargs):
        order__id=self.kwargs["pk"]
        try:
            product=Order.objects.get(_id=order__id)
            print(product)
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        'price_data': {
                            'currency':'usd',
                             'unit_amount':int(product.totalPrice) * 100,
                             'product_data':{
                                 'name':product.user,
                                #  'images':[f"{API_URL}/{product.product_image}"]

                             }
                        },
                        'quantity': 1,
                    },
                ],
                metadata={
                    "product_id":product._id
                },
                payment_method_types=['card',],
                mode='payment',
                success_url=settings.SITE_URL + '?success=true',
                cancel_url=settings.SITE_URL + '?canceled=true',
            )
            return redirect(checkout_session.url)
        except Exception as e:
            return Response({'msg':'something went wrong while creating stripe session','error':str(e)}, status=500)
        
@csrf_exempt
def my_webhook_view(request):
  payload = request.body
  sig_header = request.META['HTTP_STRIPE_SIGNATURE']
  event = None

  try:
    event = stripe.Webhook.construct_event(
      payload, sig_header, settings.STRIPE_SECRET_WEBHOOK
    )
  except ValueError as e:
    # Invalid payload
    return HttpResponse(status=400)
  except stripe.error.SignatureVerificationError as e:
    # Invalid signature
    return HttpResponse(status=400)
  if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            customer_email=session['customer_details']['email']
            order__id=session['metadata']['product_id']
            product=Order.objects.get(_id=order__id)
            user = UserAccount.objects.get(email=customer_email)
            #sending confimation mail
            send_mail(
                subject="payment sucessful",
                message=f"thank for your purchase your order is ready.  download url {product.totalPrice}",
                recipient_list=[customer_email],
                from_email="admin@suryadanza.com"
            )

            #creating payment history
            # user=User.objects.get(email=customer_email) or None

            PaymentHistory.objects.create(user=user,product=product, payment_status=True)

  # Passed signature verification
  return HttpResponse(status=200)

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer
    search_fields = ("name",)





class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
class OrderCreateAPIView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    
class OrderItemListCreateView(generics.ListCreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    
    def create(self, request, *args, **kwargs):
        # Assuming the request data is a list of order items
        order_items_data = request.data

        # Validate each order item in the list
        serializer = self.get_serializer(data=order_items_data, many=True)
        serializer.is_valid(raise_exception=True)

        # Save each order item
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


    