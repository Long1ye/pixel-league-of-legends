import Phaser from 'phaser';
import brushUrl from '../../assets/map-modules/howling-brush-crystal-v2/brush.png?url';
import inhibitorUrl from '../../assets/map-modules/howling-brush-crystal-v2/inhibitor.png?url';
import redInhibitorUrl from '../../assets/map-modules/howling-red-team-v1/inhibitor.png?url';
import {BRIDGE,BRIDGE_SLOTS,bridgePoint} from '../game/Bridge';
import {actorDepth} from './RenderDepth';
import {BRIDGE_LIGHTS,brazierShear,bridgeLightPoint,lightKey} from './BridgeLights';
import {BRIDGE_SITE_ART,NEXUS_FOOT_ORIGIN_Y,SITE_ART_URLS,siteArtKey,siteArtPoint,type SiteArtKind} from './BridgeSiteArt';
import type {Point} from '../game/types';

const BRUSH_CROP={x:22,y:112,width:988,height:514};
const INHIBITOR_CROP={x:94,y:40,width:836,height:920};
// The solid stone base ends at source y=948, not at the crop's full height.
const INHIBITOR_FOOT_ORIGIN_Y=(948-INHIBITOR_CROP.y)/INHIBITOR_CROP.height;

/** Decorative sprites only. Brush concealment and inhibitor health are separate gameplay work. */
export class BridgeDecor {
 static preload(scene:Phaser.Scene){
  scene.load.image('bridge-frost-brush-source',brushUrl);
  scene.load.image('bridge-inhibitor-source',inhibitorUrl);
  scene.load.image('bridge-inhibitor-red-source',redInhibitorUrl);
  for(const [kind,url] of Object.entries(SITE_ART_URLS))scene.load.image(siteArtKey(kind as SiteArtKind),url);
 }

 private bushes:{image:Phaser.GameObjects.Image;phase:number;scaleX:number;scaleY:number;x:number;y:number}[]=[];
 private crystals:Phaser.GameObjects.Image[]=[];
 private foregroundFires:{image:Phaser.GameObjects.Image;key:string}[]=[];
 private siteViews:{image:Phaser.GameObjects.Image;kind:SiteArtKind;phase:number}[]=[];
 private foundationSeams:Phaser.GameObjects.Ellipse[]=[];

 constructor(private scene:Phaser.Scene){
  this.crop('bridge-frost-brush-source','bridge-frost-brush',BRUSH_CROP);
  this.crop('bridge-inhibitor-source','bridge-inhibitor',INHIBITOR_CROP);
  this.crop('bridge-inhibitor-red-source','bridge-inhibitor-red',INHIBITOR_CROP);
  for(const [index,brush] of BRIDGE.brush.entries()){
   const count=brush.length>=90?4:3;
   for(let i=0;i<count;i++){
    const offset=(i-(count-1)/2)*brush.length/(count+0.6);
    const p=bridgePoint(brush.u+offset,brush.v+(i%2?4:-4));
    const scaleX=(index===2?.19:.18)*(i%2?.96:1);
    const scaleY=scaleX*1.28;
    const image=scene.add.image(p.x,p.y,'bridge-frost-brush')
     .setOrigin(.5,.91).setScale(scaleX,scaleY).setDepth(actorDepth(p.y,-2))
     .setFlipX((i+index)%2===0).setTint(0xc4d2d8).setAlpha(.9);
    this.bushes.push({image,phase:index*1.7+i*.83,scaleX,scaleY,x:p.x,y:p.y});
   }
  }
  for(const slot of BRIDGE_SLOTS.filter(s=>s.id.endsWith('inhibitor'))){
   const p=bridgePoint(slot.u,slot.v);
   // The crystal's isometric stone footprint sits *behind* its frontmost toe.
   // Keep the ground seam under the masonry instead of casting it forward.
   const seam=scene.add.ellipse(p.x,p.y-20,97,43,0x07131e,.24).setDepth(.8);
   const image=scene.add.image(p.x,p.y,slot.team==='red'?'bridge-inhibitor-red':'bridge-inhibitor')
    .setOrigin(.5,INHIBITOR_FOOT_ORIGIN_Y).setScale(.115).setDepth(actorDepth(p.y));
   this.foundationSeams.push(seam);
   this.crystals.push(image);
  }
  for(const [index,site] of BRIDGE_SITE_ART.entries()){
   const p=siteArtPoint(site);
   const seam=scene.add.ellipse(p.x,p.y-site.size*.2,site.size*.96,site.size*.4,0x07131e,.22).setDepth(.8);
   const image=scene.add.image(p.x,p.y,siteArtKey(site.kind))
    .setOrigin(.5,NEXUS_FOOT_ORIGIN_Y).setScale(site.size/1024).setFlipX(site.flipX)
    .setDepth(actorDepth(p.y));
   image.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
   this.foundationSeams.push(seam);
   this.siteViews.push({image,kind:site.kind,phase:index*1.31});
  }
  // The central reeds project over the floor composite. Raise only the
  // fire/bowl, not its masonry rail bay, so the rail still joins cleanly.
  const source=scene.textures.get(lightKey('brazier')).getSourceImage() as HTMLImageElement;
  for(const [index,light] of BRIDGE_LIGHTS.filter(l=>l.kind==='brazier' && l.station<=70).entries()){
   const key=`bridge-foreground-fire-${index}`;
   const texture=scene.textures.createCanvas(key,192,192)!;
   const ctx=texture.getContext();
   const scale=light.width/source.naturalWidth;
   ctx.imageSmoothingEnabled=false;
   ctx.translate(96,96);
   ctx.transform(-scale,brazierShear(light)*scale,0,scale,0,0);
   // Source-space silhouette excludes both stone posts and rail arches.
   const outline=[
    [470,245],[525,260],[575,298],[610,350],[625,415],
    [625,470],[590,490],[580,540],[575,650],[545,686],
    [455,686],[415,650],[405,535],[385,475],[385,405],
    [405,355],[435,315],
   ];
   ctx.beginPath();
   outline.forEach(([x,y],i)=>i?ctx.lineTo(x-source.naturalWidth/2,y-source.naturalHeight*.78):ctx.moveTo(x-source.naturalWidth/2,y-source.naturalHeight*.78));
   ctx.closePath();ctx.clip();
   ctx.drawImage(source,-source.naturalWidth/2,-source.naturalHeight*.78);
   texture.refresh();texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
   const p=bridgeLightPoint(light);
   const image=scene.add.image(p.x,p.y,key).setOrigin(.5).setDepth(actorDepth(p.y,70));
   this.foregroundFires.push({image,key});
  }
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN,()=>{
   for(const b of this.bushes)b.image.destroy();
   for(const image of this.crystals)image.destroy();
   for(const {image} of this.siteViews)image.destroy();
   for(const seam of this.foundationSeams)seam.destroy();
   for(const {image,key} of this.foregroundFires){image.destroy();scene.textures.remove(key);}
   scene.textures.remove('bridge-frost-brush');scene.textures.remove('bridge-inhibitor');scene.textures.remove('bridge-inhibitor-red');
  });
 }

 private crop(sourceKey:string,targetKey:string,crop:{x:number;y:number;width:number;height:number}){
  const source=this.scene.textures.get(sourceKey).getSourceImage() as HTMLImageElement;
  const texture=this.scene.textures.createCanvas(targetKey,crop.width,crop.height)!;
  texture.getContext().drawImage(source,crop.x,crop.y,crop.width,crop.height,0,0,crop.width,crop.height);
  texture.refresh();texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
 }

 update(time:number,visible:boolean,animated:boolean,heroes:readonly Point[]=[]){
  const bounds=this.scene.cameras.main.worldView;
  for(const b of this.bushes){
   // Keep every tuft independent; cull the off-screen update without changing
   // collision or brush concealment. The generous margin includes its height.
   const inView=b.x>=bounds.left-220&&b.x<=bounds.right+220&&b.y>=bounds.top-220&&b.y<=bounds.bottom+220;
   b.image.setVisible(visible&&inView);
   if(!visible||!inView)continue;
   let nearby=0,lean=0;
   if(animated)for(const hero of heroes){
    const dx=b.x-hero.x,dy=b.y-hero.y;
    const influence=Math.max(0,1-Math.hypot(dx,dy)/115);
    if(influence>nearby){nearby=influence;lean=(dx>=0?1:-1)*influence;}
   }
   const wind=animated?Math.sin(time*.88+b.phase)*.022+Math.sin(time*.27+b.phase*.61)*.012:0;
   b.image.setRotation(wind+lean*.035);
   b.image.setScale(b.scaleX*(animated?1+Math.sin(time*1.08+b.phase)*.015:1),b.scaleY*(1-nearby*.025));
  }
  for(const [i,image] of this.crystals.entries()){
   image.setVisible(visible);
   if(visible)image.setAlpha(animated?.93+.035*Math.sin(time*1.45+i*1.8):.96);
  }
  for(const {image,phase} of this.siteViews){
   image.setVisible(visible);
   if(visible)image.setAlpha(animated?.95+.025*Math.sin(time*1.2+phase):1);
  }
  for(const seam of this.foundationSeams)seam.setVisible(visible);
  for(const {image} of this.foregroundFires)image.setVisible(visible);
 }
}
