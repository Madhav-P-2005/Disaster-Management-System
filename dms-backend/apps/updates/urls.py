# Path :-    dms-backend/apps/updates/urls.py



from django.urls import path

from .views import UpdateListCreateView, UpdateDetailView


urlpatterns = [
    path('', UpdateListCreateView.as_view(), name='update-list-create'),  # Endpoint to list and create updates

    path('<int:pk>/', UpdateDetailView.as_view(), name='update-detail'),  # Endpoint to retrieve, update, or delete a specific update by ID
]