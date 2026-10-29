"use client";

import { useState } from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";

type Category = "Plateformes" | "Outils" | "Livres";

type Badge = { label: string; bg: string; fg: string };

type Resource = {
  category: Category;
  title: string;
  text: string;
  meta: string;
  href?: string;
  badge?: Badge;
  cover?: string; // couleur de couverture pour les livres
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
  },
  {
    category: "Plateformes",
    title: "Hack The Box",
    text: "Machines et challenges en conditions réelles.",
    meta: "Intermédiaire",
    href: "https://www.hackthebox.com",
    badge: { label: "HTB", bg: "#141d2b", fg: "#9fef00" },
  },
  {
    category: "Plateformes",
    title: "Root-Me",
    text: "Challenges de sécurité, communauté francophone.",
    meta: "Tous niveaux",
    href: "https://www.root-me.org",
    badge: { label: "RM", bg: "#1f1f1f", fg: "#f5b942" },
  },
  {
    category: "Plateformes",
    title: "PortSwigger Academy",
    text: "Cours gratuits et labs sur la sécurité du web.",
    meta: "Web",
    href: "https://portswigger.net/web-security",
    badge: { label: "PS", bg: "#ff6633", fg: "#ffffff" },
  },
  {
    category: "Plateformes",
    title: "picoCTF",
    text: "Compétition CTF pensée pour apprendre.",
    meta: "CTF",
    href: "https://picoctf.org",
    badge: { label: "pico", bg: "#2563eb", fg: "#ffffff" },
  },
  {
    category: "Plateformes",
    title: "SecNumacadémie",
    text: "Cours en ligne en français proposé par l'ANSSI.",
    meta: "Français",
    href: "https://secnumacademie.gouv.fr",
    badge: { label: "SN", bg: "#000091", fg: "#ffffff" },
  },
  {
    category: "Plateformes",
    title: "OWASP",
    text: "Guides sur les failles les plus courantes.",
    meta: "Référence",
    href: "https://owasp.org",
    badge: { label: "OW", bg: "#1f2937", fg: "#60a5fa" },
  },
  {
    category: "Plateformes",
    title: "Cybermalveillance",
    text: "Conseils pour se protéger et réagir à une attaque.",
    meta: "Français",
    href: "https://www.cybermalveillance.gouv.fr",
    badge: { label: "CM", bg: "#e1000f", fg: "#ffffff" },
  },

  // Outils et applications
  {
    category: "Outils",
    title: "Kali Linux",
    text: "Système avec les outils de tests d'intrusion.",
    meta: "Système",
    href: "https://www.kali.org",
    badge: { label: "KL", bg: "#367bf0", fg: "#ffffff" },
  },
  {
    category: "Outils",
    title: "Wireshark",
    text: "Analyser le trafic réseau paquet par paquet.",
    meta: "Réseau",
    href: "https://www.wireshark.org",
    badge: { label: "WS", bg: "#1679a7", fg: "#ffffff" },
  },
  {
    category: "Outils",
    title: "Nmap",
    text: "Scanner un réseau et trouver les services exposés.",
    meta: "Réseau",
    href: "https://nmap.org",
    badge: { label: "Nm", bg: "#1b2a3a", fg: "#4ea1ff" },
  },
  {
    category: "Outils",
    title: "Burp Suite",
    text: "Intercepter et tester une application web.",
    meta: "Web",
    href: "https://portswigger.net/burp",
    badge: { label: "BS", bg: "#ff6633", fg: "#ffffff" },
  },
  {
    category: "Outils",
    title: "CyberChef",
    text: "Encoder et décoder des données dans le navigateur.",
    meta: "En ligne",
    href: "https://gchq.github.io/CyberChef/",
    badge: { label: "CC", bg: "#4b6584", fg: "#ffffff" },
  },
  {
    category: "Outils",
    title: "VirusTotal",
    text: "Vérifier un fichier ou un lien avec de nombreux antivirus.",
    meta: "En ligne",
    href: "https://www.virustotal.com",
    badge: { label: "VT", bg: "#394eff", fg: "#ffffff" },
  },
  {
    category: "Outils",
    title: "Have I Been Pwned",
    text: "Savoir si ton e-mail apparaît dans une fuite de données.",
    meta: "En ligne",
    href: "https://haveibeenpwned.com",
    badge: { label: "HI", bg: "#2d6cdf", fg: "#ffffff" },
  },

  // Livres recommandés
  {
    category: "Livres",
    title: "Linux Basics for Hackers",
    text: "OccupyTheWeb",
    meta: "Linux",
    cover: "#0f766e",
  },
  {
    category: "Livres",
    title: "Hacking: The Art of Exploitation",
    text: "Jon Erickson",
    meta: "Failles",
    cover: "#7c2d12",
  },
  {
    category: "Livres",
    title: "The Web Application Hacker's Handbook",
    text: "D. Stuttard, M. Pinto",
    meta: "Web",
    cover: "#1e3a8a",
  },
];

const GROUPS: { value: Category; label: string }[] = [
  { value: "Plateformes", label: "Plateformes et cours" },
  { value: "Outils", label: "Outils et applications" },
  { value: "Livres", label: "Livres recommandés" },
];

const FILTERS: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "Tout" },
  { value: "Plateformes", label: "Plateformes" },
  { value: "Outils", label: "Outils" },
  { value: "Livres", label: "Livres" },
];

const TINT =
  "bg-[color-mix(in_srgb,var(--h-accent)_14%,transparent)] text-[var(--h-accent)]";

function Tile({ r }: { r: Resource }) {
  const content = (
    <>
      <div className="res-tile-head flex items-start justify-between gap-2">
        <span
          aria-hidden
          style={{ backgroundColor: r.badge?.bg, color: r.badge?.fg }}
          className="res-badge-icon grid size-11 shrink-0 place-items-center rounded-xl text-[13px] font-bold tracking-tight shadow-sm"
        >
          {r.badge?.label}
        </span>
        <ArrowUpRight
          aria-hidden
          className="res-arrow size-4 shrink-0 text-[var(--h-muted)] transition-colors group-hover:text-[var(--h-accent)]"
        />
      </div>
      <div className="res-tile-title min-w-0">
        <h3 className="break-words text-[13px] font-semibold leading-snug">
          {r.title}
        </h3>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--h-accent)]">
          {r.meta}
        </p>
      </div>
      <p className="res-tile-text line-clamp-3 text-[11px] leading-snug text-[var(--h-muted)] sm:line-clamp-2 sm:text-xs">
        {r.text}
      </p>
    </>
  );

  return (
    <a
      href={r.href}
      target="_blank"
      rel="noopener noreferrer"
      className="res-tile cts-card group flex h-full flex-col gap-2 p-3 transition-colors hover:border-[var(--h-accent)] sm:p-4"
    >
      {content}
    </a>
  );
}

function Book({ r }: { r: Resource }) {
  return (
    <div className="res-book flex h-full flex-col gap-2">
      <div
        style={{ backgroundColor: r.cover }}
        className="res-cover relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-lg rounded-l-sm border-l-[6px] border-black/25 p-3 text-white shadow-md"
      >
        <BookOpen
          aria-hidden
          className="res-cover-icon size-4 opacity-70"
          strokeWidth={1.75}
        />
        <p className="res-cover-title line-clamp-5 break-words text-[12px] font-semibold leading-snug sm:text-sm">
          {r.title}
        </p>
      </div>
      <div className="res-book-author min-w-0">
        <p className="text-[11px] leading-snug text-[var(--h-muted)] sm:text-xs">
          {r.text}
        </p>
      </div>
    </div>
  );
}

export function RessourcesList() {
  const [filter, setFilter] = useState<Category | "all">("all");

  const groups = GROUPS.filter((g) => filter === "all" || g.value === filter);

  return (
    <div className="res-list flex flex-col gap-7 sm:gap-9">
      <div
        className="res-filters -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
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
        const isBooks = g.value === "Livres";
        return (
          <section
            key={g.value}
            aria-label={g.label}
            className="res-section flex flex-col gap-3"
          >
            <h2 className="flex items-baseline gap-2 font-[family-name:var(--h-font-title)] text-base font-semibold sm:text-lg">
              {g.label}
              <span className="text-xs font-medium text-[var(--h-muted)]">
                {items.length}
              </span>
            </h2>
            <ul
              className={`res-grid ${
                isBooks ? "res-grid--books" : ""
              } m-0 grid list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4`}
            >
              {items.map((r) => (
                <li key={r.title} className="min-w-0">
                  {isBooks ? <Book r={r} /> : <Tile r={r} />}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}