"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { CTS_LOGO } from "./logocts";
import { navLinks } from "./navLinks";
import { useHacker } from "./useTheme";

export default function Navbar() {
  const [hacker, setHacker] = useHacker();
  const pathname = usePathname();

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link href="/" className="brand">
          <Logo src={CTS_LOGO} alt="Logo CyberTech Squad" fallback="CTS" size={44} round />
          <span>CyberTech Squad</span>
        </Link>
        <nav className="nav-links" aria-label="Navigation principale">
          {navLinks.map((item) => {
            const isActive =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                href={item.to}
                className={isActive ? "on" : ""}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            className="theme-toggle"
            role="switch"
            aria-checked={hacker}
            onClick={() => setHacker(!hacker)}
          >
            <span>&gt;_ Mode hacker</span>
            <span className="tt-track" aria-hidden="true">
              <span className="tt-knob"></span>
            </span>
          </button>
          <Link href="/adhesion" className="join">
            Adhérer
          </Link>
        </nav>
      </div>
    </header>
  );
}