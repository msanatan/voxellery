from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include("artworks.urls")), # /artworks subpath is set in the router definition
    path("api/accounts/", include("accounts.urls")),
    path('api-auth/', include('rest_framework.urls')),
]
