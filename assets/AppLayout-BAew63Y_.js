import{B as Y,z as B,f as H,c as d,o as s,g as j,i as I,h as v,m,t as c,A as P,j as R,d as ee,R as te,Y as ne,C as ie,D as ae,v as E,x as T,S as se,E as C,F as x,G as U,H as re,J as oe,a,K as le,r as V,w as k,e as g,T as de,L as _,M,N as ue,u as ce,l as z,y as pe,O as K,P as me,n as fe,q as u,Q as Z,U as he,V as be}from"./index-CbzVJKEm.js";import{u as ve}from"./projects-Ch0C1mIN.js";import{s as ge}from"./index-BzTg3daf.js";import{s as A}from"./index-C-0CayRn.js";import{O as ye}from"./index-B_jXYs5O.js";import{_ as ke}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-Bg-DBNc4.js";import"./index-BdlZ54ow.js";var Ie=`
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
`,Le={root:function(t){var n=t.props;return["p-avatar p-component",{"p-avatar-image":n.image!=null,"p-avatar-circle":n.shape==="circle","p-avatar-lg":n.size==="large","p-avatar-xl":n.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},Oe=Y.extend({name:"avatar",style:Ie,classes:Le}),_e={name:"BaseAvatar",extends:B,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:Oe,provide:function(){return{$pcAvatar:this,$parentInstance:this}}};function S(e){"@babel/helpers - typeof";return S=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(e)}function q(e,t,n){return(t=we(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function we(e){var t=Pe(e,"string");return S(t)=="symbol"?t:t+""}function Pe(e,t){if(S(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var l=n.call(e,t);if(S(l)!="object")return l;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var G={name:"Avatar",extends:_e,inheritAttrs:!1,emits:["error"],methods:{onError:function(t){this.$emit("error",t)}},computed:{dataP:function(){return H(q(q({},this.shape,this.shape),this.size,this.size))}}},Se=["aria-labelledby","aria-label","data-p"],Ce=["data-p"],xe=["data-p"],ze=["src","alt","data-p"];function Ae(e,t,n,l,r,i){return s(),d("div",m({class:e.cx("root"),"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel},e.ptmi("root"),{"data-p":i.dataP}),[j(e.$slots,"default",{},function(){return[e.label?(s(),d("span",m({key:0,class:e.cx("label")},e.ptm("label"),{"data-p":i.dataP}),c(e.label),17,Ce)):e.$slots.icon?(s(),I(R(e.$slots.icon),{key:1,class:P(e.cx("icon"))},null,8,["class"])):e.icon?(s(),d("span",m({key:2,class:[e.cx("icon"),e.icon]},e.ptm("icon"),{"data-p":i.dataP}),null,16,xe)):e.image?(s(),d("img",m({key:3,src:e.image,alt:e.ariaLabel,onError:t[0]||(t[0]=function(){return i.onError&&i.onError.apply(i,arguments)})},e.ptm("image"),{"data-p":i.dataP}),null,16,ze)):v("",!0)]})],16,Se)}G.render=Ae;var je=`
    .p-menu {
        background: dt('menu.background');
        color: dt('menu.color');
        border: 1px solid dt('menu.border.color');
        border-radius: dt('menu.border.radius');
        min-width: 12.5rem;
    }

    .p-menu-list {
        margin: 0;
        padding: dt('menu.list.padding');
        outline: 0 none;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: dt('menu.list.gap');
    }

    .p-menu-item-content {
        transition:
            background dt('menu.transition.duration'),
            color dt('menu.transition.duration');
        border-radius: dt('menu.item.border.radius');
        color: dt('menu.item.color');
        overflow: hidden;
    }

    .p-menu-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('menu.item.padding');
        gap: dt('menu.item.gap');
        user-select: none;
        outline: 0 none;
    }

    .p-menu-item-label {
        line-height: 1;
    }

    .p-menu-item-icon {
        color: dt('menu.item.icon.color');
    }

    .p-menu-item.p-focus .p-menu-item-content {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item.p-focus .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-overlay {
        box-shadow: dt('menu.shadow');
    }

    .p-menu-submenu-label {
        background: dt('menu.submenu.label.background');
        padding: dt('menu.submenu.label.padding');
        color: dt('menu.submenu.label.color');
        font-weight: dt('menu.submenu.label.font.weight');
    }

    .p-menu-separator {
        border-block-start: 1px solid dt('menu.separator.border.color');
    }
`,Me={root:function(t){var n=t.props;return["p-menu p-component",{"p-menu-overlay":n.popup}]},start:"p-menu-start",list:"p-menu-list",submenuLabel:"p-menu-submenu-label",separator:"p-menu-separator",end:"p-menu-end",item:function(t){var n=t.instance;return["p-menu-item",{"p-focus":n.id===n.focusedOptionId,"p-disabled":n.disabled()}]},itemContent:"p-menu-item-content",itemLink:"p-menu-item-link",itemIcon:"p-menu-item-icon",itemLabel:"p-menu-item-label"},Ee=Y.extend({name:"menu",style:je,classes:Me}),Te={name:"BaseMenu",extends:B,props:{popup:{type:Boolean,default:!1},model:{type:Array,default:null},appendTo:{type:[String,Object],default:"body"},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:Ee,provide:function(){return{$pcMenu:this,$parentInstance:this}}},J={name:"Menuitem",hostName:"Menu",extends:B,inheritAttrs:!1,emits:["item-click","item-mousemove"],props:{item:null,templates:null,id:null,focusedOptionId:null,index:null},methods:{getItemProp:function(t,n){return t&&t.item?re(t.item[n]):void 0},getPTOptions:function(t){return this.ptm(t,{context:{item:this.item,index:this.index,focused:this.isItemFocused(),disabled:this.disabled()}})},isItemFocused:function(){return this.focusedOptionId===this.id},onItemClick:function(t){var n=this.getItemProp(this.item,"command");n&&n({originalEvent:t,item:this.item.item}),this.$emit("item-click",{originalEvent:t,item:this.item,id:this.id})},onItemMouseMove:function(t){this.$emit("item-mousemove",{originalEvent:t,item:this.item,id:this.id})},visible:function(){return typeof this.item.visible=="function"?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled=="function"?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label=="function"?this.item.label():this.item.label},getMenuItemProps:function(t){return{action:m({class:this.cx("itemLink"),tabindex:"-1"},this.getPTOptions("itemLink")),icon:m({class:[this.cx("itemIcon"),t.icon]},this.getPTOptions("itemIcon")),label:m({class:this.cx("itemLabel")},this.getPTOptions("itemLabel"))}}},computed:{dataP:function(){return H({focus:this.isItemFocused(),disabled:this.disabled()})}},directives:{ripple:te}},Ke=["id","aria-label","aria-disabled","data-p-focused","data-p-disabled","data-p"],Re=["data-p"],Ve=["href","target"],De=["data-p"],Fe=["data-p"];function Be(e,t,n,l,r,i){var L=oe("ripple");return i.visible()?(s(),d("li",m({key:0,id:n.id,class:[e.cx("item"),n.item.class],role:"menuitem",style:n.item.style,"aria-label":i.label(),"aria-disabled":i.disabled(),"data-p-focused":i.isItemFocused(),"data-p-disabled":i.disabled()||!1,"data-p":i.dataP},i.getPTOptions("item")),[a("div",m({class:e.cx("itemContent"),onClick:t[0]||(t[0]=function(O){return i.onItemClick(O)}),onMousemove:t[1]||(t[1]=function(O){return i.onItemMouseMove(O)}),"data-p":i.dataP},i.getPTOptions("itemContent")),[n.templates.item?n.templates.item?(s(),I(R(n.templates.item),{key:1,item:n.item,label:i.label(),props:i.getMenuItemProps(n.item)},null,8,["item","label","props"])):v("",!0):le((s(),d("a",m({key:0,href:n.item.url,class:e.cx("itemLink"),target:n.item.target,tabindex:"-1"},i.getPTOptions("itemLink")),[n.templates.itemicon?(s(),I(R(n.templates.itemicon),{key:0,item:n.item,class:P(e.cx("itemIcon"))},null,8,["item","class"])):n.item.icon?(s(),d("span",m({key:1,class:[e.cx("itemIcon"),n.item.icon],"data-p":i.dataP},i.getPTOptions("itemIcon")),null,16,De)):v("",!0),a("span",m({class:e.cx("itemLabel"),"data-p":i.dataP},i.getPTOptions("itemLabel")),c(i.label()),17,Fe)],16,Ve)),[[L]])],16,Re)],16,Ke)):v("",!0)}J.render=Be;function W(e){return Ze(e)||Ue(e)||Ne(e)||He()}function He(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ne(e,t){if(e){if(typeof e=="string")return D(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?D(e,t):void 0}}function Ue(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Ze(e){if(Array.isArray(e))return D(e)}function D(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,l=Array(t);n<t;n++)l[n]=e[n];return l}var F={name:"Menu",extends:Te,inheritAttrs:!1,emits:["show","hide","focus","blur"],data:function(){return{overlayVisible:!1,focused:!1,focusedOptionIndex:-1,selectedOptionIndex:-1}},target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,list:null,mounted:function(){this.popup||(this.bindResizeListener(),this.bindOutsideClickListener())},beforeUnmount:function(){this.unbindResizeListener(),this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.target=null,this.container&&this.autoZIndex&&T.clear(this.container),this.container=null},methods:{itemClick:function(t){var n=t.item;this.disabled(n)||(n.command&&n.command(t),this.overlayVisible&&this.hide(),!this.popup&&this.focusedOptionIndex!==t.id&&(this.focusedOptionIndex=t.id))},itemMouseMove:function(t){this.focused&&(this.focusedOptionIndex=t.id)},onListFocus:function(t){this.focused=!0,!this.popup&&this.changeFocusedOptionIndex(0),this.$emit("focus",t)},onListBlur:function(t){this.focused=!1,this.focusedOptionIndex=-1,this.$emit("blur",t)},onListKeyDown:function(t){switch(t.code){case"ArrowDown":this.onArrowDownKey(t);break;case"ArrowUp":this.onArrowUpKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"Enter":case"NumpadEnter":this.onEnterKey(t);break;case"Space":this.onSpaceKey(t);break;case"Escape":this.popup&&(C(this.target),this.hide());case"Tab":this.overlayVisible&&this.hide();break}},onArrowDownKey:function(t){var n=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(n),t.preventDefault()},onArrowUpKey:function(t){if(t.altKey&&this.popup)C(this.target),this.hide(),t.preventDefault();else{var n=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(n),t.preventDefault()}},onHomeKey:function(t){this.changeFocusedOptionIndex(0),t.preventDefault()},onEndKey:function(t){this.changeFocusedOptionIndex(x(this.container,'li[data-pc-section="item"][data-p-disabled="false"]').length-1),t.preventDefault()},onEnterKey:function(t){var n=U(this.list,'li[id="'.concat("".concat(this.focusedOptionIndex),'"]')),l=n&&U(n,'a[data-pc-section="itemlink"]');this.popup&&C(this.target),l?l.click():n&&n.click(),t.preventDefault()},onSpaceKey:function(t){this.onEnterKey(t)},findNextOptionIndex:function(t){var n=x(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),l=W(n).findIndex(function(r){return r.id===t});return l>-1?l+1:0},findPrevOptionIndex:function(t){var n=x(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),l=W(n).findIndex(function(r){return r.id===t});return l>-1?l-1:0},changeFocusedOptionIndex:function(t){var n=x(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),l=t>=n.length?n.length-1:t<0?0:t;l>-1&&(this.focusedOptionIndex=n[l].getAttribute("id"))},toggle:function(t,n){this.overlayVisible?this.hide():this.show(t,n)},show:function(t,n){this.overlayVisible=!0,this.target=n??t.currentTarget},hide:function(){this.overlayVisible=!1,this.target=null},onEnter:function(t){se(t,{position:"absolute",top:"0"}),this.alignOverlay(),this.bindOutsideClickListener(),this.bindResizeListener(),this.bindScrollListener(),this.autoZIndex&&T.set("menu",t,this.baseZIndex+this.$primevue.config.zIndex.menu),this.popup&&C(this.list),this.$emit("show")},onLeave:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindScrollListener(),this.$emit("hide")},onAfterLeave:function(t){this.autoZIndex&&T.clear(t)},alignOverlay:function(){ae(this.container,this.target);var t=E(this.target);t>E(this.container)&&(this.container.style.minWidth=E(this.target)+"px")},bindOutsideClickListener:function(){var t=this;this.outsideClickListener||(this.outsideClickListener=function(n){var l=t.container&&!t.container.contains(n.target),r=!(t.target&&(t.target===n.target||t.target.contains(n.target)));t.overlayVisible&&l&&r?t.hide():!t.popup&&l&&r&&(t.focusedOptionIndex=-1)},document.addEventListener("click",this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener,!0),this.outsideClickListener=null)},bindScrollListener:function(){var t=this;this.scrollHandler||(this.scrollHandler=new ie(this.target,function(){t.overlayVisible&&t.hide()})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var t=this;this.resizeListener||(this.resizeListener=function(){t.overlayVisible&&!ne()&&t.hide()},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},visible:function(t){return typeof t.visible=="function"?t.visible():t.visible!==!1},disabled:function(t){return typeof t.disabled=="function"?t.disabled():t.disabled},label:function(t){return typeof t.label=="function"?t.label():t.label},onOverlayClick:function(t){ye.emit("overlay-click",{originalEvent:t,target:this.target})},containerRef:function(t){this.container=t},listRef:function(t){this.list=t}},computed:{focusedOptionId:function(){return this.focusedOptionIndex!==-1?this.focusedOptionIndex:null},dataP:function(){return H({popup:this.popup})}},components:{PVMenuitem:J,Portal:ee}},qe=["id","data-p"],We=["id","tabindex","aria-activedescendant","aria-label","aria-labelledby"],Ye=["id"];function Ge(e,t,n,l,r,i){var L=V("PVMenuitem"),O=V("Portal");return s(),I(O,{appendTo:e.appendTo,disabled:!e.popup},{default:k(function(){return[g(de,m({name:"p-anchored-overlay",onEnter:i.onEnter,onLeave:i.onLeave,onAfterLeave:i.onAfterLeave},e.ptm("transition")),{default:k(function(){return[!e.popup||r.overlayVisible?(s(),d("div",m({key:0,ref:i.containerRef,id:e.$id,class:e.cx("root"),onClick:t[3]||(t[3]=function(){return i.onOverlayClick&&i.onOverlayClick.apply(i,arguments)}),"data-p":i.dataP},e.ptmi("root")),[e.$slots.start?(s(),d("div",m({key:0,class:e.cx("start")},e.ptm("start")),[j(e.$slots,"start")],16)):v("",!0),a("ul",m({ref:i.listRef,id:e.$id+"_list",class:e.cx("list"),role:"menu",tabindex:e.tabindex,"aria-activedescendant":r.focused?i.focusedOptionId:void 0,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,onFocus:t[0]||(t[0]=function(){return i.onListFocus&&i.onListFocus.apply(i,arguments)}),onBlur:t[1]||(t[1]=function(){return i.onListBlur&&i.onListBlur.apply(i,arguments)}),onKeydown:t[2]||(t[2]=function(){return i.onListKeyDown&&i.onListKeyDown.apply(i,arguments)})},e.ptm("list")),[(s(!0),d(_,null,M(e.model,function(f,h){return s(),d(_,{key:i.label(f)+h.toString()},[f.items&&i.visible(f)&&!f.separator?(s(),d(_,{key:0},[f.items?(s(),d("li",m({key:0,id:e.$id+"_"+h,class:[e.cx("submenuLabel"),f.class],role:"none"},{ref_for:!0},e.ptm("submenuLabel")),[j(e.$slots,e.$slots.submenulabel?"submenulabel":"submenuheader",{item:f},function(){return[ue(c(i.label(f)),1)]})],16,Ye)):v("",!0),(s(!0),d(_,null,M(f.items,function(y,w){return s(),d(_,{key:y.label+h+"_"+w},[i.visible(y)&&!y.separator?(s(),I(L,{key:0,id:e.$id+"_"+h+"_"+w,item:y,templates:e.$slots,focusedOptionId:i.focusedOptionId,unstyled:e.unstyled,onItemClick:i.itemClick,onItemMousemove:i.itemMouseMove,pt:e.pt},null,8,["id","item","templates","focusedOptionId","unstyled","onItemClick","onItemMousemove","pt"])):i.visible(y)&&y.separator?(s(),d("li",m({key:"separator"+h+w,class:[e.cx("separator"),f.class],style:y.style,role:"separator"},{ref_for:!0},e.ptm("separator")),null,16)):v("",!0)],64)}),128))],64)):i.visible(f)&&f.separator?(s(),d("li",m({key:"separator"+h.toString(),class:[e.cx("separator"),f.class],style:f.style,role:"separator"},{ref_for:!0},e.ptm("separator")),null,16)):(s(),I(L,{key:i.label(f)+h.toString(),id:e.$id+"_"+h,item:f,index:h,templates:e.$slots,focusedOptionId:i.focusedOptionId,unstyled:e.unstyled,onItemClick:i.itemClick,onItemMousemove:i.itemMouseMove,pt:e.pt},null,8,["id","item","index","templates","focusedOptionId","unstyled","onItemClick","onItemMousemove","pt"]))],64)}),128))],16,We),e.$slots.end?(s(),d("div",m({key:1,class:e.cx("end")},e.ptm("end")),[j(e.$slots,"end")],16)):v("",!0)],16,qe)):v("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo","disabled"])}F.render=Ge;const Je={class:"app-layout"},Qe={class:"app-sidebar"},Xe={class:"sidebar-tenant"},$e={key:0,class:"tenant-selected"},et={class:"tenant-avatar"},tt={class:"tenant-name"},nt={key:1},it={class:"tenant-option"},at={class:"tenant-avatar"},st={class:"tenant-info"},rt={class:"tenant-name"},ot={class:"tenant-industry"},lt={class:"sidebar-nav"},dt={key:0,class:"sidebar-projects"},ut={class:"projects-list"},ct={class:"project-info"},pt={class:"project-name"},mt={class:"project-status"},ft={key:1,class:"sidebar-current-project"},ht={class:"current-project-card"},bt={class:"current-project-info"},vt={class:"current-project-name"},gt={class:"current-project-status badge badge-success"},yt={class:"sidebar-user"},kt={class:"user-info"},It={class:"user-name"},Lt={class:"user-role"},Ot={class:"app-main"},_t={class:"app-header"},wt={class:"header-breadcrumb"},Pt={class:"breadcrumb-item"},St={key:0,class:"pi pi-chevron-right breadcrumb-separator"},Ct={key:1,class:"breadcrumb-item"},xt={class:"header-actions"},zt={class:"notifications-wrapper"},At={class:"notifications-header"},jt={key:0,class:"notification-dot"},Mt={class:"notification-content"},Et={class:"notification-title"},Tt={class:"notification-message"},Kt={class:"notification-time"},Rt={class:"app-content"},Vt={__name:"AppLayout",setup(e){const t=pe(),n=be(),l=ce(),r=ve(),i=z(null),L=z(null),O=z([{label:"Profile",icon:"pi pi-user",command:()=>{}},{label:"Settings",icon:"pi pi-cog",command:()=>t.push("/app/settings")},{separator:!0},{label:"Sign Out",icon:"pi pi-sign-out",command:()=>Q()}]),f=z([{id:1,title:"Felix completed analysis",message:"Competitive analysis for Sweden is ready",time:"2h ago",read:!1},{id:2,title:"Milestone approaching",message:"Phase 2 deadline in 5 days",time:"1d ago",read:!1},{id:3,title:"New document",message:"Sophie created Strategic Roadmap",time:"2d ago",read:!0}]),h=K(()=>f.value.filter(b=>!b.read).length),y=K(()=>r.currentTenant?.name||"Select Tenant"),w=K(()=>{const b=[{label:"Dashboard",icon:"pi pi-home",to:"/app/dashboard"}];if(r.currentProjectId){const p=r.currentProjectId;b.push({label:"Overview",icon:"pi pi-chart-bar",to:`/app/project/${p}/overview`},{label:"Timeline",icon:"pi pi-calendar",to:`/app/project/${p}/timeline`},{label:"AI Consultant",icon:"pi pi-comments",to:`/app/project/${p}/chat`},{label:"Files",icon:"pi pi-folder",to:`/app/project/${p}/files`},{label:"Strategy",icon:"pi pi-compass",to:`/app/project/${p}/strategy`})}return b});function Q(){l.logout(),t.push("/login")}function X(b){i.value.toggle(b)}function $(b){r.setCurrentTenant(b.id),r.setCurrentProject(null),t.push("/app/dashboard")}return me(()=>n.params.projectId,b=>{b&&r.setCurrentProject(b)},{immediate:!0}),(b,p)=>{const N=V("RouterLink");return s(),d("div",Je,[a("aside",Qe,[p[5]||(p[5]=fe('<div class="sidebar-logo" data-v-1ceab738><div class="logo-icon" data-v-1ceab738><svg width="32" height="32" viewBox="0 0 32 32" fill="none" data-v-1ceab738><rect width="32" height="32" rx="8" fill="#2563eb" data-v-1ceab738></rect><path d="M8 16C8 11.582 11.582 8 16 8V8C20.418 8 24 11.582 24 16V24H16C11.582 24 8 20.418 8 16V16Z" fill="white" fill-opacity="0.9" data-v-1ceab738></path><circle cx="16" cy="16" r="4" fill="#2563eb" data-v-1ceab738></circle></svg></div><span class="logo-text" data-v-1ceab738>Pontivo</span></div>',1)),a("div",Xe,[g(u(ge),{options:u(r).tenants,optionLabel:"name",modelValue:u(r).currentTenant,"onUpdate:modelValue":$,placeholder:"Select Tenant",class:"tenant-dropdown"},{value:k(({value:o})=>[o?(s(),d("div",$e,[a("div",et,c(o.name.charAt(0)),1),a("span",tt,c(o.name),1)])):(s(),d("span",nt,"Select Tenant"))]),option:k(({option:o})=>[a("div",it,[a("div",at,c(o.name.charAt(0)),1),a("div",st,[a("div",rt,c(o.name),1),a("div",ot,c(o.industry),1)])])]),_:1},8,["options","modelValue"])]),a("nav",lt,[(s(!0),d(_,null,M(w.value,o=>(s(),I(N,{key:o.to,to:o.to,class:P(["nav-item",{active:u(n).path===o.to}])},{default:k(()=>[a("i",{class:P(o.icon)},null,2),a("span",null,c(o.label),1)]),_:2},1032,["to","class"]))),128))]),u(r).currentProjectId?(s(),d("div",ft,[p[3]||(p[3]=a("div",{class:"current-project-header"},"Current Project",-1)),a("div",ht,[a("div",{class:"project-health-ring",style:Z({"--health":u(r).currentProject?.health+"%"})},[a("span",null,c(u(r).currentProject?.health)+"%",1)],4),a("div",bt,[a("div",vt,c(u(r).currentProject?.name),1),a("div",gt,c(u(r).currentProject?.status),1)])]),g(u(A),{label:"Back to Dashboard",icon:"pi pi-arrow-left",text:"",size:"small",onClick:p[0]||(p[0]=o=>u(t).push("/app/dashboard")),class:"back-button"})])):(s(),d("div",dt,[p[2]||(p[2]=a("div",{class:"projects-header"},[a("span",null,"Projects")],-1)),a("div",ut,[(s(!0),d(_,null,M(u(r).tenantProjects,o=>(s(),I(N,{key:o.id,to:`/app/project/${o.id}/overview`,class:"project-item"},{default:k(()=>[a("div",{class:"project-health",style:Z({"--health":o.health+"%"})},[a("span",null,c(o.health),1)],4),a("div",ct,[a("div",pt,c(o.name),1),a("div",mt,c(o.status),1)])]),_:2},1032,["to"]))),128))])])),a("div",yt,[a("div",{class:"user-card",onClick:X},[g(u(G),{label:u(l).user?.name?.charAt(0)||"U",shape:"circle",class:"user-avatar"},null,8,["label"]),a("div",kt,[a("div",It,c(u(l).user?.name),1),a("div",Lt,c(u(l).user?.role),1)]),p[4]||(p[4]=a("i",{class:"pi pi-chevron-up"},null,-1))]),g(u(F),{ref_key:"userMenuRef",ref:i,model:O.value,popup:!0},null,8,["model"])])]),a("main",Ot,[a("header",_t,[a("div",wt,[a("span",Pt,c(y.value),1),u(r).currentProject?(s(),d("i",St)):v("",!0),u(r).currentProject?(s(),d("span",Ct,c(u(r).currentProject.name),1)):v("",!0)]),a("div",xt,[a("div",zt,[g(u(A),{icon:"pi pi-bell",text:"",rounded:"",badge:h.value>0?String(h.value):null,badgeSeverity:"danger",onClick:p[1]||(p[1]=o=>L.value.toggle(o))},null,8,["badge"]),g(u(F),{ref_key:"notificationsRef",ref:L,popup:!0,class:"notifications-menu"},{start:k(()=>[a("div",At,[p[6]||(p[6]=a("span",null,"Notifications",-1)),g(u(A),{label:"Mark all read",text:"",size:"small"})])]),item:k(({item:o})=>[a("div",{class:P(["notification-item",{unread:!o.read}])},[o.read?v("",!0):(s(),d("div",jt)),a("div",Mt,[a("div",Et,c(o.title),1),a("div",Tt,c(o.message),1),a("div",Kt,c(o.time),1)])],2)]),_:1},512)]),g(u(A),{icon:"pi pi-question-circle",text:"",rounded:""})])]),a("div",Rt,[g(u(he))])])])}}},Wt=ke(Vt,[["__scopeId","data-v-1ceab738"]]);export{Wt as default};
