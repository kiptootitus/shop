from rest_framework import viewsets

from .models import Product, Message, Payment, UserProfile, Order, CartItem
from .serializers import ProductSerializer, UserProfileSerializer, MessageSerializer, \
    PaymentSerializer, OrderSerializer, CartItemSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Product instances.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CartItemViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing CartItem instances.
    """
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer


class OrderViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Order instances.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Payment instances.
    """
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class MessageViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Message instances.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing UserProfile instances.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
