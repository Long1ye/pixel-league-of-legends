import { chromium } from 'file:///C:/Users/PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage({viewport:{width:1600,height:960}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/docs/visual-validation/2026-10-19/wildlife/motion.html');
 await page.waitForFunction(()=>document.querySelector('video').readyState>=2);
 await page.evaluate(async()=>{const v=document.querySelector('video');v.loop=false;v.currentTime=0;v.playbackRate=8;await v.play()});
 await page.waitForFunction(()=>document.querySelector('video').ended,{},{timeout:15000});
 const result=await page.evaluate(()=>{const v=document.querySelector('video');return {duration:v.duration,width:v.videoWidth,height:v.videoHeight,ended:v.ended}});
 console.log(JSON.stringify({...result,errors}));
 if(!result.ended||errors.length)process.exitCode=1;
}finally{await browser.close()}
