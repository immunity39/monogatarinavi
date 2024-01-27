FROM python:3.11-alpine

ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app
COPY requirements.txt /app/

RUN pip install -U pip\
    && pip install -r requirements.txt

RUN apk add --no-cache pkgconfig &&\
    apk add --no-cache mariadb-dev &&\
    apk add --no-cache gcc &&\
    apk add --no-cache libc-dev
RUN pip install django
RUN pip install mysqlclient
