import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In docker-compose: BACKEND_URL=http://iotwatch-backend:8000
// In local dev (next dev outside compose): falls back to localhost
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(req: Request) {
  let body: { payload?: string; lang?: "fr" | "en" } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const payload = typeof body.payload === "string" ? body.payload.trim().slice(0, 2000) : "";
  const lang: "fr" | "en" = body.lang === "en" ? "en" : "fr";

  if (!payload) {
    return NextResponse.json(
      { error: lang === "fr" ? "Collez un JSON de capteur." : "Paste a sensor JSON." },
      { status: 400 }
    );
  }

  try {
    const r = await fetch(`${BACKEND_URL}/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sensor_json: payload, lang }),
      cache: "no-store",
    });
    const j = await r.json();
    if (!r.ok) {
      return NextResponse.json({ error: j.detail || "backend_error" }, { status: r.status });
    }

    if (j.static_mode) {
      return NextResponse.json({
        error: "llm_not_configured",
        message: lang === "fr"
          ? "Demo en mode statique — la cle LLM sera configuree au prochain deploiement."
          : "Static demo mode — LLM key will be configured at next deploy.",
        mockBrief: j.brief,
      });
    }

    return NextResponse.json({
      brief: j.brief,
      model: j.model,
      generatedAt: j.generated_at,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown_error";
    return NextResponse.json({ error: `backend_unreachable: ${msg}` }, { status: 502 });
  }
}
