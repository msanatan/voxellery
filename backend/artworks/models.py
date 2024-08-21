import uuid

from django.db import models
from django.contrib.auth.models import User

class Artwork(models.Model):
    # Use UUIDs which work better for distributed systems
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    url = models.CharField("Media URL", max_length=1024, null=False, blank=False)
    title = models.CharField("Title", max_length=256, null=False, blank=False)
    alt_text = models.TextField("Alt Text", null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
