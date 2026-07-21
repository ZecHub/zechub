import Link from "next/link";

import { AppFrame } from "@/components/layout/AppFrame";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <AppFrame>
      <Header />

      <section className="relative z-10 flex w-full flex-grow flex-col items-center justify-center py-24 text-center">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-faint">
          404 — no such page
        </p>
        <h1 className="mb-4 text-3xl font-medium tracking-tighter text-foreground md:text-6xl">
          Nothing at this address
        </h1>
        <p className="mb-10 max-w-md text-sm leading-relaxed text-muted">
          Unlike a viewing key, this URL decodes to nothing. The check, the guides, and the
          countdown are all still where they should be.
        </p>
        <ButtonLink href="/">Back to the terminal</ButtonLink>
      </section>

      <Footer />
    </AppFrame>
  );
}
