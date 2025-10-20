// components/Start/CyberpunkHero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * PNG/SVG transparente del personaje sosteniendo dos cápsulas (amarilla y verde).
 * La micro-animación (hover/parallax) se implementa en Hito 1.
 * Reemplaza `src` por tu asset real cuando lo tengas en /public.
 */
export default function CyberpunkHero() {
  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto w-full max-w-[420px] md:max-w-[460px] lg:max-w-[520px]"
      >
        <div className="aspect-[4/5] relative">
          <Image
            src="/choose/cyberpunk-capsule.png"
            alt="Cyberpunk holding two capsules: yellow (Tournament) and green (Demo)"
            fill
            priority={false}
            loading="lazy"
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 560px"
            className="object-contain drop-shadow-[0_0_32px_rgba(0,255,156,0.25)]"
          />
        </div>
      </motion.div>
    </div>
  );
}
