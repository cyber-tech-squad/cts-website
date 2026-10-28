"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { OrgBranch, OrgPerson } from "@/lib/team-structure";

type AvatarSize = "sm" | "md" | "lg";
type CardVariant = "root" | "lead" | "deputy";
type OpenHandler = (person: OrgPerson) => void;

function sizeOf(variant: CardVariant): AvatarSize {
  if (variant === "root") return "lg";
  if (variant === "lead") return "md";
  return "sm";
}

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
  onOpen: OpenHandler;
}) {
  return (
    <button
      type="button"
      className={`org-card org-card-${variant}`}
      onClick={() => onOpen(person)}
      aria-haspopup="dialog"
      aria-label={`Voir la fiche de ${person.name}, ${person.role}`}
    >
      <Avatar person={person} size={sizeOf(variant)} />
      <span className="org-name">{person.name}</span>
      <span className="org-role">{person.role}</span>
      <span className="org-more">Voir la fiche →</span>
    </button>
  );
}

function VacantCard({ person, variant }: { person: OrgPerson; variant: CardVariant }) {
  return (
    <div className={`org-card org-card-${variant} org-vacant`}>
      <Avatar person={person} size={sizeOf(variant)} />
      <span className="org-role">{person.role}</span>
      <span className="org-vacant-note">Poste à pourvoir</span>
    </div>
  );
}

function Slot({
  person,
  variant,
  onOpen,
}: {
  person: OrgPerson;
  variant: CardVariant;
  onOpen: OpenHandler;
}) {
  return person.isPlaceholder ? (
    <VacantCard person={person} variant={variant} />
  ) : (
    <OrgCard person={person} variant={variant} onOpen={onOpen} />
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
          <dt>Niveau</dt>
          <dd>{person.niveau}</dd>
        </div>
        <div>
          <dt>Filière</dt>
          <dd>{person.filiere}</dd>
        </div>
        <div>
          <dt>Affiliation</dt>
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
  const [selected, setSelected] = useState<OrgPerson | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  const leaders = [coordinator, viceCoordinator].filter(
    (person): person is OrgPerson => person !== null && !person.isPlaceholder,
  );

  return (
    <>
      <section className="org" aria-label="Organigramme du club">
        {leaders.length === 2 && (
          <div className="orgx-top">
            <div className="orgx-leader orgx-leader-left">
              <OrgCard person={leaders[0]} variant="root" onOpen={setSelected} />
            </div>
            <div className="orgx-link" aria-hidden="true" />
            <div className="orgx-leader orgx-leader-right">
              <OrgCard person={leaders[1]} variant="root" onOpen={setSelected} />
            </div>
          </div>
        )}

        {leaders.length === 1 && (
          <div className="orgx-top orgx-top-single">
            <div className="orgx-leader orgx-leader-solo">
              <OrgCard person={leaders[0]} variant="root" onOpen={setSelected} />
            </div>
          </div>
        )}

        <ul className="orgx-branches" style={{ "--cols": branches.length } as CSSProperties}>
          {branches.map((branch) => (
            <li className="orgx-col" key={branch.pole}>
              <Slot person={branch.responsable} variant="lead" onOpen={setSelected} />
              <div className="orgx-adjoint">
                <Slot person={branch.adjoint} variant="deputy" onOpen={setSelected} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <dialog
        ref={dialogRef}
        className="member-dialog"
        aria-labelledby="member-dialog-title"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}
      >
        {selected && <MemberSheet person={selected} onClose={() => setSelected(null)} />}
      </dialog>
    </>
  );
}
