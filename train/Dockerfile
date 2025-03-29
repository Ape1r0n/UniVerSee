FROM python:3.10.12-slim

WORKDIR /app

COPY requirements.txt .
COPY data_loader.py .
COPY universee2025.json .
COPY train/train.py ./train/

RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir -p data models

VOLUME ["/app/data", "/app/models"]

CMD ["sh", "-c", "python data_loader.py && python train/train.py"]
