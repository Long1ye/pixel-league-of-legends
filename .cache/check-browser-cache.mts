import { createServer } from 'vite';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const {chromium}=await import('file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
const server=await createServer({server:{port:5187,host:'127.0.0.1',strictPort:true}});await server.listen();
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const report=[];
 for(let pass=0;pass<2;pass++){
  if(pass)await page.reload();else await page.goto('http://127.0.0.1:5187/three.html?map=howling&scene=match');
  await page.locator('.start-play').waitFor();
  const rows=await page.evaluate(async()=>{
   const paths=['/assets/map-concepts/howling-abyss-target-v1/01-overview.png','/assets/heroes/yasuo/locomotion16-2026-10-15/runtime/walk-w.png','/assets/audio/yasuo-voice-zh-v1/runtime/1007830211.mp3'];
   const rows=[];
   for(const path of paths){
    const {default:url}=await import(path+'?url');
    const response=await fetch(url);await response.arrayBuffer();
    const entries=performance.getEntriesByName(new URL(url,location.href).href);
    const entry=entries.at(-1);
    rows.push({path,url,cacheControl:response.headers.get('cache-control'),transfer:entry?.transferSize,bytes:entry?.decodedBodySize});
   }
   return rows;
  });
  report.push(rows);
 }
 for(const row of report[1]){assert.equal(row.transfer,0,row.path+' should load from browser cache');assert(row.bytes>0);assert(row.cacheControl.includes('immutable'));}
 assert.deepEqual(errors,[]);
 await writeFile('.cache/browser-cache-report.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify({coldBytes:report[0].reduce((sum,r)=>sum+r.transfer,0),reloadBytes:report[1].reduce((sum,r)=>sum+r.transfer,0),resources:report[1].length,errors}));
}finally{await browser.close();await server.close();}
