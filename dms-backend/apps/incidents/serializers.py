# Path :- dms-backend/apps/incidents/models.py


from rest_framework import serializers   

from .models import Incident  # Import the Incident model


class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident

        fields = '__all__'  # Include all fields from the Incident model

        read_only_fields = ['reported_by', 'timestamp']  # Make these fields read-only (set automatically by the system)

