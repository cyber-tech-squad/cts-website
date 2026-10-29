import {
  GraduationCap,
  MapPin,
  Megaphone,
  Network,
  Puzzle,
  Quote,
  ShieldCheck,
  Terminal,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Item = { icon: LucideIcon; title: string; text: string };

export const objectives: Item[] = [
  {
    icon: Puzzle,
    title: "Compétences techniques",
    text: "Renforcer les connaissances techniques et la résolution de problèmes.",
  },
  {
    icon: Terminal,
    title: "Pratique responsable",
    text: "Favoriser l'apprentissage pratique dans un cadre responsable et autorisé.",
  },
  {
    icon: ShieldCheck,
    title: "Sensibilisation",
    text: "Sensibiliser aux risques numériques et à l'hygiène informatique.",
  },
  {
    icon: Users,
    title: "Esprit d'équipe",
    text: "Développer l'esprit d'équipe, le partage de connaissances et le mentorat.",
  },
  {
    icon: Network,
    title: "Réseau",
    text: "Créer des liens avec les professionnels, les anciens membres, les partenaires et d'autres clubs.",
  },
  {
    icon: Megaphone,
    title: "Visibilité",
    text: "Améliorer la visibilité du club et participer à des événements et compétitions.",
  },
];

export const approach = [
  { title: "Apprendre", text: "Acquérir les bases avec d'autres étudiants motivés." },
  { title: "Pratiquer", text: "S'exercer sur des challenges et des ateliers." },
  { title: "Construire", text: "Contribuer à des projets collectifs." },
  {
    title: "Partager",
    text: "Transmettre ses connaissances et approfondir selon ses objectifs.",
  },
];

export const gains = [
  "Apprendre avec d'autres étudiants motivés.",
  "Découvrir plusieurs domaines de la cybersécurité par la pratique.",
  "Participer à des challenges, ateliers, projets et rencontres.",
  "Développer son réseau et apprendre à travailler en équipe.",
  "Contribuer aux initiatives numériques et à la vie du club.",
];

export const steps = [
  {
    when: "Date à confirmer",
    short: "Création du club",
    title: "Création du club à l'UADB",
    text: "Les premiers étudiants se réunissent autour de la cybersécurité.",
    current: false,
  },
  {
    when: "Date à confirmer",
    short: "Premiers ateliers",
    title: "Premiers ateliers techniques",
    text: "Des séances pratiques ouvertes à tous les étudiants.",
    current: false,
  },
  {
    when: "En cours",
    short: "Site officiel",
    title: "Création du site officiel du club",
    text: "Un projet collaboratif mené par les membres.",
    current: true,
  },
];

export type IdentityItem = {
  icon: LucideIcon;
  label: string;
  value: string;
  logo?: string;
};

export const identity: IdentityItem[] = [
  {
    icon: Users,
    label: "NOM",
    value: "Cyber Tech Squad (CTS)",
    logo: "/images/logo-cts.jpeg",
  },
  {
    icon: GraduationCap,
    label: "ÉTABLISSEMENT",
    value: "Université Alioune Diop de Bambey (UADB)",
    logo: "/images/logo-uadb.jpeg",
  },
  { icon: MapPin, label: "LOCALISATION", value: "Bambey, Sénégal" },
  { icon: Quote, label: "SLOGAN", value: "Technologie • Sécurité • Innovation" },
];