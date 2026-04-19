import { useEffect, useRef } from "react";

type Props = {
  density?: number;
  className?: string;
  opacity?: number;
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
};

/**
 * Ambient brain-graph visualization.
 * Nodes drift slowly; edges appear between pairs under a distance threshold.
 * Pulse phase modulates both node glow and edge opacity — subtle, low-contrast.
 */
export default function NetworkBackground({
  density = 0.00008,
  className = "",
  opacity = 0.55,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(28, Math.floor(width * height * density));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: 0.8 + Math.random() * 1.6,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.003 + Math.random() * 0.007,
      }));
    };

    const maxDist = 180;
    const maxDistSq = maxDist * maxDist;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDistSq) {
            const t = 1 - d2 / maxDistSq;
            const alpha = t * 0.22 * opacity;
            ctx.strokeStyle = `rgba(14, 230, 200, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;
        n.pulse += n.pulseSpeed;

        const pulseIntensity = 0.5 + 0.5 * Math.sin(n.pulse);
        const glowAlpha = (0.35 + pulseIntensity * 0.45) * opacity;

        // Outer glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 8);
        grad.addColorStop(0, `rgba(14, 230, 200, ${glowAlpha * 0.8})`);
        grad.addColorStop(1, "rgba(14, 230, 200, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 8, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(226, 248, 244, ${0.8 * opacity})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [density, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
