"use client";

import { useState } from "react";

const domains = [
  {
    name: "Cybersécurité",
    text: "Comprendre comment les attaques fonctionnent pour mieux s'en protéger.",
    points: ["Menaces et bonnes pratiques", "Sécurité des comptes et des données", "Initiation à l'ethical hacking"],
  },
  {
    name: "Développement",
    text: "Construire des sites et des applications, du HTML/CSS jusqu'au code serveur.",
    points: ["Web : HTML, CSS, JavaScript", "Frameworks modernes (React, Next.js)", "Travail en équipe avec Git et GitHub"],
  },
  {
    name: "Réseaux",
    text: "Comprendre comment les machines communiquent pour mieux les administrer.",
    points: ["Bases des réseaux et des protocoles", "Adressage et configuration", "Sécuriser un réseau"],
  },
  {
    name: "Innovation",
    text: "Transformer une idée en solution concrète qui répond à un vrai besoin.",
    points: ["Méthode de projet", "Prototypage rapide", "Hackathons et défis"],
  },
];

export default function LearnTabs() {
  const [active, setActive] = useState(0);
  const d = domains[active];

  return (
    <div className="learn">
      <div className="learn__tabs" role="tablist" aria-label="Domaines">
        {domains.map((x, i) => (
          <button
            key={x.name}
            role="tab"
            aria-selected={i === active}
            className={`learn__tab${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            {x.name}
          </button>
        ))}
      </div>
      <div className="learn__panel" role="tabpanel">
        <h3>{d.name}</h3>
        <p>{d.text}</p>
        <ul>
          {d.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}