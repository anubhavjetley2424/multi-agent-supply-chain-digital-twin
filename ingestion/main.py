import json
from kafka import KafkaConsumer
from supabase import create_client

# Supabase Credentials
URL = "https://keoenuzromltwleyowdt.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlb2VudXpyb21sdHdsZXlvd2R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMjI3MDgsImV4cCI6MjA4NTg5ODcwOH0.EcYmpL6HPkcbl1hfHQAjOqgRrcPXCmqbIuhdn3sAFXE"
KAFKA_BROKER = "kafka:29092"

supabase = create_client(URL, KEY)

consumer = KafkaConsumer(
    'vetlab_supply_chain_stream',
    bootstrap_servers=[KAFKA_BROKER],
    value_deserializer=lambda m: json.loads(m.decode('utf-8')),
    auto_offset_reset='earliest',
    group_id='vetlab_ingestor_v1'
)

print(f"Connecting to Kafka at {KAFKA_BROKER}...")
print("Listening for Vetlab supply chain events...")

for message in consumer:
    payload = message.value
    print(f"DEBUG: Received message for table {payload.get('table')}")
    target_table = payload.get("table")
    data = payload.get("data")

    try:
        response = supabase.table(target_table).upsert(data).execute()
        print(f"Successfully synced {target_table}")
    except Exception as e:
        print(f"Error syncing {target_table}: {e}")