"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
// `import type` : le type est effacé à la compilation, donc le module "server-only"
// n'est jamais embarqué dans le navigateur.
import type { Product } from "@/lib/content";

const FILTERS = ["Tout voir", "Autocollants", "Vêtements", "Accessoires"] as const;
type Filter = (typeof FILTERS)[number];
type Category = Exclude<Filter, "Tout voir">;

const fcfa = new Intl.NumberFormat("fr-FR");

const ICONS: Record<Category, ReactNode> = {
  Autocollants: (
    <>
      <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M14 3v5h5" />
    </>
  ),
  Vêtements: <path d="M8.5 3 3 6l2 4.2 3-1.2V21h8V9l3 1.2L21 6l-5.5-3a4 4 0 0 1-7 0z" />,
  Accessoires: (
    <>
      <path d="M3 12V4h8l10 10-8 8L3 12z" />
      <circle cx="7.5" cy="8.5" r="1.3" />
    </>
  ),
};

function ProductIcon({ category }: { category: Category }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[category]}
    </svg>
  );
}

function ProductCard({ product }: { product: Product }) {
  const category: Category = product.category ?? "Accessoires";
  const comingSoon = product.badge === "Bientôt";
  const soldOut = product.badge === "Épuisé";

  const actionUrl = product.actionUrl;
  // Lien interne (ex. /contact?produit=polo) : même onglet, navigation Next.js.
  const isInternal = typeof actionUrl === "string" && actionUrl.startsWith("/");
  const actionClass = `cts-btn${comingSoon ? " cts-btn-outline" : ""}`;
  const actionText = product.actionLabel || (comingSoon ? "Me prévenir" : "Commander");

  return (
    <article className="product">
      <div className={`product-media${product.image ? " has-photo" : ""}`}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          />
        ) : (
          <>
            <ProductIcon category={category} />
            <span className="product-ph">[Photo du produit]</span>
          </>
        )}
      </div>

      <div className="product-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-foot">
          <span className="product-price">
            {product.price > 0 ? (
              <>
                {fcfa.format(product.price)} <small>FCFA</small>
              </>
            ) : (
              "Prix à venir"
            )}
          </span>

          {soldOut ? (
            <span className="cts-btn cts-btn-ghost">Épuisé</span>
          ) : isInternal ? (
            <Link className={actionClass} href={actionUrl}>
              {actionText}
            </Link>
          ) : (
            <a className={actionClass} href={actionUrl} target="_blank" rel="noopener noreferrer">
              {actionText}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ShopGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("Tout voir");

  if (products.length === 0) {
    return <p className="shop-empty">Les produits du club arrivent bientôt.</p>;
  }

  const visible =
    filter === "Tout voir"
      ? products
      : products.filter((product) => (product.category ?? "Accessoires") === filter);

  return (
    <>
      <div className="shop-filters" role="group" aria-label="Filtrer par catégorie">
        {FILTERS.map((name) => (
          <button
            key={name}
            type="button"
            className="filter-pill"
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="shop-empty">Aucun article dans cette catégorie pour le moment.</p>
      ) : (
        <ul className="shop-grid">
          {visible.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}