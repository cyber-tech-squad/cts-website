"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";
import Script from "next/script";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function JoinForm() {
  const widgetContainer = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  function renderTurnstile(): void {
    if (!TURNSTILE_SITE_KEY || !window.turnstile || !widgetContainer.current || widgetId.current)
      return;

    widgetId.current = window.turnstile.render(widgetContainer.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: setTurnstileToken,
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (isSubmitting) return;

    const formElement = event.currentTarget;
    if (!turnstileToken) {
      setStatus("Complétez la vérification anti-spam avant l’envoi.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Envoi en cours…");

    try {
      const fields = new FormData(formElement);
      const response = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fields.get("firstName"),
          lastName: fields.get("lastName"),
          email: fields.get("email"),
          studentId: fields.get("studentId"),
          message: fields.get("message"),
          turnstileToken,
          website: fields.get("website"),
        }),
      });

      const result: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        setStatus(getResponseError(result));
        return;
      }

      formElement.reset();
      setStatus("Demande envoyée. Merci !");
    } catch {
      setStatus("Impossible d’envoyer la demande. Vérifiez votre connexion et réessayez.");
    } finally {
      setIsSubmitting(false);
      setTurnstileToken("");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onLoad={renderTurnstile}
        strategy="afterInteractive"
      />
      <form className="join-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Prénom
            <input name="firstName" autoComplete="given-name" required maxLength={80} />
          </label>
          <label>
            Nom
            <input name="lastName" autoComplete="family-name" required maxLength={80} />
          </label>
        </div>
        <label>
          Email universitaire
          <input name="email" type="email" autoComplete="email" required maxLength={254} />
        </label>
        <label>
          Numéro étudiant
          <input name="studentId" required maxLength={32} />
        </label>
        <label>
          Pourquoi rejoindre le club ?
          <textarea name="message" rows={4} maxLength={1000} />
        </label>
        <div className="honeypot" aria-hidden="true">
          <label>
            Ne pas remplir
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div ref={widgetContainer} />
        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"} <span>↗</span>
        </button>
        <p id="form-status" className="form-status" role="status" aria-live="polite">
          {status}
        </p>
      </form>
    </>
  );
}

function getResponseError(response: unknown): string {
  if (typeof response === "object" && response !== null && "error" in response) {
    const error = response.error;
    if (typeof error === "string" && error.length > 0) return error;
  }

  return "Une erreur est survenue. Réessayez plus tard.";
}
