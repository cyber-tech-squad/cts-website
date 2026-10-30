import type { Metadata } from "next";
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
              Clique sur « Commander » : WhatsApp s&apos;ouvre avec ton article déjà indiqué.
              Précise la quantité (et ta taille pour le polo), puis envoie le message.
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
    </PageShell>
  );
}