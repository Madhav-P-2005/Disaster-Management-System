from django.shortcuts import render

# Create your views here.

# Path :- dms-backend/admin_ops/views.py

from rest_framework.decorators import api_view , permission_classes

from rest_framework.permissions import IsAuthenticated


from rest_framework.response import Response


from users.models import User # Import the User model

from incidents.models import Incident  # Import the Incident model

from notifications.models import Notification  # Import the Notification model

from updates.models import Update  # Import the Update model

from authorities.models import Authority  # Import the Authority model

from govt_body.models import GovernmentBody  # Import the GovtBody model


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_dashboard(request):
    """
    Admin dashboard view to get statistics for admin operations.
    """
    return Response({

        'total_users': User.objects.count(),  # Count of all users

        'total_authorities': Authority.objects.count(),  # Count of all authorities

        'total_incidents': Incident.objects.count(),  # Count of all incidents

        'active_incidents': Incident.objects.filter(status='in_progress').count(),  # Count of all incidents

        'total_notifications': Notification.objects.count(),  # Count of all notifications

        'unread_notifications': Notification.objects.filter(status='unread').count(),  # Count of all notifications

        'total_updates': Update.objects.count(),  # Count of all updates



        'total_govt_bodies': GovernmentBody.objects.count(),  # Count of all government bodies


        'message': 'Admin dashboard statistics retrieved successfully.'  # Success message


    })
    # Example response structure