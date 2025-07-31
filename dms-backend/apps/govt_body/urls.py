# Path :-    dms-backend/apps/govt_body/urls.py


from django.urls import path

from .views import GovtBodyListCreateView, GovtBodyDetailView


urlpatterns = [

    path('', GovtBodyListCreateView.as_view(), name='govt-body-list-create'),  # Endpoint to list and create government bodies

    path('<int:pk>/', GovtBodyDetailView.as_view(), name='govt-body-detail'),  # Endpoint to retrieve, update, or delete a specific government body by ID

    # Later, for filtering by zone or department:
    # path('zone/<str:zone>/', GovtBodyByZoneView.as_view(), name='govt-body-zone'),
]