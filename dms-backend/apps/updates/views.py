# Path :-           dms-backend/apps/updates/views.py


from rest_framework import generics,permissions

from .models import Update  # Import the Update model

from .serializers import UpdateSerializer  # Import the serializer for Update model

class UpdateListCreateView(generics.ListCreateAPIView):
    queryset = Update.objects.all()  # Get all updates from the database

    serializer_class = UpdateSerializer  # Use the UpdateSerializer for serialization

    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access this view


    def perform_create(self, serializer):
        serializer.save()  # Automatically set the reported_by field to the current user



class UpdateDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Update.objects.all()  # Get all updates from the database

    serializer_class = UpdateSerializer  # Use the UpdateSerializer for serialization

    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access this view

    def perform_update(self, serializer):
        serializer.save()  # Ensure reported_by is updated to the current user

    def perform_destroy(self, instance):
        instance.delete()