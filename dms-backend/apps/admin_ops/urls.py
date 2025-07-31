# Path :- dms-backend/apps/admin_ops/urls.py


from django.urls import path 


from .views import admin_dashboard 


urlpatterns = [

   #  Correct for functional-based view
    path('summary/', admin_dashboard, name='admin-dashboard-summary'),  # Endpoint to retrieve admin dashboard summary

]