import * as Phaser from "phaser";
import { L1 } from "../assets/L1";

export default class Preload extends Phaser.Scene {
  constructor(){ super("Preload"); }

  preload(){
    // Tilemap desde objeto en memoria
    this.cache.tilemap.add("L1", { data: L1, format: Phaser.Tilemaps.Formats.TILED_JSON });

    // Helper para HMR seguro
    const safeCreateCanvas = (key: string, w: number, h: number) => {
      if (this.textures.exists(key)) this.textures.remove(key);
      const tex = this.textures.createCanvas(key, w, h);
      if (!tex) throw new Error(`textures.createCanvas('${key}') devolvió null`);
      const ctx = tex.getContext();
      if (!ctx) throw new Error(`No ctx para '${key}'`);
      return { tex, ctx };
    };

    // Player
    {
      const { tex, ctx } = safeCreateCanvas("player_dot", 18, 18);
      ctx.fillStyle = "#00373D"; ctx.fillRect(0,0,18,18);
      ctx.strokeStyle = "#00FF9C"; ctx.lineWidth = 2; ctx.strokeRect(1,1,16,16);
      ctx.fillStyle = "#00E5FF"; ctx.fillRect(5,5,8,8);
      tex.refresh();
    }

    // Key
    {
      const { tex, ctx } = safeCreateCanvas("key_coin", 16, 16);
      ctx.fillStyle = "#3A2A00"; ctx.fillRect(0,0,16,16);
      ctx.fillStyle = "#F4B728"; ctx.beginPath(); ctx.arc(8,8,6,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = "#FFDE7A"; ctx.lineWidth = 1; ctx.stroke();
      tex.refresh();
    }

    // Exit
    {
      const { tex, ctx } = safeCreateCanvas("exit_ring", 16, 16);
      ctx.fillStyle = "#001A1F"; ctx.fillRect(0,0,16,16);
      ctx.strokeStyle = "#00E5FF"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(8,8,5,0,Math.PI*2); ctx.stroke();
      tex.refresh();
    }

    // Laser segment (64x4)
    {
      const { tex, ctx } = safeCreateCanvas("laser_seg", 64, 4);
      ctx.fillStyle = "#28101E"; ctx.fillRect(0,0,64,4);
      ctx.fillStyle = "#FF3DBE"; ctx.fillRect(0,1,64,2);
      tex.refresh();
    }

    // Drone (16x16)
    {
      const { tex, ctx } = safeCreateCanvas("drone_bot", 16, 16);
      ctx.fillStyle = "#0B1A12"; ctx.fillRect(0,0,16,16);
      ctx.fillStyle = "#00FF9C"; ctx.fillRect(3,3,10,10);
      ctx.fillStyle = "#00E5FF"; ctx.fillRect(6,6,4,4);
      tex.refresh();
    }
  }

  create(){
    // Lanzar HUD como overlay, luego gameplay
    this.scene.launch("HUD");
    this.scene.start("LabPlay");
  }
}
