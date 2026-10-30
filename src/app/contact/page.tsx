import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, PageShell } from "@/components/PageShell";
import { SocialIcon, iconNameFor } from "@/components/SocialIcon";
import { CLUB_INFO, whatsappLink } from "@/lib/club-info";

export const metadata: Metadata = {
  title: "Contact",
  description: "Écris au bureau du Cyber Tech Squad : adhésion, question ou commande.",
};

export default function ContactPage() {
  const questionHref = `mailto:${CLUB_INFO.email}?subject=${encodeURIComponent("Question pour le Cyber Tech Squad")}`;
  const orderHref = whatsappLink(
    CLUB_INFO.orderPhone,
    "Bonjour, je souhaite commander un article du Cyber Tech Squad.\nArticle : \nQuantité : ",
  );

  return (
    <PageShell>
      <PageIntro
        label="Contact"
        title="Une question ? Envie de nous rejoindre ?"
        lead="Écris-nous, le bureau te répondra dès que possible."
      />

      <div className="contact-grid">
        <section className="form-card" aria-labelledby="actions-title">
          <h2 id="actions-title">Écris-nous directement</h2>
          <p className="contact-intro">
            Choisis ce qui correspond à ta demande. Le bureau te répond dès que possible.
          </p>

          <ul className="action-list">
            <li className="action-item">
              <div>
                <h3>Une question</h3>
                <p>Écris-nous un e-mail, nous te répondons dès que possible.</p>
              </div>
              <a className="cts-btn" href={questionHref}>
                Envoyer un e-mail
              </a>
            </li>
            <li className="action-item">
              <div>
                <h3>Commander un article</h3>
                <p>Polo, autocollant ou carte de membre : commande directement sur WhatsApp.</p>
              </div>
              <a className="cts-btn" href={orderHref} target="_blank" rel="noopener noreferrer">
                Commander
              </a>
            </li>
            <li className="action-item">
              <div>
                <h3>Rejoindre le club</h3>
                <p>Découvre comment adhérer et envoie-nous ta demande.</p>
              </div>
              <Link className="cts-btn" href="/adhesion">
                Adhérer
              </Link>
            </li>
          </ul>
        </section>

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
                <dt>Contact et réseaux</dt>
                <dd>
                  <ul className="social-list">
                    <li>
                      <a className="social-link" href={`mailto:${CLUB_INFO.email}`}>
                        <SocialIcon name="mail" />
                        <span>E-mail</span>
                      </a>
                    </li>
                    {CLUB_INFO.socials.map((social) => (
                      <li key={social.href}>
                        <a
                          className="social-link"
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SocialIcon name={iconNameFor(social.label)} />
                          <span>{social.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}