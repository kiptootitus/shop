from django.contrib import admin
from .models import Product, CartItem, Order, Payment, Message, UserProfile

admin.site.register(Product)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(Payment)
admin.site.register(Message)
admin.site.register(UserProfile)
