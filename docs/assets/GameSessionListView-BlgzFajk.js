var it=n=>{throw TypeError(n)};var W=(n,a,t)=>a.has(n)||it("Cannot "+t);var _=(n,a,t)=>(W(n,a,"read from private field"),t?t.call(n):a.get(n)),k=(n,a,t)=>a.has(n)?it("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(n):a.set(n,t),O=(n,a,t,s)=>(W(n,a,"write to private field"),s?s.call(n,t):a.set(n,t),t),p=(n,a,t)=>(W(n,a,"access private method"),t);import{r as pt,u as Rt,_ as ht,a as jt,B as Bt}from"./utils-CmjqPxpP.js";import{i as st,D as j,A as $,h as g,n as b,w as Z,j as ot,k as y,l as z,F as R,m as V,u as Q,o as m,p as Et,c as Y,r as lt,q as gt,s as r,v as w,x as ct,y as Lt,z as X,B as Ot}from"./index-G8nP4pVp.js";import{_ as dt,a as ut}from"./GameSessionStatusTag.vue_vue_type_script_setup_true_lang-DvBv83W8.js";import{u as Vt}from"./plus-Bdw-hHYZ.js";import{R as mt}from"./index-BfGq0til.js";pt("puzzle-piece",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" /></svg>');pt("users",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>');const At=st`
  :host {
    display: block;
    width: 100%;
    color: var(--ds-color-fg);
    font-family: var(--ds-font-body);
    font-size: var(--ds-font-size-sm);
  }

  .toolbar {
    padding: var(--ds-space-3) 0;
  }
  .toolbar:empty {
    display: none;
  }

  .scroll {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--ds-color-border-subtle);
    border-radius: var(--ds-radius-md);
    background: var(--ds-color-bg);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  caption {
    caption-side: top;
    padding: var(--ds-space-3);
    color: var(--ds-color-fg-muted);
    text-align: left;
  }
  caption:empty {
    display: none;
    padding: 0;
  }

  thead th {
    background: var(--ds-color-bg-subtle);
    color: var(--ds-color-fg);
    font-weight: var(--ds-font-weight-medium);
    padding: var(--ds-space-3);
    border-bottom: 1px solid var(--ds-color-border);
    white-space: nowrap;
  }

  tbody td {
    padding: var(--ds-space-3);
    border-bottom: 1px solid var(--ds-color-border-subtle);
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  tbody tr:nth-child(even) td {
    background: var(--ds-color-bg-subtle);
  }

  .align-left { text-align: left; }
  .align-right { text-align: right; }
  .align-center { text-align: center; }

  tbody tr.clickable {
    cursor: pointer;
    outline: none;
  }
  tbody tr.clickable:hover td {
    background: var(--ds-color-bg-muted);
  }
  tbody tr.clickable:focus-visible {
    box-shadow: inset 0 0 0 2px var(--ds-color-focus);
  }

  .empty {
    padding: var(--ds-space-6);
    text-align: center;
    color: var(--ds-color-fg-muted);
  }

  .footer {
    padding: var(--ds-space-3) 0;
  }
  .footer:empty {
    display: none;
  }
`;var H=function(n,a,t,s){var e=arguments.length,o=e<3?a:s===null?s=Object.getOwnPropertyDescriptor(a,t):s,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,a,t,s);else for(var u=n.length-1;u>=0;u--)(l=n[u])&&(o=(e<3?l(o):e>3?l(a,t,o):l(a,t))||o);return e>3&&o&&Object.defineProperty(a,t,o),o};const Gt=new Set(["a","button","input","select","textarea","label","ds-button","ds-link","ds-checkbox","ds-radio","ds-select","ds-searchable-select","ds-text-field","ds-table-sort-button","ds-table-pagination"]);var D,T,f,ft,bt,vt,_t,yt,wt;const at=class at extends j{constructor(){super(...arguments);k(this,f);k(this,D);k(this,T);this.rows=[],this.columns=[],this.sortState=null,this.clickableRows=!1,O(this,D,(t,s,e)=>{p(this,f,ft).call(this,t)||this.emit("ds-row-click",{detail:{row:s,index:e}})}),O(this,T,(t,s,e)=>{t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),this.emit("ds-row-click",{detail:{row:s,index:e}}))})}render(){return g`
      <div class="toolbar" part="toolbar"><slot name="toolbar"></slot></div>
      <div class="scroll">
        <table part="table">
          <caption part="caption"><slot name="caption"></slot></caption>
          <colgroup>
            ${this.columns.map(t=>g`<col style=${t.width?`width: ${t.width}`:""} />`)}
          </colgroup>
          <thead part="thead">
            <tr>${this.columns.map(t=>p(this,f,_t).call(this,t))}</tr>
          </thead>
          <tbody part="tbody">${p(this,f,wt).call(this)}</tbody>
        </table>
      </div>
      <div class="footer" part="footer"><slot name="footer"></slot></div>
    `}};D=new WeakMap,T=new WeakMap,f=new WeakSet,ft=function(t){const s=t.composedPath();for(const e of s){if(!(e instanceof Element))continue;if(e.tagName==="TR")return!1;const o=e.tagName.toLowerCase();if(Gt.has(o)||e.getAttribute("role")==="button")return!0}return!1},bt=function(t){if(t.sortable)return this.sortState?.name!==t.name||!this.sortState.direction?"none":this.sortState.direction==="asc"?"ascending":"descending"},vt=function(t,s,e){if(t.render)return t.render(s,e);const o=s[t.field];return o==null?"":String(o)},_t=function(t){const s=t.align??"left";return g`
      <th
        part="header-cell"
        scope="col"
        class=${`align-${s}`}
        aria-sort=${p(this,f,bt).call(this,t)??$}
      >
        <slot name=${`header-${t.name}`}>${t.label}</slot>
      </th>
    `},yt=function(t,s){const e=this.clickableRows;return g`
      <tr
        part=${e?"row row-clickable":"row"}
        class=${e?"clickable":""}
        role=${e?"button":$}
        tabindex=${e?0:$}
        @click=${e?o=>_(this,D).call(this,o,t,s):$}
        @keydown=${e?o=>_(this,T).call(this,o,t,s):$}
      >
        ${this.columns.map(o=>g`
          <td part="cell" class=${`align-${o.align??"left"}`}>
            ${p(this,f,vt).call(this,o,t,s)}
          </td>
        `)}
      </tr>
    `},wt=function(){return this.rows.length===0?g`
        <tr>
          <td part="empty" class="empty" colspan=${this.columns.length||1}>
            <slot name="empty">No data</slot>
          </td>
        </tr>
      `:g`${this.rows.map((t,s)=>p(this,f,yt).call(this,t,s))}`},at.styles=[...j.styles,At];let S=at;H([b({attribute:!1})],S.prototype,"rows",void 0);H([b({attribute:!1})],S.prototype,"columns",void 0);H([b({attribute:!1})],S.prototype,"sortState",void 0);H([b({type:Boolean,reflect:!0,attribute:"clickable-rows"})],S.prototype,"clickableRows",void 0);H([b({attribute:"row-key"})],S.prototype,"rowKey",void 0);const It=st`
  :host {
    display: inline-flex;
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-space-1);
    background: transparent;
    color: inherit;
    border: 0;
    padding: 0;
    font: inherit;
    cursor: pointer;
    border-radius: var(--ds-radius-sm);
  }
  button:focus-visible {
    outline: 2px solid var(--ds-color-focus);
    outline-offset: 2px;
  }
  button:hover {
    color: var(--ds-color-accent);
  }

  .icon {
    display: inline-flex;
    width: 1em;
    height: 1em;
    color: var(--ds-color-fg-muted);
  }
  :host([direction]) .icon {
    color: var(--ds-color-accent);
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;var xt=function(n,a,t,s){var e=arguments.length,o=e<3?a:s===null?s=Object.getOwnPropertyDescriptor(a,t):s,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,a,t,s);else for(var u=n.length-1;u>=0;u--)(l=n[u])&&(o=(e<3?l(o):e>3?l(a,t,o):l(a,t))||o);return e>3&&o&&Object.defineProperty(a,t,o),o};const Dt=Z`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 6l3-3 3 3"/><path d="M5 10l3 3 3-3"/></svg>`,Tt=Z`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10l4-4 4 4"/></svg>`,Ft=Z`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>`;function Ut(n){return n===null?"asc":n==="asc"?"desc":null}var F,B,$t,kt;const rt=class rt extends j{constructor(){super(...arguments);k(this,B);k(this,F);this.direction=null,O(this,F,()=>{const t=Ut(this.direction);this.emit("ds-sort",{detail:{direction:t}})})}render(){return g`
      <button
        part="button"
        type="button"
        aria-label=${p(this,B,kt).call(this)}
        aria-pressed=${this.direction!==null?"true":"false"}
        @click=${_(this,F)}
      >
        <slot></slot>
        <span class="icon" part="icon">${p(this,B,$t).call(this)}</span>
      </button>
    `}};F=new WeakMap,B=new WeakSet,$t=function(){return this.direction==="asc"?Tt:this.direction==="desc"?Ft:Dt},kt=function(){const t=this.column?`Sort by ${this.column}`:"Sort";return this.direction==="asc"?`${t} (ascending)`:this.direction==="desc"?`${t} (descending)`:t},rt.styles=[...j.styles,It];let I=rt;xt([b({reflect:!0})],I.prototype,"direction",void 0);xt([b()],I.prototype,"column",void 0);const Zt=st`
  :host {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: var(--ds-space-4);
    row-gap: var(--ds-space-3);
    flex-wrap: wrap;
    color: var(--ds-color-fg);
    font-family: var(--ds-font-body);
    font-size: var(--ds-font-size-sm);
  }

  nav {
    display: flex;
    align-items: center;
    gap: var(--ds-space-1);
  }

  .list {
    display: flex;
    align-items: center;
    gap: var(--ds-space-1);
    list-style: none;
    padding: 0;
    margin: 0;
  }

  button {
    min-width: 2rem;
    height: 2rem;
    padding: 0 var(--ds-space-2);
    background: transparent;
    color: var(--ds-color-fg);
    border: 1px solid var(--ds-color-border);
    border-radius: var(--ds-radius-sm);
    font: inherit;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--ds-space-1);
  }
  button:hover:not(:disabled) {
    background: var(--ds-color-bg-muted);
  }
  button:focus-visible {
    outline: 2px solid var(--ds-color-focus);
    outline-offset: 2px;
  }
  button:disabled {
    color: var(--ds-color-fg-subtle);
    cursor: not-allowed;
    opacity: 0.6;
  }
  button[aria-current="page"] {
    background: var(--ds-color-accent);
    color: var(--ds-color-accent-fg);
    border-color: var(--ds-color-accent);
  }

  .ellipsis {
    display: inline-flex;
    min-width: 2rem;
    justify-content: center;
    color: var(--ds-color-fg-muted);
  }

  .size {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-space-2);
    color: var(--ds-color-fg-muted);
  }

  select {
    padding: var(--ds-space-1) var(--ds-space-2);
    background: var(--ds-color-bg);
    color: var(--ds-color-fg);
    border: 1px solid var(--ds-color-border);
    border-radius: var(--ds-radius-sm);
    font: inherit;
  }

  .summary {
    color: var(--ds-color-fg-muted);
  }

  svg {
    width: 1em;
    height: 1em;
  }
`;function Ht({totalPages:n,currentPage:a,maxVisiblePages:t,siblingCount:s}){const e=Math.max(1,Math.floor(n)),o=Kt(Math.floor(a),1,e),l=Math.max(0,Math.floor(s)),u=Math.max(5,Math.floor(t));if(e<=u)return J(1,e);const M=Math.max(o-l,2),K=Math.min(o+l,e-1),E=M>3,L=K<e-2;if(!E&&L){const P=Math.max(3+2*l,u-2),N=Math.min(P,e-1);return[...J(1,N),"ellipsis-end",e]}if(E&&!L){const P=Math.max(3+2*l,u-2),N=Math.max(e-P+1,2);return[1,"ellipsis-start",...J(N,e)]}return[1,"ellipsis-start",...J(M,K),"ellipsis-end",e]}function Kt(n,a,t){return Math.min(Math.max(n,a),t)}function J(n,a){const t=Math.max(0,a-n+1);return Array.from({length:t},(s,e)=>n+e)}var C=function(n,a,t,s){var e=arguments.length,o=e<3?a:s===null?s=Object.getOwnPropertyDescriptor(a,t):s,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,a,t,s);else for(var u=n.length-1;u>=0;u--)(l=n[u])&&(o=(e<3?l(o):e>3?l(a,t,o):l(a,t))||o);return e>3&&o&&Object.defineProperty(a,t,o),o};const qt=Z`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 4l-4 4 4 4"/></svg>`,Xt=Z`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4l4 4-4 4"/></svg>`;var i,A,G,tt,U,St,zt,Ct,et,Mt,Pt;const nt=class nt extends j{constructor(){super(...arguments);k(this,i);k(this,U);this.page=1,this.pageSize=10,this.total=0,this.maxVisiblePages=7,this.siblingCount=1,this.hidePageNumbers=!1,O(this,U,t=>{const s=Number(t.target.value);if(!Number.isFinite(s)||s<=0)return;const e=(_(this,i,G)-1)*this.pageSize+1,o=Math.max(1,Math.ceil(e/s));this.emit("ds-page-size-change",{detail:{pageSize:s,page:o}})})}render(){const t=_(this,i,G),s=_(this,i,A),e=t<=1,o=t>=s;return g`
      ${p(this,i,Pt).call(this,t)}
      <nav part="nav" aria-label="Pagination">
        ${p(this,i,et).call(this,qt,"Previous page","button-prev",t-1,e,"prev-label","Previous")}
        ${this.hidePageNumbers?g`<span class="ellipsis">Page ${t} of ${s}</span>`:g`<ul class="list" part="list">${p(this,i,St).call(this).map(l=>p(this,i,Ct).call(this,l,t))}</ul>`}
        ${p(this,i,et).call(this,Xt,"Next page","button-next",t+1,o,"next-label","Next")}
        ${p(this,i,Mt).call(this)}
      </nav>
    `}};i=new WeakSet,A=function(){return Math.max(1,Math.ceil(this.total/Math.max(1,this.pageSize)))},G=function(){return Math.min(Math.max(1,this.page),_(this,i,A))},tt=function(t){const s=_(this,i,A),e=Math.min(Math.max(1,t),s);e!==_(this,i,G)&&this.emit("ds-page-change",{detail:{page:e,pageSize:this.pageSize}})},U=new WeakMap,St=function(){return Ht({totalPages:_(this,i,A),currentPage:_(this,i,G),maxVisiblePages:this.maxVisiblePages,siblingCount:this.siblingCount})},zt=function(t,s){const e=t===s;return g`
      <li part=${e?"item item-current":"item"}>
        <button
          part="button"
          type="button"
          aria-label=${`Page ${t}`}
          aria-current=${e?"page":$}
          @click=${()=>p(this,i,tt).call(this,t)}
        >${t}</button>
      </li>
    `},Ct=function(t,s){return t==="ellipsis-start"||t==="ellipsis-end"?g`<li part="item item-ellipsis" class="ellipsis" aria-hidden="true">…</li>`:p(this,i,zt).call(this,t,s)},et=function(t,s,e,o,l,u,M){return g`
      <button
        part=${`button ${e}`}
        type="button"
        aria-label=${s}
        ?disabled=${l}
        @click=${()=>p(this,i,tt).call(this,o)}
      >
        ${e==="button-prev"?t:$}
        <slot name=${u}>${M}</slot>
        ${e==="button-next"?t:$}
      </button>
    `},Mt=function(){return this.pageSizeOptions?.length?g`
      <div class="size" part="size-selector">
        <label>Rows per page
          <select aria-label="Rows per page" .value=${String(this.pageSize)} @change=${_(this,U)}>
            ${this.pageSizeOptions.map(t=>g`<option value=${t} ?selected=${t===this.pageSize}>${t}</option>`)}
          </select>
        </label>
      </div>
    `:$},Pt=function(t){const s=this.total===0?0:(t-1)*this.pageSize+1,e=Math.min(t*this.pageSize,this.total),o=this.total===0?"No results":`Showing ${s}–${e} of ${this.total}`;return g`<div class="summary" part="summary" role="status" aria-live="polite"><slot name="summary">${o}</slot></div>`},nt.styles=[...j.styles,Zt];let x=nt;C([b({type:Number,reflect:!0})],x.prototype,"page",void 0);C([b({type:Number,reflect:!0,attribute:"page-size"})],x.prototype,"pageSize",void 0);C([b({type:Number,reflect:!0})],x.prototype,"total",void 0);C([b({attribute:!1})],x.prototype,"pageSizeOptions",void 0);C([b({type:Number,reflect:!0,attribute:"max-visible-pages"})],x.prototype,"maxVisiblePages",void 0);C([b({type:Number,reflect:!0,attribute:"sibling-count"})],x.prototype,"siblingCount",void 0);C([b({type:Boolean,reflect:!0,attribute:"hide-page-numbers"})],x.prototype,"hidePageNumbers",void 0);customElements.get("ds-table")||customElements.define("ds-table",S);customElements.get("ds-table-sort-button")||customElements.define("ds-table-sort-button",I);customElements.get("ds-table-pagination")||customElements.define("ds-table-pagination",x);const Jt={class:"flex flex-col space-y-3 w-full lg:max-w-[1200px]"},Qt=ot({__name:"GameSessionListTableLoading",setup(n){return(a,t)=>(m(),y("div",Jt,[(m(),y(R,null,V(5,s=>z(Q(dt),{key:`gs-table-placeholder-${s}`,class:"h-[5svh] w-full"})),64)),z(Q(dt),{class:"h-[5svh] w-4/5"})]))}}),Wt={key:1,class:"empty"},Yt={class:"cards"},te=["onClick"],ee={class:"card__body"},se={class:"card__head"},oe={class:"card__game"},ae={class:"card__name"},re={class:"card__meta"},ne={class:"card__players"},ie={class:"card__player-count"},le={class:"card__total numeric"},ce={class:"card__updated"},de={class:"table-wrap"},ue={class:"table"},pe=["onClick"],he={class:"cell-game"},ge={class:"cell-game__title"},me={class:"cell-game__sub"},fe={class:"align-center"},be={class:"align-right"},ve={class:"cell-players"},_e={class:"card__players"},ye={class:"card__player-count"},we={class:"col-updated numeric"},xe={class:"align-right numeric"},$e={colspan:"5",class:"table-footer"},ke=[".page",".page-size",".total"],Se=ot({__name:"GameSessionListCard",setup(n){const a=Vt(),t=Et();a.getGameSessionList();const s=Y(()=>a.gameSessions),e=lt(1),o=lt(10),l=Y(()=>s.value.length),u=Y(()=>{const h=(e.value-1)*o.value;return s.value.slice(h,h+o.value)});function M(h){const d=h.detail;e.value=d.page,o.value=d.pageSize}function K(h){const d=h.detail;o.value=d.pageSize,e.value=d.page}function E(h){t.push({name:mt.GameSession,params:{id:h}})}function L(h){return h.players.reduce((d,c)=>{const v=c.moves.reduce((q,Nt)=>q+(Nt.duration??0),0);return d+v+(c.previousTotalTimeMs??0)},0)}function P(h){if(h<=0)return"—";const d=Math.round(h/1e3),c=Math.floor(d/3600),v=Math.floor(d%3600/60),q=d%60;return c>0?`${c}h ${v}m`:v>0?`${v}m ${q.toString().padStart(2,"0")}s`:`${q}s`}function N(h){return Rt(h.updatedAt||h.createdAt).value}return(h,d)=>Q(a).loadingGameSessions?(m(),gt(Qt,{key:0})):s.value.length===0?(m(),y("div",Wt,[...d[0]||(d[0]=[r("ds-icon",{class:"empty__icon",name:"puzzle-piece",size:"lg"},null,-1),r("h3",null,"No sessions yet",-1),r("p",null,"Start tracking turn times by creating your first session.",-1)])])):(m(),y(R,{key:2},[r("ul",Yt,[(m(!0),y(R,null,V(u.value,c=>(m(),y("li",{key:c.id},[r("button",{class:"card",type:"button",onClick:v=>E(c.id)},[d[1]||(d[1]=r("span",{class:"card__icon"},[r("ds-icon",{name:"puzzle-piece",size:"lg"})],-1)),r("span",ee,[r("span",se,[r("span",oe,w(c.game),1),z(ut,{status:c.status},null,8,["status"])]),r("span",ae,w(c.name),1),r("span",re,[r("span",ne,[(m(!0),y(R,null,V(c.players,v=>(m(),y("span",{key:v.id,class:"card__player-dot",style:ct({background:v.color})},null,4))),128)),r("span",ie,w(c.players.length),1)]),r("span",le,w(P(L(c))),1),r("span",ce,w(N(c)),1)])]),d[2]||(d[2]=r("ds-icon",{class:"card__chevron",name:"chevron-right",size:"md"},null,-1))],8,te)]))),128))]),r("div",de,[r("table",ue,[d[4]||(d[4]=r("thead",null,[r("tr",null,[r("th",null,"Game"),r("th",{class:"align-center"},"Status"),r("th",{class:"align-right"},"Players"),r("th",{class:"col-updated"},"Updated"),r("th",{class:"align-right"},"Duration")])],-1)),r("tbody",null,[(m(!0),y(R,null,V(u.value,c=>(m(),y("tr",{key:c.id,onClick:v=>E(c.id)},[r("td",null,[r("div",he,[d[3]||(d[3]=r("span",{class:"cell-game__icon"},[r("ds-icon",{name:"puzzle-piece",size:"md"})],-1)),r("div",null,[r("div",ge,w(c.game),1),r("p",me,w(c.name),1)])])]),r("td",fe,[z(ut,{status:c.status},null,8,["status"])]),r("td",be,[r("span",ve,[r("span",_e,[(m(!0),y(R,null,V(c.players,v=>(m(),y("span",{key:v.id,class:"card__player-dot",style:ct({background:v.color})},null,4))),128))]),r("span",ye,w(c.players.length),1)])]),r("td",we,w(N(c)),1),r("td",xe,w(P(L(c))),1)],8,pe))),128))]),r("tfoot",null,[r("tr",null,[r("td",$e,[r("ds-table-pagination",{".page":e.value,".page-size":o.value,".total":l.value,onDsPageChange:M,onDsPageSizeChange:K},null,40,ke)])])])])])],64))}}),ze=ht(Se,[["__scopeId","data-v-1cccd07c"]]),Ce={class:"page-toolbar"},Me={class:"title"},Pe=ot({__name:"GameSessionListView",setup(n){return(a,t)=>{const s=Lt("RouterLink");return m(),gt(Bt,null,{header:X(({pageTitle:e})=>[r("div",Ce,[r("h1",Me,w(e),1),z(s,{to:{name:Q(mt).GameSessionAdd},custom:""},{default:X(({navigate:o})=>[z(jt,{variant:"primary",size:"sm",onClick:()=>o()},{default:X(()=>[...t[0]||(t[0]=[r("ds-icon",{slot:"leading",name:"plus",size:"md"},null,-1),Ot(" New session ",-1)])]),_:1},8,["onClick"])]),_:1},8,["to"])])]),default:X(()=>[z(ze)]),_:1})}}}),Oe=ht(Pe,[["__scopeId","data-v-746e361f"]]);export{Oe as default};
