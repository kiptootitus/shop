# urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import ProductViewSet, CategoryViewSet, CartItemViewSet, OrderViewSet, PaymentViewSet, MessageViewSet, UserProfileViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'cart-items', CartItemViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'user-profiles', UserProfileViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="E-Commerce API",
        default_version='v1',
        description="API documentation for the E-Commerce app",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="tech@techslimited.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
)

urlpatterns = [
    path('api/', include(router.urls)),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-schema'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='redoc'),
    path('schema/', schema_view.without_ui(cache_timeout=0), name='schema-json'),  # JSON schema

]
