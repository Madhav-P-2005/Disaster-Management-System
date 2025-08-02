# Path: dms-backend/apps/notifications/admin.py

# admin.py
from django.contrib import admin
from .models import Notification

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = (
        'notification_id',
        'type',
        'priority',
        'status',
        'user_email',
        'incident_title',
        'timestamp',
    )
    list_filter = ('priority', 'status', 'type', 'timestamp')
    search_fields = ('user__email', 'message', 'type')
    readonly_fields = ('timestamp',)

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'User Email'

    def incident_title(self, obj):
        return obj.incident.title if obj.incident else '—'
    incident_title.short_description = 'Incident'