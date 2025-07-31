# Path :-        dms-backend/apps/updates/serializers.py


from rest_framework import serializers

from .models import Update  # Import the Update model


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Update  # Specify the model to serialize
        fields = '__all__'  # Include all fields from the Update model
        read_only_fields = ['timestamp']  # Make timestamp read-only (set automatically by the system)