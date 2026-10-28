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
  socials: ClubSocial[];
};

export const CLUB_INFO: ClubInfo = {
  name: "Cyber Tech Squad",
  shortName: "CTS",
  university: "Université Alioune Diop de Bambey (UADB), Sénégal",
  place: "",
  email: "ctechsquad@gmail.com",
  whatsapp: "",
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
  ],
};

export const clubInfo = CLUB_INFO;