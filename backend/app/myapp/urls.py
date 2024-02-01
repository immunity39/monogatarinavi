from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from .views import ProductInfoViewSet, ProductPilgrimageViewSet, get_pilgrim_by_id
from .views import json_post_test, get_front_data, get_title, get_pilgrim
from .views import get_all_data, get_user_all_data
from .views import init_db

router = DefaultRouter()
router.register('productinfo', ProductInfoViewSet)
router.register('productpilgrimage', ProductPilgrimageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('select/<int:id>', get_pilgrim_by_id),

    # productのtitleを0-indexで表示
    path('titles', get_title),
    # product.pilgrimを0-indexで表示
    path('pilgrims', get_pilgrim),

    # db内部のデータをjson形式で全表示 0-index
    path('all_data', get_all_data),
    # user入力情報のデータをjson形式で全表示 0-index
    path('user_all_data', get_user_all_data),

    # 1タイトルの検索結果を表示
    path('search', json_post_test),
    path('endpoint', get_front_data),
    path('db/init', init_db),
]
