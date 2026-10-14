import clips from '../../assets/units/minions-animated-v1/runtime/clips.json';
import {BALANCE} from '../game/config';
import type {Entity} from '../game/types';

export const MINION_CLIPS=clips;
export const MINION_URLS=import.meta.glob('../../assets/units/minions-animated-v1/runtime/*.png',{eager:true,query:'?url',import:'default'}) as Record<string,string>;

/** Presentation only. Damage and projectile release stay in Match. */
export function minionPose(unit:Entity,time:number,moving:boolean){
 const kind=unit.kind==='melee'?'melee':'ranged';
 const release=unit.attackReleasedAt;
 const attack=unit.hp>0&&!moving&&unit.attackStartedAt!==null&&(unit.windup>0||(release!==null&&time-release<.32));
 const action=attack?'attack':'walk';
 const key=`${unit.team}-${kind}-${action}` as keyof typeof clips;
 let frame=0;
 if(attack){
  frame=unit.windup>0?Math.min(3,Math.floor(Math.max(0,time-unit.attackStartedAt!)/BALANCE[kind].windup*4))
   :Math.min(7,4+Math.floor(Math.max(0,time-release!)/.32*4));
  // Generated blue caster frame 4 loses its crystal; hold the prior valid pose.
  if(unit.team==='blue'&&kind==='ranged'&&frame===4)frame=3;
 }else if(moving&&unit.hp>0)frame=Math.floor(time*10+unit.id%8)%8;
 const clip=clips[key],anchor=clip.anchors[frame];
 return {key:`minion-${key}`,frame,scale:clip.scale,originX:anchor[0]/clip.width,originY:anchor[1]/clip.height};
}
