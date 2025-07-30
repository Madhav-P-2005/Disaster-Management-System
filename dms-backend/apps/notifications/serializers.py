# Path :-  dms-backend/apps/notifications/serializers.py


from rest_framework import serializers

from .models import Notification  # Import the Notification model


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification  # Specify the model to serialize
        fields = '__all__'  # Include all fields from the Notification model
        read_only_fields = ['timestamp']  # Make timestamp read-only (set automatically by the system)

