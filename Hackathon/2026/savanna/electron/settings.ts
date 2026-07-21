import { app } from "electron";
import path from "node:path";
import fs from "node:fs";

// Preferências de UI, persistidas em JSON no diretório de dados do usuário.
// Não vão no banco: são configs locais de exibição, não dados sensíveis.

export interface Settings {
  showUsd: boolean; // exibir valores em dólar
  opacity: number; // transparência do app (0.5 a 1.0)
}

const DEFAULTS: Settings = {
  showUsd: true,
  opacity: 0.82,
};

function settingsPath(): string {
  return path.join(app.getPath("userData"), "settings.json");
}

export function loadSettings(): Settings {
  try {
    const raw = fs.readFileSync(settingsPath(), "utf8");
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return { ...DEFAULTS, ...parsed };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveSettings(patch: Partial<Settings>): Settings {
  const current = loadSettings();
  const next: Settings = { ...current, ...patch };
  // clamp da opacidade para faixa segura (nunca 100% invisível)
  next.opacity = Math.min(1, Math.max(0.5, next.opacity));
  try {
    fs.writeFileSync(settingsPath(), JSON.stringify(next, null, 2), "utf8");
  } catch {
    /* se falhar a escrita, mantém em memória para esta sessão */
  }
  return next;
}