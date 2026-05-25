import * as Phaser from "phaser";

export default class Boot extends Phaser.Scene {
  constructor(){ super("Boot"); }
  preload(){}

  create(){
    const TW = 16, TH = 16;

    const canvas = this.textures.createCanvas("tiles_basic", TW * 4, TH);
    if (!canvas) throw new Error("No se pudo crear 'tiles_basic'.");
    const ctx = canvas.getContext();
    if (!ctx) throw new Error("Sin contexto 2D para 'tiles_basic'.");

    // --- Tile 0: floor (gris oscuro + patrón MUY sutil) ---
    ctx.fillStyle = "#121512";
    ctx.fillRect(0, 0, TW, TH);
    ctx.fillStyle = "rgba(0,229,255,0.08)"; // leve
    for (let i = 0; i < TW; i += 8) ctx.fillRect(i, 0, 1, TH);

    // --- Tile 1: wall (marco verde) ---
    ctx.fillStyle = "#062A14";
    ctx.fillRect(TW, 0, TW, TH);
    ctx.strokeStyle = "#00FF9C";
    ctx.lineWidth = 1;
    ctx.strokeRect(TW + 1, 1, TW - 2, TH - 2);

    // --- Tile 2: door (AMARILLO ZEC sólido con marco) ---
    ctx.fillStyle = "#F4B728";             // cuerpo amarillo
    ctx.fillRect(TW * 2, 0, TW, TH);
    ctx.strokeStyle = "#FFDE7A";           // marco claro
    ctx.lineWidth = 1;
    ctx.strokeRect(TW * 2 + 1, 1, TW - 2, TH - 2);

    // --- Tile 3: portal (aro cian) ---
    ctx.fillStyle = "#001A1F";
    ctx.fillRect(TW * 3, 0, TW, TH);
    ctx.strokeStyle = "#00E5FF";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(TW * 3 + 8, 8, 5, 0, Math.PI * 2);
    ctx.stroke();

    canvas.refresh();
    this.scene.start("Preload");
  }
}
