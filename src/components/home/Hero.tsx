import Image from "next/image";
import Link from "next/link";
import { CircuitLines } from "./CircuitLines";

// Ajuste ce zoom si besoin : 1 = image entière, 1.08 = coupe un peu plus
// de blanc autour du logo. Monte-le si tu vois encore du blanc, baisse-le
// si le cercle du logo est coupé.
const LOGO_ZOOM = 1;

export function Hero() {
  return (
    <section
      id="home"
      className="mx-auto grid max-w-[1120px] items-center gap-10 px-6 py-12 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:px-10 md:py-20"
    >
      <div className="flex flex-col items-start gap-5">
        <span className="cts-badge">
          <Image
            src="/images/logo-uadb.jpeg"
            alt=""
            width={20}
            height={20}
            className="rounded-full"
          />
          Université Alioune Diop de Bambey
        </span>
        <h1 className="font-[family-name:var(--h-font-title)] text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-5xl">
          Apprendre à sécuriser le numérique, ensemble.
        </h1>
        <p className="max-w-md leading-relaxed text-[var(--h-muted)]">
          CyberTech Squad réunit les étudiants de l&apos;UADB autour de la
          cybersécurité, du développement et de l&apos;innovation.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/adhesion" className="cts-btn">
            Rejoindre le club
          </Link>
          <Link href="#activites" className="cts-btn cts-btn-outline">
            Voir nos activités
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div
          className="cts-logo relative aspect-square w-56 shrink-0 overflow-hidden rounded-full bg-white shadow-[0_0_0_6px_color-mix(in_srgb,var(--h-accent)_22%,transparent),0_0_48px_color-mix(in_srgb,var(--h-accent)_45%,transparent)] sm:w-64 md:w-80"
        >
          <Image
            src="/images/logo-cts.jpeg"
            alt="Logo Cyber Tech Squad"
            fill
            priority
            sizes="(min-width: 768px) 320px, 256px"
            className="object-cover"
            style={{ transform: `scale(${LOGO_ZOOM})` }}
          />
        </div>
        <CircuitLines />
        <p className="text-xs font-semibold text-[var(--h-accent)]">
          Technologie, sécurité, innovation

        </p>
      </div>
    </section>
  );
}