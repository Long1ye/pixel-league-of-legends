import { ThreeArena } from '/src/render-three/ThreeArena.ts';
import { PrototypeHost } from '/src/presentation/PrototypeHost.ts';
import { Match } from '/src/game/Match.ts';
import { bridgePoint } from '/src/game/Bridge.ts';
import { toThree } from '/src/render-three/Coordinates.ts';

const $ = id => document.getElementById(id), stage = $('stage');
let stopped = false, active;
const percentile = (values, q) => {
  const sorted = [...values].sort((a,b) => a-b);
  return sorted[Math.max(0, Math.ceil(sorted.length*q)-1)] ?? null;
};
function summary(values) {
  if (!values.length) return null;
  const total = values.reduce((a,b) => a+b,0), sorted = [...values].sort((a,b)=>b-a);
  const slowest = sorted.slice(0, Math.max(1, Math.ceil(sorted.length*.01)));
  return {frames:values.length, meanMs:total/values.length, fps:1000*values.length/total,
    p50:percentile(values,.5),p95:percentile(values,.95),p99:percentile(values,.99),max:Math.max(...values),
    low1:1000/(slowest.reduce((a,b)=>a+b,0)/slowest.length),
    over606:values.filter(x=>x>1000/165+.3).length,over167:values.filter(x=>x>1000/60+.3).length,over333:values.filter(x=>x>1000/30).length};
}
function matchFor(count) {
  const match = new Match({ai:false,waves:false,random:()=>.42});
  for (const team of ['blue','red']) Object.assign(match.hero(team),bridgePoint(team==='blue'?-76:76,-65),{hp:1e6,maxHp:1e6,damage:0});
  for (let i=0;i<count;i++) {
    const team = i<count/2?'blue':'red', local=i%(count/2), column=Math.floor(local/6), row=local%6;
    const point = bridgePoint((team==='blue'?-1:1)*(12+column*5), (row-2.5)*22);
    const unit=match.spawnMinion(team,local%6<3?'melee':'ranged',point);
    unit.hp=unit.maxHp=1e6;unit.damage=0;
  }
  return match;
}
function gpuTimer(view) {
  const gl=view.renderer.getContext(),ext=gl.getExtension('EXT_disjoint_timer_query_webgl2'),pending=[];
  let query=null;
  return {supported:!!ext, begin(enabled){if(ext&&enabled){query=gl.createQuery();gl.beginQuery(ext.TIME_ELAPSED_EXT,query);}},
    end(){if(query){gl.endQuery(ext.TIME_ELAPSED_EXT);pending.push(query);query=null;}},
    poll(out){if(!ext)return; const disjoint=gl.getParameter(ext.GPU_DISJOINT_EXT);
      while(pending.length&&gl.getQueryParameter(pending[0],gl.QUERY_RESULT_AVAILABLE)){
        const q=pending.shift(); if(!disjoint)out.push(gl.getQueryParameter(q,gl.QUERY_RESULT)/1e6);gl.deleteQuery(q);
      }},dispose(){for(const q of pending)gl.deleteQuery(q);}};
}
async function idleProbe() {
  stage.innerHTML='';const values=[];let last,start;
  await new Promise(resolve=>{function tick(now){if(start===undefined){start=last=now;}else{if(now-start>500)values.push(now-last);last=now;}
    if(stopped||now-start>3500)resolve();else requestAnimationFrame(tick);}requestAnimationFrame(tick);});
  return summary(values);
}
async function run(view,count,mode,round,report) {
  const host=new PrototypeHost(()=>matchFor(count),view),timer=gpuTimer(view),times=[],cpu=[],gpu=[],calls=[],visible=[];
  view.cameraRig.setElevation(45);view.cameraRig.setZoom(.6);view.cameraRig.lookAt(bridgePoint(0));view.centralOnly=false;
  let last,start,index=0,hiddenFrames=0;
  $('state').textContent=`${mode} · ${count} 小兵 · 第 ${round} 轮`;
  await new Promise(resolve=>{function tick(now){
    if(start===undefined)start=last=now;
    const elapsed=now-start,measuring=elapsed>=4000,dt=now-last;last=now;
    if(document.hidden)hiddenFrames++;
    if(measuring&&dt>0)times.push(dt);
    timer.begin(measuring&&index%8===0);const before=performance.now();host.update(dt/1000);const work=performance.now()-before;timer.end();timer.poll(gpu);
    if(measuring){cpu.push(work);calls.push(view.renderer.info.render.calls);
      if(index%30===0){const frustum=view.cameraRig.camera; visible.push(host.match.entities.filter(e=>e.kind==='melee'||e.kind==='ranged').filter(e=>{
        const p=toThree(e).project(frustum);return Math.abs(p.x)<1&&Math.abs(p.y)<1;}).length);}}
    index++;
    if(stopped||elapsed>=14000){resolve();return;} requestAnimationFrame(tick);
  }requestAnimationFrame(tick);});
  timer.poll(gpu);timer.dispose();
  const gl=view.renderer.getContext(),debug=gl.getExtension('WEBGL_debug_renderer_info');
  const row={mode,round,count,raf:summary(times),cpu:summary(cpu),gpu:summary(gpu),gpuTimer:timer.supported,
    drawCalls:percentile(calls,.5),minVisible:Math.min(...visible),maxVisible:Math.max(...visible),
    liveMinions:host.match.entities.filter(e=>(e.kind==='melee'||e.kind==='ranged')&&e.hp>0).length,
    attacks:host.match.entities.reduce((sum,e)=>sum+e.attacksReleased,0),hiddenFrames,
    antialias:gl.getContextAttributes().antialias,samples:gl.getParameter(gl.SAMPLES),
    renderer:debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),
    textureErrors:[...view.sprites.errors,...view.painted.errors,...view.landmarks.errors],
    renderSize:{width:view.renderer.domElement.width,height:view.renderer.domElement.height},cssSize:{width:stage.clientWidth,height:stage.clientHeight}};
  report.runs.push(row);host.dispose();active=null;render(report);
}
function render(report) {
  localStorage.setItem('three-performance-last',JSON.stringify(report));
  $('rows').innerHTML=report.runs.map(r=>`<tr><td>${r.mode} / ${r.count} / #${r.round}</td><td>${r.raf.fps.toFixed(1)}</td><td>${r.raf.low1.toFixed(1)}</td><td>${r.raf.p95.toFixed(2)}</td><td>${r.cpu.p95.toFixed(2)}</td><td>${r.gpu?.p95.toFixed(2)??'不可用'}</td><td>${r.raf.over167}</td></tr>`).join('');
  $('result').textContent=JSON.stringify(report,null,2);
}
const previous=localStorage.getItem('three-performance-last');
if(previous){try{const report=JSON.parse(previous);render(report);$('state').textContent=report.complete?'上次测试已完成':'上次测试记录（中断）';}catch{}}
$('stop').onclick=()=>{stopped=true;};
$('start').onclick=async()=>{
  $('start').disabled=true;stopped=false;
  const report={started:new Date().toISOString(),conditions:'1920x1080, fixed 45deg / zoom .6, full quality, fixed camera, real simulation/combat, zero damage to hold population, two rounds in reversed mode order; pre-optimization sampling reconstructed on current game code',runs:[]};
  try {
    $('state').textContent='浏览器空载刷新率校准';report.idle=await idleProbe();render(report);
    for(const round of [1,2])for(const mode of round===1?['优化前','优化后']:['优化后','优化前'])for(const count of [12,60,120]){
      if(stopped)break;
      stage.innerHTML='';const view=new ThreeArena(stage,{smoothSampling:mode==='优化后'});active=view;
      await run(view,count,mode,round,report);
    }
    report.complete=!stopped;report.finished=new Date().toISOString();$('state').textContent=stopped?'已停止':'测试完成';render(report);
  }catch(error){report.error=String(error);$('state').textContent='测试失败';render(report);active?.dispose();}
  finally{$('start').disabled=false;}
};
