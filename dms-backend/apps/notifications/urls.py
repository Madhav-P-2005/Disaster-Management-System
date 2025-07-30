# Path :-  dms-backend/apps/notifications/urls.py


from django.urls import path

from .views import NotificationListCreateView, NotificationDetailView


urlpatterns = [
    path('', NotificationListCreateView.as_view(), name='notification-list-create'),  # Endpoint to list and create notifications

    path('<int:pk>/', NotificationDetailView.as_view(), name='notification-detail'),  # Endpoint to retrieve, update, or delete a specific notification by ID
]
