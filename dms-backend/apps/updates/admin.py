# Path: dms-backend/apps/updates/admin.py

from django.contrib import admin
from .models import Update

@admin.register(Update)
class UpdateAdmin(admin.ModelAdmin):
    # Fields shown in the list view
    list_display = (
        'update_id',
        'title',
        'status',
        'incident_title',
        'timestamp',
    )

    # Sidebar filters
    list_filter = ('status', 'timestamp')

    # Search bar
    search_fields = ('title', 'content', 'incident__title')

    # Make timestamp read-only
    readonly_fields = ('timestamp',)

    # Custom display for related incident
    def incident_title(self, obj):
        return obj.incident_id.title if obj.incident_id else '—'
    incident_title.short_description = 'Incident'