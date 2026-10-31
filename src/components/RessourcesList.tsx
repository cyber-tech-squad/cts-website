"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  GraduationCap,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiBurpsuite,
  SiHackthebox,
  SiHaveibeenpwned,
  SiKalilinux,
  SiOwasp,
  SiTryhackme,
  SiVirustotal,
  SiWireshark,
} from "react-icons/si";

type Category = "Plateformes" | "Outils";

/** Couleurs de la tuile (fond) et du logo / des initiales (premier plan). */
type Badge = { label: string; bg: string; fg: string };

/**
 * Logo d'une ressource. Au choix :
 * - icon : une icône de react-icons/si (Simple Icons)
 * - src  : un fichier dans /public, par exemple "/logos/root-me.svg"
 * Sans logo (ou si le fichier est absent), la tuile affiche les initiales du badge.
 */
type Logo = { icon?: IconType; src?: string };

type Resource = {
  category: Category;
  title: string;
  text: string;
  meta: string;
  href?: string;
  badge?: Badge;
  logo?: Logo;
};

const RESOURCES: Resource[] = [
  // Plateformes et cours
  {
    category: "Plateformes",
    title: "TryHackMe",
    text: "Parcours guidés, idéal pour débuter.",
    meta: "Débutant",
    href: "https://tryhackme.com",
    badge: { label: "THM", bg: "#1c2538", fg: "#ef4444" },
    logo: { icon: SiTryhackme },
  },
  {
    category: "Plateformes",
    title: "Hack The Box",
    text: "Machines et challenges en conditions réelles.",
    meta: "Intermédiaire",
    href: "https://www.hackthebox.com",
    badge: { label: "HTB", bg: "#141d2b", fg: "#9fef00" },
    logo: { icon: SiHackthebox },
  },
  {
    category: "Plateformes",
    title: "Root-Me",
    text: "Challenges de sécurité, communauté francophone.",
    meta: "Tous niveaux",
    href: "https://www.root-me.org",
    badge: { label: "RM", bg: "#1f1f1f", fg: "#f5b942" },
    // logo: { src: "/logos/root-me.svg" },
  },
  {
    category: "Plateformes",
    title: "PortSwigger Academy",
    text: "Cours gratuits et labs sur la sécurité du web.",
    meta: "Web",
    href: "https://portswigger.net/web-security",
    badge: { label: "PS", bg: "#ff6633", fg: "#ffffff" },
    // logo: { src: "/logos/portswigger.svg" },
  },
  {
    category: "Plateformes",
    title: "picoCTF",
    text: "Compétition CTF pensée pour apprendre.",
    meta: "CTF",
    href: "https://picoctf.org",
    badge: { label: "pico", bg: "#2563eb", fg: "#ffffff" },
    // logo: { src: "/logos/picoctf.svg" },
  },
  {
    category: "Plateformes",
    title: "SecNumacadémie",
    text: "Cours en ligne en français proposé par l'ANSSI.",
    meta: "Français",
    href: "https://secnumacademie.gouv.fr",
    badge: { label: "SN", bg: "#000091", fg: "#ffffff" },
    // logo: { src: "/logos/secnumacademie.svg" },
  },
  {
    category: "Plateformes",
    title: "OWASP",
    text: "Guides sur les failles les plus courantes.",
    meta: "Référence",
    href: "https://owasp.org",
    badge: { label: "OW", bg: "#1f2937", fg: "#60a5fa" },
    logo: { icon: SiOwasp },
  },
  {
    category: "Plateformes",
    title: "Cybermalveillance",
    text: "Conseils pour se protéger et réagir à une attaque.",
    meta: "Français",
    href: "https://www.cybermalveillance.gouv.fr",
    badge: { label: "CM", bg: "#e1000f", fg: "#ffffff" },
    // logo: { src: "/logos/cybermalveillance.svg" },
  },

  // Outils et applications
  {
    category: "Outils",
    title: "Kali Linux",
    text: "Système avec les outils de tests d'intrusion.",
    meta: "Système",
    href: "https://www.kali.org",
    badge: { label: "KL", bg: "#367bf0", fg: "#ffffff" },
    logo: { icon: SiKalilinux },
  },
  {
    category: "Outils",
    title: "Wireshark",
    text: "Analyser le trafic réseau paquet par paquet.",
    meta: "Réseau",
    href: "https://www.wireshark.org",
    badge: { label: "WS", bg: "#1679a7", fg: "#ffffff" },
    logo: { icon: SiWireshark },
  },
  {
    category: "Outils",
    title: "Nmap",
    text: "Scanner un réseau et trouver les services exposés.",
    meta: "Réseau",
    href: "https://nmap.org",
    badge: { label: "Nm", bg: "#1b2a3a", fg: "#4ea1ff" },
    // logo: { src: "/logos/nmap.svg" },
  },
  {
    category: "Outils",
    title: "Burp Suite",
    text: "Intercepter et tester une application web.",
    meta: "Web",
    href: "https://portswigger.net/burp",
    badge: { label: "BS", bg: "#ff6633", fg: "#ffffff" },
    logo: { icon: SiBurpsuite },
  },
  {
    category: "Outils",
    title: "CyberChef",
    text: "Encoder et décoder des données dans le navigateur.",
    meta: "En ligne",
    href: "https://gchq.github.io/CyberChef/",
    badge: { label: "CC", bg: "#4b6584", fg: "#ffffff" },
    // logo: { src: "/logos/cyberchef.svg" },
  },
  {
    category: "Outils",
    title: "VirusTotal",
    text: "Vérifier un fichier ou un lien avec de nombreux antivirus.",
    meta: "En ligne",
    href: "https://www.virustotal.com",
    badge: { label: "VT", bg: "#394eff", fg: "#ffffff" },
    logo: { icon: SiVirustotal },
  },
  {
    category: "Outils",
    title: "Have I Been Pwned",
    text: "Savoir si ton e-mail apparaît dans une fuite de données.",
    meta: "En ligne",
    href: "https://haveibeenpwned.com",
    badge: { label: "HI", bg: "#2d6cdf", fg: "#ffffff" },
    logo: { icon: SiHaveibeenpwned },
  },

];

const GROUPS: {
  value: Category;
  label: string;
  hint: string;
  icon: LucideIcon;
}[] = [
  {
    value: "Plateformes",
    label: "Plateformes et cours",
    hint: "Pour s'entraîner et apprendre, pas à pas.",
    icon: GraduationCap,
  },
  {
    value: "Outils",
    label: "Outils et applications",
    hint: "À installer ou à utiliser en ligne.",
    icon: Wrench,
  },
];

const FILTERS: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "Tout" },
  { value: "Plateformes", label: "Plateformes" },
  { value: "Outils", label: "Outils" },
];

const TINT =
  "bg-[color-mix(in_srgb,var(--h-accent)_14%,transparent)] text-[var(--h-accent)]";

function LogoMark({ r, small = false }: { r: Resource; small?: boolean }) {
  const [failed, setFailed] = useState(false);
  const Icon = r.logo?.icon;
  const src = r.logo?.src;

  if (Icon) {
    return (
      <Icon
        aria-hidden
        className={small ? "size-6" : "size-9 sm:size-12"}
      />
    );
  }
  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        aria-hidden
        onError={() => setFailed(true)}
        className={`${small ? "h-6" : "h-9 sm:h-12"} w-auto max-w-[70%] object-contain`}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={`${small ? "text-sm" : "text-2xl sm:text-3xl"} font-bold tracking-tight`}
    >
      {r.badge?.label}
    </span>
  );
}

const TILE_BASE =
  "group relative rounded-2xl transition-[box-shadow,transform] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--h-accent)] motion-safe:hover:-translate-y-0.5";

/** Plateformes : tuile verticale, logo en haut, nom et niveau en dessous. */
function Tile({ r }: { r: Resource }) {
  return (
    <a
      href={r.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ backgroundColor: r.badge?.bg, color: r.badge?.fg }}
      className={`${TILE_BASE} flex h-full flex-col items-center gap-2 p-3 text-center sm:p-4`}
    >
      <ArrowUpRight
        aria-hidden
        className="absolute right-2.5 top-2.5 size-4 opacity-50 transition-opacity group-hover:opacity-100"
      />
      <div className="grid h-12 w-full place-items-center sm:h-16">
        <LogoMark r={r} />
      </div>
      <div className="flex min-w-0 flex-col items-center gap-1 text-white">
        <h3 className="break-words text-[13px] font-semibold leading-snug sm:text-sm">
          {r.title}
        </h3>
        <span className="max-w-full break-words rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
          {r.meta}
        </span>
        <div className="hidden sm:block">
          <p className="line-clamp-2 text-xs leading-snug text-white/70">
            {r.text}
          </p>
        </div>
      </div>
    </a>
  );
}

/** Outils : tuile horizontale compacte, logo à gauche, nom et type à droite. */
function ToolTile({ r }: { r: Resource }) {
  return (
    <a
      href={r.href}
      target="_blank"
      rel="noopener noreferrer"
      title={r.text}
      style={{ backgroundColor: r.badge?.bg, color: r.badge?.fg }}
      className={`${TILE_BASE} flex h-full items-center gap-2.5 !rounded-xl p-2.5 pr-7 sm:p-3 sm:pr-8`}
    >
      <ArrowUpRight
        aria-hidden
        className="absolute right-2 top-2 size-3.5 opacity-50 transition-opacity group-hover:opacity-100"
      />
      <span className="grid size-8 shrink-0 place-items-center">
        <LogoMark r={r} small />
      </span>
      <span className="flex min-w-0 flex-col text-left text-white">
        <span className="break-words text-xs font-semibold leading-snug sm:text-[13px]">
          {r.title}
        </span>
        <span className="text-[10px] leading-snug text-white/70">{r.meta}</span>
      </span>
    </a>
  );
}

export function RessourcesList() {
  const [filter, setFilter] = useState<Category | "all">("all");

  const groups = GROUPS.filter((g) => filter === "all" || g.value === filter);

  return (
    <div className="res-list flex flex-col gap-9 sm:gap-11">
      <div
        className="res-filters -mx-3 flex gap-2 overflow-x-auto px-3 pb-1 min-[341px]:-mx-4 min-[341px]:px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Filtrer les ressources"
      >
        {FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.value)}
              className={`res-filter min-h-9 shrink-0 whitespace-nowrap rounded-full border px-4 text-xs font-semibold transition-colors ${
                active
                  ? `border-[var(--h-accent)] ${TINT}`
                  : "border-[var(--h-line)] hover:border-[var(--h-accent)]"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {groups.map((g) => {
        const items = RESOURCES.filter((r) => r.category === g.value);
        const isTools = g.value === "Outils";
        const Icon = g.icon;
        return (
          <section
            key={g.value}
            aria-label={g.label}
            className="res-section flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1">
              <h2 className="flex items-center gap-2.5 font-[family-name:var(--h-font-title)] text-base font-semibold sm:text-lg">
                <span
                  aria-hidden
                  className={`grid size-7 shrink-0 place-items-center rounded-lg ${TINT}`}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                </span>
                {g.label}
                <span className="text-xs font-medium text-[var(--h-muted)]">
                  {items.length}
                </span>
                <span aria-hidden className="h-px flex-1 bg-[var(--h-line)]" />
              </h2>
              <p className="text-xs text-[var(--h-muted)]">{g.hint}</p>
            </div>
            <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
              {items.map((r) => (
                <li key={r.title} className="min-w-0">
                  {isTools ? <ToolTile r={r} /> : <Tile r={r} />}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}