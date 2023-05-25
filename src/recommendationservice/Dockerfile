FROM python:3.10.8-slim@sha256:49749648f4426b31b20fca55ad854caa55ff59dc604f2f76b57d814e0a47c181 as builder
FROM base as builder

RUN apt-get -qq update \
    && apt-get install -y --no-install-recommends \
        wget g++ \
    && rm -rf /var/lib/apt/lists/*
    
WORKDIR /recommendationservice

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8085

CMD [ "python", "main.py" ]
