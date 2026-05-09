var Ct=n=>{throw TypeError(n)};var _t=(n,s,t)=>s.has(n)||Ct("Cannot "+t);var R=(n,s,t)=>(_t(n,s,"read from private field"),t?t.call(n):s.get(n)),D=(n,s,t)=>s.has(n)?Ct("Cannot add the same private member more than once"):s instanceof WeakSet?s.add(n):s.set(n,t),O=(n,s,t,e)=>(_t(n,s,"write to private field"),e?e.call(n,t):s.set(n,t),t),c=(n,s,t)=>(_t(n,s,"access private method"),t);import{j as B,c as v,q as z,z as S,B as N,v as b,o as x,r as Z,a3 as Lt,T as ce,O as Gt,k as A,Z as Y,s as u,a1 as q,x as Rt,u as m,A as L,i as Dt,D as gt,h as C,n as I,F as kt,Y as Q,l as M,w as T,Q as Ot,m as zt,a4 as Vt,a5 as ue,a6 as he}from"./index-RCJLMDGl.js";import{a as H,_ as ut,r as Nt,b as wt,d as me,f as pe,g as fe,c as ht,B as ve}from"./utils-Hb4QJKja.js";import{b as ge,_ as yt,a as _e}from"./GameSessionStatusTag.vue_vue_type_script_setup_true_lang-CEMbNnrd.js";import{u as J}from"./index-ChkiOOsL.js";import{e as jt,_ as It}from"./DsCard.vue_vue_type_script_setup_true_lang-Ab7l5P7r.js";const ye=B({__name:"GameSessionPlayerStatusTag",props:{player:{},gameStatus:{}},setup(n){const s=n,t=v(()=>{if(s.gameStatus==="ended")return"ended";switch(s.player.status){case"tracking":return s.gameStatus==="paused"?"inactive":"active";case"ready_to_move":return"default";case"passed":case"turn_ended":default:return"ended"}}),e=v(()=>{switch(s.player.status){case"tracking":return s.gameStatus==="paused"?"Paused":"Tracking";case"ready_to_move":return"Ready";case"turn_ended":return"Moved";case"passed":default:return"Passed"}}),o=v(()=>s.player.ordinalNumber),a=v(()=>`#${o.value} ${e.value}`);return(i,r)=>(x(),z(ge,{variant:t.value},{default:S(()=>[N(b(a.value),1)]),_:1},8,["variant"]))}});function be(n){const s=Math.floor(n/36e5),t=Math.floor(n%(1e3*60*60)/(1e3*60)),e=Math.floor(n%(1e3*60)/1e3);return`${s.toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}:${e.toString().padStart(2,"0")}`}const Wt=n=>{const s=J(),t=Z(Date.now()),e=v(()=>n.value.moves),o=Z(!0);let a=null;const i=v(()=>{if(f(),s.gameSession?.timeDisplayMode==="hidden")return o.value?"##:##:##":"## ## ##";const _=e.value[e.value.length-1],y=_?.endTimestamp===null?t.value-new Date(_.startTimestamp).getTime():0,$=n.value.previousTotalTimeMs+y;return be($)}),r=v(()=>!s.isTrackingPossible||n.value.status!=="ready_to_move"&&!s.hasLastMoveInTurn);Lt(h),ce(()=>{s.gameSession?.status==="in_progress"&&n.value.status==="tracking"?d():h()});function d(){h(),a=setInterval(()=>{f(),o.value=!o.value},1e3)}function h(){a&&(clearInterval(a),a=null)}function f(){t.value=Date.now()}return{displayedTime:i,timeTrackingDisabled:r}};function xe(n){return Object.fromEntries(Object.entries(n).map(([s,t])=>[t,s]))}const $e={q:1,w:2,e:3,r:4},Et=xe($e),ke=n=>{const s=J(),t=Et[n.value.ordinalNumber]?.toUpperCase(),e=Wt(n);Gt(()=>{document.addEventListener("keydown",o)}),Lt(()=>{document.removeEventListener("keydown",o)});function o(i){i.ctrlKey||i.metaKey||i.key!==Et[n.value.ordinalNumber]||e.timeTrackingDisabled.value||a()}function a(){s.switchPlayerMove(n.value.id)}return{switchPlayerMove:a,switchPlayerKeyLabel:t}},we={class:"player__head"},Se={class:"player__name"},Me={class:"player__sub"},Te=B({__name:"GameSessionPlayerItem",props:{gameSessionPlayer:{},gameSessionStatus:{}},emits:["end-move"],setup(n,{expose:s}){const t=n,e=v(()=>t.gameSessionPlayer),{displayedTime:o,timeTrackingDisabled:a}=Wt(e),{switchPlayerMove:i}=ke(e),r=Z(null),d=v(()=>t.gameSessionStatus==="paused"?"Resume the game session to track.":a.value?"Player already moved this turn. Wait for the next turn to track.":null),h=v(()=>t.gameSessionPlayer.status==="tracking"),f=v(()=>t.gameSessionPlayer.status==="ready_to_move"&&t.gameSessionStatus==="in_progress"),_=v(()=>h.value?"Stop":"Track"),y=v(()=>h.value?"primary":"secondary");function $(){r.value?.focus()}return s({focusFinishButton:$}),(j,G)=>(x(),A("li",{class:Y(["player",{"player--tracking":h.value,"player--ready":f.value}])},[u("div",we,[u("span",{class:"player__color",style:Rt({background:n.gameSessionPlayer.color})},null,4),u("span",Se,b(n.gameSessionPlayer.name),1),n.gameSessionStatus!=="ended"?(x(),z(ye,{key:0,player:n.gameSessionPlayer,gameStatus:n.gameSessionStatus},null,8,["player","gameStatus"])):q("",!0)]),u("p",{class:Y(["player__time",{"player__time--running":h.value}])},b(m(o)),3),u("p",Me,b(n.gameSessionPlayer.moves.length)+" "+b(n.gameSessionPlayer.moves.length===1?"move":"moves"),1),n.gameSessionStatus!=="ended"?(x(),z(H,{key:0,ref_key:"finishButtonRef",ref:r,class:"player__cta ds-button-fill",variant:y.value,size:"md","full-width":"",disabled:m(a),tooltip:d.value,onClick:m(i)},{default:S(()=>[N(b(_.value),1)]),_:1},8,["variant","disabled","tooltip","onClick"])):q("",!0)],2))}}),Ce=ut(Te,[["__scopeId","data-v-c4558208"]]);Nt("eye",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>');Nt("eye-slash",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>');const Pt=n=>n??L,Ie=Dt`
  :host {
    display: contents;
  }
  dialog {
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    width: 100%;
    max-height: min(90vh, 720px);
    border-radius: var(--ds-radius-sm);
    box-shadow: var(--ds-shadow-md);
    overflow: visible;
  }
  :host([size='sm']) dialog {
    max-width: 400px;
  }
  :host([size='md']) dialog {
    max-width: 560px;
  }
  :host([size='lg']) dialog {
    max-width: 800px;
  }
  dialog::backdrop {
    background: rgb(15 23 42 / 0.55);
    backdrop-filter: blur(2px);
  }
  ds-card {
    height: 100%;
  }
  ds-card::part(card) {
    height: 100%;
    max-height: 100%;
    box-shadow: none;
    border-color: transparent;
    gap: var(--ds-space-3);
  }
  ds-card::part(body) {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }
  .title-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--ds-space-3);
  }
  .title-text {
    margin: 0;
    flex: 1;
    font-family: var(--ds-font-display);
    font-size: var(--ds-font-size-xl);
    font-weight: var(--ds-font-weight-semibold);
    letter-spacing: var(--ds-letter-spacing-display);
  }
  .close-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin: calc(var(--ds-space-1) * -1);
    border: 0;
    border-radius: var(--ds-radius-sm);
    background: transparent;
    color: var(--ds-color-fg-subtle, var(--ds-color-fg));
    cursor: pointer;
    transition: background-color var(--ds-duration-fast) var(--ds-easing-standard);
  }
  .close-btn:hover {
    background: var(--ds-color-bg-subtle, rgb(0 0 0 / 0.05));
    color: var(--ds-color-fg);
  }
  .footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--ds-space-2);
  }
`;var mt=function(n,s,t,e){var o=arguments.length,a=o<3?s:e===null?e=Object.getOwnPropertyDescriptor(s,t):e,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(n,s,t,e);else for(var r=n.length-1;r>=0;r--)(i=n[r])&&(a=(o<3?i(a):o>3?i(s,t,a):i(s,t))||a);return o>3&&a&&Object.defineProperty(s,t,a),a},at,nt,ot,it;const St=class St extends gt{constructor(){super(...arguments);D(this,at);D(this,nt);D(this,ot);D(this,it);this.open=!1,this.label="",this.dismissible=!0,this.size="md",O(this,at,t=>{this.dismissible&&t.target===this._dialogEl&&this.close()}),O(this,nt,t=>{if(!this.dismissible){t.preventDefault();return}this.emit("ds-cancel",{detail:null})}),O(this,ot,()=>{this.open=!1,this.emit("ds-close",{detail:{returnValue:this._dialogEl?.returnValue??""}})}),O(this,it,()=>{this.close()})}show(){this.open=!0}close(t){t!==void 0&&this._dialogEl&&(this._dialogEl.returnValue=t),this.open=!1}updated(t){!t.has("open")||!this._dialogEl||(this.open&&!this._dialogEl.open?(this._dialogEl.showModal(),this.emit("ds-open",{detail:null})):!this.open&&this._dialogEl.open&&this._dialogEl.close())}disconnectedCallback(){super.disconnectedCallback(),this._dialogEl?.open&&this._dialogEl.close()}render(){const t=`${this.uid}-title`,e=!this.label;return C`<dialog
      part="dialog"
      aria-labelledby=${Pt(e?t:void 0)}
      aria-label=${Pt(this.label||void 0)}
      @click=${R(this,at)}
      @cancel=${R(this,nt)}
      @close=${R(this,ot)}
    >
      <ds-card elevation="md" part="card">
        <div slot="title" class="title-row">
          <h2 id=${t} class="title-text"><slot name="title"></slot></h2>
          <button
            class="close-btn"
            part="close-button"
            type="button"
            aria-label="Close"
            @click=${R(this,it)}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <slot></slot>
        <div slot="footer" class="footer"><slot name="footer"></slot></div>
      </ds-card>
    </dialog>`}};at=new WeakMap,nt=new WeakMap,ot=new WeakMap,it=new WeakMap,St.styles=[...gt.styles,Ie];let U=St;mt([I({type:Boolean,reflect:!0})],U.prototype,"open",void 0);mt([I()],U.prototype,"label",void 0);mt([I({type:Boolean,reflect:!0})],U.prototype,"dismissible",void 0);mt([I({reflect:!0})],U.prototype,"size",void 0);mt([jt("dialog")],U.prototype,"_dialogEl",void 0);customElements.get("ds-dialog")||customElements.define("ds-dialog",U);const Ee=["open"],Pe={slot:"footer",class:"flex flex-wrap justify-end gap-2"},Ae=B({__name:"GameSessionAlertDialogEnd",emits:["continue"],setup(n,{emit:s}){const t=s,e=Z(!1);function o(){t("continue"),e.value=!1}return(a,i)=>(x(),A(kt,null,[u("span",{onClick:i[0]||(i[0]=r=>e.value=!0)},[Q(a.$slots,"trigger")]),u("ds-dialog",{open:e.value,size:"sm",onDsClose:i[2]||(i[2]=r=>e.value=!1)},[i[5]||(i[5]=u("span",{slot:"title"},"Are you sure you want to end the game session?",-1)),i[6]||(i[6]=u("p",null,"This action cannot be undone. You will not be able to track players within this session.",-1)),u("div",Pe,[M(H,{variant:"secondary",onClick:i[1]||(i[1]=r=>e.value=!1)},{default:S(()=>[...i[3]||(i[3]=[N("Keep tracking",-1)])]),_:1}),M(H,{variant:"danger",onClick:o},{default:S(()=>[...i[4]||(i[4]=[N("End game session",-1)])]),_:1})])],40,Ee)],64))}}),Be=()=>{const n=J(),s=v(()=>n.gameSession?.status==="paused"),t=v(()=>n.gameSession?.status==="in_progress"),e=v(()=>n.gameSession?.status!=="ended"),o=v(()=>n.gameSession?.status==="ready_to_track"),a=v(()=>n.gameSession?.timeDisplayMode==="visible");function i(){a.value?n.setGameSessionTimeDisplayMode("hidden"):n.setGameSessionTimeDisplayMode("visible")}function r(){t.value?n.setGameSessionStatus("paused"):s.value&&n.setGameSessionStatus("in_progress")}function d(){e.value&&n.setGameSessionStatus("ended")}return{canResume:s,canPause:t,canComplete:e,needsToStartTracking:o,isTrackedTimeVisible:a,toggleTimeVisibility:i,toggleGameSessionPlayPause:r,endGameSession:d}},Le={class:"action-bar"},Ge=["name"],Re=B({__name:"GameSessionCardStateActions",setup(n){const s=Be(),t=v(()=>{if(s.needsToStartTracking.value)return"Start tracking in order to be able to pause the session."}),e=v(()=>s.needsToStartTracking.value||s.canPause.value?"Pause":s.canResume.value?"Resume":""),o=v(()=>s.isTrackedTimeVisible.value?"eye-slash":"eye"),a=v(()=>s.isTrackedTimeVisible.value?"Hide tracked time":"Show tracked time");return(i,r)=>(x(),A("section",Le,[M(H,{size:"sm",variant:"ghost",onClick:m(s).toggleTimeVisibility},{default:S(()=>[u("ds-icon",{slot:"leading",name:o.value,size:"lg"},null,8,Ge),N(" "+b(a.value),1)]),_:1},8,["onClick"]),M(H,{size:"sm",variant:"secondary",tooltip:t.value,disabled:m(s).needsToStartTracking.value,onClick:m(s).toggleGameSessionPlayPause},{default:S(()=>[N(b(e.value),1)]),_:1},8,["tooltip","disabled","onClick"]),M(Ae,{onContinue:m(s).endGameSession},{trigger:S(()=>[M(H,{size:"sm",variant:"danger"},{default:S(()=>[...r[0]||(r[0]=[N("End",-1)])]),_:1})]),_:1},8,["onContinue"])]))}}),De=ut(Re,[["__scopeId","data-v-abd880bf"]]),Oe=Dt`
  :host {
    display: block;
    position: relative;
    width: 100%;
    color: var(--ds-color-fg);
    font-family: var(--ds-font-body);
    font-size: var(--ds-font-size-sm);
  }

  .frame {
    position: relative;
    width: 100%;
    outline: none;
    border-radius: var(--ds-radius-md);
  }

  .frame:focus-visible {
    outline: 2px solid transparent;
    box-shadow: var(--ds-shadow-focus);
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .grid line {
    stroke: var(--ds-color-border-subtle);
    stroke-width: 1;
  }

  .axis line,
  .axis path {
    stroke: var(--ds-color-border);
    stroke-width: 1;
    fill: none;
  }

  .axis text {
    fill: var(--ds-color-fg-muted);
    font-size: 0.75rem;
  }

  .axis-label {
    fill: var(--ds-color-fg-muted);
    font-size: 0.75rem;
    font-weight: var(--ds-font-weight-medium);
  }

  .bar {
    transition: opacity var(--ds-duration-fast) var(--ds-easing-standard);
  }

  .bar-group.inactive .bar {
    opacity: 0.55;
  }

  .focus-ring {
    fill: none;
    stroke: var(--ds-color-accent);
    stroke-width: 2;
    pointer-events: none;
    rx: 4;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ds-space-2) var(--ds-space-4);
    margin-top: var(--ds-space-3);
    color: var(--ds-color-fg-muted);
  }

  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-space-2);
  }

  .legend-swatch {
    display: inline-block;
    width: 0.75em;
    height: 0.75em;
    border-radius: var(--ds-radius-xs);
  }

  .tooltip {
    position: absolute;
    pointer-events: none;
    background: var(--ds-color-bg-inverse);
    color: var(--ds-color-fg-inverse);
    border: 1px solid var(--ds-color-border);
    border-radius: var(--ds-radius-md);
    padding: var(--ds-space-2) var(--ds-space-3);
    font-size: var(--ds-font-size-sm);
    box-shadow: var(--ds-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.18));
    min-width: 120px;
    max-width: min(220px, calc(100% - 16px));
    box-sizing: border-box;
    z-index: 1;
  }

  .tooltip[data-position="above"] {
    transform: translate(-50%, -100%);
    margin-top: -8px;
  }

  .tooltip[data-position="below"] {
    transform: translate(-50%, 0);
    margin-top: 8px;
  }

  .tooltip[hidden] {
    display: none;
  }

  .tooltip-title {
    font-weight: var(--ds-font-weight-medium);
    margin-bottom: var(--ds-space-1);
  }

  .tooltip-rows {
    display: grid;
    grid-template-columns: auto auto;
    gap: 2px var(--ds-space-3);
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .tooltip-row-label {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-space-1);
  }

  .tooltip-swatch {
    display: inline-block;
    width: 0.625em;
    height: 0.625em;
    border-radius: 2px;
  }

  .tooltip-row-value {
    font-variant-numeric: tabular-nums;
    text-align: right;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`,ft=["var(--ds-color-chart-1)","var(--ds-color-chart-2)","var(--ds-color-chart-3)","var(--ds-color-chart-4)","var(--ds-color-chart-5)","var(--ds-color-chart-6)"];function ze(n){const s=(n%ft.length+ft.length)%ft.length;return ft[s]}function Ve(n){if(!Number.isFinite(n)||n<=0)return 1;const s=Math.pow(10,Math.floor(Math.log10(n))),t=n/s;return t<=1?1*s:t<=2?2*s:t<=2.5?2.5*s:t<=5?5*s:10*s}function Ne(n,s=5){if(n<=0||s<=0)return[0];const t=n/s,e=Math.pow(10,Math.floor(Math.log10(t))),o=t/e;let a=10;o<=1?a=1:o<=2?a=2:o<=5&&(a=5);const i=a*e,r=[];for(let d=0;d<=n+1e-9;d+=i)r.push(Number(d.toFixed(10)));return r}function je(n,s,t){return n.map(e=>{const o={};let a=0;for(const i of t){const r=e[i],d=typeof r=="number"?r:Number(r)||0;o[i]=d,a+=d}return{domain:e[s],row:e,values:o,total:a}})}function We(n,s,t){if(s<=0)return[];const e=s,o=Math.max(0,n/e),a=o*Math.max(0,Math.min(.45,t)),i=[];for(let r=0;r<e;r++){const d=r*o;i.push({x:d,bandWidth:o,innerX:d+a,innerWidth:Math.max(0,o-2*a)})}return i}function Ue(n,s,t,e){const o=Math.max(1,t),a=Math.max(0,o-1)*e,i=Math.max(1,(s-a)/o);return Array.from({length:o},(r,d)=>({x:n+d*(i+e),width:i}))}function Fe(n,s,t,e){const o=[];if(e<=0||t<=0)return s.map(i=>({key:i,value:n[i]??0,y:t,height:0}));let a=0;for(const i of s){const r=n[i]??0,d=r/e*t;a+=d,o.push({key:i,value:r,y:t-a,height:d})}return o}var E=function(n,s,t,e){var o=arguments.length,a=o<3?s:e===null?e=Object.getOwnPropertyDescriptor(s,t):e,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(n,s,t,e);else for(var r=n.length-1;r>=0;r--)(i=n[r])&&(a=(o<3?i(a):o>3?i(s,t,a):i(s,t))||a);return o>3&&a&&Object.defineProperty(s,t,a),a};const vt={top:16,right:16,bottomBase:36,leftBase:44},Ke=.18,Xe=2,bt=1,Ye=640,qe=220,xt=8;var X,l,Ut,Ft,F,tt,W,et,st,Kt,Xt,Yt,qt,Ht,Zt,Qt,Jt,te,ee,$t,se,ae,ne,oe,ie,K,rt,lt,dt,ct;const Mt=class Mt extends gt{constructor(){super(...arguments);D(this,l);D(this,X);D(this,rt);D(this,lt);D(this,dt);D(this,ct);this.data=[],this.domain="",this.series=[],this.stacked=!1,this.title="",this.height=320,this.showLegend=!0,this._width=0,this._activeIndex=null,this._focusMode=null,O(this,rt,t=>{const e=this.data.length;if(e===0)return;const o=this._activeIndex??-1;let a;switch(t.key){case"ArrowRight":a=Math.min(e-1,o+1);break;case"ArrowLeft":a=Math.max(0,o<0?0:o-1);break;case"Home":a=0;break;case"End":a=e-1;break;case"Escape":this._focusMode=null,c(this,l,K).call(this,null);return;default:return}t.preventDefault(),this._focusMode="keyboard",c(this,l,K).call(this,a)}),O(this,lt,t=>{const e=c(this,l,st).call(this);if(!e.bands.length)return;const o=this._frame.getBoundingClientRect(),a=t.clientX-o.left-e.margin.left;if(a<0||a>e.innerWidth){c(this,l,K).call(this,null);return}const i=Math.min(e.bands.length-1,Math.max(0,Math.floor(a/Math.max(1,e.bands[0].bandWidth))));this._focusMode="pointer",c(this,l,K).call(this,i)}),O(this,dt,()=>{this._focusMode==="pointer"&&(this._focusMode=null),c(this,l,K).call(this,null)}),O(this,ct,()=>{this._focusMode=null,c(this,l,K).call(this,null)})}firstUpdated(){c(this,l,Ft).call(this),c(this,l,Ut).call(this)}disconnectedCallback(){super.disconnectedCallback(),R(this,X)?.disconnect(),O(this,X,void 0)}render(){const t=c(this,l,st).call(this),{groups:e,yMax:o,innerHeight:a,width:i,margin:r,bands:d,ticks:h}=t;return e.length===0?C`<div class="frame" style="height:${this.height}px" tabindex="0"></div>`:C`
      <div
        class="frame"
        style="height:${this.height}px"
        tabindex="0"
        role="application"
        aria-label=${c(this,l,Yt).call(this,e.length)}
        aria-describedby="${this.uid}-desc"
        aria-activedescendant=${this._activeIndex==null?L:`${this.uid}-group-${this._activeIndex}`}
        @keydown=${R(this,rt)}
        @pointermove=${R(this,lt)}
        @pointerleave=${R(this,dt)}
        @blur=${R(this,ct)}
        part="chart"
      >
        <svg role="img" aria-hidden="true" viewBox="0 0 ${i} ${this.height}" width=${i} height=${this.height} preserveAspectRatio="none">
          <g transform="translate(${r.left}, ${r.top})">
            ${c(this,l,Ht).call(this,h,a,t.innerWidth,o)}
            ${c(this,l,Zt).call(this,h,a,r.left,o)}
            ${c(this,l,Qt).call(this,e,d,a,r)}
            ${c(this,l,Jt).call(this,e,d,a,o)}
            ${c(this,l,se).call(this,d,a,e,o)}
          </g>
        </svg>
        ${c(this,l,ae).call(this,t)}
        ${c(this,l,ie).call(this,e)}
        <div class="sr-only" id="${this.uid}-live" role="status" aria-live="polite">${c(this,l,qt).call(this,e)}</div>
      </div>
      ${this.showLegend?c(this,l,oe).call(this):L}
    `}computeLayoutSnapshot(){return c(this,l,st).call(this)}};X=new WeakMap,l=new WeakSet,Ut=function(){typeof requestAnimationFrame>"u"||requestAnimationFrame(()=>{const t=this._frame.clientWidth;t>0&&t!==this._width&&(this._width=t)})},Ft=function(){!this._frame||typeof ResizeObserver>"u"||(O(this,X,new ResizeObserver(t=>{const e=t[0];e&&(this._width=Math.max(0,e.contentRect.width))})),R(this,X).observe(this._frame))},F=function(t){return t.label??t.key},tt=function(t,e){return t.color??ze(e)},W=function(t){return this.formatValue?this.formatValue(t):String(t)},et=function(t){return this.formatDomain?this.formatDomain(t):String(t??"")},st=function(){const t=je(this.data,this.domain,this.series.map(_=>_.key)),e=t.reduce((_,y)=>{const $=this.stacked?y.total:Math.max(...Object.values(y.values),0);return Math.max(_,$)},0),o=Ve(e),a=Ne(o),i={top:vt.top,right:vt.right,bottom:vt.bottomBase+(this.xAxisLabel?18:0),left:vt.leftBase+(this.yAxisLabel?18:0)},r=this._width>0?this._width:Ye,d=Math.max(0,r-i.left-i.right),h=Math.max(0,this.height-i.top-i.bottom),f=We(d,t.length,Ke);return{groups:t,yMax:o,ticks:a,margin:i,width:r,innerWidth:d,innerHeight:h,bands:f}},Kt=function(t){return t>=24?1:t>=12?2:t>=6?4:Math.max(1,Math.ceil(32/Math.max(1,t)))},Xt=function(t){return t<48?-35:0},Yt=function(t){const e=this.title||"Bar chart",o=this.series.map(a=>c(this,l,F).call(this,a)).join(", ");return`${e}: ${t} ${this.stacked?"stacked ":""}groups, series: ${o}. Use left and right arrow keys to move between groups.`},qt=function(t){if(this._activeIndex==null)return"";const e=t[this._activeIndex];if(!e)return"";const o=c(this,l,et).call(this,e.domain),a=this.series.map(r=>`${c(this,l,F).call(this,r)} ${c(this,l,W).call(this,e.values[r.key]??0)}`),i=this.stacked?`. Total ${c(this,l,W).call(this,e.total)}`:"";return`${o}: ${a.join(", ")}${i}.`},Ht=function(t,e,o,a){return T`
      <g class="grid" aria-hidden="true">
        ${t.map(i=>{const r=e-i/a*e;return T`<line x1="0" x2=${o} y1=${r} y2=${r}></line>`})}
      </g>
    `},Zt=function(t,e,o,a){return T`
      <g class="axis axis-y" aria-hidden="true">
        <line x1="0" x2="0" y1="0" y2=${e}></line>
        ${t.map(i=>{const r=e-i/a*e;return T`
            <g transform="translate(0, ${r})">
              <line x1="-4" x2="0" y1="0" y2="0"></line>
              <text x="-8" y="0" text-anchor="end" dominant-baseline="middle">${c(this,l,W).call(this,i)}</text>
            </g>
          `})}
        ${this.yAxisLabel?T`<text class="axis-label" transform="translate(${-o+12}, ${e/2}) rotate(-90)" text-anchor="middle">${this.yAxisLabel}</text>`:L}
      </g>
    `},Qt=function(t,e,o,a){const i=e[0],r=e[e.length-1],d=i.bandWidth,h=c(this,l,Kt).call(this,d),f=c(this,l,Xt).call(this,d);return T`
      <g class="axis axis-x" aria-hidden="true" transform="translate(0, ${o})">
        <line x1="0" x2=${r.x+r.bandWidth} y1="0" y2="0"></line>
        ${t.map((_,y)=>{if(y%h!==0)return L;const $=e[y],j=$.x+$.bandWidth/2,G=c(this,l,et).call(this,_.domain);return T`
            <g transform="translate(${j}, 0)">
              <line x1="0" x2="0" y1="0" y2="4"></line>
              <text y="18" text-anchor=${f?"end":"middle"} transform=${f?`rotate(${f}) translate(-4, -6)`:""}>${G}</text>
            </g>
          `})}
        ${this.xAxisLabel?T`<text class="axis-label" x=${r.x/2+i.bandWidth/2} y=${a.bottom-8} text-anchor="middle">${this.xAxisLabel}</text>`:L}
      </g>
    `},Jt=function(t,e,o,a){return T`${t.map((i,r)=>{const d=e[r],h=this._activeIndex!=null&&this._activeIndex!==r?"inactive":"",f=this.stacked?c(this,l,te).call(this,i,d,o,a):c(this,l,ee).call(this,i,d,o,a);return T`<g class="bar-group ${h}" id="${this.uid}-group-${r}" data-index=${r}>${f}</g>`})}`},te=function(t,e,o,a){const i=Fe(t.values,this.series.map(r=>r.key),o,a);return T`${i.map((r,d)=>{const h=this.series[d],f=r.value>0?Math.max(bt,r.height):0,_=o-i.slice(0,d+1).reduce((y,$)=>y+Math.max($.value>0?bt:0,$.height),0);return T`<rect class="bar" x=${e.innerX} y=${_} width=${e.innerWidth} height=${f} fill=${c(this,l,tt).call(this,h,d)}></rect>`})}`},ee=function(t,e,o,a){const i=Ue(e.innerX,e.innerWidth,this.series.length,Xe);return T`${this.series.map((r,d)=>{const h=i[d],f=t.values[r.key]??0,_=a>0?f/a*o:0,y=f>0?Math.max(bt,_):0,$=o-y;return T`<rect class="bar" x=${h.x} y=${$} width=${h.width} height=${y} fill=${c(this,l,tt).call(this,r,d)}></rect>`})}`},$t=function(t,e,o){if(this._activeIndex==null||o<=0)return 0;const a=t[this._activeIndex];return a?(this.stacked?a.total:Math.max(...Object.values(a.values),0))/o*e:0},se=function(t,e,o,a){if(this._activeIndex==null||this._focusMode!=="keyboard")return L;const i=t[this._activeIndex];if(!i)return L;const r=c(this,l,$t).call(this,o,e,a),d=Math.max(4,r),h=e-d-2;return T`<rect class="focus-ring" x=${i.innerX-2} y=${h} width=${i.innerWidth+4} height=${d+4} rx="4"></rect>`},ae=function(t){const{bands:e,groups:o,margin:a,innerHeight:i,yMax:r}=t,d=this._activeIndex==null,h=this._activeIndex!=null?o[this._activeIndex]:void 0,f=this._activeIndex!=null?e[this._activeIndex]:void 0,_=c(this,l,ne).call(this,f?a.left+f.innerX+f.innerWidth/2:0,t.width),y=c(this,l,$t).call(this,o,i,r),$=a.top+(i-y),j=$<96;return C`
      <div
        class="tooltip"
        part="tooltip"
        role="tooltip"
        data-position=${j?"below":"above"}
        ?hidden=${d}
        style="left:${_}px; top:${$}px"
      >
        ${h?C`
          <div class="tooltip-title">${c(this,l,et).call(this,h.domain)}</div>
          <ul class="tooltip-rows">
            ${this.series.map((P,pt)=>C`
              <li class="tooltip-row-label">
                <span class="tooltip-swatch" style="background:${c(this,l,tt).call(this,P,pt)}"></span>
                ${c(this,l,F).call(this,P)}
              </li>
              <li class="tooltip-row-value">${c(this,l,W).call(this,h.values[P.key]??0)}</li>
            `)}
            ${this.stacked?C`
              <li class="tooltip-row-label">Total</li>
              <li class="tooltip-row-value">${c(this,l,W).call(this,h.total)}</li>
            `:L}
          </ul>
        `:L}
      </div>
    `},ne=function(t,e){const a=Math.min(qe,Math.max(0,e-xt*2))/2;return a===0?t:Math.min(Math.max(t,a+xt),e-a-xt)},oe=function(){return C`
      <div class="legend" part="legend">
        ${this.series.map((t,e)=>C`
          <span class="legend-item">
            <span class="legend-swatch" style="background:${c(this,l,tt).call(this,t,e)}"></span>
            ${c(this,l,F).call(this,t)}
          </span>
        `)}
      </div>
    `},ie=function(t){return C`
      <div class="sr-only" id="${this.uid}-desc">
        <table>
          <caption>${this.title||"Bar chart data"}</caption>
          <thead>
            <tr>
              <th scope="col">${this.xAxisLabel??String(this.domain)}</th>
              ${this.series.map(e=>C`<th scope="col">${c(this,l,F).call(this,e)}</th>`)}
              ${this.stacked?C`<th scope="col">Total</th>`:L}
            </tr>
          </thead>
          <tbody>
            ${t.map(e=>C`
              <tr>
                <th scope="row">${c(this,l,et).call(this,e.domain)}</th>
                ${this.series.map(o=>C`<td>${c(this,l,W).call(this,e.values[o.key]??0)}</td>`)}
                ${this.stacked?C`<td>${c(this,l,W).call(this,e.total)}</td>`:L}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `},K=function(t){if(this._activeIndex===t||(this._activeIndex=t,t==null))return;const e=c(this,l,st).call(this).groups[t];e&&this.emit("ds-bar-focus",{detail:{groupIndex:t,domainValue:e.domain,values:this.series.map(o=>({key:o.key,label:c(this,l,F).call(this,o),value:e.values[o.key]??0}))}})},rt=new WeakMap,lt=new WeakMap,dt=new WeakMap,ct=new WeakMap,Mt.styles=[...gt.styles,Oe];let w=Mt;E([I({attribute:!1})],w.prototype,"data",void 0);E([I()],w.prototype,"domain",void 0);E([I({attribute:!1})],w.prototype,"series",void 0);E([I({type:Boolean,reflect:!0})],w.prototype,"stacked",void 0);E([I({attribute:"x-axis-label"})],w.prototype,"xAxisLabel",void 0);E([I({attribute:"y-axis-label"})],w.prototype,"yAxisLabel",void 0);E([I()],w.prototype,"title",void 0);E([I({type:Number})],w.prototype,"height",void 0);E([I({type:Boolean,reflect:!0,attribute:"show-legend"})],w.prototype,"showLegend",void 0);E([I({attribute:!1})],w.prototype,"formatValue",void 0);E([I({attribute:!1})],w.prototype,"formatDomain",void 0);E([wt()],w.prototype,"_width",void 0);E([wt()],w.prototype,"_activeIndex",void 0);E([wt()],w.prototype,"_focusMode",void 0);E([jt(".frame")],w.prototype,"_frame",void 0);customElements.get("ds-bar-chart")||customElements.define("ds-bar-chart",w);const He={key:0,class:"stats"},Ze={class:"stat-summary"},Qe={class:"stat-card"},Je={class:"stat-card__value"},ts={class:"stat-card__sub"},es={class:"stat-card"},ss={class:"stat-card__value"},as={class:"stat-card__sub"},ns={class:"stat-card"},os={class:"stat-card__value"},is={class:"stat-card__sub"},rs={class:"stat-card"},ls={class:"stat-card__value"},ds={class:"stat-card__sub"},cs={class:"split"},us=["height","stacked"],hs={class:"player-summary"},ms={class:"player-summary__name"},ps={class:"player-summary__total"},fs={class:"player-summary__avg"},vs=B({__name:"GameSessionMoveDurationChartCard",setup(n){const s=J(),e=me(pe).greaterOrEqual("lg"),o=Z(null),a=v(()=>s.gameSession?.players??[]),i=v(()=>{if(s.gameSession?.status!=="ended")return[];const g=[],p=s.gameSession.currentTurnIndex+1;for(let k=0;k<p;k++){const V={turn:`${k+1}`};for(const Tt of s.gameSession.players){const le=Tt.moves.find(de=>de.turnIndex===k)?.duration??0;V[Tt.id]=Math.floor(le/1e3)}g.push(V)}return g}),r=v(()=>a.value.map(g=>({key:g.id,label:g.name,color:g.color})));function d(g){const p=a.value[g];return p?Math.floor(p.moves.reduce((k,V)=>k+(V.duration??0),0)/1e3):0}function h(g){const p=a.value[g];return!p||p.moves.length===0?0:Math.round(d(g)/p.moves.length)}const f=v(()=>a.value.reduce((g,p,k)=>g+d(k),0)),_=v(()=>a.value.reduce((g,p)=>g+p.moves.length,0)),y=v(()=>_.value===0?0:Math.round(f.value/_.value)),$=v(()=>{let g=0;for(const p of a.value)for(const k of p.moves){const V=Math.floor((k.duration??0)/1e3);V>g&&(g=V)}return g}),j=v(()=>{for(const g of a.value)for(const p of g.moves)if(Math.floor((p.duration??0)/1e3)===$.value&&$.value>0)return g.name;return""}),G=v(()=>s.gameSession?.status!=="ended"?0:s.gameSession.currentTurnIndex+1);function P(g){if(g<=0)return"—";const p=Math.floor(g/60),k=g%60;return p===0?`${k}s`:k===0?`${p}m`:`${p}m ${k.toString().padStart(2,"0")}s`}function pt(){o.value&&(o.value.data=i.value,o.value.series=r.value,o.value.formatValue=g=>P(g))}return Gt(pt),Ot([i,r],pt),(g,p)=>a.value.length?(x(),A("div",He,[u("div",Ze,[u("div",Qe,[p[0]||(p[0]=u("p",{class:"stat-card__label"},"Total time",-1)),u("p",Je,b(P(f.value)),1),u("p",ts,"across "+b(G.value)+" turn"+b(G.value===1?"":"s"),1)]),u("div",es,[p[1]||(p[1]=u("p",{class:"stat-card__label"},"Average move",-1)),u("p",ss,b(P(y.value)),1),u("p",as,b(_.value)+" moves total",1)]),u("div",ns,[p[2]||(p[2]=u("p",{class:"stat-card__label"},"Longest move",-1)),u("p",os,b(P($.value)),1),u("p",is,b(j.value),1)]),u("div",rs,[p[3]||(p[3]=u("p",{class:"stat-card__label"},"Turns",-1)),u("p",ls,b(G.value),1),u("p",ds,"complete turn"+b(G.value===1?"":"s"),1)])]),u("div",cs,[M(It,{elevation:"sm"},{default:S(()=>[p[4]||(p[4]=u("span",{slot:"title"},"Move duration",-1)),u("ds-bar-chart",{ref_key:"chartRef",ref:o,domain:"turn","x-axis-label":"Turn","y-axis-label":"Seconds",height:m(e)?300:240,stacked:!m(e)},null,8,us)]),_:1}),M(It,{elevation:"sm"},{default:S(()=>[p[5]||(p[5]=u("span",{slot:"title"},"Players",-1)),u("ol",hs,[(x(!0),A(kt,null,zt(a.value,(k,V)=>(x(),A("li",{key:k.id},[u("span",{class:"player-summary__dot",style:Rt({background:k.color})},null,4),u("span",ms,b(k.name),1),u("span",ps,b(P(d(V))),1),u("span",fs,"avg "+b(P(h(V))),1)]))),128))])]),_:1})])])):q("",!0)}}),gs=ut(vs,[["__scopeId","data-v-e6ed91cd"]]),_s={key:0,class:"game-session"},ys={class:"player-grid"},bs=B({__name:"GameSessionCard",setup(n){const s=J(),{gameSession:t}=Vt(s),e=Z([]);return(o,a)=>m(t)?(x(),A("div",_s,[u("ul",ys,[(x(!0),A(kt,null,zt(m(t).players,i=>(x(),z(Ce,{ref_for:!0,ref_key:"gameSessionPlayerItemRefs",ref:e,key:i.id,gameSessionPlayer:i,gameSessionStatus:m(t).status},null,8,["gameSessionPlayer","gameSessionStatus"]))),128))]),m(t).status==="ended"?(x(),z(gs,{key:0,class:"chart-card"})):q("",!0),m(t).status!=="ended"?(x(),z(De,{key:1})):q("",!0)])):q("",!0)}}),xs=ut(bs,[["__scopeId","data-v-ae9db9cd"]]),At=n=>typeof n=="boolean"?`${n}`:n===0?"0":n,Bt=fe,$s=(n,s)=>t=>{var e;if(s?.variants==null)return Bt(n,t?.class,t?.className);const{variants:o,defaultVariants:a}=s,i=Object.keys(o).map(h=>{const f=t?.[h],_=a?.[h];if(f===null)return null;const y=At(f)||At(_);return o[h][y]}),r=t&&Object.entries(t).reduce((h,f)=>{let[_,y]=f;return y===void 0||(h[_]=y),h},{}),d=s==null||(e=s.compoundVariants)===null||e===void 0?void 0:e.reduce((h,f)=>{let{class:_,className:y,...$}=f;return Object.entries($).every(j=>{let[G,P]=j;return Array.isArray(P)?P.includes({...a,...r}[G]):{...a,...r}[G]===P})?[...h,_,y]:h},[]);return Bt(n,i,d,t?.class,t?.className)},ks=B({__name:"UiEmpty",props:{class:{}},setup(n){const s=n;return(t,e)=>(x(),A("div",{"data-slot":"empty",class:Y(m(ht)("flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 text-center md:p-12",s.class))},[Q(t.$slots,"default")],2))}}),ws=B({__name:"UiEmptyDescription",props:{class:{}},setup(n){return(s,t)=>(x(),A("p",{"data-slot":"empty-description",class:Y(m(ht)("text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",s.$attrs.class??""))},[Q(s.$slots,"default")],2))}}),Ss=B({__name:"UiEmptyHeader",props:{class:{}},setup(n){return(s,t)=>(x(),A("div",{"data-slot":"empty-header",class:Y(m(ht)("flex max-w-sm flex-col items-center gap-2 text-center",s.$attrs.class??""))},[Q(s.$slots,"default")],2))}}),Ms=["data-variant"],Ts=B({__name:"UiEmptyMedia",props:{class:{},variant:{}},setup(n){const s=n;return(t,e)=>(x(),A("div",{"data-slot":"empty-icon","data-variant":n.variant,class:Y(m(ht)(m(re)({variant:n.variant}),s.class))},[Q(t.$slots,"default")],10,Ms))}}),Cs=["data-variant"],Is=B({__name:"UiEmptyTitle",props:{class:{},variant:{}},setup(n){const s=n;return(t,e)=>(x(),A("div",{"data-slot":"empty-icon","data-variant":n.variant,class:Y(m(ht)(m(re)({variant:n.variant}),s.class))},[Q(t.$slots,"default")],10,Cs))}}),re=$s("mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",{variants:{variant:{default:"bg-transparent",icon:"bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6"}},defaultVariants:{variant:"default"}}),Es=B({__name:"GameSessionEmpty",setup(n){return(s,t)=>(x(),z(m(ks),null,{default:S(()=>[M(m(Ss),null,{default:S(()=>[M(m(Ts),{variant:"icon"},{default:S(()=>[...t[0]||(t[0]=[N("404",-1)])]),_:1}),M(m(Is),null,{default:S(()=>[...t[1]||(t[1]=[N("This game session does not exist",-1)])]),_:1}),M(m(ws),null,{default:S(()=>[...t[2]||(t[2]=[N("We haven't found any game session for the id in the page address. Try a different one!",-1)])]),_:1})]),_:1})]),_:1}))}}),Ps={class:"flex flex-col space-y-3 w-full lg:max-w-[1200px]"},As={class:"space-y-2"},Bs=B({__name:"GameSessionLoading",setup(n){return(s,t)=>(x(),A("div",Ps,[M(m(yt),{class:"h-[30svh] w-full rounded-xl"}),u("div",As,[M(m(yt),{class:"h-[5svh] w-full"}),M(m(yt),{class:"h-[5svh] w-4/5"})])]))}}),Ls={class:"session-header"},Gs={class:"session-header__title"},Rs={class:"session-header__meta"},Ds={class:"session-header__sub"},Os=B({__name:"GameSessionView",setup(n){const s=ue(),t=J(),{gameSession:e,loadingGameSession:o}=Vt(t);async function a(){const i=s.params.id;i&&await t.getGameSessionById(i)}return Ot(()=>s.params.id,a,{immediate:!0}),(i,r)=>(x(),z(ve,null,he({default:S(()=>[m(o)?(x(),z(Bs,{key:0})):m(e)?(x(),z(xs,{key:1})):(x(),z(Es,{key:2}))]),_:2},[m(e)?{name:"header",fn:S(()=>[u("div",Ls,[u("h1",Gs,b(m(e).name),1),u("div",Rs,[M(_e,{status:m(e).status},null,8,["status"]),u("span",Ds,[u("span",null,b(m(e).game),1),r[0]||(r[0]=u("span",{class:"session-header__dot"},null,-1)),u("span",null,"Turn "+b(m(e).currentTurnIndex+1),1),r[1]||(r[1]=u("span",{class:"session-header__dot"},null,-1)),u("span",null,"Move "+b(m(e).currentMoveIndex+1),1),r[2]||(r[2]=u("span",{class:"session-header__dot"},null,-1)),u("span",null,b(m(e).players.length)+" players",1)])])])]),key:"0"}:void 0]),1024))}}),Fs=ut(Os,[["__scopeId","data-v-ae3f50be"]]);export{Fs as default};
