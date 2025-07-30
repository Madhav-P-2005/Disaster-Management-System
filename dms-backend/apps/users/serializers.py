# 🧠 Why this matters :-  The serializer lets us easily convert model instances into JSON (and vice versa) for API communication.

# dms-backend/apps/users/serializers.py


# It is essential for creating APIs that interact with the User model.
from rest_framework import serializers 
from .models import User

# This file contains the serializer for the User model, which is used to convert model instances to JSON format and validate incoming data.
class UserSerializer(serializers.ModelSerializer):
     # This Meta class tells DRF which model to use and which fields to expose
    class Meta:
        model = User
        # fields = '__all__'  # Include all fields from the User model
        # You can use a list like: ['id', 'name', 'email', ...] if you want to restrict


        fields = ['id' , 'name', 'email', 'phone', 'location', 'age', 'family_members', 'role', 'govt_body_id']