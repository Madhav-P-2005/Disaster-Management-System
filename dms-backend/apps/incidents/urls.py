# Path :- dms-backend/apps/incidents/models.py

from django.urls import path 


from .views import IncidentListCreateView , IncidentDetailView


urlpatterns = [

    path('', IncidentListCreateView.as_view() , name='incident-list-create'),  # Endpoint to list and create incidents

    path('<int:pk>/', IncidentDetailView.as_view() , name='incident-detail'),  # Endpoint to retrieve, update, or delete a specific incident by ID

]