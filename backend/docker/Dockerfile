FROM python:3.11-alpine


RUN mkdir /app
COPY requirements.txt /app/
WORKDIR /app

RUN pip install -U pip\
    && pip install -r requirements.txt
