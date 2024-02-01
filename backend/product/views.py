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
            order=Order.objects.get(_id=order__id)
            print(order)
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        'price_data': {
                            'currency':'usd',
                             'unit_amount':int(order.totalPrice) * 100,
                             'product_data':{
                                 'name':order.user,
                                #  'images':[f"{API_URL}/{product.product_image}"]

                             }
                        },
                        'quantity': 1,
                    },
                ],
                metadata={
                    "order_id":order._id
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
            order__id=session['metadata']['order_id']
            order=Order.objects.get(_id=order__id)
            user = UserAccount.objects.get(email=customer_email)
            #sending confimation mail
            send_mail(
                subject="payment sucessful",
                message=f"thank for your purchase your order is ready.  download url {order.totalPrice}",
                recipient_list=[customer_email],
                from_email="admin@suryadanza.com"
            )

            #creating payment history
            # user=User.objects.get(email=customer_email) or None

            PaymentHistory.objects.create(user=user,orderpayment=order, payment_status=True)

  # Passed signature verification
  return HttpResponse(status=200)

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer
    search_fields = ("name",)





class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    
class ProductDetailView(APIView):
    
    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductDetailSerializer(product)
        
        return Response(serializer.data)
    

class ReviewListView(generics.ListCreateAPIView):
    # queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        
        if product_id:
            return Review.objects.filter(product_id=product_id)
        else:
            return Review.objects.all()
    
    def get(self, request, *args, **kwargs):
        # Override the get method to include payment history for GET requests
        response = super().get(request, *args, **kwargs)
        if self.request.method == 'GET':
            # Retrieve the payment history for each order in the response
            reviews_data = response.data
            # print(reviews_data)
            for review_data in reviews_data:
                userAccount = UserAccount.objects.filter(pk = review_data['user'])
                user_serializer = UserDataSerializer(userAccount,many=True)
                review_data['user'] = user_serializer.data

        return response
    

    
    


class OrderListCreateView(generics.ListCreateAPIView):
    # queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all()
        else:
            
        # Return only orders created by the authenticated user
            return Order.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # Set the user field based on the currently authenticated user
        serializer.save(user=self.request.user)

    def post(self, request, *args, **kwargs):
        # Override the post method to handle the perform_create logic
        return super().post(request, *args, **kwargs)
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            # Apply OrderWithPaymentSerializer for GET requests
            return OrderWithPaymentSerializer
        else:
            # Use the original OrderSerializer for other request methods
            return OrderSerializer
        
    def get(self, request, *args, **kwargs):
        # Override the get method to include payment history for GET requests
        response = super().get(request, *args, **kwargs)
        if self.request.method == 'GET':
            # Retrieve the payment history for each order in the response
            orders_data = response.data
            for order_data in orders_data:
                order_id = order_data['_id']
                payment_history = PaymentHistory.objects.filter(orderpayment_id=order_id)
                order = OrderItem.objects.filter(order_id=order_id)  #this order comes from OrderItem
                orderShipping = ShippingAdress.objects.filter(orderShipping=order_id) 
                payment_serializer = PaymentSerializer(payment_history, many=True)
                orderItem_serializer = OrderItemSerializer(order,many=True) #this order comes from OrderItem
                orderShipping_serializer = ShippingAdressSerializer(orderShipping,many=True)
                order_data['payment_history'] = payment_serializer.data
                order_data['order'] = orderItem_serializer.data #this order comes from OrderItem
                order_data['orderShipping'] = orderShipping_serializer.data 
        return response


    
class OrderItemListCreateView(generics.ListCreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    

    def post(self, request, *args, **kwargs):
        # Assuming the request data is a list of order items
        order_items_data = request.data

        # Validate each order item in the list
        serializer = self.get_serializer(data=order_items_data, many=True)
        serializer.is_valid(raise_exception=True)

        # Save each order item
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class ShippingAdressListCreateView(generics.ListCreateAPIView):
    queryset = ShippingAdress.objects.all()
    serializer_class = ShippingAdressSerializer
    


    