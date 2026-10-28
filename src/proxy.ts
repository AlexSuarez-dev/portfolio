import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales, type Locale } from "@/i18n/config";

// Elige el idioma del navegador (cabecera Accept-Language) si lo tenemos;
// si no, el idioma por defecto.
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = ranked.find((r) => hasLocale(r.lang));
  return match ? (match.lang as Locale) : defaultLocale;
}

// Redirige las URLs sin idioma (p. ej. "/") a su versión con idioma ("/es").
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasPrefix) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // No pasa por aquí: archivos internos de Next, la API (/api/feedback),
  // ni nada con extensión (imágenes, el PDF del CV, robots.txt, sitemap.xml...).
  matcher: ["/((?!_next|api/|.*\\..*).*)"],
};
