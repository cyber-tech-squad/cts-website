import { z } from "zod";

// Ce schéma est la "porte d'entrée" de l'API : on ne fait jamais confiance au navigateur,
// donc on revalide TOUT côté serveur (même si le formulaire a déjà des attributs required).
export const contactSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, "Indique ton nom complet.")
    .max(100, "Le nom est trop long (100 caractères maximum)."),
  email: z
    .string()
    .trim()
    .max(254, "L'adresse e-mail est trop longue.")
    .pipe(z.email("Cette adresse e-mail ne semble pas valide.")),
  telephone: z
    .string()
    .trim()
    .max(20, "Le numéro est trop long.")
    .refine((value) => value === "" || /^\+?[0-9 ().-]{7,20}$/.test(value), {
      message: "Ce numéro de téléphone ne semble pas valide.",
    }),
  sujet: z
    .string()
    .trim()
    .min(3, "Indique un sujet (adhésion, question, commande...).")
    .max(120, "Le sujet est trop long (120 caractères maximum)."),
  message: z
    .string()
    .trim()
    .min(10, "Ton message est trop court (10 caractères minimum).")
    .max(2000, "Ton message est trop long (2000 caractères maximum)."),
});

export type ContactInput = z.infer<typeof contactSchema>;
