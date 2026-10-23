import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { getArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";
export const metadata: Metadata = { title: "Veille" };
export default async function BlogPage() {
  const articles = await getArticles();
  return (
    <>
      <SiteHeader />
      <main className="inner-page section-wrap">
        <div className="section-label">VEILLE & RESSOURCES</div>
        <h1>
          Le numérique <span>sous surveillance.</span>
        </h1>
        <p className="page-lead">Analyses, apprentissages et découvertes de la communauté.</p>
        <div className="list-grid">
          {articles.length ? (
            articles.map((article) => (
              <article className="content-card" key={article.slug}>
                <span className="eyebrow">
                  {article.category} · {formatDate(article.date)}
                </span>
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                <Link className="text-link" href={`/blog/${article.slug}`}>
                  Lire l’article <span>↗</span>
                </Link>
              </article>
            ))
          ) : (
            <p className="empty-state">Les articles de veille seront publiés ici.</p>
          )}
        </div>
      </main>
    </>
  );
}
