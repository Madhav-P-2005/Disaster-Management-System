# Path :- dms-backend/apps/incidents/models.py

from django.db import models 

from users.models import User  # Import custom User model   # FK to the User model

# Incident model to store disaster-related information
class Incident(models.Model):

    
    SEVERITY_CHOICES = [
        ('low', 'Low'),        # Minor impact, manageable
        ('medium' , 'Medium'),  # Moderate impact, requires attention
        ('high' , 'High'),     # Severe impact, urgent response needed
    ]


    STATUS_CHOICES = [
        ('reported' , 'Reported'),  # Incident has been reported

        ('in_progress' , 'In Progress'),  # Response is ongoing

        ('resolved' , 'Resolved'),  # Incident has been resolved
    ]


    title = models.CharField(max_length=100)     # Title of the incident (e.g. "Flood in City X")

    description = models.TextField()   # Detailed description of the incident

    location = models.CharField(max_length=100)  # Location of the incident (e.g. "City X")

    severity = models.CharField(max_length=10, choices = SEVERITY_CHOICES)  # Severity level (low, medium, high)
    
    status = models.CharField(max_length=20 , choices = STATUS_CHOICES, default='reported')  # Current status of the incident

    reported_by  = models.ForeignKey(User , on_delete=models.CASCADE , related_name='incidents')  # User who reported the incident (FK to User model)

    timestamp = models.DateTimeField(auto_now_add=True)  # Timestamp when the incident was reported
    

    def __str__(self):
        return f"{self.title} -  {self.status}"