import assert from 'node:assert/strict';
import {startServer} from '../server/server';
process.env.PORT='5188';
const host=await startServer();
try {
 const module=await (await fetch('http://127.0.0.1:5188/assets/map-concepts/howling-abyss-target-v1/01-overview.png?url&import')).text();
 const url=JSON.parse(module.match(/export default ("[^"]+")/)![1]);
 const response=await fetch(new URL(url,'http://127.0.0.1:5188'),{method:'HEAD'});
 assert.equal(response.headers.get('cache-control'),'public, max-age=31536000, immutable');
 console.log('PASS LAN server versioned media cache',url);
}finally{await host.close();}
