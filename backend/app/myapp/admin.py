from django.contrib import admin

# Register your models here.
from .models import ProductInfo, ProductPilgrimage

admin.site.register(ProductInfo)
admin.site.register(ProductPilgrimage)
