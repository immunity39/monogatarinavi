from django.db import models
import requests
import json

url = "http://localhost:8000/api/db/init"

data = '../models_init.json'

res = requests.post(url, data=data, headers={'Content-Type': 'application/json'})

print(res.text)

