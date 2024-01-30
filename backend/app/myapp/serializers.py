from rest_framework import serializers
from .models import ProductInfo, ProductPilgrimage

class ProductInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInfo
        fields = ['id', 'name']

class ProductPilgrimageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPilgrimage
        fields = ['id', 'info_id', 'location', 'latitude', 'longitude']

class PostProductPilgrimSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPilgrimage, ProductInfo
        fields = ['name', 'info_id', 'location', 'latitude', 'longitude']
