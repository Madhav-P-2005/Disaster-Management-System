# Path: dms-backend/apps/authorities/serializers.py

from rest_framework import serializers
from .models import Authority


class AuthoritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Authority
        fields = '__all__'
        read_only_fields = ['user']  # ✅ Add this line!
        
        # This tells Django REST Framework that the user field is read-only — so it won’t be expected in the POST request body.