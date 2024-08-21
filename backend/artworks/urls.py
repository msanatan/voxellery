from django.urls import path, include
from rest_framework import routers

from .views import ArtworkViewSet

router = routers.DefaultRouter()
router.register(r'artworks', ArtworkViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
