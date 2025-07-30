# Path :- dms-backend/apps/users/admin.py

from django.contrib import admin
from .models import User

# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id' , 'name', 'email', 'role', 'location')    # 	Shows selected fields in the list view (Admin table view)

    search_fields = ('name', 'email', 'role')    # Enables a search bar on top

    list_filter = ('role', 'location')    # Adds side filters (e.g., by role, location)