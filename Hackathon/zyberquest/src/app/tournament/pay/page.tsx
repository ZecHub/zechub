'use client';

import Image from 'next/image';
import PayPanel from '@/components/tournament/PayPanel';

export default function TournamentPayPage() {
  return (
    <main
      className="mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-7xl grid-cols-1 gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-8"
      aria-label="Tournament payment screen"
    >
      {/* Right panel FIRST on mobile for task-focus */}
      <section
        className="order-1 flex md:order-none"
        aria-labelledby="panel-heading"
        role="region"
      >
        <h2 id="panel-heading" className="sr-only">
          Insert Coin Panel
        </h2>
        <PayPanel />
      </section>

      {/* Coin with halo */}
      <section
        className="order-2 relative flex items-center justify-center rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 shadow-xl backdrop-blur md:order-none"
        aria-labelledby="art-heading"
      >
        <h2 id="art-heading" className="sr-only">
          Coin Artwork
        </h2>

        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 mx-auto size-[240px] rounded-full
                       bg-[radial-gradient(closest-side,rgba(255,214,10,0.45),rgba(255,214,10,0.12)_60%,transparent_80%)]
                       blur-md sm:size-[300px] md:size-[360px] lg:size-[420px]"
          />
          <Image
            src="/coin/czcoin.png"
            alt="CyberCoin"
            width={380}
            height={380}
            priority
            className="h-auto w-[240px] drop-shadow-[0_0_30px_rgba(255,214,10,0.35)] sm:w-[300px] md:w-[340px] lg:w-[380px]"
          />
        </div>
      </section>
    </main>
  );
}
