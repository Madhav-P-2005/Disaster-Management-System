# Path :-  dms-backend/apps/incidents/views.py


from rest_framework import generics , permissions

from .models import Incident  # Import the Incident model

from .serializers import IncidentSerializer  # Import the serializer for Incident model



class IncidentListCreateView(generics.ListCreateAPIView):

    queryset = Incident.objects.all()  # Get all incidents from the database

    serializer_class = IncidentSerializer  # Use the IncidentSerializer for serialization

    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access this view


    def perform_create(self, serializer):
        serializer.save(reported_by=self.request.user)  # Automatically set the reported_by field to the current user




class IncidentDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Incident.objects.all()  # Get all incidents from the database

    serializer_class = IncidentSerializer  # Use the IncidentSerializer for serialization

    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access this view

    def perform_update(self, serializer):
        serializer.save(reported_by=self.request.user)  # Ensure reported_by is updated to the current user