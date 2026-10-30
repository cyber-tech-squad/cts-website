export type ClubSocial = {
  label: string;
  href: string;
};

export type ClubInfo = {
  name: string;
  shortName: string;
  university: string;
  place: string;
  email: string;
  whatsapp: string;
  orderPhone: string;
  joinPhone: string;
  socials: ClubSocial[];
};

export const CLUB_INFO: ClubInfo = {
  name: "Cyber Tech Squad",
  shortName: "CTS",
  university: "Université Alioune Diop de Bambey (UADB), Sénégal",
  place: "",
  email: "ctechsquad@gmail.com",
  whatsapp: "",
  orderPhone: "221775245358",
  joinPhone: "221779106523",
  socials: [
    {
      label: "WhatsApp",
      href: "https://chat.whatsapp.com/H3I9ev8aMBt0nyjkdDn4e2",
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@cyber_tech_squad?_r=1&_t=ZS-9ApEAxofNRf",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/cyber_tech_squad",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/cyber-tech-squad-cts-723731351",
    },
  ],
};

export const clubInfo = CLUB_INFO;

export function whatsappLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}