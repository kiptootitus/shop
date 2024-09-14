from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.permissions import AllowAny
from django.db import IntegrityError
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Product, Message, Payment, UserProfile, Order, CartItem
from .serializers import (
    ProductSerializer,
    UserRegistrationSerializer,
    UserSerializerWithToken,
    MessageSerializer,
    PaymentSerializer,
    OrderSerializer,
    CartItemSerializer,
    UserProfileSerializer,
)
from .utils import generate_token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# ViewSets for CRUD Operations (Product, CartItem, Order, Payment, Message, UserProfile)
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            # Allow any user (including unauthenticated) to view products
            return [AllowAny()]
        # Only admins can create, update, or delete products
        return [IsAdminUser()]

    def get_queryset(self):
        # For filtering products based on available stock and discount
        return Product.objects.filter(stock_count__gt=0)

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically assign the current user to the cart item
        serializer.save(user=self.request.user)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically set the current user as the order owner
        serializer.save(user=self.request.user)


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically set the current user and handle order status
        serializer.save(user=self.request.user)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically set the sender as the current user
        serializer.save(sender=self.request.user)


class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Detect if the request is from Swagger schema generation
        if getattr(self, 'swagger_fake_view', False):
            return UserProfile.objects.none()  # Return an empty queryset for schema generation

        # Otherwise, filter the queryset by the logged-in user
        return UserProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# JWT Authentication with custom token payload (returns user data with token)
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Registration View (Handles user registration with email confirmation)


class UserRegistrationView(APIView):
    
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                user = serializer.save()

                # Prepare response data
                user_data = {
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                }

                return Response({
                    "detail": "Account created. Please check your email to activate.",
                    "user": user_data
                }, status=status.HTTP_201_CREATED)

            except IntegrityError as e:
                # Catch IntegrityError for duplicate username or email
                if 'duplicate key value violates unique constraint' in str(e):
                    return Response({
                        "error": "A user with that email already exists."
                    }, status=status.HTTP_400_BAD_REQUEST)

        # Return validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   
# Account Activation View (Handles email confirmation)
class ActivateAccountView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError):
            user = None

        if user and generate_token.check_token(user, token):
            user.is_active = True
            user.save()
            return render(request, "activatesuccess.html")
        return render(request, "activatefail.html")


# User Profile (Retrieve/Update logged-in user profile)
class UserProfileDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        data = request.data
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.save()
        return Response({"detail": "Profile updated successfully."}, status=status.HTTP_200_OK)


# Admin: Retrieve all users (Admin only view)
class AdminUserListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializerWithToken(users, many=True)
        return Response(serializer.data)


# Static routes listing view
class RouteListView(APIView):
    def get(self, request):
        routes = [
            '/api/products/',
            '/api/cartitems/',
            '/api/orders/',
            '/api/payments/',
            '/api/messages/',
            '/api/users/',
            '/api/users/profile/',
        ]
        return Response(routes, status=status.HTTP_200_OK)
