import { NextResponse } from "next/server";
import { chat, isConfigured } from "@/lib/llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT_FR = `Tu es IoTWatch, un agent IA d'analyse de telemetrie IoT industrielle. Tu recois un JSON de capteur (temperature, vibration, pression, debit, etc.) et tu produis un diagnostic d'anomalie en moins de 30 secondes, dans le style d'un message d'astreinte SRE.

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

Tu DOIS inventer un diagnostic realiste meme si le JSON est partiel (pas de "donnees insuffisantes"). Tu joues le role d'un ingenieur de fiabilite qui sait lire entre les lignes. Reste factuel, ton d'astreinte. Maximum 350 mots.`;

const SYSTEM_PROMPT_EN = `You are IoTWatch, an AI agent for industrial IoT telemetry analysis. You receive a sensor JSON (temperature, vibration, pressure, flow, etc.) and produce an anomaly diagnosis in under 30 seconds, in SRE on-call message style.

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

You MUST invent a realistic diagnosis even if JSON is partial (no "insufficient data"). You play the role of a reliability engineer reading between the lines. Stay factual, on-call tone. Maximum 350 words.`;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const payload: string = typeof body.payload === "string" ? body.payload.trim().slice(0, 2000) : "";
    const lang: "fr" | "en" = body.lang === "en" ? "en" : "fr";

    if (!payload) {
      return NextResponse.json(
        { error: lang === "fr" ? "Collez un JSON de capteur." : "Paste a sensor JSON." },
        { status: 400 }
      );
    }

    if (!isConfigured()) {
      return NextResponse.json(
        {
          error: "llm_not_configured",
          message: lang === "fr"
            ? "Demo en mode statique — la cle LLM sera configuree au prochain deploiement."
            : "Static demo mode — LLM key will be configured at next deploy.",
          mockBrief: buildMockBrief(payload, lang),
        },
        { status: 200 }
      );
    }

    const userMsg = lang === "fr"
      ? `Telemetrie capteur recue :\n\`\`\`json\n${payload}\n\`\`\`\nGenere le diagnostic d'anomalie complet.`
      : `Sensor telemetry received:\n\`\`\`json\n${payload}\n\`\`\`\nGenerate the full anomaly diagnosis.`;

    const { text, model } = await chat(
      [
        { role: "system", content: lang === "fr" ? SYSTEM_PROMPT_FR : SYSTEM_PROMPT_EN },
        { role: "user", content: userMsg },
      ],
      900
    );

    return NextResponse.json({ brief: text, model, generatedAt: new Date().toISOString() });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function buildMockBrief(payload: string, lang: "fr" | "en"): string {
  const sensorId = (payload.match(/"(?:id|sensor_id|device)"\s*:\s*"([^"]+)"/) || [, "PUMP-A12"])[1];
  if (lang === "en") {
    return `**🔴 Diagnosis**\n- Anomaly score 84/100 — verdict WARNING (escalation to CRITICAL likely within 8h).\n- Sensor ${sensorId}: vibration 9.2 mm/s RMS (threshold 7.0), bearing temperature 78°C (+12°C vs 7-day avg).\n\n**🔍 Root cause analysis**\n- Vibration spectrum shows 2x and 3x rotation-frequency harmonics — typical bearing wear signature, not imbalance.\n- Temperature drift correlated to vibration over last 36h, accelerating. Lubrication likely degraded.\n- No correlated load increase: pump throughput stable. Issue is mechanical, not process-driven.\n\n**⚠️ Potential impact**\n- Continued operation likely leads to bearing seizure within 5-10 days. Unplanned outage cost ~12 000 EUR/h on this line.\n\n**🛠 Recommended actions**\n- Schedule lubrication intervention next maintenance window [Maintenance]\n- Increase polling rate on ${sensorId} from 60s to 5s, add alert at vibration > 11 mm/s [SRE]\n- Order spare bearing kit, lead time 6 days [Procurement]`;
  }
  return `**🔴 Diagnostic**\n- Score d'anomalie 84/100 — verdict WARNING (escalade vers CRITICAL probable sous 8h).\n- Capteur ${sensorId} : vibration 9.2 mm/s RMS (seuil 7.0), temperature palier 78°C (+12°C vs moyenne 7 jours).\n\n**🔍 Analyse causale**\n- Spectre vibratoire montre harmoniques 2x et 3x de la frequence de rotation — signature typique d'usure de roulement, pas un balourd.\n- Derive thermique correlee a la vibration sur 36h, en acceleration. Lubrification probablement degradee.\n- Aucune correlation avec augmentation de charge : debit pompe stable. Probleme mecanique, pas process.\n\n**⚠️ Impact potentiel**\n- Maintien en service entraine probable grippage du roulement sous 5-10 jours. Cout d'arret non planifie ~12 000 EUR/h sur cette ligne.\n\n**🛠 Actions recommandees**\n- Planifier intervention lubrification a la prochaine fenetre de maintenance [Maintenance]\n- Augmenter frequence polling ${sensorId} de 60s a 5s, alerte si vibration > 11 mm/s [SRE]\n- Commander kit roulement de rechange, delai 6 jours [Achats]`;
}
