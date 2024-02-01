from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from .views import ProductInfoViewSet, ProductPilgrimageViewSet, get_pilgrim_by_id
from .views import json_post_test, get_front_data, get_title, get_pilgrim
from .views import init_db

router = DefaultRouter()
router.register('productinfo', ProductInfoViewSet)
router.register('productpilgrimage', ProductPilgrimageViewSet)

urlpatterns = [
    path('', include(router.urls)),

    path('titles', get_title),
    path('pilgrims', get_pilgrim),

    path('select/<int:id>', get_pilgrim_by_id),
    path('search', json_post_test),

    path('endpoint', get_front_data),

    path('db/init', init_db),
]
