"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

type Category = "Atelier" | "Projet" | "Conférence" | "Événement";
type Status = "past" | "now" | "soon";
type Month = "Octobre" | "Novembre";

type Activity = {
  id: string;
  category: Category;
  title: string;
  dateLabel: string;
  month: Month;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
};

// Seules les activités d'octobre et novembre sont affichées publiquement.
const ACTIVITIES: Activity[] = [
  {
    id: "video-sensibilisation",
    category: "Projet",
    title: "Vidéo de sensibilisation aux cyberattaques",
    dateLabel: "Samedi 24 octobre",
    month: "Octobre",
    start: "2026-10-24",
    end: "2026-10-24",
  },
  {
    id: "accueil-bacheliers",
    category: "Événement",
    title: "Accueil des nouveaux bacheliers",
    dateLabel: "26 – 28 octobre",
    month: "Octobre",
    start: "2026-10-26",
    end: "2026-10-28",
  },
  {
    id: "webinaire-cyberattaques",
    category: "Conférence",
    title: "Webinaire sur les cyberattaques",
    dateLabel: "Samedi 31 octobre",
    month: "Octobre",
    start: "2026-10-31",
    end: "2026-10-31",
  },
  {
    id: "groupe-participants",
    category: "Projet",
    title: "Préparation technique des participants",
    dateLabel: "1er – 6 novembre",
    month: "Novembre",
    start: "2026-11-01",
    end: "2026-11-06",
  },
  {
    id: "premiere-seance-cyber",
    category: "Atelier",
    title: "Première séance Cyber pratique",
    dateLabel: "Samedi 7 novembre",
    month: "Novembre",
    start: "2026-11-07",
    end: "2026-11-07",
  },
  {
    id: "micro-territoires",
    category: "Projet",
    title: "Vidéos Micro-territoires",
    dateLabel: "Samedi 14 novembre",
    month: "Novembre",
    start: "2026-11-14",
    end: "2026-11-14",
  },
  {
    id: "webinaire-theme",
    category: "Conférence",
    title: "Webinaire, thème à venir",
    dateLabel: "Samedi 28 novembre",
    month: "Novembre",
    start: "2026-11-28",
    end: "2026-11-28",
  },
];

const FILTERS: { label: string; value: Category | "all" }[] = [
  { label: "Tout voir", value: "all" },
  { label: "Ateliers", value: "Atelier" },
  { label: "Projets", value: "Projet" },
  { label: "Conférences", value: "Conférence" },
  { label: "Événements", value: "Événement" },
];

const STATUS_LABEL: Record<Status, string> = {
  past: "Terminé",
  now: "En cours",
  soon: "Bientôt",
};

// Calendrier (mobile) : mois affichés et année
const YEAR = 2026;
const CAL_MONTHS = [
  { label: "Octobre", index: 9 },
  { label: "Novembre", index: 10 },
] as const;
const WEEKDAYS_INITIALS = ["L", "M", "M", "J", "V", "S", "D"];
const WEEKDAYS_SHORT = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
const MONTH_SHORT_BY_NUM: Record<string, string> = {
  "10": "oct.",
  "11": "nov.",
};

const TINT =
  "bg-[color-mix(in_srgb,var(--h-accent)_14%,transparent)] text-[var(--h-accent)]";

const pad = (n: number) => String(n).padStart(2, "0");

function getStatus(a: Activity, now: Date): Status {
  const start = new Date(`${a.start}T00:00:00`);
  const end = new Date(`${a.end}T23:59:59`);
  if (now > end) return "past";
  if (now >= start) return "now";
  return "soon";
}

// Jour affiché dans la pastille (mobile) : « 24 » ou « 26–28 »
function dayLabel(a: Activity) {
  const first = Number(a.start.slice(8, 10));
  const last = Number(a.end.slice(8, 10));
  return a.start === a.end ? String(first) : `${first}–${last}`;
}

// Jour de la semaine de la date de début, sans dépendre du fuseau horaire
function weekdayShort(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return WEEKDAYS_SHORT[new Date(y, m - 1, d).getDay()];
}

// « Dans 4 jours », « Demain » ou « En cours »
function countdown(a: Activity, status: Status, now: Date | null) {
  if (status === "now") return "En cours";
  if (!now) return "Bientôt";
  const [y, m, d] = a.start.split("-").map(Number);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.round(
    (new Date(y, m - 1, d).getTime() - today.getTime()) / 86400000
  );
  return diff <= 1 ? "Demain" : `Dans ${diff} jours`;
}

export function ActivitesProgramme() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [showPast, setShowPast] = useState(false);
  const [calMonth, setCalMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  // `now` est défini après le montage pour éviter les erreurs d'hydratation
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const d = new Date();
    setNow(d);
    setCalMonth(d.getFullYear() === YEAR && d.getMonth() === 10 ? 1 : 0);
  }, []);

  const activities = useMemo(
    () =>
      ACTIVITIES.map((a) => ({
        ...a,
        status: (now ? getStatus(a, now) : "soon") as Status,
      })),
    [now]
  );

  const pastCount = activities.filter((a) => a.status === "past").length;

  const visible = activities.filter(
    (a) =>
      (filter === "all" || a.category === filter) &&
      (showPast || a.status !== "past")
  );

  const months = (["Octobre", "Novembre"] as const)
    .map((m) => ({ month: m, items: visible.filter((a) => a.month === m) }))
    .filter((g) => g.items.length > 0);

  // ----- Mobile : prochaine activité + liste -----
  const next = visible.find((a) => a.status !== "past") ?? null;
  const rows = selectedDay
    ? visible.filter((a) => a.start <= selectedDay && selectedDay <= a.end)
    : visible.filter((a) => a.id !== next?.id);

  // Calendrier
  const cal = CAL_MONTHS[calMonth];
  const firstOffset = (new Date(YEAR, cal.index, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(YEAR, cal.index + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(firstOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const todayIso = now
    ? `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
    : null;

  const emptyText = "Rien de prévu pour le moment dans cette catégorie.";

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Filtres : une rangée qui défile sur mobile, des pastilles qui passent à la ligne dès sm */}
      <div
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Filtrer les activités"
      >
        {FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.value)}
              className={`min-h-9 shrink-0 whitespace-nowrap rounded-full border px-3.5 text-xs font-semibold transition-colors sm:px-4 ${
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

      {/* ===== MOBILE (moins de 640 px) ===== */}
      <div className="flex flex-col gap-4 sm:hidden">
        {/* Calendrier + prochaine activité : empilés jusqu'à 480 px, côte à côte ensuite */}
        <div className="grid grid-cols-1 items-stretch gap-3 min-[480px]:grid-cols-2">
          {/* Calendrier */}
          <section className="cts-card p-2.5" aria-label="Calendrier des activités">
            <div className="mb-1 flex items-center justify-between">
              <button
                type="button"
                aria-label="Mois précédent"
                disabled={calMonth === 0}
                onClick={() => setCalMonth((m) => Math.max(0, m - 1))}
                className="grid size-7 place-items-center rounded-full text-[var(--h-muted)] disabled:opacity-30"
              >
                <ChevronLeft aria-hidden className="size-3.5" />
              </button>
              <p className="text-xs font-semibold">
                {cal.label} {YEAR}
              </p>
              <button
                type="button"
                aria-label="Mois suivant"
                disabled={calMonth === CAL_MONTHS.length - 1}
                onClick={() =>
                  setCalMonth((m) => Math.min(CAL_MONTHS.length - 1, m + 1))
                }
                className="grid size-7 place-items-center rounded-full text-[var(--h-muted)] disabled:opacity-30"
              >
                <ChevronRight aria-hidden className="size-3.5" />
              </button>
            </div>

            <div
              aria-hidden
              className="mb-0.5 grid grid-cols-7 text-center text-[9px] font-semibold uppercase text-[var(--h-muted)]"
            >
              {WEEKDAYS_INITIALS.map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-0.5">
              {cells.map((day, i) => {
                if (day === null) return <span key={`e${i}`} />;
                const iso = `${YEAR}-${pad(cal.index + 1)}-${pad(day)}`;
                const count = visible.filter(
                  (a) => a.start <= iso && iso <= a.end
                ).length;
                const selected = selectedDay === iso;
                const isToday = todayIso === iso;
                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={count === 0}
                    aria-pressed={selected}
                    aria-label={`${day} ${cal.label.toLowerCase()} ${YEAR}${
                      count ? `, ${count} activité${count > 1 ? "s" : ""}` : ""
                    }`}
                    onClick={() => setSelectedDay(selected ? null : iso)}
                    className={`mx-auto flex size-6 items-center justify-center rounded-full text-[10px] tabular-nums leading-none transition-colors ${
                      count > 0
                        ? `${TINT} font-bold`
                        : "text-[var(--h-muted)] disabled:cursor-default"
                    } ${selected ? "ring-2 ring-[var(--h-accent)]" : ""} ${
                      isToday ? "border border-dashed border-[var(--h-accent)]" : ""
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Prochaine activité */}
          <section
            aria-label="Prochaine activité"
            className="flex flex-col justify-between gap-4 rounded-2xl border border-[color-mix(in_srgb,var(--h-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--h-accent)_12%,transparent)] p-4"
          >
            {next ? (
              <>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--h-accent)]">
                    Prochaine · {countdown(next, next.status, now)}
                  </p>
                  <p className="mt-1.5 font-[family-name:var(--h-font-title)] text-base font-bold leading-snug">
                    {next.title}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <p className="flex items-center gap-1.5 text-xs text-[var(--h-muted)]">
                    <CalendarDays aria-hidden className="size-3.5 shrink-0" />
                    <span>{next.dateLabel}</span>
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-[var(--h-accent)] px-3 text-xs font-semibold text-[var(--h-accent)]"
                  >
                    S&apos;inscrire
                    <ChevronRight aria-hidden className="size-3.5" />
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-sm text-[var(--h-muted)]">
                Aucune activité à venir pour le moment.
              </p>
            )}
          </section>
        </div>

        {/* Liste : une ligne par activité */}
        <section aria-label="Programme">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <h3 className="font-[family-name:var(--h-font-title)] text-sm font-bold">
              {selectedDay
                ? `Le ${Number(selectedDay.slice(8, 10))} ${
                    MONTH_SHORT_BY_NUM[selectedDay.slice(5, 7)] ?? ""
                  }`
                : "Au programme"}
            </h3>
            {selectedDay ? (
              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                className="text-xs font-semibold text-[var(--h-accent)]"
              >
                Tout voir
              </button>
            ) : (
              <span className="text-xs text-[var(--h-muted)]">
                {rows.length} autre{rows.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {rows.length === 0 ? (
            (visible.length === 0 || selectedDay) && (
              <p className="cts-card p-5 text-center text-sm text-[var(--h-muted)]">
                {emptyText}
              </p>
            )
          ) : (
            <ul className="cts-card m-0 list-none overflow-hidden p-0">
              {rows.map((a) => (
                <li
                  key={a.id}
                  className={`flex items-center gap-3 border-b border-[var(--h-line)] px-3 py-3 last:border-b-0 ${
                    a.status === "past" ? "opacity-55" : ""
                  }`}
                >
                  {/* Date */}
                  <span
                    className={`flex w-12 shrink-0 flex-col items-center rounded-xl py-1.5 leading-none ${TINT}`}
                  >
                    <span className="text-sm font-bold tabular-nums">
                      {dayLabel(a)}
                    </span>
                    <span className="mt-1 text-[9px] font-semibold uppercase">
                      {MONTH_SHORT_BY_NUM[a.start.slice(5, 7)]}
                    </span>
                  </span>

                  {/* Infos */}
                  <div className="min-w-0 flex-1 break-words">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--h-accent)]">
                      {a.category}
                      <span className="font-medium normal-case tracking-normal text-[var(--h-muted)]">
                        {" · "}
                        {STATUS_LABEL[a.status]}
                      </span>
                    </p>
                    <p className="mt-0.5 text-[13px] font-semibold leading-snug">
                      {a.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[var(--h-muted)]">
                      {weekdayShort(a.start)}
                    </p>
                  </div>

                  {/* Inscription */}
                  {a.status !== "past" && (
                    <Link
                      href="/contact"
                      aria-label={`S'inscrire : ${a.title}`}
                      className="grid size-9 shrink-0 place-items-center rounded-full border border-[var(--h-accent)] text-[var(--h-accent)]"
                    >
                      <ChevronRight aria-hidden className="size-4" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* ===== TABLETTE ET DESKTOP (640 px et plus) : design d'origine ===== */}
      <div className="cts-card hidden overflow-hidden sm:block [&_*]:min-w-0 [&_*]:break-words">
        {months.length === 0 && (
          <p className="p-6 text-center text-sm text-[var(--h-muted)]">
            {emptyText}
          </p>
        )}

        {months.map((g) => (
          <section key={g.month} aria-label={g.month}>
            <h3
              className={`border-b border-[var(--h-line)] px-5 py-2 text-[10px] font-bold uppercase tracking-widest ${TINT}`}
            >
              {g.month}
            </h3>
            <ul className="m-0 list-none p-0">
              {g.items.map((a) => (
                <li
                  key={a.id}
                  className={`flex flex-col gap-3 border-b border-[var(--h-line)] px-5 py-3.5 last:border-b-0 md:flex-row md:items-center md:justify-between md:gap-4 ${
                    a.status === "past" ? "opacity-55" : ""
                  }`}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <span
                      className={`w-fit shrink-0 rounded-full px-3 py-1 text-[10px] font-bold sm:w-24 sm:text-center ${TINT}`}
                    >
                      {a.category}
                    </span>
                    <div>
                      <p className="font-[family-name:var(--h-font-title)] text-sm font-bold leading-snug">
                        {a.title}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[var(--h-muted)]">
                        <CalendarDays
                          aria-hidden
                          className="size-3.5 shrink-0"
                        />
                        <span>{a.dateLabel} · UADB</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:shrink-0">
                    <span className="text-xs text-[var(--h-muted)]">
                      {STATUS_LABEL[a.status]}
                    </span>
                    {a.status !== "past" && (
                      <Link
                        href="/contact"
                        className="rounded-lg border border-[var(--h-accent)] px-3.5 py-1.5 text-xs font-semibold text-[var(--h-accent)] transition-colors hover:bg-[color-mix(in_srgb,var(--h-accent)_10%,transparent)]"
                      >
                        S&apos;inscrire
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {pastCount > 0 && (
        <button
          type="button"
          onClick={() => setShowPast((v) => !v)}
          className="min-h-10 w-full rounded-full border border-[var(--h-line)] px-4 text-xs font-semibold transition-colors hover:border-[var(--h-accent)] sm:w-fit sm:self-start"
        >
          {showPast
            ? "Masquer les activités passées"
            : `Voir les activités passées (${pastCount})`}
        </button>
      )}
    </div>
  );
}