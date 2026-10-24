import type { Localized } from "@/i18n/config";

/**
 * Hábitos y hobbies.
 * `photo`: ruta dentro de `public/` (p. ej. "/images/personal/moto.jpg").
 * Si está vacía, se muestra un hueco de foto pendiente.
 * `photoLabel`: qué foto va en ese hueco (solo se ve mientras falta).
 */
export type PersonalItem = {
  id: string;
  title: Localized;
  text: Localized;
  photo?: string;
  photoLabel?: string;
};

export const habits: PersonalItem[] = [
  {
    id: "learning",
    title: {
      es: "Continuous learning",
      ca: "Continuous learning",
      en: "Continuous learning",
    },
    text: {
      es: "Aprender forma parte de mi rutina, no es algo que haga solo cuando toca examen. Si algo me llama la atención, lo investigo y lo pruebo hasta entenderlo.",
      ca: "Aprendre forma part de la meva rutina, no és una cosa que faci només quan toca examen. Si alguna cosa em crida l'atenció, la investigo i la provo fins a entendre-la.",
      en: "Learning is part of my routine, not something I only do before an exam. If something catches my attention, I research it and try it out until I understand it.",
    },
  },
  {
    id: "restless",
    title: {
      es: "Mente inquieta",
      ca: "Ment inquieta",
      en: "Restless mind",
    },
    text: {
      es: "Me cuesta quedarme quieto: casi siempre tengo algo en marcha. Prefiero adelantarme a los problemas antes que esperar a que lleguen.",
      ca: "Em costa quedar-me quiet: gairebé sempre tinc alguna cosa en marxa. Prefereixo avançar-me als problemes abans que esperar que arribin.",
      en: "I find it hard to sit still: I almost always have something going on. I'd rather get ahead of problems than wait for them to show up.",
    },
  },
  {
    id: "discipline",
    title: {
      es: "Disciplina",
      ca: "Disciplina",
      en: "Discipline",
    },
    text: {
      es: "El gimnasio me ha enseñado constancia: progresar poco a poco, también los días que no apetece. Esa misma mentalidad me la llevo al código.",
      ca: "El gimnàs m'ha ensenyat constància: progressar a poc a poc, també els dies que no ve de gust. Aquesta mateixa mentalitat me l'emporto al codi.",
      en: "The gym has taught me consistency: making progress little by little, even on the days I don't feel like it. I bring that same mindset to my code.",
    },
    photo: "", // TODO: "/images/personal/gym.jpg"
    photoLabel: "gym",
  },
];

export const hobbies: PersonalItem[] = [
  {
    id: "motos",
    title: { es: "Motos", ca: "Motos", en: "Motorbikes" },
    text: {
      es: "Mi forma de desconectar: carretera, casco y la cabeza en otra parte.",
      ca: "La meva manera de desconnectar: carretera, casc i el cap en una altra banda.",
      en: "My way to switch off: the road, a helmet and my mind somewhere else.",
    },
    photo: "", // TODO: "/images/personal/moto.jpg"
    photoLabel: "moto",
  },
  {
    id: "airsoft",
    title: { es: "Airsoft", ca: "Airsoft", en: "Airsoft" },
    text: {
      es: "Estrategia, trabajo en equipo y adrenalina en el campo.",
      ca: "Estratègia, treball en equip i adrenalina al camp.",
      en: "Strategy, teamwork and adrenaline on the field.",
    },
    photo: "", // TODO: "/images/personal/airsoft.jpg"
    photoLabel: "airsoft",
  },
];
