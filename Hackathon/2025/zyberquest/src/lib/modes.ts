export type ModeAccent = "green" | "cyan" | "magenta";

export type Mode = {
  id: "trivia" | "mazes" | "simulators";
  title: string;
  desc: string;
  href: string;
  accent: ModeAccent;
};

export const MODES: Mode[] = [
  {
    id: "trivia",
    title: "Educational trivia",
    desc: "Answer questions about the Zcash ecosystem with explanatory tooltips.",
    href: "/trivias",
    accent: "green",
  },
  {
    id: "mazes",
    title: "Exploration mazes",
    desc: "Explore nodes, collect keys, and unlock conceptual doors in ZK.",
    href: "/laberintos",
    accent: "cyan",
  },
  {
    id: "simulators",
    title: "Decryption simulators",
    desc: "Break codes (Caesar, substitution, visual XOR) against the clock.",
    href: "/simulators",
    accent: "magenta",
  },
];
