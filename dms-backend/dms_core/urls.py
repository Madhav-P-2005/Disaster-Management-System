# --------------------------
# Main URL Routing for DMS Core Project   Path :- dms-backend/dms_core/urls.py
# --------------------------

from django.contrib import admin
from django.urls import path, include

# Import JWT views for login/token refresh
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),  # Django admin panel (for site management)
    
    # JWT Auth endpoints:
    # - /api/token/ : login with email/password, returns access+refresh tokens
    # - /api/token/refresh/ : use refresh token to get new access token
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  
    
    # User management endpoints (register, profile, etc.), all prefixed by /api/users/
    path('api/users/', include('users.urls')),  # Include URL patterns from your users app
]