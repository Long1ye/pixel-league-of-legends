import type Phaser from 'phaser';

/** Simulation-clock driven wind accents; never changes the projectile hit shape. */
export function drawStormVfx(g:Phaser.GameObjects.Graphics,x:number,y:number,vx:number,vy:number,age:number,remaining:number){
 const alpha=Math.min(1,Math.max(0,age)/.09,Math.max(0,remaining)/16);
 const length=Math.min(22,Math.max(0,age)*125);
 // Two tapered wake strands follow the real travel direction at any angle.
 for(let strand=0;strand<2;strand++){
  const points=[];
  for(let i=0;i<=12;i++){
   const t=i/12,side=Math.sin(t*7-age*15+strand*Math.PI)*3*(1-t);
   points.push({x:x-vx*length*t-vy*side,y:y-vy*length*t+vx*side-2});
  }
  g.lineStyle(1,0x87deef,alpha*.32).strokePoints(points,false);
 }
 g.lineStyle(1,0xb6faff,alpha*.35).strokeEllipse(x,y,19,6);
 // Sparse helical arcs: broad upper crown, narrow base, open gaps for readability.
 for(let band=0;band<3;band++){
  const radius=5+band*3.5,phase=age*13-band*1.65,points=[];
  for(let i=0;i<=16;i++){
   const a=phase+i/16*Math.PI*1.25;
   points.push({x:x+Math.cos(a)*radius,y:y-5-band*8+Math.sin(a)*radius*.32-i/16*2});
  }
  g.lineStyle(band===2?1.4:1,band===1?0x63d8ed:0xd3ffff,alpha*.56).strokePoints(points,false);
 }
 for(let i=0;i<6;i++){
  const phase=age*5+i*2.4,r=8+(i%3)*3,h=(age*19+i*5)%30;
  const px=x+Math.cos(phase)*r,py=y-h+Math.sin(phase)*2;
  g.lineStyle(1,i%2?0xc6faff:0x6bd8e8,alpha*.5).lineBetween(px,py,px-vx*2,py-vy*2-1);
 }
}
