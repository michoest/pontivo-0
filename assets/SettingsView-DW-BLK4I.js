import{B as H,f as M,m as c,c as g,o as p,s as W,a,R as ne,z as G,a3 as C,ah as N,E as ae,G as F,ai as L,J as ie,K as S,h as x,g as P,i as I,j as $,L as A,M as O,t as m,W as q,_ as oe,w,A as J,u as re,O as U,l as D,e as b,q as h}from"./index-TJWfLTaV.js";import{u as se}from"./projects-tltWaEhR.js";import{s as y}from"./index-B4wMRyL1.js";import{s as j}from"./index-B0NQw7T5.js";import{s as le,a as de}from"./index-ChykZeAO.js";import{_ as ce}from"./_plugin-vue_export-helper-DlAUqK2U.js";var ue=`
    .p-textarea {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('textarea.color');
        background: dt('textarea.background');
        padding-block: dt('textarea.padding.y');
        padding-inline: dt('textarea.padding.x');
        border: 1px solid dt('textarea.border.color');
        transition:
            background dt('textarea.transition.duration'),
            color dt('textarea.transition.duration'),
            border-color dt('textarea.transition.duration'),
            outline-color dt('textarea.transition.duration'),
            box-shadow dt('textarea.transition.duration');
        appearance: none;
        border-radius: dt('textarea.border.radius');
        outline-color: transparent;
        box-shadow: dt('textarea.shadow');
    }

    .p-textarea:enabled:hover {
        border-color: dt('textarea.hover.border.color');
    }

    .p-textarea:enabled:focus {
        border-color: dt('textarea.focus.border.color');
        box-shadow: dt('textarea.focus.ring.shadow');
        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');
        outline-offset: dt('textarea.focus.ring.offset');
    }

    .p-textarea.p-invalid {
        border-color: dt('textarea.invalid.border.color');
    }

    .p-textarea.p-variant-filled {
        background: dt('textarea.filled.background');
    }

    .p-textarea.p-variant-filled:enabled:hover {
        background: dt('textarea.filled.hover.background');
    }

    .p-textarea.p-variant-filled:enabled:focus {
        background: dt('textarea.filled.focus.background');
    }

    .p-textarea:disabled {
        opacity: 1;
        background: dt('textarea.disabled.background');
        color: dt('textarea.disabled.color');
    }

    .p-textarea::placeholder {
        color: dt('textarea.placeholder.color');
    }

    .p-textarea.p-invalid::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }

    .p-textarea-fluid {
        width: 100%;
    }

    .p-textarea-resizable {
        overflow: hidden;
        resize: none;
    }

    .p-textarea-sm {
        font-size: dt('textarea.sm.font.size');
        padding-block: dt('textarea.sm.padding.y');
        padding-inline: dt('textarea.sm.padding.x');
    }

    .p-textarea-lg {
        font-size: dt('textarea.lg.font.size');
        padding-block: dt('textarea.lg.padding.y');
        padding-inline: dt('textarea.lg.padding.x');
    }
`,pe={root:function(e){var n=e.instance,i=e.props;return["p-textarea p-component",{"p-filled":n.$filled,"p-textarea-resizable ":i.autoResize,"p-textarea-sm p-inputfield-sm":i.size==="small","p-textarea-lg p-inputfield-lg":i.size==="large","p-invalid":n.$invalid,"p-variant-filled":n.$variant==="filled","p-textarea-fluid":n.$fluid}]}},be=H.extend({name:"textarea",style:ue,classes:pe}),he={name:"BaseTextarea",extends:le,props:{autoResize:Boolean},style:be,provide:function(){return{$pcTextarea:this,$parentInstance:this}}};function B(t){"@babel/helpers - typeof";return B=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},B(t)}function ge(t,e,n){return(e=ve(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function ve(t){var e=fe(t,"string");return B(e)=="symbol"?e:e+""}function fe(t,e){if(B(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var i=n.call(t,e);if(B(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var Z={name:"Textarea",extends:he,inheritAttrs:!1,observer:null,mounted:function(){var e=this;this.autoResize&&(this.observer=new ResizeObserver(function(){requestAnimationFrame(function(){e.resize()})}),this.observer.observe(this.$el))},updated:function(){this.autoResize&&this.resize()},beforeUnmount:function(){this.observer&&this.observer.disconnect()},methods:{resize:function(){if(this.$el.offsetParent){var e=this.$el.style.height,n=parseInt(e)||0,i=this.$el.scrollHeight,l=!n||i>n,o=n&&i<n;o?(this.$el.style.height="auto",this.$el.style.height="".concat(this.$el.scrollHeight,"px")):l&&(this.$el.style.height="".concat(i,"px"))}},onInput:function(e){this.autoResize&&this.resize(),this.writeValue(e.target.value,e)}},computed:{attrs:function(){return c(this.ptmi("root",{context:{filled:this.$filled,disabled:this.disabled}}),this.formField)},dataP:function(){return M(ge({invalid:this.$invalid,fluid:this.$fluid,filled:this.$variant==="filled"},this.size,this.size))}}},me=["value","name","disabled","aria-invalid","data-p"];function we(t,e,n,i,l,o){return p(),g("textarea",c({class:t.cx("root"),value:t.d_value,name:t.name,disabled:t.disabled,"aria-invalid":t.invalid||void 0,"data-p":o.dataP,onInput:e[0]||(e[0]=function(){return o.onInput&&o.onInput.apply(o,arguments)})},o.attrs),null,16,me)}Z.render=we;var Q={name:"ChevronLeftIcon",extends:W};function ye(t){return Pe(t)||Te(t)||xe(t)||ke()}function ke(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function xe(t,e){if(t){if(typeof t=="string")return E(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?E(t,e):void 0}}function Te(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Pe(t){if(Array.isArray(t))return E(t)}function E(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,i=Array(e);n<e;n++)i[n]=t[n];return i}function Ae(t,e,n,i,l,o){return p(),g("svg",c({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},t.pti()),ye(e[0]||(e[0]=[a("path",{d:"M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z",fill:"currentColor"},null,-1)])),16)}Q.render=Ae;var X={name:"ChevronRightIcon",extends:W};function Ce(t){return Be(t)||$e(t)||Ie(t)||Se()}function Se(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ie(t,e){if(t){if(typeof t=="string")return _(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(t,e):void 0}}function $e(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Be(t){if(Array.isArray(t))return _(t)}function _(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,i=Array(e);n<e;n++)i[n]=t[n];return i}function Ve(t,e,n,i,l,o){return p(),g("svg",c({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},t.pti()),Ce(e[0]||(e[0]=[a("path",{d:"M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z",fill:"currentColor"},null,-1)])),16)}X.render=Ve;var ze=`
    .p-tabview-tablist-container {
        position: relative;
    }

    .p-tabview-scrollable > .p-tabview-tablist-container {
        overflow: hidden;
    }

    .p-tabview-tablist-scroll-container {
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tabview-tablist-scroll-container::-webkit-scrollbar {
        display: none;
    }

    .p-tabview-tablist {
        display: flex;
        margin: 0;
        padding: 0;
        list-style-type: none;
        flex: 1 1 auto;
        background: dt('tabview.tab.list.background');
        border: 1px solid dt('tabview.tab.list.border.color');
        border-width: 0 0 1px 0;
        position: relative;
    }

    .p-tabview-tab-header {
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        text-decoration: none;
        position: relative;
        overflow: hidden;
        border-style: solid;
        border-width: 0 0 1px 0;
        border-color: transparent transparent dt('tabview.tab.border.color') transparent;
        color: dt('tabview.tab.color');
        padding: 1rem 1.125rem;
        font-weight: 600;
        border-top-right-radius: dt('border.radius.md');
        border-top-left-radius: dt('border.radius.md');
        transition:
            color dt('tabview.transition.duration'),
            outline-color dt('tabview.transition.duration');
        margin: 0 0 -1px 0;
        outline-color: transparent;
    }

    .p-tabview-tablist-item:not(.p-disabled) .p-tabview-tab-header:focus-visible {
        outline: dt('focus.ring.width') dt('focus.ring.style') dt('focus.ring.color');
        outline-offset: -1px;
    }

    .p-tabview-tablist-item:not(.p-highlight):not(.p-disabled):hover > .p-tabview-tab-header {
        color: dt('tabview.tab.hover.color');
    }

    .p-tabview-tablist-item.p-highlight > .p-tabview-tab-header {
        color: dt('tabview.tab.active.color');
    }

    .p-tabview-tab-title {
        line-height: 1;
        white-space: nowrap;
    }

    .p-tabview-next-button,
    .p-tabview-prev-button {
        position: absolute;
        top: 0;
        margin: 0;
        padding: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabview.nav.button.background');
        color: dt('tabview.nav.button.color');
        width: 2.5rem;
        border-radius: 0;
        outline-color: transparent;
        transition:
            color dt('tabview.transition.duration'),
            outline-color dt('tabview.transition.duration');
        box-shadow: dt('tabview.nav.button.shadow');
        border: none;
        cursor: pointer;
        user-select: none;
    }

    .p-tabview-next-button:focus-visible,
    .p-tabview-prev-button:focus-visible {
        outline: dt('focus.ring.width') dt('focus.ring.style') dt('focus.ring.color');
        outline-offset: dt('focus.ring.offset');
    }

    .p-tabview-next-button:hover,
    .p-tabview-prev-button:hover {
        color: dt('tabview.nav.button.hover.color');
    }

    .p-tabview-prev-button {
        left: 0;
    }

    .p-tabview-next-button {
        right: 0;
    }

    .p-tabview-panels {
        background: dt('tabview.tab.panel.background');
        color: dt('tabview.tab.panel.color');
        padding: 0.875rem 1.125rem 1.125rem 1.125rem;
    }

    .p-tabview-ink-bar {
        z-index: 1;
        display: block;
        position: absolute;
        bottom: -1px;
        height: 1px;
        background: dt('tabview.tab.active.border.color');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
`,Le={root:function(e){var n=e.props;return["p-tabview p-component",{"p-tabview-scrollable":n.scrollable}]},navContainer:"p-tabview-tablist-container",prevButton:"p-tabview-prev-button",navContent:"p-tabview-tablist-scroll-container",nav:"p-tabview-tablist",tab:{header:function(e){var n=e.instance,i=e.tab,l=e.index;return["p-tabview-tablist-item",n.getTabProp(i,"headerClass"),{"p-tabview-tablist-item-active":n.d_activeIndex===l,"p-disabled":n.getTabProp(i,"disabled")}]},headerAction:"p-tabview-tab-header",headerTitle:"p-tabview-tab-title",content:function(e){var n=e.instance,i=e.tab;return["p-tabview-panel",n.getTabProp(i,"contentClass")]}},inkbar:"p-tabview-ink-bar",nextButton:"p-tabview-next-button",panelContainer:"p-tabview-panels"},De=H.extend({name:"tabview",style:ze,classes:Le}),He={name:"BaseTabView",extends:G,props:{activeIndex:{type:Number,default:0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null},prevIcon:{type:String,default:void 0},nextIcon:{type:String,default:void 0}},style:De,provide:function(){return{$pcTabs:void 0,$pcTabView:this,$parentInstance:this}}},Y={name:"TabView",extends:He,inheritAttrs:!1,emits:["update:activeIndex","tab-change","tab-click"],data:function(){return{d_activeIndex:this.activeIndex,isPrevButtonDisabled:!0,isNextButtonDisabled:!1}},watch:{activeIndex:function(e){this.d_activeIndex=e,this.scrollInView({index:e})}},mounted:function(){console.warn("Deprecated since v4. Use Tabs component instead."),this.updateInkBar(),this.scrollable&&this.updateButtonState()},updated:function(){this.updateInkBar(),this.scrollable&&this.updateButtonState()},methods:{isTabPanel:function(e){return e.type.name==="TabPanel"},isTabActive:function(e){return this.d_activeIndex===e},getTabProp:function(e,n){return e.props?e.props[n]:void 0},getKey:function(e,n){return this.getTabProp(e,"header")||n},getTabHeaderActionId:function(e){return"".concat(this.$id,"_").concat(e,"_header_action")},getTabContentId:function(e){return"".concat(this.$id,"_").concat(e,"_content")},getTabPT:function(e,n,i){var l=this.tabs.length,o={props:e.props,parent:{instance:this,props:this.$props,state:this.$data},context:{index:i,count:l,first:i===0,last:i===l-1,active:this.isTabActive(i)}};return c(this.ptm("tabpanel.".concat(n),{tabpanel:o}),this.ptm("tabpanel.".concat(n),o),this.ptmo(this.getTabProp(e,"pt"),n,o))},onScroll:function(e){this.scrollable&&this.updateButtonState(),e.preventDefault()},onPrevButtonClick:function(){var e=this.$refs.content,n=C(e),i=e.scrollLeft-n;e.scrollLeft=i<=0?0:i},onNextButtonClick:function(){var e=this.$refs.content,n=C(e)-this.getVisibleButtonWidths(),i=e.scrollLeft+n,l=e.scrollWidth-n;e.scrollLeft=i>=l?l:i},onTabClick:function(e,n,i){this.changeActiveIndex(e,n,i),this.$emit("tab-click",{originalEvent:e,index:i})},onTabKeyDown:function(e,n,i){switch(e.code){case"ArrowLeft":this.onTabArrowLeftKey(e);break;case"ArrowRight":this.onTabArrowRightKey(e);break;case"Home":this.onTabHomeKey(e);break;case"End":this.onTabEndKey(e);break;case"PageDown":this.onPageDownKey(e);break;case"PageUp":this.onPageUpKey(e);break;case"Enter":case"NumpadEnter":case"Space":this.onTabEnterKey(e,n,i);break}},onTabArrowRightKey:function(e){var n=this.findNextHeaderAction(e.target.parentElement);n?this.changeFocusedTab(e,n):this.onTabHomeKey(e),e.preventDefault()},onTabArrowLeftKey:function(e){var n=this.findPrevHeaderAction(e.target.parentElement);n?this.changeFocusedTab(e,n):this.onTabEndKey(e),e.preventDefault()},onTabHomeKey:function(e){var n=this.findFirstHeaderAction();this.changeFocusedTab(e,n),e.preventDefault()},onTabEndKey:function(e){var n=this.findLastHeaderAction();this.changeFocusedTab(e,n),e.preventDefault()},onPageDownKey:function(e){this.scrollInView({index:this.$refs.nav.children.length-2}),e.preventDefault()},onPageUpKey:function(e){this.scrollInView({index:0}),e.preventDefault()},onTabEnterKey:function(e,n,i){this.changeActiveIndex(e,n,i),e.preventDefault()},findNextHeaderAction:function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,i=n?e:e.nextElementSibling;return i?L(i,"data-p-disabled")||L(i,"data-pc-section")==="inkbar"?this.findNextHeaderAction(i):F(i,'[data-pc-section="headeraction"]'):null},findPrevHeaderAction:function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,i=n?e:e.previousElementSibling;return i?L(i,"data-p-disabled")||L(i,"data-pc-section")==="inkbar"?this.findPrevHeaderAction(i):F(i,'[data-pc-section="headeraction"]'):null},findFirstHeaderAction:function(){return this.findNextHeaderAction(this.$refs.nav.firstElementChild,!0)},findLastHeaderAction:function(){return this.findPrevHeaderAction(this.$refs.nav.lastElementChild,!0)},changeActiveIndex:function(e,n,i){!this.getTabProp(n,"disabled")&&this.d_activeIndex!==i&&(this.d_activeIndex=i,this.$emit("update:activeIndex",i),this.$emit("tab-change",{originalEvent:e,index:i}),this.scrollInView({index:i}))},changeFocusedTab:function(e,n){if(n&&(ae(n),this.scrollInView({element:n}),this.selectOnFocus)){var i=parseInt(n.parentElement.dataset.pcIndex,10),l=this.tabs[i];this.changeActiveIndex(e,l,i)}},scrollInView:function(e){var n=e.element,i=e.index,l=i===void 0?-1:i,o=n||this.$refs.nav.children[l];o&&o.scrollIntoView&&o.scrollIntoView({block:"nearest"})},updateInkBar:function(){var e=this.$refs.nav.children[this.d_activeIndex];this.$refs.inkbar.style.width=C(e)+"px",this.$refs.inkbar.style.left=N(e).left-N(this.$refs.nav).left+"px"},updateButtonState:function(){var e=this.$refs.content,n=e.scrollLeft,i=e.scrollWidth,l=C(e);this.isPrevButtonDisabled=n===0,this.isNextButtonDisabled=parseInt(n)===i-l},getVisibleButtonWidths:function(){var e=this.$refs,n=e.prevBtn,i=e.nextBtn;return[n,i].reduce(function(l,o){return o?l+C(o):l},0)}},computed:{tabs:function(){var e=this;return this.$slots.default().reduce(function(n,i){return e.isTabPanel(i)?n.push(i):i.children&&i.children instanceof Array&&i.children.forEach(function(l){e.isTabPanel(l)&&n.push(l)}),n},[])},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0}},directives:{ripple:ne},components:{ChevronLeftIcon:Q,ChevronRightIcon:X}};function V(t){"@babel/helpers - typeof";return V=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},V(t)}function R(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(l){return Object.getOwnPropertyDescriptor(t,l).enumerable})),n.push.apply(n,i)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?R(Object(n),!0).forEach(function(i){Ke(t,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(n,i))})}return t}function Ke(t,e,n){return(e=je(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function je(t){var e=Oe(t,"string");return V(e)=="symbol"?e:e+""}function Oe(t,e){if(V(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var i=n.call(t,e);if(V(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var Ee=["tabindex","aria-label"],_e=["data-p-active","data-p-disabled","data-pc-index"],Ne=["id","tabindex","aria-disabled","aria-selected","aria-controls","onClick","onKeydown"],Fe=["tabindex","aria-label"],Ue=["id","aria-labelledby","data-pc-index","data-p-active"];function Re(t,e,n,i,l,o){var v=ie("ripple");return p(),g("div",c({class:t.cx("root"),role:"tablist"},t.ptmi("root")),[a("div",c({class:t.cx("navContainer")},t.ptm("navContainer")),[t.scrollable&&!l.isPrevButtonDisabled?S((p(),g("button",c({key:0,ref:"prevBtn",type:"button",class:t.cx("prevButton"),tabindex:t.tabindex,"aria-label":o.prevButtonAriaLabel,onClick:e[0]||(e[0]=function(){return o.onPrevButtonClick&&o.onPrevButtonClick.apply(o,arguments)})},f(f({},t.prevButtonProps),t.ptm("prevButton")),{"data-pc-group-section":"navbutton"}),[P(t.$slots,"previcon",{},function(){return[(p(),I($(t.prevIcon?"span":"ChevronLeftIcon"),c({"aria-hidden":"true",class:t.prevIcon},t.ptm("prevIcon")),null,16,["class"]))]})],16,Ee)),[[v]]):x("",!0),a("div",c({ref:"content",class:t.cx("navContent"),onScroll:e[1]||(e[1]=function(){return o.onScroll&&o.onScroll.apply(o,arguments)})},t.ptm("navContent")),[a("ul",c({ref:"nav",class:t.cx("nav")},t.ptm("nav")),[(p(!0),g(A,null,O(o.tabs,function(s,d){return p(),g("li",c({key:o.getKey(s,d),style:o.getTabProp(s,"headerStyle"),class:t.cx("tab.header",{tab:s,index:d}),role:"presentation"},{ref_for:!0},f(f(f({},o.getTabProp(s,"headerProps")),o.getTabPT(s,"root",d)),o.getTabPT(s,"header",d)),{"data-pc-name":"tabpanel","data-p-active":l.d_activeIndex===d,"data-p-disabled":o.getTabProp(s,"disabled"),"data-pc-index":d}),[S((p(),g("a",c({id:o.getTabHeaderActionId(d),class:t.cx("tab.headerAction"),tabindex:o.getTabProp(s,"disabled")||!o.isTabActive(d)?-1:t.tabindex,role:"tab","aria-disabled":o.getTabProp(s,"disabled"),"aria-selected":o.isTabActive(d),"aria-controls":o.getTabContentId(d),onClick:function(z){return o.onTabClick(z,s,d)},onKeydown:function(z){return o.onTabKeyDown(z,s,d)}},{ref_for:!0},f(f({},o.getTabProp(s,"headerActionProps")),o.getTabPT(s,"headerAction",d))),[s.props&&s.props.header?(p(),g("span",c({key:0,class:t.cx("tab.headerTitle")},{ref_for:!0},o.getTabPT(s,"headerTitle",d)),m(s.props.header),17)):x("",!0),s.children&&s.children.header?(p(),I($(s.children.header),{key:1})):x("",!0)],16,Ne)),[[v]])],16,_e)}),128)),a("li",c({ref:"inkbar",class:t.cx("inkbar"),role:"presentation","aria-hidden":"true"},t.ptm("inkbar")),null,16)],16)],16),t.scrollable&&!l.isNextButtonDisabled?S((p(),g("button",c({key:1,ref:"nextBtn",type:"button",class:t.cx("nextButton"),tabindex:t.tabindex,"aria-label":o.nextButtonAriaLabel,onClick:e[2]||(e[2]=function(){return o.onNextButtonClick&&o.onNextButtonClick.apply(o,arguments)})},f(f({},t.nextButtonProps),t.ptm("nextButton")),{"data-pc-group-section":"navbutton"}),[P(t.$slots,"nexticon",{},function(){return[(p(),I($(t.nextIcon?"span":"ChevronRightIcon"),c({"aria-hidden":"true",class:t.nextIcon},t.ptm("nextIcon")),null,16,["class"]))]})],16,Fe)),[[v]]):x("",!0)],16),a("div",c({class:t.cx("panelContainer")},t.ptm("panelContainer")),[(p(!0),g(A,null,O(o.tabs,function(s,d){return p(),g(A,{key:o.getKey(s,d)},[!t.lazy||o.isTabActive(d)?S((p(),g("div",c({key:0,id:o.getTabContentId(d),style:o.getTabProp(s,"contentStyle"),class:t.cx("tab.content",{tab:s}),role:"tabpanel","aria-labelledby":o.getTabHeaderActionId(d)},{ref_for:!0},f(f(f({},o.getTabProp(s,"contentProps")),o.getTabPT(s,"root",d)),o.getTabPT(s,"content",d)),{"data-pc-name":"tabpanel","data-pc-index":d,"data-p-active":l.d_activeIndex===d}),[(p(),I($(s)))],16,Ue)),[[q,t.lazy?!0:o.isTabActive(d)]]):x("",!0)],64)}),128))],16)],16)}Y.render=Re;var Me={root:function(e){var n=e.instance;return["p-tabpanel",{"p-tabpanel-active":n.active}]}},We=H.extend({name:"tabpanel",classes:Me}),Ge={name:"BaseTabPanel",extends:G,props:{value:{type:[String,Number],default:void 0},as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1},header:null,headerStyle:null,headerClass:null,headerProps:null,headerActionProps:null,contentStyle:null,contentClass:null,contentProps:null,disabled:Boolean},style:We,provide:function(){return{$pcTabPanel:this,$parentInstance:this}}},T={name:"TabPanel",extends:Ge,inheritAttrs:!1,inject:["$pcTabs"],computed:{active:function(){var e;return oe((e=this.$pcTabs)===null||e===void 0?void 0:e.d_value,this.value)},id:function(){var e;return"".concat((e=this.$pcTabs)===null||e===void 0?void 0:e.$id,"_tabpanel_").concat(this.value)},ariaLabelledby:function(){var e;return"".concat((e=this.$pcTabs)===null||e===void 0?void 0:e.$id,"_tab_").concat(this.value)},attrs:function(){return c(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){var e;return{id:this.id,tabindex:(e=this.$pcTabs)===null||e===void 0?void 0:e.tabindex,role:"tabpanel","aria-labelledby":this.ariaLabelledby,"data-pc-name":"tabpanel","data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function qe(t,e,n,i,l,o){var v,s;return o.$pcTabs?(p(),g(A,{key:1},[t.asChild?P(t.$slots,"default",{key:1,class:J(t.cx("root")),active:o.active,a11yAttrs:o.a11yAttrs}):(p(),g(A,{key:0},[!((v=o.$pcTabs)!==null&&v!==void 0&&v.lazy)||o.active?S((p(),I($(t.as),c({key:0,class:t.cx("root")},o.attrs),{default:w(function(){return[P(t.$slots,"default")]}),_:3},16,["class"])),[[q,(s=o.$pcTabs)!==null&&s!==void 0&&s.lazy?!0:o.active]]):x("",!0)],64))],64)):P(t.$slots,"default",{key:0})}T.render=qe;var Je=`
    .p-toggleswitch {
        display: inline-block;
        width: dt('toggleswitch.width');
        height: dt('toggleswitch.height');
    }

    .p-toggleswitch-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border-radius: dt('toggleswitch.border.radius');
    }

    .p-toggleswitch-slider {
        cursor: pointer;
        width: 100%;
        height: 100%;
        border-width: dt('toggleswitch.border.width');
        border-style: solid;
        border-color: dt('toggleswitch.border.color');
        background: dt('toggleswitch.background');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            border-color dt('toggleswitch.transition.duration'),
            outline-color dt('toggleswitch.transition.duration'),
            box-shadow dt('toggleswitch.transition.duration');
        border-radius: dt('toggleswitch.border.radius');
        outline-color: transparent;
        box-shadow: dt('toggleswitch.shadow');
    }

    .p-toggleswitch-handle {
        position: absolute;
        top: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: dt('toggleswitch.handle.background');
        color: dt('toggleswitch.handle.color');
        width: dt('toggleswitch.handle.size');
        height: dt('toggleswitch.handle.size');
        inset-inline-start: dt('toggleswitch.gap');
        margin-block-start: calc(-1 * calc(dt('toggleswitch.handle.size') / 2));
        border-radius: dt('toggleswitch.handle.border.radius');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            inset-inline-start dt('toggleswitch.slide.duration'),
            box-shadow dt('toggleswitch.slide.duration');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.background');
        border-color: dt('toggleswitch.checked.border.color');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.background');
        color: dt('toggleswitch.handle.checked.color');
        inset-inline-start: calc(dt('toggleswitch.width') - calc(dt('toggleswitch.handle.size') + dt('toggleswitch.gap')));
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
        background: dt('toggleswitch.hover.background');
        border-color: dt('toggleswitch.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.hover.background');
        color: dt('toggleswitch.handle.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.hover.background');
        border-color: dt('toggleswitch.checked.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.hover.background');
        color: dt('toggleswitch.handle.checked.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
        box-shadow: dt('toggleswitch.focus.ring.shadow');
        outline: dt('toggleswitch.focus.ring.width') dt('toggleswitch.focus.ring.style') dt('toggleswitch.focus.ring.color');
        outline-offset: dt('toggleswitch.focus.ring.offset');
    }

    .p-toggleswitch.p-invalid > .p-toggleswitch-slider {
        border-color: dt('toggleswitch.invalid.border.color');
    }

    .p-toggleswitch.p-disabled {
        opacity: 1;
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-slider {
        background: dt('toggleswitch.disabled.background');
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.disabled.background');
    }
`,Ze={root:{position:"relative"}},Qe={root:function(e){var n=e.instance,i=e.props;return["p-toggleswitch p-component",{"p-toggleswitch-checked":n.checked,"p-disabled":i.disabled,"p-invalid":n.$invalid}]},input:"p-toggleswitch-input",slider:"p-toggleswitch-slider",handle:"p-toggleswitch-handle"},Xe=H.extend({name:"toggleswitch",style:Je,classes:Qe,inlineStyles:Ze}),Ye={name:"BaseToggleSwitch",extends:de,props:{trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:Xe,provide:function(){return{$pcToggleSwitch:this,$parentInstance:this}}},ee={name:"ToggleSwitch",extends:Ye,inheritAttrs:!1,emits:["change","focus","blur"],methods:{getPTOptions:function(e){var n=e==="root"?this.ptmi:this.ptm;return n(e,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(e){if(!this.disabled&&!this.readonly){var n=this.checked?this.falseValue:this.trueValue;this.writeValue(n,e),this.$emit("change",e)}},onFocus:function(e){this.$emit("focus",e)},onBlur:function(e){var n,i;this.$emit("blur",e),(n=(i=this.formField).onBlur)===null||n===void 0||n.call(i,e)}},computed:{checked:function(){return this.d_value===this.trueValue},dataP:function(){return M({checked:this.checked,disabled:this.disabled,invalid:this.$invalid})}}},et=["data-p-checked","data-p-disabled","data-p"],tt=["id","checked","tabindex","disabled","readonly","aria-checked","aria-labelledby","aria-label","aria-invalid"],nt=["data-p"],at=["data-p"];function it(t,e,n,i,l,o){return p(),g("div",c({class:t.cx("root"),style:t.sx("root")},o.getPTOptions("root"),{"data-p-checked":o.checked,"data-p-disabled":t.disabled,"data-p":o.dataP}),[a("input",c({id:t.inputId,type:"checkbox",role:"switch",class:[t.cx("input"),t.inputClass],style:t.inputStyle,checked:o.checked,tabindex:t.tabindex,disabled:t.disabled,readonly:t.readonly,"aria-checked":o.checked,"aria-labelledby":t.ariaLabelledby,"aria-label":t.ariaLabel,"aria-invalid":t.invalid||void 0,onFocus:e[0]||(e[0]=function(){return o.onFocus&&o.onFocus.apply(o,arguments)}),onBlur:e[1]||(e[1]=function(){return o.onBlur&&o.onBlur.apply(o,arguments)}),onChange:e[2]||(e[2]=function(){return o.onChange&&o.onChange.apply(o,arguments)})},o.getPTOptions("input")),null,16,tt),a("div",c({class:t.cx("slider")},o.getPTOptions("slider"),{"data-p":o.dataP}),[a("div",c({class:t.cx("handle")},o.getPTOptions("handle"),{"data-p":o.dataP}),[P(t.$slots,"handle",{checked:o.checked})],16,at)],16,nt)],16,et)}ee.render=it;var k={name:"InputSwitch",extends:ee,mounted:function(){console.warn("Deprecated since v4. Use ToggleSwitch component instead.")}};const ot={class:"settings-page"},rt={class:"settings-section"},st={class:"profile-form"},lt={class:"avatar-section"},dt={class:"avatar-preview"},ct={class:"form-grid"},ut={class:"form-group"},pt={class:"form-group"},bt={class:"form-group"},ht={class:"form-actions"},gt={class:"settings-section"},vt={class:"notification-options"},ft={class:"option-item"},mt={class:"option-item"},wt={class:"option-item"},yt={class:"option-item"},kt={class:"settings-section"},xt={class:"notification-options"},Tt={class:"option-item"},Pt={class:"option-item"},At={class:"settings-section"},Ct={class:"instructions-editor"},St={class:"settings-section"},It={class:"section-header"},$t={class:"team-actions"},Bt={class:"team-list"},Vt={class:"member-avatar"},zt={class:"member-info"},Lt={class:"member-name"},Dt={class:"member-email"},Ht={class:"member-role"},Kt={class:"member-actions"},jt={class:"settings-section"},Ot={class:"integrations-grid"},Et={class:"integration-card"},_t={class:"integration-card"},Nt={__name:"SettingsView",setup(t){const e=re(),n=se(),i=U(()=>e.user),l=U(()=>n.currentTenant),o=D({name:i.value?.name||"",email:i.value?.email||"",role:i.value?.role||""}),v=D({emailNotifications:!0,projectUpdates:!0,aiCompletions:!0,weeklyDigest:!1}),s=D({defaultPersona:"sophie",showWorkPanel:!0,autoSuggest:!0}),d=D([{id:"user-1",name:"Anna Schmidt",email:"anna@techstartup.com",role:"Admin"},{id:"user-2",name:"Max Weber",email:"max@techstartup.com",role:"Member"},{id:"user-3",name:"Lisa Braun",email:"lisa@techstartup.com",role:"Member"}]);function K(){console.log("Profile saved:",o.value)}return(z,r)=>(p(),g("div",ot,[r[30]||(r[30]=a("div",{class:"page-header"},[a("h1",null,"Settings"),a("p",null,"Manage your account and preferences")],-1)),b(h(Y),{class:"settings-tabs"},{default:w(()=>[b(h(T),{header:"Profile"},{default:w(()=>[a("div",rt,[r[12]||(r[12]=a("div",{class:"section-header"},[a("h3",null,"Personal Information"),a("p",null,"Update your profile details")],-1)),a("div",st,[a("div",lt,[a("div",dt,m(i.value?.name?.charAt(0)||"U"),1),b(h(y),{label:"Change Avatar",outlined:"",size:"small"})]),a("div",ct,[a("div",ut,[r[9]||(r[9]=a("label",null,"Full Name",-1)),b(h(j),{modelValue:o.value.name,"onUpdate:modelValue":r[0]||(r[0]=u=>o.value.name=u),class:"w-full"},null,8,["modelValue"])]),a("div",pt,[r[10]||(r[10]=a("label",null,"Email Address",-1)),b(h(j),{modelValue:o.value.email,"onUpdate:modelValue":r[1]||(r[1]=u=>o.value.email=u),type:"email",class:"w-full"},null,8,["modelValue"])]),a("div",bt,[r[11]||(r[11]=a("label",null,"Role",-1)),b(h(j),{modelValue:o.value.role,"onUpdate:modelValue":r[2]||(r[2]=u=>o.value.role=u),class:"w-full",disabled:""},null,8,["modelValue"])])]),a("div",ht,[b(h(y),{label:"Save Changes",onClick:K})])])])]),_:1}),b(h(T),{header:"Notifications"},{default:w(()=>[a("div",gt,[r[17]||(r[17]=a("div",{class:"section-header"},[a("h3",null,"Notification Preferences"),a("p",null,"Choose how you want to be notified")],-1)),a("div",vt,[a("div",ft,[r[13]||(r[13]=a("div",{class:"option-info"},[a("span",{class:"option-label"},"Email Notifications"),a("span",{class:"option-desc"},"Receive email updates about your projects")],-1)),b(h(k),{modelValue:v.value.emailNotifications,"onUpdate:modelValue":r[3]||(r[3]=u=>v.value.emailNotifications=u)},null,8,["modelValue"])]),a("div",mt,[r[14]||(r[14]=a("div",{class:"option-info"},[a("span",{class:"option-label"},"Project Updates"),a("span",{class:"option-desc"},"Get notified when milestones are completed")],-1)),b(h(k),{modelValue:v.value.projectUpdates,"onUpdate:modelValue":r[4]||(r[4]=u=>v.value.projectUpdates=u)},null,8,["modelValue"])]),a("div",wt,[r[15]||(r[15]=a("div",{class:"option-info"},[a("span",{class:"option-label"},"AI Task Completions"),a("span",{class:"option-desc"},"Notify when AI consultants complete analysis")],-1)),b(h(k),{modelValue:v.value.aiCompletions,"onUpdate:modelValue":r[5]||(r[5]=u=>v.value.aiCompletions=u)},null,8,["modelValue"])]),a("div",yt,[r[16]||(r[16]=a("div",{class:"option-info"},[a("span",{class:"option-label"},"Weekly Digest"),a("span",{class:"option-desc"},"Receive a weekly summary of all activities")],-1)),b(h(k),{modelValue:v.value.weeklyDigest,"onUpdate:modelValue":r[6]||(r[6]=u=>v.value.weeklyDigest=u)},null,8,["modelValue"])])])])]),_:1}),b(h(T),{header:"AI Preferences"},{default:w(()=>[a("div",kt,[r[20]||(r[20]=a("div",{class:"section-header"},[a("h3",null,"AI Consultant Settings"),a("p",null,"Customize how AI consultants interact with you")],-1)),a("div",xt,[a("div",Tt,[r[18]||(r[18]=a("div",{class:"option-info"},[a("span",{class:"option-label"},"Show Work Panel"),a("span",{class:"option-desc"},"Display AI work transparency panel by default")],-1)),b(h(k),{modelValue:s.value.showWorkPanel,"onUpdate:modelValue":r[7]||(r[7]=u=>s.value.showWorkPanel=u)},null,8,["modelValue"])]),a("div",Pt,[r[19]||(r[19]=a("div",{class:"option-info"},[a("span",{class:"option-label"},"Auto-Suggestions"),a("span",{class:"option-desc"},"Allow AI to proactively suggest actions")],-1)),b(h(k),{modelValue:s.value.autoSuggest,"onUpdate:modelValue":r[8]||(r[8]=u=>s.value.autoSuggest=u)},null,8,["modelValue"])])])]),a("div",At,[r[22]||(r[22]=a("div",{class:"section-header"},[a("h3",null,"Company Context"),a("p",null,"Provide context that helps AI consultants understand your business")],-1)),a("div",Ct,[b(h(Z),{placeholder:"Example: We are a B2B SaaS company focused on HR technology. We prefer using the Jobs to be Done framework for strategic analysis. Our target market is mid-sized companies in the Nordic region...",rows:"6",class:"w-full"}),r[21]||(r[21]=a("div",{class:"instructions-help"},[a("i",{class:"pi pi-info-circle"}),a("span",null,"This context will be shared with Felix and Sophie to provide more relevant advice.")],-1))])])]),_:1}),b(h(T),{header:"Team"},{default:w(()=>[a("div",St,[a("div",It,[r[23]||(r[23]=a("h3",null,"Team Members",-1)),a("p",null,"Manage who has access to "+m(l.value?.name),1)]),a("div",$t,[b(h(y),{label:"Invite Member",icon:"pi pi-user-plus"})]),a("div",Bt,[(p(!0),g(A,null,O(d.value,u=>(p(),g("div",{key:u.id,class:"team-member-row"},[a("div",Vt,m(u.name.split(" ").map(te=>te[0]).join("")),1),a("div",zt,[a("span",Lt,m(u.name),1),a("span",Dt,m(u.email),1)]),a("div",Ht,[a("span",{class:J(["role-badge",u.role.toLowerCase()])},m(u.role),3)]),a("div",Kt,[b(h(y),{icon:"pi pi-ellipsis-v",text:"",rounded:"",size:"small"})])]))),128))])])]),_:1}),b(h(T),{header:"Integrations"},{default:w(()=>[a("div",jt,[r[29]||(r[29]=a("div",{class:"section-header"},[a("h3",null,"Connected Services"),a("p",null,"Manage integrations with external services")],-1)),a("div",Ot,[a("div",Et,[r[24]||(r[24]=a("div",{class:"integration-icon sharepoint"},[a("i",{class:"pi pi-microsoft"})],-1)),r[25]||(r[25]=a("div",{class:"integration-info"},[a("h4",null,"Microsoft SharePoint"),a("p",null,"Sync documents and enable AI access to company files")],-1)),b(h(y),{label:"Connect",outlined:""})]),a("div",_t,[r[26]||(r[26]=a("div",{class:"integration-icon teams"},[a("i",{class:"pi pi-video"})],-1)),r[27]||(r[27]=a("div",{class:"integration-info"},[a("h4",null,"Microsoft Teams"),a("p",null,"Schedule AI consultant calls and collaborate")],-1)),b(h(y),{label:"Connect",outlined:""})]),r[28]||(r[28]=a("div",{class:"integration-card coming-soon"},[a("div",{class:"integration-icon slack"},[a("i",{class:"pi pi-slack"})]),a("div",{class:"integration-info"},[a("h4",null,"Slack"),a("p",null,"Get AI updates and chat directly in Slack")]),a("span",{class:"coming-soon-badge"},"Coming Soon")],-1))])])]),_:1})]),_:1})]))}},qt=ce(Nt,[["__scopeId","data-v-3e9a886a"]]);export{qt as default};
