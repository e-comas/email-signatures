function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n||null)}function s(t){t.parentNode.removeChild(t)}function c(t){return document.createElement(t)}function u(t){return document.createTextNode(t)}function d(){return u(" ")}function f(){return u("")}function m(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function p(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function h(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function g(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}let b;function w(t){b=t}function y(){if(!b)throw new Error("Function called outside component initialization");return b}const v=[],x=[],$=[],k=[],_=Promise.resolve();let A=!1;function I(t){$.push(t)}let C=!1;const z=new Set;function H(){if(!C){C=!0;do{for(let t=0;t<v.length;t+=1){const e=v[t];w(e),L(e.$$)}for(w(null),v.length=0;x.length;)x.pop()();for(let t=0;t<$.length;t+=1){const e=$[t];z.has(e)||(z.add(e),e())}$.length=0}while(v.length);for(;k.length;)k.pop()();A=!1,C=!1,z.clear()}}function L(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(I)}}const T=new Set;let j,E;function P(){j={r:0,c:[],p:j}}function U(){j.r||o(j.c),j=j.p}function O(t,e){t&&t.i&&(T.delete(t),t.i(e))}function S(t,e,n,o){if(t&&t.o){if(T.has(t))return;T.add(t),j.c.push((()=>{T.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function N(t,e){const n=e.token={};function o(t,o,r,i){if(e.token!==n)return;e.resolved=i;let l=e.ctx;void 0!==r&&(l=l.slice(),l[r]=i);const a=t&&(e.current=t)(l);let s=!1;e.block&&(e.blocks?e.blocks.forEach(((t,n)=>{n!==o&&t&&(P(),S(t,1,1,(()=>{e.blocks[n]===t&&(e.blocks[n]=null)})),U())})):e.block.d(1),a.c(),O(a,1),a.m(e.mount(),e.anchor),s=!0),e.block=a,e.blocks&&(e.blocks[o]=a),s&&H()}if((r=t)&&"object"==typeof r&&"function"==typeof r.then){const n=y();if(t.then((t=>{w(n),o(e.then,1,e.value,t),w(null)}),(t=>{if(w(n),o(e.catch,2,e.error,t),w(null),!e.hasCatch)throw t})),e.current!==e.pending)return o(e.pending,0),!0}else{if(e.current!==e.then)return o(e.then,1,e.value,t),!0;e.resolved=t}var r}function q(t,e,n){const o=e.slice(),{resolved:r}=t;t.current===t.then&&(o[t.value]=r),t.current===t.catch&&(o[t.error]=r),t.block.p(o,n)}function M(t){t&&t.c()}function R(t,n,i,l){const{fragment:a,on_mount:s,on_destroy:c,after_update:u}=t.$$;a&&a.m(n,i),l||I((()=>{const n=s.map(e).filter(r);c?c.push(...n):o(n),t.$$.on_mount=[]})),u.forEach(I)}function D(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function W(t,e){-1===t.$$.dirty[0]&&(v.push(t),A||(A=!0,_.then(H)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function B(e,r,i,l,a,c,u=[-1]){const d=b;w(e);const f=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:r.context||[]),callbacks:n(),dirty:u,skip_bound:!1};let m=!1;if(f.ctx=i?i(e,r.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return f.ctx&&a(f.ctx[t],f.ctx[t]=r)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](r),m&&W(e,t)),n})):[],f.update(),m=!0,o(f.before_update),f.fragment=!!l&&l(f.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);f.fragment&&f.fragment.l(t),t.forEach(s)}else f.fragment&&f.fragment.c();r.intro&&O(e.$$.fragment),R(e,r.target,r.anchor,r.customElement),H()}w(d)}class F{$destroy(){D(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}let J=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});J.decode();let V=null;function Y(){return null!==V&&V.buffer===E.memory.buffer||(V=new Uint8Array(E.memory.buffer)),V}function G(t,e){return J.decode(Y().subarray(t,t+e))}const Q=new Array(32).fill(void 0);Q.push(void 0,null,!0,!1);let K=Q.length;function X(t){K===Q.length&&Q.push(Q.length+1);const e=K;return K=Q[e],Q[e]=t,e}function Z(t){return Q[t]}let tt=0,et=new TextEncoder("utf-8");const nt="function"==typeof et.encodeInto?function(t,e){return et.encodeInto(t,e)}:function(t,e){const n=et.encode(t);return e.set(n),{read:t.length,written:n.length}};function ot(t,e,n){if(ArrayBuffer.isView(t)){const n=t.byteLength,o=e(n);return Y().set(t,o),tt=n,o}if(void 0===n){const n=et.encode(t),o=e(n.length);return Y().subarray(o,o+n.length).set(n),tt=n.length,o}let o=t.length,r=e(o);const i=Y();let l=0;for(;l<o;l++){const e=t.charCodeAt(l);if(e>127)break;i[r+l]=e}if(l!==o){0!==l&&(t=t.slice(l)),r=n(r,o,o=l+3*t.length);const e=Y().subarray(r+l,r+o);l+=nt(t,e).written}return tt=l,r}let rt=null;function it(){return null!==rt&&rt.buffer===E.memory.buffer||(rt=new Int32Array(E.memory.buffer)),rt}function lt(t){const e=Z(t);return function(t){t<36||(Q[t]=K,K=t)}(t),e}function at(t){var e=ot(t,E.__wbindgen_malloc,E.__wbindgen_realloc),n=tt;return lt(E.parse(e,n))}let st=32;function ct(t){try{const o=E.__wbindgen_export_2.value-16;E.__wbindgen_export_2.value=o,E.stringify(o,function(t){if(1==st)throw new Error("out of js stack");return Q[--st]=t,st}(t));var e=it()[o/4+0],n=it()[o/4+1];return G(e,n)}finally{E.__wbindgen_export_2.value+=16,Q[st++]=void 0,E.__wbindgen_free(e,n)}}async function ut(t){void 0===t&&(t=import.meta.url.replace(/\.js$/,"_bg.wasm"));const e={wbg:{}};e.wbg.__wbindgen_json_parse=function(t,e){return X(JSON.parse(G(t,e)))},e.wbg.__wbindgen_json_serialize=function(t,e){const n=Z(e);var o=ot(JSON.stringify(void 0===n?null:n),E.__wbindgen_malloc,E.__wbindgen_realloc),r=tt;it()[t/4+1]=r,it()[t/4+0]=o},e.wbg.__wbindgen_string_new=function(t,e){return X(G(t,e))},e.wbg.__wbindgen_rethrow=function(t){throw lt(t)},("string"==typeof t||"function"==typeof Request&&t instanceof Request||"function"==typeof URL&&t instanceof URL)&&(t=fetch(t));const{instance:n,module:o}=await async function(t,e){if("function"==typeof Response&&t instanceof Response){if("function"==typeof WebAssembly.instantiateStreaming)try{return await WebAssembly.instantiateStreaming(t,e)}catch(e){if("application/wasm"==t.headers.get("Content-Type"))throw e;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",e)}const n=await t.arrayBuffer();return await WebAssembly.instantiate(n,e)}{const n=await WebAssembly.instantiate(t,e);return n instanceof WebAssembly.Instance?{instance:n,module:t}:n}}(await t,e);return E=n.exports,ut.__wbindgen_wasm_module=o,E}function dt(t){let e,n,o,r;return{c(){e=c("label"),n=u(t[2]),o=d(),r=c("input"),p(r,"name",t[0]),r.value=t[6],p(r,"type",t[4]),p(r,"autocomplete",t[1]),p(r,"placeholder",t[3]),r.required=t[5]},m(i,s){a(i,e,s),l(e,n),l(e,o),l(e,r),t[9](r)},p(t,e){4&e&&h(n,t[2]),1&e&&p(r,"name",t[0]),64&e&&r.value!==t[6]&&(r.value=t[6]),16&e&&p(r,"type",t[4]),2&e&&p(r,"autocomplete",t[1]),8&e&&p(r,"placeholder",t[3]),32&e&&(r.required=t[5])},d(n){n&&s(e),t[9](null)}}}function ft(t){let e;return{c(){e=c("input"),p(e,"type",t[4]),p(e,"name",t[0]),e.value=t[6]},m(t,n){a(t,e,n)},p(t,n){16&n&&p(e,"type",t[4]),1&n&&p(e,"name",t[0]),64&n&&e.value!==t[6]&&(e.value=t[6])},d(t){t&&s(e)}}}function mt(e){let n;function o(t,e){return"hidden"===t[4]?ft:dt}let r=o(e),i=r(e);return{c(){i.c(),n=f()},m(t,e){i.m(t,e),a(t,n,e)},p(t,[e]){r===(r=o(t))&&i?i.p(t,e):(i.d(1),i=r(t),i&&(i.c(),i.m(n.parentNode,n)))},i:t,o:t,d(t){i.d(t),t&&s(n)}}}function pt(t,e,n){let o,{name:r}=e,{autocomplete:i="auto"}=e,{autofocus:l=!1}=e,{label:a=r}=e,{placeholder:s}=e,{type:c="text"}=e,{required:u=!1}=e,{value:d=""}=e;var f;return l&&(f=()=>o.focus(),y().$$.on_mount.push(f)),t.$$set=t=>{"name"in t&&n(0,r=t.name),"autocomplete"in t&&n(1,i=t.autocomplete),"autofocus"in t&&n(8,l=t.autofocus),"label"in t&&n(2,a=t.label),"placeholder"in t&&n(3,s=t.placeholder),"type"in t&&n(4,c=t.type),"required"in t&&n(5,u=t.required),"value"in t&&n(6,d=t.value)},[r,i,a,s,c,u,d,o,l,function(t){x[t?"unshift":"push"]((()=>{o=t,n(7,o)}))}]}class ht extends F{constructor(t){super(),B(this,t,pt,mt,i,{name:0,autocomplete:1,autofocus:8,label:2,placeholder:3,type:4,required:5,value:6})}}function gt(t){let e,n,o,i,u,f,h,g,b,w,y,v,x,$,k,_,A,I;return u=new ht({props:{name:"Name",value:t[1],required:!0,autocomplete:"name"}}),h=new ht({props:{name:"Title",value:t[2],autocomplete:"organization-title",autofocus:!0,required:!0}}),b=new ht({props:{name:"Phone",value:t[3],type:"phone",placeholder:"International phone number (optional)"}}),y=new ht({props:{name:"pictureUrl",value:t[4],type:"hidden"}}),x=new ht({props:{name:"LinkedIn",value:t[5],type:"url",placeholder:"Public URL to your LinkedIn profile (optional)"}}),{c(){e=c("form"),n=c("fieldset"),o=c("legend"),o.textContent="Personal information",i=d(),M(u.$$.fragment),f=d(),M(h.$$.fragment),g=d(),M(b.$$.fragment),w=d(),M(y.$$.fragment),v=d(),M(x.$$.fragment),$=d(),k=c("button"),k.textContent="Save my information",p(k,"type","submit")},m(s,c){a(s,e,c),l(e,n),l(n,o),l(n,i),R(u,n,null),l(n,f),R(h,n,null),l(n,g),R(b,n,null),l(n,w),R(y,n,null),l(n,v),R(x,n,null),l(n,$),l(n,k),_=!0,A||(I=m(e,"submit",(function(){r(t[0])&&t[0].apply(this,arguments)})),A=!0)},p(e,[n]){t=e},i(t){_||(O(u.$$.fragment,t),O(h.$$.fragment,t),O(b.$$.fragment,t),O(y.$$.fragment,t),O(x.$$.fragment,t),_=!0)},o(t){S(u.$$.fragment,t),S(h.$$.fragment,t),S(b.$$.fragment,t),S(y.$$.fragment,t),S(x.$$.fragment,t),_=!1},d(t){t&&s(e),D(u),D(h),D(b),D(y),D(x),A=!1,I()}}}function bt(t,e,n){let{user:o}=e,{onsubmit:r}=e;const{Name:i,Title:l,Phone:a,pictureUrl:s,LinkedIn:c}=o;return t.$$set=t=>{"user"in t&&n(6,o=t.user),"onsubmit"in t&&n(0,r=t.onsubmit)},[r,i,l,a,s,c,o]}class wt extends F{constructor(t){super(),B(this,t,bt,gt,i,{user:6,onsubmit:0})}}var yt=[376,971,93,355,374,244,54,43,61,297,994,387,880,32,226,359,973,257,229,673,591,55,975,267,375,501,243,236,242,41,225,682,56,237,86,57,506,53,238,599,357,420,49,253,45,213,593,372,20,291,34,251,358,679,691,298,33,241,44,995,594,233,350,299,220,224,590,240,30,502,245,592,852,504,385,509,36,62,353,972,91,246,964,98,354,39,962,81,254,996,855,269,850,82,965,856,961,423,94,231,266,370,352,371,218,212,377,373,382,261,692,389,223,95,976,853,596,222,356,230,960,265,52,60,258,264,687,227,672,234,505,31,47,977,674,683,64,968,507,51,689,675,63,92,48,508,970,351,680,595,974,262,40,381,7,250,966,677,248,249,46,65,386,421,232,378,221,252,597,211,239,503,963,268,235,228,66,992,670,993,216,676,90,688,886,255,380,256,1,598,998,58,84,678,681,685,383,967,27,260,263,800,808,870,878,881,882,883,888,979];const vt=new URL("./data/",import.meta.url);var xt=t=>fetch(new URL(`./${t}.json`,vt)).then((t=>t.ok?t.json():Promise.reject(new Error(t.statusText))));async function $t(t){const[e,n,o]=await async function(t){const e="+"===t[0]?1:0;for(let n=e;n<t.length;n++){const o=Number(t.slice(e,n));if(yt.includes(o))return[o,t.slice(n),await xt(o)]}return Promise.reject(new Error("Unable to find valid country code"))}(t);let r;for(const{leadingDigits:t,pattern:e,format:i}of o)if(new RegExp(`^(${t})`).test(n)){const t=new RegExp(`${e}$`);if(t.test(n)){r=n.replace(t,i);break}}return`+${e} ${r||n}`}function kt(t){t[13]=t[15][0],t[14]=t[15][1]}function _t(t,e,n){const o=t.slice();return o[16]=e[n],o}function At(e){let n,o,r=e[19]+"";return{c(){n=c("p"),o=u(r),g(n,"color","red")},m(t,e){a(t,n,e),l(n,o)},p:t,d(t){t&&s(n)}}}function It(e){let n,o,r,i,f,m,b,w,y,v,x,$,k,_,A,I,C,z,H,L,T,j,E,P,U,O,S,N,q,M,R,D,W,B,F,J,V,Y,G,Q,K,X,Z,tt,et,nt,ot,rt,it,lt,at,st,ct,ut,dt,ft,mt,pt,ht,gt,bt,wt,yt,vt,xt,$t,At,It,zt,Ht,Pt,Ut,Ot,St;kt(e);let Nt=e[5]&&function(e){let n,o,r,i;return{c(){n=c("a"),o=c("img"),i=u("\n                    |"),o.src!==(r="https://www.e-comas.com/docs/signatures/ressources/linkedin-alt.png")&&p(o,"src",r),p(o,"alt","LinkedIn account"),p(o,"width","25"),p(o,"height","25"),g(o,"-ms-interpolation-mode","bicubic"),g(o,"max-width","100%"),g(o,"height","auto"),g(o,"border","none"),g(o,"vertical-align","middle"),p(n,"href",e[5]),g(n,"color","#4d4d4d")},m(t,e){a(t,n,e),l(n,o),a(t,i,e)},p:t,d(t){t&&s(n),t&&s(i)}}}(e),qt=e[3]&&function(e){let n,o,r,i=e[13]+"";return{c(){n=c("a"),o=u(i),r=u(" |"),p(n,"href",e[6]),g(n,"color","#4d4d4d")},m(t,e){a(t,n,e),l(n,o),a(t,r,e)},p:t,d(t){t&&s(n),t&&s(r)}}}(e),Mt=0!==e[10].length&&function(t){let e;return{c(){e=c("colgroup"),e.innerHTML='<col width="0"/>'},m(t,n){a(t,e,n)},d(t){t&&s(e)}}}(),Rt=e[10],Dt=[];for(let t=0;t<Rt.length;t+=1)Dt[t]=Ct(_t(e,Rt,t));return{c(){n=c("table"),o=c("tbody"),r=c("tr"),i=c("td"),f=c("img"),b=d(),w=c("td"),y=c("table"),v=c("tbody"),x=c("tr"),$=c("th"),$.textContent=`${e[1]}`,k=d(),_=c("tr"),A=c("td"),A.textContent=`${e[2]}`,I=d(),C=c("tr"),C.innerHTML='<td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: top;"> </td>',z=d(),H=c("tr"),L=c("td"),Nt&&Nt.c(),T=d(),qt&&qt.c(),j=d(),E=c("a"),P=u(e[0]),U=d(),O=c("tr"),O.innerHTML='<td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: top;"> </td>',S=d(),N=c("tr"),N.innerHTML='<td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: top;"><address style="font-size: 16px; color: #4d4d4d; letter-spacing: 0; line-height: 20px; font-style: normal;">e-Comas Sarl, 68 Avenue de la Liberté,<br/>1930\n                      Luxembourg</address></td>',q=d(),M=c("tr"),M.innerHTML='<td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: top;"> </td>',R=d(),D=c("tr"),D.innerHTML='<td class="cta" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: top;">Download the e-Comas whitepaper:\n                    <a href="https://www.e-comas.com/white-paper-form.html" style="font-weight: bold; font-size: 16px; color: #64d7be; letter-spacing: 0; line-height: 24px;">How to manage Amazon</a>.</td>',W=d(),B=c("td"),B.textContent=" ",F=d(),J=c("td"),V=c("table"),Y=c("colgroup"),G=c("col"),Q=d(),K=c("col"),X=d(),Z=c("col"),tt=d(),et=c("tbody"),nt=c("tr"),ot=c("td"),rt=c("img"),lt=d(),at=c("tr"),st=c("td"),ct=c("img"),dt=d(),ft=c("td"),mt=c("table"),Mt&&Mt.c(),pt=d(),ht=c("tbody"),gt=c("tr"),bt=c("td"),wt=c("a"),yt=c("img"),xt=d(),$t=c("tr"),$t.innerHTML='<td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: top;"> </td>',At=d(),It=c("tr");for(let t=0;t<Dt.length;t+=1)Dt[t].c();zt=d(),Ht=c("td"),Ht.textContent=" ",Pt=d(),Ut=c("tr"),Ut.innerHTML='<td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: top;"> </td> \n                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; vertical-align: top;"> </td>',Ot=d(),St=c("style"),St.textContent="#signature { text-align: initial; }",p(f,"alt",e[1]+"'s picture"),p(f,"width",e[14]),p(f,"height",Lt),f.src!==(m=e[4])&&p(f,"src",m),g(f,"-ms-interpolation-mode","bicubic"),g(f,"max-width","100%"),g(f,"height","auto"),g(f,"border","none"),g(i,"font-family","Arial, Helvetica, sans-serif"),g(i,"font-size","14px"),g(i,"vertical-align","middle"),g(i,"padding","20px"),p($,"class","name"),g($,"font-size","30px"),g($,"color","#64d7be"),g($,"letter-spacing","0"),g($,"text-align","left"),p(A,"class","title"),g(A,"font-family","Arial, Helvetica, sans-serif"),g(A,"vertical-align","top"),g(A,"font-size","16px"),g(A,"color","#4d4d4d"),g(A,"letter-spacing","0"),g(A,"line-height","24px"),p(E,"href",e[7]),g(E,"color","#4d4d4d"),p(L,"class","socials"),g(L,"font-family","Arial, Helvetica, sans-serif"),g(L,"vertical-align","top"),g(L,"line-height","25px"),g(L,"font-size","16px"),g(L,"letter-spacing","0"),p(y,"cellpadding","0"),p(y,"cellspacing","0"),g(y,"mso-table-lspace","0pt"),g(y,"mso-table-rspace","0pt"),g(y,"border-collapse","separate"),g(w,"font-family","Arial, Helvetica, sans-serif"),g(w,"font-size","14px"),g(w,"vertical-align","middle"),g(B,"font-family","Arial, Helvetica, sans-serif"),g(B,"font-size","14px"),g(B,"vertical-align","middle"),g(B,"padding","10px"),p(G,"width",Et),p(K,"width",e[9].width),p(Z,"width",jt-e[9].width-Et),p(rt,"alt",""),rt.src!==(it="https://www.e-comas.com/docs/signatures/ressources/top-right.png")&&p(rt,"src","https://www.e-comas.com/docs/signatures/ressources/top-right.png"),p(rt,"width",jt),p(rt,"height","120"),g(rt,"-ms-interpolation-mode","bicubic"),g(rt,"max-width","100%"),g(rt,"height","auto"),g(rt,"border","none"),g(rt,"display","block"),p(ot,"colspan","3"),g(ot,"font-family","Arial, Helvetica, sans-serif"),g(ot,"font-size","14px"),g(ot,"vertical-align","top"),p(ct,"alt",""),ct.src!==(ut="https://www.e-comas.com/docs/signatures/ressources/bottom-left.png")&&p(ct,"src","https://www.e-comas.com/docs/signatures/ressources/bottom-left.png"),p(ct,"width",Et),p(ct,"height","156"),g(ct,"-ms-interpolation-mode","bicubic"),g(ct,"max-width","100%"),g(ct,"height","auto"),g(ct,"border","none"),g(ct,"display","block"),p(st,"rowspan","2"),g(st,"font-family","Arial, Helvetica, sans-serif"),g(st,"font-size","14px"),g(st,"vertical-align","top"),p(yt,"alt",e[9].alt),p(yt,"width",e[9].width),p(yt,"height",e[9].height),yt.src!==(vt=e[9].src)&&p(yt,"src",vt),g(yt,"-ms-interpolation-mode","bicubic"),g(yt,"max-width","100%"),g(yt,"height","auto"),g(yt,"border","none"),g(yt,"display","block"),p(wt,"href",Tt),p(bt,"colspan",2*e[10].length||1),g(bt,"font-family","Arial, Helvetica, sans-serif"),g(bt,"font-size","14px"),g(bt,"vertical-align","top"),p(mt,"cellpadding","0"),p(mt,"cellspacing","0"),g(mt,"mso-table-lspace","0pt"),g(mt,"mso-table-rspace","0pt"),g(mt,"border-collapse","separate"),g(ft,"font-family","Arial, Helvetica, sans-serif"),g(ft,"font-size","14px"),g(ft,"vertical-align","top"),g(Ht,"font-family","Arial, Helvetica, sans-serif"),g(Ht,"font-size","14px"),g(Ht,"vertical-align","top"),p(V,"cellpadding","0"),p(V,"cellspacing","0"),p(V,"class","company-info"),g(V,"mso-table-lspace","0pt"),g(V,"mso-table-rspace","0pt"),g(V,"background-color","#70dbc2"),g(V,"color","white"),g(V,"border-collapse","separate"),g(J,"font-family","Arial, Helvetica, sans-serif"),g(J,"font-size","14px"),g(J,"vertical-align","middle"),p(n,"id","signature"),p(n,"cellpadding","0"),p(n,"cellspacing","0"),g(n,"mso-table-lspace","0pt"),g(n,"mso-table-rspace","0pt"),g(n,"padding","0"),g(n,"font-family","Arial, Helvetica, sans-serif"),g(n,"-webkit-font-smoothing","antialiased"),g(n,"font-size","14px"),g(n,"-ms-text-size-adjust","100%"),g(n,"-webkit-text-size-adjust","100%"),g(n,"border-collapse","separate")},m(t,e){a(t,n,e),l(n,o),l(o,r),l(r,i),l(i,f),l(r,b),l(r,w),l(w,y),l(y,v),l(v,x),l(x,$),l(v,k),l(v,_),l(_,A),l(v,I),l(v,C),l(v,z),l(v,H),l(H,L),Nt&&Nt.m(L,null),l(L,T),qt&&qt.m(L,null),l(L,j),l(L,E),l(E,P),l(v,U),l(v,O),l(v,S),l(v,N),l(v,q),l(v,M),l(v,R),l(v,D),l(r,W),l(r,B),l(r,F),l(r,J),l(J,V),l(V,Y),l(Y,G),l(Y,Q),l(Y,K),l(Y,X),l(Y,Z),l(V,tt),l(V,et),l(et,nt),l(nt,ot),l(ot,rt),l(et,lt),l(et,at),l(at,st),l(st,ct),l(at,dt),l(at,ft),l(ft,mt),Mt&&Mt.m(mt,null),l(mt,pt),l(mt,ht),l(ht,gt),l(gt,bt),l(bt,wt),l(wt,yt),l(ht,xt),l(ht,$t),l(ht,At),l(ht,It);for(let t=0;t<Dt.length;t+=1)Dt[t].m(It,null);l(at,zt),l(at,Ht),l(et,Pt),l(et,Ut),a(t,Ot,e),a(t,St,e)},p(t,e){if(kt(t),t[5]&&Nt.p(t,e),t[3]&&qt.p(t,e),1&e&&h(P,t[0]),1024&e){let n;for(Rt=t[10],n=0;n<Rt.length;n+=1){const o=_t(t,Rt,n);Dt[n]?Dt[n].p(o,e):(Dt[n]=Ct(o),Dt[n].c(),Dt[n].m(It,null))}for(;n<Dt.length;n+=1)Dt[n].d(1);Dt.length=Rt.length}},d(t){t&&s(n),Nt&&Nt.d(),qt&&qt.d(),Mt&&Mt.d(),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(Dt,t),t&&s(Ot),t&&s(St)}}}function Ct(e){let n,o,r,i,u,f,m;return{c(){n=c("td"),n.textContent=" ",o=d(),r=c("td"),i=c("a"),u=c("img"),m=d(),g(n,"font-family","Arial, Helvetica, sans-serif"),g(n,"font-size","14px"),g(n,"vertical-align","top"),u.src!==(f=e[16].src)&&p(u,"src",f),p(u,"alt",e[16].alt),p(u,"width","25"),p(u,"height","25"),g(u,"-ms-interpolation-mode","bicubic"),g(u,"max-width","100%"),g(u,"height","auto"),g(u,"border","none"),g(u,"display","block"),p(i,"href",e[16].href),p(r,"width","25"),g(r,"font-family","Arial, Helvetica, sans-serif"),g(r,"font-size","14px"),g(r,"vertical-align","top")},m(t,e){a(t,n,e),a(t,o,e),a(t,r,e),l(r,i),l(i,u),l(r,m)},p:t,d(t){t&&s(n),t&&s(o),t&&s(r)}}}function zt(e){let n;return{c(){n=c("p"),n.textContent="...loading"},m(t,e){a(t,n,e)},p:t,d(t){t&&s(n)}}}function Ht(e){let n,o={ctx:e,current:null,token:null,hasCatch:!0,pending:zt,then:It,catch:At,value:15,error:19};return N(e[8],o),{c(){n=f(),o.block.c()},m(t,e){a(t,n,e),o.block.m(t,o.anchor=e),o.mount=()=>n.parentNode,o.anchor=n},p(t,[n]){q(o,e=t,n)},i:t,o:t,d(t){t&&s(n),o.block.d(t),o.token=null,o=null}}}const Lt=145,Tt="https://e-comas.com",jt=321,Et=124;function Pt(t,e,n){let{user:o}=e,{emailAddress:r}=e;const{Name:i,Title:l,Phone:a,pictureUrl:s,LinkedIn:c}=o,u="tel:"+a,d="mailto:"+r,f=Promise.all([a?$t(a):Promise.resolve(),(t=>{const e=new Image;return e.src=t,e.decode().then((()=>e))})(s).then((t=>t.naturalWidth*(Lt/t.naturalHeight)),(t=>(console.error(t),Lt)))]);return t.$$set=t=>{"user"in t&&n(11,o=t.user),"emailAddress"in t&&n(0,r=t.emailAddress)},[r,i,l,a,s,c,u,d,f,{alt:"e-Comas, eCommerce made simple",src:"https://www.e-comas.com/docs/signatures/ressources/logo.png",width:165,height:40},[{src:"https://www.e-comas.com/docs/signatures/ressources/linkedin.png",alt:"LinkedIn",href:"https://www.linkedin.com/company/e-comas/"},{src:"https://www.e-comas.com/docs/signatures/ressources/youtube.png",alt:"YouTube",href:"https://www.youtube.com/channel/UClCYdUcUs1zJk8O3a4lC9lw"},{src:"https://www.e-comas.com/docs/signatures/ressources/facebook.png",alt:"Facebook",href:"https://www.facebook.com/ecommerce.made.simple/"},{src:"https://www.e-comas.com/docs/signatures/ressources/instagram.png",alt:"Instagram",href:"https://www.instagram.com/e.comas.amazon.made.simple/"}],o]}class Ut extends F{constructor(t){super(),B(this,t,Pt,Ht,i,{user:11,emailAddress:0})}}function Ot(e){let n,r,i,l,u;return{c(){n=c("button"),n.textContent="Copy signature",r=d(),i=c("button"),i.textContent="Copy HTML code"},m(t,o){a(t,n,o),a(t,r,o),a(t,i,o),l||(u=[m(n,"click",e[0]),m(i,"click",e[1])],l=!0)},p:t,i:t,o:t,d(t){t&&s(n),t&&s(r),t&&s(i),l=!1,o(u)}}}function St(t){const e=()=>document.getElementById("signature").outerHTML;return[function(t){t.preventDefault(),navigator.clipboard.write([new ClipboardItem({"text/html":new Blob([e()],{type:"text/html"})})])},function(t){t.preventDefault(),navigator.clipboard.writeText(e())}]}class Nt extends F{constructor(t){super(),B(this,t,St,Ot,i,{})}}var qt={CLIENT_ID:"574901819149-d46caor3hasi3bsngfua2q20idump433.apps.googleusercontent.com",API_KEY:"AIzaSyDIzIuLKqaQhWXSykVOWOQLqlLggFTDOh8",documentId:"1fGE2MU0CrxxRaC-YrvPzk-3aqOsqfcIVQPOeFmkmMTI"};function Mt(t){t[10]=t[12][0],t[11]=t[12][1]}function Rt(e){let n,o,r=(e[13]?e[13].message||(e[13].result?`${e[13].result.error.code} ${e[13].result.error.status}: ${e[13].result.error.message}`:e[13]):"Unknown error")+"";return{c(){n=c("p"),o=u(r),g(n,"color","red")},m(t,e){a(t,n,e),l(n,o)},p(t,e){1&e&&r!==(r=(t[13]?t[13].message||(t[13].result?`${t[13].result.error.code} ${t[13].result.error.status}: ${t[13].result.error.message}`:t[13]):"Unknown error")+"")&&h(o,r)},i:t,o:t,d(t){t&&s(n)}}}function Dt(t){let e,n,o,r;Mt(t),e=new wt({props:{user:t[10],onsubmit:t[1]}});let i=!t[10].newUser&&Wt(t);return{c(){M(e.$$.fragment),n=d(),i&&i.c(),o=f()},m(t,l){R(e,t,l),a(t,n,l),i&&i.m(t,l),a(t,o,l),r=!0},p(t,n){Mt(t);const r={};1&n&&(r.user=t[10]),e.$set(r),t[10].newUser?i&&(P(),S(i,1,1,(()=>{i=null})),U()):i?(i.p(t,n),1&n&&O(i,1)):(i=Wt(t),i.c(),O(i,1),i.m(o.parentNode,o))},i(t){r||(O(e.$$.fragment,t),O(i),r=!0)},o(t){S(e.$$.fragment,t),S(i),r=!1},d(t){D(e,t),t&&s(n),i&&i.d(t),t&&s(o)}}}function Wt(t){let e,n,o,r,i,l,u,f;return o=new Ut({props:{user:t[10],emailAddress:t[11]}}),u=new Nt({}),{c(){e=c("hr"),n=d(),M(o.$$.fragment),r=d(),i=c("hr"),l=d(),M(u.$$.fragment)},m(t,s){a(t,e,s),a(t,n,s),R(o,t,s),a(t,r,s),a(t,i,s),a(t,l,s),R(u,t,s),f=!0},p(t,e){const n={};1&e&&(n.user=t[10]),1&e&&(n.emailAddress=t[11]),o.$set(n)},i(t){f||(O(o.$$.fragment,t),O(u.$$.fragment,t),f=!0)},o(t){S(o.$$.fragment,t),S(u.$$.fragment,t),f=!1},d(t){t&&s(e),t&&s(n),D(o,t),t&&s(r),t&&s(i),t&&s(l),D(u,t)}}}function Bt(e){let n;return{c(){n=c("p"),n.textContent="...loading"},m(t,e){a(t,n,e)},p:t,i:t,o:t,d(t){t&&s(n)}}}function Ft(t){let e,n,o,r={ctx:t,current:null,token:null,hasCatch:!0,pending:Bt,then:Dt,catch:Rt,value:12,error:13,blocks:[,,,]};return N(n=t[0],r),{c(){e=f(),r.block.c()},m(t,n){a(t,e,n),r.block.m(t,r.anchor=n),r.mount=()=>e.parentNode,r.anchor=e,o=!0},p(e,[o]){t=e,r.ctx=t,1&o&&n!==(n=t[0])&&N(n,r)||q(r,t,o)},i(t){o||(O(r.block),o=!0)},o(t){for(let t=0;t<3;t+=1){S(r.blocks[t])}o=!1},d(t){t&&s(e),r.block.d(t),r.token=null,r=null}}}function Jt(t){if(t&&"object"==typeof t)return t.content?t.content:Object.values(t).map(Jt).join("")}function Vt(t,e,n){var o=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(r,i){function l(t){try{s(o.next(t))}catch(t){i(t)}}function a(t){try{s(o.throw(t))}catch(t){i(t)}}function s(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(l,a)}s((o=o.apply(t,e||[])).next())}))};const{documentId:r}=qt;function*i(t,e){yield"",yield"";const n=[];yield ct({[t]:Object.fromEntries(Object.entries(e).filter((([t,e])=>!!e&&(!("object"==typeof e&&!Array.isArray(e))||(n.push(function*(t,e){for(const[n,o]of Object.entries(e))o&&(yield`${t}.${ct({[n]:o})}`)}(t,e)),!1)))))}).trimEnd();for(const t of n)yield*t}const l=(t,e)=>Object.entries(e).some((([e,n])=>{var o;return"object"==typeof n?l(null!==(o=t[e])&&void 0!==o?o:{},n):t[e]!==n})),a=(t,e)=>{var n;if(e.includes(".")){const[o,r]=e.split(".",2);return null===(n=t[o])||void 0===n?void 0:n[r]}return t[e]},s=(t,e,n="")=>Object.entries(t).flatMap((([t,o])=>{var r;return o&&o!==e[t]?"string"==typeof o||Array.isArray(o)?{entry:[`${n}${t}`,o]}:s(o,null!==(r=e[t])&&void 0!==r?r:e[t]={},`${t}.`):[]}));function c(t){return at(t.result.body.content.map(Jt).join("\n"))}let u=Promise.all([ut("build/5bb3b01f8af02723.wasm"),gapi.client.docs.documents.get({documentId:r}),location.hash.includes("@")?Promise.resolve({result:{email:location.hash.slice(1)}}):gapi.client.request({method:"GET",path:"/userinfo/v2/me"})]).then((([t,e,n])=>{var o;return[null!==(o=c(e)[n.result.email])&&void 0!==o?o:{Name:n.result.name,newUser:!0},n.result.email]}));return u.catch(console.error),window.addEventListener("hashchange",(()=>{if(location.hash.includes("@")){const t=location.hash.slice(1);n(0,u=gapi.client.docs.documents.get({documentId:r}).then((e=>{var n;return[null!==(n=c(e)[t])&&void 0!==n?n:{newUser:!0},t]})))}})),[u,function(t){var e;return o(this,void 0,void 0,(function*(){t.preventDefault();const o=[],[c,d]=yield u,f={};for(const[t,n]of new FormData(this).entries())if(t.includes(".")){const[o,r]=t.split(".",2);null!==(e=f[o])&&void 0!==e||(f[o]={}),f[o][r]=n}else f[t]="Phone"===t&&""!==n?"+"+/\D/g[Symbol.replace](n,""):n;if(c.newUser){f.pictureUrl=`https://www.e-comas.com/docs/signatures/ressources/${d.substring(0,d.indexOf("@"))}.jpg`,c.newUser=!1;const t=[...i(d,f)].join("\n");o.push({insertText:{text:t,endOfSegmentLocation:{segmentId:""}}}),n(0,u=Promise.resolve([at(t)[d],d]))}else if(JSON.stringify(c)!==JSON.stringify(f)){const t=(yield gapi.client.docs.documents.get({documentId:r})).result.body.content.flatMap((t=>{var e,n;return null!==(n=null===(e=t.paragraph)||void 0===e?void 0:e.elements.map((({startIndex:t,endIndex:e,textRun:n})=>({startIndex:t,endIndex:e,text:n.content}))))&&void 0!==n?n:[]})),e=/^\s*\["[^"]+@[^"]+"\]\s*$/,i=/\S/;let m,p=!1;for(const{startIndex:n,endIndex:r,text:s}of t)if(i.test(s)){if(e.test(s)){if(p)break;s.trim()===`[${ct(d)}]`&&(p=!0)}else if(p&&(m=r,l(f,at(s)))){const t=s.slice(0,s.indexOf("=")).trim(),e=a(f,t);""===e?delete c[t]:c[t]=e,o.unshift({deleteContentRange:{range:{segmentId:"",startIndex:n,endIndex:r}}},""===e||null==e?void 0:{insertText:{location:{index:n,segmentId:""},text:`${t} = ${ct(e)}\n`}})}}else;for(const{entry:[t,e]}of s(f,c))c[t]=e,o.unshift({insertText:{location:{index:m,segmentId:""},text:`${t} = ${ct(e)}\n`}});n(0,u=Promise.resolve([c,d]))}o.length&&(yield gapi.client.docs.documents.batchUpdate({documentId:r,requests:o}))}))}]}class Yt extends F{constructor(t){super(),B(this,t,Vt,Ft,i,{})}}function Gt(e){let n,o,r,i,f=(e[8].message||e[8].error.message)+"";return{c(){n=c("p"),n.textContent="Unable to connect to Google API.",o=d(),r=c("p"),i=u(f),g(n,"color","red"),g(r,"color","red")},m(t,e){a(t,n,e),a(t,o,e),a(t,r,e),l(r,i)},p:t,d(t){t&&s(n),t&&s(o),t&&s(r)}}}function Qt(t){let e;function n(t,e){return t[1]?Xt:Kt}let o=n(t),r=o(t);return{c(){r.c(),e=f()},m(t,n){r.m(t,n),a(t,e,n)},p(t,i){o===(o=n(t))&&r?r.p(t,i):(r.d(1),r=o(t),r&&(r.c(),r.m(e.parentNode,e)))},d(t){r.d(t),t&&s(e)}}}function Kt(t){let e,n,o,r;function i(t,e){return t[0]?te:Zt}let u=i(t),d=u(t);return{c(){e=c("p"),n=c("button"),d.c()},m(i,s){a(i,e,s),l(e,n),d.m(n,null),o||(r=m(n,"click",t[7]),o=!0)},p(e,o){u!==(u=i(t=e))&&(d.d(1),d=u(t),d&&(d.c(),d.m(n,null)))},d(t){t&&s(e),d.d(),o=!1,r()}}}function Xt(t){let e,n,o={ctx:t,current:null,token:null,hasCatch:!0,pending:oe,then:ne,catch:ee,error:8};return N(n=t[1],o),{c(){e=f(),o.block.c()},m(t,n){a(t,e,n),o.block.m(t,o.anchor=n),o.mount=()=>e.parentNode,o.anchor=e},p(e,r){t=e,o.ctx=t,2&r&&n!==(n=t[1])&&N(n,o)||q(o,t,r)},d(t){t&&s(e),o.block.d(t),o.token=null,o=null}}}function Zt(t){let e;return{c(){e=u("Sign in")},m(t,n){a(t,e,n)},d(t){t&&s(e)}}}function te(t){let e;return{c(){e=u("Sign out")},m(t,n){a(t,e,n)},d(t){t&&s(e)}}}function ee(t){let e,n,r,i,f,p,b,w,y,v,x=(t[8].message||t[8].error||"Error")+"";return{c(){e=c("p"),n=u("An error occured: "),r=u(x),i=u("."),f=d(),p=c("button"),p.textContent="Try again",b=d(),w=c("button"),w.textContent="Cancel",g(e,"color","red")},m(o,s){a(o,e,s),l(e,n),l(e,r),l(e,i),a(o,f,s),a(o,p,s),a(o,b,s),a(o,w,s),y||(v=[m(p,"click",t[7]),m(w,"click",t[2])],y=!0)},p(e,n){t=e,2&n&&x!==(x=(t[8].message||t[8].error||"Error")+"")&&h(r,x)},d(t){t&&s(e),t&&s(f),t&&s(p),t&&s(b),t&&s(w),y=!1,o(v)}}}function ne(e){return{c:t,m:t,p:t,d:t}}function oe(e){let n;return{c(){n=c("p"),n.textContent="...loading"},m(t,e){a(t,n,e)},p:t,d(t){t&&s(n)}}}function re(e){let n;return{c(){n=c("p"),n.textContent="...loading"},m(t,e){a(t,n,e)},p:t,d(t){t&&s(n)}}}function ie(t){let e,n;return e=new Yt({}),{c(){M(e.$$.fragment)},m(t,o){R(e,t,o),n=!0},i(t){n||(O(e.$$.fragment,t),n=!0)},o(t){S(e.$$.fragment,t),n=!1},d(t){D(e,t)}}}function le(t){let e,n,o,r,i,u={ctx:t,current:null,token:null,hasCatch:!0,pending:re,then:Qt,catch:Gt,value:7,error:8};N(t[3],u);let f=t[0]&&ie();return{c(){e=c("main"),n=c("h1"),n.textContent="Email signature tool",o=d(),u.block.c(),r=d(),f&&f.c(),p(n,"class","svelte-1wmija6"),p(e,"class","svelte-1wmija6")},m(t,s){a(t,e,s),l(e,n),l(e,o),u.block.m(e,u.anchor=null),u.mount=()=>e,u.anchor=r,l(e,r),f&&f.m(e,null),i=!0},p(n,[o]){q(u,t=n,o),t[0]?f?1&o&&O(f,1):(f=ie(),f.c(),O(f,1),f.m(e,null)):f&&(P(),S(f,1,1,(()=>{f=null})),U())},i(t){i||(O(f),i=!0)},o(t){S(f),i=!1},d(t){t&&s(e),u.block.d(),u.token=null,u=null,f&&f.d()}}}function ae(t,e,n){var o=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(r,i){function l(t){try{s(o.next(t))}catch(t){i(t)}}function a(t){try{s(o.throw(t))}catch(t){i(t)}}function s(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(l,a)}s((o=o.apply(t,e||[])).next())}))},r=this&&this.__asyncValues||function(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,n=t[Symbol.asyncIterator];return n?n.call(t):(t="function"==typeof __values?__values(t):t[Symbol.iterator](),e={},o("next"),o("throw"),o("return"),e[Symbol.asyncIterator]=function(){return this},e);function o(n){e[n]=t[n]&&function(e){return new Promise((function(o,r){(function(t,e,n,o){Promise.resolve(o).then((function(e){t({value:e,done:n})}),e)})(o,r,(e=t[n](e)).done,e.value)}))}}};let i,l;const a=import("./gdocs-deec3d0d.js").then((t=>{const e=t.subscribeToConnectionStatus(),a=e.next();return function(t){var e,a,s,c;o(this,void 0,void 0,(function*(){try{for(e=r(t);!(a=yield e.next()).done;){const t=a.value;n(0,i=t),n(1,l=null)}}catch(t){s={error:t}}finally{try{a&&!a.done&&(c=e.return)&&(yield c.call(e))}finally{if(s)throw s.error}}}))}(e),Promise.all([t.initClientPromise,a]).then((([,e])=>(n(0,i=e.value),()=>{n(1,l=new Promise(((e,n)=>(i?t.disconnect():t.connect()).then(e,n))))})))}));return[i,l,function(){n(1,l=null)},a]}const se=new class extends F{constructor(t){super(),B(this,t,ae,le,i,{})}}({target:document.body,props:{}});export{se as a,qt as g};
//# sourceMappingURL=main-1a6bc832.js.map