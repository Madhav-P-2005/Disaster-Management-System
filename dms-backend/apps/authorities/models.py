# Path :-    dms-backend/apps/authorities/models.py


from django.db import models

from users.models import User  # Import the custom User model


class Authority(models.Model):

    DESIGNATION_CHOICES = [
        ('officer' , 'Officer'),
        ('inspector', 'Inspector'),
        ('manager', 'Manager'),
        ('coordinator', 'Coordinator'),
    ]


    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='authority_profile')   # One-to-one relationship with User model


    designation = models.CharField(max_length=20, choices=DESIGNATION_CHOICES,default='officer')  # Designation of the authority (default: officer)


    department = models.CharField(max_length=100, blank=True, null=True)  # Department of the authority (optional)

    zone = models.CharField(max_length=100, blank=True, null=True)  # Zone of operation (optional)

    def __str__(self):
        return f"{self.user.name} - {self.designation} ({self.department})"