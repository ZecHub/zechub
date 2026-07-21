import type { ReactNode } from "react";

export function AppFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen justify-center bg-canvas xl:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(52,211,153,0.08),transparent_70%)]"
      />

      <main className="relative z-10 flex min-h-screen w-full flex-col overflow-hidden rounded-none border-none bg-surface/40 p-6 shadow-none backdrop-blur-xl md:p-10 xl:min-h-[700px] xl:max-w-[1300px] xl:rounded-[2.5rem] xl:border xl:border-border xl:p-12 xl:shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
        {children}
      </main>
    </div>
  );
}
