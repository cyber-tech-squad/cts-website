import type { TeamMember } from "@/lib/content";

// Les pôles de l'organigramme, dans l'ordre d'affichage (de gauche à droite).
// `id` doit correspondre à la valeur `pole` des fichiers content/team/*.yml.
export const POLES = [
  {
    id: "finances",
    responsableRole: "Responsable financier",
    adjointRole: "Adjoint(e) financier",
    description: "Fiche à compléter par le bureau.",
  },
  {
    id: "relations-exterieures",
    responsableRole: "Responsable relations extérieures",
    adjointRole: "Adjoint(e) relations extérieures",
    description: "Fiche à compléter par le bureau.",
  },
  {
    id: "organisation",
    responsableRole: "Responsable organisation",
    adjointRole: "Adjoint(e) organisation",
    description: "Fiche à compléter par le bureau.",
  },
  {
    id: "communication",
    responsableRole: "Responsable communication",
    adjointRole: "Adjoint(e) communication",
    description: "Fiche à compléter par le bureau.",
  },
  {
    id: "pedagogie",
    responsableRole: "Responsable pédagogie",
    adjointRole: "Adjoint(e) pédagogie",
    description: "Fiche à compléter par le bureau.",
  },
] as const;

/** Version "à plat" d'une personne : uniquement des chaînes, donc passable à un composant client. */
export type OrgPerson = {
  id: string;
  name: string;
  initials: string;
  role: string;
  levelLabel: string;
  description: string;
  photo: string;
  filiere: string;
  memberSince: string;
  reportsTo: string;
  skills: string[];
  linkedin: string;
  github: string;
  /** true tant qu'aucun fichier content/team/*.yml ne correspond : la carte est alors masquée. */
  isPlaceholder: boolean;
};

export type OrgBranch = {
  pole: string;
  responsable: OrgPerson;
  adjoint: OrgPerson;
};

export type OrgChart = {
  coordinator: OrgPerson;
  viceCoordinator: OrgPerson | null;
  branches: OrgBranch[];
};

// Prénom composé (« Papa Meissa ») : initiales des deux premiers mots du prénom (PM).
// Prénom simple : initiale du prénom + initiale du nom.
function initialsOf(firstName: string, lastName: string): string {
  const words = firstName.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return `${words[0]?.[0] ?? ""}${lastName.trim()[0] ?? ""}`.toUpperCase();
}

function fromMember(member: TeamMember, levelLabel: string, reportsTo: string): OrgPerson {
  return {
    id: member.slug,
    name: `${member.firstName} ${member.lastName}`,
    initials: initialsOf(member.firstName, member.lastName),
    role: member.role,
    levelLabel,
    description: member.description,
    photo: member.photo ?? "",
    filiere: member.filiere ?? "—",
    memberSince: member.memberSince !== undefined ? String(member.memberSince) : "—",
    reportsTo,
    skills: member.skills ?? [],
    linkedin: member.linkedin ?? "",
    github: member.github ?? "",
    isPlaceholder: false,
  };
}

// Emplacement utilisé tant qu'aucun fichier content/team/*.yml ne correspond.
// Il n'est pas affiché à l'écran (voir TeamOrgChart), mais garde la structure des pôles.
function placeholder(
  id: string,
  role: string,
  levelLabel: string,
  reportsTo: string,
  description: string,
): OrgPerson {
  return {
    id,
    name: "[Prénom Nom]",
    initials: "PN",
    role,
    levelLabel,
    description,
    photo: "",
    filiere: "[Filière · Niveau]",
    memberSince: "[Année]",
    reportsTo,
    skills: [],
    linkedin: "",
    github: "",
    isPlaceholder: true,
  };
}

// Reconnaît un vice-coordinateur que le champ `level` vaille "vice-coordinateur"
// ou que le mot « vice » figure dans le rôle.
const isVice = (member: TeamMember) =>
  /vice/i.test(String(member.level)) || /vice/i.test(member.role);

const isCoordinatorLevel = (member: TeamMember) =>
  /coordinateur/i.test(String(member.level));

export function buildOrgChart(members: TeamMember[]): OrgChart {
  const coordinatorMember = members.find(
    (member) => isCoordinatorLevel(member) && !isVice(member),
  );
  const viceMember = members.find(
    (member) => (isCoordinatorLevel(member) || isVice(member)) && isVice(member),
  );

  const coordinator: OrgPerson = coordinatorMember
    ? fromMember(coordinatorMember, "Coordinateur", "Université Alioune Diop de Bambey")
    : {
        id: "coordinateur",
        name: "Papa Meissa Ngom",
        initials: "PM",
        role: "Coordinateur",
        levelLabel: "Coordinateur",
        description: "Coordonne le Cyber Tech Squad au sein de l'Université Alioune Diop de Bambey.",
        photo: "",
        filiere: "[Filière · Niveau]",
        memberSince: "[Année]",
        reportsTo: "Université Alioune Diop de Bambey",
        skills: [],
        linkedin: "",
        github: "",
        isPlaceholder: false,
      };

  const viceCoordinator: OrgPerson | null = viceMember
    ? fromMember(viceMember, "Vice-coordinateur", "Université Alioune Diop de Bambey")
    : null;

  const branches = POLES.map((pole): OrgBranch => {
    const responsableMember = members.find(
      (member) => member.level === "responsable" && member.pole === pole.id,
    );
    const adjointMember = members.find(
      (member) => member.level === "adjoint" && member.pole === pole.id,
    );

    const responsable = responsableMember
      ? fromMember(responsableMember, "Responsable", "Coordinateur")
      : placeholder(
          `${pole.id}-responsable`,
          pole.responsableRole,
          "Responsable",
          "Coordinateur",
          pole.description,
        );

    const adjoint = adjointMember
      ? fromMember(adjointMember, "Adjoint(e)", responsable.role)
      : placeholder(
          `${pole.id}-adjoint`,
          pole.adjointRole,
          "Adjoint(e)",
          responsable.role,
          "Fiche à compléter par le bureau.",
        );

    return { pole: pole.id, responsable, adjoint };
  });

  return { coordinator, viceCoordinator, branches };
}