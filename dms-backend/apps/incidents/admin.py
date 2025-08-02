# Path :- dms-backend/apps/incidents/admin.py

from django.contrib import admin  # Import the Django admin module to register models


from .models import Incident # Import the Incident model



# Register your models here.
@admin.register(Incident)
class IncidentAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'location', 'status', 'severity', 'reported_by', 'timestamp')
    list_filter = ('status', 'severity', 'location')
    search_fields = ('title', 'description', 'location')
    ordering = ('-id',)

    fieldsets = (
        ('Incident Info', {
            'fields': ('title', 'description', 'location', 'severity', 'status')
        }),
        ('Reporter', {
            'fields': ('reported_by',)
        }),
        # 🛠️ FIX: Exclude timestamp from the add/edit form because it's not editable
        # REMOVE THIS:
        # ('Timestamps', {'fields': ('timestamp',)}),
    )

    readonly_fields = ('timestamp',)  # ✅ Display it in the detail view as read-only