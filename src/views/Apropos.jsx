"use client";
import Link from "next/link";
import PageShell from "../shared/PageShell";
import Logo from "../shared/Logo";
import { CTS_LOGO } from "../shared/logocts";
import "./a-propos.css";

/* =====================================================================
   PAGE À PROPOS : CyberTech Squad (UADB)
   La barre du haut, le pied de page et le mode hacker viennent de
   shared/PageShell : ici, on ne met que le contenu de la page.
   Textes : présentation officielle du club + maquette de l'équipe.
   ===================================================================== */

// ---------- Contenu : modifie les textes ici ----------
const mission =
  "Développer les compétences des étudiants en cybersécurité, promouvoir les bonnes pratiques numériques et encourager une culture de collaboration, d'innovation et de responsabilité.";

const objectives = [
  { icon: "puzzle-fill", title: "Compétences techniques", text: "Renforcer les connaissances techniques et la résolution de problèmes." },
  { icon: "terminal-fill", title: "Pratique responsable", text: "Favoriser l'apprentissage pratique dans un cadre responsable et autorisé." },
  { icon: "shield-check", title: "Sensibilisation", text: "Sensibiliser aux risques numériques et à l'hygiène informatique." },
  { icon: "people-fill", title: "Esprit d'équipe", text: "Développer l'esprit d'équipe, le partage de connaissances et le mentorat." },
  { icon: "diagram-3-fill", title: "Réseau", text: "Créer des liens avec les professionnels, les anciens membres, les partenaires et d'autres clubs." },
  { icon: "megaphone-fill", title: "Visibilité", text: "Améliorer la visibilité du club et participer à des événements et compétitions." },
];

const values = [
  { icon: "lightning-charge-fill", title: "Apprendre en pratiquant", text: "Chaque notion est vue à travers un exercice, un atelier ou un projet concret." },
  { icon: "share-fill", title: "Partager", text: "Ce qu'on sait, on le transmet : guides, comptes rendus et entraide entre membres." },
  { icon: "shield-lock-fill", title: "Protéger", text: "Comprendre les risques pour protéger ses comptes, ses données et sa vie privée." },
];

const steps = [
  { icon: "book-fill", title: "Apprendre", text: "Acquérir les bases avec d'autres étudiants motivés." },
  { icon: "terminal-fill", title: "Pratiquer", text: "S'exercer sur des challenges et des ateliers." },
  { icon: "hammer", title: "Construire", text: "Contribuer à des projets collectifs." },
  { icon: "share-fill", title: "Partager", text: "Transmettre ses connaissances et approfondir selon ses objectifs." },
];

const reasons = [
  "Apprendre avec d'autres étudiants motivés.",
  "Découvrir plusieurs domaines de la cybersécurité par la pratique.",
  "Participer à des challenges, ateliers, projets et rencontres.",
  "Développer son réseau et apprendre à travailler en équipe.",
  "Contribuer aux initiatives numériques et à la vie du club.",
];

// À COMPLÉTER par le club : ajouter une date (champ "date") à chaque étape quand elle sera connue.
const journey = [
  { title: "Création du club à l'UADB", text: "Les premiers étudiants se réunissent autour de la cybersécurité." },
  { title: "Premiers ateliers techniques", text: "Des séances pratiques ouvertes à tous les étudiants." },
  { title: "Création du site officiel du club", text: "Un projet collaboratif mené par les membres.", status: "En cours" },
];

const identity = [
  { icon: "people-fill", label: "Nom", value: "Cyber Tech Squad (CTS)" },
  { icon: "mortarboard-fill", label: "Établissement", value: "Université Alioune Diop de Bambey (UADB)" },
  { icon: "geo-alt-fill", label: "Localisation", value: "Bambey, Sénégal" },
  { icon: "chat-quote-fill", label: "Slogan", value: "Technologie • Sécurité • Innovation" },
];

function APropos() {
  return (
    <PageShell>
      {/* ================= EN-TÊTE ================= */}
      <section className="hero">
        <div className="wrap hero-in">
          <div>
            <div className="uni-badge pill">À propos</div>
            <h1>Un club d'étudiants qui apprend en faisant de la cybersécurité une priorité capitale.</h1>
            <p className="lead">
              CyberTech Squad est un club universitaire consacré à la cybersécurité, au numérique
              et à l'innovation, au sein de l'Université Alioune Diop de Bambey. Il rassemble des
              étudiants qui veulent apprendre, pratiquer, partager leurs connaissances et contribuer
              à un environnement numérique plus sûr.
            </p>
          </div>
          <div className="logo-stack">
            <div className="logo-disc">
              <Logo src={CTS_LOGO} alt="CyberTech Squad : technologie, sécurité, innovation" fallback="CTS" size={250} round />
            </div>
            <p className="slogan">Technologie, sécurité, innovation</p>
          </div>
        </div>
      </section>

      <main className="wrap rail">
        {/* ----- Mission + pour qui ----- */}
        <section className="block">
          <h2>Notre mission</h2>
          <p className="sub">Pourquoi le club existe, et à qui il s'adresse.</p>
          <div className="ap-duo">
            <div className="mission-card">
              <span className="kicker">Notre mission</span>
              <h3>Rendre le numérique plus sûr, avec les étudiants de l'UADB.</h3>
              <p>{mission}</p>
            </div>
            <div className="card who-card">
              <span className="kicker">Pour qui ?</span>
              <h3>tous les étudiants curieux, quel que soit le niveau.</h3>
              <p>
                Le club s'adresse aux étudiants de l'Université Alioune Diop de Bambey qui
                s'intéressent à l'informatique, à la cybersécurité, aux technologies et à l'innovation.
              </p>
              <p>Pas besoin d'être expert : on commence par les bases et on avance projet après projet.</p>
            </div>
          </div>
        </section>

        {/* ----- Objectifs ----- */}
        <section className="block">
          <h2>Nos objectifs</h2>
          <p className="sub">Six repères pour progresser ensemble.</p>
          <div className="obj-grid">
            {objectives.map((o) => (
              <div key={o.title} className="obj">
                <div className="ico" aria-hidden="true"><i className={`bi bi-${o.icon}`}></i></div>
                <strong>{o.title}</strong>
                <p>{o.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ----- Valeurs ----- */}
        <section className="block">
          <h2>Nos valeurs</h2>
          <p className="sub">Trois idées qui guident tout ce qu'on fait.</p>
          <div className="values">
            {values.map((v) => (
              <div key={v.title} className="obj">
                <div className="ico" aria-hidden="true"><i className={`bi bi-${v.icon}`}></i></div>
                <strong>{v.title}</strong>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ----- Approche ----- */}
        <section className="block">
          <h2>Notre approche</h2>
          <p className="sub">Une progression par étapes, à ton rythme.</p>
          <div className="steps">
            {steps.map((s, i) => (
              <div key={s.title} className="step">
                <span className="num">0{i + 1}</span>
                <i className={`bi bi-${s.icon}`} aria-hidden="true"></i>
                <strong>{s.title}</strong>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div className="ethic">
            <i className="bi bi-shield-check" aria-hidden="true"></i>
            <span>
              Les activités techniques se déroulent dans des environnements autorisés, dans le
              respect de l'éthique et de la loi.
            </span>
          </div>
        </section>

        {/* ----- Pourquoi rejoindre ----- */}
        <section className="block">
          <h2>Pourquoi rejoindre le CTS ?</h2>
          <p className="sub">Les débutants sont les bienvenus.</p>
          <div className="why">
            <div className="card">
              <h3>Ce que tu y gagnes</h3>
              <ul className="checks">
                {reasons.map((r) => (
                  <li key={r}>
                    <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3>Comment participer ?</h3>
              <p>
                Les membres participent aux séances, proposent des idées, contribuent aux projets et
                respectent les règles de fonctionnement du club.
              </p>
              <p>
                Les débutants peuvent commencer progressivement : la curiosité, la régularité,
                l'esprit d'équipe et le respect des règles sont essentiels.
              </p>
            </div>
          </div>
        </section>

        {/* ----- Parcours ----- */}
        <section className="block">
          <h2>Notre parcours</h2>
          <p className="sub">Les grandes étapes du club.</p>
          <ol className="timeline">
            {journey.map((j) => (
              <li key={j.title} className={j.status ? "now" : ""}>
                {(j.date || j.status) && <span className="when">{j.date || j.status}</span>}
                <strong>{j.title}</strong>
                <p>{j.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----- Identité ----- */}
        <section className="block">
          <h2>Identité du club</h2>
          <div className="ident">
            {identity.map((i) => (
              <div key={i.label} className="ident-item">
                <i className={`bi bi-${i.icon}`} aria-hidden="true"></i>
                <span className="lbl">{i.label}</span>
                <strong>{i.value}</strong>
              </div>
            ))}
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

export default APropos;