import { useState } from "react";

// ---------- Logo avec secours ----------
// Si l'image n'existe pas encore dans le dossier public, un rond de remplacement s'affiche.
export default function Logo({ src, alt, fallback, size = 44, round = false }) {
  const [failed, setFailed] = useState(false);
  const base = {
    width: size,
    height: size,
    borderRadius: round ? "50%" : 8,
    flexShrink: 0,
  };
  if (failed) {
    return (
      <div
        style={{
          ...base,
          background: "var(--ink)",
          color: "var(--neon)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--display)",
          fontWeight: 700,
          fontSize: size / 3.4,
        }}
      >
        {fallback}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      style={{ ...base, objectFit: round ? "cover" : "contain", background: "#fff" }}
      onError={() => setFailed(true)}
    />
  );
}
