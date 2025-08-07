# 🧠 Why this matters :-  The serializer lets us easily convert model instances into JSON (and vice versa) for API communication.

# dms-backend/apps/users/serializers.py


# It is essential for creating APIs that interact with the User model.
from rest_framework import serializers 
from .models import User

# This file contains the serializer for the User model, which is used to convert model instances to JSON format and validate incoming data.
class UserSerializer(serializers.ModelSerializer):
     # This Meta class tells DRF which model to use and which fields to expose
    password = serializers.CharField(write_only=True , required=True)
    confirm_password = serializers.CharField(write_only=True , required=True)  

    class Meta:
        model = User
        # fields = '__all__'  # Include all fields from the User model
        # You can use a list like: ['id', 'name', 'email', ...] if you want to restrict

        # This is the list of fields that will be exposed in the API.
        fields = ['id' , 'name', 'email', 'password','confirm_password','phone', 'location', 'age', 'family_members', 'role', 'govt_body_id']

    # This method is used to validate the data.
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    # This method is used to create a new user.
    def create(self , validated_data):
        password = validated_data.pop("password")
        validated_data.pop("confirm_password") # Removes the confirm_password field from the validated data.

        user = User.objects.create_user(password=password, **validated_data)   # Hashes the password 
        return user 