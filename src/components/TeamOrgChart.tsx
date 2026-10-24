"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { OrgBranch, OrgPerson } from "@/lib/team-structure";

type AvatarSize = "sm" | "md" | "lg";
type CardVariant = "root" | "lead" | "deputy";

function Avatar({ person, size }: { person: OrgPerson; size: AvatarSize }) {
  return (
    <span className={`avatar avatar-${size}`} aria-hidden="true">
      {person.photo ? <Image src={person.photo} alt="" fill sizes="96px" /> : person.initials}
    </span>
  );
}

function OrgCard({
  person,
  variant,
  onOpen,
}: {
  person: OrgPerson;
  variant: CardVariant;
  onOpen: (person: OrgPerson) => void;
}) {
  const size: AvatarSize = variant === "root" ? "lg" : variant === "lead" ? "md" : "sm";
  return (
    <button
      type="button"
      className={`org-card org-card-${variant}`}
      onClick={() => onOpen(person)}
      aria-haspopup="dialog"
      aria-label={`Voir la fiche de ${person.name}, ${person.role}`}
    >
      <Avatar person={person} size={size} />
      <span className="org-name">{person.name}</span>
      <span className="org-role">{person.role}</span>
      <span className="org-more">Voir la fiche →</span>
    </button>
  );
}

function MemberSheet({ person, onClose }: { person: OrgPerson; onClose: () => void }) {
  return (
    <div className="member-sheet">
      <button type="button" className="member-close" onClick={onClose} aria-label="Fermer la fiche">
        ✕
      </button>

      <header className="member-head">
        <Avatar person={person} size="lg" />
        <div>
          <span className="member-level">{person.levelLabel}</span>
          <h2 id="member-dialog-title">{person.name}</h2>
          <p className="member-role">{person.role}</p>
        </div>
      </header>

      <p className="member-desc">{person.description}</p>

      <dl className="info-tiles">
        <div>
          <dt>Filière</dt>
          <dd>{person.filiere}</dd>
        </div>
        <div>
          <dt>Membre depuis</dt>
          <dd>{person.memberSince}</dd>
        </div>
        <div>
          <dt>Rattaché à</dt>
          <dd>{person.reportsTo}</dd>
        </div>
      </dl>

      <section className="member-block">
        <h3 className="member-sub">Compétences</h3>
        {person.skills.length > 0 ? (
          <ul className="chips">
            {person.skills.map((skill) => (
              <li className="chip" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        ) : (
          <p className="member-empty">[Compétences à renseigner]</p>
        )}
      </section>

      <section>
        <h3 className="member-sub">Réseaux</h3>
        {person.linkedin || person.github ? (
          <div className="nets">
            {person.linkedin && (
              <a className="net-btn" href={person.linkedin} target="_blank" rel="noopener noreferrer">
                <span className="net-ico" aria-hidden="true">
                  in
                </span>
                LinkedIn
              </a>
            )}
            {person.github && (
              <a className="net-btn" href={person.github} target="_blank" rel="noopener noreferrer">
                <span className="net-ico" aria-hidden="true">
                  {"</>"}
                </span>
                GitHub
              </a>
            )}
          </div>
        ) : (
          <p className="member-empty">[Réseaux à renseigner]</p>
        )}
      </section>
    </div>
  );
}

export function TeamOrgChart({
  coordinator,
  viceCoordinator,
  branches,
}: {
  coordinator: OrgPerson;
  viceCoordinator: OrgPerson | null;
  branches: OrgBranch[];
}) {
  // La personne dont la fiche est ouverte (null = fenêtre fermée).
  const [selected, setSelected] = useState<OrgPerson | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // On synchronise l'état React avec l'élément <dialog> natif :
  // showModal() gère pour nous le focus, la touche Échap et le fond assombri.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  // On ne garde que les pôles où au moins une personne a une vraie fiche :
  // les cartes « [Prénom Nom] » restent masquées tant qu'il n'y a pas de nom.
  const visibleBranches = branches.filter(
    (branch) => !branch.responsable.isPlaceholder || !branch.adjoint.isPlaceholder,
  );

  return (
    <>
      <section className="org" aria-label="Organigramme du club">
        <div className="org-root org-root-duo">
          {!coordinator.isPlaceholder && (
            <OrgCard person={coordinator} variant="root" onOpen={setSelected} />
          )}
          {viceCoordinator && !viceCoordinator.isPlaceholder && (
            <OrgCard person={viceCoordinator} variant="root" onOpen={setSelected} />
          )}
        </div>

        {visibleBranches.length > 0 && (
          <ul className="org-branches" data-count={visibleBranches.length}>
            {visibleBranches.map((branch) => (
              <li className="org-col" key={branch.pole}>
                {!branch.responsable.isPlaceholder && (
                  <OrgCard person={branch.responsable} variant="lead" onOpen={setSelected} />
                )}
                {!branch.adjoint.isPlaceholder && (
                  <div className="org-adjoint">
                    <OrgCard person={branch.adjoint} variant="deputy" onOpen={setSelected} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <dialog
        ref={dialogRef}
        className="member-dialog"
        aria-labelledby="member-dialog-title"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          // Un clic sur le fond assombri a pour cible le <dialog> lui-même.
          if (event.target === event.currentTarget) setSelected(null);
        }}
      >
        {selected && <MemberSheet person={selected} onClose={() => setSelected(null)} />}
      </dialog>
    </>
  );
}