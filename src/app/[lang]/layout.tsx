import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/sections/Contact";
import { Header } from "@/components/sections/Header";
import { FeedbackWidget } from "@/components/ui/FeedbackWidget";
import { Intro } from "@/components/ui/Intro";
import { Providers } from "@/components/ui/Providers";
import { profile } from "@/content/profile";
import { defaultLocale, hasLocale, locales, ogLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

// Tipografías: Geist (texto y titulares) y Geist Mono (etiquetas, datos).
// Vienen del paquete `geist` como fuentes locales: no dependen de Google Fonts.

// Genera /es, /ca y /en como páginas estáticas en el build.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// SEO: título, descripción, Open Graph y versiones en otros idiomas (hreflang).
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);

  return {
    metadataBase: new URL(profile.siteUrl),
    title: meta.title,
    description: meta.description,
    authors: [{ name: profile.name, url: profile.siteUrl }],
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": `/${defaultLocale}`,
      },
    },
    openGraph: {
      type: "profile",
      url: `/${lang}`,
      siteName: profile.name,
      title: meta.title,
      description: meta.description,
      locale: ogLocales[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocales[l]),
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0807",
};

// Se ejecuta antes de pintar:
// 1. Tema: el guardado o, por defecto, el oscuro (es el de la marca).
// 2. Intro: solo la primera visita de la sesión, sin #ancla y sin
//    "reducir movimiento". Cualquier interacción la corta al momento.
const headScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");d.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){}try{if(!sessionStorage.getItem("intro")&&!location.hash&&!matchMedia("(prefers-reduced-motion: reduce)").matches){sessionStorage.setItem("intro","1");d.setAttribute("data-intro","play");var done=function(){d.setAttribute("data-intro","done")};setTimeout(done,1800);["pointerdown","keydown","wheel","touchstart"].forEach(function(e){addEventListener(e,done,{once:true,passive:true})})}}catch(e){}})()`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      data-theme="dark"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
        {/* Sin JavaScript, el contenido que aparece al hacer scroll se ve igual. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-svh overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-[10px] focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          {dict.nav.skip}
        </a>
        <Intro skipLabel={dict.intro.skip} />
        <Providers>
          <Header lang={lang} dict={dict} />
          <main id="main">{children}</main>
          <Footer dict={dict} />
          <FeedbackWidget lang={lang} labels={dict.feedback} />
        </Providers>
      </body>
    </html>
  );
}
