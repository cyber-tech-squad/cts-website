import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Cyber Tech Squad — accueil">
      <span className="brand-logo-stack" aria-hidden="true">
        <Image
          className="brand-logo brand-logo-dark"
          src="/images/4324c803-a96a-4682-b1c8-ffbdf79c28e6.jpeg"
          alt=""
          width={44}
          height={44}
        />
        <Image
          className="brand-logo brand-logo-light"
          src="/images/c7787676-7aa1-4215-914c-d7d12162e0af.jpeg"
          alt=""
          width={44}
          height={44}
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
