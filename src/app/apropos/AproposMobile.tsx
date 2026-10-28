"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import {
  approach,
  gains,
  identity,
  objectives,
  steps,
} from "./apropos-data";

/* ---------- Notre mission : carte + « Pour qui ? » dépliable ---------- */
export function MissionBlock() {
  return (
    <div>
      <div className="cts-feature apropos-panel flex flex-col items-start gap-1.5">
        <h3 className="font-[family-name:var(--h-font-title)] text-[13px] font-bold leading-snug">
          Rendre le numérique plus sûr, avec les étudiants de l&apos;UADB.
        </h3>
        <p className="text-xs leading-relaxed opacity-90">
          Développer les compétences des étudiants en cybersécurité, promouvoir
          les bonnes pratiques numériques et encourager une culture de
          collaboration, d&apos;innovation et de responsabilité.
        </p>
      </div>
      <details className="cts-card apropos-details">
        <summary className="apropos-summary">
          <span>Pour qui ?</span>
          <ChevronDown aria-hidden className="apropos-chevron size-4" />
        </summary>
        <div className="apropos-details-body flex flex-col gap-2">
          <p className="m-0 text-xs font-bold leading-snug">
            Tous les étudiants curieux, quel que soit le niveau.
          </p>
          <p className="m-0 text-xs leading-relaxed text-[var(--h-muted)]">
            Le club s&apos;adresse aux étudiants de l&apos;Université Alioune
            Diop de Bambey qui s&apos;intéressent à l&apos;informatique, à la
            cybersécurité, aux technologies et à l&apos;innovation.
          </p>
          <p className="m-0 text-xs leading-relaxed text-[var(--h-muted)]">
            Pas besoin d&apos;être expert : on commence par les bases et on
            avance projet après projet.
          </p>
        </div>
      </details>
    </div>
  );
}

/* ---------- Nos objectifs : 6 puces + détail ---------- */
export function ObjectivesTabs() {
  const [active, setActive] = useState(0);
  const current = objectives[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Objectifs du club"
        className="apropos-tabs"
      >
        {objectives.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={active === index}
              className="apropos-chip apropos-chip--left"
              onClick={() => setActive(index)}
            >
              <Icon aria-hidden className="size-4 shrink-0" strokeWidth={1.75} />
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        className="cts-card apropos-panel flex flex-col items-start gap-1"
      >
        <h3 className="font-[family-name:var(--h-font-title)] text-[13px] font-bold">
          {current.title}
        </h3>
        <p className="text-xs leading-relaxed text-[var(--h-muted)]">
          {current.text}
        </p>
      </div>
    </div>
  );
}

/* ---------- Notre approche : 4 étapes numérotées + détail ---------- */
export function ApproachSteps() {
  const [active, setActive] = useState(0);
  const current = approach[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Notre approche"
        className="apropos-tabs apropos-tabs--four"
      >
        {approach.map((item, index) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={active === index}
            className="apropos-chip apropos-chip--col"
            onClick={() => setActive(index)}
          >
            <span className="apropos-step-num">0{index + 1}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        className="cts-card apropos-panel flex flex-col items-start gap-1"
      >
        <h3 className="font-[family-name:var(--h-font-title)] text-[13px] font-bold">
          {current.title}
        </h3>
        <p className="text-xs leading-relaxed text-[var(--h-muted)]">
          {current.text}
        </p>
      </div>
    </div>
  );
}

/* ---------- Pourquoi rejoindre : tuiles + pastilles ---------- */
const actions = [
  "Participer aux séances",
  "Proposer des idées",
  "Contribuer aux projets",
  "Respecter les règles du club",
];
const qualities = [
  "Curiosité",
  "Régularité",
  "Esprit d'équipe",
  "Respect des règles",
];

export function JoinSection() {
  return (
    <div>
      <ul className="apropos-gains">
        {gains.map((gain) => (
          <li
            key={gain}
            className="cts-card flex items-start gap-1.5 text-[11.5px] leading-snug"
          >
            <Check
              aria-hidden
              className="mt-px size-3.5 shrink-0 text-[var(--h-accent)]"
              strokeWidth={2.5}
            />
            <span>{gain}</span>
          </li>
        ))}
      </ul>
      <div className="cts-card apropos-panel apropos-join-card">
        <p className="apropos-eyebrow">COMMENT PARTICIPER ?</p>
        <div className="apropos-pills">
          {actions.map((label) => (
            <span key={label} className="apropos-pill">
              {label}
            </span>
          ))}
        </div>
        <p className="apropos-eyebrow apropos-eyebrow--spaced">
          L&apos;ESSENTIEL POUR BIEN COMMENCER
        </p>
        <div className="apropos-pills">
          {qualities.map((label) => (
            <span key={label} className="apropos-pill">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Notre parcours : frise horizontale + détail ---------- */
export function ParcoursTimeline() {
  const initial = Math.max(
    0,
    steps.findIndex((step) => step.current),
  );
  const [active, setActive] = useState(initial);
  const current = steps[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Parcours du club"
        className="apropos-timeline-row"
      >
        {steps.map((step, index) => (
          <button
            key={step.title}
            type="button"
            role="tab"
            aria-selected={active === index}
            className="apropos-node"
            onClick={() => setActive(index)}
          >
            <span className="apropos-node-dot" aria-hidden />
            <span className="apropos-node-label">{step.short}</span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        className="cts-card apropos-panel flex flex-col items-start gap-1"
      >
        <span className="text-[10px] font-bold tracking-widest text-[var(--h-accent)]">
          {current.when.toUpperCase()}
        </span>
        <h3 className="font-[family-name:var(--h-font-title)] text-[13px] font-bold leading-snug">
          {current.title}
        </h3>
        <p className="text-xs leading-relaxed text-[var(--h-muted)]">
          {current.text}
        </p>
      </div>
    </div>
  );
}

/* ---------- Identité du club : cartes bleu nuit + logos ---------- */
export function IdentityCards() {
  return (
    <ul className="apropos-id">
      {identity.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.label} className="apropos-id-card">
            <span className="apropos-id-top">
              {item.logo ? (
                <Image
                  src={item.logo}
                  alt={`Logo ${item.value}`}
                  width={36}
                  height={36}
                  className="size-9 rounded-full bg-white object-cover"
                />
              ) : (
                <Icon aria-hidden className="size-4" strokeWidth={2} />
              )}
            </span>
            <span className="apropos-id-label">{item.label}</span>
            <span className="apropos-id-value">{item.value}</span>
          </li>
        );
      })}
    </ul>
  );
}