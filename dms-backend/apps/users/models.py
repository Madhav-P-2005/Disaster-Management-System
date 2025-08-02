# Path :- dms-backend/apps/users/models.py

# apps/users/models.py

# --------------------------
# Custom User Model for DMS
# --------------------------

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Custom manager for handling user creation (regular and superuser)
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        # This method is used to create a normal user.
        # It requires an email (unique identifier for login) and password.
        if not email:
            raise ValueError("The Email must be set")  # Prevents user creation without email
        email = self.normalize_email(email)  # Standardizes email format
        user = self.model(email=email, **extra_fields)  # Create a User instance
        user.set_password(password)  # Hash and set password
        user.save()  # Save user to database
        return user

    def create_superuser(self, email, password, **extra_fields):
        # This method is used to create a superuser (admin).
        # It ensures superusers are always staff, superuser, and have 'admin' role.
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')  # All superusers must have admin role
        return self.create_user(email, password, **extra_fields)  # Re-use create_user

# Main User model that replaces Django's default User
class User(AbstractBaseUser, PermissionsMixin):
    # User roles for different permissions/access
    ROLE_CHOICES = (
        ('citizen', 'Citizen'),      # Normal user (default)
        ('authority', 'Authority'),  # Government authority
        ('admin', 'Admin'),          # Admin user (full access)
    )

    # User fields (basic details + extra info for DMS)
    name = models.CharField(max_length=100, blank=True, null=True)  # Optional name
    email = models.EmailField(unique=True)  # Used for login, must be unique
    phone = models.CharField(max_length=15, blank=True, null=True)  # Optional phone
    location = models.CharField(max_length=100, blank=True, null=True)  # Optional location
    age = models.PositiveIntegerField(blank=True, null=True)  # Optional age
    family_members = models.PositiveIntegerField(blank=True, null=True)  # Optional, number of family members
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='citizen')  # User role, default: citizen
    

    # Permissions-related fields
    is_active = models.BooleanField(default=True)  # Can the user login? (deactivate by setting False)
    is_staff = models.BooleanField(default=False)  # Allowed to access Django admin?

    govt_body_id = models.IntegerField(null=True, blank=True)  # (Optional) Link to a government body if needed

    USERNAME_FIELD = 'email'  # Use email as the login field instead of username
    REQUIRED_FIELDS = []      # No extra required fields for createsuperuser

    objects = UserManager()   # Attach custom manager

    def __str__(self):
        # How the user is displayed in admin pages/lists
        return f"{self.email} ({self.role})"




'''

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')  # Default role for superuser
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('citizen', 'Citizen'),
        ('authority', 'Authority'),
        ('admin', 'Admin'),
    )

    name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    family_members = models.PositiveIntegerField(blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='citizen')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    govt_body_id = models.IntegerField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return f"{self.email} ({self.role})"

'''