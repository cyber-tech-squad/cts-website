import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamGrid } from "@/components/TeamGrid";
import { getTeam } from "@/lib/content";
import { Brand } from "@/components/Brand";

export default async function HomePage() {
  const team = await getTeam();
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" id="home">
          <div className="grid-glow hero-grid" />
          <div className="hero-content">
            <span className="eyebrow">
              <i className="status-dot" /> CLUB DE CYBERSÉCURITÉ · UADB
            </span>
            <h1>
              Curieux du numérique.
              <br />
              <span>Défenseurs du futur.</span>
            </h1>
            <p>
              On apprend, on partage et on construit une culture de la cybersécurité ouverte à
              toutes et à tous.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/adhesion">
                Rejoindre le club <span>↗</span>
              </Link>
              <Link className="text-link" href="/#about">
                Découvrir le club <span>↓</span>
              </Link>
            </div>
          </div>
          <div className="hero-terminal" aria-label="Terminal décoratif">
            <div className="terminal-top">
              <span />
              <span />
              <span />
              <small>cts://welcome</small>
            </div>
            <pre>
              <span className="terminal-muted">$</span> whoami{"\n"}
              <b>cyber_tech_squad</b>
              {"\n\n"}
              <span className="terminal-muted">$</span> mission --show{"\n"}
              <i>apprendre();</i>
              {"\n"}
              <i>partager();</i>
              {"\n"}
              <i>sécuriser();</i>
              {"\n\n"}
              <span className="terminal-muted">$</span> <span className="cursor">▌</span>
            </pre>
          </div>
          <div className="hero-index">
            14°42' N &nbsp; 16°27' W <span>· BAMBEY, SÉNÉGAL</span>
          </div>
        </section>
        <section className="intro-section section-wrap" id="about">
          <div className="section-label">01 / LE CLUB</div>
          <div className="intro-copy">
            <h2>
              La cybersécurité
              <br />
              se construit <span>ensemble.</span>
            </h2>
            <p>
              Le Cyber Tech Squad est le club étudiant de cybersécurité de l’Université Alioune Diop
              de Bambey. Ateliers pratiques, veille, défis CTF : chacun progresse à son rythme et
              contribue à un numérique plus sûr.
            </p>
            <Link className="text-link" href="/events">
              Voir les activités <span>↗</span>
            </Link>
          </div>
          <div className="stat-row">
            <div>
              <strong>01</strong>
              <span>Communauté étudiante</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>Choses à apprendre</span>
            </div>
            <div>
              <strong>0</strong>
              <span>Prérequis pour débuter</span>
            </div>
          </div>
        </section>
        <section className="team-section section-wrap" id="team">
          <div className="section-heading">
            <div>
              <div className="section-label">02 / LE BUREAU</div>
              <h2>
                Celles et ceux qui <span>animent le club.</span>
              </h2>
            </div>
            <Link href="/adhesion" className="text-link">
              Les rejoindre <span>↗</span>
            </Link>
          </div>
          <TeamGrid members={team} />
        </section>
        <section className="cta-section section-wrap" id="join">
          <div className="cta-box">
            <div className="section-label">PRÊT·E À COMMENCER ?</div>
            <h2>
              Ton prochain défi
              <br />
              <span>commence ici.</span>
            </h2>
            <Link className="button" href="/adhesion">
              Faire une demande d’adhésion <span>↗</span>
            </Link>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <Brand />
        <span>UADB · Bambey, Sénégal</span>
        <span>© {new Date().getFullYear()} Cyber Tech Squad</span>
      </footer>
    </>
  );
}
