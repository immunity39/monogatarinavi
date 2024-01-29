from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from .views import ProductInfoViewSet, ProductPilgrimageViewSet

router = DefaultRouter()
router.register('productinfo', ProductInfoViewSet)
router.register('productpilgrimage', ProductPilgrimageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
