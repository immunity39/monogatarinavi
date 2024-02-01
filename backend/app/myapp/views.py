from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from .models import ProductInfo, ProductPilgrimage
from .serializers import ProductInfoSerializer, ProductPilgrimageSerializer
import json
from .serializers import PostProductPilgrimSerializer

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the myapp index.")

class ProductInfoViewSet(viewsets.ModelViewSet):
    queryset = ProductInfo.objects.all()
    serializer_class = ProductInfoSerializer

class ProductPilgrimageViewSet(viewsets.ModelViewSet):
    queryset = ProductPilgrimage.objects.all()
    serializer_class = ProductPilgrimageSerializer

@api_view(['GET'])
def get_title(request):
    if request.method == 'GET':
        queryset = ProductInfo.objects.all()
        id_cnt = 0
        result = []
        for i in queryset:
            result.append({
                'id': id_cnt,
                'title': i.name
            })
            id_cnt += 1
        return JsonResponse(result, safe=False)

@api_view(['GET'])
def get_pilgrim(request):
    if request.method == 'GET':
        queryset = ProductPilgrimage.objects.all()
        id_cnt = 0
        result = []
        for i in queryset:
            result.append({
                'id': id_cnt,
                'name': i.location,
                'latitude': i.latitude,
                'longitude': i.longitude,
                'gone': i.gone
            })
            id_cnt += 1
        return JsonResponse(result, safe=False)

@api_view(['GET'])
def get_pilgrim_by_id(request, id):
    if request.method == 'GET':
        queryset = ProductPilgrimage.objects.filter(info_id=id)
        serializer_class = ProductPilgrimageSerializer(queryset, many=True)
        return JsonResponse(serializer_class.data, safe=False)

@api_view(['POST'])
def json_post_test(request):
    if request.method == 'GET':
        return JsonResponse({})

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        id_cnt = 0
        result = []
        for i in data:
            title = i.get('title')
            product = ProductInfo.objects.get(name=title)
            pilgrim = ProductPilgrimage.objects.filter(info_id=product)

            res_info = []
            for addr_cnt, p in enumerate(pilgrim):
                res_info.append({
                    'id': addr_cnt,
                    'name': p.location,
                    'latitude': 0.0,
                    'longitude': 0.0,
                    'gone': 0
                })

            result.append({
                'id': id_cnt,
                'title': title,
                'address': res_info
            })
            id_cnt += 1

        return JsonResponse(result, safe=False)

@api_view(['GET'])
def get_front_data(request):
    if request.method == 'GET':
        json_data = json.loads(request.body.decode('utf-8'))

@csrf_exempt
@api_view(['POST'])
def init_db(request):
    if request.method == 'GET':
        return JsonResponse({'message': 'GET : hi get method!'}, status=200)
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))

            # insert db data (like init)
            for title, locats in data.items():
                product = ProductInfo.objects.create(name=title)
                for locat in locats:
                    ProductPilgrimage.objects.create(
                        info_id = product,
                        location = locat,
                        latitude = 0.0,
                        longitude = 0.0,
                        gone = False
                    )
            return JsonResponse({'message': 'Data inserted successfully.'})
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)
