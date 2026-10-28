/**
 * POST /api/feedback — recibe la opinión del diálogo "¿Te está gustando la web?"
 * y te la manda por email con Resend (https://resend.com).
 *
 * Variables de entorno (en Vercel: Settings → Environment Variables):
 * - RESEND_API_KEY       clave de la API de Resend
 * - FEEDBACK_TO_EMAIL    dónde quieres recibir las opiniones
 * - FEEDBACK_FROM_EMAIL  remitente verificado en Resend (opcional;
 *                        por defecto "Portfolio <onboarding@resend.dev>")
 *
 * Protección básica contra spam: campo trampa, tiempo mínimo rellenando,
 * mismo origen y un límite de envíos por IP.
 */

const REACTIONS = { love: "😍 Me encanta", ok: "👍 Está bien", meh: "🤔 Mejorable" } as const;
type Reaction = keyof typeof REACTIONS;

const MAX_COMMENT = 1000;
const MIN_ELAPSED_MS = 1500; // menos que esto suele ser un bot
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Límite por IP en memoria: en serverless es "mejor esfuerzo" (cada instancia
// lleva su cuenta), suficiente para un portfolio.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: object, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  // Solo desde la propia web.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json({ ok: false }, 403);

  if (Number(request.headers.get("content-length") ?? 0) > 4096) return json({ ok: false }, 413);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }

  const reaction = body.reaction as Reaction;
  const comment = typeof body.comment === "string" ? body.comment.trim().slice(0, MAX_COMMENT) : "";
  const lang = typeof body.lang === "string" ? body.lang.slice(0, 5) : "?";
  const elapsed = Number(body.elapsed);

  if (!(reaction in REACTIONS)) return json({ ok: false }, 400);

  // Bot: respondemos "ok" para no darle pistas, pero no se envía nada.
  if ((typeof body.website === "string" && body.website !== "") || !(elapsed >= MIN_ELAPSED_MS)) {
    return json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) return json({ ok: false }, 429);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FEEDBACK_TO_EMAIL;
  const from = process.env.FEEDBACK_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.warn("[feedback] Falta RESEND_API_KEY o FEEDBACK_TO_EMAIL: la opinión no se ha enviado.", {
      reaction,
      comment,
      lang,
    });
    return json({ ok: false, error: "not_configured" }, 503);
  }

  const text = [
    `Valoración: ${REACTIONS[reaction]}`,
    `Idioma de la web: ${lang}`,
    "",
    comment ? `Comentario:\n${comment}` : "(sin comentario)",
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject: `Opinión sobre el portfolio: ${REACTIONS[reaction]}`, text }),
  });

  if (!res.ok) {
    console.error("[feedback] Resend respondió", res.status, await res.text().catch(() => ""));
    return json({ ok: false }, 502);
  }
  return json({ ok: true });
}
