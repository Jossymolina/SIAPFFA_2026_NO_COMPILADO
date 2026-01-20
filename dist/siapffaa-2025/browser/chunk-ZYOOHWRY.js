import{a as pe}from"./chunk-WGKG6BE3.js";import"./chunk-LEUMVM4K.js";import"./chunk-CNAZPYPR.js";import{a as de,b as me}from"./chunk-PE7WVYJB.js";import"./chunk-CYBTF2RE.js";import"./chunk-W7TJHXMM.js";import{h as ae,i as oe,j as le,k as se,l as ce}from"./chunk-EQMPRG6V.js";import"./chunk-36JN3LZY.js";import"./chunk-M763EXIE.js";import"./chunk-ZPMKEMCQ.js";import"./chunk-QE2BREUU.js";import{c as ie,d as re,e as C}from"./chunk-JPTHL2WT.js";import{fa as S,la as ne}from"./chunk-VAG7FTYF.js";import{C as te,b as G,c as K,d as Q,e as w,l as P,u as X,v as Z,z as ee}from"./chunk-FIATBDAH.js";import{Ca as c,Gb as k,Ha as j,K as B,Kb as b,L as T,Lb as p,Mb as h,N as V,Na as x,Nb as W,P as M,Qb as q,Rb as J,Sa as y,Sb as Y,Ta as D,U as u,V as g,Vb as $,Wa as F,Xa as N,Ya as f,cb as I,db as L,eb as R,fa as O,gc as z,ib as s,jb as r,kb as a,lb as m,sb as _,wb as v,xb as l,yb as U,za as A,zb as H}from"./chunk-XJSKPFVT.js";import"./chunk-OXVY4BEJ.js";var ue=`
    .p-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: dt('avatar.width');
        height: dt('avatar.height');
        font-size: dt('avatar.font.size');
        background: dt('avatar.background');
        color: dt('avatar.color');
        border-radius: dt('avatar.border.radius');
    }

    .p-avatar-image {
        background: transparent;
    }

    .p-avatar-circle {
        border-radius: 50%;
    }

    .p-avatar-circle img {
        border-radius: 50%;
    }

    .p-avatar-icon {
        font-size: dt('avatar.icon.size');
        width: dt('avatar.icon.size');
        height: dt('avatar.icon.size');
    }

    .p-avatar img {
        width: 100%;
        height: 100%;
    }

    .p-avatar-lg {
        width: dt('avatar.lg.width');
        height: dt('avatar.lg.width');
        font-size: dt('avatar.lg.font.size');
    }

    .p-avatar-lg .p-avatar-icon {
        font-size: dt('avatar.lg.icon.size');
        width: dt('avatar.lg.icon.size');
        height: dt('avatar.lg.icon.size');
    }

    .p-avatar-xl {
        width: dt('avatar.xl.width');
        height: dt('avatar.xl.width');
        font-size: dt('avatar.xl.font.size');
    }

    .p-avatar-xl .p-avatar-icon {
        font-size: dt('avatar.xl.icon.size');
        width: dt('avatar.xl.icon.size');
        height: dt('avatar.xl.icon.size');
    }

    .p-avatar-group {
        display: flex;
        align-items: center;
    }

    .p-avatar-group .p-avatar + .p-avatar {
        margin-inline-start: dt('avatar.group.offset');
    }

    .p-avatar-group .p-avatar {
        border: 2px solid dt('avatar.group.border.color');
    }

    .p-avatar-group .p-avatar-lg + .p-avatar-lg {
        margin-inline-start: dt('avatar.lg.group.offset');
    }

    .p-avatar-group .p-avatar-xl + .p-avatar-xl {
        margin-inline-start: dt('avatar.xl.group.offset');
    }
`;var he=["*"];function Ce(e,o){if(e&1&&(r(0,"span",3),p(1),a()),e&2){let t=l();b(t.cx("label")),s("pBind",t.ptm("label")),c(),h(t.label)}}function Me(e,o){if(e&1&&m(0,"span",5),e&2){let t=l(2);b(t.icon),s("pBind",t.ptm("icon"))("ngClass",t.cx("icon"))}}function ye(e,o){if(e&1&&f(0,Me,1,4,"span",4),e&2){let t=l(),i=k(5);s("ngIf",t.icon)("ngIfElse",i)}}function we(e,o){if(e&1){let t=_();r(0,"img",7),v("error",function(n){u(t);let d=l(2);return g(d.imageError(n))}),a()}if(e&2){let t=l(2);s("pBind",t.ptm("image"))("src",t.image,A),I("aria-label",t.ariaLabel)}}function Pe(e,o){if(e&1&&f(0,we,1,3,"img",6),e&2){let t=l();s("ngIf",t.image)}}var Se={root:({instance:e})=>["p-avatar p-component",{"p-avatar-image":e.image!=null,"p-avatar-circle":e.shape==="circle","p-avatar-lg":e.size==="large","p-avatar-xl":e.size==="xlarge"}],label:"p-avatar-label",icon:"p-avatar-icon"},ge=(()=>{class e extends ne{name="avatar";style=ue;classes=Se;static \u0275fac=(()=>{let t;return function(n){return(t||(t=O(e)))(n||e)}})();static \u0275prov=B({token:e,factory:e.\u0275fac})}return e})();var fe=new V("AVATAR_INSTANCE"),E=(()=>{class e extends re{$pcAvatar=M(fe,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=M(C,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}label;icon;image;size="normal";shape="square";styleClass;ariaLabel;ariaLabelledBy;onImageError=new j;_componentStyle=M(ge);imageError(t){this.onImageError.emit(t)}static \u0275fac=(()=>{let t;return function(n){return(t||(t=O(e)))(n||e)}})();static \u0275cmp=y({type:e,selectors:[["p-avatar"]],hostVars:4,hostBindings:function(i,n){i&2&&(I("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledBy),b(n.cn(n.cx("root"),n.styleClass)))},inputs:{label:"label",icon:"icon",image:"image",size:"size",shape:"shape",styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy"},outputs:{onImageError:"onImageError"},features:[$([ge,{provide:fe,useExisting:e},{provide:ie,useExisting:e}]),N([C]),F],ngContentSelectors:he,decls:6,vars:2,consts:[["iconTemplate",""],["imageTemplate",""],[3,"pBind","class",4,"ngIf","ngIfElse"],[3,"pBind"],[3,"pBind","class","ngClass",4,"ngIf","ngIfElse"],[3,"pBind","ngClass"],[3,"pBind","src","error",4,"ngIf"],[3,"error","pBind","src"]],template:function(i,n){if(i&1&&(U(),H(0),f(1,Ce,2,4,"span",2)(2,ye,1,2,"ng-template",null,0,z)(4,Pe,1,1,"ng-template",null,1,z)),i&2){let d=k(3);c(),s("ngIf",n.label)("ngIfElse",d)}},dependencies:[P,K,w,S,C],encapsulation:2,changeDetection:0})}return e})(),ve=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=D({type:e});static \u0275inj=T({imports:[E,S,S]})}return e})();function Oe(e,o){if(e&1){let t=_();r(0,"div",24),v("click",function(){let n=u(t).$implicit,d=l(2);return g(d.openModule(n))}),r(1,"div",25),m(2,"i"),a(),r(3,"div",26)(4,"div",27),p(5),a()()()}if(e&2){let t=o.$implicit;c(2),b(t.icon),c(3),h(t.label)}}function Ie(e,o){if(e&1){let t=_();r(0,"div",0)(1,"div",2)(2,"header",3)(3,"div",4),m(4,"p-avatar",5),r(5,"div",6)(6,"div",7),p(7),a(),r(8,"div",8),p(9,"Sistema de Administraci\xF3n"),a()()(),r(10,"div",9)(11,"span",10),m(12,"span",11),p(13," En l\xEDnea "),a(),r(14,"button",12),v("click",function(){u(t);let n=l();return g(n.openMenu())}),m(15,"i",13),a()()(),r(16,"div",14)(17,"p-button",15),v("onClick",function(){u(t);let n=l();return g(n.volverAtras())}),a()(),m(18,"router-outlet"),a(),r(19,"p-drawer",16),Y("visibleChange",function(n){u(t);let d=l();return J(d.menuVisible,n)||(d.menuVisible=n),g(n)}),r(20,"div",17),m(21,"p-avatar",18),r(22,"div",19)(23,"div",20),p(24),a(),r(25,"div",21),p(26,"Administrador"),a()()(),r(27,"div",22),f(28,Oe,6,3,"div",23),a()()()}if(e&2){let t=l();c(4),s("image",t._ServicioBackendService.url2+"sacarfoto/"+(t.usuariologuiado==null?null:t.usuariologuiado.foto)),c(3),W("Hola, ",t.usuariologuiado.nombres),c(12),q("visible",t.menuVisible),s("modal",!0)("dismissible",!0)("showCloseIcon",!1),c(2),s("image",t._ServicioBackendService.url2+"sacarfoto/"+(t.usuariologuiado==null?null:t.usuariologuiado.foto)),c(3),h(t.usuariologuiado.nombres),c(4),s("ngForOf",t.menuItems)}}function ke(e,o){if(e&1){let t=_();r(0,"div",1)(1,"button",29),v("click",function(){u(t);let n=l(2);return g(n.cerrarSesion("/autenticarse"))}),m(2,"i",30),r(3,"span",31),p(4,"Salir"),a()(),m(5,"app-visualizar-perfil",32),a()}if(e&2){let t=l(2);c(5),s("identidad",t.usuariologuiado.identidad)}}function ze(e,o){if(e&1&&f(0,ke,6,1,"div",28),e&2){let t=l();s("ngIf",t.usuariologuiado)}}var ot=(()=>{let o=class o{constructor(i,n,d,_e){this.router=i,this._ServiciosMensajeService=n,this._ServicioBackendService=d,this.location=_e,this.permisoPersonal=!1,this.menuVisible=!1,this.menuItems=[{label:"Mi perfil",icon:"pi pi-user",route:"/perfil"},{label:"Menu principal",icon:"pi pi-bars",route:"/menu/menu-principal"},{label:"Ayuda / Soporte",icon:"pi pi-question-circle",route:"/ayuda"},{label:"Cerrar sesi\xF3n",icon:"pi pi-sign-out",route:"/autenticarse"}]}ngOnInit(){this.usuariologuiado=JSON.parse(localStorage.getItem("user_login")).user,this.sacarPermisoPersonal()}volverAtras(){this.location.back()}openModule(i){if(i.route){if(i.route==="/autenticarse")return this.cerrarSesion(i.route);this.router.navigate([i.route])}}sacarPermisoPersonal(){this.permisoPersonal=this._ServicioBackendService.verificarPermisos(["User_admin","User_admin02","User_admin01"])}cerrarSesion(i){this._ServiciosMensajeService.show("Cerrando sesion \u{1F553}\u{1F974}"),localStorage.clear(),setTimeout(()=>{this._ServiciosMensajeService.hide(),this.router.navigate([i])},2e3)}openMenu(){this.menuVisible=!0}onSelectMenuItem(i){this.menuVisible=!1,i.route&&this.router.navigate([i.route]),i.label}};o.\u0275fac=function(n){return new(n||o)(x(Z),x(ee),x(te),x(G))},o.\u0275cmp=y({type:o,selectors:[["app-menu-principal"]],decls:2,vars:1,consts:[[1,"dashboard-root"],[2,"margin","20px"],[1,"dashboard-wrapper","container-fluid"],[1,"top-bar","shadow-sm"],[1,"top-bar-left"],["shape","circle","size","large",2,"width","70px","height","70px",3,"image"],[1,"top-bar-text"],[1,"welcome"],[1,"subtitle"],[1,"top-bar-right"],[1,"status-pill"],[1,"dot"],["pButton","","type","button",1,"p-button-rounded","p-button-outlined","top-menu-btn","btn-back-modern",3,"click"],[1,"pi","pi-align-justify"],[2,"margin","10px 0"],["label","Atr\xE1s","icon","pi pi-angle-double-left",3,"onClick"],["position","right","styleClass","menu-sidebar",3,"visibleChange","visible","modal","dismissible","showCloseIcon"],[1,"menu-header"],["shape","circle","size","large",3,"image"],[1,"menu-header-text"],[1,"name"],[1,"role"],[1,"menu-items"],["class","menu-item",3,"click",4,"ngFor","ngForOf"],[1,"menu-item",3,"click"],[1,"menu-item-icon"],[1,"menu-item-text"],[1,"menu-item-label"],["style","margin: 20px;",4,"ngIf"],["pButton","",3,"click"],["pButtonIcon","",1,"pi","pi-sign-out"],["pButtonLabel",""],[3,"identidad"]],template:function(n,d){n&1&&L(0,Ie,29,9,"div",0)(1,ze,1,1,"div",1),n&2&&R(d.permisoPersonal?0:1)},dependencies:[P,Q,w,X,E,ve,ce,le,se,ae,oe,me,de,pe],styles:["[_nghost-%COMP%]{display:block;height:100vh}.dashboard-root[_ngcontent-%COMP%]{height:100%;background:#f5f7fb;display:flex;flex-direction:column}.dashboard-wrapper[_ngcontent-%COMP%]{padding:1rem .75rem .75rem;max-width:100%;margin:0 auto 1.5rem;flex:1;display:flex;flex-direction:column}.top-bar[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;background:#fff;border-radius:1rem;padding:.6rem .9rem;border:1px solid #e3e6ec}.top-bar-left[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem}.top-bar-text[_ngcontent-%COMP%]   .welcome[_ngcontent-%COMP%]{font-size:.95rem;font-weight:600}.top-bar-text[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%]{font-size:.75rem;color:#6c757d}.top-bar-right[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.6rem}.status-pill[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.35rem;padding:.25rem .55rem;border-radius:999px;background-color:#e0f9ea;color:#137333;font-size:.7rem}.status-pill[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%]{width:8px;height:8px;border-radius:50%;background-color:#34a853}.top-menu-btn[_ngcontent-%COMP%]{width:2.3rem;height:2.3rem;border-color:#d0d7ff;background-color:#f7f8ff;display:inline-flex;align-items:center;justify-content:center}.top-menu-btn[_ngcontent-%COMP%]   .p-button-icon[_ngcontent-%COMP%]{font-size:1.2rem;color:#0d6efd}.top-menu-btn[_ngcontent-%COMP%]:hover{background-color:#e9edff;border-color:#bcc6ff}.modules-container[_ngcontent-%COMP%]{margin-top:1.2rem;flex:1;overflow-y:auto;padding-bottom:.5rem}.module-card[_ngcontent-%COMP%]{border-radius:1.5rem!important;border:none;box-shadow:0 4px 10px #0f172a0f;transition:transform .12s ease-out,box-shadow .12s ease-out;cursor:pointer}.module-card[_ngcontent-%COMP%]:hover{transform:translateY(-3px);box-shadow:0 10px 24px #0f172a1f}.module-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;padding:.9rem .9rem 1rem}.module-icon-wrapper[_ngcontent-%COMP%]{width:48px;height:48px;border-radius:1.25rem;display:flex;align-items:center;justify-content:center;margin-bottom:.7rem;background:#f1f5f9}.module-icon[_ngcontent-%COMP%]{font-size:1.4rem;color:#0d6efd}.module-title[_ngcontent-%COMP%]{font-size:.95rem;font-weight:600;margin:0 0 .25rem}.module-description[_ngcontent-%COMP%]{font-size:.8rem;color:#6c757d;margin:0}.menu-sidebar[_ngcontent-%COMP%]{width:270px;max-width:80vw;padding:0}.menu-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem;padding:.9rem 1rem;border-bottom:1px solid #e5e7eb}.menu-header-text[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:.9rem;font-weight:600}.menu-header-text[_ngcontent-%COMP%]   .role[_ngcontent-%COMP%]{font-size:.75rem;color:#6b7280}.menu-items[_ngcontent-%COMP%]{padding:.5rem .4rem .8rem}.menu-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.7rem;padding:.55rem .8rem;border-radius:.8rem;cursor:pointer;transition:background-color .12s ease-out,transform .08s ease-out}.menu-item[_ngcontent-%COMP%]:hover{background-color:#eef2ff;transform:translate(-2px)}.menu-item-icon[_ngcontent-%COMP%]{width:32px;height:32px;border-radius:.9rem;background-color:#e0ebff;display:flex;align-items:center;justify-content:center}.menu-item-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.1rem;color:#0d6efd}.menu-item-label[_ngcontent-%COMP%]{font-size:.9rem;font-weight:500}@media (max-width: 575.98px){.dashboard-wrapper[_ngcontent-%COMP%]{padding:.6rem;margin-bottom:0}.top-bar[_ngcontent-%COMP%]{border-radius:.9rem;padding:.5rem .7rem}.module-card[_ngcontent-%COMP%]{border-radius:1.2rem!important}.module-content[_ngcontent-%COMP%]{padding:.85rem .85rem .95rem}}.btn-back-modern[_ngcontent-%COMP%]{background:#f1f5f9!important;border:1px solid #d8dee9!important;color:#0d6efd!important;border-radius:1rem!important;padding:.35rem .9rem!important;font-size:.82rem!important;font-weight:500!important;display:flex;align-items:center;gap:.35rem}.btn-back-modern[_ngcontent-%COMP%]   .p-button-icon[_ngcontent-%COMP%]{font-size:.9rem;color:#0d6efd!important}.btn-back-modern[_ngcontent-%COMP%]:hover{background:#e3e9f2!important;border-color:#c8d0da!important}.btn-atras[_ngcontent-%COMP%]{margin:100px!important;margin-bottom:100px}"]});let e=o;return e})();export{ot as MenuPrincipalComponent};
