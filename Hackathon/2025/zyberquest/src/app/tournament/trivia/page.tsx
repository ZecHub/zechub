'use client';

import TriviaIntro from '@/components/tournament/TriviaIntro';

export default function TournamentTriviaPage() {
  return (
    <main
      className="mx-auto min-h-[calc(100dvh-4rem)] w-full max-w-5xl p-4 md:p-8"
      aria-label="Tournament Trivia screen"
    >
      <TriviaIntro />
    </main>
  );
}
