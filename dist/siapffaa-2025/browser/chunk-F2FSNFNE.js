import{b as Qe}from"./chunk-SZ5LTZRU.js";import{a as Ge,b as qe}from"./chunk-UNRFJNMJ.js";import{e as he,f as ve,j as xe,l as Ce}from"./chunk-EQMPRG6V.js";import{c as be,d as Q,f as $,h as H}from"./chunk-36JN3LZY.js";import"./chunk-M763EXIE.js";import{b as Ve,c as Le}from"./chunk-MWNC3RUP.js";import{b as ye,c as U,e as we,f as Se,g as Te,h as Ie,i as Me,k as je,m as Ee,n as ke,t as Ae,u as ze,v as Oe,w as Be,x as De,y as Pe}from"./chunk-ZPMKEMCQ.js";import"./chunk-QE2BREUU.js";import{a as Ne,b as Fe}from"./chunk-HDHPZNG5.js";import{c as fe,d as _e,e as M}from"./chunk-JPTHL2WT.js";import{ea as P,fa as N,la as ge}from"./chunk-VAG7FTYF.js";import{C as ue,c as ce,d as le,e as B,i as de,l as D,t as me,z as pe}from"./chunk-FIATBDAH.js";import{Ab as S,Ca as r,Cb as T,Db as I,Gb as z,Ha as ee,K as J,Kb as y,L as Y,Lb as d,Mb as v,N as K,Na as E,Nb as w,Ob as L,P as j,Sa as k,Ta as te,U as g,V as f,Vb as ae,W,Wa as ne,Xa as oe,Xb as G,Ya as p,Yb as re,aa as X,cb as V,db as _,eb as b,fa as F,gc as O,ib as l,jb as i,kb as s,lb as u,rb as A,sb as C,vc as q,wb as h,xb as c,ya as Z,yb as ie,zb as se}from"./chunk-XJSKPFVT.js";import{g as R}from"./chunk-OXVY4BEJ.js";var $e=`
    .p-message {
        border-radius: dt('message.border.radius');
        outline-width: dt('message.border.width');
        outline-style: solid;
    }

    .p-message-content {
        display: flex;
        align-items: center;
        padding: dt('message.content.padding');
        gap: dt('message.content.gap');
        height: 100%;
    }

    .p-message-icon {
        flex-shrink: 0;
    }

    .p-message-close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-inline-start: auto;
        overflow: hidden;
        position: relative;
        width: dt('message.close.button.width');
        height: dt('message.close.button.height');
        border-radius: dt('message.close.button.border.radius');
        background: transparent;
        transition:
            background dt('message.transition.duration'),
            color dt('message.transition.duration'),
            outline-color dt('message.transition.duration'),
            box-shadow dt('message.transition.duration'),
            opacity 0.3s;
        outline-color: transparent;
        color: inherit;
        padding: 0;
        border: none;
        cursor: pointer;
        user-select: none;
    }

    .p-message-close-icon {
        font-size: dt('message.close.icon.size');
        width: dt('message.close.icon.size');
        height: dt('message.close.icon.size');
    }

    .p-message-close-button:focus-visible {
        outline-width: dt('message.close.button.focus.ring.width');
        outline-style: dt('message.close.button.focus.ring.style');
        outline-offset: dt('message.close.button.focus.ring.offset');
    }

    .p-message-info {
        background: dt('message.info.background');
        outline-color: dt('message.info.border.color');
        color: dt('message.info.color');
        box-shadow: dt('message.info.shadow');
    }

    .p-message-info .p-message-close-button:focus-visible {
        outline-color: dt('message.info.close.button.focus.ring.color');
        box-shadow: dt('message.info.close.button.focus.ring.shadow');
    }

    .p-message-info .p-message-close-button:hover {
        background: dt('message.info.close.button.hover.background');
    }

    .p-message-info.p-message-outlined {
        color: dt('message.info.outlined.color');
        outline-color: dt('message.info.outlined.border.color');
    }

    .p-message-info.p-message-simple {
        color: dt('message.info.simple.color');
    }

    .p-message-success {
        background: dt('message.success.background');
        outline-color: dt('message.success.border.color');
        color: dt('message.success.color');
        box-shadow: dt('message.success.shadow');
    }

    .p-message-success .p-message-close-button:focus-visible {
        outline-color: dt('message.success.close.button.focus.ring.color');
        box-shadow: dt('message.success.close.button.focus.ring.shadow');
    }

    .p-message-success .p-message-close-button:hover {
        background: dt('message.success.close.button.hover.background');
    }

    .p-message-success.p-message-outlined {
        color: dt('message.success.outlined.color');
        outline-color: dt('message.success.outlined.border.color');
    }

    .p-message-success.p-message-simple {
        color: dt('message.success.simple.color');
    }

    .p-message-warn {
        background: dt('message.warn.background');
        outline-color: dt('message.warn.border.color');
        color: dt('message.warn.color');
        box-shadow: dt('message.warn.shadow');
    }

    .p-message-warn .p-message-close-button:focus-visible {
        outline-color: dt('message.warn.close.button.focus.ring.color');
        box-shadow: dt('message.warn.close.button.focus.ring.shadow');
    }

    .p-message-warn .p-message-close-button:hover {
        background: dt('message.warn.close.button.hover.background');
    }

    .p-message-warn.p-message-outlined {
        color: dt('message.warn.outlined.color');
        outline-color: dt('message.warn.outlined.border.color');
    }

    .p-message-warn.p-message-simple {
        color: dt('message.warn.simple.color');
    }

    .p-message-error {
        background: dt('message.error.background');
        outline-color: dt('message.error.border.color');
        color: dt('message.error.color');
        box-shadow: dt('message.error.shadow');
    }

    .p-message-error .p-message-close-button:focus-visible {
        outline-color: dt('message.error.close.button.focus.ring.color');
        box-shadow: dt('message.error.close.button.focus.ring.shadow');
    }

    .p-message-error .p-message-close-button:hover {
        background: dt('message.error.close.button.hover.background');
    }

    .p-message-error.p-message-outlined {
        color: dt('message.error.outlined.color');
        outline-color: dt('message.error.outlined.border.color');
    }

    .p-message-error.p-message-simple {
        color: dt('message.error.simple.color');
    }

    .p-message-secondary {
        background: dt('message.secondary.background');
        outline-color: dt('message.secondary.border.color');
        color: dt('message.secondary.color');
        box-shadow: dt('message.secondary.shadow');
    }

    .p-message-secondary .p-message-close-button:focus-visible {
        outline-color: dt('message.secondary.close.button.focus.ring.color');
        box-shadow: dt('message.secondary.close.button.focus.ring.shadow');
    }

    .p-message-secondary .p-message-close-button:hover {
        background: dt('message.secondary.close.button.hover.background');
    }

    .p-message-secondary.p-message-outlined {
        color: dt('message.secondary.outlined.color');
        outline-color: dt('message.secondary.outlined.border.color');
    }

    .p-message-secondary.p-message-simple {
        color: dt('message.secondary.simple.color');
    }

    .p-message-contrast {
        background: dt('message.contrast.background');
        outline-color: dt('message.contrast.border.color');
        color: dt('message.contrast.color');
        box-shadow: dt('message.contrast.shadow');
    }

    .p-message-contrast .p-message-close-button:focus-visible {
        outline-color: dt('message.contrast.close.button.focus.ring.color');
        box-shadow: dt('message.contrast.close.button.focus.ring.shadow');
    }

    .p-message-contrast .p-message-close-button:hover {
        background: dt('message.contrast.close.button.hover.background');
    }

    .p-message-contrast.p-message-outlined {
        color: dt('message.contrast.outlined.color');
        outline-color: dt('message.contrast.outlined.border.color');
    }

    .p-message-contrast.p-message-simple {
        color: dt('message.contrast.simple.color');
    }

    .p-message-text {
        font-size: dt('message.text.font.size');
        font-weight: dt('message.text.font.weight');
    }

    .p-message-icon {
        font-size: dt('message.icon.size');
        width: dt('message.icon.size');
        height: dt('message.icon.size');
    }

    .p-message-enter-from {
        opacity: 0;
    }

    .p-message-enter-active {
        transition: opacity 0.3s;
    }

    .p-message.p-message-leave-from {
        max-height: 1000px;
    }

    .p-message.p-message-leave-to {
        max-height: 0;
        opacity: 0;
        margin: 0;
    }

    .p-message-leave-active {
        overflow: hidden;
        transition:
            max-height 0.45s cubic-bezier(0, 1, 0, 1),
            opacity 0.3s,
            margin 0.3s;
    }

    .p-message-leave-active .p-message-close-button {
        opacity: 0;
    }

    .p-message-sm .p-message-content {
        padding: dt('message.content.sm.padding');
    }

    .p-message-sm .p-message-text {
        font-size: dt('message.text.sm.font.size');
    }

    .p-message-sm .p-message-icon {
        font-size: dt('message.icon.sm.size');
        width: dt('message.icon.sm.size');
        height: dt('message.icon.sm.size');
    }

    .p-message-sm .p-message-close-icon {
        font-size: dt('message.close.icon.sm.size');
        width: dt('message.close.icon.sm.size');
        height: dt('message.close.icon.sm.size');
    }

    .p-message-lg .p-message-content {
        padding: dt('message.content.lg.padding');
    }

    .p-message-lg .p-message-text {
        font-size: dt('message.text.lg.font.size');
    }

    .p-message-lg .p-message-icon {
        font-size: dt('message.icon.lg.size');
        width: dt('message.icon.lg.size');
        height: dt('message.icon.lg.size');
    }

    .p-message-lg .p-message-close-icon {
        font-size: dt('message.close.icon.lg.size');
        width: dt('message.close.icon.lg.size');
        height: dt('message.close.icon.lg.size');
    }

    .p-message-outlined {
        background: transparent;
        outline-width: dt('message.outlined.border.width');
    }

    .p-message-simple {
        background: transparent;
        outline-color: transparent;
        box-shadow: none;
    }

    .p-message-simple .p-message-content {
        padding: dt('message.simple.content.padding');
    }

    .p-message-outlined .p-message-close-button:hover,
    .p-message-simple .p-message-close-button:hover {
        background: transparent;
    }
`;var Ke=["container"],We=["icon"],Xe=["closeicon"],Ze=["*"],et=(t,a)=>({showTransitionParams:t,hideTransitionParams:a}),tt=t=>({value:"visible()",params:t}),nt=t=>({closeCallback:t});function ot(t,a){t&1&&A(0)}function it(t,a){if(t&1&&p(0,ot,1,0,"ng-container",4),t&2){let e=c(2);l("ngTemplateOutlet",e.iconTemplate||e._iconTemplate)}}function st(t,a){if(t&1&&u(0,"i",2),t&2){let e=c(2);y(e.cn(e.cx("icon"),e.icon)),l("pBind",e.ptm("icon"))}}function at(t,a){t&1&&A(0)}function rt(t,a){if(t&1&&p(0,at,1,0,"ng-container",5),t&2){let e=c(2);l("ngTemplateOutlet",e.containerTemplate||e._containerTemplate)("ngTemplateOutletContext",G(2,nt,e.closeCallback))}}function ct(t,a){if(t&1&&u(0,"span",9),t&2){let e=c(4);l("pBind",e.ptm("text"))("ngClass",e.cx("text"))("innerHTML",e.text,Z)}}function lt(t,a){if(t&1&&(i(0,"div"),p(1,ct,1,3,"span",8),s()),t&2){let e=c(3);r(),l("ngIf",!e.escape)}}function dt(t,a){if(t&1&&(i(0,"span",7),d(1),s()),t&2){let e=c(4);l("pBind",e.ptm("text"))("ngClass",e.cx("text")),r(),v(e.text)}}function mt(t,a){if(t&1&&p(0,dt,2,3,"span",10),t&2){let e=c(3);l("ngIf",e.escape&&e.text)}}function pt(t,a){if(t&1&&(p(0,lt,2,1,"div",6)(1,mt,1,1,"ng-template",null,0,O),i(3,"span",7),se(4),s()),t&2){let e=z(2),n=c(2);l("ngIf",!n.escape)("ngIfElse",e),r(3),l("pBind",n.ptm("text"))("ngClass",n.cx("text"))}}function ut(t,a){if(t&1&&u(0,"i",7),t&2){let e=c(3);y(e.cn(e.cx("closeIcon"),e.closeIcon)),l("pBind",e.ptm("closeIcon"))("ngClass",e.closeIcon)}}function gt(t,a){t&1&&A(0)}function ft(t,a){if(t&1&&p(0,gt,1,0,"ng-container",4),t&2){let e=c(3);l("ngTemplateOutlet",e.closeIconTemplate||e._closeIconTemplate)}}function _t(t,a){if(t&1&&(W(),u(0,"svg",14)),t&2){let e=c(3);y(e.cx("closeIcon")),l("pBind",e.ptm("closeIcon"))}}function bt(t,a){if(t&1){let e=C();i(0,"button",11),h("click",function(o){g(e);let m=c(2);return f(m.close(o))}),_(1,ut,1,4,"i",12),_(2,ft,1,1,"ng-container"),_(3,_t,1,3,":svg:svg",13),s()}if(t&2){let e=c(2);y(e.cx("closeButton")),l("pBind",e.ptm("closeButton")),V("aria-label",e.closeAriaLabel),r(),b(e.closeIcon?1:-1),r(),b(e.closeIconTemplate||e._closeIconTemplate?2:-1),r(),b(!e.closeIconTemplate&&!e._closeIconTemplate&&!e.closeIcon?3:-1)}}function ht(t,a){if(t&1&&(i(0,"div",2)(1,"div",2),_(2,it,1,1,"ng-container"),_(3,st,1,3,"i",1),_(4,rt,1,4,"ng-container")(5,pt,5,4),_(6,bt,4,7,"button",3),s()()),t&2){let e=c();y(e.cn(e.cx("root"),e.styleClass)),l("pBind",e.ptm("root"))("@messageAnimation",G(16,tt,re(13,et,e.showTransitionOptions,e.hideTransitionOptions))),V("aria-live","polite")("role","alert"),r(),y(e.cx("content")),l("pBind",e.ptm("content")),r(),b(e.iconTemplate||e._iconTemplate?2:-1),r(),b(e.icon?3:-1),r(),b(e.containerTemplate||e._containerTemplate?4:5),r(2),b(e.closable?6:-1)}}var vt={root:({instance:t})=>["p-message p-component p-message-"+t.severity,"p-message-"+t.variant,{"p-message-sm":t.size==="small","p-message-lg":t.size==="large"}],content:"p-message-content",icon:"p-message-icon",text:"p-message-text",closeButton:"p-message-close-button",closeIcon:"p-message-close-icon"},He=(()=>{class t extends ge{name="message";style=$e;classes=vt;static \u0275fac=(()=>{let e;return function(o){return(e||(e=F(t)))(o||t)}})();static \u0275prov=J({token:t,factory:t.\u0275fac})}return t})();var Ue=new K("MESSAGE_INSTANCE"),xt=(()=>{class t extends _e{_componentStyle=j(He);bindDirectiveInstance=j(M,{self:!0});$pcMessage=j(Ue,{optional:!0,skipSelf:!0})??void 0;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}severity="info";text;escape=!0;style;styleClass;closable=!1;icon;closeIcon;life;showTransitionOptions="300ms ease-out";hideTransitionOptions="200ms cubic-bezier(0.86, 0, 0.07, 1)";size;variant;onClose=new ee;get closeAriaLabel(){return this.config.translation.aria?this.config.translation.aria.close:void 0}visible=X(!0);containerTemplate;iconTemplate;closeIconTemplate;templates;_containerTemplate;_iconTemplate;_closeIconTemplate;closeCallback=e=>{this.close(e)};onInit(){this.life&&setTimeout(()=>{this.visible.set(!1)},this.life)}onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"container":this._containerTemplate=e.template;break;case"icon":this._iconTemplate=e.template;break;case"closeicon":this._closeIconTemplate=e.template;break}})}close(e){this.visible.set(!1),this.onClose.emit({originalEvent:e})}static \u0275fac=(()=>{let e;return function(o){return(e||(e=F(t)))(o||t)}})();static \u0275cmp=k({type:t,selectors:[["p-message"]],contentQueries:function(n,o,m){if(n&1&&(S(m,Ke,4),S(m,We,4),S(m,Xe,4),S(m,P,4)),n&2){let x;T(x=I())&&(o.containerTemplate=x.first),T(x=I())&&(o.iconTemplate=x.first),T(x=I())&&(o.closeIconTemplate=x.first),T(x=I())&&(o.templates=x)}},inputs:{severity:"severity",text:"text",escape:[2,"escape","escape",q],style:"style",styleClass:"styleClass",closable:[2,"closable","closable",q],icon:"icon",closeIcon:"closeIcon",life:"life",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",size:"size",variant:"variant"},outputs:{onClose:"onClose"},features:[ae([He,{provide:Ue,useExisting:t},{provide:fe,useExisting:t}]),oe([M]),ne],ngContentSelectors:Ze,decls:1,vars:1,consts:[["escapeOut",""],[3,"pBind","class"],[3,"pBind"],["pRipple","","type","button",3,"pBind","class"],[4,"ngTemplateOutlet"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngIf","ngIfElse"],[3,"pBind","ngClass"],[3,"pBind","ngClass","innerHTML",4,"ngIf"],[3,"pBind","ngClass","innerHTML"],[3,"pBind","ngClass",4,"ngIf"],["pRipple","","type","button",3,"click","pBind"],[3,"pBind","class","ngClass"],["data-p-icon","times",3,"pBind","class"],["data-p-icon","times",3,"pBind"]],template:function(n,o){n&1&&(ie(),_(0,ht,7,18,"div",1)),n&2&&b(o.visible()?0:-1)},dependencies:[D,ce,B,de,he,ve,N,M],encapsulation:2,data:{animation:[be("messageAnimation",[H(":enter",[$({opacity:0,transform:"translateY(-25%)"}),Q("{{showTransitionParams}}")]),H(":leave",[Q("{{hideTransitionParams}}",$({height:0,marginTop:0,marginBottom:0,marginLeft:0,marginRight:0,opacity:0}))])])]},changeDetection:0})}return t})(),Re=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=te({type:t});static \u0275inj=Y({imports:[xt,N,N]})}return t})();function Ct(t,a){if(t&1&&(i(0,"div",15)(1,"span",16),d(2," Seleccionaste: "),i(3,"strong"),d(4),s()()()),t&2){let e=c(2);r(4),v(e.tarjetaSelected==null?null:e.tarjetaSelected.Grado)}}function yt(t,a){if(t&1){let e=C();i(0,"div",2)(1,"div",3)(2,"div",4)(3,"p-card",5),p(4,Ct,5,1,"ng-template",6),i(5,"form",7),h("ngSubmit",function(){g(e);let o=c();return f(o.buscarporidentidad())}),i(6,"div",8)(7,"label",9),d(8,"ID"),s(),u(9,"input",10),s(),i(10,"div",11)(11,"label",12),d(12,"Buscar"),s(),u(13,"button",13),s(),i(14,"div",11)(15,"label",12),d(16,"Atr\xE1s"),s(),i(17,"button",14),h("click",function(){g(e);let o=c();return f(o.atras())}),s()()()()()()()}if(t&2){let e=c();r(5),l("formGroup",e.formIdentidad),r(8),l("disabled",e.formIdentidad.invalid)}}function wt(t,a){if(t&1&&(i(0,"div",26)(1,"h3",27),d(2,"Formulario de ascenso"),s(),i(3,"span",16),d(4),s()()),t&2){let e=c(2);r(4),w(" Unidad: ",e.usuarioLogin==null?null:e.usuarioLogin.unidad," ")}}function St(t,a){if(t&1&&(i(0,"strong"),d(1),s()),t&2){let e=c(2);r(),w(" ",e.objetoConsultado==null?null:e.objetoConsultado.equivalente," ")}}function Tt(t,a){if(t&1&&(i(0,"strong"),d(1),s()),t&2){let e=c(2);r(),v(e.objetoConsultado==null?null:e.objetoConsultado.nombre_grado)}}function It(t,a){if(t&1){let e=C();i(0,"div",24)(1,"button",28),h("click",function(){g(e);let o=c(2);return f(o.ascender())}),s()()}}function Mt(t,a){t&1&&(i(0,"div",29),u(1,"p-progressSpinner"),s())}function jt(t,a){if(t&1){let e=C();i(0,"div",2)(1,"div",3)(2,"div",17)(3,"p-card",5),p(4,wt,5,1,"ng-template",6),i(5,"form",18)(6,"div",8)(7,"label",9),d(8,"Nombre"),s(),i(9,"div",19)(10,"strong"),d(11),s()()(),i(12,"div",8)(13,"label",9),d(14,"Identidad"),s(),i(15,"div",19)(16,"strong"),d(17),s()()(),i(18,"div",8)(19,"label",9),d(20,"Grado / Rango actual"),s(),i(21,"div",19),p(22,St,2,1,"strong",20)(23,Tt,2,1,"ng-template",null,0,O),s()(),i(25,"div",8)(26,"label",9),d(27,"Fecha de ascenso"),s(),i(28,"div",19)(29,"strong"),d(30),s()()(),i(31,"div",8)(32,"label",9),d(33,"Nuevo grado"),s(),i(34,"div",19)(35,"strong",21),d(36),s()()(),p(37,It,2,0,"div",22)(38,Mt,2,0,"div",23),i(39,"div",24)(40,"button",25),h("click",function(){g(e);let o=c();return f(o.atras())}),s()()()()()()()}if(t&2){let e=z(24),n=c();r(11),L("",n.objetoConsultado==null?null:n.objetoConsultado.nombres," ",n.objetoConsultado==null?null:n.objetoConsultado.apellidos),r(6),v(n.objetoConsultado==null?null:n.objetoConsultado.identidad),r(5),l("ngIf",(n.objetoConsultado==null?null:n.objetoConsultado.nombre)==="Naval")("ngIfElse",e),r(8),v(n.tarjetaSelected==null?null:n.tarjetaSelected.FechaAutorizada),r(6),v(n.tarjetaSelected==null?null:n.tarjetaSelected.Grado),r(),l("ngIf",n.banderaEspiner===0),r(),l("ngIf",n.banderaEspiner===1)}}function Et(t,a){if(t&1){let e=C();i(0,"div",34)(1,"p-card",35)(2,"div",36),u(3,"img",37),i(4,"h4",38),d(5),s(),i(6,"p",39)(7,"strong",40),d(8),s(),d(9),s(),i(10,"p",41),d(11),s(),i(12,"p",42),d(13," Cualquier consulta comunicarse al C-1 "),s(),i(14,"button",43),h("click",function(){let o=g(e).$implicit,m=c(2);return f(m.siguiente(o))}),s()()()()}if(t&2){let e=a.$implicit;r(),l("header","Categor\xEDa: "+e.Categoria),r(4),v(e.Grado),r(3),w("Cupos: ",e.Cupos),r(),L(" \xA0|\xA0 ",e.Codigo," \xA0|\xA0 ",e.Corto," "),r(2),w(" ",e.Unidad," ")}}function kt(t,a){if(t&1){let e=C();i(0,"div",2)(1,"div",30)(2,"div",31)(3,"h3",27),d(4),s(),i(5,"button",32),h("click",function(){g(e);let o=c();return f(o.buscarCuposAscenso())}),s()()(),i(6,"div",18),p(7,Et,15,6,"div",33),s()()}if(t&2){let e=c();r(4),w("Unidad Autorizada: ",e.usuarioLogin==null?null:e.usuarioLogin.unidad),r(3),l("ngForOf",e.arregloCupos)}}var hn=(()=>{let a=class a{constructor(n,o,m){this._Activatedroute=n,this._DatospersonalesService=o,this._ServiciosMensajeService=m,this.tipoConsulta="1",this.banderaEspiner=0,this.arregloCupos=new Array,this.identidadregex=/^[0-9]*$/,this.gradosAutorizadoAscenso=new Array,this.formIdentidad=new Te({identidad:new Me("",[U.required,U.pattern(this.identidadregex)])})}get identidad(){return this.formIdentidad.get("identidad")}sacarFechaActual(){this._DatospersonalesService.sacarFecha().subscribe(n=>{this.fechaActual=n.fecha})}ngOnInit(){this.sacarFechaActual(),this.usuarioLogin=JSON.parse(localStorage.getItem("user_login")).user,this.buscarCuposAscenso()}buscarporidentidad(){if(this.formIdentidad.invalid)this._DatospersonalesService.mensajeError("IDENTIDAD NO VALIDA");else{var n={identidad:this.formIdentidad.value.identidad,idfuerza:this.usuarioLogin.idfuerza};this._ServiciosMensajeService.show(),this._DatospersonalesService.consultaPorIdentidad(n).subscribe({next:o=>{if(this._ServiciosMensajeService.hide(),o.error)return this._DatospersonalesService.mensajeError(o.error.sqlMessage);if(o.mensaje)return this._DatospersonalesService.mensajeError(o.mensaje);this.tipoConsulta="0",this.ventanasegundaria=2,this.objetoConsultado=o.resultado[0];var m={autorizado:1};this.sacarGradosAutorizados(m)},error:()=>{this._ServiciosMensajeService.hide(),this._ServiciosMensajeService.mensajeMalo("Error en el servidor")}})}}sacarGradosAutorizados(n){this._DatospersonalesService.sacarGrados(n).subscribe(o=>{o.error||o.mensaje||(this.gradosAutorizadoAscenso=o.resultado)})}ascender(){return R(this,null,function*(){if(yield this._ServiciosMensajeService.mensajePregunta("\xBFDesea guardar el ascenso?")){var o={idpersonal:this.objetoConsultado.identidad,idgradonuevo:this.tarjetaSelected.IdGrado,idcategoria:this.objetoConsultado.idcategoria,idcategoria_cupo:this.tarjetaSelected.idcategoria,fechaAscenso:this.tarjetaSelected.FechaAutorizada,ejecutado_por:this.usuarioLogin.identidad,idunidad:this.usuarioLogin.idunidad,nombrePersonaEjecuto:this.usuarioLogin.nombres+" "+this.usuarioLogin.apellidos,nombresPersonaAfectada:this.objetoConsultado.nombres+" "+this.objetoConsultado.apellidos};if(console.log(this.objetoConsultado),this.objetoConsultado.idcategoria!==this.tarjetaSelected.idcategoria)return this._ServiciosMensajeService.mensajeMalo("La categoria del nuevo grado no coincide con la categoria actual de la persona");if(o.idgradonuevo<=this.objetoConsultado.idgrados)return this._DatospersonalesService.mensajeError("El grado nuevo debe ser mayor al grado actual");this._ServiciosMensajeService.show(),this._DatospersonalesService.guardarascenso(o).subscribe(m=>{this._ServiciosMensajeService.hide(),m.error?(this._DatospersonalesService.mensajeError(m.error),this.banderaEspiner=0):m.mensaje?(this._DatospersonalesService.mensajeError(m.mensaje),this.banderaEspiner=0):(this._DatospersonalesService.mensajeBueno(m.resultado),this.banderaEspiner=0,this.atras(),this.buscarCuposAscenso())}),this.gradoSelected=null}})}atras(){this.tipoConsulta="1",this.ventanasegundaria=0}verificarPermiso(n){return this._DatospersonalesService.verificarPermisos(n)}buscarCuposAscenso(){this.arregloCupos=[];var n={idunidad:this.usuarioLogin.idunidad};this._ServiciosMensajeService.show(),this._DatospersonalesService.sacarcuposAscenso(n).subscribe({next:o=>{if(this._ServiciosMensajeService.hide(),o.error)return this._DatospersonalesService.mensajeError(o.error);o.mensaje||(this.arregloCupos=o.resultado)},error:()=>{this._ServiciosMensajeService.hide(),this._ServiciosMensajeService.mensajeMalo("Error en el servidor")}})}siguiente(n){n.Cupos<=0?this._DatospersonalesService.mensajeError("No cuenta con cupos"):(this.tarjetaSelected=n,this.ventanasegundaria=1,this.tipoConsulta="0")}};a.\u0275fac=function(o){return new(o||a)(E(me),E(ue),E(pe))},a.\u0275cmp=k({type:a,selectors:[["app-ascensos"]],decls:3,vars:3,consts:[["gradoNoNaval",""],["class","container-fluid py-4",4,"ngIf"],[1,"container-fluid","py-4"],[1,"row","justify-content-center"],[1,"col-12","col-lg-6"],["styleClass","shadow-sm"],["pTemplate","header"],[1,"row","g-3",3,"ngSubmit","formGroup"],[1,"col-12","col-md-6"],[1,"form-label"],["pInputText","","type","text","formControlName","identidad","maxlength","13","minlength","13","pattern","^[0-9]*$","required","","name","identidadpersona",1,"w-100"],[1,"col-12","col-md-3"],[1,"form-label","d-block"],["pButton","","type","submit","icon","pi pi-search",1,"w-100",3,"disabled"],["pButton","","type","button","icon","pi pi-arrow-left",1,"w-100",3,"click"],[1,"d-flex","flex-column","flex-md-row","justify-content-between","align-items-md-center","gap-2"],[1,"text-muted","small"],[1,"col-12","col-lg-8"],[1,"row","g-3"],[1,"p-2","border","rounded-2","text-start"],[4,"ngIf","ngIfElse"],[1,"text-danger"],["class","col-12 col-md-3 d-flex align-items-end",4,"ngIf"],["class","col-12 col-md-3 d-flex align-items-center justify-content-center",4,"ngIf"],[1,"col-12","col-md-3","d-flex","align-items-end"],["pButton","","type","button","label","Cancelar","icon","pi pi-times",1,"w-100",3,"click"],[1,"d-flex","justify-content-between","align-items-center"],[1,"mb-0"],["pButton","","type","button","label","Ascender","icon","pi pi-save",1,"w-100",3,"click"],[1,"col-12","col-md-3","d-flex","align-items-center","justify-content-center"],[1,"row","mb-3"],[1,"col-12","d-flex","justify-content-between","align-items-center"],["pButton","","type","button","icon","pi pi-refresh","title","Actualizar",1,"ms-2",3,"click"],["class","col-12 col-sm-6 col-lg-4 col-xl-3",4,"ngFor","ngForOf"],[1,"col-12","col-sm-6","col-lg-4","col-xl-3"],["styleClass","h-100 shadow-sm",3,"header"],[1,"text-center"],["src","ascenso.jpg","alt","Ascenso",1,"img-fluid","rounded","mb-3"],[1,"mb-1"],[1,"mb-1","text-muted"],[1,"text-dark"],[1,"mb-2","text-muted"],[1,"mb-3","text-muted","small"],["pButton","","type","button","label","Siguiente","icon","pi pi-arrow-right",1,"w-100",3,"click"]],template:function(o,m){o&1&&p(0,yt,18,2,"div",1)(1,jt,41,9,"div",1)(2,kt,8,2,"div",1),o&2&&(l("ngIf",m.ventanasegundaria===1),r(),l("ngIf",m.ventanasegundaria===2),r(),l("ngIf",m.tipoConsulta==="1"))},dependencies:[D,le,B,De,je,ye,we,Se,Ae,ze,Oe,Be,Ie,Pe,Ee,ke,Fe,Ne,P,Le,Ve,Ce,xe,qe,Ge,Re,Qe],styles:[".form-wrapper[_ngcontent-%COMP%]{margin-top:1.2rem;display:flex;justify-content:center;width:100%}.form-card[_ngcontent-%COMP%]{border-radius:1.5rem!important;border:none;box-shadow:0 4px 10px #0f172a0f;width:100%;max-width:960px}.form-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:.75rem;padding-bottom:.5rem;border-bottom:1px solid #e5e7eb}.form-title[_ngcontent-%COMP%]{flex:1;text-align:center;font-size:.95rem;font-weight:600}.form-subtitle[_ngcontent-%COMP%]{font-size:.75rem;color:#6c757d;margin-top:.1rem}.btn-back[_ngcontent-%COMP%]{padding-inline:.4rem}.btn-search[_ngcontent-%COMP%]{padding-inline:.7rem}.form-label[_ngcontent-%COMP%]{font-size:.8rem;font-weight:600;color:#4b5563;margin-bottom:.25rem;display:block}input[pInputText][_ngcontent-%COMP%], .p-dropdown[_ngcontent-%COMP%]{font-size:.85rem}@media (max-width: 575.98px){.form-card[_ngcontent-%COMP%]{border-radius:1.2rem!important}.form-header[_ngcontent-%COMP%]{flex-direction:row;align-items:center}.form-title[_ngcontent-%COMP%]{font-size:.9rem}.form-subtitle[_ngcontent-%COMP%]{display:none}}.btn-back-modern[_ngcontent-%COMP%]{background:#f1f5f9!important;border:1px solid #d8dee9!important;color:#0d6efd!important;border-radius:1rem!important;padding:.35rem .9rem!important;font-size:.82rem!important;font-weight:500!important;display:flex;align-items:center;gap:.35rem}.btn-back-modern[_ngcontent-%COMP%]   .p-button-icon[_ngcontent-%COMP%]{font-size:.9rem;color:#0d6efd!important}.btn-back-modern[_ngcontent-%COMP%]:hover{background:#e3e9f2!important;border-color:#c8d0da!important}"]});let t=a;return t})();export{hn as AscensosComponent};
