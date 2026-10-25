import type { Metadata } from "next";
import { PageIntro, PageShell } from "@/components/PageShell";
import { TeamOrgChart } from "@/components/TeamOrgChart";
import { getTeam } from "@/lib/content";
import { buildOrgChart } from "@/lib/team-structure";

export const metadata: Metadata = {
  title: "Équipe",
  description:
    "Le bureau du Cyber Tech Squad : coordinateur, vice-coordinateur, responsables de pôles et adjoints.",
};

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
          <div className="frame-badge" aria-hidden="true">
            UADB
          </div>
          <h2 id="frame-title">Au sein de l&apos;UADB</h2>
          <p>
            Le club évolue au sein de l&apos;Université Alioune Diop de Bambey. Coordinateur :{" "}
            {coordinatorName}.
          </p>
        </section>

        <section className="partners-card" aria-labelledby="partners-title">
          <span className="cts-eyebrow">Partenaires</span>
          <h2 id="partners-title">[Logos des partenaires]</h2>
          <p>Les organisations qui soutiennent le club apparaîtront ici.</p>
        </section>
      </div>
    </PageShell>
  );
}