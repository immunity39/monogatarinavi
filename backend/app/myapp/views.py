from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from .models import ProductInfo, ProductPilgrimage
from .serializers import ProductInfoSerializer, ProductPilgrimageSerializer

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the myapp index.")

class ProductInfoViewSet(viewsets.ModelViewSet):
    queryset = ProductInfo.objects.all()
    serializer_class = ProductInfoSerializer

class ProductPilgrimageViewSet(viewsets.ModelViewSet):
    queryset = ProductPilgrimage.objects.all()
    serializer_class = ProductPilgrimageSerializer
