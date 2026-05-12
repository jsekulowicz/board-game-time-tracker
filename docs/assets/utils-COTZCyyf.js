var Wt=e=>{throw TypeError(e)};var pt=(e,o,t)=>o.has(e)||Wt("Cannot "+t);var S=(e,o,t)=>(pt(e,o,"read from private field"),t?t.call(e):o.get(e)),$=(e,o,t)=>o.has(e)?Wt("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(e):o.set(e,t),O=(e,o,t,r)=>(pt(e,o,"write to private field"),r?r.call(e,t):o.set(e,t),t),H=(e,o,t)=>(pt(e,o,"access private method"),t);import{n as A,L as Ro,R as zt,r as ct,a7 as To,O as Jt,U as Xt,W as $t,a8 as Kt,I as Eo,Q as He,a9 as Mo,aa as No,V as le,P as jo,ab as Po,N as G,c as N,T as Qt,u as xe,i as $e,D as Y,A as I,h as W,j as dt,ac as Io,k as ke,s as ae,Y as at,G as ht,v as _t,o as ce,$ as Fo,w as Lo,q as Zt,z as Bo,a5 as eo,p as Do,a1 as to,F as Wo,m as Go,l as Vo}from"./index-D-efC_Pj.js";import{f as qo,r as Uo}from"./index-aWRrwrba.js";function _e(e){return A({...e,state:!0,attribute:!1})}const Ho=(e,o,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof o!="object"&&Object.defineProperty(e,o,t),t);function Yo(e){return(o,t)=>{const{slot:r,selector:n}=e??{},s="slot"+(r?`[name=${r}]`:":not([name])");return Ho(o,t,{get(){const a=this.renderRoot?.querySelector(s),i=a?.assignedElements(e)??[];return n===void 0?i:i.filter(l=>l.matches(n))}})}}function it(e){return Mo()?(No(e),!0):!1}const gt=new WeakMap,Jo=(...e)=>{var o;const t=e[0],r=(o=$t())==null?void 0:o.proxy;if(r==null&&!Kt())throw new Error("injectLocal must be called in setup");return r&&gt.has(r)&&t in gt.get(r)?gt.get(r)[t]:Eo(...e)},wt=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const Xo=Object.prototype.toString,Ko=e=>Xo.call(e)==="[object Object]",Qo=()=>{};function oo(...e){if(e.length!==1)return Ro(...e);const o=e[0];return typeof o=="function"?zt(To(()=>({get:o,set:Qo}))):ct(o)}function Zo(e,o){function t(...r){return new Promise((n,s)=>{Promise.resolve(e(()=>o.apply(this,r),{fn:o,thisArg:this,args:r})).then(n).catch(s)})}return t}const ro=e=>e();function er(e=ro,o={}){const{initialState:t="active"}=o,r=oo(t==="active");function n(){r.value=!1}function s(){r.value=!0}const a=(...i)=>{r.value&&e(...i)};return{isActive:zt(r),pause:n,resume:s,eventFilter:a}}function tr(e,o){var t;if(typeof e=="number")return e+o;const r=((t=e.match(/^-?\d+\.?\d*/))==null?void 0:t[0])||"",n=e.slice(r.length),s=Number.parseFloat(r)+o;return Number.isNaN(s)?e:s+n}function Me(e){return e.endsWith("rem")?Number.parseFloat(e)*16:Number.parseFloat(e)}function bt(e){return Array.isArray(e)?e:[e]}function or(e){return $t()}function rr(e,o,t={}){const{eventFilter:r=ro,...n}=t;return He(e,Zo(r,o),n)}function nr(e,o,t={}){const{eventFilter:r,initialState:n="active",...s}=t,{eventFilter:a,pause:i,resume:l,isActive:c}=er(r,{initialState:n});return{stop:rr(e,o,{...s,eventFilter:a}),pause:i,resume:l,isActive:c}}function Ot(e,o=!0,t){or()?Jt(e,t):o?e():Xt(e)}function sr(e,o=1e3,t={}){const{immediate:r=!0,immediateCallback:n=!1}=t;let s=null;const a=le(!1);function i(){s&&(clearInterval(s),s=null)}function l(){a.value=!1,i()}function c(){const m=G(o);m<=0||(a.value=!0,n&&e(),i(),a.value&&(s=setInterval(e,m)))}if(r&&wt&&c(),jo(o)||typeof o=="function"){const m=He(o,()=>{a.value&&wt&&c()});it(m)}return it(l),{isActive:Po(a),pause:l,resume:c}}function ar(e,o,t){return He(e,o,{...t,immediate:!0})}const ge=wt?window:void 0;function no(e){var o;const t=G(e);return(o=t?.$el)!=null?o:t}function xt(...e){const o=[],t=()=>{o.forEach(i=>i()),o.length=0},r=(i,l,c,m)=>(i.addEventListener(l,c,m),()=>i.removeEventListener(l,c,m)),n=N(()=>{const i=bt(G(e[0])).filter(l=>l!=null);return i.every(l=>typeof l!="string")?i:void 0}),s=ar(()=>{var i,l;return[(l=(i=n.value)==null?void 0:i.map(c=>no(c)))!=null?l:[ge].filter(c=>c!=null),bt(G(n.value?e[1]:e[0])),bt(xe(n.value?e[2]:e[1])),G(n.value?e[3]:e[2])]},([i,l,c,m])=>{if(t(),!i?.length||!l?.length||!c?.length)return;const w=Ko(m)?{...m}:m;o.push(...i.flatMap(C=>l.flatMap(f=>c.map(p=>r(C,f,p,w)))))},{flush:"post"}),a=()=>{s(),t()};return it(t),a}function ir(){const e=le(!1),o=$t();return o&&Jt(()=>{e.value=!0},o),e}function lr(e){const o=ir();return N(()=>(o.value,!!e()))}function cr(e,o={}){const{immediate:t=!0,fpsLimit:r=void 0,window:n=ge,once:s=!1}=o,a=le(!1),i=N(()=>r?1e3/G(r):null);let l=0,c=null;function m(f){if(!a.value||!n)return;l||(l=f);const p=f-l;if(i.value&&p<i.value){c=n.requestAnimationFrame(m);return}if(l=f,e({delta:p,timestamp:f}),s){a.value=!1,c=null;return}c=n.requestAnimationFrame(m)}function w(){!a.value&&n&&(a.value=!0,l=0,c=n.requestAnimationFrame(m))}function C(){a.value=!1,c!=null&&n&&(n.cancelAnimationFrame(c),c=null)}return t&&w(),it(C),{isActive:zt(a),pause:C,resume:w}}const dr=Symbol("vueuse-ssr-width");function so(){const e=Kt()?Jo(dr,null):null;return typeof e=="number"?e:void 0}function we(e,o={}){const{window:t=ge,ssrWidth:r=so()}=o,n=lr(()=>t&&"matchMedia"in t&&typeof t.matchMedia=="function"),s=le(typeof r=="number"),a=le(),i=le(!1),l=c=>{i.value=c.matches};return Qt(()=>{if(s.value){s.value=!n.value;const c=G(e).split(",");i.value=c.some(m=>{const w=m.includes("not all"),C=m.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/),f=m.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);let p=!!(C||f);return C&&p&&(p=r>=Me(C[1])),f&&p&&(p=r<=Me(f[1])),w?!p:p});return}n.value&&(a.value=t.matchMedia(G(e)),i.value=a.value.matches)}),xt(a,"change",l,{passive:!0}),N(()=>i.value)}const Wn={sm:640,md:768,lg:1024,xl:1280,"2xl":1536};function Gn(e,o={}){function t(f,p){let x=G(e[G(f)]);return p!=null&&(x=tr(x,p)),typeof x=="number"&&(x=`${x}px`),x}const{window:r=ge,strategy:n="min-width",ssrWidth:s=so()}=o,a=typeof s=="number",i=a?le(!1):{value:!0};a&&Ot(()=>i.value=!!r);function l(f,p){return!i.value&&a?f==="min"?s>=Me(p):s<=Me(p):r?r.matchMedia(`(${f}-width: ${p})`).matches:!1}const c=f=>we(()=>`(min-width: ${t(f)})`,o),m=f=>we(()=>`(max-width: ${t(f)})`,o),w=Object.keys(e).reduce((f,p)=>(Object.defineProperty(f,p,{get:()=>n==="min-width"?c(p):m(p),enumerable:!0,configurable:!0}),f),{});function C(){const f=Object.keys(e).map(p=>[p,w[p],Me(t(p))]).sort((p,x)=>p[2]-x[2]);return N(()=>f.filter(([,p])=>p.value).map(([p])=>p))}return Object.assign(w,{greaterOrEqual:c,smallerOrEqual:m,greater(f){return we(()=>`(min-width: ${t(f,.1)})`,o)},smaller(f){return we(()=>`(max-width: ${t(f,-.1)})`,o)},between(f,p){return we(()=>`(min-width: ${t(f)}) and (max-width: ${t(p,-.1)})`,o)},isGreater(f){return l("min",t(f,.1))},isGreaterOrEqual(f){return l("min",t(f))},isSmaller(f){return l("max",t(f,-.1))},isSmallerOrEqual(f){return l("max",t(f))},isInBetween(f,p){return l("min",t(f))&&l("max",t(p,-.1))},current:C,active(){const f=C();return N(()=>f.value.length===0?"":f.value.at(n==="min-width"?-1:0))}})}const Ze=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},et="__vueuse_ssr_handlers__",ur=fr();function fr(){return et in Ze||(Ze[et]=Ze[et]||{}),Ze[et]}function ao(e,o){return ur[e]||o}function mr(e){return we("(prefers-color-scheme: dark)",e)}function pr(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}const hr={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},Gt="vueuse-storage";function gr(e,o,t,r={}){var n;const{flush:s="pre",deep:a=!0,listenToStorageChanges:i=!0,writeDefaults:l=!0,mergeDefaults:c=!1,shallow:m,window:w=ge,eventFilter:C,onError:f=v=>{console.error(v)},initOnMounted:p}=r,x=(m?le:ct)(typeof o=="function"?o():o),b=N(()=>G(e));if(!t)try{t=ao("getDefaultStorage",()=>{var v;return(v=ge)==null?void 0:v.localStorage})()}catch(v){f(v)}if(!t)return x;const k=G(o),F=pr(k),R=(n=r.serializer)!=null?n:hr[F],{pause:_,resume:L}=nr(x,v=>Q(v),{flush:s,deep:a,eventFilter:C});He(b,()=>P(),{flush:s});let D=!1;const U=v=>{p&&!D||P(v)},h=v=>{p&&!D||ee(v)};w&&i&&(t instanceof Storage?xt(w,"storage",U,{passive:!0}):xt(w,Gt,h)),p?Ot(()=>{D=!0,P()}):P();function j(v,z){if(w){const T={key:b.value,oldValue:v,newValue:z,storageArea:t};w.dispatchEvent(t instanceof Storage?new StorageEvent("storage",T):new CustomEvent(Gt,{detail:T}))}}function Q(v){try{const z=t.getItem(b.value);if(v==null)j(z,null),t.removeItem(b.value);else{const T=R.write(v);z!==T&&(t.setItem(b.value,T),j(z,T))}}catch(z){f(z)}}function Z(v){const z=v?v.newValue:t.getItem(b.value);if(z==null)return l&&k!=null&&t.setItem(b.value,R.write(k)),k;if(!v&&c){const T=R.read(z);return typeof c=="function"?c(T,k):F==="object"&&!Array.isArray(T)?{...k,...T}:T}else return typeof z!="string"?z:R.read(z)}function P(v){if(!(v&&v.storageArea!==t)){if(v&&v.key==null){x.value=k;return}if(!(v&&v.key!==b.value)){_();try{const z=R.write(x.value);(v===void 0||v?.newValue!==z)&&(x.value=Z(v))}catch(z){f(z)}finally{v?Xt(L):L()}}}}function ee(v){P(v.detail)}return x}const br="*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";function vr(e={}){const{selector:o="html",attribute:t="class",initialValue:r="auto",window:n=ge,storage:s,storageKey:a="vueuse-color-scheme",listenToStorageChanges:i=!0,storageRef:l,emitAuto:c,disableTransition:m=!0}=e,w={auto:"",light:"light",dark:"dark",...e.modes||{}},C=mr({window:n}),f=N(()=>C.value?"dark":"light"),p=l||(a==null?oo(r):gr(a,r,s,{window:n,listenToStorageChanges:i})),x=N(()=>p.value==="auto"?f.value:p.value),b=ao("updateHTMLAttrs",(_,L,D)=>{const U=typeof _=="string"?n?.document.querySelector(_):no(_);if(!U)return;const h=new Set,j=new Set;let Q=null;if(L==="class"){const P=D.split(/\s/g);Object.values(w).flatMap(ee=>(ee||"").split(/\s/g)).filter(Boolean).forEach(ee=>{P.includes(ee)?h.add(ee):j.add(ee)})}else Q={key:L,value:D};if(h.size===0&&j.size===0&&Q===null)return;let Z;m&&(Z=n.document.createElement("style"),Z.appendChild(document.createTextNode(br)),n.document.head.appendChild(Z));for(const P of h)U.classList.add(P);for(const P of j)U.classList.remove(P);Q&&U.setAttribute(Q.key,Q.value),m&&(n.getComputedStyle(Z).opacity,document.head.removeChild(Z))});function k(_){var L;b(o,t,(L=w[_])!=null?L:_)}function F(_){e.onChanged?e.onChanged(_,k):k(_)}He(x,F,{flush:"post",immediate:!0}),Ot(()=>F(x.value));const R=N({get(){return c?p.value:x.value},set(_){p.value=_}});return Object.assign(R,{store:p,system:f,state:x})}function yr(e={}){const{controls:o=!1,interval:t="requestAnimationFrame",immediate:r=!0}=e,n=ct(new Date),s=()=>n.value=new Date,a=t==="requestAnimationFrame"?cr(s,{immediate:r}):sr(s,t,{immediate:r});return o?{now:n,...a}:n}const wr=[{max:6e4,value:1e3,name:"second"},{max:276e4,value:6e4,name:"minute"},{max:72e6,value:36e5,name:"hour"},{max:5184e5,value:864e5,name:"day"},{max:24192e5,value:6048e5,name:"week"},{max:28512e6,value:2592e6,name:"month"},{max:Number.POSITIVE_INFINITY,value:31536e6,name:"year"}],xr={justNow:"just now",past:e=>e.match(/\d/)?`${e} ago`:e,future:e=>e.match(/\d/)?`in ${e}`:e,month:(e,o)=>e===1?o?"last month":"next month":`${e} month${e>1?"s":""}`,year:(e,o)=>e===1?o?"last year":"next year":`${e} year${e>1?"s":""}`,day:(e,o)=>e===1?o?"yesterday":"tomorrow":`${e} day${e>1?"s":""}`,week:(e,o)=>e===1?o?"last week":"next week":`${e} week${e>1?"s":""}`,hour:e=>`${e} hour${e>1?"s":""}`,minute:e=>`${e} minute${e>1?"s":""}`,second:e=>`${e} second${e>1?"s":""}`,invalid:""};function kr(e){return e.toISOString().slice(0,10)}function Vn(e,o={}){const{controls:t=!1,updateInterval:r=3e4}=o,{now:n,...s}=yr({interval:r,controls:!0}),a=N(()=>Sr(new Date(G(e)),o,G(n)));return t?{timeAgo:a,...s}:a}function Sr(e,o={},t=Date.now()){var r;const{max:n,messages:s=xr,fullDateFormatter:a=kr,units:i=wr,showSecond:l=!1,rounding:c="round"}=o,m=typeof c=="number"?b=>+b.toFixed(c):Math[c],w=+t-+e,C=Math.abs(w);function f(b,k){return m(Math.abs(b)/k.value)}function p(b,k){const F=f(b,k),R=b>0,_=x(k.name,F,R);return x(R?"past":"future",_,R)}function x(b,k,F){const R=s[b];return typeof R=="function"?R(k,F):R.replace("{0}",k.toString())}if(C<6e4&&!l)return s.justNow;if(typeof n=="number"&&C>n)return a(new Date(e));if(typeof n=="string"){const b=(r=i.find(k=>k.name===n))==null?void 0:r.max;if(b&&C>b)return a(new Date(e))}for(const[b,k]of i.entries()){if(f(w,k)<=0&&i[b-1])return p(w,i[b-1]);if(C<k.max)return p(w,k)}return s.invalid}const Ar=$e`
  :host {
    display: inline-flex;
    vertical-align: middle;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--ds-space-1);
    padding: 0 var(--ds-space-2);
    height: var(--ds-size-md);
    min-width: var(--ds-size-md);
    border-radius: var(--ds-radius-sm);
    border: 1px solid transparent;
    font-family: var(--ds-font-body);
    font-size: var(--ds-font-size-sm);
    font-weight: var(--ds-font-weight-medium);
    letter-spacing: var(--ds-letter-spacing-normal);
    line-height: 1;
    cursor: pointer;
    background: transparent;
    color: var(--ds-color-fg);
    transition:
      background var(--ds-duration-fast) var(--ds-easing-standard),
      color var(--ds-duration-fast) var(--ds-easing-standard),
      border-color var(--ds-duration-fast) var(--ds-easing-standard),
      transform var(--ds-duration-fast) var(--ds-easing-standard);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .btn:focus-visible {
    outline: 2px solid transparent;
    box-shadow: var(--ds-shadow-focus);
  }
  .btn:active:not([aria-disabled='true']) {
    transform: translateY(1px);
  }
  :host([disabled]) .btn {
    opacity: 0.45;
    cursor: not-allowed;
  }
  :host([loading]) .btn {
    cursor: wait;
  }
  .spinner {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    animation: ds-btn-spin 0.75s linear infinite;
  }
  @keyframes ds-btn-spin {
    to {
      transform: rotate(360deg);
    }
  }
  :host([variant='primary']) .btn {
    background: var(--ds-color-accent);
    color: var(--ds-color-accent-fg);
  }
  :host([variant='primary']) .btn:hover:not([aria-disabled='true']) {
    background: var(--ds-color-accent-hover);
  }
  :host([variant='primary']) .btn:active:not([aria-disabled='true']) {
    background: var(--ds-color-accent-active);
  }
  :host([variant='secondary']) .btn {
    background: transparent;
    color: var(--ds-color-fg);
    border-color: var(--ds-color-border-strong);
  }
  :host([variant='secondary']) .btn:hover:not([aria-disabled='true']) {
    background: var(--ds-color-bg-subtle);
  }
  :host([variant='ghost']) .btn {
    background: transparent;
    color: var(--ds-color-fg);
  }
  :host([variant='ghost']) .btn:hover:not([aria-disabled='true']) {
    background: var(--ds-color-bg-subtle);
  }
  :host([variant='danger']) .btn {
    background: var(--ds-color-danger);
    color: var(--ds-color-accent-fg);
  }
  :host([size='sm']) .btn {
    height: var(--ds-size-sm);
    font-size: var(--ds-font-size-xs);
  }
  :host([size='lg']) .btn {
    height: var(--ds-size-lg);
    font-size: var(--ds-font-size-md);
  }
  :host([full-width]) {
    display: flex;
    width: 100%;
  }
  :host([full-width]) .btn {
    width: 100%;
  }
`;var K=function(e,o,t,r){var n=arguments.length,s=n<3?o:r===null?r=Object.getOwnPropertyDescriptor(o,t):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(e,o,t,r);else for(var i=e.length-1;i>=0;i--)(a=e[i])&&(s=(n<3?a(s):n>3?a(o,t,s):a(o,t))||s);return n>3&&s&&Object.defineProperty(o,t,s),s},je,ze,io,lo;const Tt=class Tt extends Y{constructor(){super(...arguments);$(this,ze);$(this,je);this.variant="primary",this.size="md",this.type="button",this.disabled=!1,this.loading=!1,this.fullWidth=!1,O(this,je,t=>{if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}(this.type==="submit"||this.type==="reset")&&H(this,ze,io).call(this),this.emit("ds-click",{detail:{originalEvent:t}})})}render(){return W`
      <button
        part="button"
        class="btn ds-focus-ring"
        type=${this.type}
        aria-disabled=${this.disabled||this.loading?"true":"false"}
        aria-busy=${this.loading?"true":"false"}
        aria-controls=${this.ariaControlsAttr??I}
        aria-expanded=${this.ariaExpandedAttr??I}
        aria-haspopup=${this.ariaHasPopupAttr??I}
        aria-invalid=${this.ariaInvalidAttr??I}
        aria-label=${this.label??I}
        @click=${S(this,je)}
      >
        ${this.loading?W`<svg class="spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-dasharray="56.55"
                stroke-dashoffset="14.14"
              />
            </svg>`:W`<slot name="leading"></slot>`}
        <slot></slot>
        <slot name="trailing"></slot>
      </button>
    `}};je=new WeakMap,ze=new WeakSet,io=function(){const t=this.closest("form")??H(this,ze,lo).call(this);t&&(this.type==="submit"?t.requestSubmit():t.reset())},lo=function(){return this.closest("ds-form")?.shadowRoot?.querySelector("form")??null},Tt.styles=[...Y.styles,Ar];let V=Tt;K([A({reflect:!0})],V.prototype,"variant",void 0);K([A({reflect:!0})],V.prototype,"size",void 0);K([A({reflect:!0})],V.prototype,"type",void 0);K([A({type:Boolean,reflect:!0})],V.prototype,"disabled",void 0);K([A({type:Boolean,reflect:!0})],V.prototype,"loading",void 0);K([A({type:Boolean,reflect:!0,attribute:"full-width"})],V.prototype,"fullWidth",void 0);K([A()],V.prototype,"label",void 0);K([A({attribute:"aria-controls"})],V.prototype,"ariaControlsAttr",void 0);K([A({attribute:"aria-expanded"})],V.prototype,"ariaExpandedAttr",void 0);K([A({attribute:"aria-haspopup"})],V.prototype,"ariaHasPopupAttr",void 0);K([A({attribute:"aria-invalid"})],V.prototype,"ariaInvalidAttr",void 0);customElements.get("ds-button")||customElements.define("ds-button",V);const Cr=$e`
  :host {
    display: inline-flex;
    position: relative;
  }
  :host([full-width]) {
    display: flex;
    width: 100%;
  }
  .anchor {
    position: relative;
    display: inline-flex;
  }
  :host([full-width]) .anchor {
    display: flex;
    width: 100%;
  }
  .tooltip {
    /* Override UA popover defaults so JS-set top/left/transform stay authoritative. */
    position: fixed;
    inset: auto;
    margin: 0;
    border: none;
    width: max-content;
    height: auto;
    overflow: visible;
    z-index: var(--ds-z-index-tooltip, 999);
    background: var(--ds-color-fg);
    color: var(--ds-color-bg);
    font-family: var(--ds-font-body);
    font-size: var(--ds-font-size-xs);
    line-height: 1.4;
    padding: var(--ds-space-1) var(--ds-space-3);
    border-radius: var(--ds-radius-xs);
    max-width: 16rem;
    pointer-events: none;
  }
`;var ve=function(e,o,t,r){var n=arguments.length,s=n<3?o:r===null?r=Object.getOwnPropertyDescriptor(o,t):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(e,o,t,r);else for(var i=e.length-1;i>=0;i--)(a=e[i])&&(s=(n<3?a(s):n>3?a(o,t,s):a(o,t))||s);return n>3&&s&&Object.defineProperty(o,t,s),s};const tt=6;function zr(e){return!!e&&typeof e.showPopover=="function"}var de,co,pe,Pe,Ie,Fe,Le,st,Be,Se,De;const Et=class Et extends Y{constructor(){super(...arguments);$(this,de);$(this,pe);$(this,Pe);$(this,Ie);$(this,Fe);$(this,Le);$(this,Be);$(this,Se);$(this,De);this.placement="top",this.open=!1,this.hoverOnly=!1,this.delay=0,this.fullWidth=!1,this._hovered=!1,this._focused=!1,O(this,pe,()=>{this._hoverTimer!==void 0&&(window.clearTimeout(this._hoverTimer),this._hoverTimer=void 0)}),O(this,Pe,()=>{S(this,pe).call(this),this.delay>0?this._hoverTimer=window.setTimeout(()=>{this._hovered=!0},this.delay):this._hovered=!0}),O(this,Ie,()=>{S(this,pe).call(this),this._hovered=!1}),O(this,Fe,()=>{this.hoverOnly||(this._focused=!0)}),O(this,Le,()=>{this.hoverOnly||(this._focused=!1)}),O(this,Be,()=>{const t=H(this,de,st).call(this);if(t){if(!t.matches(":popover-open"))try{t.showPopover()}catch{}S(this,De).call(this)}}),O(this,Se,()=>{const t=H(this,de,st).call(this);if(!(!t||!t.matches(":popover-open")))try{t.hidePopover()}catch{}}),O(this,De,()=>{const t=H(this,de,st).call(this);if(!t)return;const n=this.shadowRoot?.querySelector(".anchor")?.getBoundingClientRect()??this.getBoundingClientRect();let s=0,a=0,i="";switch(this.placement){case"top":s=n.top-tt,a=n.left+n.width/2,i="translate(-50%, -100%)";break;case"right":s=n.top+n.height/2,a=n.right+tt,i="translateY(-50%)";break;case"bottom":s=n.bottom+tt,a=n.left+n.width/2,i="translateX(-50%)";break;case"left":s=n.top+n.height/2,a=n.left-tt,i="translate(-100%, -50%)";break}t.style.top=`${s}px`,t.style.left=`${a}px`,t.style.transform=i})}disconnectedCallback(){super.disconnectedCallback(),S(this,pe).call(this),S(this,Se).call(this)}updated(t){H(this,de,co).call(this)?S(this,Be).call(this):S(this,Se).call(this)}render(){return W`
      <div
        class="anchor"
        part="anchor"
        @mouseenter=${S(this,Pe)}
        @mouseleave=${S(this,Ie)}
        @focusin=${S(this,Fe)}
        @focusout=${S(this,Le)}
      >
        <slot></slot>
        <div role="tooltip" part="tooltip" class="tooltip" popover="manual">
          <slot name="tip"></slot>
        </div>
      </div>
    `}};de=new WeakSet,co=function(){return this.open||this._hovered||!this.hoverOnly&&this._focused},pe=new WeakMap,Pe=new WeakMap,Ie=new WeakMap,Fe=new WeakMap,Le=new WeakMap,st=function(){const t=this.shadowRoot?.querySelector(".tooltip")??null;return zr(t)?t:null},Be=new WeakMap,Se=new WeakMap,De=new WeakMap,Et.styles=[...Y.styles,Cr];let te=Et;ve([A({reflect:!0})],te.prototype,"placement",void 0);ve([A({type:Boolean,reflect:!0})],te.prototype,"open",void 0);ve([A({type:Boolean,attribute:"hover-only"})],te.prototype,"hoverOnly",void 0);ve([A({type:Number})],te.prototype,"delay",void 0);ve([A({type:Boolean,reflect:!0,attribute:"full-width"})],te.prototype,"fullWidth",void 0);ve([_e()],te.prototype,"_hovered",void 0);ve([_e()],te.prototype,"_focused",void 0);customElements.get("ds-tooltip")||customElements.define("ds-tooltip",te);const $r=["placement","hover-only","full-width"],_r=["variant","size","type","label","disabled","loading","full-width"],Or={slot:"tip"},Rr=["variant","size","type","label","disabled","loading","full-width"],Tr=dt({inheritAttrs:!1,__name:"DsButton",props:{variant:{default:"primary"},size:{default:"md"},type:{default:"button"},disabled:{type:Boolean},loading:{type:Boolean},fullWidth:{type:Boolean},label:{},tooltip:{default:null},tooltipPlacement:{default:"top"},tooltipHoverOnly:{type:Boolean,default:!1}},emits:["click"],setup(e,{expose:o,emit:t}){const r=t,n=Io(),s=ct(null),a=N(()=>({class:n.class,style:n.style})),i=N(()=>{const m={...n};return delete m.class,delete m.style,m});function l(m){r("click",m)}function c(){(s.value?.shadowRoot?.querySelector("button")??s.value)?.focus()}return o({focus:c}),(m,w)=>e.tooltip?(ce(),ke("ds-tooltip",ht({key:0},a.value,{delay:"150",placement:e.tooltipPlacement,"hover-only":e.tooltipHoverOnly||null,"full-width":e.fullWidth||null}),[ae("ds-button",ht({ref_key:"buttonRef",ref:s},i.value,{class:xe(n).class,style:xe(n).style,variant:e.variant,size:e.size,type:e.type,label:e.label,disabled:e.disabled||null,loading:e.loading||null,"full-width":e.fullWidth||null,onDsClick:l}),[at(m.$slots,"default")],16,_r),ae("span",Or,_t(e.tooltip),1)],16,$r)):(ce(),ke("ds-button",ht({key:1,ref_key:"buttonRef",ref:s},xe(n),{variant:e.variant,size:e.size,type:e.type,label:e.label,disabled:e.disabled||null,loading:e.loading||null,"full-width":e.fullWidth||null,onDsClick:l}),[at(m.$slots,"default")],16,Rr))}});const Er={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Mr=e=>(...o)=>({_$litDirective$:e,values:o});class Nr{constructor(o){}get _$AU(){return this._$AM._$AU}_$AT(o,t,r){this._$Ct=o,this._$AM=t,this._$Ci=r}_$AS(o,t){return this.update(o,t)}update(o,t){return this.render(...t)}}class kt extends Nr{constructor(o){if(super(o),this.it=I,o.type!==Er.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(o){if(o===I||o==null)return this._t=void 0,this.it=o;if(o===Fo)return o;if(typeof o!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(o===this.it)return this._t;this.it=o;const t=[o];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}kt.directiveName="unsafeHTML",kt.resultType=1;class St extends kt{}St.directiveName="unsafeSVG",St.resultType=2;const jr=Mr(St),Pr=$e`
  :host {
    display: inline-flex;
    width: 1em;
    height: 1em;
    color: currentColor;
    vertical-align: middle;
    flex-shrink: 0;
  }
  :host([size='sm']) {
    width: 0.875em;
    height: 0.875em;
  }
  :host([size='lg']) {
    width: 1.25em;
    height: 1.25em;
  }
  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;var ut=function(e,o,t,r){var n=arguments.length,s=n<3?o:r===null?r=Object.getOwnPropertyDescriptor(o,t):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(e,o,t,r);else for(var i=e.length-1;i>=0;i--)(a=e[i])&&(s=(n<3?a(s):n>3?a(o,t,s):a(o,t))||s);return n>3&&s&&Object.defineProperty(o,t,s),s};const uo=new Map;function Oe(e,o){uo.set(e,o)}const Mt=class Mt extends Y{constructor(){super(...arguments),this.size="md",this.svg=null}willUpdate(){if(!this.name){this.svg=null;return}const o=uo.get(this.name);if(!o){this.svg=null,console.warn(`<ds-icon>: unknown icon "${this.name}"`);return}this.svg=Lo`${jr(o)}`}render(){const o=this.label?"false":"true",t=this.label?"img":void 0;return W`<span
      role=${t??I}
      aria-hidden=${o}
      aria-label=${this.label??I}
    >
      ${this.svg?this.svg:W`<slot></slot>`}
    </span>`}};Mt.styles=[...Y.styles,Pr];let be=Mt;ut([A()],be.prototype,"name",void 0);ut([A()],be.prototype,"label",void 0);ut([A({reflect:!0})],be.prototype,"size",void 0);ut([_e()],be.prototype,"svg",void 0);customElements.get("ds-icon")||customElements.define("ds-icon",be);Oe("moon",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>');Oe("sun",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>');const Ir=["name"],Fr=dt({__name:"DarkModeToggle",setup(e){const o=vr({initialValue:"system",disableTransition:!1}),t=N(()=>o.value==="dark"),r=N(()=>t.value?"Switch to light mode":"Switch to dark mode"),n=N(()=>t.value?"sun":"moon");Qt(()=>{document.documentElement.dataset.dsTheme=t.value?"dark":"light"});function s(){o.value=t.value?"light":"dark"}return(a,i)=>(ce(),Zt(Tr,{variant:"ghost",size:"sm",tooltip:r.value,"tooltip-placement":"left","tooltip-hover-only":"","aria-label":"Toggle theme",onClick:s},{default:Bo(()=>[ae("ds-icon",{slot:"leading",name:n.value,size:"lg"},null,8,Ir)]),_:1},8,["tooltip"]))}}),Lr=$e`
  :host {
    display: block;
    color: var(--ds-color-fg-muted);
    font-family: var(--ds-font-body);
    font-size: var(--ds-font-size-sm);
  }

  nav {
    display: block;
  }

  ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--ds-space-1);
  }

  ::slotted(ds-breadcrumb-item) {
    display: inline-flex;
    align-items: center;
  }
`;var fo=function(e,o,t,r){var n=arguments.length,s=n<3?o:r===null?r=Object.getOwnPropertyDescriptor(o,t):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(e,o,t,r);else for(var i=e.length-1;i>=0;i--)(a=e[i])&&(s=(n<3?a(s):n>3?a(o,t,s):a(o,t))||s);return n>3&&s&&Object.defineProperty(o,t,s),s},We;const Nt=class Nt extends Y{constructor(){super(...arguments);$(this,We);this.label="Breadcrumb",O(this,We,()=>{const t=this._items;t.forEach((r,n)=>{const s=n===t.length-1;r.toggleAttribute("last",s),r.toggleAttribute("current",s)})})}render(){return W`
      <nav part="nav" aria-label=${this.label}>
        <ol part="list" role="list">
          <slot @slotchange=${S(this,We)}></slot>
        </ol>
      </nav>
    `}};We=new WeakMap,Nt.styles=[...Y.styles,Lr];let Ne=Nt;fo([A()],Ne.prototype,"label",void 0);fo([Yo({selector:"ds-breadcrumb-item"})],Ne.prototype,"_items",void 0);const Br=$e`
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-space-1);
    color: inherit;
    font: inherit;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-space-1);
    color: var(--ds-color-fg-muted);
    text-decoration: none;
    padding: var(--ds-space-1) 0;
    border-radius: var(--ds-radius-sm);
    transition: color var(--ds-duration-fast) var(--ds-easing-standard);
  }
  a:hover {
    color: var(--ds-color-accent);
    text-decoration: underline;
  }
  a:focus-visible {
    outline: 2px solid transparent;
    box-shadow: var(--ds-shadow-focus);
  }

  .current {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-space-1);
    color: var(--ds-color-fg);
    font-weight: var(--ds-font-weight-medium);
    padding: var(--ds-space-1) 0;
  }

  .separator {
    display: inline-flex;
    color: var(--ds-color-fg-subtle);
    font-size: 0.875em;
  }
`;Oe("chevron-right",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>');var ne=function(e,o,t,r){var n=arguments.length,s=n<3?o:r===null?r=Object.getOwnPropertyDescriptor(o,t):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(e,o,t,r);else for(var i=e.length-1;i>=0;i--)(a=e[i])&&(s=(n<3?a(s):n>3?a(o,t,s):a(o,t))||s);return n>3&&s&&Object.defineProperty(o,t,s),s},X,At,mo,po,ho;const jt=class jt extends Y{constructor(){super(...arguments);$(this,X);this.current=!1,this.last=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","listitem")}render(){return W`
      ${this.current?H(this,X,po).call(this):H(this,X,mo).call(this)} ${H(this,X,ho).call(this)}
    `}};X=new WeakSet,At=function(){return W`<slot name="leading" part="leading"></slot><slot></slot>`},mo=function(){return W`
      <a
        part="link"
        href=${this.href??"#"}
        target=${this.target??I}
        rel=${this.rel??I}
        download=${this.download??I}
        hreflang=${this.hreflang??I}
        type=${this.type??I}
        referrerpolicy=${this.referrerpolicy??I}
      >
        ${H(this,X,At).call(this)}
      </a>
    `},po=function(){return W`
      <span part="current" class="current" aria-current="page"> ${H(this,X,At).call(this)} </span>
    `},ho=function(){return this.last?I:W`
      <span part="separator" class="separator" role="presentation" aria-hidden="true">
        <ds-icon name="chevron-right" size="md"></ds-icon>
      </span>
    `},jt.styles=[...Y.styles,Br];let J=jt;ne([A()],J.prototype,"href",void 0);ne([A()],J.prototype,"target",void 0);ne([A()],J.prototype,"rel",void 0);ne([A()],J.prototype,"download",void 0);ne([A()],J.prototype,"hreflang",void 0);ne([A()],J.prototype,"type",void 0);ne([A()],J.prototype,"referrerpolicy",void 0);ne([A({type:Boolean,reflect:!0})],J.prototype,"current",void 0);ne([A({type:Boolean,reflect:!0})],J.prototype,"last",void 0);customElements.get("ds-breadcrumb")||customElements.define("ds-breadcrumb",Ne);customElements.get("ds-breadcrumb-item")||customElements.define("ds-breadcrumb-item",J);function go(e){const o=qo(Uo,e);return N(()=>o?.meta?typeof o.meta.getDynamicTitle=="function"?o.meta.getDynamicTitle():o.meta.title??"":"")}const Dr={key:0},Wr=["href","onClick"],Gr=dt({__name:"PageBreadcrumbs",setup(e){const o=eo(),t=Do(),r=N(()=>{const s=o.matched.filter(a=>a.meta?.title||a.meta?.getDynamicTitle);return s.map((a,i)=>{const l=i===s.length-1,c=t.resolve({path:a.path});return{title:go(a.name).value,to:l?null:c.fullPath}})});function n(s,a){s&&(a.preventDefault(),t.push(s))}return(s,a)=>r.value.length>1?(ce(),ke("ds-breadcrumb",Dr,[(ce(!0),ke(Wo,null,Go(r.value,(i,l)=>(ce(),ke("ds-breadcrumb-item",{key:l,href:i.to||void 0,onClick:c=>n(i.to,c)},_t(i.title),9,Wr))),128))])):to("",!0)}}),Vr=$e`
  :host {
    --ds-page-shell-max-width: 90rem;

    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 100vh;
    overflow-x: clip;
    background: var(--ds-color-bg);
    color: var(--ds-color-fg);
    font-family: var(--ds-font-body);
  }

  header {
    border-bottom: 1px solid var(--ds-color-border);
    padding: var(--ds-space-2) 0;
    position: sticky;
    top: 0;
    background: color-mix(in oklab, var(--ds-color-bg) 92%, transparent);
    backdrop-filter: blur(12px);
    z-index: var(--ds-z-index-sticky);
  }

  footer {
    border-top: 1px solid var(--ds-color-border);
    padding: var(--ds-space-2) 0;
  }

  :host([footer-empty]) footer {
    padding: 0;
    border-top: 0;
  }

  .shell-inner {
    width: 100%;
    max-width: var(--ds-page-shell-max-width);
    margin-inline: auto;
    padding-inline: var(--ds-space-5);
  }

  .shell-inner--header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--ds-space-3);
  }

  .shell-body {
    flex: 1;
    width: 100%;
    max-width: var(--ds-page-shell-max-width);
    margin-inline: auto;
    display: grid;
    grid-template-columns: auto 1fr;
    min-height: 0;
  }

  :host([aside-empty]) .shell-body {
    grid-template-columns: 1fr;
  }

  aside {
    display: flex;
    overflow-x: clip;
    overflow-y: auto;
    min-height: 0;
    scrollbar-color: var(--ds-color-fg-subtle) transparent;
    scrollbar-width: thin;
    scrollbar-gutter: stable;
  }

  :host([aside-empty]) aside,
  :host([aside-empty]) .mobile-backdrop {
    display: none;
  }

  main {
    padding: var(--ds-space-5);
    overflow-y: auto;
    min-height: 0;
    scrollbar-color: var(--ds-color-fg-subtle) transparent;
    scrollbar-width: thin;
  }

  .brand {
    font-family: var(--ds-font-display);
    font-size: var(--ds-font-size-lg);
    letter-spacing: var(--ds-letter-spacing-display);
  }

  .menu-toggle {
    display: inline-flex;
  }
  .mobile-backdrop {
    display: none;
  }
  .drawer-header {
    display: none;
  }
  .drawer-close {
    display: none;
  }
  .menu-toggle::part(button),
  .drawer-close::part(button) {
    min-width: var(--ds-size-sm);
    width: var(--ds-size-sm);
    padding: 0;
  }

  :host(:not([mobile-layout])) .menu-toggle {
    display: none;
  }

  :host([mobile-layout]) .shell-body {
    grid-template-columns: 1fr;
  }
  :host([mobile-layout]) .brand {
    flex: 1;
  }
  :host([mobile-layout]) aside {
    position: absolute;
    top: 0;
    left: 0;
    width: 16rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--ds-color-bg);
    border-right: 0;
    z-index: var(--ds-z-index-modal);
    transform: translateX(-100%);
    transition: transform var(--ds-duration-slow) var(--ds-easing-standard);
    scrollbar-gutter: auto;
    overflow: hidden;
    box-sizing: border-box;
  }
  :host([mobile-layout][data-mobile-nav-open]) aside {
    transform: translateX(0);
  }
  :host([mobile-layout]) .drawer-header {
    display: flex;
    align-items: center;
    padding: var(--ds-space-2) var(--ds-space-2) 0;
  }
  :host([mobile-layout]) .drawer-close {
    display: inline-flex;
    margin: 0;
  }
  :host([mobile-layout]) aside ::slotted(ds-sidenav) {
    width: 100% !important;
    max-width: 100% !important;
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
    height: auto !important;
  }
  :host([mobile-layout][data-mobile-nav-open]) .mobile-backdrop {
    display: block;
    position: absolute;
    inset: 0;
    border: 0;
    margin: 0;
    padding: 0;
    background: color-mix(in oklab, var(--ds-color-fg) 26%, transparent);
    z-index: var(--ds-z-index-overlay);
  }
`;Oe("bars-3",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>');Oe("x-mark",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>');var Ye=function(e,o,t,r){var n=arguments.length,s=n<3?o:r===null?r=Object.getOwnPropertyDescriptor(o,t):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(e,o,t,r);else for(var i=e.length-1;i>=0;i--)(a=e[i])&&(s=(n<3?a(s):n>3?a(o,t,s):a(o,t))||s);return n>3&&s&&Object.defineProperty(o,t,s),s},ie,Ae,Ce,re,Ge,he,Ve,qe,Ue;const Pt=class Pt extends Y{constructor(){super(...arguments);$(this,ie);$(this,Ae);$(this,Ce);$(this,re);$(this,Ge);$(this,he);$(this,Ve);$(this,qe);$(this,Ue);this.brand="",this.menuLabel="Navigation menu",this._mobileNavOpen=!1,this._hasAside=!1,this._hasFooter=!1,O(this,ie,null),O(this,Ae,t=>{const r=t<768;this.toggleAttribute("mobile-layout",r),!r&&this._mobileNavOpen&&S(this,re).call(this,!1)}),O(this,Ce,t=>{t.key==="Escape"&&this._mobileNavOpen&&S(this,re).call(this,!1)}),O(this,re,t=>{this._mobileNavOpen=t,this.toggleAttribute("data-mobile-nav-open",t),t&&this.querySelector('[slot="aside"]')?.removeAttribute("collapsed")}),O(this,Ge,()=>{S(this,re).call(this,!this._mobileNavOpen)}),O(this,he,()=>{S(this,re).call(this,!1)}),O(this,Ve,t=>{if(!this.hasAttribute("mobile-layout"))return;t.composedPath().some(n=>n instanceof HTMLElement&&(n.tagName==="DS-NAV-ITEM"||n.tagName==="A"||n.getAttribute("href")!==null))&&S(this,he).call(this)}),O(this,qe,t=>{const r=t.target;this._hasAside=ot(r),this.toggleAttribute("aside-empty",!this._hasAside)}),O(this,Ue,t=>{const r=t.target;this._hasFooter=ot(r),this.toggleAttribute("footer-empty",!this._hasFooter)})}connectedCallback(){super.connectedCallback(),S(this,re).call(this,!1),document.addEventListener("keydown",S(this,Ce)),O(this,ie,new ResizeObserver(t=>{const r=t[0];r&&S(this,Ae).call(this,r.contentRect.width)})),S(this,ie).observe(this),S(this,Ae).call(this,this.getBoundingClientRect().width)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",S(this,Ce)),S(this,ie)?.disconnect(),O(this,ie,null)}firstUpdated(){const t=this.shadowRoot?.querySelector('slot[name="aside"]'),r=this.shadowRoot?.querySelector('slot[name="footer"]');t&&(this._hasAside=ot(t),this.toggleAttribute("aside-empty",!this._hasAside)),r&&(this._hasFooter=ot(r),this.toggleAttribute("footer-empty",!this._hasFooter))}render(){const t=this._mobileNavOpen?"x-mark":"bars-3",r=this._mobileNavOpen?"true":"false";return W`<header part="header">
        <div class="shell-inner shell-inner--header">
          ${this._hasAside?W`<ds-button
                class="menu-toggle"
                variant="ghost"
                size="sm"
                label=${this.menuLabel}
                aria-label=${this.menuLabel}
                aria-expanded=${r}
                aria-controls="mobile-aside"
                @click=${S(this,Ge)}
              >
                <ds-icon slot="leading" name=${t} size="lg"></ds-icon>
              </ds-button>`:null}
          <div class="brand">
            <slot name="brand">${this.brand}</slot>
          </div>
          <div><slot name="header-actions"></slot></div>
        </div>
      </header>
      <button
        class="mobile-backdrop"
        type="button"
        aria-label="Close navigation"
        ?hidden=${!this._mobileNavOpen}
        @click=${S(this,he)}
      ></button>
      <div class="shell-body" part="body">
        <aside id="mobile-aside" part="aside" @click=${S(this,Ve)}>
          <div class="drawer-header">
            <ds-button
              class="drawer-close"
              variant="ghost"
              size="sm"
              label="Close navigation"
              aria-label="Close navigation"
              @click=${S(this,he)}
            >
              <ds-icon slot="leading" name="x-mark" size="lg"></ds-icon>
            </ds-button>
          </div>
          <slot name="aside" @slotchange=${S(this,qe)}></slot>
        </aside>
        <main part="main">
          <slot></slot>
        </main>
      </div>
      <footer part="footer">
        <div class="shell-inner shell-inner--footer">
          <slot name="footer" @slotchange=${S(this,Ue)}></slot>
        </div>
      </footer>`}};ie=new WeakMap,Ae=new WeakMap,Ce=new WeakMap,re=new WeakMap,Ge=new WeakMap,he=new WeakMap,Ve=new WeakMap,qe=new WeakMap,Ue=new WeakMap,Pt.styles=[...Y.styles,Vr];let ue=Pt;Ye([A()],ue.prototype,"brand",void 0);Ye([A({attribute:"menu-label"})],ue.prototype,"menuLabel",void 0);Ye([_e()],ue.prototype,"_mobileNavOpen",void 0);Ye([_e()],ue.prototype,"_hasAside",void 0);Ye([_e()],ue.prototype,"_hasFooter",void 0);function ot(e){return e.assignedNodes({flatten:!0}).some(t=>t.nodeType===Node.ELEMENT_NODE?!0:t.nodeType===Node.TEXT_NODE?(t.textContent??"").trim().length>0:!1)}customElements.get("ds-page-shell")||customElements.define("ds-page-shell",ue);Oe("clock",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>');const qr={slot:"header-actions"},Ur={class:"page-title"},Hr=dt({__name:"BaseLayout",setup(e){const o=eo(),t=go(o.name);return(r,n)=>(ce(),ke("ds-page-shell",null,[n[0]||(n[0]=ae("span",{slot:"brand",class:"brand"},[ae("ds-icon",{name:"clock",size:"md"}),ae("span",null,"Board game time tracker")],-1)),ae("span",qr,[Vo(Fr)]),r.$route.meta.useBreadcrumbs?(ce(),Zt(Gr,{key:0,class:"page-breadcrumbs"})):to("",!0),at(r.$slots,"header",{pageTitle:xe(t)},()=>[ae("h2",Ur,_t(xe(t)),1)],!0),at(r.$slots,"default",{},void 0,!0)]))}}),Yr=(e,o)=>{const t=e.__vccOpts||e;for(const[r,n]of o)t[r]=n;return t},qn=Yr(Hr,[["__scopeId","data-v-72416361"]]);function bo(e){var o,t,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var n=e.length;for(o=0;o<n;o++)e[o]&&(t=bo(e[o]))&&(r&&(r+=" "),r+=t)}else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function Jr(){for(var e,o,t=0,r="",n=arguments.length;t<n;t++)(e=arguments[t])&&(o=bo(e))&&(r&&(r+=" "),r+=o);return r}const Xr=(e,o)=>{const t=new Array(e.length+o.length);for(let r=0;r<e.length;r++)t[r]=e[r];for(let r=0;r<o.length;r++)t[e.length+r]=o[r];return t},Kr=(e,o)=>({classGroupId:e,validator:o}),vo=(e=new Map,o=null,t)=>({nextPart:e,validators:o,classGroupId:t}),lt="-",Vt=[],Qr="arbitrary..",Zr=e=>{const o=tn(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:a=>{if(a.startsWith("[")&&a.endsWith("]"))return en(a);const i=a.split(lt),l=i[0]===""&&i.length>1?1:0;return yo(i,l,o)},getConflictingClassGroupIds:(a,i)=>{if(i){const l=r[a],c=t[a];return l?c?Xr(c,l):l:c||Vt}return t[a]||Vt}}},yo=(e,o,t)=>{if(e.length-o===0)return t.classGroupId;const n=e[o],s=t.nextPart.get(n);if(s){const c=yo(e,o+1,s);if(c)return c}const a=t.validators;if(a===null)return;const i=o===0?e.join(lt):e.slice(o).join(lt),l=a.length;for(let c=0;c<l;c++){const m=a[c];if(m.validator(i))return m.classGroupId}},en=e=>e.slice(1,-1).indexOf(":")===-1?void 0:(()=>{const o=e.slice(1,-1),t=o.indexOf(":"),r=o.slice(0,t);return r?Qr+r:void 0})(),tn=e=>{const{theme:o,classGroups:t}=e;return on(t,o)},on=(e,o)=>{const t=vo();for(const r in e){const n=e[r];Rt(n,t,r,o)}return t},Rt=(e,o,t,r)=>{const n=e.length;for(let s=0;s<n;s++){const a=e[s];rn(a,o,t,r)}},rn=(e,o,t,r)=>{if(typeof e=="string"){nn(e,o,t);return}if(typeof e=="function"){sn(e,o,t,r);return}an(e,o,t,r)},nn=(e,o,t)=>{const r=e===""?o:wo(o,e);r.classGroupId=t},sn=(e,o,t,r)=>{if(ln(e)){Rt(e(r),o,t,r);return}o.validators===null&&(o.validators=[]),o.validators.push(Kr(t,e))},an=(e,o,t,r)=>{const n=Object.entries(e),s=n.length;for(let a=0;a<s;a++){const[i,l]=n[a];Rt(l,wo(o,i),t,r)}},wo=(e,o)=>{let t=e;const r=o.split(lt),n=r.length;for(let s=0;s<n;s++){const a=r[s];let i=t.nextPart.get(a);i||(i=vo(),t.nextPart.set(a,i)),t=i}return t},ln=e=>"isThemeGetter"in e&&e.isThemeGetter===!0,cn=e=>{if(e<1)return{get:()=>{},set:()=>{}};let o=0,t=Object.create(null),r=Object.create(null);const n=(s,a)=>{t[s]=a,o++,o>e&&(o=0,r=t,t=Object.create(null))};return{get(s){let a=t[s];if(a!==void 0)return a;if((a=r[s])!==void 0)return n(s,a),a},set(s,a){s in t?t[s]=a:n(s,a)}}},Ct="!",qt=":",dn=[],Ut=(e,o,t,r,n)=>({modifiers:e,hasImportantModifier:o,baseClassName:t,maybePostfixModifierPosition:r,isExternal:n}),un=e=>{const{prefix:o,experimentalParseClassName:t}=e;let r=n=>{const s=[];let a=0,i=0,l=0,c;const m=n.length;for(let x=0;x<m;x++){const b=n[x];if(a===0&&i===0){if(b===qt){s.push(n.slice(l,x)),l=x+1;continue}if(b==="/"){c=x;continue}}b==="["?a++:b==="]"?a--:b==="("?i++:b===")"&&i--}const w=s.length===0?n:n.slice(l);let C=w,f=!1;w.endsWith(Ct)?(C=w.slice(0,-1),f=!0):w.startsWith(Ct)&&(C=w.slice(1),f=!0);const p=c&&c>l?c-l:void 0;return Ut(s,f,C,p)};if(o){const n=o+qt,s=r;r=a=>a.startsWith(n)?s(a.slice(n.length)):Ut(dn,!1,a,void 0,!0)}if(t){const n=r;r=s=>t({className:s,parseClassName:n})}return r},fn=e=>{const o=new Map;return e.orderSensitiveModifiers.forEach((t,r)=>{o.set(t,1e6+r)}),t=>{const r=[];let n=[];for(let s=0;s<t.length;s++){const a=t[s],i=a[0]==="[",l=o.has(a);i||l?(n.length>0&&(n.sort(),r.push(...n),n=[]),r.push(a)):n.push(a)}return n.length>0&&(n.sort(),r.push(...n)),r}},mn=e=>({cache:cn(e.cacheSize),parseClassName:un(e),sortModifiers:fn(e),...Zr(e)}),pn=/\s+/,hn=(e,o)=>{const{parseClassName:t,getClassGroupId:r,getConflictingClassGroupIds:n,sortModifiers:s}=o,a=[],i=e.trim().split(pn);let l="";for(let c=i.length-1;c>=0;c-=1){const m=i[c],{isExternal:w,modifiers:C,hasImportantModifier:f,baseClassName:p,maybePostfixModifierPosition:x}=t(m);if(w){l=m+(l.length>0?" "+l:l);continue}let b=!!x,k=r(b?p.substring(0,x):p);if(!k){if(!b){l=m+(l.length>0?" "+l:l);continue}if(k=r(p),!k){l=m+(l.length>0?" "+l:l);continue}b=!1}const F=C.length===0?"":C.length===1?C[0]:s(C).join(":"),R=f?F+Ct:F,_=R+k;if(a.indexOf(_)>-1)continue;a.push(_);const L=n(k,b);for(let D=0;D<L.length;++D){const U=L[D];a.push(R+U)}l=m+(l.length>0?" "+l:l)}return l},gn=(...e)=>{let o=0,t,r,n="";for(;o<e.length;)(t=e[o++])&&(r=xo(t))&&(n&&(n+=" "),n+=r);return n},xo=e=>{if(typeof e=="string")return e;let o,t="";for(let r=0;r<e.length;r++)e[r]&&(o=xo(e[r]))&&(t&&(t+=" "),t+=o);return t},bn=(e,...o)=>{let t,r,n,s;const a=l=>{const c=o.reduce((m,w)=>w(m),e());return t=mn(c),r=t.cache.get,n=t.cache.set,s=i,i(l)},i=l=>{const c=r(l);if(c)return c;const m=hn(l,t);return n(l,m),m};return s=a,(...l)=>s(gn(...l))},vn=[],E=e=>{const o=t=>t[e]||vn;return o.isThemeGetter=!0,o},ko=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,So=/^\((?:(\w[\w-]*):)?(.+)\)$/i,yn=/^\d+\/\d+$/,wn=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,xn=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,kn=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,Sn=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,An=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,ye=e=>yn.test(e),y=e=>!!e&&!Number.isNaN(Number(e)),se=e=>!!e&&Number.isInteger(Number(e)),vt=e=>e.endsWith("%")&&y(e.slice(0,-1)),oe=e=>wn.test(e),Cn=()=>!0,zn=e=>xn.test(e)&&!kn.test(e),Ao=()=>!1,$n=e=>Sn.test(e),_n=e=>An.test(e),On=e=>!d(e)&&!u(e),Rn=e=>Re(e,$o,Ao),d=e=>ko.test(e),me=e=>Re(e,_o,zn),yt=e=>Re(e,jn,y),Ht=e=>Re(e,Co,Ao),Tn=e=>Re(e,zo,_n),rt=e=>Re(e,Oo,$n),u=e=>So.test(e),Ee=e=>Te(e,_o),En=e=>Te(e,Pn),Yt=e=>Te(e,Co),Mn=e=>Te(e,$o),Nn=e=>Te(e,zo),nt=e=>Te(e,Oo,!0),Re=(e,o,t)=>{const r=ko.exec(e);return r?r[1]?o(r[1]):t(r[2]):!1},Te=(e,o,t=!1)=>{const r=So.exec(e);return r?r[1]?o(r[1]):t:!1},Co=e=>e==="position"||e==="percentage",zo=e=>e==="image"||e==="url",$o=e=>e==="length"||e==="size"||e==="bg-size",_o=e=>e==="length",jn=e=>e==="number",Pn=e=>e==="family-name",Oo=e=>e==="shadow",In=()=>{const e=E("color"),o=E("font"),t=E("text"),r=E("font-weight"),n=E("tracking"),s=E("leading"),a=E("breakpoint"),i=E("container"),l=E("spacing"),c=E("radius"),m=E("shadow"),w=E("inset-shadow"),C=E("text-shadow"),f=E("drop-shadow"),p=E("blur"),x=E("perspective"),b=E("aspect"),k=E("ease"),F=E("animate"),R=()=>["auto","avoid","all","avoid-page","page","left","right","column"],_=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],L=()=>[..._(),u,d],D=()=>["auto","hidden","clip","visible","scroll"],U=()=>["auto","contain","none"],h=()=>[u,d,l],j=()=>[ye,"full","auto",...h()],Q=()=>[se,"none","subgrid",u,d],Z=()=>["auto",{span:["full",se,u,d]},se,u,d],P=()=>[se,"auto",u,d],ee=()=>["auto","min","max","fr",u,d],v=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],z=()=>["start","end","center","stretch","center-safe","end-safe"],T=()=>["auto",...h()],fe=()=>[ye,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...h()],g=()=>[e,u,d],It=()=>[..._(),Yt,Ht,{position:[u,d]}],Ft=()=>["no-repeat",{repeat:["","x","y","space","round"]}],Lt=()=>["auto","cover","contain",Mn,Rn,{size:[u,d]}],ft=()=>[vt,Ee,me],B=()=>["","none","full",c,u,d],q=()=>["",y,Ee,me],Je=()=>["solid","dashed","dotted","double"],Bt=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],M=()=>[y,vt,Yt,Ht],Dt=()=>["","none",p,u,d],Xe=()=>["none",y,u,d],Ke=()=>["none",y,u,d],mt=()=>[y,u,d],Qe=()=>[ye,"full",...h()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[oe],breakpoint:[oe],color:[Cn],container:[oe],"drop-shadow":[oe],ease:["in","out","in-out"],font:[On],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[oe],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[oe],shadow:[oe],spacing:["px",y],text:[oe],"text-shadow":[oe],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",ye,d,u,b]}],container:["container"],columns:[{columns:[y,d,u,i]}],"break-after":[{"break-after":R()}],"break-before":[{"break-before":R()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:L()}],overflow:[{overflow:D()}],"overflow-x":[{"overflow-x":D()}],"overflow-y":[{"overflow-y":D()}],overscroll:[{overscroll:U()}],"overscroll-x":[{"overscroll-x":U()}],"overscroll-y":[{"overscroll-y":U()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:j()}],"inset-x":[{"inset-x":j()}],"inset-y":[{"inset-y":j()}],start:[{start:j()}],end:[{end:j()}],top:[{top:j()}],right:[{right:j()}],bottom:[{bottom:j()}],left:[{left:j()}],visibility:["visible","invisible","collapse"],z:[{z:[se,"auto",u,d]}],basis:[{basis:[ye,"full","auto",i,...h()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[y,ye,"auto","initial","none",d]}],grow:[{grow:["",y,u,d]}],shrink:[{shrink:["",y,u,d]}],order:[{order:[se,"first","last","none",u,d]}],"grid-cols":[{"grid-cols":Q()}],"col-start-end":[{col:Z()}],"col-start":[{"col-start":P()}],"col-end":[{"col-end":P()}],"grid-rows":[{"grid-rows":Q()}],"row-start-end":[{row:Z()}],"row-start":[{"row-start":P()}],"row-end":[{"row-end":P()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":ee()}],"auto-rows":[{"auto-rows":ee()}],gap:[{gap:h()}],"gap-x":[{"gap-x":h()}],"gap-y":[{"gap-y":h()}],"justify-content":[{justify:[...v(),"normal"]}],"justify-items":[{"justify-items":[...z(),"normal"]}],"justify-self":[{"justify-self":["auto",...z()]}],"align-content":[{content:["normal",...v()]}],"align-items":[{items:[...z(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...z(),{baseline:["","last"]}]}],"place-content":[{"place-content":v()}],"place-items":[{"place-items":[...z(),"baseline"]}],"place-self":[{"place-self":["auto",...z()]}],p:[{p:h()}],px:[{px:h()}],py:[{py:h()}],ps:[{ps:h()}],pe:[{pe:h()}],pt:[{pt:h()}],pr:[{pr:h()}],pb:[{pb:h()}],pl:[{pl:h()}],m:[{m:T()}],mx:[{mx:T()}],my:[{my:T()}],ms:[{ms:T()}],me:[{me:T()}],mt:[{mt:T()}],mr:[{mr:T()}],mb:[{mb:T()}],ml:[{ml:T()}],"space-x":[{"space-x":h()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":h()}],"space-y-reverse":["space-y-reverse"],size:[{size:fe()}],w:[{w:[i,"screen",...fe()]}],"min-w":[{"min-w":[i,"screen","none",...fe()]}],"max-w":[{"max-w":[i,"screen","none","prose",{screen:[a]},...fe()]}],h:[{h:["screen","lh",...fe()]}],"min-h":[{"min-h":["screen","lh","none",...fe()]}],"max-h":[{"max-h":["screen","lh",...fe()]}],"font-size":[{text:["base",t,Ee,me]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[r,u,yt]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",vt,d]}],"font-family":[{font:[En,d,o]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[n,u,d]}],"line-clamp":[{"line-clamp":[y,"none",u,yt]}],leading:[{leading:[s,...h()]}],"list-image":[{"list-image":["none",u,d]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",u,d]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:g()}],"text-color":[{text:g()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...Je(),"wavy"]}],"text-decoration-thickness":[{decoration:[y,"from-font","auto",u,me]}],"text-decoration-color":[{decoration:g()}],"underline-offset":[{"underline-offset":[y,"auto",u,d]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:h()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",u,d]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",u,d]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:It()}],"bg-repeat":[{bg:Ft()}],"bg-size":[{bg:Lt()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},se,u,d],radial:["",u,d],conic:[se,u,d]},Nn,Tn]}],"bg-color":[{bg:g()}],"gradient-from-pos":[{from:ft()}],"gradient-via-pos":[{via:ft()}],"gradient-to-pos":[{to:ft()}],"gradient-from":[{from:g()}],"gradient-via":[{via:g()}],"gradient-to":[{to:g()}],rounded:[{rounded:B()}],"rounded-s":[{"rounded-s":B()}],"rounded-e":[{"rounded-e":B()}],"rounded-t":[{"rounded-t":B()}],"rounded-r":[{"rounded-r":B()}],"rounded-b":[{"rounded-b":B()}],"rounded-l":[{"rounded-l":B()}],"rounded-ss":[{"rounded-ss":B()}],"rounded-se":[{"rounded-se":B()}],"rounded-ee":[{"rounded-ee":B()}],"rounded-es":[{"rounded-es":B()}],"rounded-tl":[{"rounded-tl":B()}],"rounded-tr":[{"rounded-tr":B()}],"rounded-br":[{"rounded-br":B()}],"rounded-bl":[{"rounded-bl":B()}],"border-w":[{border:q()}],"border-w-x":[{"border-x":q()}],"border-w-y":[{"border-y":q()}],"border-w-s":[{"border-s":q()}],"border-w-e":[{"border-e":q()}],"border-w-t":[{"border-t":q()}],"border-w-r":[{"border-r":q()}],"border-w-b":[{"border-b":q()}],"border-w-l":[{"border-l":q()}],"divide-x":[{"divide-x":q()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":q()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...Je(),"hidden","none"]}],"divide-style":[{divide:[...Je(),"hidden","none"]}],"border-color":[{border:g()}],"border-color-x":[{"border-x":g()}],"border-color-y":[{"border-y":g()}],"border-color-s":[{"border-s":g()}],"border-color-e":[{"border-e":g()}],"border-color-t":[{"border-t":g()}],"border-color-r":[{"border-r":g()}],"border-color-b":[{"border-b":g()}],"border-color-l":[{"border-l":g()}],"divide-color":[{divide:g()}],"outline-style":[{outline:[...Je(),"none","hidden"]}],"outline-offset":[{"outline-offset":[y,u,d]}],"outline-w":[{outline:["",y,Ee,me]}],"outline-color":[{outline:g()}],shadow:[{shadow:["","none",m,nt,rt]}],"shadow-color":[{shadow:g()}],"inset-shadow":[{"inset-shadow":["none",w,nt,rt]}],"inset-shadow-color":[{"inset-shadow":g()}],"ring-w":[{ring:q()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:g()}],"ring-offset-w":[{"ring-offset":[y,me]}],"ring-offset-color":[{"ring-offset":g()}],"inset-ring-w":[{"inset-ring":q()}],"inset-ring-color":[{"inset-ring":g()}],"text-shadow":[{"text-shadow":["none",C,nt,rt]}],"text-shadow-color":[{"text-shadow":g()}],opacity:[{opacity:[y,u,d]}],"mix-blend":[{"mix-blend":[...Bt(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":Bt()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[y]}],"mask-image-linear-from-pos":[{"mask-linear-from":M()}],"mask-image-linear-to-pos":[{"mask-linear-to":M()}],"mask-image-linear-from-color":[{"mask-linear-from":g()}],"mask-image-linear-to-color":[{"mask-linear-to":g()}],"mask-image-t-from-pos":[{"mask-t-from":M()}],"mask-image-t-to-pos":[{"mask-t-to":M()}],"mask-image-t-from-color":[{"mask-t-from":g()}],"mask-image-t-to-color":[{"mask-t-to":g()}],"mask-image-r-from-pos":[{"mask-r-from":M()}],"mask-image-r-to-pos":[{"mask-r-to":M()}],"mask-image-r-from-color":[{"mask-r-from":g()}],"mask-image-r-to-color":[{"mask-r-to":g()}],"mask-image-b-from-pos":[{"mask-b-from":M()}],"mask-image-b-to-pos":[{"mask-b-to":M()}],"mask-image-b-from-color":[{"mask-b-from":g()}],"mask-image-b-to-color":[{"mask-b-to":g()}],"mask-image-l-from-pos":[{"mask-l-from":M()}],"mask-image-l-to-pos":[{"mask-l-to":M()}],"mask-image-l-from-color":[{"mask-l-from":g()}],"mask-image-l-to-color":[{"mask-l-to":g()}],"mask-image-x-from-pos":[{"mask-x-from":M()}],"mask-image-x-to-pos":[{"mask-x-to":M()}],"mask-image-x-from-color":[{"mask-x-from":g()}],"mask-image-x-to-color":[{"mask-x-to":g()}],"mask-image-y-from-pos":[{"mask-y-from":M()}],"mask-image-y-to-pos":[{"mask-y-to":M()}],"mask-image-y-from-color":[{"mask-y-from":g()}],"mask-image-y-to-color":[{"mask-y-to":g()}],"mask-image-radial":[{"mask-radial":[u,d]}],"mask-image-radial-from-pos":[{"mask-radial-from":M()}],"mask-image-radial-to-pos":[{"mask-radial-to":M()}],"mask-image-radial-from-color":[{"mask-radial-from":g()}],"mask-image-radial-to-color":[{"mask-radial-to":g()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":_()}],"mask-image-conic-pos":[{"mask-conic":[y]}],"mask-image-conic-from-pos":[{"mask-conic-from":M()}],"mask-image-conic-to-pos":[{"mask-conic-to":M()}],"mask-image-conic-from-color":[{"mask-conic-from":g()}],"mask-image-conic-to-color":[{"mask-conic-to":g()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:It()}],"mask-repeat":[{mask:Ft()}],"mask-size":[{mask:Lt()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",u,d]}],filter:[{filter:["","none",u,d]}],blur:[{blur:Dt()}],brightness:[{brightness:[y,u,d]}],contrast:[{contrast:[y,u,d]}],"drop-shadow":[{"drop-shadow":["","none",f,nt,rt]}],"drop-shadow-color":[{"drop-shadow":g()}],grayscale:[{grayscale:["",y,u,d]}],"hue-rotate":[{"hue-rotate":[y,u,d]}],invert:[{invert:["",y,u,d]}],saturate:[{saturate:[y,u,d]}],sepia:[{sepia:["",y,u,d]}],"backdrop-filter":[{"backdrop-filter":["","none",u,d]}],"backdrop-blur":[{"backdrop-blur":Dt()}],"backdrop-brightness":[{"backdrop-brightness":[y,u,d]}],"backdrop-contrast":[{"backdrop-contrast":[y,u,d]}],"backdrop-grayscale":[{"backdrop-grayscale":["",y,u,d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[y,u,d]}],"backdrop-invert":[{"backdrop-invert":["",y,u,d]}],"backdrop-opacity":[{"backdrop-opacity":[y,u,d]}],"backdrop-saturate":[{"backdrop-saturate":[y,u,d]}],"backdrop-sepia":[{"backdrop-sepia":["",y,u,d]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":h()}],"border-spacing-x":[{"border-spacing-x":h()}],"border-spacing-y":[{"border-spacing-y":h()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",u,d]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[y,"initial",u,d]}],ease:[{ease:["linear","initial",k,u,d]}],delay:[{delay:[y,u,d]}],animate:[{animate:["none",F,u,d]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[x,u,d]}],"perspective-origin":[{"perspective-origin":L()}],rotate:[{rotate:Xe()}],"rotate-x":[{"rotate-x":Xe()}],"rotate-y":[{"rotate-y":Xe()}],"rotate-z":[{"rotate-z":Xe()}],scale:[{scale:Ke()}],"scale-x":[{"scale-x":Ke()}],"scale-y":[{"scale-y":Ke()}],"scale-z":[{"scale-z":Ke()}],"scale-3d":["scale-3d"],skew:[{skew:mt()}],"skew-x":[{"skew-x":mt()}],"skew-y":[{"skew-y":mt()}],transform:[{transform:[u,d,"","none","gpu","cpu"]}],"transform-origin":[{origin:L()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:Qe()}],"translate-x":[{"translate-x":Qe()}],"translate-y":[{"translate-y":Qe()}],"translate-z":[{"translate-z":Qe()}],"translate-none":["translate-none"],accent:[{accent:g()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:g()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",u,d]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":h()}],"scroll-mx":[{"scroll-mx":h()}],"scroll-my":[{"scroll-my":h()}],"scroll-ms":[{"scroll-ms":h()}],"scroll-me":[{"scroll-me":h()}],"scroll-mt":[{"scroll-mt":h()}],"scroll-mr":[{"scroll-mr":h()}],"scroll-mb":[{"scroll-mb":h()}],"scroll-ml":[{"scroll-ml":h()}],"scroll-p":[{"scroll-p":h()}],"scroll-px":[{"scroll-px":h()}],"scroll-py":[{"scroll-py":h()}],"scroll-ps":[{"scroll-ps":h()}],"scroll-pe":[{"scroll-pe":h()}],"scroll-pt":[{"scroll-pt":h()}],"scroll-pr":[{"scroll-pr":h()}],"scroll-pb":[{"scroll-pb":h()}],"scroll-pl":[{"scroll-pl":h()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",u,d]}],fill:[{fill:["none",...g()]}],"stroke-w":[{stroke:[y,Ee,me,yt]}],stroke:[{stroke:["none",...g()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},Fn=bn(In);function Un(...e){return Fn(Jr(e))}export{qn as B,Yr as _,Tr as a,_e as b,Un as c,Gn as d,Mr as e,Wn as f,Jr as g,Ho as h,Nr as i,Oe as r,Er as t,Vn as u};
