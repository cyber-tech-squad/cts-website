"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavigationLink = {
  label: string;
  href: string;
  route: string;
  prefix?: string; // les pages qui commencent par ce chemin activent aussi le lien
};

const links: NavigationLink[] = [
  { label: "Accueil", href: "/", route: "/" },
  { label: "À propos", href: "/apropos", route: "/apropos" },
  { label: "Équipe", href: "/equipe", route: "/equipe" },
  { label: "Activités", href: "/activites", route: "/activites" },
  { label: "Boutique", href: "/shop", route: "/shop" },
  { label: "Ressources", href: "/ressources", route: "/ressources" },
  { label: "Contact", href: "/contact", route: "/contact" },
];

export function SiteNavigation() {
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
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
          const onPrefix = link.prefix ? pathname.startsWith(link.prefix) : false;
          const active = pathname === link.route || onPrefix;

          return (
            <Link
              key={link.label}
              href={link.href}
              aria-current={active ? "page" : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
        <Link
          className="button button-small nav-join"
          href="/adhesion"
          aria-current={pathname === "/adhesion" ? "page" : undefined}
          onClick={() => setIsMenuOpen(false)}
        >
          Adhérer <span>↗</span>
        </Link>
      </div>
    </nav>
  );
}