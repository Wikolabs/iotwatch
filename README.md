# IoTWatch — Monitoring industriel IoT MQTT/LoRaWAN/Modbus temps réel

> Vos capteurs industriels surveillés en temps réel. Pannes prédites. Alertes avant incident.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org)
[![TimescaleDB](https://img.shields.io/badge/TimescaleDB-2.14-FDB515?style=flat)](https://timescale.com)
[![MQTT](https://img.shields.io/badge/MQTT-5.0-660099?style=flat)](https://mqtt.org)

---

## Vue d'ensemble

IoTWatch est une plateforme de monitoring industriel IoT multi-protocole (MQTT, LoRaWAN, Modbus TCP/RTU). Elle ingère les données de capteurs (température, vibration, pression, débit, énergie), les stocke en séries temporelles avec TimescaleDB, détecte les anomalies par ML, et prédit les pannes (Predictive Maintenance) avant qu'elles n'impactent la production.

**Domaine :** Industrial IoT / Predictive Maintenance / Industry 4.0  
**Port VM :** 3029 | **Sous-domaine :** iotwatch.wikolabs.com

---

## Stack technique

| Couche | Technologie | Rôle |
|--------|------------|------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Recharts | Dashboard capteurs, alertes, prédiction |
| Backend | FastAPI (Python 3.11), Uvicorn | API ingestion, query, analyse |
| Protocoles | Eclipse Mosquitto (MQTT 5.0), ChirpStack (LoRaWAN), pymodbus | Multi-protocol gateway |
| Time-Series DB | **TimescaleDB** 2.14 (PostgreSQL extension) | Séries temporelles haute performance |
| ML Anomaly | scikit-learn (Isolation Forest) | Détection anomalies multivariées |
| Predictive | Prophet (Facebook) | Prédiction dégradation machines |
| Cache | Redis 7 (Pub/Sub) | Stream capteurs temps réel |
| Infra | Docker Compose, Nginx | VM mono-repo (port 3029) |

### backend/requirements.txt
```
fastapi==0.111.0
uvicorn[standard]==0.29.0
paho-mqtt==2.0.0
pymodbus==3.6.6
scikit-learn==1.4.2
prophet==1.1.5
pandas==2.2.2
numpy==1.26.4
asyncpg==0.29.0
sqlalchemy[asyncio]==2.0.30
redis==5.0.4
pydantic==2.7.1
```

---

## Architecture mono-repo

```
iotwatch/
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx              # Dashboard overview capteurs
│   │   ├── assets/               # Vue par machine/asset
│   │   ├── alerts/               # Alertes actives + historique
│   │   ├── predictions/          # Prédictions maintenance
│   │   └── energy/               # Monitoring consommation énergie
│   └── src/components/
│       ├── SensorGauge.tsx       # Jauge capteur temps réel
│       ├── TimeseriesChart.tsx   # Recharts séries temporelles
│       ├── AnomalyBadge.tsx      # Indicateur anomalie détectée
│       ├── MaintenancePred.tsx   # Prédiction RUL (remaining life)
│       └── FloorMap.tsx          # Plan usine avec capteurs
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   │   ├── sensors.py        # GET données capteurs
│   │   │   ├── alerts.py         # Alertes + règles
│   │   │   ├── predictions.py    # Predictive maintenance
│   │   │   └── energy.py         # Monitoring énergie
│   │   ├── services/
│   │   │   ├── mqtt_gateway.py   # Eclipse Mosquitto subscriber
│   │   │   ├── modbus_poll.py    # Polling Modbus TCP/RTU
│   │   │   ├── lorawan.py        # ChirpStack integration
│   │   │   ├── anomaly.py        # Isolation Forest detection
│   │   │   └── predictor.py      # Prophet RUL estimation
│   │   └── models/
│   │       └── sensor.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── .github/workflows/deploy.yml
```

---

## Diagrammes UML

### Architecture système

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#1a3a4a', 'primaryTextColor': '#fdb515', 'primaryBorderColor': '#fdb515', 'lineColor': '#374151', 'secondaryColor': '#0d2233'}}}%%
flowchart TB
    subgraph VM["🖥️ VM — Docker Compose (port 3029)"]
        NEXT["Next.js 14\nIoT Dashboard"]
        API["FastAPI"]

        subgraph IOT["⚙️ IoT Engine"]
            MQTT["MQTT Gateway\nEclipse Mosquitto"]
            MODBUS["Modbus Poller\nTCP/RTU"]
            LORA["LoRaWAN\nChirpStack"]
            ANOMALY["Isolation Forest\nAnomaly detection"]
            PROPHET["Prophet\nRUL prediction"]
        end

        TSDB[("TimescaleDB\nTime-series data")]
        REDIS[("Redis Pub/Sub\nLive stream")]
    end

    subgraph FIELD["🏭 Terrain"]
        SENSOR_M["Capteurs MQTT\nTemperature, vibration"]
        PLC["PLC Modbus\nPressure, flow, energy"]
        LORA_DEV["LoRaWAN Sensors\nRemote assets"]
    end

    SENSOR_M --> MQTT
    PLC --> MODBUS
    LORA_DEV --> LORA
```

### Séquence — Détection anomalie et alerte maintenance

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#1a3a4a', 'primaryTextColor': '#fdb515', 'lineColor': '#374151'}}}%%
sequenceDiagram
    participant SENSOR as Capteur MQTT
    participant GW as MQTT Gateway
    participant API as FastAPI
    participant TSDB as TimescaleDB
    participant ANML as Anomaly Engine
    participant PRED as Prophet
    participant OPS as Opérateur

    SENSOR->>GW: publish("plant/machine-01/vibration", {rms: 12.4, peak: 38.2, temp: 74, ts: 1710500000})

    GW->>API: ingest(machine_id="machine-01", sensor_type="vibration", value={rms: 12.4, peak: 38.2})
    API->>TSDB: INSERT INTO sensor_readings (machine_id, type, rms, peak, temperature, ts)
    API->>REDIS: PUBLISH "live/machine-01" {rms: 12.4}

    Note over API: Toutes les 5 minutes : analyse fenêtre glissante
    API->>TSDB: SELECT last 2h vibration data WHERE machine_id = 'machine-01'
    TSDB-->>API: 120 readings

    API->>ANML: detect_anomaly(readings_120, model=isolation_forest)
    Note over ANML: score=-0.72 (threshold=-0.5) → anomalie détectée
    ANML-->>API: {anomaly: true, score: -0.72, features: {rms: +3.4σ, temp: +2.1σ}}

    API->>PRED: predict_rul(machine_id, anomaly_history, vibration_trend)
    Note over PRED: Prophet trend + seasonality → dégradation exponentielle
    PRED-->>API: {rul_days: 12, confidence_interval: [8, 18], recommended_action: "inspection_required"}

    API->>OPS: alert(severity=HIGH, {machine: "machine-01", rul_days: 12, action: "Schedule inspection before 2026-06-08"})
    OPS-->>API: acknowledge(alert_id, scheduled_maintenance: "2026-06-05")
```

### Modèle de données (ER)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#1a3a4a', 'primaryTextColor': '#fdb515', 'lineColor': '#374151'}}}%%
erDiagram
    ASSET {
        uuid id PK
        string name
        string asset_type
        string location
        string protocol
        string mqtt_topic
        int modbus_address
        string status
        timestamp installed_at
    }
    SENSOR_READING {
        bigint id PK
        uuid asset_id FK
        string metric_name
        float value
        string unit
        jsonb raw_payload
        timestamp ts
    }
    ANOMALY {
        uuid id PK
        uuid asset_id FK
        float anomaly_score
        jsonb features
        string severity
        string status
        timestamp detected_at
    }
    MAINTENANCE_PREDICTION {
        uuid id PK
        uuid asset_id FK
        int rul_days
        int rul_low
        int rul_high
        string recommended_action
        timestamp predicted_at
    }
    ALERT {
        uuid id PK
        uuid asset_id FK
        uuid anomaly_id FK
        string severity
        string message
        string channel
        boolean acknowledged
        timestamp created_at
    }

    ASSET ||--o{ SENSOR_READING : "emits"
    ASSET ||--o{ ANOMALY : "triggers"
    ASSET ||--o{ MAINTENANCE_PREDICTION : "gets"
    ANOMALY ||--o{ ALERT : "generates"
```

---

## PRD

### Problème
Les pannes de machines industrielles non anticipées coûtent en moyenne 260 000€/heure en arrêt de production. Le monitoring actuel est souvent basique (seuils statiques, alertes retardées) et ne permet pas de prédire une défaillance imminente. Les équipes maintenance arrivent après la panne, jamais avant.

### Solution
IoTWatch connecte tous les capteurs industriels (MQTT, Modbus, LoRaWAN), détecte les dégradations par ML (Isolation Forest multivariée), et prédit la durée de vie résiduelle des machines (Remaining Useful Life) avec Prophet. L'opérateur planifie la maintenance avant la panne.

### Utilisateurs cibles
| Persona | Besoin |
|---------|--------|
| Responsable Maintenance | Prédire pannes, planifier maintenance préventive |
| Directeur Production | Dashboard santé flotte machines + KPIs OEE |
| IoT Engineer | Connecter et monitorer nouveaux capteurs |

### OKRs
- Détection anomalie : < 5 minutes après première déviation
- Précision prédiction panne : 80% dans la fenêtre de 2 semaines
- Réduction arrêts non planifiés : -60%

---

## User Stories

```
US-01 [Maintenance] En tant que responsable maintenance,
      je veux voir le RUL (jours restants avant panne estimée)
      pour chaque machine critique
      afin de planifier les maintenances préventives à l'avance.

US-02 [Ops] En tant qu'opérateur de production,
      je veux recevoir une alerte sur mon mobile
      quand la vibration d'une machine dépasse 3 sigma
      afin d'intervenir avant la panne.

US-03 [IoT Engineer] En tant qu'ingénieur IoT,
      je veux connecter un nouveau PLC Modbus
      en 10 minutes avec une interface de configuration
      afin d'intégrer rapidement de nouveaux équipements.

US-04 [Directeur] En tant que directeur production,
      je veux voir le OEE (Overall Equipment Effectiveness)
      calculé automatiquement depuis les données capteurs
      afin de mesurer la performance de mon atelier.

US-05 [Maintenance] En tant que technicien,
      je veux voir l'historique de toutes les anomalies d'une machine
      sur 12 mois avec leur sévérité et statut de résolution
      afin de comprendre les patterns de dégradation.
```

---

## Règles métier

| # | Règle | Description | Simulable UI |
|---|-------|-------------|-------------|
| R1 | Multi-protocole | MQTT, Modbus TCP/RTU, LoRaWAN supportés simultanément | ✅ Protocol badge |
| R2 | Isolation Forest | Modèle entraîné sur 30j de baseline par machine | ✅ Model info |
| R3 | Seuils statiques | Alertes immédiates sur dépassement seuils critiques | ✅ Threshold config |
| R4 | Anomalie score | Score < -0.5 → warning, < -0.7 → critical | ✅ Score gauge |
| R5 | RUL Prophet | Prédiction sur 30j avec intervalles de confiance 80% | ✅ RUL chart |
| R6 | Agrégation | Downsampling : 1s → 1min → 1h (retention 1an) | ✅ Resolution toggle |
| R7 | Canaux alertes | Email + Webhook (Slack/Teams) + SMS | ✅ Alert channels |
| R8 | Maintenance log | Toute intervention enregistrée = reset baseline ML | ✅ Maintenance record |
| R9 | OEE auto | Availability × Performance × Quality calculés | ✅ OEE dashboard |
| R10 | Energy KPIs | kWh par pièce produite, peak detection, anomalie conso | ✅ Energy view |

---

## Spécification API

**Base URL :** `http://iotwatch.wikolabs.com/api/v1`

### POST /ingest/mqtt
```json
{"asset_id": "machine-01", "metrics": {"vibration_rms": 12.4, "temperature_c": 74, "pressure_bar": 3.2}, "ts": 1710500000000}
// Response: {"ingested": true, "anomaly_score": -0.72, "alert_triggered": true}
```

### GET /assets/{id}/timeseries
```json
// GET /assets/machine-01/timeseries?metric=vibration_rms&from=2026-05-20&to=2026-05-27&resolution=1h
// Response: {"data": [{"ts": "2026-05-20T00:00:00", "value": 8.2}, ...], "unit": "m/s²"}
```

### GET /assets/{id}/prediction
```json
// Response: {"rul_days": 12, "confidence_low": 8, "confidence_high": 18, "degradation_trend": "accelerating", "recommended_action": "inspection_required"}
```

---

## Simulation UI

| Composant | Description |
|-----------|-------------|
| **Floor Map** | Plan d'usine SVG avec capteurs colorés en temps réel |
| **Sensor Gauge** | Jauges semi-circulaires par métrique (vibration, temp, pression) |
| **Timeseries Chart** | Recharts multi-série + zone d'anomalie en rouge |
| **RUL Card** | Jours restants estimés + bar de confiance + recommandation |
| **OEE Dashboard** | Trois demi-jauges : Availability / Performance / Quality |

---

## Déploiement

```yaml
version: "3.9"
services:
  timescaledb:
    image: timescale/timescaledb:2.14.2-pg16
    environment: {POSTGRES_DB: iotwatch, POSTGRES_USER: iot_user, POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"}
    volumes: [pg_data:/var/lib/postgresql/data]
  redis:
    image: redis:7-alpine
  mosquitto:
    image: eclipse-mosquitto:2
    volumes: [./mosquitto.conf:/mosquitto/config/mosquitto.conf]
    ports: ["1883:1883"]
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql+asyncpg://iot_user:${POSTGRES_PASSWORD}@timescaledb/iotwatch
      REDIS_URL: redis://redis:6379
      MQTT_BROKER: mosquitto
    depends_on: [timescaledb, redis, mosquitto]
    expose: ["8000"]
  frontend:
    build: ./frontend
    expose: ["3000"]
  nginx:
    image: nginx:alpine
    ports: ["3029:80"]
volumes:
  pg_data:
```

---

## Roadmap

### Phase 1 — MVP
- [ ] MQTT ingestion + TimescaleDB
- [ ] Dashboard capteurs temps réel
- [ ] Alertes seuils statiques

### Phase 2 — ML
- [ ] Isolation Forest anomaly detection
- [ ] Prophet RUL prediction
- [ ] Modbus + LoRaWAN gateways

### Phase 3 — Industry 4.0
- [ ] OEE automatique
- [ ] Digital twin (simulation machine)
- [ ] Intégration SCADA/ERP (SAP PM)

---

*Un produit [Wikolabs](https://wikolabs.com) — Intelligence artificielle appliquée aux métiers*
