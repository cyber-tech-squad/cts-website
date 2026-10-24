"use client";
import { useEffect, useRef } from "react";

// ---------- Pluie de chiffres (mode hacker) ----------
// Un <canvas> plein écran, placé derrière la page, où des caractères verts tombent.
export default function MatrixRain() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const chars = "0101010101ABCDEF<>/{}$#".split("");
    const size = 16;
    let w = 0;
    let h = 0;
    let drops = [];
    let frame = 0;
    let last = 0;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      drops = Array.from({ length: Math.ceil(w / size) }, () => Math.random() * (h / size));
      ctx.fillStyle = "#030806";
      ctx.fillRect(0, 0, w, h);
    }

    function step() {
      // un voile sombre à chaque image : les anciens caractères s'estompent (traînée)
      ctx.fillStyle = "rgba(3, 8, 6, 0.12)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#39FF88";
      ctx.font = size + "px monospace";
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * size, y * size);
        if (y * size > h && Math.random() > 0.975) drops[i] = 0;
        else drops[i] = y + 1;
      });
    }

    function loop(t) {
      if (t - last > 60) {
        last = t;
        step();
      }
      frame = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);

    // si la personne préfère éviter les animations : une image fixe, sans mouvement
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (let i = 0; i < 40; i++) step();
    } else {
      frame = requestAnimationFrame(loop);
    }

    // nettoyage quand on quitte le mode hacker
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="matrix" aria-hidden="true" />;
}
