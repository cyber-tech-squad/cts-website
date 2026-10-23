import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { getArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = (await getArticles()).find((entry) => entry.slug === slug);
  return { title: article?.title ?? "Article" };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = (await getArticles()).find((entry) => entry.slug === slug);
  if (!article) notFound();
  return (
    <>
      <SiteHeader />
      <main className="article-page section-wrap">
        <div className="section-label">
          {article.category} · {formatDate(article.date)}
        </div>
        <h1>{article.title}</h1>
        <p className="page-lead">{article.excerpt}</p>
        <article className="markdown-body">
          {article.body.split(/\n\s*\n/).map((block, index) => (
            <p key={index}>{block.replace(/^#{1,6}\s+/, "")}</p>
          ))}
        </article>
      </main>
    </>
  );
}
