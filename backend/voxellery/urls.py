from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("artworks/", include("artworks.urls")),
    path('admin/', admin.site.urls),
]
