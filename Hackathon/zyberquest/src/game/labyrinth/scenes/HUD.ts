import * as Phaser from "phaser";

type HUDState = {
  timeLeft: number;
  keys: number;
  score: number;
  dashReadyRatio: number; // 0..1
};

export default class HUD extends Phaser.Scene {
  constructor(){ super({ key:"HUD", active:false }); }

  private lbl!: Phaser.GameObjects.Text;
  private dashBarBg!: Phaser.GameObjects.Rectangle;
  private dashBarFg!: Phaser.GameObjects.Rectangle;
  private toasts: Phaser.GameObjects.Text[] = [];

  private state: HUDState = { timeLeft: 90, keys: 0, score: 0, dashReadyRatio: 1 };

  // minimapa
  private mini!: Phaser.GameObjects.Graphics;
  private miniCfg = { mapW: 1, mapH: 1, viewW: 120, viewH: 90, scale: 1 };
  private playerDot!: Phaser.GameObjects.Rectangle;

  create(){
    this.lbl = this.add.text(12, 12, "", {
      color:"#F4B728",
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: '14px'
    }).setScrollFactor(0).setDepth(2000);
    (this.lbl as any).setResolution?.(2);

    // Dash bar (arriba derecha)
    const cam = this.cameras.main;
    const w = 140, h = 8;
    this.dashBarBg = this.add.rectangle(cam.width - w - 16, 18, w, h, 0x202020).setOrigin(0,0.5).setScrollFactor(0).setDepth(2000);
    this.dashBarFg = this.add.rectangle(cam.width - w - 16, 18, w, h, 0xF4B728).setOrigin(0,0.5).setScrollFactor(0).setDepth(2001);

    // Minimap (arriba derecha bajo la barra)
    this.mini = this.add.graphics().setScrollFactor(0).setDepth(1999);
    this.playerDot = this.add.rectangle(0,0,4,4,0x00FF9C).setScrollFactor(0).setDepth(2002).setVisible(false);

    this.render();

    // Eventos desde LabPlay
    this.game.events.on("hud:set-keys", (v:number)=>{ this.state.keys = v; this.render(); });
    this.game.events.on("hud:set-score", (v:number)=>{ this.state.score = v; this.render(); });
    this.game.events.on("hud:set-dash", (ratio:number)=>{ this.state.dashReadyRatio = Phaser.Math.Clamp(ratio,0,1); this.render(); });
    this.game.events.on("hud:toast", (msg:string)=>{ this.toast(msg); });
    this.game.events.on("hud:time:set", (v:number)=>{ this.state.timeLeft = Math.max(0, v); this.render(); });

    // minimapa init/update
    this.game.events.on("hud:minimap:init", (mapW:number, mapH:number)=>{
      const camW = this.cameras.main.width;
      const x = camW - 16 - this.miniCfg.viewW;
      const y = 34; // debajo de barra
      this.miniCfg.mapW = mapW;
      this.miniCfg.mapH = mapH;
      this.miniCfg.scale = Math.min(this.miniCfg.viewW / mapW, this.miniCfg.viewH / mapH);
      this.mini.clear();
      this.mini.lineStyle(1, 0x00E5FF, 1);
      this.mini.strokeRect(x, y, mapW * this.miniCfg.scale, mapH * this.miniCfg.scale);
      this.playerDot.setVisible(true);
    });

    this.game.events.on("hud:minimap:update", (px:number, py:number)=>{
      const camW = this.cameras.main.width;
      const x0 = camW - 16 - this.miniCfg.viewW;
      const y0 = 34;
      const sx = x0 + px * this.miniCfg.scale;
      const sy = y0 + py * this.miniCfg.scale;
      this.playerDot.setPosition(sx, sy);
    });
  }

  private render(){
    this.lbl.setText(`HUD • time ${this.state.timeLeft}s | keys ${this.state.keys} | score ${this.state.score}`);
    const w = 140 * this.state.dashReadyRatio;
    this.dashBarFg.width = Math.max(4, w);
  }

  private toast(msg: string){
    const t = this.add.text(12, 36 + this.toasts.length*18, msg, {
      color:"#00FF9C",
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: '13px'
    }).setScrollFactor(0).setDepth(2100);
    (t as any).setResolution?.(2);
    this.toasts.push(t);

    this.tweens.add({
      targets: t,
      alpha: { from: 1, to: 0 },
      y: "-=10",
      duration: 1400,
      ease: "easeOut",
      onComplete: () => { t.destroy(); this.toasts.shift(); this.reflowToasts(); }
    });
  }

  private reflowToasts(){
    this.toasts.forEach((t, i)=> t.setY(36 + i*18));
  }
}
