from django.db import models

class ProductInfo(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ProductPilgrimage(models.Model):
    info_id = models.ForeignKey(ProductInfo, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    x_position = models.FloatField()
    y_position = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.location
