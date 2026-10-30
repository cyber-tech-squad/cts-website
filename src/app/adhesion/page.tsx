import type { Metadata } from "next";
import { PageIntro, PageShell } from "@/components/PageShell";
import { CLUB_INFO, whatsappLink } from "@/lib/club-info";

export const metadata: Metadata = {
  title: "Adhésion",
  description: "Rejoins le Cyber Tech Squad, le club de cybersécurité de l'UADB.",
};

export default function JoinPage() {
  const joinHref = whatsappLink(
    CLUB_INFO.joinPhone,
    "Bonjour, je souhaite adhérer au Cyber Tech Squad.\nNom : \nFilière : \nNiveau : ",
  );

  return (
    <PageShell>
      <PageIntro
        label="Adhésion"
        title="On apprend ensemble."
        lead="Ouvert aux étudiantes et étudiants de l'UADB, quel que soit leur niveau de départ."
      />

      <div className="shop-info">
        <section className="how-card" aria-labelledby="how-title">
          <h2 id="how-title">Comment adhérer ?</h2>
          <ol>
            <li>Écris-nous sur WhatsApp avec ton nom, ta filière et ton niveau.</li>
            <li>Le bureau te répond et t&apos;explique la suite.</li>
            <li>
              Tu peux aussi prendre la carte de membre du club (1 000 FCFA) depuis la boutique.
            </li>
          </ol>
        </section>

        <section className="cts-green why-card" aria-labelledby="who-title">
          <span className="cts-eyebrow">Pour qui ?</span>
          <h2 id="who-title">Tous les niveaux sont les bienvenus</h2>
          <p>
            Débutant ou déjà à l&apos;aise, tu as ta place dans le club. Ce qui compte, c&apos;est la
            curiosité et l&apos;envie d&apos;apprendre avec les autres.
          </p>
        </section>
      </div>

      <section className="cts-green cta-band" aria-labelledby="cta-title">
        <div>
          <h2 id="cta-title">Prêt à nous rejoindre ?</h2>
          <p>Écris-nous sur WhatsApp, le bureau te répond dès que possible.</p>
        </div>
        <a className="cts-btn cts-btn-neon" href={joinHref} target="_blank" rel="noopener noreferrer">
          Adhérer sur WhatsApp
        </a>
      </section>
    </PageShell>
  );
}