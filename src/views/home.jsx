"use client";
import { useState } from "react";
import Link from "next/link";
import PageShell from "../shared/PageShell";
import Logo from "../shared/Logo";
import { CTS_LOGO } from "../shared/logocts";
import { UADB_LOGO } from "../shared/logouadb";
import "./home.css";

/* =====================================================================
   PAGE D'ACCUEIL : CyberTech Squad (UADB)
   La barre du haut, le pied de page et le mode hacker viennent de
   shared/PageShell : ici, on ne met que le contenu propre à l'accueil.
   ===================================================================== */

// ---------- Contenu : modifie les textes ici ----------
const domains = [
  {
    id: "cyber",
    name: "Cybersécurité",
    icon: "shield-lock-fill",
    text: "Découvrir plusieurs domaines de la cybersécurité par la pratique, dans un cadre responsable et autorisé.",
    points: ["CTF Labs et mini-CTF", "Ateliers de pentest web en environnement autorisé", "Sensibilisation et cyber-hygiène"],
  },
  {
    id: "numerique",
    name: "Numérique",
    icon: "laptop",
    text: "Promouvoir les bonnes pratiques numériques et créer ensemble des contenus et des projets utiles.",
    points: ["Bonnes pratiques et risques numériques", "Projets collectifs", "Création de contenus cyber"],
  },
  {
    id: "innovation",
    name: "Innovation",
    icon: "lightbulb-fill",
    text: "Transformer les apprentissages théoriques en compétences pratiques grâce à des projets et des défis.",
    points: ["Défis et projets réguliers", "Culture de collaboration et de responsabilité", "Compétitions et événements interclubs"],
  },
  {
    id: "parcours",
    name: "Parcours",
    icon: "mortarboard-fill",
    text: "Avancer pas à pas, avec l'appui des autres membres et des professionnels.",
    points: ["Mentorat entre membres", "Certifications et préparation", "Rencontres avec professionnels et anciens membres"],
  },
];

const activities = [
  { icon: "calendar-event-fill", title: "Séances cyber du samedi", text: "Rencontres régulières pour apprendre, échanger et pratiquer." },
  { icon: "flag-fill", title: "CTF Labs et mini-CTF", text: "Défis pratiques pour développer la logique, l'analyse et les réflexes de sécurité." },
  { icon: "bug-fill", title: "Ateliers de pentest web", text: "Découverte des vulnérabilités dans des environnements autorisés." },
  { icon: "people-fill", title: "Mentorat et projets collectifs", text: "Accompagnement entre membres et réalisation de projets." },
  { icon: "patch-check-fill", title: "Certifications et préparation", text: "Orientation vers des parcours de formation adaptés." },
  { icon: "trophy-fill", title: "Compétitions et événements interclubs", text: "Participation à des challenges et à des activités communautaires." },
  { icon: "mic-fill", title: "Conférences, visites et sensibilisation", text: "Rencontres, découvertes professionnelles et actions de cyber-hygiène." },
  { icon: "pencil-square", title: "Création de contenus cyber", text: "Partage de conseils, de ressources et de contenus pédagogiques." },
];

// Exemples : remplace-les avec les vraies actualités du club
const news = [
  { type: "Atelier", title: "Initiation à la cybersécurité", when: "Bientôt" },
  { type: "Projet", title: "Création du site officiel du club", when: "En cours" },
  { type: "Conférence", title: "Protéger sa vie privée en ligne", when: "Bientôt" },
];

// À COMPLÉTER par le club : mettre les vrais prix (ex. "2 500 FCFA") dans le champ "price".
const products = [
  { icon: "stickies-fill", name: "Pack d'autocollants", price: null },
  { icon: "bag-heart-fill", name: "Polo CyberTech Squad", price: null },
  { icon: "tag-fill", name: "T-shirt membre", price: null },
];

const resources = ["Articles", "Guides", "Comptes rendus", "Photos"];

// ---------- Pistes de circuit sous le logo (hero) ----------
function CircuitTraces() {
  const paths = [
    "M150 0 V56 L120 86 V150",
    "M118 0 V44 L88 74 V150",
    "M182 0 V44 L212 74 V150",
    "M86 0 V30 L56 60 V150",
    "M214 0 V30 L244 60 V150",
  ];
  return (
    <svg viewBox="0 0 300 150" width="100%" style={{ display: "block", maxWidth: 320 }} aria-hidden="true">
      {paths.map((d) => (
        <g key={d}>
          <path d={d} fill="none" stroke="var(--green)" strokeWidth="2.5" opacity="0.35" />
          <path className="pulse" d={d} fill="none" stroke="var(--neon)" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      ))}
      {[120, 88, 212, 56, 244].map((x) => (
        <circle key={x} cx={x} cy="146" r="4.5" fill="var(--neon)" stroke="var(--green)" strokeWidth="2" />
      ))}
    </svg>
  );
}

function Home() {
  const [active, setActive] = useState("cyber");
  const current = domains.find((d) => d.id === active);

  return (
    <PageShell>
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="wrap hero-in">
          <div>
            <div className="uni-badge">
              <Logo src={UADB_LOGO} alt="Logo UADB" fallback="UADB" size={30} round />
              Université Alioune Diop de Bambey
            </div>
            <h1>Apprendre à sécuriser le numérique, ensemble.</h1>
            <p className="lead">
              CyberTech Squad réunit les étudiants de l'UADB autour de la cybersécurité, du
              développement et de l'innovation.
            </p>
            <div className="hero-cta">
              <Link href="/adhesion" className="btn btn-primary">
                Rejoindre le club
              </Link>
              <Link href="/activites" className="btn btn-ghost">
                Voir nos activités
              </Link>
            </div>
          </div>

          <div className="logo-stack">
            <div className="logo-disc">
              <Logo src={CTS_LOGO} alt="CyberTech Squad : technologie, sécurité, innovation" fallback="CTS" size={250} round />
            </div>
            <CircuitTraces />
            <p className="slogan">Technologie, sécurité, innovation</p>
          </div>
        </div>
      </section>

      {/* ================= CONTENU RELIÉ PAR LA PISTE ================= */}
      <main className="wrap rail">
        {/* ----- Domaines ----- */}
        <section className="block">
          <h2>Ce qu'on apprend</h2>
          <p className="sub">Quatre domaines, un seul objectif : progresser en pratiquant.</p>
          <div className="tabs">
            <div className="tab-list" role="tablist" aria-label="Domaines du club">
              {domains.map((d) => (
                <button
                  key={d.id}
                  role="tab"
                  aria-selected={active === d.id}
                  className="tab"
                  onClick={() => setActive(d.id)}
                >
                  <i className={`bi bi-${d.icon}`} aria-hidden="true"></i>
                  {d.name}
                </button>
              ))}
            </div>
            <div className="panel" role="tabpanel">
              <h3>{current.name}</h3>
              <p>{current.text}</p>
              <ul>
                {current.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ----- Activités ----- */}
        <section className="block">
          <h2>Nos activités</h2>
          <p className="sub">Des moments pour apprendre, construire et partager.</p>
          <div className="act-grid">
            {activities.map((a) => (
              <div key={a.title} className="act">
                <div className="ico" aria-hidden="true"><i className={`bi bi-${a.icon}`}></i></div>
                <strong>{a.title}</strong>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
          <Link href="/activites" className="more-link">Voir toutes les activités</Link>
        </section>

        {/* ----- Actualités + Ressources ----- */}
        <section className="block">
          <h2>À la une</h2>
          <p className="sub">Ce qui se passe au club et de quoi progresser seul.</p>
          <div className="duo">
            <div className="news">
              {news.map((n) => (
                <div key={n.title} className="news-item">
                  <span className="tag">{n.type}</span>
                  <strong style={{ fontSize: 15 }}>{n.title}</strong>
                  <span style={{ color: "var(--muted)", fontSize: 13 }}>{n.when}</span>
                </div>
              ))}
            </div>
            <div className="res">
              <h3>Ressources du club</h3>
              <div className="chips">
                {resources.map((r) => (
                  <span key={r}>{r}</span>
                ))}
              </div>
              <Link href="/ressources" className="more">
                Parcourir les ressources
              </Link>
            </div>
          </div>
        </section>

        {/* ----- Boutique ----- */}
        <section className="block">
          <div className="shop-head">
            <div>
              <h2>
                La boutique <span className="new">Nouveau</span>
              </h2>
              <p className="sub">Porte les couleurs du club : autocollants, polos et plus encore.</p>
            </div>
            <Link href="/boutique" className="more-link">
              Voir toute la boutique <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
          <div className="shop-grid">
            {products.map((p) => (
              <Link key={p.name} href="/boutique" className="prod">
                <span className="pic" aria-hidden="true"><i className={`bi bi-${p.icon}`}></i></span>
                <span>
                  <strong>{p.name}</strong>
                  <small>{p.price || "Prix à annoncer"}</small>
                </span>
              </Link>
            ))}
            <Link href="/boutique" className="shop-all">
              Tout voir
              <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </section>

        {/* ----- Bureau + Université + Partenaires ----- */}
        <section className="block">
          <h2>Le club et ceux qui le soutiennent</h2>
          <p className="sub" style={{ marginBottom: 14 }}>
            Un bureau d'étudiants, l'appui de l'université et de nos partenaires.
          </p>
          <div className="people">
            <div className="card">
              <span className="kicker">Bureau</span>
              <h3>L'équipe étudiante</h3>
              <p>Les étudiants qui organisent les ateliers et animent le club.</p>
              <Link href="/equipe" className="lnk">Rencontrer le bureau</Link>
            </div>
            <div className="card">
              <span className="kicker">Université</span>
              <div className="uni-row">
                <Logo src={UADB_LOGO} alt="Université Alioune Diop de Bambey" fallback="UADB" size={40} round />
                <h3>UADB</h3>
              </div>
              <p>Université Alioune Diop de Bambey, qui accueille et appuie les activités du club.</p>
            </div>
            <div className="card">
              <span className="kicker">Partenaires</span>
              <h3>Nos partenaires</h3>
              <p>Espace réservé aux organisations qui soutiennent le club.</p>
              <Link href="/equipe" className="lnk">Voir les partenaires</Link>
            </div>
          </div>
        </section>

        {/* ----- Appel à rejoindre ----- */}
        <section className="block">
          <div className="join-band">
            <div>
              <h2>Prêt à rejoindre la Squad ?</h2>
              <p>Ouvert à tous les étudiants de l'UADB, quel que soit le niveau.</p>
            </div>
            <Link href="/adhesion" className="btn">
              Adhérer au club
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

export default Home;