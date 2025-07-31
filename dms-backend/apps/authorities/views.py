# Path: dms-backend/apps/authorities/views.py

from rest_framework import generics, permissions, serializers
from .models import Authority
from .serializers import AuthoritySerializer


# View to list and create Authority instances
class AuthorityListCreateView(generics.ListCreateAPIView):
    queryset = Authority.objects.all()
    serializer_class = AuthoritySerializer
    permission_classes = [permissions.IsAuthenticated]  # JWT-protected

    def perform_create(self, serializer):
        if Authority.objects.filter(user=self.request.user).exists():
            raise serializers.ValidationError("Authority profile already exists for this user.")
        serializer.save(user=self.request.user)


# View to retrieve, update, or delete a specific Authority
class AuthorityDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Authority.objects.all()
    serializer_class = AuthoritySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)