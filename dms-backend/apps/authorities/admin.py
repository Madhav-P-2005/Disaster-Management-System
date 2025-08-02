# Path: dms-backend/apps/authorities/admin.py

from django.contrib import admin
from .models import Authority

@admin.register(Authority)
class AuthorityAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_email', 'user_name', 'designation', 'department', 'zone')
    search_fields = ('user__email', 'user__name', 'department', 'zone')
    list_filter = ('designation', 'zone')

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'Email'

    def user_name(self, obj):
        return obj.user.name or '—'
    user_name.short_description = 'Name'
