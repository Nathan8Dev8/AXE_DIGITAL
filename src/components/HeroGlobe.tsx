import React, { useEffect, useRef } from "react";

/* ── Globe de petites bulles (canvas) ── */
const HeroGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 768;
    const total = isSmall ? 620 : 2200;

    /* Positions sur la sphère (distribution de Fibonacci ~ uniforme) */
    const pts: { x: number; y: number; z: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < total; i++) {
      const t = i / total;
      const y = 1 - 2 * t;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
    }

    /* Sprite de bulle (dégradé radial bleu, reflet blanc en haut à gauche) */
    const S = 64;
    const sprite = document.createElement("canvas");
    sprite.width = S;
    sprite.height = S;
    const sctx = sprite.getContext("2d")!;
    const grad = sctx.createRadialGradient(S * 0.35, S * 0.3, S * 0.05, S * 0.5, S * 0.5, S * 0.5);
    grad.addColorStop(0, "rgba(255,255,255,0.95)");
    grad.addColorStop(0.28, "rgba(205,228,255,0.65)");
    grad.addColorStop(0.6, "rgba(110,170,255,0.34)");
    grad.addColorStop(1, "rgba(2,56,214,0)");
    sctx.fillStyle = grad;
    sctx.beginPath();
    sctx.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2);
    sctx.fill();

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const sizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);

    /* Parallaxe souris (léger) */
    let pointer = { x: 0, y: 0 };
    let par = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      pointer = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    if (!isSmall) window.addEventListener("pointermove", onMove);

    let raf = 0;
    let angle = 0;
    const tilt = 0.35;
    const draw = () => {
      if (!reduced) angle += 0.0045;
      par.x += (pointer.x * 26 - par.x) * 0.04;
      par.y += (pointer.y * 26 - par.y) * 0.04;

      ctx.clearRect(0, 0, w, h);
      const radius = Math.min(w, h) * 0.36;
      const cx = w / 2 + par.x;
      const cy = h / 2 + par.y;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      for (const p of pts) {
        /* rotation Y puis inclinaison X */
        const x1 = p.x * cos - p.z * sin;
        const z1 = p.x * sin + p.z * cos;
        const y1 = p.y * Math.cos(tilt) - z1 * Math.sin(tilt);
        const z2 = p.y * Math.sin(tilt) + z1 * Math.cos(tilt);

        const persp = 1 / (2.1 - z2);
        const sx = cx + x1 * radius * persp * 2.1;
        const sy = cy + y1 * radius * persp * 2.1;
        const depth = (z2 + 1) / 2; // 0 arrière → 1 avant

        const size = (1.4 + depth * 3.2) * 2.1;
        const alpha = 0.16 + depth * 0.8;
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite, sx - size / 2, sy - size / 2, size, size);
      }
      ctx.globalAlpha = 1;

      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sizeCanvas);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      className="hero-globe-stage"
      style={{ position: "absolute", left: "50%", top: "42%", transform: "translate(-50%,-50%)", zIndex: 1, pointerEvents: "none" }}
    >
      {/* halo lumineux derrière le globe */}
      <div className="hero-globe-glow" />

      {/* ── Globe de petites bulles ── */}
      <div className="globe-canvas-wrap">
        <canvas ref={canvasRef} className="globe-canvas" />
      </div>

      <style>{`
        .hero-globe-stage{ width: 0; height: 0; }

/* halo */
        .hero-globe-glow{
          position: absolute; left: 0; top: 0;
          width: 1100px; height: 1100px;
          transform: translate(-50%,-50%);
          background: radial-gradient(circle, rgba(63,130,255,.24) 0%, rgba(63,130,255,0) 60%);
          border-radius: 50%;
          animation: glowPulse 5s ease-in-out infinite;
        }

        /* zone du canvas (aucune bordure ni fond : uniquement les bulles) */
        .globe-canvas-wrap{
          position: absolute; left: 0; top: 0;
          width: 820px; height: 820px;
          transform: translate(-50%,-50%);
          z-index: 2;
          border-radius: 50%;
        }
        .globe-canvas{ width: 100%; height: 100%; display: block; }

        /* ── Animations ── */
        @keyframes glowPulse{
          0%,100%{ opacity: .75; transform: translate(-50%,-50%) scale(1); }
          50%{ opacity: 1; transform: translate(-50%,-50%) scale(1.06); }
        }

        /* ── Responsive ── */
@media (max-width: 1024px){
          .hero-globe-stage{ top: 40% !important; }
          .globe-canvas-wrap{ width: 580px; height: 580px; }
          .hero-globe-glow{ width: 780px; height: 780px; }
        }
        @media (max-width: 768px){
          .hero-globe-stage{ top: 38% !important; }
          .globe-canvas-wrap{ width: 420px; height: 420px; }
          .hero-globe-glow{ width: 580px; height: 580px; }
        }
        @media (max-width: 480px){
          .hero-globe-stage{ top: 34% !important; }
          .globe-canvas-wrap{ width: 300px; height: 300px; }
          .hero-globe-glow{ width: 420px; height: 420px; }
        }
      `}</style>
    </div>
  );
};

export default HeroGlobe;

