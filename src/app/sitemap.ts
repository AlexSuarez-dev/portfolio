import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { locales } from "@/i18n/config";

// /sitemap.xml: lista las tres versiones de la web para los buscadores.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${profile.siteUrl}/${l}`]));
  return locales.map((lang) => ({
    url: `${profile.siteUrl}/${lang}`,
    alternates: { languages },
  }));
}
