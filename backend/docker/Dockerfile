FROM debian:bullseye-slim

RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y python3 && \
    apt-get install -y python3-pip && \
    apt-get install -y pkg-config && \
    apt-get install -y mariadb-server && \
    apt-get install -y default-libmysqlclient-dev && \
    apt-get install -y gcc && \
    apt-get install -y libc-dev && \
    apt-get install -y tzdata

ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app
COPY requirements.txt /app/

RUN pip install -U pip\
    && pip install -r requirements.txt \
    && pip install requests
