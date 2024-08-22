from rest_framework import serializers

from .models import VoxelleryUser

class VoxelleryUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = VoxelleryUser
        fields = ['id', 'email', 'username', 'password']
