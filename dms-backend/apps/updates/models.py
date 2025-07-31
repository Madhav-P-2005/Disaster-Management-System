# Path :-    dms-backend/apps/updates/models.py

from django.db import models

class Update(models.Model):

    update_id = models.AutoField(primary_key=True)  # Auto-incrementing primary key for each update

    title = models.CharField(max_length=255)  # Title of the update

    content = models.TextField()  # Content of the update

    status = models.CharField(max_length=20, choices=[
        ('draft', 'Draft'),  # Update is in draft state
        ('published', 'Published'),  # Update is published and visible to users
        ('archived', 'Archived')  # Update is archived and no longer active
    ], default='draft')  # Default status is 'draft'

    timestamp = models.DateTimeField(auto_now_add=True)  # Timestamp when the update was created

    incident_id = models.ForeignKey(
        'incidents.Incident',  # Foreign key to Incident model 
        on_delete=models.CASCADE,  # If the incident is deleted, delete this update as well
        related_name='updates',  # Related name for reverse lookup
        null=True,  # Allow null if the update is not related to any incident
        blank=True  # Allow blank if the update is not related to any incident
    )


    def __str__(self):
        return f"Update {self.update_id} - {self.title} ({self.status})"