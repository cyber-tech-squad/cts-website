import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { JoinForm } from "@/components/JoinForm";
export const metadata: Metadata = { title: "Adhésion" };
export default function JoinPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page section-wrap join-page">
        <div>
          <div className="section-label">04 / NOUS REJOINDRE</div>
          <h1>
            On apprend <span>ensemble.</span>
          </h1>
          <p className="page-lead">
            Remplis ce formulaire et le bureau te recontactera pour la suite.
          </p>
          <p className="fine-print">
            Ouvert aux étudiantes et étudiants de l’UADB, quel que soit leur niveau de départ.
          </p>
        </div>
        <JoinForm />
      </main>
    </>
  );
}
