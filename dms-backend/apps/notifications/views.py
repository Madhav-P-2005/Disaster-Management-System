# Path :-   dms-backend/apps/notifications/views.py

from rest_framework import generics , permissions

from .models import Notification  # Import the Notification model

from .serializers import NotificationSerializer  # Import the serializer for Notification model


class NotificationListCreateView(generics.ListCreateAPIView):
    queryset = Notification.objects.all()  # Get all notifications from the database

    serializer_class = NotificationSerializer  # Use the NotificationSerializer for serialization


    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access this view

    def perform_create(self, serializer):
        serializer.save()  # Save the notification without additional fields
        # Additional logic can be added here if needed
class NotificationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()  # Get all notifications from the database

    serializer_class = NotificationSerializer  # Use the NotificationSerializer for serialization

    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access this view

    def perform_update(self, serializer):
        serializer.save()  # Save the updated notification without additional fields
        # Additional logic can be added here if needed
    def perform_destroy(self, instance):
        instance.delete()
        # Additional logic can be added here if needed