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


    # Incident management endpoints, all prefixed by /api/incidents/
    path('api/incidents/', include('incidents.urls')),  # Include URL patterns from your incidents app


    # Notification management endpoints, all prefixed by /api/notifications/
    path('api/notifications/', include('notifications.urls')),  # Include URL patterns from your notifications app


    # Update management endpoints, all prefixed by /api/updates/
    path('api/updates/', include('updates.urls')),


    # Authority management endpoints, all prefixed by /api/authorities/
    path('api/authorities/', include('authorities.urls')),  # Include URL patterns from your authorities app


    # Government management endpoints, all prefixed by /api/govt/
    path('api/govt/', include('govt_body.urls')),  # Corrected and uncommented


    # Admin operations endpoints, all prefixed by /api/admin/
    path('api/admin/', include('admin_ops.urls')),  # Include URL patterns from your admin operations app
    

]