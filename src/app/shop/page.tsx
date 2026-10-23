import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { ShopGrid } from "@/components/ShopGrid";
import { getProducts } from "@/lib/content";
export const metadata: Metadata = { title: "Boutique" };
export default async function ShopPage() {
  const products = await getProducts();
  return (
    <>
      <SiteHeader />
      <main className="inner-page section-wrap">
        <div className="section-label">03 / BOUTIQUE</div>
        <h1>
          La boutique <span>du club.</span>
        </h1>
        <p className="page-lead">
          Quelques objets pour afficher tes couleurs et soutenir les activités du Cyber Tech Squad.
        </p>
        <ShopGrid products={products} />
      </main>
    </>
  );
}
