import * as Phaser from "phaser";
import Boot from "./scenes/Boot";
import Preload from "./scenes/Preload";
import LabPlay from "./scenes/LabPlay";
import PortalMiniGame from "./scenes/PortalMiniGame";
import HUD from "./scenes/HUD";
import PauseOverlay from "./scenes/PauseOverlay";
import Results from "./scenes/Results";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#0A0D0A",
  pixelArt: false,
    render: {                          // ⬅ fuerza antialias en WebGL/Canvas
    antialias: true,
    roundPixels: true,
  },
  parent: "phaser-mount",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // parent: puedes asignar un id de contenedor si usas uno en el DOM
  },
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
  scene: [Boot, Preload, LabPlay, HUD, PauseOverlay, PortalMiniGame, Results],
};

export default config;
