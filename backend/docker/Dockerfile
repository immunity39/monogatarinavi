FROM python:3.11-alpine


RUN mkdir /app
WORKDIR /app
COPY requirements.txt /app/

RUN pip install -U pip\
    && pip install -r requirements.txt
