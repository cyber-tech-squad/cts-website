import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { CalendarDays, Rocket, Terminal, Users } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { HomeShell } from "@/components/home/HomeShell";
import { ActivitesProgramme } from "@/components/ActivitesProgramme";

export const metadata: Metadata = {
  title: "Activités — Cyber Tech Squad",
  description:
    "Ateliers, projets d'équipe et conférences du Cyber Tech Squad à l'Université Alioune Diop de Bambey.",
};

type Item = {
  icon: LucideIcon;
  tag: string;
  title: string;
  text: string;
};

const formats: Item[] = [
  {
    icon: Terminal,
    tag: "Pratique",
    title: "Ateliers techniques",
    text: "Des séances pratiques pour développer des compétences techniques et apprendre de nouvelles technologies.",
  },
  {
    icon: Users,
    tag: "En équipe",
    title: "Projets collaboratifs",
    text: "Des projets réalisés en équipe pour partager les connaissances et mettre les compétences en pratique.",
  },
  {
    icon: Rocket,
    tag: "Créatif",
    title: "Innovation numérique",
    text: "Imaginer, expérimenter et concevoir des solutions qui répondent aux défis du monde numérique.",
  },
];

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="cts-dot" aria-hidden />
      <h2 className="cts-h2 font-[family-name:var(--h-font-title)] text-xl font-bold sm:text-2xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-sm text-[var(--h-muted)]">{subtitle}</p>
      ) : null}
    </div>
  );
}

export default function ActivitesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeShell>
          {/* Héros */}
          <section className="mx-auto flex max-w-[1120px] flex-col items-start gap-3 px-4 py-8 sm:px-6 md:px-10 md:py-16">
            <span
              aria-hidden
              className="grid size-11 place-items-center rounded-full bg-[color-mix(in_srgb,var(--h-accent)_14%,transparent)] text-[var(--h-accent)] ring-1 ring-[color-mix(in_srgb,var(--h-accent)_30%,transparent)]"
            >
              <CalendarDays className="size-5" strokeWidth={1.75} />
            </span>
            <h2 className="font-[family-name:var(--h-font-title)] text-[1.375rem] font-bold leading-[1.2] tracking-tight sm:text-3xl lg:text-4xl">
              Des moments pour apprendre, construire et partager.
            </h2>
          </section>

          <div className="mx-auto max-w-[1120px] px-4 pb-8 sm:px-6 md:px-10">
            <div className="cts-timeline flex flex-col gap-8 md:gap-14">
              {/* Formats : ligne du temps compacte */}
              <section className="relative flex flex-col gap-3">
                <SectionTitle title="Nos formats" />
                <ol className="cts-card m-0 list-none p-4 md:grid md:grid-cols-3 md:gap-6 md:p-5">
                  {formats.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={item.title}
                        className="relative flex gap-3 pb-4 before:absolute before:bottom-0 before:left-[17px] before:top-10 before:w-px before:bg-[color-mix(in_srgb,var(--h-accent)_35%,transparent)] last:pb-0 last:before:hidden md:pb-0 md:before:hidden"
                      >
                        <span
                          aria-hidden
                          className="grid size-9 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--h-accent)_14%,transparent)] text-[var(--h-accent)] ring-1 ring-[color-mix(in_srgb,var(--h-accent)_30%,transparent)]"
                        >
                          <Icon className="size-[18px]" strokeWidth={1.75} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="flex items-baseline gap-2 leading-tight">
                            <span className="text-[10px] font-bold tabular-nums text-[var(--h-accent)]">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--h-muted)]">
                              {item.tag}
                            </span>
                          </p>
                          <h3 className="mt-0.5 font-[family-name:var(--h-font-title)] text-sm font-bold leading-snug">
                            {item.title}
                          </h3>
                          <p className="mt-0.5 text-xs leading-snug text-[var(--h-muted)]">
                            {item.text}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>

              {/* À venir */}
              <section className="relative flex flex-col gap-4">
                <SectionTitle
                  title="À venir"
                  subtitle="Le programme des prochaines semaines."
                />
                <ActivitesProgramme />
              </section>
            </div>
          </div>

          {/* Appel à l'action */}
          <div className="mx-auto max-w-[1120px] px-4 pb-12 sm:px-6 md:px-10">
            <section className="cts-feature flex flex-row items-center justify-between gap-3">
              <div className="flex min-w-0 flex-col gap-0.5">
                <h2 className="font-[family-name:var(--h-font-title)] text-base font-bold">
                  Une idée d&apos;activité ?
                </h2>
                <p className="text-xs opacity-80 sm:text-sm">
                  Propose-la au bureau, on la construit ensemble.
                </p>
              </div>
              <Link href="/contact" className="cts-btn shrink-0 text-sm">
                Nous écrire
              </Link>
            </section>
          </div>
        </HomeShell>
      </main>
    </>
  );
}