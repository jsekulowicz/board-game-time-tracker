var T=o=>{throw TypeError(o)};var z=(o,e,t)=>e.has(o)||T("Cannot "+t);var d=(o,e,t)=>(z(o,e,"read from private field"),t?t.call(o):e.get(o)),c=(o,e,t)=>e.has(o)?T("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,t),h=(o,e,t,a)=>(z(o,e,"write to private field"),a?a.call(o,t):e.set(o,t),t);import{h as N,b as w}from"./utils-Hb4QJKja.js";import{i as S,D as C,h as A,n as E,j as k,k as f,a1 as b,Y as p,o as v}from"./index-RCJLMDGl.js";function H(o,e){return(t,a,l)=>{const s=i=>i.renderRoot?.querySelector(o)??null;return N(t,a,{get(){return s(this)}})}}const F=S`
  :host {
    display: block;
    container-type: inline-size;
  }
  .card {
    display: flex;
    flex-direction: column;
    gap: var(--ds-space-4);
    padding: var(--ds-space-6);
    border: 1px solid var(--ds-color-border);
    border-radius: var(--ds-radius-sm);
    background: var(--ds-color-bg);
    color: var(--ds-color-fg);
    transition: border-color var(--ds-duration-normal) var(--ds-easing-standard),
      transform var(--ds-duration-normal) var(--ds-easing-standard);
  }
  :host([elevation='sm']) .card {
    box-shadow: var(--ds-shadow-sm);
  }
  :host([elevation='md']) .card {
    box-shadow: var(--ds-shadow-md);
  }
  :host([interactive]) .card {
    cursor: pointer;
  }
  :host([interactive]) .card:hover {
    border-color: var(--ds-color-fg-subtle);
    transform: translateY(-1px);
  }
  :host([orientation='horizontal']) .card {
    flex-direction: row;
    align-items: center;
  }
  :host([orientation='horizontal']) .body {
    flex: 1;
  }
  @container (max-width: 360px) {
    :host([orientation='horizontal']) .card {
      flex-direction: column;
      align-items: stretch;
    }
    :host([orientation='horizontal']) .body {
      flex: unset;
    }
  }
  .header {
    display: flex;
    flex-direction: column;
    gap: var(--ds-space-1);
  }
  [hidden] {
    display: none;
  }
  ::slotted([slot='actions']) {
    display: flex;
    gap: var(--ds-space-2);
    flex-wrap: wrap;
  }
  ::slotted([slot='title']) {
    font-family: var(--ds-font-display);
    font-size: var(--ds-font-size-xl);
    font-weight: var(--ds-font-weight-semibold);
    letter-spacing: var(--ds-letter-spacing-display);
    margin: 0;
  }
  ::slotted([slot='eyebrow']) {
    font-size: var(--ds-font-size-2xs);
    letter-spacing: var(--ds-letter-spacing-wide);
    text-transform: uppercase;
    color: var(--ds-color-accent);
  }
`;var n=function(o,e,t,a){var l=arguments.length,s=l<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(o,e,t,a);else for(var $=o.length-1;$>=0;$--)(i=o[$])&&(s=(l<3?i(s):l>3?i(e,t,s):i(e,t))||s);return l>3&&s&&Object.defineProperty(e,t,s),s},u,m,y,g;const x=class x extends C{constructor(){super(...arguments);c(this,u);c(this,m);c(this,y);c(this,g);this.elevation="none",this.orientation="vertical",this.interactive=!1,this._hasEyebrow=!1,this._hasTitle=!1,this._hasActions=!1,this._hasFooter=!1,h(this,u,t=>{this._hasEyebrow=_(t.target)}),h(this,m,t=>{this._hasTitle=_(t.target)}),h(this,y,t=>{this._hasActions=_(t.target)}),h(this,g,t=>{this._hasFooter=_(t.target)})}render(){const t=this._hasEyebrow||this._hasTitle;return A`<article class="card" part="card">
      <header class="header" ?hidden=${!t}>
        <slot name="eyebrow" @slotchange=${d(this,u)}></slot>
        <slot name="title" @slotchange=${d(this,m)}></slot>
      </header>
      <div class="body" part="body"><slot></slot></div>
      <div class="actions" ?hidden=${!this._hasActions}>
        <slot name="actions" @slotchange=${d(this,y)}></slot>
      </div>
      <footer ?hidden=${!this._hasFooter}>
        <slot name="footer" @slotchange=${d(this,g)}></slot>
      </footer>
    </article>`}};u=new WeakMap,m=new WeakMap,y=new WeakMap,g=new WeakMap,x.styles=[...C.styles,F];let r=x;n([E({reflect:!0})],r.prototype,"elevation",void 0);n([E({reflect:!0})],r.prototype,"orientation",void 0);n([E({type:Boolean,reflect:!0})],r.prototype,"interactive",void 0);n([w()],r.prototype,"_hasEyebrow",void 0);n([w()],r.prototype,"_hasTitle",void 0);n([w()],r.prototype,"_hasActions",void 0);n([w()],r.prototype,"_hasFooter",void 0);function _(o){return o.assignedNodes({flatten:!0}).some(t=>t.nodeType===Node.ELEMENT_NODE?!0:t.nodeType===Node.TEXT_NODE?(t.textContent??"").trim().length>0:!1)}customElements.get("ds-card")||customElements.define("ds-card",r);const O=["elevation","orientation","interactive"],j={key:0,slot:"eyebrow"},B={key:1,slot:"title"},D={key:2,slot:"actions"},R={key:3,slot:"footer"},L=k({__name:"DsCard",props:{elevation:{default:"sm"},orientation:{default:"vertical"},interactive:{type:Boolean}},setup(o){return(e,t)=>(v(),f("ds-card",{elevation:o.elevation,orientation:o.orientation,interactive:o.interactive},[e.$slots.eyebrow?(v(),f("span",j,[p(e.$slots,"eyebrow")])):b("",!0),e.$slots.title?(v(),f("span",B,[p(e.$slots,"title")])):b("",!0),p(e.$slots,"default"),e.$slots.actions?(v(),f("div",D,[p(e.$slots,"actions")])):b("",!0),e.$slots.footer?(v(),f("div",R,[p(e.$slots,"footer")])):b("",!0)],8,O))}});export{L as _,H as e};
