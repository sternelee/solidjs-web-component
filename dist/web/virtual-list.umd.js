(function($){typeof define=="function"&&define.amd?define($):$()})(function(){"use strict";const P={equals:(e,t)=>e===t};let K=G;const E={},v=1,B=2,Z={owned:null,cleanups:null,context:null,owner:null};var g=null;let S=null,r=null,b=null,u=null,m=null,L=0;function U(e,t){t=t?Object.assign({},P,t):P;const s={value:e,observers:null,observerSlots:null,pending:E,comparator:t.equals||void 0},n=i=>(typeof i=="function"&&(i=i(s.pending!==E?s.pending:s.value)),M(s,i));return[ee.bind(s),n]}function C(e,t,s){const n=se(e,t,!1,v);O(n)}function z(e){if(b)return e();let t;const s=b=[];try{t=e()}finally{b=null}return D(()=>{for(let n=0;n<s.length;n+=1){const i=s[n];if(i.pending!==E){const o=i.pending;i.pending=E,M(i,o)}}},!1),t}function k(e){let t,s=r;return r=null,t=e(),r=s,t}function ee(){const e=S;if(this.sources&&(this.state||e)){const t=u;u=null,this.state===v||e?O(this):H(this),u=t}if(r){const t=this.observers?this.observers.length:0;r.sources?(r.sources.push(this),r.sourceSlots.push(t)):(r.sources=[this],r.sourceSlots=[t]),this.observers?(this.observers.push(r),this.observerSlots.push(r.sources.length-1)):(this.observers=[r],this.observerSlots=[r.sources.length-1])}return this.value}function M(e,t,s){if(e.comparator&&e.comparator(e.value,t))return t;if(b)return e.pending===E&&b.push(e),e.pending=t,t;let n=!1;return e.value=t,e.observers&&e.observers.length&&D(()=>{for(let i=0;i<e.observers.length;i+=1){const o=e.observers[i];n&&S.disposed.has(o),o.pure?u.push(o):m.push(o),o.observers&&(n&&!o.tState||!n&&!o.state)&&V(o),n||(o.state=v)}if(u.length>1e6)throw u=[],new Error},!1),t}function O(e){if(!e.fn)return;F(e);const t=g,s=r,n=L;r=g=e,te(e,e.value,n),r=s,g=t}function te(e,t,s){let n;try{n=e.fn(t)}catch(i){W(i)}(!e.updatedAt||e.updatedAt<=s)&&(e.observers&&e.observers.length?M(e,n):e.value=n,e.updatedAt=s)}function se(e,t,s,n=v,i){const o={fn:e,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:g,context:null,pure:s};return g===null||g!==Z&&(g.owned?g.owned.push(o):g.owned=[o]),o}function q(e){const t=S;if(e.state!==v)return e.state=0;if(e.suspense&&k(e.suspense.inFallback))return e.suspense.effects.push(e);const s=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<L);)(e.state||t)&&s.push(e);for(let n=s.length-1;n>=0;n--)if(e=s[n],e.state===v||t)O(e);else if(e.state===B||t){const i=u;u=null,H(e,s[0]),u=i}}function D(e,t){if(u)return e();let s=!1;t||(u=[]),m?s=!0:m=[],L++;try{return e()}catch(n){W(n)}finally{ne(s)}}function ne(e){u&&(G(u),u=null),!e&&(m.length?z(()=>{K(m),m=null}):m=null)}function G(e){for(let t=0;t<e.length;t++)q(e[t])}function H(e,t){e.state=0;const s=S;for(let n=0;n<e.sources.length;n+=1){const i=e.sources[n];i.sources&&(i.state===v||s?i!==t&&q(i):(i.state===B||s)&&H(i,t))}}function V(e){const t=S;for(let s=0;s<e.observers.length;s+=1){const n=e.observers[s];(!n.state||t)&&(n.state=B,n.pure?u.push(n):m.push(n),n.observers&&V(n))}}function F(e){let t;if(e.sources)for(;e.sources.length;){const s=e.sources.pop(),n=e.sourceSlots.pop(),i=s.observers;if(i&&i.length){const o=i.pop(),l=s.observerSlots.pop();n<i.length&&(o.sourceSlots[l]=n,i[n]=o,s.observerSlots[n]=l)}}if(e.owned){for(t=0;t<e.owned.length;t++)F(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function W(e){throw e}function j(e,t,s){let n=s.length,i=t.length,o=n,l=0,f=0,y=t[i-1].nextSibling,w=null;for(;l<i||f<o;){if(t[l]===s[f]){l++,f++;continue}for(;t[i-1]===s[o-1];)i--,o--;if(i===l){const c=o<n?f?s[f-1].nextSibling:s[o-f]:y;for(;f<o;)e.insertBefore(s[f++],c)}else if(o===f)for(;l<i;)(!w||!w.has(t[l]))&&t[l].remove(),l++;else if(t[l]===s[o-1]&&s[f]===t[i-1]){const c=t[--i].nextSibling;e.insertBefore(s[f++],t[l++].nextSibling),e.insertBefore(s[--o],c),t[i]=s[o]}else{if(!w){w=new Map;let a=f;for(;a<o;)w.set(s[a],a++)}const c=w.get(t[l]);if(c!=null)if(f<c&&c<o){let a=l,N=1,h;for(;++a<i&&a<o&&!((h=w.get(t[a]))==null||h!==c+N);)N++;if(N>c-f){const p=t[l];for(;f<c;)e.insertBefore(s[f++],p)}else e.replaceChild(s[f++],t[l++])}else l++;else t[l++].remove()}}}function ie(e,t,s){const n=document.createElement("template");n.innerHTML=e;let i=n.content.firstChild;return s&&(i=i.firstChild),i}function le(e,t,s,n){if(s!==void 0&&!n&&(n=[]),typeof t!="function")return T(e,t,n,s);C(i=>T(e,t(),i,s),n)}function T(e,t,s,n,i){for(;typeof s=="function";)s=s();if(t===s)return s;const o=typeof t,l=n!==void 0;if(e=l&&s[0]&&s[0].parentNode||e,o==="string"||o==="number")if(o==="number"&&(t=t.toString()),l){let f=s[0];f&&f.nodeType===3?f.data=t:f=document.createTextNode(t),s=x(e,s,n,f)}else s!==""&&typeof s=="string"?s=e.firstChild.data=t:s=e.textContent=t;else if(t==null||o==="boolean")s=x(e,s,n);else{if(o==="function")return C(()=>{let f=t();for(;typeof f=="function";)f=f();s=T(e,f,s,n)}),()=>s;if(Array.isArray(t)){const f=[];if(R(f,t,i))return C(()=>s=T(e,f,s,n,!0)),()=>s;if(f.length===0){if(s=x(e,s,n),l)return s}else Array.isArray(s)?s.length===0?Q(e,f,n):j(e,s,f):s==null||s===""?Q(e,f):j(e,l&&s||[e.firstChild],f);s=f}else if(t instanceof Node){if(Array.isArray(s)){if(l)return s=x(e,s,n,t);x(e,s,null,t)}else s==null||s===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);s=t}}return s}function R(e,t,s){let n=!1;for(let i=0,o=t.length;i<o;i++){let l=t[i],f;if(l instanceof Node)e.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))n=R(e,l)||n;else if((f=typeof l)==="string")e.push(document.createTextNode(l));else if(f==="function")if(s){for(;typeof l=="function";)l=l();n=R(e,Array.isArray(l)?l:[l])||n}else e.push(l),n=!0;else e.push(document.createTextNode(l.toString()))}return n}function Q(e,t,s){for(let n=0,i=t.length;n<i;n++)e.insertBefore(t[n],s)}function x(e,t,s,n){if(s===void 0)return e.textContent="";const i=n||document.createTextNode("");if(t.length){let o=!1;for(let l=t.length-1;l>=0;l--){const f=t[l];if(i!==f){const y=f.parentNode===e;!o&&!l?y?e.replaceChild(i,f):e.insertBefore(i,s):y&&f.remove()}else o=!0}}else e.insertBefore(i,s);return[i]}var X={"view-area":"_view-area_1iyu1_1","virtual-inner":"_virtual-inner_1iyu1_5"};const oe=ie("<div><div><div></div></div></div>"),fe=({rowRenderer:e})=>{const t=50,s=12e3,n=400,i=10,o=t*s-n,l=new Array(i).fill(0).map((h,p)=>h+p),[f,y]=U(0),[w,c]=U(0);let a;const N=h=>{const{scrollTop:p=0}=a??{};if(o<=p){c(s-i),y(o);return}const A=Math.floor(p/t),_=p%t;c(A),y(p-_)};return(()=>{const h=oe.cloneNode(!0),p=h.firstChild,A=p.firstChild;h.addEventListener("scroll",N);const _=a;return typeof _=="function"?_(h):a=h,h.style.setProperty("height","400px"),p.style.setProperty("height","600000px"),le(A,()=>l.map(d=>{const I=d+w();return e({index:I,domIndex:d})})),C(d=>{const I=X["view-area"],Y=X["virtual-inner"],J=`translateY(${f()}px)`;return I!==d._v$&&(h.className=d._v$=I),Y!==d._v$2&&(A.className=d._v$2=Y),J!==d._v$3&&A.style.setProperty("transform",d._v$3=J),d},{_v$:void 0,_v$2:void 0,_v$3:void 0}),h})()};class re extends HTMLElement{constructor(){super();const t=fe({rowRenderer:({index:s})=>{const o=document.getElementById("virtual-item").content.cloneNode(!0).querySelector(".item");return o.innerHTML=s,o}});this.appendChild(t)}}window.customElements.define("virtual-list",re)});