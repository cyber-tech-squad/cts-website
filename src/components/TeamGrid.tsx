import Image from "next/image";
import type { TeamMember } from "@/lib/content";

export function TeamGrid({ members }: { members: TeamMember[] }) {
  if (members.length === 0)
    return <p className="empty-state">Le bureau sera bientôt présenté ici.</p>;
  return (
    <div className="card-grid team-grid">
      {members.map((member) => (
        <article className="team-card" key={member.slug}>
          <div className="portrait">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={`${member.firstName} ${member.lastName}`}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            ) : (
              <span>
                {member.firstName?.[0]}
                {member.lastName?.[0]}
              </span>
            )}
          </div>
          <div className="team-card-copy">
            <span className="eyebrow">{member.role}</span>
            <h3>
              {member.firstName} {member.lastName}
            </h3>
            <p>{member.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
