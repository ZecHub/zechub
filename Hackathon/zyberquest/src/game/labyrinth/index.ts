import * as Phaser from "phaser";
import config from "./config";

export function createPhaserGameWithMode() {
  const game = new Phaser.Game(config);

  try {
    const sp = new URLSearchParams(window.location.search);
    const mode = (sp.get("mode") || "mission").toLowerCase();
    game.registry.set("mode", mode === "tutorial" ? "tutorial" : "mission");
  } catch {
    game.registry.set("mode", "mission");
  }

  return game;
}

export function destroyPhaserGame(game?: Phaser.Game) {
  if (!game) return;
  game.destroy(true);
}
