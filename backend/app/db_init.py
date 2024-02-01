from django.db import models
import requests
import json

url = "http://localhost:8000/api/db/init"

with open('./models_init.json', 'r') as file:
    data = json.load(file)

# dataをJSON形式の文字列に変換してPOSTリクエストを送信
res = requests.post(url, json=data, headers={'Content-Type': 'application/json'})

print(res.text)
