import { notFound } from "next/navigation";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { profile } from "@/content/profile";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  // Datos estructurados (schema.org) para que Google entienda quién eres.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: `${profile.siteUrl}/${lang}`,
    email: `mailto:${profile.email}`,
    jobTitle: profile.role[lang],
    affiliation: { "@type": "CollegeOrUniversity", name: "Universitat Autònoma de Barcelona" },
    sameAs: [profile.github, profile.linkedin].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      {/* Cambia el orden de las secciones moviendo estas líneas.
          Si mueves Contact, el aviso de opinión sigue apareciendo al llegar a #contact. */}
      <Hero lang={lang} dict={dict} />
      <Projects lang={lang} dict={dict} />
      <Skills lang={lang} dict={dict} />
      <About lang={lang} dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
