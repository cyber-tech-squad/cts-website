type IconName = "whatsapp" | "tiktok" | "instagram" | "linkedin" | "mail";

export function iconNameFor(label: string): IconName {
  const value = label.toLowerCase();
  if (value.includes("whatsapp")) return "whatsapp";
  if (value.includes("tiktok")) return "tiktok";
  if (value.includes("instagram")) return "instagram";
  if (value.includes("linkedin")) return "linkedin";
  return "mail";
}

export function SocialIcon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "whatsapp" && (
        <>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          <path d="M9 9.2c.3 2.2 2.6 4.5 4.8 4.8l1.1-1.1-1.7-1-.8.7c-.8-.4-1.3-.9-1.7-1.7l.7-.8-1-1.7L9 9.2z" />
        </>
      )}
      {name === "tiktok" && (
        <>
          <path d="M14 3v11.2a3.6 3.6 0 1 1-3.6-3.6" />
          <path d="M14 3c.4 2.6 2 4.2 5 4.4" />
        </>
      )}
      {name === "instagram" && (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </>
      )}
      {name === "linkedin" && (
        <>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </>
      )}
      {name === "mail" && (
        <>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </>
      )}
    </svg>
  );
}
