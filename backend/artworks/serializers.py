import uuid

import boto3
from django.conf import settings
from rest_framework import serializers

from .models import Artwork

class ArtworkSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(write_only=True)

    class Meta:
        model = Artwork
        # The url field is generated and saved after an image upload
        fields = ['id', 'url', 'title', 'alt_text', 'created_at', 'updated_at', 'user', 'image']

    def get_url_from_s3_path(self, media_path: str) -> str:
        '''For now it's S3, later it can be CloudFront'''
        media_url = f'https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{media_path}'
        return media_url

    def save_to_s3(self, image) -> str:
        '''Save image to S3 and return it's path'''
        s3 = boto3.client('s3', region_name=settings.AWS_S3_REGION_NAME)
        unique_filename = f'{uuid.uuid4()}-{image.name}'
        s3_path = f'artworks/{unique_filename}'
        s3.upload_fileobj(image.file, settings.AWS_STORAGE_BUCKET_NAME, s3_path)
        return s3_path

    def create(self, validated_data):
        '''We save the uploaded image to S3, and then save the URL to the DB upon success'''
        image = validated_data.pop('image')
        s3_path = self.save_to_s3(image)
        media_url = self.get_url_from_s3_path(s3_path)
        validated_data['url'] = media_url
        return super().create(validated_data)
