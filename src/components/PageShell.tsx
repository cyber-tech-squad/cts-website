import type { ReactNode } from "react";
import { MatrixBackground } from "@/components/MatrixBackground";
import { SiteHeader } from "@/components/SiteHeader";
import { hanken, unbounded } from "@/lib/fonts";
import "@/styles/cts-pages.css";

// Composant serveur (pas de "use client") : il enveloppe les pages Équipe, Boutique et Contact.
// Il applique les polices (via les classes `.variable`) et charge la feuille de style commune.
export function PageShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <div className={`cts-page ${unbounded.variable} ${hanken.variable}`}>
        <MatrixBackground />
        <main className="cts-wrap">{children}</main>
      </div>
    </>
  );
}

export function PageIntro({
  label,
  title,
  lead,
}: Readonly<{ label: string; title: ReactNode; lead: string }>) {
  return (
    <header>
      <span className="cts-pill">{label}</span>
      <h1 className="cts-title">{title}</h1>
      <p className="cts-lead">{lead}</p>
    </header>
  );
}
