# Portfolio · Alejandro Manzanares

Web personal / CV online. Next.js 16 + TypeScript + Tailwind CSS 4 + Motion, en tres idiomas (ES · CA · EN) con tema oscuro (por defecto) y claro.

Diseño: "un sótano de ladrillo con un único neón rojo encendido". Negro cálido, blanco roto y un rojo de neón usado con moderación.

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
| `src/content/profile.ts` | Nombre, email, GitHub, LinkedIn, CV, foto, textos del inicio y de "Sobre mí", experiencia, formación, URL de la web |
| `src/content/projects.ts` | Proyectos. El destacado (NutriApp) lleva sus pantallas, datos de la demo animada, puntos clave y arquitectura |
| `src/content/skills.ts` | Tecnologías agrupadas (con logo) y conceptos |
| `src/content/tech.ts` | Catálogo de tecnologías: nombre visible de cada una |
| `src/content/personal.ts` | Hábitos y hobbies (con sus fotos) |
| `src/i18n/dictionaries/*.json` | Textos de la interfaz: menú, botones, intro, diálogo de opinión |

Cada texto va en los tres idiomas: `{ es: "...", ca: "...", en: "..." }`.

Un campo vacío (`""`) se oculta en la web, así nunca hay botones que lleven a nada (por ejemplo, el botón de CV aparece solo cuando `cv` tiene ruta).

## Pendiente (busca `TODO` en `src/content/`)

- **CV:** guarda el PDF en `public/cv/` y pon la ruta en `profile.ts` → `cv`.
- **LinkedIn:** URL en `profile.ts` → `linkedin`.
- **Capturas de NutriApp:** las dos pantallas laterales (registro y chat) en `public/images/projects/` y su ruta en `projects.ts` → `screens[].image.src` (vertical, como la captura del móvil). La del centro no es una foto: es la pantalla de inicio recreada y animada con los datos de `appDemo`.
- **Fotos:** guárdalas en `public/images/...` y pon la ruta en el campo `photo` / `image.src` correspondiente. Mientras falten, se ve un hueco rayado con el texto "foto pendiente".
  - `profile.ts` → `photo` (retrato, vertical 4:5)
  - `personal.ts` → gym (4:3), moto y airsoft (16:9)
- **Proyecto de turismo:** nombre real y, si es público, enlace al repo (`repo`).
- **Dominio:** cuando lo tengas, cambia `siteUrl` en `profile.ts`.
- **Opiniones:** configura las variables de Resend (abajo) para recibirlas por email.

Recomendado para fotos: JPG o WebP de ~1600 px de ancho como máximo. Next.js las optimiza solo.

## Diálogo "¿Te está gustando la web? 😉"

Al llegar a la sección de contacto aparece un aviso abajo a la derecha (una vez por sesión; se puede cerrar). También se abre desde el enlace del pie de página. Las respuestas se envían a `src/app/api/feedback/route.ts`, que te las manda por email con [Resend](https://resend.com).

En Vercel → Settings → Environment Variables (o en `.env.local` para probar en local; mira `.env.example`):

| Variable | Valor |
|---|---|
| `RESEND_API_KEY` | Clave de la API de Resend |
| `FEEDBACK_TO_EMAIL` | Dónde quieres recibir las opiniones |
| `FEEDBACK_FROM_EMAIL` | Opcional. Remitente verificado en Resend (por defecto `Portfolio <onboarding@resend.dev>`, que solo envía a tu propio email de Resend) |

Sin estas variables, el diálogo funciona pero al enviar muestra un error y la opinión solo queda en el log del servidor.

Protección contra spam: campo trampa invisible, tiempo mínimo rellenando, solo desde la propia web y un máximo de 5 envíos por IP cada 10 minutos.

## Diseño: dónde se cambia cada cosa

- **Colores:** variables al principio de `src/app/globals.css` (tema oscuro y claro). Hay tres rojos: `--tube` (el neón y sus luces), `--accent` (texto rojo) y `--fill` (botones con texto blanco). Todos cumplen contraste AA.
- **Tipografías:** Geist y Geist Mono, del paquete `geist` (fuentes locales, no dependen de Google Fonts). Se cargan en `src/app/[lang]/layout.tsx`.
- **Logos de tecnologías:** `src/components/ui/TechIcon.tsx`, con los iconos de Simple Icons (`react-icons/si`) en un solo color. SQL Server, Oracle Cloud y Java Servlets no están en Simple Icons y llevan un icono genérico.
- **Intro** (≈1,8 s): el neón se enciende y se escribe "> bienvenido a mi portfolio". Solo sale en la primera visita de la sesión, nunca si llegas con un `#ancla` ni con "reducir movimiento", y se corta con cualquier clic, tecla o scroll. La lógica está en el script del `<head>` de `layout.tsx` y los estilos en `globals.css` (sección "Intro"). La página ya está pintada debajo, así que no retrasa la carga.
- **Scrollbar de neón:** `globals.css`. Se ve completa en Chrome, Edge y Safari de escritorio; Firefox solo coge el color y el móvil oculta la barra.
- **Movimiento:** curva principal `cubic-bezier(0.22, 1, 0.36, 1)`; 200 ms en botones, 360 ms en tarjetas y tema, 600 ms al aparecer las secciones. Con "reducir movimiento" activado, todo se queda quieto.

## Estructura

```
src/
├── app/
│   ├── [lang]/            página, layout (SEO, intro) e imagen Open Graph por idioma
│   ├── api/feedback/      recibe las opiniones y las envía por email
│   ├── sitemap.ts, robots.ts, icon.svg
│   └── globals.css        colores, neón, intro, scrollbar
├── components/
│   ├── sections/          Header, Hero, Projects, Skills, About, Contact
│   └── ui/                botones, foto, móvil animado de NutriApp, logos, opinión, tema, idioma
├── content/               ← tu contenido
├── i18n/                  idiomas y textos de interfaz
└── proxy.ts               redirige "/" al idioma del navegador
```

## Despliegue

Conectado a Vercel: cada `git push` a `main` publica la web automáticamente.
