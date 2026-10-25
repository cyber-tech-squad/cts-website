"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

const SUBJECTS = ["Adhésion", "Commande", "Question", "Partenariat"] as const;

// Produits de la boutique pouvant pré-remplir le message (?produit=...).
const PRODUCTS: Record<string, string> = {
  autocollant: "Autocollant Cyber Tech Squad",
  polo: "Polo Cyber Tech Squad",
  "carte-membre": "Carte de membre CTS",
};

type FieldName = "nom" | "email" | "telephone" | "sujet" | "message";
type FieldErrors = Partial<Record<FieldName, string[]>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; text: string }
  | { kind: "error"; text: string };

function Field({
  name,
  label,
  hint,
  errors,
  wide,
  children,
}: {
  name: FieldName;
  label: string;
  hint?: string;
  errors: FieldErrors;
  wide?: boolean;
  children: ReactNode;
}) {
  const error = errors[name]?.[0];
  return (
    <div className={`field${wide ? " field-wide" : ""}`}>
      <label htmlFor={`contact-${name}`}>{label}</label>
      {children}
      {hint && !error && (
        <p className="field-hint" id={`contact-${name}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field-error" id={`contact-${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Arrivée depuis la boutique (/contact?produit=polo) : on pré-remplit le sujet et le message,
  // sans rien écraser si le visiteur a déjà écrit quelque chose.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("produit");
    const productName = slug ? PRODUCTS[slug] : undefined;
    if (!productName) return;

    if (subjectRef.current && !subjectRef.current.value) {
      subjectRef.current.value = "Commande";
    }
    if (messageRef.current && !messageRef.current.value) {
      messageRef.current.value =
        slug === "polo"
          ? `Bonjour, je souhaite commander : ${productName}.\nTaille : `
          : `Bonjour, je souhaite commander : ${productName}.\nQuantité : `;
    }
  }, []);

  // Les boutons de sujet rapide remplissent le champ, l'utilisateur peut ensuite le modifier.
  function pickSubject(subject: string) {
    if (!subjectRef.current) return;
    subjectRef.current.value = subject;
    subjectRef.current.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // On garde une référence au formulaire : après un `await`, event.currentTarget vaut null.
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus({ kind: "sending" });
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await response.json().catch(() => null)) as {
        error?: string;
        fields?: FieldErrors;
      } | null;

      if (response.ok) {
        form.reset();
        setStatus({ kind: "success", text: "Message envoyé. Le bureau te répondra par e-mail." });
        return;
      }

      setErrors(body?.fields ?? {});
      setStatus({ kind: "error", text: body?.error ?? "L'envoi a échoué. Réessaie dans un instant." });
    } catch {
      setStatus({ kind: "error", text: "Connexion impossible. Vérifie ton réseau puis réessaie." });
    }
  }

  const sending = status.kind === "sending";

  // aria-invalid / aria-describedby : les lecteurs d'écran annoncent l'erreur du champ.
  function describe(name: FieldName, hasHint = false) {
    const invalid = Boolean(errors[name]?.length);
    return {
      id: `contact-${name}`,
      name,
      "aria-invalid": invalid,
      "aria-describedby": invalid
        ? `contact-${name}-error`
        : hasHint
          ? `contact-${name}-hint`
          : undefined,
    } as const;
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <div className="form-grid">
        <Field name="nom" label="Nom complet" errors={errors}>
          <input
            {...describe("nom")}
            type="text"
            placeholder="Ton nom"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
          />
        </Field>

        <Field name="email" label="E-mail" errors={errors}>
          <input
            {...describe("email")}
            type="email"
            placeholder="ton@email.com"
            autoComplete="email"
            required
            maxLength={254}
          />
        </Field>

        <Field
          name="telephone"
          label="Ton numéro de téléphone"
          hint="Utile pour te joindre au sujet d'une commande."
          errors={errors}
        >
          <input
            {...describe("telephone", true)}
            type="tel"
            placeholder="Ton numéro"
            autoComplete="tel"
            maxLength={20}
          />
        </Field>

        <Field name="sujet" label="Sujet" errors={errors}>
          <input
            {...describe("sujet")}
            ref={subjectRef}
            type="text"
            placeholder="Adhésion, question, commande..."
            required
            minLength={3}
            maxLength={120}
          />
          <div className="subject-chips" role="group" aria-label="Sujets rapides">
            {SUBJECTS.map((subject) => (
              <button
                key={subject}
                type="button"
                className="chip-btn"
                onClick={() => pickSubject(subject)}
              >
                {subject}
              </button>
            ))}
          </div>
        </Field>

        <Field name="message" label="Message" errors={errors} wide>
          <textarea
            {...describe("message")}
            ref={messageRef}
            placeholder="Écris ton message ici"
            required
            minLength={10}
            maxLength={2000}
            rows={5}
          />
        </Field>
      </div>

      {/* Champ piège : un humain ne le voit pas, un robot le remplit. */}
      <div className="cts-hp" aria-hidden="true">
        <label htmlFor="contact-website">Ne pas remplir</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-actions">
        <button className="cts-btn" type="submit" disabled={sending}>
          {sending ? "Envoi en cours..." : "Envoyer le message"}
        </button>
        <span className="form-note">Le bureau te répond par e-mail.</span>
      </div>

      <p
        className="form-status"
        role="status"
        aria-live="polite"
        data-kind={status.kind === "success" || status.kind === "error" ? status.kind : undefined}
      >
        {status.kind === "success" || status.kind === "error" ? status.text : ""}
      </p>
    </form>
  );
}