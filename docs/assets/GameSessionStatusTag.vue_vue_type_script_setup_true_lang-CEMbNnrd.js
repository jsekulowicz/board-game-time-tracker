import{c as b}from"./utils-Hb4QJKja.js";import{j as u,k as f,Z as v,u as m,o as i,i as _,D as g,h,n as x,c as l,Y as y,q as w,z as S,B as k,v as T}from"./index-RCJLMDGl.js";const P=u({__name:"UiSkeleton",props:{class:{}},setup(t){const e=t;return(s,r)=>(i(),f("div",{"data-slot":"skeleton",class:v(m(b)("animate-pulse rounded-md bg-primary/10",e.class))},null,2))}}),E=_`
  :host {
    display: inline-flex;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-space-1);
    padding: 2px var(--ds-space-2);
    border-radius: var(--ds-radius-xs);
    font-family: var(--ds-font-body);
    font-size: var(--ds-font-size-2xs);
    font-weight: var(--ds-font-weight-medium);
    letter-spacing: var(--ds-letter-spacing-wide);
    text-transform: uppercase;
    line-height: 1.2;
    background: var(--ds-color-bg-subtle);
    color: var(--ds-color-fg);
    border: 1px solid var(--ds-color-border);
  }
  :host([tone='accent']) .badge {
    background: var(--ds-color-accent-subtle);
    color: var(--ds-color-accent-active);
    border-color: transparent;
  }
  :host([tone='success']) .badge {
    background: var(--ds-color-success-subtle);
    color: var(--ds-color-success);
    border-color: transparent;
  }
  :host([tone='warning']) .badge {
    background: var(--ds-color-warning-subtle);
    color: var(--ds-color-warning);
    border-color: transparent;
  }
  :host([tone='danger']) .badge {
    background: var(--ds-color-danger-subtle);
    color: var(--ds-color-danger);
    border-color: transparent;
  }
`;var j=function(t,e,s,r){var n=arguments.length,a=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,s):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(t,e,s,r);else for(var d=t.length-1;d>=0;d--)(o=t[d])&&(a=(n<3?o(a):n>3?o(e,s,a):o(e,s))||a);return n>3&&a&&Object.defineProperty(e,s,a),a};const p=class p extends g{constructor(){super(...arguments),this.tone="neutral"}render(){return h`<span class="badge" part="badge"><slot></slot></span>`}};p.styles=[...g.styles,E];let c=p;j([x({reflect:!0})],c.prototype,"tone",void 0);customElements.get("ds-badge")||customElements.define("ds-badge",c);const z=["tone"],C=u({__name:"CardStatusTag",props:{variant:{}},setup(t){const e=t,s=l(()=>{switch(e.variant){case"active":return"success";case"inactive":return"neutral";case"paused":return"warning";case"ended":return"accent";default:return"accent"}});return(r,n)=>(i(),f("ds-badge",{tone:s.value},[y(r.$slots,"default")],8,z))}}),$=u({__name:"GameSessionStatusTag",props:{status:{}},setup(t){const e=t,s=l(()=>{switch(e.status){case"in_progress":return"active";case"paused":return"paused";case"ready_to_track":return"inactive";case"ended":default:return"ended"}}),r=l(()=>{switch(e.status){case"in_progress":return"In progress";case"paused":return"Paused";case"ready_to_track":return"Ready";case"ended":default:return"Ended"}});return(n,a)=>(i(),w(C,{variant:s.value},{default:S(()=>[k(T(r.value),1)]),_:1},8,["variant"]))}});export{P as _,$ as a,C as b};
