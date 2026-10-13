import Phaser from 'phaser';
import { HERO_VISUAL_SCALE, HERO_EFFECT_SCALE } from './Presentation';
import rOriginalUrl from '../../assets/hero-skills/2026-10-12/yasuo/r-v1-last-breath/media/e-atlas.png?url';
import eqRingUrl from '../../assets/hero-skills/2026-10-12/yasuo/eq-v2-ring-only/media/e-atlas.png?url';
import eq3RingUrl from '../../assets/hero-skills/2026-10-12/yasuo/eq3-v1-layered-ring/refined/media/e-atlas.png?url';
import { isFrontArc } from '../../assets/hero-skills/2026-10-12/yasuo/eq3-v1-layered-ring/depth';
import readyWindUrl from '../../assets/hero-skills/2026-10-12/yasuo/q-v13-independent-ready/media/e-atlas.png?url';
import tornadoUrl from '../../assets/hero-skills/2026-10-12/yasuo/q-v12-storm-preview/tornado/media/e-atlas.png?url';
import { stormReady, STORM } from '../game/YasuoStorm';
import { ABILITIES, BALANCE, BASES, MAP_LAYOUT, VIEWPORT, WORLD } from '../game/config';
import { distance } from '../game/geometry';
import { Match } from '../game/Match';
import type { AbilityKey, Entity, GameEvent, Point } from '../game/types';
import { CameraRig } from './CameraRig';
import { YasuoAnimator } from './YasuoAnimation';
import { Q_DIRECTION_LABELS } from './YasuoQAnimation';
import { YASUO_TEXTURES } from './YasuoAssets';
import wUserCastUrl from '../../assets/hero-skills/2026-10-12/yasuo/w-v5-user-pose-se/media/e-atlas.png?url';
import { drawWindWall } from '../../assets/hero-skills/2026-10-12/yasuo/w-v4-free-angle/wall';
import { W_CAST_SECONDS, wallEnds } from '../game/WindWall';
import { E, dashEndpoint } from '../game/YasuoE';
import forestMapUrl from '../../assets/map-studies/2026-10-09/01-forest/参考图片的地形布局_为我们的像素风中路_Solo_游戏绘制一张完整的俯视地图底图_宽_a7693192/sprite_00.png?url';

const COLORS = { blue: 0x6de5db, red: 0xee8582 } as const;

export interface SceneCallbacks {
  frame: (match: Match) => void;
  event: (event: GameEvent) => void;
}

export class ArenaScene extends Phaser.Scene {
  match: Match;
  aim: Point = { x: 240, y: 135 };
  aimKey: AbilityKey | null = null;
  selectedId: number | null = null;
  readonly cameraRig = new CameraRig();
  recenterHeld = false;
  simulationSpeed = 1;
  heroAnimationLabel = '亚索 · 待机';
  private yasuoAnimator = new YasuoAnimator();
  private callbacks: SceneCallbacks;
  private accumulator = 0;
  private lastHudAt = -1;
  private views = new Map<number, Phaser.GameObjects.Image>();
  private wallViews = new Map<number, { image: Phaser.GameObjects.Image; texture: Phaser.Textures.CanvasTexture }>();
  private dashGhosts: Phaser.GameObjects.Image[] = [];
  private eqRings: Phaser.GameObjects.Image[] = [];
  private readyWind: Phaser.GameObjects.Image[] = [];
  private tornadoViews = new Map<number, Phaser.GameObjects.Image>();
  private ground!: Phaser.GameObjects.Graphics;
  private effects!: Phaser.GameObjects.Graphics;
  private bars!: Phaser.GameObjects.Graphics;
  private booted = false;
  private pointerInside = false;
  private dragPoint: Point | null = null;
  private cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(match: Match, callbacks: SceneCallbacks) {
    super({ key: 'arena' });
    this.match = match;
    this.callbacks = callbacks;
  }

  preload(): void {
    this.load.image('forest-map', forestMapUrl);
    this.load.spritesheet('yasuo-ready-wind',readyWindUrl,{frameWidth:143,frameHeight:96,endFrame:7});
    this.load.spritesheet('yasuo-tornado',tornadoUrl,{frameWidth:112,frameHeight:141,endFrame:7});
    this.load.spritesheet('yasuo-r-original',rOriginalUrl,{frameWidth:176,frameHeight:176,endFrame:15});
    this.load.spritesheet('yasuo-eq-ring',eqRingUrl,{frameWidth:176,frameHeight:144,endFrame:7});
    this.load.image('yasuo-eq3-source',eq3RingUrl);
    this.load.spritesheet('yasuo-w-user-cast', wUserCastUrl, { frameWidth: 128, frameHeight: 127, endFrame: 7 });
    for (const { clip, url } of YASUO_TEXTURES) this.load.spritesheet(clip.key, url, {
      frameWidth: clip.width, frameHeight: clip.height, startFrame: 0, endFrame: clip.frame_count - 1,
    });
  }

  create(): void {
    this.makeTextures();
    // Separate all three front arcs from their rear arcs; retain the original pixels.
    const eq3Source=this.textures.get('yasuo-eq3-source').getSourceImage() as HTMLImageElement;
    for(let layer=0;layer<2;layer++) {
      const texture=this.textures.createCanvas(`yasuo-eq3-${layer}`,704,288)!;
      const context=texture.getContext(); context.drawImage(eq3Source,0,0);
      const pixels=context.getImageData(0,0,704,288);
      for(let y=0;y<288;y++)for(let x=0;x<704;x++) {
        if(Number(isFrontArc(x%176,y%144))!==layer)pixels.data[(y*704+x)*4+3]=0;
      }
      context.putImageData(pixels,0,0); texture.refresh();
      for(let frame=0;frame<8;frame++)texture.add(frame,0,frame%4*176,Math.floor(frame/4)*144,176,144);
      texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    }
    this.textures.get('yasuo-w-user-cast').setFilter(Phaser.Textures.FilterMode.NEAREST);
    for(const key of ['yasuo-ready-wind','yasuo-tornado'])this.textures.get(key).setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.readyWind=[0,1].map((i)=>this.add.image(0,0,'yasuo-ready-wind').setOrigin(71.5/143,84/96).setScale(HERO_EFFECT_SCALE).setCrop(0,i?52:0,143,i?44:52).setVisible(false));
    this.textures.get('yasuo-r-original').setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.textures.get('yasuo-eq-ring').setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.eqRings=[0,1].map(()=>this.add.image(0,0,'yasuo-eq-ring').setOrigin(88/176,125/144).setScale(HERO_EFFECT_SCALE).setVisible(false));
    for (const { clip } of YASUO_TEXTURES) this.textures.get(clip.key).setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.drawMap();
    this.ground = this.add.graphics().setDepth(1);
    this.effects = this.add.graphics().setDepth(800);
    this.bars = this.add.graphics().setDepth(900);
    this.dashGhosts = [0,1,2].map(()=>this.add.image(0,0,'blue-hero').setVisible(false));
    this.input.mouse?.disableContextMenu();
    this.cursorKeys = this.input.keyboard!.createCursorKeys();
    this.cameraRig.reset(this.match.hero('blue'));
    this.applyCamera();
    this.input.on('gameover', () => { this.pointerInside = true; });
    this.input.on('gameout', () => { this.pointerInside = false; this.dragPoint = null; });
    this.input.on('pointerup', () => { this.dragPoint = null; });
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.pointerInside = true;
      if (this.dragPoint && pointer.middleButtonDown()) {
        this.cameraRig.pan((this.dragPoint.x - pointer.x) / this.cameraRig.zoom, (this.dragPoint.y - pointer.y) / this.cameraRig.zoom);
        this.dragPoint = { x: pointer.x, y: pointer.y };
        this.applyCamera();
      }
      this.updateAim(pointer);
    });
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.pointerInside = true;
      this.updateAim(pointer);
      if (this.match.phase !== 'playing') return;
      if (pointer.middleButtonDown()) {
        this.dragPoint = { x: pointer.x, y: pointer.y };
        this.cameraRig.following = false;
        return;
      }
      const hit = this.pickEntity(this.aim);
      if (pointer.rightButtonDown()) {
        if (hit && hit.team !== 'blue') {
          this.match.orderAttack('blue', hit.id);
          this.selectedId = hit.id;
        } else {
          this.match.orderMove('blue', this.aim);
          this.selectedId = null;
        }
      } else if (pointer.leftButtonDown()) this.selectedId = hit?.id ?? null;
    });
    this.input.on('wheel', (_pointer: Phaser.Input.Pointer, _objects: Phaser.GameObjects.GameObject[], _dx: number, dy: number) => {
      if (this.match.phase === 'playing' && dy !== 0) this.cameraRig.setZoom(dy < 0 ? 1.5 : 1);
    });
    this.game.canvas.addEventListener('mousedown', event => { if (event.button === 1) event.preventDefault(); });
    this.game.canvas.addEventListener('wheel', event => { event.preventDefault(); }, { passive: false });
    this.booted = true;
    this.renderMatch();
  }

  setMatch(match: Match): void {
    for (const view of this.views.values()) view.destroy();
    this.views.clear();
    for (const {image, texture} of this.wallViews.values()) { image.destroy(); this.textures.remove(texture.key); }
    this.wallViews.clear();
    this.yasuoAnimator.reset();
    this.tweens.killAll();
    this.children.list.filter(c => c instanceof Phaser.GameObjects.Text && c.getData('transient')).forEach(c => c.destroy());
    this.match = match;
    this.accumulator = 0;
    this.lastHudAt = -1;
    this.selectedId = null;
    this.aimKey = null;
    this.recenterHeld = false;
    this.dragPoint = null;
    this.cameraRig.reset(match.hero('blue'));
    if (this.booted) { this.applyCamera(); this.updateAim(this.input.activePointer); this.renderMatch(); }
  }

  update(time: number, delta: number): void {
    if (this.match.phase === 'playing') {
      this.accumulator += Math.min(delta / 1000, 0.25) * this.simulationSpeed;
      while (this.accumulator >= WORLD.step) {
        this.match.step(WORLD.step);
        this.accumulator -= WORLD.step;
        if (this.match.phase !== 'playing') { this.accumulator = 0; break; }
      }
    } else this.accumulator = 0;
    for (const event of this.match.drainEvents()) {
      this.showEvent(event);
      this.callbacks.event(event);
    }
    this.updateCamera(Math.min(delta / 1000, 0.1));
    this.renderMatch();
    if (time - this.lastHudAt > 80) {
      this.callbacks.frame(this.match);
      this.lastHudAt = time;
    }
  }

  private updateAim(pointer: Phaser.Input.Pointer): void {
    // Never use screen coordinates as simulation coordinates after camera movement.
    this.aim = this.cameraRig.screenToWorld({ x: pointer.x, y: pointer.y });
  }

  private applyCamera(): void {
    const camera = this.cameras.main;
    camera.setBounds(0, 0, WORLD.width, WORLD.height);
    camera.setZoom(this.cameraRig.zoom).centerOn(this.cameraRig.center.x, this.cameraRig.center.y);
    camera.roundPixels = true;
  }

  private updateCamera(dt: number): void {
    if (this.match.phase === 'playing') {
      const keys = this.cursorKeys;
      let dx = Number(keys.right.isDown) - Number(keys.left.isDown);
      let dy = Number(keys.down.isDown) - Number(keys.up.isDown);
      const pointer = this.input.activePointer;
      if (!this.cameraRig.following && this.pointerInside && !this.dragPoint && !this.recenterHeld) {
        if (pointer.x < 10) dx--;
        if (pointer.x > VIEWPORT.width - 10) dx++;
        if (pointer.y < 10) dy--;
        if (pointer.y > VIEWPORT.height - 10) dy++;
      }
      if (this.recenterHeld || keys.space.isDown) this.cameraRig.lookAt(this.match.hero('blue'));
      else if (dx || dy) {
        const length = Math.hypot(dx, dy), speed = 125 * dt;
        this.cameraRig.pan(dx / length * speed, dy / length * speed);
      } else if (this.cameraRig.following) this.cameraRig.lookAt(this.match.hero('blue'));
    }
    this.applyCamera();
    // Refresh even for a stationary mouse while the camera or hero moves.
    this.updateAim(this.input.activePointer);
  }

  private pickEntity(point: Point): Entity | undefined {
    const hero = this.match.hero('blue');
    // A long Q sprite includes a large transparent canvas and must not enlarge the hero's click target.
    return this.match.entities.filter(e => e.hp > 0 && (distance(e, point) < e.radius + 5 || (e === hero
      ? Math.abs(point.x - e.x) <= 13*HERO_VISUAL_SCALE && point.y >= e.y - 29*HERO_VISUAL_SCALE && point.y <= e.y + 3
      : this.views.get(e.id)?.getBounds().contains(point.x, point.y))))
      .sort((a, b) => distance({ x: a.x, y: a.y - 8 }, point) - distance({ x: b.x, y: b.y - 8 }, point))[0];
  }

  private makeTextures(): void {
    for (const team of ['blue', 'red'] as const) {
      const light = COLORS[team], dark = team === 'blue' ? 0x2e777b : 0x934e57;
      for (const kind of ['hero', 'melee', 'ranged', 'tower'] as const) {
        const key = `${team}-${kind}`;
        if (this.textures.exists(key)) continue;
        const width = kind === 'tower' || kind === 'hero' ? 32 : 16;
        const height = kind === 'tower' ? 48 : width;
        const g = this.make.graphics({ x: 0, y: 0 });
        if (kind === 'hero') {
          g.fillStyle(0x08161c).fillRect(7, 5, 18, 23);
          g.fillStyle(dark).fillRect(7, 15, 18, 11).fillRect(6, 22, 6, 5);
          g.fillStyle(light).fillRect(11, 6, 10, 5).fillRect(9, 13, 14, 8);
          g.fillStyle(0xc5e1db).fillRect(12, 4, 8, 3).fillRect(13, 11, 6, 3);
          g.fillStyle(0x152b36).fillRect(12, 8, 8, 3).fillRect(12, 21, 4, 7).fillRect(19, 21, 4, 7);
          g.fillStyle(0xa6bec7).fillRect(24, 12, 2, 13).fillRect(23, 18, 4, 2);
          g.fillStyle(0xf3e1af).fillRect(14, 16, 3, 3);
        } else if (kind === 'tower') {
          g.fillStyle(0x28312e).fillRect(3, 36, 26, 8).fillRect(8, 12, 17, 26);
          g.fillStyle(0x626852).fillRect(4, 36, 24, 6).fillRect(9, 16, 14, 22);
          g.fillStyle(0x8b8d6c).fillRect(6, 34, 21, 4).fillRect(9, 14, 15, 5).fillRect(10, 20, 4, 12);
          g.fillStyle(0x434e41).fillRect(17, 20, 6, 14).fillRect(8, 29, 18, 3);
          g.fillStyle(0xb1ab80).fillRect(5, 36, 9, 2).fillRect(10, 15, 6, 2);
          g.fillStyle(0x49633c).fillRect(5, 39, 6, 3).fillRect(23, 34, 4, 3);
          g.fillStyle(dark).fillRect(12, 4, 9, 11).fillRect(14, 19, 6, 8);
          g.fillStyle(light).fillRect(14, 2, 5, 15).fillRect(11, 7, 11, 5).fillRect(15, 20, 3, 5);
          g.fillStyle(0xe3f8e8).fillRect(15, 3, 2, 8);
        } else {
          g.fillStyle(0x0b1720).fillRect(3, 3, 10, 11);
          g.fillStyle(dark).fillRect(4, 7, 8, 6);
          g.fillStyle(light).fillRect(5, 3, 6, 4).fillRect(5, 8, 6, 3);
          g.fillStyle(0x273741).fillRect(5, 5, 5, 2).fillRect(4, 12, 3, 2).fillRect(10, 12, 3, 2);
          if (kind === 'ranged') {
            g.fillStyle(0xd4ba8d).fillRect(13, 4, 1, 9);
            g.fillStyle(light).fillRect(12, 2, 3, 3);
          } else g.fillStyle(0x94a9b4).fillRect(12, 7, 2, 6);
        }
        g.generateTexture(key, width, height);
        g.destroy();
      }
    }
  }

  private drawMap(): void {
    this.textures.get('forest-map').setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.add.image(0, 0, 'forest-map').setOrigin(0).setScale(MAP_LAYOUT.scale).setDepth(0);
    const g = this.add.graphics().setDepth(0);
    for (const team of ['blue', 'red'] as const) {
      const base = BASES[team];
      const radius = BALANCE.fountainRadius;
      g.fillStyle(COLORS[team], 0.1).fillCircle(base.x, base.y, radius);
      g.lineStyle(1, COLORS[team], 0.5).strokeCircle(base.x, base.y, radius).strokeCircle(base.x, base.y, radius * 0.7);
      g.fillStyle(COLORS[team], 0.5).fillRect(base.x - 4, base.y - 14, 8, 28).fillRect(base.x - 14, base.y - 4, 28, 8);
    }
  }

  private renderMatch(): void {
    if (!this.booted) return;
    this.ground.clear(); this.bars.clear(); this.effects.clear();
    this.dashGhosts.forEach(image=>image.setVisible(false));
    this.eqRings.forEach(image=>image.setVisible(false));
    this.readyWind.forEach(image=>image.setVisible(false));
    const liveIds = new Set(this.match.entities.map(e => e.id));
    for (const [id, view] of this.views) if (!liveIds.has(id)) { view.destroy(); this.views.delete(id); }
    const hero = this.match.hero('blue');
    for (const entity of this.match.entities) {
      let view = this.views.get(entity.id);
      if (!view) {
        view = this.add.image(entity.x, entity.y, `${entity.team}-${entity.kind}`).setOrigin(0.5, 0.875);
        this.views.set(entity.id, view);
      }
      const moving = entity.speed > 0 && (entity.destination || (entity.targetId && !entity.windup && entity.cooldown <= 0));
      const bob = moving && this.match.phase === 'playing' ? Math.floor(this.match.time * 7 + entity.id) % 2 : 0;
      const isYasuo = entity === hero;
      if (isYasuo) {
        const sample = this.yasuoAnimator.sample(entity, this.match.time), clip = sample.clip;
        view.setTexture(clip.key, sample.frame).setOrigin(clip.anchor[0] / clip.width, clip.anchor[1] / clip.height).setScale(sample.scale * HERO_VISUAL_SCALE);
        const action = sample.state === 'Q' ? `Q 戳刺 · ${Q_DIRECTION_LABELS['direction' in clip ? clip.direction : 'e']}`
          : sample.state === 'E' ? `E 滑行 · ${Q_DIRECTION_LABELS['direction' in clip ? clip.direction : 'e']}` : sample.state === 'idle' ? '待机' : sample.state === 'walk' ? '走路' : `攻击 ${sample.state}`;
        this.heroAnimationLabel = `亚索 · ${action} · ${sample.frame + 1}/${clip.frame_count}帧`;
        // Single-direction attack artwork is not rotated or mirrored into fake eight-way art.
        view.setFlipX(false);
        if(stormReady(entity,this.match.time)) {
          const frame=Math.floor(Math.max(0,this.match.time-(entity.qReadyAt??this.match.time))*10)%8;
          this.readyWind.forEach((image,i)=>image.setVisible(true).setFrame(frame).setPosition(Math.round(entity.x),Math.round(entity.y)).setDepth(10+Math.round(entity.y)+(i?.1:-.1)));
          this.heroAnimationLabel+=' · Q3 已蓄风';
        }
        if(entity.eqCast && entity.hp>0) {
          const age=this.match.time-entity.eqCast.startedAt;
          if(age>=0 && age<.2) {
            const frame=Math.min(5,2+Math.floor(age/.05));
            this.eqRings.forEach((image,i)=>{
              image.setVisible(true).setTexture(entity.eqCast!.empowered?`yasuo-eq3-${i}`:'yasuo-eq-ring',frame);
              if(entity.eqCast!.empowered)image.setCrop();
              else image.setCrop(0,i?88:0,176,i?56:88);
              image.setPosition(Math.round(entity.x),Math.round(entity.y)).setDepth(10+Math.round(entity.y)+(i?.1:-.1));
            });
          }
          if(age>=0)this.heroAnimationLabel=entity.eqCast.empowered?'亚索 · EQ3 多层环斩':'亚索 · EQ 环斩';
        }
        if (sample.state === 'E' && entity.eCast) {
          const cast=entity.eCast, age=this.match.time-cast.startedAt;
          const p=Math.max(0,Math.min(1,(age-E.startup)/E.dash));
          // Preserve the user-approved pose: no squash, rotation or extra sword arc.
          if(age>E.startup && age<E.startup+E.dash+E.recovery) {
            for(let i=0;i<3;i++) {
              const previous=Math.max(0,p-(i+1)*0.12);
              this.dashGhosts[i].setVisible(p>0).setTexture(clip.key,sample.frame)
                .setOrigin(clip.anchor[0]/clip.width,clip.anchor[1]/clip.height).setScale(sample.scale * HERO_VISUAL_SCALE)
                .setPosition(cast.start.x+(cast.end.x-cast.start.x)*previous,cast.start.y+(cast.end.y-cast.start.y)*previous)
                .setDepth(9+entity.y).setTint(0xafece8).setAlpha((0.22-i*0.06)*(1-Math.max(0,(age-.26)/.06)));
            }
            const tail=Math.max(0,p-.36), tx=cast.start.x+(cast.end.x-cast.start.x)*tail, ty=cast.start.y+(cast.end.y-cast.start.y)*tail;
            this.effects.lineStyle(2,0xb7eeec,0.45).lineBetween(tx,ty-8,entity.x,entity.y-8);
          }
        }
        if (entity.wCast && entity.hp > 0 && this.match.time < entity.wCast.startedAt + W_CAST_SECONDS) {
          const frame = Math.min(7, Math.floor((this.match.time - entity.wCast.startedAt) * 10));
          // Source pose is 64px wide, padded 16px left; keep its ground anchor fixed.
          view.setTexture('yasuo-w-user-cast', frame).setOrigin(48 / 128, 117 / 127).setScale(HERO_EFFECT_SCALE).setFlipX(false);
          this.heroAnimationLabel = `亚索 · W 横斩 · ${frame + 1}/8帧`;
        }
        if(entity.q3Cast && entity.hp>0) {
          const frame=Math.min(7,Math.floor((this.match.time-entity.q3Cast.startedAt)*10));
          view.setTexture('yasuo-w-user-cast',frame).setOrigin(48/128,117/127).setScale(HERO_EFFECT_SCALE).setFlipX(false);
          this.heroAnimationLabel=`亚索 · Q3 横斩 · ${frame+1}/8帧`;
        }
      }
      const airRemaining=Math.max(0,(entity.airborneUntil??0)-this.match.time);
      const lift=Math.min(1,airRemaining/.15)*13;
      view.setPosition(Math.round(entity.x), Math.round(entity.y - (isYasuo ? 0 : bob)-lift));
      if(isYasuo&&entity.rCast&&entity.hp>0){
        const age=this.match.time-entity.rCast.startedAt;
        if(age<1){view.setTexture('yasuo-r-original',Math.min(15,Math.floor(age*16))).setOrigin(104/176,149/176).setScale(HERO_EFFECT_SCALE).setFlipX(false);}
        this.heroAnimationLabel=age<1?'亚索 · R 狂风绝息斩 · 原版':'亚索 · R 收势';
      }
      view.setDepth(10 + Math.round(entity.y));
      if (!isYasuo) view.setScale(entity.kind === 'hero' ? HERO_VISUAL_SCALE : 1).setFlipX(entity.kind !== 'tower' && Math.cos(entity.facing) < 0);
      view.setAlpha(entity.hp > 0 ? 1 : 0.25);
      if (this.match.time - entity.hitAt < 0.1) view.setTintFill(0xffffff); else view.clearTint();
      if (entity.hp <= 0) continue;
      const lock=this.match.eTargetLocks.get(entity.id) ?? 0;
      if(lock>this.match.time) {
        this.ground.lineStyle(1,0xa08d91,0.9).strokeEllipse(entity.x,entity.y+2,entity.radius*2+8,7);
        this.bars.lineStyle(2,0xcdb39a,0.9).lineBetween(entity.x-5,entity.y-20,entity.x-5+10*(lock-this.match.time)/E.targetCooldown,entity.y-20);
      }
      this.ground.fillStyle(0x061016, 0.45).fillEllipse(entity.x, entity.y + 1, entity.radius * 2 + 4, entity.radius + 2);
      const selected = entity.id === this.selectedId || entity.id === hero.targetId;
      if (selected) this.ground.lineStyle(1, entity.team === 'blue' ? COLORS.blue : 0xf9cd8e, 0.9).strokeEllipse(entity.x, entity.y + 1, entity.radius * 2 + 9, entity.radius + 7);
      if (entity.guardUntil > this.match.time) this.effects.lineStyle(1, COLORS[entity.team], 0.85).strokeCircle(entity.x, entity.y - 9, 15);
      if (entity.kind === 'tower' && distance(hero, entity) < entity.range + 35) {
        this.ground.lineStyle(1, COLORS[entity.team], entity.team === 'red' ? 0.3 : 0.12).strokeCircle(entity.x, entity.y, entity.range);
      }
      const width = entity.kind === 'tower' ? 29 : entity.kind === 'hero' ? 24 : 12;
      const y = Math.round(entity.y - (entity.kind === 'tower' ? 42 : isYasuo ? 33*HERO_VISUAL_SCALE : entity.kind === 'hero' ? 28*HERO_VISUAL_SCALE : 16));
      const x = Math.round(entity.x - width / 2);
      this.bars.fillStyle(0x07151d).fillRect(x - 1, y - 1, width + 2, 5);
      this.bars.fillStyle(COLORS[entity.team]).fillRect(x, y, Math.max(1, Math.round(width * entity.hp / entity.maxHp)), 2);
      if (entity.kind === 'hero') this.bars.fillStyle(0x789ed6).fillRect(x, y + 3, Math.round(width * entity.mana / entity.maxMana), 1);
      if (entity.hp <= hero.damage && entity.team === 'red' && (entity.kind === 'melee' || entity.kind === 'ranged')) {
        this.bars.fillStyle(0xfbd8a0).fillRect(x - 3, y, 1, 2);
      }
    }
    const wallIds = new Set(this.match.windWalls.map(w => w.id));
    for (const [id, value] of this.wallViews) if (!wallIds.has(id)) {
      value.image.destroy(); this.textures.remove(value.texture.key); this.wallViews.delete(id);
    }
    for (const wall of this.match.windWalls) {
      let value = this.wallViews.get(wall.id);
      if (!value) {
        const texture = this.textures.createCanvas(`wind-wall-${wall.id}`, 192, 160)!;
        texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        value = { texture, image: this.add.image(wall.x, wall.y, texture.key).setOrigin(0.5, 110 / 160) };
        this.wallViews.set(wall.id, value);
      }
      const age = (this.match.time - wall.startsAt) * 1000;
      const context = value.texture.context;
      context.clearRect(0, 0, 192, 160);
      // Game coordinates are already map-projected: do not squash ground Y a second time.
      if (age >= 0) drawWindWall(context, { center: {x: 0, y: 0}, angle: wall.angle * 180 / Math.PI,
        width: 84, height: 35, thickness: 6 }, { origin: {x: 96, y: 110}, groundScale: 1 }, age, age);
      value.texture.refresh(); value.image.setPosition(wall.x, wall.y).setDepth(11 + wall.y);
    }
    if (this.aimKey === 'w') {
      const angle = Math.atan2(this.aim.y - hero.y, this.aim.x - hero.x);
      const [a,b] = wallEnds({id:0,team:'blue',startsAt:0,angle,x:hero.x+Math.cos(angle)*32,y:hero.y+Math.sin(angle)*32});
      this.ground.lineStyle(2, COLORS.blue, 0.7).lineBetween(a.x,a.y,b.x,b.y);
    }
    if (hero.destination) {
      const p = hero.destination;
      this.ground.lineStyle(1, COLORS.blue, 0.8).strokeCircle(p.x, p.y, 4);
      this.ground.lineBetween(p.x - 6, p.y, p.x + 6, p.y).lineBetween(p.x, p.y - 6, p.x, p.y + 6);
    }
    const dashTarget=this.match.dashTarget(this.aim);
    if (dashTarget && this.match.phase==='playing' && !hero.eCast) {
      const valid=!this.match.dashError(this.aim), color=valid?0xadeee5:0x9c7777;
      this.ground.lineStyle(1,color,0.9).strokeEllipse(dashTarget.x,dashTarget.y+1,dashTarget.radius*2+10,10);
      if(valid) {
        const end=dashEndpoint(hero,dashTarget);
        this.ground.lineStyle(1,color,0.45).lineBetween(hero.x,hero.y,end.x,end.y).strokeCircle(end.x,end.y,4);
      }
    }
    const stormIds=new Set(this.match.projectiles.filter(p=>p.empowered).map(p=>p.id));
    for(const [id,image] of this.tornadoViews)if(!stormIds.has(id)){image.destroy();this.tornadoViews.delete(id);}
    for (const shot of this.match.projectiles) {
      if(shot.empowered) {
        let image=this.tornadoViews.get(shot.id);
        if(!image){image=this.add.image(shot.x,shot.y,'yasuo-tornado').setOrigin(57/112,112/141).setScale(.25);this.tornadoViews.set(shot.id,image);}
        image.setFrame(Math.floor(Math.max(0,this.match.time-(shot.startedAt??this.match.time))*10)%8).setPosition(shot.x,shot.y).setDepth(10+shot.y).setRotation(0).setAlpha(Math.min(1,shot.remaining/12));
        continue;
      }
      const color = COLORS[shot.team];
      this.effects.fillStyle(color, 0.17).fillCircle(shot.x, shot.y, shot.kind === 'q' ? 7 : 4);
      this.effects.fillStyle(color).fillRect(Math.round(shot.x - shot.radius), Math.round(shot.y - shot.radius), shot.radius * 2, shot.radius * 2);
      if (shot.kind === 'q') this.effects.lineStyle(2, color, 0.6).lineBetween(shot.x, shot.y, shot.x - shot.vx * 9, shot.y - shot.vy * 9);
    }
    for (const zone of this.match.zones) {
      const color = COLORS[zone.team], progress = 1 - (zone.triggerAt - this.match.time) / 0.55;
      this.ground.fillStyle(color, 0.13).fillCircle(zone.x, zone.y, zone.radius);
      this.ground.lineStyle(1, color, 0.8).strokeCircle(zone.x, zone.y, zone.radius);
      this.ground.lineStyle(1, color, 0.5).strokeCircle(zone.x, zone.y, zone.radius * progress);
    }
    if (this.aimKey && this.match.phase === 'playing') {
      this.ground.lineStyle(1, COLORS.blue, 0.3).strokeCircle(hero.x, hero.y, this.aimKey==='q'&&stormReady(hero,this.match.time)?STORM.range:ABILITIES[this.aimKey].range);
    }
    if (hero.windup > 0) this.bars.lineStyle(1, COLORS.blue, 0.6).strokeCircle(hero.x, hero.y - 12, 12);
  }

  private showEvent(event: GameEvent): void {
    if (event.type !== 'hit' && event.type !== 'last-hit') return;
    const cs = event.type === 'last-hit';
    const text = this.add.text(event.x, event.y - 24, cs ? '+1 CS' : `${event.amount}`, {
      fontFamily: 'Consolas, monospace', fontSize: cs ? '7px' : '6px',
      color: cs ? '#ffe0a0' : event.team === 'blue' ? '#b5eee3' : '#f0b0a3',
      stroke: '#10212b', strokeThickness: 1,
    }).setOrigin(0.5).setDepth(950).setData('transient', true);
    this.tweens.add({ targets: text, y: text.y - (cs ? 15 : 9), alpha: 0, duration: cs ? 850 : 550, onComplete: () => text.destroy() });
  }
}
