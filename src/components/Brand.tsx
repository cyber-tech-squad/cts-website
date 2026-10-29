import Image from "next/image";
import Link from "next/link";

// Logo unique du club, utilisé pour le thème clair et le thème sombre.
// Le fichier doit exister dans public/images/.
const LOGO_SRC = "/images/logo-cts.jpeg";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Cyber Tech Squad — accueil">
      <span className="brand-logo-stack" aria-hidden="true">
        <Image
          className="brand-logo"
          src={LOGO_SRC}
          alt=""
          width={44}
          height={44}
          priority
        />
      </span>
      <span>
        CYBER TECH
        <br />
        <b>SQUAD</b>
      </span>
    </Link>
  );
}