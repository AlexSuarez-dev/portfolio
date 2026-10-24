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
          background: "#0b0b0c",
          color: "#edeae3",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#d2584c" }}>{"// portfolio"}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 300, letterSpacing: -2, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#9a958c" }}>{profile.role[lang]}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9a958c" }}>
          <span>{profile.siteUrl.replace(/^https?:\/\//, "")}</span>
          <span style={{ width: 120, height: 2, background: "#d2584c", alignSelf: "center" }} />
        </div>
      </div>
    ),
    size,
  );
}
