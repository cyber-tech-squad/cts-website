import Image from "next/image";
import Link from "next/link";
import { CircuitLines } from "./CircuitLines";
import { uiFont } from "./ui-font";

// Ajuste ce zoom si besoin : 1 = image entière, 1.08 = coupe un peu plus
// de blanc autour du logo. Monte-le si tu vois encore du blanc, baisse-le
// si le cercle du logo est coupé.
const LOGO_ZOOM = 1;

export function Hero() {
  return (
    <section
      id="home"
      className={`${uiFont.variable} mx-auto grid max-w-[1120px] items-center gap-6 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:px-10 md:py-20`}
    >
      <div className="flex flex-col items-start gap-4 sm:gap-5">
        <span className="cts-badge max-w-full text-[11px] sm:text-sm">
          <Image
            src="/images/logo-uadb.jpeg"
            alt=""
            width={20}
            height={20}
            className="size-4 shrink-0 rounded-full sm:size-5"
          />
          Université Alioune Diop de Bambey
        </span>

        {/* Mobile : police Sora, plus petite et plus fine. Desktop : police d'origine. */}
        <h1 className="font-[family-name:var(--cts-font-ui)] text-[clamp(1.375rem,6.4vw,1.75rem)] font-semibold leading-[1.18] tracking-tight text-balance sm:font-[family-name:var(--h-font-title)] sm:text-4xl sm:font-bold sm:leading-[1.15] sm:tracking-normal lg:text-5xl">
          Apprendre à sécuriser le numérique, ensemble.
        </h1>

        <p className="max-w-md text-sm leading-relaxed text-[var(--h-muted)] sm:text-base">
          CyberTech Squad réunit les étudiants de l&apos;UADB autour de la
          cybersécurité, du développement et de l&apos;innovation.
        </p>

        {/* Boutons : desktop / tablette uniquement */}
        <div className="hidden gap-3 sm:flex sm:flex-row">
          <Link href="/adhesion" className="cts-btn">
            Rejoindre le club
          </Link>
          <Link href="#activites" className="cts-btn cts-btn-outline">
            Voir nos activités
          </Link>
        </div>
      </div>

      {/* Logo masqué sur mobile (déjà dans le header) */}
      <div className="hidden flex-col items-center gap-4 sm:flex">
        <div className="cts-logo relative aspect-square w-56 shrink-0 overflow-hidden rounded-full bg-white shadow-[0_0_0_6px_color-mix(in_srgb,var(--h-accent)_22%,transparent),0_0_48px_color-mix(in_srgb,var(--h-accent)_45%,transparent)] sm:w-64 md:w-80">
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