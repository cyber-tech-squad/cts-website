import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Users, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/components/Brand";
import { SiteHeader } from "@/components/SiteHeader";
import { HomeShell } from "@/components/home/HomeShell";

export const metadata: Metadata = {
  title: "Le club — Cyber Tech Squad",
  description:
    "Cyber Tech Squad est le club de cybersécurité, de développement et d'innovation de l'Université Alioune Diop de Bambey.",
};

type Value = { icon: LucideIcon; title: string; text: string };

const values: Value[] = [
  {
    icon: Zap,
    title: "Apprendre en pratiquant",
    text: "Chaque notion est vue à travers un exercice, un atelier ou un projet concret.",
  },
  {
    icon: Users,
    title: "Partager",
    text: "Ce qu'on sait, on le transmet : guides, comptes rendus et entraide entre membres.",
  },
  {
    icon: ShieldCheck,
    title: "Protéger",
    text: "Comprendre les risques pour protéger ses comptes, ses données et sa vie privée.",
  },
];

type Step = { when: string; title: string; text: string; current?: boolean };

const steps: Step[] = [
  {
    when: "Date à confirmer",
    title: "Création du club à l'UADB",
    text: "Les premiers étudiants se réunissent autour de la cybersécurité.",
  },
  {
    when: "Date à confirmer",
    title: "Premiers ateliers techniques",
    text: "Des séances pratiques ouvertes à tous les étudiants.",
  },
  {
    when: "En cours",
    title: "Création du site officiel du club",
    text: "Un projet collaboratif mené par les membres.",
    current: true,
  },
];

export default function ClubPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeShell>
          {/* Héros */}
          <section className="mx-auto grid max-w-[1120px] items-center gap-10 px-6 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-16">
            <div className="flex flex-col items-start gap-5">
              <span className="cts-badge">Le club</span>
              <h1 className="font-[family-name:var(--h-font-title)] text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-5xl">
                Un club d&apos;étudiants qui apprend en faisant.
              </h1>
              <p className="max-w-lg leading-relaxed text-[var(--h-muted)]">
                CyberTech Squad est le club de cybersécurité, de développement
                et d&apos;innovation de l&apos;Université Alioune Diop de
                Bambey.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="cts-logo relative aspect-square w-40 shrink-0 overflow-hidden rounded-full bg-white sm:w-48 md:w-60">
                <Image
                  src="/images/logo-cts.jpeg"
                  alt="Logo Cyber Tech Squad"
                  fill
                  priority
                  sizes="(min-width: 768px) 240px, 192px"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          <div className="mx-auto flex max-w-[1120px] flex-col gap-14 px-6 pb-16 md:px-10">
            {/* Mission et public */}
            <section className="grid gap-4 md:grid-cols-2">
              <div className="cts-feature flex flex-col items-start gap-3 p-6">
                <span className="text-[10px] font-bold tracking-widest opacity-80">
                  NOTRE MISSION
                </span>
                <h2 className="font-[family-name:var(--h-font-title)] text-xl font-bold">
                  Rendre le numérique plus sûr, avec les étudiants de
                  l&apos;UADB.
                </h2>
                <p className="text-sm leading-relaxed opacity-90">
                  Développer les compétences des étudiants en cybersécurité,
                  promouvoir les bonnes pratiques numériques et encourager une
                  culture de collaboration, d&apos;innovation et de
                  responsabilité.
                </p>
              </div>
              <div className="cts-card flex flex-col items-start gap-3 p-6">
                <span className="text-[10px] font-bold tracking-widest text-[var(--h-accent)]">
                  POUR QUI ?
                </span>
                <h2 className="font-[family-name:var(--h-font-title)] text-xl font-bold">
                  Tous les étudiants curieux, quel que soit le niveau.
                </h2>
                <p className="text-sm leading-relaxed text-[var(--h-muted)]">
                  Pas besoin d&apos;être expert : on commence par les bases et
                  on avance projet après projet. La curiosité, la régularité,
                  l&apos;esprit d&apos;équipe et le respect des règles sont
                  essentiels.
                </p>
              </div>
            </section>

            {/* Valeurs */}
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h2 className="cts-h2 font-[family-name:var(--h-font-title)] text-xl font-bold sm:text-2xl">
                  Nos valeurs
                </h2>
                <p className="text-sm text-[var(--h-muted)]">
                  Trois idées qui guident tout ce qu&apos;on fait.
                </p>
              </div>
              <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
                {values.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.title}
                      className="cts-card flex flex-col items-start gap-3 p-5"
                    >
                      <span
                        aria-hidden
                        className="grid size-10 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--h-accent)_14%,transparent)] text-[var(--h-accent)]"
                      >
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <h3 className="font-[family-name:var(--h-font-title)] text-sm font-bold">
                        {item.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-[var(--h-muted)]">
                        {item.text}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Parcours */}
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h2 className="cts-h2 font-[family-name:var(--h-font-title)] text-xl font-bold sm:text-2xl">
                  Notre parcours
                </h2>
                <p className="text-sm text-[var(--h-muted)]">
                  Les grandes étapes du club.
                </p>
              </div>
              <ol className="cts-timeline m-0 flex list-none flex-col gap-8">
                {steps.map((step) => (
                  <li key={step.title} className="relative flex flex-col gap-1">
                    <span
                      className="cts-dot"
                      aria-hidden
                      style={
                        step.current
                          ? { background: "var(--h-accent)" }
                          : undefined
                      }
                    />
                    <span className="text-[10px] font-bold tracking-widest text-[var(--h-accent)]">
                      {step.when.toUpperCase()}
                    </span>
                    <h3 className="font-[family-name:var(--h-font-title)] text-sm font-bold">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[var(--h-muted)]">{step.text}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Appel à l'adhésion */}
            <section className="cts-feature flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-col gap-1">
                <h2 className="font-[family-name:var(--h-font-title)] text-lg font-bold">
                  Prêt à rejoindre la Squad ?
                </h2>
                <p className="text-sm opacity-80">
                  Ouvert à tous les étudiants de l&apos;UADB, quel que soit le
                  niveau.
                </p>
              </div>
              <Link href="/adhesion" className="cts-btn">
                Adhérer au club
              </Link>
            </section>
          </div>
        </HomeShell>
      </main>
      <footer className="site-footer">
        <Brand />
        <span>UADB · Bambey, Sénégal</span>
        <span>© {new Date().getFullYear()} Cyber Tech Squad</span>
      </footer>
    </>
  );
}