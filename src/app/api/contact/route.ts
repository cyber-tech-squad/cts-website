import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";

// Route Handler : un fichier `route.ts` dans src/app/api/contact répond à POST /api/contact.
// Il s'exécute uniquement sur le serveur, jamais dans le navigateur.
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Anti-spam : le champ "website" est invisible pour un humain. S'il est rempli, c'est un robot.
  // On répond "ok" sans rien enregistrer, pour ne pas lui indiquer qu'il a été repéré.
  if (
    typeof payload === "object" &&
    payload !== null &&
    "website" in payload &&
    typeof payload.website === "string" &&
    payload.website.trim() !== ""
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Certains champs sont à corriger.",
        fields: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 422 },
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("[contact] Variables Supabase manquantes (URL ou clé anonyme).");
    return NextResponse.json({ error: "Le service est momentanément indisponible." }, { status: 500 });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { nom, email, telephone, sujet, message } = parsed.data;

  const { error } = await supabase.from("contact_messages").insert({
    nom,
    email,
    telephone: telephone || null,
    sujet,
    message,
  });

  if (error) {
    console.error("[contact] Échec de l'enregistrement :", error.message);
    return NextResponse.json({ error: "Ton message n'a pas pu être enregistré." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
