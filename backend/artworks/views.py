from rest_framework import viewsets

from .models import Artwork
from .permissions import IsOwnerOrReadOnly
from .serializers import ArtworkSerializer


class ArtworkViewSet(viewsets.ModelViewSet):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    permission_classes = [IsOwnerOrReadOnly]
