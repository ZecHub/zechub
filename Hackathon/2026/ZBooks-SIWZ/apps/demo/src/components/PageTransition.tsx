"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// Enter-only fade. AnimatePresence's mode="wait" would blank the page
// during server-component streams, so we don't use it here.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.4, 0.0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
