import Phaser from 'phaser';
import { WORLD } from '../game/config';
import { bridgePoint, BRIDGE } from '../game/Bridge';
import { halfWidth } from '../../assets/map-studies/howling-abyss-v1/geometry';
import {AbyssScenery} from './AbyssScenery';

/** Deterministic decoration: no collision, gameplay state or per-frame allocations of objects. */
export const terrainNoise=(a:number,b:number)=>{
  const n=Math.sin(a*127.1+b*311.7)*43758.5453;
  return n-Math.floor(n);
};
const wrap=(n:number,size:number)=>((n%size)+size)%size;

export class HowlingAtmosphere {
  static preload(scene:Phaser.Scene){AbyssScenery.preload(scene);}
  private scenery:AbyssScenery;
  private backdrop:Phaser.GameObjects.Graphics;
  private base:Phaser.GameObjects.Graphics;
  private fog:Phaser.GameObjects.Graphics;
  private snow:Phaser.GameObjects.Graphics;
  constructor(private scene:Phaser.Scene){
    this.scenery=new AbyssScenery(scene);
    this.base=scene.add.graphics().setDepth(.05).fillStyle(0x081321).fillRect(0,0,WORLD.width,WORLD.height);
    this.backdrop=scene.add.graphics().setDepth(.1).setAlpha(.25);
    this.fog=scene.add.graphics().setDepth(.25);
    this.snow=scene.add.graphics().setDepth(10000);
    const g=this.backdrop;
    g.fillStyle(0x081321).fillRect(0,0,WORLD.width,WORLD.height);
    // Distant ice silhouettes, separated from the playable bridge by a dark gap.
    for(let layer=0;layer<3;layer++)for(const side of [-1,1])for(let u=-790;u<820;u+=28){
      const n=terrainNoise(u,layer+side*7);
      const p=bridgePoint(u,side*(halfWidth(BRIDGE,u)+130+layer*95));
      const w=45+n*65,h=75+n*145;
      g.fillStyle([0x142b3b,0x102333,0x0c1c2a][layer]);
      g.fillPoints([{x:p.x-w,y:p.y+30},{x:p.x-w*.5,y:p.y+12},{x:p.x+9,y:p.y-h*.3},{x:p.x+w*.7,y:p.y},{x:p.x+w*.45,y:p.y+h*.35},{x:p.x+12,y:p.y+h*1.6},{x:p.x-w*.32,y:p.y+h*.65}],true);
      g.fillStyle(0x315168,.12).fillTriangle(p.x+9,p.y-h*.3,p.x+w*.7,p.y,p.x+10,p.y+h*.5);
    }
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN,()=>{this.base.destroy();this.backdrop.destroy();this.fog.destroy();this.snow.destroy();});
  }
  update(time:number,enabled:boolean){
    this.scenery.update(this.scene.cameras.main,enabled);
    this.backdrop.setVisible(enabled);this.fog.setVisible(enabled);this.snow.setVisible(enabled);
    if(!enabled)return;
    const camera=this.scene.cameras.main, bounds=camera.worldView;
    const x=bounds.x,y=bounds.y,w=bounds.width,h=bounds.height;
    this.fog.clear();this.snow.clear();
    // Behind the opaque bridge surface: mist can never hide combat or range markers.
    for(let i=0;i<22;i++){
      const px=x+wrap(terrainNoise(i,1)*(w+420)+time*(5+i%3)-x*.12,w+420)-210;
      const py=y+wrap(terrainNoise(i,2)*(h+200)-y*.08+Math.sin(time*.12+i)*18,h+200)-100;
      for(let band=3;band>0;band--)this.fog.fillStyle(0x719eb5,.014).fillEllipse(px,py,180+band*65,12+band*18);
    }
    // Sparse layered flakes. Camera-relative wrapping avoids spawning across the whole map.
    for(let i=0;i<65;i++){
      const near=i%5===0,speed=near?25:12;
      const px=x+wrap(terrainNoise(i,5)*(w+40)-time*speed-x*(near?.16:.05),w+40)-20;
      const py=y+wrap(terrainNoise(i,9)*(h+40)+time*speed*.48-y*(near?.12:.04),h+40)-20;
      const size=near?2:1;
      this.snow.fillStyle(near?0xe3f6ff:0xa6c8dc,near?.42:.25).fillRect(Math.round(px),Math.round(py),size,size);
    }
  }
}
