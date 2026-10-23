import "server-only";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { z } from "zod";
import type { MembershipApplication } from "@/lib/membership-schema";
import type { Database } from "@/lib/database.types";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const turnstileResponseSchema = z.object({ success: z.boolean() });

export class MembershipServiceError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
  ) {
    super(message);
    this.name = "MembershipServiceError";
  }
}

export async function submitMembership(application: MembershipApplication): Promise<void> {
  const config = getServiceConfiguration();

  await verifyTurnstile(application.turnstileToken, config.turnstileSecret);
  await insertMember(application, config.supabaseUrl, config.supabaseServiceKey);
  await sendConfirmationEmail(application);
}

function getServiceConfiguration() {
  const { TURNSTILE_SECRET_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!TURNSTILE_SECRET_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new MembershipServiceError("Le service est momentanément indisponible.", 503);
  }

  return {
    turnstileSecret: TURNSTILE_SECRET_KEY,
    supabaseUrl: SUPABASE_URL,
    supabaseServiceKey: SUPABASE_SERVICE_ROLE_KEY,
  };
}

async function verifyTurnstile(token: string, secret: string): Promise<void> {
  const body = new URLSearchParams({ secret, response: token });

  let response: Response;
  try {
    response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
  } catch {
    throw new MembershipServiceError("La vérification anti-spam est indisponible.", 503);
  }

  if (!response.ok) {
    throw new MembershipServiceError("La vérification anti-spam est indisponible.", 503);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new MembershipServiceError("La vérification anti-spam est indisponible.", 503);
  }

  const result = turnstileResponseSchema.safeParse(payload);
  if (!result.success || !result.data.success) {
    throw new MembershipServiceError("La vérification anti-spam a échoué.", 400);
  }
}

async function insertMember(
  application: MembershipApplication,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<void> {
  const supabase = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { error } = await supabase.from("members").insert({
    first_name: application.firstName,
    last_name: application.lastName,
    email: application.email.toLowerCase(),
    student_id: application.studentId,
    message: application.message,
  });

  if (!error) return;
  if (error.code === "23505") {
    throw new MembershipServiceError(
      "Une demande existe déjà pour cet email ou numéro étudiant.",
      409,
    );
  }

  console.error("Supabase member insert failed", error.code);
  throw new MembershipServiceError("Impossible d’enregistrer la demande.", 500);
}

async function sendConfirmationEmail(application: MembershipApplication): Promise<void> {
  const { RESEND_API_KEY, RESEND_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) return;

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: application.email,
      subject: "Demande d’adhésion reçue — Cyber Tech Squad",
      text: `Bonjour ${application.firstName},\n\nNous avons bien reçu ta demande d’adhésion au Cyber Tech Squad. Le bureau te recontactera prochainement.`,
    });

    if (error) console.error("Membership confirmation email failed", error.name);
  } catch (error) {
    console.error(
      "Membership confirmation email failed",
      error instanceof Error ? error.name : "unknown error",
    );
  }
}
