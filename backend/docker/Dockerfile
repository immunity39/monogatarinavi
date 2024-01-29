FROM ubuntu:22.04

RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y python3.11 && \
    apt-get install -y python3-pip && \
    apt-get install -y pkg-config && \
    apt-get install -y mysql-server && \
    apt-get install -y default-libmysqlclient-dev && \
    apt-get install -y gcc && \
    apt-get install -y libc-dev

ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app
COPY requirements.txt /app/

RUN pip install -U pip\
    && pip install -r requirements.txt
