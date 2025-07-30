from django.shortcuts import render

# Create your views here.

# Path :-  apps/users/views.py

from rest_framework import generics , permissions

from .models import User

from .serializers import UserSerializer


# Class-based view to handle user registration (signup)
class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()    # All users in DB 

    serializer_class = UserSerializer   # Use our custom serializer 

    permission_classes = [permissions.AllowAny]   # Anyone can register 


# View for retrieving current user's profile 
class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    permission_classes = [permissions.IsAuthenticated]   # JWT token required 
    

    # This returns the profile of the currently authenticated user
    def get_object(self):
        return  self.request.user # self.request.user gives us the current user from the JWT token



# Test view to check if the app is working



# Create a Simple Protected View   
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserSerializer
from .models import User

# Test protected view to check if JWT is working
@api_view(['GET' , 'PUT'])
@permission_classes([IsAuthenticated])  # Only authenticated users can access this view
def protected_view(request):

    user = request.user    # request.user =>  Refers to the currently authenticated user (thanks to JWT middleware).

    return Response({"message": 
                     f"Hello, Madhav_P!  You have access to this protected view.",
                     "user_id":user.id,
                     "email":user.email})


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
