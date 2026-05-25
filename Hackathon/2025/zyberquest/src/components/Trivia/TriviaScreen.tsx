"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ScoreHUD } from "./client";
import { ControlsBar } from "./client";
import QuestionCard from "./QuestionCard";
import SummaryModal from "./SummaryModal";
import IntroPanel from "./IntroPanel";
import { useTriviaStore } from "@/store";
import { useRouter } from "next/navigation";

export default function TriviaScreen() {
  const router = useRouter();
  const {
    status, index, total, score, streak, timeLeft, perQuestionTime,
    questions, selectedIndex, answerState,
    selectChoice, confirm, next, pause, resume, tick,
    startGame, resetToIntro,
  } = useTriviaStore();

  const reduce = useReducedMotion();

  // rAF timer
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  useEffect(() => {
    function loop(ts: number) {
      if (lastRef.current == null) lastRef.current = ts;
      const dt = (ts - lastRef.current) / 1000;
      lastRef.current = ts;
      tick(Number.isFinite(dt) ? dt : 0);
      rafRef.current = requestAnimationFrame(loop);
    }

    const canRun = status === "playing" && answerState === "idle";
    if (canRun) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
      rafRef.current = requestAnimationFrame(loop);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    };
  }, [status, answerState, perQuestionTime, tick]);

  // Hotkeys (sin Esc)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el?.tagName === "INPUT" || el?.tagName === "TEXTAREA" || el?.isContentEditable) return;

      if (status === "playing") {
        if (e.key >= "1" && e.key <= "4") { e.preventDefault(); selectChoice(Number(e.key) - 1); return; }
        if (e.key === "Enter") { e.preventDefault(); (answerState === "idle" ? confirm() : next()); return; }
        if (e.key.toLowerCase() === "p") { e.preventDefault(); pause(); return; }
      }

      if (status === "paused") {
        if (e.key.toLowerCase() === "p" || e.key === "Enter") { e.preventDefault(); resume(); return; }
        if (e.key.toLowerCase() === "r") { e.preventDefault(); startGame(); return; }
        if (e.key.toLowerCase() === "m") { e.preventDefault(); resetToIntro(); router.push("/trivias"); return; }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, answerState, selectChoice, confirm, next, pause, resume, startGame, resetToIntro, router]);

  const q = questions[index];

  // Animaciones de intro
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, when: "beforeChildren" as const } } };
  const titleVariants = { hidden: reduce ? {} : { y: 10, opacity: 0 }, show: reduce ? {} : { y: 0, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } } };
  const agentVariants = { hidden: reduce ? {} : { x: -12, opacity: 0 }, show: reduce ? {} : { x: 0, opacity: 1, transition: { duration: 0.28, ease: "easeOut" } } };
  const panelVariants = { hidden: reduce ? {} : { y: 12, opacity: 0 }, show: reduce ? {} : { y: 0, opacity: 1, transition: { duration: 0.28, ease: "easeOut" } } };

  return (
    <main className="min-h-[calc(100dvh-4rem)] p-4 md:p-8 text-white bg-black">
      <div className="relative mx-auto max-w-6xl">
        {/* Fondo con degradados */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem]"
          style={{
            background:
              "radial-gradient(60rem 24rem at 60% -10%, rgba(249,196,0,0.12), transparent 60%)," +
              "radial-gradient(40rem 20rem at 20% 120%, rgba(0,229,255,0.10), transparent 60%)",
            boxShadow: "inset 0 0 120px rgba(0,0,0,0.5)"
          }}
        />

        {/* Intro */}
        {status === "idle" && (
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            <motion.div variants={agentVariants} className="hidden md:block absolute -left-8 top-8 w-[300px] xl:w-[360px] h-auto pointer-events-none select-none">
              <img src="/trivia/cyberpunk-agent.png" alt="Cyberpunk agent" className="w-full h-full object-contain drop-shadow-[0_0_28px_rgba(0,255,156,0.5)]" />
            </motion.div>

            <div className="md:pl-[320px] xl:pl-[380px]">
              <motion.header variants={titleVariants} className="mb-5 md:mb-6">
                <h1 className="font-mono text-3xl md:text-5xl font-semibold tracking-tight" style={{ color: "#F9C400" }}>
                  Zcash Trivia — Privacy Arcade
                </h1>
              </motion.header>

              <motion.div variants={panelVariants}>
                <IntroPanel />
              </motion.div>

              <div className="mt-4">
                <ControlsBar />
              </div>
            </div>
          </motion.div>
        )}

        {/* Juego */}
        {status === "playing" && (
          <div className="space-y-4">
            <ScoreHUD
              score={score}
              streak={streak}
              questionNumber={Math.min(index + 1, total)}
              total={total}
              timeLeft={Math.max(0, Number.isFinite(timeLeft) ? timeLeft : 0)}
              maxTime={Math.max(1, Number.isFinite(perQuestionTime) ? perQuestionTime : 30)}
            />

            {q ? (
              <QuestionCard
                question={q.question}
                choices={q.choices}
                selectedIndex={selectedIndex}
                state={answerState === "idle" ? "idle" : (answerState as "correct" | "incorrect" | "idle")}
                correctIndex={q.answerIndex}
                explain={q.explain}
                showWhy={true}
              />
            ) : (
              <section className="rounded-2xl border border-white/10 p-6 bg-white/5 backdrop-blur">
                <p className="opacity-70">Loading…</p>
              </section>
            )}

            <div className="mt-2">
              <ControlsBar />
            </div>
          </div>
        )}

        {/* Pausa (sin mención a Esc) */}
        {status === "paused" && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
            <div
              className="w-full max-w-md rounded-2xl border bg-black/90 p-6 text-white"
              style={{ borderColor: "#F9C400", boxShadow: "0 0 24px rgba(249,196,0,0.25)" }}
            >
              <h3 className="text-lg font-semibold mb-4">Paused</h3>
              <div className="grid gap-3">
                <button
                  className="rounded-lg px-4 py-2 border hover:bg-white/10 text-left"
                  style={{ borderColor: "#F9C400" }}
                  onClick={resume}
                >
                  <span className="font-medium">Resume</span> <span className="opacity-70">• P</span>
                </button>

                <button
                  className="rounded-lg px-4 py-2 border hover:bg-white/10 text-left"
                  style={{ borderColor: "#F9C400" }}
                  onClick={startGame}
                >
                  <span className="font-medium">Restart</span> <span className="opacity-70">• R</span>
                </button>

                <button
                  className="rounded-lg px-4 py-2 border hover:bg-white/10 text-left"
                  style={{ borderColor: "#F9C400" }}
                  onClick={() => { resetToIntro(); router.push("/trivias"); }}
                >
                  <span className="font-medium">Back to menu</span> <span className="opacity-70">• M</span>
                </button>
              </div>

              <p className="text-xs opacity-70 mt-4">
                Shortcuts: <span className="font-mono">P</span> Resume • <span className="font-mono">R</span> Restart • <span className="font-mono">M</span> Menu
              </p>
            </div>
          </div>
        )}
      </div>

      <SummaryModal open={status === "ended"} />
    </main>
  );
}
