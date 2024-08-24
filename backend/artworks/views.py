from rest_framework import viewsets
from .models import Artwork
from .permissions import IsOwnerOrReadOnly
from .serializers import ArtworkSerializer

class ArtworkViewSet(viewsets.ModelViewSet):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        '''Return artworks ordered by created_at in descending order'''
        return Artwork.objects.all().order_by('-created_at')

    def get_serializer_context(self):
        '''Pass the request context to the serializer to access the user'''
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
