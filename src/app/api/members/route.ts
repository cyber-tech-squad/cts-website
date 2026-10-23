import { NextResponse } from "next/server";
import { membershipApplicationSchema } from "@/lib/membership-schema";
import { MembershipServiceError, submitMembership } from "@/lib/server/membership-service";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 16 * 1024;

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "Origine de la requête non autorisée." }, { status: 403 });
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "La requête est trop volumineuse." }, { status: 413 });
  }

  const body = await readRequestBody(request);
  if (!body.success) {
    return NextResponse.json({ error: body.error }, { status: body.statusCode });
  }

  const application = membershipApplicationSchema.safeParse(body.value);
  if (!application.success) {
    return NextResponse.json({ error: "Vérifiez les champs du formulaire." }, { status: 400 });
  }

  try {
    await submitMembership(application.data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof MembershipServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    console.error(
      "Membership request failed",
      error instanceof Error ? error.name : "unknown error",
    );
    return NextResponse.json({ error: "Service temporairement indisponible." }, { status: 503 });
  }
}

function hasSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin || origin === "null") return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

async function readRequestBody(
  request: Request,
): Promise<
  { success: true; value: unknown } | { success: false; error: string; statusCode: number }
> {
  let text: string;
  try {
    text = await request.text();
  } catch {
    return { success: false, error: "Corps de requête invalide.", statusCode: 400 };
  }

  if (new TextEncoder().encode(text).byteLength > MAX_REQUEST_BYTES) {
    return { success: false, error: "La requête est trop volumineuse.", statusCode: 413 };
  }

  try {
    return { success: true, value: JSON.parse(text) as unknown };
  } catch {
    return { success: false, error: "Corps JSON invalide.", statusCode: 400 };
  }
}
