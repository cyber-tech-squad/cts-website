"use client";

import { useEffect, useRef } from "react";

// Réglages : change ces valeurs pour ajuster l'effet.
// Uniquement des symboles et des lettres de code, pas de caractères japonais.
const CHARS =
  "01010101{}[]()<>/\\;:=+-*&|!?#$%_.,\"'~^constletifforreturnimportfunctionexportdivspanhtmlcsstsxjsnpmgitnextapi";
const FONT_SIZE = 16; // taille des caractères (plus petit = plus dense)
const FRAME_MS = 55; // vitesse (plus petit = plus rapide)
const COLOR = "#2dff8f";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let drops: number[] = [];
    let timer: number | undefined;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.floor(canvas.width / FONT_SIZE);
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * canvas.height) / FONT_SIZE),
      );
    };

    const draw = () => {
      // Efface doucement l'image précédente : cela crée la traînée.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = COLOR;
      ctx.font = `${FONT_SIZE}px monospace`;

      drops.forEach((row, column) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = column * FONT_SIZE;
        const y = row * FONT_SIZE;
        ctx.fillText(char, x, y);
        if (y > canvas.height && Math.random() > 0.975) {
          drops[column] = 0;
        } else {
          drops[column] = row + 1;
        }
      });
    };

    const stop = () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const sync = () => {
      const isLight = root.dataset.theme === "light";
      if (isLight || reduceMotion.matches) {
        stop();
      } else if (timer === undefined) {
        timer = window.setInterval(draw, FRAME_MS);
      }
    };

    resize();
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", resize);
    reduceMotion.addEventListener("change", sync);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      reduceMotion.removeEventListener("change", sync);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="cts-matrix" />;
}