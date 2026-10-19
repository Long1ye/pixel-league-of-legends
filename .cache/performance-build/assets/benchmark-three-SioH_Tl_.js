(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=1001,n=1002,r=1003,i=1004,a=1005,o=1006,s=1007,c=1008,l=1009,u=1010,d=1011,f=1012,p=1013,m=1014,h=1015,g=1016,_=1017,v=1018,y=1020,b=35902,x=35899,S=1021,C=1022,w=1023,T=1026,E=1027,D=1028,O=1029,k=1030,A=1031,ee=1033,j=33776,M=33777,N=33778,te=33779,P=35840,ne=35841,F=35842,re=35843,ie=36196,ae=37492,oe=37496,se=37488,I=37489,ce=37490,le=37491,ue=37808,de=37809,fe=37810,pe=37811,me=37812,he=37813,ge=37814,_e=37815,ve=37816,ye=37817,be=37818,xe=37819,Se=37820,Ce=37821,we=36492,Te=36494,Ee=36495,De=36283,Oe=36284,ke=36285,Ae=36286,je=2300,L=2301,Me=2302,Ne=2303,Pe=2400,R=2401,Fe=2402,z=3200,Ie=3201,Le=`srgb`,Re=`srgb-linear`,ze=`linear`,Be=`srgb`,Ve=7680,He=35044,Ue=35048,We=2e3;function Ge(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ke(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function qe(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Je(){let e=qe(`canvas`);return e.style.display=`block`,e}var Ye={};function Xe(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Ze(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function B(...e){e=Ze(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function V(...e){e=Ze(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Qe(...e){let t=e.join(` `);t in Ye||(Ye[t]=!0,B(...e))}function $e(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var et={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},tt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},nt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),rt=Math.PI/180,it=180/Math.PI;function at(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(nt[e&255]+nt[e>>8&255]+nt[e>>16&255]+nt[e>>24&255]+`-`+nt[t&255]+nt[t>>8&255]+`-`+nt[t>>16&15|64]+nt[t>>24&255]+`-`+nt[n&63|128]+nt[n>>8&255]+`-`+nt[n>>16&255]+nt[n>>24&255]+nt[r&255]+nt[r>>8&255]+nt[r>>16&255]+nt[r>>24&255]).toLowerCase()}function H(e,t,n){return Math.max(t,Math.min(n,e))}function ot(e,t){return(e%t+t)%t}function st(e,t,n){return(1-n)*e+n*t}function ct(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function lt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var U=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(H(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ut=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:B(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(H(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},W=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ft.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ft.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this.z=H(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this.z=H(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return dt.copy(this).projectOnVector(e),this.sub(dt)}reflect(e){return this.sub(dt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(H(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},dt=new W,ft=new ut,G=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Qe(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(pt.makeScale(e,t)),this}rotate(e){return Qe(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(pt.makeRotation(-e)),this}translate(e,t){return Qe(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(pt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},pt=new G,mt=new G().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ht=new G().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gt(){let e={enabled:!0,workingColorSpace:Re,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=vt(e.r),e.g=vt(e.g),e.b=vt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=yt(e.r),e.g=yt(e.g),e.b=yt(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?ze:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Qe(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Qe(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Re]:{primaries:t,whitePoint:r,transfer:ze,toXYZ:mt,fromXYZ:ht,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Le},outputColorSpaceConfig:{drawingBufferColorSpace:Le}},[Le]:{primaries:t,whitePoint:r,transfer:Be,toXYZ:mt,fromXYZ:ht,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Le}}}),e}var _t=gt();function vt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function yt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var bt,xt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{bt===void 0&&(bt=qe(`canvas`)),bt.width=e.width,bt.height=e.height;let t=bt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=bt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=qe(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=vt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(vt(t[e]/255)*255):t[e]=vt(t[e]);return{data:t,width:e.width,height:e.height}}return B(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},St=0,Ct=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:St++}),this.uuid=at(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(wt(r[t].image)):e.push(wt(r[t]))}else e=wt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function wt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?xt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(B(`Texture: Unable to serialize Texture.`),{})}var Tt=0,Et=new W,Dt=class r extends tt{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=t,a=t,s=o,u=c,d=w,f=l,p=r.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tt++}),this.uuid=at(),this.name=``,this.source=new Ct(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new U(0,0),this.repeat=new U(1,1),this.center=new U(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new G,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Et).x}get height(){return this.source.getSize(Et).y}get depth(){return this.source.getSize(Et).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){B(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?B(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Dt.DEFAULT_IMAGE=null,Dt.DEFAULT_MAPPING=300,Dt.DEFAULT_ANISOTROPY=1;var Ot=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this.z=H(this.z,e.z,t.z),this.w=H(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this.z=H(this.z,e,t),this.w=H(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},kt=class extends tt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:o,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ot(0,0,e,t),this.scissorTest=!1,this.viewport=new Ot(0,0,e,t),this.textures=[];let r=new Dt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:o,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ct(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},At=class extends kt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},jt=class extends Dt{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Mt=class extends Dt{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Nt=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Pt.setFromMatrixColumn(e,0).length(),i=1/Pt.setFromMatrixColumn(e,1).length(),a=1/Pt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(It,e,Lt)}lookAt(e,t,n){let r=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),Rt.crossVectors(n,Bt),Rt.lengthSq()===0&&(Math.abs(n.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),Rt.crossVectors(n,Bt)),Rt.normalize(),zt.crossVectors(Bt,Rt),r[0]=Rt.x,r[4]=zt.x,r[8]=Bt.x,r[1]=Rt.y,r[5]=zt.y,r[9]=Bt.y,r[2]=Rt.z,r[6]=zt.z,r[10]=Bt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],j=r[14],M=r[3],N=r[7],te=r[11],P=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*N,i[8]=a*C+o*D+s*ee+c*te,i[12]=a*w+o*O+s*j+c*P,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*N,i[9]=l*C+u*D+d*ee+f*te,i[13]=l*w+u*O+d*j+f*P,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*N,i[10]=p*C+m*D+h*ee+g*te,i[14]=p*w+m*O+h*j+g*P,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*N,i[11]=_*C+v*D+y*ee+b*te,i[15]=_*w+v*O+y*j+b*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Pt.set(r[0],r[1],r[2]).length(),o=Pt.set(r[4],r[5],r[6]).length(),s=Pt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Ft.copy(this);let c=1/a,l=1/o,u=1/s;return Ft.elements[0]*=c,Ft.elements[1]*=c,Ft.elements[2]*=c,Ft.elements[4]*=l,Ft.elements[5]*=l,Ft.elements[6]*=l,Ft.elements[8]*=u,Ft.elements[9]*=u,Ft.elements[10]*=u,t.setFromRotationMatrix(Ft),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=We,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=We,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Pt=new W,Ft=new Nt,It=new W(0,0,0),Lt=new W(1,1,1),Rt=new W,zt=new W,Bt=new W,Vt=new Nt,Ht=new ut,Ut=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(H(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-H(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(H(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-H(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(H(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-H(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:B(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Vt.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vt,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ht.setFromEuler(this),this.setFromQuaternion(Ht,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ut.DEFAULT_ORDER=`XYZ`;var Wt=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Gt=0,Kt=new W,qt=new ut,Jt=new Nt,Yt=new W,Xt=new W,Zt=new W,Qt=new ut,$t=new W(1,0,0),en=new W(0,1,0),tn=new W(0,0,1),nn={type:`added`},rn={type:`removed`},an={type:`childadded`,child:null},on={type:`childremoved`,child:null},sn=class e extends tt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gt++}),this.uuid=at(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new W,n=new Ut,r=new ut,i=new W(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Nt},normalMatrix:{value:new G}}),this.matrix=new Nt,this.matrixWorld=new Nt,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wt,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return qt.setFromAxisAngle(e,t),this.quaternion.multiply(qt),this}rotateOnWorldAxis(e,t){return qt.setFromAxisAngle(e,t),this.quaternion.premultiply(qt),this}rotateX(e){return this.rotateOnAxis($t,e)}rotateY(e){return this.rotateOnAxis(en,e)}rotateZ(e){return this.rotateOnAxis(tn,e)}translateOnAxis(e,t){return Kt.copy(e).applyQuaternion(this.quaternion),this.position.add(Kt.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($t,e)}translateY(e){return this.translateOnAxis(en,e)}translateZ(e){return this.translateOnAxis(tn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Yt.copy(e):Yt.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Xt.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jt.lookAt(Xt,Yt,this.up):Jt.lookAt(Yt,Xt,this.up),this.quaternion.setFromRotationMatrix(Jt),r&&(Jt.extractRotation(r.matrixWorld),qt.setFromRotationMatrix(Jt),this.quaternion.premultiply(qt.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(V(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nn),an.child=e,this.dispatchEvent(an),an.child=null):V(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(rn),on.child=e,this.dispatchEvent(on),on.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jt),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nn),an.child=e,this.dispatchEvent(an),an.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xt,e,Zt),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xt,Qt,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};sn.DEFAULT_UP=new W(0,1,0),sn.DEFAULT_MATRIX_AUTO_UPDATE=!0,sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var cn=class extends sn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},ln={type:`move`},un=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ln)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new cn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},dn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fn={h:0,s:0,l:0},pn={h:0,s:0,l:0};function mn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var K=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Le){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,_t.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=_t.workingColorSpace){return this.r=e,this.g=t,this.b=n,_t.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=_t.workingColorSpace){if(e=ot(e,1),t=H(t,0,1),n=H(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=mn(i,r,e+1/3),this.g=mn(i,r,e),this.b=mn(i,r,e-1/3)}return _t.colorSpaceToWorking(this,r),this}setStyle(e,t=Le){function n(t){t!==void 0&&parseFloat(t)<1&&B(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:B(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);B(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Le){let n=dn[e.toLowerCase()];return n===void 0?B(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=vt(e.r),this.g=vt(e.g),this.b=vt(e.b),this}copyLinearToSRGB(e){return this.r=yt(e.r),this.g=yt(e.g),this.b=yt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Le){return _t.workingToColorSpace(hn.copy(this),e),Math.round(H(hn.r*255,0,255))*65536+Math.round(H(hn.g*255,0,255))*256+Math.round(H(hn.b*255,0,255))}getHexString(e=Le){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=_t.workingColorSpace){_t.workingToColorSpace(hn.copy(this),t);let n=hn.r,r=hn.g,i=hn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=_t.workingColorSpace){return _t.workingToColorSpace(hn.copy(this),t),e.r=hn.r,e.g=hn.g,e.b=hn.b,e}getStyle(e=Le){_t.workingToColorSpace(hn.copy(this),e);let t=hn.r,n=hn.g,r=hn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(fn),this.setHSL(fn.h+e,fn.s+t,fn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(fn),e.getHSL(pn);let n=st(fn.h,pn.h,t),r=st(fn.s,pn.s,t),i=st(fn.l,pn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},hn=new K;K.NAMES=dn;var gn=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new K(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},_n=class extends sn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ut,this.environmentIntensity=1,this.environmentRotation=new Ut,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},vn=new W,yn=new W,bn=new W,xn=new W,Sn=new W,Cn=new W,wn=new W,Tn=new W,En=new W,Dn=new W,On=new Ot,kn=new Ot,An=new Ot,jn=class e{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),vn.subVectors(e,t),r.cross(vn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){vn.subVectors(r,t),yn.subVectors(n,t),bn.subVectors(e,t);let a=vn.dot(vn),o=vn.dot(yn),s=vn.dot(bn),c=yn.dot(yn),l=yn.dot(bn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,xn)!==null&&xn.x>=0&&xn.y>=0&&xn.x+xn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,xn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,xn.x),s.addScaledVector(a,xn.y),s.addScaledVector(o,xn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return On.setScalar(0),kn.setScalar(0),An.setScalar(0),On.fromBufferAttribute(e,t),kn.fromBufferAttribute(e,n),An.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(On,i.x),a.addScaledVector(kn,i.y),a.addScaledVector(An,i.z),a}static isFrontFacing(e,t,n,r){return vn.subVectors(n,t),yn.subVectors(e,t),vn.cross(yn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),vn.cross(yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Sn.subVectors(r,n),Cn.subVectors(i,n),Tn.subVectors(e,n);let s=Sn.dot(Tn),c=Cn.dot(Tn);if(s<=0&&c<=0)return t.copy(n);En.subVectors(e,r);let l=Sn.dot(En),u=Cn.dot(En);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Sn,a);Dn.subVectors(e,i);let f=Sn.dot(Dn),p=Cn.dot(Dn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Cn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return wn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(wn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Sn,a).addScaledVector(Cn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Mn=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Pn):Pn.fromBufferAttribute(r,t),Pn.applyMatrix4(e.matrixWorld),this.expandByPoint(Pn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Fn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Fn.copy(e.boundingBox)),Fn.applyMatrix4(e.matrixWorld),this.union(Fn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pn),Pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hn),Un.subVectors(this.max,Hn),In.subVectors(e.a,Hn),Ln.subVectors(e.b,Hn),Rn.subVectors(e.c,Hn),zn.subVectors(Ln,In),Bn.subVectors(Rn,Ln),Vn.subVectors(In,Rn);let t=[0,-zn.z,zn.y,0,-Bn.z,Bn.y,0,-Vn.z,Vn.y,zn.z,0,-zn.x,Bn.z,0,-Bn.x,Vn.z,0,-Vn.x,-zn.y,zn.x,0,-Bn.y,Bn.x,0,-Vn.y,Vn.x,0];return!Kn(t,In,Ln,Rn,Un)||(t=[1,0,0,0,1,0,0,0,1],!Kn(t,In,Ln,Rn,Un))?!1:(Wn.crossVectors(zn,Bn),t=[Wn.x,Wn.y,Wn.z],Kn(t,In,Ln,Rn,Un))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Nn=[new W,new W,new W,new W,new W,new W,new W,new W],Pn=new W,Fn=new Mn,In=new W,Ln=new W,Rn=new W,zn=new W,Bn=new W,Vn=new W,Hn=new W,Un=new W,Wn=new W,Gn=new W;function Kn(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Gn.fromArray(e,a);let o=i.x*Math.abs(Gn.x)+i.y*Math.abs(Gn.y)+i.z*Math.abs(Gn.z),s=t.dot(Gn),c=n.dot(Gn),l=r.dot(Gn);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var qn=new W,Jn=new U,Yn=0,q=class extends tt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yn++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=He,this.updateRanges=[],this.gpuType=h,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Jn.fromBufferAttribute(this,t),Jn.applyMatrix3(e),this.setXY(t,Jn.x,Jn.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)qn.fromBufferAttribute(this,t),qn.applyMatrix3(e),this.setXYZ(t,qn.x,qn.y,qn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)qn.fromBufferAttribute(this,t),qn.applyMatrix4(e),this.setXYZ(t,qn.x,qn.y,qn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)qn.fromBufferAttribute(this,t),qn.applyNormalMatrix(e),this.setXYZ(t,qn.x,qn.y,qn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)qn.fromBufferAttribute(this,t),qn.transformDirection(e),this.setXYZ(t,qn.x,qn.y,qn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ct(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ct(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ct(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ct(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ct(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array),i=lt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Xn=class extends q{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Zn=class extends q{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Qn=class extends q{constructor(e,t,n){super(new Float32Array(e),t,n)}},$n=new Mn,er=new W,tr=new W,nr=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?$n.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;er.subVectors(e,this.center);let t=er.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(er,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(tr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(er.copy(e.center).add(tr)),this.expandByPoint(er.copy(e.center).sub(tr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},rr=0,ir=new Nt,ar=new sn,or=new W,sr=new Mn,cr=new Mn,lr=new W,ur=class e extends tt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rr++}),this.uuid=at(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ge(e)?Zn:Xn)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new G().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return ir.makeRotationFromQuaternion(e),this.applyMatrix4(ir),this}rotateX(e){return ir.makeRotationX(e),this.applyMatrix4(ir),this}rotateY(e){return ir.makeRotationY(e),this.applyMatrix4(ir),this}rotateZ(e){return ir.makeRotationZ(e),this.applyMatrix4(ir),this}translate(e,t,n){return ir.makeTranslation(e,t,n),this.applyMatrix4(ir),this}scale(e,t,n){return ir.makeScale(e,t,n),this.applyMatrix4(ir),this}lookAt(e){return ar.lookAt(e),ar.updateMatrix(),this.applyMatrix4(ar.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(or).negate(),this.translate(or.x,or.y,or.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Qn(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&B(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)V(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];sr.setFromBufferAttribute(n),this.morphTargetsRelative?(lr.addVectors(this.boundingBox.min,sr.min),this.boundingBox.expandByPoint(lr),lr.addVectors(this.boundingBox.max,sr.max),this.boundingBox.expandByPoint(lr)):(this.boundingBox.expandByPoint(sr.min),this.boundingBox.expandByPoint(sr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&V(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)V(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new W,1/0);else if(e){let n=this.boundingSphere.center;if(sr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];cr.setFromBufferAttribute(n),this.morphTargetsRelative?(lr.addVectors(sr.min,cr.min),sr.expandByPoint(lr),lr.addVectors(sr.max,cr.max),sr.expandByPoint(lr)):(sr.expandByPoint(cr.min),sr.expandByPoint(cr.max))}sr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)lr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(lr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)lr.fromBufferAttribute(a,t),o&&(or.fromBufferAttribute(e,t),lr.add(or)),r=Math.max(r,n.distanceToSquared(lr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&V(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){V(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new q(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new W,s[e]=new W;let c=new W,l=new W,u=new W,d=new U,f=new U,p=new U,m=new W,h=new W;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new W,y=new W,b=new W,x=new W;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new q(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new W,i=new W,a=new W,o=new W,s=new W,c=new W,l=new W,u=new W;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)lr.fromBufferAttribute(e,t),lr.normalize(),e.setXYZ(t,lr.x,lr.y,lr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new q(a,r,i)}if(this.index===null)return B(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},dr=new W,fr=new W,pr=new G,mr=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=dr.subVectors(n,t).cross(fr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(dr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||pr.getNormalMatrix(e),r=this.coplanarPoint(dr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},hr=0,gr=class extends tt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hr++}),this.uuid=at(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new K(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ve,this.stencilZFail=Ve,this.stencilZPass=Ve,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){B(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?B(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new K().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new mr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new U().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new U().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},_r=new W,vr=new W,yr=new W,br=new W,xr=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_r)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=_r.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_r.copy(this.origin).addScaledVector(this.direction,t),_r.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){vr.copy(e).add(t).multiplyScalar(.5),yr.copy(t).sub(e).normalize(),br.copy(this.origin).sub(vr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(yr),o=br.dot(this.direction),s=-br.dot(yr),c=br.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(vr).addScaledVector(yr,d),f}intersectSphere(e,t){if(e.radius<0)return null;_r.subVectors(e.center,this.origin);let n=_r.dot(this.direction),r=_r.dot(_r)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,_r)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,ee,j,M;if(y>=b&&y>=x?(w=s,D=u,A=p,M=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,ee=_,j=v):(S=l,C=c,T=f,E=d,O=h,k=m,ee=v,j=_)):b>=x?(w=c,D=d,A=m,M=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,ee=v,j=g):(S=s,C=l,T=u,E=f,O=p,k=h,ee=g,j=v)):(w=l,D=f,A=h,M=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,ee=g,j=_):(S=c,C=s,T=d,E=u,O=m,k=p,ee=_,j=g)),w===0)return null;let N=S/w,te=C/w,P=1/w,ne=T-N*D,F=E-te*D,re=O-N*A,ie=k-te*A,ae=ee-N*M,oe=j-te*M,se=ae*ie-oe*re,I=ne*oe-F*ae,ce=re*F-ie*ne;if(r){if(se<0||I<0||ce<0)return null}else if((se<0||I<0||ce<0)&&(se>0||I>0||ce>0))return null;let le=se+I+ce;if(le===0)return null;let ue=P*(se*D+I*A+ce*M);return(le>0?ue<0:ue>0)?null:this.at(ue/le,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Sr=class extends gr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new K(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ut,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Cr=new Nt,wr=new xr,Tr=new nr,Er=new W,Dr=new W,Or=new W,kr=new W,Ar=new W,jr=new W,Mr=new W,Nr=new W,J=class extends sn{constructor(e=new ur,t=new Sr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){jr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Ar.fromBufferAttribute(s,e),a?jr.addScaledVector(Ar,r):jr.addScaledVector(Ar.sub(t),r))}t.add(jr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Tr.copy(n.boundingSphere),Tr.applyMatrix4(i),wr.copy(e.ray).recast(e.near),!(Tr.containsPoint(wr.origin)===!1&&(wr.intersectSphere(Tr,Er)===null||wr.origin.distanceToSquared(Er)>(e.far-e.near)**2))&&(Cr.copy(i).invert(),wr.copy(e.ray).applyMatrix4(Cr),(n.boundingBox===null||wr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,wr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Fr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Fr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Fr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Fr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Pr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Nr.copy(s),Nr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Nr);return l<n.near||l>n.far?null:{distance:l,point:Nr.clone(),object:e}}function Fr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Dr),e.getVertexPosition(c,Or),e.getVertexPosition(l,kr);let u=Pr(e,t,n,r,Dr,Or,kr,Mr);if(u){let e=new W;jn.getBarycoord(Mr,Dr,Or,kr,e),i&&(u.uv=jn.getInterpolatedAttribute(i,s,c,l,e,new U)),a&&(u.uv1=jn.getInterpolatedAttribute(a,s,c,l,e,new U)),o&&(u.normal=jn.getInterpolatedAttribute(o,s,c,l,e,new W),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new W,materialIndex:0};jn.getNormal(Dr,Or,kr,t.normal),u.face=t,u.barycoord=e}return u}var Ir=class extends Dt{constructor(e=null,t=1,n=1,i,a,o,s,c,l=r,u=r,d,f){super(null,o,s,c,l,u,i,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Lr=class extends q{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Rr=new Nt,zr=new Nt,Br=[],Vr=new Mn,Hr=new Nt,Ur=new J,Wr=new nr,Gr=class extends J{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Lr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Hr)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Mn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rr),Vr.copy(e.boundingBox).applyMatrix4(Rr),this.boundingBox.union(Vr)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new nr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rr),Wr.copy(e.boundingSphere).applyMatrix4(Rr),this.boundingSphere.union(Wr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Ur.geometry=this.geometry,Ur.material=this.material,Ur.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wr.copy(this.boundingSphere),Wr.applyMatrix4(n),e.ray.intersectsSphere(Wr)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Rr),zr.multiplyMatrices(n,Rr),Ur.matrixWorld=zr,Ur.raycast(e,Br);for(let e=0,n=Br.length;e<n;e++){let n=Br[e];n.instanceId=i,n.object=this,t.push(n)}Br.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Lr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ir(new Float32Array(r*this.count),r,this.count,D,h));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Kr=new nr,qr=new U(.5,.5),Jr=new W,Yr=class{constructor(e=new mr,t=new mr,n=new mr,r=new mr,i=new mr,a=new mr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=We,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kr)}intersectsSprite(e){return Kr.center.set(0,0,0),Kr.radius=.7071067811865476+qr.distanceTo(e.center),Kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Jr.x=r.normal.x>0?e.max.x:e.min.x,Jr.y=r.normal.y>0?e.max.y:e.min.y,Jr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Jr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Xr=class extends gr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new K(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Zr=new W,Qr=new W,$r=new Nt,ei=new xr,ti=new nr,ni=new W,ri=new W,ii=class extends sn{constructor(e=new ur,t=new Xr){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Zr.fromBufferAttribute(t,e-1),Qr.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Zr.distanceTo(Qr);e.setAttribute(`lineDistance`,new Qn(n,1))}else B(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ti.copy(n.boundingSphere),ti.applyMatrix4(r),ti.radius+=i,e.ray.intersectsSphere(ti)===!1)return;$r.copy(r).invert(),ei.copy(e.ray).applyMatrix4($r);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=ai(this,e,ei,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=ai(this,e,ei,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=ai(this,e,ei,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=ai(this,e,ei,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ai(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Zr.fromBufferAttribute(s,i),Qr.fromBufferAttribute(s,a),n.distanceSqToSegment(Zr,Qr,ni,ri)>r)return;ni.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(ni);if(!(c<t.near||c>t.far))return{distance:c,point:ri.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var oi=class extends gr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new K(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},si=new Nt,ci=new xr,li=new nr,ui=new W,di=class extends sn{constructor(e=new ur,t=new oi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),li.copy(n.boundingSphere),li.applyMatrix4(r),li.radius+=i,e.ray.intersectsSphere(li)===!1)return;si.copy(r).invert(),ci.copy(e.ray).applyMatrix4(si);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);ui.fromBufferAttribute(l,n),fi(ui,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)ui.fromBufferAttribute(l,a),fi(ui,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function fi(e,t,n,r,i,a,o){let s=ci.distanceSqToPoint(e);if(s<n){let n=new W;ci.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var pi=class extends Dt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},mi=class extends Dt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},hi=class extends Dt{constructor(e,t,n=m,i,a,o,s=r,c=r,l,u=T,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},i,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ct(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},gi=class extends hi{constructor(e,t=m,n=301,i,a,o=r,s=r,c,l=T){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},_i=class extends Dt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},vi=class e extends ur{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Qn(c,3)),this.setAttribute(`normal`,new Qn(l,3)),this.setAttribute(`uv`,new Qn(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new W;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},yi=class e extends ur{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Qn(u,3)),this.setAttribute(`normal`,new Qn(d,3)),this.setAttribute(`uv`,new Qn(f,2));function _(){let a=new W,_=new W,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new U,m=new W,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},bi=class e extends yi{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},xi=class e extends ur{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Qn(i,3)),this.setAttribute(`normal`,new Qn(i.slice(),3)),this.setAttribute(`uv`,new Qn(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new W,r=new W,i=new W;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new W;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new W;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new W,t=new W,n=new W,r=new W,o=new U,s=new U,c=new U;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Si=class e extends xi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ci=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){B(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new U:new W);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new W,r=[],i=[],a=[],o=new W,s=new Nt;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new W)}i[0]=new W,a[0]=new W;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(H(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(H(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},wi=class extends Ci{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new U){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ti=class extends wi{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Ei(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Di=new W,Oi=new W,ki=new Ei,Ai=new Ei,ji=new Ei,Mi=class extends Ci{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new W){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Oi.subVectors(r[0],r[1]).add(r[0]),c=Oi);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Di.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Di),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),ki.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Ai.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),ji.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(ki.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Ai.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),ji.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(ki.calc(s),Ai.calc(s),ji.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new W().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ni(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Pi(e,t){let n=1-e;return n*n*t}function Fi(e,t){return 2*(1-e)*e*t}function Ii(e,t){return e*e*t}function Li(e,t,n,r){return Pi(e,t)+Fi(e,n)+Ii(e,r)}function Ri(e,t){let n=1-e;return n*n*n*t}function zi(e,t){let n=1-e;return 3*n*n*e*t}function Bi(e,t){return 3*(1-e)*e*e*t}function Vi(e,t){return e*e*e*t}function Hi(e,t,n,r,i){return Ri(e,t)+zi(e,n)+Bi(e,r)+Vi(e,i)}var Ui=class extends Ci{constructor(e=new U,t=new U,n=new U,r=new U){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Hi(e,r.x,i.x,a.x,o.x),Hi(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Wi=class extends Ci{constructor(e=new W,t=new W,n=new W,r=new W){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Hi(e,r.x,i.x,a.x,o.x),Hi(e,r.y,i.y,a.y,o.y),Hi(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Gi=class extends Ci{constructor(e=new U,t=new U){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ki=class extends Ci{constructor(e=new W,t=new W){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new W){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new W){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},qi=class extends Ci{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Li(e,r.x,i.x,a.x),Li(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ji=class extends Ci{constructor(e=new W,t=new W,n=new W){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Li(e,r.x,i.x,a.x),Li(e,r.y,i.y,a.y),Li(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Yi=class extends Ci{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new U){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Ni(o,s.x,c.x,l.x,u.x),Ni(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new U().fromArray(n))}return this}},Xi=Object.freeze({__proto__:null,ArcCurve:Ti,CatmullRomCurve3:Mi,CubicBezierCurve:Ui,CubicBezierCurve3:Wi,EllipseCurve:wi,LineCurve:Gi,LineCurve3:Ki,QuadraticBezierCurve:qi,QuadraticBezierCurve3:Ji,SplineCurve:Yi}),Zi=class extends Ci{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new Xi[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new Xi[n.type]().fromJSON(n))}return this}},Qi=class extends Zi{constructor(e){super(),this.type=`Path`,this.currentPoint=new U,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Gi(this.currentPoint.clone(),new U(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new qi(this.currentPoint.clone(),new U(e,t),new U(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new Ui(this.currentPoint.clone(),new U(e,t),new U(n,r),new U(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new Yi([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new wi(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},$i=class extends Qi{constructor(e){super(e),this.uuid=at(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new Qi().fromJSON(n))}return this}};function ea(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=ta(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=ca(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return ra(a,o,n,s,c,l,0),o}function ta(e,t,n,r,i){let a;if(i===Ma(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=ka(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=ka(i/r|0,e[i],e[i+1],a);return a&&xa(a,a.next)&&(Aa(a),a=a.next),a}function na(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(xa(n,n.next)||ba(n.prev,n,n.next)===0)){if(Aa(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function ra(e,t,n,r,i,a,o){if(!e)return;!o&&a&&pa(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?aa(e,r,i,a):ia(e))t.push(c.i,e.i,l.i),Aa(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=oa(na(e),t),ra(e,t,n,r,i,a,2)):o===2&&sa(e,t,n,r,i,a):ra(na(e),t,n,r,i,a,1);break}}}function ia(e){let t=e.prev,n=e,r=e.next;if(ba(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&va(i,s,a,c,o,l,m.x,m.y)&&ba(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function aa(e,t,n,r){let i=e.prev,a=e,o=e.next;if(ba(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=ha(p,m,t,n,r),v=ha(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&va(s,u,c,d,l,f,y.x,y.y)&&ba(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&va(s,u,c,d,l,f,b.x,b.y)&&ba(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&va(s,u,c,d,l,f,y.x,y.y)&&ba(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&va(s,u,c,d,l,f,b.x,b.y)&&ba(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function oa(e,t){let n=e;do{let r=n.prev,i=n.next.next;!xa(r,i)&&Sa(r,n,n.next,i)&&Ea(r,i)&&Ea(i,r)&&(t.push(r.i,n.i,i.i),Aa(n),Aa(n.next),n=e=i),n=n.next}while(n!==e);return na(n)}function sa(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&ya(o,e)){let s=Oa(o,e);o=na(o,o.next),s=na(s,s.next),ra(o,t,n,r,i,a,0),ra(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function ca(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=ta(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(ga(o))}i.sort(la);for(let e=0;e<i.length;e++)n=ua(i[e],n);return n}function la(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function ua(e,t){let n=da(e,t);if(!n)return t;let r=Oa(n,e);return na(r,r.next),na(n,n.next)}function da(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(xa(e,n))return n;do{if(xa(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&_a(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Ea(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&fa(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function fa(e,t){return ba(e.prev,e,t.prev)<0&&ba(t.next,e,e.next)<0}function pa(e,t,n,r){let i=e;do i.z===0&&(i.z=ha(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,ma(i)}function ma(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function ha(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function ga(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function _a(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function va(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&_a(e,t,n,r,i,a,o,s)}function ya(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Ta(e,t)&&(Ea(e,t)&&Ea(t,e)&&Da(e,t)&&(ba(e.prev,e,t.prev)||ba(e,t.prev,t))||xa(e,t)&&ba(e.prev,e,e.next)>0&&ba(t.prev,t,t.next)>0)}function ba(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function xa(e,t){return e.x===t.x&&e.y===t.y}function Sa(e,t,n,r){let i=wa(ba(e,t,n)),a=wa(ba(e,t,r)),o=wa(ba(n,r,e)),s=wa(ba(n,r,t));return!!(i!==a&&o!==s||i===0&&Ca(e,n,t)||a===0&&Ca(e,r,t)||o===0&&Ca(n,e,r)||s===0&&Ca(n,t,r))}function Ca(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function wa(e){return e>0?1:e<0?-1:0}function Ta(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&Sa(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Ea(e,t){return ba(e.prev,e,e.next)<0?ba(e,t,e.next)>=0&&ba(e,e.prev,t)>=0:ba(e,t,e.prev)<0||ba(e,e.next,t)<0}function Da(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Oa(e,t){let n=ja(e.i,e.x,e.y),r=ja(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function ka(e,t,n,r){let i=ja(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Aa(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function ja(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ma(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Na=class{static triangulate(e,t,n=2){return ea(e,t,n)}},Pa=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Fa(e),Ia(n,e);let a=e.length;t.forEach(Fa);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,Ia(n,t[e]);let o=Na.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Fa(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Ia(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var La=class e extends ur{constructor(e=new $i([new U(.5,.5),new U(-.5,.5),new U(-.5,-.5),new U(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new Qn(r,3)),this.setAttribute(`uv`,new Qn(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?Ra:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new W,b=new W,x=new W}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!Pa.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];Pa.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));s<=10000000000000001e-36*c*c?(e.splice(r,1),n--):t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||V(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new U(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new U(r/a,i/a)}let ee=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),ee[e]=A(D[e],D[n],D[r]);let j=[],M,N=ee.concat();for(let e=0,t=E;e<t;e++){let t=w[e];M=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),M[e]=A(t[e],t[r],t[i]);j.push(M),N=N.concat(M)}let te;if(p===0)te=Pa.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],ee[t],a);ae(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];M=j[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],M[e],a);ae(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}te=Pa.triangulateShape(e,t)}let P=te.length,ne=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],N[e],ne):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),ae(x.x,x.y,x.z)):ae(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],N[t],ne):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),ae(x.x,x.y,x.z)):ae(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],ee[e],r);ae(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];M=j[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],M[e],r);_?ae(i.x,i.y+g[s-1].y,g[s-1].x+n):ae(i.x,i.y,c+n)}}}F(),re();function F(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<P;e++){let n=te[e];oe(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<P;e++){let n=te[e];oe(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<P;e++){let t=te[e];oe(t[2],t[1],t[0])}for(let e=0;e<P;e++){let t=te[e];oe(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function re(){let e=r.length/3,t=0;ie(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];ie(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function ie(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);se(t+r+n,t+i+n,t+i+a,t+r+a)}}}function ae(e,t,n){a.push(e),a.push(t),a.push(n)}function oe(e,t,i){I(e),I(t),I(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);ce(o[0]),ce(o[1]),ce(o[2])}function se(e,t,i,a){I(e),I(t),I(a),I(t),I(i),I(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);ce(s[0]),ce(s[1]),ce(s[3]),ce(s[1]),ce(s[2]),ce(s[3])}function I(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function ce(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return za(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Xi[i.type]().fromJSON(i)),new e(r,t.options)}},Ra={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new U(a,o),new U(s,c),new U(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new U(o,1-c),new U(l,1-d),new U(f,1-m),new U(h,1-_)]:[new U(s,1-c),new U(u,1-d),new U(p,1-m),new U(g,1-_)]}};function za(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var Ba=class e extends xi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Va=class e extends ur{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Qn(p,3)),this.setAttribute(`normal`,new Qn(m,3)),this.setAttribute(`uv`,new Qn(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Ha=class e extends ur{constructor(e=new $i([new U(0,.5),new U(-.5,-.5),new U(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new Qn(r,3)),this.setAttribute(`normal`,new Qn(i,3)),this.setAttribute(`uv`,new Qn(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;Pa.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];Pa.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=Pa.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Ua(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function Ua(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var Wa=class e extends ur{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new W,d=new W,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Qn(p,3)),this.setAttribute(`normal`,new Qn(m,3)),this.setAttribute(`uv`,new Qn(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Ga=class e extends ur{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new W,f=new W,p=new W;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new Qn(c,3)),this.setAttribute(`normal`,new Qn(l,3)),this.setAttribute(`uv`,new Qn(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},Ka=class extends gr{constructor(e){super(),this.isShadowMaterial=!0,this.type=`ShadowMaterial`,this.color=new K(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};function qa(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Ya(i))i.isRenderTargetTexture?(B(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Ya(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Ja(e){let t={};for(let n=0;n<e.length;n++){let r=qa(e[n]);for(let e in r)t[e]=r[e]}return t}function Ya(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Xa(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Za(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:_t.workingColorSpace}var Qa={clone:qa,merge:Ja},$a=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,eo=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,to=class extends gr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$a,this.fragmentShader=eo,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qa(e.uniforms),this.uniformsGroups=Xa(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new K().setHex(r.value);break;case`v2`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Ot().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Nt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},no=class extends to{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},ro=class extends gr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new K(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new K(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ut,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},io=class extends gr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new K(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new K(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ut,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ao=class extends gr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=z,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},oo=class extends gr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function so(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function co(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var lo=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},uo=class extends lo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pe,endingEnd:Pe}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case R:i=e,o=2*t-n;break;case Fe:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case R:a=e,s=2*n-t;break;case Fe:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},fo=class extends lo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},po=class extends lo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},mo=class extends lo{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=_o(n,t,g,y,r);i[p]=ho(x,o,_,b,m)}return i}};function ho(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function go(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function _o(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=ho(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=go(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var vo=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=so(t,this.TimeBufferType),this.values=so(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:so(e.times,Array),values:so(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),co(e.settings)&&(n.settings={inTangents:so(e.settings.inTangents,Array),outTangents:so(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new po(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new fo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new uo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new mo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case je:t=this.InterpolantFactoryMethodDiscrete;break;case L:t=this.InterpolantFactoryMethodLinear;break;case Me:t=this.InterpolantFactoryMethodSmooth;break;case Ne:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return B(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return je;case this.InterpolantFactoryMethodLinear:return L;case this.InterpolantFactoryMethodSmooth:return Me;case this.InterpolantFactoryMethodBezier:return Ne}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;co(this.settings)&&(yo(this.settings.inTangents,e),yo(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(V(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(V(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){V(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){V(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ke(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){V(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Me,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,co(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function yo(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}vo.prototype.ValueTypeName=``,vo.prototype.TimeBufferType=Float32Array,vo.prototype.ValueBufferType=Float32Array,vo.prototype.DefaultInterpolation=L;var bo=class extends vo{constructor(e,t,n){super(e,t,n)}};bo.prototype.ValueTypeName=`bool`,bo.prototype.ValueBufferType=Array,bo.prototype.DefaultInterpolation=je,bo.prototype.InterpolantFactoryMethodLinear=void 0,bo.prototype.InterpolantFactoryMethodSmooth=void 0;var xo=class extends vo{constructor(e,t,n,r){super(e,t,n,r)}};xo.prototype.ValueTypeName=`color`;var So=class extends vo{constructor(e,t,n,r){super(e,t,n,r)}};So.prototype.ValueTypeName=`number`;var Co=class extends lo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)ut.slerpFlat(i,0,a,c-o,a,c,s);return i}},wo=class extends vo{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Co(this.times,this.values,this.getValueSize(),e)}};wo.prototype.ValueTypeName=`quaternion`,wo.prototype.InterpolantFactoryMethodSmooth=void 0;var To=class extends vo{constructor(e,t,n){super(e,t,n)}};To.prototype.ValueTypeName=`string`,To.prototype.ValueBufferType=Array,To.prototype.DefaultInterpolation=je,To.prototype.InterpolantFactoryMethodLinear=void 0,To.prototype.InterpolantFactoryMethodSmooth=void 0;var Eo=class extends vo{constructor(e,t,n,r){super(e,t,n,r)}};Eo.prototype.ValueTypeName=`vector`;var Do={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(Oo(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!Oo(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Oo(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var ko=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Ao=class{constructor(e){this.manager=e===void 0?ko:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ao.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var jo=new WeakMap,Mo=class extends Ao{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Do.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=jo.get(a);e===void 0&&(e=[],jo.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=qe(`img`);function s(){l(),t&&t(this);let n=jo.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}jo.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Do.remove(`image:${e}`);let n=jo.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}jo.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Do.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},No=class extends Ao{constructor(e){super(e)}load(e,t,n,r){let i=new Dt,a=new Mo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Po=class extends sn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new K(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Fo=class extends Po{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new K(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Io=new Nt,Lo=new W,Ro=new W,zo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new U(512,512),this.mapType=l,this.map=null,this.mapPass=null,this.matrix=new Nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yr,this._frameExtents=new U(1,1),this._viewportCount=1,this._viewports=[new Ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Lo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Lo),Ro.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ro),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Io.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Io,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Io)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Bo=new W,Vo=new ut,Ho=new W,Uo=class extends sn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Nt,this.projectionMatrix=new Nt,this.projectionMatrixInverse=new Nt,this.coordinateSystem=We,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Bo,Vo,Ho),Ho.x===1&&Ho.y===1&&Ho.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Bo,Vo,Ho.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Bo,Vo,Ho),Ho.x===1&&Ho.y===1&&Ho.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Bo,Vo,Ho.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Wo=new W,Go=new U,Ko=new U,qo=class extends Uo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=it*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(rt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return it*2*Math.atan(Math.tan(rt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Wo.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Wo.x,Wo.y).multiplyScalar(-e/Wo.z),Wo.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wo.x,Wo.y).multiplyScalar(-e/Wo.z)}getViewSize(e,t){return this.getViewBounds(e,Go,Ko),t.subVectors(Ko,Go)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(rt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Jo=class extends zo{constructor(){super(new qo(90,1,.5,500)),this.isPointLightShadow=!0}},Yo=class extends Po{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Jo}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Xo=class extends Uo{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Zo=class extends zo{constructor(){super(new Xo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Qo=class extends Po{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.target=new sn,this.shadow=new Zo}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},$o=class extends Po{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},es=-90,ts=1,ns=class extends sn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new qo(es,ts,e,t);r.layers=this.layers,this.add(r);let i=new qo(es,ts,e,t);i.layers=this.layers,this.add(i);let a=new qo(es,ts,e,t);a.layers=this.layers,this.add(a);let o=new qo(es,ts,e,t);o.layers=this.layers,this.add(o);let s=new qo(es,ts,e,t);s.layers=this.layers,this.add(s);let c=new qo(es,ts,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},rs=class extends qo{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},is=`\\[\\]\\.:\\/`,as=RegExp(`[\\[\\]\\.:\\/]`,`g`),os=`[^\\[\\]\\.:\\/]`,ss=`[^`+is.replace(`\\.`,``)+`]`,cs=`((?:WC+[\\/:])*)`.replace(`WC`,os),ls=`(WCOD+)?`.replace(`WCOD`,ss),us=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,os),ds=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,os),fs=RegExp(`^`+cs+ls+us+ds+`$`),ps=[`material`,`materials`,`bones`,`map`],ms=class{constructor(e,t,n){let r=n||hs.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},hs=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(as,``)}static parseTrackName(e){let t=fs.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);ps.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){B(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){V(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){V(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){V(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){V(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){V(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;V(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};hs.Composite=ms,hs.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},hs.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},hs.prototype.GetterByBindingType=[hs.prototype._getValue_direct,hs.prototype._getValue_array,hs.prototype._getValue_arrayElement,hs.prototype._getValue_toArray],hs.prototype.SetterByBindingTypeAndVersioning=[[hs.prototype._setValue_direct,hs.prototype._setValue_direct_setNeedsUpdate,hs.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[hs.prototype._setValue_array,hs.prototype._setValue_array_setNeedsUpdate,hs.prototype._setValue_array_setMatrixWorldNeedsUpdate],[hs.prototype._setValue_arrayElement,hs.prototype._setValue_arrayElement_setNeedsUpdate,hs.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[hs.prototype._setValue_fromArray,hs.prototype._setValue_fromArray_setNeedsUpdate,hs.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var gs=new Nt,_s=class{constructor(e,t,n=0,r=1/0){this.ray=new xr(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Wt,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):V(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return gs.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gs),this}intersectObject(e,t=!0,n=[]){return ys(e,this,n,t),n.sort(vs),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)ys(e[r],this,n,t);return n.sort(vs),n}};function vs(e,t){return e.distance-t.distance}function ys(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)ys(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function bs(e,t,n,r){let i=xs(r);switch(n){case S:return e*t;case D:return e*t/i.components*i.byteLength;case O:return e*t/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case A:return e*t*2/i.components*i.byteLength;case C:return e*t*3/i.components*i.byteLength;case w:return e*t*4/i.components*i.byteLength;case ee:return e*t*4/i.components*i.byteLength;case j:case M:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case N:case te:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ne:case re:return Math.max(e,16)*Math.max(t,8)/4;case P:case F:return Math.max(e,8)*Math.max(t,8)/2;case ie:case ae:case se:case I:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case oe:case ce:case le:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ue:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case de:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case fe:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case pe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case me:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case he:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ge:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case _e:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ve:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ye:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case be:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case xe:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Se:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Ce:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case we:case Te:case Ee:return Math.ceil(e/4)*Math.ceil(t/4)*16;case De:case Oe:return Math.ceil(e/4)*Math.ceil(t/4)*8;case ke:case Ae:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function xs(e){switch(e){case l:case u:return{byteLength:1,components:1};case f:case d:case g:return{byteLength:2,components:1};case _:case v:return{byteLength:2,components:4};case m:case p:case h:return{byteLength:4,components:1};case b:case x:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?B(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function Ss(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Cs(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Y={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},X={common:{diffuse:{value:new K(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new G}},envmap:{envMap:{value:null},envMapRotation:{value:new G},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new G}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new G}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new G},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new G},normalScale:{value:new U(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new G},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new G}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new G}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new G}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new K(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new K(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0},uvTransform:{value:new G}},sprite:{diffuse:{value:new K(16777215)},opacity:{value:1},center:{value:new U(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}}},ws={basic:{uniforms:Ja([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:Y.meshbasic_vert,fragmentShader:Y.meshbasic_frag},lambert:{uniforms:Ja([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new K(0)},envMapIntensity:{value:1}}]),vertexShader:Y.meshlambert_vert,fragmentShader:Y.meshlambert_frag},phong:{uniforms:Ja([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new K(0)},specular:{value:new K(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Y.meshphong_vert,fragmentShader:Y.meshphong_frag},standard:{uniforms:Ja([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new K(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag},toon:{uniforms:Ja([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new K(0)}}]),vertexShader:Y.meshtoon_vert,fragmentShader:Y.meshtoon_frag},matcap:{uniforms:Ja([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:Y.meshmatcap_vert,fragmentShader:Y.meshmatcap_frag},points:{uniforms:Ja([X.points,X.fog]),vertexShader:Y.points_vert,fragmentShader:Y.points_frag},dashed:{uniforms:Ja([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Y.linedashed_vert,fragmentShader:Y.linedashed_frag},depth:{uniforms:Ja([X.common,X.displacementmap]),vertexShader:Y.depth_vert,fragmentShader:Y.depth_frag},normal:{uniforms:Ja([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:Y.meshnormal_vert,fragmentShader:Y.meshnormal_frag},sprite:{uniforms:Ja([X.sprite,X.fog]),vertexShader:Y.sprite_vert,fragmentShader:Y.sprite_frag},background:{uniforms:{uvTransform:{value:new G},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Y.background_vert,fragmentShader:Y.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new G}},vertexShader:Y.backgroundCube_vert,fragmentShader:Y.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Y.cube_vert,fragmentShader:Y.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Y.equirect_vert,fragmentShader:Y.equirect_frag},distance:{uniforms:Ja([X.common,X.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Y.distance_vert,fragmentShader:Y.distance_frag},shadow:{uniforms:Ja([X.lights,X.fog,{color:{value:new K(0)},opacity:{value:1}}]),vertexShader:Y.shadow_vert,fragmentShader:Y.shadow_frag}};ws.physical={uniforms:Ja([ws.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new G},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new G},clearcoatNormalScale:{value:new U(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new G},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new G},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new G},sheen:{value:0},sheenColor:{value:new K(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new G},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new G},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new G},transmissionSamplerSize:{value:new U},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new G},attenuationDistance:{value:0},attenuationColor:{value:new K(0)},specularColor:{value:new K(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new G},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new G},anisotropyVector:{value:new U},anisotropyMap:{value:null},anisotropyMapTransform:{value:new G}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag};var Ts={r:0,b:0,g:0},Es=new Nt,Ds=new G;Ds.set(-1,0,0,0,1,0,0,0,1);function Os(e,t,n,r,i,a){let o=new K(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new J(new vi(1,1,1),new to({name:`BackgroundCubeMaterial`,uniforms:qa(ws.backgroundCube.uniforms),vertexShader:ws.backgroundCube.vertexShader,fragmentShader:ws.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Es.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ds),l.material.toneMapped=_t.getTransfer(i.colorSpace)!==Be,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new J(new Va(2,2),new to({name:`BackgroundMaterial`,uniforms:qa(ws.background.uniforms),vertexShader:ws.background.vertexShader,fragmentShader:ws.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=_t.getTransfer(i.colorSpace)!==Be,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Ts,Za(e)),n.buffers.color.setClear(Ts.r,Ts.g,Ts.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function ks(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function As(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function js(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(B(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&B(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Ms(e){let t=this,n=null,r=0,i=!1,a=!1,o=new mr,s=new G,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Ns=4,Ps=6,Fs=20,Is=256,Ls=new Xo,Rs=new K,zs=null,Bs=0,Vs=0,Hs=!1,Us=new W,Ws=new W,Gs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Us}=i;zs=this._renderer.getRenderTarget(),Bs=this._renderer.getActiveCubeFace(),Vs=this._renderer.getActiveMipmapLevel(),Hs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zs(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(zs,Bs,Vs),this._renderer.xr.enabled=Hs,e.scissorTest=!1,Js(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zs=this._renderer.getRenderTarget(),Bs=this._renderer.getActiveCubeFace(),Vs=this._renderer.getActiveMipmapLevel(),Hs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:o,minFilter:o,generateMipmaps:!1,type:g,format:w,colorSpace:Re,depthBuffer:!1},r=qs(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qs(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ks(r)),this._blurMaterial=Xs(r,e,t),this._ggxMaterial=Ys(r,e,t)}return r}_compileMaterial(e){let t=new J(new ur,e);this._renderer.compile(t,Ls)}_sceneToCubeUV(e,t,n,r,i){let a=new qo(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Rs),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new J(new vi,new Sr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Rs),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Js(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qs()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zs());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Js(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Ls)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Ns?n-d+Ns:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Js(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Ls),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Js(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Ls)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Js(t,3*l*(r>this._lodMax-Ns?r-this._lodMax+Ns:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Ls)}};function Ks(e){let t=[],n=[],r=e,i=e-Ns+1+Ps;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Ws.set(1,r,n):e===1?Ws.set(-n,1,-r):e===2?Ws.set(-n,r,1):e===3?Ws.set(-1,r,-n):e===4?Ws.set(-n,-1,r):Ws.set(n,r,-1),Ws.toArray(l,(e*6+t)*3)}}let u=new ur;u.setAttribute(`position`,new q(c,3)),u.setAttribute(`outputDirection`,new q(l,3)),n.push(new J(u,null)),r>Ns&&r--}return{lodMeshes:n,sizeLods:t}}function qs(e,t,n){let r=new At(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Js(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Ys(e,t,n){return new to({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Is,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:$s(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Xs(e,t,n){return new to({name:`SphericalGaussianBlur`,defines:{SAMPLES:Fs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:$s(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Zs(){return new to({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:$s(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Qs(){return new to({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$s(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function $s(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var ec=class extends At{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new pi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new vi(5,5,5),i=new to({name:`CubemapFromEquirect`,uniforms:qa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new J(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=o),new ns(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function tc(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new ec(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Gs(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Gs(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function nc(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Qe(`WebGLRenderer: `+e+` extension not supported.`),t}}}function rc(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Zn:Xn)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function ic(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function ac(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:V(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function oc(e,t,n){let r=new WeakMap,i=new Ot;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let g=new Float32Array(p*m*4*u),_=new jt(g,p,m,u);_.type=h,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new U(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function sc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var cc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function lc(e,t,n,r,i,a){let o=new At(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new ur;l.setAttribute(`position`,new Qn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Qn([0,2,0,0,2,0],2));let u=new no({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new J(l,u),f=new Xo(-1,1,1,-1,0,1),p=null,m=null,h=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new At(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}),c=new At(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},_t.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=cc[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(d,f),v=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var uc=new Dt,dc=new hi(1,1),fc=new jt,pc=new Mt,mc=new pi,hc=[],gc=[],_c=new Float32Array(16),vc=new Float32Array(9),yc=new Float32Array(4);function bc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=hc[i];if(a===void 0&&(a=new Float32Array(i),hc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function xc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Sc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Cc(e,t){let n=gc[t];n===void 0&&(n=new Int32Array(t),gc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function wc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Tc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(xc(n,t))return;e.uniform2fv(this.addr,t),Sc(n,t)}}function Ec(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(xc(n,t))return;e.uniform3fv(this.addr,t),Sc(n,t)}}function Dc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(xc(n,t))return;e.uniform4fv(this.addr,t),Sc(n,t)}}function Oc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(xc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Sc(n,t)}else{if(xc(n,r))return;yc.set(r),e.uniformMatrix2fv(this.addr,!1,yc),Sc(n,r)}}function kc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(xc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Sc(n,t)}else{if(xc(n,r))return;vc.set(r),e.uniformMatrix3fv(this.addr,!1,vc),Sc(n,r)}}function Ac(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(xc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Sc(n,t)}else{if(xc(n,r))return;_c.set(r),e.uniformMatrix4fv(this.addr,!1,_c),Sc(n,r)}}function jc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Mc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(xc(n,t))return;e.uniform2iv(this.addr,t),Sc(n,t)}}function Nc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(xc(n,t))return;e.uniform3iv(this.addr,t),Sc(n,t)}}function Pc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(xc(n,t))return;e.uniform4iv(this.addr,t),Sc(n,t)}}function Fc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Ic(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(xc(n,t))return;e.uniform2uiv(this.addr,t),Sc(n,t)}}function Lc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(xc(n,t))return;e.uniform3uiv(this.addr,t),Sc(n,t)}}function Rc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(xc(n,t))return;e.uniform4uiv(this.addr,t),Sc(n,t)}}function zc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(dc.compareFunction=n.isReversedDepthBuffer()?518:515,a=dc):a=uc,n.setTexture2D(t||a,i)}function Bc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||pc,i)}function Vc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||mc,i)}function Hc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||fc,i)}function Uc(e){switch(e){case 5126:return wc;case 35664:return Tc;case 35665:return Ec;case 35666:return Dc;case 35674:return Oc;case 35675:return kc;case 35676:return Ac;case 5124:case 35670:return jc;case 35667:case 35671:return Mc;case 35668:case 35672:return Nc;case 35669:case 35673:return Pc;case 5125:return Fc;case 36294:return Ic;case 36295:return Lc;case 36296:return Rc;case 35678:case 36198:case 36298:case 36306:case 35682:return zc;case 35679:case 36299:case 36307:return Bc;case 35680:case 36300:case 36308:case 36293:return Vc;case 36289:case 36303:case 36311:case 36292:return Hc}}function Wc(e,t){e.uniform1fv(this.addr,t)}function Gc(e,t){let n=bc(t,this.size,2);e.uniform2fv(this.addr,n)}function Kc(e,t){let n=bc(t,this.size,3);e.uniform3fv(this.addr,n)}function qc(e,t){let n=bc(t,this.size,4);e.uniform4fv(this.addr,n)}function Jc(e,t){let n=bc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Yc(e,t){let n=bc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Xc(e,t){let n=bc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Zc(e,t){e.uniform1iv(this.addr,t)}function Qc(e,t){e.uniform2iv(this.addr,t)}function $c(e,t){e.uniform3iv(this.addr,t)}function el(e,t){e.uniform4iv(this.addr,t)}function tl(e,t){e.uniform1uiv(this.addr,t)}function nl(e,t){e.uniform2uiv(this.addr,t)}function rl(e,t){e.uniform3uiv(this.addr,t)}function il(e,t){e.uniform4uiv(this.addr,t)}function al(e,t,n){let r=this.cache,i=t.length,a=Cc(n,i);xc(r,a)||(e.uniform1iv(this.addr,a),Sc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?dc:uc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function ol(e,t,n){let r=this.cache,i=t.length,a=Cc(n,i);xc(r,a)||(e.uniform1iv(this.addr,a),Sc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||pc,a[e])}function sl(e,t,n){let r=this.cache,i=t.length,a=Cc(n,i);xc(r,a)||(e.uniform1iv(this.addr,a),Sc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||mc,a[e])}function cl(e,t,n){let r=this.cache,i=t.length,a=Cc(n,i);xc(r,a)||(e.uniform1iv(this.addr,a),Sc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||fc,a[e])}function ll(e){switch(e){case 5126:return Wc;case 35664:return Gc;case 35665:return Kc;case 35666:return qc;case 35674:return Jc;case 35675:return Yc;case 35676:return Xc;case 5124:case 35670:return Zc;case 35667:case 35671:return Qc;case 35668:case 35672:return $c;case 35669:case 35673:return el;case 5125:return tl;case 36294:return nl;case 36295:return rl;case 36296:return il;case 35678:case 36198:case 36298:case 36306:case 35682:return al;case 35679:case 36299:case 36307:return ol;case 35680:case 36300:case 36308:case 36293:return sl;case 36289:case 36303:case 36311:case 36292:return cl}}var ul=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Uc(t.type)}},dl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ll(t.type)}},fl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},pl=/(\w+)(\])?(\[|\.)?/g;function ml(e,t){e.seq.push(t),e.map[t.id]=t}function hl(e,t,n){let r=e.name,i=r.length;for(pl.lastIndex=0;;){let a=pl.exec(r),o=pl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){ml(n,l===void 0?new ul(s,e,t):new dl(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new fl(s),ml(n,e)),n=e}}}var gl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);hl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function _l(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var vl=37297,yl=0;function bl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var xl=new G;function Sl(e){_t._getMatrix(xl,_t.workingColorSpace,e);let t=`mat3( ${xl.elements.map(e=>e.toFixed(4))} )`;switch(_t.getTransfer(e)){case ze:return[t,`LinearTransferOETF`];case Be:return[t,`sRGBTransferOETF`];default:return B(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Cl(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+bl(e.getShaderSource(t),r)}return i}function wl(e,t){let n=Sl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Tl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function El(e,t){let n=Tl[t];return n===void 0?(B(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Dl=new W;function Ol(){return _t.getLuminanceCoefficients(Dl),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Dl.x.toFixed(4)}, ${Dl.y.toFixed(4)}, ${Dl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function kl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Ml).join(`
`)}function Al(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function jl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Ml(e){return e!==``}function Nl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Pl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Fl=/^[ \t]*#include +<([\w\d./]+)>/gm;function Il(e){return e.replace(Fl,Rl)}var Ll=new Map;function Rl(e,t){let n=Y[t];if(n===void 0){let e=Ll.get(t);if(e!==void 0)n=Y[e],B(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Il(n)}var zl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bl(e){return e.replace(zl,Vl)}function Vl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Hl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Ul={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Wl(e){return Ul[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Gl={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Kl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Gl[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var ql={302:`ENVMAP_MODE_REFRACTION`};function Jl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:ql[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Yl={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Xl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Yl[e.combine]||`ENVMAP_BLENDING_NONE`}function Zl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Ql(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Wl(n),l=Kl(n),u=Jl(n),d=Xl(n),f=Zl(n),p=kl(n),m=Al(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Ml).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Ml).join(`
`),_.length>0&&(_+=`
`)):(g=[Hl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Ml).join(`
`),_=[Hl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Y.tonemapping_pars_fragment,n.toneMapping===0?``:El(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Y.colorspace_pars_fragment,wl(`linearToOutputTexel`,n.outputColorSpace),Ol(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Ml).join(`
`)),o=Il(o),o=Nl(o,n),o=Pl(o,n),s=Il(s),s=Nl(s,n),s=Pl(s,n),o=Bl(o),s=Bl(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=_l(i,i.VERTEX_SHADER,y),S=_l(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Cl(i,x,`vertex`),n=Cl(i,S,`fragment`);V(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):B(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new gl(i,h),T=jl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,vl)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=yl++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var $l=0,eu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new tu(e),t.set(e,n)),n}},tu=class{constructor(e){this.id=$l++,this.code=e,this.usedTimes=0}};function nu(e){return e===1030||e===37490||e===36285}function ru(e,t,n,r,i,a){let o=new Wt,s=new eu,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&B(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=ws[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let ee=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=h.isInstancedMesh===!0,N=h.isBatchedMesh===!0,te=!!i.map,P=!!i.matcap,ne=!!x,F=!!i.aoMap,re=!!i.lightMap,ie=!!i.bumpMap&&i.wireframe===!1,ae=!!i.normalMap,oe=!!i.displacementMap,se=!!i.emissiveMap,I=!!i.metalnessMap,ce=!!i.roughnessMap,le=i.anisotropy>0,ue=i.clearcoat>0,de=i.dispersion>0,fe=i.retroreflectivity>0,pe=i.iridescence>0,me=i.sheen>0,he=i.transmission>0,ge=le&&!!i.anisotropyMap,_e=ue&&!!i.clearcoatMap,ve=ue&&!!i.clearcoatNormalMap,ye=ue&&!!i.clearcoatRoughnessMap,be=pe&&!!i.iridescenceMap,xe=pe&&!!i.iridescenceThicknessMap,Se=me&&!!i.sheenColorMap,Ce=me&&!!i.sheenRoughnessMap,we=!!i.specularMap,Te=!!i.specularColorMap,Ee=!!i.specularIntensityMap,De=he&&!!i.transmissionMap,Oe=he&&!!i.thicknessMap,ke=!!i.gradientMap,Ae=!!i.alphaMap,je=i.alphaTest>0,L=!!i.alphaHash,Me=!!i.extensions,Ne=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Ne=e.toneMapping);let Pe={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:N,batchingColor:N&&h._colorsTexture!==null,instancing:M,instancingColor:M&&h.instanceColor!==null,instancingMorph:M&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:_t.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:te,matcap:P,envMap:ne,envMapMode:ne&&x.mapping,envMapCubeUVHeight:S,aoMap:F,lightMap:re,bumpMap:ie,normalMap:ae,displacementMap:oe,emissiveMap:se,normalMapObjectSpace:ae&&i.normalMapType===1,normalMapTangentSpace:ae&&i.normalMapType===0,packedNormalMap:ae&&i.normalMapType===0&&nu(i.normalMap.format),metalnessMap:I,roughnessMap:ce,anisotropy:le,anisotropyMap:ge,clearcoat:ue,clearcoatMap:_e,clearcoatNormalMap:ve,clearcoatRoughnessMap:ye,dispersion:de,retroreflection:fe,iridescence:pe,iridescenceMap:be,iridescenceThicknessMap:xe,sheen:me,sheenColorMap:Se,sheenRoughnessMap:Ce,specularMap:we,specularColorMap:Te,specularIntensityMap:Ee,transmission:he,transmissionMap:De,thicknessMap:Oe,gradientMap:ke,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ae,alphaTest:je,alphaHash:L,combine:i.combine,mapUv:te&&m(i.map.channel),aoMapUv:F&&m(i.aoMap.channel),lightMapUv:re&&m(i.lightMap.channel),bumpMapUv:ie&&m(i.bumpMap.channel),normalMapUv:ae&&m(i.normalMap.channel),displacementMapUv:oe&&m(i.displacementMap.channel),emissiveMapUv:se&&m(i.emissiveMap.channel),metalnessMapUv:I&&m(i.metalnessMap.channel),roughnessMapUv:ce&&m(i.roughnessMap.channel),anisotropyMapUv:ge&&m(i.anisotropyMap.channel),clearcoatMapUv:_e&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ve&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&m(i.sheenRoughnessMap.channel),specularMapUv:we&&m(i.specularMap.channel),specularColorMapUv:Te&&m(i.specularColorMap.channel),specularIntensityMapUv:Ee&&m(i.specularIntensityMap.channel),transmissionMapUv:De&&m(i.transmissionMap.channel),thicknessMapUv:Oe&&m(i.thicknessMap.channel),alphaMapUv:Ae&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ae||le),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(te||Ae),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ae===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ne,decodeVideoTexture:te&&i.map.isVideoTexture===!0&&_t.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:se&&i.emissiveMap.isVideoTexture===!0&&_t.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Me&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Me&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=ws[t];n=Qa.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Ql(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function iu(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function au(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ou(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function su(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||au),r.length>1&&r.sort(t||ou),i.length>1&&i.sort(t||ou)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function cu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new su,e.set(t,[i])):n>=r.length?(i=new su,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function lu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new W,color:new K};break;case`SpotLight`:n={position:new W,direction:new W,color:new K,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new W,color:new K,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new W,skyColor:new K,groundColor:new K};break;case`RectAreaLight`:n={color:new K,position:new W,halfWidth:new W,halfHeight:new W}}return e[t.id]=n,n}}}function uu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var du=0;function fu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function pu(e){let t=new lu,n=uu(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new W);let i=new W,a=new Nt,o=new Nt;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(fu);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=du++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function mu(e){let t=new pu(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function hu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new mu(e),t.set(n,[a])):r>=i.length?(a=new mu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var gu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_u=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,vu=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],yu=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],bu=new Nt,xu=new W,Su=new W;function Cu(e,t,n){let i=new Yr,a=new U,s=new U,c=new Ot,l=new ao,u=new oo,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},_=new to({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new U},radius:{value:4}},vertexShader:gu,fragmentShader:_u}),v=_.clone();v.defines.HORIZONTAL_PASS=1;let y=new ur;y.setAttribute(`position`,new q(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new J(y,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(B(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.state;_.setBlending(0),_.buffers.depth.getReversed()===!0?_.buffers.color.setClear(0,0,0,0):_.buffers.color.setClear(1,1,1,1),_.buffers.depth.setTest(!0),_.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){B(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),s.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(s.x=Math.floor(f/y.x),a.x=s.x*y.x,p.mapSize.x=s.x),a.y>f&&(s.y=Math.floor(f/y.y),a.y=s.y*y.y,p.mapSize.y=s.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){B(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new At(a.x,a.y,{format:k,type:g,minFilter:o,magFilter:o,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new hi(a.x,a.y,h),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=T,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r}else d.isPointLight?(p.map=new ec(a.x),p.map.depthTexture=new gi(a.x,m)):(p.map=new At(a.x,a.y),p.map.depthTexture=new hi(a.x,a.y,m)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=T,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=o,p.map.depthTexture.magFilter=o):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==a.x||p.map.height!==a.y)&&p.map.setSize(a.x,a.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<x;t++){let r=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),xu.setFromMatrixPosition(d.matrixWorld),e.position.copy(xu),Su.copy(e.position),Su.add(vu[t]),e.up.copy(yu[t]),e.lookAt(Su),e.updateMatrixWorld(),n.makeTranslation(-xu.x,-xu.y,-xu.z),bu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(bu,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(s.x*n.x,s.y*n.y,s.x*n.z,s.y*n.w),_.viewport(c)}i=p.getFrustum(t),E(n,l,r,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);_.defines.VSM_SAMPLES!==n.blurSamples&&(_.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,_.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null?n.mapPass=new At(a.x,a.y,{format:k,type:g}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),_.uniforms.shadow_pass.value=n.map.depthTexture,_.uniforms.resolution.value.set(n.map.width,n.map.height),_.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,_,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function E(n,r,a,o,s){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(i))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),c=n.material;if(Array.isArray(c)){let t=i.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,r,a,i,t,u),e.renderBufferDirect(a,null,i,t,n,u),n.onAfterShadow(e,n,r,a,i,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)E(c[e],r,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function wu(e,t){function n(){let t=!1,n=new Ot,r=null,i=new Ot(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?I(e.DEPTH_TEST):ce(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=et[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?I(e.STENCIL_TEST):ce(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new K(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,j=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,N=0,te=e.getParameter(e.VERSION);te.indexOf(`WebGL`)===-1?te.indexOf(`OpenGL ES`)!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),M=N>=2):(N=parseFloat(/^WebGL (\d)/.exec(te)[1]),M=N>=1);let P=null,ne={},F=e.getParameter(e.SCISSOR_BOX),re=e.getParameter(e.VIEWPORT),ie=new Ot().fromArray(F),ae=new Ot().fromArray(re);function oe(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let se={};se[e.TEXTURE_2D]=oe(e.TEXTURE_2D,e.TEXTURE_2D,1),se[e.TEXTURE_CUBE_MAP]=oe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[e.TEXTURE_2D_ARRAY]=oe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),se[e.TEXTURE_3D]=oe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),I(e.DEPTH_TEST),o.setFunc(3),ge(!1),_e(1),I(e.CULL_FACE),me(0);function I(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ce(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function le(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ue(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return h!==t&&(e.useProgram(t),h=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function me(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ce(e.BLEND),g=!1);else if(g===!1&&(I(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:V(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:V(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:V(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:V(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(fe[n],fe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function he(t,n){t.side===2?ce(e.CULL_FACE):I(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ge(r),t.blending===1&&t.transparent===!1?me(0):me(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ye(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?I(e.SAMPLE_ALPHA_TO_COVERAGE):ce(e.SAMPLE_ALPHA_TO_COVERAGE)}function ge(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function _e(t){t===0?ce(e.CULL_FACE):(I(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ve(t){t!==k&&(M&&e.lineWidth(t),k=t)}function ye(t,n,r){t?(I(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ce(e.POLYGON_OFFSET_FILL)}function be(t){t?I(e.SCISSOR_TEST):ce(e.SCISSOR_TEST)}function xe(t){t===void 0&&(t=e.TEXTURE0+j-1),P!==t&&(e.activeTexture(t),P=t)}function Se(t,n,r){r===void 0&&(r=P===null?e.TEXTURE0+j-1:P);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(P!==r&&(e.activeTexture(r),P=r),e.bindTexture(t,n||se[t]),i.type=t,i.texture=n)}function Ce(){let t=ne[P];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function we(){try{e.compressedTexImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Te(){try{e.compressedTexImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ee(){try{e.texSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function De(){try{e.texSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Oe(){try{e.compressedTexSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function ke(){try{e.compressedTexSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ae(){try{e.texStorage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function je(){try{e.texStorage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function L(){try{e.texImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Me(){try{e.texImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ne(t){return d[t]===void 0?e.getParameter(t):d[t]}function Pe(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function R(t){ie.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ie.copy(t))}function Fe(t){ae.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ae.copy(t))}function z(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ie(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Le(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},P=null,ne={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new K(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,ie.set(0,0,e.canvas.width,e.canvas.height),ae.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:I,disable:ce,bindFramebuffer:le,drawBuffers:ue,useProgram:de,setBlending:me,setMaterial:he,setFlipSided:ge,setCullFace:_e,setLineWidth:ve,setPolygonOffset:ye,setScissorTest:be,activeTexture:xe,bindTexture:Se,unbindTexture:Ce,compressedTexImage2D:we,compressedTexImage3D:Te,texImage2D:L,texImage3D:Me,pixelStorei:Pe,getParameter:Ne,updateUBOMapping:z,uniformBlockBinding:Ie,texStorage2D:Ae,texStorage3D:je,texSubImage2D:Ee,texSubImage3D:De,compressedTexSubImage2D:Oe,compressedTexSubImage3D:ke,scissor:R,viewport:Fe,reset:Le}}function Tu(l,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new U,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):qe(`canvas`)}function T(e,t,n){let r=1,i=Ne(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),B(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&B(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function D(e){return e.generateMipmaps}function O(e){l.generateMipmap(e)}function k(e){return e.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?l.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?l.TEXTURE_2D_ARRAY:l.TEXTURE_2D}function A(e,t,n,r,i,a=!1){if(e!==null){if(l[e]!==void 0)return l[e];B(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let o;r&&(o=u.get(`EXT_texture_norm16`),o||B(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let s=t;if(t===l.RED&&(n===l.FLOAT&&(s=l.R32F),n===l.HALF_FLOAT&&(s=l.R16F),n===l.UNSIGNED_BYTE&&(s=l.R8),n===l.UNSIGNED_SHORT&&o&&(s=o.R16_EXT),n===l.SHORT&&o&&(s=o.R16_SNORM_EXT)),t===l.RED_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.R8UI),n===l.UNSIGNED_SHORT&&(s=l.R16UI),n===l.UNSIGNED_INT&&(s=l.R32UI),n===l.BYTE&&(s=l.R8I),n===l.SHORT&&(s=l.R16I),n===l.INT&&(s=l.R32I)),t===l.RG&&(n===l.FLOAT&&(s=l.RG32F),n===l.HALF_FLOAT&&(s=l.RG16F),n===l.UNSIGNED_BYTE&&(s=l.RG8),n===l.UNSIGNED_SHORT&&o&&(s=o.RG16_EXT),n===l.SHORT&&o&&(s=o.RG16_SNORM_EXT)),t===l.RG_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RG8UI),n===l.UNSIGNED_SHORT&&(s=l.RG16UI),n===l.UNSIGNED_INT&&(s=l.RG32UI),n===l.BYTE&&(s=l.RG8I),n===l.SHORT&&(s=l.RG16I),n===l.INT&&(s=l.RG32I)),t===l.RGB_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGB8UI),n===l.UNSIGNED_SHORT&&(s=l.RGB16UI),n===l.UNSIGNED_INT&&(s=l.RGB32UI),n===l.BYTE&&(s=l.RGB8I),n===l.SHORT&&(s=l.RGB16I),n===l.INT&&(s=l.RGB32I)),t===l.RGBA_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGBA8UI),n===l.UNSIGNED_SHORT&&(s=l.RGBA16UI),n===l.UNSIGNED_INT&&(s=l.RGBA32UI),n===l.BYTE&&(s=l.RGBA8I),n===l.SHORT&&(s=l.RGBA16I),n===l.INT&&(s=l.RGBA32I)),t===l.RGB&&(n===l.UNSIGNED_SHORT&&o&&(s=o.RGB16_EXT),n===l.SHORT&&o&&(s=o.RGB16_SNORM_EXT),n===l.UNSIGNED_INT_5_9_9_9_REV&&(s=l.RGB9_E5),n===l.UNSIGNED_INT_10F_11F_11F_REV&&(s=l.R11F_G11F_B10F)),t===l.RGBA){let e=a?ze:_t.getTransfer(i);n===l.FLOAT&&(s=l.RGBA32F),n===l.HALF_FLOAT&&(s=l.RGBA16F),n===l.UNSIGNED_BYTE&&(s=e===`srgb`?l.SRGB8_ALPHA8:l.RGBA8),n===l.UNSIGNED_SHORT&&o&&(s=o.RGBA16_EXT),n===l.SHORT&&o&&(s=o.RGBA16_SNORM_EXT),n===l.UNSIGNED_SHORT_4_4_4_4&&(s=l.RGBA4),n===l.UNSIGNED_SHORT_5_5_5_1&&(s=l.RGB5_A1)}return(s===l.R16F||s===l.R32F||s===l.RG16F||s===l.RG32F||s===l.RGBA16F||s===l.RGBA32F)&&u.get(`EXT_color_buffer_float`),s}function ee(e,t){let n;return e?t===null||t===1014||t===1020?n=l.DEPTH24_STENCIL8:t===1015?n=l.DEPTH32F_STENCIL8:t===1012&&(n=l.DEPTH24_STENCIL8,B(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=l.DEPTH_COMPONENT24:t===1015?n=l.DEPTH_COMPONENT32F:t===1012&&(n=l.DEPTH_COMPONENT16),n}function j(e,t){return D(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function M(e){let t=e.target;t.removeEventListener(`dispose`,M),te(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function N(e){let t=e.target;t.removeEventListener(`dispose`,N),ne(t)}function te(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&P(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function P(e){let t=f.get(e);l.deleteTexture(t.__webglTexture);let n=e.source,r=S.get(n);delete r[t.__cacheKey],h.memory.textures--}function ne(e){let t=f.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),f.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)l.deleteFramebuffer(t.__webglFramebuffer[e][n]);else l.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)l.deleteFramebuffer(t.__webglFramebuffer[e]);else l.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&l.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&l.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&l.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let n=e.textures;for(let e=0,t=n.length;e<t;e++){let t=f.get(n[e]);t.__webglTexture&&(l.deleteTexture(t.__webglTexture),h.memory.textures--),f.remove(n[e])}f.remove(e)}let F=0;function re(){F=0}function ie(){return F}function ae(e){F=e}function oe(){let e=F;return e>=p.maxTextures&&B(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),F+=1,e}function se(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function I(e,t){let n=f.get(e);if(e.isVideoTexture&&L(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)B(`WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)B(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ve(n,e,t);return}}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);d.bindTexture(l.TEXTURE_2D,n.__webglTexture,l.TEXTURE0+t)}function ce(e,t){let n=f.get(e);e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version?ve(n,e,t):(e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null),d.bindTexture(l.TEXTURE_2D_ARRAY,n.__webglTexture,l.TEXTURE0+t))}function le(e,t){let n=f.get(e);e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version?ve(n,e,t):d.bindTexture(l.TEXTURE_3D,n.__webglTexture,l.TEXTURE0+t)}function ue(e,t){let n=f.get(e);e.isCubeDepthTexture!==!0&&e.version>0&&n.__version!==e.version?ye(n,e,t):d.bindTexture(l.TEXTURE_CUBE_MAP,n.__webglTexture,l.TEXTURE0+t)}let de={[e]:l.REPEAT,[t]:l.CLAMP_TO_EDGE,[n]:l.MIRRORED_REPEAT},fe={[r]:l.NEAREST,[i]:l.NEAREST_MIPMAP_NEAREST,[a]:l.NEAREST_MIPMAP_LINEAR,[o]:l.LINEAR,[s]:l.LINEAR_MIPMAP_NEAREST,[c]:l.LINEAR_MIPMAP_LINEAR},pe={512:l.NEVER,519:l.ALWAYS,513:l.LESS,515:l.LEQUAL,514:l.EQUAL,518:l.GEQUAL,516:l.GREATER,517:l.NOTEQUAL};function me(e,t){if(t.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&B(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),l.texParameteri(e,l.TEXTURE_WRAP_S,de[t.wrapS]),l.texParameteri(e,l.TEXTURE_WRAP_T,de[t.wrapT]),(e===l.TEXTURE_3D||e===l.TEXTURE_2D_ARRAY)&&l.texParameteri(e,l.TEXTURE_WRAP_R,de[t.wrapR]),l.texParameteri(e,l.TEXTURE_MAG_FILTER,fe[t.magFilter]),l.texParameteri(e,l.TEXTURE_MIN_FILTER,fe[t.minFilter]),t.compareFunction&&(l.texParameteri(e,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(e,l.TEXTURE_COMPARE_FUNC,pe[t.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||f.get(t).__currentAnisotropy){let n=u.get(`EXT_texture_filter_anisotropic`);l.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,p.getMaxAnisotropy())),f.get(t).__currentAnisotropy=t.anisotropy}}}function he(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,M));let r=t.source,i=S.get(r);i===void 0&&(i={},S.set(r,i));let a=se(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:l.createTexture(),usedTimes:0},h.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&P(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function ge(e,t,n){return Math.floor(Math.floor(e/n)/t)}function _e(e,t,n,r){let i=e.updateRanges;if(i.length===0)d.texSubImage2D(l.TEXTURE_2D,0,0,0,t.width,t.height,n,r,t.data);else{i.sort((e,t)=>e.start-t.start);let a=0;for(let e=1;e<i.length;e++){let n=i[a],r=i[e],o=n.start+n.count,s=ge(r.start,t.width,4),c=ge(n.start,t.width,4);r.start<=o+1&&s===c&&ge(r.start+r.count-1,t.width,4)===s?n.count=Math.max(n.count,r.start+r.count-n.start):(++a,i[a]=r)}i.length=a+1;let o=d.getParameter(l.UNPACK_ROW_LENGTH),s=d.getParameter(l.UNPACK_SKIP_PIXELS),c=d.getParameter(l.UNPACK_SKIP_ROWS);d.pixelStorei(l.UNPACK_ROW_LENGTH,t.width);for(let e=0,a=i.length;e<a;e++){let a=i[e],o=Math.floor(a.start/4),s=Math.ceil(a.count/4),c=o%t.width,u=Math.floor(o/t.width),f=s;d.pixelStorei(l.UNPACK_SKIP_PIXELS,c),d.pixelStorei(l.UNPACK_SKIP_ROWS,u),d.texSubImage2D(l.TEXTURE_2D,0,c,u,f,1,n,r,t.data)}e.clearUpdateRanges(),d.pixelStorei(l.UNPACK_ROW_LENGTH,o),d.pixelStorei(l.UNPACK_SKIP_PIXELS,s),d.pixelStorei(l.UNPACK_SKIP_ROWS,c)}}function ve(e,t,n){let r=l.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=l.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=l.TEXTURE_3D);let i=he(e,t),a=t.source;d.bindTexture(r,e.__webglTexture,l.TEXTURE0+n);let o=f.get(a);if(a.version!==o.__version||i===!0){if(d.activeTexture(l.TEXTURE0+n),!(typeof ImageBitmap<`u`&&t.image instanceof ImageBitmap)){let e=_t.getPrimaries(_t.workingColorSpace),n=t.colorSpace===``?null:_t.getPrimaries(t.colorSpace),r=t.colorSpace===``||e===n?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,r)}d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment);let e=T(t.image,!1,p.maxTextureSize);e=Me(t,e);let s=m.convert(t.format,t.colorSpace),c=m.convert(t.type),u=A(t.internalFormat,s,c,t.normalized,t.colorSpace,t.isVideoTexture);me(r,t);let f,h=t.mipmaps,g=t.isVideoTexture!==!0,_=o.__version===void 0||i===!0,v=a.dataReady,y=j(t,e);if(t.isDepthTexture)u=ee(t.format===E,t.type),_&&(g?d.texStorage2D(l.TEXTURE_2D,1,u,e.width,e.height):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,null));else if(t.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data);t.generateMipmaps=!1}else g?(_&&d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height),v&&_e(t,e,s,c)):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,e.data)}else if(t.isCompressedTexture){if(t.isCompressedArrayTexture){g&&_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,e.depth);for(let n=0,r=h.length;n<r;n++)if(f=h[n],t.format!==1023){if(s!==null){if(g){if(v){if(t.layerUpdates.size>0){let e=bs(f.width,f.height,t.format,t.type);for(let r of t.layerUpdates){let t=f.data.subarray(r*e/f.data.BYTES_PER_ELEMENT,(r+1)*e/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,r,f.width,f.height,1,s,t)}}else d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,f.data)}}else d.compressedTexImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,f.data,0,0)}else B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,c,f.data):d.texImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,s,c,f.data);t.layerUpdates.size>0&&t.clearLayerUpdates()}else{g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,n=h.length;e<n;e++)f=h[e],t.format===1023?g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data):s===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,f.data):d.compressedTexImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,f.data)}}else if(t.isDataArrayTexture){if(g){if(_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,e.width,e.height,e.depth),v){if(t.layerUpdates.size>0){let n=bs(e.width,e.height,t.format,t.type);for(let r of t.layerUpdates){let t=e.data.subarray(r*n/e.data.BYTES_PER_ELEMENT,(r+1)*n/e.data.BYTES_PER_ELEMENT);d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,r,e.width,e.height,1,s,c,t)}t.clearLayerUpdates()}else d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)}}else d.texImage3D(l.TEXTURE_2D_ARRAY,0,u,e.width,e.height,e.depth,0,s,c,e.data)}else if(t.isData3DTexture)g?(_&&d.texStorage3D(l.TEXTURE_3D,y,u,e.width,e.height,e.depth),v&&d.texSubImage3D(l.TEXTURE_3D,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)):d.texImage3D(l.TEXTURE_3D,0,u,e.width,e.height,e.depth,0,s,c,e.data);else if(t.isFramebufferTexture){if(_){if(g)d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height);else{let t=e.width,n=e.height;for(let e=0;e<y;e++)d.texImage2D(l.TEXTURE_2D,e,u,t,n,0,s,c,null),t>>=1,n>>=1}}}else if(t.isHTMLTexture){if(`texElementImage2D`in l){let n=l.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),e.parentNode!==n){n.appendChild(e),b.add(t),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(l.texElementImage2D.length===3)l.texElementImage2D(l.TEXTURE_2D,l.RGBA8,e);else{let t=l.RGBA,n=l.RGBA,r=l.UNSIGNED_BYTE;l.texElementImage2D(l.TEXTURE_2D,0,t,n,r,e)}l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,l.LINEAR),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let e=Ne(h[0]);d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height)}for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,s,c,f):d.texImage2D(l.TEXTURE_2D,e,u,s,c,f);t.generateMipmaps=!1}else if(g){if(_){let t=Ne(e);d.texStorage2D(l.TEXTURE_2D,y,u,t.width,t.height)}v&&d.texSubImage2D(l.TEXTURE_2D,0,0,0,s,c,e)}else d.texImage2D(l.TEXTURE_2D,0,u,s,c,e);D(t)&&O(r),o.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function ye(e,t,n){if(t.image.length!==6)return;let r=he(e,t),i=t.source;d.bindTexture(l.TEXTURE_CUBE_MAP,e.__webglTexture,l.TEXTURE0+n);let a=f.get(i);if(i.version!==a.__version||r===!0){d.activeTexture(l.TEXTURE0+n);let e=_t.getPrimaries(_t.workingColorSpace),o=t.colorSpace===``?null:_t.getPrimaries(t.colorSpace),s=t.colorSpace===``||e===o?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let c=t.isCompressedTexture||t.image[0].isCompressedTexture,u=t.image[0]&&t.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!c&&!u?f[e]=T(t.image[e],!0,p.maxCubemapSize):f[e]=u?t.image[e].image:t.image[e],f[e]=Me(t,f[e]);let h=f[0],g=m.convert(t.format,t.colorSpace),_=m.convert(t.type),v=A(t.internalFormat,g,_,t.normalized,t.colorSpace),y=t.isVideoTexture!==!0,b=a.__version===void 0||r===!0,x=i.dataReady,S=j(t,h);me(l.TEXTURE_CUBE_MAP,t);let C;if(c){y&&b&&d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let e=0;e<6;e++){C=f[e].mipmaps;for(let n=0;n<C.length;n++){let r=C[n];t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,_,r.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,g,_,r.data):g===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,r.data):d.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,r.data)}}}else{if(C=t.mipmaps,y&&b){C.length>0&&S++;let e=Ne(f[0]);d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,e.width,e.height)}for(let e=0;e<6;e++)if(u){y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,f[e].width,f[e].height,g,_,f[e].data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,f[e].width,f[e].height,0,g,_,f[e].data);for(let t=0;t<C.length;t++){let n=C[t].image[e].image;y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,g,_,n.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,n.width,n.height,0,g,_,n.data)}}else{y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,_,f[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,g,_,f[e]);for(let t=0;t<C.length;t++){let n=C[t];y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,g,_,n.image[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,g,_,n.image[e])}}}D(t)&&O(l.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function be(e,t,n,r,i,a){let o=m.convert(n.format,n.colorSpace),s=m.convert(n.type),c=A(n.internalFormat,o,s,n.normalized,n.colorSpace),u=f.get(t),p=f.get(n);if(p.__renderTarget=t,!u.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===l.TEXTURE_3D||i===l.TEXTURE_2D_ARRAY?d.texImage3D(i,a,c,e,n,t.depth,0,o,s,null):d.texImage2D(i,a,c,e,n,0,o,s,null)}d.bindFramebuffer(l.FRAMEBUFFER,e),je(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,r,i,p.__webglTexture,0,Ae(t)):(i===l.TEXTURE_2D||i>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,r,i,p.__webglTexture,a),d.bindFramebuffer(l.FRAMEBUFFER,null)}function xe(e,t,n){if(l.bindRenderbuffer(l.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=ee(t.stencilBuffer,i),o=t.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;je(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Ae(t),a,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Ae(t),a,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,a,t.width,t.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,o,l.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=m.convert(i.format,i.colorSpace),o=m.convert(i.type),s=A(i.internalFormat,a,o,i.normalized,i.colorSpace);je(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Ae(t),s,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Ae(t),s,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,s,t.width,t.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function Se(e,t,n){let r=t.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(l.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let i=f.get(t.depthTexture);if(i.__renderTarget=t,(!i.__webglTexture||t.depthTexture.image.width!==t.width||t.depthTexture.image.height!==t.height)&&(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),r){if(i.__webglInit===void 0&&(i.__webglInit=!0,t.depthTexture.addEventListener(`dispose`,M)),i.__webglTexture===void 0){i.__webglTexture=l.createTexture(),d.bindTexture(l.TEXTURE_CUBE_MAP,i.__webglTexture),me(l.TEXTURE_CUBE_MAP,t.depthTexture);let e=m.convert(t.depthTexture.format),n=m.convert(t.depthTexture.type),r;t.depthTexture.format===1026?r=l.DEPTH_COMPONENT24:t.depthTexture.format===1027&&(r=l.DEPTH24_STENCIL8);for(let i=0;i<6;i++)l.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,r,t.width,t.height,0,e,n,null)}}else I(t.depthTexture,0);let a=i.__webglTexture,o=Ae(t),s=r?l.TEXTURE_CUBE_MAP_POSITIVE_X+n:l.TEXTURE_2D,c=t.depthTexture.format===1027?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;if(t.depthTexture.format===1026)je(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else if(t.depthTexture.format===1027)je(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ce(e){let t=f.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)for(let n=0;n<6;n++)Se(t.__webglFramebuffer[n],e,n);else{let n=e.texture.mipmaps;n&&n.length>0?Se(t.__webglFramebuffer[0],e,0):Se(t.__webglFramebuffer,e,0)}}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=l.createRenderbuffer(),xe(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];l.bindRenderbuffer(l.RENDERBUFFER,i),l.framebufferRenderbuffer(l.FRAMEBUFFER,r,l.RENDERBUFFER,i)}}else{let n=e.texture.mipmaps;if(n&&n.length>0?d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[0]):d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=l.createRenderbuffer(),xe(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;l.bindRenderbuffer(l.RENDERBUFFER,r),l.framebufferRenderbuffer(l.FRAMEBUFFER,n,l.RENDERBUFFER,r)}}d.bindFramebuffer(l.FRAMEBUFFER,null)}function we(e,t,n){let r=f.get(e);t!==void 0&&be(r.__webglFramebuffer,e,e.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),n!==void 0&&Ce(e)}function Te(e){let t=e.texture,n=f.get(e),r=f.get(t);e.addEventListener(`dispose`,N);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,o=i.length>1;if(o||(r.__webglTexture===void 0&&(r.__webglTexture=l.createTexture()),r.__version=t.version,h.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=l.createFramebuffer()}else n.__webglFramebuffer[e]=l.createFramebuffer()}else{if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=l.createFramebuffer()}else n.__webglFramebuffer=l.createFramebuffer();if(o)for(let e=0,t=i.length;e<t;e++){let t=f.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=l.createTexture(),h.memory.textures++)}if(e.samples>0&&je(e)===!1){n.__webglMultisampledFramebuffer=l.createFramebuffer(),n.__webglColorRenderbuffer=[],d.bindFramebuffer(l.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=m.convert(r.format,r.colorSpace),o=m.convert(r.type),s=A(r.internalFormat,a,o,r.normalized,r.colorSpace,e.isXRRenderTarget===!0),c=Ae(e);l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,e.width,e.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+t,l.RENDERBUFFER,n.__webglColorRenderbuffer[t])}l.bindRenderbuffer(l.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=l.createRenderbuffer(),xe(n.__webglDepthRenderbuffer,e,!0)),d.bindFramebuffer(l.FRAMEBUFFER,null)}}if(a){d.bindTexture(l.TEXTURE_CUBE_MAP,r.__webglTexture),me(l.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)be(n.__webglFramebuffer[r][i],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else be(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);D(t)&&O(l.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(o){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=f.get(r),o=l.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(o=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(o,a.__webglTexture),me(o,r),be(n.__webglFramebuffer,e,r,l.COLOR_ATTACHMENT0+t,o,0),D(r)&&O(o)}d.unbindTexture()}else{let i=l.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(i,r.__webglTexture),me(i,t),t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)be(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,i,r);else be(n.__webglFramebuffer,e,t,l.COLOR_ATTACHMENT0,i,0);D(t)&&O(i),d.unbindTexture()}e.depthBuffer&&Ce(e)}function Ee(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(D(r)){let t=k(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),O(t),d.unbindTexture()}}}let De=[],Oe=[];function ke(e){if(e.samples>0){if(je(e)===!1){let t=e.textures,n=e.width,r=e.height,i=l.COLOR_BUFFER_BIT,a=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,o=f.get(e),s=t.length>1;if(s)for(let e=0;e<t.length;e++)d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,null),d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,null,0);d.bindFramebuffer(l.READ_FRAMEBUFFER,o.__webglMultisampledFramebuffer);let c=e.texture.mipmaps;c&&c.length>0?d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer[0]):d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer);for(let c=0;c<t.length;c++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=l.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=l.STENCIL_BUFFER_BIT)),s){l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,o.__webglColorRenderbuffer[c]);let e=f.get(t[c]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,e,0)}l.blitFramebuffer(0,0,n,r,0,0,n,r,i,l.NEAREST),_===!0&&(De.length=0,Oe.length=0,De.push(l.COLOR_ATTACHMENT0+c),e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&(De.push(a),Oe.push(a),l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,Oe)),l.invalidateFramebuffer(l.READ_FRAMEBUFFER,De))}if(d.bindFramebuffer(l.READ_FRAMEBUFFER,null),d.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),s)for(let e=0;e<t.length;e++){d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,o.__webglColorRenderbuffer[e]);let n=f.get(t[e]).__webglTexture;d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,n,0)}d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&_){let t=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[t])}}}function Ae(e){return Math.min(p.maxSamples,e.samples)}function je(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function L(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Me(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(_t.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&B(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):V(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ne(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=oe,this.resetTextureUnits=re,this.getTextureUnits=ie,this.setTextureUnits=ae,this.setTexture2D=I,this.setTexture2DArray=ce,this.setTexture3D=le,this.setTextureCube=ue,this.rebindTextures=we,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=Ee,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=be,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function Eu(e,t){function n(n,r=``){let i,a=_t.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Du=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ou=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ku=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new _i(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new to({vertexShader:Du,fragmentShader:Ou,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new J(new Va(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Au=class extends tt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,u=null,d=null,f=null,p=null,h=null,g=typeof XRWebGLBinding<`u`,_=new ku,v={},b=t.getContextAttributes(),x=null,S=null,C=[],D=[],O=new U,k=null,A=null,ee=new qo;ee.viewport=new Ot;let j=new qo;j.viewport=new Ot;let M=[ee,j],N=new rs,te=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new un,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new un,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new un,C[e]=t),t.getHandSpace()};function ne(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function F(){r.removeEventListener(`select`,ne),r.removeEventListener(`selectstart`,ne),r.removeEventListener(`selectend`,ne),r.removeEventListener(`squeeze`,ne),r.removeEventListener(`squeezestart`,ne),r.removeEventListener(`squeezeend`,ne),r.removeEventListener(`end`,F),r.removeEventListener(`inputsourceschange`,re);for(let e=0;e<C.length;e++){let t=D[e];t!==null&&(D[e]=null,C[e].disconnect(t))}te=null,P=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,ue.stop(),n.isPresenting=!1,e.setPixelRatio(k),e.setSize(O.width,O.height,!1),A!==null){let e=A.camera;e.fov=A.fov,e.zoom=A.zoom,e.updateProjectionMatrix(),A=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,ne),r.addEventListener(`selectstart`,ne),r.addEventListener(`selectend`,ne),r.addEventListener(`squeeze`,ne),r.addEventListener(`squeezestart`,ne),r.addEventListener(`squeezeend`,ne),r.addEventListener(`end`,F),r.addEventListener(`inputsourceschange`,re),b.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(O),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;b.depth&&(o=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?E:T,a=b.stencil?y:m);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new At(f.textureWidth,f.textureHeight,{format:w,type:l,depthTexture:new hi(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new At(p.framebufferWidth,p.framebufferHeight,{format:w,type:l,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ue.setContext(r),ue.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function re(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let ie=new W,ae=new W;function oe(e,t,n){ie.setFromMatrixPosition(t.matrixWorld),ae.setFromMatrixPosition(n.matrixWorld);let r=ie.distanceTo(ae),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function se(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),N.near=j.near=ee.near=t,N.far=j.far=ee.far=n,(te!==N.near||P!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),te=N.near,P=N.far),N.layers.mask=e.layers.mask|6,ee.layers.mask=N.layers.mask&-5,j.layers.mask=N.layers.mask&-3;let i=e.parent,a=N.cameras;se(N,i);for(let e=0;e<a.length;e++)se(a[e],i);a.length===2?oe(N,ee,j):N.projectionMatrix.copy(ee.projectionMatrix),A===null&&e.isPerspectiveCamera&&(A={camera:e,fov:e.fov,zoom:e.zoom}),I(e,N,i)};function I(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=it*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(N)},this.getCameraTexture=function(e){return v[e]};let ce=null;function le(t,i){if(u=i.getViewerPose(c||a),h=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==N.cameras.length&&(N.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=M[n];o===void 0&&(o=new qo,o.layers.enable(n),o.viewport=new Ot,M[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(N.matrix.copy(o.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),i===!0&&N.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new _i,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=D[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ce&&ce(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let ue=new Ss;ue.setAnimationLoop(le),this.setAnimationLoop=function(e){ce=e},this.dispose=function(){}}},ju=new Nt,Mu=new G;Mu.set(-1,0,0,0,1,0,0,0,1);function Nu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Za(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(ju.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Mu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Pu(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return V(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?B(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):B(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Fu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Iu=null;function Lu(){return Iu===null&&(Iu=new Ir(Fu,16,16,k,g),Iu.name=`DFG_LUT`,Iu.minFilter=o,Iu.magFilter=o,Iu.wrapS=t,Iu.wrapT=t,Iu.generateMipmaps=!1,Iu.needsUpdate=!0),Iu}var Ru=class{constructor(e={}){let{canvas:t=Je(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:b=l}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=b,C=new Set([ee,A,O]),w=new Set([l,m,f,y,_,v]),T=new Uint32Array(4),E=new Int32Array(4),D=new W,k=null,j=null,M=[],N=[],te=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,ne=!1,F=null,re=null,ie=null,ae=null;this._outputColorSpace=Le;let oe=0,se=0,I=null,ce=-1,le=null,ue=new Ot,de=new Ot,fe=null,pe=new K(0),me=0,he=t.width,ge=t.height,_e=1,ve=null,ye=null,be=new Ot(0,0,he,ge),xe=new Ot(0,0,he,ge),Se=!1,Ce=new Yr,we=!1,Te=!1,Ee=new Nt,De=new W,Oe=new Ot,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ae=!1;function je(){return I===null?_e:1}let L=n;function Me(e,n){return t.getContext(e,n)}let Ne,Pe,R,Fe,z,Ie,Re,ze,Be,Ve,He,Ue,Ge,Ke,qe,Ye,Ze,Qe,et,tt,nt,rt,it;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:p};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,ot,!1),t.addEventListener(`webglcontextrestored`,st,!1),t.addEventListener(`webglcontextcreationerror`,ct,!1),L===null){let t=`webgl2`;if(L=Me(t,e),L===null)throw Me(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}at()}catch(e){throw t.removeEventListener(`webglcontextlost`,ot,!1),t.removeEventListener(`webglcontextrestored`,st,!1),t.removeEventListener(`webglcontextcreationerror`,ct,!1),V(`WebGLRenderer: `+e.message),e}function at(){Ne=new nc(L),Ne.init(),nt=new Eu(L,Ne),Pe=new js(L,Ne,e,nt),R=new wu(L,Ne),Pe.reversedDepthBuffer&&h&&R.buffers.depth.setReversed(!0),re=L.createFramebuffer(),ie=L.createFramebuffer(),ae=L.createFramebuffer(),Fe=new ac(L),z=new iu,Ie=new Tu(L,Ne,R,z,Pe,nt,Fe),Re=new tc(P),ze=new Cs(L),rt=new ks(L,ze),Be=new rc(L,ze,Fe,rt),Ve=new sc(L,Be,ze,rt,Fe),Qe=new oc(L,Pe,Ie),qe=new Ms(z),He=new ru(P,Re,Ne,Pe,rt,qe),Ue=new Nu(P,z),Ge=new cu,Ke=new hu(Ne),Ze=new Os(P,Re,R,Ve,x,s),Ye=new Cu(P,Ve,Pe),it=new Pu(L,Fe,Pe,R),et=new As(L,Ne,Fe),tt=new ic(L,Ne,Fe),Fe.programs=He.programs,P.capabilities=Pe,P.extensions=Ne,P.properties=z,P.renderLists=Ge,P.shadowMap=Ye,P.state=R,P.info=Fe}S!==1009&&(te=new lc(S,t.width,t.height,o,r,i));let H=new Au(P,L);this.xr=H,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let e=Ne.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ne.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return _e},this.setPixelRatio=function(e){e!==void 0&&(_e=e,this.setSize(he,ge,!1))},this.getSize=function(e){return e.set(he,ge)},this.setSize=function(e,n,r=!0){H.isPresenting?B(`WebGLRenderer: Can't change size while VR device is presenting.`):(he=e,ge=n,t.width=Math.floor(e*_e),t.height=Math.floor(n*_e),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),te!==null&&te.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(he*_e,ge*_e).floor()},this.setDrawingBufferSize=function(e,n,r){he=e,ge=n,_e=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009)V(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){B(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}te.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(ue)},this.getViewport=function(e){return e.copy(be)},this.setViewport=function(e,t,n,r){e.isVector4?be.set(e.x,e.y,e.z,e.w):be.set(e,t,n,r),R.viewport(ue.copy(be).multiplyScalar(_e).round())},this.getScissor=function(e){return e.copy(xe)},this.setScissor=function(e,t,n,r){e.isVector4?xe.set(e.x,e.y,e.z,e.w):xe.set(e,t,n,r),R.scissor(de.copy(xe).multiplyScalar(_e).round())},this.getScissorTest=function(){return Se},this.setScissorTest=function(e){R.setScissorTest(Se=e)},this.setOpaqueSort=function(e){ve=e},this.setTransparentSort=function(e){ye=e},this.getClearColor=function(e){return e.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor(...arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(I!==null){let t=I.texture.format;e=C.has(t)}if(e){let e=I.texture.type,t=w.has(e),n=Ze.getClearColor(),r=Ze.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,L.clearBufferuiv(L.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,L.clearBufferiv(L.COLOR,0,E))}else r|=L.COLOR_BUFFER_BIT}t&&(r|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&L.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),F=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ot,!1),t.removeEventListener(`webglcontextrestored`,st,!1),t.removeEventListener(`webglcontextcreationerror`,ct,!1),Ze.dispose(),Ge.dispose(),Ke.dispose(),z.dispose(),Re.dispose(),Ve.dispose(),rt.dispose(),it.dispose(),He.dispose(),H.dispose(),H.removeEventListener(`sessionstart`,pt),H.removeEventListener(`sessionend`,mt),ht.stop()};function ot(e){e.preventDefault(),Xe(`WebGLRenderer: Context Lost.`),ne=!0}function st(){Xe(`WebGLRenderer: Context Restored.`),ne=!1;let e=Fe.autoReset,t=Ye.enabled,n=Ye.autoUpdate,r=Ye.needsUpdate,i=Ye.type;at(),Fe.autoReset=e,Ye.enabled=t,Ye.autoUpdate=n,Ye.needsUpdate=r,Ye.type=i}function ct(e){V(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function lt(e){let t=e.target;t.removeEventListener(`dispose`,lt),U(t)}function U(e){ut(e),z.remove(e)}function ut(e){let t=z.get(e).programs;t!==void 0&&(t.forEach(function(e){He.releaseProgram(e)}),e.isShaderMaterial&&He.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ke);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Et(e,t,n,r,i);R.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Be.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;rt.setup(i,r,s,n,c);let h,g=et;if(c!==null&&(h=ze.get(c),g=tt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(R.setLineWidth(r.wireframeLinewidth*je()),g.setMode(L.LINES)):g.setMode(L.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),R.setLineWidth(e*je()),i.isLineSegments?g.setMode(L.LINES):i.isLineLoop?g.setMode(L.LINE_LOOP):g.setMode(L.LINE_STRIP)}else i.isPoints?g.setMode(L.POINTS):i.isSprite&&g.setMode(L.TRIANGLES);if(i.isBatchedMesh){if(Ne.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ze.get(c).bytesPerElement:1,o=z.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(L,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function dt(e,t,n,r){F!==null&&e.isNodeMaterial&&F.setObject(r,e),we===!0&&qe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,St(e,t,r),e.side=0,e.needsUpdate=!0,St(e,t,r),e.side=2):St(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),F!==null&&F.renderStart(e,t,n),j=Ke.get(n),j.init(t),N.push(j),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(j.pushLight(e),e.castShadow&&j.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(j.pushLight(e),e.castShadow&&j.pushShadow(e))}),j.setupLights(),F!==null&&F.updateLights(j.state.lightsArray),Te=this.localClippingEnabled,we=qe.init(this.clippingPlanes,Te),we===!0&&qe.setGlobalState(this.clippingPlanes,t),F!==null&&Ye.render(j.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];dt(o,n,t,e),r.add(o)}else dt(i,n,t,e),r.add(i)}}),j=N.pop(),F!==null&&F.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=z.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Ne.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ft=null;function G(e){ft&&ft(e)}function pt(){ht.stop()}function mt(){ht.start()}let ht=new Ss;ht.setAnimationLoop(G),typeof self<`u`&&ht.setContext(self),this.setAnimationLoop=function(e){ft=e,H.setAnimationLoop(e),e===null?ht.stop():ht.start()},H.addEventListener(`sessionstart`,pt),H.addEventListener(`sessionend`,mt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){V(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ne===!0)return;F!==null&&F.renderStart(e,t);let n=H.enabled===!0&&H.isPresenting===!0,r=te!==null&&(I===null||n)&&te.begin(P,I);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),H.enabled===!0&&H.isPresenting===!0&&(te===null||te.isCompositing()===!1)&&(H.cameraAutoUpdate===!0&&H.updateCamera(t),t=H.getCamera()),e.isScene===!0&&e.onBeforeRender(P,e,t,I),j=Ke.get(e,N.length),j.init(t),j.state.textureUnits=Ie.getTextureUnits(),N.push(j),Ee.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Ce.setFromProjectionMatrix(Ee,We,t.reversedDepth),Te=this.localClippingEnabled,we=qe.init(this.clippingPlanes,Te),k=Ge.get(e,M.length),k.init(),M.push(k),H.enabled===!0&&H.isPresenting===!0){let e=P.xr.getDepthSensingMesh();e!==null&&gt(e,t,-1/0,P.sortObjects)}gt(e,t,0,P.sortObjects),k.finish(),F!==null&&F.updateLights(j.state.lightsArray),P.sortObjects===!0&&k.sort(ve,ye),Ae=H.enabled===!1||H.isPresenting===!1||H.hasDepthSensing()===!1,Ae&&Ze.addToRenderList(k,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),we===!0&&qe.beginShadows();let i=j.state.shadowsArray;if(Ye.render(i,e,t),we===!0&&qe.endShadows(),(r&&te.hasRenderPass())===!1){let n=k.opaque,r=k.transmissive;if(j.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];yt(n,r,e,a)}Ae&&Ze.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];vt(k,e,n,n.viewport)}}else r.length>0&&yt(n,r,e,t),Ae&&Ze.render(e),vt(k,e,t)}I!==null&&se===0&&(Ie.updateMultisampleRenderTarget(I),Ie.updateRenderTargetMipmap(I)),r&&te.end(P),e.isScene===!0&&e.onAfterRender(P,e,t),rt.resetDefaultState(),ce=-1,le=null,N.pop(),N.length>0?(j=N[N.length-1],Ie.setTextureUnits(j.state.textureUnits),we===!0&&qe.setGlobalState(P.clippingPlanes,j.state.camera)):j=null,M.pop(),k=M.length>0?M[M.length-1]:null,F!==null&&F.renderEnd()};function gt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)j.pushLightProbeGrid(e);else if(e.isLight)j.pushLight(e),e.castShadow&&j.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Ce)){r&&Oe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ee);let i=Ve.update(e),a=e.material;a.visible&&k.push(e,i,a,n,Oe.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Ce))){let i=Ve.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Oe.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Oe.copy(e.boundingSphere.center)),Oe.applyMatrix4(e.matrixWorld).applyMatrix4(Ee)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&k.push(e,i,c,n,Oe.z,s,t)}}else a.visible&&k.push(e,i,a,n,Oe.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)gt(i[e],t,n,r)}function vt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;j.setupLightsView(n),we===!0&&qe.setGlobalState(P.clippingPlanes,n),r&&R.viewport(ue.copy(r)),i.length>0&&bt(i,t,n),a.length>0&&bt(a,t,n),o.length>0&&bt(o,t,n),R.buffers.depth.setTest(!0),R.buffers.depth.setMask(!0),R.buffers.color.setMask(!0),R.setPolygonOffset(!1)}function yt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(j.state.transmissionRenderTarget[r.id]===void 0){let e=Ne.has(`EXT_color_buffer_half_float`)||Ne.has(`EXT_color_buffer_float`);j.state.transmissionRenderTarget[r.id]=new At(1,1,{generateMipmaps:!0,type:e?g:l,minFilter:c,samples:Math.max(4,Pe.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:_t.workingColorSpace})}let a=j.state.transmissionRenderTarget[r.id],o=r.viewport||ue;a.setSize(o.z*P.transmissionResolutionScale,o.w*P.transmissionResolutionScale);let s=P.getRenderTarget(),u=P.getActiveCubeFace(),d=P.getActiveMipmapLevel();P.setRenderTarget(a),P.getClearColor(pe),me=P.getClearAlpha(),me<1&&P.setClearColor(16777215,.5),P.clear(),Ae&&Ze.render(n);let f=P.toneMapping;P.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),j.setupLightsView(r),we===!0&&qe.setGlobalState(P.clippingPlanes,r),bt(e,n,r),Ie.updateMultisampleRenderTarget(a),Ie.updateRenderTargetMipmap(a),Ne.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,xt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Ie.updateMultisampleRenderTarget(a),Ie.updateRenderTargetMipmap(a))}P.setRenderTarget(s,u,d),P.setClearColor(pe,me),p!==void 0&&(r.viewport=p),P.toneMapping=f}function bt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&xt(o,t,n,s,l,c)}}function xt(e,t,n,r,i,a){F!==null&&i.isNodeMaterial&&F.setObject(e,i),e.onBeforeRender(P,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(P,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,P.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,P.renderBufferDirect(n,t,r,i,e,a),i.side=2):P.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(P,t,n,r,i,a)}function St(e,t,n){t.isScene!==!0&&(t=ke);let r=z.get(e),i=j.state.lights,a=j.state.shadowsArray,o=i.state.version,s=He.getParameters(e,i.state,a,t,n,j.state.lightProbeGridArray),c=He.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Re.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,lt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return wt(e,s),d}else s.uniforms=He.getUniforms(e),F!==null&&e.isNodeMaterial&&F.build(e,n,s),e.onBeforeCompile(s,P),d=He.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=qe.uniform),wt(e,s),r.needsLights=kt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=j.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Ct(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=gl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function wt(e,t){let n=z.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Tt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function Et(e,t,n,r,i){t.isScene!==!0&&(t=ke),Ie.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=I===null?P.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:_t.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Re.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(h=P.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=z.get(r),y=j.state.lights;if(we===!0&&(Te===!0||e!==le)){let t=e===le&&r.id===ce;qe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==qe.numPlanes||v.numIntersection!==qe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=j.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=St(r,t,i),F&&r.isNodeMaterial&&F.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(R.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==ce&&(ce=r.id,C=!0),v.needsLights){let e=Tt(j.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||le!==e){R.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(L,`projectionMatrix`,e.projectionMatrix),T.setValue(L,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(L,De.setFromMatrixPosition(e.matrixWorld)),Pe.logarithmicDepthBuffer&&T.setValue(L,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(L,`isOrthographic`,e.isOrthographicCamera===!0),le!==e&&(le=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(L,`sunShadowMap`,y.state.sunShadowMap,Ie),y.state.directionalShadowMap.length>0&&T.setValue(L,`directionalShadowMap`,y.state.directionalShadowMap,Ie),y.state.spotShadowMap.length>0&&T.setValue(L,`spotShadowMap`,y.state.spotShadowMap,Ie),y.state.pointShadowMap.length>0&&T.setValue(L,`pointShadowMap`,y.state.pointShadowMap,Ie)),i.isSkinnedMesh){T.setOptional(L,i,`bindMatrix`),T.setOptional(L,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(L,`boneTexture`,e.boneTexture,Ie))}i.isBatchedMesh&&(T.setOptional(L,i,`batchingTexture`),T.setValue(L,`batchingTexture`,i._matricesTexture,Ie),T.setOptional(L,i,`batchingIdTexture`),T.setValue(L,`batchingIdTexture`,i._indirectTexture,Ie),T.setOptional(L,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(L,`batchingColorTexture`,i._colorsTexture,Ie));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&Qe.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(L,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=Lu()),C){if(T.setValue(L,`toneMappingExposure`,P.toneMappingExposure),v.needsLights&&Dt(E,w),a&&r.fog===!0&&Ue.refreshFogUniforms(E,a),Ue.refreshMaterialUniforms(E,r,_e,ge,j.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}gl.upload(L,Ct(v),E,Ie)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(gl.upload(L,Ct(v),E,Ie),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(L,`center`,i.center),T.setValue(L,`modelViewMatrix`,i.modelViewMatrix),T.setValue(L,`normalMatrix`,i.normalMatrix),T.setValue(L,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];it.update(n,x),it.bind(n,x)}}return x}function Dt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function kt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return oe},this.getActiveMipmapLevel=function(){return se},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(e,t,n){let r=z.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),z.get(e.texture).__webglTexture=t,z.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=z.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){I=e,oe=t,se=n;let r=null,i=!1,a=!1;if(e){let o=z.get(e);if(o.__useDefaultFramebuffer!==void 0){R.bindFramebuffer(L.FRAMEBUFFER,o.__webglFramebuffer),ue.copy(e.viewport),de.copy(e.scissor),fe=e.scissorTest,R.viewport(ue),R.scissor(de),R.setScissorTest(fe),ce=-1;return}if(o.__webglFramebuffer===void 0)Ie.setupRenderTarget(e);else if(o.__hasExternalTextures)Ie.rebindTextures(e,z.get(e.texture).__webglTexture,z.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&z.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Ie.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=z.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Ie.useMultisampledRTT(e)===!1?z.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ue.copy(e.viewport),de.copy(e.scissor),fe=e.scissorTest}else ue.copy(be).multiplyScalar(_e).floor(),de.copy(xe).multiplyScalar(_e).floor(),fe=Se;if(n!==0&&(r=re),R.bindFramebuffer(L.FRAMEBUFFER,r)&&R.drawBuffers(e,r),R.viewport(ue),R.scissor(de),R.setScissorTest(fe),i){let r=z.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=z.get(e.textures[t]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=z.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,t.__webglTexture,n)}ce=-1};function jt(e){let t=z.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Pe.textureFormatReadable(e.format),t.__typeReadable=Pe.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){R.bindFramebuffer(L.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let u=jt(o);if(u.__formatReadable===!1){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&L.readPixels(t,n,r,i,nt.convert(c),nt.convert(l),a)}finally{let e=I===null?null:z.get(I).__webglFramebuffer;R.bindFramebuffer(L.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){R.bindFramebuffer(L.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let d=jt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.bufferData(L.PIXEL_PACK_BUFFER,a.byteLength,L.STREAM_READ),L.readPixels(t,n,r,i,nt.convert(l),nt.convert(u),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let p=I===null?null:z.get(I).__webglFramebuffer;R.bindFramebuffer(L.FRAMEBUFFER,p);let m=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await $e(L,m,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,a),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(f),L.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Ie.setTexture2D(e,0),L.copyTexSubImage2D(L.TEXTURE_2D,n,0,0,o,s,i,a),R.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=nt.convert(t.format),_=nt.convert(t.type),v;t.isData3DTexture?(Ie.setTexture3D(t,0),v=L.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Ie.setTexture2DArray(t,0),v=L.TEXTURE_2D_ARRAY):(Ie.setTexture2D(t,0),v=L.TEXTURE_2D),R.activeTexture(L.TEXTURE0),R.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,t.flipY),R.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),R.pixelStorei(L.UNPACK_ALIGNMENT,t.unpackAlignment);let y=R.getParameter(L.UNPACK_ROW_LENGTH),b=R.getParameter(L.UNPACK_IMAGE_HEIGHT),x=R.getParameter(L.UNPACK_SKIP_PIXELS),S=R.getParameter(L.UNPACK_SKIP_ROWS),C=R.getParameter(L.UNPACK_SKIP_IMAGES);R.pixelStorei(L.UNPACK_ROW_LENGTH,h.width),R.pixelStorei(L.UNPACK_IMAGE_HEIGHT,h.height),R.pixelStorei(L.UNPACK_SKIP_PIXELS,l),R.pixelStorei(L.UNPACK_SKIP_ROWS,u),R.pixelStorei(L.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=z.get(e),r=z.get(t),h=z.get(n.__renderTarget),g=z.get(r.__renderTarget);R.bindFramebuffer(L.READ_FRAMEBUFFER,h.__webglFramebuffer),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(e).__webglTexture,i,d+n),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(t).__webglTexture,a,m+n)),L.blitFramebuffer(l,u,o,s,f,p,o,s,L.DEPTH_BUFFER_BIT,L.NEAREST);R.bindFramebuffer(L.READ_FRAMEBUFFER,null),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||z.has(e)){let n=z.get(e),r=z.get(t);R.bindFramebuffer(L.READ_FRAMEBUFFER,ie),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,ae);for(let e=0;e<c;e++)w?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,n.__webglTexture,i),T?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,r.__webglTexture,a),i===0?T?L.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):L.copyTexSubImage2D(v,a,f,p,l,u,o,s):L.blitFramebuffer(l,u,o,s,f,p,o,s,L.COLOR_BUFFER_BIT,L.NEAREST);R.bindFramebuffer(L.READ_FRAMEBUFFER,null),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?L.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h);R.pixelStorei(L.UNPACK_ROW_LENGTH,y),R.pixelStorei(L.UNPACK_IMAGE_HEIGHT,b),R.pixelStorei(L.UNPACK_SKIP_PIXELS,x),R.pixelStorei(L.UNPACK_SKIP_ROWS,S),R.pixelStorei(L.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&L.generateMipmap(v),R.unbindTexture()},this.initRenderTarget=function(e){z.get(e).__webglFramebuffer===void 0&&Ie.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Ie.setTextureCube(e,0):e.isData3DTexture?Ie.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Ie.setTexture2DArray(e,0):Ie.setTexture2D(e,0),R.unbindTexture()},this.resetState=function(){oe=0,se=0,I=null,R.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return We}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=_t._getDrawingBufferColorSpace(e),t.unpackColorSpace=_t._getUnpackColorSpace()}},zu={version:1,name:`Frozen bridge — four art target layout`,units:`local bridge coordinates, not Riot game units`,bridge:{halfLength:720,halfWidth:112,baseStart:470,baseHalfWidth:160},projection:{origin:[540,306],along:[.59,-.28],across:[.6,.65]},blue:{spawn:[-674,0],nexus:[-636,0],nexusTowers:[[-548,-62],[-548,62]],inhibitor:[-484,0],innerTower:[-385,0],outerTower:[-210,0]},brush:[{id:`blue-tower-side`,u:-260,v:-87,length:64,width:30},{id:`blue-mid-side`,u:-90,v:-86,length:74,width:32},{id:`center-opposite`,u:0,v:84,length:82,width:34},{id:`red-mid-side`,u:90,v:-86,length:74,width:32},{id:`red-tower-side`,u:260,v:-87,length:64,width:30}],relics:[],assetSlots:{bridgeFloor:null,bridgeRail:null,bridgePier:null,brush:`assets/map-modules/howling-brush-crystal-v2/brush.png`,tower:null,inhibitor:`assets/map-modules/howling-brush-crystal-v2/inhibitor.png`,redInhibitor:`assets/map-modules/howling-red-team-v1/inhibitor.png`,nexus:`assets/map-modules/howling-sites-v3/nexus.png`,redNexus:`assets/map-modules/howling-red-team-v1/nexus.png`,spawn:null},layers:[`abyss`,`bridgeSupports`,`floor`,`edge`,`decals`,`objectSlots`,`actors`,`foreground`,`atmosphere`],reference:`assets/map-concepts/howling-abyss-target-v1/component-plan.json`,scope:`Continuous gameplay footprint interpreted from the four art targets. Independent compositions are not seamless tiles; inactive slots remain reserved, not implemented buildings.`};function Bu(e,t,n){let r=e.projection,i=t-r.origin[0],a=n-r.origin[1],o=r.along[0]*r.across[1]-r.along[1]*r.across[0];return[(i*r.across[1]-a*r.across[0])/o,(a*r.along[0]-i*r.along[1])/o]}function Vu(e,t){let n=e.bridge,r=Math.max(0,Math.min(1,(Math.abs(t)-n.baseStart)/80));return n.halfWidth+(n.baseHalfWidth-n.halfWidth)*r}function Hu(e){let t=e.bridge;return[[-t.halfLength,-t.baseHalfWidth],[-t.baseStart-80,-t.baseHalfWidth],[-t.baseStart,-t.halfWidth],[t.baseStart,-t.halfWidth],[t.baseStart+80,-t.baseHalfWidth],[t.halfLength,-t.baseHalfWidth],[t.halfLength,t.baseHalfWidth],[t.baseStart+80,t.baseHalfWidth],[t.baseStart,t.halfWidth],[-t.baseStart,t.halfWidth],[-t.baseStart-80,t.baseHalfWidth],[-t.halfLength,t.baseHalfWidth]]}var Uu=2.4,Wu=2.6,Gu={width:6200,height:3400},Ku={...zu,projection:{...zu.projection,origin:[Gu.width/2,Gu.height/2],along:zu.projection.along.map(e=>e*Uu*Wu),across:zu.projection.across.map(e=>e*Uu)}};function Z(e,t=0){let n=Ku.projection;return{x:n.origin[0]+e*n.along[0]+t*n.across[0],y:n.origin[1]+e*n.along[1]+t*n.across[1]}}function qu(e,t=0){return Math.ceil(Math.hypot(...Ku.projection.across)*(Vu(Ku,e)+Math.abs(t))+12)}var Ju=Hu(Ku).map(([e,t])=>Z(e,t)),Yu=[1,-1].flatMap(e=>{let t=zu.blue,n=e===1?`blue`:`red`;return[{id:`spawn`,label:`出生 / 商店`,u:t.spawn[0],v:0,w:88,h:148},{id:`nexus`,label:`基地 · 占位`,u:t.nexus[0],v:0,w:47,h:47},...t.nexusTowers.map(([e,t],n)=>({id:`nexus-tower-${n}`,label:`门牙塔 · 占位`,u:e,v:t,w:38,h:38})),{id:`inhibitor`,label:`水晶 · 占位`,u:t.inhibitor[0],v:0,w:29,h:29},{id:`inner`,label:`内塔 · 占位`,u:t.innerTower[0],v:0,w:38,h:38},{id:`outer`,label:`外塔`,u:t.outerTower[0],v:0,w:38,h:38}].map(t=>({...t,id:`${n}-${t.id}`,team:n,u:t.u*e,v:t.v*e}))});function Xu(e,t=8){let[n,r]=Bu(Ku,e.x,e.y),i=t*2.5/Uu,a=Math.max(-720+i,Math.min(720-i,n)),o=Math.max(0,Vu(Ku,a)-i);return Z(a,Math.max(-o,Math.min(o,r)))}function Zu(e,t=0){let n=Xu(e,t);return Math.hypot(e.x-n.x,e.y-n.y)<.001}var Qu=typeof location<`u`&&new URLSearchParams(location.search).get(`map`)===`howling`,$u={sourceWidth:511,sourceHeight:327,scale:2},ed={width:Qu?Gu.width:$u.sourceWidth*$u.scale,height:Qu?Gu.height:$u.sourceHeight*$u.scale,step:1/60};function td(e){return{x:e.x*$u.scale,y:e.y*$u.scale}}var nd={csToWin:100,firstWaveAt:2,waveInterval:30,aiInterval:.18,hero:{hp:640,mana:0,speed:80,range:58,damage:43,attackInterval:.8,windup:.19},melee:{hp:150,speed:28,range:13,damage:6,attackInterval:1.25,windup:.24},ranged:{hp:105,speed:28,range:76,damage:6,attackInterval:1.45,windup:.25},tower:{hp:1e3,range:Qu?qu(Ku.blue.outerTower[0]):78,damage:90,attackInterval:1.15,windup:.15},projectileSpeed:190,fountainRadius:22*$u.scale,fountainHeal:42},rd={q:{name:`斩钢闪`,cost:0,cooldown:2.5,range:145,damage:85},w:{name:`风之障壁`,cost:0,cooldown:14,range:32,damage:0},e:{name:`踏前斩`,cost:0,cooldown:.1,range:100,damage:55},r:{name:`狂风绝息斩`,cost:0,cooldown:45,range:420,damage:200}},id={blue:td({x:51,y:305}),red:td({x:459,y:44})},ad={blue:td({x:115,y:262}),red:td({x:395,y:85})},od={blue:td({x:145,y:241}),red:td({x:364,y:109})},sd={blue:id.blue,red:id.red},cd=Qu?Z(70):td({x:305,y:147});if(Qu){let e=Ku.blue;id.blue=Z(e.spawn[0]),id.red=Z(-e.spawn[0]),ad.blue=Z(e.outerTower[0]),ad.red=Z(-e.outerTower[0]),od.blue=Z(e.spawn[0]),od.red=Z(-e.spawn[0]),sd.blue=Z(e.nexus[0]+30),sd.red=Z(-e.nexus[0]-30)}var ld={hero:{radius:11,halfWidth:21,height:78},melee:{radius:6,halfWidth:10,height:32},ranged:{radius:6,halfWidth:10,height:32},tower:{radius:20,halfWidth:32,height:105}},ud=32/46;function dd(e){return e.range+(e.kind===`hero`?e.radius:0)}function fd(e,t,n=!1){return dd(e)+t.radius+(n?8:0)}function pd(e,t){let n=ld[e.kind],r=t.x-e.x,i=t.y-e.y;if(Math.hypot(r,i)<=e.radius+3)return!0;let a=-n.height*.48;return(r/n.halfWidth)**2+((i-a)/(n.height*.52))**2<=1}function md(e,t){return e.filter(e=>e.hp>0&&pd(e,t)).sort((e,n)=>{let r=Math.hypot(e.x-t.x,e.y-t.y),i=Math.hypot(n.x-t.x,n.y-t.y),a=r<=e.radius+3,o=i<=n.radius+3;return Number(o)-Number(a)||(a&&o?r-i:n.y-e.y)||e.id-n.id})[0]}var hd=.72,gd=22/37*hd;function _d(e,t){return e.kind===`hero`&&e.hp>0&&e.qCast!==null&&t>=e.qCast.startedAt&&t<e.qCast.startedAt+.72}var vd=.8,yd=.3,bd=3.9,xd={width:128,height:64,thickness:8,distance:32};function Sd(e,t,n,r){let i=t.x-e.x,a=t.y-e.y,o=e.x-n.x,s=e.y-n.y,c=o*o+s*s-r*r,l=i*i+a*a;if(c<=0)return 0;if(l===0)return null;let u=2*(o*i+s*a),d=u*u-4*l*c;if(d<0)return null;let f=(-u-Math.sqrt(d))/(2*l);return f>=0&&f<=1?f:null}function Cd(e){let t=-Math.sin(e.angle)*xd.width/2,n=Math.cos(e.angle)*xd.width/2;return[{x:e.x-t,y:e.y-n},{x:e.x+t,y:e.y+n}]}function wd(e,t,n,r){let i=Math.cos(e.angle),a=Math.sin(e.angle),o=t=>[(t.x-e.x)*i+(t.y-e.y)*a,-(t.x-e.x)*a+(t.y-e.y)*i],s=o(t),c=o(n),l=[xd.thickness/2+r,xd.width/2+r],u=0,d=1;for(let e=0;e<2;e++){let t=c[e]-s[e];if(Math.abs(t)<1e-9){if(Math.abs(s[e])>l[e])return null;continue}let n=(-l[e]-s[e])/t,r=(l[e]-s[e])/t;if(u=Math.max(u,Math.min(n,r)),d=Math.min(d,Math.max(n,r)),u>d)return null}return u}var Td=Yu.filter(e=>e.id!==`blue-spawn`&&e.id!==`red-spawn`).map(e=>{let t=Z(e.u,e.v),n=e.id.endsWith(`nexus`),r=e.id.endsWith(`inhibitor`);return{id:e.id,x:t.x,y:t.y,rx:n?124:r?47:68,ry:n?84:r?40:64}});function Ed(e,t){let n=Td.find(t=>Math.hypot(t.x-e.x,t.y-e.y)<1);if(!n)return null;let r=t.x-e.x,i=t.y-e.y,a=Math.hypot(r,i);return a>0?a/Math.hypot(r/n.rx,i/n.ry):Math.min(n.rx,n.ry)}function Dd(e,t,n=1){let r={...e};for(let e=0;e<6;e++){let e=!1;for(let i of Td){let a=i.rx+t,o=i.ry+t,s=(r.x-i.x)/a,c=(r.y-i.y)/o,l=Math.hypot(s,c);l>=1||(l<1e-4&&(s=n%2?1:-1,c=.1,l=Math.hypot(s,c)),r={x:i.x+s/l*a*1.001,y:i.y+c/l*o*1.001},e=!0)}if(!e)break}return r}function Od(e,t,n,r=1){let i=1/0,a=null;for(let o of Td){let s=o.rx+n+3,c=o.ry+n+3,l=(e.x-o.x)/s,u=(e.y-o.y)/c,d=(t.x-o.x)/s,f=(t.y-o.y)/c,p=d-l,m=f-u,h=p*p+m*m;if(h<1e-4)continue;let g=Math.max(0,Math.min(1,-(l*p+u*m)/h));if(g<=0||g>=1||Math.hypot(l+p*g,u+m*g)>=1.04)continue;let _=Math.hypot(e.x-o.x,e.y-o.y);if(_>=i)continue;let v=Math.hypot(p,m),y=p/v,b=m/v,x=l*-b+u*y,S=Math.abs(x)>.08?Math.sign(x):r%2?1:-1;a={x:o.x+(-b*S*1.22+y*1.16)*s,y:o.y+(y*S*1.22+b*1.16)*c},i=_}return a??t}var kd={x:Gu.width/2,y:Gu.height/2};function Q(e,t=0){return new W(e.x-kd.x,t,e.y-kd.y)}function Ad(e){return{x:e.x+kd.x,y:e.z+kd.y}}var jd={elevation:60,referenceHeight:270,distance:5e3},Md=class{camera=new Xo(-400,400,225,-225,1,12e3);focus={...kd};size={width:1280,height:720};zoom=.6;elevation=Number(jd.elevation);raycaster=new _s;ground=new mr(new W(0,1,0),0);constructor(){this.update()}resize(e,t){if(!(e>0&&t>0&&Number.isFinite(e)&&Number.isFinite(t)))throw RangeError(`Invalid viewport`);this.size={width:e,height:t},this.update()}lookAt(e){Object.assign(this.focus,e),this.update()}follow(e,t){let n=this.project(e),r=(e,t)=>Math.sign(e)*Math.max(0,Math.abs(e)-t),i=r(n.x-this.size.width/2,this.size.width*.16),a=r(n.y-this.size.height/2,this.size.height*.14);if(!i&&!a)return;let o=1-Math.exp(-6*Math.min(.1,Math.max(0,t)));this.panScreen(i*o,a*o)}panScreen(e,t){let n=(this.camera.top-this.camera.bottom)/this.size.height;this.lookAt({x:this.focus.x+e*n,y:this.focus.y+t*n/Math.sin(this.elevation*Math.PI/180)})}setZoom(e){if(!(e>0&&Number.isFinite(e)))throw RangeError(`Invalid zoom`);this.zoom=e,this.update()}setElevation(e){if(![45,60,75].includes(e))throw RangeError(`Unsupported camera candidate`);this.elevation=e,this.update()}project(e,t=0){let n=Q(e,t).project(this.camera);return{x:(n.x+1)*this.size.width/2,y:(1-n.y)*this.size.height/2}}pick(e,t){if(!(t.width>0&&t.height>0))return null;let n=(e.x-t.left)/t.width,r=(e.y-t.top)/t.height;if(n<0||n>1||r<0||r>1)return null;this.raycaster.setFromCamera(new U(n*2-1,1-r*2),this.camera);let i=this.raycaster.ray.intersectPlane(this.ground,new W);return i?Ad(i):null}screenHeading(e,t){let n=this.project(e),r=this.project({x:e.x+Math.cos(t),y:e.y+Math.sin(t)});return Math.atan2(r.y-n.y,r.x-n.x)}update(){let e=jd.referenceHeight/this.zoom/2,t=e*this.size.width/this.size.height;Object.assign(this.camera,{left:-t,right:t,top:e,bottom:-e});let n=Q(this.focus),r=this.elevation*Math.PI/180;this.camera.position.copy(n).add(new W(0,Math.sin(r),Math.cos(r)).multiplyScalar(jd.distance)),this.camera.lookAt(n),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(!0)}},Nd={id:`S01`,minU:-280,maxU:80,minV:-112,maxV:112};function Pd(e){let t=new Uint8Array(e*e*4);for(let n=0;n<e;n++)for(let r=0;r<e;r++){let i=r===0||n===0?135:((r>>2)+(n>>2))%2?219:235;t.set([i,i,i,255],(n*e+r)*4)}let n=new Ir(t,e,e,w);return n.colorSpace=Le,n.magFilter=n.minFilter=r,n.generateMipmaps=!1,n.needsUpdate=!0,n}function Fd(){let e=new cn;e.name=`P1 diagnostic blockout`;let t=new $i;Ju.forEach((e,n)=>{let r=Q(e);n===0?t.moveTo(r.x,-r.z):t.lineTo(r.x,-r.z)}),t.closePath();let n=new J(new La(t,{depth:60,bevelEnabled:!1}),new io({color:3423821}));n.rotation.x=-Math.PI/2,n.position.y=-62,e.add(n);let r=[],i=Math.min(...Ju.map(e=>e.x)),a=Math.max(...Ju.map(e=>e.x)),o=Math.min(...Ju.map(e=>e.y)),s=Math.max(...Ju.map(e=>e.y));for(let e=Math.floor(o/32)*32;e<s;e+=32)for(let t=Math.floor(i/32)*32;t<a;t+=32){if(![-16,16].every(n=>[-16,16].every(r=>Zu({x:t+n,y:e+r}))))continue;let[n,i]=Bu(Ku,t,e);r.push({x:t,y:e,sample:n>=Nd.minU&&n<=Nd.maxU&&Math.abs(i)<=Nd.maxV})}let c=new io({map:Pd(32)}),l=new Gr(new vi(31.4,2,31.4),c,r.length),u=new sn;r.forEach((e,t)=>{u.position.copy(Q(e,-1)),u.updateMatrix(),l.setMatrixAt(t,u.matrix),l.setColorAt(t,new K(e.sample?9149869:6451584))}),l.instanceMatrix.needsUpdate=!0,l.instanceColor&&(l.instanceColor.needsUpdate=!0),l.computeBoundingSphere(),e.add(l);let d=new io({color:5662073});for(let t of Td){let n=new J(new yi(1,1,12,12),d);n.scale.set(t.rx,1,t.ry),n.position.copy(Q(t,6)),e.add(n)}for(let t of Yu.filter(e=>e.id.endsWith(`inner`)||e.id.includes(`nexus-tower`))){let n=new J(new vi(30,90,30),d);n.position.copy(Q(Z(t.u,t.v),45)),e.add(n)}return{group:e,material:c,tiles:r.length}}function Id(e,t,n,r,i=new _s){if(!(t.width>0&&t.height>0))return null;let a=(n.x-t.left)/t.width,o=(n.y-t.top)/t.height;if(a<0||a>1||o<0||o>1)return null;i.setFromCamera(new U(a*2-1,1-o*2),e.camera);for(let e of r)e.updateWorldMatrix(!0,!1);let s=i.intersectObjects(r,!1)[0];return s&&Number.isSafeInteger(s.object.userData.entityId)?s.object.userData.entityId:null}function Ld(e){let t=new Set,n=new Set,r=new Set;e.traverse(e=>{if(e instanceof Gr&&e.dispose(),e instanceof J||e instanceof ii){t.add(e.geometry);for(let t of Array.isArray(e.material)?e.material:[e.material]){n.add(t);for(let e of Object.values(t))e instanceof Dt&&r.add(e)}}});for(let e of t)e.dispose();for(let e of n)e.dispose();for(let e of r)e.dispose()}function Rd(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new ur,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=zd(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=zd(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function zd(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new q(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var Bd=`/assets/floor-Xagh6FO5.png`,Vd=`/assets/wall-z_2M8dzK.png`,Hd=`/assets/moss-BTEBNIvN.png`,Ud=`/assets/rubble-DRfXPJFC.png`,Wd=`/assets/repair-C4OnvDpz.png`,Gd=`/assets/ice-BP9fltvS.png`,Kd=Math.abs(zu.blue.outerTower[0]),qd=zu.blue,Jd=zu.brush,Yd={minU:-720,maxU:720,centralHalfLength:180},Xd=[{id:`central-near-left`,u:-96,v:128,reference:[850,1040]},{id:`central-near-right`,u:160,v:128,reference:[1750,570]},{id:`central-far-left`,u:-160,v:-128,reference:[350,715]},{id:`central-far-right`,u:96,v:-128,reference:[1110,300]}],Zd=[{side:-1,nodes:[-720,-608,-480,-352,-288,-160,-32,96,224,352,480,608,720]},{side:1,nodes:[-720,-608,-480,-352,-224,-96,32,160,288,416,544,672,720]}],Qd=[{u:-310,v:-104},{u:-180,v:-104},{u:310,v:-104},...[-650,-520,-218,85,285,520,650].map(e=>({u:e,v:$d(e)-14}))];function $d(e){return 122+Math.max(0,Math.min(1,(Math.abs(e)-470)/250))*48}function ef(e,t){return{u:e,v:t,height:.7}}(qd.nexus[0]+qd.innerTower[0])/2-28,-(qd.nexus[0]+qd.innerTower[0])/2+28,-Kd+45;var tf=[[-240,-110],[-160,110],[-80,-110],[40,110]].map(([e,t])=>({...Z(e,t),phase:e})),nf={hemisphere:.72,sun:1.55,fill:.32,fire:76,fireRadius:190},rf={floor:{tint:11714506,saturation:.24,gain:1.55},wall:{tint:10268603,saturation:.38,gain:1.25},moss:{tint:8492427,saturation:.32,gain:1.05}};function af(e,t){let n=new io({map:e});n.name=`s01-v2-${t}`,n.userData.palette=t;let r=rf[t];return n.onBeforeCompile=e=>{if(!e.fragmentShader.includes(`#include <map_fragment>`))throw Error(`Unsupported S01 material shader`);e.uniforms.s01Tint={value:new K(r.tint)},e.uniforms.s01Saturation={value:r.saturation},e.uniforms.s01Gain={value:r.gain},e.fragmentShader=`uniform vec3 s01Tint;
uniform float s01Saturation;
uniform float s01Gain;
`+e.fragmentShader.replace(`#include <map_fragment>`,`
      #include <map_fragment>
      float s01Luma = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
      diffuseColor.rgb = mix(vec3(s01Luma) * s01Tint * s01Gain, diffuseColor.rgb, s01Saturation);
    `)},n.customProgramCacheKey=()=>`s01-palette-v2-${t}`,n}function of(e,t){return 1+Math.sin(e*7+t)*.055+Math.sin(e*11+t)*.025}var sf=Qd.map(({u:e,v:t})=>{let n=ef(e,t);return{...Z(n.u,n.v),phase:e}}),cf=[...Xd.map(({u:e,v:t})=>({...Z(e,t),height:155,radius:22})),...[-1,1].flatMap(e=>[Kd,Math.abs(qd.innerTower[0])].map(t=>({...Z(e*t),height:135,radius:23})))];function lf(e){let t=0;for(let n of cf){let r=n.height*400/850,i=-n.height*350/850,a=Math.max(0,Math.min(1,((e.x-n.x)*r+(e.y-n.y)*i)/(r*r+i*i))),o=Math.hypot(e.x-n.x-r*a,e.y-n.y-i*a);t=Math.max(t,Math.max(0,1-o/(n.radius+9))**2*Math.sin(a*Math.PI))}return 1-t*.1}function uf(e,t,n,r=new K,i=!1){r.setHex(n===`blue`?14148069:14996944);let a=0;for(let n of i?sf:tf){let r=Math.hypot(e.x-n.x,e.y-n.y);a+=Math.max(0,1-r/nf.fireRadius)**2*of(t,n.phase)}return r.lerp(new K(16768957),Math.min(.24,a*.24)),i?r.multiplyScalar(lf(e)):r}function df(){let e=new Uint8Array(4096);for(let t=0;t<32;t++)for(let n=0;n<32;n++){let r=Math.hypot((n+.5-16)/16,(t+.5-16)/16),i=Math.max(0,1-r)**1.4;e.set([255,255,255,Math.round(i*6)/6*255],(t*32+n)*4)}let t=new Ir(e,32,32,w);return t.magFilter=t.minFilter=r,t.generateMipmaps=!1,t.needsUpdate=!0,t}function ff(e,t,n,r){if(e.y>=t.y)return 1;let i=r.project(e),a=r.project(t),o=r.project(t,170),s=r.size.height/(r.camera.top-r.camera.bottom),c=i.y-n*s*.55;return Math.abs(i.x-a.x)<40*s&&c>=o.y-6*s&&c<=a.y+8*s?.48:1}var pf=[{u:-126,v:15,ru:17,rv:49},{u:-57,v:-38,ru:11,rv:29}],mf={slate:6452605,repair:4610656,border:8425621,inlay:7050141,substrate:2505536,ice:6589595,snow:11386565,moss:4479824},hf=(e,t)=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)},gf=(e,t)=>{let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=i*i*(3-2*i),s=a*a*(3-2*a);return(hf(n,r)*(1-o)+hf(n+1,r)*o)*(1-s)+(hf(n,r+1)*(1-o)+hf(n+1,r+1)*o)*s};function _f(e,t){let n=77+Math.sin(e/31)*9+Math.sin(e/13)*4,r=96+Math.sin(e/24+1)*5,i=(gf(e/9,t/7)-.5)*11;return{snow:(t-n+i)/17,moss:(-t-r-i)/15}}function vf(e){let t=new cn;t.name=`S01 layered ground · 02`;let n=new Map,r=(e,t,r,i=1)=>{if(e.length<3||e.some(([e,t])=>e<-280||e>80||Math.abs(t)>104||!Zu(Z(e,t))))return;let a=new $i;e.forEach(([e,t],n)=>{let r=Q(Z(e,t));n?a.lineTo(r.x,-r.z):a.moveTo(r.x,-r.z)}),a.closePath();let o=new Ha(a).rotateX(-Math.PI/2).translate(0,r,0),s=o.getAttribute(`position`),c=new Float32Array(s.count*2);for(let e=0;e<s.count;e++)c[e*2]=s.getX(e)/64,c[e*2+1]=s.getZ(e)/64;o.setAttribute(`uv`,new q(c,2));let l=new K(mf[t]).multiplyScalar(i),u=new Float32Array(o.getAttribute(`position`).count*3);for(let e=0;e<u.length;e+=3)u.set([l.r,l.g,l.b],e);o.setAttribute(`color`,new q(u,3));let d=n.get(t)??[];d.push(o),n.set(t,d)},i=(e,t,n,i,a,o,s=1)=>{let c=Math.max(-280,e),l=Math.min(80,e+n),u=Math.max(-104,t),d=Math.min(104,t+i);l>c&&d>u&&r([[c,u],[l,u],[l,d],[c,d]],a,o,s)};i(-280,-104,360,208,`substrate`,.08);for(let e=0;e<11;e++)for(let t=-1;t<25;t++){let n=-280+t*16+e%2*8,a=-104+e*20,o=Math.max(-280,n+.25),s=Math.min(80,n+15.65),c=a+.4,l=Math.min(104,a+19.6),u=hf(t,e);if(s-o<2||l-c<2)continue;let d=.6+u*1.5;if(r([[o+d,c],[s-d,c],[s,c+d],[s,l-d],[s-d,l],[o+d,l],[o,l-d],[o,c+d]],`slate`,.14,.88+u*.2),u>.77){let e=o+(s-o)*.55;r([[e,c],[e+.5,c],[e-1,c+7],[e+1.5,l],[e+1.1,l],[e-1.5,c+7]],`substrate`,.17)}u<.3&&r([[o+d,c],[s-d,c],[s-d-1,c+.45],[o+d+1,c+.45]],`border`,.18,.91);for(let n=0;n<5;n++)i(o+1.8+hf(t*7+n,e)*Math.max(0,s-o-4),c+1.8+hf(t,e*7+n)*Math.max(0,l-c-4),.25+hf(n,e)*.5,.5+hf(t,n)*1.3,n%3?`slate`:`substrate`,.19,n%3?1.17:1.25)}for(let e of pf)for(let t=-9;t<=9;t++)for(let n=-8;n<=8;n++){let r=e.u+n*3.5+t%2*1.75,a=e.v+t*6;((r-e.u)/e.ru)**2+((a-e.v)/e.rv)**2>.92+hf(n,t)*.18||(i(r-.2,a-.3,3.6,6,`substrate`,.21),i(r,a,3,5.2,`repair`,.24,.85+hf(n+11,t)*.28))}let a=(e,t,n,i,a,o,s,c=!1)=>{for(let l=0;l<32;l++){if(c&&(l===3||l===4||l===17||l===25))continue;let u=l*Math.PI/16+.009,d=(l+1)*Math.PI/16-.009;r([[e+Math.cos(u)*t*i,Math.sin(u)*n*i],[e+Math.cos(u)*t*a,Math.sin(u)*n*a],[e+Math.cos(d)*t*a,Math.sin(d)*n*a],[e+Math.cos(d)*t*i,Math.sin(d)*n*i]],o,s,.9+hf(l,e)*.16)}};a(-195,23,37,0,1,`repair`,.28),a(-195,23,37,.89,1,`border`,.31,!0),a(-195,23,37,.69,.72,`inlay`,.33,!0),a(-6,25,40,0,1,`repair`,.28),a(-6,25,40,.9,1,`border`,.31,!0),a(-6,25,40,.71,.74,`inlay`,.32,!0),r([[-6,-25],[-2,-6],[8,0],[-2,6],[-6,25],[-10,6],[-20,0],[-10,-6]],`inlay`,.34,.84);for(let e of[-1,1])r([[-6,e*6],[-17,e*17],[-18,e*15],[-8,e*4]],`inlay`,.35,.84),r([[-6,e*6],[5,e*17],[6,e*15],[-4,e*4]],`inlay`,.35,.84);for(let[e,t]of[[-162,68],[-38,-70]]){r([[e-9,t-4],[e-5,t-13],[e+6,t-9],[e+10,t+2],[e+3,t+12],[e-7,t+8]],`border`,.36,.68),r([[e-8,t-3],[e-4,t-11],[e+5,t-8],[e+8,t+2],[e+2,t+10],[e-6,t+7]],`substrate`,.38);for(let n=0;n<7;n++)i(e-6+hf(n,e)*12,t-8+hf(n,t)*15,1.8,2.7,`repair`,.4,1.15)}for(let e=-280;e<80;e+=1)for(let t=-104;t<104;t+=2){let n=_f(e+.5,t+1),r=hf(e,t);n.snow>-.3&&(n.snow>.28+r*.24?i(e,t,1,2,`snow`,.48,.94+r*.09):(n.snow>-.08||r<(n.snow+.3)*3)&&i(e,t,1,2,`ice`,.44,.92+r*.14)),n.moss>-.12&&(n.moss>.22||r<(n.moss+.12)*2.8)&&i(e,t,1,2,`moss`,.46,.86+r*.23)}for(let[r,i]of n){let n=Rd(i,!1);if(!n)throw Error(`Cannot merge S01 ground ${r}`);let a=r===`ice`?e?.ice:r===`repair`?e?.repair:r===`substrate`?e?.rubble:void 0,o=new io({vertexColors:!0,map:a??null});o.name=`s01-ground-${r}`,a&&(o.onBeforeCompile=e=>{if(!e.fragmentShader.includes(`#include <map_fragment>`))throw Error(`Unsupported S01 ground shader`);e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`
          vec3 groundBase = diffuseColor.rgb;
          #include <map_fragment>
          vec3 groundDetail = diffuseColor.rgb / max(groundBase, vec3(0.0001));
          float groundGrain = dot(groundDetail, vec3(0.2126, 0.7152, 0.0722));
          diffuseColor.rgb = groundBase * clamp(0.75 + groundGrain * 0.8, 0.78, 1.22);
        `)},o.customProgramCacheKey=()=>`s01-ground-grain-v1`);let s=new J(n,o);s.name=`ground-${r}`,s.receiveShadow=!0,t.add(s);for(let e of i)e.dispose()}return t}function yf(e,t,n){let r=[],i=[],a=e.getAttribute(`position`),o=e.getIndex(),s=e=>Bu(Ku,e.x+Ku.projection.origin[0],e.z+Ku.projection.origin[1])[0],c=(e,t,n)=>{let r=[];for(let i=0;i<e.length;i++){let a=e[i],o=e[(i+1)%e.length],c=s(a)-t,l=s(o)-t,u=n?c<=0:c>=0,d=n?l<=0:l>=0;u&&r.push(a),u!==d&&r.push(a.clone().lerp(o,c/(c-l)))}return r},l=(e,t)=>{for(let n=1;n+1<e.length;n++){let a=[e[0],e[n],e[n+1]];if(a[1].clone().sub(a[0]).cross(a[2].clone().sub(a[0])).lengthSq()<1e-10)continue;let o=r.length/3;for(let e of a)r.push(e.x,e.y,e.z);let s=i[i.length-1];s&&s.materialIndex===t&&s.start+s.count===o?s.count+=3:i.push({start:o,count:3,materialIndex:t})}};for(let e=0;e<(o?.count??a.count);e+=3){let r=[0,1,2].map(t=>new W().fromBufferAttribute(a,o?o.getX(e+t):e+t));Math.max(...r.map(e=>e.y))-Math.min(...r.map(e=>e.y))<.01?l(r,0):(l(c(r,t,!0),1),l(c(r,n,!1),1))}let u=new ur;u.setAttribute(`position`,new q(new Float32Array(r),3));for(let e of i)u.addGroup(e.start,e.count,e.materialIndex);return u.computeVertexNormals(),u}var bf={minU:-88,maxU:80,halfWidth:112,focusU:-4,edgeMinU:-172,edgeMaxU:164,groundY:.5,snowY:.54,cameraElevation:45,archHeight:380,deckBottom:-16},xf=[-1,1].flatMap(e=>Array.from({length:8},(t,n)=>({startU:-172+n*42,endU:-172+(n+1)*42,v:e*110,foreground:e===1}))),Sf=[-1,1].flatMap(e=>Array.from({length:4},(t,n)=>({startU:-172+n*84,endU:-172+(n+1)*84,v:e*111}))),Cf={tileWorldSize:64,texelsPerTile:64,shadowMapSize:2048,sampleFocusU:-155},wf=(e,t)=>e>=Nd.minU&&e<=Nd.maxU&&t>=Nd.minV&&t<=Nd.maxV,Tf=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)};function Ef(e,t=64){let n=e.getAttribute(`position`),r=e.getAttribute(`normal`),i=new Float32Array(n.count*2);for(let e=0;e<n.count;e++){let a=Math.abs(r.getY(e)),o=Math.abs(r.getX(e));i[e*2]=(a>.6||o<=Math.abs(r.getZ(e))?n.getX(e):n.getZ(e))/t,i[e*2+1]=(a>.6?n.getZ(e):n.getY(e))/t}return e.setAttribute(`uv`,new q(i,2)),e}var Df=class{group=new cn;towerViews=new Map;textureErrors=[];batches=new Map;flames=[];crystals=[];towerMaterials=new Set;towerOpacity=1;lastTime=0;disposed=!1;constructor(t={}){this.group.name=`S01 Howling Abyss · P2 ground 02`;let n=new No,i=t=>{let i=n.load(t,e=>{this.disposed&&e.dispose()},void 0,()=>this.textureErrors.push(t));return i.magFilter=i.minFilter=r,i.generateMipmaps=!1,i.wrapS=i.wrapT=e,i.colorSpace=Le,i},a=af(i(Bd),`floor`),o=af(i(Vd),`wall`),s=af(i(Hd),`moss`),c=new io({color:9018279}),l=new io({color:2504766}),u=new io({color:1518130}),d=new io({color:3563123}),f=new io({color:1320495}),p=(e,t,n,r,i,a,o=0)=>{let s=new J(new vi(n,r,i));s.position.copy(Q(e,t)),s.rotation.y=o,s.updateMatrix(),this.batch(Ef(s.geometry.applyMatrix4(s.matrix)),a)},m=(e,t,n,r,i,a,o=8)=>{let s=new yi(n,r,i,o).translate(e.x-3100,t,e.y-1700);this.batch(Ef(s),a)},h=(e,t,n,r,i,a)=>{p({x:(e.x+t.x)/2,y:(e.y+t.y)/2},n+r/2,Math.hypot(e.x-t.x,e.y-t.y),r,i,a,-Math.atan2(t.y-e.y,t.x-e.x))},g=new $i;Ju.forEach((e,t)=>{let n=Q(e);t===0?g.moveTo(n.x,-n.z):g.lineTo(n.x,-n.z)}),g.closePath();let _=new La(g,{depth:112,bevelEnabled:!1});_.rotateX(-Math.PI/2).translate(0,-114,0);let v=t.centralArt?yf(_,bf.edgeMinU,bf.edgeMaxU):_;v!==_&&_.dispose(),Ef(v);let y=new J(v,[a,o]);y.receiveShadow=!0,this.group.add(y);let b=[],x=Ju.map(e=>e.x),S=Ju.map(e=>e.y),C=Cf.tileWorldSize;for(let e=Math.floor(Math.min(...S)/C)*C;e<Math.max(...S);e+=C)for(let t=Math.floor(Math.min(...x)/C)*C;t<Math.max(...x);t+=C){let[n,r]=Bu(Ku,t,e);wf(n,r)&&[-32,32].every(n=>[-32,32].every(r=>Zu({x:t+n,y:e+r})))&&b.push({x:t,y:e})}let w=new Gr(new vi(C+.06,2,C+.06),a,b.length),T=new sn;b.forEach((e,t)=>{T.position.copy(Q(e,-1)),T.updateMatrix(),w.setMatrixAt(t,T.matrix),w.setColorAt(t,new K().setScalar(.93+Tf(t)*.07))}),w.instanceMatrix.needsUpdate=!0,w.instanceColor&&(w.instanceColor.needsUpdate=!0),w.computeBoundingSphere(),w.receiveShadow=!0,this.group.add(w),this.group.add(vf({rubble:i(Ud),repair:i(Wd),ice:i(Gd)}));for(let e=-1;e<=1;e+=2)for(let n=-280,r=0;n<80;n+=20,r++){if(t.centralArt&&n>=bf.edgeMinU)continue;let i=t.centralArt?Math.min(n+19.4,bf.edgeMinU):n+19.4,a=Z(n,e*110),s=Z(i,e*110),l=r%5==2;if(h(a,s,-54,54,24,o),h(a,s,-12,4,25,f),h(a,s,-53,5,28,c),l)h(a,Z(n+8,e*110),0,13,17,o),p(Z(n+12,e*101),4,13,8,9,c,Tf(r)*2);else{let t=24+Tf(r+e)*12;h(a,s,0,t,15,o),h(a,s,t,5,22,c),h(a,s,t-2,2,23,f)}let d=Z(n,e*110);p(d,23,29,48,27,o),p(d,50,34,7,32,c),p(d,-48,30,90,29,o),r%3==0&&(p(d,-215,42,320,45,o),p(d,-105,66,22,62,o),p(d,-348,68,20,65,c),p(d,-370,80,26,76,o));let m=new Si(1,0);m.scale(100+Tf(r)*90,180+Tf(r+1)*180,110),m.rotateY(Tf(r)*Math.PI);let g=Q(Z(n+12,e*(205+Tf(r)*100)),-470);m.translate(g.x,g.y,g.z),this.batch(Ef(m),u);for(let t=0;t<4;t++)p(Z(n+t*4,e*(85+Tf(r*13+t)*15)),2+t%2,5+Tf(t+r)*8,4+t%3,5+Tf(t)*7,t%3?o:c,Tf(r+t)*3)}this.vegetation(s,c,!!t.centralArt);let E=new cn,D=Z(-195,0);E.name=`blue-outer`;let O=(e,t,n)=>{let r=t.clone();r.onBeforeCompile=t.onBeforeCompile,r.customProgramCacheKey=t.customProgramCacheKey,this.towerMaterials.add(r);let i=new J(Ef(e),r);return i.position.y=n,i.castShadow=i.receiveShadow=!0,E.add(i),i},k=O(new yi(25,28,10,8).scale(1,1,.65),a,5);k.position.z=-8;let A=O(new yi(22,25,16,8).scale(1,1,.7),o,18);A.position.z=-8,O(new yi(20,27,85,8),o,68),O(new yi(28,29,4,8),f,29),O(new yi(23,25,5,8),c,40),O(new yi(24,25,4,8),f,106),O(new yi(27,23,9,8),c,112),O(new yi(22,26,10,8),l,122);for(let e=0;e<4;e++){let t=Math.cos(e*Math.PI/2+Math.PI/4)*22,n=Math.sin(e*Math.PI/2+Math.PI/4)*22,r=O(new vi(8,80,8),c,72);r.position.x=t,r.position.z=n;let i=O(new bi(7,28,4),o,136);i.position.x=t,i.position.z=n}let ee=new io({color:9554135,emissive:2919849,emissiveIntensity:.32}),j=O(new Ba(13,0).scale(.85,1.65,.85),ee,143);this.crystals.push(j);let M=new $i;M.moveTo(-13,0),M.lineTo(13,0),M.lineTo(13,34),M.lineTo(0,46),M.lineTo(-13,34),M.closePath();let N=new Qi;N.moveTo(-7,4),N.lineTo(-7,30),N.lineTo(0,37),N.lineTo(7,30),N.lineTo(7,4),N.closePath(),M.holes.push(N);let te=O(new vi(22,40,2),f,72);te.position.z=23;let P=O(new La(M,{depth:4,bevelEnabled:!1}),c,50);P.position.z=25;let ne=O(new vi(2,28,2),l,69);ne.position.z=26;let F=new $i;F.moveTo(-9,22),F.lineTo(9,22),F.lineTo(9,-17),F.lineTo(3,-22),F.lineTo(0,-16),F.lineTo(-5,-24),F.lineTo(-9,-19),F.closePath();let re=O(new La(F,{depth:1.5,bevelEnabled:!1}),d,66);re.position.set(-23,66,14),re.rotation.y=-Math.PI/3,E.position.copy(Q(D)),this.group.add(E),this.towerViews.set(`blue`,E),ee.dispose(),d.dispose();for(let e of tf){let[n]=Bu(Ku,e.x,e.y),r=!!t.centralArt&&n>=bf.edgeMinU&&n<=bf.edgeMaxU,i=e;r||(m(i,62,9,13,24,o),m(i,80,11,7,12,l),m(i,89,15,10,6,l));let a=new J(new bi(9,24,5),new Sr({color:16758879,toneMapped:!1}));a.position.copy(Q(i,103)),a.visible=!r,this.group.add(a);let s=new J(new bi(4,16,4),new Sr({color:16769701,toneMapped:!1}));s.position.y=-1,a.add(s);let c=new Yo(16756837,nf.fire,nf.fireRadius,1);c.position.copy(Q(i,98)),this.group.add(c),this.flames.push({mesh:a,light:c,phase:e.phase})}for(let[e,t]of this.batches){let n=Rd(t,!1);if(!n)throw Error(`Cannot merge S01 module batch`);let r=new J(n,e);r.castShadow=r.receiveShadow=!0,this.group.add(r);for(let e of t)e.dispose()}this.batches.clear(),this.group.add(new Fo(11125465,2306869,nf.hemisphere));let ie=Q(Z(-110)),ae=new Qo(16769732,nf.sun);ae.position.copy(ie).add(new W(-500,850,400)),ae.target.position.copy(ie),ae.castShadow=!0,ae.shadow.mapSize.set(Cf.shadowMapSize,Cf.shadowMapSize),Object.assign(ae.shadow.camera,{left:-1050,right:1050,top:550,bottom:-550,near:20,far:2200}),ae.shadow.normalBias=.8,ae.shadow.bias=-2e-4,this.group.add(ae,ae.target);let oe=new Qo(7903928,nf.fill);oe.position.copy(ie).add(new W(500,250,-600)),oe.target.position.copy(ie),this.group.add(oe,oe.target)}batch(e,t){let n=this.batches.get(t)??[];n.push(e),this.batches.set(t,n)}vegetation(e,t,n){for(let r=0;r<180;r++){let i=-275+Tf(r*7)*350,a=r%2?1:-1;if(n&&i>=bf.edgeMinU)continue;let o=Q(Z(i,a*(84+Tf(r*11)*17)),.5),s=new bi(2+Tf(r)*3,9+Tf(r+1)*15,3);s.rotateZ((Tf(r+3)-.5)*.5).translate(o.x,o.y+6,o.z),a<0?this.batch(Ef(s),r%11==0?t:e):s.dispose()}}update(e,t,n){this.towerViews.get(`blue`).visible=t,e<this.lastTime&&(this.towerOpacity=1);let r=Math.max(0,Math.min(.1,e-this.lastTime));this.lastTime=e;let i=n?ff(n.point,Z(-195),n.height,n.camera):1;this.towerOpacity+=(i-this.towerOpacity)*(1-Math.exp(-12*r));for(let e of this.towerMaterials){let t=this.towerOpacity<.995;e.transparent!==t&&(e.transparent=t,e.needsUpdate=!0),e.opacity=t?this.towerOpacity:1,e.depthWrite=!t}for(let t of this.flames){let n=of(e,t.phase);t.mesh.scale.set(1/Math.sqrt(n),n,1),t.light.intensity=nf.fire*n}for(let t of this.crystals)t.rotation.y=e*.25,t.position.y=143+Math.sin(e*1.7)*2}dispose(){this.disposed||(this.disposed=!0,this.group.traverse(e=>{e instanceof Qo&&e.shadow.dispose()}),Ld(this.group),this.group.removeFromParent(),this.group.clear())}},Of={key:`yasuo-flute-user`,sheet:`flute.png`,width:64,height:113,frame_count:32,columns:8,rows:4,anchor:[32,108],durations_ms:[125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125],duration_ms:4e3,scale_in_world:.25,source_sha256:`9f8a3a7724c50e854d53f2a94e0e5e7dfc22fd48269b222313a6a039a617e585`,bounds:[[2,3,61,110],[3,3,61,110],[3,2,61,110],[3,2,61,110],[3,1,61,110],[3,0,61,110],[3,1,61,110],[2,5,61,110],[2,7,61,110],[1,7,61,110],[1,5,61,110],[0,3,61,110],[2,3,61,110],[2,3,61,110],[3,2,61,110],[3,2,61,110],[3,1,61,110],[3,4,61,110],[1,6,61,110],[1,4,61,110],[1,4,61,110],[0,3,61,110],[3,3,61,110],[3,2,61,110],[3,2,61,110],[3,3,61,110],[2,6,61,110],[1,6,61,110],[1,4,61,110],[1,4,61,110],[2,3,61,110],[2,3,61,110]]};function kf(e,t){return e.hp>0&&e.fluteAt!=null&&t>=e.fluteAt}var Af={hero:`yasuo`,selection:`user_approved`,attack_direction:`se`,scale_in_world:.25,attacks:[{id:`A`,key:`yasuo-attack-A`,name:`高位→低位`,webp:`attack-A.webp`,sheet:`attack-A.png`,width:200,height:128,frame_count:24,columns:8,rows:3,durations_ms:[125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125],duration_ms:3e3,anchor:[64,124],impact_frame:6,source_sha256:`c4a040b7b050067deb56e9fe2ad2e75af1e284a687dc181876d8000a7a78e273`,atlas_sha256:`6c53341844f1eb5a6ade140c86c6c136f3259285a4e5e9cc1b8b01e2fcb1b48a`,source_pixels_preserved:!0,edge_contact_frames:[6]},{id:`B`,key:`yasuo-attack-B`,name:`低位→高位`,webp:`attack-B.webp`,sheet:`attack-B.png`,width:200,height:128,frame_count:24,columns:8,rows:3,durations_ms:[125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125],duration_ms:3e3,anchor:[64,124],impact_frame:10,source_sha256:`97554048d5f1a15ef5063f425c2597c2737988157e96639414c2dfd747831ab2`,atlas_sha256:`27551160e8a30b1f6e12e1bf551aff3a91676164506fe08466f295f2ea33ac8b`,source_pixels_preserved:!0,edge_contact_frames:[7,8,9,12]}],locomotion:[{state:`idle`,direction:`e`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-idle-e`,sheet:`idle-e.png`,anchor:[64,115],source_sha256:`0b5ed77dd4728f72e29d858840da94032f442ebb834aed34c6fedf3b5b8fa1c6`},{state:`walk`,direction:`e`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-walk-e`,sheet:`walk-e.png`,anchor:[64,115],source_sha256:`4778acf5aba2c2fd0b96ddb0c6f1a94a502c559d8aef92f1c98a4cba598f7a59`},{state:`idle`,direction:`se`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-idle-se`,sheet:`idle-se.png`,anchor:[64,115],source_sha256:`37a53d6de5675c1f6d7b13d40c7887fbeb476cae6f809cc66aaa39419961e926`},{state:`walk`,direction:`se`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-walk-se`,sheet:`walk-se.png`,anchor:[64,115],source_sha256:`44a88b4978f96bb1c2b8c7ffaab06767f7ec2d89da2a959d909334fa5632031c`},{state:`idle`,direction:`s`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-idle-s`,sheet:`idle-s.png`,anchor:[64,116],source_sha256:`a9c03d57e05e703a8ceb59212e2d121cf9506423c5117d5a59331d9a86f3bf28`},{state:`walk`,direction:`s`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-walk-s`,sheet:`walk-s.png`,anchor:[64,116],source_sha256:`93bdebdfaf8275efea981046481be08f3db4d95406970bc856bb50ba12283f81`},{state:`idle`,direction:`sw`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-idle-sw`,sheet:`idle-sw.png`,anchor:[64,116],source_sha256:`97c9ab59ac636086a3cbe6a7258e62f634819f4d7d5adbdbe8bfe09c54c5a558`},{state:`walk`,direction:`sw`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-walk-sw`,sheet:`walk-sw.png`,anchor:[64,116],source_sha256:`396df3a2bcc680a9753afed76494794febe35fb264c210ff378bce1bbee4cf56`},{state:`idle`,direction:`w`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-idle-w`,sheet:`idle-w.png`,anchor:[64,115],source_sha256:`04815240ab1513fff04fe48cf1b035a591d9193b2dcee1ad5f29d6e388b221b5`},{state:`walk`,direction:`w`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-walk-w`,sheet:`walk-w.png`,anchor:[64,115],source_sha256:`07665c867cbdec0d45dd83b3c9ecbb4c721894ef44ce6c194771ba5590986b7c`},{state:`idle`,direction:`nw`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-idle-nw`,sheet:`idle-nw.png`,anchor:[64,115],source_sha256:`93ee91e4f439f999d0f0a9deed3ede157ce19cd45d1f6fed3d0dd3c47b632099`},{state:`walk`,direction:`nw`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-walk-nw`,sheet:`walk-nw.png`,anchor:[64,115],source_sha256:`f3f1b29099cab9faa21962003a45e7ed44c91cebd4c3ee63948684f9a51996fc`},{state:`idle`,direction:`n`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-idle-n`,sheet:`idle-n.png`,anchor:[64,116],source_sha256:`50124cca408adc62cebd576bde3637cf3a5fdeb00b118a05c11d4de9e66562ee`},{state:`walk`,direction:`n`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-walk-n`,sheet:`walk-n.png`,anchor:[64,116],source_sha256:`dbd23ed212f1ea9f4556c83e5194fb6f8dca8f1b9481e062755680c81a85f8a0`},{state:`idle`,direction:`ne`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-idle-ne`,sheet:`idle-ne.png`,anchor:[64,115],source_sha256:`796e8744b879d16b0a0378b8b0138bfe984a396a4554a6183940000e4cb56d9f`},{state:`walk`,direction:`ne`,width:128,height:128,frame_count:8,columns:3,rows:3,durations_ms:[100,100,100,100,100,100,100,100],duration_ms:800,key:`yasuo-walk-ne`,sheet:`walk-ne.png`,anchor:[64,115],source_sha256:`d0537f9c3732580e4105b93d43585039843d964dcd5a71f61a419093c7b7aa3b`}],seams:[{from:`A`,to:`B`,visible_pixels_identical:!1},{from:`B`,to:`A`,visible_pixels_identical:!1}],generated_this_turn:!1,credits_consumed:0,notes:`原始文件逐字节保留，图集逐帧RGBA一致。不剪帧、不重画。攻击只支持右下样稿，不旋转或镜像。`},jf={attacks:[{id:`A`,key:`yasuo-attack-A`,name:`A v2`,webp:`attack-A.webp`,sheet:`attack-A.png`,width:201,height:201,frame_count:48,columns:8,rows:6,durations_ms:[42,42,42,42,42,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41],duration_ms:1973,anchor:[48,168],impact_frame:20,source_pixels_preserved:!0,source_sha256:`d0ccf9cb73128f83f0d924c8f006339acc863cdc9ac1503bf4e8339e1945720b`},{id:`B`,key:`yasuo-attack-B`,name:`B v2`,webp:`attack-B.webp`,sheet:`attack-B.png`,width:201,height:201,frame_count:48,columns:8,rows:6,durations_ms:[42,42,42,42,42,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41],duration_ms:1973,anchor:[48,168],impact_frame:16,source_pixels_preserved:!0,source_sha256:`bb34a9b0aa5c47426097f09ed47cdaf6686df2a52344627903d5efb751c8ecbc`}]},Mf={hero:`yasuo`,frame_count:16,cycle_ms:800,source:`Meowa animate-run`,locomotion:[{state:`idle`,direction:`se`,key:`yasuo-idle-se`,sheet:`idle-se.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,115],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`9474ece662ee08382864b07e6f53c9d17f24fd8dab2136fd2875be78096fc334`},{state:`walk`,direction:`se`,key:`yasuo-walk-se`,sheet:`walk-se.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,115],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`c093a549682660cb41f40b7b5d1306eca770a436dae41df0cc0e97432192a0a5`},{state:`idle`,direction:`e`,key:`yasuo-idle-e`,sheet:`idle-e.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,115],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`38ad5d604bf80fe3d165c67071213893b4a44558c3817cd36e843897102b617e`},{state:`walk`,direction:`e`,key:`yasuo-walk-e`,sheet:`walk-e.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,115],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`8ffa543bb4cab7d644b7dc776ecee9697e561fb42035205f408861e6dcf85dfb`},{state:`idle`,direction:`s`,key:`yasuo-idle-s`,sheet:`idle-s.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,116],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`d9c7a2132c5cce1018aea47ef790620a80d8c964b84072db603cf5f2d89d45e0`},{state:`walk`,direction:`s`,key:`yasuo-walk-s`,sheet:`walk-s.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,116],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`c243a460a5924d945fccfe216018848453e60e1d989adae0b8096692294ba937`},{state:`idle`,direction:`sw`,key:`yasuo-idle-sw`,sheet:`idle-sw.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,116],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`41c700b2f81ba9e7eb1e28d8e8126524f71c132320d5d672afe7520ca3564a32`},{state:`walk`,direction:`sw`,key:`yasuo-walk-sw`,sheet:`walk-sw.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,116],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`1bbb22b27d4326f010c35bdac79cb7e80abee74dd27d0759b5239fdd707860e8`},{state:`idle`,direction:`w`,key:`yasuo-idle-w`,sheet:`idle-w.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,115],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`15e9c94e8c762b4b53a0217ddecb3685fedc94be361ad45f861db9bb93dc1c33`},{state:`walk`,direction:`w`,key:`yasuo-walk-w`,sheet:`walk-w.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,115],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`a97c2ac539a27656dca15626554ac760e6a28d4264558b2891de8125f4e33d11`},{state:`idle`,direction:`nw`,key:`yasuo-idle-nw`,sheet:`idle-nw.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,115],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`f899373460ba8151d394fcd63b9e51b17e133fa81fcf9dfab14e2530aaf3ebc1`},{state:`walk`,direction:`nw`,key:`yasuo-walk-nw`,sheet:`walk-nw.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,115],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`714edd1d768d851a87f855e368158e56d420f532f114e7eba4f13c2d4e160abb`},{state:`idle`,direction:`n`,key:`yasuo-idle-n`,sheet:`idle-n.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,116],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`d023ba552fb1a8d0bc2b988c4e3220fe42da851ce84f749174651ca04baa1fc9`},{state:`walk`,direction:`n`,key:`yasuo-walk-n`,sheet:`walk-n.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,116],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`2fab23a56dd0781f50e075c02888c65adef8dac8f275986d34371e2fb7e5dbbb`},{state:`idle`,direction:`ne`,key:`yasuo-idle-ne`,sheet:`idle-ne.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,115],durations_ms:[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],duration_ms:800,source_pixels_preserved:!0,source_sha256:`6444d242d7419a4318b34b9e3df47248c36ec8679bc674e50866db8a9534d049`},{state:`walk`,direction:`ne`,key:`yasuo-walk-ne`,sheet:`walk-ne.png`,width:128,height:128,frame_count:16,columns:4,rows:4,anchor:[64,115],durations_ms:[20,20,57,57,57,57,57,57,57,57,57,57,57,57,56,20],duration_ms:800,source_pixels_preserved:!0,source_sha256:`306810ffb4018748a4a67e51dd13d5eaeb5f4994d9d541cdbce6e47e47211d7b`}]},Nf=[`e`,`se`,`s`,`sw`,`w`,`nw`,`n`,`ne`],Pf=Math.PI*2,Ff=Pf/Nf.length;function If(e,t,n=4){if(!Number.isFinite(e))throw RangeError(`Heading must be finite`);if(!Number.isFinite(n)||n<0||n>=22.5)throw RangeError(`Hysteresis must be between 0 and 22.5 degrees`);let r=(e%Pf+Pf)%Pf;if(t!==void 0){let e=Nf.indexOf(t)*Ff,i=Math.atan2(Math.sin(r-e),Math.cos(r-e));if(Math.abs(i)<=Ff/2+n*Math.PI/180)return t}return Nf[Math.floor((r+Ff/2)/Ff)%Nf.length]}function $(e,t){return Math.hypot(e.x-t.x,e.y-t.y)}function Lf(e,t,n){return Math.max(t,Math.min(n,e))}function Rf(e,t=8){return Qu?Xu(e,t):{x:Lf(e.x,t,ed.width-t),y:Lf(e.y,t,ed.height-t)}}function zf(e,t){let n=$(e,t);return n>0?{x:(t.x-e.x)/n,y:(t.y-e.y)/n}:{x:1,y:0}}function Bf(e,t,n){if($(e,t)<=n){e.x=t.x,e.y=t.y;return}let r=zf(e,t);e.x+=r.x*n,e.y+=r.y*n}function Vf(e,t,n){let r=n.x-t.x,i=n.y-t.y,a=r*r+i*i,o=a===0?0:Lf(((e.x-t.x)*r+(e.y-t.y)*i)/a,0,1);return $(e,{x:t.x+r*o,y:t.y+i*o})}var Hf={multiplier:1.6,duration:45,combatLock:8};function Uf(e,t){if(e.kind!==`hero`)return;let n=id[e.team],r=ad[e.team],i=zf(n,r),a=(e.x-n.x)*i.x+(e.y-n.y)*i.y,o=e.targetId!==null||e.windup>0||e.qCast||e.q3Cast||e.wCast||e.eCast||e.rCast,s=t-e.hitAt<Hf.combatLock;o||s||e.hp<=0?(o&&(e.homeguardCombatAt=t),e.homeguardUntil=0):t-(e.homeguardCombatAt??-1/0)<Hf.combatLock?e.homeguardUntil=0:($(e,n)<nd.fountainRadius&&(e.homeguardUntil=t+Hf.duration),a>=Math.max(nd.fountainRadius,$(n,r)-70)&&(e.homeguardUntil=0))}function Wf(e,t){return e.kind===`hero`&&e.hp>0&&(e.homeguardUntil??0)>t}var Gf={version:`v29-meowa-layered-corrected-elbows`,blade_length_scale:3,cast_duration_ms:480,sample_step_ms:16,scale_in_world:.24074074074074073,visible_body_height_in_world:26,clips:[{direction:`nw`,key:`yasuo-q-nw-wind`,sheet:`q-nw-layered.png`,width:480,height:430,anchor:[234,272],frame_count:31,columns:4,rows:8,source_pixels_preserved:!1},{direction:`n`,key:`yasuo-q-n-wind`,sheet:`q-n-layered.png`,width:480,height:430,anchor:[234,272],frame_count:31,columns:4,rows:8,source_pixels_preserved:!1},{direction:`ne`,key:`yasuo-q-ne-wind`,sheet:`q-ne-layered.png`,width:480,height:430,anchor:[234,272],frame_count:31,columns:4,rows:8,source_pixels_preserved:!1},{direction:`w`,key:`yasuo-q-w-wind`,sheet:`q-w-layered.png`,width:480,height:430,anchor:[234,272],frame_count:31,columns:4,rows:8,source_pixels_preserved:!1},{direction:`e`,key:`yasuo-q-e-wind`,sheet:`q-e-layered.png`,width:480,height:430,anchor:[234,272],frame_count:31,columns:4,rows:8,source_pixels_preserved:!1},{direction:`sw`,key:`yasuo-q-sw-wind`,sheet:`q-sw-layered.png`,width:480,height:430,anchor:[234,272],frame_count:31,columns:4,rows:8,source_pixels_preserved:!1},{direction:`s`,key:`yasuo-q-s-wind`,sheet:`q-s-layered.png`,width:480,height:430,anchor:[234,272],frame_count:31,columns:4,rows:8,source_pixels_preserved:!1},{direction:`se`,key:`yasuo-q-se-wind`,sheet:`q-se-layered.png`,width:480,height:430,anchor:[234,272],frame_count:31,columns:4,rows:8,source_pixels_preserved:!1}]},Kf=Gf;function qf(e,t){if(!_d(e,t))return null;let n=e.qCast,r=If(n.facing),i=Gf.clips.find(e=>e.direction===r),a=Math.max(0,t-n.startedAt)*1e3;return{clip:i,frame:Math.min(i.frame_count-1,Math.floor(a/Gf.sample_step_ms)),state:`Q`,scale:Gf.scale_in_world}}var Jf={directions:[{direction:`nw`,width:128,height:128,count:8,durations:[100,100,100,100,100,100,100,100],totalDuration:800,columns:4,bounds:[[34,10,94,117],[34,14,94,117],[34,17,94,117],[34,16,94,117],[34,10,94,117],[34,14,94,117],[34,17,94,117],[34,16,94,117]],alpha:[[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255]],edgeContacts:[],sourceJob:`job_215b68e27630480d8e180808671f5858`},{direction:`n`,width:128,height:128,count:8,durations:[100,100,100,100,100,100,100,100],totalDuration:800,columns:4,bounds:[[33,9,95,118],[33,13,95,118],[33,16,95,118],[33,13,95,118],[33,9,95,118],[33,13,95,118],[33,15,95,118],[33,13,95,118]],alpha:[[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255]],edgeContacts:[],sourceJob:`job_cb0dfa4bf0d04e65a5055482fa046ecf`},{direction:`ne`,width:128,height:128,count:8,durations:[100,100,100,100,100,100,100,100],totalDuration:800,columns:4,bounds:[[34,10,94,117],[34,14,94,117],[34,18,94,117],[33,17,94,117],[34,15,94,117],[34,15,94,117],[34,16,94,118],[34,20,94,117]],alpha:[[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255]],edgeContacts:[],sourceJob:`job_fd26f410ffb84dc08c535f42d178b525`},{direction:`w`,width:128,height:128,count:8,durations:[100,100,100,100,100,100,100,100],totalDuration:800,columns:4,bounds:[[37,10,92,116],[37,22,94,117],[37,24,97,117],[37,15,92,117],[37,10,92,117],[37,22,94,116],[37,24,97,117],[37,14,92,117]],alpha:[[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255]],edgeContacts:[],sourceJob:`job_96a44739ba854180b61f6d83f5fd87b4`},{direction:`e`,width:128,height:128,count:8,durations:[100,100,100,100,100,100,100,100],totalDuration:800,columns:4,bounds:[[36,10,91,116],[36,13,91,116],[36,17,91,116],[33,23,91,117],[33,20,91,116],[35,18,91,116],[36,14,91,117],[36,11,91,117]],alpha:[[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255]],edgeContacts:[],sourceJob:`job_f0b721d723114653a29710829e1d41ee`},{direction:`sw`,width:128,height:128,count:8,durations:[100,100,100,100,100,100,100,100],totalDuration:800,columns:4,bounds:[[34,10,94,116],[34,13,94,117],[34,18,94,116],[33,19,94,117],[33,13,94,117],[33,15,94,117],[33,21,94,117],[33,21,94,117]],alpha:[[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255]],edgeContacts:[],sourceJob:`job_631bb8fd8dcf40dc9d0b666ce6d2ed5a`},{direction:`s`,width:128,height:128,count:8,durations:[100,100,100,100,100,100,100,100],totalDuration:800,columns:4,bounds:[[33,8,95,119],[33,11,99,118],[33,9,102,118],[33,8,98,119],[33,8,95,119],[33,11,99,119],[33,9,102,119],[33,8,98,119]],alpha:[[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255]],edgeContacts:[],sourceJob:`job_3a121a702b424ad498db7778600b91cc`},{direction:`se`,width:128,height:128,count:8,durations:[100,100,100,100,100,100,100,100],totalDuration:800,columns:4,bounds:[[34,10,94,117],[34,13,94,117],[34,18,94,116],[34,20,94,117],[34,15,94,117],[34,14,94,117],[34,13,94,117],[34,18,94,117]],alpha:[[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255],[0,255]],edgeContacts:[],sourceJob:`job_60906dfa4c2a430fab52eaab0cbafed6`}]},Yf={range:100,travel:128,startup:.08,dash:.44,recovery:.12,duration:.64,targetCooldown:6},Xf={radius:38,windup:.1,recovery:.3,duration:.4,frameSeconds:.1};function Zf(e,t){return!!e.eCast&&e.hp>0&&t<e.eCast.startedAt+Yf.duration}function Qf(e,t){let n=zf(e,t),r=(e.radius??11)+(t.radius??7)+6,i=Math.min(Yf.travel,$(e,t)+r);return Rf({x:e.x+n.x*i,y:e.y+n.y*i},e.radius??11)}function $f(e,t,n){let r=md(t,n);return r&&r.team!==e.team&&r.kind!==`tower`?r:void 0}var ep=Jf.directions.map(e=>({key:`yasuo-e-${e.direction}`,direction:e.direction,width:e.width,height:e.height,frame_count:e.count,anchor:[64,117],durations_ms:e.durations}));function tp(e,t){if(!Zf(e,t)&&!(e.hp>0&&e.eqCast&&t<e.eqCast.endsAt))return null;let n=e.eCast??{startedAt:e.eqCast.eStartedAt,facing:e.eqCast.facing},r=ep.find(e=>e.direction===If(n.facing)),i=Math.max(0,Math.min(1,(t-n.startedAt)/Yf.duration));return{clip:r,frame:Math.min(r.frame_count-1,Math.floor(i*r.frame_count)),state:`E`,scale:.25}}var np=Of,rp={...Af,attacks:jf.attacks,locomotion:Mf.locomotion};function ip(e){return Math.cos(e)<-.001}var ap=rp,op=1.04;function sp(e,t){return e.speed/nd.hero.speed*(.8/op)*(Wf(e,t)?Hf.multiplier:1)*(e.slowUntil>t?.7:1)}function cp(e,t,n){let r=t.reduce((e,t)=>e+t,0);if(!Number.isFinite(e)||e<0||!t.length||t.some(e=>!Number.isFinite(e)||e<=0))throw RangeError(`Invalid sprite timing`);let i=n?e%r:Math.min(e,r);for(let e=0;e<t.length;e++){if(i<t[e])return e;i-=t[e]}return t.length-1}function lp(e){let t=e.attacksReleased-(e.attackReleasedAt===null?0:1);return rp.attacks[Math.max(0,t)%2]}function up(e,t,n=lp(e)){let r=n.durations_ms.slice(0,n.impact_frame).reduce((e,t)=>e+t,0);return cp(e.attackReleasedAt===null?Math.min(1,Math.max(0,(t-(e.attackStartedAt??t))/nd.hero.windup))*r:r+Math.min(1,Math.max(0,(t-e.attackReleasedAt)/e.attackInterval))*(n.duration_ms-r),n.durations_ms,!1)}var dp=class{previous=null;moving=!1;direction;locomotionMs=0;locomotionAt=0;locomotionState=null;reset(){this.previous=null,this.moving=!1,this.direction=void 0,this.locomotionMs=0,this.locomotionAt=0,this.locomotionState=null}sample(e,t){if(this.previous&&this.previous.time!==t&&(this.moving=Math.hypot(e.x-this.previous.x,e.y-this.previous.y)>.01),this.previous={x:e.x,y:e.y,time:t},this.direction=If(e.facing,this.direction),kf(e,t))return this.locomotionState=null,{clip:Of,frame:cp((t-e.fluteAt)*1e3,Of.durations_ms,!0),state:`flute`,scale:Of.scale_in_world};let n=tp(e,t);if(n)return this.locomotionState=null,n;let r=qf(e,t);if(r)return this.locomotionState=null,r;if(e.hp>0&&e.attackStartedAt!==null&&(e.windup>0||!this.moving&&e.attackReleasedAt!==null&&t-e.attackReleasedAt<=e.attackInterval)){let n=lp(e);return this.locomotionState=null,{clip:n,frame:up(e,t,n),state:n.id,scale:rp.scale_in_world}}let i=this.moving&&e.hp>0?`walk`:`idle`,a=rp.locomotion.find(e=>e.state===i&&e.direction===this.direction);return this.locomotionState!==i||t<this.locomotionAt?this.locomotionMs=0:this.locomotionMs+=Math.max(0,t-this.locomotionAt)*1e3*(i===`walk`?sp(e,t):1),this.locomotionAt=t,this.locomotionState=i,{clip:a,frame:cp(this.locomotionMs,a.durations_ms,!0),state:i,scale:rp.scale_in_world}}},fp=`/assets/body-PlhHcYU6.png`,pp=`/assets/sword-DoZx7vKN.png`,mp=`/assets/e-atlas-BTUilyUx.png`,hp=`/assets/e-atlas-tm2YWvKH.png`,gp=`/assets/e-atlas-2PvRl9qr.png`,_p=`/assets/e-atlas-B-1ORexh.png`,vp=`/assets/tornado-atlas-CPGl0NfA.png`,yp=`/assets/wind-wall-atlas-BXJf_TRp.png`,bp=`/assets/shield-atlas-x73nsKhp.png`,xp=`/assets/vfx-atlas-CG_2SD8I.png`,Sp=`/assets/result_images_0_url-CJk3AKp3.png`,Cp=`/assets/move-click-atlas-hZweC9s4.png`,wp=`/assets/move-click-atlas-red-DmuCmhQ6.png`,Tp={offsetX:32,offsetY:-24,animationDuration:1.6,airborneDuration:1.6,hitAt:1.312,duration:1.84};function Ep(e){return Math.max(0,Math.min(15,Math.floor(e/Tp.animationDuration*16)))}function Dp(e,t,n,r){return t.filter(t=>t.team!==e.team&&t.kind===`hero`&&t.hp>0&&(t.airborneUntil??0)>n&&$(e,t)<=r).sort((t,n)=>$(e,t)-$(e,n)||t.id-n.id)[0]}var Op=2.975,kp=Op/1.5,Ap=.25*Op,jp=gd,Mp=.18;function Np(e,t){let n=Math.cos(t)<-.001;return{frame:Math.min(36,Math.max(0,Math.floor(e/hd*37))),flipX:n,originX:.5,originY:108/113}}function Pp(e,t,n){return{frame:Math.min(15,Math.max(0,Math.floor((e-jp)/Mp*16))),rotation:Math.atan2(n,t)-Math.atan2(27,112),scale:.65*kp*.8,originX:14/135,originY:8/39}}function Fp(e,t,n,r){let i=Math.cos(r),a=Math.sin(r),o=e-jp,s=Np(e,r).flipX?-1:1;return{...Pp(e,i,a),x:t+s*16*Ap,y:n-30*Ap,visible:o>=0&&o<.18,alpha:Math.max(0,Math.min(1,o/.012,(Mp-o)/.04))}}function Ip(e){let t=Math.cos(e)<-.001;return{flipX:t,originX:t?1-48/128:48/128,originY:117/127}}var Lp={qBody:{url:fp,width:64,height:113},qSword:{url:pp,width:135,height:39},cast:{url:mp,width:128,height:127},ultimate:{url:hp,width:176,height:176},ring:{url:gp,width:176,height:144},ring3:{url:_p,width:176,height:144},tornado:{url:vp,width:640,height:640},wall:{url:yp,width:560,height:244},shield:{url:bp,width:356,height:556},aura:{url:xp,width:256,height:320},homeguard:{url:Sp,width:0,height:0},move:{url:Cp,width:128,height:128},attack:{url:wp,width:128,height:128}};function Rp(e,t,n,r){if(e.rCast&&t-e.rCast.startedAt<Tp.animationDuration)return{key:`ultimate`,frame:Ep(t-e.rCast.startedAt),ax:104/176,ay:149/176,flip:!1,scale:Ap};let i=e.q3Cast??(e.wCast&&t<e.wCast.startedAt+.8?e.wCast:null);if(i){let e=Ip(n(i.facing));return{key:`cast`,frame:Math.min(7,Math.floor(Math.max(0,t-i.startedAt)*10)),ax:e.originX,ay:e.originY,flip:e.flipX,scale:Ap}}if(e.qCast&&!e.eCast){let i=Np(r??t-e.qCast.startedAt,n(e.qCast.facing));return{key:`qBody`,frame:i.frame,ax:i.originX,ay:i.originY,flip:i.flipX,scale:Ap}}return null}var zp=Xf.radius*2/176;function Bp(e,t){let n=t-e.startedAt,r=e.triggerAt-e.startedAt,i=t-e.triggerAt;return{visible:n>=0&&t<e.endsAt,frame:i<0?2:Math.min(5,3+Math.floor(i/Math.max(.001,(e.endsAt-e.triggerAt)/3))),alpha:i<0?.35+.65*Math.max(0,n/r):Math.max(0,1-i/(e.endsAt-e.triggerAt)),contact:i>=0,after:i,empowered:!!e.empowered}}var Vp=96/40;function Hp(e,t){let n=Math.max(0,(e.airborneUntil??0)-t);return Math.min(1,n/.18)*ld[e.kind].height*.4}var Up=`/assets/idle-e-Dzx57C36.png`,Wp=`/assets/idle-n-D8oHrHhx.png`,Gp=`/assets/idle-ne-BJGNeaGP.png`,Kp=`/assets/idle-nw-CcfrYXwI.png`,qp=`/assets/idle-s-fL1so062.png`,Jp=`/assets/idle-se-qX3Oc4cI.png`,Yp=`/assets/idle-sw-a6P6BQIq.png`,Xp=`/assets/idle-w-BKveRWyJ.png`,Zp=`/assets/walk-e-Bqi_rx7Z.png`,Qp=`/assets/walk-n-CjOgeOwY.png`,$p=`/assets/walk-ne-enh0cH1g.png`,em=`/assets/walk-nw-Cx6-kBKy.png`,tm=`/assets/walk-s-B6gjt78o.png`,nm=`/assets/walk-se-DJykYzpd.png`,rm=`/assets/walk-sw-CaNGsCi1.png`,im=`/assets/walk-w-2o2ypHD3.png`,am=`/assets/attack-A-DJpwytUR.png`,om=`/assets/attack-B--Vxn76M5.png`,sm=`/assets/game-preview-Cf9Kgqj7.png`,cm=`/assets/q-e-layered-CWqrUKiN.png`,lm=`/assets/q-n-layered-DHm2lU8g.png`,um=`/assets/q-ne-layered-b0drzrII.png`,dm=`/assets/q-nw-layered-Ce3bfwng.png`,fm=`/assets/q-s-layered-BYfjyff2.png`,pm=`/assets/q-se-layered-CZNXOfbY.png`,mm=`/assets/q-slash-preview-CGm8lbiH.png`,hm=`/assets/q-sw-layered-DjOAdUOQ.png`,gm=`/assets/q-w-layered-RffEtr1m.png`,_m=`/assets/e-atlas-CXIs7Hzu.png`,vm=`/assets/e-atlas-CQMwq0VK.png`,ym=`/assets/e-atlas-DfdYA844.png`,bm=`/assets/e-atlas-BnwmIiaz.png`,xm=`/assets/e-atlas-DHrPsAsR.png`,Sm=`/assets/e-atlas-BySyc3vX.png`,Cm=`/assets/e-atlas-DnAJeMFs.png`,wm=`/assets/e-atlas-8UWUjUnN.png`,Tm=`/assets/flute-CYif8gne.png`,Em=Object.assign({"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/idle-e.png":Up,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/idle-n.png":Wp,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/idle-ne.png":Gp,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/idle-nw.png":Kp,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/idle-s.png":qp,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/idle-se.png":Jp,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/idle-sw.png":Yp,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/idle-w.png":Xp,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/walk-e.png":Zp,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/walk-n.png":Qp,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/walk-ne.png":$p,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/walk-nw.png":em,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/walk-s.png":tm,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/walk-se.png":nm,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/walk-sw.png":rm,"../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/walk-w.png":im}),Dm=Object.assign({"../../assets/heroes/yasuo/attacks-v2-2026-10-13/attack-A.png":am,"../../assets/heroes/yasuo/attacks-v2-2026-10-13/attack-B.png":om}),Om=[...ap.attacks,...ap.locomotion].map(e=>{let t=`id`in e?Dm[`../../assets/heroes/yasuo/attacks-v2-2026-10-13/${e.sheet}`]:Em[`../../assets/heroes/yasuo/locomotion16-2026-10-15/runtime/${e.sheet}`];if(!t)throw Error(`Missing selected Yasuo atlas: ${e.sheet}`);return{clip:e,url:t}}),km=Object.assign({"../../assets/heroes/yasuo/q-meowa-eight-2026-10-13/game-preview.png":sm,"../../assets/heroes/yasuo/q-meowa-eight-2026-10-13/q-e-layered.png":cm,"../../assets/heroes/yasuo/q-meowa-eight-2026-10-13/q-n-layered.png":lm,"../../assets/heroes/yasuo/q-meowa-eight-2026-10-13/q-ne-layered.png":um,"../../assets/heroes/yasuo/q-meowa-eight-2026-10-13/q-nw-layered.png":dm,"../../assets/heroes/yasuo/q-meowa-eight-2026-10-13/q-s-layered.png":fm,"../../assets/heroes/yasuo/q-meowa-eight-2026-10-13/q-se-layered.png":pm,"../../assets/heroes/yasuo/q-meowa-eight-2026-10-13/q-slash-preview.png":mm,"../../assets/heroes/yasuo/q-meowa-eight-2026-10-13/q-sw-layered.png":hm,"../../assets/heroes/yasuo/q-meowa-eight-2026-10-13/q-w-layered.png":gm});for(let e of Kf.clips){let t=km[`../../assets/heroes/yasuo/q-meowa-eight-2026-10-13/${e.sheet}`];if(!t)throw Error(`Missing Yasuo Q atlas: ${e.sheet}`);Om.push({clip:e,url:t})}var Am=Object.assign({"../../assets/hero-skills/2026-10-12/yasuo/e-v7-fixed-right/e/media/e-atlas.png":_m,"../../assets/hero-skills/2026-10-12/yasuo/e-v7-fixed-right/n/media/e-atlas.png":vm,"../../assets/hero-skills/2026-10-12/yasuo/e-v7-fixed-right/ne/media/e-atlas.png":ym,"../../assets/hero-skills/2026-10-12/yasuo/e-v7-fixed-right/nw/media/e-atlas.png":bm,"../../assets/hero-skills/2026-10-12/yasuo/e-v7-fixed-right/s/media/e-atlas.png":xm,"../../assets/hero-skills/2026-10-12/yasuo/e-v7-fixed-right/se/media/e-atlas.png":Sm,"../../assets/hero-skills/2026-10-12/yasuo/e-v7-fixed-right/sw/media/e-atlas.png":Cm,"../../assets/hero-skills/2026-10-12/yasuo/e-v7-fixed-right/w/media/e-atlas.png":wm});for(let e of ep){let t=Am[`../../assets/hero-skills/2026-10-12/yasuo/e-v7-fixed-right/${e.direction}/media/e-atlas.png`];if(!t)throw Error(`Missing Yasuo E atlas: ${e.direction}`);Om.push({clip:e,url:t})}Om.push({clip:np,url:Tm});var jm=`/assets/blue-melee-attack-0x76EVB4.png`,Mm=`/assets/blue-melee-walk-C8qYH4gR.png`,Nm=`/assets/blue-ranged-attack-Cstk--y7.png`,Pm=`/assets/blue-ranged-walk-BfKjDJxs.png`,Fm=`/assets/red-melee-attack-DxkU7k1v.png`,Im=`/assets/red-melee-walk-CNT7AEeY.png`,Lm=`/assets/red-ranged-attack-B-lpNpJ6.png`,Rm=`/assets/red-ranged-walk-__kZ5DPJ.png`,zm={"blue-melee-attack":{width:640,height:608,frames:8,anchors:[[199.5,578],[199,578],[235,565],[239,565],[235.5,564],[188.5,578],[198.5,579],[191.5,579]],scale:.08932038834951456},"blue-melee-walk":{width:640,height:608,frames:8,anchors:[[198.5,578],[235,560],[248,549],[255.5,528],[256.5,534],[246.5,548],[239.5,555],[253.5,563]],scale:.08932038834951456},"blue-ranged-attack":{width:600,height:640,frames:8,anchors:[[159.5,607],[161,607],[170.5,607],[181,607],[181,607],[175.5,607],[173.5,607],[166,607]],scale:.08598130841121496},"blue-ranged-walk":{width:600,height:640,frames:8,anchors:[[159.5,607],[192,594],[200,567],[200,558],[213,568],[212,566],[205.5,572],[211,579]],scale:.08598130841121496},"red-melee-attack":{width:616,height:640,frames:8,anchors:[[285,568],[288,560],[330.5,569],[371,607],[370,611],[370.5,611],[362,599],[353,589]],scale:.08487084870848709},"red-melee-walk":{width:616,height:640,frames:8,anchors:[[284.5,568],[286,609],[322,586],[337.5,546],[312.5,555],[303,605],[332,573],[372.5,558]],scale:.08487084870848709},"red-ranged-attack":{width:584,height:640,frames:8,anchors:[[336,568],[355.5,568],[359.5,568],[352,567],[345,568],[347,568],[354,568],[364,567]],scale:.08487084870848709},"red-ranged-walk":{width:584,height:640,frames:8,anchors:[[336,568],[362,574],[377.5,567],[371,538],[352,537],[339,560],[351.5,552],[354.5,552]],scale:.08487084870848709}},Bm={spacing:34,backline:58,leash:110,heroNotice:86,marchMultiplier:44/28,allySpacing:26,targetCrowdingCost:26};function Vm(e,t=e.targetId!==null){return e.speed*(e.formation&&!t?Bm.marchMultiplier:1)}function Hm(e,t,n,r=!0){let i=n%3-1,a=n<3||!r?0:Bm.backline,o=[0,7,-5][n%3]*(n<3?1:-1);return{x:e.x-t.x*(a+o)-t.y*i*Bm.spacing,y:e.y-t.y*(a+o)+t.x*i*Bm.spacing}}function Um(e,t,n,r){let i=(r?.filter(n=>n.hp>0&&n.team===e.team&&n.kind===e.kind&&n.targetId===t.id).sort((e,t)=>e.id-t.id))?.findIndex(t=>t.id===e.id)??-1,a=e.kind===`melee`?3:5,o=i>=0?i%a:-1,s=o>=0?o===0?0:Math.ceil(o/2)*(o%2?-1:1):(e.formation?.slot??e.id)%3-1,c=Math.atan2(n.y-t.y,n.x-t.x)+Math.max(-1.2,Math.min(1.2,s*(e.kind===`melee`?1.2:.4))),l=(e.kind===`melee`?e.range+t.radius-1:e.range*.85+t.radius-2)+(i>=0?Math.floor(i/a)*Bm.allySpacing:0);return{x:t.x+Math.cos(c)*l,y:t.y+Math.sin(c)*l}}function Wm(e,t,n){let r=n.filter(n=>n.id!==e.id&&n.hp>0&&n.team===e.team&&n.kind===e.kind&&n.targetId===t.id).length;return Math.hypot(e.x-t.x,e.y-t.y)+r*Bm.targetCrowdingCost}var Gm=zm,Km=Object.assign({"../../assets/units/minions-animated-v1/runtime/blue-melee-attack.png":jm,"../../assets/units/minions-animated-v1/runtime/blue-melee-walk.png":Mm,"../../assets/units/minions-animated-v1/runtime/blue-ranged-attack.png":Nm,"../../assets/units/minions-animated-v1/runtime/blue-ranged-walk.png":Pm,"../../assets/units/minions-animated-v1/runtime/red-melee-attack.png":Fm,"../../assets/units/minions-animated-v1/runtime/red-melee-walk.png":Im,"../../assets/units/minions-animated-v1/runtime/red-ranged-attack.png":Lm,"../../assets/units/minions-animated-v1/runtime/red-ranged-walk.png":Rm});function qm(e,t,n){let r=e.kind===`melee`?`melee`:`ranged`,i=e.attackReleasedAt,a=e.hp>0&&!n&&e.attackStartedAt!==null&&(e.windup>0||i!==null&&t-i<.32),o=a?`attack`:`walk`,s=`${e.team}-${r}-${o}`,c=0;a?(c=e.windup>0?Math.min(3,Math.floor(Math.max(0,t-e.attackStartedAt)/nd[r].windup*4)):Math.min(7,4+Math.floor(Math.max(0,t-i)/.32*4)),e.team===`blue`&&r===`ranged`&&c===4&&(c=3)):n&&e.hp>0&&(c=Math.floor(t*10+e.id%8)%8);let l=zm[s],u=l.anchors[c];return{key:`minion-${s}`,frame:c,scale:l.scale*ud,originX:u[0]/l.width,originY:u[1]/l.height}}var Jm=class{states=new Map;reset(){this.states.clear()}retain(e){for(let t of this.states.keys())e.has(t)||this.states.delete(t)}sample(e,t){let n=this.states.get(e.id);(!n||t<n.time)&&(n={x:e.x,y:e.y,time:t,travel:0,flip:e.team!==`red`&&Math.cos(e.facing)<0,moving:!1},this.states.set(e.id,n));let r=t-n.time,i=Math.hypot(e.x-n.x,e.y-n.y),a=r>0?e.hp>0&&e.speed>0&&e.windup<=0&&(e.airborneUntil??0)<=t&&i>.025:n.moving,o=Vm(e),s=3.2*(e.speed>0?o/e.speed:1);a&&r>0&&i<Math.max(3,o*r*2)&&(n.travel+=i/s);let c=Math.cos(e.facing);c>.22?n.flip=e.team===`red`:c<-.22&&(n.flip=e.team===`blue`);let l=qm(e,t,a);if(a&&l.key.endsWith(`-walk`)){l.frame=Math.floor(n.travel+e.id%8)%8;let t=zm[l.key.replace(`minion-`,``)],r=t.anchors[l.frame];l.originX=r[0]/t.width,l.originY=r[1]/t.height}let u=!a&&l.key.endsWith(`-walk`)&&e.hp>0?Math.sin(t*2.6+e.id*1.7)*.35:0;return n.x=e.x,n.y=e.y,n.time=t,n.moving=a,{...l,originX:n.flip?1-l.originX:l.originX,flip:n.flip,breathing:u}}},Ym={actorOuterOpacity:.36,actorContactOpacity:.46,actorShadowHeight:1.04,actorContactHeight:1.08,buildingContactHeight:.98,pavingShadowHeight:.84,actorShadowSunX:400/850,actorShadowSunZ:-350/850,buildingContactOpacity:.3,wallContactOpacity:.13,shadowMapSize:2048,shadowPadding:260,shadowMinimumExtent:700,materialRelief:.36,stoneHeight:6,metalHighlight:.08,metalPower:22,iceRim:.14,iceSpecular:.07,frostSheen:.1,stoneContrast:.34,stoneMidpoint:.22,fireLightRadius:215,lanternLightRadius:155,warmLightStrength:.62,actorLightStrength:.32,canyonMistEnhancement:.65,pierMistStart:110,pierMistEnd:185,colorGrade:.16,neutralTint:[.96,.995,1.035],distantContrast:.2,glowOpacity:.22,glowRadiusTexels:10},Xm=class{contact={value:1};materials={value:1};grading={value:1};glow={value:1};weather={value:1};enhanced=!0;reduced=!1;setEnhanced(e){this.enhanced=e;for(let t of[this.contact,this.materials,this.grading,this.glow,this.weather])t.value=+!!e}};function Zm(e){let t=Math.max(0,e);return{outerOpacity:Ym.actorOuterOpacity/(1+t/24),spread:1+Math.min(1,t/32)*.25,contactOpacity:Ym.actorContactOpacity*Math.max(0,1-t/12)**2}}function Qm(e,t,n){let r=e.getAttribute(`position`),i=t.getAttribute(`position`);for(let e=0;e<r.count;e++){let t=Math.max(0,r.getY(e)*Math.SQRT2)+Math.max(0,n);i.setXYZ(e,r.getX(e)+t*Ym.actorShadowSunX,0,t*Ym.actorShadowSunZ)}i.needsUpdate=!0;let a=e.getAttribute(`uv`),o=t.getAttribute(`uv`);for(let e=0;e<a.count;e++)o.setXY(e,a.getX(e),a.getY(e));o.needsUpdate=!0}function $m(e,t,n,r,i){if(!Number.isInteger(e)||![t,n,r,i].every(e=>Number.isInteger(e)&&e>0))throw RangeError(`Invalid atlas dimensions`);let a=r/t,o=i/n;if(!Number.isInteger(a)||!Number.isInteger(o)||e<0||e>=a*o)throw RangeError(`Invalid atlas frame`);return{left:e%a/a,right:(e%a+1)/a,top:1-Math.floor(e/a)/o,bottom:1-(Math.floor(e/a)+1)/o}}var eh=class{quality;lighting;illumination;stableHealthBars=!0;group=new cn;errors=[];actors=new Map;textures=new Map;loader=new No;minions=new Jm;shadowMap=df();environmentEnabled={value:1};disposed=!1;constructor(e=new Xm,t,n){this.quality=e,this.lighting=t,this.illumination=n;for(let e of[`qBody`,`cast`,`ultimate`])this.texture(e,Lp[e].url)}hasVisibleBody(e){return this.actors.get(e)?.body.visible??!1}body(e){return this.actors.get(e)?.body}snapshot(e){let t=this.actors.get(e)?.body;if(!t?.visible)return null;let n=new J(t.geometry.clone(),t.material.clone());return n.position.copy(t.position),n.quaternion.copy(t.quaternion),n.frustumCulled=!1,n.material.transparent=!0,n.material.depthWrite=!1,n.material.alphaTest=.025,n}update(e,t,n,r,i=!0){this.environmentEnabled.value=+!!i;let a=new Set;for(let o of e){if(o.kind===`tower`||o.hp<=0)continue;a.add(o.id);let e=this.actors.get(o.id);e||(e=this.create(o),this.actors.set(o.id,e));let s=n.screenHeading(o,o.facing),c,l,u,d,f,p,m,h,g;if(o.kind===`hero`){let i={...o,facing:s,qCast:o.qCast?{...o.qCast,facing:n.screenHeading(o,o.qCast.facing)}:null,eCast:o.eCast?{...o.eCast,facing:n.screenHeading(o,o.eCast.facing)}:o.eCast,eqCast:o.eqCast?{...o.eqCast,facing:n.screenHeading(o,o.eqCast.facing)}:o.eqCast},a=e.animator.sample(i,t),_=a.clip,v=Om.find(e=>e.clip.key===_.key);if(!v){e.body.visible=!1;continue}c=_.key,l=v.url,u=a.frame,d=_.width,f=_.height,p=_.anchor[0]/d,m=_.anchor[1]/f,h=a.scale*Op,g=(a.state===`A`||a.state===`B`)&&ip(s),(a.state===`A`||a.state===`B`)&&`impact_frame`in _&&r&&(u=up(o,r.actionTime(o.id,t),_));let y=Rp(o,t,e=>n.screenHeading(o,e),o.qCast&&r?r.qAge(o.id,o.qCast.startedAt,t,jp,hd):void 0);if(y){let e=Lp[y.key];c=y.key,l=e.url,d=e.width,f=e.height,u=y.frame,p=y.ax,m=y.ay,h=y.scale,g=y.flip}}else{let e=this.minions.sample({...o,facing:s},t),n=Gm[e.key.replace(`minion-`,``)];c=e.key,l=Object.entries(Km).find(([e])=>e.endsWith(`/${c.replace(`minion-`,``)}.png`))[1],u=e.frame,d=n.width,f=n.height,p=e.originX,m=e.originY,h=e.scale,g=e.flip}let _=this.texture(c,l),v=_.texture.image;if(e.body.visible=_.ready,_.ready&&v){let t=$m(u,d,f,v.width,v.height);e.body.material.map!==_.texture&&(e.body.material.map=_.texture,e.body.material.needsUpdate=!0);let r=o.kind===`hero`&&g?1-p:p,i=-r*d*h,a=(1-r)*d*h,s=-(1-m)*f*h,c=m*f*h,l=e.body.geometry.getAttribute(`position`),y=Math.tan(n.elevation*Math.PI/180);l.setXYZ(0,i,c,c*y),l.setXYZ(1,a,c,c*y),l.setXYZ(2,i,s,s*y),l.setXYZ(3,a,s,s*y),l.needsUpdate=!0;let b=e.body.geometry.getAttribute(`uv`),x=g?t.right:t.left,S=g?t.left:t.right;b.setXY(0,x,t.top),b.setXY(1,S,t.top),b.setXY(2,x,t.bottom),b.setXY(3,S,t.bottom),b.needsUpdate=!0}let y=Hp(o,t),b=r?.reaction(o.id,t);e.body.position.copy(Q({x:o.x+(b?.x??0),y:o.y+(b?.y??0)},y+.7)),e.body.quaternion.copy(n.camera.quaternion),i&&this.quality.enhanced&&this.quality.materials.value>0&&this.illumination?e.body.material.color.setHex(o.team===`blue`?14148069:14996944).multiplyScalar(this.lighting?.shade(o)??lf(o)):(uf(o,t,o.team,e.body.material.color,i),i&&this.quality.enhanced&&this.lighting&&e.body.material.color.multiplyScalar(this.lighting.shade(o)/lf(o))),e.body.material.userData.environmentReaction&&(e.body.material.userData.environmentReaction.value=+!b?.flash),b?.flash&&e.body.material.color.setHex(15400950);let x=Zm(y);if(e.shadow.visible=e.body.visible,this.quality.contact.value>0&&e.body.material.map)e.shadow.material.map!==e.body.material.map&&(e.shadow.material.map=e.body.material.map,e.shadow.material.needsUpdate=!0),e.shadow.position.copy(Q(o,Ym.actorShadowHeight)),e.shadow.rotation.set(0,0,0),e.shadow.scale.set(1,1,1),e.shadow.material.opacity=x.outerOpacity,e.shadow.material.alphaTest=.01,Qm(e.body.geometry,e.shadow.geometry,y);else{e.shadow.material.map!==this.shadowMap&&(e.shadow.material.map=this.shadowMap,e.shadow.material.needsUpdate=!0);let t=e.shadow.geometry.getAttribute(`position`),n=e.shadow.geometry.getAttribute(`uv`);for(let e=0;e<4;e++)t.setXYZ(e,e%2?.5:-.5,e<2?.5:-.5,0),n.setXY(e,e%2,+(e<2));t.needsUpdate=n.needsUpdate=!0,e.shadow.position.copy(Q(o,.69)),e.shadow.rotation.set(-Math.PI/2,0,0),e.shadow.material.opacity=.6/(1+y/24),e.shadow.material.alphaTest=0,e.shadow.scale.set(o.radius*4*x.spread,o.radius*2.4*x.spread,1)}e.shadow.geometry.computeBoundingSphere(),e.contact.visible=e.body.visible&&this.quality.contact.value>0,e.contact.position.copy(Q(o,Ym.actorContactHeight)),e.contact.material.opacity=x.contactOpacity,e.contact.scale.set(o.radius*2.1,o.radius*1.3,1),e.bar.position.copy(Q(o,ld[o.kind].height+y+10)),e.bar.quaternion.copy(n.camera.quaternion),e.bar.scale.y=this.stableHealthBars?(n.camera.top-n.camera.bottom)/n.size.height:1,e.fill.scale.x=Math.max(0,o.hp/o.maxHp),e.fill.position.x=-15*(1-e.fill.scale.x)}for(let[e,t]of this.actors)a.has(e)||(this.remove(t),this.actors.delete(e));this.minions.retain(a)}texture(e,t){let n=this.textures.get(e);if(!n){let i={texture:this.loader.load(t,e=>{this.disposed?e.dispose():i.ready=!0},void 0,()=>this.errors.push(e)),ready:!1};i.texture.colorSpace=Le,i.texture.magFilter=i.texture.minFilter=r,i.texture.generateMipmaps=!1,this.textures.set(e,i),n=i}return n}create(e){let t=new J(new Va(1,1),new Sr({alphaTest:.35,toneMapped:!1}));if(this.illumination){let e=this.illumination,n={value:1};t.material.userData.environmentReaction=n,t.material.onBeforeCompile=t=>{e.bind(t),t.uniforms.actorMaterialQuality=this.quality.materials,t.uniforms.actorEnvironmentEnabled=this.environmentEnabled,t.uniforms.actorEnvironmentReaction=n,t.vertexShader=`varying vec3 actorLightPosition;
`+t.vertexShader.replace(`#include <project_vertex>`,`#include <project_vertex>
actorLightPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`),t.fragmentShader=e.glsl()+`
varying vec3 actorLightPosition;
uniform float actorMaterialQuality;
uniform float actorEnvironmentEnabled;
uniform float actorEnvironmentReaction;
`+t.fragmentShader.replace(`#include <color_fragment>`,`
          #include <color_fragment>
          float actorLightEnabled = actorMaterialQuality * actorEnvironmentEnabled * actorEnvironmentReaction;
          if (actorLightEnabled > 0.0) {
            float warmth = environmentLightAt(actorLightPosition) * actorLightEnabled * ${Ym.actorLightStrength};
            diffuseColor.rgb += (diffuseColor.rgb + vec3(0.10, 0.035, 0.005)) * vec3(1.0, 0.42, 0.08) * warmth;
          }
        `)},t.material.customProgramCacheKey=()=>`actor-shared-environment-v1-${e.sources.length}`}t.frustumCulled=!1;let n=new J(new Va(1,1),new Sr({map:this.shadowMap,color:596259,transparent:!0,opacity:.6,depthWrite:!1}));n.rotation.x=-Math.PI/2,n.name=`actor-sun-shadow-${e.id}`;let r=new J(new Va(1,1),n.material.clone());r.rotation.x=-Math.PI/2,r.name=`actor-foot-contact-${e.id}`;let i=new cn;i.name=`actor-health-${e.id}`;let a=new J(new Va(33,5),new Sr({color:659996,depthTest:!1,depthWrite:!this.stableHealthBars,toneMapped:!1})),o=new J(new Va(30,2),new Sr({color:e.team===`blue`?9226677:13205370,depthTest:!1,depthWrite:!this.stableHealthBars,toneMapped:!1}));return a.renderOrder=100,o.renderOrder=101,o.position.z=.01,i.add(a,o),this.group.add(t,n,r,i),{body:t,shadow:n,contact:r,bar:i,fill:o,animator:new dp}}remove(e){for(let t of[e.body,e.shadow,e.contact])t.removeFromParent(),t.geometry.dispose(),t.material.dispose();e.bar.traverse(e=>{e instanceof J&&(e.geometry.dispose(),e.material.dispose())}),e.bar.removeFromParent(),e.bar.clear()}reset(){for(let e of this.actors.values())this.remove(e);this.actors.clear(),this.minions.reset()}dispose(){if(!this.disposed){this.disposed=!0,this.reset();for(let e of this.textures.values())e.texture.dispose();this.textures.clear(),this.shadowMap.dispose(),this.group.removeFromParent()}}},th=`/assets/ground-DHl41gc0.png`,nh=`/assets/snow-BjYhdq3p.png`,rh=`/assets/stone-C6-JU34T.png`,ih=[{id:`howling-central-ground-v1`,path:`assets/map-modules/howling-central-v1/runtime/ground.png`,sourceManifest:`assets/ha-live-ground/HC01_Create_a_production_terrain_surface_patch_for_the_Howling_Abyss_pixel_ARPG_using_the_reference_only_for_s_3c26f311/final_outputs.json`,jobId:`job_11b2450fc2e545199f4f3045dbed6a7e`,size:[2048,1536],alphaRange:[255,255],transparentFraction:0,visibleBounds:[0,0,2048,1536],solidBounds:[0,0,2048,1536],runtimeBounds:[0,0,2048,1536],sha256:`c1d8b462277dcfb50395873894a2039e8e499f82a6fffa0fdfb9678b6d33ac68`,byteIdentical:!0,status:`candidate layer; native media checked; gameplay visual acceptance pending`},{id:`howling-central-snow-v1`,path:`assets/map-modules/howling-central-v1/runtime/snow.png`,sourceManifest:`assets/ha-live-snow/HC02_A_standalone_terrain_overlay_for_a_Howling_Abyss_pixel_ARPG_matching_the_reference_stone_and_snow_style_S_2d511b48/final_outputs.json`,jobId:`job_8936f89fadc445d0a6405c2a190011c5`,size:[1024,768],alphaRange:[0,253],transparentFraction:.72735595703125,visibleBounds:[0,0,1024,496],solidBounds:[0,3,1024,383],runtimeBounds:[0,0,1024,512],sha256:`b008aad5e94093ccde7a4b039a2a50c16cf85e7fc226e924c821b1322ba258c9`,byteIdentical:!0,status:`candidate layer; native media checked; gameplay visual acceptance pending`},{id:`howling-central-rail-v1`,path:`assets/map-modules/howling-central-v1/runtime/rail.png`,sourceManifest:`assets/ha-live-rail/HC03_An_isolated_reusable_ancient_Howling_Abyss_bridge_parapet_module_as_detailed_pixel_art_matching_the_refer_b3b1284b/final_outputs.json`,jobId:`job_0732dccc90534dc6b63e27bb38df9ffe`,size:[1536,864],alphaRange:[0,254],transparentFraction:.5331586672935957,visibleBounds:[54,40,1504,864],solidBounds:[60,130,1482,750],runtimeBounds:[60,130,1482,750],sha256:`ce3b10d4c5995f7339413a058f7e5b750a5f0a8fac2206493d0bd9323942d910`,byteIdentical:!0,status:`candidate layer; native media checked; gameplay visual acceptance pending`},{id:`howling-central-arch-v1`,path:`assets/map-modules/howling-central-v1/runtime/arch.png`,sourceManifest:`assets/ha-live-arch/HC04_An_isolated_structural_module_from_an_ancient_Howling_Abyss_bridge_in_the_pixel_art_style_and_blue_grey_s_4eab2841/final_outputs.json`,jobId:`job_87dab2777f754046b1086bbc24917eb4`,size:[1024,768],alphaRange:[0,254],transparentFraction:.5125223795572916,visibleBounds:[17,0,1008,754],solidBounds:[24,8,1e3,748],runtimeBounds:[24,205,1e3,748],sha256:`16e69a06164b1458b15ddaae0e8bce637e2b4fe88c3bcdf0dcd2abb213461dd9`,byteIdentical:!0,status:`candidate layer; native media checked; gameplay visual acceptance pending`},{id:`howling-central-depth-v1`,path:`assets/map-modules/howling-central-v1/runtime/depth.png`,sourceManifest:`assets/ha-live-depth/HC05_A_distant_background_layer_for_a_Howling_Abyss_pixel_ARPG_Match_the_reference_detailed_cold_blue_grey_pix_aff67f4d/final_outputs.json`,jobId:`job_3ba722d992704296b66bdcf6817681b7`,size:[1536,864],alphaRange:[255,255],transparentFraction:0,visibleBounds:[0,0,1536,864],solidBounds:[0,0,1536,864],runtimeBounds:[0,0,1536,864],sha256:`99ce1801cd8baf8e6d93b79fd2b6c158017b1df71063b63082f47f94dc30d9e3`,byteIdentical:!0,status:`candidate layer; native media checked; gameplay visual acceptance pending`},{id:`howling-central-fire-v1`,path:`assets/map-modules/howling-central-v1/runtime/fire.png`,sourceManifest:`assets/ha-live-fire/HC06_One_isolated_ancient_Howling_Abyss_bridge_brazier_prop_matching_the_reference_detailed_pixel_environment_59eb58ba/final_outputs.json`,jobId:`job_1396503036ee40b89c7bfb66b17abc39`,size:[1024,1024],alphaRange:[0,254],transparentFraction:.6110515594482422,visibleBounds:[0,17,1004,996],solidBounds:[161,33,862,991],runtimeBounds:[161,33,862,991],sha256:`c63972a66045e2f65c4ee598cf23b0ba84cc08e8af46c9b414192264678426a1`,byteIdentical:!0,status:`candidate layer; native media checked; gameplay visual acceptance pending`}],ah=e=>{let t=Math.sin(e*73.17+18.31)*43758.5453;return t-Math.floor(t)};function oh(e,t,n,r,i,a,o){let s=new $i;for(let e=0;e<12;e++){let t=e*Math.PI/6,n=.8+ah(o+e*7)*.28,r=Math.cos(t)*i*.53*n,c=Math.sin(t)*a*.53*n;e===0?s.moveTo(r,c):s.lineTo(r,c)}s.closePath(),e(new La(s,{depth:2.2,bevelEnabled:!0,bevelSize:.9,bevelThickness:.8,bevelSegments:1}).rotateX(-Math.PI/2).translate(t,n-.8,r),`snow`);for(let s=0;s<2;s++){let c=ah(o+s*11)*Math.PI*2,l=3+ah(o+s)*3;e(new Ba(1,1).scale(l,1.2,l*.8).translate(t+Math.cos(c)*i*.4,n-1,r+Math.sin(c)*a*.43),`snow`)}}function sh(e,t,n,r,i){let a=(i,a,o,s,c,l,u=`carving`,d=1)=>{e(new Ba(1,d).scale(s,c,l).translate(t+i,n+a,r+o),u)};a(0,23,-8,22,26,24),a(0,48,0,20,28,20);for(let e of[-1,1]){a(e*13,12,-13,14,13,19),a(e*11,25,15,6.5,22,7.5),a(e*11,5,21,9,6,14);for(let t=-1;t<=1;t++)a(e*11+t*3.5,5.5,31,.8,2.5,1.6,`recess`,0)}a(0,72,7,18,19,18),a(0,65,22,13,9,12),a(0,70,32,8.5,5,4,`recess`),a(0,60,21,10,3,10,`recess`),a(0,57,23,9,4.5,9);for(let i of[-1,1]){a(i*10,76,21,2.8,1.4,2,`recess`),a(i*10,80,20,8,3.5,5),e(new bi(7.5,20,4).rotateZ(i*-.18).translate(t+i*13,n+91,r+2),`carving`);for(let a=0;a<5;a++){let o=new bi(7+a%2*2,22,5).rotateZ(i*-.8).rotateX(-.2);o.translate(t+i*(17+a%2*2),n+68-a*9,r-1+a*1.5),e(o,`carving`)}}e(new Ga(14,4.5,5,10,Math.PI*1.5).rotateY(Math.PI/2).translate(t+21,n+17,r-11),`carving`),oh(e,t,n+91,r+7,29,24,i),oh(e,t-2,n+65,r-16,25,20,i+4),oh(e,t+13,n+16,r-17,18,18,i+9)}function ch(e,t,n,r,i,a,o=55){for(let s=0;s<7;s++){let c=o*(.22+ah(a+s*13)*.95);e(new bi(.8+c*.025,c,5).rotateZ(Math.PI).translate(t+(ah(a+s*7+3)-.5)*i,n-c/2,r),`ice`)}}function lh(e){let t=-205,n=e/2-38,r=new $i;return r.moveTo(0,bf.deckBottom),r.lineTo(e,bf.deckBottom),r.lineTo(e,-bf.archHeight),r.lineTo(e-38,-bf.archHeight),r.lineTo(e-38,t),r.absarc(e/2,t,n,0,Math.PI,!1),r.lineTo(38,-bf.archHeight),r.lineTo(0,-bf.archHeight),r.closePath(),new La(r,{depth:40,steps:1,curveSegments:18,bevelEnabled:!0,bevelSize:2,bevelThickness:2,bevelSegments:1}).translate(0,0,-20)}function uh(e){let t=new cn;t.name=`central-solid-architecture`,t.add(new $o(12963293,1.65));let n=new Qo(13028576,1.25),r=Q(Z(-4));n.position.copy(r).add(new W(100,450,900)),n.target.position.copy(r),t.add(n,n.target),t.add(new Fo(12175070,5988464,.72));let i=new Qo(14804723,1.6);i.position.copy(r).add(new W(-450,800,300)),i.target.position.copy(r),i.castShadow=!0,i.shadow.mapSize.set(2048,2048),Object.assign(i.shadow.camera,{left:-1100,right:1100,top:850,bottom:-850,near:20,far:2200}),i.shadow.normalBias=.5,i.shadow.bias=-2e-4,t.add(i,i.target);let a=[],o=[],s=new ro({map:e,color:11908288,roughness:1,vertexColors:!0,emissiveMap:e,emissive:9999519,emissiveIntensity:.65}),c=new ro({color:8751254,roughness:1,vertexColors:!0}),l=new ro({color:4212051,roughness:1,vertexColors:!0}),u=new ro({color:13752807,roughness:1,vertexColors:!0}),d=new ro({color:10142431,roughness:.5,metalness:0,vertexColors:!0}),f=new ro({map:e,bumpMap:e,bumpScale:.6,color:12895952,roughness:1,flatShading:!0,vertexColors:!0,emissiveMap:e,emissive:11973565,emissiveIntensity:.6}),p=new ro({map:e,color:13619417,roughness:1,vertexColors:!0,emissiveMap:e,emissive:12105922,emissiveIntensity:.8}),m=e=>{let t=Math.sin(e*73.17+18.31)*43758.5453;return t-Math.floor(t)},h=new Map,g=(e,t,n=h)=>{let r=n.get(t)??[];r.push(e),n.set(t,r)},_=e=>{let t=e.getAttribute(`position`),n=e.getAttribute(`normal`),r=new Float32Array(t.count*2);for(let e=0;e<t.count;e++)r[e*2]=(Math.abs(n.getX(e))>.6?t.getZ(e):t.getX(e))/240,r[e*2+1]=(Math.abs(n.getY(e))>.6?t.getZ(e):t.getY(e))/240;let i=e.index?e.toNonIndexed():e;if(i!==e&&e.dispose(),i!==e)return _(i);i.setAttribute(`uv`,new q(r,2));let a=new Float32Array(t.count*3);for(let e=0;e<t.count;e++){let n=.88+m(Math.round(t.getX(e)/3)+Math.round(t.getY(e)/3)*11+Math.round(t.getZ(e)/3)*17)*.18;a.set([n,n,n],e*3)}return i.setAttribute(`color`,new q(a,3)),i},v=(e,t,n)=>{for(let[r,i]of e){let e=Rd(i,!1);if(!e)throw Error(`Cannot batch central masonry`);let a=new J(e,r);a.name=n,a.castShadow=!r.userData.distant,a.receiveShadow=!r.userData.distant,t.add(a),i.forEach(e=>e.dispose())}},y=Q(Z(1)).sub(Q(Z(0))).normalize(),b=new W(-y.z,0,y.x),x=(e,t)=>new Nt().makeBasis(y,new W(0,1,0),b).setPosition(Q(Z(e,t))),S=(e,t)=>Q(Z(t)).distanceTo(Q(Z(e))),C=(e,t,n,r,i,a,o,s,c=h)=>{let l=Math.min(2.2,i/5,a/5),u=new $i;u.moveTo(-r/2+l,-i/2+l),u.lineTo(r/2-l,-i/2+l),u.lineTo(r/2-l,i/2-l),u.lineTo(-r/2+l,i/2-l),u.closePath();let d=new La(u,{depth:a-2*l,steps:1,bevelEnabled:!0,bevelSize:l,bevelThickness:l,bevelSegments:1});g(_(d.translate(e,t,n-a/2+l)).applyMatrix4(o),s,c)},w=new $i;[[bf.edgeMinU,-112],[bf.edgeMaxU,-112],[bf.edgeMaxU,112],[bf.edgeMinU,112]].forEach(([e,t],n)=>{let r=Q(Z(e,t));n===0?w.moveTo(r.x,-r.z):w.lineTo(r.x,-r.z)}),w.closePath(),g(_(new La(w,{depth:17,bevelEnabled:!1}).rotateX(-Math.PI/2).translate(0,-17.1,0)),s);for(let e of xf){let n=new Map,r=new cn;r.name=e.foreground?`near-parapet`:`far-parapet`;let i=s.clone(),o=c.clone(),p=u.clone(),h=d.clone(),y=f.clone(),b=l.clone(),w=x(e.startU,e.v),T=S(e.startU,e.endU),E=Math.round((e.startU-bf.edgeMinU)/42),D=E*19+(e.foreground?3:47),O={carving:y,recess:b,snow:p,ice:h},k=(e,t)=>g(_(e).applyMatrix4(w),O[t],n);C(T/2,7,0,T,14,37,w,o,n);for(let e=0;e<4;e++){let t=e%2?-12:0,r=(T-34)/6;for(let a=0;a<=6;a++){let o=Math.max(18,18+t+a*r),s=Math.min(T-15,18+t+(a+1)*r);if(s-o<5)continue;let c=m(D+a*7+e*13),l=e===3?8+c*11:14;C((o+s)/2,17+e*14+l/2,(c-.5)*2,s-o-.9,l-.8,24+c*4,w,i,n)}}for(let e=0;e<5;e++){let t=27+e*(T-54)/4,r=m(D+e*23);r<.2||(C(t,76+r*4,0,21+r*6,12,31,w,o,n),oh(k,t,83+r*4,0,25+r*6,35,D+e),e%2==0&&ch(k,t,82,17,25,D+e*3,45))}let A=(e,t)=>{let r=t?49:32,a=t?131:86;C(e,10,0,r+16,20,r+17,w,o,n);for(let o=0;o<(t?7:5);o++){let s=(a-18)/(t?7:5);C(e+(m(D+o)-.5)*1.4,18+(o+.5)*s,0,r-(o%3==0?0:2.5),s-.8,r+1,w,i,n)}C(e,a-2,0,r+9,12,r+12,w,o,n),oh(k,e,a+7,0,r+12,r+15,D+11),ch(k,e,a+3,(r+15)/2,r+8,D+21,t?75:45);for(let a of[-1,1]){let s=t?94:53,c=t?68:44;C(e,c,a*(r/2+.5),29,s,.8,w,i,n);for(let t of[-1,1])C(e+t*15.5,c,a*(r/2+1.5),2,s+3,2,w,o,n);for(let i=0;i<(t?4:2);i++){let t=33+i*22;g(_(new Ga(9,1.6,4,4).translate(e,t,a*(r/2+1.8))).applyMatrix4(w),y,n)}}if(t)sh(k,e,a+11,0,D);else for(let t=0;t<3;t++)g(_(new bi(6+t*1.4,32+t*13,5).rotateZ((t-1)*.18).translate(e+(t-1)*8,a+24+t*5,0)).applyMatrix4(w),h,n)};A(0,E%2==0),e.endU===bf.edgeMaxU&&A(T,!0);let ee=[...n.keys()];for(let e of[i,o,p,h,y,b])n.has(e)||e.dispose();v(n,r,`target-carved-parapet`),t.add(r),r.userData.guardian=E%2==0,e.foreground&&a.push({start:e.startU,end:e.endU,materials:ee,opacity:1})}for(let e of Sf){let t=S(e.startU,e.endU),n=x(e.startU,e.v);g(_(lh(t)).applyMatrix4(n),s);let r=t/2-38;for(let e=0;e<13;e++){let i=e*Math.PI/13+.009,a=(e+1)*Math.PI/13-.009,o=new $i;o.absarc(t/2,-205,r+27,i,a,!1),o.absarc(t/2,-205,r+2,a,i,!0),o.closePath(),g(_(new La(o,{depth:47,bevelEnabled:!1,curveSegments:3}).translate(0,0,-23.5)).applyMatrix4(n),p)}let i=e=>{C(e,-258,0,48,238,58,n,s),C(e,-355,0,66,32,75,n,c),C(e,-174,0,57,13,67,n,c);let t=(e,t)=>g(_(e).applyMatrix4(n),{carving:f,recess:l,snow:u,ice:d}[t]);oh(t,e,-162,0,64,73,e+17),ch(t,e,-166,36,63,e+29,120);for(let t of[-1,1])for(let r=0;r<6;r++)g(_(new Ga(11,1.7,4,4).translate(e,-220-r*20,t*31)).applyMatrix4(n),f);C(e,-22,0,48,24,56,n,c)};i(0),e.endU===bf.edgeMaxU&&i(t),C(t/2,-8,0,t,16,48,n,c)}for(let e of[-1,1])for(let t=0;t<44;t++){let n=bf.edgeMinU+3+t*7.6,r=t*17+e*9,i=Q(Z(n,e*(96+m(r)*10)),1.2);t%3!=0&&oh((e,t)=>g(_(e).translate(i.x,i.y,i.z),{carving:f,recess:l,snow:u,ice:d}[t]),0,2,0,16+m(r+1)*14,13+m(r+2)*10,r);for(let t=0;t<3;t++)g(_(new Si(1,0).scale(2+m(r+t)*3,1+m(r+3+t)*3,2+m(r+7+t)*4).rotateY(r).translate(i.x+t*4,2.4,i.z-e*(10+t*6))),f)}let T=new ro({color:6976651,roughness:1,flatShading:!0,vertexColors:!0});T.onBeforeCompile=e=>{e.vertexShader=`varying vec3 targetRockPosition;
`+e.vertexShader.replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
 targetRockPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=`varying vec3 targetRockPosition;
      float targetRockHash(vec3 p) { return fract(sin(dot(p, vec3(12.9898,78.233,31.731))) * 43758.5453); }
      `+e.fragmentShader.replace(`#include <color_fragment>`,`
      #include <color_fragment>
      vec3 rockP = targetRockPosition;
      float grain = targetRockHash(floor(rockP * 1.3));
      float seam = 1.0 - smoothstep(0.025, 0.12, abs(sin(rockP.x * 0.075 + rockP.z * 0.05 + sin(rockP.y * 0.01))));
      float bed = step(0.945, fract(rockP.y * 0.025 + sin(rockP.x * 0.02) * 0.05));
      diffuseColor.rgb *= (0.84 + grain * 0.22) * (1.0 - seam * 0.3 - bed * 0.24);
      `)},T.customProgramCacheKey=()=>`target-fractured-cliffs-v1`;let E=new ro({color:11188941,roughness:1,vertexColors:!0});T.userData.distant=E.userData.distant=!0;for(let e of[-1,1])for(let t=0;t<24;t++){let n=t*23+e*17,r=-400+t*35,i=e*(250+t%4*95),a=780+m(n)*640,o=42+m(n+4)*67,s=e<0?-30+(t%4==2?230:0):-390-t%3*120,c=Q(Z(r,i),s-a/2);for(let e=0;e<4;e++){let t=a*(.62+m(n+e)*.38),r=o*(e===0?1:.38),i=e===0?0:Math.cos(e*2.3)*o,s=e===0?0:Math.sin(e*2.3)*o,l=new yi(r*.65,r,t,7,4),u=l.getAttribute(`position`);for(let e=0;e<u.count;e++){let t=u.getY(e),r=u.getX(e),i=u.getZ(e),a=m(Math.round(t/30)*7+Math.round(r)+Math.round(i)*13+n);u.setXYZ(e,r*(.9+a*.16),t+(a-.5)*20,i*(.9+a*.16))}l.computeVertexNormals(),g(_(l).translate(c.x+i,c.y,c.z+s),T);let d=c.y+t/2;if(oh(e=>g(_(e).translate(c.x+i,d,c.z+s),E),0,0,0,r*1.4,r*1.4,n+e),e===0)for(let e=0;e<7;e++)g(_(new bi(3+e%2*2,100+m(n+e)*240,5).rotateZ(Math.PI).translate(c.x+i+(e-3)*7,d-100,c.z+s+r*.65)),E)}}for(let e of tf){let n=e.phase;if(n<bf.edgeMinU||n>bf.edgeMaxU)continue;let r=Q(e),i=new Nt().makeTranslation(r.x,0,r.z);C(0,8,0,36,16,36,i,c),C(0,24,0,27,20,27,i,s),g(_(new yi(22,13,16,10).translate(0,39,0)).applyMatrix4(i),c),g(_(new yi(18,15,2,10).translate(0,47.5,0)).applyMatrix4(i),l),g(_(new Ga(20,2.5,4,10).rotateX(Math.PI/2).translate(0,48,0)).applyMatrix4(i),c);let a=new J(new bi(10,28,5),new Sr({color:16757582,toneMapped:!1}));a.position.set(r.x,61,r.z),a.userData.phase=e.phase,a.name=`volumetric-brazier-flame`,o.push(a),t.add(a)}v(h,t,`solid-bridge-architecture`);for(let e of[d,f])h.has(e)||e.dispose();return{group:t,curtains:a,flames:o}}function dh(e,t,n,r,i,a=!1){let o=[[e,n],[t,n],[t,r],[e,r]].map(([e,t])=>Q(Z(e,t),i)),s=new ur;return s.setAttribute(`position`,new q(new Float32Array(o.flatMap(e=>[e.x,e.y,e.z])),3)),s.setAttribute(`uv`,new q(new Float32Array(a?[0,0,1,0,1,1,0,1]:[0,1,1,1,1,0,0,0]),2)),s.setIndex([0,2,1,0,3,2]),s.computeVertexNormals(),s}var fh=class{group=new cn;errors=[];curtains;lastTime=0;disposed=!1;loaded=new Set;flames;structure;structureMap;constructor(){this.group.name=`Howling central · solid 3D bridge`;let t=new No,n=e=>{let n=t.load(e,e=>{this.disposed||this.loaded.add(e)},void 0,()=>{this.disposed||this.errors.push(e)});return n.colorSpace=Le,n.magFilter=r,n.minFilter=c,n.generateMipmaps=!0,n},i={ground:n(th),snow:n(nh),stone:n(rh)};i.stone.wrapS=i.stone.wrapT=e;let a=uh(i.stone);this.structure=a.group,this.structureMap=i.stone,this.curtains=a.curtains,this.flames=a.flames,this.group.add(this.structure);let o=(e,t=!1)=>new Sr({map:e,toneMapped:!1,side:2,alphaTest:t?.35:0,fog:!1}),s=(e,t,n=!1)=>{let r=ih.find(e=>e.id===`howling-central-${t}-v1`),[i,a,o,s]=r.runtimeBounds,[c,l]=r.size,u=e.getAttribute(`uv`);for(let e=0;e<u.count;e++)u.setXY(e,(i+(n?1-u.getX(e):u.getX(e))*(o-i))/c,1-s/l+u.getY(e)*(s-a)/l);return e},l=new ro({map:i.ground,bumpMap:i.ground,bumpScale:.65,roughness:1,color:14934504,emissiveMap:i.ground,emissive:8028046,emissiveIntensity:.25}),u=new J(dh(bf.minU,bf.maxU,-bf.halfWidth,bf.halfWidth,bf.groundY),l);u.receiveShadow=!0,u.name=`central-ground`,this.group.add(u);for(let e of[-1,1])for(let t=0;t<2;t++){let n=e<0?bf.minU-(t+1)*42:bf.maxU+t*42,r=dh(n,n+42,-bf.halfWidth,bf.halfWidth,bf.groundY),i=r.getAttribute(`uv`);for(let n=0;n<i.count;n++){let r=i.getX(n),a=t%2==0?1-r:r;i.setX(n,e<0?a*.25:.75+a*.25)}let a=new J(r,u.material);a.receiveShadow=!0,a.name=`central-road-transition`,this.group.add(a)}let d=o(i.snow,!0);for(let e of[-1,1])for(let t=0;t<6;t++){let n=bf.edgeMinU+t*56,r=new J(s(dh(n,n+56,e<0?-112:58,e<0?-58:112,bf.snowY,e>0),`snow`,t%2==1),d);r.name=`snow-fringe-${e}-${t}`,this.group.add(r)}for(let e of this.group.children)e.visible=!1}update(e,t,n){for(let e of this.group.children)if(e===this.structure)e.visible=this.loaded.has(this.structureMap);else{let t=e;e.visible=!!t.material.map&&this.loaded.has(t.material.map)}let[r,i]=Bu(Ku,t.x,t.y),a=e<this.lastTime,o=a?0:Math.max(0,Math.min(.1,e-this.lastTime));this.lastTime=e;for(let e of this.curtains){a&&(e.opacity=1);let t=i>64&&i<120&&r>=e.start-8&&r<=e.end+8?.4:1;e.opacity+=(t-e.opacity)*(1-Math.exp(-14*o));let n=e.opacity<.995;for(let t of e.materials)t.transparent!==n&&(t.transparent=n,t.needsUpdate=!0),t.opacity=n?e.opacity:1,t.depthWrite=!n}for(let t of this.flames){let n=of(e,t.userData.phase);t.scale.set(1/Math.sqrt(n),n,1)}}dispose(){this.disposed||(this.disposed=!0,this.group.traverse(e=>{e instanceof Qo&&e.shadow.dispose()}),Ld(this.group),this.group.removeFromParent(),this.group.clear())}},ph=`/assets/guardian-wall-BZpvsVVQ.png`,mh=`/assets/arch-support-DI6nazqu.png`,hh=`/assets/brazier-DWVRGXKh.png`,gh=`/assets/depth-CETFFNb3.png`,_h=`/assets/parapet-run-oSWDNqoR.png`,vh={size:[1918,820],scale:.21,left:300,right:1600,cutMin:240,cutMax:1700,foot:[[240,797],[260,793],[280,788],[300,783],[320,779],[340,774],[360,769],[380,764],[400,759],[420,754],[440,749],[460,744],[480,738],[500,733],[520,728],[540,723],[560,718],[580,712],[600,707],[620,701],[640,696],[660,691],[680,688],[700,697],[720,691],[740,685],[760,680],[780,674],[800,655],[820,649],[840,643],[860,638],[880,632],[900,627],[920,621],[940,616],[960,610],[980,604],[1e3,599],[1020,593],[1040,587],[1060,581],[1080,575],[1100,570],[1120,563],[1140,558],[1160,552],[1180,546],[1200,540],[1220,534],[1240,528],[1260,531],[1280,531],[1300,525],[1320,519],[1340,513],[1360,507],[1380,487],[1400,482],[1420,476],[1440,470],[1460,464],[1480,458],[1500,452],[1520,447],[1540,441],[1560,434],[1580,429],[1600,423],[1620,417],[1640,410],[1660,405],[1680,399],[1700,393]],posts:[[50,240],[640,800],[1215,1370],[1700,1890]]},yh=(vh.right-vh.left)*vh.scale/Ku.projection.along[0];function bh(e){let t=e<0?[[-653,-546],[504,611]]:[],n=[];for(let e=-720;e<720;){let r=t.find(([t,n])=>e>=t-.001&&e<n);if(r){e=r[1];continue}let i=t.find(([t])=>t>e)?.[0]??720,a=Math.min(e+yh,i,720);n.push({start:e,end:a}),e=a}return n}function xh(e){let t=bh(e).flatMap(e=>{let[t,n]=Ch(e.end-e.start);return vh.posts.filter(([e,r])=>e>t&&r<n).map(([n,r])=>e.start+((n+r)/2-t)*vh.scale/Ku.projection.along[0])});return t.slice(1).flatMap((e,n)=>{let r=t[n];return e-r>60?[]:[{leftPost:r,rightPost:e,center:(r+e)/2,width:(e-r)*Ku.projection.along[0]}]})}function Sh(e){let t=vh.foot;for(let n=1;n<t.length;n++)if(e<=t[n][0]){let r=t[n-1],i=t[n];return r[1]+(e-r[0])/(i[0]-r[0])*(i[1]-r[1])}let n=t[t.length-2],r=t[t.length-1];return r[1]+(e-r[0])/(r[0]-n[0])*(r[1]-n[1])}function Ch(e){if(!(e>0&&e<=yh+1e-7))throw RangeError(`Invalid parapet span`);let t=e*Ku.projection.along[0]/vh.scale,n=e=>!vh.posts.some(([t,n])=>e>=t&&e<=n),r=[];for(let e=vh.cutMin;e<=vh.cutMax;e+=5)e+t<=vh.cutMax&&n(e)&&n(e+t)&&r.push(e);if(!r.length)throw Error(`No complete masonry cut for span ${e}`);let i=r.sort((e,t)=>Math.abs(e-vh.left)-Math.abs(t-vh.left))[0];return[i,i+t]}function wh(e){let[t,n]=Ch(e),r=Math.max(4,Math.ceil((n-t)/18)),i=[],a=[],o=[];for(let e=0;e<=48;e++)for(let o=0;o<=r;o++){let s=t+(n-t)*o/r,c=vh.size[1]*e/48,l=(s-t)*vh.scale;i.push(l,Math.max(.25,(Sh(s)-c)*vh.scale*Math.SQRT2),l*Ku.projection.along[1]/Ku.projection.along[0]),a.push(s/vh.size[0],1-c/vh.size[1])}for(let e=0;e<48;e++)for(let t=0;t<r;t++){let n=e*(r+1)+t;o.push(n,n+r+1,n+1,n+1,n+r+1,n+r+2)}let s=new ur;return s.setAttribute(`position`,new q(new Float32Array(i),3)),s.setAttribute(`uv`,new q(new Float32Array(a),2)),s.setIndex(o),s.computeVertexNormals(),s}var Th=`
  vec3 canyonBackdropGrade(vec3 source, float enabled) {
    float high = max(source.r, max(source.g, source.b));
    float low = min(source.r, min(source.g, source.b));
    float neutral = 1.0 - smoothstep(0.12, 0.35, high - low);
    float luminance = dot(source, vec3(0.2126, 0.7152, 0.0722));
    vec3 tint = vec3(${Ym.neutralTint.join(`,`)});
    vec3 graded = mix(source, vec3(luminance) * tint, neutral * enabled * ${Ym.colorGrade});
    return mix(graded, vec3(0.25, 0.33, 0.45), enabled * ${Ym.distantContrast});
  }
  vec3 canyonBackdropEdge(vec3 source, float uvY, float enabled) {
    float edge = smoothstep(0.35, 0.5, abs(uvY - 0.5));
    return mix(source, vec3(${new K(8557485).toArray().join(`,`)}), edge * enabled);
  }
`,Eh={...Yd,deckHalfWidth:122,focusU:0,focusV:-36,zoom:.4};[...new Set(Zd.flatMap(e=>[...e.nodes]))];var Dh=Xd.map(e=>({...e,side:Math.sign(e.v)})),Oh={width:1222,height:1287,anchor:[400,1205],pixelScale:.25,elevation:45,baseline:[[120,1125],[200,1143],[400,1205],[600,1110],[650,1030],[1120,790],[1222,740]]};function kh(e){let t=Oh.baseline;for(let n=1;n<t.length;n++)if(e<=t[n][0]){let[r,i]=t[n-1],[a,o]=t[n];return i+Math.max(0,Math.min(1,(e-r)/(a-r)))*(o-i)}return t[t.length-1][1]}function Ah(e=[0,0,1222,1287],t=80,n=84){let{width:r,height:i,anchor:a,pixelScale:o}=Oh,s=[],c=[],l=[];for(let l=0;l<=n;l++)for(let u=0;u<=t;u++){let d=e[0]+(e[2]-e[0])*u/t,f=e[1]+(e[3]-e[1])*l/n,p=(d-a[0])*o,m=(a[1]-f)*o,h=kh(d),g=Math.max(-1,(h-f)*o*Math.SQRT2),_=d<400?555-(d-185)*.22:507+(d-400)*.25,v=d<400?580+(d-185)*.4:666-(d-400)*.48;d>185&&d<630&&f>_&&f<v?g=220:d>230&&d<600&&f<550&&(g+=Math.sin(Math.max(0,f-70)/480*Math.PI)*10);let y=Math.max(0,d-650)*o*.25;s.push(p,g,g-m*Math.SQRT2+y),c.push(d/r,1-f/i)}for(let e=0;e<n;e++)for(let n=0;n<t;n++){let r=e*(t+1)+n;l.push(r,r+t+1,r+1,r+1,r+t+1,r+t+2)}let u=new ur;return u.setAttribute(`position`,new q(new Float32Array(s),3)),u.setAttribute(`uv`,new q(new Float32Array(c),2)),u.setIndex(l),u.computeVertexNormals(),u.computeBoundingSphere(),u}function jh(e=200,t=1600,n=128){let r=[],i=[],a=[],o=128*Ku.projection.along[0]/1400;for(let a=0;a<=32;a++)for(let s=0;s<=48;s++){let c=e+(t-e)*s/48,l=488-c*.261,u=l+(885-l)*a/32,d=(c-200)*o*n/128;r.push(d,(l-u)*o*Math.SQRT2+1.2,d*Ku.projection.along[1]/Ku.projection.along[0]+.15),i.push(c/1778,1-u/885)}for(let e=0;e<32;e++)for(let t=0;t<48;t++){let n=e*49+t;a.push(n,n+48+1,n+1,n+1,n+48+1,n+48+2)}let s=new ur;return s.setAttribute(`position`,new q(new Float32Array(r),3)),s.setAttribute(`uv`,new q(new Float32Array(i),2)),s.setIndex(a),s.computeVertexNormals(),s}function Mh(e,t,n,r){let i=[],a=[],o=[];for(let o=0;o<=32;o++)for(let s=0;s<=24;s++){let c=t[0]+(t[2]-t[0])*s/24,l=t[1]+(t[3]-t[1])*o/32,u=(c-n[0])*r,d=(n[1]-l)*r,f=n[1]-Math.abs(c-n[0])*.33,p=Math.max(-1,(f-l)*r*Math.SQRT2);i.push(u,p,p-d*Math.SQRT2),a.push(c/e[0],1-l/e[1])}for(let e=0;e<32;e++)for(let t=0;t<24;t++){let n=e*25+t;o.push(n,n+24+1,n+1,n+1,n+24+1,n+24+2)}let s=new ur;return s.setAttribute(`position`,new q(new Float32Array(i),3)),s.setAttribute(`uv`,new q(new Float32Array(a),2)),s.setIndex(o),s.computeVertexNormals(),s}var Nh=class{group=new cn;errors=[];ready=new Set;depths=[];occluders=[];fireGlows=[];backdropShift={value:new U};lastTime=0;disposed=!1;constructor(e=new Xm){this.group.name=`painted-bridge-sample-v3`;let t=new No,r=e=>{let n=t.load(e,e=>{this.disposed||this.ready.add(e)},void 0,()=>{this.disposed||this.errors.push(e)});return n.colorSpace=Le,n.magFilter=o,n.minFilter=c,n.anisotropy=4,n},i={guardian:r(ph),floor:r(th),stone:r(rh),depth:r(gh),arch:r(mh),brazier:r(hh),parapet:r(_h)},a=(e,t=!1)=>new Sr({map:e,side:2,toneMapped:!1,fog:!1,alphaTest:t?.48:0}),s=dh(-88,80,-122,122,.5),l=new J(s,a(i.floor));l.name=`painted-bridge-floor`,this.group.add(l);let u=new J(s,new Ka({color:1120300,opacity:.32}));u.userData.requiredMap=i.floor,u.position.y=.06,u.receiveShadow=!0,u.name=`painted-ground-shadows`,this.group.add(u);for(let e of[-1,1])for(let t=0;t<16;t++){let n=Math.max(Eh.minU,e<0?-88-(t+1)*42:80+t*42),r=Math.min(Eh.maxU,e<0?-88-t*42:n+42);if(n>=r)continue;let a=dh(n,r,-122,122,.5),o=a.getAttribute(`position`);for(let e=0;e<o.count;e++){let t=e===0||e===3?n:r,i=Q(Z(t,(e<2?-1:1)*$d(t)),.5);o.setXYZ(e,i.x,i.y,i.z)}a.computeVertexNormals(),a.computeBoundingSphere();let s=a.getAttribute(`uv`);for(let n=0;n<s.count;n++){let r=t%3==0?1-s.getX(n):s.getX(n),i=[0,.045,.018,.068,.032][t%5];s.setX(n,e<0?i+r*.22:.71+i+r*.22)}let c=new J(a,l.material);c.name=`painted-road-extension`,this.group.add(c);let d=new J(a,u.material);d.position.y=.06,d.receiveShadow=!0,d.userData.requiredMap=i.floor,this.group.add(d)}for(let e of[-1,1])for(let[t,n]of[[-720,-470],[-470,470],[470,720]]){let r=Q(Z(t,e*$d(t))),o=Q(Z(n,e*$d(n))),s=new ur().setFromPoints([r.clone().setY(.4),o.clone().setY(.4),r.clone().setY(-12),o.clone().setY(-12)]);s.setAttribute(`uv`,new q(new Float32Array([0,1,1,1,0,0,1,0]),2)),s.setIndex([0,2,1,1,2,3]),s.computeVertexNormals();let c=new J(s,a(i.stone));c.material.color.setHex(10200759),this.group.add(c)}let d=a(i.stone);for(let e of[-1,1])for(let t=0;t<3;t++){let n=e*(720+t*8),r=e*(728+t*8),i=-4-t*4,a=new J(dh(Math.min(n,r),Math.max(n,r),-100,100,i),d);a.name=`painted-entrance-step`,this.group.add(a);let o=Q(Z(r,-100)),s=Q(Z(r,100)),c=new ur().setFromPoints([o.clone().setY(i),s.clone().setY(i),o.clone().setY(i-4),s.clone().setY(i-4)]);c.setAttribute(`uv`,new q(new Float32Array([0,1,1,1,0,0,1,0]),2)),c.setIndex([0,2,1,1,2,3]),c.computeVertexNormals();let l=new J(c,d);l.name=`painted-step-riser`,this.group.add(l)}let f=a(i.floor),p=a(i.stone),m=(e,t)=>{let n=[];t<0&&n.push([-667,-529],[490,628]);let r=Math.min(...n.map(([t,n])=>Math.max(t-e,0,e-n)));return 26*Math.max(0,1-r/12)};for(let e of[-1,1])for(let t=-720;t<720;t+=12){let n=Math.min(720,t+12),r=e*($d(t)-8),i=e*($d(t)+m(t,e)),a=dh(t,n,Math.min(r,i),Math.max(r,i),.55),o=a.getAttribute(`position`),s=a.getAttribute(`uv`);for(let r=0;r<o.count;r++){let i=r===0||r===3?t:n,a=Q(Z(i,e<0?-$d(i)+(r<2?-m(i,e):8):$d(i)+(r<2?-8:m(i,e))),.55);o.setXYZ(r,a.x,a.y,a.z);let c=(i+720)%80,l=c<=40?c/40:(80-c)/40;s.setXY(r,.02+l*.14,e<0?r<2?.02:.13:r<2?.87:.98)}a.computeBoundingSphere();let c=new J(a,f);c.name=`painted-wall-footing`,this.group.add(c);let l=Q(Z(t,e*($d(t)+m(t,e)))),u=Q(Z(n,e*($d(n)+m(n,e)))),d=new ur().setFromPoints([l.clone().setY(.55),u.clone().setY(.55),l.clone().setY(-12),u.clone().setY(-12)]);d.setAttribute(`uv`,new q(new Float32Array([0,1,1,1,0,0,1,0]),2)),d.setIndex([0,2,1,1,2,3]),d.computeVertexNormals();let h=new J(d,p);h.name=`painted-wall-footing-edge`,this.group.add(h)}for(let e of[`painted-wall-footing`,`painted-wall-footing-edge`]){let t=this.group.children.filter(t=>t.name===e),n=Rd(t.map(e=>e.geometry),!1);if(!n)throw Error(`Cannot merge wall footings`);let r=new J(n,t[0].material);r.name=e,this.group.add(r);for(let e of t)e.geometry.dispose(),this.group.remove(e)}let h=a(i.parapet,!0),g=(e,t,n)=>{let r=new J(Ah(n,80,84),a(i.guardian,!0));r.position.copy(Q(Z(e,t),.6)),r.name=`painted-guardian-pillar`,r.scale.setScalar(.8),r.position.z+=20,r.userData.pillarCenter={u:e,v:t},r.userData.pierU=e,this.occluders.push({mesh:r,material:r.material,anchor:Ad(r.position),opacity:1}),r.castShadow=!0;let o=new ao({map:i.guardian,alphaTest:.48,depthPacking:Ie,side:2});r.customDepthMaterial=o,this.depths.push(o),this.group.add(r)};for(let e of Dh)g(e.u,e.v,[110,60,650,1230]);let _=new ao({map:i.parapet,alphaTest:.48,depthPacking:Ie,side:2});this.depths.push(_);for(let t of[-1,1]){for(let{start:e,end:n}of bh(t)){let r=wh(n-e),i=r.getAttribute(`position`);for(let n=0;n<i.count;n++){let r=t*($d(e+i.getX(n)/Ku.projection.along[0])-$d(e));i.setXYZ(n,i.getX(n)+r*Ku.projection.across[0],i.getY(n),i.getZ(n)+r*Ku.projection.across[1])}let a=new J(r,h);a.position.copy(Q(Z(e,t*$d(e)),.6)),a.name=`painted-rear-wall`,a.castShadow=!0,a.customDepthMaterial=_,a.userData.wallSpan=[e,n],this.group.add(a)}let n=a(i.arch,!0);n.userData.readyDependency=i.depth,n.onBeforeCompile=t=>{t.uniforms.bridgeBackdropGrade=e.grading,t.uniforms.bridgeBackdropMap={value:i.depth},t.uniforms.bridgeBackdropTint={value:new K(10794188)},t.uniforms.bridgeBackdropShift=this.backdropShift,t.vertexShader=t.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 bridgeMistPosition;`).replace(`#include <project_vertex>`,`#include <project_vertex>
bridgeMistPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`),t.fragmentShader=Th+`
uniform float bridgeBackdropGrade;
`+t.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 bridgeMistPosition;
uniform sampler2D bridgeBackdropMap;
uniform vec3 bridgeBackdropTint;
uniform vec3 bridgeBackdropFogColor;
uniform vec2 bridgeBackdropShift;`).replace(`#include <alphahash_fragment>`,`
            float bridgeMistBaseline = smoothstep(260.0, 470.0, -bridgeMistPosition.y);
            float bridgeMistEnhanced = smoothstep(${Ym.pierMistStart.toFixed(1)}, ${Ym.pierMistEnd.toFixed(1)}, -bridgeMistPosition.y);
            float bridgeMist = mix(bridgeMistBaseline, bridgeMistEnhanced, bridgeBackdropGrade);
            float backdropX = bridgeMistPosition.x - bridgeBackdropShift.x;
            float backdropY = (bridgeMistPosition.y - bridgeMistPosition.z + bridgeBackdropShift.y) * 0.70710678;
            vec2 bridgeBackdropUv = vec2(0.5 + backdropX / 1800.0,
              0.5 + (backdropY - backdropX * ${(-Ku.projection.along[1]/Ku.projection.along[0]*Math.SQRT1_2).toFixed(8)}) / 1012.5);
            vec3 bridgeBackdrop = canyonBackdropGrade(texture2D(bridgeBackdropMap, bridgeBackdropUv).rgb * bridgeBackdropTint, bridgeBackdropGrade);
            bridgeBackdrop = canyonBackdropEdge(bridgeBackdrop, bridgeBackdropUv.y, 1.0);
            diffuseColor.rgb = mix(diffuseColor.rgb, bridgeBackdrop, bridgeMist);
            #include <alphahash_fragment>
          `)},n.customProgramCacheKey=()=>`painted-bridge-pier-mist-parallax-v5`;let r=Zd.find(e=>e.side===t).nodes;for(let e=0;e<r.length-1;e++){let i=r[e],a=r[e+1],o=jh(200,1600,a-i),s=o.getAttribute(`position`);for(let e=0;e<s.count;e++){let n=t*($d(i+s.getX(e)/Ku.projection.along[0])-$d(i));s.setXYZ(e,s.getX(e)+n*Ku.projection.across[0],s.getY(e),s.getZ(e)+n*Ku.projection.across[1])}o.computeBoundingSphere();let c=new J(o,n);c.position.copy(Q(Z(i,t*$d(i)))),c.name=`painted-bridge-arch`,c.userData.pierSpan=[i,a],this.group.add(c)}for(let e of r){let r=new J(jh(30,400),n);r.position.copy(Q(Z(e,t*$d(e)))),r.position.z+=.7,r.name=`painted-load-bearing-pier`,r.userData.pierU=e,this.group.add(r)}}let v=this.group.children.filter(e=>e.name===`painted-rear-wall`),y=v.map(e=>(e.updateMatrix(),e.geometry.clone().applyMatrix4(e.matrix))),b=Rd(y,!1);if(!b)throw Error(`Cannot batch painted parapets`);let x=new J(b,h);x.name=`painted-continuous-parapets`,x.castShadow=!0,x.customDepthMaterial=v[0].customDepthMaterial,this.group.add(x);for(let e of v)e.geometry.dispose(),this.group.remove(e);for(let e of y)e.dispose();let S=df();for(let{u:e,v:t}of Qd){let{u:n,v:r,height:o}=ef(e,t),s=new J(Mh([1350,1165],[250,145,1090,1025],[675,1015],.065),a(i.brazier,!0));s.position.copy(Q(Z(n,r),o)),s.name=`painted-fire-bowl`,this.group.add(s),s.userData.mount={u:n,v:r,height:o};let c=new J(new Va(158,112),new Sr({map:S,color:16758120,transparent:!0,opacity:.2,depthWrite:!1,toneMapped:!1,fog:!1}));c.rotation.x=-Math.PI/2,c.position.copy(Q(Z(n,r),o-.08)),c.userData.requiredMap=i.brazier,c.name=`painted-fire-ground-glow`,this.fireGlows.push(c),this.group.add(c),c.userData.baseOpacity=.2;let l=new J(new Va(125,90),c.material.clone());l.rotation.y=-Math.atan(Ku.projection.along[1]/Ku.projection.along[0]),l.position.copy(Q(Z(n,Math.sign(t)*($d(n)-8)),34)),l.material.opacity=.15,l.userData.baseOpacity=.15,l.userData.requiredMap=i.brazier,l.name=`painted-fire-wall-glow`,this.fireGlows.push(l),this.group.add(l)}i.depth.wrapS=n;let C=new Va(16e3,1e4),w=C.getAttribute(`uv`),T=-Ku.projection.along[1]/Ku.projection.along[0]*Math.SQRT1_2;for(let e=0;e<w.count;e++){let t=(w.getX(e)-.5)*16e3,n=(w.getY(e)-.5)*1e4;w.setXY(e,t/1800+.5,(n-t*T)/1012.5+.5)}let E=new J(C,a(i.depth));E.rotation.x=-Math.PI/4,E.position.set(0,-1200,-1200),E.material.color.setHex(10794188),E.name=`painted-distant-abyss`,this.group.add(E);let D=new Qo(16777215,2);D.position.set(-400,850,350),D.castShadow=!0,D.shadow.mapSize.set(2048,2048),D.shadow.bias=-2e-4,Object.assign(D.shadow.camera,{left:-3200,right:3200,top:2200,bottom:-2200,near:1,far:6e3}),D.shadow.camera.updateProjectionMatrix(),this.group.add(D),this.update(0,Z(-10))}update(e,t,n){if(n){let e=Q(n.focus);this.backdropShift.value.set(e.x*.18,e.z*.18);let t=this.group.getObjectByName(`painted-distant-abyss`);t&&(t.position.x=this.backdropShift.value.x,t.position.z=-1200+this.backdropShift.value.y)}this.group.traverse(e=>{if(!(e instanceof J))return;let t=e.material,n=e.userData.requiredMap??t.map;e.visible=(!n||this.ready.has(n))&&(!t.userData.readyDependency||this.ready.has(t.userData.readyDependency))});let r=e<this.lastTime,i=r?0:Math.min(.1,Math.max(0,e-this.lastTime));this.lastTime=e;for(let t=0;t<this.fireGlows.length;t++){let n=this.fireGlows[t];n.material.opacity=n.userData.baseOpacity*(1+Math.sin(e*5.7+Math.floor(t/2))*.065)}for(let e of this.occluders){if(r&&(e.opacity=1),n){let r=e.anchor,a=n.project(r,.6),o=n.project(t,38),s=n.size.height/(n.camera.top-n.camera.bottom),c=t.y<r.y+12,l=Math.abs(o.x-a.x)<50*s&&o.y<a.y+5*s&&o.y>a.y-240*s;e.opacity+=((c&&l?.38:1)-e.opacity)*(1-Math.exp(-12*i))}let a=e.opacity<.995,o=e.material;o.transparent!==a&&(o.transparent=a,o.needsUpdate=!0),o.opacity=a?e.opacity:1,o.alphaTest=a?.1:.48,o.depthWrite=!a,o.alphaToCoverage=!a&&o.userData.edgeCoverage===!0}}dispose(){if(!this.disposed){this.disposed=!0,this.group.traverse(e=>{e instanceof Qo&&e.shadow.dispose()});for(let e of this.depths)e.dispose();Ld(this.group),this.group.removeFromParent(),this.group.clear()}}},Ph=class{group=new cn;constructor(){this.group.name=`map-layout-labels`,this.group.visible=!1;let e=(e,t,n,r,i=`always`)=>{let a=document.createElement(`canvas`);a.width=384,a.height=72;let o=a.getContext(`2d`);o.fillStyle=`#0b1426e8`,o.fillRect(0,0,384,72),o.strokeStyle=r,o.lineWidth=4,o.strokeRect(2,2,380,68),o.fillStyle=r,o.font=`bold 32px "Microsoft YaHei", sans-serif`,o.textAlign=`center`,o.textBaseline=`middle`,o.fillText(e,192,36);let s=new mi(a);s.colorSpace=Le;let c=new J(new Va(185,35),new Sr({map:s,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,fog:!1,side:2}));c.rotation.x=-Math.PI/4,c.position.copy(Q(Z(t,n),30)),c.renderOrder=100,c.userData.scope=i,this.group.add(c)};for(let t of[-1,1]){let n=t<0?`#90d9ff`:`#ffb2c2`;e(t<0?`蓝方基地`:`红方基地`,-qd.nexus[0]*t,160,n,`overview`),e(`出生泉水`,-qd.spawn[0]*t,58,n,`detail`),e(`基地水晶`,-qd.nexus[0]*t,25,n,`detail`),e(`双守卫塔`,-qd.nexusTowers[0][0]*t,-68,n,`detail`),e(`召唤水晶`,-qd.inhibitor[0]*t,18,n,`detail`),e(`内塔`,-qd.innerTower[0]*t,0,n),e(`外塔`,-qd.outerTower[0]*t,0,n)}for(let[t,n]of Jd.entries())e(`草丛 ${t+1}`,n.u,n.v,`#b4efc4`)}update(e){for(let t of this.group.children)t.visible=t.userData.scope===`always`||(e<.18?t.userData.scope===`overview`:t.userData.scope===`detail`),t.scale.setScalar(Math.max(.7,Math.min(2.6,.16/e)))}dispose(){Ld(this.group),this.group.clear(),this.group.removeFromParent()}},Fh=`/assets/coping-crown-5ltGXpLl.png`,Ih=`/assets/hanging-shards-DaFokyx-.png`,Lh=`/assets/pillar-foot-BfzEkuLD.png`,Rh=`/assets/wall-seam-BHx3NVZo.png`,zh=`/assets/ice-crystal-cluster-Cz297bFa.png`,Bh=`/assets/ice-crystal-fan-CnuNOWJl.png`,Vh=`/assets/ice-crystal-shard-CJVtMvA5.png`,Hh={"wall-seam":{size:[273,451],alphaRange:[0,255],sourceRect:[0,0,701,650],crop:[239,138,512,589]},"coping-crown":{size:[290,221],alphaRange:[0,255]},"hanging-shards":{size:[285,250],alphaRange:[0,255],sourceRect:[0,650,701,1122],crop:[217,109,502,359]},"pillar-foot":{size:[418,251],alphaRange:[0,255]}},Uh={generator:`built-in imagegen`,atlasSize:[1448,1086],grid:[4,3],runtimeIntegrated:!0,assets:[{id:`ice-crystal-cluster`,title:`三棱小冰晶`,file:`props/ice-crystal-cluster.png`,size:[203,263],attachment:`ground`,atlasCell:[0,0,362,362],cropInCell:[97,90,300,353],alphaRange:[0,255],sha256:`9db2bc889548826a64d2f60805265354a62a46f12273d66fe0f40634eb14f605`},{id:`ice-crystal-shard`,title:`细长小冰晶`,file:`props/ice-crystal-shard.png`,size:[197,224],attachment:`ground`,atlasCell:[362,0,724,362],cropInCell:[88,121,285,345],alphaRange:[0,255],sha256:`7a06f203c1081afe3e4608799c5ff2c652bbe059bab1b6353191307310c3d3d3`},{id:`ice-crystal-fan`,title:`低矮扇形冰晶`,file:`props/ice-crystal-fan.png`,size:[220,193],attachment:`ground`,atlasCell:[724,0,1086,362],cropInCell:[69,153,289,346],alphaRange:[0,255],sha256:`0fec3633a9d37083d569d6781b74aed5e5653d996815d779ebdc93c9f7e2e931`},{id:`wall-banner`,title:`蓝色挂旗`,file:`props/wall-banner.png`,size:[196,335],attachment:`wall`,atlasCell:[1086,0,1448,402],cropInCell:[53,49,249,384],alphaRange:[0,255],sha256:`51a7abab6604c2ce2a8e96ba00bb59a1fe76b84d77363139498fdb6e76a455e8`},{id:`wall-chain`,title:`垂挂铁链`,file:`props/wall-chain.png`,size:[275,207],attachment:`wall`,atlasCell:[0,362,362,724],cropInCell:[70,106,345,313],alphaRange:[0,255],sha256:`720c1b412a0777616e2f6f1c3c5a9373c85269486a4a1cf163194ff9a7e22765`},{id:`wall-lantern`,title:`壁挂暖灯`,file:`props/wall-lantern.png`,size:[143,281],attachment:`wall`,atlasCell:[362,362,724,724],cropInCell:[129,62,272,343],alphaRange:[0,255],sha256:`40b6bb2ee9f950794840517636f227317118d0203876d632653c025499a6610a`},{id:`drainage-grate`,title:`排水格栅`,file:`props/drainage-grate.png`,size:[256,172],attachment:`ground`,atlasCell:[724,362,1086,724],cropInCell:[54,128,310,300],alphaRange:[0,255],sha256:`7639e6fa8625fe3ae4244bfe5ab8ba14dbc80c51b1d8d72c4e1902c5bc1567fc`},{id:`rope-coil`,title:`绳圈`,file:`props/rope-coil.png`,size:[215,183],attachment:`ground`,atlasCell:[1086,402,1448,724],cropInCell:[65,97,280,280],alphaRange:[0,255],sha256:`d8d846c93f6b3095ae0f90a26d5791aa0246b8b78baa02e74458d94ecda1ae2a`},{id:`folded-tarp`,title:`折叠蓝篷布`,file:`props/folded-tarp.png`,size:[281,227],attachment:`ground`,atlasCell:[0,724,362,1086],cropInCell:[60,75,341,302],alphaRange:[0,255],sha256:`3047ee3a20b3d9df8fbc93a4820deb971f6f571a712ad6260825ad59f332396e`},{id:`snow-drift`,title:`浅雪堆`,file:`props/snow-drift.png`,size:[275,187],attachment:`ground`,atlasCell:[362,724,724,1086],cropInCell:[55,98,330,285],alphaRange:[0,255],sha256:`bb00abe1c66b5774cb25edd5fdca5eebf133ee635226a233c69eaceac6e47309`},{id:`loose-cobbles`,title:`零散小石`,file:`props/loose-cobbles.png`,size:[262,191],attachment:`ground`,atlasCell:[724,724,1086,1086],cropInCell:[49,85,311,276],alphaRange:[0,255],sha256:`e2bfd45cdfe75881208ead5c981c10fb7aa52599e177d56b558813deb89298cd`},{id:`icicle-fringe`,title:`短冰挂`,file:`props/icicle-fringe.png`,size:[265,277],attachment:`wall`,atlasCell:[1086,724,1448,1086],cropInCell:[46,35,311,312],alphaRange:[0,255],sha256:`3e5352d3da6e9dc0adbedc19ea072585a7e03684bb896f6772ba71cb2be3d6cc`}],runtimeModule:`src/render-three/PaintedSmallDetails.ts`},Wh={size:[711,614],anchor:[355.5,520],baseline:[[0,614],[20,614],[60,610],[100,603],[160,581],[220,555],[280,546],[340,526],[400,507],[460,484],[520,467],[580,461],[640,442],[690,419],[711,406]]},Gh=`/assets/component_001-LOp0oO_U.png`;function Kh(e,t,n={value:0}){let r=e.onBeforeCompile,i=e.customProgramCacheKey.bind(e)();e.onBeforeCompile=(i,a)=>{r.call(e,i,a),i.uniforms.crystalTime=t,i.uniforms.crystalEnergy=n,i.vertexShader=`varying vec3 crystalViewNormal;
varying vec3 crystalViewPosition;
`+i.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
crystalViewNormal = normalize(normalMatrix * normal);
crystalViewPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;`),i.fragmentShader=`uniform float crystalTime;
uniform float crystalEnergy;
varying vec3 crystalViewNormal;
varying vec3 crystalViewPosition;
`+i.fragmentShader.replace(`#include <map_fragment>`,`
      #include <map_fragment>
      float cold = smoothstep(0.03, 0.22, max(diffuseColor.b - diffuseColor.r, diffuseColor.r - max(diffuseColor.g, diffuseColor.b))) * smoothstep(0.15, 0.65, max(diffuseColor.b, diffuseColor.r));
      float edge = pow(1.0 - abs(dot(normalize(crystalViewNormal), normalize(-crystalViewPosition))), 3.0);
      float pulse = 0.025 + 0.018 * sin(crystalTime * 1.7);
      vec3 accent = diffuseColor.r > diffuseColor.b ? vec3(1.0, 0.45, 0.27) : vec3(0.50, 0.72, 1.0);
      diffuseColor.rgb += accent * cold * (pulse + edge * 0.045 + crystalEnergy * 0.13);
    `)},e.customProgramCacheKey=()=>`${i}-crystal-facets-v1`}var qh=`/assets/drainage-grate-nNomga77.png`,Jh=`/assets/folded-tarp-BpSSy2f2.png`,Yh=`/assets/icicle-fringe-B1RQXOxV.png`,Xh=`/assets/loose-cobbles-BrPyhd99.png`,Zh=`/assets/rope-coil-BPWfa0am.png`,Qh=`/assets/snow-drift-B45_yHh4.png`,$h=`/assets/wall-banner-IajATi0L.png`,eg=`/assets/wall-chain-BOtW2k_J.png`,tg=`/assets/wall-lantern-BscPiN1G.png`,ng=`/assets/sanctuary-altar-CC5v4Ql8.png`,rg=`/assets/sanctuary-backwall-B-vhxt89.png`,ig=`/assets/sanctuary-paving-D1VI015m.png`,ag=`/assets/tower-blue-BzdPXvcm.png`,og=`/assets/tower-red-DqZk1Rau.png`,sg=`/assets/inhibitor-blue-B7nk_NM9.png`,cg=`/assets/inhibitor-red-Dpeas7LM.png`,lg={tower:{size:[344,513],anchor:[172,410],scale:.5,baseline:[[0,390],[8,397],[16,455],[24,461],[32,466],[40,471],[48,477],[56,481],[64,486],[72,491],[80,501],[88,506],[96,509],[104,509],[112,504],[120,499],[128,493],[136,493],[144,493],[152,493],[160,493],[168,493],[176,493],[184,493],[192,493],[200,493],[208,493],[216,496],[224,501],[232,506],[240,509],[248,509],[256,505],[264,500],[272,490],[280,485],[288,480],[296,475],[304,470],[312,465],[320,460],[328,401],[336,396]]},inhibitor:{size:[308,366],anchor:[154,292],scale:.24,baseline:[[0,286],[8,295],[16,302],[24,306],[32,312],[40,328],[48,334],[56,339],[64,345],[72,348],[80,351],[88,356],[96,362],[104,362],[112,360],[120,354],[128,354],[136,354],[144,354],[152,354],[160,354],[168,354],[176,354],[184,354],[192,359],[200,362],[208,362],[216,358],[224,352],[232,348],[240,347],[248,341],[256,335],[264,329],[272,314],[280,306],[288,304],[296,296],[304,289]]}};function ug(e){return e<-70?`blue`:e>70?`red`:`neutral`}function dg(e,t){if(e.userData.team=t,t===`blue`)return;let n=e.onBeforeCompile,r=e.customProgramCacheKey.bind(e)();e.onBeforeCompile=(r,i)=>{n.call(e,r,i),r.fragmentShader=r.fragmentShader.replace(`#include <map_fragment>`,`
      #include <map_fragment>
      vec3 teamSource = pow(max(diffuseColor.rgb,vec3(0.0)),vec3(1.0/2.2));
      float teamMax = max(teamSource.r,max(teamSource.g,teamSource.b));
      float teamMin = min(teamSource.r,min(teamSource.g,teamSource.b));
      float teamMask = smoothstep(.42,.68,(teamMax-teamMin)/max(teamMax,.001))
        *smoothstep(.04,.16,teamSource.b-max(teamSource.r,teamSource.g))*smoothstep(.28,.5,teamSource.b);
      vec3 teamTarget = ${t===`red`?`vec3(teamSource.b,min(teamSource.r,teamSource.g)*.6,max(teamSource.r,teamSource.g)*.46)`:`vec3(dot(teamSource,vec3(.3,.59,.11)))`};
      diffuseColor.rgb = pow(mix(teamSource,teamTarget,teamMask),vec3(2.2));
    `)},e.customProgramCacheKey=()=>`${r}-team-accent-v1-${t}`}var fg={altar:{size:[1374,1145],anchor:[690,800],scale:.205,baseline:[[210,825],[430,970],[690,1078],[1145,915]]},backwall:{size:[1672,941],anchor:[335,893],scale:.36,baseline:[[125,805],[200,869],[300,890],[400,893],[500,846],[600,757],[700,739],[800,696],[900,648],[1e3,621],[1100,622],[1200,618],[1300,612],[1400,595],[1500,565],[1550,550]]},tower:{...lg.tower,size:[344,513],anchor:lg.tower.anchor,baseline:lg.tower.baseline},inhibitor:{...lg.inhibitor,size:[308,366],anchor:lg.inhibitor.anchor,baseline:lg.inhibitor.baseline}},pg=.78,mg={radius:70*pg,height:350*pg};function hg(e,t){for(let n=1;n<e.length;n++)if(t<=e[n][0]){let r=e[n-1],i=e[n];return r[1]+Math.max(0,Math.min(1,(t-r[0])/(i[0]-r[0])))*(i[1]-r[1])}return e[e.length-1][1]}function gg(e){let t=[],n=[],r=[];for(let r=0;r<=48;r++)for(let i=0;i<=32;i++){let a=i/32*e.size[0],o=r/48*e.size[1],s=(a-e.anchor[0])*e.scale,c=(e.anchor[1]-o)*e.scale,l=Math.max(.25,(hg(e.baseline,a)-o)*e.scale*Math.SQRT2);t.push(s,l,l-c*Math.SQRT2),n.push(a/e.size[0],1-o/e.size[1])}for(let e=0;e<48;e++)for(let t=0;t<32;t++){let n=e*33+t;r.push(n,n+32+1,n+1,n+1,n+32+1,n+32+2)}let i=new ur;return i.setAttribute(`position`,new q(new Float32Array(t),3)),i.setAttribute(`uv`,new q(new Float32Array(n),2)),i.setIndex(r),i.computeVertexNormals(),i}var _g=class{group=new cn;errors=[];ready=new Set;depths=[];towers=[];time={value:0};occluders=[];disposed=!1;lastTime=0;constructor(){this.group.name=`painted-team-map-landmarks-v1`;let e=new No,t=t=>{let n=e.load(t,e=>{this.disposed||this.ready.add(e)},void 0,()=>{this.disposed||this.errors.push(t)});return n.colorSpace=Le,n.magFilter=o,n.minFilter=c,n.anisotropy=4,n},n={altar:t(ng),backwall:t(rg),paving:t(ig),tower:{blue:t(ag),red:t(og)},inhibitor:{blue:t(sg),red:t(cg)}},r=(e,t,r,i=!1)=>{let a=fg[e],o=i?`red`:`blue`,s=e===`tower`||e===`inhibitor`?n[e][o]:n[e],c=new Sr({map:s,alphaTest:.48,side:2,toneMapped:!1,fog:!1});if(e===`altar`||e===`backwall`?dg(c,o):c.userData.team=o,e===`tower`||e===`inhibitor`){let e={value:0};c.userData.energy=e,Kh(c,this.time,e)}let l=new J(gg(a),c);l.position.copy(Q(Z(t,r),.8)),l.name=`painted-${e}`,e===`tower`&&l.scale.setScalar(pg),l.userData.mapAnchor={u:t,v:r},l.userData.team=o,l.castShadow=!0;let u=new ao({map:s,alphaTest:.48,side:2,depthPacking:Ie});return l.customDepthMaterial=u,this.depths.push(u),this.group.add(l),e!==`backwall`&&this.occluders.push({mesh:l,anchor:Z(t,r),opacity:1,width:a.size[0]*a.scale*.5,height:a.size[1]*a.scale}),l},i=(e,t)=>{let r=new Sr({map:n.paving,toneMapped:!1,fog:!1,transparent:!0,depthWrite:!1});r.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <alphatest_fragment>`,`diffuseColor.a *= 1.0 - smoothstep(0.43, 0.5, length(vMapUv - vec2(0.5)));
#include <alphatest_fragment>`)},r.customProgramCacheKey=()=>`sanctuary-circular-paving-edge-v1`;let i=new J(new Va(t,t),r);i.rotation.x=-Math.PI/2,i.position.copy(Q(Z(e),.68)),i.name=`painted-circular-paving`,this.group.add(i)};for(let e of[-1,1]){let t=-qd.nexus[0]*e;i(t,290);let a=r(`altar`,t,0,e>0);a.name=`painted-nexus`,a.scale.setScalar(.86),r(`backwall`,e<0?-647:510,-145,e>0),i(e*Kd,150);let o=r(`tower`,e*Kd,0,e>0),s=e<0?`blue`:`red`;o.userData.team=s;let c=new cn;c.name=`destroyed-tower-${s}`,c.position.copy(o.position),this.group.add(c);let l=new Si(1,0),u=l.getAttribute(`uv`);for(let e=0;e<u.count;e++)u.setXY(e,.35+u.getX(e)*.28,.03+u.getY(e)*.12);let d=new Gr(l,new io({map:n.paving,color:11647684,emissive:2437956,emissiveIntensity:.65,fog:!1}),12),f=new sn;d.castShadow=!0;for(let e=0;e<12;e++){let t=e*2.399963,n=e?10+e%3*8:0;f.scale.set(8+e%3*5,5+e%4*2,8+e%2*5),f.position.set(Math.cos(t)*n,f.scale.y*.7,Math.sin(t)*n),f.rotation.set(e%3*.22,t,e%2*.25),f.updateMatrix(),d.setMatrixAt(e,f.matrix)}c.add(d),this.towers.push({mesh:o,rubble:c,team:s});let p=-qd.innerTower[0]*e;i(p,150);let m=r(`tower`,p,0,e>0);m.name=`painted-inner-tower`;let h=-qd.inhibitor[0]*e;i(h,126);let g=r(`inhibitor`,h,0,e>0);g.name=`painted-inhibitor`,g.scale.setScalar(1.2);for(let[t,n]of qd.nexusTowers){let i=r(`tower`,-t*e,-n*e,e>0);i.name=`painted-nexus-tower`}i(-qd.spawn[0]*e,85)}this.update(0,Z(0))}update(e,t,n,r={blue:!0,red:!0},i=[]){this.time.value=e;let a=e<this.lastTime,o=a?0:Math.min(.1,Math.max(0,e-this.lastTime));this.lastTime=e,this.group.traverse(e=>{e instanceof J&&(e.visible=this.ready.has(e.material.map))});for(let t of this.towers){t.mesh.visible&&=r[t.team],t.rubble.visible=!r[t.team];let n=i.find(e=>e.team===t.team),a=t.mesh.material;a.userData.energy.value=n&&r[t.team]?Math.max(n.windup>0?.8:0,Math.max(0,1-(e-(n.attackReleasedAt??-10))/.25)):0}for(let e of this.occluders){if(a&&(e.opacity=1),n){let r=n.project(e.anchor),i=n.project(t,38),a=n.size.height/(n.camera.top-n.camera.bottom),s=e.width*e.mesh.scale.x,c=e.height*e.mesh.scale.y,l=t.y<e.anchor.y+12&&Math.abs(i.x-r.x)<s*a&&i.y<r.y+4*a&&i.y>r.y-c*a;e.opacity+=((l?.35:1)-e.opacity)*(1-Math.exp(-12*o))}let r=e.opacity<.995,i=e.mesh.material;i.transparent!==r&&(i.transparent=r,i.needsUpdate=!0),i.opacity=r?e.opacity:1,i.depthWrite=!r,i.alphaTest=r?.1:.48,i.alphaToCoverage=!r&&i.userData.edgeCoverage===!0}}dispose(){if(!this.disposed){this.disposed=!0;for(let e of this.depths)e.dispose();Ld(this.group),this.group.clear(),this.group.removeFromParent()}}},vg=`
vec3 bridgeWind(float time, vec2 world) {
  float phase = time * 0.38 - world.x * 0.00065 - world.y * 0.0003;
  float gust = pow((1.0 + sin(phase)) * 0.5, 6.0);
  return vec3(-18.0 - 88.0 * gust + sin(time * 0.71) * 4.0, 5.0 + 19.0 * gust, gust);
}
`,yg=Object.assign({"../../assets/map-modules/howling-small-details-v1/props/drainage-grate.png":qh,"../../assets/map-modules/howling-small-details-v1/props/folded-tarp.png":Jh,"../../assets/map-modules/howling-small-details-v1/props/ice-crystal-cluster.png":zh,"../../assets/map-modules/howling-small-details-v1/props/ice-crystal-fan.png":Bh,"../../assets/map-modules/howling-small-details-v1/props/ice-crystal-shard.png":Vh,"../../assets/map-modules/howling-small-details-v1/props/icicle-fringe.png":Yh,"../../assets/map-modules/howling-small-details-v1/props/loose-cobbles.png":Xh,"../../assets/map-modules/howling-small-details-v1/props/rope-coil.png":Zh,"../../assets/map-modules/howling-small-details-v1/props/snow-drift.png":Qh,"../../assets/map-modules/howling-small-details-v1/props/wall-banner.png":$h,"../../assets/map-modules/howling-small-details-v1/props/wall-chain.png":eg,"../../assets/map-modules/howling-small-details-v1/props/wall-lantern.png":tg});function bg(e,t,n=20){return!Jd.some(r=>Math.sign(r.v)===t&&Math.abs(e-r.u)<r.length/2+n)}var xg=xh(-1).filter(e=>e.width>=85&&bg(e.leftPost,-1)&&bg(e.rightPost,-1)),Sg=[...new Set([-665,-460,-285,0,240,440,665].map(e=>xg.reduce((t,n)=>Math.abs(n.center-e)<Math.abs(t.center-e)?n:t)))].map(e=>({banner:e})),Cg=[...Sg.map(({banner:e})=>({kind:`wall-banner`,u:e.center,side:-1,width:Math.min(30,e.width*.28),inset:3,top:83})),...Sg.flatMap(({banner:e})=>[{kind:`wall-lantern`,u:e.leftPost,side:-1,width:21,inset:5,top:84}]),...[-490,-365,25,345,490].map(e=>({kind:`icicle-fringe`,u:e,side:-1,width:20,inset:3.8,top:76}))],wg=Cg.filter((e,t)=>!Cg.slice(0,t).some(t=>t.kind===e.kind&&t.u===e.u&&t.side===e.side)).filter(e=>{if(e.kind.startsWith(`ice-crystal`))return!1;if(e.top!==void 0)return!Xd.some(t=>Math.sign(t.v)===e.side&&Math.abs(t.u-e.u)<16);let t=e.side*($d(e.u)-e.inset);return!Jd.some(n=>Math.abs(e.u-n.u)<n.length/2+10&&Math.abs(t-n.v)<n.width/2+12)&&!Qd.some(n=>Math.sign(n.v)===e.side&&Math.abs(e.u-n.u)<15&&Math.abs(t-n.v)<35)});function Tg(e,t,n){let r=[],i=n/e;for(let[n,a]of[[0,0],[e,0],[0,t],[e,t]]){let t=(n-e/2)*i,o=t*Ku.projection.along[1]/Ku.projection.along[0];r.push(t,o-a*i*Math.SQRT2,o)}let a=new ur;return a.setAttribute(`position`,new q(new Float32Array(r),3)),a.setAttribute(`uv`,new q(new Float32Array([0,1,1,1,0,0,1,0]),2)),a.setIndex([0,2,1,1,2,3]),a.computeVertexNormals(),a}var Eg=class{group=new cn;errors=[];ready=new Set;disposed=!1;windTime={value:0};constructor(){this.group.name=`painted-small-winter-details`;let e=new No,t=new Map,n=new Map;for(let r of wg){let{kind:i,u:a,side:s,width:l,inset:u,top:d}=r,f=i===`wall-banner`?ug(a):`neutral`,p=`${i}:${f}`,m=Uh.assets.find(e=>e.id===i),h=t.get(p);if(!h){let r=yg[`../../assets/map-modules/howling-small-details-v1/${m.file}`],a=n.get(i);a||(a=e.load(r,e=>{this.disposed||this.ready.add(e)},void 0,()=>{this.disposed||this.errors.push(r)}),a.colorSpace=Le,a.magFilter=o,a.minFilter=c,a.anisotropy=4,n.set(i,a)),h=new Sr({map:a,alphaTest:.4,side:2,fog:!1,toneMapped:!1,color:i.startsWith(`ice-crystal`)?11780302:13950181}),t.set(p,h),i===`wall-banner`&&(h.onBeforeCompile=e=>{e.uniforms.environmentTime=this.windTime,e.vertexShader=`uniform float environmentTime;
`+vg+e.vertexShader.replace(`#include <begin_vertex>`,`
              #include <begin_vertex>
              float hem = 1.0 - uv.y;
              vec2 world = (modelMatrix * vec4(position, 1.0)).xz + vec2(${kd.x.toFixed(3)}, ${kd.y.toFixed(3)});
              vec3 wind = bridgeWind(environmentTime, world);
              transformed.x += hem * hem * (wind.x * 0.018 + sin(environmentTime * 1.8 + world.x * 0.012) * (1.0 + wind.z));
            `)},h.customProgramCacheKey=()=>`painted-banner-pinned-wind-v1`,dg(h,f))}let[g,_]=m.size,v=_*.9,y=new J(i===`drainage-grate`||i===`snow-drift`?new Va(l,_*l/g*Math.SQRT2).rotateX(-Math.PI/2):d===void 0?gg({size:[g,_],anchor:[g/2,v],scale:l/g,baseline:[[0,v],[g,v]]}):Tg(g,_,l),h);y.name=`painted-small-${p}`,y.userData.placement=r,y.userData.team=f,y.position.copy(Q(Z(a,s*($d(a)-u)),d??(i===`drainage-grate`?1.3:1))),this.group.add(y)}for(let[e,n]of t){let t=this.group.children.filter(t=>t.name===`painted-small-${e}`),r=t.map(e=>(e.updateMatrix(),e.geometry.clone().applyMatrix4(e.matrix))),i=Rd(r,!1);if(!i)throw Error(`Cannot merge small details ${e}`);let a=new J(i,n);a.name=`painted-small-${e.replace(`:`,`-`)}`,a.userData.team=t[0].userData.team,a.userData.placements=t.map(e=>e.userData.placement),this.group.add(a);for(let e of t)e.geometry.dispose(),this.group.remove(e);r.forEach(e=>e.dispose())}let r=df();r.magFilter=r.minFilter=o;let i=(e,t,n,i,a)=>{let o=Rd(t,!1);if(!o)throw Error(`Cannot merge ${e}`);let s=new J(o,new Sr({map:r,color:n,opacity:i,transparent:!0,depthWrite:!1,toneMapped:!1,fog:!1,side:2}));s.name=e,s.userData.requiredMap=a,this.group.add(s),t.forEach(e=>e.dispose())};i(`detail-wall-warmth`,wg.filter(e=>e.kind===`wall-lantern`).map(e=>{let t=Tg(100,75,66),n=Q(Z(e.u,-($d(e.u)-8)),74);return t.translate(n.x,n.y,n.z)}),16759666,.25,t.get(`wall-lantern:neutral`).map);let a=wg.filter(e=>e.top===void 0&&![`snow-drift`,`drainage-grate`].includes(e.kind));a.length&&i(`detail-contact-shadows`,a.map(e=>{let t=new Va(e.width*1.25,e.width*.54).rotateX(-Math.PI/2),n=Q(Z(e.u,e.side*($d(e.u)-e.inset)),.8);return t.translate(n.x,n.y,n.z)}),1385271,.16,t.get(`${a[0].kind}:neutral`).map),this.update()}update(e=0){this.windTime.value=e;for(let e of this.group.children){let t=e;t.visible=this.ready.has(t.userData.requiredMap??t.material.map)}}dispose(){this.disposed||(this.disposed=!0,Ld(this.group),this.group.clear(),this.group.removeFromParent())}},Dg={...Object.assign({"../../assets/map-modules/howling-architectural-ice-v1/props/coping-crown.png":Fh,"../../assets/map-modules/howling-architectural-ice-v1/props/hanging-shards.png":Ih,"../../assets/map-modules/howling-architectural-ice-v1/props/pillar-foot.png":Lh,"../../assets/map-modules/howling-architectural-ice-v1/props/wall-seam.png":Rh}),...Object.assign({"../../assets/map-modules/howling-small-details-v1/props/ice-crystal-cluster.png":zh,"../../assets/map-modules/howling-small-details-v1/props/ice-crystal-fan.png":Bh,"../../assets/map-modules/howling-small-details-v1/props/ice-crystal-shard.png":Vh})},Og=wg.filter(e=>e.top!==void 0&&e.kind!==`icicle-fringe`);function kg(e,t,n=24){return!Og.some(r=>r.side===t&&Math.abs(r.u-e)<n)}var Ag=e=>xh(e).filter(t=>kg(t.center,e,21)),jg=(e,t)=>Ag(t).reduce((t,n)=>Math.abs(n.center-e)<Math.abs(t.center-e)?n:t),Mg=e=>{let t=xh(e);return[...new Set([-675,-480,-365,-245,-45,175,355,475,675].map(e=>t.reduce((t,n)=>Math.abs(n.leftPost-e)<Math.abs(t.leftPost-e)?n:t)))].map((t,n)=>({kind:[`ice-crystal-cluster`,`ice-crystal-shard`,`ice-crystal-fan`][n%3],u:t.leftPost+5,side:e,inset:5,height:1,width:[19,16,21][n%3],attachment:`ground`}))},Ng=[...Mg(-1),...Mg(1),...[-570,-380,195,380,650].map(e=>({kind:`coping-crown`,u:jg(e,-1).center,side:-1,inset:6,height:72,width:20,attachment:`coping`})),{kind:`coping-crown`,u:jg(320,1).center,side:1,inset:-6,height:72,width:18,attachment:`coping`},...[-190,375].map(e=>({kind:`wall-seam`,u:jg(e,-1).rightPost,side:-1,inset:3,height:61,width:15,attachment:`wall`})),...[-410,410].map(e=>({kind:`pillar-foot`,u:jg(e,1).leftPost,side:1,inset:-2,height:1,width:23,attachment:`pillar`})),...[-610,-230,140,510].map(e=>({kind:`hanging-shards`,u:e,side:1,inset:-4,height:-13,width:24,attachment:`underside`}))];function Pg(e){return Xd.some(t=>Math.sign(t.v)===e.side&&Math.abs(t.u-e.u)<20)?!1:e.attachment===`underside`||!(Qd.some(t=>Math.sign(t.v)===e.side&&Math.abs(t.u-e.u)<18)||e.attachment!==`ground`&&!kg(e.u,e.side,e.attachment===`coping`?20:24)||!bg(e.u,e.side,18))}var Fg=Ng.filter(Pg).filter((e,t,n)=>!n.slice(0,t).some(t=>t.side===e.side&&t.attachment!==`underside`&&e.attachment!==`underside`&&Math.abs(e.u-t.u)<19)),Ig=Fg.filter(e=>e.attachment===`ground`).map((e,t)=>{let n={...e,kind:[`ice-crystal-fan`,`ice-crystal-cluster`,`ice-crystal-shard`][t%3]};return[-10,10].map(t=>({...n,u:e.u+t})).find(Pg)}),Lg=[{kind:`coping-crown`,u:jg(199,-1).center,side:-1,inset:7,height:72,width:50,attachment:`coping`},...[[-568,44],[-346,36],[247,48],[618,40]].map(([e,t])=>({kind:`coping-crown`,u:jg(e,1).center,side:1,inset:-7,height:72,width:t,attachment:`coping`}))].filter(Pg),Rg=[...Fg,...Ig,...Lg].map(e=>e.attachment===`coping`?{...e,width:e.width*(e.width>=40?1.2:1.5)}:e);function zg(e){return gg({size:Wh.size,anchor:Wh.anchor,baseline:Wh.baseline,scale:e/Wh.size[0]})}var Bg=class{group=new cn;errors=[];ready=new Set;disposed=!1;time={value:0};constructor(){this.group.name=`architectural-ice`;let e=new No,t=new Map,n=new Map,r=new Map,i=new Map;for(let a of Rg){let{kind:s,u:l,side:u,inset:d,height:f,width:p,attachment:m}=a,h=m===`underside`?`neutral`:ug(l),g=`${s}:${h}`,_=s in Hh,v=s===`coping-crown`?Wh:_?Hh[s]:Uh.assets.find(e=>e.id===s),y=n.get(g);if(!y){let r=s===`coping-crown`?Gh:Dg[`../../assets/map-modules/${_?`howling-architectural-ice-v1`:`howling-small-details-v1`}/props/${s}.png`],i=t.get(s);i||(i=e.load(r,e=>{this.disposed||this.ready.add(e)},void 0,()=>{this.disposed||this.errors.push(r)}),i.colorSpace=Le,i.magFilter=o,i.minFilter=c,i.anisotropy=4,t.set(s,i)),y=new Sr({map:i,alphaTest:.38,color:m===`underside`?11847647:13030626,side:2,toneMapped:!1,fog:!1}),h===`red`&&dg(y,h),Kh(y,this.time),y.userData.team=h,n.set(g,y)}let[b,x]=v.size,S=x*.92,C=m===`coping`?zg(p):m===`wall`||m===`underside`?Tg(b,x,p):gg({size:[b,x],anchor:[b/2,S],scale:p/b,baseline:[[0,S],[b,S]]}),w=m===`coping`?0:d,T=Q(Z(l,u*($d(l)-w)),f);m===`coping`&&(T.y+=5,T.z+=5),C.translate(T.x,T.y,T.z);let E=r.get(g)??[];E.push(C),r.set(g,E);let D=i.get(g)??[];D.push(a),i.set(g,D)}for(let[e,t]of r){let r=Rd(t,!1);if(!r)throw Error(`Cannot merge ${e}`);let a=new J(r,n.get(e));a.name=`ice-${e.replace(`:`,`-`)}`,a.userData.team=n.get(e).userData.team,a.userData.placements=i.get(e),this.group.add(a),t.forEach(e=>e.dispose())}this.update()}update(e=0){this.time.value=e;for(let e of this.group.children){let t=e;t.visible=this.ready.has(t.material.map)}}dispose(){this.disposed||(this.disposed=!0,Ld(this.group),this.group.clear(),this.group.removeFromParent())}},Vg=`/assets/poro-sleep-BzivigWr.png`,Hg=`/assets/poro-alert-DMAc4QoW.png`,Ug=`/assets/poro-curious-D1ek12q4.png`,Wg={version:1,reference:`assets/map-concepts/howling-detail-v1/15-sanctuary-crystal-poros.png`,description:`Three transparent pixel-painted poro poses, separated from one generated sheet. Native crops, no resampling.`,assets:{sleep:{file:`poro-sleep.png`,size:[196,173]},alert:{file:`poro-alert.png`,size:[188,195]},curious:{file:`poro-curious.png`,size:[184,204]}}},Gg=`/assets/poro-walk-XruOUYXx.png`,Kg={size:[1024,1024],cell:[256,256],anchor:[128,240],directions:[`down-right`,`down-left`,`up-right`,`up-left`],framesPerDirection:4,fps:6,sourceBounds:[[42,35,222,235],[44,36,215,225],[38,34,212,232],[32,35,208,233],[45,34,222,229],[43,36,218,229],[38,33,213,230],[36,35,213,231],[42,29,220,225],[44,26,219,219],[37,26,213,223],[32,29,208,226],[48,26,222,222],[43,23,220,214],[43,23,220,221],[42,25,216,221]]},qg=[{id:`sanctuary-sleeper`,pose:`sleep`,u:-607,v:-119,width:34,phase:0,bounds:{minU:-616,maxU:-603,minV:-123,maxV:-114}},{id:`sanctuary-companion`,pose:`alert`,u:-587,v:-111,width:29,phase:4.2,bounds:{minU:-591,maxU:-578,minV:-116,maxV:-106}},{id:`bridge-lookout`,pose:`curious`,u:26,v:-97,width:28,phase:9.1,bounds:{minU:18,maxU:35,minV:-99,maxV:-93}}],Jg={enter:140,leave:175,speed:9},Yg=[[.08,.5],[.92,.65],[.65,.15],[.22,.85],[.5,.45]],Xg=class{home;u;v;moving=!1;attention=!1;facing={x:1,y:1};target=null;wait=0;step=0;lastTime=null;constructor(e){this.home=e,this.u=e.u,this.v=e.v,this.reset()}reset(){this.u=this.home.u,this.v=this.home.v,this.moving=this.attention=!1,this.target=null,this.step=Math.floor(this.home.phase)%Yg.length,this.wait=1.5+this.home.phase%2.5,this.facing={x:1,y:1}}update(e,t){(this.lastTime===null||e<this.lastTime)&&this.reset();let n=this.lastTime===null||e<this.lastTime?0:Math.min(.1,e-this.lastTime);this.lastTime=e;let r=Z(this.u,this.v),i,a=1/0;for(let e of t){let t=Math.hypot(e.x-r.x,e.y-r.y);t<a&&(i=e,a=t)}if(this.attention=!!i&&a<(this.attention?Jg.leave:Jg.enter),this.attention&&i){this.moving=!1,a>2&&(this.facing={x:i.x-r.x,y:i.y-r.y});return}if(!n)return;if(this.moving=!1,!this.target){if(this.wait-=n,this.wait>0)return;let[e,t]=Yg[this.step++%Yg.length],r=this.home.bounds;this.target={u:r.minU+(r.maxU-r.minU)*e,v:r.minV+(r.maxV-r.minV)*t}}let o=Z(this.target.u,this.target.v),s=o.x-r.x,c=o.y-r.y,l=Math.hypot(s,c),u=Math.min(1,Jg.speed*n/Math.max(1e-4,l));this.u+=(this.target.u-this.u)*u,this.v+=(this.target.v-this.v)*u,this.moving=l>.05,this.moving&&(this.facing={x:s,y:c}),u===1&&(this.target=null,this.wait=1.8+this.step%3*.65)}};function Zg(e,t=0){let n=Math.cos(e),r=Math.abs(n)<.12?t%2==1:n<0;return Number(r)}var Qg=class{group=new cn;errors=[];ready=new Set;residents=[];walkMap;disposed=!1;constructor(){this.group.name=`map-poro-residents`;let e=new No,t=df();this.walkMap=e.load(Gg,e=>{this.disposed||this.ready.add(e)},void 0,()=>{this.disposed||this.errors.push(`poro-walk`)}),this.walkMap.colorSpace=Le,this.walkMap.magFilter=r,this.walkMap.minFilter=c;let n={sleep:Vg,alert:Hg,curious:Ug};for(let i of qg){let a=e.load(n[i.pose],e=>{this.disposed||this.ready.add(e)},void 0,()=>{this.disposed||this.errors.push(i.id)});a.colorSpace=Le,a.magFilter=r,a.minFilter=c;let o=Wg.assets[i.pose].size,s=i.width*o[1]/o[0],l=new J(new Va(i.width,s).translate(0,s/2,0),new Sr({map:a,alphaTest:.35,toneMapped:!1,fog:!1,color:14476784}));l.name=`poro-${i.id}`,l.visible=!1;let u=new J(new Va(i.width*.86,i.width*.48),new Sr({map:t,color:1319992,transparent:!0,opacity:.48,depthWrite:!1,toneMapped:!1,fog:!1}));u.name=`poro-shadow-${i.id}`,u.rotation.x=-Math.PI/2,u.visible=!1,u.position.copy(Q(Z(i.u,i.v),.72)),this.group.add(l,u),this.residents.push({body:l,shadow:u,placement:i,motion:new Xg(i),idle:a,direction:0})}}update(e,t,n=[]){if(!this.disposed)for(let r of this.residents){let{body:i,shadow:a,placement:o,motion:s,idle:c}=r;s.update(e,n);let l=Z(s.u,s.v);r.direction=Zg(t.screenHeading(l,Math.atan2(s.facing.y,s.facing.x)),r.direction);let u=(s.moving||s.attention)&&this.ready.has(this.walkMap),d=u?this.walkMap:c;i.material.map!==d&&(i.material.map=d,i.material.needsUpdate=!0),i.visible=a.visible=this.ready.has(d);let f=e+o.phase,p=u?r.direction*4+(s.moving?Math.floor(f*Kg.fps)%4:0):0,m=Wg.assets[o.pose].size,h=u?o.width*Kg.cell[0]/184:o.width,g=u?h:o.width*m[1]/m[0],_=u?Kg.anchor[1]/Kg.cell[1]:1,v=i.geometry.getAttribute(`position`);v.setXYZ(0,-h/2,g*_,0),v.setXYZ(1,h/2,g*_,0),v.setXYZ(2,-h/2,g*(_-1),0),v.setXYZ(3,h/2,g*(_-1),0),v.needsUpdate=!0,i.geometry.computeBoundingSphere();let y=i.geometry.getAttribute(`uv`),b=u?p%4/4:0,x=u?b+.25:1,S=u?1-Math.floor(p/4)/4:1,C=u?S-.25:0,w=!u&&r.direction===1,T=w?x:b,E=w?b:x;y.setXY(0,T,S),y.setXY(1,E,S),y.setXY(2,T,C),y.setXY(3,E,C),y.needsUpdate=!0,i.position.copy(Q(l,.9)),i.quaternion.copy(t.camera.quaternion),i.scale.y=1+Math.sin(f*(s.moving?Kg.fps*Math.PI:1.5))*(s.moving?.018:.012),a.position.copy(Q(l,.72))}}dispose(){if(this.disposed)return;this.disposed=!0,Ld(this.group),this.group.clear(),this.group.removeFromParent();let e=new Set(this.residents.map(e=>e.body.material.map));for(let t of this.residents)e.has(t.idle)||t.idle.dispose();e.has(this.walkMap)||this.walkMap.dispose(),this.residents.length=0,this.ready.clear()}},$g=class{group=new cn;time={value:0};snowCenter={value:new U};snowExtent={value:new U(1200,950)};disposed=!1;constructor(e=new Xm){this.group.name=`bridge-environment-motion`;let t=[],n=[];Qd.forEach(({u:e,v:r},i)=>{let a=ef(e,r),o=Q(Z(a.u,a.v),a.height+27.3);for(let e=0;e<5;e++)t.push(o.x,o.y,o.z),n.push((e/5+i*.173)%1)});let r=new ur;r.setAttribute(`position`,new q(new Float32Array(t),3)),r.setAttribute(`phase`,new q(new Float32Array(n),1));let i=new di(r,new to({uniforms:{environmentTime:this.time,weatherQuality:e.weather},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`attribute float phase; uniform float environmentTime; uniform float weatherQuality; varying float life;
        ${vg}
        void main() {
          life = fract(environmentTime * 0.27 + phase);
          vec3 wind = bridgeWind(environmentTime, position.xz + vec2(${kd.x.toFixed(3)}, ${kd.y.toFixed(3)}));
          vec3 p = position + vec3(life * wind.x * 0.35 + sin(life * 8.0 + phase * 20.0) * 3.0, life * 42.0, life * wind.y * 0.35);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (2.4 - life * 1.0) * (1.0 + weatherQuality * 0.3);
        }`,fragmentShader:`varying float life;
        void main() {
          float shape = 1.0 - smoothstep(0.18, 0.5, length(gl_PointCoord - 0.5));
          gl_FragColor = vec4(1.0, 0.46 + life * 0.15, 0.14, shape * sin(life * 3.14159) * 0.65);
        }`}));i.frustumCulled=!1,i.name=`bridge-brazier-embers`,this.group.add(i);let a=[],o=[],s=[];for(let e=0;e<240;e++){let t=Q(Z(-760+e*.61803398875%1*1520,(e%2?-1:1)*(80+e*.41421356237%1*160)),40+e%13*23);a.push(t.x,t.y,t.z),o.push(e*.754877666%1),s.push(e*.61803398875%1,e*.569840291%1,e%3)}let c=new ur;c.setAttribute(`position`,new q(new Float32Array(a),3)),c.setAttribute(`phase`,new q(new Float32Array(o),1)),c.setAttribute(`snowSeed`,new q(new Float32Array(s),3));let l=new di(c,new to({uniforms:{environmentTime:this.time,weatherQuality:e.weather,snowCenter:this.snowCenter,snowExtent:this.snowExtent},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`attribute float phase; attribute vec3 snowSeed; uniform float environmentTime;
        uniform float weatherQuality; uniform vec2 snowCenter; uniform vec2 snowExtent;
        varying float snowAlpha; varying float snowLayer; varying float snowEnhanced;
        ${vg}
        void main() {
          vec3 wind = bridgeWind(environmentTime, position.xz + vec2(${kd.x.toFixed(3)}, ${kd.y.toFixed(3)}));
          float life = fract(environmentTime * 0.055 + phase);
          vec3 p = position + vec3((life - 0.5) * wind.x * 2.0, 160.0 - life * 370.0, (life - 0.5) * wind.y * 2.0);
          float legacyAlpha = sin(life * 3.14159) * 0.38;
          // Wrapped world positions remain stationary under camera movement
          // until they cross an invisible, faded boundary of the coverage box.
          float snowLife = fract(environmentTime * 0.095 + phase);
          vec2 drift = vec2(-24.0, 7.0) * environmentTime
            + vec2(-18.0, 4.0) * sin(environmentTime * 0.38 + phase * 6.283185);
          vec2 base = (snowSeed.xy - 0.5) * snowExtent + drift;
          vec2 relative = mod(base - snowCenter + snowExtent * 0.5, snowExtent) - snowExtent * 0.5;
          vec2 weatherWorld = relative + snowCenter;
          float edge = 1.0 - smoothstep(0.78, 0.98, max(abs(relative.x / snowExtent.x), abs(relative.y / snowExtent.y)) * 2.0);
          float quietCenter = mix(0.35, 1.0, smoothstep(65.0, 230.0, length(relative)));
          snowLayer = snowSeed.z;
          vec3 weatherPosition = vec3(weatherWorld.x, (220.0 + snowLayer * 70.0) * (1.0 - snowLife), weatherWorld.y);
          float weatherAlpha = sin(snowLife * 3.14159) * (0.28 + snowLayer * 0.10) * edge * quietCenter;
          snowAlpha = mix(legacyAlpha, weatherAlpha, weatherQuality); snowEnhanced = weatherQuality;
          p = mix(p, weatherPosition, weatherQuality);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); gl_PointSize = 1.2 + phase * 0.9;
          gl_PointSize = mix(gl_PointSize, 1.8 + snowLayer * 1.1 + phase * 0.6, weatherQuality);
        }`,fragmentShader:`varying float snowAlpha; varying float snowLayer; varying float snowEnhanced;
        void main() {
          vec2 point = gl_PointCoord - 0.5;
          point.x += point.y * 0.22; point.y *= 0.82;
          float shape = 1.0 - smoothstep(0.16, 0.50, length(point));
          gl_FragColor = vec4(vec3(0.79, 0.87, 0.95), snowAlpha * mix(1.0, shape, snowEnhanced));
        }`}));l.frustumCulled=!1,l.name=`bridge-sparse-snow`,this.group.add(l);let u=new to({uniforms:{environmentTime:this.time,mistColor:{value:new K(10926801)},canyonGrade:e.grading},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`varying vec2 mistUv;
        void main() { mistUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`uniform float environmentTime; uniform float canyonGrade; uniform vec3 mistColor; varying vec2 mistUv;
        void main() {
          vec2 p = mistUv;
          float ridge = 0.5 + 0.16 * sin(p.x * 17.0 - environmentTime * 0.12)
            + 0.07 * sin(p.x * 39.0 + environmentTime * 0.08);
          float alpha = exp(-pow((p.y - ridge) * 8.0, 2.0))
            * smoothstep(0.0, 0.2, p.x) * (1.0 - smoothstep(0.8, 1.0, p.x));
          gl_FragColor = vec4(mistColor, alpha * 0.11 * (1.0 + canyonGrade * ${Ym.canyonMistEnhancement}));
        }`});for(let[e,t]of[-370,190,680].entries()){let n=new J(new Va(5600,460),u);n.rotation.x=-Math.PI/4,n.position.set(e*260-240,-360-e*230,t),n.name=`bridge-canyon-mist`,this.group.add(n)}}update(e,t){if(this.time.value=Number.isFinite(e)?Math.max(0,e):0,t){let e=Q(t.focus);this.snowCenter.value.set(e.x,e.z),this.snowExtent.value.set(Math.max(1200,(t.camera.right-t.camera.left)*1.4),Math.max(950,(t.camera.top-t.camera.bottom)*Math.SQRT2*1.4)),this.group.children.filter(e=>e.name===`bridge-canyon-mist`).forEach((t,n)=>{let r=.04+n*.03;t.position.x=n*260-240+e.x*r,t.position.z=[-370,190,680][n]+e.z*r})}}setQuality(e){let t=this.group.getObjectByName(`bridge-sparse-snow`);t&&(t.visible=!e)}dispose(){if(this.disposed)return;this.disposed=!0;let e=new Set;this.group.traverse(t=>{(t instanceof J||t instanceof di)&&(t.geometry.dispose(),e.add(t.material))}),e.forEach(e=>e.dispose()),this.group.clear(),this.group.removeFromParent()}},e_=`/assets/barrels-QKiz94ms.png`,t_=`/assets/crates-B7HVdzzz.png`,n_=`/assets/fern-CAknVP7x.png`,r_=`/assets/grass-K3gIlOnq.png`,i_=`/assets/lantern-DqmFdCOq.png`,a_=`/assets/rubble-CxtwTxHw.png`,o_={grass:{size:[512,505]},fern:{size:[512,489]},rubble:{size:[496,486]},crates:{size:[512,512]},barrels:{size:[512,512]},lantern:{size:[511,497]}},s_=`/assets/brush-bed-D4kuElJ3.png`,c_=Object.assign({"../../assets/map-modules/howling-details-v1/props/barrels.png":e_,"../../assets/map-modules/howling-details-v1/props/crates.png":t_,"../../assets/map-modules/howling-details-v1/props/fern.png":n_,"../../assets/map-modules/howling-details-v1/props/grass.png":r_,"../../assets/map-modules/howling-details-v1/props/lantern.png":i_,"../../assets/map-modules/howling-details-v1/props/rubble.png":a_}),l_={size:[1672,941],anchor:[850,660],opaqueWidth:1560,baseline:[[80,835],[150,864],[250,876],[450,862],[650,803],[850,748],[1050,675],[1250,610],[1450,513],[1570,459],[1630,421],[1672,395]]},u_=[],d_=class{group=new cn;errors=[];ready=new Set;disposed=!1;windTime={value:0};constructor(){this.group.name=`painted-independent-details`;let e=new No,t=new Map,n=t=>{let n=e.load(t,e=>{this.disposed||this.ready.add(e)},void 0,()=>{this.disposed||this.errors.push(t)});return n.colorSpace=Le,n.magFilter=o,n.minFilter=c,n.anisotropy=4,new Sr({map:n,alphaTest:.35,side:2,toneMapped:!1,fog:!1})},r=e=>{let r=t.get(e);if(!r){let i=c_[`../../assets/map-modules/howling-details-v1/props/${e}.png`];if(!i)throw Error(`Missing detail prop ${e}`);r=n(i),t.set(e,r)}return r};for(let e of u_){let{kind:t,u:n,side:i,width:a,inset:o}=e,s=o_[t],c=r(t),[l,u]=s.size,d=u*.89,f=new J(gg({size:[l,u],anchor:[l/2,d],scale:a/l,baseline:[[0,d],[l,d]]}),c);f.name=`painted-detail-${t}`,f.userData.detailPlacement=e,f.position.copy(Q(Z(n,i*($d(n)-o)),1)),this.group.add(f)}let i=n(s_);i.onBeforeCompile=e=>{e.uniforms.environmentTime=this.windTime,e.vertexShader=`uniform float environmentTime;
`+vg+e.vertexShader.replace(`#include <begin_vertex>`,`
        #include <begin_vertex>
        float rootWeight = smoothstep(12.0, 95.0, position.y);
        vec2 world = (modelMatrix * vec4(position, 1.0)).xz + vec2(${kd.x.toFixed(3)}, ${kd.y.toFixed(3)});
        vec3 wind = bridgeWind(environmentTime, world);
        float breeze = sin(environmentTime * 1.8 + world.x * 0.012);
        transformed.x += rootWeight * (wind.x * 0.025 + breeze * (1.0 + wind.z * 1.5));
      `)},i.customProgramCacheKey=()=>`painted-brush-rooted-wind-v1`;for(let e of Jd){let t=e.length*Math.abs(Ku.projection.along[0])+e.width*Math.abs(Ku.projection.across[0]),n=new J(gg({...l_,scale:t/l_.opaqueWidth}),i);n.name=`painted-brush-${e.id}-v3`,n.position.copy(Q(Z(e.u,e.v),1.1)),n.castShadow=!0,n.userData.brushId=e.id,n.userData.brushBounds=e,this.group.add(n)}this.update()}update(e=0){this.windTime.value=e;for(let e of this.group.children){let t=e;t.visible=this.ready.has(t.material.map)}}dispose(){this.disposed||(this.disposed=!0,Ld(this.group),this.group.clear(),this.group.removeFromParent())}};function f_(e=`attack`){let t=e===`r`||e===`q3`||e===`eq3`;return{heavy:t,hold:e===`e`?0:t?.055:e===`q`?.042:e===`eq`?.045:.032,recoil:e===`r`?9:t?7:e===`q`?6:e===`e`?4:4.5,length:e===`q`?33:e===`e`?25:e===`eq`?32:t?40:23,duration:t?.3:.2}}function p_(e){let t=e.x-(e.from?.x??e.x-1),n=e.y-(e.from?.y??e.y),r=Math.hypot(t,n);return r>.001?{x:t/r,y:n/r}:{x:1,y:0}}function m_(e,t){if(e<0||e>=.22)return 0;if(e<.035)return t*(.65+.35*e/.035);let n=(e-.035)/.185;return t*Math.exp(-4*n)*Math.cos(n*Math.PI*1.6)*(1-n)}var h_=class{contacts=new Map;holds=new Map;qCasts=new Map;clock=-1;reset(){this.contacts.clear(),this.holds.clear(),this.qCasts.clear(),this.clock=-1}update(e){e<this.clock&&this.reset(),this.clock=e;for(let[t,n]of this.contacts)e-n.at>.4&&this.contacts.delete(t);for(let[t,n]of this.holds)e-n.at>.2&&this.holds.delete(t);for(let[t,n]of this.qCasts)e-n.startedAt>1&&this.qCasts.delete(t)}event(e,t){if(e.type!==`hit`||e.sourceKind!==`hero`&&e.targetKind!==`hero`)return;let n=e.at??t,r=e.impact??`attack`,i=e.sourceId===void 0?void 0:this.qCasts.get(e.sourceId);if(r===`q`&&i&&n>=i.startedAt&&n<i.startedAt+1&&i.contactAt===void 0&&(i.contactAt=n),e.targetId!==void 0&&this.contacts.set(e.targetId,{at:n,kind:r,direction:p_(e),heroSource:e.sourceKind===`hero`}),e.sourceKind===`hero`&&e.sourceId!==void 0&&r!==`e`&&r!==`q3`){let t=this.holds.get(e.sourceId);(!t||n-t.at>.12)&&this.holds.set(e.sourceId,{at:n,duration:f_(r).hold,kind:r})}}beginQ(e,t,n){this.qCasts.set(e,{startedAt:t,delay:n})}qAge(e,t,n,r,i){let a=this.qCasts.get(e),o=Math.max(0,n-t);if(!a||a.startedAt!==t)return o;let s=a.contactAt===void 0?a.delay:Math.max(.001,a.contactAt-t),c=a.contactAt===void 0?0:f_(`q`).hold;if(o<s)return o/s*r;let l=r+.012;return o<s+c?l:Math.min(i,l+(o-s-c)/Math.max(.01,i-s-c)*(i-l))}actionTime(e,t){let n=this.holds.get(e);if(!n||t<n.at)return t;let r=t-n.at;return r<n.duration?n.at:t-n.duration*Math.max(0,1-(r-n.duration)/.08)}reaction(e,t){let n=this.contacts.get(e);if(!n)return{x:0,y:0,flash:!1,active:!1};let r=t-n.at,i=m_(r,f_(n.kind).recoil*(n.heroSource?1:.45));return{x:n.direction.x*i,y:n.direction.y*i,flash:r>=0&&r<.045,active:r>=0&&r<.22}}},g_={stackDuration:6,castDuration:.8,releaseDelay:.3,speed:250,range:290,radius:14,knockup:1};function __(e,t){return e.hp>0&&(e.qStacks??0)===2&&(e.qStacksUntil??0)>t}function v_(e){e.qStacks=0,e.qStacksUntil=0,e.qReadyAt=void 0}function y_(e,t){if(e.kind!==`hero`||e.hp<=0||e.rCast)return;(e.qStacksUntil??0)<=t&&v_(e);let n=e.qStacks??0;e.qStacks=Math.min(2,n+1),e.qStacksUntil=t+g_.stackDuration,n<2&&e.qStacks===2&&(e.qReadyAt=t)}var b_={frames:8,fps:8,columns:4},x_=e=>Math.max(0,Math.min(1,e)),S_=e=>{let t=x_(e);return t*t*(3-2*t)};function C_(e){let t=e>=0&&e<3.9;return{active:t,frame:Math.floor(Math.max(0,e)*b_.fps)%b_.frames,grow:S_(e/.32),alpha:t?S_(e/.12)*(1-S_((e-(bd-.45))/.45)):0}}function w_(e){let t=-Math.sin(e);return{x:Math.abs(t)<.16?t<0?-.16:.16:t,y:Math.cos(e),normalX:Math.cos(e),normalY:Math.sin(e)}}var T_={maxFlow:100,shieldDuration:1,worldScale:100/475,critMultiplier:2,critDamage:1.8},E_=e=>Math.max(1,Math.min(18,e.level??1));function D_(e){let t=E_(e);return 125+475/17*((.685+.0175*t)*(t-1))}function O_(e){let t=E_(e);return(t<7?59:t<13?52.5:46)*T_.worldScale}function k_(e,t){return(e.passiveShieldUntil??0)>t?Math.max(0,e.passiveShield??0):0}function A_(e,t,n){e.kind!==`hero`||e.hp<=0||k_(e,n)>0||t<=0||(e.flow=Math.min(100,(e.flow??0)+t/O_(e)))}function j_(e,t,n,r){if(t.kind!==`hero`)return{remaining:n,absorbed:0};(t.passiveShieldUntil??0)<=r&&(t.passiveShield=0),(t.flow??0)>=100&&e.kind===`hero`&&k_(t,r)<=0&&(t.flow=0,t.passiveShield=D_(t),t.passiveShieldAt=r,t.passiveShieldUntil=r+T_.shieldDuration);let i=Math.min(n,k_(t,r));return t.passiveShield=Math.max(0,(t.passiveShield??0)-i),{remaining:n-i,absorbed:i}}function M_(e){let t=Math.max(0,e.critChance??0)*T_.critMultiplier;return{chance:Math.min(1,t),bonusAD:Math.max(0,t-1)*100*.5,multiplier:T_.critDamage}}var N_=e=>Math.max(0,Math.min(1,e)),P_=e=>{let t=N_(e);return t*t*(3-2*t)};function F_(e,t,n,r){let i=e-t,a=r===void 0?0:N_((e-r)/.14),o=r===void 0?n:Math.min(n,r+.14),s=i>=0&&e<o;return{active:s,alpha:s?(r===void 0?N_((n-e)/.16):1-a)*(.3+.7*P_(i/.08)):0,frame:r===void 0?Math.floor(Math.max(0,i)*12)%8:Math.min(7,6+Math.floor(a*2)),scale:.84+.16*P_(i/.1)+a*.12}}function I_(e,t,n){if(e.hp<=0||e.kind===`tower`||t<=n)return null;let r=ld[e.kind],i=Math.max(0,Math.min(1,(t-n)/Yf.targetCooldown)),a=Math.max(0,n-(t-Yf.targetCooldown));return{x:e.x,y:e.y-r.height*.18-Hp(e,n),radiusX:r.halfWidth+7,radiusY:e.kind===`hero`?12:9,remaining:i,start:-Math.PI/2+(1-i)*Math.PI*2,end:Math.PI*1.5,alpha:.8+.2*Math.min(1,a/.12),depthY:e.y}}function L_(e,t,n,r,i,a,o){let s=Vp,c=Math.min(1,Math.max(0,a)/.09,Math.max(0,o)/16),l=Math.min(22,Math.max(0,a)*g_.speed)*s;for(let o=0;o<2;o++){let u=[];for(let e=0;e<=12;e++){let c=e/12,d=Math.sin(c*7-a*15+o*Math.PI)*3*s*(1-c);u.push({x:t-r*l*c-i*d,y:n-i*l*c+r*d-2*s})}e.lineStyle(1,8904431,c*.32).strokePoints(u,!1)}e.lineStyle(1,11991807,c*.35).strokeEllipse(t,n,19*s,6*s);for(let r=0;r<3;r++){let i=(5+r*3.5)*s,o=a*13-r*1.65,l=[];for(let e=0;e<=16;e++){let a=o+e/16*Math.PI*1.25;l.push({x:t+Math.cos(a)*i,y:n-(5+r*8)*s+Math.sin(a)*i*.32-e/16*2*s})}e.lineStyle(r===2?1.4:1,r===1?6543597:13893631,c*.56).strokePoints(l,!1)}for(let o=0;o<6;o++){let l=a*5+o*2.4,u=(8+o%3*3)*s,d=(a*19+o*5)%30*s,f=t+Math.cos(l)*u,p=n-d+Math.sin(l)*2*s;e.lineStyle(1,o%2?13040383:7067880,c*.5).lineBetween(f,p,f-r*2*s,p-i*2*s-s)}}var R_=class{group=new cn;errors=[];textures=new Map;ready=new Set;cards=[];used=0;disposed=!1;constructor(){this.group.name=`approved-combat-art`;for(let e of Object.keys(Lp))[`qBody`,`cast`,`ultimate`].includes(e)||this.texture(e)}texture(e){let t=this.textures.get(e);return t||(t=new No().load(Lp[e].url,e=>{this.disposed||this.ready.add(e)},void 0,()=>{this.disposed||this.errors.push(e)}),t.colorSpace=Le,t.magFilter=t.minFilter=r,t.generateMipmaps=!1,this.textures.set(e,t)),t}begin(){this.used=0}draw(e,t,n,r,i,a,o={}){let s=this.texture(e),c=this.cards[this.used];if(!c){c=new J(new Va(1,1),new Sr({transparent:!0,depthWrite:!1,alphaTest:.025,toneMapped:!1,fog:!1,side:2}));let e={value:0};c.userData.layer=e,c.material.onBeforeCompile=t=>{t.uniforms.combatRingLayer=e,t.fragmentShader=`uniform float combatRingLayer;
`+t.fragmentShader.replace(`#include <map_fragment>`,`
          #include <map_fragment>
          #ifdef USE_MAP
          if (combatRingLayer > 0.5) {
            vec2 pixel = floor(vec2(fract(vMapUv.x * 4.0) * 176.0, (1.0 - fract(vMapUv.y * 2.0)) * 144.0));
            float error = 100.0; float center = 24.0;
            float d = abs(length((pixel - vec2(88.0, 24.0)) / vec2(64.0, 25.0)) - 1.0);
            if (d < error) { error = d; center = 24.0; }
            d = abs(length((pixel - vec2(88.0, 55.0)) / vec2(71.0, 25.0)) - 1.0);
            if (d < error) { error = d; center = 55.0; }
            d = abs(length((pixel - vec2(88.0, 86.0)) / vec2(77.0, 29.0)) - 1.0);
            if (d < error) { center = 86.0; }
            bool front = pixel.y >= center;
            if ((combatRingLayer > 1.5) != front) discard;
          }
          #endif
        `)},c.material.customProgramCacheKey=()=>`approved-eq3-depth-v1`,c.frustumCulled=!1,this.cards.push(c),this.group.add(c)}this.used++,c.name=`combat-${e}`,c.userData.layer.value=o.ringLayer??0,c.visible=this.ready.has(s)&&(o.alpha??1)>0,c.material.map!==s&&(c.material.map=s,c.material.needsUpdate=!0),c.material.opacity=o.alpha??1,c.material.color.setHex(o.color??16777215),c.material.blending=o.additive?2:1;let l=s.image;if(l?.width){let n=Lp[e],a=$m(t,n.width||l.width,n.height||l.height,l.width,l.height),[s,u,d,f]=o.crop??[0,0,1,1],p=o.ax??.5,m=o.ay??1,h=(s-p)*r,g=(s+d-p)*r,_=(m-u-f)*i,v=(m-u)*i,y=c.geometry.getAttribute(`position`),b=c.geometry.getAttribute(`uv`);y.setXYZ(0,h,v,0),y.setXYZ(1,g,v,0),y.setXYZ(2,h,_,0),y.setXYZ(3,g,_,0),y.needsUpdate=!0;let x=a.left+(a.right-a.left)*s,S=x+(a.right-a.left)*d,C=a.top-(a.top-a.bottom)*u,w=C-(a.top-a.bottom)*f;b.setXY(0,x,C),b.setXY(1,S,C),b.setXY(2,x,w),b.setXY(3,S,w),b.needsUpdate=!0}return c.position.copy(Q(n,o.height??.9)),o.flat?c.rotation.set(-Math.PI/2,0,o.angle??0):(c.quaternion.copy(a.camera.quaternion),o.angle&&c.rotateZ(o.angle)),o.depth&&c.position.addScaledVector(a.camera.position.clone().sub(Q(a.focus)).normalize(),o.depth),c}end(){for(let e=this.used;e<this.cards.length;e++)this.cards[e].visible=!1}reset(){this.used=0,this.cards.forEach(e=>{e.visible=!1})}dispose(){if(!this.disposed){this.disposed=!0;for(let e of this.cards)e.geometry.dispose(),e.material.dispose();this.textures.forEach(e=>e.dispose()),this.cards.length=0,this.textures.clear(),this.ready.clear(),this.group.clear(),this.group.removeFromParent()}}},z_=class{positions=new Float32Array(196608);colors=new Float32Array(262144);geometry=new ur;mesh;used=0;color=new K;right=new W;up=new W;normal=new W;constructor(){this.geometry.setAttribute(`position`,new q(this.positions,3).setUsage(Ue)),this.geometry.setAttribute(`color`,new q(this.colors,4).setUsage(Ue)),this.mesh=new J(this.geometry,new Sr({vertexColors:!0,transparent:!0,depthWrite:!1,toneMapped:!1,fog:!1})),this.mesh.frustumCulled=!1,this.mesh.name=`combat-contact-batch`}begin(e){this.used=0,this.right.set(1,0,0).applyQuaternion(e.camera.quaternion),this.up.set(0,1,0).applyQuaternion(e.camera.quaternion),this.normal.set(0,0,1).applyQuaternion(e.camera.quaternion)}screen(e,t,n=0,r=0){return Q(e,t).addScaledVector(this.right,n).addScaledVector(this.up,-r)}line(e,t,n,r,i=1){if(r<=0||this.used+6>this.positions.length/3)return;let a=new W().subVectors(t,e).cross(this.normal).normalize().multiplyScalar(i/2);this.color.setHex(n);for(let n of[e.clone().sub(a),t.clone().sub(a),e.clone().add(a),e.clone().add(a),t.clone().sub(a),t.clone().add(a)])this.positions.set([n.x,n.y,n.z],this.used*3),this.colors.set([this.color.r,this.color.g,this.color.b,r],this.used++*4)}cut(e,t,n,r,i,a,o=1){this.line(this.screen(e,t,n.x,n.y),this.screen(e,t,r.x,r.y),i,a,o)}bodyArc(e,t,n,r,i,a,o,s,c){let l=Math.max(1,Math.ceil((a-i)*12));for(let u=0;u<l;u++){let d=i+(a-i)*u/l,f=i+(a-i)*(u+1)/l,p=Math.sin((d+f)/2)<0?-1.5:1.5;this.line(this.screen(e,t,Math.cos(d)*n,Math.sin(d)*r).addScaledVector(this.normal,p),this.screen(e,t,Math.cos(f)*n,Math.sin(f)*r).addScaledVector(this.normal,p),o,s,c)}}ring(e,t,n,r,i=0,a=Math.PI*2,o=1,s=1){let c=Math.max(1,Math.ceil((a-i)*10));for(let l=0;l<c;l++){let u=i+(a-i)*l/c,d=i+(a-i)*(l+1)/c;this.line(Q({x:e.x+Math.cos(u)*t,y:e.y+Math.sin(u)*t},o),Q({x:e.x+Math.cos(d)*t,y:e.y+Math.sin(d)*t},o),n,r,s)}}end(){if(this.geometry.setDrawRange(0,this.used),this.used)for(let e of[`position`,`color`]){let t=this.geometry.getAttribute(e);t.clearUpdateRanges(),t.addUpdateRange(0,this.used*t.itemSize),t.needsUpdate=!0}}reset(){this.geometry.setDrawRange(0,0)}dispose(){this.geometry.dispose(),this.mesh.material.dispose(),this.mesh.removeFromParent()}},B_=class{group=new cn;feel=new h_;sprites=new R_;ink=new z_;bursts=[];echoes=[];labels=[];shields=new Map;click=null;lastMatch=null;disposed=!1;constructor(){this.group.name=`combat-presentation`,this.group.add(this.sprites.group,this.ink.mesh)}showMove(e,t,n=!1){this.click={point:{...e},at:t,attack:n}}consume(e,t){e.match!==this.lastMatch&&(this.reset(),this.lastMatch=e.match),this.feel.update(e.match.time);for(let n of e.events){let r=n.at??e.match.time;if(n.type===`cast`&&n.ability===`q`){let t=e.match.hero(n.team);t.qCast&&this.feel.beginQ(t.id,t.qCast.startedAt,gd)}if(n.impact!==`ignite`&&this.feel.event(n,e.match.time),(n.sourceKind===`hero`||n.targetKind===`hero`)&&(n.type===`hit`||n.type===`last-hit`)&&(this.bursts.push({event:n,at:r}),(n.type===`last-hit`||(n.amount??0)>0||(n.absorbed??0)>0)&&this.label(n,r,e.match.entity(n.targetId??null))),n.type===`kill`&&n.targetId!==void 0&&(n.targetKind===`melee`||n.targetKind===`ranged`)){let e=t.snapshot(n.targetId);if(e){let t=p_(n);e.material.color.setHex(10993092),this.group.add(e),this.echoes.push({mesh:e,at:r,origin:e.position.clone(),dx:t.x,dy:t.y})}}}for(this.bursts=this.bursts.slice(-32);this.echoes.length>12;)this.releaseEcho(this.echoes.shift());for(;this.labels.length>32;)this.releaseLabel(this.labels.shift())}label(e,t,n){let i=e.type===`last-hit`,a=document.createElement(`canvas`);a.width=192,a.height=32;let o=a.getContext(`2d`);if(!o)return;o.font=`bold 18px Consolas, monospace`,o.textAlign=`center`,o.textBaseline=`middle`,o.lineWidth=3;let s=i?`+1 CS`:e.amount===0?`吸收 ${Math.round(e.absorbed??0)}`:`${e.amount}${e.critical?`!`:``}`;o.strokeStyle=`#10212b`,o.strokeText(s,96,16),o.fillStyle=i?`#ffe0a0`:e.team===`blue`?`#b5eee3`:`#f0b0a3`,o.fillText(s,96,16);let c=new mi(a);c.colorSpace=Le,c.magFilter=c.minFilter=r,c.generateMipmaps=!1;let l=new J(new Va(96,16),new Sr({map:c,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}));l.renderOrder=110,this.group.add(l),this.labels.push({mesh:l,at:t,point:{x:e.x,y:e.y},height:35+(n?Hp(n,t):0),duration:i?.85:.55})}update(e,t,n){let{match:r}=e,i=r.time;this.sprites.begin(),this.ink.begin(t);let a=r.entities.map(t=>e.positions.sample(t,e.alpha));for(let e of a){if(e.hp<=0)continue;let a=I_(e,r.eTargetLocks.get(e.id)??0,i);if(a){let t=e.y-a.y;this.ink.bodyArc(e,t,a.radiusX,a.radiusY,-Math.PI/2,Math.PI*1.5,1057585,.75,3.5),this.ink.bodyArc(e,t,a.radiusX,a.radiusY,-Math.PI/2,Math.PI*1.5,12637663,.22,1),this.ink.bodyArc(e,t,a.radiusX,a.radiusY,a.start,a.end,15924223,a.alpha,2)}if(e.kind!==`hero`)continue;let o=Hp(e,i);if(e.hp<e.maxHp&&Math.hypot(e.x-id[e.team].x,e.y-id[e.team].y)<=nd.fountainRadius){let t=i*1.5%1;this.ink.ring(e,12+t*13,e.team===`blue`?10410961:15052205,(1-t)*.45,0,Math.PI*2,1,1.2)}if(e.qCast){let n=Fp(this.feel.qAge(e.id,e.qCast.startedAt,i,jp,hd),0,0,t.screenHeading(e,e.qCast.facing));if(n.visible){let r={x:e.x+n.x,y:e.y};this.sprites.draw(`qSword`,n.frame,r,135*n.scale,39*n.scale,t,{ax:n.originX,ay:n.originY,angle:-n.rotation,alpha:n.alpha,height:o-n.y,depth:1})}}if(__(e,i)){let n=Math.max(0,i-(e.qReadyAt??i)),r=Math.min(1,n/.15,Math.max(0,(e.qStacksUntil??i)-i)/.25);for(let i=0;i<2;i++)this.sprites.draw(`aura`,Math.floor(n*12)%4+i*4,e,107.52,134.4,t,{alpha:r*(i?.85:.72),ay:280/320,depth:i?1:-1});for(let t=0;t<9;t++){let i=(n*.95+t/9)%1,a=t%2?1:-1,o=a*(23+Math.sin(i*7+t)*5),s=-i*104;this.ink.cut(e,.9,{x:o,y:s},{x:o-a*2,y:s+5},12907775,r*Math.sin(i*Math.PI)*.6)}}if(e.eqCast){let n=Bp(e.eqCast,i);if(n.visible)for(let r=0;r<2;r++){let i=this.sprites.draw(e.eqCast.empowered?`ring3`:`ring`,n.frame,e,176*zp,144*zp,t,{alpha:n.alpha,ay:125/144,depth:r?1:-1,ringLayer:e.eqCast.empowered?r+1:0,crop:e.eqCast.empowered?void 0:[0,r?88/144:0,1,r?56/144:88/144]});i.name=e.eqCast.empowered?`approved-eq3-layer`:`approved-eq-layer`}}if(e.eCast){let r=e.eCast,a=i-r.startedAt,o=Math.max(0,Math.min(1,(a-Yf.startup)/Yf.dash));if(a>Yf.startup&&a<Yf.duration){let i=n.body(e.id);if(i){let n=1-Math.min(1,Math.max(0,(a-Yf.startup-Yf.dash)/Yf.recovery));for(let e=0;e<3;e++){let a=Math.max(0,o-(e+1)*.12);this.ghost(i,{x:r.start.x+(r.end.x-r.start.x)*a,y:r.start.y+(r.end.y-r.start.y)*a},(.22-e*.06)*n,t)}let s=Math.max(0,o-.36);this.ink.line(Q({x:r.start.x+(r.end.x-r.start.x)*s,y:r.start.y+(r.end.y-r.start.y)*s},8),Q(e,8),12054252,.45*n,2)}}}if(e.passiveShieldAt!==void 0){let n=this.shields.get(e.id);(!n||n.startedAt!==e.passiveShieldAt)&&(n={startedAt:e.passiveShieldAt},this.shields.set(e.id,n));let r=e.passiveShieldUntil??n.startedAt+1;n.brokenAt===void 0&&i<r&&k_(e,i)<=0&&(n.brokenAt=i);let a=F_(i,n.startedAt,r,n.brokenAt);if(a.active)for(let n=0;n<2;n++)this.sprites.draw(`shield`,a.frame,e,33464/556*a.scale,94*a.scale,t,{alpha:a.alpha*(n?1:.9),additive:!0,height:o,depth:n?1.5:-1.5,crop:[n*.5,0,.5,1]})}if(Wf(e,i)&&e.destination)for(let n=0;n<2;n++){let r=(i*2.4+n*.5)%1,a=10+r*28,o=n?9:-9,s=Math.cos(e.facing),c=Math.sin(e.facing);this.sprites.draw(`homeguard`,0,{x:e.x-s*a-c*o,y:e.y-c*a+s*o},72+r*22,45,t,{flat:!0,angle:-e.facing,ax:.5,ay:.5,alpha:Math.sin(r*Math.PI)*.7,additive:!0})}}for(let e of r.projectiles)if(e.empowered){let n=Math.max(0,i-(e.startedAt??i));this.sprites.draw(`tornado`,Math.floor(n*16)%16,e,96,96,t,{ay:590/640,alpha:Math.min(1,n/.06,e.remaining/16)}),this.stormAccents(e,t,n)}else if(e.kind!==`q`){let t=r.entity(e.targetId),n=r.entity(e.sourceId),a=n?Math.hypot(e.x-n.x,e.y-n.y):0,o=n&&t?Math.min(1,a/Math.max(1,Math.hypot(n.x-t.x,n.y-t.y))):0,s=17+(t?(t.kind===`hero`?35:17)+Hp(t,i)-17:0)*o;this.ink.line(Q(e,s),Q({x:e.x-e.vx*6,y:e.y-e.vy*6},s),e.team===`blue`?7202267:15631746,.9,Math.max(2,e.radius*2))}for(let e of r.windWalls){let n=C_(i-e.startsAt);if(!n.active)continue;let r=xd.width*(.35+.65*n.grow),a=xd.height*n.grow,o=w_(e.angle);for(let i of[-1,1])this.sprites.draw(`wall`,n.frame,{x:e.x+Math.cos(e.angle)*xd.thickness*i*.35,y:e.y+Math.sin(e.angle)*xd.thickness*i*.35},r,a,t,{alpha:n.alpha*(i<0?.28:.85)}).rotation.set(0,-Math.atan2(o.y,o.x),0)}for(let e of r.summonerEffects){let n=i-e.startedAt;if(!(n<0||i>=e.endsAt)){if(e.kind===`flash`)for(let[r,a]of[e.from,e.to].entries())this.sprites.draw(`aura`,8+Math.min(3,Math.floor(n/.09)),a,256*(r?.62:.48),320*(r?.62:.48),t,{ay:165/320,height:30,alpha:Math.min(1,(e.endsAt-i)/.12)*(r?1:.7)});else{let r=a.find(t=>t.id===e.targetId);if(!r||r.hp<=0)continue;let o=r.kind===`hero`?.37:.24;this.sprites.draw(`aura`,12+Math.floor(n*12)%4,r,256*o,320*o,t,{ay:255/320,alpha:Math.min(1,n/.12,(e.endsAt-i)/.3)*.9,height:Hp(r,i),depth:2})}}}for(let e of r.zones)this.ink.ring(e,e.radius,e.team===`blue`?7202267:15631746,.65),this.ink.ring(e,e.radius*Math.max(0,Math.min(1,1-(e.triggerAt-i)/.55)),13893631,.4);if(this.click){let e=i-this.click.at;e>=0&&e<.4?this.sprites.draw(this.click.attack?`attack`:`move`,Math.min(23,Math.floor(e*60)),this.click.point,57.6,57.6,t,{flat:!0,ay:.5}):this.click=null}this.drawContacts(i,a,t),this.echoes=this.echoes.filter(e=>{let t=i-e.at;if(t>=.55)return this.releaseEcho(e),!1;let n=Math.min(1,Math.max(0,t/.22));return e.mesh.position.copy(e.origin).add(new W(e.dx*n*5,0,e.dy*n*3)),e.mesh.scale.set(1-n*.12,1-n*.6,1),e.mesh.material.opacity=.85*(1-Math.max(0,(t-.18)/.37)),!0}),this.labels=this.labels.filter(e=>{let n=i-e.at;return n>=e.duration?(this.releaseLabel(e),!1):(e.mesh.position.copy(Q(e.point,e.height+n/e.duration*18)),e.mesh.quaternion.copy(t.camera.quaternion),e.mesh.material.opacity=Math.max(0,1-n/e.duration),!0)}),this.sprites.end(),this.ink.end();for(let e=this.ghostUsed;e<this.ghosts.length;e++)this.ghosts[e].visible=!1;this.ghostUsed=0}ghosts=[];ghostUsed=0;ghost(e,t,n,r){let i=this.ghosts[this.ghostUsed++];i||(i=new J(new Va(1,1),e.material.clone()),i.frustumCulled=!1,this.ghosts.push(i),this.group.add(i));let a=i.geometry.getAttribute(`position`),o=i.geometry.getAttribute(`uv`),s=e.geometry.getAttribute(`position`),c=e.geometry.getAttribute(`uv`);for(let e=0;e<a.count;e++)a.setXYZ(e,s.getX(e),s.getY(e),s.getZ(e));a.needsUpdate=!0;for(let e=0;e<o.count;e++)o.setXY(e,c.getX(e),c.getY(e));o.needsUpdate=!0,i.material.map!==e.material.map&&(i.material.map=e.material.map,i.material.needsUpdate=!0),i.material.transparent=!0,i.material.depthWrite=!1,i.material.alphaTest=.025,i.material.color.setHex(11529448),i.material.opacity=n,i.position.copy(Q(t,.8)),i.quaternion.copy(r.camera.quaternion),i.visible=n>0}stormAccents(e,t,n){let r=16777215,i=1,a=1,o=this.ink,s={lineStyle(e,t,n=1){return a=e,r=t,i=n,s},lineBetween(t,n,c,l){return o.cut(e,.9,{x:t,y:n},{x:c,y:l},r,i,a),s},strokePoints(e){for(let t=1;t<e.length;t++)s.lineBetween(e[t-1].x,e[t-1].y,e[t].x,e[t].y);return s},strokeEllipse(e,t,n,r){let i=Array.from({length:33},(i,a)=>({x:e+Math.cos(a/32*Math.PI*2)*n/2,y:t+Math.sin(a/32*Math.PI*2)*r/2}));return s.strokePoints(i)}},c=t.screenHeading(e,Math.atan2(e.vy,e.vx));L_(s,0,0,Math.cos(c),Math.sin(c),n,e.remaining)}drawContacts(e,t,n){this.bursts=this.bursts.filter(t=>e-t.at<.45);for(let{event:r,at:i}of this.bursts){let a=e-i;if(a<0||r.impact===`ignite`)continue;let o=f_(r.impact),s=t.find(e=>e.id===r.targetId),c=s??r,l=(s?.kind===`hero`?35:16)+(s?Hp(s,e):0),u=p_(r),d=n.screenHeading(c,Math.atan2(u.y,u.x)),f={x:Math.cos(d),y:Math.sin(d)},p={x:-f.y,y:f.x};if(r.type===`last-hit`){let e=a/.4;for(let t=0;t<5;t++){let n=t*Math.PI*2/5-.6,r=6+e*20,i=Math.cos(n)*r,a=Math.sin(n)*r-e*9;this.ink.cut(c,l,{x:i,y:a},{x:i+2,y:a},16768910,Math.max(0,1-e),2)}continue}if(a>o.duration)continue;let m=a/o.duration,h=(1-m)**2,g=r.team===`blue`?10878953:16758425;if(a<.085){let e=1-a/.085,t=o.length*(.65+.35*Math.min(1,a/.02)),n=r.impact===`eq`||r.impact===`eq3`,i=n?p.x:f.x*.8+p.x*.6,s=n?p.y:f.y*.8+p.y*.6,u={x:-i*t*.45,y:-s*t*.45},d={x:i*t,y:s*t};this.ink.cut(c,l,u,d,1059899,e*.85,o.heavy?6:4),this.ink.cut(c,l+.1,u,d,15794166,e,o.heavy?3:2),this.ink.cut(c,l+.2,{x:-p.x*9,y:-p.y*9},{x:p.x*9,y:p.y*9},g,e)}let _=o.heavy?9:5;for(let e=0;e<_;e++){let t=(r.impact===`eq3`?-Math.PI/2:d)+(e-(_-1)/2)*.3,n=(o.heavy?43:27)*Math.sqrt(m)*(1+e%3*.13),i=(1-m)*(e%2?5:8),a=Math.cos(t)*n,s=Math.sin(t)*n+m*m*7;this.ink.cut(c,l,{x:a,y:s},{x:a-Math.cos(t)*i,y:s-Math.sin(t)*i},e%2?g:15400951,h,e%3?1:2)}if(o.heavy&&a<.18&&this.ink.ring(c,6+a*105,g,(1-a/.18)*.65),r.impact===`eq3`){let e=9+Math.sin(m*Math.PI)*7;for(let t=0;t<2;t++)for(let n=0;n<12;n++){let r=n/12*Math.PI*1.5+m*5+t*Math.PI,i=(n+1)/12*Math.PI*1.5+m*5+t*Math.PI,a=8-t*11-m*9;this.ink.cut(c,l,{x:Math.cos(r)*e,y:a+Math.sin(r)*e*.35},{x:Math.cos(i)*e,y:a+Math.sin(i)*e*.35},t?15400951:g,h*.75)}}}}releaseEcho(e){e.mesh.removeFromParent(),e.mesh.geometry.dispose(),e.mesh.material.dispose()}releaseLabel(e){e.mesh.removeFromParent(),e.mesh.geometry.dispose(),e.mesh.material.map?.dispose(),e.mesh.material.dispose()}reset(){this.feel.reset(),this.bursts=[],this.shields.clear(),this.click=null,this.echoes.forEach(e=>this.releaseEcho(e)),this.echoes=[],this.labels.forEach(e=>this.releaseLabel(e)),this.labels=[],this.ghosts.forEach(e=>{e.visible=!1}),this.ghostUsed=0,this.sprites.reset(),this.ink.reset()}dispose(){this.disposed||(this.disposed=!0,this.reset(),this.sprites.dispose(),this.ink.dispose(),this.ghosts.forEach(e=>{e.geometry.dispose(),e.material.dispose()}),this.ghosts=[],this.group.clear(),this.group.removeFromParent())}},V_=class{settings;group=new cn;map=df();contacts=[];stampGeometry=new Va(1,1).rotateX(-Math.PI/2);stamps;stampMaterial=new Sr({map:this.map,color:792613,transparent:!0,depthWrite:!1,toneMapped:!1,fog:!1,opacity:Ym.buildingContactOpacity});wall;transform=new sn;empty=new Nt().makeScale(0,0,0);disposed=!1;constructor(e,t){this.settings=e,this.group.name=`local-contact-occlusion`;for(let e of t)e.traverse(e=>{e instanceof J&&(/^painted-(tower|inner-tower|nexus-tower)$/.test(e.name)?this.contacts.push({source:e,width:200*e.scale.x,depth:130*e.scale.x}):e.name===`painted-inhibitor`?this.contacts.push({source:e,width:125,depth:80}):e.name===`painted-nexus`?this.contacts.push({source:e,width:240,depth:155}):e.name===`painted-guardian-pillar`?this.contacts.push({source:e,width:140,depth:88}):e.name===`painted-fire-bowl`&&this.contacts.push({source:e,width:60,depth:42}))});this.stampMaterial.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
float contactRadius = length((vMapUv - vec2(0.5)) * 2.0);
diffuseColor.a = opacity * (1.0 - smoothstep(0.32, 1.0, contactRadius));`)},this.stampMaterial.customProgramCacheKey=()=>`architectural-contact-plateau-v1`,this.stamps=new Gr(this.stampGeometry,this.stampMaterial,this.contacts.length),this.stamps.name=`building-contact-stamps`,this.stamps.frustumCulled=!1,this.group.add(this.stamps),this.stamps.renderOrder=3;let n=[];for(let e of[-1,1])for(let t=-720;t<720;t+=12){let r=new Va(1,1),i=r.getAttribute(`position`),a=r.getAttribute(`uv`);for(let n=0;n<4;n++){let r=t+(n%2?12:0),o=Q(Z(r,e*($d(r)-(n<2?2:16))),Ym.buildingContactHeight);i.setXYZ(n,o.x,o.y,o.z),a.setXY(n,n%2,n<2?.5:0)}n.push(r)}let r=Rd(n,!1);n.forEach(e=>e.dispose());let i=new Sr({map:this.map,color:1057075,transparent:!0,depthWrite:!1,toneMapped:!1,fog:!1,side:2,opacity:Ym.wallContactOpacity});i.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
diffuseColor.a = opacity * pow(clamp(vMapUv.y * 2.0, 0.0, 1.0), 2.0);`)},i.customProgramCacheKey=()=>`continuous-wall-contact-v1`,this.wall=new J(r,i),this.wall.name=`wall-foot-contact`,this.group.add(this.wall),this.update()}update(){this.group.visible=this.settings.contact.value>0;let e=!1;this.contacts.forEach(({source:t,width:n,depth:r},i)=>{t.updateWorldMatrix(!0,!1);let a=!0;for(let e=t;e;e=e.parent)a&&=e.visible;a?(this.transform.position.setFromMatrixPosition(t.matrixWorld),this.transform.position.y=Ym.buildingContactHeight,this.transform.scale.set(n,1,r),this.transform.updateMatrix(),this.stamps.setMatrixAt(i,this.transform.matrix),e=!0):(this.stamps.setMatrixAt(i,this.empty),e=!0)}),e&&(this.stamps.instanceMatrix.needsUpdate=!0)}dispose(){this.disposed||(this.disposed=!0,this.stamps.dispose(),this.stampGeometry.dispose(),this.stampMaterial.dispose(),this.wall.geometry.dispose(),this.wall.material.dispose(),this.map.dispose(),this.group.clear(),this.group.removeFromParent())}},H_=class{sun;direction=new W(-400,850,350).normalize().multiplyScalar(3500);last=``;constructor(e){this.sun=e,e.shadow.mapSize.set(Ym.shadowMapSize,Ym.shadowMapSize)}update(e,t,n=``){let r=this.sun,i=r.shadow.camera;if(!t){r.shadow.autoUpdate=!0,r.position.set(-400,850,350),r.target.position.set(0,0,0),r.updateMatrixWorld(),r.target.updateMatrixWorld(),Object.assign(i,{left:-3200,right:3200,top:2200,bottom:-2200,near:1,far:6e3}),i.updateProjectionMatrix(),this.last=``;return}r.shadow.autoUpdate=!1;let a=Q(e.focus),o=[];for(let t of[0,e.size.width])for(let n of[0,e.size.height]){let r=e.pick({x:t,y:n},{left:0,top:0,...e.size});if(r)for(let e of[0,420])o.push(Q(r,e))}let s=e=>{r.target.position.copy(e),r.position.copy(e).add(this.direction),r.updateMatrixWorld(),r.target.updateMatrixWorld(),i.position.copy(r.position),i.lookAt(e),i.updateMatrixWorld()};s(a);let c=o.map(e=>e.clone().applyMatrix4(i.matrixWorldInverse)),l=e=>Math.max(Ym.shadowMinimumExtent,Math.ceil((Math.max(...c.map(t=>t[e]))-Math.min(...c.map(t=>t[e]))+Ym.shadowPadding*2)/64)*64),u=l(`x`),d=l(`y`),f=u/r.shadow.mapSize.x,p=d/r.shadow.mapSize.y,m=new W(1,0,0).applyQuaternion(i.quaternion),h=new W(0,1,0).applyQuaternion(i.quaternion);a.addScaledVector(m,Math.round(a.dot(m)/f)*f-a.dot(m)),a.addScaledVector(h,Math.round(a.dot(h)/p)*p-a.dot(h)),s(a);let g=o.map(e=>e.applyMatrix4(i.matrixWorldInverse)),_=(Math.max(...g.map(e=>e.x))+Math.min(...g.map(e=>e.x)))/2,v=(Math.max(...g.map(e=>e.y))+Math.min(...g.map(e=>e.y)))/2,y=Math.round(_/f)*f,b=Math.round(v/p)*p;Object.assign(i,{left:y-u/2,right:y+u/2,top:b+d/2,bottom:b-d/2,near:1,far:1e4}),i.updateProjectionMatrix();let x=[a.x,a.y,a.z,u,d,y,b,n].join(`,`);x!==this.last&&(r.shadow.needsUpdate=!0,this.last=x)}},U_=class{settings;group=new cn;entries=[];disposed=!1;constructor(e,t){this.settings=e,this.group.name=`architecture-local-glow`;for(let e of t)e.traverse(e=>{if(!(e instanceof J)||!/^painted-(tower|inner-tower|nexus-tower|inhibitor|fire-bowl)$/.test(e.name))return;let t=e.material,n={value:new U(1/512,1/512)},r=new Sr({map:t.map,transparent:!0,depthWrite:!1,toneMapped:!1,fog:!1,blending:2,side:t.side,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});r.onBeforeCompile=e=>{e.uniforms.glowTexel=n,e.fragmentShader=`uniform vec2 glowTexel;
`+e.fragmentShader.replace(`#include <map_fragment>`,`
          #include <map_fragment>
          #ifdef USE_MAP
          vec4 center = texture2D(map, vMapUv);
          float centralMask = max(center.b - max(center.r, center.g), center.r - center.b) * center.a;
          vec3 halo = vec3(0.0); float energy = 0.0;
          for (int i = 0; i < 16; i++) {
            float angle = float(i) * 0.78539816;
            float radius = i < 8 ? 0.45 : 1.0;
            float weight = i < 8 ? 1.0 : 0.55;
            vec4 sampleColor = texture2D(map, vMapUv + vec2(cos(angle), sin(angle)) * glowTexel * ${Ym.glowRadiusTexels.toFixed(1)} * radius);
            float mask = smoothstep(0.10, 0.35, max(sampleColor.b - max(sampleColor.r, sampleColor.g), sampleColor.r - sampleColor.b))
              * smoothstep(0.35, 0.8, max(sampleColor.r, sampleColor.b)) * sampleColor.a;
            halo += sampleColor.rgb * mask * weight; energy += mask * weight;
          }
          diffuseColor.rgb = halo / max(energy, 0.001);
          diffuseColor.a = max(0.0, energy / 12.4 - max(0.0, centralMask) * 0.6) * opacity;
          #endif
        `)},r.customProgramCacheKey=()=>`architecture-halo-v2`;let i=new J(e.geometry,r);i.matrixAutoUpdate=!1,i.name=`local-glow-${e.name}`,this.group.add(i),this.entries.push({source:e,glow:i,material:r,texel:n})})}update(){this.group.visible=this.settings.glow.value>0&&!this.settings.reduced;for(let{source:e,glow:t,material:n,texel:r}of this.entries){e.updateWorldMatrix(!0,!1),t.matrix.copy(e.matrixWorld),t.matrixWorldNeedsUpdate=!0;let i=!0;for(let t=e;t;t=t.parent)i&&=t.visible;t.visible=i;let a=e.material,o=a.map?.image;o?.width&&o.height&&r.value.set(1/o.width,1/o.height),n.opacity=Ym.glowOpacity*a.opacity}}dispose(){this.disposed||(this.disposed=!0,this.entries.forEach(e=>e.material.dispose()),this.entries.length=0,this.group.clear(),this.group.removeFromParent())}};function W_(e,t,n,r){let i=t===`distant`?0:r?.sources.length??0,a=e.onBeforeCompile,o=e.customProgramCacheKey();e.onBeforeCompile=(o,s)=>{a.call(e,o,s),o.uniforms.qualityMaterial=n.materials,o.uniforms.qualityGrade=n.grading;let c=e.map?.image;o.uniforms.qualityTexel={value:new U(1/(c?.width??1024),1/(c?.height??1024))},i&&r&&r.bind(o),o.vertexShader=`varying vec3 qualityWorld;
varying vec3 qualityView;
varying vec3 qualityNormal;
`+o.vertexShader.replace(`#include <project_vertex>`,`
      #include <project_vertex>
      vec4 qualityPosition = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        qualityPosition = instanceMatrix * qualityPosition;
      #endif
      qualityWorld = (modelMatrix * qualityPosition).xyz;
      qualityView = mvPosition.xyz; qualityNormal = normalize(normalMatrix * normal);
    `),o.fragmentShader=`${t===`distant`?Th:``}\n${i&&r?r.glsl():``}\nuniform vec2 qualityTexel;\nuniform float qualityMaterial;\nuniform float qualityGrade;\nvarying vec3 qualityWorld;\nvarying vec3 qualityView;\nvarying vec3 qualityNormal;\n`+o.fragmentShader.replace(`#include <color_fragment>`,`
      #include <color_fragment>
      vec3 source = diffuseColor.rgb;
      float high = max(source.r, max(source.g, source.b));
      float low = min(source.r, min(source.g, source.b));
      float neutral = 1.0 - smoothstep(0.12, 0.35, high - low);
      float luminance = dot(source, vec3(0.2126, 0.7152, 0.0722));
      vec3 graded = vec3(luminance) * vec3(${Ym.neutralTint.map(e=>e.toFixed(4)).join(`, `)});
      diffuseColor.rgb = mix(source, graded, neutral * qualityGrade * ${Ym.colorGrade.toFixed(4)});
      ${t===`stone`?`
        // Texture-aligned high-pass relief, not a reconstruction of real height.
        // Preserve large painted shadows and ignore transparent neighboring RGB.
        float height = 0.0;
        #ifdef USE_MAP
          vec2 stepUv = qualityTexel * 2.0;
          vec4 detailLeft = texture2D(map, vMapUv - vec2(stepUv.x, 0.0));
          vec4 detailRight = texture2D(map, vMapUv + vec2(stepUv.x, 0.0));
          vec4 detailDown = texture2D(map, vMapUv - vec2(0.0, stepUv.y));
          vec4 detailUp = texture2D(map, vMapUv + vec2(0.0, stepUv.y));
          float detailWeight = detailLeft.a + detailRight.a + detailDown.a + detailUp.a;
          vec3 localMean = (detailLeft.rgb * detailLeft.a + detailRight.rgb * detailRight.a + detailDown.rgb * detailDown.a + detailUp.rgb * detailUp.a) / max(0.001, detailWeight);
          float localLuma = dot(localMean * diffuse, vec3(0.2126, 0.7152, 0.0722));
          float detailLod = 1.0 - smoothstep(1.5, 4.0, length(fwidth(vMapUv) / qualityTexel));
          height = clamp(luminance - localLuma, -0.12, 0.12) * ${Ym.stoneHeight} * detailLod * step(0.1, detailWeight);
        #endif
        vec3 n = normalize(qualityNormal);
        vec3 q0 = dFdx(qualityView), q1 = dFdy(qualityView);
        vec3 p0 = cross(q1, n), p1 = cross(n, q0);
        float determinant = dot(q0, p0);
        vec3 bump = normalize(abs(determinant) * n - sign(determinant) * (dFdx(height) * p0 + dFdy(height) * p1));
        vec3 lightDirection = normalize((viewMatrix * vec4(-0.4, 0.85, 0.35, 0.0)).xyz);
        float relief = clamp(dot(bump, lightDirection) - dot(n, lightDirection), -1.0, 1.0);
        float stoneMask = neutral * (1.0 - smoothstep(0.55, 0.9, high));
        diffuseColor.rgb *= 1.0 + relief * qualityMaterial * stoneMask * ${Ym.materialRelief.toFixed(4)};
        // Tonal separation at the scale of the actual painted slabs. Preserve
        // the source cracks and snow instead of adding unrelated noise lines.
        float stoneTone = clamp((luminance - ${Ym.stoneMidpoint}) / ${Ym.stoneMidpoint}, -1.0, 1.0);
        diffuseColor.rgb *= 1.0 + stoneTone * ${Ym.stoneContrast} * neutral * qualityMaterial;
        // Broad frost sheen is confined to neutral bright painted snow.
        vec3 stoneViewDirection = normalize(-qualityView);
        float frost = neutral * smoothstep(0.30, 0.65, luminance);
        float frostLight = pow(max(0.0, dot(bump, normalize(lightDirection + stoneViewDirection))), 4.0);
        diffuseColor.rgb += vec3(0.62, 0.80, 1.0) * frost * frostLight * qualityMaterial * ${Ym.frostSheen};
      `:t===`architecture`?`
        // Leave the baked form intact; deepen its existing shadow planes.
        float form = smoothstep(0.04, 0.40, luminance);
        diffuseColor.rgb *= mix(0.83, 1.06, form) * qualityMaterial + (1.0 - qualityMaterial);
      `:t===`metal`?`
        vec3 n = normalize(qualityNormal), v = normalize(-qualityView);
        vec3 lightDirection = normalize((viewMatrix * vec4(-0.4, 0.85, 0.35, 0.0)).xyz);
        float highlight = pow(max(0.0, dot(n, normalize(lightDirection + v))), ${Ym.metalPower.toFixed(1)});
        diffuseColor.rgb += vec3(0.75, 0.85, 1.0) * highlight * neutral * qualityMaterial * ${Ym.metalHighlight.toFixed(4)};
      `:t===`ice`?`
        // Saturated red and blue facets both respond; neutral snow stays out.
        float crystal = smoothstep(0.05, 0.25, max(source.b, source.r) - source.g) * smoothstep(0.2, 0.65, max(source.b, source.r));
        vec3 n = normalize(qualityNormal), v = normalize(-qualityView);
        float rim = pow(1.0 - abs(dot(n, v)), 3.0);
        vec3 lightDirection = normalize((viewMatrix * vec4(-0.4, 0.85, 0.35, 0.0)).xyz);
        float facet = pow(max(0.0, abs(dot(n, normalize(lightDirection + v)))), 16.0);
        vec3 qualityIceAccent = source.r > source.b ? vec3(1.0, 0.40, 0.23) : vec3(0.45, 0.74, 1.0);
        diffuseColor.rgb += qualityIceAccent * crystal * qualityMaterial * (rim * ${Ym.iceRim} + facet * ${Ym.iceSpecular});
      `:`
        // Distant detail loses contrast, without washing the combat deck.
        diffuseColor.rgb = canyonBackdropEdge(canyonBackdropGrade(source, qualityGrade), vMapUv.y, qualityGrade);
      `}
      ${i?`
        // Broad, continuous surface illumination; texture details remain visible.
        float warmth = qualityMaterial > 0.0 ? environmentLightAt(qualityWorld) * qualityMaterial * ${Ym.warmLightStrength} : 0.0;
        diffuseColor.rgb += (diffuseColor.rgb + vec3(0.10, 0.035, 0.005)) * vec3(1.0, 0.42, 0.08) * warmth;
      `:``}
    `)},e.customProgramCacheKey=()=>`${o}-surface-${t}-v4-${i}`}function G_(e){return e===`painted-distant-abyss`?`distant`:/^painted-(guardian-pillar|bridge-arch|load-bearing-pier|tower|inner-tower|nexus-tower|inhibitor|nexus|backwall)$/.test(e)?`architecture`:e.startsWith(`ice-`)?`ice`:/wall-lantern|drainage-grate/.test(e)?`metal`:/painted-(bridge-floor|road-extension|step-riser|entrance-step|wall-footing-edge|continuous-parapets|deck-edge)$/.test(e)?`stone`:null}var K_=class{blockers=[];constructor(e){for(let t of e)t.traverse(e=>{if(!(e instanceof J)||!/^painted-(tower|inner-tower|nexus-tower|guardian-pillar)$/.test(e.name))return;e.geometry.computeBoundingBox();let t=e.geometry.boundingBox;this.blockers.push({mesh:e,height:Math.max(1,t.max.y*e.scale.y),radius:Math.max(12,Math.min(45,(t.max.x-t.min.x)*e.scale.x*.16)),position:new W})})}update(){for(let e of this.blockers)e.mesh.updateWorldMatrix(!0,!1),e.position.setFromMatrixPosition(e.mesh.matrixWorld)}shade(e){let t=0;for(let n of this.blockers){let r=!0;for(let e=n.mesh;e;e=e.parent)r&&=e.visible;if(!r)continue;let i=n.height*400/850,a=-n.height*350/850,o=e.x-kd.x-n.position.x,s=e.y-kd.y-n.position.z,c=Math.max(0,Math.min(1,(o*i+s*a)/(i*i+a*a))),l=Math.hypot(o-c*i,s-c*a);t=Math.max(t,Math.max(0,1-l/(n.radius+10))**2*Math.sin(c*Math.PI))}return 1-t*.1}},q_=class{sources=[];positions;strengths;constructor(e){for(let t of e)t.traverse(e=>{if(e instanceof J){if(e.name===`painted-fire-bowl`){e.updateWorldMatrix(!0,!1);let t=e.getWorldPosition(new W);this.sources.push({source:e,point:new Ot(t.x,t.y+38,t.z,Ym.fireLightRadius),local:new W(0,38,0),strength:1})}if(e.name===`painted-small-wall-lantern-neutral`)for(let t of e.userData.placements??[]){let n=Q(Z(t.u,t.side*($d(t.u)-t.inset)),(t.top??84)-14);this.sources.push({source:e,point:new Ot(n.x,n.y,n.z,Ym.lanternLightRadius),local:n,strength:.7})}}});this.positions={value:this.sources.map(e=>e.point)},this.strengths={value:this.sources.map(()=>0)}}world=new W;update(e){this.sources.forEach(({source:t,strength:n,point:r,local:i},a)=>{t.updateWorldMatrix(!0,!1),this.world.copy(i).applyMatrix4(t.matrixWorld),r.set(this.world.x,this.world.y,this.world.z,r.w);let o=!0;for(let e=t;e;e=e.parent)o&&=e.visible;this.strengths.value[a]=o?n*(1+Math.sin(e*5.7+a)*.045):0})}sample(e,t=0){let n=0;return this.sources.forEach(({point:r},i)=>{let a=Math.hypot(e.x-kd.x-r.x,t-r.y,e.y-kd.y-r.z);n+=Math.max(0,1-a/r.w)**2*this.strengths.value[i]}),Math.min(1,n)}bind(e){e.uniforms.environmentLights=this.positions,e.uniforms.environmentStrengths=this.strengths}glsl(){let e=this.sources.length;return e?`uniform vec4 environmentLights[${e}];
      uniform float environmentStrengths[${e}];
      float environmentLightAt(vec3 world) {
        float light = 0.0;
        for (int i = 0; i < ${e}; i++) {
          float falloff = max(0.0, 1.0 - length(world - environmentLights[i].xyz) / environmentLights[i].w);
          light += falloff * falloff * environmentStrengths[i];
        }
        return min(light, 1.0);
      }`:`float environmentLightAt(vec3 world) { return 0.0; }`}},J_=class{quality;group=new cn;sources=[];receiver;disposed=!1;constructor(e,t){this.quality=e;for(let e of t)e.traverse(e=>{e instanceof J&&e.name===`painted-circular-paving`&&this.sources.push(e)});let n=this.sources.map(e=>{e.updateWorldMatrix(!0,!1);let t=e.geometry.clone().applyMatrix4(e.matrixWorld),n=t.getAttribute(`position`);for(let e=0;e<n.count;e++)n.setY(e,Ym.pavingShadowHeight);return t}),r=n.length?Rd(n,!1):new ur;n.forEach(e=>e.dispose());let i=new Ka({color:1120300,opacity:.32,depthWrite:!1,toneMapped:!1,fog:!1});i.onBeforeCompile=e=>{e.vertexShader=`varying vec2 pavingShadowUv;
`+e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
pavingShadowUv = uv;`),e.fragmentShader=`varying vec2 pavingShadowUv;
`+e.fragmentShader.replace(`#include <tonemapping_fragment>`,`gl_FragColor.a *= 1.0 - smoothstep(0.43, 0.5, length(pavingShadowUv - vec2(0.5)));
#include <tonemapping_fragment>`)},i.customProgramCacheKey=()=>`painted-paving-shadow-v1`,this.receiver=new J(r,i),this.receiver.name=`painted-paving-shadow-receiver`,this.receiver.receiveShadow=!0,this.receiver.renderOrder=2,this.group.name=`paving-shadow-receivers`,this.group.add(this.receiver)}update(){this.group.visible=this.quality.enhanced&&!this.quality.reduced&&this.sources.some(e=>e.visible)}dispose(){this.disposed||(this.disposed=!0,this.receiver.geometry.dispose(),this.receiver.material.dispose(),this.group.clear(),this.group.removeFromParent())}},Y_=class{container;quality=new Xm;cameraRig=new Md;renderer;scene=new _n;blockout=Fd();environment=new Df({centralArt:!0});central=new fh;painted=new Nh(this.quality);details=new d_;atmosphere=new $g(this.quality);smallDetails=new Eg;architecturalIce=new Bg;poros=new Qg;layoutOverlay=new Ph;showLayout=!1;landmarks=new _g;illumination=new q_([this.painted.group,this.smallDetails.group]);paintedArt=!0;actorLighting=new K_([this.painted.group,this.landmarks.group]);sprites=new eh(this.quality,this.actorLighting,this.illumination);combat=new B_;contacts=new V_(this.quality,[this.painted.group,this.landmarks.group]);pavingShadows=new J_(this.quality,[this.landmarks.group]);architecturalGlow=new U_(this.quality,[this.painted.group,this.landmarks.group]);shadowFocus=new H_(this.painted.group.children.find(e=>e instanceof Qo));presentation=`art`;centralOnly=!0;following=!1;selectedId=null;aim=null;onFrame;actors=new Map;dynamic=new cn;hints=new cn;diagnosticLights=new cn;raycaster=new _s;bodyGeometry=new yi(1,1,1,8);shotGeometry=new Wa(3,6,4);blue=new io({color:8440285});red=new io({color:14192012});hintMaterial=new Xr({color:14729604});wallMaterial=new Xr({color:11460081});selection;range;aimLine;disposed=!1;renderWidth=1920;lastCameraTime=0;currentMatch=null;transientResources=[];observer;qualityTextures=new Map;constructor(e,t={}){this.container=e;let n=t.smoothSampling??!0;this.sprites.stableHealthBars=n,this.renderer=new Ru({antialias:n,alpha:!1}),this.renderer.domElement.style.imageRendering=n?`auto`:`pixelated`,this.renderer.setPixelRatio(1),this.renderer.setClearColor(8557485),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=1,this.renderer.outputColorSpace=Le,this.renderer.toneMappingExposure=1.05,this.renderer.domElement.setAttribute(`aria-label`,`Three.js S01 画面样板画布`);let r=this.renderer.getContext().getContextAttributes()?.antialias===!0;this.renderer.domElement.dataset.antialias=r?`msaa`:`unavailable`,e.append(this.renderer.domElement),this.scene.add(this.atmosphere.group),this.diagnosticLights.add(new $o(12834021,1.1));let i=new Qo(16770242,2);i.position.set(-300,600,250),this.diagnosticLights.add(i),this.scene.add(this.blockout.group,this.dynamic,this.hints,this.diagnosticLights,this.environment.group,this.central.group,this.painted.group,this.landmarks.group,this.details.group,this.smallDetails.group,this.architecturalIce.group,this.poros.group,this.layoutOverlay.group,this.sprites.group,this.combat.group);let a=Array.from({length:65},(e,t)=>({x:Math.cos(t*Math.PI/32),y:Math.sin(t*Math.PI/32)})),o=()=>new ur().setFromPoints(a.map(e=>new W(e.x,1,e.y)));this.selection=new ii(o(),this.hintMaterial),this.range=new ii(o(),this.hintMaterial),this.aimLine=new ii(new ur().setFromPoints([new W,new W(1,0,0)]),this.hintMaterial),this.aimLine.frustumCulled=!1,this.scene.add(this.selection,this.range,this.aimLine),this.scene.add(this.contacts.group,this.pavingShadows.group,this.architecturalGlow.group);let s=new Set;for(let e of[this.painted.group,this.landmarks.group,this.details.group,this.smallDetails.group,this.architecturalIce.group])e.traverse(e=>{if(!(e instanceof J)||!(e.material instanceof Sr))return;e.material.userData.edgeCoverage=r,e.material.alphaToCoverage=r&&e.material.alphaTest>0&&!e.material.transparent;let t=G_(e.name);t&&!s.has(e.material)&&(s.add(e.material),W_(e.material,t,this.quality,this.illumination))});let c=Math.min(8,this.renderer.capabilities.getMaxAnisotropy());for(let e of s)e.map&&!this.qualityTextures.has(e.map)&&(this.qualityTextures.set(e.map,e.map.anisotropy),e.map.anisotropy=c);this.observer=new ResizeObserver(()=>this.resize()),this.observer.observe(e),this.resize()}resize(){let e=this.container.clientWidth,t=this.container.clientHeight;if(!e||!t||this.disposed)return;this.cameraRig.resize(e,t);let n=Math.abs(e/t-16/9)<.01?this.renderWidth*9/16:Math.max(1,Math.round(this.renderWidth*t/e));this.renderer.setSize(this.renderWidth,n,!1)}setResolution(e){this.renderWidth=e,this.resize()}setQuality(e){this.quality.reduced=e,this.atmosphere.setQuality(e),this.renderer.shadowMap.enabled=!e,this.scene.traverse(e=>{if(e instanceof J)for(let t of Array.isArray(e.material)?e.material:[e.material])t.needsUpdate=!0})}setEnhanced(e){this.quality.setEnhanced(e),this.renderer.shadowMap.type=+!!e;for(let[t,n]of this.qualityTextures){let r=e?Math.min(8,this.renderer.capabilities.getMaxAnisotropy()):n;t.anisotropy!==r&&(t.anisotropy=r,t.needsUpdate=!0)}this.scene.traverse(e=>{if(e instanceof J)for(let t of Array.isArray(e.material)?e.material:[e.material])t.needsUpdate=!0})}setQualityEffect(e,t){this.quality[e].value=+!!t}setTexture(e){this.blockout.material.map?.dispose(),this.blockout.material.map=Pd(e),this.blockout.material.needsUpdate=!0}ground(e){return this.cameraRig.pick(e,this.renderer.domElement.getBoundingClientRect())}pickActor(e){let t=this.renderer.domElement.getBoundingClientRect();return Id(this.cameraRig,t,e,[...this.actors.values()],this.raycaster)}pan(e,t){this.following=!1,this.cameraRig.panScreen(e,t)}frame(e){if(this.disposed)return;this.currentMatch!==e.match&&(this.clearActors(),this.sprites.reset(),this.currentMatch=e.match,this.selectedId=null,this.lastCameraTime=0);let{match:t,positions:n,alpha:r}=e;this.combat.consume(e,this.sprites);let i=this.presentation===`art`;this.renderer.toneMapping=i?4:0,this.blockout.group.visible=this.diagnosticLights.visible=!i,this.environment.group.visible=i&&!this.centralOnly&&!this.paintedArt,this.central.group.visible=i&&this.centralOnly&&!this.paintedArt,this.painted.group.visible=this.landmarks.group.visible=this.details.group.visible=this.smallDetails.group.visible=this.architecturalIce.group.visible=this.poros.group.visible=i&&this.paintedArt,this.sprites.group.visible=i,this.combat.group.visible=i,this.atmosphere.group.visible=i&&this.paintedArt,this.layoutOverlay.group.visible=i&&this.paintedArt&&this.showLayout,this.showLayout&&this.layoutOverlay.update(this.cameraRig.zoom),this.scene.fog=i?this.sampleFog:null;let a=n.sample(t.hero(`blue`),r),o=e.match.time-this.lastCameraTime;if(this.lastCameraTime=e.match.time,this.following&&this.cameraRig.follow(a,o),i){if(!this.paintedArt&&!this.centralOnly&&this.environment.update(t.time,t.tower(`blue`).hp>0,{point:a,height:ld.hero.height,camera:this.cameraRig}),this.paintedArt){this.painted.update(t.time,a,this.cameraRig),this.details.update(t.time),this.smallDetails.update(t.time),this.architecturalIce.update(t.time),this.atmosphere.update(t.time,this.cameraRig),this.poros.update(t.time,this.cameraRig,t.entities.filter(e=>e.kind===`hero`&&e.hp>0).map(e=>n.sample(e,r))),this.landmarks.update(t.time,a,this.cameraRig,{blue:t.tower(`blue`).hp>0,red:t.tower(`red`).hp>0},[t.tower(`blue`),t.tower(`red`)]),this.contacts.update(),this.pavingShadows.update(),this.illumination.update(t.time);let e=[];for(let t of[this.painted.group,this.landmarks.group,this.details.group])t.traverse(t=>{t instanceof J&&t.castShadow&&(t.updateWorldMatrix(!0,!1),e.push([t.id,t.visible,t.parent?.visible,...t.matrixWorld.elements].join(`:`)))});this.shadowFocus.update(this.cameraRig,this.quality.enhanced,e.join(`|`)),this.architecturalGlow.update(),this.actorLighting.update()}else this.central.update(t.time,a,this.cameraRig);this.sprites.update(t.entities.map(e=>n.sample(e,r)),t.time,this.cameraRig,this.combat.feel,this.paintedArt),this.combat.update(e,this.cameraRig,this.sprites)}this.contacts.group.visible=i&&this.paintedArt&&this.quality.contact.value>0,this.pavingShadows.group.visible&&=i&&this.paintedArt,this.architecturalGlow.group.visible=i&&this.paintedArt&&this.quality.glow.value>0&&!this.quality.reduced;let s=new Set;for(let e of t.entities){if(e.hp<=0)continue;s.add(e.id);let a=this.actors.get(e.id),o=ld[e.kind];a||(a=new J(this.bodyGeometry,e.team===`blue`?this.blue:this.red),a.scale.set(e.radius,o.height,e.radius),a.userData.entityId=e.id,this.actors.set(e.id,a),this.scene.add(a));let c=n.sample(e,r),l=(e.airborneUntil??0)>t.time?30:0,u=i&&this.paintedArt&&e.kind===`tower`?mg:{radius:e.radius,height:o.height};a.scale.set(u.radius,u.height,u.radius),a.position.copy(Q(c,u.height/2+l)),a.visible=!i||(e.kind===`tower`?!this.paintedArt&&e.team!==`blue`:!this.sprites.hasVisibleBody(e.id))}for(let[e,t]of this.actors)s.has(e)||(this.scene.remove(t),this.actors.delete(e));let c=t.entity(this.selectedId);if(this.selection.visible=!!c&&c.hp>0,c&&(this.selection.position.copy(Q(c,.5)),this.selection.scale.setScalar(c.radius+6)),this.range.position.copy(Q(a,.3)),this.range.scale.setScalar(rd.q.range),this.range.visible=!i&&t.phase!==`ended`,this.aimLine.visible=!i&&!!this.aim,this.aim&&this.aimLine.geometry.setFromPoints([Q(a,2),Q(this.aim,2)]),this.clearTransients(),!i)for(let e of t.entities)e.hp>0&&this.headingHint(e);if(!i)for(let e of t.projectiles){let t=new J(this.shotGeometry,e.team===`blue`?this.blue:this.red);t.position.copy(Q(e,16)),this.dynamic.add(t)}if(!i)for(let e of t.windWalls){let t=new ii(new ur().setFromPoints(Cd(e).map(e=>Q(e,32))),this.wallMaterial);this.transientResources.push(t.geometry),this.dynamic.add(t)}if(!i)for(let e of t.entities){if(!e.qCast||t.time-e.qCast.startedAt>=.72)continue;let n=e.qCast.facing,r={x:e.x+Math.cos(n)*rd.q.range,y:e.y+Math.sin(n)*rd.q.range},i=new ii(new ur().setFromPoints([Q(e,12),Q(r,12)]),this.hintMaterial);this.transientResources.push(i.geometry),this.dynamic.add(i)}this.renderer.render(this.scene,this.cameraRig.camera),this.onFrame?.(e)}sampleFog=new gn(8557485,5050,7100);headingGeometry=new bi(3,12,3);headingHint(e){let t=new J(this.headingGeometry,e.team===`blue`?this.blue:this.red);t.rotation.z=-Math.PI/2,t.rotation.y=-e.facing,t.position.copy(Q({x:e.x+Math.cos(e.facing)*(e.radius+6),y:e.y+Math.sin(e.facing)*(e.radius+6)},4)),this.hints.add(t)}clearTransients(){this.dynamic.clear(),this.hints.clear();for(let e of this.transientResources)e.dispose();this.transientResources=[]}clearActors(){for(let e of this.actors.values())this.scene.remove(e);this.actors.clear(),this.clearTransients()}dispose(){if(this.disposed)return;this.disposed=!0,this.observer.disconnect(),this.clearActors(),this.qualityTextures.clear(),this.pavingShadows.dispose(),this.architecturalGlow.dispose(),this.contacts.dispose(),this.combat.dispose(),this.sprites.dispose(),this.environment.dispose(),this.central.dispose(),this.painted.dispose(),this.landmarks.dispose(),this.details.dispose(),this.smallDetails.dispose(),this.architecturalIce.dispose(),this.poros.dispose(),this.layoutOverlay.dispose();let e=new cn;e.add(new J(this.bodyGeometry,this.blue),new J(this.shotGeometry,this.red),new J(this.headingGeometry,this.blue)),e.add(new ii(new ur,this.wallMaterial)),this.scene.add(e),this.atmosphere.dispose(),Ld(this.scene),this.scene.clear(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer.domElement.remove()}},X_=class{previous=new Map;capture(e){this.previous.clear();for(let t of e)this.previous.set(t.id,{x:t.x,y:t.y})}reset(){this.previous.clear()}sample(e,t){let n=this.previous.get(e.id);if(!n||Math.hypot(e.x-n.x,e.y-n.y)>32)return e;let r=Math.max(0,Math.min(1,t));return{...e,x:n.x+(e.x-n.x)*r,y:n.y+(e.y-n.y)*r}}},Z_=class{createMatch;view;match;accumulator=0;positions=new X_;disposed=!1;constructor(e,t){this.createMatch=e,this.view=t,this.match=e(),this.match.start()}command(e){if(this.disposed||this.match.phase!==`playing`)return!1;switch(e.kind){case`move`:return this.match.orderMove(`blue`,e.point),!0;case`attack`:return this.match.orderAttack(`blue`,e.id),!0;case`cast`:return this.match.cast(`blue`,e.ability,e.point);case`stop`:return this.match.stop(`blue`),!0;case`summoner`:return this.match.castSummoner(`blue`,e.key,e.point,e.targetId);case`flute`:return this.match.startFlute(`blue`)}}update(e){if(!this.disposed){if(!Number.isFinite(e)||e<0)throw RangeError(`Invalid elapsed time`);if(this.match.phase===`playing`){for(this.accumulator+=Math.min(e,.25);this.accumulator+1e-12>=ed.step;)if(this.positions.capture(this.match.entities),this.match.step(ed.step),this.accumulator=Math.max(0,this.accumulator-ed.step),this.match.phase!==`playing`){this.accumulator=0;break}}else this.accumulator=0;this.view.frame({match:this.match,alpha:this.match.phase===`playing`?this.accumulator/ed.step:1,positions:this.positions,events:this.match.drainEvents()})}}pause(){this.disposed||(this.match.togglePause(),this.accumulator=0)}restart(){this.disposed||(this.match=this.createMatch(),this.match.start(),this.accumulator=0,this.positions.reset())}dispose(){this.disposed||(this.disposed=!0,this.view.dispose())}},Q_={d:{name:`闪现`,cooldown:300,range:140},f:{name:`点燃`,cooldown:180,range:160,duration:5,ticks:5,damage:100}},$_={attack:.05,q:.07,protection:.35,inputBuffer:.18},ev=(e,t)=>(e.flinchUntil??0)>t;function tv(e,t,n,r,i){if(e.kind!==`hero`||t.kind===`tower`||t.hp<=0||i<=0||e.team===t.team||n!==`attack`&&n!==`q`||(t.airborneUntil??0)>r||ev(t,r)||(t.flinchProtectedUntil??0)>r)return 0;let a=$_[n];return t.flinchUntil=r+a,t.flinchProtectedUntil=r+a+$_.protection,a}function nv(e,t){return Math.max(t,e.windup>0?t+e.windup:0,e.qCast?e.qCast.startedAt+hd:0,e.eCast?e.eCast.startedAt+Yf.duration:0,e.eqCast?.endsAt??0,e.wCast?e.wCast.startedAt+vd:0,e.q3Cast?e.q3Cast.startedAt+g_.castDuration:0,e.rCast?e.rCast.startedAt+Tp.duration:0)}function rv(e,t){return Math.max(t,e.qCast?e.qCast.startedAt+gd+.05:0,e.wCast?e.wCast.startedAt+yd+.05:0,e.q3Cast?e.q3Cast.startedAt+g_.releaseDelay+.05:0,e.eCast?e.eCast.startedAt+Yf.startup+Yf.dash:0,e.eqCast?e.eqCast.triggerAt+.05:0,e.rCast?e.rCast.startedAt+Tp.duration:0)}function iv(e,t){rv(e,t)>t||(e.qCast?.hit&&(e.qCast=null),e.wCast&&=null,e.q3Cast?.released&&(e.q3Cast=null),e.eqCast?.hit&&(e.eqCast=null),e.eCast&&Math.hypot(e.x-e.eCast.end.x,e.y-e.eCast.end.y)<.01&&(e.eCast=null))}function av(e){return e===`blue`?`red`:`blue`}var ov=class{phase=`ready`;time=0;wave=0;cs={blue:0,red:0};kills={blue:0,red:0};deaths={blue:0,red:0};entities=[];projectiles=[];zones=[];windWalls=[];summonerEffects=[];summonerCooldowns={blue:{d:0,f:0},red:{d:0,f:0}};eTargetLocks=new Map;hitStunEnabled=!0;bufferedOrders=new Map;bufferedNavigation=new Map;attackMoveGoals=new Map;bufferedOrder(e){return this.bufferedOrders.get(e)??this.bufferedNavigation.get(e)}retainBufferedCast(e,t){return this.bufferedOrders.get(e)?.kind===`cast`&&(this.bufferedNavigation.set(e,t),!0)}inputExpiry(e){return Math.max(this.time+$_.inputBuffer,nv(e,this.time)+$_.inputBuffer)}setHitStunEnabled(e){if(this.hitStunEnabled=e,!e)for(let e of this.entities)e.flinchUntil=0,e.flinchProtectedUntil=0}flushBufferedOrders(){for(let e of[`blue`,`red`]){let t=this.bufferedOrders.get(e)??this.bufferedNavigation.get(e);if(!t)continue;let n=this.hero(e);if(n.hp<=0||this.time>t.expiresAt){this.bufferedOrders.delete(e),this.bufferedNavigation.delete(e);continue}if(ev(n,this.time)||(n.airborneUntil??0)>this.time)continue;let r=t.kind===`cast`&&t.ability===`q`&&Zf(n,this.time);if(rv(n,this.time)>this.time&&!r||t.kind!==`cast`&&n.windup>0||t.kind===`cast`&&n.abilities[t.ability]>this.time)continue;let i=this.bufferedNavigation.get(e);this.bufferedOrders.delete(e),this.bufferedNavigation.delete(e),r||iv(n,this.time),t.kind===`move`?this.orderMove(e,t.point):t.kind===`attack-move`?this.orderAttackMove(e,t.point):t.kind===`attack`?this.orderAttack(e,t.targetId):t.kind===`cast`?(this.cast(e,t.ability,t.point,t.targetId),i&&this.bufferedNavigation.set(e,{...i,expiresAt:Math.max(i.expiresAt,rv(n,this.time)+$_.inputBuffer)})):this.stop(e)}}dashTarget(e,t=`blue`,n){if(n===void 0)return $f(this.hero(t),this.entities,e);let r=this.entity(n);return r&&r.hp>0&&r.team!==t&&r.kind!==`tower`?r:void 0}dashError(e,t=`blue`,n){let r=this.hero(t),i=this.dashTarget(e,t,n);if(!i)return`请指向敌方小兵或英雄后按 E。`;if((this.eTargetLocks.get(i.id)??0)>this.time)return`该目标暂时不能再次踏前斩。`;if($(r,i)>Yf.range)return`目标超出踏前斩范围。`;let a=Qf(r,i),o=zf(r,i);return(a.x-i.x)*o.x+(a.y-i.y)*o.y<r.radius+i.radius?`地图边界处没有足够的穿越空间。`:Qu&&$(Od(r,a,r.radius,r.id),a)>1?`建筑石座挡住了踏前斩的路径。`:null}events=[];result=null;nextId=1;nextWaveAt=nd.firstWaveAt;nextAiAt=1;laneWaves=[];claims=[];options;constructor(e={}){this.options={ai:e.ai??!0,waves:e.waves??!0,random:e.random??Math.random},this.entities.push(this.createEntity(`tower`,`blue`,ad.blue)),this.entities.push(this.createEntity(`tower`,`red`,ad.red)),this.entities.push(this.createEntity(`hero`,`blue`,od.blue)),this.entities.push(this.createEntity(`hero`,`red`,od.red))}hero(e){return this.entities.find(t=>t.kind===`hero`&&t.team===e)}rTarget(e){let t=this.hero(e);if(!(this.phase!==`playing`||t.hp<=0||t.abilities.r>this.time||t.rCast||(t.airborneUntil??0)>this.time||t.q3Cast&&!t.q3Cast.released))return Dp(t,this.entities,this.time,rd.r.range)}tower(e){return this.entities.find(t=>t.kind===`tower`&&t.team===e)}entity(e){return this.entities.find(t=>t.id===e)}start(){this.phase===`ready`&&(this.phase=`playing`)}togglePause(){this.phase===`playing`?this.phase=`paused`:this.phase===`paused`&&(this.phase=`playing`)}drainEvents(){let e=this.events;return this.events=[],e}createEntity(e,t,n){let r=nd[e];return{...n,id:this.nextId++,kind:e,team:t,hp:r.hp,maxHp:r.hp,radius:ld[e].radius,speed:`speed`in r?r.speed:0,range:r.range,damage:r.damage,attackInterval:r.attackInterval,cooldown:0,windup:0,targetId:null,attackTargetId:null,destination:null,attackStartedAt:null,attackReleasedAt:null,attacksReleased:0,qCast:null,facing:t===`blue`?-.45:2.7,slowUntil:0,hitAt:-10,mana:e===`hero`?nd.hero.mana:0,maxMana:e===`hero`?nd.hero.mana:0,...e===`hero`?{flow:0,passiveShield:0,passiveShieldUntil:0,critChance:0,level:1}:{},abilities:{q:0,w:0,e:0,r:0},guardUntil:0,aggroUntil:0,aggroTargetId:null}}spawnMinion(e,t,n){let r=this.createEntity(t,e,n);return this.entities.push(r),r}spawnWave(){this.wave++;for(let e of[`blue`,`red`]){let t=id[e],n=zf(t,id[av(e)]),r=sd[e],i=Qu?{x:r.x+n.x*90,y:r.y+n.y*90}:{x:t.x+n.x*180,y:t.y+n.y*180};this.spawnMinionLane(e,i,this.wave)}this.events.push({type:`wave`,team:`blue`,...Qu?sd.blue:od.blue})}spawnMinionLane(e,t,n=this.wave){let r=zf(id[e],id[av(e)]);this.laneWaves.push({team:e,wave:n,front:{...t}});for(let i=0;i<6;i++){let a=Rf(Hm(t,r,i),ld.melee.radius),o=this.spawnMinion(e,i<3?`melee`:`ranged`,a);o.formation={wave:n,slot:i,goal:a}}}startFlute(e=`blue`){let t=this.hero(e);return this.phase!==`playing`||t.hp<=0||ev(t,this.time)||(t.airborneUntil??0)>this.time||nv(t,this.time)>this.time||t.qCast||t.q3Cast||t.wCast||t.eCast||t.rCast||t.eqCast?!1:(this.stop(e),t.fluteAt=this.time,!0)}orderMove(e,t){if(this.phase!==`playing`)return;let n=this.hero(e);if(n.hp<=0||(this.attackMoveGoals.delete(e),n.fluteAt=null,this.retainBufferedCast(e,{kind:`move`,point:{...t},expiresAt:this.inputExpiry(n)})))return;if(ev(n,this.time)){this.bufferedOrders.set(e,{kind:`move`,point:{...t},expiresAt:this.inputExpiry(n)});return}this.bufferedOrders.delete(e),this.bufferedNavigation.delete(e),iv(n,this.time);let r=Rf(t);n.destination=Qu?Rf(Dd(r,n.radius,n.id)):r,n.targetId=null,n.attackTargetId=null,n.windup=0,this.clearAttackPresentation(n),this.events.push({type:`move`,team:e,...n.destination})}orderAttack(e,t){if(this.phase!==`playing`)return;let n=this.entity(t),r=this.hero(e);!n||n.team===e||n.hp<=0||r.hp<=0||(this.attackMoveGoals.delete(e),r.fluteAt=null,!this.retainBufferedCast(e,{kind:`attack`,targetId:t,expiresAt:this.inputExpiry(r)})&&(ev(r,this.time)?this.bufferedOrders.set(e,{kind:`attack`,targetId:t,expiresAt:this.inputExpiry(r)}):(this.bufferedOrders.delete(e),this.bufferedNavigation.delete(e),iv(r,this.time),r.targetId!==t&&(r.windup=0,r.attackTargetId=null,this.clearAttackPresentation(r)),r.targetId=t,r.destination=null)))}orderAttackMove(e,t){let n=this.hero(e);this.phase!==`playing`||n.hp<=0||this.retainBufferedCast(e,{kind:`attack-move`,point:{...t},expiresAt:this.inputExpiry(n)})||(ev(n,this.time)?(n.fluteAt=null,this.bufferedOrders.set(e,{kind:`attack-move`,point:{...t},expiresAt:this.inputExpiry(n)})):(this.orderMove(e,t),this.attackMoveGoals.set(e,{...n.destination})))}updateAttackMove(e){let t=this.attackMoveGoals.get(e.team);if(!t)return;let n=t=>t.hp>0&&t.team!==e.team&&$(e,t)<=145+t.radius,r=this.entity(e.targetId),i=r&&n(r)?r:this.entities.filter(n).sort((n,r)=>$(t,n)-$(t,r)||$(e,n)-$(e,r)||n.id-r.id)[0];e.targetId!==(i?.id??null)&&(e.windup=0,e.attackTargetId=null,this.clearAttackPresentation(e)),e.targetId=i?.id??null,e.destination=i||$(e,t)<1?null:{...t}}castSummoner(e,t,n,r=null){let i=this.hero(e),a=Q_[t],o=t===`d`&&!i.rCast&&!i.wCast&&!!(i.qCast||i.q3Cast||i.eqCast);if(this.phase!==`playing`||i.hp<=0||this.summonerCooldowns[e][t]>this.time||ev(i,this.time)||(i.airborneUntil??0)>this.time||nv(i,this.time)>this.time&&!(t===`f`&&i.rCast)&&!o)return!1;if(t===`d`){let t=zf(i,n),r=Math.min(a.range,$(i,n));if(r<1)return!1;let s={x:i.x,y:i.y},c=Rf({x:i.x+t.x*r,y:i.y+t.y*r},i.radius),l=Qu?Rf(Dd(c,i.radius,i.id),i.radius):c,u=o?this.bufferedOrders.get(e):void 0;this.stop(e),u?.kind===`cast`&&this.bufferedOrders.set(e,u),o&&i.eqCast&&(i.eCast=null),Object.assign(i,l),A_(i,$(s,l),this.time),i.eqCast&&!i.eqCast.hit&&(i.eqCast.startedAt=this.time-Xf.windup,i.eqCast.triggerAt=this.time,i.eqCast.endsAt=this.time+Xf.recovery,this.resolveEQ(i)),this.summonerEffects.push({kind:`flash`,team:e,startedAt:this.time,endsAt:this.time+.5,from:s,to:{...l},sourceId:i.id})}else{let t=r===null?i.rCast?.targetIds.map(e=>this.entity(e)).find(t=>t&&t.hp>0&&t.team!==e):this.entity(r);if(!t||t.team===e||t.kind===`tower`||t.hp<=0||$(i,t)>a.range+t.radius)return!1;i.fluteAt=null,this.summonerEffects.push({kind:`ignite`,team:e,startedAt:this.time,endsAt:this.time+Q_.f.duration,from:{x:i.x,y:i.y},to:{x:t.x,y:t.y},sourceId:i.id,targetId:t.id,ticks:0})}return this.summonerCooldowns[e][t]=this.time+a.cooldown,!0}updateSummoners(){for(let e of this.summonerEffects)if(e.kind===`ignite`){let t=this.entity(e.sourceId),n=this.entity(e.targetId??null);if(!t||!n||n.hp<=0){e.endsAt=this.time;continue}let r=Math.min(Q_.f.ticks,Math.floor((this.time-e.startedAt+1e-9)/(Q_.f.duration/Q_.f.ticks)));for(;(e.ticks??0)<r&&n.hp>0;)e.ticks=(e.ticks??0)+1,this.damage(t,n,Q_.f.damage/Q_.f.ticks,!1,`ignite`);n.hp<=0&&(e.endsAt=this.time)}this.summonerEffects=this.summonerEffects.filter(e=>e.endsAt>this.time)}stop(e){let t=this.hero(e);this.attackMoveGoals.delete(e),t.fluteAt=null,this.bufferedNavigation.delete(e),this.phase===`playing`&&t.hp>0&&ev(t,this.time)?this.bufferedOrders.set(e,{kind:`stop`,expiresAt:this.inputExpiry(t)}):(this.bufferedOrders.delete(e),t.destination=null,t.targetId=null,t.windup=0,t.attackTargetId=null,this.clearAttackPresentation(t))}cast(e,t,n,r){if(this.phase!==`playing`)return!1;let i=this.hero(e),a=rd[t];if(i.hp<=0)return!1;let o=t===`e`?this.dashTarget(n,e,r):void 0;if(t===`e`&&(!o||(this.eTargetLocks.get(o.id)??0)>this.time))return!1;let s=t===`q`&&Zf(i,this.time)&&!i.eqCast,c=t===`r`&&!!this.rTarget(e);if(t===`r`&&!c)return!1;let l=Math.max(i.abilities[t],s||c?this.time:rv(i,this.time));if(l>this.time+$_.inputBuffer&&(!ev(i,this.time)||i.abilities[t]>this.time+$_.inputBuffer)||t===`e`&&l<=this.time&&!ev(i,this.time)&&this.dashError(n,e,r))return!1;if(i.fluteAt=null,ev(i,this.time)||l>this.time)return this.bufferedOrders.set(e,{kind:`cast`,ability:t,point:{...n},...o?{targetId:o.id}:{},expiresAt:this.inputExpiry(i)}),!0;if(this.bufferedOrders.delete(e),s||iv(i,this.time),i.rCast||(i.airborneUntil??0)>this.time)return!1;if(t===`r`){if(i.q3Cast&&!i.q3Cast.released)return!1;let n=this.rTarget(e);if(!n)return!1;let r=this.entities.filter(t=>t.team!==e&&t.kind!==`tower`&&t.hp>0&&(t.airborneUntil??0)>this.time&&$(t,n)<=32);i.rCast={startedAt:this.time,targetIds:r.map(e=>e.id),hit:!1},i.flow=100,v_(i);for(let e of r)e.airborneUntil=this.time+Tp.airborneDuration,e.windup=0,e.attackTargetId=null;let o=Rf({x:n.x+Tp.offsetX,y:n.y+Tp.offsetY});return Object.assign(i,Qu?Rf(Dd(o,i.radius,i.id)):o),i.facing=Math.PI*.75,i.eCast=null,i.eqCast=null,i.qCast=null,i.q3Cast=null,i.wCast=null,i.destination=null,i.targetId=null,i.windup=0,i.attackTargetId=null,this.clearAttackPresentation(i),i.abilities.r=this.time+a.cooldown,i.homeguardUntil=0,i.homeguardCombatAt=this.time,this.events.push({type:`cast`,team:e,x:i.x,y:i.y,ability:t}),!0}if(i.q3Cast||i.wCast&&this.time<i.wCast.startedAt+.8)return!1;if(Zf(i,this.time)){if(t!==`q`||i.eqCast)return!1;let n=i.eCast,r=Math.max(n.startedAt+Yf.startup+Yf.dash,this.time+Xf.windup);i.abilities.q=this.time+a.cooldown;let o=__(i,this.time);return o&&v_(i),i.eqCast={startedAt:r-Xf.windup,triggerAt:r,endsAt:r+Xf.recovery,eStartedAt:n.startedAt,facing:n.facing,hit:!1,empowered:o,critical:this.rollCritical(i)},i.qCast=null,i.homeguardUntil=0,i.homeguardCombatAt=this.time,this.events.push({type:`cast`,team:e,x:i.x,y:i.y,ability:`q`,impact:o?`eq3`:`eq`}),!0}if(i.eqCast&&this.time<i.eqCast.endsAt||t===`e`&&this.dashError(n,e,r))return!1;i.abilities[t]=this.time+a.cooldown;let u=zf(i,Rf(n));if(i.facing=Math.atan2(u.y,u.x),i.qCast=t===`q`?{startedAt:this.time,facing:i.facing,critical:this.rollCritical(i)}:null,t===`q`&&(i.windup=0,i.attackTargetId=null,this.clearAttackPresentation(i)),t===`q`){if(__(i,this.time)){let n=i.qCast?.critical;return v_(i),i.qCast=null,i.q3Cast={startedAt:this.time,facing:i.facing,released:!1,critical:n},i.homeguardUntil=0,i.homeguardCombatAt=this.time,this.events.push({type:`cast`,team:e,x:i.x,y:i.y,ability:t,impact:`q3`}),!0}}else if(t===`w`)i.wCast={startedAt:this.time,facing:i.facing},this.windWalls.push({id:this.nextId++,team:e,x:i.x+u.x*32,y:i.y+u.y*32,angle:i.facing,startsAt:this.time+yd}),i.windup=0,i.attackTargetId=null,this.clearAttackPresentation(i);else{let t=this.dashTarget(n,e,r),a={x:i.x,y:i.y},o=Qf(i,t);i.facing=Math.atan2(t.y-i.y,t.x-i.x),i.eCast={startedAt:this.time,start:a,end:o,facing:i.facing,targetId:t.id,hit:!1},this.eTargetLocks.set(t.id,this.time+Yf.targetCooldown),i.destination=null,i.targetId=null,i.windup=0,i.attackTargetId=null,this.clearAttackPresentation(i)}return i.homeguardUntil=0,i.homeguardCombatAt=this.time,this.events.push({type:`cast`,team:e,x:i.x,y:i.y,ability:t}),!0}rollCritical(e){return e.kind===`hero`&&M_(e).chance>0&&this.options.random()<M_(e).chance}damage(e,t,n,r=!1,i=`attack`,a){if(this.phase!==`playing`||n<=0||t.hp<=0||t.team===e.team)return;let o=M_(e),s=e.kind===`hero`&&t.kind!==`tower`&&[`attack`,`q`,`q3`,`eq`,`eq3`].includes(i)&&(a??this.rollCritical(e)),c=(n+(e.kind===`hero`?i===`attack`||[`q`,`q3`,`eq`,`eq3`].includes(i)?o.bonusAD:i===`e`?o.bonusAD*.2:i===`r`?o.bonusAD*1.5:0:0))*(s?o.multiplier:1)*(i!==`ignite`&&t.guardUntil>this.time?.6:1)*(t.kind===`tower`?.65:1),l=j_(e,t,c,this.time);t.hp=Math.max(0,t.hp-l.remaining),t.fluteAt=null,t.hitAt=this.time,t.hitFrom={x:e.x,y:e.y},this.hitStunEnabled&&tv(e,t,i,this.time,c),t.kind===`hero`&&(t.homeguardUntil=0,t.homeguardCombatAt=this.time),r&&(t.slowUntil=this.time+1.5);let u={at:this.time,sourceId:e.id,targetId:t.id,sourceKind:e.kind,targetKind:t.kind,from:{x:e.x,y:e.y},impact:i};if(this.events.push({type:`hit`,team:e.team,x:t.x,y:t.y,amount:Math.round(l.remaining),absorbed:l.absorbed,critical:s,...u}),e.kind===`hero`&&t.kind===`hero`){for(let n of this.entities)n.team===t.team&&(n.kind===`melee`||n.kind===`ranged`)&&n.hp>0&&$(n,e)<Bm.heroNotice&&(n.aggroTargetId=e.id,n.aggroUntil=this.time+2);let n=this.tower(t.team);n.hp>0&&$(n,e)<=n.range+e.radius&&(n.aggroTargetId=e.id,n.aggroUntil=this.time+2.5)}t.hp>0||(t.flinchUntil=0,t.flinchProtectedUntil=0,t.kind===`hero`&&(this.bufferedOrders.delete(t.team),this.bufferedNavigation.delete(t.team),this.attackMoveGoals.delete(t.team)),t.qCast=null,t.q3Cast=null,v_(t),t.wCast=null,t.eCast=null,t.eqCast=null,t.rCast=null,t.airborneUntil=0,t.flow=0,t.passiveShield=0,t.passiveShieldUntil=0,this.events.push({type:`kill`,team:e.team,x:t.x,y:t.y,...u}),t.kind===`hero`&&(this.deaths[t.team]++,e.kind===`hero`&&this.kills[e.team]++),t.kind===`hero`?this.claims.push({team:av(t.team),reason:`first-blood`}):t.kind===`tower`?this.claims.push({team:av(t.team),reason:`first-tower`}):e.kind===`hero`&&(this.cs[e.team]++,this.events.push({type:`last-hit`,team:e.team,x:t.x,y:t.y,...u}),this.cs[e.team]>=nd.csToWin&&this.claims.push({team:e.team,reason:`100-cs`})))}step(e){if(this.phase===`playing`){this.time+=e;for(let[e,t]of this.eTargetLocks)t<=this.time&&this.eTargetLocks.delete(e);this.options.waves&&this.time>=this.nextWaveAt&&(this.spawnWave(),this.nextWaveAt+=nd.waveInterval),this.options.ai&&this.time>=this.nextAiAt&&(this.thinkAi(),this.nextAiAt=this.time+nd.aiInterval),this.updateMinionLanes(e);for(let t of this.entities){if((t.qStacksUntil??0)<=this.time&&(t.qStacks??0)>0&&v_(t),t.hp<=0)continue;let n={x:t.x,y:t.y};if(t.cooldown=Math.max(0,t.cooldown-e),t.kind===`hero`?(Uf(t,this.time),(t.passiveShieldUntil??0)<=this.time&&(t.passiveShield=0),$(t,id[t.team])<nd.fountainRadius&&(t.hp=Math.min(t.maxHp,t.hp+nd.fountainHeal*e))):this.chooseTarget(t),this.updateCombat(t,e),A_(t,$(n,t),this.time),t.eqCast&&t.hp>0){let e=t.eqCast;this.resolveEQ(t),this.time>=e.endsAt&&(t.eqCast=null)}}this.flushBufferedOrders(),this.separateUnits(),this.windWalls=this.windWalls.filter(e=>this.time<e.startsAt+bd),this.updateProjectiles(e),this.updateZones(),this.updateSummoners(),this.entities=this.entities.filter(e=>e.hp>0||e.kind===`hero`||e.kind===`tower`||this.projectiles.some(t=>t.sourceId===e.id)),this.resolveOutcome(),this.events.length>300&&this.events.splice(0,this.events.length-300)}}resolveEQ(e){let t=e.eqCast;if(!t||t.hit||e.hp<=0||this.time<t.triggerAt)return;t.hit=!0;let n=!1;for(let r of this.entities)r.hp>0&&r.team!==e.team&&r.kind!==`tower`&&$(e,r)<=Xf.radius+r.radius&&(n=!0,this.damage(e,r,rd.q.damage,!1,t.empowered?`eq3`:`eq`,t.critical),t.empowered&&r.hp>0&&(r.airborneUntil=this.time+g_.knockup,r.windup=0,r.attackTargetId=null));n&&!t.empowered&&y_(e,this.time)}chooseTarget(e){let t=e.kind===`tower`?e.range:e.formation?160:e.kind===`ranged`?110:39,n=e.kind===`melee`||e.kind===`ranged`,r=zf(id[e.team],id[av(e.team)]),i=t=>!e.formation||t.kind===`hero`||t.kind===`tower`||Math.abs((t.x-e.formation.goal.x)*-r.y+(t.y-e.formation.goal.y)*r.x)<=Bm.spacing*2,a=this.entities.filter(r=>r.hp>0&&r.team!==e.team&&$(r,e)<=t+this.targetRadius(r,e)&&(!n||i(r))&&(!n||r.kind!==`hero`||$(e,r)<=Bm.heroNotice&&(!e.formation||$(e.formation.goal,r)<=Bm.leash)));if(n&&e.aggroUntil>this.time){let t=a.find(t=>t.id===e.aggroTargetId);if(t){e.targetId=t.id,e.destination=null;return}}if(e.kind===`tower`&&e.aggroUntil>this.time){let t=a.find(t=>t.id===e.aggroTargetId);if(t){e.targetId=t.id;return}}let o=e=>e.kind===`melee`||e.kind===`ranged`?0:e.kind===`hero`?1:2,s=a.find(t=>t.id===e.targetId);if(s&&o(s)===Math.min(...a.map(o)))e.targetId=s.id;else{let t=new Map(a.map(t=>[t.id,n&&e.formation?Wm(e,t,this.entities):$(e,t)]));a.sort((e,n)=>o(e)-o(n)||t.get(e.id)-t.get(n.id)||e.id-n.id),e.targetId=a[0]?.id??null}e.kind!==`tower`&&(e.destination=e.formation?.goal??(e.targetId?null:id[av(e.team)]))}updateMinionLanes(e){this.laneWaves=this.laneWaves.filter(e=>this.entities.some(t=>t.hp>0&&t.team===e.team&&t.formation?.wave===e.wave));for(let t of this.laneWaves){let n=zf(id[t.team],id[av(t.team)]),r=this.entities.filter(e=>e.hp>0&&e.team===t.team&&e.formation?.wave===t.wave),i=r.some(e=>e.kind===`melee`),a=1/0;for(let e of this.entities){if(e.hp<=0||e.team===t.team)continue;let r=e.x-t.front.x,o=e.y-t.front.y,s=r*n.x+o*n.y,c=-r*n.y+o*n.x;s>=-30&&Math.abs(c)<100&&(a=Math.min(a,s-e.radius-(i?nd.melee.range-2:nd.ranged.range-2)))}let o=Math.max(0,Math.min(nd.melee.speed*Bm.marchMultiplier*e,a));t.front=Rf({x:t.front.x+n.x*o,y:t.front.y+n.y*o});for(let e of r)e.formation.goal=Rf(Hm(t.front,n,e.formation.slot,i),e.radius)}}clearAttackPresentation(e){e.attackStartedAt=null,e.attackReleasedAt=null}updateCombat(e,t){let n=this.bufferedOrders.get(e.team),r=n?.kind===`cast`&&n.ability===`q`&&Zf(e,this.time);if(e.kind===`hero`&&!r&&(e.destination||e.targetId!==null||this.bufferedOrder(e.team))&&iv(e,this.time),e.rCast){let t=e.rCast;if(!t.hit&&this.time>=t.startedAt+Tp.hitAt){t.hit=!0;for(let n of t.targetIds){let t=this.entity(n);t&&t.hp>0&&this.damage(e,t,rd.r.damage,!1,`r`)}}this.time>=t.startedAt+Tp.duration&&(e.rCast=null);return}if((e.airborneUntil??0)>this.time)return;if(e.q3Cast){let t=e.q3Cast;e.facing=t.facing,!t.released&&this.time>=t.startedAt+g_.releaseDelay&&(t.released=!0,this.projectiles.push({id:this.nextId++,sourceId:e.id,team:e.team,kind:`q`,empowered:!0,critical:t.critical,startedAt:this.time,hitIds:[],x:e.x,y:e.y,targetId:null,damage:rd.q.damage,speed:g_.speed,vx:Math.cos(t.facing),vy:Math.sin(t.facing),remaining:g_.range,radius:g_.radius})),this.time>=t.startedAt+g_.castDuration&&(e.q3Cast=null);return}if(e.eCast){let t=e.eCast,n={x:e.x,y:e.y},r=Math.max(0,Math.min(1,(this.time-t.startedAt-Yf.startup)/Yf.dash));e.x=t.start.x+(t.end.x-t.start.x)*r,e.y=t.start.y+(t.end.y-t.start.y)*r,e.facing=t.facing;let i=Rf(e,e.radius);Object.assign(e,Qu?Rf(Dd(i,e.radius,e.id)):i);let a=this.entity(t.targetId);!t.hit&&r>0&&a&&a.hp>0&&Vf(a,n,e)<=a.radius+e.radius&&(t.hit=!0,this.damage(e,a,rd.e.damage,!1,`e`)),this.time>=t.startedAt+Yf.duration&&(e.eCast=null);return}if(e.wCast&&this.time<e.wCast.startedAt+.8){e.facing=e.wCast.facing;return}if(e.wCast=null,e.eqCast&&this.time<e.eqCast.endsAt)return;if(e.qCast){let t=e.qCast;if(e.facing=t.facing,!t.hit&&this.time>=t.startedAt+.4281081081081081){t.hit=!0;let n={x:Math.cos(t.facing),y:Math.sin(t.facing)},r={x:e.x+n.x*rd.q.range,y:e.y+n.y*rd.q.range},i=this.entities.filter(t=>t.hp>0&&t.team!==e.team&&t.kind!==`tower`&&(t.x-e.x)*n.x+(t.y-e.y)*n.y>=0&&Vf(t,e,r)<=t.radius+6);for(let n of i)this.damage(e,n,rd.q.damage,!1,`q`,t.critical);i.length&&y_(e,this.time)}if(_d(e,this.time))return}if(e.qCast=null,ev(e,this.time)&&e.windup<=0)return;if(e.kind===`hero`&&this.updateAttackMove(e),e.formation){let n=e.formation.goal,r=this.entity(e.targetId);if(!r||r.hp<=0){if($(e,n)>2){e.windup=0,e.attackTargetId=null,this.clearAttackPresentation(e),this.walk(e,n,t);return}e.windup=0,e.attackTargetId=null,this.clearAttackPresentation(e);return}e.destination=null}let i=this.entity(e.targetId);if(!i||i.hp<=0)e.attackReleasedAt===null&&this.clearAttackPresentation(e),e.targetId=null,e.windup=0,e.attackTargetId=null,e.destination&&this.walk(e,e.destination,t);else if(e.facing=Math.atan2(i.y-e.y,i.x-e.x),e.windup>0){if(e.kind!==`hero`&&e.attackTargetId!==i.id||$(e,i)>this.attackReach(e,i,!0)){e.windup=0,e.attackTargetId=null,this.clearAttackPresentation(e);return}e.windup-=t,e.windup<=0&&(e.cooldown=e.attackInterval,e.attackTargetId=null,e.attackReleasedAt=this.time,e.attacksReleased++,e.kind===`hero`&&this.events.push({type:`attack`,team:e.team,x:e.x,y:e.y,at:this.time,sourceId:e.id,sourceKind:e.kind,targetId:i.id,targetKind:i.kind,impact:`attack`}),e.kind===`melee`||e.kind===`hero`?this.damage(e,i,e.damage):this.projectiles.push({id:this.nextId++,sourceId:e.id,team:e.team,kind:`attack`,x:e.x,y:e.y-4,targetId:i.id,damage:e.damage,speed:e.kind===`tower`?145:nd.projectileSpeed,vx:0,vy:0,remaining:4,radius:e.kind===`tower`?3:1.5}))}else $(e,i)<=this.attackReach(e,i)?e.cooldown<=0&&(e.windup=nd[e.kind].windup,e.attackTargetId=i.id,e.attackStartedAt=this.time,e.attackReleasedAt=null):e.speed>0&&this.walk(e,e.formation?Um(e,i,id[e.team],this.entities):i,t)}attackReach(e,t,n=!1){return fd(e,t,n)+this.targetRadius(t,e)-t.radius}targetRadius(e,t){let n=Qu&&e.kind===`tower`?Ed(e,t):null;return Math.max(e.radius,n??e.radius)}walk(e,t,n){if(ev(e,this.time))return;let r=Qu?Od(e,t,e.radius,e.id):t;e.facing=Math.atan2(r.y-e.y,r.x-e.x);let i=this.entity(e.targetId);Bf(e,r,Vm(e,!!i&&i.hp>0)*n*(e.slowUntil>this.time?.7:1)*(Wf(e,this.time)?Hf.multiplier:1));let a=Rf(e,e.radius),o=Qu?Rf(Dd(a,e.radius,e.id)):a;e.x=o.x,e.y=o.y,e.destination&&$(e,e.destination)<1&&(e.destination=null)}separateUnits(){let e=this.entities.filter(e=>e.hp>0);for(let t=0;t<e.length;t++)for(let n=t+1;n<e.length;n++){let r=e[t],i=e[n],a=$(r,i),o=(r.kind===`melee`||r.kind===`ranged`)&&(i.kind===`melee`||i.kind===`ranged`)?Math.max(r.radius+i.radius-1,r.team===i.team?Bm.allySpacing:18):r.radius+i.radius-1;if(r.eCast||i.eCast||r.rCast||i.rCast||(r.airborneUntil??0)>this.time||(i.airborneUntil??0)>this.time||a>=o)continue;let s=a>0?zf(r,i):{x:(r.id+i.id)%2?1:-1,y:0},c=(o-a)*.5;r.speed>0&&(r.x-=s.x*c,r.y-=s.y*c),i.speed>0&&(i.x+=s.x*c,i.y+=s.y*c);let l=Rf(r,r.radius),u=Rf(i,i.radius);Qu&&r.speed>0&&Object.assign(l,Rf(Dd(l,r.radius,r.id))),Qu&&i.speed>0&&Object.assign(u,Rf(Dd(u,i.radius,i.id))),r.x=l.x,r.y=l.y,i.x=u.x,i.y=u.y}}updateProjectiles(e){let t=[];for(let n of this.projectiles){let r=this.entity(n.sourceId);if(!r)continue;let i={x:n.x,y:n.y},a=n.kind===`attack`?this.entity(n.targetId):void 0,o={...i};if(n.kind===`q`){let t=Math.min(n.speed*e,n.remaining);o.x+=n.vx*t,o.y+=n.vy*t}else a&&Bf(o,a,n.speed*e);if(n.empowered){let e=Math.min(...this.windWalls.filter(e=>e.team!==n.team&&this.time>=e.startsAt&&this.time<e.startsAt+3.9).map(e=>wd(e,i,o,n.radius)??1/0)),a=Math.min(1,e),s={x:i.x+(o.x-i.x)*a,y:i.y+(o.y-i.y)*a};for(let t of this.entities)if(t.hp>0&&t.team!==n.team&&t.kind!==`tower`&&!n.hitIds?.includes(t.id)){let a=Sd(i,o,t,t.radius+n.radius);if(a===null||a>=e)continue;(n.hitIds??=[]).push(t.id),this.damage(r,t,n.damage,!1,`q3`,n.critical),t.hp>0&&(t.airborneUntil=this.time+g_.knockup,t.windup=0,t.attackTargetId=null)}n.remaining-=$(i,s),n.x=s.x,n.y=s.y,e>1&&n.remaining>0&&t.push(n);continue}let s=n.kind===`attack`?a?[a]:[]:this.entities.filter(e=>e.hp>0&&e.team!==n.team&&e.kind!==`tower`),c=Math.min(...s.map(e=>Sd(i,o,e,e.radius+(n.kind===`q`?n.radius:0))??1/0));if(!(n.kind===`attack`&&r.kind!==`tower`&&this.windWalls.some(e=>{if(e.team===n.team||this.time<e.startsAt||this.time>=e.startsAt+3.9)return!1;let t=wd(e,i,o,n.radius);return t!==null&&t<=c}))){if(n.kind===`attack`){let i=this.entity(n.targetId);if(!i||i.hp<=0)continue;n.remaining-=e,$(n,i)<=n.speed*e+i.radius?this.damage(r,i,n.damage):n.remaining>0&&(Bf(n,i,n.speed*e),t.push(n))}else{let i={x:n.x,y:n.y},a=Math.min(n.speed*e,n.remaining);n.x+=n.vx*a,n.y+=n.vy*a,n.remaining-=a;let o=this.entities.filter(e=>e.hp>0&&e.team!==n.team&&e.kind!==`tower`&&!n.hitIds?.includes(e.id)&&Vf(e,i,n)<=e.radius+n.radius).sort((e,t)=>$(e,i)-$(t,i))[0];o?(this.damage(r,o,n.damage,!1,`q`),y_(r,this.time)):n.remaining>0&&t.push(n)}}}this.projectiles=t}updateZones(){let e=[];for(let t of this.zones){if(this.time<t.triggerAt){e.push(t);continue}let n=this.entity(t.sourceId);if(n)for(let e of this.entities)e.hp>0&&e.team!==t.team&&e.kind!==`tower`&&$(t,e)<=t.radius+e.radius&&this.damage(n,e,t.damage,!0,`spell`)}this.zones=e}resolveOutcome(){if(this.claims.length===0)return;let e=this.claims.some(e=>e.team===`blue`),t=this.claims.some(e=>e.team===`red`),n={"first-blood":0,"first-tower":1,"100-cs":2};this.claims.sort((e,t)=>n[e.reason]-n[t.reason]),this.result={winner:e&&t?null:e?`blue`:`red`,reason:e&&t?`draw`:this.claims[0].reason,time:this.time},this.phase=`ended`,this.bufferedOrders.clear(),this.bufferedNavigation.clear(),this.events.push({type:`end`,team:this.result.winner??`blue`,x:ed.width/2,y:ed.height/2}),this.claims=[]}thinkAi(){let e=this.hero(`red`),t=this.hero(`blue`);if(e.hp<=0||t.hp<=0||nv(e,this.time)>this.time||ev(e,this.time))return;let n=e.hp/e.maxHp,r=this.tower(`blue`),i=this.entities.some(e=>e.team===`red`&&e.kind!==`hero`&&e.kind!==`tower`&&e.hp>0&&$(e,r)<r.range);if(n<.32||n<.83&&$(e,id.red)<nd.fountainRadius+2){this.orderMove(`red`,id.red),$(t,e)<rd.q.range&&n<.26&&this.cast(`red`,`w`,t);return}if($(e,r)<r.range+18&&!i){let t=zf(r,e);this.orderMove(`red`,{x:r.x+t.x*(r.range+30),y:r.y+t.y*(r.range+30)});return}let a=this.zones.find(t=>t.team===`blue`&&$(t,e)<t.radius+10);if(a){let t=zf(a,e);this.orderMove(`red`,Rf({x:e.x+t.x*38,y:e.y+t.y*38}));return}let o=$(e,t);if((t.airborneUntil??0)>this.time&&this.cast(`red`,`r`,t)||__(e,this.time)&&o<g_.range&&this.cast(`red`,`q`,t))return;if(o<Yf.range&&n>.58&&Math.floor(this.time)%3==0&&this.cast(`red`,`e`,t)){this.cast(`red`,`q`,t);return}if(o<rd.q.range&&n>.45&&this.cast(`red`,`q`,t))return;let s=this.entities.filter(t=>t.hp>0&&t.team===`blue`&&(t.kind===`melee`||t.kind===`ranged`)&&$(t,e)<120);s.sort((t,n)=>Number(t.hp>e.damage)-Number(n.hp>e.damage)||t.hp-n.hp||$(t,e)-$(n,e)),s[0]?this.orderAttack(`red`,s[0].id):o<73&&n>.6?this.orderAttack(`red`,t.id):i&&$(e,r)<130?this.orderAttack(`red`,r.id):this.orderMove(`red`,cd)}},sv=e=>document.getElementById(e),cv=sv(`stage`),lv=!1,uv,dv=(e,t)=>{let n=[...e].sort((e,t)=>e-t);return n[Math.max(0,Math.ceil(n.length*t)-1)]??null};function fv(e){if(!e.length)return null;let t=e.reduce((e,t)=>e+t,0),n=[...e].sort((e,t)=>t-e),r=n.slice(0,Math.max(1,Math.ceil(n.length*.01)));return{frames:e.length,meanMs:t/e.length,fps:1e3*e.length/t,p50:dv(e,.5),p95:dv(e,.95),p99:dv(e,.99),max:Math.max(...e),low1:1e3/(r.reduce((e,t)=>e+t,0)/r.length),over606:e.filter(e=>e>1e3/165+.3).length,over167:e.filter(e=>e>1e3/60+.3).length,over333:e.filter(e=>e>1e3/30).length}}function pv(e){let t=new ov({ai:!1,waves:!1,random:()=>.42});for(let e of[`blue`,`red`])Object.assign(t.hero(e),Z(e===`blue`?-76:76,-65),{hp:1e6,maxHp:1e6,damage:0});for(let n=0;n<e;n++){let r=n<e/2?`blue`:`red`,i=n%(e/2),a=Math.floor(i/6),o=i%6,s=Z((r===`blue`?-1:1)*(12+a*5),(o-2.5)*22),c=t.spawnMinion(r,i%6<3?`melee`:`ranged`,s);c.hp=c.maxHp=1e6,c.damage=0}return t}function mv(e){let t=e.renderer.getContext(),n=t.getExtension(`EXT_disjoint_timer_query_webgl2`),r=[],i=null;return{supported:!!n,begin(e){n&&e&&(i=t.createQuery(),t.beginQuery(n.TIME_ELAPSED_EXT,i))},end(){i&&=(t.endQuery(n.TIME_ELAPSED_EXT),r.push(i),null)},poll(e){if(!n)return;let i=t.getParameter(n.GPU_DISJOINT_EXT);for(;r.length&&t.getQueryParameter(r[0],t.QUERY_RESULT_AVAILABLE);){let n=r.shift();i||e.push(t.getQueryParameter(n,t.QUERY_RESULT)/1e6),t.deleteQuery(n)}},dispose(){for(let e of r)t.deleteQuery(e)}}}async function hv(){cv.innerHTML=``;let e=[],t,n;return await new Promise(r=>{function i(a){n===void 0?n=t=a:(a-n>500&&e.push(a-t),t=a),lv||a-n>3500?r():requestAnimationFrame(i)}requestAnimationFrame(i)}),fv(e)}async function gv(e,t,n,r,i){let a=new Z_(()=>pv(t),e),o=mv(e),s=[],c=[],l=[],u=[],d=[];e.cameraRig.setElevation(45),e.cameraRig.setZoom(.6),e.cameraRig.lookAt(Z(0)),e.centralOnly=!1;let f,p,m=0,h=0;sv(`state`).textContent=`${n} · ${t} 小兵 · 第 ${r} 轮`,await new Promise(t=>{function n(r){p===void 0&&(p=f=r);let i=r-p,g=i>=4e3,_=r-f;f=r,document.hidden&&h++,g&&_>0&&s.push(_),o.begin(g&&m%8==0);let v=performance.now();a.update(_/1e3);let y=performance.now()-v;if(o.end(),o.poll(l),g&&(c.push(y),u.push(e.renderer.info.render.calls),m%30==0)){let t=e.cameraRig.camera;d.push(a.match.entities.filter(e=>e.kind===`melee`||e.kind===`ranged`).filter(e=>{let n=Q(e).project(t);return Math.abs(n.x)<1&&Math.abs(n.y)<1}).length)}m++,lv||i>=14e3?t():requestAnimationFrame(n)}requestAnimationFrame(n)}),o.poll(l),o.dispose();let g=e.renderer.getContext(),_=g.getExtension(`WEBGL_debug_renderer_info`),v={mode:n,round:r,count:t,raf:fv(s),cpu:fv(c),gpu:fv(l),gpuTimer:o.supported,drawCalls:dv(u,.5),minVisible:Math.min(...d),maxVisible:Math.max(...d),liveMinions:a.match.entities.filter(e=>(e.kind===`melee`||e.kind===`ranged`)&&e.hp>0).length,attacks:a.match.entities.reduce((e,t)=>e+t.attacksReleased,0),hiddenFrames:h,antialias:g.getContextAttributes().antialias,samples:g.getParameter(g.SAMPLES),renderer:_?g.getParameter(_.UNMASKED_RENDERER_WEBGL):g.getParameter(g.RENDERER),textureErrors:[...e.sprites.errors,...e.painted.errors,...e.landmarks.errors],renderSize:{width:e.renderer.domElement.width,height:e.renderer.domElement.height},cssSize:{width:cv.clientWidth,height:cv.clientHeight}};i.runs.push(v),a.dispose(),uv=null,_v(i)}function _v(e){localStorage.setItem(`three-performance-last`,JSON.stringify(e)),sv(`rows`).innerHTML=e.runs.map(e=>`<tr><td>${e.mode} / ${e.count} / #${e.round}</td><td>${e.raf.fps.toFixed(1)}</td><td>${e.raf.low1.toFixed(1)}</td><td>${e.raf.p95.toFixed(2)}</td><td>${e.cpu.p95.toFixed(2)}</td><td>${e.gpu?.p95.toFixed(2)??`不可用`}</td><td>${e.raf.over167}</td></tr>`).join(``),sv(`result`).textContent=JSON.stringify(e,null,2)}var vv=localStorage.getItem(`three-performance-last`);if(vv)try{let e=JSON.parse(vv);_v(e),sv(`state`).textContent=e.complete?`上次测试已完成`:`上次测试记录（中断）`}catch{}sv(`stop`).onclick=()=>{lv=!0},sv(`start`).onclick=async()=>{sv(`start`).disabled=!0,lv=!1;let e={started:new Date().toISOString(),conditions:`1920x1080, fixed 45deg / zoom .6, full quality, fixed camera, real simulation/combat, zero damage to hold population, two rounds in reversed mode order; pre-optimization sampling reconstructed on current game code`,runs:[]};try{sv(`state`).textContent=`浏览器空载刷新率校准`,e.idle=await hv(),_v(e);for(let t of[1,2])for(let n of t===1?[`优化前`,`优化后`]:[`优化后`,`优化前`])for(let r of[12,60,120]){if(lv)break;cv.innerHTML=``;let i=new Y_(cv,{smoothSampling:n===`优化后`});uv=i,await gv(i,r,n,t,e)}e.complete=!lv,e.finished=new Date().toISOString(),sv(`state`).textContent=lv?`已停止`:`测试完成`,_v(e)}catch(t){e.error=String(t),sv(`state`).textContent=`测试失败`,_v(e),uv?.dispose()}finally{sv(`start`).disabled=!1}};