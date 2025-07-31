# Path :- dms-backend/apps/govt_body/models.py


from django.db import models

class GovernmentBody(models.Model):
    name = models.CharField(max_length=255, unique=True)  # Unique name for the government body

    region = models.CharField(max_length=100, blank=True, null=True)
    # Optional field to specify the region or jurisdiction of the government body

    contact_email = models.EmailField(blank=True, null=True)  # Optional email for contact

    contact_phone = models.CharField(max_length=15, blank=True, null=True)  # Optional phone number for contact

    description = models.TextField(blank=True, null=True)  # Optional description of the government body

    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the record was created
    
    updated_at = models.DateTimeField(auto_now=True)  # Timestamp when the record was last updated

    def __str__(self):
        return self.name  # Return the name of the government body when printed