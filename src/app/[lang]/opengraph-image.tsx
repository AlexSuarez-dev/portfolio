import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { defaultLocale, hasLocale } from "@/i18n/config";

// Imagen que aparece al compartir el enlace (LinkedIn, WhatsApp, X...).
// Se genera sola en el build, una por idioma.
export const alt = `${profile.name} · Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = hasLocale(raw) ? raw : defaultLocale;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0a0807",
          color: "#f4f1ec",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", width: 360, height: 6, borderRadius: 6, background: "#ffe3e0", boxShadow: "0 0 24px #ff2e3b, 0 0 60px #ff2e3b" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#a39a92" }}>{profile.headline[lang]}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a39a92" }}>
          <span>{profile.siteUrl.replace(/^https?:\/\//, "")}</span>
          <span style={{ width: 120, height: 2, background: "#ff2e3b", alignSelf: "center" }} />
        </div>
      </div>
    ),
    size,
  );
}
