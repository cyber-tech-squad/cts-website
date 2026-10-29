import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro, PageShell } from "@/components/PageShell";
import { TeamOrgChart } from "@/components/TeamOrgChart";
import { getTeam } from "@/lib/content";
import { buildOrgChart } from "@/lib/team-structure";

export const metadata: Metadata = {
  title: "Équipe",
  description:
    "Le bureau du Cyber Tech Squad : coordinateur, vice-coordinateur, responsables de pôles et adjoints.",
};

const PARTNERS = [
  {
    name: "UADB-Tech Club",
    logo: "/partners/uadb-tech-club.png",
    alt: "Logo du UADB-Tech Club",
  },
  {
    name: "Fédération des Clubs Informatiques du Sénégal",
    logo: "/partners/fcis.png",
    alt: "Logo de la Fédération des Clubs Informatiques du Sénégal (FCIS)",
  },
];

export default async function TeamPage() {
  const chart = buildOrgChart(await getTeam());
  const coordinatorName = chart.coordinator.name;

  return (
    <PageShell>
      <PageIntro
        label="Équipe"
        title="Les étudiants qui font vivre le club."
        lead={`Le club est coordonné par ${coordinatorName}, avec des responsables de pôles et leurs adjoints. Clique sur une personne pour voir sa fiche et ses réseaux.`}
      />

      <TeamOrgChart
        coordinator={chart.coordinator}
        viceCoordinator={chart.viceCoordinator}
        branches={chart.branches}
      />

      <div className="cts-duo">
        <section className="cts-green frame-card" aria-labelledby="frame-title">
          <span className="cts-eyebrow">Encadrement</span>
          <Image
            className="frame-logo"
            src="/logo-uadb.png"
            alt="Logo de l'Université Alioune Diop de Bambey"
            width={346}
            height={244}
          />
          <h2 id="frame-title">Au sein de l&apos;UADB</h2>
          <p>
            Le Cyber Tech Squad est le club de cybersécurité de l&apos;Université Alioune Diop de
            Bambey. Il réunit des étudiants autour de l&apos;apprentissage, de la pratique et de
            l&apos;innovation numérique.
          </p>
        </section>

        <section className="partners-card" aria-labelledby="partners-title">
          <span className="cts-eyebrow">Partenaires</span>
          <h2 id="partners-title">Clubs partenaires</h2>
          <ul className="partners-logos">
            {PARTNERS.map((partner) => (
              <li key={partner.name}>
                <Image
                  className="partners-logo"
                  src={partner.logo}
                  alt={partner.alt}
                  width={240}
                  height={240}
                />
                <span>{partner.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}