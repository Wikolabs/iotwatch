"""IoTWatch demo backend — production-ready POC.

In production: this service would also ingest MQTT/Kafka streams, run anomaly
detection models with vector-store baseline comparison, and page on-call via
PagerDuty. For the demo: it only invokes the LLM and returns the diagnosis.
"""
import re
from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .llm import chat, is_configured

app = FastAPI(
    title="IoTWatch Demo Backend",
    description="POC backend — Groq/Gemini LLM. No third-party connections.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────────────────────────────────────
# Prompts
# ─────────────────────────────────────────────────────────────────────────────
SYSTEM_PROMPT_FR = """Tu es IoTWatch, un agent IA d'analyse de telemetrie IoT industrielle. Tu recois un JSON de capteur (temperature, vibration, pression, debit, etc.) et tu produis un diagnostic d'anomalie en moins de 30 secondes, dans le style d'un message d'astreinte SRE.

Format de sortie exact en MARKDOWN :
**🔴 Diagnostic**
- [Score d'anomalie 0-100 + verdict : NORMAL / WARNING / CRITICAL]
- [Capteur(s) implique(s), valeurs hors plage]

**🔍 Analyse causale**
- [2-3 puces : cause probable, signaux correles, derive temporelle observee]

**⚠️ Impact potentiel**
- [Risque metier si non traite dans les 6-24h]

**🛠 Actions recommandees**
- [3 puces concretes, verbe d'action, equipe destinataire entre crochets]

Tu DOIS inventer un diagnostic realiste meme si le JSON est partiel (pas de "donnees insuffisantes"). Tu joues le role d'un ingenieur de fiabilite qui sait lire entre les lignes. Reste factuel, ton d'astreinte. Maximum 350 mots."""

SYSTEM_PROMPT_EN = """You are IoTWatch, an AI agent for industrial IoT telemetry analysis. You receive a sensor JSON (temperature, vibration, pressure, flow, etc.) and produce an anomaly diagnosis in under 30 seconds, in SRE on-call message style.

Exact MARKDOWN output format:
**🔴 Diagnosis**
- [Anomaly score 0-100 + verdict: NORMAL / WARNING / CRITICAL]
- [Sensor(s) involved, out-of-range values]

**🔍 Root cause analysis**
- [2-3 bullets: probable cause, correlated signals, observed temporal drift]

**⚠️ Potential impact**
- [Business risk if not addressed in 6-24h]

**🛠 Recommended actions**
- [3 concrete bullets, action verb, target team in brackets]

You MUST invent a realistic diagnosis even if JSON is partial (no "insufficient data"). You play the role of a reliability engineer reading between the lines. Stay factual, on-call tone. Maximum 350 words."""


# ─────────────────────────────────────────────────────────────────────────────
# Models
# ─────────────────────────────────────────────────────────────────────────────
class GenerateRequest(BaseModel):
    sensor_json: str = Field(..., min_length=1, max_length=2000)
    lang: Literal["fr", "en"] = "fr"


class GenerateResponse(BaseModel):
    brief: str
    model: str
    generated_at: str
    static_mode: bool = False


# ─────────────────────────────────────────────────────────────────────────────
# Routes
# ─────────────────────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "iotwatch-backend",
        "llm_configured": is_configured(),
    }


@app.post("/process", response_model=GenerateResponse)
async def process(req: GenerateRequest) -> GenerateResponse:
    payload = req.sensor_json.strip()
    if not payload:
        raise HTTPException(status_code=400, detail="empty_payload")

    now_iso = datetime.now(timezone.utc).isoformat()
    user_msg = (
        f"Telemetrie capteur recue :\n```json\n{payload}\n```\nGenere le diagnostic d'anomalie complet."
        if req.lang == "fr"
        else f"Sensor telemetry received:\n```json\n{payload}\n```\nGenerate the full anomaly diagnosis."
    )

    if not is_configured():
        return GenerateResponse(
            brief=_build_mock_brief(payload, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    try:
        text, model = await chat(
            [
                {"role": "system", "content": SYSTEM_PROMPT_FR if req.lang == "fr" else SYSTEM_PROMPT_EN},
                {"role": "user", "content": user_msg},
            ],
            max_tokens=900,
        )
    except Exception:
        return GenerateResponse(
            brief=_build_mock_brief(payload, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    return GenerateResponse(brief=text, model=model, generated_at=now_iso)


# ─────────────────────────────────────────────────────────────────────────────
# Mock brief (used when no LLM key configured)
# ─────────────────────────────────────────────────────────────────────────────
def _build_mock_brief(payload: str, lang: str) -> str:
    m = re.search(r'"(?:id|sensor_id|device)"\s*:\s*"([^"]+)"', payload)
    sensor_id = m.group(1) if m else "PUMP-A12"

    if lang == "en":
        return (
            f"**🔴 Diagnosis**\n"
            f"- Anomaly score 84/100 — verdict WARNING (escalation to CRITICAL likely within 8h).\n"
            f"- Sensor {sensor_id}: vibration 9.2 mm/s RMS (threshold 7.0), bearing temperature 78°C (+12°C vs 7-day avg).\n\n"
            f"**🔍 Root cause analysis**\n"
            f"- Vibration spectrum shows 2x and 3x rotation-frequency harmonics — typical bearing wear signature, not imbalance.\n"
            f"- Temperature drift correlated to vibration over last 36h, accelerating. Lubrication likely degraded.\n"
            f"- No correlated load increase: pump throughput stable. Issue is mechanical, not process-driven.\n\n"
            f"**⚠️ Potential impact**\n"
            f"- Continued operation likely leads to bearing seizure within 5-10 days. Unplanned outage cost ~12 000 EUR/h on this line.\n\n"
            f"**🛠 Recommended actions**\n"
            f"- Schedule lubrication intervention next maintenance window [Maintenance]\n"
            f"- Increase polling rate on {sensor_id} from 60s to 5s, add alert at vibration > 11 mm/s [SRE]\n"
            f"- Order spare bearing kit, lead time 6 days [Procurement]"
        )
    return (
        f"**🔴 Diagnostic**\n"
        f"- Score d'anomalie 84/100 — verdict WARNING (escalade vers CRITICAL probable sous 8h).\n"
        f"- Capteur {sensor_id} : vibration 9.2 mm/s RMS (seuil 7.0), temperature palier 78°C (+12°C vs moyenne 7 jours).\n\n"
        f"**🔍 Analyse causale**\n"
        f"- Spectre vibratoire montre harmoniques 2x et 3x de la frequence de rotation — signature typique d'usure de roulement, pas un balourd.\n"
        f"- Derive thermique correlee a la vibration sur 36h, en acceleration. Lubrification probablement degradee.\n"
        f"- Aucune correlation avec augmentation de charge : debit pompe stable. Probleme mecanique, pas process.\n\n"
        f"**⚠️ Impact potentiel**\n"
        f"- Maintien en service entraine probable grippage du roulement sous 5-10 jours. Cout d'arret non planifie ~12 000 EUR/h sur cette ligne.\n\n"
        f"**🛠 Actions recommandees**\n"
        f"- Planifier intervention lubrification a la prochaine fenetre de maintenance [Maintenance]\n"
        f"- Augmenter frequence polling {sensor_id} de 60s a 5s, alerte si vibration > 11 mm/s [SRE]\n"
        f"- Commander kit roulement de rechange, delai 6 jours [Achats]"
    )
