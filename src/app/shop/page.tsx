import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, PageShell } from "@/components/PageShell";
import { ShopGrid } from "@/components/ShopGrid";
import { getProducts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Autocollants, polos et vêtements du Cyber Tech Squad : chaque achat soutient le club.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <PageShell>
      <PageIntro
        label="Boutique"
        title="Porte les couleurs de la Squad."
        lead="Autocollants, polos et vêtements du club : chaque achat aide à financer nos ateliers et nos projets."
      />

      <ShopGrid products={products} />

      <div className="shop-info">
        <section className="how-card" aria-labelledby="how-title">
          <h2 id="how-title">Comment commander ?</h2>
          <ol>
            <li>Choisis ton article.</li>
            <li>
              Clique sur « Commander » : ton application mail s&apos;ouvre avec un message prêt. Complète
              ta taille (pour le polo) et ton numéro de téléphone, puis envoie.
            </li>
            <li>Le bureau te répond et te précise le paiement et le retrait à l&apos;UADB.</li>
          </ol>
        </section>

        <section className="cts-green why-card" aria-labelledby="why-title">
          <span className="cts-eyebrow">Pourquoi acheter ?</span>
          <h2 id="why-title">Chaque achat soutient le club.</h2>
          <p>
            Les bénéfices servent à organiser des ateliers, des conférences et nos projets
            d&apos;équipe.
          </p>
        </section>
      </div>

      <section className="cts-green cta-band" aria-labelledby="cta-title">
        <div>
          <h2 id="cta-title">Prêt à rejoindre la Squad ?</h2>
          <p>Ouvert à tous les étudiants de l&apos;UADB, quel que soit le niveau.</p>
        </div>
        <Link className="cts-btn cts-btn-neon" href="/adhesion">
          Adhérer au club
        </Link>
      </section>
    </PageShell>
  );
}