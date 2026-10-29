import type { Metadata } from "next";
import { Library } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { HomeShell } from "@/components/home/HomeShell";
import { RessourcesList } from "@/components/RessourcesList";
import "./ressources.css";

export const metadata: Metadata = {
  title: "Ressources — Cyber Tech Squad",
  description:
    "Plateformes, outils et livres recommandés par le Cyber Tech Squad pour se former en cybersécurité.",
};

export default function RessourcesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeShell>
          <div className="ressources-page">
            {/* Héros */}
            <section className="res-hero mx-auto flex max-w-[1120px] flex-col items-start gap-3 px-4 py-8 sm:px-6 md:px-10 md:py-14">
              <span className="res-badge inline-flex items-center gap-2 rounded-full border border-[var(--h-line)] px-3 py-1.5 text-xs font-medium">
                <Library
                  aria-hidden
                  className="size-3.5 text-[var(--h-accent)]"
                  strokeWidth={1.75}
                />
                Ressources
              </span>
              <h1 className="font-[family-name:var(--h-font-title)] text-xl font-semibold leading-[1.2] tracking-tight sm:text-3xl lg:text-4xl">
                De quoi progresser seul, à ton rythme.
              </h1>
              <p className="max-w-xl text-xs leading-relaxed text-[var(--h-muted)] sm:text-sm">
                Plateformes, outils et livres pour te documenter en
                cybersécurité.
              </p>
            </section>

            <div className="res-main mx-auto max-w-[1120px] px-4 pb-10 sm:px-6 md:px-10">
              <RessourcesList />
            </div>

            <div className="res-cta-wrap mx-auto max-w-[1120px] px-4 pb-12 sm:px-6 md:px-10">
              <section className="res-cta cts-feature flex flex-row items-center justify-between gap-3">
                <div className="flex min-w-0 flex-col gap-0.5">
                  <h2 className="font-[family-name:var(--h-font-title)] text-base font-semibold">
                    Une ressource à partager ?
                  </h2>
                  <p className="text-xs opacity-80 sm:text-sm">
                    Propose-la au bureau, on l&apos;ajoute à la liste.
                  </p>
                </div>
                <Link href="/contact" className="cts-btn shrink-0 text-sm">
                  Nous écrire
                </Link>
              </section>
            </div>
          </div>
        </HomeShell>
      </main>
    </>
  );
}