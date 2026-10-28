"use client";

import type { LucideIcon } from "lucide-react";
import {
  CodeXml,
  Lightbulb,
  Network,
  Rocket,
  ShieldCheck,
  Users,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { uiFont } from "./ui-font";

// Adresse de la page Activités (le nom du dossier dans src/app).
// Change-la ici si ta page a une autre adresse.
const ACTIVITES_HREF = "/activites";

type Domain = {
  icon: LucideIcon;
  name: string;
  text: string;
  points: string[];
};

const domains: Domain[] = [
  {
    icon: ShieldCheck,
    name: "Cybersécurité",
    text: "Comprendre comment les attaques fonctionnent pour mieux s'en protéger.",
    points: [
      "Menaces et bonnes pratiques",
      "Sécurité des comptes et des données",
      "Initiation à l'ethical hacking",
    ],
  },
  {
    icon: CodeXml,
    name: "Développement",
    text: "Concevoir des sites et des applications, de l'idée au déploiement.",
    points: [
      "HTML, CSS et JavaScript",
      "Git et travail en équipe",
      "Bonnes pratiques de code sécurisé",
    ],
  },
  {
    icon: Network,
    name: "Réseaux",
    text: "Comprendre comment circulent les données et comment les protéger.",
    points: [
      "Bases des réseaux",
      "Protocoles et services",
      "Surveillance et défense",
    ],
  },
  {
    icon: Lightbulb,
    name: "Innovation",
    text: "Imaginer et construire des projets qui répondent aux défis du numérique.",
    points: [
      "Idées et prototypes",
      "Projets collaboratifs",
      "Présentation et partage",
    ],
  },
];

type Activity = {
  icon: LucideIcon;
  short: string;
  title: string;
  text: string;
};

const activities: Activity[] = [
  {
    icon: Zap,
    short: "Ateliers",
    title: "Ateliers techniques",
    text: "Des séances pratiques pour développer des compétences techniques et apprendre de nouvelles technologies.",
  },
  {
    icon: Users,
    short: "Projets",
    title: "Projets collaboratifs",
    text: "Des projets réalisés en équipe pour partager les connaissances et mettre les compétences en pratique.",
  },
  {
    icon: Rocket,
    short: "Innovation",
    title: "Innovation numérique",
    text: "Imaginer, expérimenter et concevoir des solutions qui répondent aux défis du monde numérique.",
  },
];

const news = [
  { tag: "Atelier", title: "Initiation à la cybersécurité", when: "Bientôt" },
  { tag: "Projet", title: "Création du site officiel du club", when: "En cours" },
  { tag: "Conférence", title: "Protéger sa vie privée en ligne", when: "Bientôt" },
];

const products = [
  {
    name: "Pack d'autocollants",
    price: "500 FCFA",
    image: "/images/shop/autocollant-logo.jpg",
  },
  {
    name: "Polo Cyber Tech Squad",
    price: "Prix à confirmer",
    image: "/images/shop/polo-cts.jpg",
  },
  {
    name: "Carte de membre",
    price: "1000 FCFA",
    image: "/images/shop/carte-membre.jpg",
  },
];

const partnerLogos = [
  { src: "/images/logo-fcis.jpeg", alt: "FCIS" },
  { src: "/images/logo-uadb.jpeg", alt: "UADB" },
  { src: "/images/logo-uadb-tech.jpeg", alt: "UADB-Tech Club" },
];

type PartnerKey = "bureau" | "universite" | "partenaires";

const partnerTabs: { key: PartnerKey; label: string }[] = [
  { key: "bureau", label: "Bureau" },
  { key: "universite", label: "Université" },
  { key: "partenaires", label: "Partenaires" },
];

// Plateformes d'entraînement (mobile). Pour mettre les vrais logos :
// dépose les fichiers dans public/images/resources/ et renseigne `logo`
// (ex. logo: "/images/resources/htb.png"). Sans `logo`, une pastille avec les initiales est affichée.
type Platform = {
  name: string;
  short: string;
  desc: string;
  href: string;
  bg: string;
  fg: string;
  logo?: string;
};

const platforms: Platform[] = [
  {
    name: "Hack The Box",
    short: "HTB",
    desc: "Machines et challenges pour s'entraîner",
    href: "https://www.hackthebox.com",
    bg: "#111927",
    fg: "#9fef00",
  },
  {
    name: "TryHackMe",
    short: "THM",
    desc: "Parcours guidés, idéal pour débuter",
    href: "https://tryhackme.com",
    bg: "#1c2538",
    fg: "#ff5a5a",
  },
];

/* ---------- Contenus des cartes « Club et soutiens » (partagés mobile / desktop) ---------- */

function BureauContent() {
  return (
    <>
      <span className="text-[10px] font-bold tracking-widest text-[var(--h-accent)]">
        BUREAU
      </span>
      <h3 className="text-[15px] font-bold sm:text-base">
        L&apos;équipe étudiante
      </h3>
      <p className="text-xs leading-relaxed text-[var(--h-muted)]">
        Les étudiants qui organisent les ateliers et animent le club.
      </p>
      <Link href="/#team" className="cts-link text-[13px] sm:text-sm">
        Voir le bureau →
      </Link>
    </>
  );
}

function UniversiteContent({ withLogo = false }: { withLogo?: boolean }) {
  const label = (
    <span className="text-[10px] font-bold tracking-widest text-[var(--h-accent)]">
      UNIVERSITÉ
    </span>
  );
  return (
    <>
      {withLogo ? (
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo-uadb.jpeg"
            alt="Logo UADB"
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-lg bg-white object-contain p-1"
          />
          <div className="flex flex-col gap-0.5">
            {label}
            <h3 className="text-[15px] font-bold">UADB</h3>
          </div>
        </div>
      ) : (
        <>
          {label}
          <h3 className="text-[15px] font-bold sm:text-base">UADB</h3>
        </>
      )}
      <p className="text-xs leading-relaxed text-[var(--h-muted)]">
        Université Alioune Diop de Bambey, qui accueille et appuie les
        activités du club.
      </p>
    </>
  );
}

function PartenairesContent() {
  return (
    <>
      <span className="text-[10px] font-bold tracking-widest text-[var(--h-accent)]">
        PARTENAIRES
      </span>
      <div className="mt-1 flex flex-wrap items-center gap-2.5 sm:gap-3">
        {partnerLogos.map((logo) => (
          <Image
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            width={56}
            height={56}
            className="size-11 rounded-lg bg-white object-contain p-1 sm:size-14"
          />
        ))}
      </div>
    </>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="cts-dot" aria-hidden />
      <h2 className="cts-h2 font-[family-name:var(--h-font-title)] text-base font-bold min-[360px]:text-lg sm:text-2xl">
        {title}
      </h2>
      <p className="hidden text-[13px] leading-snug text-[var(--h-muted)] sm:block sm:text-sm">
        {subtitle}
      </p>
    </div>
  );
}

export function HomeSections() {
  const [active, setActive] = useState(0);
  const [partner, setPartner] = useState<PartnerKey>("bureau");
  const [activity, setActivity] = useState(0);
  const domain = domains[active];
  const currentActivity = activities[activity];
  const DomainIcon = domain.icon;
  const ActivityIcon = currentActivity.icon;

  return (
    <>
      <div className={`${uiFont.variable} mx-auto max-w-[1120px] px-4 pb-8 sm:px-6 sm:pb-10 md:px-10`}>
        <div className="cts-timeline flex flex-col gap-9 sm:gap-14">
          {/* ===================== CE QU'ON APPREND ===================== */}
          <section id="about" className="relative flex flex-col gap-3 sm:gap-5">
            <SectionTitle
              title="Ce qu'on apprend"
              subtitle="Quatre domaines, un seul objectif : progresser en pratiquant."
            />
            <div className="grid gap-2.5 sm:gap-4 md:grid-cols-[220px_1fr]">
              <div
                role="tablist"
                className="grid grid-cols-2 gap-2 md:grid-cols-1"
              >
                {domains.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      role="tab"
                      aria-selected={index === active}
                      onClick={() => setActive(index)}
                      className={`cts-card flex min-w-0 cursor-pointer items-center gap-1.5 px-2.5 py-2 text-left text-xs font-semibold transition-colors sm:gap-2.5 sm:px-4 sm:py-3 sm:text-sm ${
                        index === active ? "cts-tab-active" : ""
                      }`}
                    >
                      <Icon
                        aria-hidden
                        className="size-4 shrink-0"
                        strokeWidth={2}
                      />
                      <span className="truncate">{item.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Panneau compact sur mobile, identique sur desktop */}
              <div
                role="tabpanel"
                className="flex flex-col gap-1.5 rounded-xl border border-[color-mix(in_srgb,var(--h-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--h-accent)_12%,transparent)] p-2.5 transition-colors sm:gap-3 sm:rounded-2xl sm:p-5"
              >
                <h3 className="font-[family-name:var(--h-font-title)] text-sm font-bold text-[#243a55] sm:text-base sm:text-[var(--h-accent)] [[data-theme='dark']_&]:text-[var(--h-accent)]">
                  {domain.name}
                </h3>
                <div className="flex items-start gap-2.5 sm:hidden">
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--h-accent)_18%,transparent)] text-[var(--h-accent)]"
                  >
                    <DomainIcon className="size-4" strokeWidth={2} />
                  </span>
                  <p className="text-xs leading-snug text-[var(--h-muted)]">
                    {domain.text}
                  </p>
                </div>
                <p className="hidden text-sm leading-snug text-[var(--h-muted)] sm:block">
                  {domain.text}
                </p>
                <ul className="m-0 flex list-none flex-col gap-0.5 border-t border-[color-mix(in_srgb,var(--h-accent)_22%,transparent)] p-0 pt-2 text-xs sm:gap-2 sm:border-0 sm:pt-0 sm:text-sm">
                  {domain.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="size-1.5 shrink-0 rounded-full bg-[var(--h-accent)]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ===================== NOS ACTIVITÉS ===================== */}
          <section id="activities" className="relative flex flex-col gap-3 sm:gap-5">
            {/* Ancre pour le bouton « Voir nos activités » du héros (#activites). */}
            <span
              id="activites"
              aria-hidden
              className="pointer-events-none absolute -top-24"
            />
            <SectionTitle
              title="Nos activités"
              subtitle="Des moments pour apprendre, construire et partager."
            />

            {/* Mobile : 3 boutons (comme « Ce qu'on apprend ») + un petit panneau */}
            <div className="flex flex-col gap-2 sm:hidden">
              <div role="tablist" className="grid grid-cols-3 gap-2">
                {activities.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.short}
                      type="button"
                      role="tab"
                      aria-selected={index === activity}
                      onClick={() => setActivity(index)}
                      className={`cts-card flex min-w-0 cursor-pointer items-center justify-center gap-1.5 px-1.5 py-2 text-[11px] font-semibold transition-colors min-[360px]:text-xs ${
                        index === activity ? "cts-tab-active" : ""
                      }`}
                    >
                      <Icon
                        aria-hidden
                        className="hidden size-4 shrink-0 min-[360px]:block"
                        strokeWidth={2}
                      />
                      <span className="truncate">{item.short}</span>
                    </button>
                  );
                })}
              </div>
              <div
                role="tabpanel"
                className="cts-card flex flex-col items-start gap-1 p-2.5"
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="grid size-7 shrink-0 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--h-accent)_14%,transparent)] text-[var(--h-accent)]"
                  >
                    <ActivityIcon className="size-3.5" strokeWidth={2} />
                  </span>
                  <h3 className="font-[family-name:var(--h-font-title)] text-[13px] font-bold leading-snug">
                    {currentActivity.title}
                  </h3>
                </div>
                <p className="text-xs leading-snug text-[var(--h-muted)]">
                  {currentActivity.text}
                </p>
                <Link href={ACTIVITES_HREF} className="cts-link text-[13px]">
                  En savoir plus →
                </Link>
              </div>
            </div>

            {/* Desktop / tablette : inchangé */}
            <ul className="cts-card m-0 hidden list-none flex-col divide-y divide-[var(--h-line)] p-0 sm:flex">
              {activities.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex items-center gap-4 p-4">
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--h-accent)_14%,transparent)] text-[var(--h-accent)]"
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-[var(--h-muted)]">
                        {item.text}
                      </p>
                    </div>
                    <Link
                      href={ACTIVITES_HREF}
                      className="cts-link shrink-0"
                      aria-label={`En savoir plus : ${item.title}`}
                    >
                      En savoir plus
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* ===================== À LA UNE ===================== */}
          <section id="news" className="relative flex flex-col gap-3 sm:gap-5">
            <SectionTitle
              title="À la une"
              subtitle="Ce qui se passe au club et de quoi progresser seul."
            />
            <div className="grid gap-3 sm:gap-4 md:grid-cols-[1.6fr_1fr]">
              {/* Mobile : liste compacte, titre en police du site + tag et statut */}
              <ul className="cts-card m-0 flex list-none flex-col divide-y divide-[var(--h-line)] p-0 sm:hidden">
                {news.map((item) => (
                  <li key={item.title} className="flex flex-col gap-1 px-3 py-2.5">
                    <span className="font-[family-name:var(--cts-font-ui)] text-[12.5px] font-semibold leading-snug tracking-tight">
                      {item.title}
                    </span>
                    <span className="flex items-center gap-2 text-[10px]">
                      <span className="font-bold uppercase tracking-widest text-[var(--h-accent)]">
                        {item.tag}
                      </span>
                      <span
                        aria-hidden
                        className="size-0.5 rounded-full bg-[var(--h-muted)]"
                      />
                      <span className="flex items-center gap-1 text-[var(--h-muted)]">
                        <span
                          aria-hidden
                          className={`size-1.5 rounded-full ${
                            item.when === "En cours"
                              ? "bg-[var(--h-accent)]"
                              : "bg-[var(--h-muted)] opacity-60"
                          }`}
                        />
                        {item.when}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              {/* Desktop / tablette : inchangé */}
              <ul className="cts-card m-0 hidden list-none flex-col divide-y divide-[var(--h-line)] p-0 sm:flex">
                {news.map((item) => (
                  <li
                    key={item.title}
                    className="flex flex-wrap items-center gap-x-2 gap-y-1 p-4 text-sm sm:gap-3"
                  >
                    <span className="cts-pill">{item.tag}</span>
                    <span className="min-w-0 flex-1 basis-32 font-semibold leading-snug">
                      {item.title}
                    </span>
                    <span className="text-xs text-[var(--h-muted)]">{item.when}</span>
                  </li>
                ))}
              </ul>

              {/* Mobile : plateformes pour s'entraîner, avec logos */}
              <div className="flex flex-col gap-2 sm:hidden">
                <h3 className="font-[family-name:var(--h-font-title)] text-sm font-bold">
                  Ressources du club
                </h3>
                <p className="text-xs leading-snug text-[var(--h-muted)]">
                  Des plateformes pour t&apos;entraîner entre deux ateliers.
                </p>
                <ul className="cts-card m-0 flex list-none flex-col divide-y divide-[var(--h-line)] p-0">
                  {platforms.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2.5"
                      >
                        {item.logo ? (
                          <Image
                            src={item.logo}
                            alt=""
                            width={40}
                            height={40}
                            className="size-10 shrink-0 rounded-lg bg-white object-contain p-1"
                          />
                        ) : (
                          <span
                            aria-hidden
                            style={{ background: item.bg, color: item.fg }}
                            className="grid size-10 shrink-0 place-items-center rounded-lg text-[11px] font-extrabold tracking-wide"
                          >
                            {item.short}
                          </span>
                        )}
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="font-[family-name:var(--h-font-title)] text-[13px] font-bold">
                            {item.name}
                          </span>
                          <span className="text-[11px] leading-snug text-[var(--h-muted)]">
                            {item.desc}
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 shrink-0 text-[var(--h-muted)]"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
                <Link href="/blog" className="cts-link text-[13px]">
                  Parcourir les ressources →
                </Link>
              </div>

              {/* Desktop / tablette : inchangé */}
              <div className="cts-feature hidden flex-col items-start gap-3 sm:flex">
                <h3 className="font-[family-name:var(--h-font-title)] text-base font-bold">
                  Ressources du club
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Articles", "Guides", "Comptes rendus", "Photos"].map((label) => (
                    <span key={label} className="cts-pill">
                      {label}
                    </span>
                  ))}
                </div>
                <Link href="/blog" className="cts-link text-sm">
                  Parcourir les ressources →
                </Link>
              </div>
            </div>
          </section>

          {/* ===================== LA BOUTIQUE ===================== */}
          <section id="shop" className="relative flex flex-col gap-3 sm:gap-5">
            <div className="flex flex-col gap-1">
              <span className="cts-dot" aria-hidden />
              <div className="flex items-center gap-3">
                <h2 className="cts-h2 font-[family-name:var(--h-font-title)] text-base font-bold min-[360px]:text-lg sm:text-2xl">
                  La boutique
                </h2>
                <span className="cts-pill">Nouveau</span>
              </div>
              <p className="hidden text-[13px] leading-snug text-[var(--h-muted)] sm:block sm:text-sm">
                Porte les couleurs du club : autocollants, polos et plus encore.
              </p>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="cts-card flex items-center gap-3 p-2.5 sm:p-3"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="size-12 shrink-0 rounded-lg object-cover sm:size-16"
                  />
                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold">{product.name}</h3>
                    <p className="text-xs font-semibold text-[var(--h-accent)] sm:font-normal sm:text-[var(--h-muted)]">
                      {product.price}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="ml-auto text-lg leading-none text-[var(--h-muted)] sm:hidden"
                  >
                    ›
                  </span>
                </div>
              ))}
              <Link href="/shop" className="cts-btn">
                Tout voir →
              </Link>
            </div>
          </section>

          {/* ===================== LE CLUB ET CEUX QUI LE SOUTIENNENT ===================== */}
          <section id="partners" className="relative flex flex-col gap-3 sm:gap-5">
            <SectionTitle
              title="Le club et ceux qui le soutiennent"
              subtitle="Un bureau d'étudiants, l'appui de l'université et de nos partenaires."
            />

            {/* Mobile : 3 boutons (comme « Ce qu'on apprend ») + une seule carte à la fois */}
            <div className="flex flex-col gap-2.5 md:hidden">
              <div role="tablist" className="grid grid-cols-3 gap-2">
                {partnerTabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={partner === tab.key}
                    onClick={() => setPartner(tab.key)}
                    className={`cts-card cursor-pointer px-1.5 py-2 text-center text-[11px] font-semibold transition-colors min-[360px]:text-xs ${
                      partner === tab.key ? "cts-tab-active" : ""
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div
                role="tabpanel"
                className="cts-card flex flex-col items-start gap-1.5 p-4"
              >
                {partner === "bureau" && <BureauContent />}
                {partner === "universite" && <UniversiteContent withLogo />}
                {partner === "partenaires" && <PartenairesContent />}
              </div>
            </div>

            {/* Desktop / tablette large : 3 cartes côte à côte, inchangé */}
            <div className="hidden gap-3 md:grid md:grid-cols-3">
              <div className="cts-card flex flex-col items-start gap-2 p-5">
                <BureauContent />
              </div>
              <div className="cts-card flex flex-col items-start gap-2 p-5">
                <UniversiteContent />
              </div>
              <div className="cts-card flex flex-col items-start gap-2 p-5">
                <PartenairesContent />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ===================== CTA FINAL ===================== */}
      <div className="mx-auto max-w-[1120px] px-4 pb-10 sm:px-6 sm:pb-16 md:px-10">
        {/* Mobile : carte compacte, petit bouton */}
        <section className="cts-feature flex flex-col items-start gap-2 !p-4 sm:hidden">
          <h2 className="font-[family-name:var(--h-font-title)] text-[15px] font-bold">
            Prêt à rejoindre la Cyber Tech Squad ?
          </h2>
          <p className="text-xs leading-snug opacity-80">
            Ouvert à tous les étudiants de l&apos;UADB, quel que soit le niveau.
          </p>
          <Link
            href="/adhesion"
            className="cts-btn mt-0.5 !min-h-0 !px-3 !py-1.5 !text-xs"
          >
            Adhérer au club
          </Link>
        </section>

        {/* Desktop / tablette : inchangé */}
        <section className="cts-feature hidden items-center justify-between gap-4 sm:flex">
          <div className="flex flex-col gap-1">
            <h2 className="font-[family-name:var(--h-font-title)] text-lg font-bold">
              Prêt à rejoindre la Cyber Tech Squad ?
            </h2>
            <p className="text-sm leading-snug opacity-80">
              Ouvert à tous les étudiants de l&apos;UADB, quel que soit le niveau.
            </p>
          </div>
          <Link href="/adhesion" className="cts-btn">
            Adhérer au club
          </Link>
        </section>
      </div>
    </>
  );
}