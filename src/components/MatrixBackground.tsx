"use client";

import { useEffect, useRef } from "react";

// Décor du mode sombre : pluie de caractères qui défilent vers le bas (style "Matrix").
const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF$#<>{}/";
const FONT_SIZE = 16; // taille d'un caractère et largeur d'une colonne (px)
const FRAME_MS = 55; // un pas d'animation toutes les 55 ms (environ 18 images/s)
const FADE = 0.075; // vitesse d'effacement de la traînée (plus grand = traînée plus courte)
const LIT_COLUMNS = 0.55; // part des colonnes où une pluie tombe en même temps

type Drop = { y: number; speed: number; lit: boolean };

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

function newDrop(rows: number, scatter: boolean): Drop {
  return {
    y: scatter ? Math.random() * rows : -Math.random() * rows * 0.6,
    speed: 0.35 + Math.random() * 0.85, // en lignes par pas
    lit: Math.random() < LIT_COLUMNS,
  };
}

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let drops: Drop[] = [];
    let rows = 0;
    let dpr = 1;

    function isLight() {
      return document.documentElement.dataset.theme === "light";
    }

    function clearAll() {
      if (!ctx || !canvas) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function step() {
      if (!ctx || !canvas) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. On estompe l'image précédente : c'est ce qui crée la traînée derrière chaque caractère.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0, 0, 0, ${FADE})`;
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      ctx.globalCompositeOperation = "source-over";

      // 2. On dessine un nouveau caractère en tête de chaque colonne active.
      ctx.font = `${FONT_SIZE}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";
      drops.forEach((drop, column) => {
        if (drop.lit && drop.y >= 0) {
          ctx.fillStyle = Math.random() < 0.06 ? "#d8ffe9" : "#3dff8a";
          ctx.fillText(randomGlyph(), column * FONT_SIZE, Math.floor(drop.y) * FONT_SIZE);
        }
        drop.y += drop.speed;
        // Quand la colonne sort de l'écran, elle repart du haut avec une nouvelle vitesse.
        if (drop.y * FONT_SIZE > window.innerHeight && Math.random() > 0.97) {
          drops[column] = newDrop(rows, false);
        }
      });
    }

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      rows = Math.ceil(window.innerHeight / FONT_SIZE);
      const columns = Math.ceil(window.innerWidth / FONT_SIZE);
      drops = Array.from({ length: columns }, () => newDrop(rows, true));
      clearAll();
      // Avec "réduire les animations", on dessine une seule image fixe.
      if (reduceMotion && !isLight()) for (let i = 0; i < 70; i++) step();
    }

    resize();
    window.addEventListener("resize", resize);

    // Quand le thème repasse en sombre, on repart d'un écran propre.
    const observer = new MutationObserver(clearAll);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const timer = reduceMotion
      ? undefined
      : window.setInterval(() => {
          if (document.hidden || isLight()) return;
          step();
        }, FRAME_MS);

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-bg" aria-hidden="true" />;
}
