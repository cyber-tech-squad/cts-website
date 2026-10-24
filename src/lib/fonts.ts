import { Hanken_Grotesk, Unbounded } from "next/font/google";

// next/font télécharge les polices au build et les héberge avec ton site :
// pas de requête vers Google au chargement de la page (plus rapide, plus RGPD-friendly).
// `variable` crée une variable CSS (--font-unbounded) qu'on utilise ensuite dans cts-pages.css.
export const unbounded = Unbounded({
  subsets: ["latin", "latin-ext"],
  variable: "--font-unbounded",
  display: "swap",
});

export const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hanken",
  display: "swap",
});
