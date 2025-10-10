import * as Phaser from "phaser";
import nodesData from "../data/nodes.json";

type EduNode = { id: string; title: string; lines: string[] };

export default class LabPlay extends Phaser.Scene {
  constructor(){ super("LabPlay"); }

  // Core
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: { [k: string]: Phaser.Input.Keyboard.Key };
  private baseSpeed = 130;
  private speed = 130;
  private dashSpeed = 340;
  private dashCooldownMs = 3000;
  private dashLastAt = -9999;
  private dashDurationMs = 140;
  private dashing = false;

  // World
  private walls!: Phaser.Tilemaps.TilemapLayer;
  private keysGroup!: Phaser.Physics.Arcade.Group;
  private keysCollected = 0;
  private requiredKeys = 3;
  private doorTile: Phaser.Tilemaps.Tile | null = null;
  private exitSprite!: Phaser.GameObjects.Sprite;

  // Score/time
  private timeLeft = 90;
  private portalsCleared = 0;
  private score = 0;

  // Nodes / portals
  private nodeSprites!: Phaser.GameObjects.Group;
  private portalSprites!: Phaser.GameObjects.Group;
  private interactRadius = 26;
  private eduPanel?: Phaser.GameObjects.Container;
  private eduShade?: Phaser.GameObjects.Rectangle;
  private eduOpen = false;
  private openNodeId: string | null = null;

  // Mode & tutorial flags
  private mode: "tutorial" | "mission" = "mission";
  private tutorialActive = false;
  private tutorialNode!: Phaser.GameObjects.Container;
  private tutorialPulse?: Phaser.Tweens.Tween;
  private tutorialHint?: Phaser.GameObjects.Text;
  private tutorialKeyDone = false;
  private tutorialPortalDone = false;

  // Hazards
  private lasers!: Phaser.Physics.Arcade.StaticGroup;
  private lasersActive = true;
  private slowZone!: Phaser.GameObjects.Rectangle;
  private slowBounds = new Phaser.Geom.Rectangle(0,0,0,0);
  private drone!: Phaser.Physics.Arcade.Sprite;
  private droneWaypoints: {x:number;y:number}[] = [];
  private droneIdx = 0;
  private droneIFramesUntil = 0;

  // Overlays & lifecycle
  private introOpen = true;
  private exitPulseTween?: Phaser.Tweens.Tween;

  // Retry-safe disposables
  private disposables: Array<() => void> = [];
  private timers: Phaser.Time.TimerEvent[] = [];
  private tweensLive: Phaser.Tweens.Tween[] = [];
  private glitchOverlay?: Phaser.GameObjects.Rectangle;
  private portalResultHandler?: (ok: boolean) => void;

  init(){
    // registry -> mode
    const m = (this.game.registry.get("mode") as string) || "mission";
    this.mode = m === "tutorial" ? "tutorial" : "mission";
    // Reset
    this.keysCollected = 0;
    this.requiredKeys = this.mode === "tutorial" ? 1 : 3;
    this.timeLeft = this.mode === "tutorial" ? 999 : 90; // en tutorial no corre
    this.portalsCleared = 0;
    this.score = 0;
    this.eduOpen = false;
    this.openNodeId = null;
    this.tutorialActive = (this.mode === "tutorial");
    this.tutorialKeyDone = false;
    this.tutorialPortalDone = false;
    this.lasersActive = true;
    this.droneIFramesUntil = 0;
    this.dashing = false;
    this.dashLastAt = -9999;
    this.glitchOverlay = undefined;
  }

  private trackTimer(t: Phaser.Time.TimerEvent){ this.timers.push(t); return t; }
  private trackTween(t: Phaser.Tweens.Tween){ this.tweensLive.push(t); return t; }

  private cleanup(){
    this.disposables.forEach(fn=>{ try{fn();}catch{} });
    this.disposables = [];
    if (this.portalResultHandler) {
      this.game.events.off("portal:result", this.portalResultHandler);
      this.portalResultHandler = undefined;
    }
    this.timers.forEach(t=>{ try{ t.remove(false);}catch{} }); this.timers=[];
    this.tweensLive.forEach(tw=>{ try{ tw.stop(); }catch{} }); this.tweensLive=[];
    this.glitchOverlay?.destroy(); this.glitchOverlay=undefined;
    this.scene.get("PortalMiniGame")?.scene.stop();
    this.scene.get("PauseOverlay")?.scene.stop();
  }

  create(){
    // Map
    const map = this.make.tilemap({ key: "L1" });
    const tileW = map.tileWidth, tileH = map.tileHeight;
    const tiles = map.addTilesetImage("tiles_basic", "tiles_basic", tileW, tileH, 0, 0);
    if (!tiles) throw new Error("Tileset 'tiles_basic' not found.");
    const floor = map.createLayer("floors", tiles, 0, 0);
    const walls = map.createLayer("walls", tiles, 0, 0);
    if (!floor || !walls) throw new Error("Layers 'floors'/'walls' not found.");

    const SCALE = 2;
    floor.setScale(SCALE); walls.setScale(SCALE); this.walls = walls;
    walls.setCollision(1, true);

    // Center map
    const mapW = map.width * tileW * SCALE;
    const mapH = map.height * tileH * SCALE;
    const cam = this.cameras.main;
    const offX = Math.floor((cam.width  - mapW) / 2);
    const offY = Math.floor((cam.height - mapH) / 2);
    floor.setPosition(offX, offY); walls.setPosition(offX, offY);

    // HUD
    this.game.events.emit("hud:minimap:init", mapW, mapH);
    this.game.events.emit("hud:time:set", this.timeLeft);

    // Player
    const spawnX = offX + (map.width*tileW*SCALE)/2;
    const spawnY = offY + (map.height*tileH*SCALE)/2;
    this.player = this.physics.add.sprite(spawnX, spawnY, "player_dot").setDepth(10);
    (this.player.body as Phaser.Physics.Arcade.Body).setSize(14,14).setOffset(2,2);
    this.physics.add.collider(this.player, walls);

    // Input
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      SPACE: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      E: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      P: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.P),
      ESC: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
    };

    // Door (top middle) & Exit (bottom middle)
    const midX = Math.floor(map.width / 2);
    const maybeDoor = walls.getTileAt(midX, 0);
    if (maybeDoor && maybeDoor.index === 2) {
      this.doorTile = maybeDoor;
      walls.setCollision([1,2], true);
    }
    const exitX = offX + mapW/2;
    const exitY = offY + mapH - 32;
    this.exitSprite = this.add.sprite(exitX, exitY, "exit_ring").setDepth(5);
    this.physics.add.existing(this.exitSprite, true);
    this.physics.add.overlap(this.player, this.exitSprite, ()=>{
      if (this.mode === "tutorial"){
        if (this.tutorialKeyDone /* && this.tutorialPortalDone */) {
          this.scene.start("Results", { timeLeft: 0, keys: 1, portals: this.tutorialPortalDone ? 1 : 0, score: this.score });
        } else {
          this.game.events.emit("hud:toast", "Finish the tutorial: pick up the key (and try the portal)");
        }
        return;
      }
      if (this.keysCollected >= this.requiredKeys) {
        this.scene.start("Results", { timeLeft: this.timeLeft, keys: this.keysCollected, portals: this.portalsCleared, score: this.score });
      } else {
        this.game.events.emit("hud:toast", `Need more keys (${this.keysCollected}/${this.requiredKeys})`);
      }
    });

    // Panels
    this.createEduPanel();

    // Portal result handler
    if (this.portalResultHandler) this.game.events.off("portal:result", this.portalResultHandler);
    this.portalResultHandler = (ok:boolean)=>{
      if (this.mode === "tutorial"){
        if (ok){
          this.tutorialPortalDone = true;
          this.game.events.emit("hud:toast", "Portal ✓ (tutorial)");
          this.score += 20; this.game.events.emit("hud:set-score", this.score);
        } else {
          const c = this.cameras.main;
          this.glitchOverlay = this.add.rectangle(c.width/2, c.height/2, c.width, c.height, 0x00e5ff, 0.06)
            .setScrollFactor(0).setDepth(999);
          this.trackTween(this.tweens.add({ targets: this.glitchOverlay, alpha: 0, duration: 4000,
            onComplete: ()=>{ this.glitchOverlay?.destroy(); this.glitchOverlay=undefined; } }));
          this.game.events.emit("hud:toast", "Glitch − vision 4s");
        }
        return;
      }
      if (ok){
        this.game.events.emit("hud:toast", "PORTAL ✓ +1 key");
        this.keysCollected++; this.portalsCleared++;
        this.game.events.emit("hud:set-keys", this.keysCollected);
        this.score += 40; this.game.events.emit("hud:set-score", this.score);
        this.tryOpenDoor();
      } else {
        const c = this.cameras.main;
        this.glitchOverlay = this.add.rectangle(c.width/2, c.height/2, c.width, c.height, 0x00e5ff, 0.06)
          .setScrollFactor(0).setDepth(999);
        this.trackTween(this.tweens.add({ targets: this.glitchOverlay, alpha: 0, duration: 8000,
          onComplete: ()=>{ this.glitchOverlay?.destroy(); this.glitchOverlay=undefined; } }));
        this.game.events.emit("hud:toast", "Glitch − vision 8s");
      }
    };
    this.game.events.on("portal:result", this.portalResultHandler);

    // Pause
    const onPause = () => {
      if (this.introOpen) return;
      this.scene.launch("PauseOverlay");
      this.scene.pause();
      this.game.events.emit("hud:toast", "PAUSED");
    };
    this.input.keyboard?.on("keydown-P", onPause);
    this.disposables.push(()=> this.input.keyboard?.off("keydown-P", onPause));

    // Scene lifecycle
    this.events.once("shutdown", ()=> this.cleanup());
    this.events.once("destroy",  ()=> this.cleanup());

    // Spawn content by mode
    if (this.mode === "tutorial") {
      this.spawnTutorial(offX, offY, mapW, mapH);
    } else {
      this.spawnMission(offX, offY, mapW, mapH);
    }

    // Scene intro (short)
    this.createIntroPanel();
  }

  update(){
    if (this.introOpen) return;

    // Edu panel toggle close
    if (this.eduOpen) {
      if (Phaser.Input.Keyboard.JustDown(this.wasd.E) || Phaser.Input.Keyboard.JustDown(this.wasd.SPACE)) {
        this.closeEduPanel();
      }
      return;
    }

    const body = this.player.body as Phaser.Physics.Arcade.Body;

    // Movement
    let vx = 0, vy = 0;
    const up = this.cursors.up?.isDown || this.wasd.W.isDown;
    const down = this.cursors.down?.isDown || this.wasd.S.isDown;
    const left = this.cursors.left?.isDown || this.wasd.A.isDown;
    const right = this.cursors.right?.isDown || this.wasd.D.isDown;
    if (up) vy -= 1; if (down) vy += 1; if (left) vx -= 1; if (right) vx += 1;

    const effectiveSpeed = this.dashing ? this.dashSpeed : (this.mode === "tutorial" ? this.baseSpeed : this.speed);
    const len = Math.hypot(vx, vy) || 1;
    body.setVelocity((vx/len)*effectiveSpeed, (vy/len)*effectiveSpeed);

    // Dash
    const now = this.time.now;
    if (Phaser.Input.Keyboard.JustDown(this.wasd.SPACE) && (now - this.dashLastAt) >= this.dashCooldownMs){
      this.dashing = true; this.dashLastAt = now;
      this.time.delayedCall(this.dashDurationMs, ()=> this.dashing = false);
    }
    const ratio = Phaser.Math.Clamp((now - this.dashLastAt) / this.dashCooldownMs, 0, 1);
    this.game.events.emit("hud:set-dash", ratio);

    // Interact
    if (Phaser.Input.Keyboard.JustDown(this.wasd.E)){
      if (this.tryOpenNode()) return;
      if (this.tryEnterPortal()) return;
    }

    // Mission-only hazards & time
    if (this.mode === "mission"){
      const pInSlow = this.slowBounds.contains(this.player.x, this.player.y);
      this.speed = this.baseSpeed * (pInSlow ? 0.6 : 1);
      this.tryOpenDoor();
      this.game.events.emit("hud:minimap:update",
        this.player.x - this.cameras.main.scrollX,
        this.player.y - this.cameras.main.scrollY
      );
    } else {
      // Tutorial minimap still updates
      this.game.events.emit("hud:minimap:update",
        this.player.x - this.cameras.main.scrollX,
        this.player.y - this.cameras.main.scrollY
      );
    }
  }

  // ---------- MODE SPAWNERS ----------
  private spawnTutorial(offX:number, offY:number, mapW:number, mapH:number){
    this.game.events.emit("hud:toast", "Tutorial: pick up the key, try the portal, reach the exit");

    // Tutorial node (center)
    const tg = this.add.graphics().setDepth(8);
    tg.lineStyle(3, 0x00e5ff, 1).strokeCircle(0,0,14);
    tg.fillStyle(0x00e5ff, 0.18).fillCircle(0,0,12);
    this.tutorialNode = this.add.container(offX + mapW/2, offY + mapH/2 - 28, [tg]);
    (this.tutorialNode as any).nodeId = "tutorial";
    this.tutorialPulse = this.trackTween(this.tweens.add({
      targets: this.tutorialNode, scaleX:{from:1,to:1.15}, scaleY:{from:1,to:1.15}, duration:700, yoyo:true, repeat:-1, ease:"Sine.inOut"
    }));
    this.tutorialHint = this.add.text(this.tutorialNode.x, this.tutorialNode.y - 28, "Approach and press E",
      { color:"#00E5FF", fontSize:"12px" }).setOrigin(0.5).setDepth(9);

    // One key near center-bottom
    this.keysGroup = this.physics.add.group();
    const keyPos = { x: offX + mapW/2, y: offY + mapH/2 + 64 };
    const ks = this.physics.add.sprite(keyPos.x, keyPos.y, "key_coin");
    ks.setCircle(6, 2, 2);
    (ks.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    this.keysGroup.add(ks);
    this.physics.add.overlap(this.player, this.keysGroup, (_pl, keyObj)=>{
      const s = keyObj as Phaser.Physics.Arcade.Sprite;
      s.disableBody(true, true);
      this.tutorialKeyDone = true;
      this.game.events.emit("hud:toast", "Key ✓ (tutorial)");
      // open door
      if (this.doorTile){ this.doorTile.index = 0; this.walls.setCollision([1], true); }
    });

    // Portal near center-right (SHIELD)
    this.portalSprites = this.add.group();
    const portalHalo = this.add.graphics().setDepth(7);
    portalHalo.lineStyle(2, 0x00e5ff, 1).strokeCircle(0,0,12);
    const portalC = this.add.container(offX + mapW/2 + 80, offY + mapH/2, [portalHalo]);
    this.portalSprites.add(portalC);

    // Tick (tutorial: time frozen, hazards OFF)
    // show short instructional panel on first E at tutorial node
    // (abrir/cerrar con E ya está con el edu panel)
  }

  private spawnMission(offX:number, offY:number, mapW:number, mapH:number){
    // Keys (dispersed)
    this.keysGroup = this.physics.add.group();
    const keyPositions = [
      { x: offX + 80,        y: offY + 80 },
      { x: offX + mapW - 80, y: offY + 90 },
      { x: offX + mapW/2,    y: offY + mapH - 90 }
    ];
    keyPositions.forEach(p=>{
      const s = this.physics.add.sprite(p.x, p.y, "key_coin");
      s.setCircle(6, 2, 2);
      (s.body as Phaser.Physics.Arcade.Body).setImmovable(true);
      this.keysGroup.add(s);
    });
    this.physics.add.overlap(this.player, this.keysGroup, (_pl, keyObj)=>{
      const s = keyObj as Phaser.Physics.Arcade.Sprite;
      s.disableBody(true, true);
      this.keysCollected++;
      this.game.events.emit("hud:set-keys", this.keysCollected);
      this.game.events.emit("hud:toast", "KEY +1");
      this.score += 25; this.game.events.emit("hud:set-score", this.score);
      this.tryOpenDoor();
    });

    // Nodes (dispersed)
    this.nodeSprites = this.add.group();
    const nodes: EduNode[] = (nodesData as EduNode[]);
    const nodePositions = [
      { x: offX + 140,        y: offY + 140,        id: nodes[0]?.id ?? "n1" },
      { x: offX + mapW - 160, y: offY + mapH/2 - 30, id: nodes[1]?.id ?? "n2" },
      { x: offX + mapW/2,     y: offY + 120,        id: nodes[2]?.id ?? "n3" },
    ];
    nodePositions.forEach((p,i)=>{
      const g = this.add.graphics().setDepth(8);
      g.fillStyle(0x00e5ff, 0.18).fillCircle(0,0,10).lineStyle(2, 0x00e5ff, 1).strokeCircle(0,0,10);
      const c = this.add.container(p.x, p.y, [g]); (c as any).nodeId = nodePositions[i].id; this.nodeSprites.add(c);
    });

    // Portal (center-ish)
    this.portalSprites = this.add.group();
    const ph = this.add.graphics().setDepth(7);
    ph.lineStyle(2, 0x00e5ff, 1).strokeCircle(0,0,12);
    const pc = this.add.container(offX + mapW/2 + 40, offY + mapH/2 + 40, [ph]);
    this.portalSprites.add(pc);

    // Hazards
    this.lasers = this.physics.add.staticGroup();
    const laserY = offY + Math.round(mapH*0.33);
    const laserXs = [offX + 120, offX + mapW/2 - 32, offX + mapW - 120 - 64];
    laserXs.forEach(x => {
      const seg = this.physics.add.staticSprite(x, laserY, "laser_seg").setOrigin(0,0.5);
      this.lasers.add(seg);
    });
    this.trackTimer(this.time.addEvent({
      delay: 900, loop: true,
      callback: ()=>{
        this.lasersActive = !this.lasersActive;
        this.lasers.getChildren().forEach(obj => (obj as Phaser.Physics.Arcade.Sprite).setAlpha(this.lasersActive ? 1 : 0.15));
      }
    }));
    this.physics.add.overlap(this.player, this.lasers, ()=>{
      if (!this.lasersActive) return;
      this.hitPenalty(-6, "LASER −6s");
      const body = this.player.body as Phaser.Physics.Arcade.Body; body.velocity.scale(0.4);
    });

    // Slow zone
    const szW=200, szH=110, szX = offX + mapW/2 - szW/2, szY = offY + mapH/2 - 10;
    this.slowZone = this.add.rectangle(szX, szY, szW, szH, 0x00e5ff, 0.05).setOrigin(0,0).setDepth(3);
    this.add.rectangle(szX, szY, szW, szH).setOrigin(0,0).setStrokeStyle(1, 0x00e5ff, 0.35).setDepth(3);
    this.slowBounds.setTo(szX, szY, szW, szH);

    // Drone patrol (rectangle)
    this.drone = this.physics.add.sprite(offX + 80, offY + mapH/2, "drone_bot").setDepth(6);
    (this.drone.body as Phaser.Physics.Arcade.Body).setCircle(7,1,1).setImmovable(true);
    this.droneWaypoints = [
      { x: offX + 100, y: offY + mapH/2 - 90 },
      { x: offX + mapW - 120, y: offY + mapH/2 - 90 },
      { x: offX + mapW - 120, y: offY + mapH/2 + 50 },
      { x: offX + 100, y: offY + mapH/2 + 50 },
    ];
    this.droneIdx = 0; this.moveDroneToNext();
    this.physics.add.overlap(this.player, this.drone, ()=>{
      if (this.time.now < this.droneIFramesUntil) return;
      this.droneIFramesUntil = this.time.now + 800;
      this.hitPenalty(-8, "DRONE −8s");
      const body = this.player.body as Phaser.Physics.Arcade.Body; body.velocity.scale(0.3);
      this.cameras.main.shake(120, 0.004);
    });

    // Mission timer (ticks)
    this.trackTimer(this.time.addEvent({
      delay: 1000, loop: true,
      callback: ()=>{
        if (this.introOpen || this.eduOpen) return;
        this.timeLeft = Math.max(0, this.timeLeft - 1);
        this.game.events.emit("hud:time:set", this.timeLeft);
        if (this.timeLeft === 0){
          this.game.events.emit("hud:toast", "Time up");
          this.scene.start("Results", { timeLeft: this.timeLeft, keys: this.keysCollected, portals: this.portalsCleared, score: this.score });
        }
      }
    }));
  }

  // ---------- interactions ----------
  private tryOpenDoor(): void {
    if (this.doorTile === null) return;
    if (this.mode === "tutorial"){
      if (!this.tutorialKeyDone) return;
      this.doorTile.index = 0; this.walls.setCollision([1], true);
      this.game.events.emit("hud:toast", "Door opened — head to the cyan ring");
      this.doorTile = null;
      return;
    }
    if (this.keysCollected < this.requiredKeys) return;
    this.doorTile.index = 0; this.walls.setCollision([1], true);
    this.game.events.emit("hud:toast", "ACCESS GRANTED → head to the cyan ring (exit)");
    this.exitPulseTween?.stop();
    this.exitSprite.setAlpha(1);
    this.exitPulseTween = this.trackTween(this.tweens.add({
      targets: this.exitSprite, alpha:{from:1,to:0.35}, duration:500, yoyo:true, repeat:-1, ease:"Sine.inOut"
    }));
    this.doorTile = null;
  }

  private tryOpenNode(): boolean {
    if (this.mode === "tutorial"){
      // Abrimos una micro-píldora guía al acercarte al nodo tutorial
      const dx = this.player.x - this.tutorialNode.x;
      const dy = this.player.y - this.tutorialNode.y;
      if (Math.hypot(dx,dy) <= this.interactRadius){
        this.showEduPanel({
          id: "tutorial",
          title: "Tutorial — What to do",
          lines: [
            "1) Pick up the key to open the top door.",
            "2) Try the portal: solve the Caesar shift (word: SHIELD).",
            "3) Reach the cyan ring to finish."
          ],
        });
        this.openNodeId = "tutorial";
        return true;
      }
      return false;
    }
    // Mission nodes
    const px = this.player.x, py = this.player.y;
    const children = this.nodeSprites.getChildren();
    for (const obj of children){
      const c = obj as Phaser.GameObjects.Container;
      const dx = c.x - px, dy = c.y - py;
      if (Math.hypot(dx, dy) <= this.interactRadius){
        const arr = nodesData as EduNode[];
        const data = arr.find(n => n.id === (c as any).nodeId) ?? arr[0];
        this.showEduPanel(data);
        this.openNodeId = (c as any).nodeId || null;
        return true;
      }
    }
    return false;
  }

  private tryEnterPortal(): boolean {
    const px = this.player.x, py = this.player.y;
    const children = this.portalSprites.getChildren();
    for (const obj of children){
      const c = obj as Phaser.GameObjects.Container;
      const dx = c.x - px, dy = c.y - py;
      if (Math.hypot(dx, dy) <= this.interactRadius){
        const phrase = (this.mode === "tutorial") ? "SHIELD" : "PRIVACY";
        const secs = (this.mode === "tutorial") ? 18 : 20;
        this.scene.launch("PortalMiniGame", { phrase, seconds: secs });
        return true;
      }
    }
    return false;
  }

  // ---------- edu panel ----------
  private createEduPanel(){
    const cam = this.cameras.main;
    const w = 440, h = 170;
    this.eduShade = this.add.rectangle(cam.width/2, cam.height/2, cam.width, cam.height, 0x000000, 0.45)
      .setScrollFactor(0).setDepth(499).setVisible(false).setInteractive();
    const bg = this.add.rectangle(0,0,w,h,0x000000,0.82).setStrokeStyle(2, 0xF4B728).setOrigin(0.5);
    const title = this.add.text(0, -h/2 + 16, "", { color:"#00FF9C", fontSize:"16px" }).setOrigin(0.5,0);
    const body = this.add.text(0, -h/2 + 42, "", { color:"#E6FFE6", fontSize:"14px", wordWrap: { width: w-32 } }).setOrigin(0.5,0);
    const hint = this.add.text(0, h/2 - 18, "Press E or click outside to close", { color:"#9FE870", fontSize:"12px" }).setOrigin(0.5,1);
    const panel = this.add.container(cam.width/2, cam.height/2, [bg, title, body, hint]).setDepth(500).setScrollFactor(0);
    panel.setVisible(false);
    this.eduPanel = panel;
    this.eduShade.on("pointerdown", ()=> this.closeEduPanel());
    panel.setInteractive(new Phaser.Geom.Rectangle(-w/2,-h/2,w,h), Phaser.Geom.Rectangle.Contains)
         .on("pointerdown", ()=> this.closeEduPanel());
    (panel as any).setContent = (t:string, lines:string[])=>{ title.setText(t); body.setText(lines.join("\n")); };
  }

  private showEduPanel(node: EduNode){
    if (!this.eduPanel) return;
    (this.eduPanel as any).setContent(node.title, node.lines);
    this.eduShade?.setVisible(true);
    this.eduPanel.setVisible(true);
    this.eduOpen = true;
  }

  private closeEduPanel(){
    if (!this.eduOpen) return;
    this.eduShade?.setVisible(false);
    this.eduPanel?.setVisible(false);
    this.eduOpen = false;
  }

  // ---------- misc ----------
  private hitPenalty(deltaSeconds: number, toast: string){
    this.timeLeft = Math.max(0, this.timeLeft + deltaSeconds);
    this.game.events.emit("hud:time:set", this.timeLeft);
    this.game.events.emit("hud:toast", toast);
    this.cameras.main.flash(90, 244, 183, 40);
  }

  private moveDroneToNext(){
    const next = this.droneWaypoints[this.droneIdx];
    this.droneIdx = (this.droneIdx + 1) % this.droneWaypoints.length;
    this.trackTween(this.tweens.add({
      targets: this.drone, x: next.x, y: next.y,
      duration: 1800, ease: "Sine.inOut",
      onComplete: ()=> this.moveDroneToNext()
    }));
  }

  private createIntroPanel(){
    const cam = this.cameras.main;
    const w = 520, h = 220;
    const bg = this.add.rectangle(cam.width/2, cam.height/2, cam.width, cam.height, 0x000000, 0.6)
      .setScrollFactor(0).setDepth(800).setInteractive({ useHandCursor:true });
    const card = this.add.rectangle(cam.width/2, cam.height/2, w, h, 0x0A0D0A, 0.96)
      .setStrokeStyle(2, 0x00E5FF).setScrollFactor(0).setDepth(801);
    const title = this.add.text(cam.width/2, cam.height/2 - h/2 + 16,
      this.mode === "tutorial" ? "Tutorial sandbox" : "Mission: good luck!",
      { color:"#00FF9C", fontSize:"18px", align:"center", wordWrap:{ width: w-32 } }
    ).setOrigin(0.5,0).setDepth(802);
    const body = this.add.text(cam.width/2, title.y + 40,
      this.mode === "tutorial"
        ? "Pick up the key • Try the portal • Reach the cyan ring.\nPress E to interact. Time is not running here."
        : "Collect keys • Read nodes • Optional portal • Avoid traps • Reach the exit.",
      { color:"#E6FFE6", fontSize:"14px", align:"center", wordWrap:{ width: w-40 } }
    ).setOrigin(0.5,0).setDepth(802);
    const btn = this.add.rectangle(cam.width/2, cam.height/2 + h/2 - 28, 180, 34, 0x111111, 1)
      .setStrokeStyle(2, 0xF4B728).setScrollFactor(0).setDepth(802).setInteractive({ useHandCursor:true });
    const txt = this.add.text(btn.x, btn.y, "Okay / Start", { color:"#E6FFE6", fontSize:"16px" }).setOrigin(0.5).setDepth(803);

    const close = ()=>{ [bg,card,title,body,btn,txt].forEach(g=> g.destroy()); this.introOpen = false; };
    bg.on("pointerdown", close); btn.on("pointerdown", close);
    this.input.keyboard?.once("keydown-ENTER", close);
    this.input.keyboard?.once("keydown-SPACE", close);
    this.input.keyboard?.once("keydown-ESC", close);
  }
}
