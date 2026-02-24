import json
import random
import uuid
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from kafka import KafkaProducer

KAFKA_BROKER = 'kafka:29092' 
TOPIC = 'vetlab_supply_chain_stream'

def generate_full_lifecycle_data():
    producer = KafkaProducer(
        bootstrap_servers=[KAFKA_BROKER],
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )

    customers = ['ZOETIS', 'ELANCO', 'MERCK', 'BOEHRINGER', 'CEVA']
    csm_types = ['Label', 'Bottle', 'Dropper', 'Sticker', 'Box', 'Cap']
    skus = [f"VET-SKU-{i:03}" for i in range(1, 10)]
    warehouse_coords = {"lat": 51.5074, "lng": -0.1278}
    customer_hubs = {
        'ZOETIS': {"lat": 52.4862, "lng": -1.8904},
        'ELANCO': {"lat": 53.4808, "lng": -2.2426},
        'MERCK': {"lat": 55.8642, "lng": -4.2518}, 
        'BOEHRINGER': {"lat": 51.4545, "lng": -2.5879},
        'CEVA': {"lat": 50.8225, "lng": -0.1372}
    }

    for _ in range(random.randint(5, 10)):
        cust = random.choice(customers)
        sku = random.choice(skus)
        order_id = f"ORD-{cust}-{uuid.uuid4().hex[:5].upper()}"
        
        is_backlog = random.random() < 0.1
        promised_date = datetime.now() + timedelta(days=20 if not is_backlog else -2)
        production_start = promised_date - timedelta(days=10)
        machine_down = random.random() < 0.05
        qa_fail = random.random() < 0.1
        weather_multiplier = random.uniform(1.0, 1.8)
        
        # 1. PRODUCTION
        prod_data = {"table": "production_runs", "data": {"run_id": f"RUN-{uuid.uuid4().hex[:5].upper()}", "order_id": order_id, "sku_id": sku, "status": "DOWN" if machine_down else "Scheduled", "start_date": production_start.strftime('%Y-%m-%d')}}
        producer.send(TOPIC, prod_data)

        # 2. INVENTORY
        for mat in random.sample(csm_types, 2):
            arrival_date = production_start - timedelta(days=2) + timedelta(days=random.randint(0, 5) if random.random() < 0.2 else 0)
            csm_data = {"table": "csm_inventory", "data": {"order_id": order_id, "material_name": f"{cust} {mat} Batch-A", "expected_arrival_date": arrival_date.strftime('%Y-%m-%d'), "status": "Shortage" if arrival_date > production_start else "On-Track"}}
            producer.send(TOPIC, csm_data)

        # 3. SHIPMENTS
        shipment_data = {"table": "shipments", "data": {"shipment_id": f"SHIP-{uuid.uuid4().hex[:5].upper()}", "order_id": order_id, "origin_lat": warehouse_coords["lat"], "origin_lng": warehouse_coords["lng"], "dest_lat": customer_hubs[cust]["lat"], "dest_lng": customer_hubs[cust]["lng"], "weather_impact": weather_multiplier, "vehicle_type": random.choice(["HGV", "Sprinter", "Electric"]), "status": "QA Hold" if qa_fail else "Planned", "promised_date": promised_date.strftime('%Y-%m-%d')}}
        producer.send(TOPIC, shipment_data)

        # 4. MICRO-LOGISTICS & TELEMETRY (NEW)
        telemetry_data = {
            "table": "order_telemetry",
            "data": {
                "order_id": order_id,
                "truck_no": f"VET-{random.randint(100,999)}",
                "model": random.choice(["Volvo FH Electric", "Mercedes Actros L", "Scania R-Series"]),
                "driver_id": f"DRV-{random.randint(1000,9999)}",
                "weather_conditions": "Heavy Rain, 8°C" if weather_multiplier > 1.3 else "Clear, 18°C",
                "wind_speed_mph": round(random.uniform(5.0, 35.0), 1),
                "machine_id": f"LINE-0{random.randint(1,9)}",
                "temperature_c": round(random.uniform(2.0, 8.0), 1), # Cold chain temp
                "phase_etas": json.dumps({
                    "intake": "Complete",
                    "production": "Complete",
                    "qa_release": (datetime.now() + timedelta(hours=random.randint(2, 24))).strftime('%H:%M UTC'),
                    "dispatch": (datetime.now() + timedelta(days=1)).strftime('%H:%M UTC')
                })
            }
        }
        producer.send(TOPIC, telemetry_data)

    producer.flush()

default_args = {'owner': 'anubhav_jetley', 'start_date': datetime(2026, 2, 8)}
with DAG('vetlab_full_lifecycle_generator', default_args=default_args, schedule_interval='@hourly', catchup=False) as dag:
    run_simulation = PythonOperator(task_id='stream_to_kafka', python_callable=generate_full_lifecycle_data)