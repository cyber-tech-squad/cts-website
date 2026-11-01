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

/* ---------- Notre mission : un seul bloc, « Pour qui ? » dépliable ---------- */
export function MissionBlock() {
  return (
    <div className="cts-feature apropos-mission">
      <h3 className="font-[family-name:var(--h-font-title)] text-[13px] font-bold leading-snug">
        Rendre le numérique plus sûr, avec les étudiants de l&apos;UADB.
      </h3>
      <p className="m-0 text-xs leading-relaxed opacity-90">
        Développer les compétences des étudiants en cybersécurité, promouvoir
        les bonnes pratiques numériques et encourager une culture de
        collaboration, d&apos;innovation et de responsabilité.
      </p>
      <details className="apropos-who">
        <summary className="apropos-who-summary">
          <span>
            <strong>Pour qui ?</strong> Tous les étudiants curieux, quel que
            soit le niveau.
          </span>
          <ChevronDown aria-hidden className="apropos-chevron size-4" />
        </summary>
        <div className="apropos-who-body">
          <p className="m-0 text-xs leading-relaxed opacity-90">
            Le club s&apos;adresse aux étudiants de l&apos;Université Alioune
            Diop de Bambey qui s&apos;intéressent à l&apos;informatique, à la
            cybersécurité, aux technologies et à l&apos;innovation.
          </p>
          <p className="m-0 text-xs leading-relaxed opacity-90">
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

/* ---------- Pourquoi rejoindre : liste + 4 étapes + pastilles ---------- */
const actions = [
  "Participer aux séances",
  "Proposer des idées",
  "Contribuer aux projets",
  "Respecter les règles",
];
const qualities = [
  "Curiosité",
  "Régularité",
  "Esprit d'équipe",
  "Respect des règles",
];

export function JoinSection() {
  return (
    <div className="apropos-join">
      <ul className="cts-card apropos-gains-list">
        {gains.map((gain) => (
          <li key={gain}>
            <span className="apropos-check" aria-hidden>
              <Check className="size-3" strokeWidth={3} />
            </span>
            <span>{gain}</span>
          </li>
        ))}
      </ul>

      <p className="apropos-eyebrow">COMMENT PARTICIPER ?</p>
      <ol className="apropos-how">
        {actions.map((label, index) => (
          <li key={label} className="cts-card">
            <span className="apropos-how-num">0{index + 1}</span>
            <span>{label}</span>
          </li>
        ))}
      </ol>

      <p className="apropos-eyebrow">L&apos;ESSENTIEL POUR BIEN COMMENCER</p>
      <div className="apropos-pills">
        {qualities.map((label) => (
          <span key={label} className="apropos-pill">
            {label}
          </span>
        ))}
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

/* ---------- Identité du club : cartes + logos ---------- */
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