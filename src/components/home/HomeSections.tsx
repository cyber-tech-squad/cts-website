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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  title: string;
  text: string;
};

const activities: Activity[] = [
  {
    icon: Zap,
    title: "Ateliers techniques",
    text: "Des séances pratiques pour développer des compétences techniques et apprendre de nouvelles technologies.",
  },
  {
    icon: Users,
    title: "Projets collaboratifs",
    text: "Des projets réalisés en équipe pour partager les connaissances et mettre les compétences en pratique.",
  },
  {
    icon: Rocket,
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

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="cts-dot" aria-hidden />
      <h2 className="cts-h2 font-[family-name:var(--h-font-title)] text-xl font-bold sm:text-2xl">
        {title}
      </h2>
      <p className="text-sm text-[var(--h-muted)]">{subtitle}</p>
    </div>
  );
}

export function HomeSections() {
  const [active, setActive] = useState(0);
  const domain = domains[active];

  return (
    <>
      <div className="mx-auto max-w-[1120px] px-6 pb-10 md:px-10">
        <div className="cts-timeline flex flex-col gap-14">
          <section id="about" className="relative flex flex-col gap-5">
            <SectionTitle
              title="Ce qu'on apprend"
              subtitle="Quatre domaines, un seul objectif : progresser en pratiquant."
            />
            <div className="grid gap-4 md:grid-cols-[220px_1fr]">
              <div role="tablist" className="grid grid-cols-2 gap-2 md:grid-cols-1">
                {domains.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      role="tab"
                      aria-selected={index === active}
                      onClick={() => setActive(index)}
                      className={`cts-card flex cursor-pointer items-center gap-2.5 px-4 py-3 text-left text-sm font-semibold transition-colors ${
                        index === active ? "cts-tab-active" : ""
                      }`}
                    >
                      <Icon
                        aria-hidden
                        className="size-4 shrink-0"
                        strokeWidth={2}
                      />
                      {item.name}
                    </button>
                  );
                })}
              </div>

              {/* Panneau d'explication : fond vert qui suit la couleur d'accent du thème */}
              <div
                role="tabpanel"
                className="flex flex-col gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--h-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--h-accent)_12%,transparent)] p-5 transition-colors"
              >
                <h3 className="font-[family-name:var(--h-font-title)] text-base font-bold text-[var(--h-accent)]">
                  {domain.name}
                </h3>
                <p className="text-sm text-[var(--h-muted)]">{domain.text}</p>
                <ul className="m-0 flex list-none flex-col gap-2 p-0 text-sm">
                  {domain.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-[var(--h-accent)]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="activities" className="relative flex flex-col gap-5">
            {/* Ancre pour le bouton « Voir nos activités » du héros (#activites).
                Décalée vers le haut pour que le titre ne passe pas sous le header. */}
            <span
              id="activites"
              aria-hidden
              className="pointer-events-none absolute -top-24"
            />
            <SectionTitle
              title="Nos activités"
              subtitle="Des moments pour apprendre, construire et partager."
            />
            <ul className="cts-card m-0 flex list-none flex-col divide-y divide-[var(--h-line)] p-0">
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
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="text-xs leading-relaxed text-[var(--h-muted)]">
                        {item.text}
                      </p>
                    </div>
                    <Link href="/events" className="cts-link shrink-0">
                      En savoir plus
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section id="news" className="relative flex flex-col gap-5">
            <SectionTitle
              title="À la une"
              subtitle="Ce qui se passe au club et de quoi progresser seul."
            />
            <div className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
              <ul className="cts-card m-0 flex list-none flex-col divide-y divide-[var(--h-line)] p-0">
                {news.map((item) => (
                  <li key={item.title} className="flex flex-wrap items-center gap-3 p-4 text-sm">
                    <span className="cts-pill">{item.tag}</span>
                    <span className="min-w-0 flex-1 font-semibold">{item.title}</span>
                    <span className="text-xs text-[var(--h-muted)]">{item.when}</span>
                  </li>
                ))}
              </ul>
              <div className="cts-feature flex flex-col items-start gap-3">
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
                <Link href="/blog" className="cts-link">
                  Parcourir les ressources →
                </Link>
              </div>
            </div>
          </section>

          <section id="shop" className="relative flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="cts-dot" aria-hidden />
              <div className="flex items-center gap-3">
                <h2 className="cts-h2 font-[family-name:var(--h-font-title)] text-xl font-bold sm:text-2xl">
                  La boutique
                </h2>
                <span className="cts-pill">Nouveau</span>
              </div>
              <p className="text-sm text-[var(--h-muted)]">
                Porte les couleurs du club : autocollants, polos et plus encore.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
              {products.map((product) => (
                <div key={product.name} className="cts-card flex items-center gap-3 p-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="size-16 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold">{product.name}</h3>
                    <p className="text-xs text-[var(--h-muted)]">{product.price}</p>
                  </div>
                </div>
              ))}
              <Link href="/shop" className="cts-btn">
                Tout voir →
              </Link>
            </div>
          </section>

          <section id="partners" className="relative flex flex-col gap-5">
            <SectionTitle
              title="Le club et ceux qui le soutiennent"
              subtitle="Un bureau d'étudiants, l'appui de l'université et de nos partenaires."
            />
            <div className="grid gap-3 md:grid-cols-3">
              <div className="cts-card flex flex-col items-start gap-2 p-5">
                <span className="text-[10px] font-bold tracking-widest text-[var(--h-accent)]">
                  BUREAU
                </span>
                <h3 className="text-base font-bold">L&apos;équipe étudiante</h3>
                <p className="text-xs leading-relaxed text-[var(--h-muted)]">
                  Les étudiants qui organisent les ateliers et animent le club.
                </p>
                <Link href="/#team" className="cts-link">
                  Voir le bureau →
                </Link>
              </div>
              <div className="cts-card flex flex-col items-start gap-2 p-5">
                <span className="text-[10px] font-bold tracking-widest text-[var(--h-accent)]">
                  UNIVERSITÉ
                </span>
                <h3 className="text-base font-bold">UADB</h3>
                <p className="text-xs leading-relaxed text-[var(--h-muted)]">
                  Université Alioune Diop de Bambey, qui accueille et appuie les
                  activités du club.
                </p>
              </div>
              <div className="cts-card flex flex-col items-start gap-3 p-5">
                <span className="text-[10px] font-bold tracking-widest text-[var(--h-accent)]">
                  PARTENAIRES
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {[
                    { src: "/images/logo-fcis.jpeg", alt: "FCIS" },
                    { src: "/images/logo-uadb.jpeg", alt: "UADB" },
                    { src: "/images/logo-uadb-tech.jpeg", alt: "UADB-Tech Club" },
                  ].map((logo) => (
                    <Image
                      key={logo.alt}
                      src={logo.src}
                      alt={logo.alt}
                      width={56}
                      height={56}
                      className="size-14 rounded-lg bg-white object-contain p-1"
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mx-auto max-w-[1120px] px-6 pb-16 md:px-10">
        <section className="cts-feature flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1">
            <h2 className="font-[family-name:var(--h-font-title)] text-lg font-bold">
              Prêt à rejoindre la Squad ?
            </h2>
            <p className="text-sm opacity-80">
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