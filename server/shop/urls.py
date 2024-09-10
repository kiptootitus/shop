from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from . import views

# Default Router for ViewSets
router = DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'cart-items', views.CartItemViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'payments', views.PaymentViewSet)
router.register(r'messages', views.MessageViewSet)
router.register(r'user-profiles', views.UserProfileViewSet, basename='userprofile')  # Explicitly provide the basename

# API schema view (Swagger and ReDoc)
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

# URL patterns
urlpatterns = [
    # API routes for ViewSets
    path('api/', include(router.urls)),
    
    # Route for listing all API routes
    path('', views.RouteListView.as_view(), name="getRoutes"),
    
    # JWT Authentication routes
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # User Profile routes
    path('users/profile/', views.UserProfileDetailView.as_view(), name="getUserProfileDetail"),
    path('users/', views.AdminUserListView.as_view(), name="getUsers"),
    path('users/register/', views.UserRegistrationView.as_view(), name='register'),
    
    # Account activation route
    path('activate/<uidb64>/<token>/', views.ActivateAccountView.as_view(), name='activate'),
    
    # Swagger and ReDoc documentation routes
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-schema'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='redoc'),
    path('schema/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
]
