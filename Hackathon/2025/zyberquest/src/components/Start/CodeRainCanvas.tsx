// components/Start/CodeRainCanvas.tsx
"use client";

import * as React from "react";

const CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾜｦﾝ0123456789ABCDEF";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

export default function CodeRainCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let width = 0, height = 0, cols = 0, y: number[] = [], fontSize = 14, speed = 1.1;

    const GREEN = "rgba(0,255,156,0.75)";
    const GLOW = "rgba(0,255,156,0.28)";
    const CYAN = "rgba(0,229,255,0.18)";

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fontSize = Math.max(12, Math.min(18, Math.round(width / 96)));
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      cols = Math.floor(width / (fontSize + 6));
      y = Array.from({ length: cols }, () => Math.random() * -height);
    };

    const draw = () => {
      // fondo translúcido para "trail"
      ctx.fillStyle = "rgba(10,13,10,0.20)"; 
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * (fontSize + 6);
        const yy = y[i];

        // glow suave
        ctx.shadowColor = GLOW;
        ctx.shadowBlur = 8;

        // texto principal
        ctx.fillStyle = GREEN;
        ctx.fillText(char, x, yy);

        // un toque cian para mezcla
        ctx.shadowColor = CYAN;
        ctx.shadowBlur = 4;
        ctx.fillStyle = "rgba(0,229,255,0.15)";
        ctx.fillText(char, x, yy);

        // siguiente "gota"
        y[i] = yy + (reduced ? 0 : fontSize * speed);
        if (y[i] > height + Math.random() * 200) y[i] = -Math.random() * 200;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onResize = () => {
      resize();
    };

    resize();
    if (!reduced) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(0,255,156,0.10)";
      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * (fontSize + 6);
        const yy = Math.random() * height;
        ctx.fillText(char, x, yy);
      }
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
      style={{
        
        willChange: "transform",
        
        maskImage:
          "radial-gradient(1200px 700px at 70% 40%, black 60%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(1200px 700px at 70% 40%, black 60%, transparent 100%)",
      }}
    />
  );
}
