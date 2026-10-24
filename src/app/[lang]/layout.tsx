import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Oswald } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/sections/Contact";
import { Header } from "@/components/sections/Header";
import { Providers } from "@/components/ui/Providers";
import { profile } from "@/content/profile";
import { defaultLocale, hasLocale, locales, ogLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

// Tipografías de la marca: Oswald (titulares) y JetBrains Mono (etiquetas).
// Manrope para los párrafos largos, donde la mono cansa al leer.
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
    { media: "(prefers-color-scheme: light)", color: "#f3f0e9" },
  ],
};

// Se ejecuta antes de pintar: aplica el tema guardado (o el del sistema)
// para que no haya parpadeo de claro a oscuro al cargar.
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.setAttribute("data-theme",t)}catch(e){}})()`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      data-theme="dark"
      suppressHydrationWarning
      className={`${oswald.variable} ${jetbrains.variable} ${manrope.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-svh overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          {dict.nav.skip}
        </a>
        <Providers>
          <Header lang={lang} dict={dict} />
          <main id="main">{children}</main>
          <Footer dict={dict} />
        </Providers>
      </body>
    </html>
  );
}
