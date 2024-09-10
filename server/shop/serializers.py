from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Order, UserProfile, CartItem, Message, Payment

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    address = serializers.CharField(write_only=True)
    city = serializers.CharField(write_only=True)
    zip_code = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'password2', 'address', 'city', 'zip_code']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def save(self):
        user = User(
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            email=self.validated_data['email'],
            username=self.validated_data['email'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        
        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match'})
        
        user.set_password(password)
        user.is_active = False  # Deactivate account until email confirmation
        user.save()

        # Create UserProfile with additional information
        UserProfile.objects.create(
            user=user,
            address=self.validated_data['address'],
            city=self.validated_data['city'],
            zip_code=self.validated_data['zip_code']
        )

        return user


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
   
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']
    
    def get_name(self, obj):
        firstname = obj.first_name
        lastname = obj.last_name
        name = f"{firstname} {lastname}"
        if name.strip() == '':
            name = obj.email[:5]
        return name
    
    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()  # Nested product serializer for detailed cart item view
    
    class Meta:
        model = CartItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True, read_only=True)  # Nested cart items in order
    
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['user', 'status', 'created_at']  # Only allow updates to specific fields


class PaymentSerializer(serializers.ModelSerializer):
    order = OrderSerializer()  # Nested order in payment
    
    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['user', 'status', 'paid_at']  # Control writable fields


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)  # Include sender's info
    receiver = UserSerializer(read_only=True)  # Include receiver's info

    class Meta:
        model = Message
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Include user data in profile

    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ['user']  # Prevent manual changes to user field
