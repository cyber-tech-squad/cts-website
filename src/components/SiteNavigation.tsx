"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Sections de la page d'accueil suivies au défilement (ids présents dans page.tsx).
const sections = ["home", "about", "join"] as const;
type Section = (typeof sections)[number];

type NavigationLink =
  | { label: string; href: string; section: Section }
  | { label: string; href: string; route: string };

// Menu de la maquette v2 : Accueil, À propos, Équipe, Activités, Boutique, Ressources, Contact.
const links: NavigationLink[] = [
  { label: "Accueil", href: "/#home", section: "home" },
  { label: "À propos", href: "/#about", section: "about" },
  { label: "Équipe", href: "/equipe", route: "/equipe" },
  { label: "Activités", href: "/events", route: "/events" },
  { label: "Boutique", href: "/shop", route: "/shop" },
  { label: "Ressources", href: "/blog", route: "/blog" },
  { label: "Contact", href: "/contact", route: "/contact" },
];

// Un lien est actif sur sa page et sur ses sous-pages (ex. /blog/mon-article).
function routeIsActive(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function SiteNavigation() {
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    if (pathname !== "/") return;

    function updateActiveSection() {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current: Section = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top + window.scrollY <= marker)
          current = section;
      }

      setActiveSection((previous) => (previous === current ? previous : current));
    }

    const frame = window.requestAnimationFrame(updateActiveSection);
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [pathname]);

  return (
    <nav aria-label="Navigation principale">
      <button
        ref={menuButtonRef}
        className="mobile-nav-toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation-links"
        aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <div id="primary-navigation-links" className={`nav-links${isMenuOpen ? " is-open" : ""}`}>
        {links.map((link) => {
          const isSectionLink = "section" in link;
          const active = isSectionLink
            ? pathname === "/" && activeSection === link.section
            : routeIsActive(pathname, link.route);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? (isSectionLink ? "location" : "page") : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
        <Link
          className="button button-small nav-join"
          href="/adhesion"
          aria-current={
            pathname === "/adhesion" || (pathname === "/" && activeSection === "join")
              ? "page"
              : undefined
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Adhérer
        </Link>
      </div>
    </nav>
  );
}
