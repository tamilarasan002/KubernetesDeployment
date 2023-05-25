FROM python:3.11.1-slim@sha256:1591aa8c01b5b37ab31dbe5662c5bdcf40c2f1bce4ef1c1fd24802dae3d01052 as builder
FROM base as builder

WORKDIR /app

COPY requirements.txt .
COPY locustfile.py .

RUN pip install --no-cache-dir -r requirements.txt

COPY --from=builder /install /usr/local

EXPOSE 8080

CMD [ "locust", "-f", "locustfile.py" ]

