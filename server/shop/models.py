from django.db import models
from django.contrib.auth.models import User
import uuid


# Product Model with variations, discount price, and stock tracking
class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Discount price
    image = models.ImageField(blank=True, null=True)
    product_brand = models.CharField(max_length=255, default='Default Brand')
    rating = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    stock_count = models.IntegerField(blank=True, null=True)
    tags = models.CharField(max_length=255, blank=True, null=True)  # For search optimization
    low_stock_threshold = models.PositiveIntegerField(default=10)  # For low stock alert
    variations = models.JSONField(blank=True, null=True)  # For product variations like size, color, etc.
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

    @property
    def is_on_discount(self):
        return self.discount_price is not None and self.discount_price < self.price

    @property
    def available_stock(self):
        return self.stock_count > 0


# CartItem Model with subtotal property
class CartItem(models.Model):
    username = models.ForeignKey(User, related_name='cart_items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='cart_items', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.quantity} of {self.product.name} for {self.username}'

    @property
    def subtotal(self):
        return (self.product.discount_price or self.product.price) * self.quantity


# Order Model with shipping address and status updates
class Order(models.Model):
    user = models.ForeignKey(User, related_name='orders', on_delete=models.CASCADE)
    _id = models.AutoField(primary_key=True, editable=False)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Shipped', 'Shipped'), ('Delivered', 'Delivered'), ('Cancelled', 'Cancelled')])
    created_at = models.DateTimeField(auto_now_add=True)
    shipping_address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=10, blank=True, null=True)

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)

    def __str__(self):
        return f'Order #{self._id} by {self.user.username}'

    @property
    def is_completed(self):
        return self.status == 'Delivered'

    @property
    def is_pending(self):
        return self.status == 'Pending'

    @property
    def is_cancelled(self):
        return self.status == 'Cancelled'

    @property
    def is_shipped(self):
        return self.status == 'Shipped'


# Payment Model with payment reference and gateway integration
class Payment(models.Model):
    user = models.ForeignKey(User, related_name='payments', on_delete=models.CASCADE)
    order = models.ForeignKey(Order, related_name='payments', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=255)
    payment_gateway = models.CharField(max_length=100, blank=True, null=True)  # e.g., PayPal, Stripe
    status = models.CharField(max_length=255,
                              choices=[('Pending', 'Pending'), ('Completed', 'Completed'), ('Failed', 'Failed')])
    payment_reference_id = models.CharField(max_length=255, blank=True, null=True)  # Payment gateway reference
    paid_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Payment for Order #{self.order._id} by {self.user.username}'


# UserProfile Model with loyalty points tracking
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=10, blank=True, null=True)
    loyalty_points = models.PositiveIntegerField(default=0)  # Track user loyalty points

    def __str__(self):
        return self.user.username


# Message Model for customer support
class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Message from {self.sender.username} to {self.receiver.username} at {self.sent_at}'


# Wishlist Model to save favorite products
class Wishlist(models.Model):
    user = models.ForeignKey(User, related_name='wishlists', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='wishlisted_by', on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.product.name} in {self.user.username}\'s wishlist'
