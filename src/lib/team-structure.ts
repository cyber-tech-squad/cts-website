import type { TeamMember } from "@/lib/content";

export const UNIVERSITE = "Université Alioune Diop de Bambey";

export const POLES = [
  {
    id: "finances",
    label: "Pôle finances",
    responsableRole: "Responsable financier",
    adjointRole: "Adjoint(e) financier",
  },
  {
    id: "relations-exterieures",
    label: "Pôle relations extérieures",
    responsableRole: "Responsable relations extérieures",
    adjointRole: "Adjoint(e) relations extérieures",
  },
  {
    id: "organisation",
    label: "Pôle organisation",
    responsableRole: "Responsable organisation",
    adjointRole: "Adjoint(e) organisation",
  },
  {
    id: "communication",
    label: "Pôle communication",
    responsableRole: "Responsable communication",
    adjointRole: "Adjoint(e) communication",
  },
  {
    id: "pedagogie",
    label: "Pôle pédagogie",
    responsableRole: "Responsable pédagogie",
    adjointRole: "Adjoint(e) pédagogie",
  },
] as const;

export type OrgPerson = {
  id: string;
  name: string;
  initials: string;
  role: string;
  levelLabel: string;
  description: string;
  photo: string;
  niveau: string;
  filiere: string;
  reportsTo: string;
  skills: string[];
  linkedin: string;
  github: string;
  isPlaceholder: boolean;
};

export type OrgBranch = {
  pole: string;
  label: string;
  responsable: OrgPerson;
  adjoint: OrgPerson;
};

export type OrgChart = {
  coordinator: OrgPerson;
  viceCoordinator: OrgPerson | null;
  branches: OrgBranch[];
};

function initialsOf(firstName: string, lastName: string): string {
  const words = firstName.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return `${words[0]?.[0] ?? ""}${lastName.trim()[0] ?? ""}`.toUpperCase();
}

function fromMember(member: TeamMember, levelLabel: string): OrgPerson {
  return {
    id: member.slug,
    name: `${member.firstName} ${member.lastName}`,
    initials: initialsOf(member.firstName, member.lastName),
    role: member.role,
    levelLabel,
    description: member.description,
    photo: member.photo ?? "",
    niveau: member.niveau ?? "—",
    filiere: member.filiere ?? "—",
    reportsTo: UNIVERSITE,
    skills: member.skills ?? [],
    linkedin: member.linkedin ?? "",
    github: member.github ?? "",
    isPlaceholder: false,
  };
}

function vacancy(id: string, role: string, levelLabel: string): OrgPerson {
  return {
    id,
    name: "",
    initials: "?",
    role,
    levelLabel,
    description: "",
    photo: "",
    niveau: "—",
    filiere: "—",
    reportsTo: UNIVERSITE,
    skills: [],
    linkedin: "",
    github: "",
    isPlaceholder: true,
  };
}

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
    ? fromMember(coordinatorMember, "Coordinateur")
    : {
        id: "coordinateur",
        name: "Papa Meissa Ngom",
        initials: "PM",
        role: "Coordinateur",
        levelLabel: "Coordinateur",
        description: `Coordonne le Cyber Tech Squad au sein de l'${UNIVERSITE}.`,
        photo: "",
        niveau: "—",
        filiere: "—",
        reportsTo: UNIVERSITE,
        skills: [],
        linkedin: "",
        github: "",
        isPlaceholder: false,
      };

  const viceCoordinator: OrgPerson | null = viceMember
    ? fromMember(viceMember, "Vice-coordinateur")
    : null;

  const branches = POLES.map((pole): OrgBranch => {
    const responsableMember = members.find(
      (member) => member.level === "responsable" && member.pole === pole.id,
    );
    const adjointMember = members.find(
      (member) => member.level === "adjoint" && member.pole === pole.id,
    );

    const responsable = responsableMember
      ? fromMember(responsableMember, "Responsable")
      : vacancy(`${pole.id}-responsable`, pole.responsableRole, "Responsable");

    const adjoint = adjointMember
      ? fromMember(adjointMember, "Adjoint(e)")
      : vacancy(`${pole.id}-adjoint`, pole.adjointRole, "Adjoint(e)");

    return { pole: pole.id, label: pole.label, responsable, adjoint };
  });

  return { coordinator, viceCoordinator, branches };
}
