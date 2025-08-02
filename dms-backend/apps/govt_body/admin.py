# Path: dms-backend/apps/govt_body/admin.py

from django.contrib import admin
from .models import GovernmentBody

@admin.register(GovernmentBody)
class GovernmentBodyAdmin(admin.ModelAdmin):
    # Fields shown in list view
    list_display = ('id', 'name', 'region', 'contact_email', 'contact_phone', 'created_at')

    # Add sidebar filters
    list_filter = ('region',)

    # Add search bar
    search_fields = ('name', 'region', 'contact_email', 'contact_phone')

    # Read-only timestamps
    readonly_fields = ('created_at', 'updated_at')

    # Organize form layout
    fieldsets = (
        (None, {
            'fields': ('name', 'region', 'description')
        }),
        ('Contact Info', {
            'fields': ('contact_email', 'contact_phone')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )