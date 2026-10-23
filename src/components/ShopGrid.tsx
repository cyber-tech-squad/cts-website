import Image from "next/image";
import type { Product } from "@/lib/content";

const fcfa = new Intl.NumberFormat("fr-FR");

export function ShopGrid({ products }: { products: Product[] }) {
  if (products.length === 0)
    return <p className="empty-state">Les produits du club arrivent bientôt.</p>;
  return (
    <div className="card-grid shop-grid">
      {products.map((product) => (
        <article className="product-card" key={product.slug}>
          <div className="product-image">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            )}
            {product.badge && <span className="badge">{product.badge}</span>}
          </div>
          <div className="product-copy">
            <div>
              <h3>{product.name}</h3>
              <strong>
                {fcfa.format(product.price)} <small>FCFA</small>
              </strong>
            </div>
            <p>{product.description}</p>
            <a
              className="button button-outline"
              href={product.actionUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {product.actionLabel || "Commander"} <span>↗</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
