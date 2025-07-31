# Path :-  dms-backend/apps/govt_body/serializers.py

from rest_framework import serializers
from .models import GovernmentBody  # ✅ Correct import

class GovtBodySerializer(serializers.ModelSerializer):
    class Meta:
        model = GovernmentBody  # ✅ Correct model reference
        fields = '__all__'
        

    def create(self, validated_data):
        # Optionally auto-set fields like created_by if you have it
        return super().create(validated_data)
