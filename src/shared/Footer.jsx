import Link from "next/link";
import Logo from "./Logo";
import { CTS_LOGO } from "./logocts";
import { navLinks } from "./navLinks";

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Logo src={CTS_LOGO} alt="CTS" fallback="CTS" size={40} round />
            <strong style={{ fontFamily: "var(--display)", fontSize: 14 }}>CyberTech Squad</strong>
          </div>
          <p>Club de cybersécurité et d'innovation technologique de l'Université Alioune Diop de Bambey, Sénégal.</p>
        </div>
        <div>
          <h3>Pages</h3>
          <nav>
            {navLinks.slice(1).map((n) => (
             <Link key={n.to} href={n.to}>{n.label}</Link>
            ))}
          </nav>
        </div>
        <div>
          <h3>Notre engagement</h3>
          <p>
            Apprendre avec curiosité.<br />
            Collaborer avec respect.<br />
            Innover avec responsabilité.
          </p>
        </div>
      </div>
      <div className="wrap foot-bottom">
        © {new Date().getFullYear()} CyberTech Squad · UADB
      </div>
    </footer>
  );
}
