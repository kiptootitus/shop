from django.contrib import admin
from .models import Product, Category, CartItem, Order, Payment, Message, UserProfile

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(Payment)
admin.site.register(Message)
admin.site.register(UserProfile)
