import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Check, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { HomeShell } from "@/components/home/HomeShell";
import {
  approach,
  gains,
  identity,
  objectives,
  steps,
} from "./apropos-data";
import {
  ApproachSteps,
  IdentityCards,
  JoinSection,
  MissionBlock,
  ObjectivesTabs,
  ParcoursTimeline,
} from "./AproposMobile";
import "./apropos.css";

export const metadata: Metadata = {
  title: "Le club — Cyber Tech Squad",
  description:
    "Cyber Tech Squad est un club universitaire consacré à la cybersécurité, au numérique et à l'innovation à l'Université Alioune Diop de Bambey.",
};

function SectionTitle({
  title,
  subtitle,
  hideSubtitleOnMobile = false,
}: {
  title: string;
  subtitle: string;
  hideSubtitleOnMobile?: boolean;
}) {
  return (
    <div className="apropos-section-title flex flex-col gap-1">
      <span className="cts-dot" aria-hidden />
      <h2 className="cts-h2 font-[family-name:var(--h-font-title)] text-xl font-bold sm:text-2xl">
        {title}
      </h2>
      <p
        className={`text-sm text-[var(--h-muted)] ${
          hideSubtitleOnMobile ? "apropos-sub--hide" : ""
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}

function IconBox({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      aria-hidden
      className="grid size-10 shrink-0 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--h-accent)_14%,transparent)] text-[var(--h-accent)]"
    >
      <Icon className="size-5" strokeWidth={1.75} />
    </span>
  );
}

export default function ClubPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeShell>
          <div className="apropos-page">
            {/* Héros */}
            <section className="apropos-hero mx-auto grid max-w-[1120px] items-center gap-10 px-6 py-12 md:grid-cols-[1.3fr_0.7fr] md:px-10 md:py-16">
              <div className="apropos-hero-text flex flex-col items-start gap-5">
                <span className="cts-badge">Le club</span>
                <h1 className="font-[family-name:var(--h-font-title)] text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-5xl">
                  Un club d&apos;étudiants qui apprend en faisant de la
                  cybersécurité une priorité capitale.
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-[var(--h-muted)]">
                  CyberTech Squad est un club universitaire consacré à la
                  cybersécurité, au numérique et à l&apos;innovation, au sein de
                  l&apos;Université Alioune Diop de Bambey. Il rassemble des
                  étudiants qui veulent apprendre, pratiquer, partager leurs
                  connaissances et contribuer à un environnement numérique plus
                  sûr.
                </p>
              </div>
              <div className="apropos-logo-wrap flex flex-col items-center gap-3">
                <div className="cts-logo relative aspect-square w-44 shrink-0 overflow-hidden rounded-full bg-white sm:w-52 md:w-60">
                  <Image
                    src="/images/logo-cts.jpeg"
                    alt="Logo Cyber Tech Squad"
                    fill
                    priority
                    sizes="(min-width: 768px) 240px, 56px"
                    className="object-cover"
                  />
                </div>
                <p className="text-xs font-semibold text-[var(--h-accent)]">
                  Technologie, sécurité, innovation
                </p>
              </div>
            </section>

            <div className="apropos-container mx-auto max-w-[1120px] px-6 pb-10 md:px-10">
              <div className="cts-timeline flex flex-col gap-14">
                {/* Mission */}
                <section className="apropos-section relative flex flex-col gap-5">
                  <SectionTitle
                    title="Notre mission"
                    subtitle="Pourquoi le club existe, et à qui il s'adresse."
                    hideSubtitleOnMobile
                  />
                  <div className="apropos-desktop-only">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="cts-feature flex flex-col items-start gap-3 p-6">
                        <span className="text-[10px] font-bold tracking-widest opacity-80">
                          NOTRE MISSION
                        </span>
                        <h3 className="font-[family-name:var(--h-font-title)] text-lg font-bold">
                          Rendre le numérique plus sûr, avec les étudiants de
                          l&apos;UADB.
                        </h3>
                        <p className="text-sm leading-relaxed opacity-90">
                          Développer les compétences des étudiants en
                          cybersécurité, promouvoir les bonnes pratiques
                          numériques et encourager une culture de
                          collaboration, d&apos;innovation et de
                          responsabilité.
                        </p>
                      </div>
                      <div className="cts-card flex flex-col items-start gap-3 p-6">
                        <span className="text-[10px] font-bold tracking-widest text-[var(--h-accent)]">
                          POUR QUI ?
                        </span>
                        <h3 className="font-[family-name:var(--h-font-title)] text-lg font-bold">
                          Tous les étudiants curieux, quel que soit le niveau.
                        </h3>
                        <p className="text-sm leading-relaxed text-[var(--h-muted)]">
                          Le club s&apos;adresse aux étudiants de
                          l&apos;Université Alioune Diop de Bambey qui
                          s&apos;intéressent à l&apos;informatique, à la
                          cybersécurité, aux technologies et à
                          l&apos;innovation.
                        </p>
                        <p className="text-sm leading-relaxed text-[var(--h-muted)]">
                          Pas besoin d&apos;être expert : on commence par les
                          bases et on avance projet après projet.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="apropos-mobile-only">
                    <MissionBlock />
                  </div>
                </section>

                {/* Objectifs */}
                <section className="apropos-section relative flex flex-col gap-5">
                  <SectionTitle
                    title="Nos objectifs"
                    subtitle="Six repères pour progresser ensemble."
                    hideSubtitleOnMobile
                  />
                  <div className="apropos-desktop-only">
                    <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
                      {objectives.map((item) => (
                        <li
                          key={item.title}
                          className="cts-card flex flex-col items-start gap-3 p-5"
                        >
                          <IconBox icon={item.icon} />
                          <h3 className="font-[family-name:var(--h-font-title)] text-sm font-bold">
                            {item.title}
                          </h3>
                          <p className="text-xs leading-relaxed text-[var(--h-muted)]">
                            {item.text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="apropos-mobile-only">
                    <ObjectivesTabs />
                  </div>
                </section>

                {/* Approche */}
                <section className="apropos-section relative flex flex-col gap-5">
                  <SectionTitle
                    title="Notre approche"
                    subtitle="Apprendre → Pratiquer → Construire → Partager."
                    hideSubtitleOnMobile
                  />
                  <div className="apropos-desktop-only flex flex-col gap-5">
                    <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
                      {approach.map((item, index) => (
                        <li
                          key={item.title}
                          className="cts-card flex flex-col items-start gap-2 p-5"
                        >
                          <span className="font-[family-name:var(--h-font-title)] text-xs font-bold text-[var(--h-accent)]">
                            0{index + 1}
                          </span>
                          <h3 className="font-[family-name:var(--h-font-title)] text-sm font-bold">
                            {item.title}
                          </h3>
                          <p className="text-xs leading-relaxed text-[var(--h-muted)]">
                            {item.text}
                          </p>
                        </li>
                      ))}
                    </ol>
                    <p className="flex items-center gap-3 rounded-xl border border-[color-mix(in_srgb,var(--h-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--h-accent)_10%,transparent)] px-4 py-3 text-xs">
                      <ShieldCheck
                        aria-hidden
                        className="size-4 shrink-0 text-[var(--h-accent)]"
                      />
                      Les activités techniques se déroulent dans des
                      environnements autorisés, dans le respect de
                      l&apos;éthique et de la loi.
                    </p>
                  </div>
                  <div className="apropos-mobile-only">
                    <ApproachSteps />
                  </div>
                </section>

                {/* Pourquoi rejoindre */}
                <section className="apropos-section relative flex flex-col gap-5">
                  <SectionTitle
                    title="Pourquoi rejoindre le CTS ?"
                    subtitle="Les débutants sont les bienvenus."
                  />
                  <div className="apropos-desktop-only">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="cts-card flex flex-col gap-3 p-6">
                        <h3 className="font-[family-name:var(--h-font-title)] text-sm font-bold">
                          Ce que tu y gagnes
                        </h3>
                        <ul className="m-0 flex list-none flex-col gap-2 p-0 text-sm">
                          {gains.map((gain) => (
                            <li key={gain} className="flex items-start gap-2">
                              <Check
                                aria-hidden
                                className="mt-0.5 size-4 shrink-0 text-[var(--h-accent)]"
                                strokeWidth={2.5}
                              />
                              {gain}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="cts-card flex flex-col gap-3 p-6">
                        <h3 className="font-[family-name:var(--h-font-title)] text-sm font-bold">
                          Comment participer ?
                        </h3>
                        <p className="text-sm leading-relaxed text-[var(--h-muted)]">
                          Les membres participent aux séances, proposent des
                          idées, contribuent aux projets et respectent les
                          règles de fonctionnement du club.
                        </p>
                        <p className="text-sm leading-relaxed text-[var(--h-muted)]">
                          Les débutants peuvent commencer progressivement : la
                          curiosité, la régularité, l&apos;esprit d&apos;équipe
                          et le respect des règles sont essentiels.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="apropos-mobile-only">
                    <JoinSection />
                  </div>
                </section>

                {/* Parcours */}
                <section className="apropos-section relative flex flex-col gap-5">
                  <SectionTitle
                    title="Notre parcours"
                    subtitle="Les grandes étapes du club."
                  />
                  <div className="apropos-desktop-only">
                    <ol className="m-0 ml-1 flex list-none flex-col gap-8 border-l border-[var(--h-line)] p-0 pl-6">
                      {steps.map((step) => (
                        <li
                          key={step.title}
                          className="relative flex flex-col gap-1"
                        >
                          <span
                            aria-hidden
                            className={`absolute -left-[33px] top-1 size-3 rounded-full border-2 border-[var(--h-accent)] ${
                              step.current
                                ? "bg-[var(--h-accent)]"
                                : "bg-[var(--h-bg)]"
                            }`}
                          />
                          <span className="text-[10px] font-bold tracking-widest text-[var(--h-accent)]">
                            {step.when.toUpperCase()}
                          </span>
                          <h3 className="font-[family-name:var(--h-font-title)] text-sm font-bold">
                            {step.title}
                          </h3>
                          <p className="text-xs text-[var(--h-muted)]">
                            {step.text}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="apropos-mobile-only">
                    <ParcoursTimeline />
                  </div>
                </section>

                {/* Identité */}
                <section className="apropos-section relative flex flex-col gap-5">
                  <SectionTitle
                    title="Identité du club"
                    subtitle="L'essentiel en un coup d'œil."
                  />
                  <div className="apropos-desktop-only">
                    <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
                      {identity.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li
                            key={item.label}
                            className="cts-card flex flex-col items-start gap-2 p-4"
                          >
                            <Icon
                              aria-hidden
                              className="size-4 text-[var(--h-accent)]"
                              strokeWidth={2}
                            />
                            <span className="text-[10px] font-bold tracking-widest text-[var(--h-muted)]">
                              {item.label}
                            </span>
                            <span className="text-sm font-semibold">
                              {item.value}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="apropos-mobile-only">
                    <IdentityCards />
                  </div>
                </section>
              </div>
            </div>

            {/* Appel à l'adhésion */}
            <div className="apropos-cta-wrap mx-auto max-w-[1120px] px-6 pb-16 md:px-10">
              <section className="apropos-cta cts-feature flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
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
          </div>
        </HomeShell>
      </main>
    </>
  );
}