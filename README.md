# Portfolio · Alejandro Manzanares

Web personal / CV online. Next.js 16 + TypeScript + Tailwind CSS 4 + Motion, en tres idiomas (ES · CA · EN) con tema claro/oscuro.

## Arrancar en local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # comprueba que todo compila antes de subir cambios
```

## Editar el contenido (sin tocar componentes)

Todo lo que ves en la web sale de `src/content/`:

| Archivo | Qué contiene |
|---|---|
| `src/content/profile.ts` | Nombre, email, GitHub, LinkedIn, CV, foto, textos de inicio y "Sobre mí", formación, URL de la web |
| `src/content/projects.ts` | Proyectos. Para añadir uno, copia un bloque `{ ... }` y cambia los textos |
| `src/content/skills.ts` | Tecnologías agrupadas |
| `src/content/personal.ts` | Hábitos y hobbies (con sus fotos) |
| `src/i18n/dictionaries/*.json` | Textos de la interfaz: menú, botones, títulos de sección |

Cada texto va en los tres idiomas: `{ es: "...", ca: "...", en: "..." }`.

Un campo vacío (`""`) se oculta en la web, así nunca hay botones que lleven a nada (por ejemplo, el botón de CV aparece solo cuando `cv` tiene ruta).

## Pendiente (busca `TODO` en `src/content/`)

- **CV:** guarda el PDF en `public/cv/` y pon la ruta en `profile.ts` → `cv`.
- **LinkedIn:** URL en `profile.ts` → `linkedin`.
- **Fotos:** guárdalas en `public/images/...` y pon la ruta en el campo `photo` / `image.src` correspondiente. Mientras falten, se ve un hueco rayado con el texto "foto pendiente".
  - `profile.ts` → `photo` (retrato, vertical 4:5)
  - `projects.ts` → NutriApp `image.src` (horizontal 16:10)
  - `personal.ts` → gym, moto, airsoft (horizontal 4:3)
- **Proyecto de turismo:** nombre real y, si es público, enlace al repo (`repo`).
- **Dominio:** cuando lo tengas, cambia `siteUrl` en `profile.ts`.

Recomendado para fotos: JPG o WebP de ~1600 px de ancho como máximo. Next.js las optimiza solo.

## Colores y tipografía

- Colores: variables al principio de `src/app/globals.css` (tema oscuro y claro).
- Tipografías: `src/app/[lang]/layout.tsx` (Oswald, JetBrains Mono y Manrope).

## Estructura

```
src/
├── app/
│   ├── [lang]/            página, layout (SEO) e imagen Open Graph por idioma
│   ├── sitemap.ts, robots.ts, icon.svg
│   └── globals.css        colores y estilos base
├── components/
│   ├── sections/          Hero, About, Projects, Skills, Personal, Contact, Header
│   └── ui/                botones, foto, tema, idioma, animaciones
├── content/               ← tu contenido
├── i18n/                  idiomas y textos de interfaz
└── proxy.ts               redirige "/" al idioma del navegador
```

## Despliegue

Conectado a Vercel: cada `git push` a `main` publica la web automáticamente.
