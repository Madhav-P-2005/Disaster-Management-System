# Path :- dms-backend/apps/users/urls.py

from django.urls import path 


from .views import UserRegistrationView, UserProfileView, protected_view, user_profile

from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView   # URLs for user-related operations


urlpatterns = [

    # Signup endpoint 
    path('register/', UserRegistrationView.as_view() , name='register'),

    # Login endpoint (provided by SimpleJWT)
    path('token/', TokenObtainPairView.as_view() , name='token_obtain_pair'),

    # Refresh token endpoint (provided by SimpleJWT)
    path('token/refresh/', TokenRefreshView.as_view() , name='token_refresh'),


    path('profile/' , user_profile , name='profile'),  # Endpoint to get current user's profile

    # Test protected view
    path('protected/', protected_view, name='protected_view'),  # Test view to check if JWT is working


]