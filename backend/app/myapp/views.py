from django.shortcuts import render, get_object_or_404
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

@csrf_exempt
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

@csrf_exempt
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

@csrf_exempt
@api_view(['GET'])
def get_pilgrim_by_id(request, id):
    if request.method == 'GET':
        queryset = ProductPilgrimage.objects.filter(info_id=id)
        serializer_class = ProductPilgrimageSerializer(queryset, many=True)
        return JsonResponse(serializer_class.data, safe=False)

@csrf_exempt
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

@csrf_exempt
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
                        location = locat['name'],
                        latitude = locat['coordinates']['latitude'],
                        longitude = locat['coordinates']['longitude'],
                        gone = False
                    )
            return JsonResponse({'message': 'Data inserted successfully.'})
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)

def get_data_for_user(product):
    result = []
    pilgrim = ProductPilgrimage.objects.filter(info_id=product)

    addr_cnt = 0
    for p in pilgrim:
        p_gone = 0
        if p.gone == True:
            p_gone = 1
        result.append({
            'id': addr_cnt,
            'name': p.location,
            'latitude': p.latitude,
            'longitude': p.longitude,
            'gone': p_gone
        })
        addr_cnt += 1
    return result
    
@csrf_exempt
@api_view(['POST'])
def get_user_all_data(request):
    if request.method == 'GET':
        return JsonResponse({})

    data = json.loads(request.body.decode('utf-8'))
    result = []
    id_cnt = 0

    for i in data:
        title = i.get('title')
        product = ProductInfo.objects.get(name=title)

        result.append({
            'id': id_cnt,
            'title': title,
            'address': get_data_for_user(product=product)
        })
        id_cnt += 1
    return JsonResponse(result, safe=False)

@csrf_exempt
@api_view(['GET'])
def get_all_data(request):
    if request.method == 'POST':
        return JsonResponse({})
    
    product = ProductInfo.objects.all()
    id_cnt = 0
    result = []
    for i in product:
        pilgrim = ProductPilgrimage.objects.filter(info_id=i)
        title = i.name

        res_info = []
        addr_cnt = 0
        for k in pilgrim:
            k_gone = 0
            if k.gone == True:
                k_gone = 1
            res_info.append({
                'id': addr_cnt,
                'name': k.location,
                'latitude': k.latitude,
                'longitude': k.longitude,
                'gone': k_gone
            })
            addr_cnt += 1
        
        result.append({
            'id': id_cnt,
            'title': title,
            'address': res_info
        })
        id_cnt += 1
    return JsonResponse(result, safe=False)

@csrf_exempt
@api_view(['POST'])
def ch_user_gone(request):
    if request.method == 'GET':
        return "GET method"

    try:
        data = json.loads(request.body.decode('utf-8'))
        for i in data:
            name = i.get('title')
            product = get_object_or_404(ProductInfo, name=name)
            location = i.get('location')
            pilgrim = get_object_or_404(ProductPilgrimage, info_id=product, location=location)

            if pilgrim.gone == False:
                pilgrim.gone = True
            pilgrim.save()
        return "changed!"
    except Exception as e:
        return str(e)
    
