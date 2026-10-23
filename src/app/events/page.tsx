import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { getEvents } from "@/lib/content";
import { formatDate } from "@/lib/format";
export const metadata: Metadata = { title: "Événements" };
export default async function EventsPage() {
  const events = await getEvents();
  return (
    <>
      <SiteHeader />
      <main className="inner-page section-wrap">
        <div className="section-label">ÉVÉNEMENTS</div>
        <h1>
          Apprendre en <span>pratiquant.</span>
        </h1>
        <p className="page-lead">Ateliers, CTF et rencontres de la communauté.</p>
        <div className="list-grid">
          {events.length ? (
            events.map((event) => (
              <article className="content-card" key={event.slug}>
                <span className="eyebrow">
                  {event.kind} · {formatDate(event.date)}
                </span>
                <h2>{event.title}</h2>
                <p>{event.excerpt}</p>
                <span className="muted">{event.location}</span>
              </article>
            ))
          ) : (
            <p className="empty-state">Les prochains événements seront annoncés ici.</p>
          )}
        </div>
      </main>
    </>
  );
}
