import * as Phaser from "phaser";

export default class PauseOverlay extends Phaser.Scene {
  constructor(){ super("PauseOverlay"); }

  create(){
    const cam = this.cameras.main;
    const w = cam.width, h = cam.height;

    const bg = this.add.rectangle(w/2, h/2, w, h, 0x000000, 0.5).setScrollFactor(0);
    const panel = this.add.rectangle(w/2, h/2, 360, 200, 0x0A0D0A, 0.92)
      .setStrokeStyle(2, 0x00E5FF)
      .setScrollFactor(0);

    this.add.text(w/2, h/2 - 70, "Pause", { color:"#00FF9C", fontSize:"20px" }).setOrigin(0.5);

    const mkBtn = (y:number, label:string, onClick:()=>void)=>{
      const btnBg = this.add.rectangle(w/2, y, 220, 36, 0x111111, 1).setStrokeStyle(2, 0xF4B728).setInteractive({ useHandCursor:true });
      const txt = this.add.text(w/2, y, label, { color:"#E6FFE6", fontSize:"16px" }).setOrigin(0.5);
      btnBg.on("pointerdown", onClick);
      btnBg.on("pointerover", ()=> btnBg.setAlpha(0.9));
      btnBg.on("pointerout", ()=> btnBg.setAlpha(1));
    };

    mkBtn(h/2 - 20, "Resume (P)", ()=>{
      this.scene.stop(); // cierra overlay
      this.scene.resume("LabPlay");
    });

    mkBtn(h/2 + 20, "Restart level", ()=>{
      this.scene.stop();
      this.scene.stop("LabPlay");
      this.scene.launch("HUD");
      this.scene.start("LabPlay");
    });

    mkBtn(h/2 + 60, "Go to menu", ()=>{
      this.scene.stop("LabPlay");
      window.location.href = "/laberintos"; // vuelve a la intro del modo
    });

    // atajo P para reanudar
    this.input.keyboard?.on("keydown-P", ()=>{
      this.scene.stop();
      this.scene.resume("LabPlay");
    });
  }
}
