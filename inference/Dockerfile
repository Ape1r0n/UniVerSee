FROM python:3.10.12-slim

WORKDIR /app

COPY requirements.txt .
COPY models ./models
COPY inference/run_inference.py ./inference/

RUN pip install --no-cache-dir -r requirements.txt && \
    mkdir -p predictions

VOLUME /app/predictions
EXPOSE 8197

CMD ["python", "inference/run_inference.py"]
