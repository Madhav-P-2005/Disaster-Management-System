# Path :- dms-backend/apps/notifications/models.py

from django.db import models

from users.models import User   # Import the custom User model

# Notifications model to store disaster-related information


class Notification(models.Model):
    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low')
    ]

    STATUS_CHOICES = [
        ('unread', 'Unread'),
        ('read', 'Read')
    ]

    notification_id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=50)  # e.g., "alert", "update"
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    incident_id = models.ForeignKey('incidents.Incident', on_delete=models.CASCADE, related_name='notifications', null=True, blank=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='unread')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES)

    def __str__(self):
        return f"Notification {self.notification_id} - {self.type} - {self.status}"