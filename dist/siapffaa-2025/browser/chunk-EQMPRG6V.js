import{a as Ot}from"./chunk-M763EXIE.js";import{a as ht}from"./chunk-QE2BREUU.js";import{a as St,b as gt,c as M,d as h,e as p,f as Lt}from"./chunk-JPTHL2WT.js";import{B as Mt,C as Nt,E as pt,H as Ft,L as G,O as At,b as Q,d as F,ea as zt,fa as x,la as _,m as Pt,q as et,t as A,y as bt}from"./chunk-VAG7FTYF.js";import{e as Bt,h as Tt,i as Et,l as U,m as nt}from"./chunk-FIATBDAH.js";import{Ab as $,Ca as b,Cb as R,Db as H,Eb as st,Fb as It,Ha as q,Hb as wt,Ia as Ct,Ib as J,K as k,Kb as y,L as w,Lb as K,Mb as tt,N as D,P as i,Sa as v,Ta as B,Ua as C,Vb as m,W as N,Wa as u,Xa as T,Y as mt,Ya as E,Yb as lt,cb as S,fa as l,ga as vt,ib as d,jb as it,ka as yt,kb as rt,lb as j,mb as at,mc as ut,nb as dt,nc as P,ob as V,oc as g,pb as Y,pc as ct,qb as Z,rb as kt,tb as xt,vc as a,wb as _t,wc as Dt,xb as f,yb as W,zb as X}from"./chunk-XJSKPFVT.js";var jt=(()=>{class t extends h{autofocus=!1;focused=!1;platformId=i(yt);document=i(mt);host=i(vt);onAfterContentChecked(){this.autofocus===!1?this.host.nativeElement.removeAttribute("autofocus"):this.host.nativeElement.setAttribute("autofocus",!0),this.focused||this.autoFocus()}onAfterViewChecked(){this.focused||this.autoFocus()}autoFocus(){nt(this.platformId)&&this.autofocus&&setTimeout(()=>{let n=Ot.getFocusableElements(this.host?.nativeElement);n.length===0&&this.host.nativeElement.focus(),n.length>0&&n[0].focus(),this.focused=!0})}static \u0275fac=(()=>{let n;return function(e){return(n||(n=l(t)))(e||t)}})();static \u0275dir=C({type:t,selectors:[["","pAutoFocus",""]],inputs:{autofocus:[0,"pAutoFocus","autofocus"]},features:[u]})}return t})();var Vt=`
    .p-badge {
        display: inline-flex;
        border-radius: dt('badge.border.radius');
        align-items: center;
        justify-content: center;
        padding: dt('badge.padding');
        background: dt('badge.primary.background');
        color: dt('badge.primary.color');
        font-size: dt('badge.font.size');
        font-weight: dt('badge.font.weight');
        min-width: dt('badge.min.width');
        height: dt('badge.height');
    }

    .p-badge-dot {
        width: dt('badge.dot.size');
        min-width: dt('badge.dot.size');
        height: dt('badge.dot.size');
        border-radius: 50%;
        padding: 0;
    }

    .p-badge-circle {
        padding: 0;
        border-radius: 50%;
    }

    .p-badge-secondary {
        background: dt('badge.secondary.background');
        color: dt('badge.secondary.color');
    }

    .p-badge-success {
        background: dt('badge.success.background');
        color: dt('badge.success.color');
    }

    .p-badge-info {
        background: dt('badge.info.background');
        color: dt('badge.info.color');
    }

    .p-badge-warn {
        background: dt('badge.warn.background');
        color: dt('badge.warn.color');
    }

    .p-badge-danger {
        background: dt('badge.danger.background');
        color: dt('badge.danger.color');
    }

    .p-badge-contrast {
        background: dt('badge.contrast.background');
        color: dt('badge.contrast.color');
    }

    .p-badge-sm {
        font-size: dt('badge.sm.font.size');
        min-width: dt('badge.sm.min.width');
        height: dt('badge.sm.height');
    }

    .p-badge-lg {
        font-size: dt('badge.lg.font.size');
        min-width: dt('badge.lg.min.width');
        height: dt('badge.lg.height');
    }

    .p-badge-xl {
        font-size: dt('badge.xl.font.size');
        min-width: dt('badge.xl.min.width');
        height: dt('badge.xl.height');
    }
`;var rn=`
    ${Vt}

    /* For PrimeNG (directive)*/
    .p-overlay-badge {
        position: relative;
    }

    .p-overlay-badge > .p-badge {
        position: absolute;
        top: 0;
        inset-inline-end: 0;
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
        margin: 0;
    }
`,an={root:({instance:t})=>{let r=typeof t.value=="function"?t.value():t.value,n=typeof t.size=="function"?t.size():t.size,o=typeof t.badgeSize=="function"?t.badgeSize():t.badgeSize,e=typeof t.severity=="function"?t.severity():t.severity;return["p-badge p-component",{"p-badge-circle":At(r)&&String(r).length===1,"p-badge-dot":G(r),"p-badge-sm":n==="small"||o==="small","p-badge-lg":n==="large"||o==="large","p-badge-xl":n==="xlarge"||o==="xlarge","p-badge-info":e==="info","p-badge-success":e==="success","p-badge-warn":e==="warn","p-badge-danger":e==="danger","p-badge-secondary":e==="secondary","p-badge-contrast":e==="contrast"}]}},$t=(()=>{class t extends _{name="badge";style=rn;classes=an;static \u0275fac=(()=>{let n;return function(e){return(n||(n=l(t)))(e||t)}})();static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})();var Rt=new D("BADGE_INSTANCE");var ft=(()=>{class t extends h{$pcBadge=i(Rt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(p,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass=g();badgeSize=g();size=g();severity=g();value=g();badgeDisabled=g(!1,{transform:a});_componentStyle=i($t);static \u0275fac=(()=>{let n;return function(e){return(n||(n=l(t)))(e||t)}})();static \u0275cmp=v({type:t,selectors:[["p-badge"]],hostVars:4,hostBindings:function(o,e){o&2&&(y(e.cn(e.cx("root"),e.styleClass())),wt("display",e.badgeDisabled()?"none":null))},inputs:{styleClass:[1,"styleClass"],badgeSize:[1,"badgeSize"],size:[1,"size"],severity:[1,"severity"],value:[1,"value"],badgeDisabled:[1,"badgeDisabled"]},features:[m([$t,{provide:Rt,useExisting:t},{provide:M,useExisting:t}]),T([p]),u],decls:1,vars:1,template:function(o,e){o&1&&K(0),o&2&&tt(e.value())},dependencies:[U,x,Lt],encapsulation:2,changeDetection:0})}return t})(),Ht=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=B({type:t});static \u0275inj=w({imports:[ft,x,x]})}return t})();var sn=["*"],ln=`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
    flex-shrink: 0;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,Ut=(()=>{class t extends _{name="baseicon";css=ln;static \u0275fac=(()=>{let n;return function(e){return(n||(n=l(t)))(e||t)}})();static \u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ot=(()=>{class t extends h{spin=!1;_componentStyle=i(Ut);getClassNames(){return St("p-icon",{"p-icon-spin":this.spin})}static \u0275fac=(()=>{let n;return function(e){return(n||(n=l(t)))(e||t)}})();static \u0275cmp=v({type:t,selectors:[["ng-component"]],hostAttrs:["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],hostVars:2,hostBindings:function(o,e){o&2&&y(e.getClassNames())},inputs:{spin:[2,"spin","spin",a]},features:[m([Ut]),u],ngContentSelectors:sn,decls:1,vars:0,template:function(o,e){o&1&&(W(),X(0))},encapsulation:2,changeDetection:0})}return t})();var un=["data-p-icon","spinner"],Qt=(()=>{class t extends ot{pathId;onInit(){this.pathId="url(#"+gt()+")"}static \u0275fac=(()=>{let n;return function(e){return(n||(n=l(t)))(e||t)}})();static \u0275cmp=v({type:t,selectors:[["","data-p-icon","spinner"]],features:[u],attrs:un,decls:5,vars:2,consts:[["d","M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(o,e){o&1&&(N(),at(0,"g"),V(1,"path",0),dt(),at(2,"defs")(3,"clipPath",1),V(4,"rect",2),dt()()),o&2&&(S("clip-path",e.pathId),b(3),xt("id",e.pathId))},encapsulation:2})}return t})();var cn=["data-p-icon","times"],ve=(()=>{class t extends ot{static \u0275fac=(()=>{let n;return function(e){return(n||(n=l(t)))(e||t)}})();static \u0275cmp=v({type:t,selectors:[["","data-p-icon","times"]],features:[u],attrs:cn,decls:1,vars:0,consts:[["d","M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z","fill","currentColor"]],template:function(o,e){o&1&&(N(),V(0,"path",0))},encapsulation:2})}return t})();var Gt=`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`;var bn=`
    ${Gt}

    /* For PrimeNG */
    .p-ripple {
        overflow: hidden;
        position: relative;
    }

    .p-ripple-disabled .p-ink {
        display: none !important;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,pn={root:"p-ink"},qt=(()=>{class t extends _{name="ripple";style=bn;classes=pn;static \u0275fac=(()=>{let n;return function(e){return(n||(n=l(t)))(e||t)}})();static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})();var Yt=(()=>{class t extends h{zone=i(Ct);_componentStyle=i(qt);animationListener;mouseDownListener;timeout;constructor(){super(),P(()=>{nt(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}onAfterViewInit(){}onMouseDown(n){let o=this.getInk();if(!o||this.document.defaultView?.getComputedStyle(o,null).display==="none")return;if(F(o,"p-ink-active"),!bt(o)&&!pt(o)){let O=Math.max(Pt(this.el.nativeElement),Nt(this.el.nativeElement));o.style.height=O+"px",o.style.width=O+"px"}let e=Mt(this.el.nativeElement),s=n.pageX-e.left+this.document.body.scrollTop-pt(o)/2,c=n.pageY-e.top+this.document.body.scrollLeft-bt(o)/2;this.renderer.setStyle(o,"top",c+"px"),this.renderer.setStyle(o,"left",s+"px"),Q(o,"p-ink-active"),this.timeout=setTimeout(()=>{let O=this.getInk();O&&F(O,"p-ink-active")},401)}getInk(){let n=this.el.nativeElement.children;for(let o=0;o<n.length;o++)if(typeof n[o].className=="string"&&n[o].className.indexOf("p-ink")!==-1)return n[o];return null}resetInk(){let n=this.getInk();n&&F(n,"p-ink-active")}onAnimationEnd(n){this.timeout&&clearTimeout(this.timeout),F(n.currentTarget,"p-ink-active")}create(){let n=this.renderer.createElement("span");this.renderer.addClass(n,"p-ink"),this.renderer.appendChild(this.el.nativeElement,n),this.renderer.setAttribute(n,"aria-hidden","true"),this.renderer.setAttribute(n,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(n,"animationend",this.onAnimationEnd.bind(this)))}remove(){let n=this.getInk();n&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,Ft(n))}onDestroy(){this.config&&this.config.ripple()&&this.remove()}static \u0275fac=function(o){return new(o||t)};static \u0275dir=C({type:t,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[m([qt]),u]})}return t})(),Se=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=B({type:t});static \u0275inj=w({})}return t})();var Zt=`
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-icon-only::after {
        content: "\0A0";
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`;var gn=["content"],hn=["loadingicon"],fn=["icon"],mn=["*"],en=(t,r)=>({class:t,pt:r});function vn(t,r){t&1&&kt(0)}function yn(t,r){if(t&1&&j(0,"span",7),t&2){let n=f(3);y(n.cn(n.cx("loadingIcon"),"pi-spin",n.loadingIcon)),d("pBind",n.ptm("loadingIcon")),S("aria-hidden",!0)}}function Cn(t,r){if(t&1&&(N(),j(0,"svg",8)),t&2){let n=f(3);y(n.cn(n.cx("loadingIcon"),n.spinnerIconClass())),d("pBind",n.ptm("loadingIcon"))("spin",!0),S("aria-hidden",!0)}}function kn(t,r){if(t&1&&(Y(0),E(1,yn,1,4,"span",3)(2,Cn,1,5,"svg",6),Z()),t&2){let n=f(2);b(),d("ngIf",n.loadingIcon),b(),d("ngIf",!n.loadingIcon)}}function xn(t,r){}function _n(t,r){if(t&1&&E(0,xn,0,0,"ng-template",9),t&2){let n=f(2);d("ngIf",n.loadingIconTemplate||n._loadingIconTemplate)}}function In(t,r){if(t&1&&(Y(0),E(1,kn,3,2,"ng-container",2)(2,_n,1,1,null,5),Z()),t&2){let n=f();b(),d("ngIf",!n.loadingIconTemplate&&!n._loadingIconTemplate),b(),d("ngTemplateOutlet",n.loadingIconTemplate||n._loadingIconTemplate)("ngTemplateOutletContext",lt(3,en,n.cx("loadingIcon"),n.ptm("loadingIcon")))}}function wn(t,r){if(t&1&&j(0,"span",7),t&2){let n=f(2);y(n.cn("icon",n.iconClass())),d("pBind",n.ptm("icon"))}}function Dn(t,r){}function Bn(t,r){if(t&1&&E(0,Dn,0,0,"ng-template",9),t&2){let n=f(2);d("ngIf",!n.icon&&(n.iconTemplate||n._iconTemplate))}}function Tn(t,r){if(t&1&&(Y(0),E(1,wn,1,3,"span",3)(2,Bn,1,1,null,5),Z()),t&2){let n=f();b(),d("ngIf",n.icon&&!n.iconTemplate&&!n._iconTemplate),b(),d("ngTemplateOutlet",n.iconTemplate||n._iconTemplate)("ngTemplateOutletContext",lt(3,en,n.cx("icon"),n.ptm("icon")))}}function En(t,r){if(t&1&&(it(0,"span",7),K(1),rt()),t&2){let n=f();y(n.cx("label")),d("pBind",n.ptm("label")),S("aria-hidden",n.icon&&!n.label),b(),tt(n.label)}}function Sn(t,r){if(t&1&&j(0,"p-badge",10),t&2){let n=f();d("value",n.badge)("severity",n.badgeSeverity)("pt",n.ptm("pcBadge"))}}var Pn={root:({instance:t})=>["p-button p-component",{"p-button-icon-only":(t.icon||t.buttonProps?.icon||t.iconTemplate||t._iconTemplate||t.loadingIcon||t.loadingIconTemplate||t._loadingIconTemplate)&&!t.label&&!t.buttonProps?.label,"p-button-vertical":(t.iconPos==="top"||t.iconPos==="bottom")&&t.label,"p-button-loading":t.loading||t.buttonProps?.loading,"p-button-link":t.link||t.buttonProps?.link,[`p-button-${t.severity||t.buttonProps?.severity}`]:t.severity||t.buttonProps?.severity,"p-button-raised":t.raised||t.buttonProps?.raised,"p-button-rounded":t.rounded||t.buttonProps?.rounded,"p-button-text":t.text||t.variant==="text"||t.buttonProps?.text||t.buttonProps?.variant==="text","p-button-outlined":t.outlined||t.variant==="outlined"||t.buttonProps?.outlined||t.buttonProps?.variant==="outlined","p-button-sm":t.size==="small"||t.buttonProps?.size==="small","p-button-lg":t.size==="large"||t.buttonProps?.size==="large","p-button-plain":t.plain||t.buttonProps?.plain,"p-button-fluid":t.hasFluid}],loadingIcon:"p-button-loading-icon",icon:({instance:t})=>["p-button-icon",{[`p-button-icon-${t.iconPos||t.buttonProps?.iconPos}`]:t.label||t.buttonProps?.label,"p-button-icon-left":(t.iconPos==="left"||t.buttonProps?.iconPos==="left")&&t.label||t.buttonProps?.label,"p-button-icon-right":(t.iconPos==="right"||t.buttonProps?.iconPos==="right")&&t.label||t.buttonProps?.label},t.icon,t.buttonProps?.icon],spinnerIcon:({instance:t})=>Object.entries(t.iconClass()).filter(([,r])=>!!r).reduce((r,[n])=>r+` ${n}`,"p-button-loading-icon"),label:"p-button-label"},L=(()=>{class t extends _{name="button";style=Zt;classes=Pn;static \u0275fac=(()=>{let n;return function(e){return(n||(n=l(t)))(e||t)}})();static \u0275prov=k({token:t,factory:t.\u0275fac})}return t})();var Wt=new D("BUTTON_INSTANCE"),Xt=new D("BUTTON_DIRECTIVE_INSTANCE"),Jt=new D("BUTTON_LABEL_INSTANCE"),Kt=new D("BUTTON_ICON_INSTANCE"),I={button:"p-button",component:"p-component",iconOnly:"p-button-icon-only",disabled:"p-disabled",loading:"p-button-loading",labelOnly:"p-button-loading-label-only"},tn=(()=>{class t extends h{ptButtonLabel=g();$pcButtonLabel=i(Jt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(p,{self:!0});constructor(){super(),P(()=>{this.ptButtonLabel()&&this.directivePT.set(this.ptButtonLabel())})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=function(o){return new(o||t)};static \u0275dir=C({type:t,selectors:[["","pButtonLabel",""]],hostVars:2,hostBindings:function(o,e){o&2&&J("p-button-label",!0)},inputs:{ptButtonLabel:[1,"ptButtonLabel"]},features:[m([L,{provide:Jt,useExisting:t},{provide:M,useExisting:t}]),T([p]),u]})}return t})(),nn=(()=>{class t extends h{ptButtonIcon=g();$pcButtonIcon=i(Kt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(p,{self:!0});constructor(){super(),P(()=>{this.ptButtonIcon()&&this.directivePT.set(this.ptButtonIcon())})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=function(o){return new(o||t)};static \u0275dir=C({type:t,selectors:[["","pButtonIcon",""]],hostVars:2,hostBindings:function(o,e){o&2&&J("p-button-icon",!0)},inputs:{ptButtonIcon:[1,"ptButtonIcon"]},features:[m([L,{provide:Kt,useExisting:t},{provide:M,useExisting:t}]),T([p]),u]})}return t})(),oo=(()=>{class t extends h{$pcButtonDirective=i(Xt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(p,{self:!0});_componentStyle=i(L);ptButtonDirective=g();hostName="";onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}constructor(){super(),P(()=>{this.ptButtonDirective()&&this.directivePT.set(this.ptButtonDirective())})}text=!1;plain=!1;raised=!1;size;outlined=!1;rounded=!1;iconPos="left";loadingIcon;fluid=g(void 0,{transform:a});iconSignal=ct(nn);labelSignal=ct(tn);isIconOnly=ut(()=>!!(!this.labelSignal()&&this.iconSignal()));_label;_icon;_loading=!1;_severity;_buttonProps;initialized;get htmlElement(){return this.el.nativeElement}_internalClasses=Object.values(I);pcFluid=i(ht,{optional:!0,host:!0,skipSelf:!0});isTextButton=ut(()=>!!(!this.iconSignal()&&this.labelSignal()&&this.text));get label(){return this._label}set label(n){this._label=n,this.initialized&&(this.updateLabel(),this.updateIcon(),this.setStyleClass())}get icon(){return this._icon}set icon(n){this._icon=n,this.initialized&&(this.updateIcon(),this.setStyleClass())}get loading(){return this._loading}set loading(n){this._loading=n,this.initialized&&(this.updateIcon(),this.setStyleClass())}get buttonProps(){return this._buttonProps}set buttonProps(n){this._buttonProps=n,n&&typeof n=="object"&&Object.entries(n).forEach(([o,e])=>this[`_${o}`]!==e&&(this[`_${o}`]=e))}get severity(){return this._severity}set severity(n){this._severity=n,this.initialized&&this.setStyleClass()}spinnerIcon=`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon-spin">
        <g clip-path="url(#clip0_417_21408)">
            <path
                d="M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_417_21408">
                <rect width="14" height="14" fill="white" />
            </clipPath>
        </defs>
    </svg>`;onAfterViewInit(){Q(this.htmlElement,this.getStyleClass().join(" ")),this.createIcon(),this.createLabel(),this.initialized=!0}getStyleClass(){let n=[I.button,I.component];return this.icon&&!this.label&&G(this.htmlElement.textContent)&&n.push(I.iconOnly),this.loading&&(n.push(I.disabled,I.loading),!this.icon&&this.label&&n.push(I.labelOnly),this.icon&&!this.label&&!G(this.htmlElement.textContent)&&n.push(I.iconOnly)),this.text&&n.push("p-button-text"),this.severity&&n.push(`p-button-${this.severity}`),this.plain&&n.push("p-button-plain"),this.raised&&n.push("p-button-raised"),this.size&&n.push(`p-button-${this.size}`),this.outlined&&n.push("p-button-outlined"),this.rounded&&n.push("p-button-rounded"),this.size==="small"&&n.push("p-button-sm"),this.size==="large"&&n.push("p-button-lg"),this.hasFluid&&n.push("p-button-fluid"),n}get hasFluid(){return this.fluid()??!!this.pcFluid}setStyleClass(){let n=this.getStyleClass();this.removeExistingSeverityClass(),this.htmlElement.classList.remove(...this._internalClasses),this.htmlElement.classList.add(...n)}removeExistingSeverityClass(){let n=["success","info","warn","danger","help","primary","secondary","contrast"],o=this.htmlElement.classList.value.split(" ").find(e=>n.some(s=>e===`p-button-${s}`));o&&this.htmlElement.classList.remove(o)}createLabel(){if(!A(this.htmlElement,".p-button-label")&&this.label){let o=et("span",{class:this.cx("label"),"p-bind":this.ptm("label"),"aria-hidden":this.icon&&!this.label?"true":null});o.appendChild(this.document.createTextNode(this.label)),this.htmlElement.appendChild(o)}}createIcon(){if(!A(this.htmlElement,".p-button-icon")&&(this.icon||this.loading)){let o=this.label?"p-button-icon-"+this.iconPos:null,e=this.getIconClass(),s=et("span",{class:this.cn(this.cx("icon"),o,e),"aria-hidden":"true","p-bind":this.ptm("icon")});!this.loadingIcon&&this.loading&&(s.innerHTML=this.spinnerIcon),this.htmlElement.insertBefore(s,this.htmlElement.firstChild)}}updateLabel(){let n=A(this.htmlElement,".p-button-label");if(!this.label){n&&this.htmlElement.removeChild(n);return}n?n.textContent=this.label:this.createLabel()}updateIcon(){let n=A(this.htmlElement,".p-button-icon"),o=A(this.htmlElement,".p-button-label");this.loading&&!this.loadingIcon&&n?n.innerHTML=this.spinnerIcon:n?.innerHTML&&(n.innerHTML=""),n?this.iconPos?n.className="p-button-icon "+(o?"p-button-icon-"+this.iconPos:"")+" "+this.getIconClass():n.className="p-button-icon "+this.getIconClass():this.createIcon()}getIconClass(){return this.loading?"p-button-loading-icon "+(this.loadingIcon?this.loadingIcon:"p-icon"):this.icon||"p-hidden"}onDestroy(){this.initialized=!1}static \u0275fac=function(o){return new(o||t)};static \u0275dir=C({type:t,selectors:[["","pButton",""]],contentQueries:function(o,e,s){o&1&&(st(s,e.iconSignal,nn,5),st(s,e.labelSignal,tn,5)),o&2&&It(2)},hostVars:4,hostBindings:function(o,e){o&2&&J("p-button-icon-only",e.isIconOnly())("p-button-text",e.isTextButton())},inputs:{ptButtonDirective:[1,"ptButtonDirective"],hostName:"hostName",text:[2,"text","text",a],plain:[2,"plain","plain",a],raised:[2,"raised","raised",a],size:"size",outlined:[2,"outlined","outlined",a],rounded:[2,"rounded","rounded",a],iconPos:"iconPos",loadingIcon:"loadingIcon",fluid:[1,"fluid"],label:"label",icon:"icon",loading:"loading",buttonProps:"buttonProps",severity:"severity"},features:[m([L,{provide:Xt,useExisting:t},{provide:M,useExisting:t}]),T([p]),u]})}return t})(),Mn=(()=>{class t extends h{hostName="";$pcButton=i(Wt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=i(p,{self:!0});_componentStyle=i(L);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}type="button";badge;disabled;raised=!1;rounded=!1;text=!1;plain=!1;outlined=!1;link=!1;tabindex;size;variant;style;styleClass;badgeClass;badgeSeverity="secondary";ariaLabel;autofocus;iconPos="left";icon;label;loading=!1;loadingIcon;severity;buttonProps;fluid=g(void 0,{transform:a});onClick=new q;onFocus=new q;onBlur=new q;contentTemplate;loadingIconTemplate;iconTemplate;templates;pcFluid=i(ht,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}_contentTemplate;_iconTemplate;_loadingIconTemplate;onAfterContentInit(){this.templates?.forEach(n=>{switch(n.getType()){case"content":this._contentTemplate=n.template;break;case"icon":this._iconTemplate=n.template;break;case"loadingicon":this._loadingIconTemplate=n.template;break;default:this._contentTemplate=n.template;break}})}spinnerIconClass(){return Object.entries(this.iconClass()).filter(([,n])=>!!n).reduce((n,[o])=>n+` ${o}`,"p-button-loading-icon")}iconClass(){return{[`p-button-loading-icon pi-spin ${this.loadingIcon??""}`]:this.loading,"p-button-icon":!0,[this.icon]:!0,"p-button-icon-left":this.iconPos==="left"&&this.label,"p-button-icon-right":this.iconPos==="right"&&this.label,"p-button-icon-top":this.iconPos==="top"&&this.label,"p-button-icon-bottom":this.iconPos==="bottom"&&this.label}}static \u0275fac=(()=>{let n;return function(e){return(n||(n=l(t)))(e||t)}})();static \u0275cmp=v({type:t,selectors:[["p-button"]],contentQueries:function(o,e,s){if(o&1&&($(s,gn,5),$(s,hn,5),$(s,fn,5),$(s,zt,4)),o&2){let c;R(c=H())&&(e.contentTemplate=c.first),R(c=H())&&(e.loadingIconTemplate=c.first),R(c=H())&&(e.iconTemplate=c.first),R(c=H())&&(e.templates=c)}},inputs:{hostName:"hostName",type:"type",badge:"badge",disabled:[2,"disabled","disabled",a],raised:[2,"raised","raised",a],rounded:[2,"rounded","rounded",a],text:[2,"text","text",a],plain:[2,"plain","plain",a],outlined:[2,"outlined","outlined",a],link:[2,"link","link",a],tabindex:[2,"tabindex","tabindex",Dt],size:"size",variant:"variant",style:"style",styleClass:"styleClass",badgeClass:"badgeClass",badgeSeverity:"badgeSeverity",ariaLabel:"ariaLabel",autofocus:[2,"autofocus","autofocus",a],iconPos:"iconPos",icon:"icon",label:"label",loading:[2,"loading","loading",a],loadingIcon:"loadingIcon",severity:"severity",buttonProps:"buttonProps",fluid:[1,"fluid"]},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[m([L,{provide:Wt,useExisting:t},{provide:M,useExisting:t}]),T([p]),u],ngContentSelectors:mn,decls:7,vars:14,consts:[["pRipple","",3,"click","focus","blur","ngStyle","disabled","pAutoFocus","pBind"],[4,"ngTemplateOutlet"],[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"value","severity","pt",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","spinner",3,"class","pBind","spin",4,"ngIf"],[3,"pBind"],["data-p-icon","spinner",3,"pBind","spin"],[3,"ngIf"],[3,"value","severity","pt"]],template:function(o,e){o&1&&(W(),it(0,"button",0),_t("click",function(c){return e.onClick.emit(c)})("focus",function(c){return e.onFocus.emit(c)})("blur",function(c){return e.onBlur.emit(c)}),X(1),E(2,vn,1,0,"ng-container",1)(3,In,3,6,"ng-container",2)(4,Tn,3,6,"ng-container",2)(5,En,2,5,"span",3)(6,Sn,1,3,"p-badge",4),rt()),o&2&&(y(e.cn(e.cx("root"),e.styleClass,e.buttonProps==null?null:e.buttonProps.styleClass)),d("ngStyle",e.style||(e.buttonProps==null?null:e.buttonProps.style))("disabled",e.disabled||e.loading||(e.buttonProps==null?null:e.buttonProps.disabled))("pAutoFocus",e.autofocus||(e.buttonProps==null?null:e.buttonProps.autofocus))("pBind",e.ptm("root")),S("type",e.type||(e.buttonProps==null?null:e.buttonProps.type))("aria-label",e.ariaLabel||(e.buttonProps==null?null:e.buttonProps.ariaLabel))("tabindex",e.tabindex||(e.buttonProps==null?null:e.buttonProps.tabindex)),b(2),d("ngTemplateOutlet",e.contentTemplate||e._contentTemplate),b(),d("ngIf",e.loading),b(),d("ngIf",!e.loading),b(),d("ngIf",!e.contentTemplate&&!e._contentTemplate&&e.label),b(),d("ngIf",!e.contentTemplate&&!e._contentTemplate&&e.badge))},dependencies:[U,Bt,Et,Tt,Yt,jt,Qt,Ht,ft,x,p],encapsulation:2,changeDetection:0})}return t})(),io=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=B({type:t});static \u0275inj=w({imports:[U,Mn,x,x]})}return t})();export{jt as a,Ht as b,ot as c,Qt as d,ve as e,Yt as f,Se as g,tn as h,nn as i,oo as j,Mn as k,io as l};
