FROM apache/airflow:2.7.1-python3.9

USER root
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

USER airflow
# Install Kafka so the DAG can act as a Producer
RUN pip install --no-cache-dir kafka-python psycopg2-binary