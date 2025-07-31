#  Path :- dms-backend/apps/govt_body/views.py


from rest_framework import generics

from .models import GovernmentBody  # Import the GovernmentBody model

from .serializers import GovtBodySerializer  # Import the serializer for GovernmentBody


class GovtBodyListCreateView(generics.ListCreateAPIView):

    queryset = GovernmentBody.objects.all()  # Queryset to retrieve all government bodies
    serializer_class = GovtBodySerializer  # Serializer to use for this view

    def perform_create(self, serializer):
        # Optionally set the created_by field if you have it in your model
        serializer.save()  # Save the new government body instance

class GovtBodyDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = GovernmentBody.objects.all()  # Queryset to retrieve all government bodies
    serializer_class = GovtBodySerializer  # Serializer to use for this view

    def perform_update(self, serializer):
        # Optionally set the updated_by field if you have it in your model
        serializer.save()  # Save the updated government body instance

    def perform_destroy(self, instance):
        instance.delete()  # Delete the government body instance