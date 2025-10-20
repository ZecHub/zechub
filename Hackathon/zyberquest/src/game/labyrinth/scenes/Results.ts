import * as Phaser from "phaser";

type ResultData = {
  timeLeft: number;
  keys: number;
  portals: number;
  score: number;
};

export default class Results extends Phaser.Scene {
  constructor(){ super("Results"); }

  private dataIn: ResultData = { timeLeft: 0, keys: 0, portals: 0, score: 0 };

  init(data: ResultData){
    this.dataIn = data ?? this.dataIn;
  }

  create(){
    const cam = this.cameras.main;
    const w = cam.width, h = cam.height;

    this.add.rectangle(w/2, h/2, w, h, 0x000000, 0.6).setScrollFactor(0);
    const panel = this.add.rectangle(w/2, h/2, 420, 260, 0x0A0D0A, 0.95).setStrokeStyle(2, 0x00E5FF);

    this.add.text(w/2, h/2 - 100, "Results", { color:"#00FF9C", fontSize:"20px" }).setOrigin(0.5);

    const lines = [
      `Time remaining: ${this.dataIn.timeLeft}s`,
      `Keys: ${this.dataIn.keys}`,
      `Outdated portals: ${this.dataIn.portals}`,
      `Score: ${this.dataIn.score}`
    ];
    this.add.text(w/2, h/2 - 56, lines.join("\n"), { color:"#E6FFE6", fontSize:"16px", align:"center" }).setOrigin(0.5,0);

    const mkBtn = (y:number, label:string, onClick:()=>void)=>{
      const bg = this.add.rectangle(w/2, y, 220, 36, 0x111111, 1).setStrokeStyle(2, 0xF4B728).setInteractive({ useHandCursor:true });
      const txt = this.add.text(w/2, y, label, { color:"#E6FFE6", fontSize:"16px" }).setOrigin(0.5);
      bg.on("pointerdown", onClick);
      bg.on("pointerover", ()=> bg.setAlpha(0.9));
      bg.on("pointerout", ()=> bg.setAlpha(1));
    };

    mkBtn(h/2 + 40, "Try again", ()=>{
      this.scene.stop();
      this.scene.stop("LabPlay");
      this.scene.launch("HUD");
      this.scene.start("LabPlay");
    });

    mkBtn(h/2 + 86, "Go to menu", ()=>{
      this.scene.stop("LabPlay");
      window.location.href = "/laberintos";
    });
  }
}
