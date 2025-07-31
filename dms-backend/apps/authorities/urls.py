# Path :- dms-backend/apps/authorities/urls.py


from django.urls import path

from .views import AuthorityListCreateView, AuthorityDetailView


urlpatterns = [
    path('', AuthorityListCreateView.as_view(), name='authority-list-create'),  # Endpoint

    path('<int:pk>/', AuthorityDetailView.as_view(), name='authority-detail'),  # Endpoint to retrieve, update, or delete a specific authority by ID

    # Later, for filtering by zone or department:
    # path('zone/<str:zone>/', AuthorityByZoneView.as_view(), name='authority-zone'),


]