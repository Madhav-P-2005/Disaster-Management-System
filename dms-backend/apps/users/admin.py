# Path :- dms-backend/apps/users/admin.py

'''

💡) The Django Admin Panel is a built-in, web-based dashboard for managing your app’s data. It allows you (as an admin or superuser) to:

✅ Create, edit, delete, and view data models (like users, incidents, etc.)
✅ Manage permissions and roles
✅ Track and debug records easily — without Postman or frontend UI

'''


from django.contrib import admin   # Import the Django admin module to register models

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin   # Import the base UserAdmin class for custom user admin

from .models import User    # Import the custom User model


# Register your models here.

@admin.register(User)
class UserAdmin(BaseUserAdmin):

    # Fields shown in the list view (Admin table view)
    list_display = ('id' , 'email', 'name', 'role', 'location' , 'is_active' , 'is_staff')    # 	Shows selected fields in the list view (Admin table view)

    
    # Add filters to sidebar for easy filtering
    list_filter = ('role', 'is_active' , 'is_staff' , 'location')    # Adds side filters (e.g., by role, location)

    # Add search bar for email and name 
    search_fields = ('email', 'name', 'role')    # Enables a search bar on top

    # Fields to use as links to the detail view 
    ordering = ('id', )   # Default ordering by ID


    # Custom fieldsets for user detail view in admin 

    fieldsets = (
        (None, {'fields': ('email', 'password')}),  # Basic fields (email, password)

        ('Personal Info', {'fields': ('name', 'phone', 'location', 'age', 'family_members', 'govt_body_id')}),  # Personal details

        ('Permissions', {'fields': ('role', 'is_active', 'is_staff','is_superuser' , 'groups' , 'user_permissions')}),  # Permissions-related fields

        ('Important dates', {'fields': ('last_login',)})  # Important dates like last login
    )


    # Fields shown when creating a new user via Admin 

    add_fieldsets = (
        (None, {
            'classes': ('wide',),  # CSS class for styling
            'fields': ('email', 'password1', 'password2', 'name', 'phone', 'location', 'age', 'family_members', 'govt_body_id', 'role', 'is_active', 'is_staff')}
        ),
    )



    # Use email as the unique identifier for login 
    readonly_fields = ('last_login',)  # Last login is read-only