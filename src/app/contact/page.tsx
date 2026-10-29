import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro, PageShell } from "@/components/PageShell";
import { CLUB_INFO } from "@/lib/club-info";

export const metadata: Metadata = {
  title: "Contact",
  description: "Écris au bureau du Cyber Tech Squad : adhésion, question ou commande.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageIntro
        label="Contact"
        title="Une question ? Envie de nous rejoindre ?"
        lead="Écris-nous, le bureau te répondra dès que possible."
      />

      <div className="contact-grid">
        <ContactForm />

        <aside className="contact-side">
          <section className="cts-green side-card" aria-labelledby="find-title">
            <h2 id="find-title">Nous trouver</h2>
            <dl>
              <div>
                <dt>Lieu</dt>
                <dd>
                  {CLUB_INFO.university}
                  {CLUB_INFO.place ? ` ${CLUB_INFO.place}` : ""}
                </dd>
              </div>
              <div>
                <dt>E-mail</dt>
                <dd>
                  {CLUB_INFO.email ? (
                    <a href={`mailto:${CLUB_INFO.email}`}>{CLUB_INFO.email}</a>
                  ) : (
                    "[adresse e-mail du club]"
                  )}
                </dd>
              </div>
              <div>
                <dt>Réseaux sociaux</dt>
                <dd>
                  {CLUB_INFO.socials.length > 0
                    ? CLUB_INFO.socials.map((social) => (
                        <p
                          key={social.href}
                          style={{ margin: "0 0 0.5rem", wordBreak: "break-all" }}
                        >
                          {social.label} :{" "}
                          <a href={social.href} target="_blank" rel="noopener noreferrer">
                            {social.href}
                          </a>
                        </p>
                      ))
                    : "Bientôt disponible"}
                </dd>
              </div>
            </dl>
          </section>

          <section className="side-card side-light" aria-labelledby="join-title">
            <h2 id="join-title">Comment adhérer ?</h2>
            <p>
              Ouvert aux étudiants de l&apos;UADB, débutants compris. Envoie-nous ton message avec ta
              filière et ce qui t&apos;intéresse.
            </p>
            <Link className="cts-btn cts-btn-outline" href="/adhesion">
              Voir la page d&apos;adhésion
            </Link>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}