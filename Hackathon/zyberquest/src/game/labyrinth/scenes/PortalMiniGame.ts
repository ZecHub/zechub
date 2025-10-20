import * as Phaser from "phaser";

type PMGData = { phrase: string; seconds: number };

export default class PortalMiniGame extends Phaser.Scene {
  constructor(){ super("PortalMiniGame"); }

  private secret = "PRIVACY";
  private timeLeft = 20;
  private shift = 0;
  private target = "PRIVACY";
  private lblCipher!: Phaser.GameObjects.Text;
  private lblInstr!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;

  init(data: PMGData){
    this.secret = (data?.phrase ?? "PRIVACY").toUpperCase();
    this.target = this.secret;
    this.timeLeft = data?.seconds ?? 20;
  }

  create(){
    const cam = this.cameras.main;
    const w = cam.width, h = cam.height;

    // overlay
    this.add.rectangle(w/2, h/2, w, h, 0x000000, 0.6).setScrollFactor(0);
    const panel = this.add.rectangle(w/2, h/2, 520, 240, 0x0A0D0A, 0.96).setStrokeStyle(2, 0x00E5FF);

    this.add.text(w/2, h/2 - 90, "PORTAL — Caesar cipher", { color:"#00FF9C", fontSize:"18px" }).setOrigin(0.5);

    this.lblCipher = this.add.text(w/2, h/2 - 20, "", {
      color:"#E6FFE6", fontSize:"26px", fontFamily: "ui-monospace, monospace"
    }).setOrigin(0.5);

    this.lblInstr = this.add.text(w/2, h/2 + 20,
      "Use ←/→ (or A/D) to adjust the offset\nEnter = validate • Esc = exit",
      { color:"#9FE870", fontSize:"14px", align:"center" }).setOrigin(0.5);

    this.timerText = this.add.text(w/2, h/2 + 78, "", { color:"#F4B728", fontSize:"14px" }).setOrigin(0.5);

    this.updateCipher();

    // input
    const left = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    const right = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    const A = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    const D = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.input.keyboard?.on("keydown-ESC", ()=> this.exit(false));
    this.input.keyboard?.on("keydown-ENTER", ()=> {
      const guess = this.decode(this.getEncoded(), this.shift);
      this.exit(guess === this.target);
    });

    const onLeft = ()=>{ this.shift = (this.shift + 25) % 26; this.updateCipher(); };
    const onRight = ()=>{ this.shift = (this.shift + 1) % 26; this.updateCipher(); };
    left.on("down", onLeft); A.on("down", onLeft);
    right.on("down", onRight); D.on("down", onRight);

    // timer
    this.time.addEvent({
      delay: 1000, loop: true,
      callback: ()=>{
        this.timeLeft = Math.max(0, this.timeLeft - 1);
        this.timerText.setText(`Tiempo: ${this.timeLeft}s`);
        if (this.timeLeft === 0) this.exit(false);
      }
    });
  }

  private updateCipher(){
    // mostramos el texto cifrado (secreto + shift fijo 7 para demo), y el shift que el player aplica es el inverso
    const encoded = this.getEncoded(); // secreto corrido +7
    const current = this.decode(encoded, this.shift);
    this.lblCipher.setText(current);
  }

  private getEncoded(){
    return this.encode(this.secret, 7);
  }

  private encode(s: string, k: number){
    const A = "A".charCodeAt(0);
    return s.replace(/[A-Z]/g, ch => String.fromCharCode(((ch.charCodeAt(0)-A + k) % 26)+A));
  }
  private decode(s: string, k: number){
    return this.encode(s, 26-k);
  }

  private exit(success: boolean){
    // avisar a la escena principal
    this.scene.stop();
    this.scene.resume("LabPlay");
    this.game.events.emit("portal:result", success);
  }
}
