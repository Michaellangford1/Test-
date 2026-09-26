var dy=Object.defineProperty;var fy=(e,t,n)=>t in e?dy(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var et=(e,t,n)=>fy(e,typeof t!="symbol"?t+"":t,n);function hy(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const a in r)if(a!=="default"&&!(a in e)){const i=Object.getOwnPropertyDescriptor(r,a);i&&Object.defineProperty(e,a,i.get?i:{enumerable:!0,get:()=>r[a]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();var Kf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Rp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ep={exports:{}},Yo={},Dp={exports:{}},Ce={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xi=Symbol.for("react.element"),py=Symbol.for("react.portal"),my=Symbol.for("react.fragment"),gy=Symbol.for("react.strict_mode"),yy=Symbol.for("react.profiler"),vy=Symbol.for("react.provider"),xy=Symbol.for("react.context"),Cy=Symbol.for("react.forward_ref"),My=Symbol.for("react.suspense"),by=Symbol.for("react.memo"),Ay=Symbol.for("react.lazy"),zf=Symbol.iterator;function Sy(e){return e===null||typeof e!="object"?null:(e=zf&&e[zf]||e["@@iterator"],typeof e=="function"?e:null)}var Np={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},wp=Object.assign,jp={};function Ba(e,t,n){this.props=e,this.context=t,this.refs=jp,this.updater=n||Np}Ba.prototype.isReactComponent={};Ba.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ba.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Tp(){}Tp.prototype=Ba.prototype;function $c(e,t,n){this.props=e,this.context=t,this.refs=jp,this.updater=n||Np}var Uc=$c.prototype=new Tp;Uc.constructor=$c;wp(Uc,Ba.prototype);Uc.isPureReactComponent=!0;var $f=Array.isArray,Lp=Object.prototype.hasOwnProperty,Wc={current:null},Pp={key:!0,ref:!0,__self:!0,__source:!0};function Fp(e,t,n){var r,a={},i=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(i=""+t.key),t)Lp.call(t,r)&&!Pp.hasOwnProperty(r)&&(a[r]=t[r]);var d=arguments.length-2;if(d===1)a.children=n;else if(1<d){for(var c=Array(d),h=0;h<d;h++)c[h]=arguments[h+2];a.children=c}if(e&&e.defaultProps)for(r in d=e.defaultProps,d)a[r]===void 0&&(a[r]=d[r]);return{$$typeof:Xi,type:e,key:i,ref:l,props:a,_owner:Wc.current}}function ky(e,t){return{$$typeof:Xi,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Jc(e){return typeof e=="object"&&e!==null&&e.$$typeof===Xi}function Ry(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Uf=/\/+/g;function ru(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Ry(""+e.key):t.toString(36)}function io(e,t,n,r,a){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case Xi:case py:l=!0}}if(l)return l=e,a=a(l),e=r===""?"."+ru(l,0):r,$f(a)?(n="",e!=null&&(n=e.replace(Uf,"$&/")+"/"),io(a,t,n,"",function(h){return h})):a!=null&&(Jc(a)&&(a=ky(a,n+(!a.key||l&&l.key===a.key?"":(""+a.key).replace(Uf,"$&/")+"/")+e)),t.push(a)),1;if(l=0,r=r===""?".":r+":",$f(e))for(var d=0;d<e.length;d++){i=e[d];var c=r+ru(i,d);l+=io(i,t,n,c,a)}else if(c=Sy(e),typeof c=="function")for(e=c.call(e),d=0;!(i=e.next()).done;)i=i.value,c=r+ru(i,d++),l+=io(i,t,n,c,a);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function Bs(e,t,n){if(e==null)return e;var r=[],a=0;return io(e,r,"","",function(i){return t.call(n,i,a++)}),r}function Ey(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Et={current:null},so={transition:null},Dy={ReactCurrentDispatcher:Et,ReactCurrentBatchConfig:so,ReactCurrentOwner:Wc};function Gp(){throw Error("act(...) is not supported in production builds of React.")}Ce.Children={map:Bs,forEach:function(e,t,n){Bs(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Bs(e,function(){t++}),t},toArray:function(e){return Bs(e,function(t){return t})||[]},only:function(e){if(!Jc(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Ce.Component=Ba;Ce.Fragment=my;Ce.Profiler=yy;Ce.PureComponent=$c;Ce.StrictMode=gy;Ce.Suspense=My;Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Dy;Ce.act=Gp;Ce.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=wp({},e.props),a=e.key,i=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,l=Wc.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var d=e.type.defaultProps;for(c in t)Lp.call(t,c)&&!Pp.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&d!==void 0?d[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){d=Array(c);for(var h=0;h<c;h++)d[h]=arguments[h+2];r.children=d}return{$$typeof:Xi,type:e.type,key:a,ref:i,props:r,_owner:l}};Ce.createContext=function(e){return e={$$typeof:xy,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:vy,_context:e},e.Consumer=e};Ce.createElement=Fp;Ce.createFactory=function(e){var t=Fp.bind(null,e);return t.type=e,t};Ce.createRef=function(){return{current:null}};Ce.forwardRef=function(e){return{$$typeof:Cy,render:e}};Ce.isValidElement=Jc;Ce.lazy=function(e){return{$$typeof:Ay,_payload:{_status:-1,_result:e},_init:Ey}};Ce.memo=function(e,t){return{$$typeof:by,type:e,compare:t===void 0?null:t}};Ce.startTransition=function(e){var t=so.transition;so.transition={};try{e()}finally{so.transition=t}};Ce.unstable_act=Gp;Ce.useCallback=function(e,t){return Et.current.useCallback(e,t)};Ce.useContext=function(e){return Et.current.useContext(e)};Ce.useDebugValue=function(){};Ce.useDeferredValue=function(e){return Et.current.useDeferredValue(e)};Ce.useEffect=function(e,t){return Et.current.useEffect(e,t)};Ce.useId=function(){return Et.current.useId()};Ce.useImperativeHandle=function(e,t,n){return Et.current.useImperativeHandle(e,t,n)};Ce.useInsertionEffect=function(e,t){return Et.current.useInsertionEffect(e,t)};Ce.useLayoutEffect=function(e,t){return Et.current.useLayoutEffect(e,t)};Ce.useMemo=function(e,t){return Et.current.useMemo(e,t)};Ce.useReducer=function(e,t,n){return Et.current.useReducer(e,t,n)};Ce.useRef=function(e){return Et.current.useRef(e)};Ce.useState=function(e){return Et.current.useState(e)};Ce.useSyncExternalStore=function(e,t,n){return Et.current.useSyncExternalStore(e,t,n)};Ce.useTransition=function(){return Et.current.useTransition()};Ce.version="18.3.1";Dp.exports=Ce;var I=Dp.exports;const oa=Rp(I),Ny=hy({__proto__:null,default:oa},[I]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wy=I,jy=Symbol.for("react.element"),Ty=Symbol.for("react.fragment"),Ly=Object.prototype.hasOwnProperty,Py=wy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Fy={key:!0,ref:!0,__self:!0,__source:!0};function Bp(e,t,n){var r,a={},i=null,l=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(l=t.ref);for(r in t)Ly.call(t,r)&&!Fy.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)a[r]===void 0&&(a[r]=t[r]);return{$$typeof:jy,type:e,key:i,ref:l,props:a,_owner:Py.current}}Yo.Fragment=Ty;Yo.jsx=Bp;Yo.jsxs=Bp;Ep.exports=Yo;var o=Ep.exports,Lu={},Ip={exports:{}},Wt={},Op={exports:{}},_p={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(ne,ce){var de=ne.length;ne.push(ce);e:for(;0<de;){var Fe=de-1>>>1,De=ne[Fe];if(0<a(De,ce))ne[Fe]=ce,ne[de]=De,de=Fe;else break e}}function n(ne){return ne.length===0?null:ne[0]}function r(ne){if(ne.length===0)return null;var ce=ne[0],de=ne.pop();if(de!==ce){ne[0]=de;e:for(var Fe=0,De=ne.length,Yr=De>>>1;Fe<Yr;){var Nt=2*(Fe+1)-1,Qr=ne[Nt],Ht=Nt+1,an=ne[Ht];if(0>a(Qr,de))Ht<De&&0>a(an,Qr)?(ne[Fe]=an,ne[Ht]=de,Fe=Ht):(ne[Fe]=Qr,ne[Nt]=de,Fe=Nt);else if(Ht<De&&0>a(an,de))ne[Fe]=an,ne[Ht]=de,Fe=Ht;else break e}}return ce}function a(ne,ce){var de=ne.sortIndex-ce.sortIndex;return de!==0?de:ne.id-ce.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var l=Date,d=l.now();e.unstable_now=function(){return l.now()-d}}var c=[],h=[],g=1,m=null,x=3,C=!1,b=!1,R=!1,E=typeof setTimeout=="function"?setTimeout:null,M=typeof clearTimeout=="function"?clearTimeout:null,A=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function D(ne){for(var ce=n(h);ce!==null;){if(ce.callback===null)r(h);else if(ce.startTime<=ne)r(h),ce.sortIndex=ce.expirationTime,t(c,ce);else break;ce=n(h)}}function _(ne){if(R=!1,D(ne),!b)if(n(c)!==null)b=!0,Cr(z);else{var ce=n(h);ce!==null&&Ha(_,ce.startTime-ne)}}function z(ne,ce){b=!1,R&&(R=!1,M(se),se=-1),C=!0;var de=x;try{for(D(ce),m=n(c);m!==null&&(!(m.expirationTime>ce)||ne&&!ht());){var Fe=m.callback;if(typeof Fe=="function"){m.callback=null,x=m.priorityLevel;var De=Fe(m.expirationTime<=ce);ce=e.unstable_now(),typeof De=="function"?m.callback=De:m===n(c)&&r(c),D(ce)}else r(c);m=n(c)}if(m!==null)var Yr=!0;else{var Nt=n(h);Nt!==null&&Ha(_,Nt.startTime-ce),Yr=!1}return Yr}finally{m=null,x=de,C=!1}}var X=!1,ee=null,se=-1,Pe=5,me=-1;function ht(){return!(e.unstable_now()-me<Pe)}function rn(){if(ee!==null){var ne=e.unstable_now();me=ne;var ce=!0;try{ce=ee(!0,ne)}finally{ce?Gt():(X=!1,ee=null)}}else X=!1}var Gt;if(typeof A=="function")Gt=function(){A(rn)};else if(typeof MessageChannel<"u"){var us=new MessageChannel,Ja=us.port2;us.port1.onmessage=rn,Gt=function(){Ja.postMessage(null)}}else Gt=function(){E(rn,0)};function Cr(ne){ee=ne,X||(X=!0,Gt())}function Ha(ne,ce){se=E(function(){ne(e.unstable_now())},ce)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(ne){ne.callback=null},e.unstable_continueExecution=function(){b||C||(b=!0,Cr(z))},e.unstable_forceFrameRate=function(ne){0>ne||125<ne?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Pe=0<ne?Math.floor(1e3/ne):5},e.unstable_getCurrentPriorityLevel=function(){return x},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(ne){switch(x){case 1:case 2:case 3:var ce=3;break;default:ce=x}var de=x;x=ce;try{return ne()}finally{x=de}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(ne,ce){switch(ne){case 1:case 2:case 3:case 4:case 5:break;default:ne=3}var de=x;x=ne;try{return ce()}finally{x=de}},e.unstable_scheduleCallback=function(ne,ce,de){var Fe=e.unstable_now();switch(typeof de=="object"&&de!==null?(de=de.delay,de=typeof de=="number"&&0<de?Fe+de:Fe):de=Fe,ne){case 1:var De=-1;break;case 2:De=250;break;case 5:De=1073741823;break;case 4:De=1e4;break;default:De=5e3}return De=de+De,ne={id:g++,callback:ce,priorityLevel:ne,startTime:de,expirationTime:De,sortIndex:-1},de>Fe?(ne.sortIndex=de,t(h,ne),n(c)===null&&ne===n(h)&&(R?(M(se),se=-1):R=!0,Ha(_,de-Fe))):(ne.sortIndex=De,t(c,ne),b||C||(b=!0,Cr(z))),ne},e.unstable_shouldYield=ht,e.unstable_wrapCallback=function(ne){var ce=x;return function(){var de=x;x=ce;try{return ne.apply(this,arguments)}finally{x=de}}}})(_p);Op.exports=_p;var Gy=Op.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var By=I,$t=Gy;function Y(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Kp=new Set,Ti={};function Jr(e,t){Ea(e,t),Ea(e+"Capture",t)}function Ea(e,t){for(Ti[e]=t,e=0;e<t.length;e++)Kp.add(t[e])}var Pn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Pu=Object.prototype.hasOwnProperty,Iy=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Wf={},Jf={};function Oy(e){return Pu.call(Jf,e)?!0:Pu.call(Wf,e)?!1:Iy.test(e)?Jf[e]=!0:(Wf[e]=!0,!1)}function _y(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Ky(e,t,n,r){if(t===null||typeof t>"u"||_y(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Dt(e,t,n,r,a,i,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=l}var ft={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ft[e]=new Dt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ft[t]=new Dt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ft[e]=new Dt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ft[e]=new Dt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ft[e]=new Dt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ft[e]=new Dt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ft[e]=new Dt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ft[e]=new Dt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ft[e]=new Dt(e,5,!1,e.toLowerCase(),null,!1,!1)});var Hc=/[\-:]([a-z])/g;function Vc(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Hc,Vc);ft[t]=new Dt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Hc,Vc);ft[t]=new Dt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Hc,Vc);ft[t]=new Dt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ft[e]=new Dt(e,1,!1,e.toLowerCase(),null,!1,!1)});ft.xlinkHref=new Dt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ft[e]=new Dt(e,1,!1,e.toLowerCase(),null,!0,!0)});function qc(e,t,n,r){var a=ft.hasOwnProperty(t)?ft[t]:null;(a!==null?a.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Ky(t,n,a,r)&&(n=null),r||a===null?Oy(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,r=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var On=By.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Is=Symbol.for("react.element"),la=Symbol.for("react.portal"),ua=Symbol.for("react.fragment"),Yc=Symbol.for("react.strict_mode"),Fu=Symbol.for("react.profiler"),zp=Symbol.for("react.provider"),$p=Symbol.for("react.context"),Qc=Symbol.for("react.forward_ref"),Gu=Symbol.for("react.suspense"),Bu=Symbol.for("react.suspense_list"),Zc=Symbol.for("react.memo"),qn=Symbol.for("react.lazy"),Up=Symbol.for("react.offscreen"),Hf=Symbol.iterator;function li(e){return e===null||typeof e!="object"?null:(e=Hf&&e[Hf]||e["@@iterator"],typeof e=="function"?e:null)}var Ue=Object.assign,au;function yi(e){if(au===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);au=t&&t[1]||""}return`
`+au+e}var iu=!1;function su(e,t){if(!e||iu)return"";iu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(h){var r=h}Reflect.construct(e,[],t)}else{try{t.call()}catch(h){r=h}e.call(t.prototype)}else{try{throw Error()}catch(h){r=h}e()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var a=h.stack.split(`
`),i=r.stack.split(`
`),l=a.length-1,d=i.length-1;1<=l&&0<=d&&a[l]!==i[d];)d--;for(;1<=l&&0<=d;l--,d--)if(a[l]!==i[d]){if(l!==1||d!==1)do if(l--,d--,0>d||a[l]!==i[d]){var c=`
`+a[l].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=l&&0<=d);break}}}finally{iu=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?yi(e):""}function zy(e){switch(e.tag){case 5:return yi(e.type);case 16:return yi("Lazy");case 13:return yi("Suspense");case 19:return yi("SuspenseList");case 0:case 2:case 15:return e=su(e.type,!1),e;case 11:return e=su(e.type.render,!1),e;case 1:return e=su(e.type,!0),e;default:return""}}function Iu(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ua:return"Fragment";case la:return"Portal";case Fu:return"Profiler";case Yc:return"StrictMode";case Gu:return"Suspense";case Bu:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case $p:return(e.displayName||"Context")+".Consumer";case zp:return(e._context.displayName||"Context")+".Provider";case Qc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Zc:return t=e.displayName||null,t!==null?t:Iu(e.type)||"Memo";case qn:t=e._payload,e=e._init;try{return Iu(e(t))}catch{}}return null}function $y(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Iu(t);case 8:return t===Yc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function fr(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Wp(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Uy(e){var t=Wp(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(l){r=""+l,i.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Os(e){e._valueTracker||(e._valueTracker=Uy(e))}function Jp(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Wp(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Mo(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ou(e,t){var n=t.checked;return Ue({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Vf(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=fr(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Hp(e,t){t=t.checked,t!=null&&qc(e,"checked",t,!1)}function _u(e,t){Hp(e,t);var n=fr(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ku(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ku(e,t.type,fr(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function qf(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ku(e,t,n){(t!=="number"||Mo(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var vi=Array.isArray;function Ca(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+fr(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function zu(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(Y(91));return Ue({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Yf(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(Y(92));if(vi(n)){if(1<n.length)throw Error(Y(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:fr(n)}}function Vp(e,t){var n=fr(t.value),r=fr(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Qf(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function qp(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function $u(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?qp(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var _s,Yp=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(_s=_s||document.createElement("div"),_s.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=_s.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Li(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var bi={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Wy=["Webkit","ms","Moz","O"];Object.keys(bi).forEach(function(e){Wy.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),bi[t]=bi[e]})});function Qp(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||bi.hasOwnProperty(e)&&bi[e]?(""+t).trim():t+"px"}function Zp(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,a=Qp(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}var Jy=Ue({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Uu(e,t){if(t){if(Jy[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(Y(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(Y(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(Y(61))}if(t.style!=null&&typeof t.style!="object")throw Error(Y(62))}}function Wu(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ju=null;function Xc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Hu=null,Ma=null,ba=null;function Zf(e){if(e=ns(e)){if(typeof Hu!="function")throw Error(Y(280));var t=e.stateNode;t&&(t=tl(t),Hu(e.stateNode,e.type,t))}}function Xp(e){Ma?ba?ba.push(e):ba=[e]:Ma=e}function em(){if(Ma){var e=Ma,t=ba;if(ba=Ma=null,Zf(e),t)for(e=0;e<t.length;e++)Zf(t[e])}}function tm(e,t){return e(t)}function nm(){}var ou=!1;function rm(e,t,n){if(ou)return e(t,n);ou=!0;try{return tm(e,t,n)}finally{ou=!1,(Ma!==null||ba!==null)&&(nm(),em())}}function Pi(e,t){var n=e.stateNode;if(n===null)return null;var r=tl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(Y(231,t,typeof n));return n}var Vu=!1;if(Pn)try{var ui={};Object.defineProperty(ui,"passive",{get:function(){Vu=!0}}),window.addEventListener("test",ui,ui),window.removeEventListener("test",ui,ui)}catch{Vu=!1}function Hy(e,t,n,r,a,i,l,d,c){var h=Array.prototype.slice.call(arguments,3);try{t.apply(n,h)}catch(g){this.onError(g)}}var Ai=!1,bo=null,Ao=!1,qu=null,Vy={onError:function(e){Ai=!0,bo=e}};function qy(e,t,n,r,a,i,l,d,c){Ai=!1,bo=null,Hy.apply(Vy,arguments)}function Yy(e,t,n,r,a,i,l,d,c){if(qy.apply(this,arguments),Ai){if(Ai){var h=bo;Ai=!1,bo=null}else throw Error(Y(198));Ao||(Ao=!0,qu=h)}}function Hr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function am(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Xf(e){if(Hr(e)!==e)throw Error(Y(188))}function Qy(e){var t=e.alternate;if(!t){if(t=Hr(e),t===null)throw Error(Y(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var i=a.alternate;if(i===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return Xf(a),e;if(i===r)return Xf(a),t;i=i.sibling}throw Error(Y(188))}if(n.return!==r.return)n=a,r=i;else{for(var l=!1,d=a.child;d;){if(d===n){l=!0,n=a,r=i;break}if(d===r){l=!0,r=a,n=i;break}d=d.sibling}if(!l){for(d=i.child;d;){if(d===n){l=!0,n=i,r=a;break}if(d===r){l=!0,r=i,n=a;break}d=d.sibling}if(!l)throw Error(Y(189))}}if(n.alternate!==r)throw Error(Y(190))}if(n.tag!==3)throw Error(Y(188));return n.stateNode.current===n?e:t}function im(e){return e=Qy(e),e!==null?sm(e):null}function sm(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=sm(e);if(t!==null)return t;e=e.sibling}return null}var om=$t.unstable_scheduleCallback,eh=$t.unstable_cancelCallback,Zy=$t.unstable_shouldYield,Xy=$t.unstable_requestPaint,Ye=$t.unstable_now,ev=$t.unstable_getCurrentPriorityLevel,ed=$t.unstable_ImmediatePriority,lm=$t.unstable_UserBlockingPriority,So=$t.unstable_NormalPriority,tv=$t.unstable_LowPriority,um=$t.unstable_IdlePriority,Qo=null,bn=null;function nv(e){if(bn&&typeof bn.onCommitFiberRoot=="function")try{bn.onCommitFiberRoot(Qo,e,void 0,(e.current.flags&128)===128)}catch{}}var hn=Math.clz32?Math.clz32:iv,rv=Math.log,av=Math.LN2;function iv(e){return e>>>=0,e===0?32:31-(rv(e)/av|0)|0}var Ks=64,zs=4194304;function xi(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ko(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,a=e.suspendedLanes,i=e.pingedLanes,l=n&268435455;if(l!==0){var d=l&~a;d!==0?r=xi(d):(i&=l,i!==0&&(r=xi(i)))}else l=n&~a,l!==0?r=xi(l):i!==0&&(r=xi(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&a)&&(a=r&-r,i=t&-t,a>=i||a===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-hn(t),a=1<<n,r|=e[n],t&=~a;return r}function sv(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ov(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,i=e.pendingLanes;0<i;){var l=31-hn(i),d=1<<l,c=a[l];c===-1?(!(d&n)||d&r)&&(a[l]=sv(d,t)):c<=t&&(e.expiredLanes|=d),i&=~d}}function Yu(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function cm(){var e=Ks;return Ks<<=1,!(Ks&4194240)&&(Ks=64),e}function lu(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function es(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-hn(t),e[t]=n}function lv(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-hn(n),i=1<<a;t[a]=0,r[a]=-1,e[a]=-1,n&=~i}}function td(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-hn(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}var Ee=0;function dm(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var fm,nd,hm,pm,mm,Qu=!1,$s=[],nr=null,rr=null,ar=null,Fi=new Map,Gi=new Map,Qn=[],uv="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function th(e,t){switch(e){case"focusin":case"focusout":nr=null;break;case"dragenter":case"dragleave":rr=null;break;case"mouseover":case"mouseout":ar=null;break;case"pointerover":case"pointerout":Fi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Gi.delete(t.pointerId)}}function ci(e,t,n,r,a,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[a]},t!==null&&(t=ns(t),t!==null&&nd(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function cv(e,t,n,r,a){switch(t){case"focusin":return nr=ci(nr,e,t,n,r,a),!0;case"dragenter":return rr=ci(rr,e,t,n,r,a),!0;case"mouseover":return ar=ci(ar,e,t,n,r,a),!0;case"pointerover":var i=a.pointerId;return Fi.set(i,ci(Fi.get(i)||null,e,t,n,r,a)),!0;case"gotpointercapture":return i=a.pointerId,Gi.set(i,ci(Gi.get(i)||null,e,t,n,r,a)),!0}return!1}function gm(e){var t=Pr(e.target);if(t!==null){var n=Hr(t);if(n!==null){if(t=n.tag,t===13){if(t=am(n),t!==null){e.blockedOn=t,mm(e.priority,function(){hm(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function oo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Zu(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Ju=r,n.target.dispatchEvent(r),Ju=null}else return t=ns(n),t!==null&&nd(t),e.blockedOn=n,!1;t.shift()}return!0}function nh(e,t,n){oo(e)&&n.delete(t)}function dv(){Qu=!1,nr!==null&&oo(nr)&&(nr=null),rr!==null&&oo(rr)&&(rr=null),ar!==null&&oo(ar)&&(ar=null),Fi.forEach(nh),Gi.forEach(nh)}function di(e,t){e.blockedOn===t&&(e.blockedOn=null,Qu||(Qu=!0,$t.unstable_scheduleCallback($t.unstable_NormalPriority,dv)))}function Bi(e){function t(a){return di(a,e)}if(0<$s.length){di($s[0],e);for(var n=1;n<$s.length;n++){var r=$s[n];r.blockedOn===e&&(r.blockedOn=null)}}for(nr!==null&&di(nr,e),rr!==null&&di(rr,e),ar!==null&&di(ar,e),Fi.forEach(t),Gi.forEach(t),n=0;n<Qn.length;n++)r=Qn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Qn.length&&(n=Qn[0],n.blockedOn===null);)gm(n),n.blockedOn===null&&Qn.shift()}var Aa=On.ReactCurrentBatchConfig,Ro=!0;function fv(e,t,n,r){var a=Ee,i=Aa.transition;Aa.transition=null;try{Ee=1,rd(e,t,n,r)}finally{Ee=a,Aa.transition=i}}function hv(e,t,n,r){var a=Ee,i=Aa.transition;Aa.transition=null;try{Ee=4,rd(e,t,n,r)}finally{Ee=a,Aa.transition=i}}function rd(e,t,n,r){if(Ro){var a=Zu(e,t,n,r);if(a===null)vu(e,t,r,Eo,n),th(e,r);else if(cv(a,e,t,n,r))r.stopPropagation();else if(th(e,r),t&4&&-1<uv.indexOf(e)){for(;a!==null;){var i=ns(a);if(i!==null&&fm(i),i=Zu(e,t,n,r),i===null&&vu(e,t,r,Eo,n),i===a)break;a=i}a!==null&&r.stopPropagation()}else vu(e,t,r,null,n)}}var Eo=null;function Zu(e,t,n,r){if(Eo=null,e=Xc(r),e=Pr(e),e!==null)if(t=Hr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=am(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Eo=e,null}function ym(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ev()){case ed:return 1;case lm:return 4;case So:case tv:return 16;case um:return 536870912;default:return 16}default:return 16}}var Xn=null,ad=null,lo=null;function vm(){if(lo)return lo;var e,t=ad,n=t.length,r,a="value"in Xn?Xn.value:Xn.textContent,i=a.length;for(e=0;e<n&&t[e]===a[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===a[i-r];r++);return lo=a.slice(e,1<r?1-r:void 0)}function uo(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Us(){return!0}function rh(){return!1}function Jt(e){function t(n,r,a,i,l){this._reactName=n,this._targetInst=a,this.type=r,this.nativeEvent=i,this.target=l,this.currentTarget=null;for(var d in e)e.hasOwnProperty(d)&&(n=e[d],this[d]=n?n(i):i[d]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Us:rh,this.isPropagationStopped=rh,this}return Ue(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Us)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Us)},persist:function(){},isPersistent:Us}),t}var Ia={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},id=Jt(Ia),ts=Ue({},Ia,{view:0,detail:0}),pv=Jt(ts),uu,cu,fi,Zo=Ue({},ts,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:sd,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==fi&&(fi&&e.type==="mousemove"?(uu=e.screenX-fi.screenX,cu=e.screenY-fi.screenY):cu=uu=0,fi=e),uu)},movementY:function(e){return"movementY"in e?e.movementY:cu}}),ah=Jt(Zo),mv=Ue({},Zo,{dataTransfer:0}),gv=Jt(mv),yv=Ue({},ts,{relatedTarget:0}),du=Jt(yv),vv=Ue({},Ia,{animationName:0,elapsedTime:0,pseudoElement:0}),xv=Jt(vv),Cv=Ue({},Ia,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Mv=Jt(Cv),bv=Ue({},Ia,{data:0}),ih=Jt(bv),Av={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Sv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},kv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Rv(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=kv[e])?!!t[e]:!1}function sd(){return Rv}var Ev=Ue({},ts,{key:function(e){if(e.key){var t=Av[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=uo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Sv[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:sd,charCode:function(e){return e.type==="keypress"?uo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?uo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Dv=Jt(Ev),Nv=Ue({},Zo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),sh=Jt(Nv),wv=Ue({},ts,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:sd}),jv=Jt(wv),Tv=Ue({},Ia,{propertyName:0,elapsedTime:0,pseudoElement:0}),Lv=Jt(Tv),Pv=Ue({},Zo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Fv=Jt(Pv),Gv=[9,13,27,32],od=Pn&&"CompositionEvent"in window,Si=null;Pn&&"documentMode"in document&&(Si=document.documentMode);var Bv=Pn&&"TextEvent"in window&&!Si,xm=Pn&&(!od||Si&&8<Si&&11>=Si),oh=" ",lh=!1;function Cm(e,t){switch(e){case"keyup":return Gv.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Mm(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ca=!1;function Iv(e,t){switch(e){case"compositionend":return Mm(t);case"keypress":return t.which!==32?null:(lh=!0,oh);case"textInput":return e=t.data,e===oh&&lh?null:e;default:return null}}function Ov(e,t){if(ca)return e==="compositionend"||!od&&Cm(e,t)?(e=vm(),lo=ad=Xn=null,ca=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return xm&&t.locale!=="ko"?null:t.data;default:return null}}var _v={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function uh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!_v[e.type]:t==="textarea"}function bm(e,t,n,r){Xp(r),t=Do(t,"onChange"),0<t.length&&(n=new id("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var ki=null,Ii=null;function Kv(e){Lm(e,0)}function Xo(e){var t=ha(e);if(Jp(t))return e}function zv(e,t){if(e==="change")return t}var Am=!1;if(Pn){var fu;if(Pn){var hu="oninput"in document;if(!hu){var ch=document.createElement("div");ch.setAttribute("oninput","return;"),hu=typeof ch.oninput=="function"}fu=hu}else fu=!1;Am=fu&&(!document.documentMode||9<document.documentMode)}function dh(){ki&&(ki.detachEvent("onpropertychange",Sm),Ii=ki=null)}function Sm(e){if(e.propertyName==="value"&&Xo(Ii)){var t=[];bm(t,Ii,e,Xc(e)),rm(Kv,t)}}function $v(e,t,n){e==="focusin"?(dh(),ki=t,Ii=n,ki.attachEvent("onpropertychange",Sm)):e==="focusout"&&dh()}function Uv(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Xo(Ii)}function Wv(e,t){if(e==="click")return Xo(t)}function Jv(e,t){if(e==="input"||e==="change")return Xo(t)}function Hv(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var mn=typeof Object.is=="function"?Object.is:Hv;function Oi(e,t){if(mn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!Pu.call(t,a)||!mn(e[a],t[a]))return!1}return!0}function fh(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function hh(e,t){var n=fh(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=fh(n)}}function km(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?km(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Rm(){for(var e=window,t=Mo();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Mo(e.document)}return t}function ld(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Vv(e){var t=Rm(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&km(n.ownerDocument.documentElement,n)){if(r!==null&&ld(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,i=Math.min(r.start,a);r=r.end===void 0?i:Math.min(r.end,a),!e.extend&&i>r&&(a=r,r=i,i=a),a=hh(n,i);var l=hh(n,r);a&&l&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var qv=Pn&&"documentMode"in document&&11>=document.documentMode,da=null,Xu=null,Ri=null,ec=!1;function ph(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ec||da==null||da!==Mo(r)||(r=da,"selectionStart"in r&&ld(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ri&&Oi(Ri,r)||(Ri=r,r=Do(Xu,"onSelect"),0<r.length&&(t=new id("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=da)))}function Ws(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var fa={animationend:Ws("Animation","AnimationEnd"),animationiteration:Ws("Animation","AnimationIteration"),animationstart:Ws("Animation","AnimationStart"),transitionend:Ws("Transition","TransitionEnd")},pu={},Em={};Pn&&(Em=document.createElement("div").style,"AnimationEvent"in window||(delete fa.animationend.animation,delete fa.animationiteration.animation,delete fa.animationstart.animation),"TransitionEvent"in window||delete fa.transitionend.transition);function el(e){if(pu[e])return pu[e];if(!fa[e])return e;var t=fa[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Em)return pu[e]=t[n];return e}var Dm=el("animationend"),Nm=el("animationiteration"),wm=el("animationstart"),jm=el("transitionend"),Tm=new Map,mh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function yr(e,t){Tm.set(e,t),Jr(t,[e])}for(var mu=0;mu<mh.length;mu++){var gu=mh[mu],Yv=gu.toLowerCase(),Qv=gu[0].toUpperCase()+gu.slice(1);yr(Yv,"on"+Qv)}yr(Dm,"onAnimationEnd");yr(Nm,"onAnimationIteration");yr(wm,"onAnimationStart");yr("dblclick","onDoubleClick");yr("focusin","onFocus");yr("focusout","onBlur");yr(jm,"onTransitionEnd");Ea("onMouseEnter",["mouseout","mouseover"]);Ea("onMouseLeave",["mouseout","mouseover"]);Ea("onPointerEnter",["pointerout","pointerover"]);Ea("onPointerLeave",["pointerout","pointerover"]);Jr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Jr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Jr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Jr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Jr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Jr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ci="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Zv=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ci));function gh(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Yy(r,t,void 0,e),e.currentTarget=null}function Lm(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var l=r.length-1;0<=l;l--){var d=r[l],c=d.instance,h=d.currentTarget;if(d=d.listener,c!==i&&a.isPropagationStopped())break e;gh(a,d,h),i=c}else for(l=0;l<r.length;l++){if(d=r[l],c=d.instance,h=d.currentTarget,d=d.listener,c!==i&&a.isPropagationStopped())break e;gh(a,d,h),i=c}}}if(Ao)throw e=qu,Ao=!1,qu=null,e}function Ge(e,t){var n=t[ic];n===void 0&&(n=t[ic]=new Set);var r=e+"__bubble";n.has(r)||(Pm(t,e,2,!1),n.add(r))}function yu(e,t,n){var r=0;t&&(r|=4),Pm(n,e,r,t)}var Js="_reactListening"+Math.random().toString(36).slice(2);function _i(e){if(!e[Js]){e[Js]=!0,Kp.forEach(function(n){n!=="selectionchange"&&(Zv.has(n)||yu(n,!1,e),yu(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Js]||(t[Js]=!0,yu("selectionchange",!1,t))}}function Pm(e,t,n,r){switch(ym(t)){case 1:var a=fv;break;case 4:a=hv;break;default:a=rd}n=a.bind(null,t,n,e),a=void 0,!Vu||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function vu(e,t,n,r,a){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var d=r.stateNode.containerInfo;if(d===a||d.nodeType===8&&d.parentNode===a)break;if(l===4)for(l=r.return;l!==null;){var c=l.tag;if((c===3||c===4)&&(c=l.stateNode.containerInfo,c===a||c.nodeType===8&&c.parentNode===a))return;l=l.return}for(;d!==null;){if(l=Pr(d),l===null)return;if(c=l.tag,c===5||c===6){r=i=l;continue e}d=d.parentNode}}r=r.return}rm(function(){var h=i,g=Xc(n),m=[];e:{var x=Tm.get(e);if(x!==void 0){var C=id,b=e;switch(e){case"keypress":if(uo(n)===0)break e;case"keydown":case"keyup":C=Dv;break;case"focusin":b="focus",C=du;break;case"focusout":b="blur",C=du;break;case"beforeblur":case"afterblur":C=du;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=ah;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=gv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=jv;break;case Dm:case Nm:case wm:C=xv;break;case jm:C=Lv;break;case"scroll":C=pv;break;case"wheel":C=Fv;break;case"copy":case"cut":case"paste":C=Mv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=sh}var R=(t&4)!==0,E=!R&&e==="scroll",M=R?x!==null?x+"Capture":null:x;R=[];for(var A=h,D;A!==null;){D=A;var _=D.stateNode;if(D.tag===5&&_!==null&&(D=_,M!==null&&(_=Pi(A,M),_!=null&&R.push(Ki(A,_,D)))),E)break;A=A.return}0<R.length&&(x=new C(x,b,null,n,g),m.push({event:x,listeners:R}))}}if(!(t&7)){e:{if(x=e==="mouseover"||e==="pointerover",C=e==="mouseout"||e==="pointerout",x&&n!==Ju&&(b=n.relatedTarget||n.fromElement)&&(Pr(b)||b[Fn]))break e;if((C||x)&&(x=g.window===g?g:(x=g.ownerDocument)?x.defaultView||x.parentWindow:window,C?(b=n.relatedTarget||n.toElement,C=h,b=b?Pr(b):null,b!==null&&(E=Hr(b),b!==E||b.tag!==5&&b.tag!==6)&&(b=null)):(C=null,b=h),C!==b)){if(R=ah,_="onMouseLeave",M="onMouseEnter",A="mouse",(e==="pointerout"||e==="pointerover")&&(R=sh,_="onPointerLeave",M="onPointerEnter",A="pointer"),E=C==null?x:ha(C),D=b==null?x:ha(b),x=new R(_,A+"leave",C,n,g),x.target=E,x.relatedTarget=D,_=null,Pr(g)===h&&(R=new R(M,A+"enter",b,n,g),R.target=D,R.relatedTarget=E,_=R),E=_,C&&b)t:{for(R=C,M=b,A=0,D=R;D;D=sa(D))A++;for(D=0,_=M;_;_=sa(_))D++;for(;0<A-D;)R=sa(R),A--;for(;0<D-A;)M=sa(M),D--;for(;A--;){if(R===M||M!==null&&R===M.alternate)break t;R=sa(R),M=sa(M)}R=null}else R=null;C!==null&&yh(m,x,C,R,!1),b!==null&&E!==null&&yh(m,E,b,R,!0)}}e:{if(x=h?ha(h):window,C=x.nodeName&&x.nodeName.toLowerCase(),C==="select"||C==="input"&&x.type==="file")var z=zv;else if(uh(x))if(Am)z=Jv;else{z=Uv;var X=$v}else(C=x.nodeName)&&C.toLowerCase()==="input"&&(x.type==="checkbox"||x.type==="radio")&&(z=Wv);if(z&&(z=z(e,h))){bm(m,z,n,g);break e}X&&X(e,x,h),e==="focusout"&&(X=x._wrapperState)&&X.controlled&&x.type==="number"&&Ku(x,"number",x.value)}switch(X=h?ha(h):window,e){case"focusin":(uh(X)||X.contentEditable==="true")&&(da=X,Xu=h,Ri=null);break;case"focusout":Ri=Xu=da=null;break;case"mousedown":ec=!0;break;case"contextmenu":case"mouseup":case"dragend":ec=!1,ph(m,n,g);break;case"selectionchange":if(qv)break;case"keydown":case"keyup":ph(m,n,g)}var ee;if(od)e:{switch(e){case"compositionstart":var se="onCompositionStart";break e;case"compositionend":se="onCompositionEnd";break e;case"compositionupdate":se="onCompositionUpdate";break e}se=void 0}else ca?Cm(e,n)&&(se="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(se="onCompositionStart");se&&(xm&&n.locale!=="ko"&&(ca||se!=="onCompositionStart"?se==="onCompositionEnd"&&ca&&(ee=vm()):(Xn=g,ad="value"in Xn?Xn.value:Xn.textContent,ca=!0)),X=Do(h,se),0<X.length&&(se=new ih(se,e,null,n,g),m.push({event:se,listeners:X}),ee?se.data=ee:(ee=Mm(n),ee!==null&&(se.data=ee)))),(ee=Bv?Iv(e,n):Ov(e,n))&&(h=Do(h,"onBeforeInput"),0<h.length&&(g=new ih("onBeforeInput","beforeinput",null,n,g),m.push({event:g,listeners:h}),g.data=ee))}Lm(m,t)})}function Ki(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Do(e,t){for(var n=t+"Capture",r=[];e!==null;){var a=e,i=a.stateNode;a.tag===5&&i!==null&&(a=i,i=Pi(e,n),i!=null&&r.unshift(Ki(e,i,a)),i=Pi(e,t),i!=null&&r.push(Ki(e,i,a))),e=e.return}return r}function sa(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function yh(e,t,n,r,a){for(var i=t._reactName,l=[];n!==null&&n!==r;){var d=n,c=d.alternate,h=d.stateNode;if(c!==null&&c===r)break;d.tag===5&&h!==null&&(d=h,a?(c=Pi(n,i),c!=null&&l.unshift(Ki(n,c,d))):a||(c=Pi(n,i),c!=null&&l.push(Ki(n,c,d)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var Xv=/\r\n?/g,e1=/\u0000|\uFFFD/g;function vh(e){return(typeof e=="string"?e:""+e).replace(Xv,`
`).replace(e1,"")}function Hs(e,t,n){if(t=vh(t),vh(e)!==t&&n)throw Error(Y(425))}function No(){}var tc=null,nc=null;function rc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ac=typeof setTimeout=="function"?setTimeout:void 0,t1=typeof clearTimeout=="function"?clearTimeout:void 0,xh=typeof Promise=="function"?Promise:void 0,n1=typeof queueMicrotask=="function"?queueMicrotask:typeof xh<"u"?function(e){return xh.resolve(null).then(e).catch(r1)}:ac;function r1(e){setTimeout(function(){throw e})}function xu(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(r===0){e.removeChild(a),Bi(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=a}while(n);Bi(t)}function ir(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ch(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Oa=Math.random().toString(36).slice(2),Cn="__reactFiber$"+Oa,zi="__reactProps$"+Oa,Fn="__reactContainer$"+Oa,ic="__reactEvents$"+Oa,a1="__reactListeners$"+Oa,i1="__reactHandles$"+Oa;function Pr(e){var t=e[Cn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Fn]||n[Cn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ch(e);e!==null;){if(n=e[Cn])return n;e=Ch(e)}return t}e=n,n=e.parentNode}return null}function ns(e){return e=e[Cn]||e[Fn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ha(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(Y(33))}function tl(e){return e[zi]||null}var sc=[],pa=-1;function vr(e){return{current:e}}function Be(e){0>pa||(e.current=sc[pa],sc[pa]=null,pa--)}function Le(e,t){pa++,sc[pa]=e.current,e.current=t}var hr={},Mt=vr(hr),Tt=vr(!1),Or=hr;function Da(e,t){var n=e.type.contextTypes;if(!n)return hr;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={},i;for(i in n)a[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function Lt(e){return e=e.childContextTypes,e!=null}function wo(){Be(Tt),Be(Mt)}function Mh(e,t,n){if(Mt.current!==hr)throw Error(Y(168));Le(Mt,t),Le(Tt,n)}function Fm(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var a in r)if(!(a in t))throw Error(Y(108,$y(e)||"Unknown",a));return Ue({},n,r)}function jo(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||hr,Or=Mt.current,Le(Mt,e),Le(Tt,Tt.current),!0}function bh(e,t,n){var r=e.stateNode;if(!r)throw Error(Y(169));n?(e=Fm(e,t,Or),r.__reactInternalMemoizedMergedChildContext=e,Be(Tt),Be(Mt),Le(Mt,e)):Be(Tt),Le(Tt,n)}var Nn=null,nl=!1,Cu=!1;function Gm(e){Nn===null?Nn=[e]:Nn.push(e)}function s1(e){nl=!0,Gm(e)}function xr(){if(!Cu&&Nn!==null){Cu=!0;var e=0,t=Ee;try{var n=Nn;for(Ee=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Nn=null,nl=!1}catch(a){throw Nn!==null&&(Nn=Nn.slice(e+1)),om(ed,xr),a}finally{Ee=t,Cu=!1}}return null}var ma=[],ga=0,To=null,Lo=0,Vt=[],qt=0,_r=null,wn=1,jn="";function Tr(e,t){ma[ga++]=Lo,ma[ga++]=To,To=e,Lo=t}function Bm(e,t,n){Vt[qt++]=wn,Vt[qt++]=jn,Vt[qt++]=_r,_r=e;var r=wn;e=jn;var a=32-hn(r)-1;r&=~(1<<a),n+=1;var i=32-hn(t)+a;if(30<i){var l=a-a%5;i=(r&(1<<l)-1).toString(32),r>>=l,a-=l,wn=1<<32-hn(t)+a|n<<a|r,jn=i+e}else wn=1<<i|n<<a|r,jn=e}function ud(e){e.return!==null&&(Tr(e,1),Bm(e,1,0))}function cd(e){for(;e===To;)To=ma[--ga],ma[ga]=null,Lo=ma[--ga],ma[ga]=null;for(;e===_r;)_r=Vt[--qt],Vt[qt]=null,jn=Vt[--qt],Vt[qt]=null,wn=Vt[--qt],Vt[qt]=null}var zt=null,Kt=null,_e=!1,cn=null;function Im(e,t){var n=Yt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ah(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,zt=e,Kt=ir(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,zt=e,Kt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=_r!==null?{id:wn,overflow:jn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Yt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,zt=e,Kt=null,!0):!1;default:return!1}}function oc(e){return(e.mode&1)!==0&&(e.flags&128)===0}function lc(e){if(_e){var t=Kt;if(t){var n=t;if(!Ah(e,t)){if(oc(e))throw Error(Y(418));t=ir(n.nextSibling);var r=zt;t&&Ah(e,t)?Im(r,n):(e.flags=e.flags&-4097|2,_e=!1,zt=e)}}else{if(oc(e))throw Error(Y(418));e.flags=e.flags&-4097|2,_e=!1,zt=e}}}function Sh(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;zt=e}function Vs(e){if(e!==zt)return!1;if(!_e)return Sh(e),_e=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!rc(e.type,e.memoizedProps)),t&&(t=Kt)){if(oc(e))throw Om(),Error(Y(418));for(;t;)Im(e,t),t=ir(t.nextSibling)}if(Sh(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(Y(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Kt=ir(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Kt=null}}else Kt=zt?ir(e.stateNode.nextSibling):null;return!0}function Om(){for(var e=Kt;e;)e=ir(e.nextSibling)}function Na(){Kt=zt=null,_e=!1}function dd(e){cn===null?cn=[e]:cn.push(e)}var o1=On.ReactCurrentBatchConfig;function hi(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(Y(309));var r=n.stateNode}if(!r)throw Error(Y(147,e));var a=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(l){var d=a.refs;l===null?delete d[i]:d[i]=l},t._stringRef=i,t)}if(typeof e!="string")throw Error(Y(284));if(!n._owner)throw Error(Y(290,e))}return e}function qs(e,t){throw e=Object.prototype.toString.call(t),Error(Y(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function kh(e){var t=e._init;return t(e._payload)}function _m(e){function t(M,A){if(e){var D=M.deletions;D===null?(M.deletions=[A],M.flags|=16):D.push(A)}}function n(M,A){if(!e)return null;for(;A!==null;)t(M,A),A=A.sibling;return null}function r(M,A){for(M=new Map;A!==null;)A.key!==null?M.set(A.key,A):M.set(A.index,A),A=A.sibling;return M}function a(M,A){return M=ur(M,A),M.index=0,M.sibling=null,M}function i(M,A,D){return M.index=D,e?(D=M.alternate,D!==null?(D=D.index,D<A?(M.flags|=2,A):D):(M.flags|=2,A)):(M.flags|=1048576,A)}function l(M){return e&&M.alternate===null&&(M.flags|=2),M}function d(M,A,D,_){return A===null||A.tag!==6?(A=Eu(D,M.mode,_),A.return=M,A):(A=a(A,D),A.return=M,A)}function c(M,A,D,_){var z=D.type;return z===ua?g(M,A,D.props.children,_,D.key):A!==null&&(A.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===qn&&kh(z)===A.type)?(_=a(A,D.props),_.ref=hi(M,A,D),_.return=M,_):(_=yo(D.type,D.key,D.props,null,M.mode,_),_.ref=hi(M,A,D),_.return=M,_)}function h(M,A,D,_){return A===null||A.tag!==4||A.stateNode.containerInfo!==D.containerInfo||A.stateNode.implementation!==D.implementation?(A=Du(D,M.mode,_),A.return=M,A):(A=a(A,D.children||[]),A.return=M,A)}function g(M,A,D,_,z){return A===null||A.tag!==7?(A=Ir(D,M.mode,_,z),A.return=M,A):(A=a(A,D),A.return=M,A)}function m(M,A,D){if(typeof A=="string"&&A!==""||typeof A=="number")return A=Eu(""+A,M.mode,D),A.return=M,A;if(typeof A=="object"&&A!==null){switch(A.$$typeof){case Is:return D=yo(A.type,A.key,A.props,null,M.mode,D),D.ref=hi(M,null,A),D.return=M,D;case la:return A=Du(A,M.mode,D),A.return=M,A;case qn:var _=A._init;return m(M,_(A._payload),D)}if(vi(A)||li(A))return A=Ir(A,M.mode,D,null),A.return=M,A;qs(M,A)}return null}function x(M,A,D,_){var z=A!==null?A.key:null;if(typeof D=="string"&&D!==""||typeof D=="number")return z!==null?null:d(M,A,""+D,_);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case Is:return D.key===z?c(M,A,D,_):null;case la:return D.key===z?h(M,A,D,_):null;case qn:return z=D._init,x(M,A,z(D._payload),_)}if(vi(D)||li(D))return z!==null?null:g(M,A,D,_,null);qs(M,D)}return null}function C(M,A,D,_,z){if(typeof _=="string"&&_!==""||typeof _=="number")return M=M.get(D)||null,d(A,M,""+_,z);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Is:return M=M.get(_.key===null?D:_.key)||null,c(A,M,_,z);case la:return M=M.get(_.key===null?D:_.key)||null,h(A,M,_,z);case qn:var X=_._init;return C(M,A,D,X(_._payload),z)}if(vi(_)||li(_))return M=M.get(D)||null,g(A,M,_,z,null);qs(A,_)}return null}function b(M,A,D,_){for(var z=null,X=null,ee=A,se=A=0,Pe=null;ee!==null&&se<D.length;se++){ee.index>se?(Pe=ee,ee=null):Pe=ee.sibling;var me=x(M,ee,D[se],_);if(me===null){ee===null&&(ee=Pe);break}e&&ee&&me.alternate===null&&t(M,ee),A=i(me,A,se),X===null?z=me:X.sibling=me,X=me,ee=Pe}if(se===D.length)return n(M,ee),_e&&Tr(M,se),z;if(ee===null){for(;se<D.length;se++)ee=m(M,D[se],_),ee!==null&&(A=i(ee,A,se),X===null?z=ee:X.sibling=ee,X=ee);return _e&&Tr(M,se),z}for(ee=r(M,ee);se<D.length;se++)Pe=C(ee,M,se,D[se],_),Pe!==null&&(e&&Pe.alternate!==null&&ee.delete(Pe.key===null?se:Pe.key),A=i(Pe,A,se),X===null?z=Pe:X.sibling=Pe,X=Pe);return e&&ee.forEach(function(ht){return t(M,ht)}),_e&&Tr(M,se),z}function R(M,A,D,_){var z=li(D);if(typeof z!="function")throw Error(Y(150));if(D=z.call(D),D==null)throw Error(Y(151));for(var X=z=null,ee=A,se=A=0,Pe=null,me=D.next();ee!==null&&!me.done;se++,me=D.next()){ee.index>se?(Pe=ee,ee=null):Pe=ee.sibling;var ht=x(M,ee,me.value,_);if(ht===null){ee===null&&(ee=Pe);break}e&&ee&&ht.alternate===null&&t(M,ee),A=i(ht,A,se),X===null?z=ht:X.sibling=ht,X=ht,ee=Pe}if(me.done)return n(M,ee),_e&&Tr(M,se),z;if(ee===null){for(;!me.done;se++,me=D.next())me=m(M,me.value,_),me!==null&&(A=i(me,A,se),X===null?z=me:X.sibling=me,X=me);return _e&&Tr(M,se),z}for(ee=r(M,ee);!me.done;se++,me=D.next())me=C(ee,M,se,me.value,_),me!==null&&(e&&me.alternate!==null&&ee.delete(me.key===null?se:me.key),A=i(me,A,se),X===null?z=me:X.sibling=me,X=me);return e&&ee.forEach(function(rn){return t(M,rn)}),_e&&Tr(M,se),z}function E(M,A,D,_){if(typeof D=="object"&&D!==null&&D.type===ua&&D.key===null&&(D=D.props.children),typeof D=="object"&&D!==null){switch(D.$$typeof){case Is:e:{for(var z=D.key,X=A;X!==null;){if(X.key===z){if(z=D.type,z===ua){if(X.tag===7){n(M,X.sibling),A=a(X,D.props.children),A.return=M,M=A;break e}}else if(X.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===qn&&kh(z)===X.type){n(M,X.sibling),A=a(X,D.props),A.ref=hi(M,X,D),A.return=M,M=A;break e}n(M,X);break}else t(M,X);X=X.sibling}D.type===ua?(A=Ir(D.props.children,M.mode,_,D.key),A.return=M,M=A):(_=yo(D.type,D.key,D.props,null,M.mode,_),_.ref=hi(M,A,D),_.return=M,M=_)}return l(M);case la:e:{for(X=D.key;A!==null;){if(A.key===X)if(A.tag===4&&A.stateNode.containerInfo===D.containerInfo&&A.stateNode.implementation===D.implementation){n(M,A.sibling),A=a(A,D.children||[]),A.return=M,M=A;break e}else{n(M,A);break}else t(M,A);A=A.sibling}A=Du(D,M.mode,_),A.return=M,M=A}return l(M);case qn:return X=D._init,E(M,A,X(D._payload),_)}if(vi(D))return b(M,A,D,_);if(li(D))return R(M,A,D,_);qs(M,D)}return typeof D=="string"&&D!==""||typeof D=="number"?(D=""+D,A!==null&&A.tag===6?(n(M,A.sibling),A=a(A,D),A.return=M,M=A):(n(M,A),A=Eu(D,M.mode,_),A.return=M,M=A),l(M)):n(M,A)}return E}var wa=_m(!0),Km=_m(!1),Po=vr(null),Fo=null,ya=null,fd=null;function hd(){fd=ya=Fo=null}function pd(e){var t=Po.current;Be(Po),e._currentValue=t}function uc(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Sa(e,t){Fo=e,fd=ya=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(jt=!0),e.firstContext=null)}function en(e){var t=e._currentValue;if(fd!==e)if(e={context:e,memoizedValue:t,next:null},ya===null){if(Fo===null)throw Error(Y(308));ya=e,Fo.dependencies={lanes:0,firstContext:e}}else ya=ya.next=e;return t}var Fr=null;function md(e){Fr===null?Fr=[e]:Fr.push(e)}function zm(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,md(t)):(n.next=a.next,a.next=n),t.interleaved=n,Gn(e,r)}function Gn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Yn=!1;function gd(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function $m(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Tn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function sr(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Ae&2){var a=r.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),r.pending=t,Gn(e,n)}return a=r.interleaved,a===null?(t.next=t,md(r)):(t.next=a.next,a.next=t),r.interleaved=t,Gn(e,n)}function co(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,td(e,n)}}function Rh(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var a=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?a=i=l:i=i.next=l,n=n.next}while(n!==null);i===null?a=i=t:i=i.next=t}else a=i=t;n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Go(e,t,n,r){var a=e.updateQueue;Yn=!1;var i=a.firstBaseUpdate,l=a.lastBaseUpdate,d=a.shared.pending;if(d!==null){a.shared.pending=null;var c=d,h=c.next;c.next=null,l===null?i=h:l.next=h,l=c;var g=e.alternate;g!==null&&(g=g.updateQueue,d=g.lastBaseUpdate,d!==l&&(d===null?g.firstBaseUpdate=h:d.next=h,g.lastBaseUpdate=c))}if(i!==null){var m=a.baseState;l=0,g=h=c=null,d=i;do{var x=d.lane,C=d.eventTime;if((r&x)===x){g!==null&&(g=g.next={eventTime:C,lane:0,tag:d.tag,payload:d.payload,callback:d.callback,next:null});e:{var b=e,R=d;switch(x=t,C=n,R.tag){case 1:if(b=R.payload,typeof b=="function"){m=b.call(C,m,x);break e}m=b;break e;case 3:b.flags=b.flags&-65537|128;case 0:if(b=R.payload,x=typeof b=="function"?b.call(C,m,x):b,x==null)break e;m=Ue({},m,x);break e;case 2:Yn=!0}}d.callback!==null&&d.lane!==0&&(e.flags|=64,x=a.effects,x===null?a.effects=[d]:x.push(d))}else C={eventTime:C,lane:x,tag:d.tag,payload:d.payload,callback:d.callback,next:null},g===null?(h=g=C,c=m):g=g.next=C,l|=x;if(d=d.next,d===null){if(d=a.shared.pending,d===null)break;x=d,d=x.next,x.next=null,a.lastBaseUpdate=x,a.shared.pending=null}}while(!0);if(g===null&&(c=m),a.baseState=c,a.firstBaseUpdate=h,a.lastBaseUpdate=g,t=a.shared.interleaved,t!==null){a=t;do l|=a.lane,a=a.next;while(a!==t)}else i===null&&(a.shared.lanes=0);zr|=l,e.lanes=l,e.memoizedState=m}}function Eh(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=n,typeof a!="function")throw Error(Y(191,a));a.call(r)}}}var rs={},An=vr(rs),$i=vr(rs),Ui=vr(rs);function Gr(e){if(e===rs)throw Error(Y(174));return e}function yd(e,t){switch(Le(Ui,t),Le($i,e),Le(An,rs),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:$u(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=$u(t,e)}Be(An),Le(An,t)}function ja(){Be(An),Be($i),Be(Ui)}function Um(e){Gr(Ui.current);var t=Gr(An.current),n=$u(t,e.type);t!==n&&(Le($i,e),Le(An,n))}function vd(e){$i.current===e&&(Be(An),Be($i))}var Ke=vr(0);function Bo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Mu=[];function xd(){for(var e=0;e<Mu.length;e++)Mu[e]._workInProgressVersionPrimary=null;Mu.length=0}var fo=On.ReactCurrentDispatcher,bu=On.ReactCurrentBatchConfig,Kr=0,ze=null,tt=null,st=null,Io=!1,Ei=!1,Wi=0,l1=0;function yt(){throw Error(Y(321))}function Cd(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!mn(e[n],t[n]))return!1;return!0}function Md(e,t,n,r,a,i){if(Kr=i,ze=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,fo.current=e===null||e.memoizedState===null?f1:h1,e=n(r,a),Ei){i=0;do{if(Ei=!1,Wi=0,25<=i)throw Error(Y(301));i+=1,st=tt=null,t.updateQueue=null,fo.current=p1,e=n(r,a)}while(Ei)}if(fo.current=Oo,t=tt!==null&&tt.next!==null,Kr=0,st=tt=ze=null,Io=!1,t)throw Error(Y(300));return e}function bd(){var e=Wi!==0;return Wi=0,e}function xn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return st===null?ze.memoizedState=st=e:st=st.next=e,st}function tn(){if(tt===null){var e=ze.alternate;e=e!==null?e.memoizedState:null}else e=tt.next;var t=st===null?ze.memoizedState:st.next;if(t!==null)st=t,tt=e;else{if(e===null)throw Error(Y(310));tt=e,e={memoizedState:tt.memoizedState,baseState:tt.baseState,baseQueue:tt.baseQueue,queue:tt.queue,next:null},st===null?ze.memoizedState=st=e:st=st.next=e}return st}function Ji(e,t){return typeof t=="function"?t(e):t}function Au(e){var t=tn(),n=t.queue;if(n===null)throw Error(Y(311));n.lastRenderedReducer=e;var r=tt,a=r.baseQueue,i=n.pending;if(i!==null){if(a!==null){var l=a.next;a.next=i.next,i.next=l}r.baseQueue=a=i,n.pending=null}if(a!==null){i=a.next,r=r.baseState;var d=l=null,c=null,h=i;do{var g=h.lane;if((Kr&g)===g)c!==null&&(c=c.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:e(r,h.action);else{var m={lane:g,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};c===null?(d=c=m,l=r):c=c.next=m,ze.lanes|=g,zr|=g}h=h.next}while(h!==null&&h!==i);c===null?l=r:c.next=d,mn(r,t.memoizedState)||(jt=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){a=e;do i=a.lane,ze.lanes|=i,zr|=i,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Su(e){var t=tn(),n=t.queue;if(n===null)throw Error(Y(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,i=t.memoizedState;if(a!==null){n.pending=null;var l=a=a.next;do i=e(i,l.action),l=l.next;while(l!==a);mn(i,t.memoizedState)||(jt=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Wm(){}function Jm(e,t){var n=ze,r=tn(),a=t(),i=!mn(r.memoizedState,a);if(i&&(r.memoizedState=a,jt=!0),r=r.queue,Ad(qm.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||st!==null&&st.memoizedState.tag&1){if(n.flags|=2048,Hi(9,Vm.bind(null,n,r,a,t),void 0,null),lt===null)throw Error(Y(349));Kr&30||Hm(n,t,a)}return a}function Hm(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ze.updateQueue,t===null?(t={lastEffect:null,stores:null},ze.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Vm(e,t,n,r){t.value=n,t.getSnapshot=r,Ym(t)&&Qm(e)}function qm(e,t,n){return n(function(){Ym(t)&&Qm(e)})}function Ym(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!mn(e,n)}catch{return!0}}function Qm(e){var t=Gn(e,1);t!==null&&pn(t,e,1,-1)}function Dh(e){var t=xn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ji,lastRenderedState:e},t.queue=e,e=e.dispatch=d1.bind(null,ze,e),[t.memoizedState,e]}function Hi(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ze.updateQueue,t===null?(t={lastEffect:null,stores:null},ze.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Zm(){return tn().memoizedState}function ho(e,t,n,r){var a=xn();ze.flags|=e,a.memoizedState=Hi(1|t,n,void 0,r===void 0?null:r)}function rl(e,t,n,r){var a=tn();r=r===void 0?null:r;var i=void 0;if(tt!==null){var l=tt.memoizedState;if(i=l.destroy,r!==null&&Cd(r,l.deps)){a.memoizedState=Hi(t,n,i,r);return}}ze.flags|=e,a.memoizedState=Hi(1|t,n,i,r)}function Nh(e,t){return ho(8390656,8,e,t)}function Ad(e,t){return rl(2048,8,e,t)}function Xm(e,t){return rl(4,2,e,t)}function e0(e,t){return rl(4,4,e,t)}function t0(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function n0(e,t,n){return n=n!=null?n.concat([e]):null,rl(4,4,t0.bind(null,t,e),n)}function Sd(){}function r0(e,t){var n=tn();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Cd(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function a0(e,t){var n=tn();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Cd(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function i0(e,t,n){return Kr&21?(mn(n,t)||(n=cm(),ze.lanes|=n,zr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,jt=!0),e.memoizedState=n)}function u1(e,t){var n=Ee;Ee=n!==0&&4>n?n:4,e(!0);var r=bu.transition;bu.transition={};try{e(!1),t()}finally{Ee=n,bu.transition=r}}function s0(){return tn().memoizedState}function c1(e,t,n){var r=lr(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},o0(e))l0(t,n);else if(n=zm(e,t,n,r),n!==null){var a=kt();pn(n,e,r,a),u0(n,t,r)}}function d1(e,t,n){var r=lr(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(o0(e))l0(t,a);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var l=t.lastRenderedState,d=i(l,n);if(a.hasEagerState=!0,a.eagerState=d,mn(d,l)){var c=t.interleaved;c===null?(a.next=a,md(t)):(a.next=c.next,c.next=a),t.interleaved=a;return}}catch{}finally{}n=zm(e,t,a,r),n!==null&&(a=kt(),pn(n,e,r,a),u0(n,t,r))}}function o0(e){var t=e.alternate;return e===ze||t!==null&&t===ze}function l0(e,t){Ei=Io=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function u0(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,td(e,n)}}var Oo={readContext:en,useCallback:yt,useContext:yt,useEffect:yt,useImperativeHandle:yt,useInsertionEffect:yt,useLayoutEffect:yt,useMemo:yt,useReducer:yt,useRef:yt,useState:yt,useDebugValue:yt,useDeferredValue:yt,useTransition:yt,useMutableSource:yt,useSyncExternalStore:yt,useId:yt,unstable_isNewReconciler:!1},f1={readContext:en,useCallback:function(e,t){return xn().memoizedState=[e,t===void 0?null:t],e},useContext:en,useEffect:Nh,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,ho(4194308,4,t0.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ho(4194308,4,e,t)},useInsertionEffect:function(e,t){return ho(4,2,e,t)},useMemo:function(e,t){var n=xn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=xn();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=c1.bind(null,ze,e),[r.memoizedState,e]},useRef:function(e){var t=xn();return e={current:e},t.memoizedState=e},useState:Dh,useDebugValue:Sd,useDeferredValue:function(e){return xn().memoizedState=e},useTransition:function(){var e=Dh(!1),t=e[0];return e=u1.bind(null,e[1]),xn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ze,a=xn();if(_e){if(n===void 0)throw Error(Y(407));n=n()}else{if(n=t(),lt===null)throw Error(Y(349));Kr&30||Hm(r,t,n)}a.memoizedState=n;var i={value:n,getSnapshot:t};return a.queue=i,Nh(qm.bind(null,r,i,e),[e]),r.flags|=2048,Hi(9,Vm.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=xn(),t=lt.identifierPrefix;if(_e){var n=jn,r=wn;n=(r&~(1<<32-hn(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Wi++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=l1++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},h1={readContext:en,useCallback:r0,useContext:en,useEffect:Ad,useImperativeHandle:n0,useInsertionEffect:Xm,useLayoutEffect:e0,useMemo:a0,useReducer:Au,useRef:Zm,useState:function(){return Au(Ji)},useDebugValue:Sd,useDeferredValue:function(e){var t=tn();return i0(t,tt.memoizedState,e)},useTransition:function(){var e=Au(Ji)[0],t=tn().memoizedState;return[e,t]},useMutableSource:Wm,useSyncExternalStore:Jm,useId:s0,unstable_isNewReconciler:!1},p1={readContext:en,useCallback:r0,useContext:en,useEffect:Ad,useImperativeHandle:n0,useInsertionEffect:Xm,useLayoutEffect:e0,useMemo:a0,useReducer:Su,useRef:Zm,useState:function(){return Su(Ji)},useDebugValue:Sd,useDeferredValue:function(e){var t=tn();return tt===null?t.memoizedState=e:i0(t,tt.memoizedState,e)},useTransition:function(){var e=Su(Ji)[0],t=tn().memoizedState;return[e,t]},useMutableSource:Wm,useSyncExternalStore:Jm,useId:s0,unstable_isNewReconciler:!1};function ln(e,t){if(e&&e.defaultProps){t=Ue({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function cc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Ue({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var al={isMounted:function(e){return(e=e._reactInternals)?Hr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=kt(),a=lr(e),i=Tn(r,a);i.payload=t,n!=null&&(i.callback=n),t=sr(e,i,a),t!==null&&(pn(t,e,a,r),co(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=kt(),a=lr(e),i=Tn(r,a);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=sr(e,i,a),t!==null&&(pn(t,e,a,r),co(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=kt(),r=lr(e),a=Tn(n,r);a.tag=2,t!=null&&(a.callback=t),t=sr(e,a,r),t!==null&&(pn(t,e,r,n),co(t,e,r))}};function wh(e,t,n,r,a,i,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,l):t.prototype&&t.prototype.isPureReactComponent?!Oi(n,r)||!Oi(a,i):!0}function c0(e,t,n){var r=!1,a=hr,i=t.contextType;return typeof i=="object"&&i!==null?i=en(i):(a=Lt(t)?Or:Mt.current,r=t.contextTypes,i=(r=r!=null)?Da(e,a):hr),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=al,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=i),t}function jh(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&al.enqueueReplaceState(t,t.state,null)}function dc(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},gd(e);var i=t.contextType;typeof i=="object"&&i!==null?a.context=en(i):(i=Lt(t)?Or:Mt.current,a.context=Da(e,i)),a.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(cc(e,t,i,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&al.enqueueReplaceState(a,a.state,null),Go(e,n,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function Ta(e,t){try{var n="",r=t;do n+=zy(r),r=r.return;while(r);var a=n}catch(i){a=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:a,digest:null}}function ku(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function fc(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var m1=typeof WeakMap=="function"?WeakMap:Map;function d0(e,t,n){n=Tn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Ko||(Ko=!0,bc=r),fc(e,t)},n}function f0(e,t,n){n=Tn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=t.value;n.payload=function(){return r(a)},n.callback=function(){fc(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){fc(e,t),typeof r!="function"&&(or===null?or=new Set([this]):or.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function Th(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new m1;var a=new Set;r.set(t,a)}else a=r.get(t),a===void 0&&(a=new Set,r.set(t,a));a.has(n)||(a.add(n),e=N1.bind(null,e,t,n),t.then(e,e))}function Lh(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Ph(e,t,n,r,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Tn(-1,1),t.tag=2,sr(n,t,1))),n.lanes|=1),e)}var g1=On.ReactCurrentOwner,jt=!1;function At(e,t,n,r){t.child=e===null?Km(t,null,n,r):wa(t,e.child,n,r)}function Fh(e,t,n,r,a){n=n.render;var i=t.ref;return Sa(t,a),r=Md(e,t,n,r,i,a),n=bd(),e!==null&&!jt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Bn(e,t,a)):(_e&&n&&ud(t),t.flags|=1,At(e,t,r,a),t.child)}function Gh(e,t,n,r,a){if(e===null){var i=n.type;return typeof i=="function"&&!Td(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,h0(e,t,i,r,a)):(e=yo(n.type,null,r,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&a)){var l=i.memoizedProps;if(n=n.compare,n=n!==null?n:Oi,n(l,r)&&e.ref===t.ref)return Bn(e,t,a)}return t.flags|=1,e=ur(i,r),e.ref=t.ref,e.return=t,t.child=e}function h0(e,t,n,r,a){if(e!==null){var i=e.memoizedProps;if(Oi(i,r)&&e.ref===t.ref)if(jt=!1,t.pendingProps=r=i,(e.lanes&a)!==0)e.flags&131072&&(jt=!0);else return t.lanes=e.lanes,Bn(e,t,a)}return hc(e,t,n,r,a)}function p0(e,t,n){var r=t.pendingProps,a=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Le(xa,_t),_t|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Le(xa,_t),_t|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,Le(xa,_t),_t|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,Le(xa,_t),_t|=r;return At(e,t,a,n),t.child}function m0(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function hc(e,t,n,r,a){var i=Lt(n)?Or:Mt.current;return i=Da(t,i),Sa(t,a),n=Md(e,t,n,r,i,a),r=bd(),e!==null&&!jt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Bn(e,t,a)):(_e&&r&&ud(t),t.flags|=1,At(e,t,n,a),t.child)}function Bh(e,t,n,r,a){if(Lt(n)){var i=!0;jo(t)}else i=!1;if(Sa(t,a),t.stateNode===null)po(e,t),c0(t,n,r),dc(t,n,r,a),r=!0;else if(e===null){var l=t.stateNode,d=t.memoizedProps;l.props=d;var c=l.context,h=n.contextType;typeof h=="object"&&h!==null?h=en(h):(h=Lt(n)?Or:Mt.current,h=Da(t,h));var g=n.getDerivedStateFromProps,m=typeof g=="function"||typeof l.getSnapshotBeforeUpdate=="function";m||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(d!==r||c!==h)&&jh(t,l,r,h),Yn=!1;var x=t.memoizedState;l.state=x,Go(t,r,l,a),c=t.memoizedState,d!==r||x!==c||Tt.current||Yn?(typeof g=="function"&&(cc(t,n,g,r),c=t.memoizedState),(d=Yn||wh(t,n,d,r,x,c,h))?(m||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),l.props=r,l.state=c,l.context=h,r=d):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,$m(e,t),d=t.memoizedProps,h=t.type===t.elementType?d:ln(t.type,d),l.props=h,m=t.pendingProps,x=l.context,c=n.contextType,typeof c=="object"&&c!==null?c=en(c):(c=Lt(n)?Or:Mt.current,c=Da(t,c));var C=n.getDerivedStateFromProps;(g=typeof C=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(d!==m||x!==c)&&jh(t,l,r,c),Yn=!1,x=t.memoizedState,l.state=x,Go(t,r,l,a);var b=t.memoizedState;d!==m||x!==b||Tt.current||Yn?(typeof C=="function"&&(cc(t,n,C,r),b=t.memoizedState),(h=Yn||wh(t,n,h,r,x,b,c)||!1)?(g||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,b,c),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,b,c)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||d===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||d===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=b),l.props=r,l.state=b,l.context=c,r=h):(typeof l.componentDidUpdate!="function"||d===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||d===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),r=!1)}return pc(e,t,n,r,i,a)}function pc(e,t,n,r,a,i){m0(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return a&&bh(t,n,!1),Bn(e,t,i);r=t.stateNode,g1.current=t;var d=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=wa(t,e.child,null,i),t.child=wa(t,null,d,i)):At(e,t,d,i),t.memoizedState=r.state,a&&bh(t,n,!0),t.child}function g0(e){var t=e.stateNode;t.pendingContext?Mh(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Mh(e,t.context,!1),yd(e,t.containerInfo)}function Ih(e,t,n,r,a){return Na(),dd(a),t.flags|=256,At(e,t,n,r),t.child}var mc={dehydrated:null,treeContext:null,retryLane:0};function gc(e){return{baseLanes:e,cachePool:null,transitions:null}}function y0(e,t,n){var r=t.pendingProps,a=Ke.current,i=!1,l=(t.flags&128)!==0,d;if((d=l)||(d=e!==null&&e.memoizedState===null?!1:(a&2)!==0),d?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),Le(Ke,a&1),e===null)return lc(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=r.children,e=r.fallback,i?(r=t.mode,i=t.child,l={mode:"hidden",children:l},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=l):i=ol(l,r,0,null),e=Ir(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=gc(n),t.memoizedState=mc,e):kd(t,l));if(a=e.memoizedState,a!==null&&(d=a.dehydrated,d!==null))return y1(e,t,l,r,d,a,n);if(i){i=r.fallback,l=t.mode,a=e.child,d=a.sibling;var c={mode:"hidden",children:r.children};return!(l&1)&&t.child!==a?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=ur(a,c),r.subtreeFlags=a.subtreeFlags&14680064),d!==null?i=ur(d,i):(i=Ir(i,l,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,l=e.child.memoizedState,l=l===null?gc(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},i.memoizedState=l,i.childLanes=e.childLanes&~n,t.memoizedState=mc,r}return i=e.child,e=i.sibling,r=ur(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function kd(e,t){return t=ol({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ys(e,t,n,r){return r!==null&&dd(r),wa(t,e.child,null,n),e=kd(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function y1(e,t,n,r,a,i,l){if(n)return t.flags&256?(t.flags&=-257,r=ku(Error(Y(422))),Ys(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,a=t.mode,r=ol({mode:"visible",children:r.children},a,0,null),i=Ir(i,a,l,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&wa(t,e.child,null,l),t.child.memoizedState=gc(l),t.memoizedState=mc,i);if(!(t.mode&1))return Ys(e,t,l,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var d=r.dgst;return r=d,i=Error(Y(419)),r=ku(i,r,void 0),Ys(e,t,l,r)}if(d=(l&e.childLanes)!==0,jt||d){if(r=lt,r!==null){switch(l&-l){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(r.suspendedLanes|l)?0:a,a!==0&&a!==i.retryLane&&(i.retryLane=a,Gn(e,a),pn(r,e,a,-1))}return jd(),r=ku(Error(Y(421))),Ys(e,t,l,r)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=w1.bind(null,e),a._reactRetry=t,null):(e=i.treeContext,Kt=ir(a.nextSibling),zt=t,_e=!0,cn=null,e!==null&&(Vt[qt++]=wn,Vt[qt++]=jn,Vt[qt++]=_r,wn=e.id,jn=e.overflow,_r=t),t=kd(t,r.children),t.flags|=4096,t)}function Oh(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),uc(e.return,t,n)}function Ru(e,t,n,r,a){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=a)}function v0(e,t,n){var r=t.pendingProps,a=r.revealOrder,i=r.tail;if(At(e,t,r.children,n),r=Ke.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Oh(e,n,t);else if(e.tag===19)Oh(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Le(Ke,r),!(t.mode&1))t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&Bo(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Ru(t,!1,a,n,i);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&Bo(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Ru(t,!0,n,null,i);break;case"together":Ru(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function po(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Bn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),zr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(Y(153));if(t.child!==null){for(e=t.child,n=ur(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=ur(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function v1(e,t,n){switch(t.tag){case 3:g0(t),Na();break;case 5:Um(t);break;case 1:Lt(t.type)&&jo(t);break;case 4:yd(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;Le(Po,r._currentValue),r._currentValue=a;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Le(Ke,Ke.current&1),t.flags|=128,null):n&t.child.childLanes?y0(e,t,n):(Le(Ke,Ke.current&1),e=Bn(e,t,n),e!==null?e.sibling:null);Le(Ke,Ke.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return v0(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Le(Ke,Ke.current),r)break;return null;case 22:case 23:return t.lanes=0,p0(e,t,n)}return Bn(e,t,n)}var x0,yc,C0,M0;x0=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};yc=function(){};C0=function(e,t,n,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,Gr(An.current);var i=null;switch(n){case"input":a=Ou(e,a),r=Ou(e,r),i=[];break;case"select":a=Ue({},a,{value:void 0}),r=Ue({},r,{value:void 0}),i=[];break;case"textarea":a=zu(e,a),r=zu(e,r),i=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=No)}Uu(n,r);var l;n=null;for(h in a)if(!r.hasOwnProperty(h)&&a.hasOwnProperty(h)&&a[h]!=null)if(h==="style"){var d=a[h];for(l in d)d.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(Ti.hasOwnProperty(h)?i||(i=[]):(i=i||[]).push(h,null));for(h in r){var c=r[h];if(d=a!=null?a[h]:void 0,r.hasOwnProperty(h)&&c!==d&&(c!=null||d!=null))if(h==="style")if(d){for(l in d)!d.hasOwnProperty(l)||c&&c.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in c)c.hasOwnProperty(l)&&d[l]!==c[l]&&(n||(n={}),n[l]=c[l])}else n||(i||(i=[]),i.push(h,n)),n=c;else h==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,d=d?d.__html:void 0,c!=null&&d!==c&&(i=i||[]).push(h,c)):h==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(h,""+c):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(Ti.hasOwnProperty(h)?(c!=null&&h==="onScroll"&&Ge("scroll",e),i||d===c||(i=[])):(i=i||[]).push(h,c))}n&&(i=i||[]).push("style",n);var h=i;(t.updateQueue=h)&&(t.flags|=4)}};M0=function(e,t,n,r){n!==r&&(t.flags|=4)};function pi(e,t){if(!_e)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function vt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function x1(e,t,n){var r=t.pendingProps;switch(cd(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return vt(t),null;case 1:return Lt(t.type)&&wo(),vt(t),null;case 3:return r=t.stateNode,ja(),Be(Tt),Be(Mt),xd(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Vs(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,cn!==null&&(kc(cn),cn=null))),yc(e,t),vt(t),null;case 5:vd(t);var a=Gr(Ui.current);if(n=t.type,e!==null&&t.stateNode!=null)C0(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(Y(166));return vt(t),null}if(e=Gr(An.current),Vs(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Cn]=t,r[zi]=i,e=(t.mode&1)!==0,n){case"dialog":Ge("cancel",r),Ge("close",r);break;case"iframe":case"object":case"embed":Ge("load",r);break;case"video":case"audio":for(a=0;a<Ci.length;a++)Ge(Ci[a],r);break;case"source":Ge("error",r);break;case"img":case"image":case"link":Ge("error",r),Ge("load",r);break;case"details":Ge("toggle",r);break;case"input":Vf(r,i),Ge("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},Ge("invalid",r);break;case"textarea":Yf(r,i),Ge("invalid",r)}Uu(n,i),a=null;for(var l in i)if(i.hasOwnProperty(l)){var d=i[l];l==="children"?typeof d=="string"?r.textContent!==d&&(i.suppressHydrationWarning!==!0&&Hs(r.textContent,d,e),a=["children",d]):typeof d=="number"&&r.textContent!==""+d&&(i.suppressHydrationWarning!==!0&&Hs(r.textContent,d,e),a=["children",""+d]):Ti.hasOwnProperty(l)&&d!=null&&l==="onScroll"&&Ge("scroll",r)}switch(n){case"input":Os(r),qf(r,i,!0);break;case"textarea":Os(r),Qf(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=No)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=qp(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[Cn]=t,e[zi]=r,x0(e,t,!1,!1),t.stateNode=e;e:{switch(l=Wu(n,r),n){case"dialog":Ge("cancel",e),Ge("close",e),a=r;break;case"iframe":case"object":case"embed":Ge("load",e),a=r;break;case"video":case"audio":for(a=0;a<Ci.length;a++)Ge(Ci[a],e);a=r;break;case"source":Ge("error",e),a=r;break;case"img":case"image":case"link":Ge("error",e),Ge("load",e),a=r;break;case"details":Ge("toggle",e),a=r;break;case"input":Vf(e,r),a=Ou(e,r),Ge("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=Ue({},r,{value:void 0}),Ge("invalid",e);break;case"textarea":Yf(e,r),a=zu(e,r),Ge("invalid",e);break;default:a=r}Uu(n,a),d=a;for(i in d)if(d.hasOwnProperty(i)){var c=d[i];i==="style"?Zp(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Yp(e,c)):i==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Li(e,c):typeof c=="number"&&Li(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Ti.hasOwnProperty(i)?c!=null&&i==="onScroll"&&Ge("scroll",e):c!=null&&qc(e,i,c,l))}switch(n){case"input":Os(e),qf(e,r,!1);break;case"textarea":Os(e),Qf(e);break;case"option":r.value!=null&&e.setAttribute("value",""+fr(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Ca(e,!!r.multiple,i,!1):r.defaultValue!=null&&Ca(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=No)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return vt(t),null;case 6:if(e&&t.stateNode!=null)M0(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(Y(166));if(n=Gr(Ui.current),Gr(An.current),Vs(t)){if(r=t.stateNode,n=t.memoizedProps,r[Cn]=t,(i=r.nodeValue!==n)&&(e=zt,e!==null))switch(e.tag){case 3:Hs(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Hs(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Cn]=t,t.stateNode=r}return vt(t),null;case 13:if(Be(Ke),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(_e&&Kt!==null&&t.mode&1&&!(t.flags&128))Om(),Na(),t.flags|=98560,i=!1;else if(i=Vs(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(Y(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(Y(317));i[Cn]=t}else Na(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;vt(t),i=!1}else cn!==null&&(kc(cn),cn=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Ke.current&1?nt===0&&(nt=3):jd())),t.updateQueue!==null&&(t.flags|=4),vt(t),null);case 4:return ja(),yc(e,t),e===null&&_i(t.stateNode.containerInfo),vt(t),null;case 10:return pd(t.type._context),vt(t),null;case 17:return Lt(t.type)&&wo(),vt(t),null;case 19:if(Be(Ke),i=t.memoizedState,i===null)return vt(t),null;if(r=(t.flags&128)!==0,l=i.rendering,l===null)if(r)pi(i,!1);else{if(nt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=Bo(e),l!==null){for(t.flags|=128,pi(i,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,l=i.alternate,l===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=l.childLanes,i.lanes=l.lanes,i.child=l.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=l.memoizedProps,i.memoizedState=l.memoizedState,i.updateQueue=l.updateQueue,i.type=l.type,e=l.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Le(Ke,Ke.current&1|2),t.child}e=e.sibling}i.tail!==null&&Ye()>La&&(t.flags|=128,r=!0,pi(i,!1),t.lanes=4194304)}else{if(!r)if(e=Bo(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),pi(i,!0),i.tail===null&&i.tailMode==="hidden"&&!l.alternate&&!_e)return vt(t),null}else 2*Ye()-i.renderingStartTime>La&&n!==1073741824&&(t.flags|=128,r=!0,pi(i,!1),t.lanes=4194304);i.isBackwards?(l.sibling=t.child,t.child=l):(n=i.last,n!==null?n.sibling=l:t.child=l,i.last=l)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Ye(),t.sibling=null,n=Ke.current,Le(Ke,r?n&1|2:n&1),t):(vt(t),null);case 22:case 23:return wd(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?_t&1073741824&&(vt(t),t.subtreeFlags&6&&(t.flags|=8192)):vt(t),null;case 24:return null;case 25:return null}throw Error(Y(156,t.tag))}function C1(e,t){switch(cd(t),t.tag){case 1:return Lt(t.type)&&wo(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ja(),Be(Tt),Be(Mt),xd(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return vd(t),null;case 13:if(Be(Ke),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(Y(340));Na()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Be(Ke),null;case 4:return ja(),null;case 10:return pd(t.type._context),null;case 22:case 23:return wd(),null;case 24:return null;default:return null}}var Qs=!1,xt=!1,M1=typeof WeakSet=="function"?WeakSet:Set,ae=null;function va(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Je(e,t,r)}else n.current=null}function vc(e,t,n){try{n()}catch(r){Je(e,t,r)}}var _h=!1;function b1(e,t){if(tc=Ro,e=Rm(),ld(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var l=0,d=-1,c=-1,h=0,g=0,m=e,x=null;t:for(;;){for(var C;m!==n||a!==0&&m.nodeType!==3||(d=l+a),m!==i||r!==0&&m.nodeType!==3||(c=l+r),m.nodeType===3&&(l+=m.nodeValue.length),(C=m.firstChild)!==null;)x=m,m=C;for(;;){if(m===e)break t;if(x===n&&++h===a&&(d=l),x===i&&++g===r&&(c=l),(C=m.nextSibling)!==null)break;m=x,x=m.parentNode}m=C}n=d===-1||c===-1?null:{start:d,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(nc={focusedElem:e,selectionRange:n},Ro=!1,ae=t;ae!==null;)if(t=ae,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ae=e;else for(;ae!==null;){t=ae;try{var b=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(b!==null){var R=b.memoizedProps,E=b.memoizedState,M=t.stateNode,A=M.getSnapshotBeforeUpdate(t.elementType===t.type?R:ln(t.type,R),E);M.__reactInternalSnapshotBeforeUpdate=A}break;case 3:var D=t.stateNode.containerInfo;D.nodeType===1?D.textContent="":D.nodeType===9&&D.documentElement&&D.removeChild(D.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(Y(163))}}catch(_){Je(t,t.return,_)}if(e=t.sibling,e!==null){e.return=t.return,ae=e;break}ae=t.return}return b=_h,_h=!1,b}function Di(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var i=a.destroy;a.destroy=void 0,i!==void 0&&vc(t,n,i)}a=a.next}while(a!==r)}}function il(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function xc(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function b0(e){var t=e.alternate;t!==null&&(e.alternate=null,b0(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Cn],delete t[zi],delete t[ic],delete t[a1],delete t[i1])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function A0(e){return e.tag===5||e.tag===3||e.tag===4}function Kh(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||A0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Cc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=No));else if(r!==4&&(e=e.child,e!==null))for(Cc(e,t,n),e=e.sibling;e!==null;)Cc(e,t,n),e=e.sibling}function Mc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Mc(e,t,n),e=e.sibling;e!==null;)Mc(e,t,n),e=e.sibling}var ct=null,un=!1;function Hn(e,t,n){for(n=n.child;n!==null;)S0(e,t,n),n=n.sibling}function S0(e,t,n){if(bn&&typeof bn.onCommitFiberUnmount=="function")try{bn.onCommitFiberUnmount(Qo,n)}catch{}switch(n.tag){case 5:xt||va(n,t);case 6:var r=ct,a=un;ct=null,Hn(e,t,n),ct=r,un=a,ct!==null&&(un?(e=ct,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ct.removeChild(n.stateNode));break;case 18:ct!==null&&(un?(e=ct,n=n.stateNode,e.nodeType===8?xu(e.parentNode,n):e.nodeType===1&&xu(e,n),Bi(e)):xu(ct,n.stateNode));break;case 4:r=ct,a=un,ct=n.stateNode.containerInfo,un=!0,Hn(e,t,n),ct=r,un=a;break;case 0:case 11:case 14:case 15:if(!xt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var i=a,l=i.destroy;i=i.tag,l!==void 0&&(i&2||i&4)&&vc(n,t,l),a=a.next}while(a!==r)}Hn(e,t,n);break;case 1:if(!xt&&(va(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(d){Je(n,t,d)}Hn(e,t,n);break;case 21:Hn(e,t,n);break;case 22:n.mode&1?(xt=(r=xt)||n.memoizedState!==null,Hn(e,t,n),xt=r):Hn(e,t,n);break;default:Hn(e,t,n)}}function zh(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new M1),t.forEach(function(r){var a=j1.bind(null,e,r);n.has(r)||(n.add(r),r.then(a,a))})}}function on(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r];try{var i=e,l=t,d=l;e:for(;d!==null;){switch(d.tag){case 5:ct=d.stateNode,un=!1;break e;case 3:ct=d.stateNode.containerInfo,un=!0;break e;case 4:ct=d.stateNode.containerInfo,un=!0;break e}d=d.return}if(ct===null)throw Error(Y(160));S0(i,l,a),ct=null,un=!1;var c=a.alternate;c!==null&&(c.return=null),a.return=null}catch(h){Je(a,t,h)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)k0(t,e),t=t.sibling}function k0(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(on(t,e),vn(e),r&4){try{Di(3,e,e.return),il(3,e)}catch(R){Je(e,e.return,R)}try{Di(5,e,e.return)}catch(R){Je(e,e.return,R)}}break;case 1:on(t,e),vn(e),r&512&&n!==null&&va(n,n.return);break;case 5:if(on(t,e),vn(e),r&512&&n!==null&&va(n,n.return),e.flags&32){var a=e.stateNode;try{Li(a,"")}catch(R){Je(e,e.return,R)}}if(r&4&&(a=e.stateNode,a!=null)){var i=e.memoizedProps,l=n!==null?n.memoizedProps:i,d=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{d==="input"&&i.type==="radio"&&i.name!=null&&Hp(a,i),Wu(d,l);var h=Wu(d,i);for(l=0;l<c.length;l+=2){var g=c[l],m=c[l+1];g==="style"?Zp(a,m):g==="dangerouslySetInnerHTML"?Yp(a,m):g==="children"?Li(a,m):qc(a,g,m,h)}switch(d){case"input":_u(a,i);break;case"textarea":Vp(a,i);break;case"select":var x=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!i.multiple;var C=i.value;C!=null?Ca(a,!!i.multiple,C,!1):x!==!!i.multiple&&(i.defaultValue!=null?Ca(a,!!i.multiple,i.defaultValue,!0):Ca(a,!!i.multiple,i.multiple?[]:"",!1))}a[zi]=i}catch(R){Je(e,e.return,R)}}break;case 6:if(on(t,e),vn(e),r&4){if(e.stateNode===null)throw Error(Y(162));a=e.stateNode,i=e.memoizedProps;try{a.nodeValue=i}catch(R){Je(e,e.return,R)}}break;case 3:if(on(t,e),vn(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Bi(t.containerInfo)}catch(R){Je(e,e.return,R)}break;case 4:on(t,e),vn(e);break;case 13:on(t,e),vn(e),a=e.child,a.flags&8192&&(i=a.memoizedState!==null,a.stateNode.isHidden=i,!i||a.alternate!==null&&a.alternate.memoizedState!==null||(Dd=Ye())),r&4&&zh(e);break;case 22:if(g=n!==null&&n.memoizedState!==null,e.mode&1?(xt=(h=xt)||g,on(t,e),xt=h):on(t,e),vn(e),r&8192){if(h=e.memoizedState!==null,(e.stateNode.isHidden=h)&&!g&&e.mode&1)for(ae=e,g=e.child;g!==null;){for(m=ae=g;ae!==null;){switch(x=ae,C=x.child,x.tag){case 0:case 11:case 14:case 15:Di(4,x,x.return);break;case 1:va(x,x.return);var b=x.stateNode;if(typeof b.componentWillUnmount=="function"){r=x,n=x.return;try{t=r,b.props=t.memoizedProps,b.state=t.memoizedState,b.componentWillUnmount()}catch(R){Je(r,n,R)}}break;case 5:va(x,x.return);break;case 22:if(x.memoizedState!==null){Uh(m);continue}}C!==null?(C.return=x,ae=C):Uh(m)}g=g.sibling}e:for(g=null,m=e;;){if(m.tag===5){if(g===null){g=m;try{a=m.stateNode,h?(i=a.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(d=m.stateNode,c=m.memoizedProps.style,l=c!=null&&c.hasOwnProperty("display")?c.display:null,d.style.display=Qp("display",l))}catch(R){Je(e,e.return,R)}}}else if(m.tag===6){if(g===null)try{m.stateNode.nodeValue=h?"":m.memoizedProps}catch(R){Je(e,e.return,R)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;g===m&&(g=null),m=m.return}g===m&&(g=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:on(t,e),vn(e),r&4&&zh(e);break;case 21:break;default:on(t,e),vn(e)}}function vn(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(A0(n)){var r=n;break e}n=n.return}throw Error(Y(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(Li(a,""),r.flags&=-33);var i=Kh(e);Mc(e,i,a);break;case 3:case 4:var l=r.stateNode.containerInfo,d=Kh(e);Cc(e,d,l);break;default:throw Error(Y(161))}}catch(c){Je(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function A1(e,t,n){ae=e,R0(e)}function R0(e,t,n){for(var r=(e.mode&1)!==0;ae!==null;){var a=ae,i=a.child;if(a.tag===22&&r){var l=a.memoizedState!==null||Qs;if(!l){var d=a.alternate,c=d!==null&&d.memoizedState!==null||xt;d=Qs;var h=xt;if(Qs=l,(xt=c)&&!h)for(ae=a;ae!==null;)l=ae,c=l.child,l.tag===22&&l.memoizedState!==null?Wh(a):c!==null?(c.return=l,ae=c):Wh(a);for(;i!==null;)ae=i,R0(i),i=i.sibling;ae=a,Qs=d,xt=h}$h(e)}else a.subtreeFlags&8772&&i!==null?(i.return=a,ae=i):$h(e)}}function $h(e){for(;ae!==null;){var t=ae;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:xt||il(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!xt)if(n===null)r.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:ln(t.type,n.memoizedProps);r.componentDidUpdate(a,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Eh(t,i,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Eh(t,l,n)}break;case 5:var d=t.stateNode;if(n===null&&t.flags&4){n=d;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var h=t.alternate;if(h!==null){var g=h.memoizedState;if(g!==null){var m=g.dehydrated;m!==null&&Bi(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(Y(163))}xt||t.flags&512&&xc(t)}catch(x){Je(t,t.return,x)}}if(t===e){ae=null;break}if(n=t.sibling,n!==null){n.return=t.return,ae=n;break}ae=t.return}}function Uh(e){for(;ae!==null;){var t=ae;if(t===e){ae=null;break}var n=t.sibling;if(n!==null){n.return=t.return,ae=n;break}ae=t.return}}function Wh(e){for(;ae!==null;){var t=ae;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{il(4,t)}catch(c){Je(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var a=t.return;try{r.componentDidMount()}catch(c){Je(t,a,c)}}var i=t.return;try{xc(t)}catch(c){Je(t,i,c)}break;case 5:var l=t.return;try{xc(t)}catch(c){Je(t,l,c)}}}catch(c){Je(t,t.return,c)}if(t===e){ae=null;break}var d=t.sibling;if(d!==null){d.return=t.return,ae=d;break}ae=t.return}}var S1=Math.ceil,_o=On.ReactCurrentDispatcher,Rd=On.ReactCurrentOwner,Zt=On.ReactCurrentBatchConfig,Ae=0,lt=null,Xe=null,dt=0,_t=0,xa=vr(0),nt=0,Vi=null,zr=0,sl=0,Ed=0,Ni=null,wt=null,Dd=0,La=1/0,Dn=null,Ko=!1,bc=null,or=null,Zs=!1,er=null,zo=0,wi=0,Ac=null,mo=-1,go=0;function kt(){return Ae&6?Ye():mo!==-1?mo:mo=Ye()}function lr(e){return e.mode&1?Ae&2&&dt!==0?dt&-dt:o1.transition!==null?(go===0&&(go=cm()),go):(e=Ee,e!==0||(e=window.event,e=e===void 0?16:ym(e.type)),e):1}function pn(e,t,n,r){if(50<wi)throw wi=0,Ac=null,Error(Y(185));es(e,n,r),(!(Ae&2)||e!==lt)&&(e===lt&&(!(Ae&2)&&(sl|=n),nt===4&&Zn(e,dt)),Pt(e,r),n===1&&Ae===0&&!(t.mode&1)&&(La=Ye()+500,nl&&xr()))}function Pt(e,t){var n=e.callbackNode;ov(e,t);var r=ko(e,e===lt?dt:0);if(r===0)n!==null&&eh(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&eh(n),t===1)e.tag===0?s1(Jh.bind(null,e)):Gm(Jh.bind(null,e)),n1(function(){!(Ae&6)&&xr()}),n=null;else{switch(dm(r)){case 1:n=ed;break;case 4:n=lm;break;case 16:n=So;break;case 536870912:n=um;break;default:n=So}n=P0(n,E0.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function E0(e,t){if(mo=-1,go=0,Ae&6)throw Error(Y(327));var n=e.callbackNode;if(ka()&&e.callbackNode!==n)return null;var r=ko(e,e===lt?dt:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=$o(e,r);else{t=r;var a=Ae;Ae|=2;var i=N0();(lt!==e||dt!==t)&&(Dn=null,La=Ye()+500,Br(e,t));do try{E1();break}catch(d){D0(e,d)}while(!0);hd(),_o.current=i,Ae=a,Xe!==null?t=0:(lt=null,dt=0,t=nt)}if(t!==0){if(t===2&&(a=Yu(e),a!==0&&(r=a,t=Sc(e,a))),t===1)throw n=Vi,Br(e,0),Zn(e,r),Pt(e,Ye()),n;if(t===6)Zn(e,r);else{if(a=e.current.alternate,!(r&30)&&!k1(a)&&(t=$o(e,r),t===2&&(i=Yu(e),i!==0&&(r=i,t=Sc(e,i))),t===1))throw n=Vi,Br(e,0),Zn(e,r),Pt(e,Ye()),n;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(Y(345));case 2:Lr(e,wt,Dn);break;case 3:if(Zn(e,r),(r&130023424)===r&&(t=Dd+500-Ye(),10<t)){if(ko(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){kt(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=ac(Lr.bind(null,e,wt,Dn),t);break}Lr(e,wt,Dn);break;case 4:if(Zn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var l=31-hn(r);i=1<<l,l=t[l],l>a&&(a=l),r&=~i}if(r=a,r=Ye()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*S1(r/1960))-r,10<r){e.timeoutHandle=ac(Lr.bind(null,e,wt,Dn),r);break}Lr(e,wt,Dn);break;case 5:Lr(e,wt,Dn);break;default:throw Error(Y(329))}}}return Pt(e,Ye()),e.callbackNode===n?E0.bind(null,e):null}function Sc(e,t){var n=Ni;return e.current.memoizedState.isDehydrated&&(Br(e,t).flags|=256),e=$o(e,t),e!==2&&(t=wt,wt=n,t!==null&&kc(t)),e}function kc(e){wt===null?wt=e:wt.push.apply(wt,e)}function k1(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var a=n[r],i=a.getSnapshot;a=a.value;try{if(!mn(i(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Zn(e,t){for(t&=~Ed,t&=~sl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-hn(t),r=1<<n;e[n]=-1,t&=~r}}function Jh(e){if(Ae&6)throw Error(Y(327));ka();var t=ko(e,0);if(!(t&1))return Pt(e,Ye()),null;var n=$o(e,t);if(e.tag!==0&&n===2){var r=Yu(e);r!==0&&(t=r,n=Sc(e,r))}if(n===1)throw n=Vi,Br(e,0),Zn(e,t),Pt(e,Ye()),n;if(n===6)throw Error(Y(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Lr(e,wt,Dn),Pt(e,Ye()),null}function Nd(e,t){var n=Ae;Ae|=1;try{return e(t)}finally{Ae=n,Ae===0&&(La=Ye()+500,nl&&xr())}}function $r(e){er!==null&&er.tag===0&&!(Ae&6)&&ka();var t=Ae;Ae|=1;var n=Zt.transition,r=Ee;try{if(Zt.transition=null,Ee=1,e)return e()}finally{Ee=r,Zt.transition=n,Ae=t,!(Ae&6)&&xr()}}function wd(){_t=xa.current,Be(xa)}function Br(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,t1(n)),Xe!==null)for(n=Xe.return;n!==null;){var r=n;switch(cd(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&wo();break;case 3:ja(),Be(Tt),Be(Mt),xd();break;case 5:vd(r);break;case 4:ja();break;case 13:Be(Ke);break;case 19:Be(Ke);break;case 10:pd(r.type._context);break;case 22:case 23:wd()}n=n.return}if(lt=e,Xe=e=ur(e.current,null),dt=_t=t,nt=0,Vi=null,Ed=sl=zr=0,wt=Ni=null,Fr!==null){for(t=0;t<Fr.length;t++)if(n=Fr[t],r=n.interleaved,r!==null){n.interleaved=null;var a=r.next,i=n.pending;if(i!==null){var l=i.next;i.next=a,r.next=l}n.pending=r}Fr=null}return e}function D0(e,t){do{var n=Xe;try{if(hd(),fo.current=Oo,Io){for(var r=ze.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}Io=!1}if(Kr=0,st=tt=ze=null,Ei=!1,Wi=0,Rd.current=null,n===null||n.return===null){nt=1,Vi=t,Xe=null;break}e:{var i=e,l=n.return,d=n,c=t;if(t=dt,d.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var h=c,g=d,m=g.tag;if(!(g.mode&1)&&(m===0||m===11||m===15)){var x=g.alternate;x?(g.updateQueue=x.updateQueue,g.memoizedState=x.memoizedState,g.lanes=x.lanes):(g.updateQueue=null,g.memoizedState=null)}var C=Lh(l);if(C!==null){C.flags&=-257,Ph(C,l,d,i,t),C.mode&1&&Th(i,h,t),t=C,c=h;var b=t.updateQueue;if(b===null){var R=new Set;R.add(c),t.updateQueue=R}else b.add(c);break e}else{if(!(t&1)){Th(i,h,t),jd();break e}c=Error(Y(426))}}else if(_e&&d.mode&1){var E=Lh(l);if(E!==null){!(E.flags&65536)&&(E.flags|=256),Ph(E,l,d,i,t),dd(Ta(c,d));break e}}i=c=Ta(c,d),nt!==4&&(nt=2),Ni===null?Ni=[i]:Ni.push(i),i=l;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var M=d0(i,c,t);Rh(i,M);break e;case 1:d=c;var A=i.type,D=i.stateNode;if(!(i.flags&128)&&(typeof A.getDerivedStateFromError=="function"||D!==null&&typeof D.componentDidCatch=="function"&&(or===null||!or.has(D)))){i.flags|=65536,t&=-t,i.lanes|=t;var _=f0(i,d,t);Rh(i,_);break e}}i=i.return}while(i!==null)}j0(n)}catch(z){t=z,Xe===n&&n!==null&&(Xe=n=n.return);continue}break}while(!0)}function N0(){var e=_o.current;return _o.current=Oo,e===null?Oo:e}function jd(){(nt===0||nt===3||nt===2)&&(nt=4),lt===null||!(zr&268435455)&&!(sl&268435455)||Zn(lt,dt)}function $o(e,t){var n=Ae;Ae|=2;var r=N0();(lt!==e||dt!==t)&&(Dn=null,Br(e,t));do try{R1();break}catch(a){D0(e,a)}while(!0);if(hd(),Ae=n,_o.current=r,Xe!==null)throw Error(Y(261));return lt=null,dt=0,nt}function R1(){for(;Xe!==null;)w0(Xe)}function E1(){for(;Xe!==null&&!Zy();)w0(Xe)}function w0(e){var t=L0(e.alternate,e,_t);e.memoizedProps=e.pendingProps,t===null?j0(e):Xe=t,Rd.current=null}function j0(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=C1(n,t),n!==null){n.flags&=32767,Xe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{nt=6,Xe=null;return}}else if(n=x1(n,t,_t),n!==null){Xe=n;return}if(t=t.sibling,t!==null){Xe=t;return}Xe=t=e}while(t!==null);nt===0&&(nt=5)}function Lr(e,t,n){var r=Ee,a=Zt.transition;try{Zt.transition=null,Ee=1,D1(e,t,n,r)}finally{Zt.transition=a,Ee=r}return null}function D1(e,t,n,r){do ka();while(er!==null);if(Ae&6)throw Error(Y(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(Y(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(lv(e,i),e===lt&&(Xe=lt=null,dt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Zs||(Zs=!0,P0(So,function(){return ka(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Zt.transition,Zt.transition=null;var l=Ee;Ee=1;var d=Ae;Ae|=4,Rd.current=null,b1(e,n),k0(n,e),Vv(nc),Ro=!!tc,nc=tc=null,e.current=n,A1(n),Xy(),Ae=d,Ee=l,Zt.transition=i}else e.current=n;if(Zs&&(Zs=!1,er=e,zo=a),i=e.pendingLanes,i===0&&(or=null),nv(n.stateNode),Pt(e,Ye()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],r(a.value,{componentStack:a.stack,digest:a.digest});if(Ko)throw Ko=!1,e=bc,bc=null,e;return zo&1&&e.tag!==0&&ka(),i=e.pendingLanes,i&1?e===Ac?wi++:(wi=0,Ac=e):wi=0,xr(),null}function ka(){if(er!==null){var e=dm(zo),t=Zt.transition,n=Ee;try{if(Zt.transition=null,Ee=16>e?16:e,er===null)var r=!1;else{if(e=er,er=null,zo=0,Ae&6)throw Error(Y(331));var a=Ae;for(Ae|=4,ae=e.current;ae!==null;){var i=ae,l=i.child;if(ae.flags&16){var d=i.deletions;if(d!==null){for(var c=0;c<d.length;c++){var h=d[c];for(ae=h;ae!==null;){var g=ae;switch(g.tag){case 0:case 11:case 15:Di(8,g,i)}var m=g.child;if(m!==null)m.return=g,ae=m;else for(;ae!==null;){g=ae;var x=g.sibling,C=g.return;if(b0(g),g===h){ae=null;break}if(x!==null){x.return=C,ae=x;break}ae=C}}}var b=i.alternate;if(b!==null){var R=b.child;if(R!==null){b.child=null;do{var E=R.sibling;R.sibling=null,R=E}while(R!==null)}}ae=i}}if(i.subtreeFlags&2064&&l!==null)l.return=i,ae=l;else e:for(;ae!==null;){if(i=ae,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Di(9,i,i.return)}var M=i.sibling;if(M!==null){M.return=i.return,ae=M;break e}ae=i.return}}var A=e.current;for(ae=A;ae!==null;){l=ae;var D=l.child;if(l.subtreeFlags&2064&&D!==null)D.return=l,ae=D;else e:for(l=A;ae!==null;){if(d=ae,d.flags&2048)try{switch(d.tag){case 0:case 11:case 15:il(9,d)}}catch(z){Je(d,d.return,z)}if(d===l){ae=null;break e}var _=d.sibling;if(_!==null){_.return=d.return,ae=_;break e}ae=d.return}}if(Ae=a,xr(),bn&&typeof bn.onPostCommitFiberRoot=="function")try{bn.onPostCommitFiberRoot(Qo,e)}catch{}r=!0}return r}finally{Ee=n,Zt.transition=t}}return!1}function Hh(e,t,n){t=Ta(n,t),t=d0(e,t,1),e=sr(e,t,1),t=kt(),e!==null&&(es(e,1,t),Pt(e,t))}function Je(e,t,n){if(e.tag===3)Hh(e,e,n);else for(;t!==null;){if(t.tag===3){Hh(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(or===null||!or.has(r))){e=Ta(n,e),e=f0(t,e,1),t=sr(t,e,1),e=kt(),t!==null&&(es(t,1,e),Pt(t,e));break}}t=t.return}}function N1(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=kt(),e.pingedLanes|=e.suspendedLanes&n,lt===e&&(dt&n)===n&&(nt===4||nt===3&&(dt&130023424)===dt&&500>Ye()-Dd?Br(e,0):Ed|=n),Pt(e,t)}function T0(e,t){t===0&&(e.mode&1?(t=zs,zs<<=1,!(zs&130023424)&&(zs=4194304)):t=1);var n=kt();e=Gn(e,t),e!==null&&(es(e,t,n),Pt(e,n))}function w1(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),T0(e,n)}function j1(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(Y(314))}r!==null&&r.delete(t),T0(e,n)}var L0;L0=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Tt.current)jt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return jt=!1,v1(e,t,n);jt=!!(e.flags&131072)}else jt=!1,_e&&t.flags&1048576&&Bm(t,Lo,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;po(e,t),e=t.pendingProps;var a=Da(t,Mt.current);Sa(t,n),a=Md(null,t,r,e,a,n);var i=bd();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Lt(r)?(i=!0,jo(t)):i=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,gd(t),a.updater=al,t.stateNode=a,a._reactInternals=t,dc(t,r,e,n),t=pc(null,t,r,!0,i,n)):(t.tag=0,_e&&i&&ud(t),At(null,t,a,n),t=t.child),t;case 16:r=t.elementType;e:{switch(po(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=L1(r),e=ln(r,e),a){case 0:t=hc(null,t,r,e,n);break e;case 1:t=Bh(null,t,r,e,n);break e;case 11:t=Fh(null,t,r,e,n);break e;case 14:t=Gh(null,t,r,ln(r.type,e),n);break e}throw Error(Y(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:ln(r,a),hc(e,t,r,a,n);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:ln(r,a),Bh(e,t,r,a,n);case 3:e:{if(g0(t),e===null)throw Error(Y(387));r=t.pendingProps,i=t.memoizedState,a=i.element,$m(e,t),Go(t,r,null,n);var l=t.memoizedState;if(r=l.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){a=Ta(Error(Y(423)),t),t=Ih(e,t,r,n,a);break e}else if(r!==a){a=Ta(Error(Y(424)),t),t=Ih(e,t,r,n,a);break e}else for(Kt=ir(t.stateNode.containerInfo.firstChild),zt=t,_e=!0,cn=null,n=Km(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Na(),r===a){t=Bn(e,t,n);break e}At(e,t,r,n)}t=t.child}return t;case 5:return Um(t),e===null&&lc(t),r=t.type,a=t.pendingProps,i=e!==null?e.memoizedProps:null,l=a.children,rc(r,a)?l=null:i!==null&&rc(r,i)&&(t.flags|=32),m0(e,t),At(e,t,l,n),t.child;case 6:return e===null&&lc(t),null;case 13:return y0(e,t,n);case 4:return yd(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=wa(t,null,r,n):At(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:ln(r,a),Fh(e,t,r,a,n);case 7:return At(e,t,t.pendingProps,n),t.child;case 8:return At(e,t,t.pendingProps.children,n),t.child;case 12:return At(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,i=t.memoizedProps,l=a.value,Le(Po,r._currentValue),r._currentValue=l,i!==null)if(mn(i.value,l)){if(i.children===a.children&&!Tt.current){t=Bn(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var d=i.dependencies;if(d!==null){l=i.child;for(var c=d.firstContext;c!==null;){if(c.context===r){if(i.tag===1){c=Tn(-1,n&-n),c.tag=2;var h=i.updateQueue;if(h!==null){h=h.shared;var g=h.pending;g===null?c.next=c:(c.next=g.next,g.next=c),h.pending=c}}i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),uc(i.return,n,t),d.lanes|=n;break}c=c.next}}else if(i.tag===10)l=i.type===t.type?null:i.child;else if(i.tag===18){if(l=i.return,l===null)throw Error(Y(341));l.lanes|=n,d=l.alternate,d!==null&&(d.lanes|=n),uc(l,n,t),l=i.sibling}else l=i.child;if(l!==null)l.return=i;else for(l=i;l!==null;){if(l===t){l=null;break}if(i=l.sibling,i!==null){i.return=l.return,l=i;break}l=l.return}i=l}At(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,Sa(t,n),a=en(a),r=r(a),t.flags|=1,At(e,t,r,n),t.child;case 14:return r=t.type,a=ln(r,t.pendingProps),a=ln(r.type,a),Gh(e,t,r,a,n);case 15:return h0(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:ln(r,a),po(e,t),t.tag=1,Lt(r)?(e=!0,jo(t)):e=!1,Sa(t,n),c0(t,r,a),dc(t,r,a,n),pc(null,t,r,!0,e,n);case 19:return v0(e,t,n);case 22:return p0(e,t,n)}throw Error(Y(156,t.tag))};function P0(e,t){return om(e,t)}function T1(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yt(e,t,n,r){return new T1(e,t,n,r)}function Td(e){return e=e.prototype,!(!e||!e.isReactComponent)}function L1(e){if(typeof e=="function")return Td(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Qc)return 11;if(e===Zc)return 14}return 2}function ur(e,t){var n=e.alternate;return n===null?(n=Yt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function yo(e,t,n,r,a,i){var l=2;if(r=e,typeof e=="function")Td(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case ua:return Ir(n.children,a,i,t);case Yc:l=8,a|=8;break;case Fu:return e=Yt(12,n,t,a|2),e.elementType=Fu,e.lanes=i,e;case Gu:return e=Yt(13,n,t,a),e.elementType=Gu,e.lanes=i,e;case Bu:return e=Yt(19,n,t,a),e.elementType=Bu,e.lanes=i,e;case Up:return ol(n,a,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case zp:l=10;break e;case $p:l=9;break e;case Qc:l=11;break e;case Zc:l=14;break e;case qn:l=16,r=null;break e}throw Error(Y(130,e==null?e:typeof e,""))}return t=Yt(l,n,t,a),t.elementType=e,t.type=r,t.lanes=i,t}function Ir(e,t,n,r){return e=Yt(7,e,r,t),e.lanes=n,e}function ol(e,t,n,r){return e=Yt(22,e,r,t),e.elementType=Up,e.lanes=n,e.stateNode={isHidden:!1},e}function Eu(e,t,n){return e=Yt(6,e,null,t),e.lanes=n,e}function Du(e,t,n){return t=Yt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function P1(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=lu(0),this.expirationTimes=lu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=lu(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Ld(e,t,n,r,a,i,l,d,c){return e=new P1(e,t,n,d,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Yt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},gd(i),e}function F1(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:la,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function F0(e){if(!e)return hr;e=e._reactInternals;e:{if(Hr(e)!==e||e.tag!==1)throw Error(Y(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Lt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(Y(171))}if(e.tag===1){var n=e.type;if(Lt(n))return Fm(e,n,t)}return t}function G0(e,t,n,r,a,i,l,d,c){return e=Ld(n,r,!0,e,a,i,l,d,c),e.context=F0(null),n=e.current,r=kt(),a=lr(n),i=Tn(r,a),i.callback=t??null,sr(n,i,a),e.current.lanes=a,es(e,a,r),Pt(e,r),e}function ll(e,t,n,r){var a=t.current,i=kt(),l=lr(a);return n=F0(n),t.context===null?t.context=n:t.pendingContext=n,t=Tn(i,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=sr(a,t,l),e!==null&&(pn(e,a,l,i),co(e,a,l)),l}function Uo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Vh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Pd(e,t){Vh(e,t),(e=e.alternate)&&Vh(e,t)}function G1(){return null}var B0=typeof reportError=="function"?reportError:function(e){console.error(e)};function Fd(e){this._internalRoot=e}ul.prototype.render=Fd.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(Y(409));ll(e,t,null,null)};ul.prototype.unmount=Fd.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;$r(function(){ll(null,e,null,null)}),t[Fn]=null}};function ul(e){this._internalRoot=e}ul.prototype.unstable_scheduleHydration=function(e){if(e){var t=pm();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Qn.length&&t!==0&&t<Qn[n].priority;n++);Qn.splice(n,0,e),n===0&&gm(e)}};function Gd(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function cl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function qh(){}function B1(e,t,n,r,a){if(a){if(typeof r=="function"){var i=r;r=function(){var h=Uo(l);i.call(h)}}var l=G0(t,r,e,0,null,!1,!1,"",qh);return e._reactRootContainer=l,e[Fn]=l.current,_i(e.nodeType===8?e.parentNode:e),$r(),l}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var d=r;r=function(){var h=Uo(c);d.call(h)}}var c=Ld(e,0,!1,null,null,!1,!1,"",qh);return e._reactRootContainer=c,e[Fn]=c.current,_i(e.nodeType===8?e.parentNode:e),$r(function(){ll(t,c,n,r)}),c}function dl(e,t,n,r,a){var i=n._reactRootContainer;if(i){var l=i;if(typeof a=="function"){var d=a;a=function(){var c=Uo(l);d.call(c)}}ll(t,l,e,a)}else l=B1(n,t,e,a,r);return Uo(l)}fm=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=xi(t.pendingLanes);n!==0&&(td(t,n|1),Pt(t,Ye()),!(Ae&6)&&(La=Ye()+500,xr()))}break;case 13:$r(function(){var r=Gn(e,1);if(r!==null){var a=kt();pn(r,e,1,a)}}),Pd(e,1)}};nd=function(e){if(e.tag===13){var t=Gn(e,134217728);if(t!==null){var n=kt();pn(t,e,134217728,n)}Pd(e,134217728)}};hm=function(e){if(e.tag===13){var t=lr(e),n=Gn(e,t);if(n!==null){var r=kt();pn(n,e,t,r)}Pd(e,t)}};pm=function(){return Ee};mm=function(e,t){var n=Ee;try{return Ee=e,t()}finally{Ee=n}};Hu=function(e,t,n){switch(t){case"input":if(_u(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=tl(r);if(!a)throw Error(Y(90));Jp(r),_u(r,a)}}}break;case"textarea":Vp(e,n);break;case"select":t=n.value,t!=null&&Ca(e,!!n.multiple,t,!1)}};tm=Nd;nm=$r;var I1={usingClientEntryPoint:!1,Events:[ns,ha,tl,Xp,em,Nd]},mi={findFiberByHostInstance:Pr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},O1={bundleType:mi.bundleType,version:mi.version,rendererPackageName:mi.rendererPackageName,rendererConfig:mi.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:On.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=im(e),e===null?null:e.stateNode},findFiberByHostInstance:mi.findFiberByHostInstance||G1,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Xs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xs.isDisabled&&Xs.supportsFiber)try{Qo=Xs.inject(O1),bn=Xs}catch{}}Wt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=I1;Wt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Gd(t))throw Error(Y(200));return F1(e,t,null,n)};Wt.createRoot=function(e,t){if(!Gd(e))throw Error(Y(299));var n=!1,r="",a=B0;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=Ld(e,1,!1,null,null,n,!1,r,a),e[Fn]=t.current,_i(e.nodeType===8?e.parentNode:e),new Fd(t)};Wt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(Y(188)):(e=Object.keys(e).join(","),Error(Y(268,e)));return e=im(t),e=e===null?null:e.stateNode,e};Wt.flushSync=function(e){return $r(e)};Wt.hydrate=function(e,t,n){if(!cl(t))throw Error(Y(200));return dl(null,e,t,!0,n)};Wt.hydrateRoot=function(e,t,n){if(!Gd(e))throw Error(Y(405));var r=n!=null&&n.hydratedSources||null,a=!1,i="",l=B0;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=G0(t,null,e,1,n??null,a,!1,i,l),e[Fn]=t.current,_i(e),r)for(e=0;e<r.length;e++)n=r[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new ul(t)};Wt.render=function(e,t,n){if(!cl(t))throw Error(Y(200));return dl(null,e,t,!1,n)};Wt.unmountComponentAtNode=function(e){if(!cl(e))throw Error(Y(40));return e._reactRootContainer?($r(function(){dl(null,null,e,!1,function(){e._reactRootContainer=null,e[Fn]=null})}),!0):!1};Wt.unstable_batchedUpdates=Nd;Wt.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!cl(n))throw Error(Y(200));if(e==null||e._reactInternals===void 0)throw Error(Y(38));return dl(e,t,n,!1,r)};Wt.version="18.3.1-next-f1338f8080-20240426";function I0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(I0)}catch(e){console.error(e)}}I0(),Ip.exports=Wt;var _1=Ip.exports,Yh=_1;Lu.createRoot=Yh.createRoot,Lu.hydrateRoot=Yh.hydrateRoot;/**
 * @remix-run/router v1.23.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function qi(){return qi=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},qi.apply(null,arguments)}var tr;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(tr||(tr={}));const Qh="popstate";function K1(e){e===void 0&&(e={});function t(a,i){let{pathname:l="/",search:d="",hash:c=""}=Vr(a.location.hash.substr(1));return!l.startsWith("/")&&!l.startsWith(".")&&(l="/"+l),Rc("",{pathname:l,search:d,hash:c},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(a,i){let l=a.document.querySelector("base"),d="";if(l&&l.getAttribute("href")){let c=a.location.href,h=c.indexOf("#");d=h===-1?c:c.slice(0,h)}return d+"#"+(typeof i=="string"?i:Wo(i))}function r(a,i){Bd(a.pathname.charAt(0)==="/","relative pathnames are not supported in hash history.push("+JSON.stringify(i)+")")}return $1(t,n,r,e)}function $e(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Bd(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function z1(){return Math.random().toString(36).substr(2,8)}function Zh(e,t){return{usr:e.state,key:e.key,idx:t}}function Rc(e,t,n,r){return n===void 0&&(n=null),qi({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Vr(t):t,{state:n,key:t&&t.key||r||z1()})}function Wo(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Vr(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function $1(e,t,n,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:i=!1}=r,l=a.history,d=tr.Pop,c=null,h=g();h==null&&(h=0,l.replaceState(qi({},l.state,{idx:h}),""));function g(){return(l.state||{idx:null}).idx}function m(){d=tr.Pop;let E=g(),M=E==null?null:E-h;h=E,c&&c({action:d,location:R.location,delta:M})}function x(E,M){d=tr.Push;let A=Rc(R.location,E,M);n&&n(A,E),h=g()+1;let D=Zh(A,h),_=R.createHref(A);try{l.pushState(D,"",_)}catch(z){if(z instanceof DOMException&&z.name==="DataCloneError")throw z;a.location.assign(_)}i&&c&&c({action:d,location:R.location,delta:1})}function C(E,M){d=tr.Replace;let A=Rc(R.location,E,M);n&&n(A,E),h=g();let D=Zh(A,h),_=R.createHref(A);l.replaceState(D,"",_),i&&c&&c({action:d,location:R.location,delta:0})}function b(E){let M=a.location.origin!=="null"?a.location.origin:a.location.href,A=typeof E=="string"?E:Wo(E);return A=A.replace(/ $/,"%20"),$e(M,"No window.location.(origin|href) available to create URL for href: "+A),new URL(A,M)}let R={get action(){return d},get location(){return e(a,l)},listen(E){if(c)throw new Error("A history only accepts one active listener");return a.addEventListener(Qh,m),c=E,()=>{a.removeEventListener(Qh,m),c=null}},createHref(E){return t(a,E)},createURL:b,encodeLocation(E){let M=b(E);return{pathname:M.pathname,search:M.search,hash:M.hash}},push:x,replace:C,go(E){return l.go(E)}};return R}var Xh;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Xh||(Xh={}));function U1(e,t,n){return n===void 0&&(n="/"),W1(e,t,n)}function W1(e,t,n,r){let a=typeof t=="string"?Vr(t):t,i=Pa(a.pathname||"/",n);if(i==null)return null;let l=O0(e);J1(l);let d=null,c=r7(i);for(let h=0;d==null&&h<l.length;++h)d=t7(l[h],c);return d}function O0(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(i,l,d)=>{let c={relativePath:d===void 0?i.path||"":d,caseSensitive:i.caseSensitive===!0,childrenIndex:l,route:i};c.relativePath.startsWith("/")&&($e(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let h=cr([r,c.relativePath]),g=n.concat(c);i.children&&i.children.length>0&&($e(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+h+'".')),O0(i.children,t,g,h)),!(i.path==null&&!i.index)&&t.push({path:h,score:X1(h,i.index),routesMeta:g})};return e.forEach((i,l)=>{var d;if(i.path===""||!((d=i.path)!=null&&d.includes("?")))a(i,l);else for(let c of _0(i.path))a(i,l,c)}),t}function _0(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return a?[i,""]:[i];let l=_0(r.join("/")),d=[];return d.push(...l.map(c=>c===""?i:[i,c].join("/"))),a&&d.push(...l),d.map(c=>e.startsWith("/")&&c===""?"/":c)}function J1(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:e7(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const H1=/^:[\w-]+$/,V1=3,q1=2,Y1=1,Q1=10,Z1=-2,ep=e=>e==="*";function X1(e,t){let n=e.split("/"),r=n.length;return n.some(ep)&&(r+=Z1),t&&(r+=q1),n.filter(a=>!ep(a)).reduce((a,i)=>a+(H1.test(i)?V1:i===""?Y1:Q1),r)}function e7(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function t7(e,t,n){let{routesMeta:r}=e,a={},i="/",l=[];for(let d=0;d<r.length;++d){let c=r[d],h=d===r.length-1,g=i==="/"?t:t.slice(i.length)||"/",m=Ec({path:c.relativePath,caseSensitive:c.caseSensitive,end:h},g),x=c.route;if(!m)return null;Object.assign(a,m.params),l.push({params:a,pathname:cr([i,m.pathname]),pathnameBase:s7(cr([i,m.pathnameBase])),route:x}),m.pathnameBase!=="/"&&(i=cr([i,m.pathnameBase]))}return l}function Ec(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=n7(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let i=a[0],l=i.replace(/(.)\/+$/,"$1"),d=a.slice(1);return{params:r.reduce((h,g,m)=>{let{paramName:x,isOptional:C}=g;if(x==="*"){let R=d[m]||"";l=i.slice(0,i.length-R.length).replace(/(.)\/+$/,"$1")}const b=d[m];return C&&!b?h[x]=void 0:h[x]=(b||"").replace(/%2F/g,"/"),h},{}),pathname:i,pathnameBase:l,pattern:e}}function n7(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Bd(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,d,c)=>(r.push({paramName:d,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function r7(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Bd(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Pa(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function a7(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?Vr(e):e,i;return n?(n=K0(n),n.startsWith("/")?i=tp(n.substring(1),"/"):i=tp(n,t)):i=t,{pathname:i,search:o7(r),hash:l7(a)}}function tp(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function Nu(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function i7(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Id(e,t){let n=i7(e);return t?n.map((r,a)=>a===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Od(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=Vr(e):(a=qi({},e),$e(!a.pathname||!a.pathname.includes("?"),Nu("?","pathname","search",a)),$e(!a.pathname||!a.pathname.includes("#"),Nu("#","pathname","hash",a)),$e(!a.search||!a.search.includes("#"),Nu("#","search","hash",a)));let i=e===""||a.pathname==="",l=i?"/":a.pathname,d;if(l==null)d=n;else{let m=t.length-1;if(!r&&l.startsWith("..")){let x=l.split("/");for(;x[0]==="..";)x.shift(),m-=1;a.pathname=x.join("/")}d=m>=0?t[m]:"/"}let c=a7(a,d),h=l&&l!=="/"&&l.endsWith("/"),g=(i||l===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(h||g)&&(c.pathname+="/"),c}const K0=e=>e.replace(/\/\/+/g,"/"),cr=e=>K0(e.join("/")),s7=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),o7=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,l7=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function u7(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const z0=["post","put","patch","delete"];new Set(z0);const c7=["get",...z0];new Set(c7);/**
 * React Router v6.30.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Yi(){return Yi=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Yi.apply(null,arguments)}const fl=I.createContext(null),$0=I.createContext(null),_n=I.createContext(null),hl=I.createContext(null),Sn=I.createContext({outlet:null,matches:[],isDataRoute:!1}),U0=I.createContext(null);function d7(e,t){let{relative:n}=t===void 0?{}:t;_a()||$e(!1);let{basename:r,navigator:a}=I.useContext(_n),{hash:i,pathname:l,search:d}=pl(e,{relative:n}),c=l;return r!=="/"&&(c=l==="/"?r:cr([r,l])),a.createHref({pathname:c,search:d,hash:i})}function _a(){return I.useContext(hl)!=null}function qr(){return _a()||$e(!1),I.useContext(hl).location}function W0(e){I.useContext(_n).static||I.useLayoutEffect(e)}function Qe(){let{isDataRoute:e}=I.useContext(Sn);return e?R7():f7()}function f7(){_a()||$e(!1);let e=I.useContext(fl),{basename:t,future:n,navigator:r}=I.useContext(_n),{matches:a}=I.useContext(Sn),{pathname:i}=qr(),l=JSON.stringify(Id(a,n.v7_relativeSplatPath)),d=I.useRef(!1);return W0(()=>{d.current=!0}),I.useCallback(function(h,g){if(g===void 0&&(g={}),!d.current)return;if(typeof h=="number"){r.go(h);return}let m=Od(h,JSON.parse(l),i,g.relative==="path");e==null&&t!=="/"&&(m.pathname=m.pathname==="/"?t:cr([t,m.pathname])),(g.replace?r.replace:r.push)(m,g.state,g)},[t,r,l,i,e])}const h7=I.createContext(null);function p7(e){let t=I.useContext(Sn).outlet;return t&&I.createElement(h7.Provider,{value:e},t)}function as(){let{matches:e}=I.useContext(Sn),t=e[e.length-1];return t?t.params:{}}function pl(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=I.useContext(_n),{matches:a}=I.useContext(Sn),{pathname:i}=qr(),l=JSON.stringify(Id(a,r.v7_relativeSplatPath));return I.useMemo(()=>Od(e,JSON.parse(l),i,n==="path"),[e,l,i,n])}function m7(e,t){return g7(e,t)}function g7(e,t,n,r){_a()||$e(!1);let{navigator:a}=I.useContext(_n),{matches:i}=I.useContext(Sn),l=i[i.length-1],d=l?l.params:{};l&&l.pathname;let c=l?l.pathnameBase:"/";l&&l.route;let h=qr(),g;if(t){var m;let E=typeof t=="string"?Vr(t):t;c==="/"||(m=E.pathname)!=null&&m.startsWith(c)||$e(!1),g=E}else g=h;let x=g.pathname||"/",C=x;if(c!=="/"){let E=c.replace(/^\//,"").split("/");C="/"+x.replace(/^\//,"").split("/").slice(E.length).join("/")}let b=U1(e,{pathname:C}),R=M7(b&&b.map(E=>Object.assign({},E,{params:Object.assign({},d,E.params),pathname:cr([c,a.encodeLocation?a.encodeLocation(E.pathname).pathname:E.pathname]),pathnameBase:E.pathnameBase==="/"?c:cr([c,a.encodeLocation?a.encodeLocation(E.pathnameBase).pathname:E.pathnameBase])})),i,n,r);return t&&R?I.createElement(hl.Provider,{value:{location:Yi({pathname:"/",search:"",hash:"",state:null,key:"default"},g),navigationType:tr.Pop}},R):R}function y7(){let e=k7(),t=u7(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return I.createElement(I.Fragment,null,I.createElement("h2",null,"Unexpected Application Error!"),I.createElement("h3",{style:{fontStyle:"italic"}},t),n?I.createElement("pre",{style:a},n):null,null)}const v7=I.createElement(y7,null);class x7 extends I.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?I.createElement(Sn.Provider,{value:this.props.routeContext},I.createElement(U0.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function C7(e){let{routeContext:t,match:n,children:r}=e,a=I.useContext(fl);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),I.createElement(Sn.Provider,{value:t},r)}function M7(e,t,n,r){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let l=e,d=(a=n)==null?void 0:a.errors;if(d!=null){let g=l.findIndex(m=>m.route.id&&(d==null?void 0:d[m.route.id])!==void 0);g>=0||$e(!1),l=l.slice(0,Math.min(l.length,g+1))}let c=!1,h=-1;if(n&&r&&r.v7_partialHydration)for(let g=0;g<l.length;g++){let m=l[g];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(h=g),m.route.id){let{loaderData:x,errors:C}=n,b=m.route.loader&&x[m.route.id]===void 0&&(!C||C[m.route.id]===void 0);if(m.route.lazy||b){c=!0,h>=0?l=l.slice(0,h+1):l=[l[0]];break}}}return l.reduceRight((g,m,x)=>{let C,b=!1,R=null,E=null;n&&(C=d&&m.route.id?d[m.route.id]:void 0,R=m.route.errorElement||v7,c&&(h<0&&x===0?(E7("route-fallback"),b=!0,E=null):h===x&&(b=!0,E=m.route.hydrateFallbackElement||null)));let M=t.concat(l.slice(0,x+1)),A=()=>{let D;return C?D=R:b?D=E:m.route.Component?D=I.createElement(m.route.Component,null):m.route.element?D=m.route.element:D=g,I.createElement(C7,{match:m,routeContext:{outlet:g,matches:M,isDataRoute:n!=null},children:D})};return n&&(m.route.ErrorBoundary||m.route.errorElement||x===0)?I.createElement(x7,{location:n.location,revalidation:n.revalidation,component:R,error:C,children:A(),routeContext:{outlet:null,matches:M,isDataRoute:!0}}):A()},null)}var J0=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(J0||{}),H0=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(H0||{});function b7(e){let t=I.useContext(fl);return t||$e(!1),t}function A7(e){let t=I.useContext($0);return t||$e(!1),t}function S7(e){let t=I.useContext(Sn);return t||$e(!1),t}function V0(e){let t=S7(),n=t.matches[t.matches.length-1];return n.route.id||$e(!1),n.route.id}function k7(){var e;let t=I.useContext(U0),n=A7(),r=V0();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function R7(){let{router:e}=b7(J0.UseNavigateStable),t=V0(H0.UseNavigateStable),n=I.useRef(!1);return W0(()=>{n.current=!0}),I.useCallback(function(a,i){i===void 0&&(i={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,Yi({fromRouteId:t},i)))},[e,t])}const np={};function E7(e,t,n){np[e]||(np[e]=!0)}function D7(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Mi(e){let{to:t,replace:n,state:r,relative:a}=e;_a()||$e(!1);let{future:i,static:l}=I.useContext(_n),{matches:d}=I.useContext(Sn),{pathname:c}=qr(),h=Qe(),g=Od(t,Id(d,i.v7_relativeSplatPath),c,a==="path"),m=JSON.stringify(g);return I.useEffect(()=>h(JSON.parse(m),{replace:n,state:r,relative:a}),[h,m,a,n,r]),null}function N7(e){return p7(e.context)}function Te(e){$e(!1)}function w7(e){let{basename:t="/",children:n=null,location:r,navigationType:a=tr.Pop,navigator:i,static:l=!1,future:d}=e;_a()&&$e(!1);let c=t.replace(/^\/*/,"/"),h=I.useMemo(()=>({basename:c,navigator:i,static:l,future:Yi({v7_relativeSplatPath:!1},d)}),[c,d,i,l]);typeof r=="string"&&(r=Vr(r));let{pathname:g="/",search:m="",hash:x="",state:C=null,key:b="default"}=r,R=I.useMemo(()=>{let E=Pa(g,c);return E==null?null:{location:{pathname:E,search:m,hash:x,state:C,key:b},navigationType:a}},[c,g,m,x,C,b,a]);return R==null?null:I.createElement(_n.Provider,{value:h},I.createElement(hl.Provider,{children:n,value:R}))}function _d(e){let{children:t,location:n}=e;return m7(Dc(t),n)}new Promise(()=>{});function Dc(e,t){t===void 0&&(t=[]);let n=[];return I.Children.forEach(e,(r,a)=>{if(!I.isValidElement(r))return;let i=[...t,a];if(r.type===I.Fragment){n.push.apply(n,Dc(r.props.children,i));return}r.type!==Te&&$e(!1),!r.props.index||!r.props.children||$e(!1);let l={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(l.children=Dc(r.props.children,i)),n.push(l)}),n}/**
 * React Router DOM v6.30.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Jo(){return Jo=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Jo.apply(null,arguments)}function q0(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function j7(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function T7(e,t){return e.button===0&&(!t||t==="_self")&&!j7(e)}const L7=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],P7=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],F7="6";try{window.__reactRouterVersion=F7}catch{}const G7=I.createContext({isTransitioning:!1}),B7="startTransition",rp=Ny[B7];function I7(e){let{basename:t,children:n,future:r,window:a}=e,i=I.useRef();i.current==null&&(i.current=K1({window:a,v5Compat:!0}));let l=i.current,[d,c]=I.useState({action:l.action,location:l.location}),{v7_startTransition:h}=r||{},g=I.useCallback(m=>{h&&rp?rp(()=>c(m)):c(m)},[c,h]);return I.useLayoutEffect(()=>l.listen(g),[l,g]),I.useEffect(()=>D7(r),[r]),I.createElement(w7,{basename:t,children:n,location:d.location,navigationType:d.action,navigator:l,future:r})}const O7=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",_7=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Y0=I.forwardRef(function(t,n){let{onClick:r,relative:a,reloadDocument:i,replace:l,state:d,target:c,to:h,preventScrollReset:g,viewTransition:m}=t,x=q0(t,L7),{basename:C}=I.useContext(_n),b,R=!1;if(typeof h=="string"&&_7.test(h)&&(b=h,O7))try{let D=new URL(window.location.href),_=h.startsWith("//")?new URL(D.protocol+h):new URL(h),z=Pa(_.pathname,C);_.origin===D.origin&&z!=null?h=z+_.search+_.hash:R=!0}catch{}let E=d7(h,{relative:a}),M=z7(h,{replace:l,state:d,target:c,preventScrollReset:g,relative:a,viewTransition:m});function A(D){r&&r(D),D.defaultPrevented||M(D)}return I.createElement("a",Jo({},x,{href:b||E,onClick:R||i?r:A,ref:n,target:c}))}),Q0=I.forwardRef(function(t,n){let{"aria-current":r="page",caseSensitive:a=!1,className:i="",end:l=!1,style:d,to:c,viewTransition:h,children:g}=t,m=q0(t,P7),x=pl(c,{relative:m.relative}),C=qr(),b=I.useContext($0),{navigator:R,basename:E}=I.useContext(_n),M=b!=null&&$7(x)&&h===!0,A=R.encodeLocation?R.encodeLocation(x).pathname:x.pathname,D=C.pathname,_=b&&b.navigation&&b.navigation.location?b.navigation.location.pathname:null;a||(D=D.toLowerCase(),_=_?_.toLowerCase():null,A=A.toLowerCase()),_&&E&&(_=Pa(_,E)||_);const z=A!=="/"&&A.endsWith("/")?A.length-1:A.length;let X=D===A||!l&&D.startsWith(A)&&D.charAt(z)==="/",ee=_!=null&&(_===A||!l&&_.startsWith(A)&&_.charAt(A.length)==="/"),se={isActive:X,isPending:ee,isTransitioning:M},Pe=X?r:void 0,me;typeof i=="function"?me=i(se):me=[i,X?"active":null,ee?"pending":null,M?"transitioning":null].filter(Boolean).join(" ");let ht=typeof d=="function"?d(se):d;return I.createElement(Y0,Jo({},m,{"aria-current":Pe,className:me,ref:n,style:ht,to:c,viewTransition:h}),typeof g=="function"?g(se):g)});var Nc;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Nc||(Nc={}));var ap;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(ap||(ap={}));function K7(e){let t=I.useContext(fl);return t||$e(!1),t}function z7(e,t){let{target:n,replace:r,state:a,preventScrollReset:i,relative:l,viewTransition:d}=t===void 0?{}:t,c=Qe(),h=qr(),g=pl(e,{relative:l});return I.useCallback(m=>{if(T7(m,n)){m.preventDefault();let x=r!==void 0?r:Wo(h)===Wo(g);c(e,{replace:x,state:a,preventScrollReset:i,relative:l,viewTransition:d})}},[h,c,g,r,a,n,e,i,l,d])}function $7(e,t){t===void 0&&(t={});let n=I.useContext(G7);n==null&&$e(!1);let{basename:r}=K7(Nc.useViewTransitionState),a=pl(e,{relative:t.relative});if(!n.isTransitioning)return!1;let i=Pa(n.currentLocation.pathname,r)||n.currentLocation.pathname,l=Pa(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Ec(a.pathname,l)!=null||Ec(a.pathname,i)!=null}const ip=e=>{let t;const n=new Set,r=(h,g)=>{const m=typeof h=="function"?h(t):h;if(!Object.is(m,t)){const x=t;t=g??(typeof m!="object"||m===null)?m:Object.assign({},t,m),n.forEach(C=>C(t,x))}},a=()=>t,d={setState:r,getState:a,getInitialState:()=>c,subscribe:h=>(n.add(h),()=>n.delete(h))},c=t=e(r,a,d);return d},U7=e=>e?ip(e):ip,W7=e=>e;function J7(e,t=W7){const n=oa.useSyncExternalStore(e.subscribe,oa.useCallback(()=>t(e.getState()),[e,t]),oa.useCallback(()=>t(e.getInitialState()),[e,t]));return oa.useDebugValue(n),n}const sp=e=>{const t=U7(e),n=r=>J7(t,r);return Object.assign(n,t),n},H7=e=>e?sp(e):sp;class Kd{constructor(t){et(this,"state");this.state=t>>>0}next(){let t=this.state=this.state+1831565813>>>0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}int(t,n){return t+Math.floor(this.next()*(n-t+1))}range(t,n){return t+this.next()*(n-t)}chance(t){return this.next()<t}pick(t){return t[Math.floor(this.next()*t.length)]}gauss(){return(this.next()+this.next()+this.next()+this.next()-2)*1.732}weighted(t,n){let r=0;for(const i of t)r+=Math.max(0,n(i));if(r<=0)return this.pick(t);let a=this.next()*r;for(const i of t)if(a-=Math.max(0,n(i)),a<=0)return i;return t[t.length-1]}shuffle(t){for(let n=t.length-1;n>0;n--){const r=Math.floor(this.next()*(n+1));[t[n],t[r]]=[t[r],t[n]]}return t}}function V7(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}const Z0=["Corners","Crossing","Dribbling","Finishing","First Touch","Free Kicks","Heading","Long Shots","Long Throws","Marking","Passing","Penalty Taking","Tackling","Technique"],wc=["Aggression","Anticipation","Bravery","Composure","Concentration","Creativity","Decisions","Determination","Flair","Influence","Off the Ball","Positioning","Teamwork","Work Rate"],jc=["Acceleration","Agility","Balance","Jumping","Natural Fitness","Pace","Stamina","Strength"],X0=["Aerial Ability","Command of Area","Communication","Handling","Kicking","One on Ones","Reflexes","Rushing Out","Throwing"],ji=[...Z0,...wc,...jc,...X0],zd={};ji.forEach((e,t)=>zd[e]=t);const ye=e=>zd[e];function Ft(e){switch(e){case"GK":return"GK";case"DC":return"CB";case"DR":case"DL":case"WBR":case"WBL":return"FB";case"DM":return"DM";case"MC":return"CM";case"MR":case"ML":return"WM";case"AMC":return"AM";case"AMR":case"AML":return"W";case"ST":return"ST"}}const Vn={"Aerial Ability":-12,"Command of Area":-12,Communication:-8,Handling:-12,Kicking:-9,"One on Ones":-12,Reflexes:-12,"Rushing Out":-12,Throwing:-11},Tc={GK:{Corners:-12,Crossing:-11,Dribbling:-10,Finishing:-12,"First Touch":-6,"Free Kicks":-10,Heading:-9,"Long Shots":-12,"Long Throws":-8,Marking:-12,Passing:-4,"Penalty Taking":-8,Tackling:-12,Technique:-5,Aggression:-3,Anticipation:1,Bravery:1,Composure:0,Concentration:1,Creativity:-8,Decisions:0,Flair:-8,"Off the Ball":-12,Positioning:1,Teamwork:-1,"Work Rate":-3,Acceleration:-3,Agility:1,Balance:-2,Jumping:0,Pace:-4,Stamina:-3,Strength:-1,"Aerial Ability":1,"Command of Area":0,Communication:0,Handling:1,Kicking:-1,"One on Ones":1,Reflexes:2,"Rushing Out":-1,Throwing:-1},CB:{...Vn,Corners:-8,Crossing:-6,Dribbling:-5,Finishing:-7,"First Touch":-2,"Free Kicks":-7,Heading:2,"Long Shots":-6,"Long Throws":-4,Marking:2,Passing:-1,"Penalty Taking":-5,Tackling:2,Technique:-3,Aggression:1,Anticipation:1,Bravery:2,Composure:0,Concentration:1,Creativity:-5,Decisions:0,Flair:-6,"Off the Ball":-6,Positioning:2,Teamwork:0,Acceleration:-2,Agility:-2,Jumping:2,Pace:-1,Strength:2},FB:{...Vn,Corners:-4,Crossing:1,Dribbling:-1,Finishing:-6,"Free Kicks":-5,Heading:-2,"Long Shots":-4,"Long Throws":-1,Marking:1,Passing:0,"Penalty Taking":-4,Tackling:1,Technique:-1,Creativity:-3,Flair:-3,"Off the Ball":-2,Positioning:1,Teamwork:1,"Work Rate":1,Acceleration:1,Pace:1,Stamina:2,Jumping:-2,Strength:-1},DM:{...Vn,Corners:-4,Crossing:-3,Dribbling:-2,Finishing:-4,"Free Kicks":-3,Heading:0,"Long Shots":-1,"Long Throws":-5,Marking:1,Passing:1,"Penalty Taking":-2,Tackling:2,Anticipation:2,Composure:1,Concentration:1,Creativity:-1,Decisions:1,Flair:-3,"Off the Ball":-3,Positioning:2,Teamwork:2,"Work Rate":2,Acceleration:-1,Pace:-1,Stamina:2,Strength:1},CM:{...Vn,Corners:-1,Crossing:-1,Dribbling:0,Finishing:-2,"First Touch":1,"Free Kicks":-1,Heading:-2,"Long Shots":0,"Long Throws":-6,Marking:-2,Passing:2,"Penalty Taking":-1,Tackling:-1,Technique:1,Anticipation:1,Composure:1,Creativity:1,Decisions:2,"Off the Ball":0,Positioning:-1,Teamwork:2,"Work Rate":1,Stamina:2,Strength:-1,Jumping:-2},WM:{...Vn,Corners:0,Crossing:2,Dribbling:1,Finishing:-2,"Free Kicks":-1,Heading:-3,"Long Shots":-1,"Long Throws":-5,Marking:-3,Passing:1,"Penalty Taking":-2,Tackling:-2,Technique:1,Creativity:0,Flair:0,"Off the Ball":1,Positioning:-3,"Work Rate":2,Teamwork:1,Acceleration:1,Pace:1,Stamina:2,Strength:-2,Jumping:-3},AM:{...Vn,Corners:0,Crossing:-1,Dribbling:2,Finishing:0,"First Touch":2,"Free Kicks":0,Heading:-4,"Long Shots":1,"Long Throws":-7,Marking:-6,Passing:2,"Penalty Taking":0,Tackling:-5,Technique:2,Aggression:-2,Bravery:-2,Composure:1,Creativity:3,Decisions:1,Flair:2,"Off the Ball":1,Positioning:-5,Acceleration:0,Agility:1,Strength:-3,Jumping:-4},W:{...Vn,Corners:-1,Crossing:1,Dribbling:3,Finishing:0,"First Touch":1,"Free Kicks":-1,Heading:-4,"Long Shots":0,"Long Throws":-7,Marking:-6,Passing:0,"Penalty Taking":-1,Tackling:-5,Technique:2,Aggression:-2,Bravery:-1,Creativity:1,Flair:3,"Off the Ball":2,Positioning:-5,Acceleration:3,Agility:2,Balance:1,Pace:3,Strength:-3,Jumping:-3},ST:{...Vn,Corners:-5,Crossing:-3,Dribbling:1,Finishing:3,"First Touch":1,"Free Kicks":-2,Heading:1,"Long Shots":0,"Long Throws":-7,Marking:-7,Passing:-2,"Penalty Taking":1,Tackling:-6,Technique:0,Anticipation:1,Composure:2,Creativity:-2,"Off the Ball":3,Positioning:-6,Teamwork:-1,"Work Rate":-1,Acceleration:1,Pace:1,Strength:1,Jumping:1}},$d={pace:{Pace:3,Acceleration:3,Strength:-1},aerial:{Heading:3,Jumping:3,Strength:2,Agility:-1},strong:{Strength:3,Balance:2,Aggression:1,Acceleration:-1},finisher:{Finishing:3,Composure:2,"Off the Ball":2},playmaker:{Passing:3,Creativity:3,Technique:1,Decisions:1,Tackling:-1},dribbler:{Dribbling:3,Flair:2,Agility:2,Balance:1,Heading:-1},engine:{Stamina:3,"Work Rate":3,Teamwork:2,"Natural Fitness":2},tackler:{Tackling:3,Marking:2,Aggression:2,Bravery:1,Flair:-1},crosser:{Crossing:3,Corners:2,"Free Kicks":1},sniper:{"Long Shots":3,"Free Kicks":3,Technique:1},leader:{Influence:5,Determination:2,Communication:2,Composure:1},shotstopper:{Reflexes:3,"One on Ones":2,Agility:2},sweeper:{Kicking:3,Passing:3,"Rushing Out":3,Composure:2},flair:{Flair:4,Technique:2,Dribbling:1,Teamwork:-2},hardman:{Aggression:4,Bravery:3,Strength:1,Composure:-1},set:{Corners:3,"Free Kicks":3,"Penalty Taking":2}},op=new Set(["Acceleration","Pace","Agility","Stamina","Natural Fitness","Balance","Jumping"]),q7=new Set(["Anticipation","Composure","Concentration","Decisions","Positioning","Influence","Communication","Command of Area"]),e2=5.8,t2=1.2,Lc=new Map;function n2(e){const t=Math.round(e.ability),n=Lc.get(e.id);if(n&&n.ability===t&&n.age===e.age&&n.positions===e.positions&&n.traits===e.traits&&n.seed===e.seed)return n;const r={ability:t,age:e.age,positions:e.positions,traits:e.traits,seed:e.seed,attrs:Y7(e,t),ratings:{}};return Lc.set(e.id,r),r}function Ze(e){return n2(e).attrs}function lp(){Lc.clear()}function Y7(e,t){var h;const n=new Kd(e.seed),r=Ft(e.positions[0]),a=Tc[r],i=t/e2+t2,l=e.traits&&e.traits.length?e.traits:Z7(e,n),d=new Array(ji.length),c=e.positions.slice(1).map(g=>Tc[Ft(g)]);for(let g=0;g<ji.length;g++){const m=ji[g];let x=a[m]??0;for(const R of c){const E=R[m]??0;E>x&&(x=x+(E-x)*.4)}for(const R of l)x+=((h=$d[R])==null?void 0:h[m])??0;op.has(m)&&e.age>29&&(x-=(e.age-29)*(m==="Pace"||m==="Acceleration"?.55:.3)),op.has(m)&&e.age<21&&m!=="Natural Fitness"&&(x+=.5),q7.has(m)&&(x+=Math.max(-2,Math.min(2,(e.age-24)*.22))),m==="Determination"&&(x+=1);const C=n.gauss()*1.35;let b=i+x+C;x<=-8&&(b=Math.min(b,2+n.next()*6)),d[g]=Math.max(1,Math.min(20,Math.round(b)))}return d}const Q7={GK:["shotstopper","sweeper","leader"],CB:["aerial","tackler","leader","pace","strong","playmaker"],FB:["pace","crosser","engine","tackler","dribbler"],DM:["tackler","playmaker","engine","hardman","strong"],CM:["playmaker","engine","sniper","tackler","dribbler","set"],WM:["crosser","pace","engine","dribbler","set"],AM:["playmaker","dribbler","sniper","flair","set"],W:["pace","dribbler","flair","crosser","sniper"],ST:["finisher","aerial","pace","strong","dribbler","sniper"]};function Z7(e,t){const n=Q7[Ft(e.positions[0])],r=t.next()<.35?2:1,a=new Set;for(let i=0;i<r;i++)a.add(t.pick(n));return[...a]}const Ho={GK:{Reflexes:5,Handling:4,"One on Ones":3,"Aerial Ability":3,"Command of Area":2,Positioning:3,Concentration:2,Composure:1,Agility:2,Communication:1,Kicking:1,"Rushing Out":1,Decisions:1},CB:{Marking:4,Tackling:4,Heading:3,Positioning:4,Anticipation:2,Concentration:2,Strength:2,Jumping:2,Pace:1,Bravery:1,Decisions:1,Composure:1,Passing:1},FB:{Tackling:3,Marking:2,Positioning:2,Pace:3,Acceleration:2,Stamina:2,Crossing:2,Passing:1,"Work Rate":2,Anticipation:1,Teamwork:1,Dribbling:1,Decisions:1},DM:{Tackling:3,Marking:2,Positioning:3,Anticipation:3,Passing:3,Decisions:2,Teamwork:2,"Work Rate":2,Stamina:1,Strength:1,Composure:1,Concentration:1},CM:{Passing:4,Decisions:3,Creativity:2,"First Touch":2,Technique:2,Teamwork:2,"Work Rate":2,Stamina:2,Anticipation:1,Tackling:1,Composure:1,"Long Shots":1},WM:{Crossing:3,Dribbling:2,Pace:3,Acceleration:2,Passing:2,Stamina:2,"Work Rate":2,Technique:2,"Off the Ball":1,Creativity:1,Teamwork:1,"First Touch":1},AM:{Creativity:4,Passing:3,Technique:3,"First Touch":3,Dribbling:2,"Off the Ball":2,Decisions:2,Composure:2,"Long Shots":1,Finishing:1,Flair:1,Agility:1},W:{Dribbling:4,Pace:3,Acceleration:3,Technique:2,Crossing:2,"Off the Ball":2,Flair:1,"First Touch":2,Finishing:2,Agility:1,Creativity:1,Composure:1},ST:{Finishing:5,"Off the Ball":3,Composure:3,"First Touch":2,Anticipation:2,Pace:2,Acceleration:2,Heading:2,Strength:1,Dribbling:1,Technique:1,Jumping:1}},r2={};for(const e of Object.keys(Ho)){const t=Ho[e];let n=0,r=0;for(const[a,i]of Object.entries(t))n+=(Tc[e][a]??0)*i,r+=i;r2[e]=n/r}const a2={};for(const e of Object.keys(Ho))a2[e]=Object.entries(Ho[e]).map(([t,n])=>[zd[t],n]);function X7(e,t){const n=Ft(t);let r=0,a=0;for(const[i,l]of a2[n])r+=e[i]*l,a+=l;return(r/a-r2[n]-t2)*e2}const ex={GK:[],DC:["DM","DR","DL"],DR:["WBR","DC","MR"],DL:["WBL","DC","ML"],WBR:["DR","MR"],WBL:["DL","ML"],DM:["MC","DC"],MC:["DM","AMC"],MR:["AMR","WBR","DR","ML"],ML:["AML","WBL","DL","MR"],AMC:["MC","ST","AMR","AML"],AMR:["MR","AML","AMC","ST"],AML:["ML","AMR","AMC","ST"],ST:["AMC","AMR","AML"]};function tx(e,t){return e.positions.includes(t)?1:e.positions.some(n=>ex[n].includes(t))?.93:t==="GK"||e.positions[0]==="GK"?.35:.8}function Qt(e,t){const n=n2(e),r=n.ratings[t];if(r!=null)return r;const a=X7(n.attrs,t),d=(e.positions.includes(t)?a*.5+n.ability*.5:a*.7+n.ability*.3)*tx(e,t);return n.ratings[t]=d,d}const nx=e=>e<=19?1.25:e<=22?1.3:e<=25?1.15:e<=27?1:e<=29?.8:e<=30?.62:e<=31?.48:e<=32?.36:e<=33?.26:e<=34?.18:.1;function Rt(e){return e>=1e7?Math.round(e/5e5)*5e5:e>=1e6?Math.round(e/1e5)*1e5:e>=1e5?Math.round(e/25e3)*25e3:Math.max(0,Math.round(e/5e3)*5e3)}function i2(e,t){const n=e.ability;let r=12e7*Math.exp(.125*(n-90));r*=nx(e.age),e.age<=24&&(r*=1+Math.max(0,e.potential-n)*.035);const a=Math.max(0,e.contractEnd-t-1);return a===0?r*=.55:a===1&&(r*=.8),e.injury&&e.injury.days>60&&(r*=.8),Rt(Math.max(1e4,r))}function Ka(e,t=70){let n=28e4*Math.exp(.105*(e.ability-90));return n*=.75+t/200,e.age>=32&&(n*=.8),e.age<=20&&(n*=.6),Rt(Math.max(1e3,n))}function Ud(e,t){const n=t.clubId!=null?e.clubs[t.clubId]:null;if(!n)return 0;let r=1.25;t.transferListed&&(r=.9);const i=Object.values(e.players).filter(c=>c.clubId===n.id).filter(c=>c.ability>t.ability).length;return i<5?r+=.35:i<11?r+=.15:i>18&&(r-=.2),t.contractEnd-e.season-1<=0&&(r-=.25),(Date.parse(e.date)-Date.parse(t.joined))/864e5<180&&(r+=.4),Rt(t.value*Math.max(.6,r))}function oe(e){const t=e<0,n=Math.abs(e);let r;return n>=1e9?r=`£${(n/1e9).toFixed(2)}bn`:n>=1e6?r=`£${(n/1e6).toFixed(n>=1e8?0:1).replace(/\.0$/,"")}m`:n>=1e3?r=`£${Math.round(n/1e3)}K`:r=`£${Math.round(n)}`,t?`-${r}`:r}function za(e,t){let n=0;for(const r of Object.values(e.players))r.clubId===t.id&&(n+=r.wage);return n}const up={ENG:{first:["Harry","Jack","Oliver","Charlie","George","Alfie","Freddie","Leo","Archie","Theo","Oscar","Josh","Callum","Kai","Reece","Tyler","Jaden","Ethan","Mason","Harvey","Louie","Ryan","Dan","Sam","Tom","Ben","Joe","Lewis","Rhys","Kian"],last:["Smith","Jones","Taylor","Brown","Williams","Wilson","Johnson","Davies","Robinson","Wright","Thompson","Evans","Walker","White","Roberts","Green","Hall","Wood","Jackson","Clarke","Hughes","Edwards","Cole","Barnes","Palmer","Stone","Fletcher","Marsh","Price","Hart","Webb","Mills","Doyle","Okafor","Mensah","Bennett","Lloyd","Kerr","Ward","Gray"]},ESP:{first:["Pablo","Álvaro","Hugo","Iker","Javi","Sergio","Adrián","Dani","Marc","Pau","Unai","Jon","Aitor","Carlos","Mario","Rubén","Diego","Nico","Gonzalo","Raúl"],last:["García","Fernández","González","Rodríguez","López","Martínez","Sánchez","Pérez","Gómez","Martín","Jiménez","Ruiz","Hernández","Díaz","Moreno","Muñoz","Álvarez","Romero","Navarro","Torres","Domínguez","Vázquez","Ramos","Gil","Serrano","Blanco","Molina","Castro","Ortega","Rubio"]},FRA:{first:["Lucas","Hugo","Théo","Nathan","Enzo","Mathis","Rayan","Yanis","Kylian","Adam","Noah","Maxence","Bastien","Mamadou","Ibrahim","Moussa","Kévin","Jordan","Wesley","Yann"],last:["Martin","Bernard","Dubois","Thomas","Robert","Petit","Durand","Leroy","Moreau","Simon","Laurent","Lefebvre","Michel","Garcia","David","Bertrand","Roux","Vincent","Fournier","Morel","Diallo","Traoré","Koné","Camara","Diaby","Sissoko","Mendy","Kanté","Bamba","Touré"]},GER:{first:["Lukas","Leon","Finn","Jonas","Felix","Paul","Luca","Maximilian","Niklas","Tim","Jan","Moritz","Julian","Florian","Kevin","Tom","Nico","Ben","Elias","Noah"],last:["Müller","Schmidt","Schneider","Fischer","Weber","Meyer","Wagner","Becker","Schulz","Hoffmann","Koch","Richter","Klein","Wolf","Schröder","Neumann","Braun","Zimmermann","Krüger","Hartmann","Lange","Werner","Krause","Lehmann","Kaiser","Fuchs","Vogel","Keller","Frank","Berger"]},ITA:{first:["Lorenzo","Alessandro","Matteo","Francesco","Andrea","Leonardo","Riccardo","Tommaso","Gabriele","Federico","Davide","Marco","Nicolò","Simone","Luca","Giovanni","Filippo","Pietro","Samuele","Mattia"],last:["Rossi","Russo","Ferrari","Esposito","Bianchi","Romano","Colombo","Ricci","Marino","Greco","Bruno","Gallo","Conti","De Luca","Mancini","Costa","Giordano","Rizzo","Lombardi","Moretti","Barbieri","Fontana","Santoro","Mariani","Rinaldi","Caruso","Ferri","Galli","Martini","Leone"]},POR:{first:["João","Rodrigo","Tiago","Gonçalo","Diogo","Rafael","Francisco","Pedro","Martim","Tomás","Gabriel","Lucas","Matheus","Vinícius","Gustavo","Felipe","Caio","Igor","Luan","Bruno"],last:["Silva","Santos","Ferreira","Pereira","Oliveira","Costa","Rodrigues","Martins","Sousa","Fernandes","Gonçalves","Gomes","Lopes","Marques","Alves","Almeida","Ribeiro","Pinto","Carvalho","Teixeira","Moreira","Correia","Mendes","Nunes","Soares","Vieira","Monteiro","Cardoso","Rocha","Neves"]},NED:{first:["Daan","Sem","Levi","Luuk","Milan","Jesse","Thijs","Bram","Lars","Stijn","Ruben","Jurriën","Xavi","Quinten","Mats"],last:["de Jong","Jansen","de Vries","van den Berg","van Dijk","Bakker","Visser","Smit","Meijer","de Boer","Mulder","de Groot","Bos","Vos","Peters","Hendriks","van Leeuwen","Dekker","Brouwer","de Wit"]},SCA:{first:["Oscar","William","Lucas","Elias","Emil","Mathias","Magnus","Jonas","Oliver","Noah","Viktor","Anton","Isak","Sander","Erik"],last:["Hansen","Johansen","Olsen","Larsen","Andersen","Pedersen","Nilsen","Jensen","Nielsen","Karlsson","Andersson","Johansson","Lindqvist","Berg","Haugen","Dahl","Lund","Holm","Strand","Eriksen"]},AFR:{first:["Kwame","Samuel","Emmanuel","Victor","Ibrahim","Moussa","Abdou","Chidi","Kofi","Yaw","Issa","Amadou","Sadio","Joseph","Daniel"],last:["Mensah","Boateng","Osei","Adeyemi","Okonkwo","Diouf","Ndiaye","Sarr","Kouassi","Traoré","Eto","Nwosu","Asante","Owusu","Bamba","Konaté","Coulibaly","Ekong","Oduya","Mbeki"]},SAM:{first:["Santiago","Matías","Thiago","Nicolás","Facundo","Lautaro","Juan","Franco","Valentín","Agustín","Luis","Kevin","Brian","Joaquín","Enzo"],last:["González","Rodríguez","Gómez","Fernández","López","Díaz","Martínez","Pérez","Romero","Sosa","Álvarez","Torres","Ruiz","Benítez","Acosta","Medina","Herrera","Suárez","Aguirre","Giménez"]}},rx={ENG:"ENG",SCO:"ENG",WAL:"ENG",NIR:"ENG",IRL:"ENG",USA:"ENG",CAN:"ENG",AUS:"ENG",JAM:"ENG",ESP:"ESP",MEX:"SAM",ARG:"SAM",URU:"SAM",COL:"SAM",CHI:"SAM",PAR:"SAM",ECU:"SAM",VEN:"SAM",FRA:"FRA",BEL:"FRA",SUI:"GER",GER:"GER",AUT:"GER",ITA:"ITA",POR:"POR",BRA:"POR",NED:"NED",DEN:"SCA",NOR:"SCA",SWE:"SCA",FIN:"SCA",ISL:"SCA",SEN:"FRA",CIV:"FRA",MLI:"FRA",CMR:"FRA",GUI:"FRA",COD:"FRA",ALG:"FRA",MAR:"FRA",TUN:"FRA",NGA:"AFR",GHA:"AFR",GAM:"AFR",BFA:"AFR",ANG:"POR",RSA:"AFR",ZAM:"AFR",ZIM:"AFR"};function ax(e,t){const n=up[rx[t]??"ENG"]??up.ENG,r=e.pick(n.first),a=e.pick(n.last);return{name:`${r} ${a}`,short:a}}const cp={ENG:[["ENG",70],["IRL",5],["SCO",5],["WAL",5],["NGA",3],["GHA",3],["JAM",3],["FRA",3],["POR",3]],ESP:[["ESP",82],["ARG",4],["MAR",4],["FRA",3],["COL",3],["URU",2],["BRA",2]],ITA:[["ITA",78],["ARG",5],["BRA",4],["SEN",3],["ALB",3],["CRO",3],["NGA",2],["FRA",2]],GER:[["GER",75],["AUT",5],["TUR",5],["POL",3],["CRO",3],["KVX",3],["GHA",3],["NED",3]],FRA:[["FRA",65],["SEN",6],["CIV",6],["MLI",5],["CMR",4],["ALG",5],["MAR",5],["BEL",4]]},Qi={ENG:"England",SCO:"Scotland",WAL:"Wales",NIR:"Northern Ireland",IRL:"Republic of Ireland",ESP:"Spain",FRA:"France",GER:"Germany",ITA:"Italy",POR:"Portugal",NED:"Netherlands",BEL:"Belgium",BRA:"Brazil",ARG:"Argentina",URU:"Uruguay",COL:"Colombia",CHI:"Chile",PAR:"Paraguay",ECU:"Ecuador",VEN:"Venezuela",MEX:"Mexico",USA:"United States",CAN:"Canada",JAM:"Jamaica",DEN:"Denmark",NOR:"Norway",SWE:"Sweden",FIN:"Finland",ISL:"Iceland",SUI:"Switzerland",AUT:"Austria",POL:"Poland",CZE:"Czechia",SVK:"Slovakia",HUN:"Hungary",CRO:"Croatia",SRB:"Serbia",SVN:"Slovenia",BIH:"Bosnia & Herzegovina",MNE:"Montenegro",ALB:"Albania",KVX:"Kosovo",MKD:"North Macedonia",GRE:"Greece",TUR:"Türkiye",ROU:"Romania",BUL:"Bulgaria",UKR:"Ukraine",RUS:"Russia",GEO:"Georgia",ARM:"Armenia",EST:"Estonia",LTU:"Lithuania",LUX:"Luxembourg",CYP:"Cyprus",ISR:"Israel",UZB:"Uzbekistan",MAR:"Morocco",ALG:"Algeria",TUN:"Tunisia",EGY:"Egypt",SEN:"Senegal",CIV:"Côte d'Ivoire",MLI:"Mali",GUI:"Guinea",GNB:"Guinea-Bissau",CMR:"Cameroon",NGA:"Nigeria",GHA:"Ghana",GAM:"Gambia",BFA:"Burkina Faso",COD:"DR Congo",ANG:"Angola",RSA:"South Africa",ZAM:"Zambia",ZIM:"Zimbabwe",MOZ:"Mozambique",GAB:"Gabon",TOG:"Togo",BEN:"Benin",NIG:"Niger",SLE:"Sierra Leone",CTA:"Central African Rep.",EQG:"Equatorial Guinea",CPV:"Cape Verde",JPN:"Japan",KOR:"South Korea",AUS:"Australia",NZL:"New Zealand",IDN:"Indonesia",KSA:"Saudi Arabia",JOR:"Jordan",HON:"Honduras",HAI:"Haiti",PAN:"Panama",DOM:"Dominican Rep.",SUR:"Suriname",BER:"Bermuda",GUF:"French Guiana"},s2=864e5;function ot(e){return Date.UTC(+e.slice(0,4),+e.slice(5,7)-1,+e.slice(8,10))}function ix(e){return new Date(e).toISOString().slice(0,10)}function Ln(e,t){return ix(ot(e)+t*s2)}function dn(e,t){return Math.round((ot(e)-ot(t))/s2)}function o2(e){return new Date(ot(e)).getUTCDay()}const sx=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],l2=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ur(e,t=!0){const n=new Date(ot(e)),r=`${n.getUTCDate()} ${l2[n.getUTCMonth()]} ${n.getUTCFullYear()}`;return t?`${sx[n.getUTCDay()]} ${r}`:r}function Wd(e){const t=new Date(ot(e));return`${t.getUTCDate()} ${l2[t.getUTCMonth()]}`}function Pc(e){return+e.slice(5,7)}function u2(e,t){let n=e;for(;o2(n)!==t;)n=Ln(n,1);return n}function Xt(e){return`${e}/${String((e+1)%100).padStart(2,"0")}`}function pr(e){const t=Pc(e),n=+e.slice(8,10);return t===7||t===8||t===9&&n===1||t===1||t===2&&n<=2}function ox(e,t){const n=t.shuffle([...e]);n.length%2&&n.push(-1);const r=n.length,a=[];for(let l=0;l<r-1;l++){const d=[];for(let c=0;c<r/2;c++){const h=n[c],g=n[r-1-c];h===-1||g===-1||d.push((l+c)%2===0?[h,g]:[g,h])}a.push(d),n.splice(1,0,n.pop())}const i=a.map(l=>l.map(([d,c])=>[c,d]));return[...a,...i]}function lx(e,t){const n=t,r=t+1;switch(e.id){case"eng2":return{start:`${n}-08-09`,end:`${r}-05-02`};case"eng1":return{start:`${n}-08-16`,end:`${r}-05-24`};case"ger1":return{start:`${n}-08-23`,end:`${r}-05-16`,winterBreak:[`${n}-12-22`,`${r}-01-09`]};case"ita1":return{start:`${n}-08-23`,end:`${r}-05-24`};case"esp1":return{start:`${n}-08-16`,end:`${r}-05-24`};case"fra1":return{start:`${n}-08-16`,end:`${r}-05-16`,winterBreak:[`${n}-12-22`,`${r}-01-02`]};default:return{start:`${n}-08-16`,end:`${r}-05-23`}}}function ux(e){const t=e,n=e+1;return[`${t}-09-06`,`${t}-10-11`,`${t}-11-15`,`${n}-03-28`].map(r=>u2(r,6))}function cx(e,t,n){const r=lx(e,t),a=new Set(e.tier===1?ux(t):[]),i=[];for(let d=u2(r.start,6);ot(d)<=ot(r.end);d=Ln(d,7))a.has(d)||r.winterBreak&&ot(d)>=ot(r.winterBreak[0])&&ot(d)<=ot(r.winterBreak[1])||i.push(d);let l;if(i.length>=n){l=[];for(let c=0;c<n;c++)l.push(i[Math.round(c*(i.length-1)/Math.max(1,n-1))]);l=[...new Set(l)];let d=0;for(;l.length<n&&d<i.length;)l.includes(i[d])||l.push(i[d]),d++}else{const d=n-i.length,c=[],h=[`${t}-12-26`,`${t}-12-30`,`${t+1}-01-01`];for(const m of h){if(c.length>=d)break;i.includes(m)||c.push(m)}const g=(i.length-2)/Math.max(1,d-c.length+1);for(let m=1;c.length<d;m++){const x=i[Math.min(i.length-2,Math.max(1,Math.round(m*g)))];let C=Ln(x,3);for(;c.includes(C)||i.includes(C);)C=Ln(C,7);if(c.push(C),m>200)break}l=[...i,...c]}return l.sort((d,c)=>ot(d)-ot(c)),l.slice(0,n)}function dx(e,t,n){const r=ox(t.clubIds,n),a=cx(t,e.season,r.length),i=[];return r.forEach((l,d)=>{for(const[c,h]of l)i.push({id:e.nextId.fixture++,date:a[d],comp:t.id,compType:"league",round:d+1,home:c,away:h,played:!1,hg:0,ag:0,goals:[]})}),i}function c2(e,t){e.fixtures=[];for(const n of e.leagues)e.fixtures.push(...dx(e,n,t));e.fixtures.sort((n,r)=>ot(n.date)-ot(r.date)||n.id-r.id)}const W=(e,t,n)=>({pos:e,x:t,y:n}),Ut={"4-4-2":[W("GK",50,5),W("DR",85,24),W("DC",62,20),W("DC",38,20),W("DL",15,24),W("MR",85,52),W("MC",60,48),W("MC",40,48),W("ML",15,52),W("ST",60,80),W("ST",40,80)],"4-3-3":[W("GK",50,5),W("DR",85,24),W("DC",62,20),W("DC",38,20),W("DL",15,24),W("MC",70,50),W("DM",50,38),W("MC",30,50),W("AMR",82,74),W("ST",50,84),W("AML",18,74)],"4-2-3-1":[W("GK",50,5),W("DR",85,24),W("DC",62,20),W("DC",38,20),W("DL",15,24),W("DM",62,40),W("DM",38,40),W("AMR",82,66),W("AMC",50,64),W("AML",18,66),W("ST",50,85)],"4-1-2-1-2":[W("GK",50,5),W("DR",85,24),W("DC",62,20),W("DC",38,20),W("DL",15,24),W("DM",50,38),W("MC",70,50),W("MC",30,50),W("AMC",50,64),W("ST",62,82),W("ST",38,82)],"4-5-1":[W("GK",50,5),W("DR",85,24),W("DC",62,20),W("DC",38,20),W("DL",15,24),W("MR",86,54),W("MC",66,50),W("DM",50,40),W("MC",34,50),W("ML",14,54),W("ST",50,82)],"4-4-1-1":[W("GK",50,5),W("DR",85,24),W("DC",62,20),W("DC",38,20),W("DL",15,24),W("MR",85,50),W("MC",60,46),W("MC",40,46),W("ML",15,50),W("AMC",50,68),W("ST",50,85)],"3-5-2":[W("GK",50,5),W("DC",72,20),W("DC",50,18),W("DC",28,20),W("WBR",88,44),W("MC",66,50),W("DM",50,38),W("MC",34,50),W("WBL",12,44),W("ST",60,82),W("ST",40,82)],"3-4-3":[W("GK",50,5),W("DC",72,20),W("DC",50,18),W("DC",28,20),W("MR",86,48),W("MC",60,46),W("MC",40,46),W("ML",14,48),W("AMR",78,74),W("ST",50,84),W("AML",22,74)],"5-3-2":[W("GK",50,5),W("WBR",88,30),W("DC",70,20),W("DC",50,18),W("DC",30,20),W("WBL",12,30),W("MC",70,50),W("MC",50,46),W("MC",30,50),W("ST",60,80),W("ST",40,80)],"5-4-1":[W("GK",50,5),W("WBR",88,28),W("DC",70,20),W("DC",50,18),W("DC",30,20),W("WBL",12,28),W("MR",84,52),W("MC",60,48),W("MC",40,48),W("ML",16,52),W("ST",50,80)]},fx=Object.keys(Ut),ml=new WeakMap;function Wr(e){ml.delete(e)}function d2(e){const t=new Map;for(const n of Object.values(e.players)){const r=n.clubId;let a=t.get(r);a||t.set(r,a=[]),a.push(n)}return ml.set(e,t),t}function He(e,t){return(ml.get(e)??d2(e)).get(t)??[]}function f2(e){return(ml.get(e)??d2(e)).get(null)??[]}function Vo(e,t,n){t.clubId=n,t.joined=e.date,t.transferListed=!1,Wr(e)}function dr(e){return!e.injury&&e.suspended<=0}function vo(e){return .72+.28*Math.min(100,Math.max(0,e))/100}function xo(e,t){const n=e.condition,r=n<75?(75-n)*.6:0;return Qt(e,t)-r}function gl(e,t,n){const r=Ut[t.tactics.formation]??Ut["4-4-2"],a=He(e,t.id).filter(dr),i=new Array(r.length).fill(null),l=new Set,d=[];a.forEach((m,x)=>{r.forEach((C,b)=>{d.push({s:xo(m,C.pos),pi:x,si:b})})}),d.sort((m,x)=>x.s-m.s);for(const m of d){if(i[m.si]!=null)continue;const x=a[m.pi];if(!l.has(x.id)&&(i[m.si]=x.id,l.add(x.id),l.size===r.length))break}const c=a.filter(m=>!l.has(m.id)),h=[],g=c.filter(m=>m.positions[0]==="GK").sort((m,x)=>x.ability*eo(x)-m.ability*eo(m))[0];return g&&h.push(g.id),c.filter(m=>m.positions[0]!=="GK").sort((m,x)=>x.ability*eo(x)-m.ability*eo(m)).slice(0,9-h.length).forEach(m=>h.push(m.id)),{lineup:i,subs:h}}const eo=e=>vo(e.condition);function h2(e,t){const n=[],r=t.tactics,a=Ut[r.formation];if(!a)return["Unknown formation"];const i=new Set;return r.lineup.forEach((l,d)=>{if(l==null){n.push(`No player selected at ${a[d].pos}`);return}const c=e.players[l];!c||c.clubId!==t.id?n.push("A selected player has left the club"):c.injury?n.push(`${c.short} is injured`):c.suspended>0&&n.push(`${c.short} is suspended`),i.has(l)&&n.push("Player selected twice"),i.add(l)}),n}function Fc(e,t){const n=t.tactics,r=Ut[n.formation]??Ut["4-4-2"];n.lineup.length!==r.length&&(n.lineup=new Array(r.length).fill(null));const a=d=>{if(d==null)return!1;const c=e.players[d];return!!c&&c.clubId===t.id&&dr(c)},i=new Set;n.lineup=n.lineup.map(d=>!a(d)||i.has(d)?null:(i.add(d),d)),n.subs=n.subs.filter(d=>a(d)&&!i.has(d));const l=He(e,t.id).filter(d=>dr(d)&&!i.has(d.id)&&!n.subs.includes(d.id));if(n.lineup=n.lineup.map((d,c)=>{if(d!=null)return d;const h=r[c].pos;let g=null,m=-1e9;for(const x of l){if(i.has(x.id))continue;const C=xo(x,h);C>m&&(m=C,g=x)}if(!g){const x=n.subs.map(C=>e.players[C]).sort((C,b)=>xo(b,h)-xo(C,h))[0];return x?(n.subs=n.subs.filter(C=>C!==x.id),i.add(x.id),x.id):null}return i.add(g.id),g.id}),n.subs.length<9){const d=He(e,t.id).filter(c=>dr(c)&&!i.has(c.id)&&!n.subs.includes(c.id)).sort((c,h)=>h.ability-c.ability);for(const c of d){if(n.subs.length>=9)break;n.subs.push(c.id)}}(n.captain==null||!i.has(n.captain))&&(n.captain=Jd(e,n.lineup))}function Jd(e,t){var a;let n=null,r=-1;for(const i of t){if(i==null)continue;const l=e.players[i],d=l.ability+l.age*.6+((a=l.traits)!=null&&a.includes("leader")?15:0);d>r&&(r=d,n=i)}return n}function p2(e,t){const n=He(e,t.id),r=g=>n.filter(m=>m.ability>0&&g(m)).length,a=r(g=>g.positions.some(m=>m==="AMR"||m==="AML")),i=r(g=>g.positions.some(m=>m==="MR"||m==="ML")),l=r(g=>g.positions.includes("ST")),d=r(g=>g.positions.includes("AMC")),c=r(g=>g.positions.some(m=>m==="WBR"||m==="WBL")),h=r(g=>g.positions.includes("DC"));return c>=3&&h>=5?l>=3?"3-5-2":"3-4-3":a>=4&&d>=2?"4-2-3-1":a>=4?"4-3-3":i>=3&&l>=4?"4-4-2":d>=2&&l>=3?"4-1-2-1-2":"4-2-3-1"}function m2(e){return Math.round(Math.pow(e.reputation/100,4)*4e6)}function hx(e){for(const t of Object.values(e.clubs)){let n=0;for(const a of He(e,t.id))n+=a.wage;const r=m2(t);t.finances.balance+=r-n,t.finances.seasonIncome.commercial+=r,t.finances.seasonExpense.wages+=n,t.id!==e.manager.clubId&&t.finances.balance<-2e7&&(t.finances.transferBudget=0)}}function px(e){for(const t of e.leagues)for(const n of t.clubIds){const r=e.clubs[n],a=Math.round(t.tvMoney/10);r.finances.balance+=a,r.finances.seasonIncome.tv+=a}}function mx(e,t){const n=e.clubIds.length;return Rt(e.tvMoney*.45*((n-t+1)/n))}function g2(e){for(const t of Object.values(e.clubs)){const n=t.finances,r=za(e,t),i=e.leagues.find(l=>l.id===t.leagueId).tvMoney+m2(t)*52+t.capacity*19*(12+t.reputation*.55);n.transferBudget=Rt(Math.max(5e5,Math.max(0,n.balance)*.4+i*.12)),n.wageBudget=Rt(Math.max(r*1.05,i*.62/52)),n.seasonIncome={gate:0,tv:0,commercial:0,transfers:0,prize:0},n.seasonExpense={wages:0,transfers:0,other:0}}}const gx=1,yx=new Set(["GK","DR","DC","DL","WBR","WBL","DM","MR","MC","ML","AMR","AMC","AML","ST"]),vx=24;function y2(){return{apps:0,subApps:0,goals:0,assists:0,ratingSum:0,rated:0,yellows:0,reds:0,motm:0,cleanSheets:0}}function xx(){return{formation:"4-4-2",lineup:[],subs:[],mentality:"balanced",passing:"mixed",pressing:"normal",tempo:"normal",captain:null,penaltyTaker:null,freeKickTaker:null}}function Cx(e,t,n){let r=0;return t<=17?r=14:t<=19?r=10:t<=21?r=6:t<=23?r=3:t<=25&&(r=1),r+=n.int(-2,3),Math.min(96,Math.max(e,e+r))}function Hd(e){const t=e.split("|").map(C=>C.trim());if(t.length<5)throw new Error("expected Name|Pos|Age|Nat|Ability");const[n,r,a,i,l,d]=t,c=r.split("/").map(C=>C.trim().toUpperCase());for(const C of c)if(!yx.has(C))throw new Error(`unknown position "${C}"`);const h=parseInt(a,10);if(!(h>=14&&h<=45))throw new Error("age must be 14-45");const[g,m]=l.split("/").map(C=>parseInt(C,10));if(!(g>=1&&g<=100))throw new Error("ability must be 1-100");if(m!=null&&!(m>=1&&m<=100))throw new Error("potential must be 1-100");const x=d?d.split(",").map(C=>C.trim()).filter(C=>$d[C]):void 0;return{name:n,positions:c,age:h,nat:i.toUpperCase(),ability:g,potential:m,traits:x}}function dp(e){const t=[];for(const n of e.leagues)for(const r of n.clubs)for(const a of r.players.split(`
`)){const i=a.trim();if(i)try{Hd(i)}catch(l){t.push({line:`${r.name}: ${i}`,error:l.message})}}return t}function Mx(e){const t=e.split(" ");if(t.length===1)return e;const n=new Set(["van","de","der","den","da","di","dos","do","le","la","von","el","al","Van","De","Di","Da","El","Al","Mac"]);let r=t.length-1;for(;r>1&&n.has(t[r-1]);)r--;return t.slice(r).join(" ")}const bx=new Set(["Kim","Lee","Hwang","Paik","Jeong","Bae","Son","Park"]);function Ax(e,t){return e<=21?t.int(2,5):e<=28?t.int(1,5):e<=31?t.int(1,3):t.int(1,2)}function v2(e,t,n,r,a){const i=e.nextId.player++,l=n.name.split(" ")[0],d=n.short??(bx.has(l)&&n.nat==="KOR"?l:Mx(n.name)),c={id:i,name:n.name,short:d,nat:n.nat,age:n.age,positions:n.positions,foot:t.chance(.22)?"L":t.chance(.05)?"B":"R",seed:V7(n.name)^i*2654435761,traits:n.traits,ability:n.ability,potential:n.potential??Cx(n.ability,n.age,t),clubId:r,squadNo:0,value:0,wage:0,contractEnd:e.season+Ax(n.age,t),morale:13,condition:100,sharpness:60,injury:null,suspended:0,form:[],stats:y2(),career:[],transferListed:!1,joined:`${e.season-t.int(0,4)}-07-01`};return c.value=i2(c,e.season),c.wage=Ka(c,a),c}const Sx=[["GK"],["DC"],["DC"],["DR"],["DL"],["DM"],["MC"],["MC"],["AMR"],["AML"],["AMC"],["ST"],["ST"]];function Vd(e,t,n){const r=cp[n.country]??cp.ENG,a=t.weighted(r,([,c])=>c)[0],{name:i,short:l}=ax(t,a),d=n.positions??t.pick(Sx);return v2(e,t,{name:i,short:l,positions:d,age:n.age,nat:a,ability:Math.round(n.ability),potential:n.potential},n.clubId,n.clubRep)}function kx(e,t,n,r){const a=t.money*1e6;return{id:r,name:t.name,short:t.short,leagueId:n.id,reputation:t.rep,stadium:t.stadium,capacity:t.capacity,colors:t.colors,finances:{balance:a,transferBudget:Math.round(Math.max(1e6,a*.6+t.rep*t.rep*2e3)/1e5)*1e5,wageBudget:0,seasonIncome:{gate:0,tv:0,commercial:0,transfers:0,prize:0},seasonExpense:{wages:0,transfers:0,other:0}},tactics:xx(),training:"balanced",boardConfidence:70,youthRating:Math.max(5,Math.min(20,Math.round(t.rep/5+e.rngState%3))),facilities:Math.max(5,Math.min(20,Math.round(t.rep/5)))}}function Rx(e){const t=[],n=c=>e.filter(c).length,r=n(c=>c.positions[0]==="GK");for(let c=r;c<3;c++)t.push("GK");const a=n(c=>c.positions.includes("DC"));for(let c=a;c<4;c++)t.push("DC");n(c=>c.positions.some(h=>h==="DR"||h==="WBR"))<2&&t.push("DR"),n(c=>c.positions.some(h=>h==="DL"||h==="WBL"))<2&&t.push("DL");const i=n(c=>c.positions.some(h=>h==="MC"||h==="DM"));for(let c=i;c<5;c++)t.push(c%2?"DM":"MC");const l=n(c=>c.positions.some(h=>["AMR","AML","MR","ML"].includes(h)));for(let c=l;c<4;c++)t.push(c%2?"AMR":"AML");const d=n(c=>c.positions.includes("ST"));for(let c=d;c<3;c++)t.push("ST");return t}function Ex(e,t){const n=t.seed??Date.now()&2147483647,r=new Kd(n),a={version:gx,saveName:t.saveName??`${t.managerName} - ${t.clubName}`,date:`${e.season}-07-01`,season:e.season,rngState:n,nextId:{player:1,fixture:1,news:1,offer:1},manager:{name:t.managerName,nat:t.managerNat,clubId:-1,seasons:0,wins:0,draws:0,losses:0,trophies:[]},leagues:[],clubs:{},players:{},fixtures:[],news:[],offers:[],shortlist:[],history:[],pendingMatch:null};let i=1;for(const d of e.leagues){const c={id:d.id,name:d.name,short:d.short,country:d.country,tier:d.tier,clubIds:[],promoteTo:d.promoteTo,relegateTo:d.relegateTo,promotedAuto:d.promotedAuto,playoffs:d.playoffs,relegated:d.relegated,tvMoney:d.tv*1e6,europe:d.europe};a.leagues.push(c);for(const h of d.clubs){const g=kx(a,h,c,i++);a.clubs[g.id]=g,c.clubIds.push(g.id);const m=[];for(const b of h.players.split(`
`)){const R=b.trim();if(!R)continue;let E;try{E=Hd(R)}catch{continue}const M=v2(a,r,E,g.id,g.reputation);a.players[M.id]=M,m.push(M)}const x=m.length?m.reduce((b,R)=>b+R.ability,0)/m.length:g.reputation*.8,C=Rx(m);for(;m.length<vx||C.length;){const b=C.shift(),R=r.chance(.5),E=R?r.int(17,20):r.int(21,31),M=R?x-r.int(10,18):x-r.int(5,12),A=Vd(a,r,{clubId:g.id,country:c.country,ability:Math.max(40,M),age:E,positions:b?[b]:void 0,clubRep:g.reputation});if(R&&(A.youth=!0),a.players[A.id]=A,m.push(A),m.length>40)break}yl(m)}}Wr(a);for(const d of Object.values(a.clubs)){let c=0;for(const g of Object.values(a.players))g.clubId===d.id&&(c+=g.wage);d.finances.wageBudget=Math.round(c*1.1/1e3)*1e3,d.tactics.formation=p2(a,d);const h=gl(a,d);d.tactics.lineup=h.lineup,d.tactics.subs=h.subs,d.tactics.captain=Jd(a,h.lineup)}g2(a);const l=Object.values(a.clubs).find(d=>d.name===t.clubName)??Object.values(a.clubs)[0];return a.manager.clubId=l.id,c2(a,r),a.rngState=r.state,a}function yl(e){const t=new Set,n=[...e].sort((a,i)=>i.ability-a.ability),r={GK:[1,13,12,31,40],DR:[2,12,22,24],DL:[3,23,15,26],WBR:[2,22],WBL:[3,26],DC:[4,5,6,15,16,32,33],DM:[6,5,16,18],MC:[8,6,16,18,20,24],MR:[7,17,19],ML:[11,17,21],AMC:[10,8,14,20],AMR:[7,17,19,27],AML:[11,21,27,29],ST:[9,19,14,18,29]};for(const a of n){if(a.squadNo&&!t.has(a.squadNo)){t.add(a.squadNo);continue}let l=(r[a.positions[0]]??[]).find(d=>!t.has(d));if(l==null)for(l=2;t.has(l);)l++;t.add(l),a.squadNo=l}}const Dx=(e,t,n)=>e.pick(t)(n),Re={kickoff:[e=>`${e.ref} gets us under way at ${e.stadium}.`,e=>`We're off! ${e.home} kick off against ${e.away}.`,e=>`The whistle goes and ${e.home} v ${e.away} is under way.`],build:[e=>`${e.p} picks up the ball in midfield and looks for options.`,e=>`${e.team} are knocking it about patiently at the back.`,e=>`${e.p} drives forward with the ball.`,e=>`${e.p} switches the play out to the flank.`,e=>`Neat passing from ${e.team} as they try to build an attack.`,e=>`${e.p} plays a one-two and tries to break the lines.`,e=>`${e.team} win the ball back and look to counter.`,e=>`Long ball forward from ${e.p}.`],open:[e=>`${e.a} slides the ball through to ${e.p}...`,e=>`${e.p} finds a yard of space on the edge of the box...`,e=>`Lovely move! ${e.a} cuts it back for ${e.p}...`,e=>`${e.p} beats his man and cuts inside...`,e=>`${e.a} whips in a low cross towards ${e.p}...`],long:[e=>`${e.p} decides to try his luck from distance...`,e=>`${e.p} shapes to shoot from 25 yards...`,e=>`The ball falls to ${e.p} well outside the area...`],header:[e=>`${e.a} swings in a cross and ${e.p} rises highest...`,e=>`Great delivery from ${e.a}, ${e.p} attacks the ball...`,e=>`${e.p} gets his head to ${e.a}'s cross...`],oneOnOne:[e=>`${e.a} splits the defence! ${e.p} is clean through on goal...`,e=>`${e.p} races clear, just the keeper to beat...`,e=>`A defensive mix-up and ${e.p} is in on goal...`],close:[e=>`Scramble in the six-yard box! The ball drops to ${e.p}...`,e=>`${e.a}'s shot is parried and ${e.p} is first to the rebound...`],goal:[e=>`GOAL! ${e.p} slots it home! ${e.score}`,e=>`GOAL! ${e.p} fires it into the bottom corner! ${e.score}`,e=>`GOAL! What a finish from ${e.p}! ${e.score}`,e=>`GOAL! ${e.p} makes no mistake! ${e.score}`,e=>`GOAL! It's in! ${e.p} scores for ${e.team}! ${e.score}`],goalLong:[e=>`GOAL! An absolute screamer from ${e.p}! ${e.score}`,e=>`GOAL! ${e.p} has found the top corner from distance! ${e.score}`],goalHeader:[e=>`GOAL! ${e.p} powers the header past the keeper! ${e.score}`,e=>`GOAL! A bullet header from ${e.p}! ${e.score}`],save:[e=>`...but ${e.gk} gets down well to save.`,e=>`...superb stop from ${e.gk}!`,e=>`...${e.gk} is equal to it and holds on.`,e=>`...${e.gk} tips it round the post!`],miss:[()=>"...but it flies wide of the post.",()=>"...and it sails over the bar.",e=>`...${e.p} snatches at it and it goes wide.`,()=>"...but the effort is blocked by a defender.",()=>"...it's cleared off the line!"],woodwork:[e=>`...and ${e.p} hits the post!`,()=>"...it crashes off the crossbar!"],bigMiss:[e=>`...how has ${e.p} missed that?! He really should have scored.`,e=>`...${e.p} puts it wide! What a chance wasted.`],foul:[e=>`${e.p} brings down ${e.v}. Free kick.`,e=>`Foul by ${e.p} on ${e.v}.`,e=>`${e.p} goes in late on ${e.v} and the referee blows up.`],yellow:[e=>`${e.p} is shown a yellow card.`,e=>`The referee books ${e.p}.`],secondYellow:[e=>`Second yellow for ${e.p}! He's off! ${e.team} are down to ${e.n} men.`],red:[e=>`RED CARD! ${e.p} is sent off for a terrible challenge! ${e.team} down to ${e.n} men.`],penaltyAward:[e=>`PENALTY! ${e.v} is brought down in the box by ${e.p}!`,e=>`The referee points to the spot! Handball against ${e.p}.`],penTake:[e=>`${e.p} steps up to take it...`],freeKick:[e=>`Free kick in a dangerous position. ${e.p} stands over it...`],corner:[e=>`Corner to ${e.team}.`,e=>`${e.team} win a corner.`],offside:[e=>`${e.p} is caught offside.`,e=>`The flag goes up against ${e.p}.`],injury:[e=>`${e.p} is down injured and needs treatment.`,e=>`${e.p} pulls up clutching his hamstring. That doesn't look good.`],sub:[e=>`Substitution for ${e.team}: ${e.on} replaces ${e.off}.`],halftime:[e=>`Half time: ${e.score}.`],fulltime:[e=>`FULL TIME: ${e.score}.`],tactic:[e=>`${e.team} change their approach: ${e.m}.`],chanceBroken:[e=>`${e.d} reads it well and intercepts.`,e=>`Great tackle by ${e.d} to snuff out the danger.`,e=>`${e.d} heads the ball clear.`,e=>`${e.d} does well to block.`]},We=(e,t,n)=>Dx(e,t,n),Nx={GK:[0,0,0],DC:[1,.05,0],DR:[.75,.2,.1],DL:[.75,.2,.1],WBR:[.5,.35,.25],WBL:[.5,.35,.25],DM:[.5,.55,.05],MC:[.2,.7,.2],MR:[.15,.5,.4],ML:[.15,.5,.4],AMC:[.02,.45,.65],AMR:[.02,.3,.8],AML:[.02,.3,.8],ST:[0,.08,1]},wx={def:4.3,mid:3.4,att:3.1},fp={defensive:{att:.88,def:1.08,freq:.8},cautious:{att:.94,def:1.04,freq:.9},balanced:{att:1,def:1,freq:1},attacking:{att:1.06,def:.95,freq:1.1},"all-out":{att:1.12,def:.88,freq:1.22}},hp={GK:0,DC:.35,DR:.35,DL:.35,WBR:.6,WBL:.6,DM:.5,MC:1.3,MR:1.5,ML:1.5,AMC:2.8,AMR:2.8,AML:2.8,ST:5};class jx{constructor(t,n,r,a){et(this,"w");et(this,"fx");et(this,"rng");et(this,"opts");et(this,"sides");et(this,"minute",0);et(this,"period",1);et(this,"added",0);et(this,"finished",!1);et(this,"events",[]);et(this,"zone",50);et(this,"pens",null);et(this,"aet",!1);et(this,"strengthCache",null);this.w=t,this.fx=n,this.rng=r,this.opts=a,this.sides=[this.makeSide(n.home),this.makeSide(n.away)],this.added=this.rng.int(0,3),this.push(-1,"kickoff",We(r,Re.kickoff,{ref:"The referee",stadium:this.w.clubs[n.home].stadium,home:this.sides[0].name,away:this.sides[1].name}))}makeSide(t){const n=this.w.clubs[t],r=t===this.opts.userClubId;Fc(this.w,n);const a=n.tactics,i=Ut[a.formation]??Ut["4-4-2"],l=[];a.lineup.forEach((c,h)=>{c!=null&&h<i.length&&l.push({id:c,pos:i[h].pos,slot:h})});const d={clubId:t,name:n.name,short:n.short,colors:n.colors,onPitch:l,bench:a.subs.filter(c=>this.w.players[c]&&dr(this.w.players[c])).slice(0,9),appeared:l.map(c=>c.id),subsMade:0,mentality:a.mentality,passing:a.passing,pressing:a.pressing,tempo:a.tempo,goals:0,shots:0,onTarget:0,corners:0,fouls:0,offsides:0,xg:0,possTicks:0,yellows:{},reds:[],injured:[],ratings:{},goalsBy:{},assistsBy:{},savesBy:{},entered:{},left:{},cond:{},isUser:r,autoSubs:!r||!this.opts.commentary,formation:a.formation,penaltyTaker:a.penaltyTaker,freeKickTaker:a.freeKickTaker};for(const c of l)d.ratings[c.id]=6.6,d.entered[c.id]=0,d.cond[c.id]=this.w.players[c.id].condition;return d}p(t){return this.w.players[t]}push(t,n,r,a={}){!this.opts.commentary&&!a.important&&n!=="goal"&&n!=="red"&&n!=="injury"&&n!=="sub"||this.events.push({minute:this.displayMinute(),side:t,type:n,text:r,zone:this.zone,...a})}displayMinute(){return this.minute}scoreText(){return`${this.sides[0].short} ${this.sides[0].goals}-${this.sides[1].goals} ${this.sides[1].short}`}strength(t){return this.strengthCache||(this.strengthCache=[this.calcStrength(0),this.calcStrength(1)]),this.strengthCache[t]}invalidate(){this.strengthCache=null}calcStrength(t){const n=this.sides[t];let r=30;const a={def:0,mid:0,att:0},i={def:0,mid:0,att:0};for(const C of n.onPitch){const b=this.p(C.id);let R=Qt(b,C.pos)*vo(n.cond[C.id]??100);if(R*=.96+b.morale/20*.06,R*=.94+b.sharpness/100*.06,C.pos==="GK"){r=R;continue}const[E,M,A]=Nx[C.pos];a.def+=R*E,i.def+=E,a.mid+=R*M,i.mid+=M,a.att+=R*A,i.att+=A}const l=C=>i[C]>0?a[C]/i[C]*Math.pow(i[C]/wx[C],.3):20,d=fp[n.mentality];let c=l("def")*d.def,h=l("mid"),g=l("att")*d.att;n.pressing==="high"?(h*=1.03,c*=.99):n.pressing==="low"&&(h*=.97,c*=1.02);const m=this.w.clubs[n.clubId].training;m==="attacking"&&(g*=1.015),m==="defending"&&(c*=1.015),n.passing==="short"&&(h*=1.02),n.passing==="direct"&&(h*=.98,g*=1.02);const x=n.onPitch.length;if(x<11){const C=1-(11-x)*.06;c*=C,h*=C,g*=C}return t===0&&!this.opts.neutral&&(c*=1.045,h*=1.04,g*=1.045),{gk:r,def:c,mid:h,att:g}}periodEnd(){return[0,45,90,105,120][this.period]}step(){if(this.finished)return[];const t=this.events.length;this.minute++;const n=this.periodEnd();return this.minute>n+this.added?(this.endPeriod(),this.events.slice(t)):(this.tick(),this.events.slice(t))}endPeriod(){const[t,n]=this.sides;if(this.period===1){this.push(-1,"halftime",We(this.rng,Re.halftime,{score:this.scoreText()}),{important:!0}),this.period=2,this.minute=45,this.added=this.rng.int(2,6),this.halfTimeRecovery();return}if(this.period===2){if(this.opts.knockout&&t.goals===n.goals){this.push(-1,"period",`End of normal time: ${this.scoreText()}. We go to extra time.`,{important:!0}),this.period=3,this.minute=90,this.added=this.rng.int(0,2),this.aet=!0;return}this.finish();return}if(this.period===3){this.push(-1,"period",`Half time in extra time: ${this.scoreText()}.`),this.period=4,this.minute=105,this.added=this.rng.int(0,2);return}this.period===4&&(t.goals===n.goals&&this.penaltyShootout(),this.finish())}halfTimeRecovery(){for(const t of this.sides)for(const n of t.onPitch)t.cond[n.id]=Math.min(100,(t.cond[n.id]??100)+3);this.invalidate()}finish(){this.finished=!0;const[t,n]=this.sides;let r=We(this.rng,Re.fulltime,{score:this.scoreText()});this.pens?r+=` ${this.pens[0]>this.pens[1]?t.name:n.name} win ${Math.max(...this.pens)}-${Math.min(...this.pens)} on penalties.`:this.aet&&(r+=" (after extra time)"),this.push(-1,"fulltime",r,{important:!0}),this.finaliseRatings()}tick(){const[t,n]=[this.strength(0),this.strength(1)],r=Math.pow(t.mid,3),a=Math.pow(n.mid,3);let i=r/(r+a);this.sides[0].passing==="short"&&(i+=.02),this.sides[1].passing==="short"&&(i-=.02),this.sides[0].passing==="direct"&&(i-=.015),this.sides[1].passing==="direct"&&(i+=.015);const l=this.rng.chance(i)?0:1,d=l===0?1:0;this.sides[l].possTicks++,this.fatigue();const c=this.sides[l],h=l===0?t:n,g=l===0?n:t,m=h.att/Math.max(1,g.def);let x=.235*Math.pow(m,2.2)*fp[c.mentality].freq;c.tempo==="fast"&&(x*=1.08),c.tempo==="slow"&&(x*=.9),c.passing==="direct"&&(x*=1.08),c.passing==="short"&&(x*=.95),x=Math.max(.03,Math.min(.55,x));const C=l===0?65+this.rng.next()*25:35-this.rng.next()*25;this.zone=this.zone+(C-this.zone)*.5;const b=this.rng.next();if(b<x)this.attack(l,d,m);else if(b<x+.12)this.foul(d,l);else if(this.opts.commentary&&b<x+.3){const R=this.randomOutfield(l);R&&this.push(l,"build",We(this.rng,Re.build,{p:this.p(R).short,team:c.name}))}for(const R of[0,1])for(const E of this.sides[R].onPitch)if(this.rng.chance(12e-5)){this.injure(R,E.id);break}if(this.minute%5===0||this.minute>85)for(const R of[0,1])this.manage(R)}fatigue(){for(const t of this.sides){let n=1;t.pressing==="high"&&(n*=1.15),t.pressing==="low"&&(n*=.9),t.tempo==="fast"&&(n*=1.08),t.tempo==="slow"&&(n*=.93);for(const r of t.onPitch){const a=Ze(this.p(r.id)),i=a[ye("Stamina")],l=a[ye("Natural Fitness")],d=(.2+(20-i)*.014+(20-l)*.004)*(r.pos==="GK"?.35:n);t.cond[r.id]=Math.max(15,(t.cond[r.id]??100)-d)}}this.minute%3===0&&this.invalidate()}randomOutfield(t){const n=this.sides[t].onPitch.filter(r=>r.pos!=="GK");return n.length?this.rng.pick(n).id:null}gk(t){const n=this.sides[t].onPitch.find(r=>r.pos==="GK");return n?this.p(n.id):null}rate(t,n,r){const a=this.sides[t];a.ratings[n]==null&&(a.ratings[n]=6.6),a.ratings[n]+=r}attack(t,n,r){const a=this.sides[t],i=this.sides[n],l=a.onPitch.filter(C=>C.pos!=="GK");if(!l.length)return;if(this.rng.chance(.18)){const C=i.onPitch.filter(b=>["DC","DR","DL","WBR","WBL","DM"].includes(b.pos));if(C.length){const b=this.rng.weighted(C,R=>Ze(this.p(R.id))[ye("Tackling")]+Ze(this.p(R.id))[ye("Positioning")]);this.rate(n,b.id,.07),this.opts.commentary&&this.push(n,"defence",We(this.rng,Re.chanceBroken,{d:this.p(b.id).short}))}return}if(this.rng.chance(.07)){const C=l.filter(R=>["ST","AMR","AML","AMC"].includes(R.pos)),b=C.length?this.rng.pick(C):this.rng.pick(l);a.offsides++,this.opts.commentary&&this.push(t,"offside",We(this.rng,Re.offside,{p:this.p(b.id).short}));return}if(this.rng.chance(.028)){const C=this.randomOutfield(n),b=this.rng.weighted(l,R=>hp[R.pos]);this.push(t,"penalty",We(this.rng,Re.penaltyAward,{p:C?this.p(C).short:"a defender",v:this.p(b.id).short}),{important:!0}),C&&this.rng.chance(.2)&&this.card(n,C,!1),this.penaltyKick(t,n);return}const d=this.rng.weighted([["open",55],["long",20],["header",14],["oneOnOne",6],["close",5]],([,C])=>C)[0],c=this.pickShooter(t,d),h=l.filter(C=>C.id!==c.id),g=h.length?this.rng.weighted(h,C=>{const b=Ze(this.p(C.id));return(d==="header"?b[ye("Crossing")]*2:b[ye("Passing")]+b[ye("Creativity")])*(C.pos==="GK"?0:1)}):null;let x={open:.1,long:.035,header:.1,oneOnOne:.36,close:.42}[d]*Math.max(.6,Math.min(1.5,Math.pow(r,.8)));a.passing==="short"&&(x*=1.05),a.passing==="direct"&&(x*=.93),this.shoot(t,n,c.id,(g==null?void 0:g.id)??null,d,x)}pickShooter(t,n){const r=this.sides[t].onPitch.filter(a=>a.pos!=="GK");return this.rng.weighted(r,a=>{const i=Ze(this.p(a.id));let l=hp[a.pos];return n==="header"?l=l*.5+(i[ye("Heading")]+i[ye("Jumping")])/10+(a.pos==="DC"?1.2:0):n==="long"?l=l*.6+i[ye("Long Shots")]/6:l*=(i[ye("Finishing")]+i[ye("Off the Ball")])/24,l})}shoot(t,n,r,a,i,l){const d=this.sides[t],c=this.p(r),h=Ze(c),g=this.gk(n),m=g?Ze(g):null,x=c.short,C=a?this.p(a).short:"a team-mate";if(this.zone=t===0?92:8,this.opts.commentary){const z=i==="long"?Re.long:i==="header"?Re.header:i==="oneOnOne"?Re.oneOnOne:i==="close"?Re.close:Re.open;this.push(t,"chance",We(this.rng,z,{p:x,a:C}))}d.shots++,d.xg+=l;const R=((i==="header"?h[ye("Heading")]:i==="long"?h[ye("Long Shots")]:h[ye("Finishing")])*2+h[ye("Composure")]+h[ye("Technique")])/4;let E=6;m&&(E=i==="oneOnOne"?(m[ye("One on Ones")]*2+m[ye("Reflexes")]+m[ye("Rushing Out")])/4:i==="header"?(m[ye("Aerial Ability")]+m[ye("Reflexes")]*2+m[ye("Command of Area")])/4:(m[ye("Reflexes")]*2+m[ye("Handling")]+m[ye("Positioning")])/4);const M=vo(d.cond[r]??100),A=Math.max(.5,Math.min(1.65,1+(R*M-E)*.045)),D=Math.min(.9,l*A),_=Math.min(.95,.3+R*.017+l*.4);if(this.rng.chance(D)){this.scoreGoal(t,r,a,i);return}if(this.rng.chance(_/(1-D+1e-4)*.75)){if(d.onTarget++,this.rate(t,r,.08),g){const z=this.sides[n];z.savesBy[g.id]=(z.savesBy[g.id]??0)+1,this.rate(n,g.id,l>.25?.45:.22)}this.opts.commentary&&this.push(n,"save",We(this.rng,Re.save,{gk:(g==null?void 0:g.short)??"the keeper"})),this.rng.chance(.3)&&this.corner(t,n);return}this.rate(t,r,l>.3?-.3:-.04),this.rng.chance(.04)?this.opts.commentary&&this.push(t,"woodwork",We(this.rng,Re.woodwork,{p:x})):this.opts.commentary&&this.push(t,"miss",We(this.rng,l>.3?Re.bigMiss:Re.miss,{p:x})),this.rng.chance(.18)&&this.corner(t,n)}corner(t,n){const r=this.sides[t];if(r.corners++,this.opts.commentary&&this.push(t,"corner",We(this.rng,Re.corner,{team:r.name})),this.rng.chance(.28)){const a=this.setPieceTaker(t,"Corners"),i=this.pickShooter(t,"header");if(i.id===a)return;this.shoot(t,n,i.id,a,"header",.07)}}setPieceTaker(t,n){const r=this.sides[t],a=n==="Penalty Taking"?r.penaltyTaker:n==="Free Kicks"?r.freeKickTaker:null;if(a!=null&&r.onPitch.some(d=>d.id===a))return a;let i=r.onPitch[0].id,l=-1;for(const d of r.onPitch){if(d.pos==="GK")continue;const c=Ze(this.p(d.id))[ye(n)];c>l&&(l=c,i=d.id)}return i}penaltyKick(t,n){const r=this.sides[t],a=this.setPieceTaker(t,"Penalty Taking"),i=Ze(this.p(a)),l=this.gk(n),d=l?Ze(l):null;this.opts.commentary&&this.push(t,"chance",We(this.rng,Re.penTake,{p:this.p(a).short})),r.shots++,r.xg+=.78;const c=Math.max(.55,Math.min(.92,.76+(i[ye("Penalty Taking")]+i[ye("Composure")]-26)*.012-(((d==null?void 0:d[ye("Reflexes")])??10)-13)*.008));this.rng.chance(c)?this.scoreGoal(t,a,null,"pen"):this.rng.chance(.6)&&l?(r.onTarget++,this.rate(n,l.id,.8),this.rate(t,a,-.6),this.push(n,"save",`...SAVED! ${l.short} guesses right and keeps it out!`,{important:!0})):(this.rate(t,a,-.6),this.push(t,"miss","...and he's put it wide! Penalty missed!",{important:!0}))}scoreGoal(t,n,r,a){const i=this.sides[t],l=t===0?1:0,d=this.sides[l];i.goals++,i.onTarget++,i.goalsBy[n]=(i.goalsBy[n]??0)+1,this.rate(t,n,1.1),r!=null&&a!=="pen"&&(i.assistsBy[r]=(i.assistsBy[r]??0)+1,this.rate(t,r,.6));const c=this.gk(l);c&&this.rate(l,c.id,-.35);for(const m of d.onPitch)["DC","DR","DL","WBR","WBL"].includes(m.pos)&&this.rate(l,m.id,-.12);const h=a==="long"?Re.goalLong:a==="header"?Re.goalHeader:Re.goal,g=We(this.rng,h,{p:this.p(n).short,score:this.scoreText(),team:i.name})+(a==="pen"?" (pen)":"");this.push(t,"goal",g,{playerId:n,important:!0}),this.fx.goals.push({minute:this.minute,side:t,playerId:n,assistId:r??void 0,pen:a==="pen"||void 0}),this.zone=50;for(const m of i.onPitch)i.cond[m.id]=Math.min(100,(i.cond[m.id]??100)+.5)}foul(t,n){const r=this.sides[t],a=r.onPitch.filter(c=>c.pos!=="GK");if(!a.length)return;const i=this.rng.weighted(a,c=>Ze(this.p(c.id))[ye("Aggression")]+4),l=this.randomOutfield(n);r.fouls++,this.rate(t,i.id,-.03),this.opts.commentary&&this.push(t,"foul",We(this.rng,Re.foul,{p:this.p(i.id).short,v:l?this.p(l).short:"his man"}));const d=Ze(this.p(i.id))[ye("Aggression")];if(this.rng.chance(.004+d*2e-4)?this.card(t,i.id,!0):this.rng.chance(.1+d*.004)&&this.card(t,i.id,!1),this.rng.chance(.09)){const c=this.setPieceTaker(n,"Free Kicks");this.opts.commentary&&this.push(n,"chance",We(this.rng,Re.freeKick,{p:this.p(c).short}));const h=Ze(this.p(c))[ye("Free Kicks")];this.shoot(n,t,c,null,"long",.04+h*.002)}}card(t,n,r){const a=this.sides[t];if(!a.onPitch.some(l=>l.id===n))return;const i=this.p(n).short;if(r){a.reds.push(n),this.rate(t,n,-1.5),this.sendOff(t,n),this.push(t,"red",We(this.rng,Re.red,{p:i,team:a.name,n:String(a.onPitch.length)}),{playerId:n,important:!0});return}a.yellows[n]=(a.yellows[n]??0)+1,this.rate(t,n,-.3),a.yellows[n]>=2?(a.reds.push(n),this.rate(t,n,-1),this.sendOff(t,n),this.push(t,"red",We(this.rng,Re.secondYellow,{p:i,team:a.name,n:String(a.onPitch.length)}),{playerId:n,important:!0})):this.push(t,"yellow",We(this.rng,Re.yellow,{p:i}),{playerId:n})}sendOff(t,n){var i;const r=this.sides[t],a=((i=r.onPitch.find(l=>l.id===n))==null?void 0:i.pos)==="GK";if(r.onPitch=r.onPitch.filter(l=>l.id!==n),r.left[n]=this.minute,a){const l=r.bench.find(d=>this.p(d).positions[0]==="GK");if(l!=null&&r.subsMade<5){const d=[...r.onPitch].filter(c=>c.pos!=="GK").sort((c,h)=>this.p(c.id).ability-this.p(h.id).ability)[0];d&&this.substitute(t,d.id,l,"GK")}else r.onPitch.length&&(r.onPitch[r.onPitch.length-1].pos="GK")}this.invalidate()}injure(t,n){const r=this.sides[t];if(r.injured.includes(n))return;r.injured.push(n),this.push(t,"injury",We(this.rng,Re.injury,{p:this.p(n).short}),{playerId:n,important:!0}),r.cond[n]=Math.min(r.cond[n]??100,35),this.invalidate();const a=r.onPitch.find(i=>i.id===n);if(a){const i=this.bestBenchFor(t,a.pos);i!=null&&r.subsMade<5&&this.substitute(t,n,i,a.pos)}}bestBenchFor(t,n){const r=this.sides[t];let a=null,i=-1e9;for(const l of r.bench){const d=this.p(l);if(n!=="GK"&&d.positions[0]==="GK"||n==="GK"&&d.positions[0]!=="GK")continue;const c=Qt(d,n);c>i&&(i=c,a=l)}return a}substitute(t,n,r,a){const i=this.sides[t];if(i.subsMade>=5||this.finished)return!1;const l=i.onPitch.findIndex(c=>c.id===n);if(l<0||!i.bench.includes(r))return!1;const d=i.onPitch[l];return i.onPitch[l]={id:r,pos:a??d.pos,slot:d.slot},i.bench=i.bench.filter(c=>c!==r),i.subsMade++,i.left[n]=this.minute,i.entered[r]=this.minute,i.appeared.push(r),i.ratings[r]=6.6,i.cond[r]=this.p(r).condition,this.invalidate(),this.push(t,"sub",We(this.rng,Re.sub,{team:i.name,on:this.p(r).short,off:this.p(n).short}),{important:i.isUser}),!0}setMentality(t,n){const r=this.sides[t];r.mentality!==n&&(r.mentality=n,this.invalidate(),this.push(t,"tactic",We(this.rng,Re.tactic,{team:r.name,m:`${n} mentality`})))}setInstruction(t,n,r){const a=this.sides[t];a[n]=r,this.invalidate()}swapPositions(t,n,r){const a=this.sides[t],i=a.onPitch.find(d=>d.id===n),l=a.onPitch.find(d=>d.id===r);!i||!l||([i.pos,l.pos]=[l.pos,i.pos],[i.slot,l.slot]=[l.slot,i.slot],this.invalidate())}manage(t){const n=this.sides[t];if(!n.autoSubs)return;const r=this.sides[t===0?1:0],a=n.goals-r.goals;if(this.minute>=70&&a<0&&n.mentality!=="attacking"&&n.mentality!=="all-out"?this.setMentality(t,"attacking"):this.minute>=83&&a<0&&n.mentality!=="all-out"?this.setMentality(t,"all-out"):this.minute>=80&&a===1&&(n.mentality==="balanced"||n.mentality==="attacking")&&this.setMentality(t,"cautious"),this.minute<55||n.subsMade>=5||!n.bench.length)return;const l=n.onPitch.filter(c=>c.pos!=="GK").map(c=>({o:c,cond:n.cond[c.id]??100,rating:n.ratings[c.id]??6.6})).sort((c,h)=>c.cond+c.rating*4-(h.cond+h.rating*4))[0];if(!l)return;const d=this.minute>=60&&this.minute<=85?.35:.1;if((l.cond<72||l.rating<6.2)&&this.rng.chance(d)){let c=l.o.pos;a<0&&this.minute>70&&["DC","DM","DR","DL"].includes(c)&&(c=c==="DC"?"ST":"AMC");const h=this.bestBenchFor(t,c);if(h!=null){const g=Qt(this.p(h),c),m=Qt(this.p(l.o.id),l.o.pos)*vo(l.cond);g>=m*.92&&this.substitute(t,l.o.id,h,c)}}}penaltyShootout(){this.period=5,this.push(-1,"period","It's all square after extra time. We go to penalties!",{important:!0});const t=c=>[...this.sides[c].onPitch].filter(h=>h.pos!=="GK").map(h=>h.id).sort((h,g)=>Ze(this.p(g))[ye("Penalty Taking")]-Ze(this.p(h))[ye("Penalty Taking")]).concat(this.sides[c].onPitch.filter(h=>h.pos==="GK").map(h=>h.id)),n=[t(0),t(1)],r=[0,0],a=[0,0];let i=0;const l=c=>{const h=n[c],g=h[a[c]%Math.max(1,h.length)];a[c]++;const m=Ze(this.p(g)),x=this.gk(c===0?1:0),C=x?Ze(x):null,b=Math.max(.5,Math.min(.92,.75+(m[ye("Penalty Taking")]+m[ye("Composure")]-26)*.012-(((C==null?void 0:C[ye("Reflexes")])??10)-13)*.008)),R=this.rng.chance(b);R&&r[c]++,this.push(c,R?"goal":"save",`${this.sides[c].short}: ${this.p(g).short} ${R?"scores":"misses"}. (${r[0]}-${r[1]})`,{important:!0})},d=()=>{const c=Math.max(0,5-a[0]),h=Math.max(0,5-a[1]);return r[0]>r[1]+h||r[1]>r[0]+c};for(i=0;i<5&&!d()&&(l(0),!d());i++)l(1);for(;r[0]===r[1];)if(l(0),l(1),a[0]>30){r[0]++;break}this.pens=r}finaliseRatings(){const[t,n]=this.sides,r=t.goals>n.goals?0:t.goals<n.goals?1:-1;for(const a of[0,1]){const i=this.sides[a],l=this.sides[a===0?1:0];for(const d of i.appeared){let c=i.ratings[d]??6.6;const h=this.p(d),g=(i.left[d]??this.minute)-(i.entered[d]??0);r===a?c+=.3:r!==-1&&(c-=.25),l.goals===0&&g>=60&&["GK","DC","DR","DL","WBR","WBL"].includes(h.positions[0])&&(c+=.45),c+=this.rng.gauss()*.22+(h.ability-75)*.006,g<20&&(c=6.4+(c-6.6)*.5),i.ratings[d]=Math.round(Math.max(3,Math.min(10,c))*10)/10}}}simulateToEnd(){let t=0;for(;!this.finished&&t++<400;)this.step()}motm(){let t=null,n=-1;for(const r of[0,1])for(const[a,i]of Object.entries(this.sides[r].ratings))i>n&&(n=i,t={id:+a,side:r});return t}possession(){const t=this.sides[0].possTicks+this.sides[1].possTicks||1,n=Math.round(this.sides[0].possTicks/t*100);return[n,100-n]}}function we(e,t){const n={id:e.nextId.news++,...t,date:t.date??e.date,read:t.read??!1};return e.news.unshift(n),e.news.length>250&&(e.news.length=250),n}const Tx=[["Bruised Ankle",2,7,18],["Dead Leg",2,6,14],["Tight Hamstring",4,10,12],["Calf Strain",7,21,10],["Twisted Knee",7,20,8],["Hamstring Strain",14,35,10],["Groin Strain",10,28,7],["Sprained Ankle",10,30,7],["Concussion",7,14,3],["Thigh Strain",14,30,5],["Broken Foot",45,90,2],["Knee Ligament Damage",60,150,2],["Torn Cruciate Ligament",180,280,1],["Broken Leg",120,200,1]];function x2(e){const[t,n,r]=e.weighted(Tx,a=>a[3]);return{name:t,days:e.int(n,r)}}function C2(e,t,n,r){return new jx(e,t,n,{commentary:r,userClubId:e.manager.clubId,knockout:t.compType==="playoff",neutral:t.neutral})}function M2(e,t,n,r){const[a,i]=n.sides;t.played=!0,t.hg=a.goals,t.ag=i.goals,n.pens&&(t.pens=n.pens),n.aet&&(t.aet=!0);const l=e.clubs[t.home],d=Math.round(Math.min(l.capacity,l.capacity*(.72+l.reputation/400+r.next()*.08)));t.attendance=d;for(const g of[t.home,t.away])for(const m of He(e,g))m.suspended>0&&!n.sides[g===t.home?0:1].appeared.includes(m.id)&&m.suspended--;const c=n.motm(),h=t.compType==="league";for(const g of[0,1]){const m=n.sides[g],x=n.sides[g===0?1:0],C=m.goals>x.goals||n.pens!=null&&n.pens[g]>n.pens[g===0?1:0],b=m.goals<x.goals||n.pens!=null&&n.pens[g]<n.pens[g===0?1:0],R=new Set(m.appeared);for(const E of m.appeared){const M=e.players[E];if(!M)continue;const A=(m.entered[E]??0)===0,D=Math.max(0,(m.left[E]??n.minute)-(m.entered[E]??0));if(h){A?M.stats.apps++:M.stats.subApps++,M.stats.goals+=m.goalsBy[E]??0,M.stats.assists+=m.assistsBy[E]??0;const z=m.ratings[E]??6.6;M.stats.ratingSum+=z,M.stats.rated++,c&&c.id===E&&M.stats.motm++,x.goals===0&&D>=60&&["GK","DC","DR","DL","WBR","WBL"].includes(M.positions[0])&&M.stats.cleanSheets++;const X=m.yellows[E]??0;X&&(M.stats.yellows+=Math.min(1,X),!m.reds.includes(E)&&(M.stats.yellows===5||M.stats.yellows===10)&&(M.suspended+=M.stats.yellows===5?1:2,m.isUser&&we(e,{kind:"info",title:`${M.name} suspended`,body:`${M.name} has picked up ${M.stats.yellows} yellow cards and will serve a ${M.stats.yellows===5?"one":"two"}-match ban.`,playerId:M.id})))}if(M.form.push(m.ratings[E]??6.6),M.form.length>5&&M.form.shift(),m.reds.includes(E)){h&&M.stats.reds++;const z=(m.yellows[E]??0)<2;M.suspended+=z?3:1,m.isUser&&we(e,{kind:"info",title:`${M.name} suspended`,body:`${M.name} will miss the next ${z?"three matches":"match"} after his red card.`,playerId:M.id})}const _=m.cond[E]??M.condition;M.condition=Math.max(20,Math.round(_-6-r.next()*4)),M.sharpness=Math.min(100,M.sharpness+D/90*14),M.morale=pp(M.morale+(C?1.2:b?-1.2:.2)+((m.ratings[E]??6.6)-6.8)*.5)}for(const E of m.injured){const M=e.players[E];if(!M)continue;const A=x2(r);M.injury=A,m.isUser&&we(e,{kind:"injury",title:`${M.name} injured`,body:`${M.name} picked up a ${A.name.toLowerCase()} and is expected to be out for ${qd(A.days)}.`,playerId:M.id})}for(const E of He(e,m.clubId))R.has(E.id)||(E.morale=pp(E.morale+(C?.3:b?-.3:0)-(E.ability>75&&Lx(E)?.15:0)));if(g===0&&!t.neutral){const E=12+l.reputation*.55,M=Math.round(d*E);l.finances.balance+=M,l.finances.seasonIncome.gate+=M}if(m.clubId===e.manager.clubId){C?e.manager.wins++:b?e.manager.losses++:e.manager.draws++;const E=e.clubs[m.clubId],M=e.clubs[x.clubId],A=(E.reputation-M.reputation)/20+(g===0?.2:-.2),D=C?1:b?-1:0;E.boardConfidence=Math.max(0,Math.min(100,E.boardConfidence+(D-Math.tanh(A)*.6)*2.2))}}}function Lx(e){return!e.injury&&e.suspended<=0}function pp(e){return Math.max(1,Math.min(20,e))}function qd(e){if(e<=6)return`${e} day${e===1?"":"s"}`;const t=Math.round(e/7);return t<9?`${t} week${t===1?"":"s"}`:`${Math.round(e/30)} months`}function b2(e,t,n){const r=C2(e,t,n,!1);return r.simulateToEnd(),M2(e,t,r,n),r}function Px(e){return e<=18?.3:e<=21?.26:e<=23?.19:e<=25?.12:e<=27?.06:0}function Fx(e){return e<=29?0:e===30?.4:e===31?1:e===32?1.6:e===33?2.2:e===34?2.8:3.5}const Gx={balanced:1,attacking:1,defending:1,technical:1.05,physical:.95,rest:.7};function Bx(e,t){for(const n of Object.values(e.players)){const r=n.clubId!=null?e.clubs[n.clubId]:null,a=r?Gx[r.training]:.6,i=r?.85+r.facilities/66:.7,l=n.stats.apps+n.stats.subApps*.4,d=.6+Math.min(.6,l/25),c=Math.max(0,n.potential-n.ability),h=Ze(n)[ye("Natural Fitness")];let g=Px(n.age)*c*a*i*d/44;g-=Fx(n.age)*(1.15-h/40)/44,g+=t.gauss()*.06,n.injury&&n.injury.days>30&&(g-=.02),n.ability=Math.max(20,Math.min(99,n.ability+g)),n.ability>n.potential&&(n.potential=Math.min(99,n.ability))}}function Ix(e){for(const t of Object.values(e.players))t.value=i2(t,e.season)}function Ox(e,t){const n=e.manager.clubId;for(const r of Object.values(e.players)){if(r.injury){r.injury.days--,r.injury.days<=0&&(r.clubId===n&&we(e,{kind:"injury",title:`${r.name} fit again`,body:`${r.name} has recovered from his ${r.injury.name.toLowerCase()} and is available for selection.`,playerId:r.id,read:!0}),r.injury=null,r.condition=Math.min(r.condition,80),r.sharpness=Math.min(r.sharpness,50));continue}if(r.condition<100){const a=Ze(r)[ye("Natural Fitness")],i=r.clubId!=null?e.clubs[r.clubId]:null,l=(i==null?void 0:i.training)==="rest"?3:(i==null?void 0:i.training)==="physical"?-1:0;r.condition=Math.min(100,r.condition+5+a*.3+l)}if(r.sharpness=Math.max(20,r.sharpness-.8),r.morale+=(13-r.morale)*.01,r.clubId!=null&&t.chance(25e-5)){const a=x2(t);a.days=Math.min(a.days,21),r.injury=a,r.clubId===n&&we(e,{kind:"injury",title:`${r.name} injured in training`,body:`${r.name} suffered a ${a.name.toLowerCase()} in training and will be out for ${qd(a.days)}.`,playerId:r.id})}}}function Fa(e,t="ability"){const n=t==="ability"?e.ability:e.potential;return Math.max(.5,Math.min(5,Math.round((n-40)/10*2)/2))}const _x=.8;function Ga(e){return e.clubs[e.manager.clubId]}function Kx(e,t){return t.clubId===e.manager.clubId?"He already plays for you.":!pr(e.date)&&t.clubId!=null?"The transfer window is closed.":e.offers.some(n=>n.playerId===t.id&&n.userBuying&&(n.status==="pending"||n.status==="accepted"||n.status==="countered"))?"You already have an active offer for this player.":t.retiring?"He is retiring at the end of the season.":null}function mp(e,t,n){const r={id:e.nextId.offer++,playerId:t.id,fromClub:t.clubId,toClub:e.manager.clubId,fee:Rt(n),status:t.clubId==null?"accepted":"pending",date:e.date,respondBy:Ln(e.date,1),userBuying:!0};return e.offers.push(r),r}function zx(e,t,n){const r=e.players[t.playerId];if(!r||r.clubId!==t.fromClub){t.status="collapsed";return}const a=e.clubs[t.fromClub],i=Ud(e,r),l=e.clubs[t.toClub],d=a.reputation>l.reputation+10?1.15:1,c=i*d*(.95+n.next()*.1);t.fee>=c?(t.status="accepted",we(e,{kind:"transfer",title:`Bid accepted for ${r.name}`,body:`${a.name} have accepted your offer of ${oe(t.fee)} for ${r.name}. You now need to agree personal terms with the player.`,offerId:t.id,playerId:r.id})):t.fee>=c*.75?(t.status="countered",t.counterFee=Rt(c*1.02),we(e,{kind:"transfer",title:`Counter-offer for ${r.name}`,body:`${a.name} have rejected your bid of ${oe(t.fee)} for ${r.name} but would accept ${oe(t.counterFee)}.`,offerId:t.id,playerId:r.id})):(t.status="rejected",we(e,{kind:"transfer",title:`Bid rejected for ${r.name}`,body:`${a.name} have rejected your offer of ${oe(t.fee)} for ${r.name}. They value him at considerably more.`,offerId:t.id,playerId:r.id}))}function A2(e){e.status!=="countered"||e.counterFee==null||(e.fee=e.counterFee,e.status="accepted")}function S2(e,t,n){const r=t.clubId!=null?e.clubs[t.clubId]:null;let a=Ka(t,n.reputation);if(r&&r.id!==n.id&&(a=Math.max(a,t.wage*1.1),n.reputation<r.reputation-12&&t.ability>70))return{wage:a,years:0,interested:!1,reason:`${t.short} is not interested in moving to a club of ${n.name}'s stature.`};n.id===t.clubId&&(a=Math.max(t.wage,a)*(t.morale>=14?1:t.morale>=9?1.1:1.25));const i=t.age>=33?1:t.age>=30?2:t.age<=21?5:4;return{wage:Rt(a),years:i,interested:!0}}function k2(e,t,n,r,a){const i=S2(e,t,n);return i.interested?za(e,n)-(t.clubId===n.id?t.wage:0)+r>n.finances.wageBudget?{ok:!1,msg:`The board will not sanction this - it would take you over your wage budget of ${oe(n.finances.wageBudget)} p/w.`}:a>5?{ok:!1,msg:"Contracts are limited to five years."}:t.age>=33&&a>2?{ok:!1,msg:`${t.short} wants no more than a ${i.years}-year deal at his age... but he'd accept up to two.`}:r<i.wage*.93?{ok:!1,msg:`${t.short} wants around ${oe(i.wage)} a week.`}:{ok:!0,msg:`${t.short} has agreed terms!`}:{ok:!1,msg:i.reason}}function R2(e,t,n,r){const a=e.players[t.playerId],i=e.clubs[t.toClub];if(!pr(e.date)&&a.clubId!=null)return{ok:!1,msg:"The transfer window is closed."};if(i.finances.transferBudget<t.fee)return{ok:!1,msg:`You only have ${oe(i.finances.transferBudget)} available for transfers.`};const l=k2(e,a,i,n,r);if(!l.ok)return l;const d=a.clubId!=null?e.clubs[a.clubId]:null;return vl(e,a,d,i,t.fee,n,r),t.status="completed",we(e,{kind:"transfer",title:`${a.name} signs`,body:`${a.name} has joined ${i.name}${d?` from ${d.name} for ${oe(t.fee)}`:" on a free transfer"}. He has signed a ${r}-year contract worth ${oe(n)} a week.`,playerId:a.id}),{ok:!0,msg:`${a.name} has signed for ${i.name}!`}}function vl(e,t,n,r,a,i,l){n&&(n.finances.balance+=a,n.finances.seasonIncome.transfers+=a,n.finances.transferBudget+=Math.round(a*(n.id===e.manager.clubId?_x:.6)),n.tactics.lineup=n.tactics.lineup.map(d=>d===t.id?null:d),n.tactics.subs=n.tactics.subs.filter(d=>d!==t.id)),r.finances.balance-=a,r.finances.transferBudget=Math.max(0,r.finances.transferBudget-a),r.finances.seasonExpense.transfers+=a,e.manager.clubId!==r.id&&(r.finances.wageBudget=Math.max(r.finances.wageBudget,za(e,r)+i)),t.wage=i,t.contractEnd=e.season+l,t.morale=Math.min(20,t.morale+3),t.squadNo=0,t.loanListed=!1,Vo(e,t,r.id),e.shortlist=e.shortlist.filter(d=>d!==t.id),yl(He(e,r.id));for(const d of e.offers)d.playerId===t.id&&(d.status==="pending"||d.status==="accepted"||d.status==="countered")&&(d.status="collapsed")}function E2(e,t){const n=e.players[t.playerId],r=e.clubs[t.toClub];if(!n||n.clubId!==e.manager.clubId)return"This offer is no longer valid.";if(!pr(e.date))return"The transfer window has closed.";const a=Math.max(n.wage,Ka(n,r.reputation));return vl(e,n,Ga(e),r,t.fee,a,n.age>=30?2:4),t.status="completed",we(e,{kind:"transfer",title:`${n.name} sold`,body:`${n.name} has completed his move to ${r.name} for ${oe(t.fee)}.`,playerId:n.id}),`${n.name} has joined ${r.name} for ${oe(t.fee)}.`}function $x(e){e.status="rejected"}function Ux(e,t,n,r){const a=e.players[t.playerId],i=e.clubs[t.toClub],l=a.value*(1.25+r.next()*.35)*(i.reputation>85?1.2:1);return n<=l&&n<=i.finances.transferBudget*1.2?(t.fee=Rt(n),E2(e,t)):(t.status="rejected",we(e,{kind:"transfer",title:`${i.name} walk away`,body:`${i.name} have decided not to meet your valuation of ${oe(n)} for ${a.name}.`,playerId:a.id}),`${i.name} are not prepared to pay ${oe(n)}.`)}function Wx(e,t){const n=Ga(e),r=Math.max(0,(t.contractEnd-e.season)*52-Math.floor(dn(e.date,`${e.season}-07-01`)/7)),a=Rt(t.wage*r*.5);return n.finances.balance-=a,n.finances.seasonExpense.other+=a,n.tactics.lineup=n.tactics.lineup.map(i=>i===t.id?null:i),n.tactics.subs=n.tactics.subs.filter(i=>i!==t.id),Vo(e,t,null),t.transferListed=!1,we(e,{kind:"contract",title:`${t.name} released`,body:`${t.name} has been released. His contract was paid off for ${oe(a)}.`,playerId:t.id}),`${t.name} released (${oe(a)} pay-off).`}function Jx(e,t,n,r){const a=Ga(e),i=k2(e,t,a,n,r);return i.ok?(t.wage=Rt(n),t.contractEnd=e.season+r,t.morale=Math.min(20,t.morale+2),we(e,{kind:"contract",title:`${t.name} signs new deal`,body:`${t.name} has signed a new contract until June ${t.contractEnd}.`,playerId:t.id}),{ok:!0,msg:`${t.short} has signed a new ${r}-year contract.`}):i}function Hx(e,t){for(const n of e.offers)n.userBuying&&n.status==="pending"&&dn(e.date,n.respondBy)>=0&&zx(e,n,t),!n.userBuying&&n.status==="pending"&&dn(e.date,n.respondBy)>0&&(n.status="withdrawn"),n.userBuying&&(n.status==="accepted"||n.status==="countered")&&dn(e.date,n.date)>14&&(n.status="collapsed");e.offers.length>200&&(e.offers=e.offers.filter(n=>["pending","accepted","countered"].includes(n.status)||dn(e.date,n.date)<60))}function Vx(e,t,n){var c;const r=He(e,t.id),a=Ft(n),i=r.filter(h=>Ft(h.positions[0])===a).sort((h,g)=>g.ability-h.ability),l=a==="GK"?2:a==="CB"?4:3,d=((c=i[0])==null?void 0:c.ability)??40;return(l-i.length)*5+(t.reputation*.9-d)}function qx(e,t){if(!pr(e.date))return;const n=Object.values(e.clubs).filter(i=>i.id!==e.manager.clubId),a=e.date.endsWith("-08-31")||e.date.endsWith("-09-01")||e.date.endsWith("-02-01")||e.date.endsWith("-02-02")?8:3;for(let i=0;i<a;i++){const l=t.pick(n);if(l.finances.transferBudget<5e5||He(e,l.id).length>=32)continue;const c=t.pick(["GK","DC","DR","DL","DM","MC","AMC","AMR","AML","ST"]);if(Vx(e,l,c)<0&&t.chance(.7))continue;const h=Math.max(55,l.reputation*.88-4),g=l.reputation*.98+4,m=Object.values(e.players).filter(M=>M.clubId===l.id||M.retiring||Ft(M.positions[0])!==Ft(c)||M.ability<h||M.ability>g||M.clubId===e.manager.clubId||M.clubId!=null&&(e.clubs[M.clubId].reputation>l.reputation+3&&!M.transferListed||dn(e.date,M.joined)<150)?!1:M.age<=31);if(!m.length)continue;const x=t.weighted(m,M=>(M.clubId==null?3:1)*(M.transferListed?3:1)*Math.max(1,M.potential-60)),C=x.clubId==null?0:Ud(e,x);if(C>l.finances.transferBudget)continue;const b=x.clubId!=null?e.clubs[x.clubId]:null;if(b&&He(e,b.id).length<=20)continue;const R=Ka(x,l.reputation);vl(e,x,b,l,C,R,x.age>=30?2:t.int(3,5)),(x.ability>=80||b&&b.leagueId===Ga(e).leagueId||l.leagueId===Ga(e).leagueId)&&we(e,{kind:"transfer",title:`${x.name} joins ${l.name}`,body:b?`${l.name} have signed ${x.name} from ${b.name} for ${oe(C)}.`:`${l.name} have signed free agent ${x.name}.`,playerId:x.id,read:!0})}}function Yx(e,t){if(!pr(e.date))return;const n=Ga(e),r=He(e,n.id);if(!t.chance(r.some(h=>h.transferListed)?.12:.04))return;const a=t.weighted(r,h=>(h.transferListed?6:1)*Math.max(1,h.ability-55)*(dn(e.date,h.joined)<150?.1:1));if(!a||e.offers.some(h=>h.playerId===a.id&&h.status==="pending"))return;const i=Object.values(e.clubs).filter(h=>h.id!==n.id&&h.reputation>=a.ability-8&&h.reputation<=a.ability+20&&h.finances.transferBudget>a.value*.8);if(!i.length)return;const l=t.pick(i),d=Rt(a.value*(a.transferListed?.8:.95)*(.9+t.next()*.35)),c={id:e.nextId.offer++,playerId:a.id,fromClub:n.id,toClub:l.id,fee:d,status:"pending",date:e.date,respondBy:Ln(e.date,7),userBuying:!1};e.offers.push(c),we(e,{kind:"offer",title:`Offer for ${a.name}`,body:`${l.name} have made an offer of ${oe(d)} for ${a.name}. The offer will be withdrawn in 7 days.`,offerId:c.id,playerId:a.id})}function gp(e,t){for(const n of Object.values(e.clubs)){if(n.id===e.manager.clubId)continue;He(e,n.id).sort((a,i)=>i.ability-a.ability).forEach((a,i)=>{if(a.contractEnd>e.season+1)return;i<20&&a.age<=32&&t.chance(.75)&&(a.contractEnd=e.season+1+(a.age>=30?1:t.int(2,4)),a.wage=Math.max(a.wage,Ka(a,n.reputation)))})}}function D2(e,t){const n=f2(e).filter(r=>!r.retiring);if(n.length)for(const r of Object.values(e.clubs)){if(r.id===e.manager.clubId)continue;const a=He(e,r.id);if(a.length>=22)continue;const i=22-a.length;for(let l=0;l<i;l++){const d=n.filter(h=>h.clubId==null&&h.ability<=r.reputation+2&&h.ability>=r.reputation*.7);if(!d.length)break;const c=t.weighted(d,h=>h.ability-40);vl(e,c,null,r,0,Ka(c,r.reputation),t.int(1,3))}}}function $a(e,t){const n=e.leagues.find(l=>l.id===t);if(!n)return[];const r=new Map;for(const l of n.clubIds)r.set(l,{clubId:l,p:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0,form:[]});const a=e.fixtures.filter(l=>l.comp===t&&l.compType==="league"&&l.played);for(const l of a){const d=r.get(l.home),c=r.get(l.away);!d||!c||(d.p++,c.p++,d.gf+=l.hg,d.ga+=l.ag,c.gf+=l.ag,c.ga+=l.hg,l.hg>l.ag?(d.w++,c.l++,d.pts+=3,d.form.push("W"),c.form.push("L")):l.hg<l.ag?(c.w++,d.l++,c.pts+=3,d.form.push("L"),c.form.push("W")):(d.d++,c.d++,d.pts++,c.pts++,d.form.push("D"),c.form.push("D")))}const i=[...r.values()];for(const l of i)l.gd=l.gf-l.ga,l.form=l.form.slice(-5);return i.sort((l,d)=>d.pts-l.pts||d.gd-l.gd||d.gf-l.gf||e.clubs[l.clubId].name.localeCompare(e.clubs[d.clubId].name)),i}function Yd(e,t){if(!e.played)return null;const n=e.home===t?e.hg:e.ag,r=e.home===t?e.ag:e.hg;if(n===r){if(e.pens){const a=e.home===t?e.pens[0]:e.pens[1],i=e.home===t?e.pens[1]:e.pens[0];return a>i?"W":"L"}return"D"}return n>r?"W":"L"}function Qd(e){const t=e.clubs[e.manager.clubId],n=e.leagues.find(c=>c.id===t.leagueId),a=[...n.clubIds].sort((c,h)=>e.clubs[h].reputation-e.clubs[c].reputation).indexOf(t.id)+1,i=n.clubIds.length;let l,d;n.tier===1?a<=2?[l,d]=[1,"Win the league title"]:a<=4?[l,d]=[4,"Qualify for the Champions League"]:a<=7?[l,d]=[n.europe+1,"Qualify for Europe"]:a<=Math.ceil(i/2)?[l,d]=[Math.ceil(i/2),"Finish in the top half"]:a<=i-5?[l,d]=[i-4,"A comfortable mid-table finish"]:[l,d]=[i-(n.relegated??3),"Avoid relegation"]:a<=3?[l,d]=[2,"Win automatic promotion"]:a<=8?[l,d]=[6,"Reach the play-offs"]:a<=16?[l,d]=[12,"A mid-table finish"]:[l,d]=[i-3,"Avoid a relegation battle"],e.manager.target={pos:l,text:d}}function Zd(e){return e>=85?"Delighted":e>=70?"Very pleased":e>=55?"Pleased":e>=40?"Satisfied":e>=25?"Concerned":e>=12?"Very concerned":"Losing patience"}function N2(e,t){const n=e.clubs[e.manager.clubId];if(e.manager.sacked)return!0;const r=+e.date.slice(5,7),a=r>=7&&r<=10;return n.boardConfidence<8&&!a?(w2(e,t),!0):!1}function w2(e,t){const n=e.clubs[e.manager.clubId];e.manager.sacked=!0;const r=Object.values(e.clubs).filter(a=>a.id!==n.id&&a.reputation<=n.reputation-5&&a.reputation>=n.reputation-30);t.shuffle(r),e.manager.jobOffers=r.slice(0,3).map(a=>a.id),we(e,{kind:"board",title:"You have been sacked",body:`The ${n.name} board have lost faith in your ability to take the club forward and have terminated your contract with immediate effect.`})}function Qx(e,t){e.manager.clubId=t,e.manager.sacked=!1,e.manager.jobOffers=void 0;const n=e.clubs[t];n.boardConfidence=65,Qd(e),we(e,{kind:"board",title:`Welcome to ${n.name}`,body:`You have been appointed manager of ${n.name}. The board expect you to: ${e.manager.target.text.toLowerCase()}.`})}function Zx(e,t){for(const n of Object.values(e.clubs)){const r=e.leagues.find(l=>l.id===n.leagueId),a=t.int(2,4),i=[];for(let l=0;l<a;l++){const d=t.chance(.03+n.youthRating*.002),c=36+n.youthRating*1.1+t.int(-6,6)+(d?8:0),h=Math.min(95,c+t.int(8,28)+(d?t.int(10,20):0)),g=Vd(e,t,{clubId:n.id,country:r.country,ability:c,potential:h,age:t.int(15,17),clubRep:n.reputation});g.youth=!0,g.wage=Math.max(500,Math.round(g.wage*.2/100)*100),g.contractEnd=e.season+3,g.joined=e.date,e.players[g.id]=g,i.push(`${g.name} (${g.positions[0]}, ${g.age})${g.potential>=80?" - highly rated":""}`)}Wr(e),yl(He(e,n.id)),n.id===e.manager.clubId&&we(e,{kind:"youth",title:"Youth intake",body:`This year's crop of youngsters has arrived from the academy:

${i.join(`
`)}`})}}function Xx(e,t){const n=$a(e,t.id),r=t.promotedAuto??2,[a,i,l,d]=[n[r],n[r+1],n[r+2],n[r+3]].map(m=>m.clubId),c=Ln(e.date,7),h=(m,x,C,b)=>({id:e.nextId.fixture++,date:c,comp:`${t.id}-po`,compType:"playoff",round:C,home:m,away:x,played:!1,hg:0,ag:0,goals:[],label:b});e.fixtures.push(h(a,d,1,"Play-off Semi-final"),h(i,l,1,"Play-off Semi-final"));const g=m=>e.clubs[m].name;we(e,{kind:"season",title:`${t.name} play-offs`,body:`The ${t.name} play-off semi-finals will be played on ${c}: ${g(a)} v ${g(d)} and ${g(i)} v ${g(l)}. The final will be played at Wembley.`,read:![a,i,l,d].includes(e.manager.clubId)})}function j2(e){return e.hg!==e.ag?e.hg>e.ag?e.home:e.away:e.pens?e.pens[0]>e.pens[1]?e.home:e.away:e.home}function eC(e,t){const n=e.fixtures.filter(i=>i.comp===`${t.id}-po`&&i.round===1);if(n.length!==2||n.some(i=>!i.played))return;const[r,a]=n.map(j2);e.fixtures.push({id:e.nextId.fixture++,date:Ln(e.date,14),comp:`${t.id}-po`,compType:"playoff",round:2,home:r,away:a,played:!1,hg:0,ag:0,goals:[],neutral:!0,label:"Play-off Final"})}function Gc(e,t){const n=e.fixtures.find(r=>r.comp===`${t.id}-po`&&r.round===2&&r.played);return n?j2(n):null}function tC(e,t){const n={season:e.season,champions:{},userLeague:e.clubs[e.manager.clubId].leagueId,userPos:0,userClub:e.manager.clubId,promoted:[],relegated:[],topScorers:{}},r=[];for(const h of e.leagues){const g=$a(e,h.id);if(!g.length)continue;n.champions[h.id]=g[0].clubId,g.forEach((b,R)=>{const E=e.clubs[b.clubId],M=mx(h,R+1);E.finances.balance+=M,E.finances.seasonIncome.prize+=M;const A=[...h.clubIds].sort((D,_)=>e.clubs[_].reputation-e.clubs[D].reputation).indexOf(b.clubId);E.reputation=Math.max(30,Math.min(99,E.reputation+(A-R)*.25))});const m=Object.values(e.players).filter(b=>{var R;return b.clubId!=null&&((R=e.clubs[b.clubId])==null?void 0:R.leagueId)===h.id}).sort((b,R)=>R.stats.goals-b.stats.goals);m[0]&&(n.topScorers[h.id]={playerId:m[0].id,name:m[0].name,goals:m[0].stats.goals});const x=g.findIndex(b=>b.clubId===e.manager.clubId);if(x>=0&&(n.userPos=x+1),h.relegateTo&&h.relegated)for(const b of g.slice(-h.relegated))r.push({clubId:b.clubId,to:h.relegateTo}),n.relegated.push(b.clubId);if(h.promoteTo){const b=h.promotedAuto??2;for(const R of g.slice(0,b))r.push({clubId:R.clubId,to:h.promoteTo}),n.promoted.push(R.clubId);if(h.playoffs){const R=Gc(e,h)??g[b].clubId;r.push({clubId:R,to:h.promoteTo}),n.promoted.push(R)}}const C=e.clubs[g[0].clubId];we(e,{kind:"season",title:`${C.name} are ${h.name} champions`,body:`${C.name} have won the ${Xt(e.season)} ${h.name} with ${g[0].pts} points.${m[0]?` ${m[0].name} finished as top scorer with ${m[0].stats.goals} goals.`:""}`,read:h.id!==n.userLeague}),g[0].clubId===e.manager.clubId&&e.manager.trophies.push(`${h.name} ${Xt(e.season)}`)}const a=e.leagues.find(h=>h.playoffs);a&&Gc(e,a)===e.manager.clubId&&e.manager.trophies.push(`${a.name} Play-off winners ${Xt(e.season)}`);const i=e.clubs[e.manager.clubId],l=e.manager.target,d=n.promoted.includes(i.id),c=n.relegated.includes(i.id);if(l&&n.userPos){const h=l.pos-n.userPos;i.boardConfidence=Math.max(0,Math.min(100,i.boardConfidence+h*5+(d?20:0)-(c?30:0)));const g=h>=3||d?"The board are delighted with your work this season.":h>=0?"The board are satisfied that you met their expectations.":h>=-3?"The board are disappointed that you fell short of their expectations.":"The board are extremely unhappy with this season.";we(e,{kind:"board",title:"End of season review",body:`${i.name} finished ${nC(n.userPos)} in the ${e.leagues.find(m=>m.id===i.leagueId).name}. The target was: ${l.text.toLowerCase()}.

${g}${d?`

Congratulations on promotion!`:""}${c?`

The club has been relegated.`:""}`})}for(const h of Object.values(e.players)){const g=h.stats.apps+h.stats.subApps;!g&&h.clubId==null||(h.career.push({season:e.season,clubId:h.clubId,clubName:h.clubId!=null?e.clubs[h.clubId].name:"Free agent",apps:g,goals:h.stats.goals,avg:h.stats.rated?Math.round(h.stats.ratingSum/h.stats.rated*100)/100:0}),h.career.length>20&&h.career.shift())}for(const h of r){const g=e.clubs[h.clubId],m=e.leagues.find(C=>C.id===g.leagueId),x=e.leagues.find(C=>C.id===h.to);m.clubIds=m.clubIds.filter(C=>C!==g.id),x.clubIds.push(g.id),g.leagueId=x.id,g.reputation=x.tier<m.tier?Math.max(g.reputation,66):Math.min(g.reputation,70)}for(const h of Object.values(e.players))(h.age>=38||h.age>=35&&t.chance(.45)||h.age>=33&&h.ability<62&&t.chance(.5)||h.age>=31&&h.clubId==null&&t.chance(.4))&&(h.retiring=!0);e.history.push(n),!d&&i.boardConfidence<15&&w2(e,t),e.seasonOver=!0}function nC(e){const t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}function rC(e,t){const n=e.season+1,r=e.manager.clubId,a=[],i=[];for(const c of Object.values(e.players)){if(c.retiring){c.clubId===r&&a.push(c.name),delete e.players[c.id];continue}if(c.clubId!=null&&c.contractEnd<=n){c.clubId===r&&i.push(c.name);const h=e.clubs[c.clubId];h.tactics.lineup=h.tactics.lineup.map(g=>g===c.id?null:g),h.tactics.subs=h.tactics.subs.filter(g=>g!==c.id),Vo(e,c,null),c.contractEnd=n}c.age++,c.stats=y2(),c.form=[],c.suspended=0,c.condition=100,c.sharpness=55,c.morale=(c.morale+13)/2,c.age<=23&&(c.potential=Math.max(c.ability,Math.min(97,c.potential+t.int(-3,3))))}Wr(e);for(const c of Object.values(e.clubs)){if(c.id===r)continue;const h=He(e,c.id).sort((g,m)=>m.ability-g.ability);for(const g of h.slice(30))Vo(e,g,null)}for(const c of f2(e))(c.age>=32||c.ability<52)&&delete e.players[c.id];Wr(e),e.season++,e.seasonOver=!1,e.fixtures=[],e.offers=[],e.manager.seasons++,D2(e,t);for(const c of Object.values(e.clubs))aC(e,c,t);g2(e);for(const c of Object.values(e.clubs))if(c.id!==r){c.tactics.formation=p2(e,c);const h=gl(e,c);c.tactics.lineup=h.lineup,c.tactics.subs=h.subs,c.tactics.captain=Jd(e,h.lineup)}c2(e,t),Qd(e);const l=e.clubs[r];l.boardConfidence=Math.max(40,Math.min(90,l.boardConfidence*.6+30));let d=`Welcome to the ${Xt(e.season)} season. The board expect you to: ${e.manager.target.text.toLowerCase()}.

Transfer budget: ${oe(l.finances.transferBudget)}
Wage budget: ${oe(l.finances.wageBudget)} p/w`;a.length&&(d+=`

Retired: ${a.join(", ")}`),i.length&&(d+=`

Left on expiring contracts: ${i.join(", ")}`),we(e,{kind:"season",title:`Season ${Xt(e.season)}`,body:d})}function aC(e,t,n){const r=He(e,t.id),a=e.leagues.find(h=>h.id===t.leagueId),i=r.filter(h=>h.positions[0]==="GK").length,l=[];let d=r.length,c=Math.max(0,2-i);for(;d<20||c>0;){const h=Vd(e,n,{clubId:t.id,country:a.country,ability:t.reputation*.78-n.int(0,8),age:n.int(18,28),positions:c>0?["GK"]:void 0,clubRep:t.reputation});c>0&&c--,e.players[h.id]=h,l.push(h),d++}l.length&&(Wr(e),yl(He(e,t.id)))}function iC(e,t){let n=null;for(const r of e.fixtures)r.comp===t&&(!n||ot(r.date)>ot(n))&&(n=r.date);return n}function is(e){return new Kd(e.rngState)}function ss(e,t){e.rngState=t.state}function sC(e){return e.fixtures.find(t=>t.date===e.date&&!t.played&&(t.home===e.manager.clubId||t.away===e.manager.clubId))}function T2(e){return e.fixtures.find(t=>!t.played&&(t.home===e.manager.clubId||t.away===e.manager.clubId)&&dn(t.date,e.date)>=0)}function yp(e,t){const n=e.clubs[t];if(t===e.manager.clubId)return;const r=gl(e,n);n.tactics.lineup=r.lineup,n.tactics.subs=r.subs}function oC(e,t){const n=e.fixtures.filter(r=>r.date===e.date&&!r.played);for(const r of n)r.home===e.manager.clubId||r.away===e.manager.clubId||(yp(e,r.home),yp(e,r.away),b2(e,r,t))}function lC(e){if(e.pendingMatch!=null)return;const t=is(e);e.date=Ln(e.date,1);const n=e.date,r=n.slice(5);if(Ox(e,t),Hx(e,t),qx(e,t),Yx(e,t),o2(n)===1&&(Bx(e,t),hx(e)),n.endsWith("-01")){Ix(e);const i=Pc(n);(i>=8||i<=5)&&px(e)}r==="01-02"&&(gp(e,t),uC(e)),r==="04-01"&&gp(e,t),r==="03-15"&&Zx(e,t),(r==="09-02"||r==="02-03")&&(D2(e,t),we(e,{kind:"transfer",title:"Transfer window closed",body:"The transfer window has now closed. Free agents can still be signed.",read:!0})),r==="07-01"&&e.seasonOver&&rC(e,t),r==="01-01"&&we(e,{kind:"transfer",title:"Transfer window open",body:"The January transfer window is now open until 2 February."});for(const i of e.leagues){if(!i.playoffs)continue;const l=iC(e,i.id),d=e.fixtures.some(m=>m.comp===`${i.id}-po`);l&&dn(n,l)===1&&!d&&Xx(e,i);const c=e.fixtures.filter(m=>m.comp===`${i.id}-po`&&m.round===1),h=e.fixtures.some(m=>m.comp===`${i.id}-po`&&m.round===2);c.length===2&&c.every(m=>m.played)&&!h&&dn(n,c[0].date)>=1&&eC(e,i);const g=e.fixtures.find(m=>m.comp===`${i.id}-po`&&m.round===2);if(g&&g.played&&dn(n,g.date)===1){const m=Gc(e,i);m!=null&&we(e,{kind:"season",title:"Play-off final",body:`${e.clubs[m].name} have won the ${i.name} play-off final and are promoted!`,read:m!==e.manager.clubId})}}!e.seasonOver&&Pc(n)===6&&e.fixtures.every(i=>i.played)&&tC(e,t),oC(e,t);const a=sC(e);a&&(e.pendingMatch=a.id),ss(e,t)}function uC(e){const t=He(e,e.manager.clubId).filter(n=>n.contractEnd<=e.season+1);t.length&&we(e,{kind:"contract",title:"Expiring contracts",body:`The following players' contracts expire in the summer. Offer them new deals or they will leave on a free:

${t.sort((n,r)=>r.ability-n.ability).map(n=>`${n.name} (${n.positions[0]}, ${n.age})`).join(`
`)}`})}function cC(e,t=30){for(let n=0;n<t;n++){const r=e.news.filter(i=>!i.read).length;if(lC(e),e.manager.sacked)return"sacked";if(e.pendingMatch!=null)return"match";if(e.news.filter(i=>!i.read).length>r)return"news"}return"limit"}function dC(e,t){const n=e.fixtures.find(a=>a.id===e.pendingMatch);if(!n)return;const r=is(e);M2(e,n,t,r),e.pendingMatch=null,N2(e,r),ss(e,r)}function fC(e){const t=e.fixtures.find(a=>a.id===e.pendingMatch);if(!t)return;const n=is(e),r=b2(e,t,n);return e.pendingMatch=null,N2(e,n),ss(e,n),r}function hC(e){Qd(e);const t=e.clubs[e.manager.clubId],n=e.leagues.find(r=>r.id===t.leagueId);we(e,{kind:"board",title:`Welcome to ${t.name}`,body:`The board of ${t.name} welcome you as the club's new manager for the ${Xt(e.season)} ${n.name} season.

Their expectation: ${e.manager.target.text.toLowerCase()}.

Transfer budget: ${oe(t.finances.transferBudget)}
Wage budget: ${oe(t.finances.wageBudget)} per week

The season kicks off in August. The transfer window is open until 1 September.`}),we(e,{kind:"info",title:"Getting started",body:`Today is ${Ur(e.date)}.

- Squad: check your players, their condition and contracts.
- Tactics: choose a formation and pick your starting XI (or let your assistant do it).
- Transfers: search the database, shortlist targets and make offers.
- Continue: advances the calendar until something needs your attention.`})}var L2={exports:{}};(function(e,t){((n,r)=>{e.exports=r()})(Kf,function(){var n=function(s,u){return(n=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(f,p){f.__proto__=p}:function(f,p){for(var y in p)Object.prototype.hasOwnProperty.call(p,y)&&(f[y]=p[y])}))(s,u)},r=function(){return(r=Object.assign||function(s){for(var u,f=1,p=arguments.length;f<p;f++)for(var y in u=arguments[f])Object.prototype.hasOwnProperty.call(u,y)&&(s[y]=u[y]);return s}).apply(this,arguments)};function a(s,u,f){for(var p,y=0,v=u.length;y<v;y++)!p&&y in u||((p=p||Array.prototype.slice.call(u,0,y))[y]=u[y]);return s.concat(p||Array.prototype.slice.call(u))}var i=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:Kf,l=Object.keys,d=Array.isArray;function c(s,u){return typeof u=="object"&&l(u).forEach(function(f){s[f]=u[f]}),s}typeof Promise>"u"||i.Promise||(i.Promise=Promise);var h=Object.getPrototypeOf,g={}.hasOwnProperty;function m(s,u){return g.call(s,u)}function x(s,u){typeof u=="function"&&(u=u(h(s))),(typeof Reflect>"u"?l:Reflect.ownKeys)(u).forEach(function(f){b(s,f,u[f])})}var C=Object.defineProperty;function b(s,u,f,p){C(s,u,c(f&&m(f,"get")&&typeof f.get=="function"?{get:f.get,set:f.set,configurable:!0}:{value:f,configurable:!0,writable:!0},p))}function R(s){return{from:function(u){return s.prototype=Object.create(u.prototype),b(s.prototype,"constructor",s),{extend:x.bind(null,s.prototype)}}}}var E=Object.getOwnPropertyDescriptor,M=[].slice;function A(s,u,f){return M.call(s,u,f)}function D(s,u){return u(s)}function _(s){if(!s)throw new Error("Assertion Failed")}function z(s){i.setImmediate?setImmediate(s):setTimeout(s,0)}function X(s,u){if(typeof u=="string"&&m(s,u))return s[u];if(!u)return s;if(typeof u!="string"){for(var f=[],p=0,y=u.length;p<y;++p){var v=X(s,u[p]);f.push(v)}return f}var S,k=u.indexOf(".");return k===-1||(S=s[u.substr(0,k)])==null?void 0:X(S,u.substr(k+1))}function ee(s,u,f){if(s&&u!==void 0&&!("isFrozen"in Object&&Object.isFrozen(s)))if(typeof u!="string"&&"length"in u){_(typeof f!="string"&&"length"in f);for(var p=0,y=u.length;p<y;++p)ee(s,u[p],f[p])}else{var v=u.indexOf(".");if(v!==-1){var S=u.substr(0,v),v=u.substr(v+1);if(v==="")f===void 0?d(s)&&!isNaN(parseInt(S))?s.splice(S,1):delete s[S]:s[S]=f;else{var k=s[S];if(!k||!m(s,S)){if(f===void 0)return;k=s[S]={}}ee(k,v,f)}}else f===void 0?d(s)&&!isNaN(parseInt(u))?s.splice(u,1):delete s[u]:s[u]=f}}function se(s){var u,f={};for(u in s)m(s,u)&&(f[u]=s[u]);return f}var Pe=[].concat;function me(s){return Pe.apply([],s)}var De="BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(me([8,16,32,64].map(function(s){return["Int","Uint","Float"].map(function(u){return u+s+"Array"})}))).filter(function(s){return i[s]}),ht=new Set(De.map(function(s){return i[s]})),rn=null;function Gt(s){return rn=new WeakMap,s=function u(f){if(!f||typeof f!="object")return f;var p=rn.get(f);if(p)return p;if(d(f)){p=[],rn.set(f,p);for(var y=0,v=f.length;y<v;++y)p.push(u(f[y]))}else if(ht.has(f.constructor))p=f;else{var S,k=h(f);for(S in p=k===Object.prototype?{}:Object.create(k),rn.set(f,p),f)m(f,S)&&(p[S]=u(f[S]))}return p}(s),rn=null,s}var us={}.toString;function Ja(s){return us.call(s).slice(8,-1)}var Cr=typeof Symbol<"u"?Symbol.iterator:"@@iterator",Ha=typeof Cr=="symbol"?function(s){var u;return s!=null&&(u=s[Cr])&&u.apply(s)}:function(){return null};function ne(s,u){u=s.indexOf(u),0<=u&&s.splice(u,1)}var ce={};function de(s){var u,f,p,y;if(arguments.length===1){if(d(s))return s.slice();if(this===ce&&typeof s=="string")return[s];if(y=Ha(s))for(f=[];!(p=y.next()).done;)f.push(p.value);else{if(s==null)return[s];if(typeof(u=s.length)!="number")return[s];for(f=new Array(u);u--;)f[u]=s[u]}}else for(u=arguments.length,f=new Array(u);u--;)f[u]=arguments[u];return f}var Fe=typeof Symbol<"u"?function(s){return s[Symbol.toStringTag]==="AsyncFunction"}:function(){return!1},De=["Unknown","Constraint","Data","TransactionInactive","ReadOnly","Version","NotFound","InvalidState","InvalidAccess","Abort","Timeout","QuotaExceeded","Syntax","DataClone"],Bt=["Modify","Bulk","OpenFailed","VersionChange","Schema","Upgrade","InvalidTable","MissingAPI","NoSuchDatabase","InvalidArgument","SubTransaction","Unsupported","Internal","DatabaseClosed","PrematureCommit","ForeignAwait"].concat(De),Yr={VersionChanged:"Database version changed by other database connection",DatabaseClosed:"Database has been closed",Abort:"Transaction aborted",TransactionInactive:"Transaction has already completed or failed",MissingAPI:"IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"};function Nt(s,u){this.name=s,this.message=u}function Qr(s,u){return s+". Errors: "+Object.keys(u).map(function(f){return u[f].toString()}).filter(function(f,p,y){return y.indexOf(f)===p}).join(`
`)}function Ht(s,u,f,p){this.failures=u,this.failedKeys=p,this.successCount=f,this.message=Qr(s,u)}function an(s,u){this.name="BulkError",this.failures=Object.keys(u).map(function(f){return u[f]}),this.failuresByPos=u,this.message=Qr(s,this.failures)}R(Nt).from(Error).extend({toString:function(){return this.name+": "+this.message}}),R(Ht).from(Nt),R(an).from(Nt);var Ml=Bt.reduce(function(s,u){return s[u]=u+"Error",s},{}),Pg=Nt,ue=Bt.reduce(function(s,u){var f=u+"Error";function p(y,v){this.name=f,y?typeof y=="string"?(this.message="".concat(y).concat(v?`
 `+v:""),this.inner=v||null):typeof y=="object"&&(this.message="".concat(y.name," ").concat(y.message),this.inner=y):(this.message=Yr[u]||f,this.inner=null)}return R(p).from(Pg),s[u]=p,s},{}),af=(ue.Syntax=SyntaxError,ue.Type=TypeError,ue.Range=RangeError,De.reduce(function(s,u){return s[u+"Error"]=ue[u],s},{}));De=Bt.reduce(function(s,u){return["Syntax","Type","Range"].indexOf(u)===-1&&(s[u+"Error"]=ue[u]),s},{});function Ne(){}function Va(s){return s}function Fg(s,u){return s==null||s===Va?u:function(f){return u(s(f))}}function Mr(s,u){return function(){s.apply(this,arguments),u.apply(this,arguments)}}function Gg(s,u){return s===Ne?u:function(){var f=s.apply(this,arguments),p=(f!==void 0&&(arguments[0]=f),this.onsuccess),y=this.onerror,v=(this.onsuccess=null,this.onerror=null,u.apply(this,arguments));return p&&(this.onsuccess=this.onsuccess?Mr(p,this.onsuccess):p),y&&(this.onerror=this.onerror?Mr(y,this.onerror):y),v!==void 0?v:f}}function Bg(s,u){return s===Ne?u:function(){s.apply(this,arguments);var f=this.onsuccess,p=this.onerror;this.onsuccess=this.onerror=null,u.apply(this,arguments),f&&(this.onsuccess=this.onsuccess?Mr(f,this.onsuccess):f),p&&(this.onerror=this.onerror?Mr(p,this.onerror):p)}}function Ig(s,u){return s===Ne?u:function(){var f=s.apply(this,arguments),p=(c(arguments[0],f),this.onsuccess),y=this.onerror,v=(this.onsuccess=null,this.onerror=null,u.apply(this,arguments));return p&&(this.onsuccess=this.onsuccess?Mr(p,this.onsuccess):p),y&&(this.onerror=this.onerror?Mr(y,this.onerror):y),f===void 0?v===void 0?void 0:v:c(f,v)}}function Og(s,u){return s===Ne?u:function(){return u.apply(this,arguments)!==!1&&s.apply(this,arguments)}}function bl(s,u){return s===Ne?u:function(){var f=s.apply(this,arguments);if(f&&typeof f.then=="function"){for(var p=this,y=arguments.length,v=new Array(y);y--;)v[y]=arguments[y];return f.then(function(){return u.apply(p,v)})}return u.apply(this,arguments)}}De.ModifyError=Ht,De.DexieError=Nt,De.BulkError=an;var gn=typeof location<"u"&&/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);function sf(s){gn=s}var qa={},of=100,Ya=typeof Promise>"u"?[]:(Bt=Promise.resolve(),typeof crypto<"u"&&crypto.subtle?[Ya=crypto.subtle.digest("SHA-512",new Uint8Array([0])),h(Ya),Bt]:[Bt,h(Bt),Bt]),Bt=Ya[0],aa=Ya[1],aa=aa&&aa.then,br=Bt&&Bt.constructor,Al=!!Ya[2],Qa=function(s,u){Za.push([s,u]),cs&&(queueMicrotask(Kg),cs=!1)},Sl=!0,cs=!0,Ar=[],ds=[],kl=Va,kn={id:"global",global:!0,ref:0,unhandleds:[],onunhandled:Ne,pgp:!1,env:{},finalize:Ne},le=kn,Za=[],Sr=0,fs=[];function te(s){if(typeof this!="object")throw new TypeError("Promises must be constructed via new");this._listeners=[],this._lib=!1;var u=this._PSD=le;if(typeof s!="function"){if(s!==qa)throw new TypeError("Not a function");this._state=arguments[1],this._value=arguments[2],this._state===!1&&El(this,this._value)}else this._state=null,this._value=null,++u.ref,function f(p,y){try{y(function(v){if(p._state===null){if(v===p)throw new TypeError("A promise cannot be resolved with itself.");var S=p._lib&&Zr();v&&typeof v.then=="function"?f(p,function(k,w){v instanceof te?v._then(k,w):v.then(k,w)}):(p._state=!0,p._value=v,uf(p)),S&&Xr()}},El.bind(null,p))}catch(v){El(p,v)}}(this,s)}var Rl={get:function(){var s=le,u=gs;function f(p,y){var v=this,S=!s.global&&(s!==le||u!==gs),k=S&&!zn(),w=new te(function(B,T){Dl(v,new lf(df(p,s,S,k),df(y,s,S,k),B,T,s))});return this._consoleTask&&(w._consoleTask=this._consoleTask),w}return f.prototype=qa,f},set:function(s){b(this,"then",s&&s.prototype===qa?Rl:{get:function(){return s},set:Rl.set})}};function lf(s,u,f,p,y){this.onFulfilled=typeof s=="function"?s:null,this.onRejected=typeof u=="function"?u:null,this.resolve=f,this.reject=p,this.psd=y}function El(s,u){var f,p;ds.push(u),s._state===null&&(f=s._lib&&Zr(),u=kl(u),s._state=!1,s._value=u,p=s,Ar.some(function(y){return y._value===p._value})||Ar.push(p),uf(s),f)&&Xr()}function uf(s){var u=s._listeners;s._listeners=[];for(var f=0,p=u.length;f<p;++f)Dl(s,u[f]);var y=s._PSD;--y.ref||y.finalize(),Sr===0&&(++Sr,Qa(function(){--Sr==0&&Nl()},[]))}function Dl(s,u){if(s._state===null)s._listeners.push(u);else{var f=s._state?u.onFulfilled:u.onRejected;if(f===null)return(s._state?u.resolve:u.reject)(s._value);++u.psd.ref,++Sr,Qa(_g,[f,s,u])}}function _g(s,u,f){try{var p,y=u._value;!u._state&&ds.length&&(ds=[]),p=gn&&u._consoleTask?u._consoleTask.run(function(){return s(y)}):s(y),u._state||ds.indexOf(y)!==-1||(v=>{for(var S=Ar.length;S;)if(Ar[--S]._value===v._value)return Ar.splice(S,1)})(u),f.resolve(p)}catch(v){f.reject(v)}finally{--Sr==0&&Nl(),--f.psd.ref||f.psd.finalize()}}function Kg(){kr(kn,function(){Zr()&&Xr()})}function Zr(){var s=Sl;return cs=Sl=!1,s}function Xr(){var s,u,f;do for(;0<Za.length;)for(s=Za,Za=[],f=s.length,u=0;u<f;++u){var p=s[u];p[0].apply(null,p[1])}while(0<Za.length);cs=Sl=!0}function Nl(){for(var s=Ar,u=(Ar=[],s.forEach(function(p){p._PSD.onunhandled.call(null,p._value,p)}),fs.slice(0)),f=u.length;f;)u[--f]()}function hs(s){return new te(qa,!1,s)}function Oe(s,u){var f=le;return function(){var p=Zr(),y=le;try{return $n(f,!0),s.apply(this,arguments)}catch(v){u&&u(v)}finally{$n(y,!1),p&&Xr()}}}x(te.prototype,{then:Rl,_then:function(s,u){Dl(this,new lf(null,null,s,u,le))},catch:function(s){var u,f;return arguments.length===1?this.then(null,s):(u=s,f=arguments[1],typeof u=="function"?this.then(null,function(p){return(p instanceof u?f:hs)(p)}):this.then(null,function(p){return(p&&p.name===u?f:hs)(p)}))},finally:function(s){return this.then(function(u){return te.resolve(s()).then(function(){return u})},function(u){return te.resolve(s()).then(function(){return hs(u)})})},timeout:function(s,u){var f=this;return s<1/0?new te(function(p,y){var v=setTimeout(function(){return y(new ue.Timeout(u))},s);f.then(p,y).finally(clearTimeout.bind(null,v))}):this}}),typeof Symbol<"u"&&Symbol.toStringTag&&b(te.prototype,Symbol.toStringTag,"Dexie.Promise"),kn.env=cf(),x(te,{all:function(){var s=de.apply(null,arguments).map(ys);return new te(function(u,f){s.length===0&&u([]);var p=s.length;s.forEach(function(y,v){return te.resolve(y).then(function(S){s[v]=S,--p||u(s)},f)})})},resolve:function(s){return s instanceof te?s:s&&typeof s.then=="function"?new te(function(u,f){s.then(u,f)}):new te(qa,!0,s)},reject:hs,race:function(){var s=de.apply(null,arguments).map(ys);return new te(function(u,f){s.map(function(p){return te.resolve(p).then(u,f)})})},PSD:{get:function(){return le},set:function(s){return le=s}},totalEchoes:{get:function(){return gs}},newPSD:Kn,usePSD:kr,scheduler:{get:function(){return Qa},set:function(s){Qa=s}},rejectionMapper:{get:function(){return kl},set:function(s){kl=s}},follow:function(s,u){return new te(function(f,p){return Kn(function(y,v){var S=le;S.unhandleds=[],S.onunhandled=v,S.finalize=Mr(function(){var k,w=this;k=function(){w.unhandleds.length===0?y():v(w.unhandleds[0])},fs.push(function B(){k(),fs.splice(fs.indexOf(B),1)}),++Sr,Qa(function(){--Sr==0&&Nl()},[])},S.finalize),s()},u,f,p)})}}),br&&(br.allSettled&&b(te,"allSettled",function(){var s=de.apply(null,arguments).map(ys);return new te(function(u){s.length===0&&u([]);var f=s.length,p=new Array(f);s.forEach(function(y,v){return te.resolve(y).then(function(S){return p[v]={status:"fulfilled",value:S}},function(S){return p[v]={status:"rejected",reason:S}}).then(function(){return--f||u(p)})})})}),br.any&&typeof AggregateError<"u"&&b(te,"any",function(){var s=de.apply(null,arguments).map(ys);return new te(function(u,f){s.length===0&&f(new AggregateError([]));var p=s.length,y=new Array(p);s.forEach(function(v,S){return te.resolve(v).then(function(k){return u(k)},function(k){y[S]=k,--p||f(new AggregateError(y))})})})}),br.withResolvers)&&(te.withResolvers=br.withResolvers);var at={awaits:0,echoes:0,id:0},zg=0,ps=[],ms=0,gs=0,$g=0;function Kn(s,S,f,p){var y=le,v=Object.create(y),S=(v.parent=y,v.ref=0,v.global=!1,v.id=++$g,kn.env,v.env=Al?{Promise:te,PromiseProp:{value:te,configurable:!0,writable:!0},all:te.all,race:te.race,allSettled:te.allSettled,any:te.any,resolve:te.resolve,reject:te.reject}:{},S&&c(v,S),++y.ref,v.finalize=function(){--this.parent.ref||this.parent.finalize()},kr(v,s,f,p));return v.ref===0&&v.finalize(),S}function ea(){return at.id||(at.id=++zg),++at.awaits,at.echoes+=of,at.id}function zn(){return!!at.awaits&&(--at.awaits==0&&(at.id=0),at.echoes=at.awaits*of,!0)}function ys(s){return at.echoes&&s&&s.constructor===br?(ea(),s.then(function(u){return zn(),u},function(u){return zn(),Ve(u)})):s}function Ug(){var s=ps[ps.length-1];ps.pop(),$n(s,!1)}function $n(s,u){var f,p,y=le;(u?!at.echoes||ms++&&s===le:!ms||--ms&&s===le)||queueMicrotask(u?(function(v){++gs,at.echoes&&--at.echoes!=0||(at.echoes=at.awaits=at.id=0),ps.push(le),$n(v,!0)}).bind(null,s):Ug),s!==le&&(le=s,y===kn&&(kn.env=cf()),Al)&&(f=kn.env.Promise,p=s.env,y.global||s.global)&&(Object.defineProperty(i,"Promise",p.PromiseProp),f.all=p.all,f.race=p.race,f.resolve=p.resolve,f.reject=p.reject,p.allSettled&&(f.allSettled=p.allSettled),p.any)&&(f.any=p.any)}function cf(){var s=i.Promise;return Al?{Promise:s,PromiseProp:Object.getOwnPropertyDescriptor(i,"Promise"),all:s.all,race:s.race,allSettled:s.allSettled,any:s.any,resolve:s.resolve,reject:s.reject}:{}}function kr(s,u,f,p,y){var v=le;try{return $n(s,!0),u(f,p,y)}finally{$n(v,!1)}}function df(s,u,f,p){return typeof s!="function"?s:function(){var y=le;f&&ea(),$n(u,!0);try{return s.apply(this,arguments)}finally{$n(y,!1),p&&queueMicrotask(zn)}}}function wl(s){Promise===br&&at.echoes===0?ms===0?s():enqueueNativeMicroTask(s):setTimeout(s,0)}(""+aa).indexOf("[native code]")===-1&&(ea=zn=Ne);var Ve=te.reject,Rr="￿",Rn="Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",ff="String expected.",vs="__dbnames",jl="readonly",Tl="readwrite";function Er(s,u){return s?u?function(){return s.apply(this,arguments)&&u.apply(this,arguments)}:s:u}var hf={type:3,lower:-1/0,lowerOpen:!1,upper:[[]],upperOpen:!1};function xs(s){return typeof s!="string"||/\./.test(s)?function(u){return u}:function(u){return u[s]===void 0&&s in u&&delete(u=Gt(u))[s],u}}function pf(){throw ue.Type("Entity instances must never be new:ed. Instances are generated by the framework bypassing the constructor.")}function be(s,u){try{var f=mf(s),p=mf(u);if(f!==p)return f==="Array"?1:p==="Array"?-1:f==="binary"?1:p==="binary"?-1:f==="string"?1:p==="string"?-1:f==="Date"?1:p!=="Date"?NaN:-1;switch(f){case"number":case"Date":case"string":return u<s?1:s<u?-1:0;case"binary":for(var y=gf(s),v=gf(u),S=y.length,k=v.length,w=S<k?S:k,B=0;B<w;++B)if(y[B]!==v[B])return y[B]<v[B]?-1:1;return S===k?0:S<k?-1:1;case"Array":for(var T=s,N=u,j=T.length,G=N.length,P=j<G?j:G,L=0;L<P;++L){var F=be(T[L],N[L]);if(F!==0)return F}return j===G?0:j<G?-1:1}}catch{}return NaN}function mf(s){var u=typeof s;return u=="object"&&(ArrayBuffer.isView(s)||(u=Ja(s))==="ArrayBuffer")?"binary":u}function gf(s){return s instanceof Uint8Array?s:ArrayBuffer.isView(s)?new Uint8Array(s.buffer,s.byteOffset,s.byteLength):new Uint8Array(s)}function Cs(s,u,f){var p=s.schema.yProps;return p?(u&&0<f.numFailures&&(u=u.filter(function(y,v){return!f.failures[v]})),Promise.all(p.map(function(y){return y=y.updatesTable,u?s.db.table(y).where("k").anyOf(u).delete():s.db.table(y).clear()})).then(function(){return f})):f}yf.prototype.execute=function(s){var u=this["@@propmod"];if(u.add!==void 0){var f=u.add;if(d(f))return a(a([],d(s)?s:[],!0),f).sort();if(typeof f=="number")return(Number(s)||0)+f;if(typeof f=="bigint")try{return BigInt(s)+f}catch{return BigInt(0)+f}throw new TypeError("Invalid term ".concat(f))}if(u.remove!==void 0){var p=u.remove;if(d(p))return d(s)?s.filter(function(y){return!p.includes(y)}).sort():[];if(typeof p=="number")return Number(s)-p;if(typeof p=="bigint")try{return BigInt(s)-p}catch{return BigInt(0)-p}throw new TypeError("Invalid subtrahend ".concat(p))}return f=(f=u.replacePrefix)==null?void 0:f[0],f&&typeof s=="string"&&s.startsWith(f)?u.replacePrefix[1]+s.substring(f.length):s};var Xa=yf;function yf(s){this["@@propmod"]=s}function vf(s,u){for(var f=l(u),p=f.length,y=!1,v=0;v<p;++v){var S=f[v],k=u[S],w=X(s,S);k instanceof Xa?(ee(s,S,k.execute(w)),y=!0):w!==k&&(ee(s,S,k),y=!0)}return y}je.prototype._trans=function(s,u,f){var p=this._tx||le.trans,y=this.name,v=gn&&typeof console<"u"&&console.createTask&&console.createTask("Dexie: ".concat(s==="readonly"?"read":"write"," ").concat(this.name));function S(B,T,N){if(N.schema[y])return u(N.idbtrans,N);throw new ue.NotFound("Table "+y+" not part of transaction")}var k=Zr();try{var w=p&&p.db._novip===this.db._novip?p===le.trans?p._promise(s,S,f):Kn(function(){return p._promise(s,S,f)},{trans:p,transless:le.transless||le}):function B(T,N,j,G){if(T.idbdb&&(T._state.openComplete||le.letThrough||T._vip)){var P=T._createTransaction(N,j,T._dbSchema);try{P.create(),T._state.PR1398_maxLoop=3}catch(L){return L.name===Ml.InvalidState&&T.isOpen()&&0<--T._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),T.close({disableAutoOpen:!1}),T.open().then(function(){return B(T,N,j,G)})):Ve(L)}return P._promise(N,function(L,F){return Kn(function(){return le.trans=P,G(L,F,P)})}).then(function(L){if(N==="readwrite")try{P.idbtrans.commit()}catch{}return N==="readonly"?L:P._completion.then(function(){return L})})}if(T._state.openComplete)return Ve(new ue.DatabaseClosed(T._state.dbOpenError));if(!T._state.isBeingOpened){if(!T._state.autoOpen)return Ve(new ue.DatabaseClosed);T.open().catch(Ne)}return T._state.dbReadyPromise.then(function(){return B(T,N,j,G)})}(this.db,s,[this.name],S);return v&&(w._consoleTask=v,w=w.catch(function(B){return console.trace(B),Ve(B)})),w}finally{k&&Xr()}},je.prototype.get=function(s,u){var f=this;return s&&s.constructor===Object?this.where(s).first(u):s==null?Ve(new ue.Type("Invalid argument to Table.get()")):this._trans("readonly",function(p){return f.core.get({trans:p,key:s}).then(function(y){return f.hook.reading.fire(y)})}).then(u)},je.prototype.where=function(s){if(typeof s=="string")return new this.db.WhereClause(this,s);if(d(s))return new this.db.WhereClause(this,"[".concat(s.join("+"),"]"));var u=l(s);if(u.length===1)return this.where(u[0]).equals(s[u[0]]);var f=this.schema.indexes.concat(this.schema.primKey).filter(function(k){if(k.compound&&u.every(function(B){return 0<=k.keyPath.indexOf(B)})){for(var w=0;w<u.length;++w)if(u.indexOf(k.keyPath[w])===-1)return!1;return!0}return!1}).sort(function(k,w){return k.keyPath.length-w.keyPath.length})[0];if(f&&this.db._maxKey!==Rr)return S=f.keyPath.slice(0,u.length),this.where(S).equals(S.map(function(k){return s[k]}));!f&&gn&&console.warn("The query ".concat(JSON.stringify(s)," on ").concat(this.name," would benefit from a ")+"compound index [".concat(u.join("+"),"]"));var p=this.schema.idxByName;function y(k,w){return be(k,w)===0}var S=u.reduce(function(T,w){var B=T[0],T=T[1],N=p[w],j=s[w];return[B||N,B||!N?Er(T,N&&N.multi?function(G){return G=X(G,w),d(G)&&G.some(function(P){return y(j,P)})}:function(G){return y(j,X(G,w))}):T]},[null,null]),v=S[0],S=S[1];return v?this.where(v.name).equals(s[v.keyPath]).filter(S):f?this.filter(S):this.where(u).equals("")},je.prototype.filter=function(s){return this.toCollection().and(s)},je.prototype.count=function(s){return this.toCollection().count(s)},je.prototype.offset=function(s){return this.toCollection().offset(s)},je.prototype.limit=function(s){return this.toCollection().limit(s)},je.prototype.each=function(s){return this.toCollection().each(s)},je.prototype.toArray=function(s){return this.toCollection().toArray(s)},je.prototype.toCollection=function(){return new this.db.Collection(new this.db.WhereClause(this))},je.prototype.orderBy=function(s){return new this.db.Collection(new this.db.WhereClause(this,d(s)?"[".concat(s.join("+"),"]"):s))},je.prototype.reverse=function(){return this.toCollection().reverse()},je.prototype.mapToClass=function(s){for(var u=this.db,f=this.name,p=((this.schema.mappedClass=s).prototype instanceof pf&&(s=(S=>{var k=T,w=S;if(typeof w!="function"&&w!==null)throw new TypeError("Class extends value "+String(w)+" is not a constructor or null");function B(){this.constructor=k}function T(){return S!==null&&S.apply(this,arguments)||this}return n(k,w),k.prototype=w===null?Object.create(w):(B.prototype=w.prototype,new B),Object.defineProperty(T.prototype,"db",{get:function(){return u},enumerable:!1,configurable:!0}),T.prototype.table=function(){return f},T})(s)),new Set),y=s.prototype;y;y=h(y))Object.getOwnPropertyNames(y).forEach(function(S){return p.add(S)});function v(S){if(!S)return S;var k,w=Object.create(s.prototype);for(k in S)if(!p.has(k))try{w[k]=S[k]}catch{}return w}return this.schema.readHook&&this.hook.reading.unsubscribe(this.schema.readHook),this.schema.readHook=v,this.hook("reading",v),s},je.prototype.defineClass=function(){return this.mapToClass(function(s){c(this,s)})},je.prototype.add=function(s,u){var f=this,p=this.schema.primKey,y=p.auto,v=p.keyPath,S=s;return v&&y&&(S=xs(v)(s)),this._trans("readwrite",function(k){return f.core.mutate({trans:k,type:"add",keys:u!=null?[u]:null,values:[S]})}).then(function(k){return k.numFailures?te.reject(k.failures[0]):k.lastResult}).then(function(k){if(v)try{ee(s,v,k)}catch{}return k})},je.prototype.upsert=function(s,u){var f=this,p=this.schema.primKey.keyPath;return this._trans("readwrite",function(y){return f.core.get({trans:y,key:s}).then(function(v){var S=v??{};return vf(S,u),p&&ee(S,p,s),f.core.mutate({trans:y,type:"put",values:[S],keys:[s],upsert:!0,updates:{keys:[s],changeSpecs:[u]}}).then(function(k){return k.numFailures?te.reject(k.failures[0]):!!v})})})},je.prototype.update=function(s,u){return typeof s!="object"||d(s)?this.where(":id").equals(s).modify(u):(s=X(s,this.schema.primKey.keyPath))===void 0?Ve(new ue.InvalidArgument("Given object does not contain its primary key")):this.where(":id").equals(s).modify(u)},je.prototype.put=function(s,u){var f=this,p=this.schema.primKey,y=p.auto,v=p.keyPath,S=s;return v&&y&&(S=xs(v)(s)),this._trans("readwrite",function(k){return f.core.mutate({trans:k,type:"put",values:[S],keys:u!=null?[u]:null})}).then(function(k){return k.numFailures?te.reject(k.failures[0]):k.lastResult}).then(function(k){if(v)try{ee(s,v,k)}catch{}return k})},je.prototype.delete=function(s){var u=this;return this._trans("readwrite",function(f){return u.core.mutate({trans:f,type:"delete",keys:[s]}).then(function(p){return Cs(u,[s],p)}).then(function(p){return p.numFailures?te.reject(p.failures[0]):void 0})})},je.prototype.clear=function(){var s=this;return this._trans("readwrite",function(u){return s.core.mutate({trans:u,type:"deleteRange",range:hf}).then(function(f){return Cs(s,null,f)})}).then(function(u){return u.numFailures?te.reject(u.failures[0]):void 0})},je.prototype.bulkGet=function(s){var u=this;return this._trans("readonly",function(f){return u.core.getMany({keys:s,trans:f}).then(function(p){return p.map(function(y){return u.hook.reading.fire(y)})})})},je.prototype.bulkAdd=function(s,u,f){var p=this,y=Array.isArray(u)?u:void 0,v=(f=f||(y?void 0:u))?f.allKeys:void 0;return this._trans("readwrite",function(S){var k=p.schema.primKey,B=k.auto,k=k.keyPath;if(k&&y)throw new ue.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");if(y&&y.length!==s.length)throw new ue.InvalidArgument("Arguments objects and keys must have the same length");var w=s.length,B=k&&B?s.map(xs(k)):s;return p.core.mutate({trans:S,type:"add",keys:y,values:B,wantResults:v}).then(function(T){var N=T.numFailures,j=T.failures;if(N===0)return v?T.results:T.lastResult;throw new an("".concat(p.name,".bulkAdd(): ").concat(N," of ").concat(w," operations failed"),j)})})},je.prototype.bulkPut=function(s,u,f){var p=this,y=Array.isArray(u)?u:void 0,v=(f=f||(y?void 0:u))?f.allKeys:void 0;return this._trans("readwrite",function(S){var k=p.schema.primKey,B=k.auto,k=k.keyPath;if(k&&y)throw new ue.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");if(y&&y.length!==s.length)throw new ue.InvalidArgument("Arguments objects and keys must have the same length");var w=s.length,B=k&&B?s.map(xs(k)):s;return p.core.mutate({trans:S,type:"put",keys:y,values:B,wantResults:v}).then(function(T){var N=T.numFailures,j=T.failures;if(N===0)return v?T.results:T.lastResult;throw new an("".concat(p.name,".bulkPut(): ").concat(N," of ").concat(w," operations failed"),j)})})},je.prototype.bulkUpdate=function(s){var u=this,f=this.core,p=s.map(function(S){return S.key}),y=s.map(function(S){return S.changes}),v=[];return this._trans("readwrite",function(S){return f.getMany({trans:S,keys:p,cache:"clone"}).then(function(k){var w=[],B=[],T=(s.forEach(function(N,j){var G=N.key,P=N.changes,L=k[j];if(L){for(var F=0,K=Object.keys(P);F<K.length;F++){var O=K[F],$=P[O];if(O===u.schema.primKey.keyPath){if(be($,G)!==0)throw new ue.Constraint("Cannot update primary key in bulkUpdate()")}else ee(L,O,$)}v.push(j),w.push(G),B.push(L)}}),w.length);return f.mutate({trans:S,type:"put",keys:w,values:B,updates:{keys:p,changeSpecs:y}}).then(function(N){var j=N.numFailures,G=N.failures;if(j===0)return T;for(var P=0,L=Object.keys(G);P<L.length;P++){var F,K=L[P],O=v[Number(K)];O!=null&&(F=G[K],delete G[K],G[O]=F)}throw new an("".concat(u.name,".bulkUpdate(): ").concat(j," of ").concat(T," operations failed"),G)})})})},je.prototype.bulkDelete=function(s){var u=this,f=s.length;return this._trans("readwrite",function(p){return u.core.mutate({trans:p,type:"delete",keys:s}).then(function(y){return Cs(u,s,y)})}).then(function(p){var y=p.numFailures,v=p.failures;if(y===0)return p.lastResult;throw new an("".concat(u.name,".bulkDelete(): ").concat(y," of ").concat(f," operations failed"),v)})};var xf=je;function je(){}function ei(s){function u(S,k){if(k){for(var w=arguments.length,B=new Array(w-1);--w;)B[w-1]=arguments[w];return f[S].subscribe.apply(null,B),s}if(typeof S=="string")return f[S]}var f={};u.addEventType=v;for(var p=1,y=arguments.length;p<y;++p)v(arguments[p]);return u;function v(S,k,w){var B,T;if(typeof S!="object")return k=k||Og,T={subscribers:[],fire:w=w||Ne,subscribe:function(N){T.subscribers.indexOf(N)===-1&&(T.subscribers.push(N),T.fire=k(T.fire,N))},unsubscribe:function(N){T.subscribers=T.subscribers.filter(function(j){return j!==N}),T.fire=T.subscribers.reduce(k,w)}},f[S]=u[S]=T;l(B=S).forEach(function(N){var j=B[N];if(d(j))v(N,B[N][0],B[N][1]);else{if(j!=="asap")throw new ue.InvalidArgument("Invalid event config");var G=v(N,Va,function(){for(var P=arguments.length,L=new Array(P);P--;)L[P]=arguments[P];G.subscribers.forEach(function(F){z(function(){F.apply(null,L)})})})}})}}function ti(s,u){return R(u).from({prototype:s}),u}function ta(s,u){return!(s.filter||s.algorithm||s.or)&&(u?s.justLimit:!s.replayFilter)}function Ll(s,u){s.filter=Er(s.filter,u)}function Pl(s,u,f){var p=s.replayFilter;s.replayFilter=p?function(){return Er(p(),u())}:u,s.justLimit=f&&!p}function Ms(s,u){if(s.isPrimKey)return u.primaryKey;var f=u.getIndexByKeyPath(s.index);if(f)return f;throw new ue.Schema("KeyPath "+s.index+" on object store "+u.name+" is not indexed")}function Cf(s,u,f){var p=Ms(s,u.schema);return u.openCursor({trans:f,values:!s.keysOnly,reverse:s.dir==="prev",unique:!!s.unique,query:{index:p,range:s.range}})}function bs(s,u,f,p){var y,v,S=s.replayFilter?Er(s.filter,s.replayFilter()):s.filter;return s.or?(y={},v=function(k,w,B){var T,N;S&&!S(w,B,function(j){return w.stop(j)},function(j){return w.fail(j)})||((N=""+(T=w.primaryKey))=="[object ArrayBuffer]"&&(N=""+new Uint8Array(T)),m(y,N))||(y[N]=!0,u(k,w,B))},Promise.all([s.or._iterate(v,f),Mf(Cf(s,p,f),s.algorithm,v,!s.keysOnly&&s.valueMapper)])):Mf(Cf(s,p,f),Er(s.algorithm,S),u,!s.keysOnly&&s.valueMapper)}function Mf(s,u,f,p){var y=Oe(p?function(v,S,k){return f(p(v),S,k)}:f);return s.then(function(v){if(v)return v.start(function(){var S=function(){return v.continue()};u&&!u(v,function(k){return S=k},function(k){v.stop(k),S=Ne},function(k){v.fail(k),S=Ne})||y(v.value,v,function(k){return S=k}),S()})})}ke.prototype._read=function(s,u){var f=this._ctx;return f.error?f.table._trans(null,Ve.bind(null,f.error)):f.table._trans("readonly",s).then(u)},ke.prototype._write=function(s){var u=this._ctx;return u.error?u.table._trans(null,Ve.bind(null,u.error)):u.table._trans("readwrite",s,"locked")},ke.prototype._addAlgorithm=function(s){var u=this._ctx;u.algorithm=Er(u.algorithm,s)},ke.prototype._iterate=function(s,u){return bs(this._ctx,s,u,this._ctx.table.core)},ke.prototype.clone=function(s){var u=Object.create(this.constructor.prototype),f=Object.create(this._ctx);return s&&c(f,s),u._ctx=f,u},ke.prototype.raw=function(){return this._ctx.valueMapper=null,this},ke.prototype.each=function(s){var u=this._ctx;return this._read(function(f){return bs(u,s,f,u.table.core)})},ke.prototype.count=function(s){var u=this;return this._read(function(f){var p,y=u._ctx,v=y.table.core;return ta(y,!0)?v.count({trans:f,query:{index:Ms(y,v.schema),range:y.range}}).then(function(S){return Math.min(S,y.limit)}):(p=0,bs(y,function(){return++p,!1},f,v).then(function(){return p}))}).then(s)},ke.prototype.sortBy=function(s,u){var f=s.split(".").reverse(),p=f[0],y=f.length-1;function v(w,B){return B?v(w[f[B]],B-1):w[p]}var S=this._ctx.dir==="next"?1:-1;function k(w,B){return be(v(w,y),v(B,y))*S}return this.toArray(function(w){return w.slice().sort(k)}).then(u)},ke.prototype.toArray=function(s){var u=this;return this._read(function(f){var p,y,v,S=u._ctx;return ta(S,!0)&&0<S.limit?(p=S.valueMapper,y=Ms(S,S.table.core.schema),S.table.core.query({trans:f,limit:S.limit,values:!0,direction:S.dir==="prev"?"prev":void 0,query:{index:y,range:S.range}}).then(function(k){return k=k.result,p?k.map(p):k})):(v=[],bs(S,function(k){return v.push(k)},f,S.table.core).then(function(){return v}))},s)},ke.prototype.offset=function(s){var u=this._ctx;return s<=0||(u.offset+=s,ta(u)?Pl(u,function(){var f=s;return function(p,y){return f===0||(f===1?--f:y(function(){p.advance(f),f=0}),!1)}}):Pl(u,function(){var f=s;return function(){return--f<0}})),this},ke.prototype.limit=function(s){return this._ctx.limit=Math.min(this._ctx.limit,s),Pl(this._ctx,function(){var u=s;return function(f,p,y){return--u<=0&&p(y),0<=u}},!0),this},ke.prototype.until=function(s,u){return Ll(this._ctx,function(f,p,y){return!s(f.value)||(p(y),u)}),this},ke.prototype.first=function(s){return this.limit(1).toArray(function(u){return u[0]}).then(s)},ke.prototype.last=function(s){return this.reverse().first(s)},ke.prototype.filter=function(s){var u;return Ll(this._ctx,function(f){return s(f.value)}),(u=this._ctx).isMatch=Er(u.isMatch,s),this},ke.prototype.and=function(s){return this.filter(s)},ke.prototype.or=function(s){return new this.db.WhereClause(this._ctx.table,s,this)},ke.prototype.reverse=function(){return this._ctx.dir=this._ctx.dir==="prev"?"next":"prev",this._ondirectionchange&&this._ondirectionchange(this._ctx.dir),this},ke.prototype.desc=function(){return this.reverse()},ke.prototype.eachKey=function(s){var u=this._ctx;return u.keysOnly=!u.isMatch,this.each(function(f,p){s(p.key,p)})},ke.prototype.eachUniqueKey=function(s){return this._ctx.unique="unique",this.eachKey(s)},ke.prototype.eachPrimaryKey=function(s){var u=this._ctx;return u.keysOnly=!u.isMatch,this.each(function(f,p){s(p.primaryKey,p)})},ke.prototype.keys=function(s){var u=this._ctx,f=(u.keysOnly=!u.isMatch,[]);return this.each(function(p,y){f.push(y.key)}).then(function(){return f}).then(s)},ke.prototype.primaryKeys=function(s){var u=this._ctx;if(ta(u,!0)&&0<u.limit)return this._read(function(p){var y=Ms(u,u.table.core.schema);return u.table.core.query({trans:p,values:!1,limit:u.limit,direction:u.dir==="prev"?"prev":void 0,query:{index:y,range:u.range}})}).then(function(p){return p.result}).then(s);u.keysOnly=!u.isMatch;var f=[];return this.each(function(p,y){f.push(y.primaryKey)}).then(function(){return f}).then(s)},ke.prototype.uniqueKeys=function(s){return this._ctx.unique="unique",this.keys(s)},ke.prototype.firstKey=function(s){return this.limit(1).keys(function(u){return u[0]}).then(s)},ke.prototype.lastKey=function(s){return this.reverse().firstKey(s)},ke.prototype.distinct=function(){var s,u=this._ctx,u=u.index&&u.table.schema.idxByName[u.index];return u&&u.multi&&(s={},Ll(this._ctx,function(p){var p=p.primaryKey.toString(),y=m(s,p);return s[p]=!0,!y})),this},ke.prototype.modify=function(s){var u=this,f=this._ctx;return this._write(function(p){function y(L,F){var K=F.failures;j+=L-F.numFailures;for(var O=0,$=l(K);O<$.length;O++){var J=$[O];N.push(K[J])}}var v=typeof s=="function"?s:function(L){return vf(L,s)},S=f.table.core,T=S.schema.primaryKey,k=T.outbound,w=T.extractKey,B=200,T=u.db._options.modifyChunkSize,N=(T&&(B=typeof T=="object"?T[S.name]||T["*"]||200:T),[]),j=0,G=[],P=s===bf;return u.clone().primaryKeys().then(function(L){function F(O){var $=Math.min(B,L.length-O),J=L.slice(O,O+$);return(P?Promise.resolve([]):S.getMany({trans:p,keys:J,cache:"immutable"})).then(function(V){var Z=[],q=[],re=k?[]:null,Q=P?J:[];if(!P)for(var ie=0;ie<$;++ie){var H=V[ie],fe={value:Gt(H),primKey:L[O+ie]};v.call(fe,fe.value,fe)!==!1&&(fe.value==null?Q.push(L[O+ie]):k||be(w(H),w(fe.value))===0?(q.push(fe.value),k&&re.push(L[O+ie])):(Q.push(L[O+ie]),Z.push(fe.value)))}return Promise.resolve(0<Z.length&&S.mutate({trans:p,type:"add",values:Z}).then(function(he){for(var ge in he.failures)Q.splice(parseInt(ge),1);y(Z.length,he)})).then(function(){return(0<q.length||K&&typeof s=="object")&&S.mutate({trans:p,type:"put",keys:re,values:q,criteria:K,changeSpec:typeof s!="function"&&s,isAdditionalChunk:0<O}).then(function(he){return y(q.length,he)})}).then(function(){return(0<Q.length||K&&P)&&S.mutate({trans:p,type:"delete",keys:Q,criteria:K,isAdditionalChunk:0<O}).then(function(he){return Cs(f.table,Q,he)}).then(function(he){return y(Q.length,he)})}).then(function(){return L.length>O+$&&F(O+B)})})}var K=ta(f)&&f.limit===1/0&&(typeof s!="function"||P)&&{index:f.index,range:f.range};return F(0).then(function(){if(0<N.length)throw new Ht("Error modifying one or more objects",N,j,G);return L.length})})})},ke.prototype.delete=function(){var s=this._ctx,u=s.range;return!ta(s)||s.table.schema.yProps||!s.isPrimKey&&u.type!==3?this.modify(bf):this._write(function(f){var p=s.table.core.schema.primaryKey,y=u;return s.table.core.count({trans:f,query:{index:p,range:y}}).then(function(v){return s.table.core.mutate({trans:f,type:"deleteRange",range:y}).then(function(w){var k=w.failures,w=w.numFailures;if(w)throw new Ht("Could not delete some values",Object.keys(k).map(function(B){return k[B]}),v-w);return v-w})})})};var Wg=ke;function ke(){}var bf=function(s,u){return u.value=null};function Jg(s,u){return s<u?-1:s===u?0:1}function Hg(s,u){return u<s?-1:s===u?0:1}function It(s,u,f){return s=s instanceof Sf?new s.Collection(s):s,s._ctx.error=new(f||TypeError)(u),s}function na(s){return new s.Collection(s,function(){return Af("")}).limit(0)}function As(G,u,f,p){var y,v,S,k,w,B,T,N=f.length;if(!f.every(function(L){return typeof L=="string"}))return It(G,ff);function j(L){y=L==="next"?function(K){return K.toUpperCase()}:function(K){return K.toLowerCase()},v=L==="next"?function(K){return K.toLowerCase()}:function(K){return K.toUpperCase()},S=L==="next"?Jg:Hg;var F=f.map(function(K){return{lower:v(K),upper:y(K)}}).sort(function(K,O){return S(K.lower,O.lower)});k=F.map(function(K){return K.upper}),w=F.map(function(K){return K.lower}),T=(B=L)==="next"?"":p}j("next");var G=new G.Collection(G,function(){return Un(k[0],w[N-1]+p)}),P=(G._ondirectionchange=function(L){j(L)},0);return G._addAlgorithm(function(L,F,K){var O=L.key;if(typeof O=="string"){var $=v(O);if(u($,w,P))return!0;for(var J=null,V=P;V<N;++V){var Z=((q,re,Q,ie,H,fe)=>{for(var he=Math.min(q.length,ie.length),ge=-1,Me=0;Me<he;++Me){var Ot=re[Me];if(Ot!==ie[Me])return H(q[Me],Q[Me])<0?q.substr(0,Me)+Q[Me]+Q.substr(Me+1):H(q[Me],ie[Me])<0?q.substr(0,Me)+ie[Me]+Q.substr(Me+1):0<=ge?q.substr(0,ge)+re[ge]+Q.substr(ge+1):null;H(q[Me],Ot)<0&&(ge=Me)}return he<ie.length&&fe==="next"?q+Q.substr(q.length):he<q.length&&fe==="prev"?q.substr(0,Q.length):ge<0?null:q.substr(0,ge)+ie[ge]+Q.substr(ge+1)})(O,$,k[V],w[V],S,B);Z===null&&J===null?P=V+1:(J===null||0<S(J,Z))&&(J=Z)}F(J!==null?function(){L.continue(J+T)}:K)}return!1}),G}function Un(s,u,f,p){return{type:2,lower:s,upper:u,lowerOpen:f,upperOpen:p}}function Af(s){return{type:1,lower:s,upper:s}}Object.defineProperty(it.prototype,"Collection",{get:function(){return this._ctx.table.db.Collection},enumerable:!1,configurable:!0}),it.prototype.between=function(s,u,f,p){f=f!==!1,p=p===!0;try{return 0<this._cmp(s,u)||this._cmp(s,u)===0&&(f||p)&&(!f||!p)?na(this):new this.Collection(this,function(){return Un(s,u,!f,!p)})}catch{return It(this,Rn)}},it.prototype.equals=function(s){return s==null?It(this,Rn):new this.Collection(this,function(){return Af(s)})},it.prototype.above=function(s){return s==null?It(this,Rn):new this.Collection(this,function(){return Un(s,void 0,!0)})},it.prototype.aboveOrEqual=function(s){return s==null?It(this,Rn):new this.Collection(this,function(){return Un(s,void 0,!1)})},it.prototype.below=function(s){return s==null?It(this,Rn):new this.Collection(this,function(){return Un(void 0,s,!1,!0)})},it.prototype.belowOrEqual=function(s){return s==null?It(this,Rn):new this.Collection(this,function(){return Un(void 0,s)})},it.prototype.startsWith=function(s){return typeof s!="string"?It(this,ff):this.between(s,s+Rr,!0,!0)},it.prototype.startsWithIgnoreCase=function(s){return s===""?this.startsWith(s):As(this,function(u,f){return u.indexOf(f[0])===0},[s],Rr)},it.prototype.equalsIgnoreCase=function(s){return As(this,function(u,f){return u===f[0]},[s],"")},it.prototype.anyOfIgnoreCase=function(){var s=de.apply(ce,arguments);return s.length===0?na(this):As(this,function(u,f){return f.indexOf(u)!==-1},s,"")},it.prototype.startsWithAnyOfIgnoreCase=function(){var s=de.apply(ce,arguments);return s.length===0?na(this):As(this,function(u,f){return f.some(function(p){return u.indexOf(p)===0})},s,Rr)},it.prototype.anyOf=function(){var s,u,f=this,p=de.apply(ce,arguments),y=this._cmp;try{p.sort(y)}catch{return It(this,Rn)}return p.length===0?na(this):((s=new this.Collection(this,function(){return Un(p[0],p[p.length-1])}))._ondirectionchange=function(v){y=v==="next"?f._ascending:f._descending,p.sort(y)},u=0,s._addAlgorithm(function(v,S,k){for(var w=v.key;0<y(w,p[u]);)if(++u===p.length)return S(k),!1;return y(w,p[u])===0||(S(function(){v.continue(p[u])}),!1)}),s)},it.prototype.notEqual=function(s){return this.inAnyRange([[-1/0,s],[s,this.db._maxKey]],{includeLowers:!1,includeUppers:!1})},it.prototype.noneOf=function(){var s=de.apply(ce,arguments);if(s.length===0)return new this.Collection(this);try{s.sort(this._ascending)}catch{return It(this,Rn)}var u=s.reduce(function(f,p){return f?f.concat([[f[f.length-1][1],p]]):[[-1/0,p]]},null);return u.push([s[s.length-1],this.db._maxKey]),this.inAnyRange(u,{includeLowers:!1,includeUppers:!1})},it.prototype.inAnyRange=function(s,K){var f=this,p=this._cmp,y=this._ascending,v=this._descending,S=this._min,k=this._max;if(s.length===0)return na(this);if(!s.every(function(O){return O[0]!==void 0&&O[1]!==void 0&&y(O[0],O[1])<=0}))return It(this,"First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",ue.InvalidArgument);var w=!K||K.includeLowers!==!1,B=K&&K.includeUppers===!0,T,N=y;function j(O,$){return N(O[0],$[0])}try{(T=s.reduce(function(O,$){for(var J=0,V=O.length;J<V;++J){var Z=O[J];if(p($[0],Z[1])<0&&0<p($[1],Z[0])){Z[0]=S(Z[0],$[0]),Z[1]=k(Z[1],$[1]);break}}return J===V&&O.push($),O},[])).sort(j)}catch{return It(this,Rn)}var G=0,P=B?function(O){return 0<y(O,T[G][1])}:function(O){return 0<=y(O,T[G][1])},L=w?function(O){return 0<v(O,T[G][0])}:function(O){return 0<=v(O,T[G][0])},F=P,K=new this.Collection(this,function(){return Un(T[0][0],T[T.length-1][1],!w,!B)});return K._ondirectionchange=function(O){N=O==="next"?(F=P,y):(F=L,v),T.sort(j)},K._addAlgorithm(function(O,$,J){for(var V,Z=O.key;F(Z);)if(++G===T.length)return $(J),!1;return!P(V=Z)&&!L(V)||(f._cmp(Z,T[G][1])===0||f._cmp(Z,T[G][0])===0||$(function(){N===y?O.continue(T[G][0]):O.continue(T[G][1])}),!1)}),K},it.prototype.startsWithAnyOf=function(){var s=de.apply(ce,arguments);return s.every(function(u){return typeof u=="string"})?s.length===0?na(this):this.inAnyRange(s.map(function(u){return[u,u+Rr]})):It(this,"startsWithAnyOf() only works with strings")};var Sf=it;function it(){}function sn(s){return Oe(function(u){return ni(u),s(u.target.error),!1})}function ni(s){s.stopPropagation&&s.stopPropagation(),s.preventDefault&&s.preventDefault()}var Ss="storagemutated",Fl="x-storagemutated-1",Wn=ei(null,Ss),Vg=(yn.prototype._lock=function(){return _(!le.global),++this._reculock,this._reculock!==1||le.global||(le.lockOwnerFor=this),this},yn.prototype._unlock=function(){if(_(!le.global),--this._reculock==0)for(le.global||(le.lockOwnerFor=null);0<this._blockedFuncs.length&&!this._locked();){var s=this._blockedFuncs.shift();try{kr(s[1],s[0])}catch{}}return this},yn.prototype._locked=function(){return this._reculock&&le.lockOwnerFor!==this},yn.prototype.create=function(s){var u=this;if(this.mode){var f=this.db.idbdb,p=this.db._state.dbOpenError;if(_(!this.idbtrans),!s&&!f)switch(p&&p.name){case"DatabaseClosedError":throw new ue.DatabaseClosed(p);case"MissingAPIError":throw new ue.MissingAPI(p.message,p);default:throw new ue.OpenFailed(p)}if(!this.active)throw new ue.TransactionInactive;_(this._completion._state===null),(s=this.idbtrans=s||(this.db.core||f).transaction(this.storeNames,this.mode,{durability:this.chromeTransactionDurability})).onerror=Oe(function(y){ni(y),u._reject(s.error)}),s.onabort=Oe(function(y){ni(y),u.active&&u._reject(new ue.Abort(s.error)),u.active=!1,u.on("abort").fire(y)}),s.oncomplete=Oe(function(){u.active=!1,u._resolve(),"mutatedParts"in s&&Wn.storagemutated.fire(s.mutatedParts)})}return this},yn.prototype._promise=function(s,u,f){var p,y=this;return s==="readwrite"&&this.mode!=="readwrite"?Ve(new ue.ReadOnly("Transaction is readonly")):this.active?this._locked()?new te(function(v,S){y._blockedFuncs.push([function(){y._promise(s,u,f).then(v,S)},le])}):f?Kn(function(){var v=new te(function(S,k){y._lock();var w=u(S,k,y);w&&w.then&&w.then(S,k)});return v.finally(function(){return y._unlock()}),v._lib=!0,v}):((p=new te(function(v,S){var k=u(v,S,y);k&&k.then&&k.then(v,S)}))._lib=!0,p):Ve(new ue.TransactionInactive)},yn.prototype._root=function(){return this.parent?this.parent._root():this},yn.prototype.waitFor=function(s){var u,f=this._root(),p=te.resolve(s),y=(f._waitingFor?f._waitingFor=f._waitingFor.then(function(){return p}):(f._waitingFor=p,f._waitingQueue=[],u=f.idbtrans.objectStore(f.storeNames[0]),function v(){for(++f._spinCount;f._waitingQueue.length;)f._waitingQueue.shift()();f._waitingFor&&(u.get(-1/0).onsuccess=v)}()),f._waitingFor);return new te(function(v,S){p.then(function(k){return f._waitingQueue.push(Oe(v.bind(null,k)))},function(k){return f._waitingQueue.push(Oe(S.bind(null,k)))}).finally(function(){f._waitingFor===y&&(f._waitingFor=null)})})},yn.prototype.abort=function(){this.active&&(this.active=!1,this.idbtrans&&this.idbtrans.abort(),this._reject(new ue.Abort))},yn.prototype.table=function(s){var u=this._memoizedTables||(this._memoizedTables={});if(m(u,s))return u[s];var f=this.schema[s];if(f)return(f=new this.db.Table(s,f,this)).core=this.db.core.table(s),u[s]=f;throw new ue.NotFound("Table "+s+" not part of transaction")},yn);function yn(){}function Gl(s,u,f,p,y,v,S,k){return{name:s,keyPath:u,unique:f,multi:p,auto:y,compound:v,src:(f&&!S?"&":"")+(p?"*":"")+(y?"++":"")+kf(u),type:k}}function kf(s){return typeof s=="string"?s:s?"["+[].join.call(s,"+")+"]":""}function Bl(s,u,f){return{name:s,primKey:u,indexes:f,mappedClass:null,idxByName:(p=function(y){return[y.name,y]},f.reduce(function(y,v,S){return v=p(v,S),v&&(y[v[0]]=v[1]),y},{}))};var p}var ri=function(s){try{return s.only([[]]),ri=function(){return[[]]},[[]]}catch{return ri=function(){return Rr},Rr}};function Il(s){return s==null?function(){}:typeof s=="string"?(u=s).split(".").length===1?function(f){return f[u]}:function(f){return X(f,u)}:function(f){return X(f,s)};var u}function Rf(s){return[].slice.call(s)}var qg=0;function ai(s){return s==null?":id":typeof s=="string"?s:"[".concat(s.join("+"),"]")}function Yg(s,u,S){function p(F){if(F.type===3)return null;if(F.type===4)throw new Error("Cannot convert never type to IDBKeyRange");var G=F.lower,P=F.upper,L=F.lowerOpen,F=F.upperOpen;return G===void 0?P===void 0?null:u.upperBound(P,!!F):P===void 0?u.lowerBound(G,!!L):u.bound(G,P,!!L,!!F)}function y(j){var G,P,L=j.name;return{name:L,schema:j,mutate:function(F){var K=F.trans,O=F.type,$=F.keys,J=F.values,V=F.range;return new Promise(function(Z,q){Z=Oe(Z);var re=K.objectStore(L),Q=re.keyPath==null,ie=O==="put"||O==="add";if(!ie&&O!=="delete"&&O!=="deleteRange")throw new Error("Invalid operation type: "+O);var H,fe=($||J||{length:1}).length;if($&&J&&$.length!==J.length)throw new Error("Given keys array must have same length as given values array.");if(fe===0)return Z({numFailures:0,failures:{},results:[],lastResult:void 0});function he(bt){++Ot,ni(bt)}var ge=[],Me=[],Ot=0;if(O==="deleteRange"){if(V.type===4)return Z({numFailures:Ot,failures:Me,results:[],lastResult:void 0});V.type===3?ge.push(H=re.clear()):ge.push(H=re.delete(p(V)))}else{var Q=ie?Q?[J,$]:[J,null]:[$,null],pe=Q[0],mt=Q[1];if(ie)for(var gt=0;gt<fe;++gt)ge.push(H=mt&&mt[gt]!==void 0?re[O](pe[gt],mt[gt]):re[O](pe[gt])),H.onerror=he;else for(gt=0;gt<fe;++gt)ge.push(H=re[O](pe[gt])),H.onerror=he}function Gs(bt){bt=bt.target.result,ge.forEach(function(wr,nu){return wr.error!=null&&(Me[nu]=wr.error)}),Z({numFailures:Ot,failures:Me,results:O==="delete"?$:ge.map(function(wr){return wr.result}),lastResult:bt})}H.onerror=function(bt){he(bt),Gs(bt)},H.onsuccess=Gs})},getMany:function(F){var K=F.trans,O=F.keys;return new Promise(function($,J){$=Oe($);for(var V,Z=K.objectStore(L),q=O.length,re=new Array(q),Q=0,ie=0,H=function(ge){ge=ge.target,re[ge._pos]=ge.result,++ie===Q&&$(re)},fe=sn(J),he=0;he<q;++he)O[he]!=null&&((V=Z.get(O[he]))._pos=he,V.onsuccess=H,V.onerror=fe,++Q);Q===0&&$(re)})},get:function(F){var K=F.trans,O=F.key;return new Promise(function($,J){$=Oe($);var V=K.objectStore(L).get(O);V.onsuccess=function(Z){return $(Z.target.result)},V.onerror=sn(J)})},query:(G=w,P=B,function(F){return new Promise(function(K,O){K=Oe(K);var $,J,V,Z,fe=F.trans,q=F.values,re=F.limit,H=F.query,Q=(Q=F.direction)!=null?Q:"next",ie=re===1/0?void 0:re,he=H.index,H=H.range,fe=fe.objectStore(L),fe=he.isPrimaryKey?fe:fe.index(he.name),he=p(H);if(re===0)return K({result:[]});P?(H={query:he,count:ie,direction:Q},($=q?fe.getAll(H):fe.getAllKeys(H)).onsuccess=function(ge){return K({result:ge.target.result})},$.onerror=sn(O)):G&&Q==="next"?(($=q?fe.getAll(he,ie):fe.getAllKeys(he,ie)).onsuccess=function(ge){return K({result:ge.target.result})},$.onerror=sn(O)):(J=0,V=!q&&"openKeyCursor"in fe?fe.openKeyCursor(he,Q):fe.openCursor(he,Q),Z=[],V.onsuccess=function(){var ge=V.result;return!ge||(Z.push(q?ge.value:ge.primaryKey),++J===re)?K({result:Z}):void ge.continue()},V.onerror=sn(O))})}),openCursor:function(F){var K=F.trans,O=F.values,$=F.query,J=F.reverse,V=F.unique;return new Promise(function(Z,q){Z=Oe(Z);var ie=$.index,re=$.range,Q=K.objectStore(L),Q=ie.isPrimaryKey?Q:Q.index(ie.name),ie=J?V?"prevunique":"prev":V?"nextunique":"next",H=!O&&"openKeyCursor"in Q?Q.openKeyCursor(p(re),ie):Q.openCursor(p(re),ie);H.onerror=sn(q),H.onsuccess=Oe(function(fe){var he,ge,Me,Ot,pe=H.result;pe?(pe.___id=++qg,pe.done=!1,he=pe.continue.bind(pe),ge=(ge=pe.continuePrimaryKey)&&ge.bind(pe),Me=pe.advance.bind(pe),Ot=function(){throw new Error("Cursor not stopped")},pe.trans=K,pe.stop=pe.continue=pe.continuePrimaryKey=pe.advance=function(){throw new Error("Cursor not started")},pe.fail=Oe(q),pe.next=function(){var mt=this,gt=1;return this.start(function(){return gt--?mt.continue():mt.stop()}).then(function(){return mt})},pe.start=function(mt){function gt(){if(H.result)try{mt()}catch(bt){pe.fail(bt)}else pe.done=!0,pe.start=function(){throw new Error("Cursor behind last entry")},pe.stop()}var Gs=new Promise(function(bt,wr){bt=Oe(bt),H.onerror=sn(wr),pe.fail=wr,pe.stop=function(nu){pe.stop=pe.continue=pe.continuePrimaryKey=pe.advance=Ot,bt(nu)}});return H.onsuccess=Oe(function(bt){H.onsuccess=gt,gt()}),pe.continue=he,pe.continuePrimaryKey=ge,pe.advance=Me,gt(),Gs},Z(pe)):Z(null)},q)})},count:function(F){var K=F.query,O=F.trans,$=K.index,J=K.range;return new Promise(function(V,Z){var q=O.objectStore(L),q=$.isPrimaryKey?q:q.index($.name),re=p(J),re=re?q.count(re):q.count();re.onsuccess=Oe(function(Q){return V(Q.target.result)}),re.onerror=sn(Z)})}}}v=S,k=Rf((S=s).objectStoreNames),T=0<k.length?v.objectStore(k[0]):{};var v,S={schema:{name:S.name,tables:k.map(function(j){return v.objectStore(j)}).map(function(j){var G=j.keyPath,P=j.autoIncrement,F=d(G),L={},F={name:j.name,primaryKey:{name:null,isPrimaryKey:!0,outbound:G==null,compound:F,keyPath:G,autoIncrement:P,unique:!0,extractKey:Il(G)},indexes:Rf(j.indexNames).map(function(K){return j.index(K)}).map(function(J){var V=J.name,O=J.unique,$=J.multiEntry,J=J.keyPath,V={name:V,compound:d(J),keyPath:J,unique:O,multiEntry:$,extractKey:Il(J)};return L[ai(J)]=V}),getIndexByKeyPath:function(K){return L[ai(K)]}};return L[":id"]=F.primaryKey,G!=null&&(L[ai(G)]=F.primaryKey),F})},hasGetAll:0<k.length&&"getAll"in T&&!(typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604),hasIdb3Features:"getAllRecords"in T},k=S.schema,w=S.hasGetAll,B=S.hasIdb3Features,T=k.tables.map(y),N={};return T.forEach(function(j){return N[j.name]=j}),{stack:"dbcore",transaction:s.transaction.bind(s),table:function(j){if(N[j])return N[j];throw new Error("Table '".concat(j,"' not found"))},MIN_KEY:-1/0,MAX_KEY:ri(u),schema:k}}function Qg(s,u,f,p){return f=f.IDBKeyRange,u=Yg(u,f,p),{dbcore:s.dbcore.reduce(function(y,v){return v=v.create,r(r({},y),v(y))},u)}}function ks(s,u){var f=u.db,f=Qg(s._middlewares,f,s._deps,u);s.core=f.dbcore,s.tables.forEach(function(p){var y=p.name;s.core.schema.tables.some(function(v){return v.name===y})&&(p.core=s.core.table(y),s[y]instanceof s.Table)&&(s[y].core=p.core)})}function Rs(s,u,f,p){f.forEach(function(y){var v=p[y];u.forEach(function(S){var k=function w(B,T){return E(B,T)||(B=h(B))&&w(B,T)}(S,y);(!k||"value"in k&&k.value===void 0)&&(S===s.Transaction.prototype||S instanceof s.Transaction?b(S,y,{get:function(){return this.table(y)},set:function(w){C(this,y,{value:w,writable:!0,configurable:!0,enumerable:!0})}}):S[y]=new s.Table(y,v))})})}function Ol(s,u){u.forEach(function(f){for(var p in f)f[p]instanceof s.Table&&delete f[p]})}function Zg(s,u){return s._cfg.version-u._cfg.version}function Xg(s,u,f,p){var y=s._dbSchema,v=(f.objectStoreNames.contains("$meta")&&!y.$meta&&(y.$meta=Bl("$meta",Df("")[0],[]),s._storeNames.push("$meta")),s._createTransaction("readwrite",s._storeNames,y)),S=(v.create(f),v._completion.catch(p),v._reject.bind(v)),k=le.transless||le;Kn(function(){if(le.trans=v,le.transless=k,u!==0)return ks(s,f),B=u,((w=v).storeNames.includes("$meta")?w.table("$meta").get("version").then(function(T){return T??B}):te.resolve(B)).then(function(F){var N=s,j=F,G=v,P=f,L=[],F=N._versions,K=N._dbSchema=Ds(0,N.idbdb,P);return(F=F.filter(function(O){return O._cfg.version>=j})).length===0?te.resolve():(F.forEach(function(O){L.push(function(){var $,J,V,Z=K,q=O._cfg.dbschema,re=(Ns(N,Z,P),Ns(N,q,P),K=N._dbSchema=q,_l(Z,q)),Q=(re.add.forEach(function(ie){Kl(P,ie[0],ie[1].primKey,ie[1].indexes)}),re.change.forEach(function(ie){if(ie.recreate)throw new ue.Upgrade("Not yet support for changing primary key");var H=P.objectStore(ie.name);ie.add.forEach(function(fe){return Es(H,fe)}),ie.change.forEach(function(fe){H.deleteIndex(fe.name),Es(H,fe)}),ie.del.forEach(function(fe){return H.deleteIndex(fe)})}),O._cfg.contentUpgrade);if(Q&&O._cfg.version>j)return ks(N,P),G._memoizedTables={},$=se(q),re.del.forEach(function(ie){$[ie]=Z[ie]}),Ol(N,[N.Transaction.prototype]),Rs(N,[N.Transaction.prototype],l($),$),G.schema=$,(J=Fe(Q))&&ea(),q=te.follow(function(){var ie;(V=Q(G))&&J&&(ie=zn.bind(null,null),V.then(ie,ie))}),V&&typeof V.then=="function"?te.resolve(V):q.then(function(){return V})}),L.push(function($){var J,V,Z=O._cfg.dbschema;J=Z,V=$,[].slice.call(V.db.objectStoreNames).forEach(function(q){return J[q]==null&&V.db.deleteObjectStore(q)}),Ol(N,[N.Transaction.prototype]),Rs(N,[N.Transaction.prototype],N._storeNames,N._dbSchema),G.schema=N._dbSchema}),L.push(function($){N.idbdb.objectStoreNames.contains("$meta")&&(Math.ceil(N.idbdb.version/10)===O._cfg.version?(N.idbdb.deleteObjectStore("$meta"),delete N._dbSchema.$meta,N._storeNames=N._storeNames.filter(function(J){return J!=="$meta"})):$.objectStore("$meta").put(O._cfg.version,"version"))})}),function O(){return L.length?te.resolve(L.shift()(G.idbtrans)).then(O):te.resolve()}().then(function(){Ef(K,P)}))}).catch(S);var w,B;l(y).forEach(function(T){Kl(f,T,y[T].primKey,y[T].indexes)}),ks(s,f),te.follow(function(){return s.on.populate.fire(v)}).catch(S)})}function ey(s,u){Ef(s._dbSchema,u),u.db.version%10!=0||u.objectStoreNames.contains("$meta")||u.db.createObjectStore("$meta").add(Math.ceil(u.db.version/10-1),"version");var f=Ds(0,s.idbdb,u);Ns(s,s._dbSchema,u);for(var p=0,y=_l(f,s._dbSchema).change;p<y.length;p++){var v=(S=>{if(S.change.length||S.recreate)return console.warn("Unable to patch indexes of table ".concat(S.name," because it has changes on the type of index or primary key.")),{value:void 0};var k=u.objectStore(S.name);S.add.forEach(function(w){gn&&console.debug("Dexie upgrade patch: Creating missing index ".concat(S.name,".").concat(w.src)),Es(k,w)})})(y[p]);if(typeof v=="object")return v.value}}function _l(s,u){var f,p={del:[],add:[],change:[]};for(f in s)u[f]||p.del.push(f);for(f in u){var y=s[f],v=u[f];if(y){var S={name:f,def:v,recreate:!1,del:[],add:[],change:[]};if(""+(y.primKey.keyPath||"")!=""+(v.primKey.keyPath||"")||y.primKey.auto!==v.primKey.auto)S.recreate=!0,p.change.push(S);else{var k=y.idxByName,w=v.idxByName,B=void 0;for(B in k)w[B]||S.del.push(B);for(B in w){var T=k[B],N=w[B];T?T.src!==N.src&&S.change.push(N):S.add.push(N)}(0<S.del.length||0<S.add.length||0<S.change.length)&&p.change.push(S)}}else p.add.push([f,v])}return p}function Kl(s,u,f,p){var y=s.db.createObjectStore(u,f.keyPath?{keyPath:f.keyPath,autoIncrement:f.auto}:{autoIncrement:f.auto});p.forEach(function(v){return Es(y,v)})}function Ef(s,u){l(s).forEach(function(f){u.db.objectStoreNames.contains(f)||(gn&&console.debug("Dexie: Creating missing table",f),Kl(u,f,s[f].primKey,s[f].indexes))})}function Es(s,u){s.createIndex(u.name,u.keyPath,{unique:u.unique,multiEntry:u.multi})}function Ds(s,u,f){var p={};return A(u.objectStoreNames,0).forEach(function(y){for(var v=f.objectStore(y),S=Gl(kf(B=v.keyPath),B||"",!0,!1,!!v.autoIncrement,B&&typeof B!="string",!0),k=[],w=0;w<v.indexNames.length;++w){var T=v.index(v.indexNames[w]),B=T.keyPath,T=Gl(T.name,B,!!T.unique,!!T.multiEntry,!1,B&&typeof B!="string",!1);k.push(T)}p[y]=Bl(y,S,k)}),p}function Ns(s,u,f){for(var p=f.db.objectStoreNames,y=0;y<p.length;++y){var v=p[y],S=f.objectStore(v);s._hasGetAll="getAll"in S;for(var k=0;k<S.indexNames.length;++k){var w,B=S.indexNames[k],T=S.index(B).keyPath,T=typeof T=="string"?T:"["+A(T).join("+")+"]";u[v]&&(w=u[v].idxByName[T])&&(w.name=B,delete u[v].idxByName[T],u[v].idxByName[B]=w)}}typeof navigator<"u"&&/Safari/.test(navigator.userAgent)&&!/(Chrome\/|Edge\/)/.test(navigator.userAgent)&&i.WorkerGlobalScope&&i instanceof i.WorkerGlobalScope&&[].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1]<604&&(s._hasGetAll=!1)}function Df(s){return s.split(",").map(function(u,f){var y=u.split(":"),p=(p=y[1])==null?void 0:p.trim(),y=(u=y[0].trim()).replace(/([&*]|\+\+)/g,""),v=/^\[/.test(y)?y.match(/^\[(.*)\]$/)[1].split("+"):y;return Gl(y,v||null,/\&/.test(u),/\*/.test(u),/\+\+/.test(u),d(v),f===0,p)})}ra.prototype._createTableSchema=Bl,ra.prototype._parseIndexSyntax=Df,ra.prototype._parseStoresSpec=function(s,u){var f=this;l(s).forEach(function(p){if(s[p]!==null){var y=f._parseIndexSyntax(s[p]),v=y.shift();if(!v)throw new ue.Schema("Invalid schema for table "+p+": "+s[p]);if(v.unique=!0,v.multi)throw new ue.Schema("Primary key cannot be multiEntry*");y.forEach(function(S){if(S.auto)throw new ue.Schema("Only primary key can be marked as autoIncrement (++)");if(!S.keyPath)throw new ue.Schema("Index must have a name and cannot be an empty string")}),v=f._createTableSchema(p,v,y),u[p]=v}})},ra.prototype.stores=function(f){var u=this.db,f=(this._cfg.storesSource=this._cfg.storesSource?c(this._cfg.storesSource,f):f,u._versions),p={},y={};return f.forEach(function(v){c(p,v._cfg.storesSource),y=v._cfg.dbschema={},v._parseStoresSpec(p,y)}),u._dbSchema=y,Ol(u,[u._allTables,u,u.Transaction.prototype]),Rs(u,[u._allTables,u,u.Transaction.prototype,this._cfg.tables],l(y),y),u._storeNames=l(y),this},ra.prototype.upgrade=function(s){return this._cfg.contentUpgrade=bl(this._cfg.contentUpgrade||Ne,s),this};var ty=ra;function ra(){}var ii=(()=>{var s,u,f;return typeof FinalizationRegistry<"u"&&typeof WeakRef<"u"?(s=new Set,u=new FinalizationRegistry(function(p){s.delete(p)}),{toArray:function(){return Array.from(s).map(function(p){return p.deref()}).filter(function(p){return p!==void 0})},add:function(p){var y=new WeakRef(p._novip);s.add(y),u.register(p._novip,y,y),s.size>p._options.maxConnections&&(y=s.values().next().value,s.delete(y),u.unregister(y))},remove:function(p){if(p)for(var y=s.values(),v=y.next();!v.done;){var S=v.value;if(S.deref()===p._novip)return s.delete(S),void u.unregister(S);v=y.next()}}}):(f=[],{toArray:function(){return f},add:function(p){f.push(p._novip)},remove:function(p){p&&(p=f.indexOf(p._novip))!==-1&&f.splice(p,1)}})})();function zl(s,u){var f=s._dbNamesDB;return f||(f=s._dbNamesDB=new En(vs,{addons:[],indexedDB:s,IDBKeyRange:u})).version(1).stores({dbnames:"name"}),f.table("dbnames")}function $l(s){return s&&typeof s.databases=="function"}function Ul(s){return Kn(function(){return le.letThrough=!0,s()})}function Wl(s){return!("from"in s)}var pt=function(s,u){var f;if(!this)return f=new pt,s&&"d"in s&&c(f,s),f;c(this,arguments.length?{d:1,from:s,to:1<arguments.length?u:s}:{d:0})};function si(s,u,f){var p=be(u,f);if(!isNaN(p)){if(0<p)throw RangeError();if(Wl(s))return c(s,{from:u,to:f,d:1});var p=s.l,y=s.r;if(be(f,s.from)<0)return p?si(p,u,f):s.l={from:u,to:f,d:1,l:null,r:null},wf(s);if(0<be(u,s.to))return y?si(y,u,f):s.r={from:u,to:f,d:1,l:null,r:null},wf(s);be(u,s.from)<0&&(s.from=u,s.l=null,s.d=y?y.d+1:1),0<be(f,s.to)&&(s.to=f,s.r=null,s.d=s.l?s.l.d+1:1),u=!s.r,p&&!s.l&&oi(s,p),y&&u&&oi(s,y)}}function oi(s,u){Wl(u)||function f(p,y){var v=y.from,S=y.l,k=y.r;si(p,v,y.to),S&&f(p,S),k&&f(p,k)}(s,u)}function Nf(s,u){var f=ws(u),p=f.next();if(!p.done)for(var y=p.value,v=ws(s),S=v.next(y.from),k=S.value;!p.done&&!S.done;){if(be(k.from,y.to)<=0&&0<=be(k.to,y.from))return!0;be(y.from,k.from)<0?y=(p=f.next(k.from)).value:k=(S=v.next(y.from)).value}return!1}function ws(s){var u=Wl(s)?null:{s:0,n:s};return{next:function(f){for(var p=0<arguments.length;u;)switch(u.s){case 0:if(u.s=1,p)for(;u.n.l&&be(f,u.n.from)<0;)u={up:u,n:u.n.l,s:1};else for(;u.n.l;)u={up:u,n:u.n.l,s:1};case 1:if(u.s=2,!p||be(f,u.n.to)<=0)return{value:u.n,done:!1};case 2:if(u.n.r){u.s=3,u={up:u,n:u.n.r,s:0};continue}case 3:u=u.up}return{done:!0}}}}function wf(s){var u,f,p,y=(((y=s.r)==null?void 0:y.d)||0)-(((y=s.l)==null?void 0:y.d)||0),y=1<y?"r":y<-1?"l":"";y&&(u=y=="r"?"l":"r",f=r({},s),p=s[y],s.from=p.from,s.to=p.to,s[y]=p[y],f[y]=p[u],(s[u]=f).d=jf(f)),s.d=jf(s)}function jf(f){var u=f.r,f=f.l;return(u?f?Math.max(u.d,f.d):u.d:f?f.d:0)+1}function js(s,u){return l(u).forEach(function(f){s[f]?oi(s[f],u[f]):s[f]=function p(y){var v,S,k={};for(v in y)m(y,v)&&(S=y[v],k[v]=!S||typeof S!="object"||ht.has(S.constructor)?S:p(S));return k}(u[f])}),s}function Jl(s,u){return s.all||u.all||Object.keys(s).some(function(f){return u[f]&&Nf(u[f],s[f])})}x(pt.prototype,((Bt={add:function(s){return oi(this,s),this},addKey:function(s){return si(this,s,s),this},addKeys:function(s){var u=this;return s.forEach(function(f){return si(u,f,f)}),this},hasKey:function(s){var u=ws(this).next(s).value;return u&&be(u.from,s)<=0&&0<=be(u.to,s)}})[Cr]=function(){return ws(this)},Bt));var Dr={},Hl={},Vl=!1;function Ts(s){js(Hl,s),Vl||(Vl=!0,setTimeout(function(){Vl=!1,ql(Hl,!(Hl={}))},0))}function ql(s,u){u===void 0&&(u=!1);var f=new Set;if(s.all)for(var p=0,y=Object.values(Dr);p<y.length;p++)Tf(k=y[p],s,f,u);else for(var v in s){var S,k,v=/^idb\:\/\/(.*)\/(.*)\//.exec(v);v&&(S=v[1],v=v[2],k=Dr["idb://".concat(S,"/").concat(v)])&&Tf(k,s,f,u)}f.forEach(function(w){return w()})}function Tf(s,u,f,p){for(var y=[],v=0,S=Object.entries(s.queries.query);v<S.length;v++){for(var k=S[v],w=k[0],B=[],T=0,N=k[1];T<N.length;T++){var j=N[T];Jl(u,j.obsSet)?j.subscribers.forEach(function(F){return f.add(F)}):p&&B.push(j)}p&&y.push([w,B])}if(p)for(var G=0,P=y;G<P.length;G++){var L=P[G],w=L[0],B=L[1];s.queries.query[w]=B}}function ny(s){var u=s._state,f=s._deps.indexedDB;if(u.isBeingOpened||s.idbdb)return u.dbReadyPromise.then(function(){return u.dbOpenError?Ve(u.dbOpenError):s});u.isBeingOpened=!0,u.dbOpenError=null,u.openComplete=!1;var p=u.openCanceller,y=Math.round(10*s.verno),v=!1;function S(){if(u.openCanceller!==p)throw new ue.DatabaseClosed("db.open() was cancelled")}function k(){return new te(function(j,G){if(S(),!f)throw new ue.MissingAPI;var P=s.name,L=u.autoSchema||!y?f.open(P):f.open(P,y);if(!L)throw new ue.MissingAPI;L.onerror=sn(G),L.onblocked=Oe(s._fireOnBlocked),L.onupgradeneeded=Oe(function(F){var K;T=L.transaction,u.autoSchema&&!s._options.allowEmptyDB?(L.onerror=ni,T.abort(),L.result.close(),(K=f.deleteDatabase(P)).onsuccess=K.onerror=Oe(function(){G(new ue.NoSuchDatabase("Database ".concat(P," doesnt exist")))})):(T.onerror=sn(G),K=F.oldVersion>Math.pow(2,62)?0:F.oldVersion,N=K<1,s.idbdb=L.result,v&&ey(s,T),Xg(s,K/10,T,G))},G),L.onsuccess=Oe(function(){T=null;var F,K,O,$,J,V,Z=s.idbdb=L.result,q=A(Z.objectStoreNames);if(0<q.length)try{var re=Z.transaction((J=q).length===1?J[0]:J,"readonly");if(u.autoSchema)V=Z,$=re,(O=s).verno=V.version/10,$=O._dbSchema=Ds(0,V,$),O._storeNames=A(V.objectStoreNames,0),Rs(O,[O._allTables],l($),$);else if(Ns(s,s._dbSchema,re),K=re,((K=_l(Ds(0,(F=s).idbdb,K),F._dbSchema)).add.length||K.change.some(function(Q){return Q.add.length||Q.change.length}))&&!v)return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."),Z.close(),y=Z.version+1,v=!0,j(k());ks(s,re)}catch{}ii.add(s),Z.onversionchange=Oe(function(Q){u.vcFired=!0,s.on("versionchange").fire(Q)}),Z.onclose=Oe(function(){s.close({disableAutoOpen:!1})}),N&&(q=s._deps,J=P,$l(V=q.indexedDB)||J===vs||zl(V,q.IDBKeyRange).put({name:J}).catch(Ne)),j()},G)}).catch(function(j){switch(j==null?void 0:j.name){case"UnknownError":if(0<u.PR1398_maxLoop)return u.PR1398_maxLoop--,console.warn("Dexie: Workaround for Chrome UnknownError on open()"),k();break;case"VersionError":if(0<y)return y=0,k()}return te.reject(j)})}var w,B=u.dbReadyResolve,T=null,N=!1;return te.race([p,(typeof navigator>"u"?te.resolve():!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise(function(j){function G(){return indexedDB.databases().finally(j)}w=setInterval(G,100),G()}).finally(function(){return clearInterval(w)}):Promise.resolve()).then(k)]).then(function(){return S(),u.onReadyBeingFired=[],te.resolve(Ul(function(){return s.on.ready.fire(s.vip)})).then(function j(){var G;if(0<u.onReadyBeingFired.length)return G=u.onReadyBeingFired.reduce(bl,Ne),u.onReadyBeingFired=[],te.resolve(Ul(function(){return G(s.vip)})).then(j)})}).finally(function(){u.openCanceller===p&&(u.onReadyBeingFired=null,u.isBeingOpened=!1)}).catch(function(j){u.dbOpenError=j;try{T&&T.abort()}catch{}return p===u.openCanceller&&s._close(),Ve(j)}).finally(function(){u.openComplete=!0,B()}).then(function(){var j;return N&&(j={},s.tables.forEach(function(G){G.schema.indexes.forEach(function(P){P.name&&(j["idb://".concat(s.name,"/").concat(G.name,"/").concat(P.name)]=new pt(-1/0,[[[]]]))}),j["idb://".concat(s.name,"/").concat(G.name,"/")]=j["idb://".concat(s.name,"/").concat(G.name,"/:dels")]=new pt(-1/0,[[[]]])}),Wn(Ss).fire(j),ql(j,!0)),s})}function Yl(s){function u(v){return s.next(v)}var f=y(u),p=y(function(v){return s.throw(v)});function y(v){return function(k){var k=v(k),w=k.value;return k.done?w:w&&typeof w.then=="function"?w.then(f,p):d(w)?Promise.all(w).then(f,p):f(w)}}return y(u)()}function Ls(s,u,f){for(var p=d(s)?s.slice():[s],y=0;y<f;++y)p.push(u);return p}var ry={stack:"dbcore",name:"VirtualIndexMiddleware",level:1,create:function(s){return r(r({},s),{table:function(p){var f=s.table(p),p=f.schema,y=Object.create(null),v=[];function S(j,G,P){var O=ai(j),L=y[O]=y[O]||[],F=j==null?0:typeof j=="string"?1:j.length,K=0<G,O=r(r({},P),{name:K?"".concat(O,"(virtual-from:").concat(P.name,")"):P.name,lowLevelIndex:P,isVirtual:K,keyTail:G,keyLength:F,extractKey:Il(j),unique:!K&&P.unique});return L.push(O),O.isPrimaryKey||v.push(O),1<F&&S(F===2?j[0]:j.slice(0,F-1),G+1,P),L.sort(function($,J){return $.keyTail-J.keyTail}),O}var k=S(p.primaryKey.keyPath,0,p.primaryKey);y[":id"]=[k];for(var w=0,B=p.indexes;w<B.length;w++){var T=B[w];S(T.keyPath,0,T)}function N(j){var G,P=j.query.index;return P.isVirtual?r(r({},j),{query:{index:P.lowLevelIndex,range:(G=j.query.range,P=P.keyTail,{type:G.type===1?2:G.type,lower:Ls(G.lower,G.lowerOpen?s.MAX_KEY:s.MIN_KEY,P),lowerOpen:!0,upper:Ls(G.upper,G.upperOpen?s.MIN_KEY:s.MAX_KEY,P),upperOpen:!0})}}):j}return r(r({},f),{schema:r(r({},p),{primaryKey:k,indexes:v,getIndexByKeyPath:function(j){return(j=y[ai(j)])&&j[0]}}),count:function(j){return f.count(N(j))},query:function(j){return f.query(N(j))},openCursor:function(j){var G=j.query.index,P=G.keyTail,L=G.keyLength;return G.isVirtual?f.openCursor(N(j)).then(function(K){return K&&F(K)}):f.openCursor(j);function F(K){return Object.create(K,{continue:{value:function(O){O!=null?K.continue(Ls(O,j.reverse?s.MAX_KEY:s.MIN_KEY,P)):j.unique?K.continue(K.key.slice(0,L).concat(j.reverse?s.MIN_KEY:s.MAX_KEY,P)):K.continue()}},continuePrimaryKey:{value:function(O,$){K.continuePrimaryKey(Ls(O,s.MAX_KEY,P),$)}},primaryKey:{get:function(){return K.primaryKey}},key:{get:function(){var O=K.key;return L===1?O[0]:O.slice(0,L)}},value:{get:function(){return K.value}}})}}})}})}};function Ql(s,u,f,p){return f=f||{},p=p||"",l(s).forEach(function(y){var v,S,k;m(u,y)?(v=s[y],S=u[y],typeof v=="object"&&typeof S=="object"&&v&&S?(k=Ja(v))!==Ja(S)?f[p+y]=u[y]:k==="Object"?Ql(v,S,f,p+y+"."):v!==S&&(f[p+y]=u[y]):v!==S&&(f[p+y]=u[y])):f[p+y]=void 0}),l(u).forEach(function(y){m(s,y)||(f[p+y]=u[y])}),f}function Zl(s,u){return u.type==="delete"?u.keys:u.keys||u.values.map(s.extractKey)}var ay={stack:"dbcore",name:"HooksMiddleware",level:2,create:function(s){return r(r({},s),{table:function(u){var f=s.table(u),p=f.schema.primaryKey;return r(r({},f),{mutate:function(y){var v=le.trans,S=v.table(u).hook,k=S.deleting,w=S.creating,B=S.updating;switch(y.type){case"add":if(w.fire===Ne)break;return v._promise("readwrite",function(){return T(y)},!0);case"put":if(w.fire===Ne&&B.fire===Ne)break;return v._promise("readwrite",function(){return T(y)},!0);case"delete":if(k.fire===Ne)break;return v._promise("readwrite",function(){return T(y)},!0);case"deleteRange":if(k.fire===Ne)break;return v._promise("readwrite",function(){return function N(j,G,P){return f.query({trans:j,values:!1,query:{index:p,range:G},limit:P}).then(function(L){var F=L.result;return T({type:"delete",keys:F,trans:j}).then(function(K){return 0<K.numFailures?Promise.reject(K.failures[0]):F.length<P?{failures:[],numFailures:0,lastResult:void 0}:N(j,r(r({},G),{lower:F[F.length-1],lowerOpen:!0}),P)})})}(y.trans,y.range,1e4)},!0)}return f.mutate(y);function T(N){var j,G,P,L=le.trans,F=N.keys||Zl(p,N);if(F)return(N=N.type==="add"||N.type==="put"?r(r({},N),{keys:F}):r({},N)).type!=="delete"&&(N.values=a([],N.values)),N.keys&&(N.keys=a([],N.keys)),j=f,P=F,((G=N).type==="add"?Promise.resolve([]):j.getMany({trans:G.trans,keys:P,cache:"immutable"})).then(function(K){var O=F.map(function($,J){var V,Z,q,re=K[J],Q={onerror:null,onsuccess:null};return N.type==="delete"?k.fire.call(Q,$,re,L):N.type==="add"||re===void 0?(V=w.fire.call(Q,$,N.values[J],L),$==null&&V!=null&&(N.keys[J]=$=V,p.outbound||ee(N.values[J],p.keyPath,$))):(V=Ql(re,N.values[J]),(Z=B.fire.call(Q,V,$,re,L))&&(q=N.values[J],Object.keys(Z).forEach(function(ie){m(q,ie)?q[ie]=Z[ie]:ee(q,ie,Z[ie])}))),Q});return f.mutate(N).then(function($){for(var J=$.failures,V=$.results,Z=$.numFailures,$=$.lastResult,q=0;q<F.length;++q){var re=(V||F)[q],Q=O[q];re==null?Q.onerror&&Q.onerror(J[q]):Q.onsuccess&&Q.onsuccess(N.type==="put"&&K[q]?N.values[q]:re)}return{failures:J,results:V,numFailures:Z,lastResult:$}}).catch(function($){return O.forEach(function(J){return J.onerror&&J.onerror($)}),Promise.reject($)})});throw new Error("Keys missing")}}})}})}};function Lf(s,u,f){try{if(!u||u.keys.length<s.length)return null;for(var p=[],y=0,v=0;y<u.keys.length&&v<s.length;++y)be(u.keys[y],s[v])===0&&(p.push(f?Gt(u.values[y]):u.values[y]),++v);return p.length===s.length?p:null}catch{return null}}var iy={stack:"dbcore",level:-1,create:function(s){return{table:function(u){var f=s.table(u);return r(r({},f),{getMany:function(p){var y;return p.cache?(y=Lf(p.keys,p.trans._cache,p.cache==="clone"))?te.resolve(y):f.getMany(p).then(function(v){return p.trans._cache={keys:p.keys,values:p.cache==="clone"?Gt(v):v},v}):f.getMany(p)},mutate:function(p){return p.type!=="add"&&(p.trans._cache=null),f.mutate(p)}})}}}};function Pf(s,u){return s.trans.mode==="readonly"&&!!s.subscr&&!s.trans.explicit&&s.trans.db._options.cache!=="disabled"&&!u.schema.primaryKey.outbound}function Ff(s,u){switch(s){case"query":return u.values&&!u.unique;case"get":case"getMany":case"count":case"openCursor":return!1}}var sy={stack:"dbcore",level:0,name:"Observability",create:function(s){var u=s.schema.name,f=new pt(s.MIN_KEY,s.MAX_KEY);return r(r({},s),{transaction:function(p,y,v){if(le.subscr&&y!=="readonly")throw new ue.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(le.querier));return s.transaction(p,y,v)},table:function(p){function y(F){var L,F=F.query;return[L=F.index,new pt((L=(F=F.range).lower)!=null?L:s.MIN_KEY,(L=F.upper)!=null?L:s.MAX_KEY)]}var v=s.table(p),S=v.schema,k=S.primaryKey,w=S.indexes,B=k.extractKey,T=k.outbound,N=k.autoIncrement&&w.filter(function(P){return P.compound&&P.keyPath.includes(k.keyPath)}),j=r(r({},v),{mutate:function(P){function L(H){return H="idb://".concat(u,"/").concat(p,"/").concat(H),J[H]||(J[H]=new pt)}var F,K,O,$=P.trans,J=P.mutatedParts||(P.mutatedParts={}),V=L(""),Z=L(":dels"),q=P.type,Q=P.type==="deleteRange"?[P.range]:P.type==="delete"?[P.keys]:P.values.length<50?[Zl(k,P).filter(function(H){return H}),P.values]:[],re=Q[0],Q=Q[1],ie=P.trans._cache;return d(re)?(V.addKeys(re),(q=q==="delete"||re.length===Q.length?Lf(re,ie):null)||Z.addKeys(re),(q||Q)&&(F=L,K=q,O=Q,S.indexes.forEach(function(H){var fe=F(H.name||"");function he(Me){return Me!=null?H.extractKey(Me):null}function ge(Me){H.multiEntry&&d(Me)?Me.forEach(function(Ot){return fe.addKey(Ot)}):fe.addKey(Me)}(K||O).forEach(function(Me,mt){var pe=K&&he(K[mt]),mt=O&&he(O[mt]);be(pe,mt)!==0&&(pe!=null&&ge(pe),mt!=null)&&ge(mt)})}))):re?(Q={from:(ie=re.lower)!=null?ie:s.MIN_KEY,to:(q=re.upper)!=null?q:s.MAX_KEY},Z.add(Q),V.add(Q)):(V.add(f),Z.add(f),S.indexes.forEach(function(H){return L(H.name).add(f)})),v.mutate(P).then(function(H){return!re||P.type!=="add"&&P.type!=="put"||(V.addKeys(H.results),N&&N.forEach(function(fe){for(var he=P.values.map(function(pe){return fe.extractKey(pe)}),ge=fe.keyPath.findIndex(function(pe){return pe===k.keyPath}),Me=0,Ot=H.results.length;Me<Ot;++Me)he[Me][ge]=H.results[Me];L(fe.name).addKeys(he)})),$.mutatedParts=js($.mutatedParts||{},J),H})}}),G={get:function(P){return[k,new pt(P.key)]},getMany:function(P){return[k,new pt().addKeys(P.keys)]},count:y,query:y,openCursor:y};return l(G).forEach(function(P){j[P]=function(L){var F=le.subscr,K=!!F,O=Pf(le,v)&&Ff(P,L)?L.obsSet={}:F;if(K){var $,F=function(Q){return Q="idb://".concat(u,"/").concat(p,"/").concat(Q),O[Q]||(O[Q]=new pt)},J=F(""),V=F(":dels"),K=G[P](L),Z=K[0],K=K[1];if((P==="query"&&Z.isPrimaryKey&&!L.values?V:F(Z.name||"")).add(K),!Z.isPrimaryKey){if(P!=="count")return $=P==="query"&&T&&L.values&&v.query(r(r({},L),{values:!1})),v[P].apply(this,arguments).then(function(Q){if(P==="query"){if(T&&L.values)return $.then(function(he){return he=he.result,J.addKeys(he),Q});var ie=L.values?Q.result.map(B):Q.result;(L.values?J:V).addKeys(ie)}else{var H,fe;if(P==="openCursor")return fe=L.values,(H=Q)&&Object.create(H,{key:{get:function(){return V.addKey(H.primaryKey),H.key}},primaryKey:{get:function(){var he=H.primaryKey;return V.addKey(he),he}},value:{get:function(){return fe&&J.addKey(H.primaryKey),H.value}}})}return Q});V.add(f)}}return v[P].apply(this,arguments)}}),j}})}};function Gf(s,u,f){var p;return f.numFailures===0?u:u.type==="deleteRange"||(p=u.keys?u.keys.length:"values"in u&&u.values?u.values.length:1,f.numFailures===p)?null:(p=r({},u),d(p.keys)&&(p.keys=p.keys.filter(function(y,v){return!(v in f.failures)})),"values"in p&&d(p.values)&&(p.values=p.values.filter(function(y,v){return!(v in f.failures)})),p)}function Xl(s,u){return f=s,((p=u).lower===void 0||(p.lowerOpen?0<be(f,p.lower):0<=be(f,p.lower)))&&(f=s,(p=u).upper===void 0||(p.upperOpen?be(f,p.upper)<0:be(f,p.upper)<=0));var f,p}function Bf(s,u,f,p,y,v){var S,k,w,B,T,N,j;return!f||f.length===0||(S=u.query.index,k=S.multiEntry,w=u.query.range,B=p.schema.primaryKey.extractKey,T=S.extractKey,N=(S.lowLevelIndex||S).extractKey,(p=f.reduce(function(G,P){var L=G,F=[];if(P.type==="add"||P.type==="put")for(var K=new pt,O=P.values.length-1;0<=O;--O){var $,J=P.values[O],V=B(J);!K.hasKey(V)&&($=T(J),k&&d($)?$.some(function(ie){return Xl(ie,w)}):Xl($,w))&&(K.addKey(V),F.push(J))}switch(P.type){case"add":var Z=new pt().addKeys(u.values?G.map(function(H){return B(H)}):G),L=G.concat(u.values?F.filter(function(H){return H=B(H),!Z.hasKey(H)&&(Z.addKey(H),!0)}):F.map(function(H){return B(H)}).filter(function(H){return!Z.hasKey(H)&&(Z.addKey(H),!0)}));break;case"put":var q=new pt().addKeys(P.values.map(function(H){return B(H)}));L=G.filter(function(H){return!q.hasKey(u.values?B(H):H)}).concat(u.values?F:F.map(function(H){return B(H)}));break;case"delete":var re=new pt().addKeys(P.keys);L=G.filter(function(H){return!re.hasKey(u.values?B(H):H)});break;case"deleteRange":var Q=P.range;L=G.filter(function(H){return!Xl(B(H),Q)})}return L},s))===s)?s:(j=function(G,P){return be(N(G),N(P))||be(B(G),B(P))},p.sort(u.direction==="prev"||u.direction==="prevunique"?function(G,P){return j(P,G)}:j),u.limit&&u.limit<1/0&&(p.length>u.limit?p.length=u.limit:s.length===u.limit&&p.length<u.limit&&(y.dirty=!0)),v?Object.freeze(p):p)}function If(s,u){return be(s.lower,u.lower)===0&&be(s.upper,u.upper)===0&&!!s.lowerOpen==!!u.lowerOpen&&!!s.upperOpen==!!u.upperOpen}function oy(s,u){return((f,p,y,v)=>{if(f===void 0)return p!==void 0?-1:0;if(p===void 0)return 1;if((f=be(f,p))===0){if(y&&v)return 0;if(y)return 1;if(v)return-1}return f})(s.lower,u.lower,s.lowerOpen,u.lowerOpen)<=0&&0<=((f,p,y,v)=>{if(f===void 0)return p!==void 0?1:0;if(p===void 0)return-1;if((f=be(f,p))===0){if(y&&v)return 0;if(y)return-1;if(v)return 1}return f})(s.upper,u.upper,s.upperOpen,u.upperOpen)}function ly(s,u,f,p){s.subscribers.add(f),p.addEventListener("abort",function(){var y,v;s.subscribers.delete(f),s.subscribers.size===0&&(y=s,v=u,setTimeout(function(){y.subscribers.size===0&&ne(v,y)},3e3))})}var uy={stack:"dbcore",level:0,name:"Cache",create:function(s){var u=s.schema.name;return r(r({},s),{transaction:function(f,p,y){var v,S,k=s.transaction(f,p,y);return p==="readwrite"&&(y=(v=new AbortController).signal,k.addEventListener("abort",(S=function(w){return function(){if(v.abort(),p==="readwrite"){for(var B=new Set,T=0,N=f;T<N.length;T++){var j=N[T],G=Dr["idb://".concat(u,"/").concat(j)];if(G){var P=s.table(j),L=G.optimisticOps.filter(function(H){return H.trans===k});if(k._explicit&&w&&k.mutatedParts)for(var F=0,K=Object.values(G.queries.query);F<K.length;F++)for(var O=0,$=(Z=K[F]).slice();O<$.length;O++)Jl((q=$[O]).obsSet,k.mutatedParts)&&(ne(Z,q),q.subscribers.forEach(function(H){return B.add(H)}));else if(0<L.length){G.optimisticOps=G.optimisticOps.filter(function(H){return H.trans!==k});for(var J=0,V=Object.values(G.queries.query);J<V.length;J++)for(var Z,q,re,Q=0,ie=(Z=V[J]).slice();Q<ie.length;Q++)(q=ie[Q]).res!=null&&k.mutatedParts&&(w&&!q.dirty?(re=Object.isFrozen(q.res),re=Bf(q.res,q.req,L,P,q,re),q.dirty?(ne(Z,q),q.subscribers.forEach(function(H){return B.add(H)})):re!==q.res&&(q.res=re,q.promise=te.resolve({result:re}))):(q.dirty&&ne(Z,q),q.subscribers.forEach(function(H){return B.add(H)})))}}}B.forEach(function(H){return H()})}}})(!1),{signal:y}),k.addEventListener("error",S(!1),{signal:y}),k.addEventListener("complete",S(!0),{signal:y})),k},table:function(f){var p=s.table(f),y=p.schema.primaryKey;return r(r({},p),{mutate:function(v){var S,k=le.trans;return!y.outbound&&k.db._options.cache!=="disabled"&&!k.explicit&&k.idbtrans.mode==="readwrite"&&(S=Dr["idb://".concat(u,"/").concat(f)])?(k=p.mutate(v),v.type!=="add"&&v.type!=="put"||!(50<=v.values.length||Zl(y,v).some(function(w){return w==null}))?(S.optimisticOps.push(v),v.mutatedParts&&Ts(v.mutatedParts),k.then(function(w){0<w.numFailures&&(ne(S.optimisticOps,v),(w=Gf(0,v,w))&&S.optimisticOps.push(w),v.mutatedParts)&&Ts(v.mutatedParts)}),k.catch(function(){ne(S.optimisticOps,v),v.mutatedParts&&Ts(v.mutatedParts)})):k.then(function(w){var B=Gf(0,r(r({},v),{values:v.values.map(function(T,N){var j;return w.failures[N]?T:(ee(j=(j=y.keyPath)!=null&&j.includes(".")?Gt(T):r({},T),y.keyPath,w.results[N]),j)})}),w);S.optimisticOps.push(B),queueMicrotask(function(){return v.mutatedParts&&Ts(v.mutatedParts)})}),k):p.mutate(v)},query:function(v){var S,k,w,B,T,N,j;return Pf(le,p)&&Ff("query",v)?(S=((w=le.trans)==null?void 0:w.db._options.cache)==="immutable",k=(w=le).requery,w=w.signal,N=((G,P,L,F)=>{var K=Dr["idb://".concat(G,"/").concat(P)];if(!K)return[];if(!(G=K.queries[L]))return[null,!1,K,null];var O=G[(F.query?F.query.index.name:null)||""];if(!O)return[null,!1,K,null];switch(L){case"query":var $=(J=F.direction)!=null?J:"next",J=O.find(function(V){var Z;return V.req.limit===F.limit&&V.req.values===F.values&&((Z=V.req.direction)!=null?Z:"next")===$&&If(V.req.query.range,F.query.range)});return J?[J,!0,K,O]:[O.find(function(V){var Z;return("limit"in V.req?V.req.limit:1/0)>=F.limit&&((Z=V.req.direction)!=null?Z:"next")===$&&(!F.values||V.req.values)&&oy(V.req.query.range,F.query.range)}),!1,K,O];case"count":return J=O.find(function(V){return If(V.req.query.range,F.query.range)}),[J,!!J,K,O]}})(u,f,"query",v),j=N[0],B=N[2],T=N[3],j&&N[1]?j.obsSet=v.obsSet:(N=p.query(v).then(function(G){var P=G.result;if(j&&(j.res=P),S){for(var L=0,F=P.length;L<F;++L)Object.freeze(P[L]);Object.freeze(P)}return G}).catch(function(G){return T&&j&&ne(T,j),Promise.reject(G)}),j={obsSet:v.obsSet,promise:N,subscribers:new Set,type:"query",req:v,dirty:!1},T?T.push(j):(T=[j],(B=B||(Dr["idb://".concat(u,"/").concat(f)]={queries:{query:{},count:{}},objs:new Map,optimisticOps:[],unsignaledParts:{}})).queries.query[v.query.index.name||""]=T)),ly(j,T,k,w),j.promise.then(function(G){return G=Bf(G.result,v,B==null?void 0:B.optimisticOps,p,j,S),{result:S?G:Gt(G)}})):p.query(v)}})}})}};function Ps(s,u){return new Proxy(s,{get:function(f,p,y){return p==="db"?u:Reflect.get(f,p,y)}})}qe.prototype.version=function(s){if(isNaN(s)||s<.1)throw new ue.Type("Given version is not a positive number");if(s=Math.round(10*s)/10,this.idbdb||this._state.isBeingOpened)throw new ue.Schema("Cannot add version when database is open");this.verno=Math.max(this.verno,s);var u=this._versions,f=u.filter(function(p){return p._cfg.version===s})[0];return f||(f=new this.Version(s),u.push(f),u.sort(Zg),f.stores({}),this._state.autoSchema=!1),f},qe.prototype._whenReady=function(s){var u=this;return this.idbdb&&(this._state.openComplete||le.letThrough||this._vip)?s():new te(function(f,p){if(u._state.openComplete)return p(new ue.DatabaseClosed(u._state.dbOpenError));if(!u._state.isBeingOpened){if(!u._state.autoOpen)return void p(new ue.DatabaseClosed);u.open().catch(Ne)}u._state.dbReadyPromise.then(f,p)}).then(s)},qe.prototype.use=function(y){var u=y.stack,f=y.create,p=y.level,y=y.name,v=(y&&this.unuse({stack:u,name:y}),this._middlewares[u]||(this._middlewares[u]=[]));return v.push({stack:u,create:f,level:p??10,name:y}),v.sort(function(S,k){return S.level-k.level}),this},qe.prototype.unuse=function(s){var u=s.stack,f=s.name,p=s.create;return u&&this._middlewares[u]&&(this._middlewares[u]=this._middlewares[u].filter(function(y){return p?y.create!==p:!!f&&y.name!==f})),this},qe.prototype.open=function(){var s=this;return kr(kn,function(){return ny(s)})},qe.prototype._close=function(){this.on.close.fire(new CustomEvent("close"));var s=this._state;if(ii.remove(this),this.idbdb){try{this.idbdb.close()}catch{}this.idbdb=null}s.isBeingOpened||(s.dbReadyPromise=new te(function(u){s.dbReadyResolve=u}),s.openCanceller=new te(function(u,f){s.cancelOpen=f}))},qe.prototype.close=function(u){var u=(u===void 0?{disableAutoOpen:!0}:u).disableAutoOpen,f=this._state;u?(f.isBeingOpened&&f.cancelOpen(new ue.DatabaseClosed),this._close(),f.autoOpen=!1,f.dbOpenError=new ue.DatabaseClosed):(this._close(),f.autoOpen=this._options.autoOpen||f.isBeingOpened,f.openComplete=!1,f.dbOpenError=null)},qe.prototype.delete=function(s){var u=this,f=(s===void 0&&(s={disableAutoOpen:!0}),0<arguments.length&&typeof arguments[0]!="object"),p=this._state;return new te(function(y,v){function S(){u.close(s);var k=u._deps.indexedDB.deleteDatabase(u.name);k.onsuccess=Oe(function(){var w,B,T;w=u._deps,B=u.name,$l(T=w.indexedDB)||B===vs||zl(T,w.IDBKeyRange).delete(B).catch(Ne),y()}),k.onerror=sn(v),k.onblocked=u._fireOnBlocked}if(f)throw new ue.InvalidArgument("Invalid closeOptions argument to db.delete()");p.isBeingOpened?p.dbReadyPromise.then(S):S()})},qe.prototype.backendDB=function(){return this.idbdb},qe.prototype.isOpen=function(){return this.idbdb!==null},qe.prototype.hasBeenClosed=function(){var s=this._state.dbOpenError;return s&&s.name==="DatabaseClosed"},qe.prototype.hasFailed=function(){return this._state.dbOpenError!==null},qe.prototype.dynamicallyOpened=function(){return this._state.autoSchema},Object.defineProperty(qe.prototype,"tables",{get:function(){var s=this;return l(this._allTables).map(function(u){return s._allTables[u]})},enumerable:!1,configurable:!0}),qe.prototype.transaction=function(){var s=(function(u,f,p){var y=arguments.length;if(y<2)throw new ue.InvalidArgument("Too few arguments");for(var v=new Array(y-1);--y;)v[y-1]=arguments[y];return p=v.pop(),[u,me(v),p]}).apply(this,arguments);return this._transaction.apply(this,s)},qe.prototype._transaction=function(s,u,f){var p,y,v=this,S=le.trans,k=(S&&S.db===this&&s.indexOf("!")===-1||(S=null),s.indexOf("?")!==-1);s=s.replace("!","").replace("?","");try{if(y=u.map(function(B){if(B=B instanceof v.Table?B.name:B,typeof B!="string")throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");return B}),s=="r"||s===jl)p=jl;else{if(s!="rw"&&s!=Tl)throw new ue.InvalidArgument("Invalid transaction mode: "+s);p=Tl}if(S){if(S.mode===jl&&p===Tl){if(!k)throw new ue.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");S=null}S&&y.forEach(function(B){if(S&&S.storeNames.indexOf(B)===-1){if(!k)throw new ue.SubTransaction("Table "+B+" not included in parent transaction.");S=null}}),k&&S&&!S.active&&(S=null)}}catch(B){return S?S._promise(null,function(T,N){N(B)}):Ve(B)}var w=(function B(T,N,j,G,P){return te.resolve().then(function(){var O=le.transless||le,L=T._createTransaction(N,j,T._dbSchema,G),O=(L.explicit=!0,{trans:L,transless:O});if(G)L.idbtrans=G.idbtrans;else try{L.create(),L.idbtrans._explicit=!0,T._state.PR1398_maxLoop=3}catch($){return $.name===Ml.InvalidState&&T.isOpen()&&0<--T._state.PR1398_maxLoop?(console.warn("Dexie: Need to reopen db"),T.close({disableAutoOpen:!1}),T.open().then(function(){return B(T,N,j,null,P)})):Ve($)}var F,K=Fe(P),O=(K&&ea(),te.follow(function(){var $;(F=P.call(L,L))&&(K?($=zn.bind(null,null),F.then($,$)):typeof F.next=="function"&&typeof F.throw=="function"&&(F=Yl(F)))},O));return(F&&typeof F.then=="function"?te.resolve(F).then(function($){return L.active?$:Ve(new ue.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))}):O.then(function(){return F})).then(function($){return G&&L._resolve(),L._completion.then(function(){return $})}).catch(function($){return L._reject($),Ve($)})})}).bind(null,this,p,y,S,f);return S?S._promise(p,w,"lock"):le.trans?kr(le.transless,function(){return v._whenReady(w)}):this._whenReady(w)},qe.prototype.table=function(s){if(m(this._allTables,s))return this._allTables[s];throw new ue.InvalidTable("Table ".concat(s," does not exist"))};var En=qe;function qe(s,u){var f,p,y,v,S,k=this,w=(this._middlewares={},this.verno=0,qe.dependencies),w=(this._options=u=r({addons:qe.addons,autoOpen:!0,indexedDB:w.indexedDB,IDBKeyRange:w.IDBKeyRange,cache:"cloned",maxConnections:1e3},u),this._deps={indexedDB:u.indexedDB,IDBKeyRange:u.IDBKeyRange},u.addons),B=(this._dbSchema={},this._versions=[],this._storeNames=[],this._allTables={},this.idbdb=null,this._novip=this,{dbOpenError:null,isBeingOpened:!1,onReadyBeingFired:null,openComplete:!1,dbReadyResolve:Ne,dbReadyPromise:null,cancelOpen:Ne,openCanceller:null,autoSchema:!0,PR1398_maxLoop:3,autoOpen:u.autoOpen}),T=(B.dbReadyPromise=new te(function(N){B.dbReadyResolve=N}),B.openCanceller=new te(function(N,j){B.cancelOpen=j}),this._state=B,this.name=s,this.on=ei(this,"populate","blocked","versionchange","close",{ready:[bl,Ne]}),this.once=function(N,j){var G=function(){for(var P=[],L=0;L<arguments.length;L++)P[L]=arguments[L];k.on(N).unsubscribe(G),j.apply(k,P)};return k.on(N,G)},this.on.ready.subscribe=D(this.on.ready.subscribe,function(N){return function(j,G){qe.vip(function(){var P,L=k._state;L.openComplete?(L.dbOpenError||te.resolve().then(j),G&&N(j)):L.onReadyBeingFired?(L.onReadyBeingFired.push(j),G&&N(j)):(N(j),P=k,G||N(function F(){P.on.ready.unsubscribe(j),P.on.ready.unsubscribe(F)}))})}}),this.Collection=(f=this,ti(Wg.prototype,function(F,L){this.db=f;var G=hf,P=null;if(L)try{G=L()}catch(O){P=O}var L=F._ctx,F=L.table,K=F.hook.reading.fire;this._ctx={table:F,index:L.index,isPrimKey:!L.index||F.schema.primKey.keyPath&&L.index===F.schema.primKey.name,range:G,keysOnly:!1,dir:"next",unique:"",algorithm:null,filter:null,replayFilter:null,justLimit:!0,isMatch:null,offset:0,limit:1/0,error:P,or:L.or,valueMapper:K!==Va?K:null}})),this.Table=(p=this,ti(xf.prototype,function(N,j,G){this.db=p,this._tx=G,this.name=N,this.schema=j,this.hook=p._allTables[N]?p._allTables[N].hook:ei(null,{creating:[Gg,Ne],reading:[Fg,Va],updating:[Ig,Ne],deleting:[Bg,Ne]})})),this.Transaction=(y=this,ti(Vg.prototype,function(N,j,G,P,L){var F=this;N!=="readonly"&&j.forEach(function(K){K=(K=G[K])==null?void 0:K.yProps,K&&(j=j.concat(K.map(function(O){return O.updatesTable})))}),this.db=y,this.mode=N,this.storeNames=j,this.schema=G,this.chromeTransactionDurability=P,this.idbtrans=null,this.on=ei(this,"complete","error","abort"),this.parent=L||null,this.active=!0,this._reculock=0,this._blockedFuncs=[],this._resolve=null,this._reject=null,this._waitingFor=null,this._waitingQueue=null,this._spinCount=0,this._completion=new te(function(K,O){F._resolve=K,F._reject=O}),this._completion.then(function(){F.active=!1,F.on.complete.fire()},function(K){var O=F.active;return F.active=!1,F.on.error.fire(K),F.parent?F.parent._reject(K):O&&F.idbtrans&&F.idbtrans.abort(),Ve(K)})})),this.Version=(v=this,ti(ty.prototype,function(N){this.db=v,this._cfg={version:N,storesSource:null,dbschema:{},tables:{},contentUpgrade:null}})),this.WhereClause=(S=this,ti(Sf.prototype,function(N,j,G){if(this.db=S,this._ctx={table:N,index:j===":id"?null:j,or:G},this._cmp=this._ascending=be,this._descending=function(P,L){return be(L,P)},this._max=function(P,L){return 0<be(P,L)?P:L},this._min=function(P,L){return be(P,L)<0?P:L},this._IDBKeyRange=S._deps.IDBKeyRange,!this._IDBKeyRange)throw new ue.MissingAPI})),this.on("versionchange",function(N){0<N.newVersion?console.warn("Another connection wants to upgrade database '".concat(k.name,"'. Closing db now to resume the upgrade.")):console.warn("Another connection wants to delete database '".concat(k.name,"'. Closing db now to resume the delete request.")),k.close({disableAutoOpen:!1})}),this.on("blocked",function(N){!N.newVersion||N.newVersion<N.oldVersion?console.warn("Dexie.delete('".concat(k.name,"') was blocked")):console.warn("Upgrade '".concat(k.name,"' blocked by other connection holding version ").concat(N.oldVersion/10))}),this._maxKey=ri(u.IDBKeyRange),this._createTransaction=function(N,j,G,P){return new k.Transaction(N,j,G,k._options.chromeTransactionDurability,P)},this._fireOnBlocked=function(N){k.on("blocked").fire(N),ii.toArray().filter(function(j){return j.name===k.name&&j!==k&&!j._state.vcFired}).map(function(j){return j.on("versionchange").fire(N)})},this.use(iy),this.use(uy),this.use(sy),this.use(ry),this.use(ay),new Proxy(this,{get:function(N,j,G){var P;return j==="_vip"||(j==="table"?function(L){return Ps(k.table(L),T)}:(P=Reflect.get(N,j,G))instanceof xf?Ps(P,T):j==="tables"?P.map(function(L){return Ps(L,T)}):j==="_createTransaction"?function(){return Ps(P.apply(this,arguments),T)}:P)}}));this.vip=T,w.forEach(function(N){return N(k)})}var Fs,aa=typeof Symbol<"u"&&"observable"in Symbol?Symbol.observable:"@@observable",cy=(eu.prototype.subscribe=function(s,u,f){return this._subscribe(s&&typeof s!="function"?s:{next:s,error:u,complete:f})},eu.prototype[aa]=function(){return this},eu);function eu(s){this._subscribe=s}try{Fs={indexedDB:i.indexedDB||i.mozIndexedDB||i.webkitIndexedDB||i.msIndexedDB,IDBKeyRange:i.IDBKeyRange||i.webkitIDBKeyRange}}catch{Fs={indexedDB:null,IDBKeyRange:null}}function Of(s){var u,f=!1,p=new cy(function(y){var v=Fe(s),S,k=!1,w={},B={},T={get closed(){return k},unsubscribe:function(){k||(k=!0,S&&S.abort(),N&&Wn.storagemutated.unsubscribe(P))}},N=(y.start&&y.start(T),!1),j=function(){return wl(L)};function G(){return Jl(B,w)}var P=function(F){js(w,F),G()&&j()},L=function(){var F,K,O;!k&&Fs.indexedDB&&(w={},F={},S&&S.abort(),S=new AbortController,O=($=>{var J=Zr();try{v&&ea();var V=Kn(s,$);return V=v?V.finally(zn):V}finally{J&&Xr()}})(K={subscr:F,signal:S.signal,requery:j,querier:s,trans:null}),N||(Wn.storagemutated.subscribe(P),N=!0),Promise.resolve(O).then(function($){f=!0,u=$,k||K.signal.aborted||(G()||(B=F,G())?j():(w={},wl(function(){return!k&&y.next&&y.next($)})))},function($){f=!1,["DatabaseClosedError","AbortError"].includes($==null?void 0:$.name)||k||wl(function(){k||y.error&&y.error($)})}))};return setTimeout(j,0),T});return p.hasValue=function(){return f},p.getValue=function(){return u},p}var Nr=En;function tu(s){var u=Jn;try{Jn=!0,Wn.storagemutated.fire(s),ql(s,!0)}finally{Jn=u}}x(Nr,r(r({},De),{delete:function(s){return new Nr(s,{addons:[]}).delete()},exists:function(s){return new Nr(s,{addons:[]}).open().then(function(u){return u.close(),!0}).catch("NoSuchDatabaseError",function(){return!1})},getDatabaseNames:function(s){try{return u=Nr.dependencies,f=u.indexedDB,u=u.IDBKeyRange,($l(f)?Promise.resolve(f.databases()).then(function(p){return p.map(function(y){return y.name}).filter(function(y){return y!==vs})}):zl(f,u).toCollection().primaryKeys()).then(s)}catch{return Ve(new ue.MissingAPI)}var u,f},defineClass:function(){return function(s){c(this,s)}},ignoreTransaction:function(s){return le.trans?kr(le.transless||kn,s):s()},vip:Ul,async:function(s){return function(){try{var u=Yl(s.apply(this,arguments));return u&&typeof u.then=="function"?u:te.resolve(u)}catch(f){return Ve(f)}}},spawn:function(s,u,f){try{var p=Yl(s.apply(f,u||[]));return p&&typeof p.then=="function"?p:te.resolve(p)}catch(y){return Ve(y)}},currentTransaction:{get:function(){return le.trans||null}},waitFor:function(s,u){return s=te.resolve(typeof s=="function"?Nr.ignoreTransaction(s):s).timeout(u||6e4),le.trans?le.trans.waitFor(s):s},Promise:te,debug:{get:function(){return gn},set:function(s){sf(s)}},derive:R,extend:c,props:x,override:D,Events:ei,on:Wn,liveQuery:Of,extendObservabilitySet:js,getByKeyPath:X,setByKeyPath:ee,delByKeyPath:function(s,u){typeof u=="string"?ee(s,u,void 0):"length"in u&&[].map.call(u,function(f){ee(s,f,void 0)})},shallowClone:se,deepClone:Gt,getObjectDiff:Ql,cmp:be,asap:z,minKey:-1/0,addons:[],connections:{get:ii.toArray},errnames:Ml,dependencies:Fs,cache:Dr,semVer:"4.4.6",version:"4.4.6".split(".").map(function(s){return parseInt(s)}).reduce(function(s,u,f){return s+u/Math.pow(10,2*f)})})),Nr.maxKey=ri(Nr.dependencies.IDBKeyRange),typeof dispatchEvent<"u"&&typeof addEventListener<"u"&&(Wn(Ss,function(s){Jn||(s=new CustomEvent(Fl,{detail:s}),Jn=!0,dispatchEvent(s),Jn=!1)}),addEventListener(Fl,function(s){s=s.detail,Jn||tu(s)}));var ia,Jn=!1,_f=function(){};return typeof BroadcastChannel<"u"&&((_f=function(){(ia=new BroadcastChannel(Fl)).onmessage=function(s){return s.data&&tu(s.data)}})(),typeof ia.unref=="function"&&ia.unref(),Wn(Ss,function(s){Jn||ia.postMessage(s)})),typeof addEventListener<"u"&&(addEventListener("pagehide",function(s){if(!En.disableBfCache&&s.persisted){gn&&console.debug("Dexie: handling persisted pagehide"),ia!=null&&ia.close();for(var u=0,f=ii.toArray();u<f.length;u++)f[u].close({disableAutoOpen:!1})}}),addEventListener("pageshow",function(s){!En.disableBfCache&&s.persisted&&(gn&&console.debug("Dexie: handling persisted pageshow"),_f(),tu({all:new pt(-1/0,[[]])}))})),te.rejectionMapper=function(s,u){return!s||s instanceof Nt||s instanceof TypeError||s instanceof SyntaxError||!s.name||!af[s.name]?s:(u=new af[s.name](u||s.message,s),"stack"in s&&b(u,"stack",{get:function(){return this.inner.stack}}),u)},sf(gn),r(En,Object.freeze({__proto__:null,DEFAULT_MAX_CONNECTIONS:1e3,Dexie:En,Entity:pf,PropModification:Xa,RangeSet:pt,add:function(s){return new Xa({add:s})},cmp:be,default:En,liveQuery:Of,mergeRanges:oi,rangesOverlap:Nf,remove:function(s){return new Xa({remove:s})},replacePrefix:function(s,u){return new Xa({replacePrefix:[s,u]})}}),{default:En}),En})})(L2);var pC=L2.exports;const Bc=Rp(pC),vp=Symbol.for("Dexie"),qo=globalThis[vp]||(globalThis[vp]=Bc);if(Bc.semVer!==qo.semVer)throw new Error(`Two different versions of Dexie loaded in the same app: ${Bc.semVer} and ${qo.semVer}`);const{liveQuery:yb,mergeRanges:vb,rangesOverlap:xb,RangeSet:Cb,cmp:Mb,Entity:bb,PropModification:Ab,replacePrefix:Sb,add:kb,remove:Rb,DexieYProvider:Eb}=qo;class mC extends qo{constructor(){super("gaffer05");et(this,"saves");et(this,"worlds");et(this,"settings");this.version(1).stores({saves:"++id, updatedAt",worlds:"id",settings:"key"})}}const Ct=new mC;async function xp(e,t){const n=e.clubs[e.manager.clubId],r={name:e.saveName,managerName:e.manager.name,clubName:(n==null?void 0:n.name)??"-",clubColors:(n==null?void 0:n.colors)??["#333","#fff"],date:e.date,season:e.season,updatedAt:Date.now()};return Ct.transaction("rw",Ct.saves,Ct.worlds,async()=>{let a=t;return a==null?a=await Ct.saves.add(r):await Ct.saves.put({...r,id:a}),await Ct.worlds.put({id:a,world:e}),a})}async function gC(e){const t=await Ct.worlds.get(e);return t==null?void 0:t.world}async function yC(e){await Ct.transaction("rw",Ct.saves,Ct.worlds,async()=>{await Ct.saves.delete(e),await Ct.worlds.delete(e)})}async function vC(){return Ct.saves.orderBy("updatedAt").reverse().toArray()}async function xC(){const e=await Ct.settings.get("customDb");return(e==null?void 0:e.value)??null}async function wu(e){e==null?await Ct.settings.delete("customDb"):await Ct.settings.put({key:"customDb",value:e})}let to=null;const Se=H7((e,t)=>({world:null,saveId:null,version:0,busy:!1,toast:null,live:null,lastMatch:null,async newGame(n,r){e({busy:!0}),await new Promise(l=>setTimeout(l,30)),lp();const a=Ex(n,r);hC(a);const i=await xp(a);e({world:a,saveId:i,busy:!1,version:t().version+1,live:null,lastMatch:null})},async load(n){e({busy:!0});const r=await gC(n);return r?(lp(),Wr(r),e({world:r,saveId:n,busy:!1,version:t().version+1,live:null,lastMatch:null}),!0):(e({busy:!1}),!1)},quit(){e({world:null,saveId:null,live:null,lastMatch:null})},async save(){const{world:n,saveId:r}=t();if(!n)return;const a=await xp(n,r??void 0);r==null&&e({saveId:a})},mutate(n,r){const a=t().world;a&&(n(a),e({version:t().version+1}),(r==null?void 0:r.save)!==!1&&no())},async continue(){const n=t().world;if(!n||t().busy||n.pendingMatch!=null)return null;e({busy:!0}),await new Promise(a=>setTimeout(a,16));let r;try{r=cC(n,21)}finally{e({busy:!1,version:t().version+1})}return no(0),r},startLiveMatch(){const n=t().world;if(!n||n.pendingMatch==null)return null;const r=t().live;if(r&&r.fx.id===n.pendingMatch)return r;const a=n.fixtures.find(d=>d.id===n.pendingMatch),i=is(n),l=C2(n,a,i,!0);return e({live:l}),l},finishLiveMatch(){const n=t().world,r=t().live;!n||!r||(r.finished||r.simulateToEnd(),ss(n,r.rng),dC(n,r),e({live:null,lastMatch:r,version:t().version+1}),no(0))},quickMatch(){const n=t().world;if(!n)return;const r=fC(n);e({lastMatch:r??null,live:null,version:t().version+1}),no(0)},showToast(n){e({toast:n}),setTimeout(()=>{t().toast===n&&e({toast:null})},2800)},clearLastMatch(){e({lastMatch:null})}}));function no(e=800){to&&clearTimeout(to),to=setTimeout(()=>{to=null,Se.getState().save()},e)}function Ie(){const e=Se(t=>t.world);if(Se(t=>t.version),!e)throw new Error("No game loaded");return e}/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CC=e=>e==null?void 0:e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function MC(e,t,n=[]){if(t==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:CC(e),size:24,node:t,...n.length>0?{aliases:n}:{}}}/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bC=e=>{let t="",n=!1;for(const r of e){if(r==="-"||r==="_"||r<=" "){n=t.length>0;continue}t.length===0?t+=r.toLowerCase():t+=n?r.toUpperCase():r,n=!1}return t};/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AC=e=>{const t=bC(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ic=(...e)=>e.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jr={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function ju(e){return e!=null}function SC(e,t={}){var x,C;const n=t.attributeNames??{},r=b=>n[b]??b,a=e.size??e.width??jr.width,i=e.size??e.height??jr.height,l=((x=e.aliases)==null?void 0:x.filter(b=>typeof b=="string"&&b.trim()!=="").map(b=>`lucide-${b}`))??[],d=[...e.name?[`lucide-${e.name}`]:[],...l],c=((C=t.className)==null?void 0:C.split(" ").filter(Boolean))??[],h=t.includeDefaultClasses===!1?Ic(...c):Ic("lucide",...d,...c),g=t.absoluteStrokeWidth?Number(t.strokeWidth??jr["stroke-width"])*Number(e.size??e.width??jr.width)/Number(t.size??t.width??jr.width):t.strokeWidth??jr["stroke-width"];return["svg",{...Object.entries(jr).reduce((b,[R,E])=>(b[r(R)]=E,b),{}),..."color"in t&&t.color&&{[r("stroke")]:t.color},..."size"in t&&ju(t.size)&&{[r("width")]:t.size,[r("height")]:t.size},..."width"in t&&ju(t.width)&&{[r("width")]:t.width},..."height"in t&&ju(t.height)&&{[r("height")]:t.height},[r("stroke-width")]:g,...h&&{[r("class")]:h},[r("viewBox")]:`0 0 ${a} ${i}`,...t.hasA11yProp===!1?{[r("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},e.node.map(b=>{const[R,E,M]=b,A=t.nonScalingStroke?{[r("vector-effect")]:"non-scaling-stroke",...E}:E;return M?[R,A,M]:[R,A]})]}/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function kC(e,t={}){return SC(e,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RC=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},EC=I.createContext({}),DC=()=>I.useContext(EC),NC=I.forwardRef(({color:e,size:t,width:n,height:r,strokeWidth:a,absoluteStrokeWidth:i,nonScalingStroke:l,className:d="",children:c,iconNode:h=[],icon:g={node:h,aliases:[],size:24},...m},x)=>{const{size:C=24,strokeWidth:b=2,absoluteStrokeWidth:R=!1,nonScalingStroke:E=!1,color:M="currentColor",className:A=""}=DC()??{},D=!!c||RC(m),[_,z,X=[]]=kC(g,{color:e??M,width:n??t??C,height:r??t??C,strokeWidth:a??b,absoluteStrokeWidth:i??R,nonScalingStroke:l??E,className:Ic(A,d),hasA11yProp:D,attributes:m});return I.createElement(_,{ref:x,...z},[...X.map(([ee,se])=>I.createElement(ee,se)),...Array.isArray(c)?c:[c]])});/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function ve(e,t=[],n=[]){const r=typeof e=="string"?MC(e,t,n):e,a=I.forwardRef(({className:i,...l},d)=>I.createElement(NC,{ref:d,icon:r,className:i,...l}));return r.name&&(a.displayName=AC(r.name)),a}/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P2={name:"arrow-left-right",size:24,node:[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]]};P2.node;const F2=ve(P2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G2={name:"banknote",size:24,node:[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]]};G2.node;const wC=ve(G2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B2={name:"briefcase",size:24,node:[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]};B2.node;const jC=ve(B2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I2={name:"building-complex",size:24,node:[["path",{d:"M10 12h4",key:"a56b0p"}],["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",key:"secmi2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",key:"16ra0t"}]],aliases:["building-2"]};I2.node;const TC=ve(I2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O2={name:"chevron-left",size:24,node:[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]};O2.node;const Xd=ve(O2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _2={name:"chevron-right",size:24,node:[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]};_2.node;const os=ve(_2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K2={name:"circle-dollar-sign",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",key:"1h4pet"}],["path",{d:"M12 18V6",key:"zqpxq5"}]]};K2.node;const LC=ve(K2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z2={name:"database",size:24,node:[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]};z2.node;const PC=ve(z2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $2={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};$2.node;const FC=ve($2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U2={name:"dumbbell",size:24,node:[["path",{d:"M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",key:"9m4mmf"}],["path",{d:"m2.5 21.5 1.4-1.4",key:"17g3f0"}],["path",{d:"m20.1 3.9 1.4-1.4",key:"1qn309"}],["path",{d:"M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",key:"1t2c92"}],["path",{d:"m9.6 14.4 4.8-4.8",key:"6umqxw"}]]};U2.node;const GC=ve(U2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W2={name:"fast-forward",size:24,node:[["path",{d:"M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z",key:"b19h5q"}],["path",{d:"M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z",key:"h7h5ge"}]]};W2.node;const BC=ve(W2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J2={name:"file-text",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]};J2.node;const IC=ve(J2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H2={name:"folder-open",size:24,node:[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]};H2.node;const OC=ve(H2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V2={name:"graduation-cap",size:24,node:[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]};V2.node;const _C=ve(V2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q2={name:"heart-pulse",size:24,node:[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}],["path",{d:"M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",key:"auskq0"}]]};q2.node;const KC=ve(q2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y2={name:"inbox",size:24,node:[["polyline",{points:"22 12 16 12 14 15 10 15 8 12 2 12",key:"o97t9d"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}]]};Y2.node;const zC=ve(Y2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q2={name:"info",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]};Q2.node;const $C=ve(Q2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z2={name:"loader-circle",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],aliases:["loader-2"]};Z2.node;const X2=ve(Z2);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eg={name:"log-out",size:24,node:[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]};eg.node;const UC=ve(eg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tg={name:"menu",size:24,node:[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]};tg.node;const WC=ve(tg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ng={name:"minus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}]]};ng.node;const JC=ve(ng);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rg={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};rg.node;const HC=ve(rg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ag={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};ag.node;const ef=ve(ag);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ig={name:"plus",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]};ig.node;const tf=ve(ig);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sg={name:"rotate-ccw-clock",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],aliases:["history"]};sg.node;const VC=ve(sg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const og={name:"rotate-ccw",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]};og.node;const qC=ve(og);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lg={name:"save",size:24,node:[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]};lg.node;const YC=ve(lg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ug={name:"search",size:24,node:[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]};ug.node;const QC=ve(ug);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cg={name:"shirt",size:24,node:[["path",{d:"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",key:"1wgbhj"}]]};cg.node;const dg=ve(cg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fg={name:"skip-forward",size:24,node:[["path",{d:"M21 4v16",key:"7j8fe9"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",key:"zs4d6"}]]};fg.node;const ZC=ve(fg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hg={name:"star-half",size:24,node:[["path",{d:"M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2",key:"2ksp49"}]]};hg.node;const XC=ve(hg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pg={name:"star",size:24,node:[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]};pg.node;const Oc=ve(pg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mg={name:"trash",size:24,node:[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],aliases:["trash-2"]};mg.node;const gg=ve(mg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yg={name:"triangle-alert",size:24,node:[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["alert-triangle"]};yg.node;const vg=ve(yg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xg={name:"trophy",size:24,node:[["path",{d:"M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2",key:"pwuv1l"}],["path",{d:"M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2",key:"1y54w1"}],["path",{d:"M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3",key:"e30mpu"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3",key:"i0yafy"}]]};xg.node;const _c=ve(xg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cg={name:"upload",size:24,node:[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]]};Cg.node;const eM=ve(Cg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mg={name:"user-round",size:24,node:[["circle",{cx:"12",cy:"8",r:"5",key:"1hypcn"}],["path",{d:"M20 21a8 8 0 0 0-16 0",key:"rfgkzh"}]],aliases:["user-2"]};Mg.node;const tM=ve(Mg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bg={name:"users",size:24,node:[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]};bg.node;const nM=ve(bg);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ag={name:"wand-sparkles",size:24,node:[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]],aliases:["wand-2"]};Ag.node;const rM=ve(Ag);/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sg={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};Sg.node;const kg=ve(Sg);function xe({title:e,right:t,children:n,className:r=""}){return o.jsxs("section",{className:`panel ${r}`,children:[e!=null&&o.jsxs("div",{className:"panel-head flex items-center justify-between",children:[o.jsx("span",{children:e}),t]}),n]})}function ut({title:e,sub:t,back:n=!0,right:r}){const a=Qe();return o.jsxs("div",{className:"flex items-center gap-2 px-2 py-2 bg-ink-900 border-b border-ink-800 sticky top-0 z-10",children:[n&&o.jsx("button",{className:"btn-ghost !px-1",onClick:()=>a(-1),"aria-label":"Back",children:o.jsx(Xd,{size:22})}),o.jsxs("div",{className:"flex-1 min-w-0 pl-1",children:[o.jsx("div",{className:"font-bold truncate",children:e}),t&&o.jsx("div",{className:"text-xs text-ink-300 truncate",children:t})]}),r]})}const aM={GK:"bg-yellow-500 text-black",CB:"bg-blue-600 text-white",FB:"bg-blue-500 text-white",DM:"bg-teal-600 text-white",CM:"bg-green-600 text-white",WM:"bg-green-500 text-white",AM:"bg-orange-500 text-white",W:"bg-orange-500 text-white",ST:"bg-red-600 text-white"};function nn({pos:e,className:t=""}){return o.jsx("span",{className:`chip justify-center min-w-[34px] ${aM[Ft(e)]} ${t}`,children:e})}function In({value:e,size:t=14}){const n=Math.floor(e),r=e-n>=.5;return o.jsxs("span",{className:"inline-flex items-center text-gold","aria-label":`${e} stars`,children:[Array.from({length:n}).map((a,i)=>o.jsx(Oc,{size:t,fill:"currentColor",strokeWidth:0},i)),r&&o.jsx(XC,{size:t,fill:"currentColor",strokeWidth:0}),Array.from({length:5-n-(r?1:0)}).map((a,i)=>o.jsx(Oc,{size:t,className:"text-ink-600",strokeWidth:1.5},`e${i}`))]})}function mr({value:e,className:t=""}){const n=Math.round(e),r=n>=90?"bg-win":n>=75?"bg-yellow-400":n>=60?"bg-orange-500":"bg-loss";return o.jsx("div",{className:`h-1.5 w-10 rounded-full bg-ink-700 overflow-hidden ${t}`,title:`${n}%`,children:o.jsx("div",{className:`h-full ${r}`,style:{width:`${n}%`}})})}function iM(e){return e>=16?"text-win":e>=13?"text-lime-300":e>=10?"text-ink-100":e>=6?"text-orange-300":"text-loss"}function rt({club:e,size:t=28}){return o.jsx("span",{className:"inline-flex items-center justify-center rounded-full font-bold shrink-0 border border-black/40",style:{width:t,height:t,background:`linear-gradient(135deg, ${e.colors[0]} 0 55%, ${e.colors[1]} 55% 100%)`,fontSize:Math.max(8,t*.3),color:"#fff",textShadow:"0 1px 2px #000, 0 0 2px #000"},children:e.short.slice(0,3)})}function gr({r:e}){if(e==null||Number.isNaN(e))return o.jsx("span",{className:"text-ink-400",children:"-"});const t=e>=8?"bg-win text-black":e>=7?"bg-lime-600 text-white":e>=6.3?"bg-ink-600 text-white":"bg-loss text-white";return o.jsx("span",{className:`chip ${t}`,children:e.toFixed(1)})}function Zi({form:e}){return o.jsx("span",{className:"inline-flex gap-0.5",children:e.map((t,n)=>o.jsx("span",{className:`w-4 h-4 rounded-sm text-[10px] font-bold flex items-center justify-center ${t==="W"?"bg-win text-black":t==="D"?"bg-draw text-black":"bg-loss text-white"}`,children:t},n))})}function Ua({open:e,onClose:t,title:n,children:r}){return I.useEffect(()=>{if(!e)return;const a=i=>i.key==="Escape"&&t();return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[e,t]),e?o.jsx("div",{className:"fixed inset-0 z-50 flex items-end justify-center bg-black/60 animate-fade",onClick:t,children:o.jsxs("div",{className:"w-full max-w-lg max-h-[88vh] bg-ink-850 border-t border-ink-600 rounded-t-xl flex flex-col animate-slide-up safe-bottom",onClick:a=>a.stopPropagation(),children:[o.jsxs("div",{className:"flex items-center justify-between px-4 py-3 border-b border-ink-700",children:[o.jsx("div",{className:"font-bold",children:n}),o.jsx("button",{className:"btn-ghost !p-1",onClick:t,"aria-label":"Close",children:o.jsx(kg,{size:20})})]}),o.jsx("div",{className:"overflow-y-auto scroll-thin",children:r})]})}):null}function Mn({value:e,options:t,onChange:n,small:r}){return o.jsx("div",{className:"flex rounded-md border border-ink-600 overflow-hidden",children:t.map(a=>o.jsx("button",{className:`flex-1 ${r?"py-1 text-[11px]":"py-1.5 text-xs"} font-bold px-1 ${e===a.value?"bg-ink-500 text-white":"bg-ink-800 text-ink-300"}`,onClick:()=>n(a.value),children:a.label},a.value))})}function Wa({value:e,tabs:t,onChange:n}){return o.jsx("div",{className:"flex bg-ink-900 border-b border-ink-700 overflow-x-auto no-scrollbar",children:t.map(r=>o.jsx("button",{className:`px-3 py-2.5 text-sm font-bold whitespace-nowrap border-b-2 ${e===r.value?"border-gold text-white":"border-transparent text-ink-300"}`,onClick:()=>n(r.value),children:r.label},r.value))})}function Cp(e){return e>=5e7?25e5:e>=1e7?1e6:e>=2e6?25e4:e>=5e5?5e4:e>=1e5?25e3:e>=1e4?5e3:1e3}function nf({value:e,onChange:t,min:n=0,suffix:r}){return o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsx("button",{className:"btn-secondary !px-3",onClick:()=>t(Math.max(n,Rt(e-Cp(e-1)))),"aria-label":"Decrease",children:o.jsx(JC,{size:18})}),o.jsxs("div",{className:"flex-1 text-center text-lg font-bold tabular-nums",children:[oe(e),r&&o.jsxs("span",{className:"text-xs text-ink-300 font-normal",children:[" ",r]})]}),o.jsx("button",{className:"btn-secondary !px-3",onClick:()=>t(Rt(e+Cp(e))),"aria-label":"Increase",children:o.jsx(tf,{size:18})})]})}function fn({label:e,value:t,sub:n}){return o.jsxs("div",{className:"flex-1 min-w-0 px-3 py-2",children:[o.jsx("div",{className:"text-[11px] uppercase text-ink-300 font-bold tracking-wide",children:e}),o.jsx("div",{className:"font-bold truncate",children:t}),n&&o.jsx("div",{className:"text-xs text-ink-300 truncate",children:n})]})}function Kc({children:e}){return o.jsx("div",{className:"px-4 py-8 text-center text-ink-300 text-sm",children:e})}function ls({p:e}){return o.jsxs("span",{className:"inline-flex gap-1",children:[e.injury&&o.jsx("span",{className:"chip bg-loss text-white",title:e.injury.name,children:"INJ"}),e.suspended>0&&o.jsx("span",{className:"chip bg-red-800 text-white",children:"SUS"}),e.transferListed&&o.jsx("span",{className:"chip bg-blue-700 text-white",children:"TL"}),e.youth&&e.age<=18&&o.jsx("span",{className:"chip bg-teal-800 text-white",children:"U19"})]})}function sM(e){return e>=17?"Superb":e>=14?"Very Good":e>=11?"Good":e>=8?"Okay":e>=5?"Poor":"Very Poor"}function Ra(e){return e.stats.rated?e.stats.ratingSum/e.stats.rated:null}function xl(e){return Math.max(.5,Math.min(5,Math.round((e-45)/10*2)/2))}function oM(){const e=Qe(),t=Se(h=>h.load),n=Se(h=>h.busy),[r,a]=I.useState(null),[i,l]=I.useState(null),d=()=>vC().then(a);I.useEffect(()=>{d()},[]);const c=async h=>{await t(h)&&e("/game/inbox")};return o.jsxs("div",{className:"min-h-full flex flex-col safe-top safe-bottom bg-[radial-gradient(ellipse_at_top,_#22324a_0%,_#0a111b_70%)]",children:[o.jsxs("div",{className:"px-6 pt-12 pb-8 text-center",children:[o.jsx("div",{className:"inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-ink-900 border border-ink-600 shadow-lg mb-4",children:o.jsx("img",{src:"favicon.svg",alt:"",className:"w-14 h-14"})}),o.jsxs("h1",{className:"text-4xl font-black tracking-tight",children:["Gaffer ",o.jsx("span",{className:"text-gold",children:"'05"})]}),o.jsx("p",{className:"text-ink-300 mt-1 text-sm",children:"Football management, the way it used to be."}),o.jsx("p",{className:"text-ink-400 text-xs mt-1",children:"2025/26 database · 6 leagues · 120 clubs"})]}),o.jsxs("div",{className:"px-4 space-y-3 max-w-md w-full mx-auto",children:[r&&r[0]&&o.jsxs("button",{className:"btn-primary w-full !py-3.5 text-base",onClick:()=>c(r[0].id),disabled:n,children:[o.jsx(ef,{size:18})," Continue as ",r[0].clubName]}),o.jsxs("button",{className:`${r&&r[0]?"btn-secondary":"btn-primary"} w-full !py-3.5 text-base`,onClick:()=>e("/new"),children:[o.jsx(tf,{size:18})," New Game"]}),o.jsxs("button",{className:"btn-secondary w-full !py-3",onClick:()=>e("/editor"),children:[o.jsx(PC,{size:18})," Database Editor"]})]}),r&&r.length>0&&o.jsx("div",{className:"px-4 mt-8 max-w-md w-full mx-auto",children:o.jsxs("div",{className:"panel",children:[o.jsxs("div",{className:"panel-head flex items-center gap-2",children:[o.jsx(OC,{size:14})," Saved games"]}),r.map(h=>o.jsxs("div",{className:"row",children:[o.jsxs("button",{className:"flex-1 flex items-center gap-3 text-left min-w-0",onClick:()=>c(h.id),disabled:n,children:[o.jsx(rt,{club:{colors:h.clubColors,short:h.clubName.slice(0,3).toUpperCase()},size:32}),o.jsxs("div",{className:"min-w-0",children:[o.jsx("div",{className:"font-bold truncate",children:h.clubName}),o.jsxs("div",{className:"text-xs text-ink-300 truncate",children:[h.managerName," · ",Xt(h.season)," · ",Ur(h.date,!1)]})]})]}),i===h.id?o.jsx("button",{className:"btn-danger !py-1 text-xs",onClick:async()=>{await yC(h.id),l(null),d()},children:"Delete?"}):o.jsx("button",{className:"btn-ghost !p-2",onClick:()=>l(h.id),"aria-label":"Delete save",children:o.jsx(gg,{size:16})})]},h.id))]})}),o.jsx("div",{className:"flex-1"}),o.jsx("p",{className:"text-center text-[11px] text-ink-500 px-6 py-6",children:"An unofficial tribute to Football Manager 2005. Not affiliated with Sports Interactive, SEGA or any club or league. Player data is a best-effort snapshot and can be edited in the Database Editor."})]})}const U=(e,t,n,r,a,i,l,d)=>({name:e,short:t,rep:n,stadium:r,capacity:a,colors:i,money:l,players:d}),lM={id:"eng1",name:"Premier League",short:"EPL",country:"ENG",tier:1,tv:110,europe:5,relegateTo:"eng2",relegated:3,clubs:[U("Arsenal","ARS",91,"Emirates Stadium",60704,["#EF0107","#FFFFFF"],160,`
David Raya|GK|29|ESP|86|sweeper
Kepa Arrizabalaga|GK|30|ESP|79
Tommy Setford|GK|19|ENG|60/74
William Saliba|DC|24|FRA|88/90|pace,playmaker
Gabriel Magalhães|DC|27|BRA|87|aerial,leader
Jurriën Timber|DR/DC|24|NED|83/85|tackler
Ben White|DR/DC|27|ENG|82
Riccardo Calafiori|DL/DC|23|ITA|81/84
Piero Hincapié|DC/DL|23|ECU|81/84|pace
Cristhian Mosquera|DC|21|ESP|77/84
Myles Lewis-Skelly|DL/DM|18|ENG|77/88
Martin Ødegaard|AMC/MC|26|NOR|87|playmaker,leader
Declan Rice|MC/DM|26|ENG|87|engine,set
Martín Zubimendi|DM/MC|26|ESP|85|playmaker
Mikel Merino|MC/ST|29|ESP|83|aerial
Christian Nørgaard|DM|31|DEN|78
Eberechi Eze|AMC/AML|27|ENG|84|dribbler,sniper
Ethan Nwaneri|AMR/AMC|18|ENG|77/89|flair
Bukayo Saka|AMR|23|ENG|88/90|dribbler,crosser
Noni Madueke|AMR|23|ENG|80/83|dribbler
Gabriel Martinelli|AML|24|BRA|82|pace
Leandro Trossard|AML/ST|30|BEL|81
Viktor Gyökeres|ST|27|SWE|86|strong,finisher
Kai Havertz|ST/AMC|26|GER|83|aerial
Gabriel Jesus|ST|28|BRA|78
Max Dowman|AMR|15|ENG|62/89|dribbler
`),U("Liverpool","LIV",94,"Anfield",61276,["#C8102E","#F6EB61"],170,`
Alisson Becker|GK|32|BRA|88|shotstopper,leader
Giorgi Mamardashvili|GK|24|GEO|82/86
Freddie Woodman|GK|28|ENG|65
Virgil van Dijk|DC|33|NED|88|aerial,leader
Ibrahima Konaté|DC|26|FRA|85|pace,strong
Joe Gomez|DC/DR|28|ENG|77
Giovanni Leoni|DC|18|ITA|72/87
Jeremie Frimpong|DR/WBR|24|NED|83|pace,dribbler
Conor Bradley|DR|21|NIR|78/84|engine
Milos Kerkez|DL|21|HUN|80/85|engine
Andrew Robertson|DL|31|SCO|81|crosser
Alexis Mac Allister|MC|26|ARG|87|playmaker
Ryan Gravenberch|DM/MC|23|NED|85/87|dribbler
Dominik Szoboszlai|MC/AMC|24|HUN|84|sniper,engine
Florian Wirtz|AMC|22|GER|88/92|playmaker,dribbler
Curtis Jones|MC|24|ENG|80
Wataru Endo|DM|32|JPN|75|tackler
Trey Nyoni|MC|18|ENG|67/82
Mohamed Salah|AMR|33|EGY|89|finisher,dribbler
Cody Gakpo|AML/ST|26|NED|84|sniper
Federico Chiesa|AMR/AML|27|ITA|77
Rio Ngumoha|AML|16|ENG|64/86|dribbler
Alexander Isak|ST|25|SWE|88|finisher,dribbler
Hugo Ekitike|ST|23|FRA|83/87|dribbler
`),U("Manchester City","MCI",93,"Etihad Stadium",53400,["#6CABDD","#1C2C5B"],200,`
Gianluigi Donnarumma|GK|26|ITA|88|shotstopper
James Trafford|GK|22|ENG|78/83
Stefan Ortega|GK|32|GER|78|sweeper
Rúben Dias|DC|28|POR|87|leader,tackler
Joško Gvardiol|DC/DL|23|CRO|85/88
John Stones|DC|31|ENG|82|playmaker
Nathan Aké|DC/DL|30|NED|80
Abdukodir Khusanov|DC|21|UZB|77/84|pace
Rayan Aït-Nouri|DL|24|ALG|82|dribbler
Matheus Nunes|DR/MC|26|POR|80
Rico Lewis|DR/MC|20|ENG|79/85
Rodri|DM|29|ESP|90|playmaker,leader
Tijjani Reijnders|MC|26|NED|85
Bernardo Silva|MC/AMR|30|POR|86|engine,dribbler
Phil Foden|AMC/AML|25|ENG|86|flair,sniper
Rayan Cherki|AMC/AMR|21|FRA|83/89|flair,dribbler
Mateo Kovačić|MC|31|CRO|81
Nico González|DM|23|ESP|80/83
Jérémy Doku|AML|23|BEL|82/85|dribbler,pace
Savinho|AMR|21|BRA|81/87|dribbler
Oscar Bobb|AMR|21|NOR|75/82
Omar Marmoush|ST/AML|26|EGY|84|pace
Erling Haaland|ST|24|NOR|91/92|finisher,strong,pace
`),U("Chelsea","CHE",88,"Stamford Bridge",40343,["#034694","#FFFFFF"],130,`
Robert Sánchez|GK|27|ESP|80
Filip Jørgensen|GK|23|DEN|76/80
Levi Colwill|DC|22|ENG|83/87
Wesley Fofana|DC|24|FRA|80
Trevoh Chalobah|DC|26|ENG|80
Tosin Adarabioyo|DC|27|ENG|78|aerial
Benoît Badiashile|DC|24|FRA|78
Jorrel Hato|DL/DC|19|NED|78/88
Marc Cucurella|DL|26|ESP|84|engine
Reece James|DR/DM|25|ENG|84|crosser,set
Malo Gusto|DR|22|FRA|81/85|pace
Josh Acheampong|DR/DC|19|ENG|72/83
Moisés Caicedo|DM|23|ECU|87|tackler,engine
Enzo Fernández|MC|24|ARG|85|playmaker
Roméo Lavia|DM|21|BEL|78/85
Andrey Santos|MC|21|BRA|78/85
Dário Essugo|DM|20|POR|73/82
Cole Palmer|AMC/AMR|23|ENG|88/90|playmaker,set
Estêvão|AMR|18|BRA|80/92|dribbler,flair
Facundo Buonanotte|AMC|20|ARG|74/82
Pedro Neto|AMR/AML|25|POR|82|pace
Jamie Gittens|AML|20|ENG|79/86|dribbler,pace
Alejandro Garnacho|AML|21|ARG|80/85|pace
Tyrique George|AML|19|ENG|71/80
João Pedro|ST/AMC|23|BRA|82/85
Liam Delap|ST|22|ENG|79/85|strong
`),U("Manchester United","MUN",86,"Old Trafford",74310,["#DA291C","#FBE122"],120,`
Senne Lammens|GK|23|BEL|77/83
Altay Bayındır|GK|27|TUR|74
Tom Heaton|GK|39|ENG|62
Matthijs de Ligt|DC|25|NED|82|aerial
Lisandro Martínez|DC|27|ARG|83|hardman
Harry Maguire|DC|32|ENG|78|aerial
Leny Yoro|DC|19|FRA|79/89
Ayden Heaven|DC|18|ENG|70/82
Luke Shaw|DL/DC|30|ENG|78
Diogo Dalot|DR/DL|26|POR|80
Noussair Mazraoui|DR|27|MAR|80
Patrick Dorgu|WBL/DL|20|DEN|77/84|pace
Tyrell Malacia|DL|25|NED|70
Bruno Fernandes|AMC/MC|30|POR|87|playmaker,set,leader
Casemiro|DM|33|BRA|79|tackler
Manuel Ugarte|DM|24|URU|79|tackler
Kobbie Mainoo|MC|20|ENG|79/88
Mason Mount|AMC|26|ENG|78
Amad Diallo|AMR/WBR|22|CIV|81/85|dribbler
Bryan Mbeumo|AMR/ST|25|CMR|84|set
Matheus Cunha|AMC/ST|26|BRA|84|dribbler
Benjamin Šeško|ST|22|SVN|82/89|aerial,pace
Joshua Zirkzee|ST|24|NED|76
Chido Obi|ST|17|DEN|64/82
`),U("Tottenham Hotspur","TOT",85,"Tottenham Hotspur Stadium",62850,["#132257","#FFFFFF"],140,`
Guglielmo Vicario|GK|28|ITA|83|shotstopper
Antonín Kinský|GK|22|CZE|72/80
Brandon Austin|GK|26|ENG|62
Cristian Romero|DC|27|ARG|85|hardman,tackler
Micky van de Ven|DC|24|NED|84|pace
Kevin Danso|DC|26|AUT|78|strong
Radu Drăgușin|DC|23|ROU|77
Kota Takai|DC|20|JPN|70/80
Pedro Porro|DR|25|ESP|82|crosser
Djed Spence|DL/DR|24|ENG|77
Destiny Udogie|DL|22|ITA|80/84
Ben Davies|DL/DC|32|WAL|73
João Palhinha|DM|29|POR|82|tackler
Rodrigo Bentancur|MC/DM|28|URU|80
Yves Bissouma|DM|28|MLI|78
Pape Matar Sarr|MC|22|SEN|79/83|engine
Lucas Bergvall|MC|19|SWE|76/87
Archie Gray|DM/DR|19|ENG|75/86
James Maddison|AMC|28|ENG|82|set,playmaker
Xavi Simons|AMC/AML|22|NED|84/88|dribbler
Dejan Kulusevski|AMR|25|SWE|82
Mohammed Kudus|AMR|24|GHA|82|dribbler
Brennan Johnson|AMR|24|WAL|79|pace
Wilson Odobert|AML|20|FRA|75/83
Mathys Tel|ST/AML|20|FRA|76/85
Dominic Solanke|ST|27|ENG|80
Richarlison|ST|28|BRA|77
Randal Kolo Muani|ST|26|FRA|81|pace
`),U("Newcastle United","NEW",84,"St James' Park",52305,["#241F20","#FFFFFF"],90,`
Nick Pope|GK|33|ENG|81
Aaron Ramsdale|GK|27|ENG|78
John Ruddy|GK|38|ENG|60
Sven Botman|DC|25|NED|81
Fabian Schär|DC|33|SUI|79|playmaker
Dan Burn|DC/DL|33|ENG|78|aerial
Malick Thiaw|DC|23|GER|80/84
Jamaal Lascelles|DC|31|ENG|70
Tino Livramento|DR/DL|22|ENG|80/84|pace
Kieran Trippier|DR|34|ENG|77|crosser,set
Lewis Hall|DL|20|ENG|80/86
Emil Krafth|DR|31|SWE|70
Bruno Guimarães|MC/DM|27|BRA|86|playmaker,leader
Sandro Tonali|MC/DM|25|ITA|85|engine
Joelinton|MC|28|BRA|82|strong,engine
Jacob Ramsey|MC/AMC|24|ENG|77
Joe Willock|MC|25|ENG|75
Lewis Miley|MC|19|ENG|73/83
Anthony Gordon|AML|24|ENG|83|pace
Harvey Barnes|AML|27|ENG|78
Jacob Murphy|AMR|30|ENG|78|crosser
Anthony Elanga|AMR|23|SWE|80/83|pace
Nick Woltemade|ST|23|GER|80/85|dribbler,aerial
Yoane Wissa|ST|28|COD|80
William Osula|ST|21|DEN|71/78
`),U("Aston Villa","AVL",83,"Villa Park",42640,["#670E36","#95BFE5"],70,`
Emiliano Martínez|GK|32|ARG|85|shotstopper,leader
Marco Bizot|GK|34|NED|72
Ezri Konsa|DC/DR|27|ENG|82
Pau Torres|DC|28|ESP|81|playmaker
Tyrone Mings|DC|32|ENG|77
Victor Lindelöf|DC|31|SWE|76
Lamare Bogarde|DC/DM|21|NED|70/78
Matty Cash|DR|27|POL|79
Lucas Digne|DL|31|FRA|78|crosser,set
Ian Maatsen|DL|23|NED|78
Andrés García|DR|22|ESP|72/78
Boubacar Kamara|DM|25|FRA|82|tackler
Amadou Onana|DM/MC|23|BEL|81|strong
Youri Tielemans|MC|28|BEL|83|playmaker
John McGinn|MC/AML|30|SCO|80|engine,leader
Ross Barkley|AMC|31|ENG|74
Emiliano Buendía|AMC|28|ARG|77
Morgan Rogers|AMC/AML|22|ENG|82/87|dribbler,strong
Harvey Elliott|AMC/AMR|22|ENG|78/83
Jadon Sancho|AML|25|ENG|77
Evann Guessand|ST/AMR|24|CIV|76
Donyell Malen|ST/AMR|26|NED|78
Ollie Watkins|ST|29|ENG|84|finisher,pace
`),U("Brighton & Hove Albion","BHA",78,"Amex Stadium",31876,["#0057B8","#FFFFFF"],80,`
Bart Verbruggen|GK|22|NED|80/84
Jason Steele|GK|34|ENG|70
Lewis Dunk|DC|33|ENG|78|playmaker,leader
Jan Paul van Hecke|DC|25|NED|80
Adam Webster|DC|30|ENG|74
Olivier Boscagli|DC|27|FRA|76
Diego Coppola|DC|21|ITA|73/80
Joël Veltman|DR|33|NED|73
Ferdi Kadıoğlu|DL/DR|25|TUR|79
Maxim De Cuyper|DL|24|BEL|77
Mats Wieffer|DR/DM|25|NED|76
Carlos Baleba|DM|21|CMR|81/87|engine
Jack Hinshelwood|MC/DR|20|ENG|74/82
Yasin Ayari|MC|21|SWE|75/81
Diego Gómez|MC|22|PAR|74/80
James Milner|MC|39|ENG|67|leader
Georginio Rutter|AMC/ST|23|FRA|78/82|dribbler
Kaoru Mitoma|AML|28|JPN|81|dribbler
Yankuba Minteh|AMR|20|GAM|78/85|pace
Brajan Gruda|AMR/AMC|21|GER|75/82
Solly March|MR|31|ENG|72
Tommy Watson|AML|19|ENG|68/80
Danny Welbeck|ST|34|ENG|75
Stefanos Tzimas|ST|19|GRE|72/82
Charalampos Kostoulas|ST|18|GRE|70/83
`),U("Bournemouth","BOU",74,"Vitality Stadium",11307,["#DA291C","#000000"],50,`
Đorđe Petrović|GK|25|SRB|79
Fraser Forster|GK|37|ENG|70
Marcos Senesi|DC|28|ARG|80
Bafodé Diakité|DC|24|FRA|77
James Hill|DC|23|ENG|72
Veljko Milosavljević|DC|17|SRB|68/82
Adam Smith|DR|34|ENG|72
Álex Jiménez|DR|20|ESP|74/82
Adrien Truffert|DL|23|FRA|77/80
Julio Soler|DL|20|ARG|72/79
Tyler Adams|DM|26|USA|79|tackler
Lewis Cook|MC|28|ENG|77
Alex Scott|MC|21|ENG|77/83
Ryan Christie|MC|30|SCO|76|engine
Marcus Tavernier|AML/AMC|26|ENG|78|set
Justin Kluivert|AMC/AML|26|NED|80
David Brooks|AMR|28|WAL|75
Amine Adli|AML/AMR|25|MAR|77
Ben Gannon-Doak|AMR|19|SCO|71/81
Antoine Semenyo|AMR/ST|25|GHA|82|pace,strong
Evanilson|ST|25|BRA|79
Eli Junior Kroupi|ST|19|FRA|71/82
Enes Ünal|ST|28|TUR|74
`),U("Brentford","BRE",72,"Gtech Community Stadium",17250,["#E30613","#FFFFFF"],40,`
Caoimhín Kelleher|GK|26|IRL|80
Hákon Valdimarsson|GK|23|ISL|70
Nathan Collins|DC|24|IRL|79|aerial
Kristoffer Ajer|DC/DR|27|NOR|76
Ethan Pinnock|DC|32|JAM|76|aerial
Sepp van den Berg|DC|23|NED|77
Aaron Hickey|DR/DL|23|SCO|75
Rico Henry|DL|28|ENG|74
Michael Kayode|DR|20|ITA|74/80|set
Keane Lewis-Potter|DL/AML|24|ENG|76
Vitaly Janelt|DM|27|GER|76
Mikkel Damsgaard|AMC/MC|25|DEN|79|playmaker,set
Yehor Yarmoliuk|MC|21|UKR|73/80
Mathias Jensen|MC|29|DEN|77
Jordan Henderson|MC|35|ENG|75|leader
Fábio Carvalho|AMC|22|POR|74/80
Kevin Schade|AML/ST|23|GER|77|pace
Dango Ouattara|AMR|23|BFA|77/80|pace
Gustavo Nunes|AMR|19|BRA|68/80
Igor Thiago|ST|24|BRA|77|strong
`),U("Crystal Palace","CRY",74,"Selhurst Park",25486,["#1B458F","#C4122E"],45,`
Dean Henderson|GK|28|ENG|81
Walter Benítez|GK|32|ARG|74
Marc Guéhi|DC|24|ENG|84|leader
Maxence Lacroix|DC|25|FRA|81|pace
Chris Richards|DC|25|USA|77
Jaydee Canvot|DC|19|FRA|70/81
Chadi Riad|DC|21|MAR|72/80
Daniel Muñoz|WBR/DR|29|COL|81|engine
Tyrick Mitchell|WBL/DL|25|ENG|79
Borna Sosa|WBL|27|CRO|74|crosser
Nathaniel Clyne|DR|34|ENG|70
Adam Wharton|MC|21|ENG|80/88|playmaker
Jefferson Lerma|DM/MC|30|COL|78|hardman
Will Hughes|MC|30|ENG|75
Cheick Doucouré|DM|25|MLI|76
Daichi Kamada|MC/AMC|28|JPN|77
Justin Devenny|MC|21|NIR|70/77
Yéremy Pino|AMR/AML|22|ESP|79/83
Ismaïla Sarr|AMR/ST|27|SEN|80|pace
Christantus Uche|AMC/ST|22|NGA|72/78
Jean-Philippe Mateta|ST|28|FRA|80|strong
Eddie Nketiah|ST|26|ENG|75
`),U("Everton","EVE",75,"Hill Dickinson Stadium",52888,["#003399","#FFFFFF"],60,`
Jordan Pickford|GK|31|ENG|83|shotstopper
Mark Travers|GK|26|IRL|72
James Tarkowski|DC|32|ENG|79|aerial,leader
Jarrad Branthwaite|DC|23|ENG|80/85
Michael Keane|DC|32|ENG|75
Jake O'Brien|DC/DR|24|IRL|75
Vitaliy Mykolenko|DL|26|UKR|78
Nathan Patterson|DR|23|SCO|72
Séamus Coleman|DR|36|IRL|68|leader
Adam Aznou|DL|19|MAR|70/80
James Garner|MC/DM|24|ENG|77|set
Idrissa Gueye|DM|35|SEN|75|tackler
Tim Iroegbunam|DM|22|ENG|72/78
Kiernan Dewsbury-Hall|MC/AMC|26|ENG|77
Carlos Alcaraz|MC|22|ARG|73/78
Merlin Röhl|MC|22|GER|72/78
Jack Grealish|AML/AMC|29|ENG|80|dribbler
Iliman Ndiaye|AML/AMC|25|SEN|79|dribbler
Dwight McNeil|AML/AMR|25|ENG|77|crosser,set
Tyler Dibling|AMR|19|ENG|75/86|dribbler
Thierno Barry|ST|22|FRA|76/82|aerial
Beto|ST|27|GNB|74|strong
`),U("Fulham","FUL",72,"Craven Cottage",29589,["#FFFFFF","#000000"],45,`
Bernd Leno|GK|33|GER|81
Benjamin Lecomte|GK|34|FRA|68
Calvin Bassey|DC/DL|25|NGA|77
Joachim Andersen|DC|29|DEN|79|playmaker
Issa Diop|DC|28|FRA|75
Jorge Cuenca|DC|25|ESP|73
Kenny Tete|DR|29|NED|76
Timothy Castagne|DR|29|BEL|76
Antonee Robinson|DL|27|USA|80|pace,crosser
Ryan Sessegnon|DL/ML|25|ENG|74
Sander Berge|DM/MC|27|NOR|79
Saša Lukić|MC|28|SRB|77
Harrison Reed|DM|30|ENG|73
Tom Cairney|MC|34|SCO|72
Emile Smith Rowe|AMC|24|ENG|78
Andreas Pereira|AMC/MC|29|BRA|78|set
Alex Iwobi|AML/MC|29|NGA|79
Adama Traoré|AMR|29|ESP|76|pace,dribbler
Harry Wilson|AMR|28|WAL|77|sniper
Samuel Chukwueze|AMR|26|NGA|76
Kevin|AML|22|BRA|74/81
Josh King|AMC|18|ENG|68/80
Raúl Jiménez|ST|34|MEX|77
Rodrigo Muniz|ST|24|BRA|76
`),U("Nottingham Forest","NFO",76,"City Ground",30404,["#DD0000","#FFFFFF"],55,`
Matz Sels|GK|33|BEL|81
John Victor|GK|29|BRA|72
Angus Gunn|GK|29|SCO|70
Murillo|DC|22|BRA|82/86|playmaker
Nikola Milenković|DC|27|SRB|81|aerial
Morato|DC|24|BRA|74
Jair Cunha|DC|20|BRA|70/79
Willy Boly|DC|34|CIV|70
Neco Williams|DR/DL|24|WAL|78
Ola Aina|DR|28|NGA|79
Oleksandr Zinchenko|DL/MC|28|UKR|76
Nicolò Savona|DR|22|ITA|74/79
Elliot Anderson|MC/DM|22|ENG|83/87|engine
Ibrahim Sangaré|DM|27|CIV|78
Nicolás Domínguez|MC|27|ARG|76
Douglas Luiz|MC|27|BRA|78
Ryan Yates|MC|27|ENG|74
Morgan Gibbs-White|AMC|25|ENG|83|playmaker
James McAtee|AMC|22|ENG|75/80
Omari Hutchinson|AMR|21|ENG|76/82
Callum Hudson-Odoi|AML|24|ENG|78
Dan Ndoye|AMR|24|SUI|79
Dilane Bakwa|AMR|22|FRA|74
Chris Wood|ST|33|NZL|80|aerial,finisher
Igor Jesus|ST|24|BRA|76
Arnaud Kalimuendo|ST|23|FRA|77
Taiwo Awoniyi|ST|27|NGA|73
`),U("West Ham United","WHU",76,"London Stadium",62500,["#7A263A","#1BB1E7"],50,`
Alphonse Areola|GK|32|FRA|78
Mads Hermansen|GK|25|DEN|77
Łukasz Fabiański|GK|40|POL|69
Max Kilman|DC|28|ENG|78
Konstantinos Mavropanos|DC|27|GRE|76|strong
Jean-Clair Todibo|DC|25|FRA|78
Igor Julio|DC|27|BRA|74
Aaron Wan-Bissaka|DR|27|ENG|78|tackler
El Hadji Malick Diouf|DL|20|SEN|75/82
Kyle Walker-Peters|DR/DL|28|ENG|75
Oliver Scarles|DL|19|ENG|68/78
Tomáš Souček|MC|30|CZE|77|aerial
Mateus Fernandes|MC|21|POR|76/82
Soungoutou Magassa|DM|21|FRA|73/81
Guido Rodríguez|DM|31|ARG|76
James Ward-Prowse|MC|30|ENG|76|set
Lucas Paquetá|AMC/MC|27|BRA|81|flair
Jarrod Bowen|AMR/ST|28|ENG|82|pace
Crysencio Summerville|AML|23|NED|77
Luis Guilherme|AMR|19|BRA|68/79
Niclas Füllkrug|ST|32|GER|76|aerial
Callum Wilson|ST|33|ENG|75
Callum Marshall|ST|20|NIR|65/75
`),U("Wolverhampton Wanderers","WOL",72,"Molineux",31750,["#FDB913","#231F20"],35,`
José Sá|GK|32|POR|78
Sam Johnstone|GK|32|ENG|75
Daniel Bentley|GK|31|ENG|67
Emmanuel Agbadou|DC|28|CIV|76
Santiago Bueno|DC|26|URU|74
Toti Gomes|DC|26|POR|75
Yerson Mosquera|DC|24|COL|75
Ladislav Krejčí|DC/DM|26|CZE|76
Matt Doherty|DR|33|IRL|72
Jackson Tchatchoua|WBR|23|CMR|73
Hugo Bueno|WBL|22|ESP|72
David Møller Wolfe|WBL|23|NOR|72
André|DM|24|BRA|77
João Gomes|DM/MC|24|BRA|79|tackler
Jean-Ricner Bellegarde|AMC|27|FRA|75
Marshall Munetsi|MC|29|ZIM|75
Rodrigo Gomes|AMR|21|POR|72/78
Fer López|AMC|21|ESP|72/79
Hwang Hee-chan|AMC/ST|29|KOR|74
Jhon Arias|AMR|27|COL|78
Jørgen Strand Larsen|ST|25|NOR|78|aerial
Tolu Arokodare|ST|24|NGA|74
Saša Kalajdžić|ST|28|AUT|71
`),U("Leeds United","LEE",72,"Elland Road",37645,["#FFFFFF","#1D428A"],35,`
Lucas Perri|GK|27|BRA|76
Illan Meslier|GK|25|FRA|74
Karl Darlow|GK|34|WAL|70
Pascal Struijk|DC/DL|26|NED|76
Joe Rodon|DC|27|WAL|77
Jaka Bijol|DC|26|SVN|77
Sebastiaan Bornauw|DC|26|BEL|74
Jayden Bogle|DR|24|ENG|75
Gabriel Gudmundsson|DL|26|SWE|74
James Justin|DR/DL|27|ENG|75
Sam Byram|DL/DR|31|ENG|70
Ethan Ampadu|DM|24|WAL|77|leader
Ao Tanaka|MC|26|JPN|76
Anton Stach|MC/DM|26|GER|77|sniper
Sean Longstaff|MC|27|ENG|75
Ilia Gruev|DM|25|BUL|73
Brenden Aaronson|AMC/AMR|24|USA|75|engine
Daniel James|AMR/AML|27|WAL|75|pace
Willy Gnonto|AMR/AML|21|ITA|75/80
Noah Okafor|AML|25|SUI|77
Jack Harrison|AML|28|ENG|74
Dominic Calvert-Lewin|ST|28|ENG|76|aerial
Lukas Nmecha|ST|26|GER|74
Joël Piroe|ST|26|NED|74
`),U("Burnley","BUR",68,"Turf Moor",21944,["#6C1D45","#99D6EA"],30,`
Martin Dúbravka|GK|36|SVK|76
Max Weiß|GK|21|GER|70/77
Maxime Estève|DC|23|FRA|77/81
Joe Worrall|DC|28|ENG|72
Hjalmar Ekdal|DC|26|SWE|73
Axel Tuanzebe|DC/DR|27|COD|72
Bashir Humphreys|DC/DL|22|ENG|72/77
Kyle Walker|DR|35|ENG|77|pace,leader
Quilindschy Hartman|DL|23|NED|74
Lucas Pires|DL|24|BRA|72
Connor Roberts|DR|29|WAL|72
Oliver Sonne|DR|24|DEN|71
Josh Cullen|DM|29|IRL|76
Lesley Ugochukwu|DM|21|FRA|73/80
Florentino Luís|DM|26|POR|77|tackler
Josh Laurent|MC|30|ENG|72
Hannibal Mejbri|AMC/MC|22|TUN|74
Jaidon Anthony|AML|25|ENG|74
Loum Tchaouna|AMR|22|FRA|73
Marcus Edwards|AMR|26|ENG|74|dribbler
Jacob Bruun Larsen|AML|26|DEN|72
Zian Flemming|AMC/ST|26|NED|75
Armando Broja|ST|23|ALB|74
Lyle Foster|ST|24|RSA|73
`),U("Sunderland","SUN",68,"Stadium of Light",48707,["#EB172B","#FFFFFF"],40,`
Robin Roefs|GK|22|NED|76/81
Anthony Patterson|GK|25|ENG|72
Dan Ballard|DC|25|NIR|74|aerial
Luke O'Nien|DC/DR|30|ENG|72
Omar Alderete|DC|28|PAR|76
Nordi Mukiele|DR/DC|27|FRA|77
Lutsharel Geertruida|DR/DC|24|NED|76
Trai Hume|DR|23|NIR|73
Reinildo Mandava|DL|31|MOZ|76
Dennis Cirkin|DL|23|ENG|71
Arthur Masuaku|DL|31|COD|72
Granit Xhaka|MC/DM|32|SUI|83|playmaker,leader
Noah Sadiki|DM|20|COD|75/83
Habib Diarra|MC|21|SEN|76/82
Enzo Le Fée|MC/AMC|25|FRA|77
Dan Neil|MC|23|ENG|72
Chris Rigg|MC/AMC|18|ENG|72/86
Patrick Roberts|AMR|28|ENG|72
Simon Adingra|AML|23|CIV|76
Chemsdine Talbi|AMR|20|MAR|74/81
Bertrand Traoré|AMR|29|BFA|74
Romaine Mundle|AML|22|ENG|70
Wilson Isidor|ST|24|FRA|76
Brian Brobbey|ST|23|NED|77|strong
Eliezer Mayenda|ST|20|ESP|72/80
`)]},uM={id:"eng2",name:"Championship",short:"CHA",country:"ENG",tier:2,tv:9,europe:0,promoteTo:"eng1",promotedAuto:2,playoffs:!0,clubs:[U("Leicester City","LEI",66,"King Power Stadium",32259,["#003090","#FDBE11"],25,`
Jakub Stolarczyk|GK|24|POL|70/75
Asmir Begović|GK|38|BIH|67
Jannik Vestergaard|DC|32|DEN|74|aerial
Caleb Okoli|DC|23|ITA|72
Ricardo Pereira|DR|31|POR|74
Victor Kristiansen|DL|22|DEN|72
Harry Winks|DM|29|ENG|74|playmaker
Oliver Skipp|DM|24|ENG|73
Hamza Choudhury|DM|27|ENG|71
Jordan James|MC|21|WAL|71/77
Stephy Mavididi|AML|27|ENG|76|dribbler
Abdul Fatawu|AMR|21|GHA|74/80|pace
Kasey McAteer|AMR|23|IRL|70
Bobby De Cordova-Reid|AMR|32|JAM|70
Jordan Ayew|ST/AMR|33|GHA|72
Patson Daka|ST|26|ZAM|72
`),U("Ipswich Town","IPS",64,"Portman Road",30056,["#0033A0","#FFFFFF"],25,`
Christian Walton|GK|29|ENG|70
Alex Palmer|GK|28|ENG|72
Cameron Burgess|DC|29|AUS|70
Dara O'Shea|DC|26|IRL|74
Jacob Greaves|DC|24|ENG|72
Leif Davis|DL|25|ENG|75|crosser
Ben Johnson|DR|25|ENG|71
Jens Cajuste|MC|25|SWE|74
Azor Matusiwa|DM|27|NED|73
Kalvin Phillips|DM|29|ENG|72
Marcelino Núñez|MC|25|CHI|72
Conor Chaplin|AMC|28|ENG|72
Sam Szmodics|AMC|29|IRL|71
Jack Clarke|AML|24|ENG|76|dribbler
Jaden Philogene|AML|23|ENG|74
Sindre Walle Egeli|AMR|19|NOR|70/80
Wes Burns|AMR|30|WAL|70
George Hirst|ST|26|SCO|71
Chuba Akpom|ST|29|ENG|71
Ivan Azón|ST|22|ESP|71/77
`),U("Southampton","SOU",63,"St Mary's Stadium",32384,["#D71920","#FFFFFF"],25,`
Gavin Bazunu|GK|23|IRL|72
Alex McCarthy|GK|35|ENG|68
Taylor Harwood-Bellis|DC|23|ENG|75
Nathan Wood|DC|23|ENG|70
Jack Stephens|DC|31|ENG|70
Ryan Manning|DL|29|IRL|72|set
James Bree|DR|27|ENG|69
Flynn Downes|DM|26|ENG|73
Shea Charles|DM|21|NIR|72/77
Joe Aribo|MC|28|NGA|72
Will Smallbone|MC|25|IRL|71
Finn Azaz|AMC|24|IRL|73
Tom Fellows|AMR|21|ENG|72/78
Leo Scienza|AML|26|BRA|72
Samuel Edozie|AML|22|ENG|70
Adam Armstrong|ST|28|ENG|74
Cameron Archer|ST|23|ENG|73
Ross Stewart|ST|28|SCO|70
Damion Downs|ST|20|USA|71/78
`),U("Sheffield United","SHU",60,"Bramall Lane",32050,["#EE2737","#FFFFFF"],15,`
Michael Cooper|GK|25|ENG|71
Harrison Burrows|DL|23|ENG|72
Jack Robinson|DC|31|ENG|70
Japhet Tanganga|DC|26|ENG|71
Anel Ahmedhodžić|DC|26|BIH|73
Gustavo Hamer|MC|28|NED|75|sniper
Sydie Peck|MC|20|ENG|70/76
Tom Davies|MC|27|ENG|70
Callum O'Hare|AMC|27|ENG|72
Andre Brooks|AMR|22|ENG|70
Tyrese Campbell|ST|25|ENG|72
Rhian Brewster|ST|25|ENG|69
`),U("Middlesbrough","MID",60,"Riverside Stadium",34742,["#E11B22","#FFFFFF"],20,`
Sol Brynn|GK|24|ENG|70
Seny Dieng|GK|30|SEN|70
Dael Fry|DC|27|ENG|72
George Edmundson|DC|28|ENG|70
Luke Ayling|DR|33|ENG|70
Callum Brittain|DR|27|ENG|72
Matt Targett|DL|29|ENG|70
Hayden Hackney|MC|23|ENG|75/79|playmaker
Aidan Morris|DM|23|USA|72
Alan Browne|MC|30|IRL|69
Riley McGree|AMC|27|AUS|72
Delano Burgzorg|AML|26|NED|72
Morgan Whittaker|AMR|24|ENG|74
Micah Hamilton|AML|21|ENG|69/75
Tommy Conway|ST|22|SCO|71
`),U("Coventry City","COV",60,"Coventry Building Society Arena",32609,["#77B0E0","#FFFFFF"],20,`
Oliver Dovin|GK|22|SWE|70/75
Bobby Thomas|DC|24|ENG|71
Liam Kitching|DC|25|ENG|71
Joel Latibeaudiere|DC|25|JAM|70
Milan van Ewijk|DR|24|NED|73
Jay Dasilva|DL|27|ENG|71
Ben Sheaf|DM|27|ENG|71
Victor Torp|MC|25|DEN|71
Matt Grimes|MC|30|ENG|72
Jack Rudoni|AMC|24|ENG|74
Tatsuhiro Sakamoto|AMR|28|JPN|71
Ephron Mason-Clark|AML|26|ENG|71
Haji Wright|ST|27|USA|74
Ellis Simms|ST|24|ENG|72
Brandon Thomas-Asante|ST|26|GHA|71
`),U("Bristol City","BRC",57,"Ashton Gate",27e3,["#E21B23","#FFFFFF"],15,`
Max O'Leary|GK|28|IRL|70
Radek Vítek|GK|21|CZE|70/77
Rob Dickie|DC|29|ENG|70
Zak Vyner|DC|28|ENG|71
Ross McCrorie|DR|27|SCO|71
Cameron Pring|DL|27|ENG|69
Jason Knight|MC|24|IRL|73
Joe Williams|MC|28|ENG|70
Scott Twine|AMC|26|ENG|73|set
Anis Mehmeti|AML|24|ALB|73
Mark Sykes|AMR|28|IRL|70
Yu Hirakawa|AMR|24|JPN|70
Sinclair Armstrong|ST|22|IRL|70
Emil Riis Jakobsen|ST|27|DEN|71
Nahki Wells|ST|35|BER|67
`),U("West Bromwich Albion","WBA",60,"The Hawthorns",26688,["#122F67","#FFFFFF"],18,`
Josh Griffiths|GK|23|ENG|70
Kyle Bartley|DC|34|ENG|69
Darnell Furlong|DR|29|ENG|71
Callum Styles|DL/MC|25|HUN|72
Alex Mowatt|MC|30|ENG|71
Jayson Molumby|MC|26|IRL|71
Ousmane Diakité|MC|25|MLI|70
Toby Collyer|DM|21|ENG|70/77
Isaac Price|AMC|21|NIR|71/77
Karlan Grant|AML|27|ENG|71
Mikey Johnston|AML|26|IRL|71
Josh Maja|ST|26|NGA|73
Aune Heggebø|ST|24|NOR|70
`),U("Norwich City","NOR",58,"Carrow Road",27359,["#FFF200","#00A650"],15,`
Vladan Kovačević|GK|27|BIH|71
Shane Duffy|DC|33|IRL|70|aerial
José Córdoba|DC|24|BUL|71
Jack Stacey|DR|29|ENG|70
Kellen Fisher|DR|21|ENG|70/76
Kenny McLean|MC|33|SCO|70
Liam Gibbs|MC|22|ENG|71
Jacob Wright|MC|20|ENG|69/76
Emiliano Marcondes|AMC|30|DEN|70
Oscar Schwartau|AMC|18|DEN|67/80
Borja Sainz|AML|24|ESP|74|dribbler
Ante Crnac|ST|21|CRO|72/78
Josh Sargent|ST|25|USA|74
Mathias Kvistgaarden|ST|23|DEN|72
`),U("Watford","WAT",56,"Vicarage Road",22200,["#FBEE23","#ED2127"],12,`
Egil Selvik|GK|27|NOR|68
Ryan Porteous|DC|26|SCO|70
Mattie Pollock|DC|23|ENG|70
James Abankwah|DC|21|IRL|68
Edo Kayembe|DM|27|COD|71
Imrân Louza|MC|26|MAR|72
Giorgi Chakvetadze|AMC|25|GEO|71
Kwadwo Baah|AML|22|GER|70
Rocco Vata|AMR|20|IRL|68/75
Vakoun Issouf Bayo|ST|28|CIV|70
Mamadou Doumbia|ST|19|MLI|68/76
Luca Kjerrumgaard|ST|22|DEN|70
`),U("Millwall","MLW",54,"The Den",20146,["#001D5E","#FFFFFF"],10,`
Lukas Jensen|GK|26|DEN|70
Jake Cooper|DC|30|ENG|70|aerial
Joe Bryan|DL|31|ENG|68
Wes Harding|DR|28|ENG|68
Billy Mitchell|DM|24|ENG|70
Casper De Norre|MC|27|BEL|70
George Honeyman|MC|30|ENG|68
Camiel Neghli|AMC|23|NED|70
Femi Azeez|AMR|24|ENG|71
Mihailo Ivanović|ST|20|SRB|70/76
Macaulay Langstaff|ST|28|ENG|70
`),U("Preston North End","PNE",54,"Deepdale",23404,["#FFFFFF","#0A1F44"],10,`
Daniel Iversen|GK|28|DEN|71
Jordan Storey|DC|28|ENG|70
Liam Lindsay|DC|29|SCO|69
Andrija Vukčević|DL|28|MNE|68
Thierry Small|DL|20|ENG|68/74
Ben Whiteman|MC|29|ENG|70
Ali McCann|MC|25|NIR|69
Robbie Brady|DL|33|IRL|69|set
Mads Frøkjær-Jensen|AMC|26|DEN|70
Lewis Dobbin|AML|22|ENG|69
Milutin Osmajić|ST|26|MNE|70
Daniel Jebbison|ST|21|CAN|69/75
Michael Smith|ST|33|ENG|67
`),U("Blackburn Rovers","BLB",55,"Ewood Park",31367,["#009EE0","#FFFFFF"],10,`
Aynsley Pears|GK|27|ENG|70
Balázs Tóth|GK|28|HUN|68
Scott Wharton|DC|27|ENG|69
Hayden Carter|DC|25|ENG|70
Ryan Alebiosu|DR|23|ENG|70
Harry Pickering|DL|26|ENG|69
Sondre Tronstad|MC|30|NOR|70
Lewis Travis|DM|27|ENG|69
Todd Cantwell|AMC|27|ENG|72
Ryoya Morishita|AML|28|JPN|70
Makhtar Gueye|ST|27|SEN|70
Yuki Ohashi|ST|28|JPN|70
`),U("Hull City","HUL",54,"MKM Stadium",25586,["#F5A12D","#000000"],12,`
Ivor Pandur|GK|25|CRO|70
Charlie Hughes|DC|21|ENG|70/76
Ryan Giles|DL|25|ENG|71|crosser
Lewie Coyle|DR|29|ENG|69
John Lundstram|DM|31|ENG|70
Regan Slater|MC|25|ENG|69
Matt Crooks|MC|31|ENG|69
Kieran Dowell|AMC|27|ENG|69
Mohamed Belloumi|AMR|23|ALG|70
Joe Gelhardt|ST|23|ENG|70
Oli McBurnie|ST|29|SCO|70
Kyle Joseph|ST|23|WAL|69
`),U("Derby County","DER",56,"Pride Park",33597,["#FFFFFF","#000000"],10,`
Jacob Widell Zetterström|GK|26|SWE|70
Nathaniel Phillips|DC|28|ENG|70
Sondre Langås|DC|24|NOR|69
Kane Wilson|DR|25|ENG|68
Callum Elder|DL|30|AUS|68
Ebou Adams|DM|29|GAM|68
David Ozoh|MC|20|ENG|69/76
Ben Brereton Díaz|AML|26|CHI|71
Carlton Morris|ST|29|ENG|72
Patrick Agyemang|ST|24|USA|70
Jerry Yates|ST|28|ENG|69
Lars-Jørgen Salvesen|ST|29|NOR|68
`),U("Portsmouth","POR",54,"Fratton Park",20867,["#001489","#FFFFFF"],10,`
Nicolas Schmid|GK|28|AUT|69
Regan Poole|DC|27|WAL|69
Conor Shaughnessy|DC|29|IRL|69
Hayden Matthews|DC|21|AUS|68/75
Jordan Williams|DR|25|WAL|68
Connor Ogilvie|DL|29|ENG|68
Marlon Pack|DM|34|ENG|68|leader
Andre Dozzell|MC|26|ENG|69
John Swift|AMC|30|ENG|70|set
Josh Murphy|AML|30|ENG|70
Callum Lang|AMR|26|ENG|70
Adrian Segečić|AMR|21|AUS|68/75
Colby Bishop|ST|28|ENG|70
Mark O'Mahony|ST|20|IRL|68/75
`),U("Oxford United","OXF",50,"Kassam Stadium",12500,["#FFDD00","#0F1E4A"],8,`
Jamie Cumming|GK|25|ENG|68
Elliott Moore|DC|28|ENG|68
Ciaron Brown|DC|27|NIR|68
Sam Long|DR|30|ENG|67
Greg Leigh|DL|31|JAM|67
Cameron Brannagan|MC|29|ENG|70
Will Vaulks|DM|31|WAL|68
Brian De Keersmaecker|MC|24|BEL|68
Tyler Goodrham|AMR|21|IRL|68/74
Przemysław Płacheta|AML|27|POL|69
Siriki Dembélé|AML|28|BFA|69
Mark Harris|ST|26|WAL|68
Will Lankshear|ST|20|ENG|68/76
`),U("Stoke City","STK",55,"bet365 Stadium",30089,["#E03A3E","#FFFFFF"],15,`
Viktor Johansson|GK|26|SWE|72
Ben Wilmot|DC|25|ENG|71
Michael Rose|DC|29|SCO|68
Ashley Phillips|DC|20|ENG|69/76
Junior Tchamadeu|DR|21|ENG|70/76
Eric Bocat|DL|25|FRA|68
Lewis Baker|MC|30|ENG|70|set
Tatsuki Seko|MC|27|JPN|69
Bae Jun-ho|AMC|21|KOR|70/77
Million Manhoef|AMR|23|NED|71
Sorba Thomas|AML|26|WAL|70|crosser
Robert Bozeník|ST|25|SVK|70
Sam Gallagher|ST|29|ENG|69
`),U("Queens Park Rangers","QPR",53,"Loftus Road",18439,["#005CAB","#FFFFFF"],8,`
Paul Nardi|GK|31|FRA|69
Jimmy Dunne|DC|27|IRL|69
Steve Cook|DC|34|ENG|68
Kenneth Paal|DL|27|SUR|70
Sam Field|DM|27|ENG|68
Jonathan Varane|DM|23|FRA|68
Nicolas Madsen|MC|24|DEN|69
Ilias Chair|AMC|27|MAR|73|dribbler
Paul Smyth|AML|27|NIR|69
Koki Saito|AML|24|JPN|70
Karamoko Dembélé|AMR|22|FRA|70
Rumarn Burrell|ST|24|ENG|68
Richard Kone|ST|22|CIV|69
Michael Frey|ST|31|SUI|68
`),U("Swansea City","SWA",55,"Swansea.com Stadium",21088,["#FFFFFF","#000000"],10,`
Lawrence Vigouroux|GK|31|CHI|69
Ben Cabango|DC|25|WAL|71
Harry Darling|DC|25|SCO|70
Josh Key|DR|25|ENG|69
Josh Tymon|DL|25|ENG|70
Jay Fulton|MC|31|SCO|68
Gonçalo Franco|MC|24|POR|70
Marko Stamenić|MC|23|NZL|68
Ronald|AMR|23|BRA|71
Zeidane Inoussa|AML|23|FRA|68
Liam Cullen|ST|26|WAL|69
Žan Vipotnik|ST|23|SVN|70
Adam Idah|ST|24|IRL|72
`),U("Sheffield Wednesday","SHW",52,"Hillsborough",39732,["#003A70","#FFFFFF"],2,`
Pierce Charles|GK|20|NIR|69/76
Di'Shon Bernard|DC|24|JAM|68
Dominic Iorfa|DC|30|ENG|68
Yan Valery|DR|26|TUN|68
Max Lowe|DL|28|ENG|67
Liam Palmer|DR|33|SCO|66
Barry Bannan|MC|35|SCO|69|playmaker,leader
Svante Ingelsson|MC|27|SWE|68
Nathaniel Chalobah|DM|30|ENG|68
Olaf Kobacki|AML|24|POL|67
Jamal Lowe|ST|30|JAM|67
Bailey Cadamarteri|ST|19|JAM|67/75
`),U("Charlton Athletic","CHA",50,"The Valley",27111,["#D4021D","#FFFFFF"],8,`
Thomas Kaminski|GK|32|BEL|69
Lloyd Jones|DC|29|ENG|67
Macaulay Gillesphey|DC|29|ENG|67
Kayne Ramsay|DR|24|ENG|66
Greg Docherty|MC|28|SCO|68
Conor Coventry|DM|25|IRL|67
Karoy Anderson|MC|20|ENG|66/73
Sonny Carey|AMC|24|ENG|66
Luke Berry|MC|33|ENG|65
Tyreece Campbell|AML|21|ENG|67/73
Miles Leaburn|ST|21|ENG|67/74
Isaac Olaofe|ST|25|NGA|67
Charlie Kelman|ST|23|ENG|67
Matty Godden|ST|33|ENG|66
`),U("Wrexham","WRE",52,"Racecourse Ground",12600,["#E4002B","#FFFFFF"],30,`
Arthur Okonkwo|GK|23|ENG|68
Danny Ward|GK|32|WAL|67
Max Cleworth|DC|23|WAL|67
Callum Doyle|DC|21|ENG|70/76
Dominic Hyam|DC|29|SCO|70
Conor Coady|DC|32|ENG|69|leader
Issa Kaboré|DR|24|BFA|69
Liberato Cacace|DL|24|NZL|69
George Dobson|DM|27|ENG|68
Lewis O'Brien|MC|26|ENG|70
Matty James|MC|34|ENG|67
Oliver Rathbone|MC|28|WAL|68
Josh Windass|AMC|31|ENG|69
Elliot Lee|AMC|30|ENG|67
Ryan Longman|AMR|24|ENG|68
Nathan Broadhead|AML|27|WAL|70
Kieffer Moore|ST|32|WAL|70|aerial
Sam Smith|ST|27|ENG|68
Jay Rodriguez|ST|36|ENG|66
`),U("Birmingham City","BIR",58,"St Andrew's",29409,["#0000FF","#FFFFFF"],35,`
Ryan Allsop|GK|32|ENG|68
Christoph Klarer|DC|25|AUT|70
Phil Neumann|DC|28|GER|68
Bright Osayi-Samuel|DR|27|NGA|70
Ethan Laird|DR|23|ENG|69
Alex Cochrane|DL|25|SCO|68
Kai Wagner|DL|28|GER|68
Krystian Bielik|DM|27|POL|70
Tomoki Iwata|MC|28|JPN|70
Paik Seung-ho|MC|28|KOR|69
Tommy Doyle|MC|23|ENG|70
Willum Þór Willumsson|MC|26|ISL|69
Demarai Gray|AML|29|ENG|71
Carlos Vicente|AMR|26|ESP|69
Keshi Anderson|AML|30|ENG|67
Jay Stansfield|ST|22|ENG|72/78
Kyogo Furuhashi|ST|30|JPN|71
Marvin Ducksch|ST|31|GER|70
Lyndon Dykes|ST|29|SCO|68
`)]},cM={id:"esp1",name:"La Liga",short:"LAL",country:"ESP",tier:1,tv:45,europe:5,clubs:[U("Real Madrid","RMA",97,"Santiago Bernabéu",83186,["#FFFFFF","#FEBE10"],250,`
Thibaut Courtois|GK|33|BEL|89|shotstopper
Andriy Lunin|GK|26|UKR|78
Dani Carvajal|DR|33|ESP|83|leader
Trent Alexander-Arnold|DR|26|ENG|86|playmaker,crosser,set
Éder Militão|DC|27|BRA|84|pace
Antonio Rüdiger|DC|32|GER|84|hardman,strong
Dean Huijsen|DC|20|ESP|82/90|playmaker
Raúl Asencio|DC|22|ESP|78/83
David Alaba|DC/DL|33|AUT|78
Álvaro Carreras|DL|22|ESP|82/86
Ferland Mendy|DL|30|FRA|80
Fran García|DL|25|ESP|77
Aurélien Tchouaméni|DM|25|FRA|85|tackler
Federico Valverde|MC/AMR|26|URU|88|engine,sniper
Eduardo Camavinga|MC|22|FRA|84/88
Jude Bellingham|AMC/MC|22|ENG|89/93|leader,engine
Arda Güler|AMC|20|TUR|83/90|playmaker,set
Dani Ceballos|MC|28|ESP|78
Franco Mastantuono|AMR|17|ARG|76/90|flair
Brahim Díaz|AMR/AMC|25|MAR|80|dribbler
Rodrygo|AMR/AML|24|BRA|84
Vinícius Júnior|AML|24|BRA|90|pace,dribbler,flair
Kylian Mbappé|ST/AML|26|FRA|91|pace,finisher
Endrick|ST|19|BRA|77/90|strong
Gonzalo García|ST|21|ESP|74/82
`),U("Barcelona","BAR",96,"Spotify Camp Nou",62e3,["#A50044","#004D98"],60,`
Joan García|GK|24|ESP|82/86|shotstopper
Marc-André ter Stegen|GK|33|GER|85|sweeper
Wojciech Szczęsny|GK|35|POL|80
Jules Koundé|DR/DC|26|FRA|85|pace
Pau Cubarsí|DC|18|ESP|82/91|playmaker
Ronald Araújo|DC|26|URU|82|strong,pace
Andreas Christensen|DC|29|DEN|79
Eric García|DC/DM|24|ESP|79
Alejandro Balde|DL|21|ESP|82/86|pace
Gerard Martín|DL|23|ESP|75
Pedri|MC|22|ESP|89/91|playmaker,dribbler
Frenkie de Jong|MC/DM|28|NED|86|playmaker
Gavi|MC|20|ESP|82/88|engine,hardman
Marc Casadó|DM|21|ESP|78/83
Marc Bernal|DM|18|ESP|72/85
Fermín López|AMC|22|ESP|81/85
Dani Olmo|AMC|27|ESP|84|sniper
Lamine Yamal|AMR|17|ESP|90/96|dribbler,flair,playmaker
Raphinha|AML|28|BRA|88|sniper,set
Marcus Rashford|AML|27|ENG|80|pace
Roony Bardghji|AMR|19|SWE|72/82
Ferran Torres|ST/AML|25|ESP|79
Robert Lewandowski|ST|36|POL|85|finisher
`),U("Atlético Madrid","ATM",90,"Riyadh Air Metropolitano",70460,["#CB3524","#FFFFFF"],80,`
Jan Oblak|GK|32|SVN|86|shotstopper
Juan Musso|GK|31|ARG|76
José María Giménez|DC|30|URU|81|hardman
Robin Le Normand|DC|28|ESP|81
Clément Lenglet|DC|30|FRA|77
David Hancko|DC/DL|27|SVK|81
Marc Pubill|DR/DC|22|ESP|76/81
Nahuel Molina|DR|27|ARG|79
Matteo Ruggeri|DL|22|ITA|77/81
Javi Galán|DL|30|ESP|75
Marcos Llorente|DR/MC|30|ESP|81|engine,pace
Koke|MC|33|ESP|80|leader
Pablo Barrios|MC|22|ESP|81/86
Johnny Cardoso|DM|23|USA|78/82
Conor Gallagher|MC|25|ENG|81|engine
Àlex Baena|AML/AMC|23|ESP|83/86|playmaker,set
Thiago Almada|AMC|24|ARG|80
Giuliano Simeone|AMR|22|ARG|78/82
Nico González|AML/AMR|27|ARG|79
Antoine Griezmann|ST/AMC|34|FRA|84|playmaker
Julián Álvarez|ST|25|ARG|87|finisher,engine
Alexander Sørloth|ST|29|NOR|81|aerial
Giacomo Raspadori|ST|25|ITA|78
`),U("Athletic Club","ATH",82,"San Mamés",53289,["#EE2523","#FFFFFF"],50,`
Unai Simón|GK|28|ESP|84
Álex Padilla|GK|21|MEX|70/77
Dani Vivian|DC|25|ESP|81
Aitor Paredes|DC|25|ESP|78
Aymeric Laporte|DC|31|ESP|79
Yeray Álvarez|DC|30|ESP|76
Andoni Gorosabel|DR|28|ESP|76
Jesús Areso|DR|26|ESP|76
Óscar de Marcos|DR|36|ESP|73|leader
Yuri Berchiche|DL|35|ESP|75
Adama Boiro|DL|23|ESP|73
Mikel Jauregizar|MC|21|ESP|77/84
Beñat Prados|MC|24|ESP|76
Mikel Vesga|DM|32|ESP|74
Iñigo Ruiz de Galarreta|MC|31|ESP|77
Oihan Sancet|AMC|25|ESP|81|aerial
Unai Gómez|AMC|22|ESP|73
Álex Berenguer|AML/AMR|30|ESP|76
Robert Navarro|AMR|23|ESP|74
Nico Williams|AML|23|ESP|85|pace,dribbler
Iñaki Williams|AMR/ST|31|GHA|79|pace
Gorka Guruzeta|ST|28|ESP|77
Maroan Sannadi|ST|24|MAR|72
`),U("Villarreal","VIL",81,"Estadio de la Cerámica",23500,["#FFE667","#005187"],40,`
Luiz Júnior|GK|24|BRA|77
Diego Conde|GK|27|ESP|75
Arnau Tenas|GK|24|ESP|72
Juan Foyth|DC/DR|27|ARG|79
Logan Costa|DC|24|CPV|78
Renato Veiga|DC|21|POR|77/82
Rafa Marín|DC|23|ESP|77
Willy Kambwala|DC|20|FRA|72/79
Santiago Mouriño|DC/DR|23|URU|74
Sergi Cardona|DL|26|ESP|76
Alfonso Pedraza|DL|29|ESP|77
Kiko Femenía|DR|34|ESP|71
Dani Parejo|MC|36|ESP|77|playmaker,set
Santi Comesaña|MC|28|ESP|77
Pape Gueye|DM|26|SEN|76
Thomas Partey|DM|32|GHA|80
Alberto Moleiro|AML/AMC|21|ESP|79/85|dribbler
Tajon Buchanan|AMR|26|CAN|75
Nicolas Pépé|AMR|30|CIV|77
Ilias Akhomach|AMR|21|MAR|74/80
Ayoze Pérez|ST/AML|31|ESP|79
Gerard Moreno|ST|33|ESP|79|finisher
Georges Mikautadze|ST|24|GEO|78
Tani Oluwaseyi|ST|25|CAN|72
`),U("Real Betis","BET",80,"Estadio La Cartuja",57619,["#00954C","#FFFFFF"],35,`
Álvaro Vallés|GK|28|ESP|77
Pau López|GK|30|ESP|76
Adrián|GK|38|ESP|67
Héctor Bellerín|DR|30|ESP|76
Aitor Ruibal|DR/AMR|29|ESP|74
Diego Llorente|DC|31|ESP|77
Marc Bartra|DC|34|ESP|74
Natan|DC|24|BRA|77
Valentín Gómez|DC|21|ARG|74/80
Junior Firpo|DL|28|DOM|75
Ricardo Rodríguez|DL|32|SUI|75
Sofyan Amrabat|DM|28|MAR|78|tackler
Marc Roca|DM|28|ESP|77
Sergi Altimira|MC|24|ESP|74
Nelson Deossa|MC|25|COL|75
Pablo Fornals|AMC|29|ESP|79
Isco|AMC|33|ESP|80|playmaker,flair
Giovani Lo Celso|AMC|29|ARG|79
Antony|AMR|25|BRA|79|dribbler
Abde Ezzalzouli|AML|23|MAR|78|dribbler
Rodrigo Riquelme|AML|25|ESP|76
Cucho Hernández|ST|26|COL|78
Chimy Ávila|ST|31|ARG|74
Cédric Bakambu|ST|34|COD|73
`),U("Real Sociedad","RSO",80,"Reale Arena",39500,["#0067B1","#FFFFFF"],40,`
Álex Remiro|GK|30|ESP|83
Unai Marrero|GK|23|ESP|70
Igor Zubeldia|DC|28|ESP|79
Jon Martín|DC|19|ESP|72/82
Duje Ćaleta-Car|DC|28|CRO|75
Jon Pacheco|DC|24|ESP|74
Aritz Elustondo|DC/DR|31|ESP|73
Jon Aramburu|DR|22|VEN|75
Álvaro Odriozola|DR|29|ESP|73
Aihen Muñoz|DL|27|ESP|73
Sergio Gómez|DL|24|ESP|75
Jon Gorrotxategi|DM|21|ESP|73/79
Beñat Turrientes|MC|23|ESP|74
Pablo Marín|MC|21|ESP|73/79
Carlos Soler|MC|28|ESP|78
Luka Sučić|MC/AMC|22|CRO|77/82
Brais Méndez|MC/AMR|28|ESP|79
Arsen Zakharyan|AMC|22|RUS|75
Takefusa Kubo|AMR|24|JPN|82|dribbler
Ander Barrenetxea|AML|23|ESP|78
Gonçalo Guedes|AML|28|POR|75
Mikel Oyarzabal|ST/AML|28|ESP|83|finisher,leader
Orri Óskarsson|ST|21|ISL|74/80
`),U("Valencia","VAL",76,"Mestalla",49430,["#FFFFFF","#000000"],10,`
Julen Agirrezabala|GK|24|ESP|76
Stole Dimitrievski|GK|31|MKD|76
Mouctar Diakhaby|DC|28|FRA|76
César Tárrega|DC|23|ESP|75
José Copete|DC|26|ESP|73
Eray Cömert|DC|27|SUI|72
Dimitri Foulquier|DR|32|FRA|72
Thierry Correia|DR|26|POR|73
José Gayà|DL|30|ESP|78|leader
Jesús Vázquez|DL|22|ESP|73
Pepelu|DM|27|ESP|76
Javi Guerra|MC|22|ESP|77/82
Baptiste Santamaria|DM|30|FRA|74
Filip Ugrinić|MC|26|SUI|74
André Almeida|AMC|25|POR|76
Luis Rioja|AML|31|ESP|76
Diego López|AMR|23|ESP|76
Arnaut Danjuma|AML|28|NED|75
Largie Ramazani|AML|24|BEL|73
Hugo Duro|ST|25|ESP|76
Lucas Beltrán|ST|24|ARG|75
Dani Raba|ST|29|ESP|73
Umar Sadiq|ST|28|NGA|73
`),U("Celta Vigo","CEL",74,"Abanca-Balaídos",24791,["#8AC3EE","#FFFFFF"],20,`
Iván Villar|GK|28|ESP|74
Ionuț Radu|GK|28|ROU|75
Carl Starfelt|DC|30|SWE|76
Joseph Aidoo|DC|29|GHA|73
Carlos Domínguez|DC|24|ESP|73
Marcos Alonso|DC/DL|34|ESP|74
Óscar Mingueza|DR|26|ESP|77
Javi Rueda|DR|27|ESP|72
Sergio Carreira|DR|24|ESP|72
Manu Fernández|DL|24|ESP|70
Ilaix Moriba|MC|22|GUI|76
Fran Beltrán|MC|26|ESP|75
Hugo Sotelo|DM|21|ESP|72/78
Damián Rodríguez|MC|22|ESP|71
Miguel Román|MC|22|ESP|71
Williot Swedberg|AMC|21|SWE|73
Bryan Zaragoza|AML|24|ESP|76|dribbler
Hugo Álvarez|AML|22|ESP|74
Franco Cervi|AML|31|ARG|72
Iago Aspas|ST/AMC|37|ESP|79|finisher,set
Borja Iglesias|ST|32|ESP|77
Ferran Jutglà|ST|26|ESP|75
Pablo Durán|ST|24|ESP|73
`),U("Rayo Vallecano","RAY",71,"Estadio de Vallecas",14708,["#FFFFFF","#E53027"],15,`
Augusto Batalla|GK|29|ARG|77
Dani Cárdenas|GK|28|ESP|72
Florian Lejeune|DC|34|FRA|76|aerial
Luiz Felipe|DC|28|ITA|75
Nobel Mendy|DC|20|FRA|72/78
Pep Chavarría|DL|27|ESP|75
Andrei Rațiu|DR|27|ROU|77
Iván Balliu|DR|33|ALB|72
Óscar Valentín|DM|31|ESP|76|tackler
Unai López|MC|29|ESP|76
Pathé Ciss|DM|31|SEN|75
Pedro Díaz|MC|26|ESP|73
Gerard Gumbau|MC|30|ESP|72
Óscar Trejo|AMC|37|ARG|72
Isi Palazón|AMR|30|ESP|77|dribbler
Jorge de Frutos|AML|28|ESP|77|pace
Álvaro García|AML|32|ESP|74
Randy Nteka|ST|27|FRA|73
Sergio Camello|ST|24|ESP|74
Alemão|ST|26|BRA|73
`),U("Osasuna","OSA",70,"El Sadar",23576,["#D91A21","#0A346F"],15,`
Sergio Herrera|GK|31|ESP|77
Aitor Fernández|GK|34|ESP|72
Alejandro Catena|DC|30|ESP|77
Enzo Boyomo|DC|23|CMR|75
Jorge Herrando|DC|24|ESP|72
Juan Cruz|DL/DC|32|ESP|72
Abel Bretones|DL|24|ESP|73
Valentin Rosier|DR|29|FRA|72
Íñigo Argibide|DR|19|ESP|68/76
Lucas Torró|DM|31|ESP|76
Jon Moncayola|MC|27|ESP|75
Iker Muñoz|MC|22|ESP|73
Aimar Oroz|AMC|23|ESP|76
Moi Gómez|AML|31|ESP|75
Rubén García|AML|31|ESP|75
Kike Barja|AMR|28|ESP|72
Víctor Muñoz|AML|21|ESP|73/79
Ante Budimir|ST|33|CRO|78|aerial,finisher
Raúl García|ST|24|ESP|73
`),U("Mallorca","MLL",70,"Estadi Mallorca Son Moix",23142,["#E20613","#000000"],15,`
Leo Román|GK|25|ESP|75
Lucas Bergström|GK|22|FIN|70
Martin Valjent|DC|29|SVK|77
Antonio Raíllo|DC|33|ESP|76|leader
Marash Kumbulla|DC|25|ALB|73
Johan Mojica|DL|32|COL|74
Toni Lato|DL|28|ESP|72
Pablo Maffeo|DR|27|ARG|76|hardman
Mateu Morey|DR|25|ESP|71
Omar Mascarell|DM|32|ESP|74
Samú Costa|DM/MC|24|POR|76
Sergi Darder|MC|31|ESP|77|playmaker
Manu Morlanes|MC|26|ESP|74
Antonio Sánchez|MC|28|ESP|73
Pablo Torre|AMC|22|ESP|74
Dani Rodríguez|AMR|37|ESP|72
Jan Virgili|AML|19|ESP|70/79
Takuma Asano|AMR|30|JPN|73
Vedat Muriqi|ST|31|KVX|77|aerial
Abdón Prats|ST|32|ESP|71
Mateo Joseph|ST|21|ESP|72/78
`),U("Getafe","GET",68,"Coliseum",16500,["#005999","#FFFFFF"],10,`
David Soria|GK|32|ESP|78
Jiří Letáček|GK|25|CZE|70
Djené|DC|33|TOG|77|hardman
Domingos Duarte|DC|30|POR|75
Abdel Abqar|DC|26|MAR|74
Juan Iglesias|DR|26|ESP|73
Allan Nyom|DR|37|CMR|69
Diego Rico|DL|32|ESP|73
Mauro Arambarri|MC|29|URU|78|engine
Luis Milla|MC|30|ESP|77|set
Mario Martín|MC|21|ESP|73/79
Carles Aleñá|MC|27|ESP|74
Javi Muñoz|MC|30|ESP|72
Adrián Liso|AMR|20|ESP|72/79
Álex Sancris|AML|22|ESP|70
Abu Kamara|AMR|22|ENG|70
Juanmi|AML|32|ESP|73
Borja Mayoral|ST|28|ESP|76
Juanmi Latasa|ST|24|ESP|72
`),U("Espanyol","ESP",70,"RCDE Stadium",4e4,["#007FC8","#FFFFFF"],10,`
Marko Dmitrović|GK|33|SRB|77
Ángel Fortuño|GK|24|ESP|66
Leandro Cabrera|DC|34|URU|75
Fernando Calero|DC|30|ESP|73
Clemens Riedel|DC|21|GER|71/78
Omar El Hilali|DR|21|MAR|74/80
Rubén Sánchez|DR|24|ESP|70
Carlos Romero|DL|23|ESP|75
Pol Lozano|DM|25|ESP|74
Urko González|DM|24|ESP|73
Charles Pickel|DM|28|SUI|72
Edu Expósito|MC|29|ESP|77|set
Ramón Terrats|MC|24|ESP|73
Tyrhys Dolan|AMR|23|ENG|73
Jofre Carreras|AMR|24|ESP|73
Antoniu Roca|AML|23|ESP|70
Pere Milla|AML/ST|32|ESP|74
Javi Puado|ST/AML|27|ESP|77
Roberto Fernández|ST|23|ESP|73
Kike García|ST|35|ESP|72
`),U("Alavés","ALA",67,"Mendizorrotza",19840,["#0761AF","#FFFFFF"],10,`
Antonio Sivera|GK|28|ESP|77
Raúl Fernández|GK|37|ESP|68
Facundo Garcés|DC|25|ARG|72
Nahuel Tenaglia|DC/DR|29|ARG|73
Moussa Diarra|DC|24|MLI|71
Víctor Parada|DC|23|ESP|70
Jonny Otto|DR|31|ESP|72
Manu Sánchez|DL|24|ESP|72
Youssef Enríquez|DL|19|ESP|68/75
Antonio Blanco|DM|24|ESP|76
Carlos Protesoni|DM|27|URU|72
Carlos Benavídez|MC|27|URU|74
Jon Guridi|MC|30|ESP|74
Ander Guevara|MC|27|ESP|73
Pablo Ibáñez|MC|26|ESP|72
Denis Suárez|AMC|31|ESP|74
Calebe|AMC|25|BRA|71
Abde Rebbach|AML|27|ALG|72
Lucas Boyé|ST|29|ARG|75
Toni Martínez|ST|27|ESP|74
Mariano Díaz|ST|31|DOM|71
`),U("Girona","GIR",74,"Estadi Montilivi",14624,["#CD2534","#FFFFFF"],20,`
Paulo Gazzaniga|GK|33|ARG|77
Dominik Livaković|GK|30|CRO|79
Daley Blind|DC/DL|35|NED|76|playmaker
David López|DC|35|ESP|74
Alejandro Francés|DC|23|ESP|73
Vitor Reis|DC|19|BRA|72/84
Arnau Martínez|DR/DC|22|ESP|77/81
Hugo Rincón|DR|22|ESP|71
Álex Moreno|DL|32|ESP|74
Axel Witsel|DM/DC|36|BEL|74
Jhon Solís|DM|21|COL|72/78
Yangel Herrera|MC|27|VEN|77
Iván Martín|MC|26|ESP|77|playmaker
Azzedine Ounahi|MC|25|MAR|76
Donny van de Beek|MC|28|NED|74
Thomas Lemar|AMC|29|FRA|75
Viktor Tsygankov|AMR|27|UKR|78|sniper
Bryan Gil|AML|24|ESP|74
Joel Roca|AML|20|ESP|71/78
Cristhian Stuani|ST|38|URU|72
Abel Ruiz|ST|25|ESP|74
Vladyslav Vanat|ST|23|UKR|76
`),U("Sevilla","SEV",75,"Ramón Sánchez-Pizjuán",43883,["#FFFFFF","#D40E1A"],5,`
Ørjan Nyland|GK|34|NOR|75
Odysseas Vlachodimos|GK|31|GRE|75
Tanguy Nianzou|DC|23|FRA|74
Kike Salas|DC|23|ESP|74
Marcão|DC|29|BRA|74
Andrés Castrín|DC|20|ESP|69/76
José Ángel Carmona|DR|23|ESP|75
Juanlu Sánchez|DR|22|ESP|76
Gabriel Suazo|DL|27|CHI|74
Nemanja Gudelj|DM/DC|33|SRB|75
Lucien Agoumé|DM|23|FRA|76
Batista Mendy|DM|25|FRA|74
Djibril Sow|MC|28|SUI|76
Joan Jordán|MC|31|ESP|74
Peque Fernández|AMC|23|ESP|72
Rubén Vargas|AML|26|SUI|77
Chidera Ejuke|AML|27|NGA|76|dribbler
Adnan Januzaj|AMR|30|BEL|72
Alfon González|AML|26|ESP|73
Alexis Sánchez|ST/AMC|36|CHI|74
Isaac Romero|ST|25|ESP|73
Akor Adams|ST|25|NGA|74
`),U("Levante","LEV",64,"Ciutat de València",26354,["#004F9F","#B4053F"],5,`
Mathew Ryan|GK|33|AUS|74
Pablo Cuñat|GK|23|ESP|68
Unai Elgezabal|DC|32|ESP|71
Adrián de la Fuente|DC|26|ESP|71
Matías Moreno|DC|22|ARG|72
Jeremy Toljan|DR|30|GER|72
Diego Pampín|DL|25|ESP|70
Oriol Rey|DM|27|ESP|72
Kervin Arriaga|DM|27|HON|72
Unai Vencedor|MC|24|ESP|72
Pablo Martínez|MC|27|ESP|72
Jon Olasagasti|MC|25|ESP|70
Carlos Álvarez|AMC|22|ESP|74/80
Roger Brugué|AMR|28|ESP|71
Víctor García|AML|28|ESP|70
Karl Etta Eyong|ST|21|CMR|73/80
Iván Romero|ST|24|ESP|72
Goduine Koyalipou|ST|25|CTA|71
José Luis Morales|ST|38|ESP|69
`),U("Elche","ELC",63,"Martínez Valero",31388,["#FFFFFF","#05642C"],5,`
Matías Dituro|GK|38|ARG|72
Iñaki Peña|GK|26|ESP|74
David Affengruber|DC|24|AUT|72
Pedro Bigas|DC|35|ESP|70
Víctor Chust|DC|25|ESP|72
John Donald|DC|24|ESP|70
Álvaro Núñez|DR|24|ESP|71
Héctor Fort|DR|18|ESP|71/81
Adrià Pedrosa|DL|27|ESP|72
Aleix Febas|MC|29|ESP|74
Marc Aguado|DM|25|ESP|72
Martim Neto|MC|22|POR|71
Rodrigo Mendoza|MC|20|ESP|71/78
Germán Valera|AMR|23|ESP|73
Yago Santiago|AML|21|ESP|70
Grady Diangana|AML|27|ENG|72
Tete Morente|AMR|29|ESP|72
André Silva|ST|29|POR|75
Rafa Mir|ST|28|ESP|73
Álvaro Rodríguez|ST|21|URU|72/78
`),U("Real Oviedo","OVI",62,"Carlos Tartiere",30500,["#0047AB","#FFFFFF"],5,`
Aarón Escandell|GK|29|ESP|72
Horațiu Moldovan|GK|27|ROU|72
David Carmo|DC|26|POR|73
Dani Calvo|DC|31|ESP|70
Eric Bailly|DC|31|CIV|71
David Costas|DC|30|ESP|70
Nacho Vidal|DR|30|ESP|71
Rahim Alhassane|DL|22|NIG|70
Santiago Colombatto|DM|28|ARG|74
Leander Dendoncker|DM|30|BEL|73
Kwasi Sibo|DM|27|GHA|71
Alberto Reina|MC|27|ESP|72
Ovie Ejaria|MC|27|ENG|71
Luka Ilić|AMC|25|SRB|72
Santi Cazorla|AMC|40|ESP|72|playmaker,set
Ilyas Chaira|AML|23|MAR|72
Haissem Hassan|AMR|23|FRA|72
Salomón Rondón|ST|35|VEN|73|strong
Federico Viñas|ST|26|URU|72
Álex Forés|ST|24|ESP|70
`)]},dM={id:"ita1",name:"Serie A",short:"SEA",country:"ITA",tier:1,tv:40,europe:6,clubs:[U("Napoli","NAP",87,"Stadio Diego Armando Maradona",54726,["#12A0D7","#FFFFFF"],70,`
Alex Meret|GK|28|ITA|81
Vanja Milinković-Savić|GK|28|SRB|79
Giovanni Di Lorenzo|DR/DC|31|ITA|82|leader
Amir Rrahmani|DC|31|KVX|81
Alessandro Buongiorno|DC|26|ITA|82
Sam Beukema|DC|26|NED|80
Juan Jesus|DC|34|BRA|74
Mathías Olivera|DL/DC|27|URU|79
Miguel Gutiérrez|DL|24|ESP|79
Leonardo Spinazzola|DL|32|ITA|76
Pasquale Mazzocchi|DR|29|ITA|72
Stanislav Lobotka|DM|30|SVK|84|playmaker
Frank Anguissa|MC|29|CMR|82|strong,engine
Scott McTominay|MC/AMC|28|SCO|85|engine,finisher
Kevin De Bruyne|AMC/MC|34|BEL|86|playmaker,set
Billy Gilmour|MC/DM|24|SCO|79
Eljif Elmas|MC/AMC|25|MKD|77
Matteo Politano|AMR|31|ITA|80
David Neres|AMR/AML|28|BRA|80|dribbler
Noa Lang|AML|26|NED|80|flair
Rasmus Højlund|ST|22|DEN|79/84|pace,strong
Romelu Lukaku|ST|32|BEL|81|strong
Lorenzo Lucca|ST|24|ITA|76|aerial
`),U("Inter","INT",90,"San Siro",75817,["#010E80","#000000"],90,`
Yann Sommer|GK|36|SUI|84
Josep Martínez|GK|27|ESP|77
Alessandro Bastoni|DC|26|ITA|87|playmaker
Francesco Acerbi|DC|37|ITA|79|leader
Stefan de Vrij|DC|33|NED|80
Yann Bisseck|DC|24|GER|80/83
Manuel Akanji|DC|30|SUI|82
Denzel Dumfries|WBR/DR|29|NED|83|pace,aerial
Federico Dimarco|WBL/DL|27|ITA|85|crosser,set
Carlos Augusto|WBL/DC|26|BRA|78
Matteo Darmian|WBR/DC|35|ITA|76
Luis Henrique|WBR|23|BRA|77
Nicolò Barella|MC|28|ITA|87|engine
Hakan Çalhanoğlu|DM|31|TUR|85|playmaker,set
Henrikh Mkhitaryan|MC|36|ARM|80
Davide Frattesi|MC|25|ITA|80
Petar Sučić|MC|21|CRO|77/84
Piotr Zieliński|MC/AMC|31|POL|81
Andy Diouf|MC|22|FRA|76
Lautaro Martínez|ST|27|ARG|88|finisher,leader
Marcus Thuram|ST|28|FRA|85|strong,pace
Ange-Yoan Bonny|ST|21|FRA|76/82
Francesco Pio Esposito|ST|20|ITA|74/85
`),U("Atalanta","ATA",83,"Gewiss Stadium",24950,["#1E71B8","#000000"],80,`
Marco Carnesecchi|GK|25|ITA|82/85
Marco Sportiello|GK|33|ITA|72
Berat Djimsiti|DC|32|ALB|79
Isak Hien|DC|26|SWE|80|strong
Sead Kolašinac|DC|32|BIH|76
Odilon Kossounou|DC|24|CIV|78
Giorgio Scalvini|DC|21|ITA|80/86
Honest Ahanor|DC|17|NGA|70/84
Raoul Bellanova|WBR|25|ITA|78|pace
Davide Zappacosta|WBR|33|ITA|76
Nicola Zalewski|WBL|23|POL|76
Marten de Roon|DM|34|NED|79|leader
Éderson|MC|26|BRA|82|engine
Mario Pašalić|MC/AMC|30|CRO|79
Yunus Musah|MC|22|USA|76
Lazar Samardžić|AMC|23|SRB|77
Daniel Maldini|AMC|23|ITA|74
Charles De Ketelaere|AMC/ST|24|BEL|82
Ademola Lookman|AML/ST|27|NGA|84|dribbler
Kamaldeen Sulemana|AML|23|GHA|74|pace
Gianluca Scamacca|ST|26|ITA|79
Nikola Krstović|ST|25|MNE|78
`),U("Juventus","JUV",88,"Allianz Stadium",41507,["#000000","#FFFFFF"],60,`
Michele Di Gregorio|GK|28|ITA|82
Mattia Perin|GK|32|ITA|77
Gleison Bremer|DC|28|BRA|85|tackler
Federico Gatti|DC|27|ITA|80|aerial
Pierre Kalulu|DC/DR|25|FRA|80
Lloyd Kelly|DC|26|ENG|77
Juan Cabal|DL|24|COL|76
Andrea Cambiaso|WBL/WBR|25|ITA|83
Filip Kostić|WBL|32|SRB|76|crosser
João Mário|WBR|25|POR|74
Manuel Locatelli|DM|27|ITA|83|playmaker
Khéphren Thuram|MC|24|FRA|81
Weston McKennie|MC|26|USA|79
Teun Koopmeiners|MC/AMC|27|NED|82|sniper
Vasilije Adžić|MC|19|MNE|70/80
Kenan Yıldız|AML|20|TUR|84/90|dribbler,flair
Francisco Conceição|AMR|22|POR|80/84|dribbler
Edon Zhegrova|AMR|26|KVX|80
Jonathan David|ST|25|CAN|84|finisher
Dušan Vlahović|ST|25|SRB|82|strong
Loïs Openda|ST|25|BEL|81|pace
Arkadiusz Milik|ST|31|POL|74
`),U("Roma","ROM",84,"Stadio Olimpico",70634,["#8E1F2F","#F0BC42"],30,`
Mile Svilar|GK|25|SRB|84
Pierluigi Gollini|GK|30|ITA|71
Gianluca Mancini|DC|29|ITA|80|hardman
Evan Ndicka|DC|25|CIV|81
Mario Hermoso|DC|30|ESP|76
Jan Ziółkowski|DC|20|POL|70/79
Zeki Çelik|DR|28|TUR|76
Wesley|DR|21|BRA|77/83
Devyne Rensch|DR|22|NED|75
Angeliño|DL|28|ESP|79
Kostas Tsimikas|DL|29|GRE|76
Bryan Cristante|DM/MC|30|ITA|79
Manu Koné|MC|24|FRA|82|engine
Neil El Aynaoui|MC|24|MAR|76
Niccolò Pisilli|MC|20|ITA|74/81
Lorenzo Pellegrini|AMC|29|ITA|79|set
Tommaso Baldanzi|AMC|22|ITA|74
Matías Soulé|AMR|22|ARG|80/84
Paulo Dybala|AMC/ST|31|ARG|82|flair,set
Stephan El Shaarawy|AML|32|ITA|76
Leon Bailey|AMR|27|JAM|77|pace
Artem Dovbyk|ST|28|UKR|80|aerial
Evan Ferguson|ST|20|IRL|75/83
`),U("Fiorentina","FIO",79,"Stadio Artemio Franchi",43147,["#482E92","#FFFFFF"],35,`
David de Gea|GK|34|ESP|83|shotstopper
Oliver Christensen|GK|26|DEN|72
Luca Ranieri|DC|26|ITA|77
Marin Pongračić|DC|27|CRO|76
Pablo Marí|DC|31|ESP|76
Dodô|WBR/DR|26|BRA|80
Robin Gosens|WBL|31|GER|78
Fabiano Parisi|WBL|24|ITA|75
Tariq Lamptey|WBR|24|GHA|73
Niccolò Fortini|WBR|19|ITA|70/78
Rolando Mandragora|MC|28|ITA|78
Nicolò Fagioli|MC/DM|24|ITA|78
Simon Sohm|MC|24|SUI|76
Hans Nicolussi Caviglia|DM|25|ITA|76
Cher Ndour|MC|20|ITA|74/80
Amir Richardson|MC|23|MAR|73
Albert Guðmundsson|AMC/ST|28|ISL|79
Jacopo Fazzini|AMC|22|ITA|74
Moise Kean|ST|25|ITA|83|pace,strong
Edin Džeko|ST|39|BIH|75|aerial
Roberto Piccoli|ST|24|ITA|76
`),U("Lazio","LAZ",80,"Stadio Olimpico",70634,["#87D8F7","#FFFFFF"],15,`
Ivan Provedel|GK|31|ITA|80
Christos Mandas|GK|23|GRE|77
Alessio Romagnoli|DC|30|ITA|80
Mario Gila|DC|24|ESP|80
Samuel Gigot|DC|31|FRA|74
Oliver Provstgaard|DC|21|DEN|70/77
Adam Marušić|DR|32|MNE|77
Manuel Lazzari|DR|31|ITA|74
Nuno Tavares|DL|25|POR|77|pace
Luca Pellegrini|DL|26|ITA|74
Nicolò Rovella|DM|23|ITA|80/84|playmaker
Matteo Guendouzi|MC|26|FRA|80|engine
Matías Vecino|MC|33|URU|74
Fisayo Dele-Bashiru|MC|24|NGA|74
Toma Bašić|MC|28|CRO|72
Reda Belahyane|DM|21|MAR|70
Mattia Zaccagni|AML|30|ITA|81|dribbler
Gustav Isaksen|AMR|24|DEN|77
Mattéo Cancellieri|AMR|23|ITA|73
Pedro|AMR|38|ESP|74
Taty Castellanos|ST|26|ARG|79
Boulaye Dia|ST|28|SEN|77
Tijjani Noslin|ST|26|NED|74
`),U("Milan","MIL",87,"San Siro",75817,["#FB090B","#000000"],70,`
Mike Maignan|GK|29|FRA|86|shotstopper,leader
Pietro Terracciano|GK|35|ITA|72
Fikayo Tomori|DC|27|ENG|80|pace
Strahinja Pavlović|DC|24|SRB|79|aerial
Matteo Gabbia|DC|25|ITA|77
Koni De Winter|DC|23|BEL|76
Pervis Estupiñán|DL|27|ECU|78
Davide Bartesaghi|DL|19|ITA|70/79
Zachary Athekame|DR|20|SUI|72/80
Alexis Saelemaekers|DR/AMR|26|BEL|79
Luka Modrić|MC|39|CRO|83|playmaker
Youssouf Fofana|DM/MC|26|FRA|80
Adrien Rabiot|MC|30|FRA|82
Ruben Loftus-Cheek|MC|29|ENG|77
Samuele Ricci|DM|23|ITA|78/82
Ardon Jashari|DM|22|SUI|77/82
Christian Pulisic|AMR/AML|26|USA|84
Rafael Leão|AML|26|POR|85|pace,dribbler
Christopher Nkunku|AMC/ST|27|FRA|81
Santiago Giménez|ST|24|MEX|79
`),U("Bologna","BOL",79,"Stadio Renato Dall'Ara",38279,["#1A2F48","#A21C26"],40,`
Łukasz Skorupski|GK|34|POL|79
Federico Ravaglia|GK|25|ITA|72
Jhon Lucumí|DC|26|COL|80
Torbjørn Heggem|DC|26|NOR|73
Nicolò Casale|DC|27|ITA|74
Martin Vitík|DC|22|CZE|74/80
Emil Holm|DR|25|SWE|76
Lorenzo De Silvestri|DR|37|ITA|70
Juan Miranda|DL|25|ESP|76
Charalampos Lykogiannis|DL|31|GRE|73
Remo Freuler|DM|33|SUI|78
Lewis Ferguson|MC|26|SCO|79|leader
Nikola Moro|MC|27|CRO|75
Tommaso Pobega|MC|26|ITA|75
Giovanni Fabbian|AMC|22|ITA|74
Jens Odgaard|AMC|26|DEN|75
Riccardo Orsolini|AMR|28|ITA|81|sniper
Federico Bernardeschi|AMR/AML|31|ITA|76
Jonathan Rowe|AML|22|ENG|75
Nicolò Cambiaghi|AML|24|ITA|74
Santiago Castro|ST|20|ARG|77/84
Thijs Dallinga|ST|24|NED|75
Ciro Immobile|ST|35|ITA|75|finisher
`),U("Como","COM",74,"Stadio Giuseppe Sinigaglia",13602,["#0D3F8F","#FFFFFF"],100,`
Jean Butez|GK|30|FRA|78
Marc-Oliver Kempf|DC|30|GER|75
Diego Carlos|DC|32|BRA|76
Jacobo Ramón|DC|20|ESP|73/81
Edoardo Goldaniga|DC|31|ITA|71
Ignace Van der Brempt|DR|23|BEL|73
Ivan Smolčić|DR|24|CRO|73
Álex Valle|DL|21|ESP|74/80
Alberto Moreno|DL|33|ESP|72
Maximo Perrone|DM|22|ARG|78/82
Lucas Da Cunha|MC|24|FRA|77
Sergi Roberto|MC|33|ESP|74
Nico Paz|AMC|20|ARG|81/89|playmaker,flair
Martin Baturina|AMC|22|CRO|77/82
Jesús Rodríguez|AML|19|ESP|74/84|dribbler
Assane Diao|AMR|19|SEN|76/84|pace
Jayden Addai|AML|19|NED|70/78
Nicolas Kühn|AMR|25|GER|77
Gabriel Strefezza|AMR|28|BRA|74
Anastasios Douvikas|ST|26|GRE|75
Álvaro Morata|ST|32|ESP|77
`),U("Torino","TOR",73,"Stadio Olimpico Grande Torino",27958,["#8A1E03","#FFFFFF"],15,`
Franco Israel|GK|25|URU|74
Alberto Paleari|GK|32|ITA|70
Saúl Coco|DC|26|EQG|75
Guillermo Maripán|DC|31|CHI|75
Adam Masina|DC|31|MAR|72
Ardian Ismajli|DC|28|ALB|73
Marcus Pedersen|DR|25|NOR|73
Valentino Lazaro|DR|29|AUT|73
Cristiano Biraghi|DL|33|ITA|72
Kristjan Asllani|DM|23|ALB|74
Gvidas Gineitis|MC|21|LTU|73/79
Ivan Ilić|MC|24|SRB|75
Adrien Tamèze|MC|31|FRA|72
Cesare Casadei|MC|22|ITA|75
Nikola Vlašić|AMC|27|CRO|77
Cyril Ngonge|AMR|25|BEL|74
Che Adams|ST|28|SCO|75
Duván Zapata|ST|34|COL|75|strong
Giovanni Simeone|ST|30|ARG|75
Alieu Njie|ST|20|SWE|70/77
`),U("Udinese","UDI",70,"Bluenergy Stadium",25144,["#000000","#FFFFFF"],15,`
Maduka Okoye|GK|25|NGA|75
Răzvan Sava|GK|23|ROU|72
Thomas Kristensen|DC|23|DEN|74
Oumar Solet|DC|25|FRA|77
Christian Kabasele|DC|34|BEL|72
Nicolò Bertola|DC|22|ITA|71
Kingsley Ehizibue|WBR|30|NED|72
Hassane Kamara|WBL|31|CIV|72
Jordan Zemura|WBL|25|ZIM|72
Jesper Karlström|DM|30|SWE|74
Jakub Piotrowski|MC|27|POL|74
Sandi Lovrić|MC|27|SVN|74
Arthur Atta|MC|22|FRA|74
Lennon Miller|MC|19|SCO|72/82
Oier Zarraga|MC|26|ESP|72
Jurgen Ekkelenkamp|MC/AMC|25|NED|75
Nicolò Zaniolo|AMC/AMR|26|ITA|75
Keinan Davis|ST|27|ENG|75|strong
Iker Bravo|ST|20|ESP|72/79
Adam Buksa|ST|29|POL|73
`),U("Genoa","GEN",68,"Stadio Luigi Ferraris",33205,["#A11D3D","#0E1D3B"],10,`
Nicola Leali|GK|32|ITA|74
Benjamin Siegrist|GK|33|SUI|72
Johan Vásquez|DC|26|MEX|77
Leo Østigård|DC|25|NOR|75
Sebastian Otoa|DC|21|DEN|70
Alessandro Marcandalli|DC|22|ITA|70
Brooke Norton-Cuffy|DR|21|ENG|73/79
Stefano Sabelli|DR|32|ITA|71
Aaron Martín|DL|28|ESP|75
Morten Frendrup|MC|24|DEN|77|engine
Milan Badelj|DM|36|CRO|72
Patrizio Masini|MC|24|ITA|71
Morten Thorsby|MC|29|NOR|73
Ruslan Malinovskyi|AMC|32|UKR|76|sniper
Nicolae Stanciu|AMC|32|ROU|74
Valentín Carboni|AMC|20|ARG|73/82
Junior Messias|AMR|34|BRA|73
Vitinha|AML|25|POR|74
Mikael Ellertsson|AML|23|ISL|70
Lorenzo Colombo|ST|23|ITA|73
Jeff Ekhator|ST|18|ITA|70/80
Caleb Ekuban|ST|31|GHA|70
`),U("Hellas Verona","VER",64,"Stadio Marcantonio Bentegodi",39211,["#FFE600","#003C82"],5,`
Lorenzo Montipò|GK|29|ITA|75
Nicolás Valentini|DC|24|ARG|72
Victor Nelsson|DC|26|DEN|74
Domagoj Bradarić|DL|25|CRO|72
Rafik Belghali|DR|23|ALG|72
Martin Frese|WBL|27|DEN|71
Suat Serdar|MC|28|GER|74
Roberto Gagliardini|DM|31|ITA|72
Abdou Harroui|MC|27|MAR|72
Antoine Bernede|MC|26|FRA|72
Grigoris Kastanos|MC|27|CYP|71
Tomáš Suslov|AMC|23|SVK|73
Giovane|AMC|22|BRA|71
Amin Sarr|ST|24|SWE|73
Gift Orban|ST|23|NGA|72
Daniel Mosquera|ST|25|COL|72
`),U("Cagliari","CAG",65,"Unipol Domus",16416,["#A61B2B","#002350"],8,`
Elia Caprile|GK|24|ITA|76
Alen Sherri|GK|28|ALB|69
Yerry Mina|DC|30|COL|73|aerial
Sebastiano Luperto|DC|28|ITA|73
Alberto Dossena|DC|26|ITA|72
Gabriele Zappa|DR|25|ITA|72
Marco Palestra|DR|20|ITA|73/80
Adam Obert|DL|22|SVK|71
Michel Adopo|MC|24|FRA|73
Alessandro Deiola|MC|30|ITA|71
Matteo Prati|DM|21|ITA|71
Michael Folorunsho|MC|27|ITA|73
Luca Mazzitelli|MC|29|ITA|71
Gianluca Gaetano|AMC|25|ITA|74
Mattia Felici|AML|23|ITA|70
Zito Luvumbo|AML|23|ANG|73|pace
Sebastiano Esposito|ST/AMC|23|ITA|74
Andrea Belotti|ST|31|ITA|72
Semih Kılıçsoy|ST|20|TUR|72/80
Leonardo Pavoletti|ST|36|ITA|68|aerial
`),U("Parma","PAR",66,"Stadio Ennio Tardini",22352,["#FFFFFF","#1B3C87"],20,`
Zion Suzuki|GK|22|JPN|78/83
Edoardo Corvi|GK|24|ITA|66
Alessandro Circati|DC|21|AUS|74/80
Mariano Troilo|DC|22|ARG|72
Botond Balogh|DC|23|HUN|72
Lautaro Valenti|DC|26|ARG|72
Enrico Delprato|DR/DC|25|ITA|73
Emanuele Valeri|DL|27|ITA|74
Nahuel Estévez|DM|30|ARG|72
Mandela Keita|DM|23|BEL|74
Adrián Bernabé|MC|24|ESP|76|playmaker
Christian Ordóñez|MC|21|ARG|72
Oliver Sørensen|MC|23|DEN|72
Hernani|MC|31|BRA|72
Jacob Ondrejka|AML|23|SWE|73
Pontus Almqvist|AMR|26|SWE|72
Mateo Pellegrino|ST|23|ARG|74
Patrick Cutrone|ST|27|ITA|74
Adrian Benedyczak|ST|24|POL|72
Matija Frigan|ST|22|CRO|71
`),U("Lecce","LEC",62,"Stadio Via del Mare",31533,["#FFE800","#E2001A"],5,`
Wladimiro Falcone|GK|30|ITA|78
Christian Früchtl|GK|25|GER|70
Kialonda Gaspar|DC|28|ANG|73
Tiago Gabriel|DC|20|POR|71/78
Jamil Siebert|DC|23|GER|71
Danilo Veiga|DR|23|POR|71
Antonino Gallo|DL|25|ITA|74
Ylber Ramadani|DM|29|ALB|74
Lassana Coulibaly|MC|29|MLI|73
Medon Berisha|MC|21|ALB|71
Thorir Helgason|MC|25|ISL|71
Omri Gandelman|MC|25|ISR|71
Filip Marchwiński|AMC|23|POL|71
Santiago Pierotti|AMR|24|ARG|73
Konan N'Dri|AML|24|BEL|72
Riccardo Sottil|AML|26|ITA|73
Lameck Banda|AML|24|ZAM|72
Nikola Štulić|ST|23|SRB|73
Francesco Camarda|ST|17|ITA|72/87
`),U("Sassuolo","SAS",64,"Mapei Stadium",21584,["#00A752","#000000"],15,`
Arijanet Muric|GK|26|KVX|75
Stefano Turati|GK|23|ITA|72
Jay Idzes|DC|25|IDN|73
Tarik Muharemović|DC|22|BIH|73/79
Filippo Romagna|DC|28|ITA|71
Sebastian Walukiewicz|DR/DC|25|POL|73
Woyo Coulibaly|DR|26|FRA|70
Josh Doig|DL|23|SCO|72
Nemanja Matić|DM|37|SRB|74|leader
Kristian Thorstvedt|MC|26|NOR|74
Daniel Boloca|MC|26|ITA|72
Aster Vranckx|MC|22|BEL|72
Ismael Koné|MC|23|CAN|74
Luca Lipani|MC|20|ITA|71/78
Cristian Volpato|AMC|21|ITA|72/78
Domenico Berardi|AMR|31|ITA|79|sniper,set
Armand Laurienté|AML|26|FRA|77|dribbler
Alieu Fadera|AML|24|GAM|72
Andrea Pinamonti|ST|26|ITA|75
Samuele Mulattieri|ST|24|ITA|70
`),U("Pisa","PIS",60,"Arena Garibaldi",10560,["#000000","#0067B1"],10,`
Adrian Šemper|GK|27|CRO|72
Nicolas|GK|36|BRA|68
Raúl Albiol|DC|39|ESP|72|leader
Arturo Calabresi|DC|29|ITA|70
Antonio Caracciolo|DC|35|ITA|69
Simone Canestrelli|DC|24|ITA|71
Mehdi Léris|DR|27|ALG|71
Idrissa Touré|WBR|27|GER|71
Samuele Angori|DL|21|ITA|70/76
Marius Marin|DM|26|ROU|72
Michel Aebischer|MC|28|SUI|73
Ebenezer Akinsanmiro|MC|20|NGA|70/77
Malthe Højholt|MC|24|DEN|70
Gabriele Piccinini|MC|24|ITA|70
Matteo Tramoni|AMC|25|FRA|72
Lorran|AMC|19|BRA|69/79
Juan Cuadrado|AMR|37|COL|72
M'Bala Nzola|ST|28|ANG|73
Stefano Moreo|ST|31|ITA|70
Henrik Meister|ST|21|DEN|70/77
`),U("Cremonese","CRE",60,"Stadio Giovanni Zini",16003,["#E0001A","#A0A0A0"],10,`
Emil Audero|GK|28|ITA|74
Marco Silvestri|GK|34|ITA|70
Federico Baschirotto|DC|28|ITA|74|aerial
Matteo Bianchetti|DC|32|ITA|70
Filippo Terracciano|DC/DR|22|ITA|70
Mikayil Faye|DC|21|SEN|71/78
Giuseppe Pezzella|WBL|27|ITA|72
Tommaso Barbieri|WBR|22|ITA|70
Romano Floriani Mussolini|WBR|22|ITA|70
Alberto Grassi|MC|30|ITA|70
Martín Payero|MC|26|ARG|72
Warren Bondo|MC|21|FRA|71/77
Michele Collocolo|MC|25|ITA|69
Franco Vázquez|AMC|36|ARG|70
Jari Vandeputte|AML|29|BEL|71
Dennis Johnsen|AMR|27|NOR|70
Alessio Zerbin|AMR|26|ITA|70
Jamie Vardy|ST|38|ENG|74|finisher
Federico Bonazzoli|ST|28|ITA|72
Antonio Sanabria|ST|29|PAR|72
`)]},fM={id:"ger1",name:"Bundesliga",short:"BUN",country:"GER",tier:1,tv:50,europe:6,clubs:[U("Bayern Munich","FCB",95,"Allianz Arena",75024,["#DC052D","#FFFFFF"],200,`
Manuel Neuer|GK|39|GER|85|sweeper,leader
Jonas Urbig|GK|21|GER|74/83
Sven Ulreich|GK|36|GER|70
Dayot Upamecano|DC|26|FRA|84|pace
Jonathan Tah|DC|29|GER|84|aerial
Kim Min-jae|DC|28|KOR|83|strong
Hiroki Ito|DC/DL|26|JPN|79
Josip Stanišić|DR/DC|25|CRO|79
Sacha Boey|DR|24|FRA|76
Konrad Laimer|DR/MC|28|AUT|81|engine
Alphonso Davies|DL|24|CAN|83|pace
Raphaël Guerreiro|DL/MC|31|POR|79
Joshua Kimmich|DM/DR|30|GER|88|playmaker,set,leader
Leon Goretzka|MC|30|GER|81
Aleksandar Pavlović|DM|21|GER|81/88|playmaker
Tom Bischof|MC/DL|19|GER|76/85
Jamal Musiala|AMC|22|GER|89/93|dribbler,flair
Michael Olise|AMR|23|FRA|87/90|dribbler,set
Serge Gnabry|AMR/AML|29|GER|81
Luis Díaz|AML|28|COL|85|dribbler,pace
Lennart Karl|AMR|17|GER|72/88
Nicolas Jackson|ST|24|SEN|80
Harry Kane|ST|31|ENG|90|finisher,playmaker
`),U("Bayer Leverkusen","B04",87,"BayArena",30210,["#E32221","#000000"],120,`
Mark Flekken|GK|32|NED|78
Janis Blaswich|GK|34|GER|72
Edmond Tapsoba|DC|26|BFA|82
Loïc Badé|DC|25|FRA|79
Jarell Quansah|DC|22|ENG|78/83
Arthur|DR|22|BRA|74
Lucas Vázquez|DR|34|ESP|75
Alejandro Grimaldo|DL/WBL|29|ESP|84|crosser,set
Robert Andrich|DM|30|GER|79|hardman
Ezequiel Fernández|DM|23|ARG|78
Exequiel Palacios|MC|26|ARG|80
Aleix García|MC|28|ESP|80|playmaker
Malik Tillman|AMC|23|USA|79
Eliesse Ben Seghir|AMC|20|MAR|77/85
Ibrahim Maza|AMC|19|ALG|74/84
Claudio Echeverri|AMC|19|ARG|74/85
Ernest Poku|AMR|21|NED|74/81
Nathan Tella|AMR|26|NGA|76
Martin Terrier|AML|28|FRA|77
Patrik Schick|ST|29|CZE|82|finisher
Christian Kofane|ST|19|CMR|72/82
`),U("Eintracht Frankfurt","SGE",80,"Deutsche Bank Park",58e3,["#E1000F","#000000"],60,`
Kauã Santos|GK|22|BRA|76/82
Michael Zetterer|GK|30|GER|74
Robin Koch|DC|29|GER|80|leader
Arthur Theate|DC/DL|25|BEL|79
Rasmus Kristensen|DR/DC|28|DEN|77
Nnamdi Collins|DC/DR|21|GER|73/80
Aurèle Amenda|DC|21|SUI|72/79
Nathaniel Brown|DL|22|GER|76/82
Ellyes Skhiri|DM|30|TUN|78
Hugo Larsson|MC|20|SWE|79/86|engine
Oscar Højlund|MC|20|DEN|74/81
Mahmoud Dahoud|MC|29|GER|73
Fares Chaïbi|AMC|22|ALG|76
Mario Götze|AMC|33|GER|76
Can Uzun|AMC|19|GER|77/87
Ansgar Knauff|AMR|23|GER|76
Ritsu Dōan|AMR|27|JPN|79
Jean-Mattéo Bahoya|AML|20|FRA|75/82
Jonathan Burkardt|ST|25|GER|79|finisher
Elye Wahi|ST|22|FRA|75
Michy Batshuayi|ST|31|BEL|72
`),U("Borussia Dortmund","BVB",88,"Signal Iduna Park",81365,["#FDE100","#000000"],90,`
Gregor Kobel|GK|27|SUI|86
Alexander Meyer|GK|34|GER|70
Nico Schlotterbeck|DC|25|GER|83|playmaker
Waldemar Anton|DC|28|GER|80
Niklas Süle|DC|29|GER|78|strong
Emre Can|DM/DC|31|GER|77|leader
Ramy Bensebaini|DL/DC|30|ALG|77
Filippo Mané|DC|19|ITA|68/78
Julian Ryerson|WBR/DR|27|NOR|78
Yan Couto|WBR|23|BRA|77
Daniel Svensson|WBL|23|SWE|76
Marcel Sabitzer|MC|31|AUT|79
Pascal Groß|MC/DM|34|GER|79|playmaker,set
Felix Nmecha|MC|24|GER|79
Jobe Bellingham|MC|19|ENG|76/87
Carney Chukwuemeka|MC|21|ENG|72/80
Julian Brandt|AMC|29|GER|81|playmaker
Karim Adeyemi|AML/ST|23|GER|80|pace
Maximilian Beier|ST/AML|22|GER|78/83
Julien Duranville|AML|19|BEL|70/82
Serhou Guirassy|ST|29|GUI|84|finisher,strong
Fábio Silva|ST|23|POR|75
`),U("SC Freiburg","SCF",76,"Europa-Park Stadion",34700,["#000000","#E2001A"],40,`
Noah Atubolu|GK|23|GER|79/83
Florian Müller|GK|27|GER|72
Matthias Ginter|DC|31|GER|79
Philipp Lienhart|DC|29|AUT|78
Max Rosenfelder|DC|22|GER|74/79
Bruno Ogbus|DC|19|SUI|70/78
Lukas Kübler|DR|32|GER|75
Philipp Treu|DR|24|GER|74
Christian Günter|DL|32|GER|75|leader
Jordy Makengo|DL|24|FRA|72
Maximilian Eggestein|MC|28|GER|77|engine
Nicolas Höfler|DM|35|GER|73
Patrick Osterhage|MC|25|GER|74
Johan Manzambi|MC|19|SUI|74/83
Yuito Suzuki|AMC|23|JPN|75
Vincenzo Grifo|AML|32|ITA|78|set,sniper
Jan-Niklas Beste|AML|26|GER|76|crosser
Derry Scherhant|AMR|22|GER|71
Eren Dinkçi|AMR|23|GER|73
Lucas Höler|ST|31|GER|74
Junior Adamu|ST|24|AUT|74
Igor Matanović|ST|22|CRO|74
`),U("Mainz 05","M05",72,"Mewa Arena",33305,["#C3141E","#FFFFFF"],25,`
Robin Zentner|GK|30|GER|77
Lasse Rieß|GK|24|GER|68
Stefan Bell|DC|33|GER|74
Andreas Hanche-Olsen|DC|28|NOR|75
Dominik Kohr|DC/DM|31|GER|74|hardman
Kacper Potulski|DC|17|POL|68/80
Danny da Costa|WBR|31|GER|72
Anthony Caci|WBR|28|FRA|74
Silvan Widmer|WBR|32|SUI|73
Phillipp Mwene|WBL|31|AUT|73
Kaishu Sano|DM|24|JPN|77|tackler
Nadiem Amiri|AMC/MC|28|GER|79
Lee Jae-sung|AMC|33|KOR|76
Paul Nebel|AMC/AMR|22|GER|75/80
Arnaud Nordin|AML|27|FRA|72
Benedict Hollerbach|AML/ST|24|GER|74
Armindo Sieb|ST|22|GER|73
Nelson Weiper|ST|20|GER|72/79
`),U("RB Leipzig","RBL",84,"Red Bull Arena",47069,["#DD0741","#FFFFFF"],80,`
Péter Gulácsi|GK|35|HUN|78
Maarten Vandevoordt|GK|23|BEL|77/83
Willi Orbán|DC|32|HUN|80|leader
Castello Lukeba|DC|22|FRA|80/85
El Chadaille Bitshiabu|DC|20|FRA|72/80
David Raum|DL|27|GER|79|crosser
Benjamin Henrichs|DR|28|GER|77
Ridle Baku|DR|27|GER|77
Kosta Nedeljković|DR|19|SRB|72/80
Xaver Schlager|MC/DM|27|AUT|79|engine
Nicolas Seiwald|DM|24|AUT|77
Amadou Haidara|MC|27|MLI|76
Kevin Kampl|MC|34|SVN|74
Assan Ouédraogo|AMC|19|GER|74/84
Christoph Baumgartner|AMC|25|AUT|79
Antonio Nusa|AML|20|NOR|79/88|dribbler,pace
Yan Diomande|AMR|18|CIV|74/86|dribbler
Johan Bakayoko|AMR|22|BEL|79/83
Conrad Harder|ST|20|DEN|74/82
Rômulo|ST|23|BRA|74
`),U("Werder Bremen","SVW",72,"Weserstadion",42100,["#1D9053","#FFFFFF"],20,`
Mio Backhaus|GK|21|GER|72/80
Karl Hein|GK|23|EST|71
Marco Friedl|DC|27|AUT|77
Niklas Stark|DC|30|GER|75
Amos Pieper|DC|27|GER|74
Karim Coulibaly|DC|18|GER|69/80
Mitchell Weiser|WBR|31|GER|76
Felix Agu|WBL|25|GER|72
Olivier Deman|WBL|25|BEL|72
Senne Lynen|DM|26|BEL|76
Jens Stage|MC|28|DEN|78
Romano Schmid|AMC|25|AUT|77
Leonardo Bittencourt|AMC|31|GER|74
Cameron Puertas|AMC|26|ESP|74
Marco Grüll|AML|26|AUT|73
Samuel Mbangula|AML|21|BEL|73/79
Justin Njinmah|ST|24|GER|72
Keke Topp|ST|21|GER|71
Victor Boniface|ST|24|NGA|79|strong
`),U("VfB Stuttgart","VFB",81,"MHPArena",60449,["#FFFFFF","#E32219"],45,`
Alexander Nübel|GK|28|GER|81
Fabian Bredlow|GK|30|GER|70
Jeff Chabot|DC|27|GER|77
Finn Jeltsch|DC|19|GER|74/84
Ameen Al-Dakhil|DC|23|BEL|74
Luca Jaquez|DC|22|SUI|72
Dan-Axel Zagadou|DC|26|FRA|75
Josha Vagnoman|DR|24|GER|74
Lorenz Assignon|DR|25|FRA|74
Pascal Stenzel|DR|29|GER|72
Maximilian Mittelstädt|DL|28|GER|79
Angelo Stiller|DM/MC|24|GER|82|playmaker
Atakan Karazor|DM|28|GER|76
Chema Andrés|DM|20|ESP|73/80
Nikolas Nartey|MC|25|DEN|73
Bilal El Khannouss|AMC|21|MAR|77/83
Chris Führich|AML|27|GER|78|dribbler
Jamie Leweling|AMR|24|GER|78
Badredine Bouanani|AMR|20|FRA|72/80
Justin Diehl|AML|20|GER|70/78
Deniz Undav|ST|28|GER|80
Ermedin Demirović|ST|27|BIH|79
Tiago Tomás|ST|23|POR|74
`),U("Borussia Mönchengladbach","BMG",74,"Borussia-Park",54057,["#000000","#FFFFFF"],30,`
Moritz Nicolas|GK|28|GER|75
Jonas Omlin|GK|31|SUI|74
Nico Elvedi|DC|28|SUI|78
Ko Itakura|DC|28|JPN|78
Kevin Diks|DC/DR|28|NED|75
Marvin Friedrich|DC|29|GER|73
Joe Scally|DR|22|USA|75
Luca Netz|DL|22|GER|74
Lukas Ullrich|DL|21|GER|72
Julian Weigl|DM|29|GER|77
Rocco Reitz|MC|23|GER|76
Philipp Sander|MC|27|GER|74
Yannik Engelhardt|DM|24|GER|72
Florian Neuhaus|AMC|28|GER|76
Kevin Stöger|AMC|31|AUT|76|set
Giovanni Reyna|AMC|22|USA|74
Franck Honorat|AMR|28|FRA|76
Robin Hack|AML|26|GER|76
Nathan Ngoumou|AMR|25|FRA|72
Tim Kleindienst|ST|29|GER|78|aerial
Haris Tabaković|ST|31|BIH|75
Shūto Machino|ST|25|JPN|74
`),U("VfL Wolfsburg","WOB",74,"Volkswagen Arena",28917,["#65B32E","#FFFFFF"],40,`
Kamil Grabara|GK|26|POL|78
Marius Müller|GK|31|GER|70
Denis Vavro|DC|29|SVK|76
Konstantinos Koulierakis|DC|21|GRE|75/81
Moritz Jenz|DC|26|GER|73
Jenson Seelt|DC|22|NED|72
Kilian Fischer|DR|24|GER|74
Joakim Mæhle|DL/DR|28|DEN|76
Rogério|DL|27|BRA|73
Aaron Zehnter|DL|20|GER|70
Vinícius Souza|DM|26|BRA|74
Maximilian Arnold|MC|31|GER|78|set
Mattias Svanberg|MC|26|SWE|76
Yannick Gerhardt|MC|31|GER|73
Christian Eriksen|AMC|33|DEN|76|playmaker
Lovro Majer|AMC|27|CRO|77
Patrick Wimmer|AMR|24|AUT|76
Andreas Skov Olsen|AMR|25|DEN|76
Kevin Paredes|AML|22|USA|72
Mohamed Amoura|ST/AML|25|ALG|79|pace
Jonas Wind|ST|26|DEN|77
Dženan Pejčinović|ST|20|GER|72/80
`),U("FC Augsburg","FCA",68,"WWK Arena",30660,["#BA3733","#46714D"],15,`
Finn Dahmen|GK|27|GER|77
Nediljko Labrović|GK|26|CRO|72
Jeffrey Gouweleeuw|DC|34|NED|74|leader
Keven Schlotterbeck|DC|28|GER|74
Chrislain Matsima|DC|23|FRA|74
Cédric Zesiger|DC|27|SUI|73
Noahkai Banks|DC|18|USA|70/80
Marius Wolf|DR|30|GER|74
Dimitrios Giannoulis|DL|29|GRE|75
Kristijan Jakić|DM|28|CRO|75
Elvis Rexhbeçaj|MC|27|KVX|73
Han-Noah Massengo|MC|24|FRA|72
Arne Maier|MC|26|GER|74
Fredrik Jensen|AMC|28|FIN|73
Anton Kade|AMC|21|GER|73/79
Alexis Claude-Maurice|AML|27|FRA|75
Mert Kömür|AMR|20|GER|71/78
Phillip Tietz|ST|27|GER|72
Samuel Essende|ST|27|COD|73
Steve Mounié|ST|30|BEN|70
`),U("Union Berlin","FCU",70,"Stadion An der Alten Försterei",22012,["#EB1923","#FFFFFF"],20,`
Frederik Rønnow|GK|32|DEN|77
Carl Klaus|GK|31|GER|68
Diogo Leite|DC|26|POR|77
Danilho Doekhi|DC|26|NED|77
Leopold Querfeld|DC|21|AUT|76/81
Christopher Trimmel|DR|38|AUT|70|set
Josip Juranović|DR|29|CRO|74
Tom Rothe|DL|20|GER|73/80
Derrick Köhn|DL|26|GER|72
Rani Khedira|DM|31|GER|76
Aljoscha Kemlein|DM|21|GER|72
András Schäfer|MC|26|HUN|73
Alex Král|MC|27|CZE|73
Janik Haberer|MC|31|GER|72
László Bénes|AMC|27|SVK|73
Tim Skarke|AML|28|GER|72
Jeong Woo-yeong|AMR|25|KOR|72
Andrej Ilić|ST|25|SRB|73
Oliver Burke|ST|28|SCO|72
Ilyas Ansah|ST|20|GER|72/78
`),U("FC St. Pauli","STP",66,"Millerntor-Stadion",29546,["#6B4E3D","#FFFFFF"],10,`
Nikola Vasilj|GK|29|BIH|77
Ben Voll|GK|24|GER|68
Hauke Wahl|DC|31|GER|75
Eric Smith|DC/DM|28|SWE|75
Karol Mets|DC|32|EST|72
David Nemeth|DC|24|AUT|72
Adam Dźwigała|DC|30|POL|71
Arkadiusz Pyrka|WBR|22|POL|72
Manolis Saliakas|WBR|29|GRE|73
Louis Oppie|WBL|23|GER|70
Lars Ritzka|WBL|27|GER|71
Jackson Irvine|MC|32|AUS|76|leader
Joel Chima Fujita|DM|23|JPN|74
James Sands|DM|25|USA|73
Connor Metcalfe|MC|25|AUS|72
Danel Sinani|AMC|28|LUX|73
Mathias Pereira Lage|AMR|28|FRA|72
Oladapo Afolayan|AML|27|NGA|72
Andréas Hountondji|ST|23|BEN|72
Martijn Kaars|ST|26|NED|72
Ricky-Jade Jones|ST|22|ENG|72
Morgan Guilavogui|ST|27|FRA|72
`),U("TSG Hoffenheim","TSG",72,"PreZero Arena",30150,["#1961B5","#FFFFFF"],30,`
Oliver Baumann|GK|35|GER|80
Luca Philipp|GK|24|GER|68
Ozan Kabak|DC|25|TUR|77
Kevin Akpoguma|DC|30|NGA|72
Albian Hajdari|DC|22|SUI|73
Robin Hranáč|DC|25|CZE|74
Koki Machida|DC|27|JPN|74
Vladimír Coufal|DR|32|CZE|73
Valentin Gendrey|DR|25|FRA|72
Bernardo|DL|30|BRA|72
Alexander Prass|WBL|24|AUT|74
Grischa Prömel|MC|30|GER|76
Dennis Geiger|DM|27|GER|74
Leon Avdullahu|DM|21|KVX|73/80
Wouter Burger|DM|24|NED|74
Andrej Kramarić|AMC/ST|34|CRO|79|finisher
Adam Hložek|ST/AMC|22|CZE|75
Bazoumana Touré|AML|19|CIV|73/83
Cole Campbell|AMR|19|USA|70/79
Tim Lemperle|ST|23|GER|74
Fisnik Asllani|ST|23|KVX|74
Ihlas Bebou|ST|31|TOG|72
`),U("1. FC Heidenheim","FCH",62,"Voith-Arena",15e3,["#E2001A","#003B79"],8,`
Diant Ramaj|GK|23|GER|72
Kevin Müller|GK|34|GER|71
Patrick Mainka|DC|30|GER|73|leader
Benedikt Gimber|DC|28|GER|72
Tim Siersleben|DC|25|GER|71
Omar Traoré|DR|27|GER|72
Marnon Busch|DR|30|GER|70
Jonas Föhrenbach|DL|29|GER|71
Niklas Dorsch|DM|27|GER|73
Jan Schöppner|MC|26|GER|72
Luka Janeš|MC|22|CRO|70
Adrian Beck|AMC|28|GER|72
Mathias Honsak|AML|28|AUT|72
Sirlord Conteh|AMR|28|GER|71
Budu Zivzivadze|ST|31|GEO|72
Mikkel Kaufmann|ST|24|DEN|72
Stefan Schimmer|ST|30|GER|71
Marvin Pieringer|ST|25|GER|71
`),U("1. FC Köln","KOE",66,"RheinEnergieStadion",5e4,["#ED1C24","#FFFFFF"],15,`
Marvin Schwäbe|GK|30|GER|75
Ron-Robert Zieler|GK|36|GER|70
Timo Hübers|DC|28|GER|74
Rav van den Berg|DC|21|NED|72/78
Joël Schmied|DC|26|SUI|72
Cenk Özkacar|DC|24|TUR|72
Jan Thielmann|DR/AMR|23|GER|74
Sebastian Sebulonsen|DR|25|NOR|71
Kristoffer Lund|DL|23|USA|72
Leart Paqarada|DL|30|KVX|72
Eric Martel|DM|23|GER|75
Tom Krauß|DM|24|GER|73
Isak Johannesson|MC|22|ISL|74/80
Dejan Ljubičić|MC|27|AUT|74
Florian Kainz|AMC|32|AUT|73
Linton Maina|AML|26|GER|73
Jakub Kamiński|AML|23|POL|75
Said El Mala|AML|19|GER|74/86|dribbler
Ragnar Ache|ST|27|GER|73
Marius Bülter|ST|32|GER|72
Luca Waldschmidt|ST|29|GER|72
`),U("Hamburger SV","HSV",68,"Volksparkstadion",57e3,["#0A3F86","#FFFFFF"],20,`
Daniel Heuer Fernandes|GK|32|POR|74
Matheo Raab|GK|26|GER|70
Luka Vušković|DC|18|CRO|76/88|aerial
Dennis Hadžikadunić|DC|26|BIH|72
Jordan Torunarigha|DC|27|NGA|72
Warmed Omari|DC|25|FRA|72
William Mikelbrencis|DR|21|FRA|72
Miro Muheim|DL|27|SUI|72
Daniel Elfadli|DM/DC|28|GER|72
Jonas Meffert|DM|30|GER|73
Nicolás Capaldo|MC|26|ARG|74
Albert Sambi Lokonga|MC|25|BEL|74
Fábio Vieira|AMC|25|POR|76|playmaker
Immanuel Pherai|AMC|24|NED|72
Jean-Luc Dompé|AML|30|FRA|73
Bakery Jatta|AMR|27|GAM|72
Emir Sahiti|AMR|26|KVX|72
Ransford Königsdörffer|ST|23|GHA|73
Robert Glatzel|ST|31|GER|73
Yussuf Poulsen|ST|31|DEN|74
Rayan Philippe|ST|25|FRA|72
`)]},hM={id:"fra1",name:"Ligue 1",short:"LI1",country:"FRA",tier:1,tv:25,europe:5,clubs:[U("Paris Saint-Germain","PSG",95,"Parc des Princes",47929,["#004170","#DA291C"],250,`
Lucas Chevalier|GK|23|FRA|82/87
Matvey Safonov|GK|26|RUS|78
Achraf Hakimi|DR|26|MAR|88|pace,crosser
Marquinhos|DC|31|BRA|86|leader
Willian Pacho|DC|23|ECU|84/87
Illia Zabarnyi|DC|22|UKR|82/86
Lucas Beraldo|DC|21|BRA|78/84
Nuno Mendes|DL|23|POR|87/89|pace,dribbler
Lucas Hernández|DL/DC|29|FRA|80
Vitinha|MC|25|POR|89|playmaker
João Neves|MC|20|POR|86/91|engine
Fabián Ruiz|MC|29|ESP|84
Warren Zaïre-Emery|MC/DR|19|FRA|82/89
Senny Mayulu|MC|19|FRA|74/84
Lee Kang-in|AMC/AMR|24|KOR|80|set
Ousmane Dembélé|ST/AMR|28|FRA|90|dribbler,pace
Khvicha Kvaratskhelia|AML|24|GEO|88|dribbler,flair
Désiré Doué|AMR/AML|20|FRA|85/91|dribbler
Bradley Barcola|AML|22|FRA|84/87|pace
Ibrahim Mbaye|AML|17|FRA|70/86
Gonçalo Ramos|ST|24|POR|80
`),U("Marseille","OM",84,"Stade Vélodrome",67394,["#2FAEE0","#FFFFFF"],50,`
Gerónimo Rulli|GK|33|ARG|82
Jeffrey de Lange|GK|27|NED|70
Leonardo Balerdi|DC|26|ARG|80
Benjamin Pavard|DC/DR|29|FRA|80
Nayef Aguerd|DC|29|MAR|79
Facundo Medina|DC/DL|26|ARG|78
CJ Egan-Riley|DC|22|ENG|73
Timothy Weah|DR/AMR|25|USA|77
Amir Murillo|DR|29|PAN|75
Emerson Palmieri|DL|31|ITA|76
Pierre-Emile Højbjerg|DM|29|DEN|81|leader
Geoffrey Kondogbia|DM|32|CTA|77
Arthur Vermeeren|MC|20|BEL|77/84
Matt O'Riley|MC|24|DEN|78
Angel Gomes|AMC/MC|24|ENG|77
Hamed Junior Traorè|AMC|25|CIV|76
Bilal Nadir|AMC|21|FRA|72
Mason Greenwood|AMR|23|JAM|83|finisher,sniper
Igor Paixão|AML|25|BRA|79
Amine Gouiri|ST/AML|25|ALG|80
Pierre-Emerick Aubameyang|ST|36|GAB|78|finisher
`),U("Monaco","MON",82,"Stade Louis II",18523,["#E2001A","#FFFFFF"],60,`
Philipp Köhn|GK|27|SUI|77
Lukáš Hrádecký|GK|35|FIN|79
Thilo Kehrer|DC|28|GER|78
Mohammed Salisu|DC|26|GHA|78
Eric Dier|DC|31|ENG|76
Christian Mawissa|DC|20|FRA|73/80
Jordan Teze|DR/DC|25|NED|75
Vanderson|DR|24|BRA|79
Caio Henrique|DL|27|BRA|79|crosser
Kassoum Ouattara|DL|21|BFA|72
Denis Zakaria|DM|28|SUI|81|leader
Lamine Camara|MC|21|SEN|78/84
Mamadou Coulibaly|DM|21|FRA|73
Paul Pogba|MC|32|FRA|75
Aleksandr Golovin|AMC|29|RUS|79
Maghnes Akliouche|AMR/AMC|23|FRA|81/85|dribbler
Takumi Minamino|AML/AMC|30|JPN|78
Krépin Diatta|AMR|26|SEN|75
Ansu Fati|AML|22|ESP|74
Folarin Balogun|ST|24|USA|78
Mika Biereth|ST|22|DEN|78/83
George Ilenikhena|ST|19|NGA|73/82
`),U("Nice","NIC",77,"Allianz Riviera",36178,["#E30613","#000000"],30,`
Yehvann Diouf|GK|26|FRA|77
Maxime Dupé|GK|32|FRA|70
Dante|DC|41|BRA|72|leader
Antoine Mendy|DC|21|FRA|73
Moïse Bombito|DC|25|CAN|77|pace
Juma Bah|DC|19|SLE|72/81
Kojo Peprah Oppong|DC|21|GHA|72
Jonathan Clauss|DR|32|FRA|76|crosser
Melvin Bard|DL|24|FRA|76
Ali Abdi|DL|31|TUN|72
Hicham Boudaoui|MC|25|ALG|77
Charles Vanhoutte|DM|26|BEL|75
Morgan Sanson|MC|31|FRA|74
Tanguy Ndombele|MC|28|FRA|74
Tom Louchet|MC|22|FRA|71
Sofiane Diop|AMC/AML|25|MAR|77
Jérémie Boga|AML|28|CIV|75
Mohamed-Ali Cho|AML|21|FRA|74
Tiago Gouveia|AMR|24|POR|73
Isak Jansson|AMR|23|SWE|73
Terem Moffi|ST|26|NGA|75
Kevin Carlos|ST|24|SUI|72
`),U("Lille","LIL",80,"Stade Pierre-Mauroy",50186,["#E01E13","#1B2A5D"],40,`
Berke Özer|GK|25|TUR|77
Arnaud Bodart|GK|27|BEL|70
Alexsandro Ribeiro|DC|26|BRA|79
Nathan Ngoy|DC|21|BEL|74/80
Chancel Mbemba|DC|30|COD|77
Aïssa Mandi|DC/DR|33|ALG|75
Thomas Meunier|DR|33|BEL|74
Tiago Santos|DR|22|POR|75
Romain Perraud|DL|27|FRA|75
Calvin Verdonk|DL|28|NED|73
Benjamin André|DM|34|FRA|77|leader
Ayyoub Bouaddi|DM|17|FRA|74/88
Nabil Bentaleb|MC|30|ALG|74
André Gomes|MC|32|POR|73
Ngal'ayel Mukau|MC|20|BEL|73/80
Hákon Arnar Haraldsson|AMC|22|ISL|78/82
Osame Sahraoui|AML|24|NOR|75
Matías Fernández-Pardo|AML|20|BEL|75/82
Félix Correia|AMR|24|POR|73
Hamza Igamane|ST|22|MAR|74
Olivier Giroud|ST|38|FRA|74|aerial
`),U("Lyon","OL",81,"Groupama Stadium",59186,["#FFFFFF","#1C3F94"],20,`
Dominik Greif|GK|28|SVK|75
Rémy Descamps|GK|29|FRA|70
Moussa Niakhaté|DC|29|SEN|78
Clinton Mata|DC/DR|32|ANG|75
Ruben Kluivert|DC|24|NED|73
Ainsley Maitland-Niles|DR|27|ENG|75
Hans Hateboer|DR|31|NED|70
Nicolás Tagliafico|DL|32|ARG|77
Abner|DL|25|BRA|74
Tanner Tessmann|DM|23|USA|76
Orel Mangala|DM|27|BEL|75
Tyler Morton|DM|22|ENG|75
Corentin Tolisso|MC|30|FRA|77
Khalis Merah|MC|19|FRA|70/80
Pavel Šulc|AMC|24|CZE|76
Malick Fofana|AML|20|BEL|79/86|pace,dribbler
Ernest Nuamah|AMR|21|GHA|73
Afonso Moreira|AML|20|POR|72/80
Adam Karabec|AML|21|CZE|73
Martín Satriano|ST|24|URU|73
`),U("Strasbourg","RCS",74,"Stade de la Meinau",26109,["#009FE3","#FFFFFF"],30,`
Mike Penders|GK|19|BEL|72/83
Karl-Johan Johnsson|GK|35|SWE|70
Guéla Doué|DR/DC|22|CIV|76
Andrew Omobamidele|DC|23|IRL|73
Mamadou Sarr|DC|19|FRA|74/83
Ismaël Doukouré|DC|22|FRA|74
Abakar Sylla|DC|22|CIV|72
Lucas Høgsberg|DC|19|DEN|70/78
Ben Chilwell|DL|28|ENG|74
Valentín Barco|DL/MC|21|ARG|75/81
Diego Moreira|AML/DL|21|BEL|75/81
Mathis Amougou|DM|19|FRA|72/80
Félix Lemaréchal|MC|21|FRA|73
Kendry Páez|AMC|18|ECU|74/86
Julio Enciso|AMC|21|PAR|75/81
Sebastian Nanasi|AMR|23|SWE|75
Óscar Perea|AMR|20|COL|71/78
Emanuel Emegha|ST|22|NED|75/81
Joaquín Panichelli|ST|22|ARG|74
Sékou Mara|ST|22|FRA|72
`),U("Lens","RCL",76,"Stade Bollaert-Delelis",38223,["#FFE600","#E2001A"],15,`
Robin Risser|GK|20|FRA|74/82
Régis Gurtner|GK|38|FRA|68
Jonathan Gradit|DC|32|FRA|74
Malang Sarr|DC|26|FRA|74
Samson Baidoo|DC|21|AUT|73/79
Ismaëlo Ganiou|DC|20|FRA|71
Ruben Aguilar|DR|32|FRA|72
Saud Abdulhamid|DR|26|KSA|72
Matthieu Udol|DL|29|FRA|73
Deiver Machado|DL|32|COL|72
Adrien Thomasson|MC|31|FRA|75
Mamadou Sangaré|MC|23|MLI|74
Florian Thauvin|AMR|32|FRA|77|sniper
Abdallah Sima|AMR|24|SEN|74
Allan Saint-Maximin|AML|28|FRA|75|dribbler
Anthony Bermont|AMR|20|FRA|70
Wesley Saïd|ST/AML|30|FRA|74
Odsonne Édouard|ST|27|FRA|74
Rémy Labeau Lascary|ST|22|FRA|71
`),U("Brest","SB29",70,"Stade Francis-Le Blé",15931,["#E2001A","#FFFFFF"],15,`
Radosław Majecki|GK|25|POL|73
Grégoire Coudert|GK|26|FRA|70
Brendan Chardonnet|DC|30|FRA|74
Soumaïla Coulibaly|DC|21|FRA|73
Julien Le Cardinal|DC|27|FRA|72
Kenny Lala|DR|34|FRA|71
Bradley Locko|DL|23|FRA|74
Mahdi Camara|DM|27|FRA|74
Joris Chotard|DM|23|FRA|72
Hugo Magnetti|MC|27|FRA|74
Edimilson Fernandes|MC|29|SUI|73
Kamory Doumbia|AMC|22|MLI|73
Romain Del Castillo|AMR|29|FRA|76|set
Mama Baldé|AML|29|GNB|72
Ludovic Ajorque|ST|31|FRA|74|aerial
`),U("Toulouse","TFC",69,"Stadium de Toulouse",33150,["#6B3FA0","#FFFFFF"],20,`
Guillaume Restes|GK|20|FRA|76/84
Kjetil Haug|GK|27|NOR|68
Rasmus Nicolaisen|DC|28|DEN|74
Mark McKenzie|DC|26|USA|74
Charlie Cresswell|DC|22|ENG|74
Warren Kamanzi|DR|24|NOR|72
Djibril Sidibé|DR|32|FRA|70
Cristian Cásseres Jr.|MC|25|VEN|74
Abu Francis|MC|24|GHA|72
Dayann Methalie|DM|23|FRA|70
Santiago Hidalgo|AMC|20|ARG|71/78
Aron Dønnum|AMR|27|NOR|74
Zakaria Aboukhlal|AMR|25|MAR|75
Yann Gboho|AMR|24|CIV|73
Mario Sauer|AML|21|SVK|70
Frank Magri|ST|26|CMR|73
Emersonn|ST|22|BRA|70
`),U("Auxerre","AJA",64,"Stade de l'Abbé-Deschamps",18541,["#FFFFFF","#0056A7"],8,`
Donovan Léon|GK|33|GUF|74
Théo De Percin|GK|24|FRA|70
Jubal|DC|31|BRA|72
Sinaly Diomandé|DC|24|CIV|72
Clément Akpa|DC|24|FRA|70
Paul Joly|DR|25|FRA|71
Gideon Mensah|DL|27|GHA|73
Fredrik Oppegård|DL|23|NOR|71
Elisha Owusu|DM|27|GHA|73
Oussama El Azzouzi|MC|24|MAR|72
Kévin Danois|MC|21|FRA|71
Lasso Coulibaly|MC|22|CIV|71
Romain Faivre|AMC|27|FRA|73
Lassine Sinayoko|ST/AMR|25|MLI|74
Ado Onaiwu|ST|29|JPN|71
Danny Namaso|ST|25|ENG|71
`),U("Rennes","SRFC",77,"Roazhon Park",29778,["#E13327","#000000"],40,`
Brice Samba|GK|31|FRA|79
Mathys Silistrie|GK|21|FRA|66
Anthony Rouault|DC|24|FRA|74
Jérémy Jacquet|DC|20|FRA|73/80
Christopher Wooh|DC|23|CMR|73
Lilian Brassier|DC/DL|25|FRA|74
Abdelhamid Aït Boudlal|DC|19|MAR|70/78
Alidu Seidu|DR/DC|25|GHA|74
Przemysław Frankowski|WBR|30|POL|74
Quentin Merlin|DL|23|FRA|74
Valentin Rongier|DM|30|FRA|77
Seko Fofana|MC|30|CIV|77
Djaoui Cissé|MC|21|FRA|73
Glen Kamara|MC|29|FIN|74
Sebastian Szymański|AMC|26|POL|77
Ludovic Blas|AMC|27|FRA|75
Mousa Al-Tamari|AMR|28|JOR|75
Breel Embolo|ST|28|SUI|77|strong
Esteban Lepaul|ST|25|FRA|75
Mohamed Kader Meïté|ST|18|FRA|70/80
`),U("Nantes","FCN",66,"Stade de la Beaujoire",35322,["#FCD405","#00843D"],5,`
Anthony Lopes|GK|34|POR|77
Patrik Carlgren|GK|33|SWE|68
Nicolas Pallois|DC|37|FRA|70
Chidozie Awaziem|DC|28|NGA|72
Jean-Kévin Duverne|DC|27|FRA|72
Uroš Radaković|DC|31|SRB|70
Tylel Tati|DC|17|FRA|70/80
Kelvin Amian|DR|27|FRA|72
Nicolas Cozza|DL|26|FRA|72
Johann Lepenant|DM|22|FRA|74
Francis Coquelin|DM|34|FRA|71
Louis Leroux|MC|24|FRA|70
Yassine Benhattab|AMC|24|FRA|70
Bahereba Guirassy|AML|19|FRA|70/78
Dehmaine Tabibou|AMR|18|FRA|68/78
Matthis Abline|ST/AML|22|FRA|76/81
Mostafa Mohamed|ST|27|EGY|73
Ignatius Ganago|ST|26|CMR|71
`),U("Angers","SCO",60,"Stade Raymond-Kopa",18752,["#000000","#FFFFFF"],5,`
Hervé Koffi|GK|28|BFA|74
Jordan Lefort|DC|31|FRA|72
Emmanuel Biumla|DC|23|CMR|70
Carlens Arcus|DR|28|HAI|71
Florent Hanin|DL|34|FRA|68
Jacques Ekomié|DL|22|GAB|70
Haris Belkebla|DM|31|ALG|72
Himad Abdelli|MC/AMC|26|ALG|75
Zinédine Ould Khaled|MC|25|FRA|70
Pierrick Capelle|MC|38|FRA|67
Farid El Melali|AML|27|ALG|72
Amine Sbaï|AML|24|FRA|71
Lanroy Machine|AMR|22|FRA|70
Prosper Peter|ST|21|NGA|70
Sidiki Chérif|ST|18|FRA|70/81
`),U("Le Havre","HAC",60,"Stade Océane",25178,["#1D3A73","#8CC4E8"],5,`
Arthur Desmas|GK|31|FRA|72
Mathieu Gorgelin|GK|34|FRA|70
Gautier Lloris|DC|30|FRA|72
Arouna Sangante|DC|23|SEN|73
Étienne Youté Kinkoué|DC|23|FRA|72
Loïc Nego|DR|34|HUN|70
Timothée Pembélé|DR|22|FRA|70
Abdoulaye Touré|DM|31|GUI|72
Rassoul Ndiaye|MC|23|SEN|73
Yassine Kechta|MC|23|MAR|72
Issa Soumaré|AMR|24|SEN|72
Josué Casimir|AMR|24|FRA|71
André Ayew|ST/AML|35|GHA|72
Ahmed Hassan|ST|32|EGY|68
`),U("Lorient","FCL",60,"Stade du Moustoir",18110,["#F58220","#000000"],5,`
Yvon Mvogo|GK|31|SUI|74
Montassar Talbi|DC|27|TUN|74
Bamo Meïté|DC|24|CIV|72
Isaak Touré|DC|21|FRA|71
Formose Mendy|DC|24|SEN|70
Igor Silva|WBR|28|BRA|70
Darlin Yongwa|WBL|24|CMR|70
Laurent Abergel|DM|32|FRA|73
Arthur Avom|MC|20|CMR|72/78
Jean-Victor Makengo|MC|27|FRA|71
Arsène Kouassi|MC|21|CIV|70
Pablo Pagis|AMC|22|FRA|73
Théo Le Bris|AMR|23|FRA|72
Tosin Aiyegun|ST|27|BEN|72
Bamba Dieng|ST|25|SEN|72
Mohamed Bamba|ST|23|CIV|72
`),U("Paris FC","PFC",62,"Stade Jean-Bouin",19904,["#1A2A5B","#E2001A"],80,`
Kevin Trapp|GK|35|GER|77
Obed Nkambadio|GK|22|FRA|70
Otavio|DC|31|BRA|72
Moustapha Mbow|DC|25|SEN|71
Samir Chergui|DC|26|FRA|70
Timothée Kolodziejczak|DC|33|FRA|70
Thibault De Smet|DL|27|BEL|71
Nhoa Sangui|DL|19|FRA|70/78
Julien López|DM|33|FRA|70
Maxime López|MC|27|FRA|75|playmaker
Vincent Marchetti|MC|28|FRA|70
Pierre Lees-Melou|MC|32|FRA|74
Ilan Kebbal|AMC|27|ALG|75|dribbler
Jonathan Ikoné|AMR|27|FRA|74
Luca Koleosho|AML|20|ITA|71/80
Alimami Gory|AML|29|FRA|72
Jean-Philippe Krasso|ST|28|CIV|73
Willem Geubbels|ST|23|FRA|72
Pierre-Yves Hamel|ST|31|FRA|70
`),U("Metz","FCM",58,"Stade Saint-Symphorien",3e4,["#8B1538","#FFFFFF"],5,`
Jonathan Fischer|GK|24|DEN|70
Sadibou Sané|DC|20|FRA|70/77
Terry Yegbe|DC|24|GHA|71
Ismaël Traoré|DC|38|CIV|68
Koffi Kouao|DR|26|CIV|70
Fali Candé|DL|27|GNB|70
Benjamin Stambouli|DM|35|FRA|70
Boubacar Traoré|DM|23|MLI|72
Jessy Deminguet|MC|27|FRA|72
Alpha Touré|MC|19|MLI|70/78
Gauthier Hein|AMC|29|FRA|73
Cheikh Sabaly|AML|26|SEN|72
Giorgi Abuashvili|AMR|22|GEO|70
Habib Diallo|ST|30|SEN|72
Joël Asoro|ST|26|SWE|70
`)]},Rg={name:"2025/26 Season Database",season:2025,leagues:[lM,uM,cM,dM,fM,hM]};async function Eg(){const e=await xC();return e&&Array.isArray(e.leagues)&&e.leagues.length?{db:e,custom:!0}:{db:Rg,custom:!1}}function ro(e){return JSON.parse(JSON.stringify(e))}function pM(){const e=Qe(),t=Se(z=>z.newGame),n=Se(z=>z.busy),[r,a]=I.useState(null),[i,l]=I.useState(!1),[d,c]=I.useState(1),[h,g]=I.useState(""),[m,x]=I.useState("ENG"),[C,b]=I.useState("eng1"),[R,E]=I.useState(null);I.useEffect(()=>{Eg().then(({db:z,custom:X})=>{var ee;a(z),l(X),b(((ee=z.leagues[0])==null?void 0:ee.id)??"eng1")})},[]);const M=r==null?void 0:r.leagues.find(z=>z.id===C),A=I.useMemo(()=>[...(M==null?void 0:M.clubs)??[]].sort((z,X)=>X.rep-z.rep),[M]),D=I.useMemo(()=>Object.entries(Qi).sort((z,X)=>z[1].localeCompare(X[1])),[]),_=async()=>{!r||!R||(await t(r,{managerName:h.trim()||"The Gaffer",managerNat:m,clubName:R}),e("/game/inbox",{replace:!0}))};return n?o.jsxs("div",{className:"h-full flex flex-col items-center justify-center gap-3 text-ink-200",children:[o.jsx(X2,{className:"animate-spin",size:32}),o.jsx("div",{className:"font-bold",children:"Building the football world…"}),o.jsxs("div",{className:"text-xs text-ink-400",children:["Loading ",r==null?void 0:r.leagues.reduce((z,X)=>z+X.clubs.length,0)," clubs"]})]}):d===1?o.jsxs("div",{className:"min-h-full flex flex-col safe-top",children:[o.jsx(ut,{title:"New Game",sub:r?`${r.name}${i?" (edited)":""}`:"Loading…"}),o.jsxs("div",{className:"p-4 space-y-4 max-w-md w-full mx-auto",children:[o.jsxs("div",{className:"panel p-4 space-y-3",children:[o.jsxs("label",{className:"block",children:[o.jsx("span",{className:"text-xs font-bold uppercase text-ink-300",children:"Manager name"}),o.jsx("input",{className:"w-full mt-1",value:h,placeholder:"The Gaffer",onChange:z=>g(z.target.value),maxLength:32,autoFocus:!0})]}),o.jsxs("label",{className:"block",children:[o.jsx("span",{className:"text-xs font-bold uppercase text-ink-300",children:"Nationality"}),o.jsx("select",{className:"w-full mt-1",value:m,onChange:z=>x(z.target.value),children:D.map(([z,X])=>o.jsx("option",{value:z,children:X},z))})]})]}),o.jsx("button",{className:"btn-primary w-full !py-3",onClick:()=>c(2),disabled:!r,children:"Choose your club"})]})]}):o.jsxs("div",{className:"h-full flex flex-col safe-top",children:[o.jsx(ut,{title:"Choose a club",sub:r?`Season ${Xt(r.season)}`:""}),o.jsx(Wa,{value:C,tabs:((r==null?void 0:r.leagues)??[]).map(z=>({value:z.id,label:z.name})),onChange:z=>b(z)}),o.jsx("div",{className:"flex-1 overflow-y-auto scroll-thin pb-24",children:A.map(z=>o.jsxs("button",{className:`row-tap w-full text-left ${R===z.name?"bg-ink-700":""}`,onClick:()=>E(z.name),children:[o.jsx(rt,{club:{colors:z.colors,short:z.short},size:34}),o.jsxs("div",{className:"flex-1 min-w-0",children:[o.jsx("div",{className:"font-bold truncate",children:z.name}),o.jsxs("div",{className:"text-xs text-ink-300 truncate",children:[z.stadium," · Bank ",oe(z.money*1e6)]})]}),o.jsx(In,{value:xl(z.rep),size:12})]},z.name))}),o.jsx("div",{className:"fixed bottom-0 left-0 right-0 p-3 bg-ink-900 border-t border-ink-700 safe-bottom",children:o.jsx("button",{className:"btn-primary w-full !py-3 text-base max-w-md mx-auto flex",disabled:!R,onClick:_,children:R?`Manage ${R}`:"Select a club"})})]})}function mM(){const e=Ie(),t=Se(m=>m.busy),n=Se(m=>m.continue),r=Qe(),a=qr(),i=e.clubs[e.manager.clubId],l=e.news.filter(m=>!m.read).length,d=I.useRef(null);I.useEffect(()=>{var m;(m=d.current)==null||m.scrollTo(0,0)},[a.pathname]),I.useEffect(()=>{document.documentElement.style.setProperty("--club1",i.colors[0]),document.documentElement.style.setProperty("--club2",i.colors[1])},[i]),I.useEffect(()=>{e.manager.sacked&&!a.pathname.endsWith("/sacked")&&r("/game/sacked",{replace:!0})},[e.manager.sacked,a.pathname,r]);const c=async()=>{if(e.pendingMatch!=null){r("/match");return}const m=await n();m==="match"?r("/match"):m==="news"&&!a.pathname.endsWith("/inbox")?r("/game/inbox"):m==="sacked"&&r("/game/sacked")},h=T2(e),g=e.pendingMatch!=null;return o.jsxs("div",{className:"h-full flex flex-col",children:[o.jsxs("header",{className:"safe-top bg-ink-900 border-b border-ink-700 shrink-0",children:[o.jsx("div",{className:"h-1",style:{background:`linear-gradient(90deg, ${i.colors[0]} 0 70%, ${i.colors[1]} 70% 100%)`}}),o.jsxs("div",{className:"flex items-center gap-2 px-3 py-2",children:[o.jsx(Q0,{to:"/game/more",className:"btn-ghost !p-1.5","aria-label":"Menu",children:o.jsx(WC,{size:20})}),o.jsxs("div",{className:"flex-1 min-w-0 leading-tight",children:[o.jsx("div",{className:"font-bold truncate text-[15px]",children:i.name}),o.jsxs("div",{className:"text-[11px] text-ink-300 truncate",children:[Ur(e.date),pr(e.date)&&o.jsx("span",{className:"text-gold",children:" · Window open"})]})]}),o.jsxs("button",{className:`btn ${g?"bg-gold text-ink-950 border border-yellow-300":"btn-primary"} !px-4 !py-2.5 min-w-[118px]`,onClick:c,disabled:t||e.manager.sacked,children:[t?o.jsx(X2,{size:16,className:"animate-spin"}):g?"Match Day":"Continue",!t&&o.jsx(os,{size:16})]})]}),h&&!g&&o.jsxs("div",{className:"px-3 pb-1.5 text-[11px] text-ink-300 truncate",children:["Next: ",h.home===i.id?e.clubs[h.away].name+" (H)":e.clubs[h.home].name+" (A)"," · ",Ur(h.date)]})]}),o.jsx("main",{ref:d,className:"flex-1 overflow-y-auto scroll-thin relative",children:o.jsx(N7,{})}),o.jsxs("nav",{className:"shrink-0 bg-ink-900 border-t border-ink-700 safe-bottom grid grid-cols-5",children:[o.jsx(gi,{to:"/game/inbox",icon:o.jsx(zC,{size:20}),label:"Inbox",badge:l}),o.jsx(gi,{to:"/game/squad",icon:o.jsx(nM,{size:20}),label:"Squad"}),o.jsx(gi,{to:"/game/tactics",icon:o.jsx(dg,{size:20}),label:"Tactics"}),o.jsx(gi,{to:"/game/comps",icon:o.jsx(_c,{size:20}),label:"League"}),o.jsx(gi,{to:"/game/transfers",icon:o.jsx(F2,{size:20}),label:"Transfers"})]})]})}function gi({to:e,icon:t,label:n,badge:r}){return o.jsxs(Q0,{to:e,className:({isActive:a})=>`relative flex flex-col items-center justify-center py-2 gap-0.5 text-[11px] font-bold ${a?"text-gold":"text-ink-300"}`,children:[t,n,!!r&&o.jsx("span",{className:"absolute top-1 right-[22%] bg-loss text-white text-[10px] rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center",children:r>99?"99+":r})]})}const gM={info:o.jsx($C,{size:16}),board:o.jsx(jC,{size:16}),transfer:o.jsx(F2,{size:16}),offer:o.jsx(LC,{size:16,className:"text-gold"}),injury:o.jsx(KC,{size:16,className:"text-loss"}),match:o.jsx(_c,{size:16}),contract:o.jsx(IC,{size:16}),youth:o.jsx(_C,{size:16}),season:o.jsx(_c,{size:16,className:"text-gold"})};function yM(){var h;const e=Ie(),t=Qe(),n=e.clubs[e.manager.clubId],r=T2(e),a=$a(e,n.leagueId),i=a.findIndex(g=>g.clubId===n.id),l=a[i],d=e.leagues.find(g=>g.id===n.leagueId),c=n.boardConfidence;return o.jsxs("div",{className:"p-3 space-y-3",children:[r&&o.jsx(xe,{title:r.date===e.date?"Match day":"Next match",right:o.jsx("span",{className:"normal-case font-normal",children:r.label??d.name}),children:o.jsxs("button",{className:"w-full flex items-center gap-3 p-3 text-left",onClick:()=>e.pendingMatch!=null?t("/match"):t(`/game/club/${r.home===n.id?r.away:r.home}`),children:[o.jsx(rt,{club:e.clubs[r.home],size:40}),o.jsxs("div",{className:"flex-1 text-center min-w-0",children:[o.jsxs("div",{className:"font-bold truncate",children:[e.clubs[r.home].name," ",o.jsx("span",{className:"text-ink-400",children:"v"})," ",e.clubs[r.away].name]}),o.jsxs("div",{className:"text-xs text-ink-300",children:[Ur(r.date)," · ",r.neutral?"Wembley Stadium":e.clubs[r.home].stadium]})]}),o.jsx(rt,{club:e.clubs[r.away],size:40})]})}),o.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[o.jsx(xe,{title:d.short==="EPL"?"League":d.name,children:o.jsxs("button",{className:"w-full p-3 text-left",onClick:()=>t("/game/comps"),children:[o.jsxs("div",{className:"text-2xl font-black",children:[l&&l.p>0?Cl(i+1):"-",o.jsxs("span",{className:"text-sm font-bold text-ink-300",children:[" ",(l==null?void 0:l.pts)??0," pts"]})]}),o.jsx("div",{className:"mt-1 h-4",children:l&&o.jsx(Zi,{form:l.form})})]})}),o.jsx(xe,{title:"Board",children:o.jsxs("div",{className:"p-3",children:[o.jsx("div",{className:"text-sm font-bold",children:Zd(c)}),o.jsx("div",{className:"h-2 rounded-full bg-ink-700 mt-1.5 overflow-hidden",children:o.jsx("div",{className:`h-full ${c>=55?"bg-win":c>=30?"bg-yellow-400":"bg-loss"}`,style:{width:`${c}%`}})}),o.jsx("div",{className:"text-[11px] text-ink-300 mt-1.5 leading-tight",children:(h=e.manager.target)==null?void 0:h.text})]})})]}),c<25&&o.jsxs("div",{className:"flex items-center gap-2 rounded-md bg-loss/20 border border-loss/60 p-2.5 text-sm",children:[o.jsx(vg,{size:18,className:"text-loss shrink-0"})," The board are unhappy with results. Improve quickly or you may lose your job."]}),o.jsxs(xe,{title:"Inbox",right:o.jsxs("span",{className:"normal-case font-normal",children:[e.news.filter(g=>!g.read).length," unread"]}),children:[e.news.length===0&&o.jsx("div",{className:"p-4 text-ink-300 text-sm",children:"No messages."}),e.news.slice(0,80).map(g=>o.jsxs("button",{className:"row-tap w-full text-left",onClick:()=>t(`/game/news/${g.id}`),children:[o.jsx("span",{className:g.read?"text-ink-400":"text-ink-100",children:gM[g.kind]}),o.jsxs("div",{className:"flex-1 min-w-0",children:[o.jsx("div",{className:`truncate ${g.read?"text-ink-300":"font-bold text-white"}`,children:g.title}),o.jsx("div",{className:"text-xs text-ink-400 truncate",children:g.body.split(`
`)[0]})]}),o.jsx("span",{className:"text-[11px] text-ink-400 shrink-0",children:Wd(g.date)})]},g.id))]})]})}function Cl(e){const t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}function rf({w:e,p:t,open:n,onClose:r,title:a,fee:i,onSubmit:l}){const d=e.clubs[e.manager.clubId],c=I.useMemo(()=>S2(e,t,d),[e,t,d]),[h,g]=I.useState(()=>c.wage),[m,x]=I.useState(()=>String(Math.max(1,c.years||3))),[C,b]=I.useState(null),R=za(e,d)-(t.clubId===d.id?t.wage:0);return o.jsx(Ua,{open:n,onClose:r,title:a,children:o.jsxs("div",{className:"p-4 space-y-4",children:[o.jsx("div",{className:"text-sm text-ink-200",children:c.interested?o.jsxs(o.Fragment,{children:[t.short,"'s agent is looking for around ",o.jsx("b",{className:"text-white",children:oe(c.wage)})," a week over"," ",o.jsx("b",{className:"text-white",children:c.years})," year",c.years===1?"":"s","."]}):o.jsx("span",{className:"text-loss",children:c.reason})}),i!=null&&i>0&&o.jsxs("div",{className:"text-sm text-ink-300",children:["Agreed fee: ",o.jsx("b",{className:"text-white",children:oe(i)})," (budget ",oe(d.finances.transferBudget),")"]}),o.jsxs("div",{children:[o.jsx("div",{className:"text-xs font-bold uppercase text-ink-300 mb-1",children:"Weekly wage"}),o.jsx(nf,{value:h,onChange:g,min:500,suffix:"p/w"}),o.jsxs("div",{className:"text-[11px] text-ink-400 mt-1 text-center",children:["Wage bill after signing: ",oe(R+h)," / ",oe(d.finances.wageBudget)," budget"]})]}),o.jsxs("div",{children:[o.jsx("div",{className:"text-xs font-bold uppercase text-ink-300 mb-1",children:"Contract length (years)"}),o.jsx(Mn,{value:m,onChange:x,options:["1","2","3","4","5"].map(E=>({value:E,label:E}))})]}),C&&o.jsx("div",{className:`text-sm font-bold ${C.ok?"text-win":"text-orange-300"}`,children:C.text}),o.jsx("button",{className:"btn-primary w-full !py-3",disabled:!c.interested,onClick:()=>{const E=l(h,+m);b({ok:E.ok,text:E.msg}),E.ok&&setTimeout(r,900)},children:"Offer contract"})]})})}function vM(){const{id:e}=as(),t=Ie(),n=Se(M=>M.mutate),r=Se(M=>M.showToast),a=Qe(),i=t.news.find(M=>M.id===Number(e)),l=(i==null?void 0:i.offerId)!=null?t.offers.find(M=>M.id===i.offerId):void 0,d=(i==null?void 0:i.playerId)!=null?t.players[i.playerId]:void 0,[c,h]=I.useState(!1),[g,m]=I.useState(()=>l?Math.round(l.fee*1.3):0),[x,C]=I.useState(!1);if(I.useEffect(()=>{i&&!i.read&&n(M=>M.news.find(A=>A.id===i.id).read=!0)},[i,n]),!i)return o.jsx(ut,{title:"Message not found"});const b=l&&!l.userBuying&&l.status==="pending",R=l&&l.userBuying&&l.status==="accepted",E=l&&l.userBuying&&l.status==="countered";return o.jsxs("div",{children:[o.jsx(ut,{title:i.title,sub:Ur(i.date)}),o.jsxs("div",{className:"p-4 space-y-4",children:[o.jsx("div",{className:"whitespace-pre-wrap leading-relaxed text-ink-100",children:i.body}),l&&o.jsxs("div",{className:"text-xs text-ink-400",children:["Offer status: ",l.status]}),o.jsxs("div",{className:"flex flex-col gap-2",children:[b&&o.jsxs(o.Fragment,{children:[o.jsxs("button",{className:"btn-primary !py-3",onClick:()=>n(M=>{r(E2(M,M.offers.find(A=>A.id===l.id)))}),children:["Accept ",oe(l.fee)]}),o.jsx("button",{className:"btn-secondary !py-3",onClick:()=>h(!0),children:"Ask for more"}),o.jsx("button",{className:"btn-danger !py-3",onClick:()=>{n(M=>$x(M.offers.find(A=>A.id===l.id))),r("Offer rejected")},children:"Reject"})]}),E&&o.jsxs("button",{className:"btn-primary !py-3",onClick:()=>{n(M=>A2(M.offers.find(A=>A.id===l.id))),C(!0)},children:["Pay ",oe(l.counterFee??0)," and negotiate terms"]}),R&&o.jsx("button",{className:"btn-primary !py-3",onClick:()=>C(!0),children:"Negotiate personal terms"}),d&&o.jsxs("button",{className:"btn-secondary !py-3",onClick:()=>a(`/game/player/${d.id}`),children:["View ",d.name]})]})]}),l&&b&&o.jsx(Ua,{open:c,onClose:()=>h(!1),title:"Counter offer",children:o.jsxs("div",{className:"p-4 space-y-4",children:[o.jsxs("div",{className:"text-sm text-ink-300",children:[t.clubs[l.toClub].name," offered ",oe(l.fee),". ",d?`${d.short} is valued at ${oe(d.value)}.`:""]}),o.jsx(nf,{value:g,onChange:m}),o.jsxs("button",{className:"btn-primary w-full !py-3",onClick:()=>{n(M=>{const A=is(M);r(Ux(M,M.offers.find(D=>D.id===l.id),g,A)),ss(M,A)}),h(!1)},children:["Demand ",oe(g)]})]})}),l&&d&&(R||E||x)&&o.jsx(rf,{w:t,p:d,open:x,onClose:()=>C(!1),title:`Contract: ${d.name}`,fee:l.fee,onSubmit:(M,A)=>{let D={ok:!1,msg:""};return n(_=>{D=R2(_,_.offers.find(z=>z.id===l.id),M,A)}),D.ok&&r(D.msg),D}})]})}const Mp={GK:0,CB:1,FB:2,DM:3,CM:4,WM:5,AM:6,W:7,ST:8},xM=[["Goalkeepers",["GK"]],["Defenders",["CB","FB"]],["Midfielders",["DM","CM","WM","AM"]],["Forwards",["W","ST"]]];function CM(){const e=Ie(),[t,n]=I.useState("general"),r=e.clubs[e.manager.clubId],a=He(e,r.id),i=new Set(r.tactics.lineup);return o.jsxs("div",{children:[o.jsxs("div",{className:"p-3 pb-2 space-y-2 bg-ink-900 border-b border-ink-800 sticky top-0 z-10",children:[o.jsxs("div",{className:"flex items-center justify-between text-xs text-ink-300",children:[o.jsxs("span",{children:[a.length," players · Wages ",oe(za(e,r)),"/wk"]}),o.jsxs("span",{children:[a.filter(l=>l.injury).length," injured · ",a.filter(l=>l.suspended>0).length," suspended"]})]}),o.jsx(Mn,{value:t,onChange:n,options:[{value:"general",label:"General"},{value:"contract",label:"Contracts"},{value:"stats",label:"Stats"}]})]}),xM.map(([l,d])=>{const c=a.filter(h=>d.includes(Ft(h.positions[0]))).sort((h,g)=>Mp[Ft(h.positions[0])]-Mp[Ft(g.positions[0])]||g.ability-h.ability);return c.length?o.jsxs("div",{children:[o.jsx("div",{className:"panel-head",children:l}),c.map(h=>o.jsx(MM,{p:h,w:e,view:t,starter:i.has(h.id)},h.id))]},l):null})]})}function MM({p:e,w:t,view:n,starter:r}){const a=Qe(),i=Ra(e);return o.jsxs("button",{className:"row-tap w-full text-left",onClick:()=>a(`/game/player/${e.id}`),children:[o.jsx("span",{className:`w-6 text-right text-xs tabular-nums ${r?"text-gold font-bold":"text-ink-400"}`,children:e.squadNo}),o.jsx(nn,{pos:e.positions[0]}),o.jsxs("div",{className:"flex-1 min-w-0",children:[o.jsxs("div",{className:"flex items-center gap-1.5",children:[o.jsx("span",{className:`truncate ${r?"font-bold":""}`,children:e.name}),o.jsx(ls,{p:e})]}),n==="general"&&o.jsxs("div",{className:"flex items-center gap-2 text-[11px] text-ink-300",children:[o.jsxs("span",{children:[e.age,"y"]}),o.jsx("span",{children:e.nat}),o.jsx(In,{value:Fa(e),size:10})]}),n==="contract"&&o.jsxs("div",{className:"text-[11px] text-ink-300",children:[oe(e.wage),"/wk · until ",e.contractEnd,e.contractEnd<=t.season+1&&o.jsx("span",{className:"text-orange-300",children:" · expiring"})]}),n==="stats"&&o.jsxs("div",{className:"text-[11px] text-ink-300",children:[e.stats.apps,e.stats.subApps?` (${e.stats.subApps})`:""," apps · ",e.stats.goals," gls · ",e.stats.assists," ast · ",e.stats.yellows,"🟨"]})]}),n==="general"&&o.jsxs("div",{className:"flex flex-col items-end gap-1",children:[o.jsx(mr,{value:e.condition}),o.jsx(gr,{r:i})]}),n==="contract"&&o.jsx("div",{className:"text-sm font-bold tabular-nums",children:oe(e.value)}),n==="stats"&&o.jsx(gr,{r:i})]})}function bM(){const{id:e}=as(),t=Ie(),n=t.players[Number(e)],[r,a]=I.useState("profile");if(!n)return o.jsx(ut,{title:"Player not found",sub:"He may have retired."});const i=n.clubId!=null?t.clubs[n.clubId]:null,l=n.clubId===t.manager.clubId;return o.jsxs("div",{className:"pb-6",children:[o.jsx(ut,{title:n.name,sub:i?i.name:"Free agent",right:l?void 0:o.jsx(AM,{p:n})}),o.jsxs("div",{className:"p-3 flex items-center gap-3 bg-ink-900",children:[o.jsx("div",{className:"w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-black border border-black/40 shrink-0",style:{background:(i==null?void 0:i.colors[0])??"#40587c",color:(i==null?void 0:i.colors[1])??"#fff",textShadow:"0 1px 2px rgba(0,0,0,.6)"},children:n.squadNo||"-"}),o.jsxs("div",{className:"flex-1 min-w-0 space-y-1",children:[o.jsx("div",{className:"flex flex-wrap gap-1",children:n.positions.map(d=>o.jsx(nn,{pos:d},d))}),o.jsxs("div",{className:"text-xs text-ink-300",children:[n.age," years · ",Qi[n.nat]??n.nat," · ",n.foot==="L"?"Left":n.foot==="B"?"Either":"Right"," foot"]}),o.jsxs("div",{className:"text-xs text-ink-300",children:["Value ",o.jsx("b",{className:"text-white",children:oe(n.value)}),i&&o.jsxs(o.Fragment,{children:[" ","· ",o.jsx(Y0,{to:`/game/club/${i.id}`,className:"underline",children:i.short})]})]})]}),i&&o.jsx(rt,{club:i,size:36})]}),o.jsx(Wa,{value:r,onChange:a,tabs:[{value:"profile",label:"Profile"},{value:"stats",label:"Stats & History"},{value:"contract",label:l?"Contract":"Transfer"}]}),o.jsxs("div",{className:"p-3 space-y-3",children:[r==="profile"&&o.jsx(SM,{p:n}),r==="stats"&&o.jsx(EM,{p:n}),r==="contract"&&(l?o.jsx(DM,{p:n}):o.jsx(NM,{p:n}))]})]})}function AM({p:e}){const t=Ie(),n=Se(a=>a.mutate),r=t.shortlist.includes(e.id);return o.jsx("button",{className:"btn-ghost !p-2","aria-label":r?"Remove from shortlist":"Add to shortlist",onClick:()=>n(a=>a.shortlist=r?a.shortlist.filter(i=>i!==e.id):[...a.shortlist,e.id]),children:o.jsx(Oc,{size:20,className:r?"text-gold":"",fill:r?"currentColor":"none"})})}function SM({p:e}){const t=Ze(e),r=e.positions[0]==="GK"?[["Goalkeeping",X0],["Mental",wc],["Physical",jc],["Technical",["First Touch","Passing","Technique","Penalty Taking","Free Kicks"]]]:[["Technical",Z0],["Mental",wc],["Physical",jc]],a=l=>ji.indexOf(l),i=Ra(e);return o.jsxs(o.Fragment,{children:[o.jsxs(xe,{title:"Coach's report",children:[o.jsxs("div",{className:"grid grid-cols-2 divide-x divide-ink-700",children:[o.jsxs("div",{className:"p-3",children:[o.jsx("div",{className:"text-[11px] uppercase font-bold text-ink-300",children:"Current ability"}),o.jsx(In,{value:Fa(e)})]}),o.jsxs("div",{className:"p-3",children:[o.jsx("div",{className:"text-[11px] uppercase font-bold text-ink-300",children:"Potential"}),o.jsx(In,{value:Fa(e,"potential")})]})]}),o.jsxs("div",{className:"grid grid-cols-3 divide-x divide-ink-700 border-t border-ink-700 text-center",children:[o.jsxs("div",{className:"p-2",children:[o.jsx("div",{className:"text-[11px] uppercase font-bold text-ink-300",children:"Condition"}),o.jsx("div",{className:"flex justify-center mt-1",children:o.jsx(mr,{value:e.condition,className:"!w-14"})})]}),o.jsxs("div",{className:"p-2",children:[o.jsx("div",{className:"text-[11px] uppercase font-bold text-ink-300",children:"Morale"}),o.jsx("div",{className:"text-sm font-bold",children:sM(e.morale)})]}),o.jsxs("div",{className:"p-2",children:[o.jsx("div",{className:"text-[11px] uppercase font-bold text-ink-300",children:"Avg rating"}),o.jsx(gr,{r:i})]})]}),(e.injury||e.suspended>0)&&o.jsxs("div",{className:"px-3 py-2 border-t border-ink-700 text-sm text-loss font-bold",children:[e.injury&&`Injured: ${e.injury.name} (${qd(e.injury.days)})`,e.suspended>0&&` Suspended for ${e.suspended} match${e.suspended>1?"es":""}`]})]}),o.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:r.map(([l,d])=>o.jsx(xe,{title:l,children:o.jsx("div",{className:"grid grid-cols-2",children:d.map(c=>o.jsxs("div",{className:"flex items-center justify-between px-3 py-1 border-b border-ink-800 text-[13px] odd:border-r",children:[o.jsx("span",{className:"text-ink-200 truncate",children:c}),o.jsx("span",{className:`font-bold tabular-nums ${iM(t[a(c)])}`,children:t[a(c)]})]},c))})},l))}),o.jsx(RM,{p:e})]})}const kM=[{pos:"ST",x:50,y:10},{pos:"AML",x:15,y:25},{pos:"AMC",x:50,y:27},{pos:"AMR",x:85,y:25},{pos:"ML",x:15,y:45},{pos:"MC",x:50,y:45},{pos:"MR",x:85,y:45},{pos:"WBL",x:15,y:62},{pos:"DM",x:50,y:62},{pos:"WBR",x:85,y:62},{pos:"DL",x:15,y:78},{pos:"DC",x:50,y:78},{pos:"DR",x:85,y:78},{pos:"GK",x:50,y:92}];function RM({p:e}){const t=I.useMemo(()=>kM.map(n=>({...n,r:Qt(e,n.pos)})),[e]);return o.jsxs(xe,{title:"Positions",children:[o.jsxs("div",{className:"relative mx-auto my-3 w-[220px] h-[260px] rounded bg-pitch-600 border-2 border-white/40",children:[o.jsx("div",{className:"absolute left-0 right-0 top-1/2 border-t border-white/30"}),t.map(n=>{const a=e.positions.includes(n.pos)?"bg-win text-black":n.r>=e.ability*.9?"bg-lime-600 text-white":n.r>=e.ability*.75?"bg-yellow-600 text-black":"bg-ink-800/80 text-ink-300";return o.jsx("div",{className:"absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center",style:{left:`${n.x}%`,top:`${n.y}%`},children:o.jsx("span",{className:`chip ${a} min-w-[30px] justify-center`,children:n.pos})},n.pos)})]}),o.jsx("div",{className:"text-[11px] text-ink-300 text-center pb-2",children:"Green = natural · lime = competent · amber = awkward"})]})}function EM({p:e}){const t=Ie(),n=e.stats,r=Ra(e);return o.jsxs(o.Fragment,{children:[o.jsxs(xe,{title:`This season (${Xt(t.season)})`,children:[o.jsx("div",{className:"grid grid-cols-4 text-center divide-x divide-ink-700",children:[["Apps",`${n.apps}${n.subApps?` (${n.subApps})`:""}`],["Goals",n.goals],["Assists",n.assists],["Rating",r?r.toFixed(2):"-"]].map(([a,i])=>o.jsxs("div",{className:"p-2",children:[o.jsx("div",{className:"text-[11px] uppercase font-bold text-ink-300",children:a}),o.jsx("div",{className:"font-bold",children:i})]},a))}),o.jsx("div",{className:"grid grid-cols-4 text-center divide-x divide-ink-700 border-t border-ink-700",children:[["MotM",n.motm],["Clean sh.",n.cleanSheets],["Yellow",n.yellows],["Red",n.reds]].map(([a,i])=>o.jsxs("div",{className:"p-2",children:[o.jsx("div",{className:"text-[11px] uppercase font-bold text-ink-300",children:a}),o.jsx("div",{className:"font-bold",children:i})]},a))}),e.form.length>0&&o.jsxs("div",{className:"px-3 py-2 border-t border-ink-700 flex items-center gap-2 text-sm",children:[o.jsxs("span",{className:"text-ink-300",children:["Last ",e.form.length,":"]}),e.form.map((a,i)=>o.jsx(gr,{r:a},i))]})]}),o.jsxs(xe,{title:"Career",children:[e.career.length===0&&o.jsx("div",{className:"p-3 text-sm text-ink-300",children:"No completed seasons in this game yet."}),[...e.career].reverse().map((a,i)=>o.jsxs("div",{className:"row text-sm",children:[o.jsx("span",{className:"w-14 text-ink-300",children:Xt(a.season)}),o.jsx("span",{className:"flex-1 truncate",children:a.clubName}),o.jsx("span",{className:"w-10 text-right tabular-nums",children:a.apps}),o.jsx("span",{className:"w-10 text-right tabular-nums",children:a.goals}),o.jsx("span",{className:"w-12 text-right tabular-nums",children:a.avg?a.avg.toFixed(2):"-"})]},i))]})]})}function DM({p:e}){const t=Ie(),n=Se(g=>g.mutate),r=Se(g=>g.showToast),a=t.clubs[t.manager.clubId],[i,l]=I.useState(!1),[d,c]=I.useState(!1),h=a.tactics;return o.jsxs(o.Fragment,{children:[o.jsxs(xe,{title:"Contract",children:[o.jsxs("div",{className:"row",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:"Wage"}),o.jsxs("b",{children:[oe(e.wage)," p/w"]})]}),o.jsxs("div",{className:"row",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:"Expires"}),o.jsxs("b",{className:e.contractEnd<=t.season+1?"text-orange-300":"",children:["June ",e.contractEnd]})]}),o.jsxs("div",{className:"row",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:"Value"}),o.jsx("b",{children:oe(e.value)})]}),o.jsxs("div",{className:"row",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:"Joined"}),o.jsx("b",{children:e.joined.slice(0,4)})]})]}),o.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[o.jsx("button",{className:"btn-primary !py-3",onClick:()=>l(!0),children:"New contract"}),o.jsx("button",{className:"btn-secondary !py-3",onClick:()=>{n(g=>g.players[e.id].transferListed=!e.transferListed),r(e.transferListed?`${e.short} removed from the transfer list`:`${e.short} added to the transfer list`)},children:e.transferListed?"Unlist":"Transfer list"}),o.jsx("button",{className:"btn-secondary !py-3",onClick:()=>n(g=>g.clubs[a.id].tactics.captain=e.id),disabled:h.captain===e.id,children:h.captain===e.id?"Captain ✓":"Make captain"}),o.jsx("button",{className:"btn-secondary !py-3",onClick:()=>n(g=>g.clubs[a.id].tactics.penaltyTaker=e.id),disabled:h.penaltyTaker===e.id,children:h.penaltyTaker===e.id?"Penalties ✓":"Take penalties"}),o.jsx("button",{className:"btn-secondary !py-3",onClick:()=>n(g=>g.clubs[a.id].tactics.freeKickTaker=e.id),disabled:h.freeKickTaker===e.id,children:h.freeKickTaker===e.id?"Free kicks ✓":"Take free kicks"}),d?o.jsx("button",{className:"btn-danger !py-3",onClick:()=>{let g="";n(m=>g=Wx(m,m.players[e.id])),r(g),c(!1)},children:"Confirm release"}):o.jsx("button",{className:"btn-secondary !py-3 !text-loss",onClick:()=>c(!0),children:"Release"})]}),i&&o.jsx(rf,{w:t,p:e,open:i,onClose:()=>l(!1),title:`New contract: ${e.name}`,onSubmit:(g,m)=>{let x={ok:!1,msg:""};return n(C=>x=Jx(C,C.players[e.id],g,m)),x.ok&&r(x.msg),x}})]})}function NM({p:e}){var b,R;const t=Ie(),n=Se(E=>E.mutate),r=Se(E=>E.showToast),a=t.clubs[t.manager.clubId],i=e.clubId!=null?Ud(t,e):0,[l,d]=I.useState(!1),[c,h]=I.useState(()=>Math.max(0,Math.round(e.value))),[g,m]=I.useState(null),x=Kx(t,e),C=t.offers.filter(E=>E.playerId===e.id&&E.userBuying).slice(-1)[0];return o.jsxs(o.Fragment,{children:[o.jsxs(xe,{title:"Transfer status",children:[o.jsxs("div",{className:"row",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:"Value"}),o.jsx("b",{children:oe(e.value)})]}),e.clubId!=null&&o.jsxs("div",{className:"row",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:"Club valuation (scout estimate)"}),o.jsxs("b",{children:["~",oe(i)]})]}),o.jsxs("div",{className:"row",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:"Wage"}),o.jsxs("b",{children:[oe(e.wage)," p/w"]})]}),o.jsxs("div",{className:"row",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:"Contract"}),o.jsxs("b",{children:["June ",e.contractEnd]})]}),e.transferListed&&o.jsx("div",{className:"row text-gold font-bold",children:"Transfer listed by his club"}),C&&o.jsxs("div",{className:"row",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:"Your offer"}),o.jsxs("b",{children:[oe(C.fee)," · ",C.status]})]}),o.jsxs("div",{className:"row",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:"Your transfer budget"}),o.jsx("b",{children:oe(a.finances.transferBudget)})]})]}),C&&C.status==="accepted"?o.jsx("button",{className:"btn-primary w-full !py-3",onClick:()=>m(C.id),children:"Negotiate personal terms"}):C&&C.status==="countered"?o.jsxs("button",{className:"btn-primary w-full !py-3",onClick:()=>{n(E=>A2(E.offers.find(M=>M.id===C.id))),m(C.id)},children:["Pay ",oe(C.counterFee??0)," and negotiate terms"]}):x?o.jsx("div",{className:"text-sm text-ink-300 text-center",children:x}):e.clubId==null?o.jsx("button",{className:"btn-primary w-full !py-3",onClick:()=>{let E=0;n(M=>E=mp(M,M.players[e.id],0).id),m(E)},children:"Offer contract (free agent)"}):o.jsx("button",{className:"btn-primary w-full !py-3",onClick:()=>d(!0),children:"Make an offer"}),o.jsx(Ua,{open:l,onClose:()=>d(!1),title:`Bid for ${e.name}`,children:o.jsxs("div",{className:"p-4 space-y-4",children:[o.jsxs("div",{className:"text-sm text-ink-300",children:[(b=t.clubs[e.clubId??0])==null?void 0:b.name," will respond tomorrow. Budget: ",oe(a.finances.transferBudget),"."]}),o.jsx(nf,{value:c,onChange:h}),o.jsx("div",{className:"grid grid-cols-3 gap-2",children:[.8,1,1.25].map(E=>o.jsx("button",{className:"btn-secondary !py-1.5 text-xs",onClick:()=>h(Math.round(e.value*E)),children:E===1?"Value":`${E>1?"+":""}${Math.round((E-1)*100)}%`},E))}),c>a.finances.transferBudget&&o.jsx("div",{className:"text-sm text-loss font-bold",children:"This exceeds your transfer budget."}),o.jsxs("button",{className:"btn-primary w-full !py-3",disabled:c>a.finances.transferBudget,onClick:()=>{n(E=>mp(E,E.players[e.id],c)),r("Offer submitted. Expect a response tomorrow."),d(!1)},children:["Submit ",oe(c)]})]})}),g!=null&&o.jsx(rf,{w:t,p:e,open:!0,onClose:()=>m(null),title:`Contract: ${e.name}`,fee:(R=t.offers.find(E=>E.id===g))==null?void 0:R.fee,onSubmit:(E,M)=>{let A={ok:!1,msg:""};return n(D=>A=R2(D,D.offers.find(_=>_.id===g),E,M)),A.ok&&r(A.msg),A}})]})}function wM(){const e=Ie(),t=Se(m=>m.mutate),n=e.clubs[e.manager.clubId],r=n.tactics,a=Ut[r.formation],[i,l]=I.useState(null),d=h2(e,n),c=m=>t(x=>m(x.clubs[n.id])),h=m=>c(x=>{const C=x.tactics.lineup.filter(A=>A!=null);x.tactics.formation=m;const b=Ut[m],R=new Array(b.length).fill(null),E=new Set(C),M=[];for(const A of C)b.forEach((D,_)=>M.push({s:Qt(e.players[A],D.pos),id:A,i:_}));M.sort((A,D)=>D.s-A.s);for(const A of M)R[A.i]!=null||!E.has(A.id)||(R[A.i]=A.id,E.delete(A.id));x.tactics.lineup=R,x.tactics.subs=[...E,...x.tactics.subs].slice(0,9)}),g=()=>c(m=>{const x=gl(e,m);m.tactics.lineup=x.lineup,m.tactics.subs=x.subs});return o.jsxs("div",{className:"p-3 space-y-3",children:[o.jsxs("div",{className:"flex gap-2",children:[o.jsx("select",{className:"flex-1 font-bold",value:r.formation,onChange:m=>h(m.target.value),children:fx.map(m=>o.jsx("option",{value:m,children:m},m))}),o.jsxs("button",{className:"btn-secondary",onClick:g,children:[o.jsx(rM,{size:16})," Assistant pick"]})]}),d.length>0&&o.jsx("div",{className:"rounded-md bg-loss/15 border border-loss/50 p-2 text-sm space-y-0.5",children:d.slice(0,4).map((m,x)=>o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsx(vg,{size:14,className:"text-loss shrink-0"})," ",m]},x))}),o.jsxs("div",{className:"relative w-full max-w-md mx-auto aspect-[3/4] rounded-lg overflow-hidden border-2 border-white/30 bg-pitch-600",children:[o.jsx(jM,{}),a.map((m,x)=>{const C=r.lineup[x],b=C!=null?e.players[C]:null,R=b?Qt(b,m.pos)/Math.max(1,b.ability):0,E=b?R>=.99?"border-win":R>=.9?"border-yellow-300":"border-loss":"border-white/40 border-dashed";return o.jsxs("button",{className:"absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[22%]",style:{left:`${m.x}%`,top:`${100-m.y*.92-4}%`},onClick:()=>l({kind:"slot",index:x}),children:[o.jsx("span",{className:`w-9 h-9 rounded-full border-2 ${E} flex items-center justify-center text-sm font-black shadow`,style:{background:b?n.colors[0]:"rgba(0,0,0,.25)",color:n.colors[1],textShadow:"0 1px 2px rgba(0,0,0,.7)"},children:b?b.squadNo:"+"}),o.jsx("span",{className:"mt-0.5 max-w-full truncate text-[11px] font-bold bg-black/55 rounded px-1 leading-4",children:b?b.short:m.pos}),b&&(b.injury||b.suspended>0||b.condition<80)&&o.jsx("span",{className:`text-[9px] font-bold rounded px-1 ${b.injury||b.suspended>0?"bg-loss":"bg-orange-500"}`,children:b.injury?"INJ":b.suspended>0?"SUS":`${Math.round(b.condition)}%`})]},x)})]}),o.jsxs(xe,{title:`Substitutes (${r.subs.length}/9)`,right:o.jsx("button",{className:"normal-case text-gold",onClick:()=>l({kind:"bench"}),children:"+ Add"}),children:[r.subs.length===0&&o.jsx("div",{className:"p-3 text-sm text-ink-300",children:"No substitutes selected."}),r.subs.map(m=>{const x=e.players[m];return x?o.jsxs("div",{className:"row",children:[o.jsx(nn,{pos:x.positions[0]}),o.jsx("span",{className:"flex-1 truncate",children:x.name}),o.jsx(ls,{p:x}),o.jsx(mr,{value:x.condition}),o.jsx("button",{className:"btn-ghost !p-1","aria-label":"Remove",onClick:()=>c(C=>C.tactics.subs=C.tactics.subs.filter(b=>b!==m)),children:o.jsx(kg,{size:16})})]},m):null})]}),o.jsx(xe,{title:"Team instructions",children:o.jsxs("div",{className:"p-3 space-y-3",children:[o.jsx(ao,{label:"Mentality",children:o.jsx(Mn,{small:!0,value:r.mentality,onChange:m=>c(x=>x.tactics.mentality=m),options:[{value:"defensive",label:"Defend"},{value:"cautious",label:"Cautious"},{value:"balanced",label:"Balanced"},{value:"attacking",label:"Attack"},{value:"all-out",label:"All-out"}]})}),o.jsx(ao,{label:"Passing",children:o.jsx(Mn,{small:!0,value:r.passing,onChange:m=>c(x=>x.tactics.passing=m),options:[{value:"short",label:"Short"},{value:"mixed",label:"Mixed"},{value:"direct",label:"Direct"}]})}),o.jsx(ao,{label:"Pressing",children:o.jsx(Mn,{small:!0,value:r.pressing,onChange:m=>c(x=>x.tactics.pressing=m),options:[{value:"low",label:"Stand off"},{value:"normal",label:"Normal"},{value:"high",label:"Press high"}]})}),o.jsx(ao,{label:"Tempo",children:o.jsx(Mn,{small:!0,value:r.tempo,onChange:m=>c(x=>x.tactics.tempo=m),options:[{value:"slow",label:"Patient"},{value:"normal",label:"Normal"},{value:"fast",label:"Quick"}]})})]})}),o.jsxs(xe,{title:"Set pieces & captain",children:[o.jsx(Tu,{w:e,label:"Captain",id:r.captain}),o.jsx(Tu,{w:e,label:"Penalties",id:r.penaltyTaker,fallback:"Best available"}),o.jsx(Tu,{w:e,label:"Free kicks",id:r.freeKickTaker,fallback:"Best available"}),o.jsx("div",{className:"px-3 py-2 text-[11px] text-ink-400",children:"Set roles from a player's profile."})]}),i&&o.jsx(TM,{w:e,club:n,pick:i,onClose:()=>l(null)})]})}function ao({label:e,children:t}){return o.jsxs("div",{children:[o.jsx("div",{className:"text-[11px] uppercase font-bold text-ink-300 mb-1",children:e}),t]})}function Tu({w:e,label:t,id:n,fallback:r="-"}){const a=n!=null?e.players[n]:null;return o.jsxs("div",{className:"row text-sm",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:t}),o.jsx("b",{children:a&&a.clubId===e.manager.clubId?a.name:r})]})}function jM(){return o.jsxs("div",{className:"absolute inset-0 pointer-events-none",children:[o.jsx("div",{className:"absolute inset-0",style:{background:"repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 10%, transparent 10% 20%)"}}),o.jsx("div",{className:"absolute left-0 right-0 top-1/2 border-t-2 border-white/30"}),o.jsx("div",{className:"absolute left-1/2 top-1/2 w-[28%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30"}),o.jsx("div",{className:"absolute left-1/2 top-0 w-[56%] h-[15%] -translate-x-1/2 border-2 border-t-0 border-white/30"}),o.jsx("div",{className:"absolute left-1/2 bottom-0 w-[56%] h-[15%] -translate-x-1/2 border-2 border-b-0 border-white/30"})]})}function TM({w:e,club:t,pick:n,onClose:r}){const a=Se(m=>m.mutate),i=t.tactics,l=n.kind==="slot"?Ut[i.formation][n.index].pos:null,d=He(e,t.id),c=I.useMemo(()=>{const m=d.map(x=>({p:x,r:l?Qt(x,l):x.ability}));return m.sort((x,C)=>Number(dr(C.p))-Number(dr(x.p))||C.r-x.r),m},[d,l]),h=m=>{const x=i.lineup.indexOf(m.id);return x>=0?Ut[i.formation][x].pos:i.subs.includes(m.id)?"SUB":""},g=m=>{a(x=>{const C=x.clubs[t.id].tactics;if(n.kind==="bench"){if(C.subs.includes(m.id))return;const A=C.lineup.indexOf(m.id);A>=0&&(C.lineup[A]=null),C.subs=[...C.subs,m.id].slice(0,9);return}const b=n.index,R=C.lineup[b],E=C.lineup.indexOf(m.id),M=C.subs.indexOf(m.id);E>=0?C.lineup[E]=R:M>=0&&(R!=null?C.subs[M]=R:C.subs.splice(M,1)),C.lineup[b]=m.id}),r()};return o.jsxs(Ua,{open:!0,onClose:r,title:l?`Select ${l}`:"Add substitute",children:[n.kind==="slot"&&i.lineup[n.index]!=null&&o.jsx("button",{className:"row-tap w-full text-left text-loss font-bold",onClick:()=>{a(m=>m.clubs[t.id].tactics.lineup[n.index]=null),r()},children:"Clear this position"}),c.map(({p:m,r:x})=>o.jsxs("button",{className:`row-tap w-full text-left ${dr(m)?"":"opacity-50"}`,onClick:()=>g(m),children:[o.jsx(nn,{pos:m.positions[0]}),o.jsxs("div",{className:"flex-1 min-w-0",children:[o.jsxs("div",{className:"flex items-center gap-1.5",children:[o.jsx("span",{className:"truncate",children:m.name}),o.jsx(ls,{p:m})]}),o.jsxs("div",{className:"text-[11px] text-ink-300",children:[m.positions.join(", ")," ",h(m)&&o.jsxs("span",{className:"text-gold",children:["· ",h(m)]})]})]}),o.jsx(mr,{value:m.condition}),o.jsx("span",{className:"w-8 text-right font-bold tabular-nums text-sm",children:Math.round(x)})]},m.id))]})}function LM(){const e=Ie(),t=e.clubs[e.manager.clubId].leagueId,[n,r]=I.useState(t),[a,i]=I.useState("table"),l=e.leagues.find(d=>d.id===n);return o.jsxs("div",{children:[o.jsx("div",{className:"p-3 pb-0 bg-ink-900",children:o.jsx("select",{className:"w-full font-bold",value:n,onChange:d=>r(d.target.value),children:e.leagues.map(d=>o.jsx("option",{value:d.id,children:d.name},d.id))})}),o.jsx(Wa,{value:a,onChange:i,tabs:[{value:"table",label:"Table"},{value:"fixtures",label:"Fixtures"},{value:"mine",label:"My Results"},{value:"stats",label:"Stats"}]}),a==="table"&&o.jsx(FM,{w:e,lg:l}),a==="fixtures"&&o.jsx(GM,{w:e,lg:l}),a==="mine"&&o.jsx(BM,{w:e}),a==="stats"&&o.jsx(IM,{w:e,lg:l})]})}function PM(e,t,n){return e.tier===1?t<=4?"border-l-win":t<=e.europe+1?"border-l-sky-400":e.relegated&&t>n-e.relegated?"border-l-loss":"border-l-transparent":t<=(e.promotedAuto??2)?"border-l-win":e.playoffs&&t<=(e.promotedAuto??2)+4?"border-l-sky-400":"border-l-transparent"}function FM({w:e,lg:t}){const n=Qe(),r=$a(e,t.id);return o.jsxs("div",{className:"text-sm",children:[o.jsxs("div",{className:"flex items-center px-2 py-1.5 text-[11px] font-bold uppercase text-ink-300 bg-ink-850 border-b border-ink-700",children:[o.jsx("span",{className:"w-6 text-center",children:"#"}),o.jsx("span",{className:"flex-1 pl-9",children:"Club"}),o.jsx("span",{className:"w-7 text-center",children:"P"}),o.jsx("span",{className:"w-7 text-center",children:"W"}),o.jsx("span",{className:"w-7 text-center",children:"D"}),o.jsx("span",{className:"w-7 text-center",children:"L"}),o.jsx("span",{className:"w-9 text-center",children:"GD"}),o.jsx("span",{className:"w-9 text-center",children:"Pts"})]}),r.map((a,i)=>{const l=e.clubs[a.clubId],d=a.clubId===e.manager.clubId;return o.jsxs("button",{className:`w-full flex items-center px-2 py-1.5 border-b border-ink-800 border-l-4 ${PM(t,i+1,r.length)} ${d?"bg-ink-700/70 font-bold":""}`,onClick:()=>n(`/game/club/${l.id}`),children:[o.jsx("span",{className:"w-6 text-center text-ink-300",children:i+1}),o.jsx(rt,{club:l,size:24}),o.jsx("span",{className:"flex-1 text-left truncate pl-2",children:l.name}),o.jsx("span",{className:"w-7 text-center tabular-nums",children:a.p}),o.jsx("span",{className:"w-7 text-center tabular-nums text-ink-300",children:a.w}),o.jsx("span",{className:"w-7 text-center tabular-nums text-ink-300",children:a.d}),o.jsx("span",{className:"w-7 text-center tabular-nums text-ink-300",children:a.l}),o.jsx("span",{className:"w-9 text-center tabular-nums",children:a.gd>0?`+${a.gd}`:a.gd}),o.jsx("span",{className:"w-9 text-center tabular-nums font-bold",children:a.pts})]},a.clubId)}),o.jsxs("div",{className:"px-3 py-2 text-[11px] text-ink-400 flex flex-wrap gap-3",children:[o.jsxs("span",{children:[o.jsx("span",{className:"inline-block w-2 h-2 bg-win mr-1"}),t.tier===1?"Champions League":"Promotion"]}),o.jsxs("span",{children:[o.jsx("span",{className:"inline-block w-2 h-2 bg-sky-400 mr-1"}),t.tier===1?"Europe":"Play-offs"]}),t.relegated&&o.jsxs("span",{children:[o.jsx("span",{className:"inline-block w-2 h-2 bg-loss mr-1"}),"Relegation"]})]})]})}function Dg({w:e,f:t,showDate:n=!1}){const r=e.clubs[t.home],a=e.clubs[t.away],i=t.home===e.manager.clubId||t.away===e.manager.clubId;return o.jsxs("div",{className:`flex items-center gap-2 px-3 py-2 border-b border-ink-800 text-sm ${i?"bg-ink-700/60":""}`,children:[n&&o.jsx("span",{className:"w-12 text-[11px] text-ink-300",children:Wd(t.date)}),o.jsx("span",{className:"flex-1 text-right truncate",children:r.name}),o.jsx(rt,{club:r,size:20}),o.jsx("span",{className:`w-14 text-center font-bold tabular-nums ${t.played?"bg-ink-700 rounded":"text-ink-400 text-xs"}`,children:t.played?`${t.hg} - ${t.ag}`:"v"}),o.jsx(rt,{club:a,size:20}),o.jsx("span",{className:"flex-1 truncate",children:a.name}),t.pens&&o.jsxs("span",{className:"text-[10px] text-ink-300",children:["p",t.pens[0],"-",t.pens[1]]})]})}function GM({w:e,lg:t}){const n=I.useMemo(()=>e.fixtures.filter(g=>g.comp===t.id||g.comp===`${t.id}-po`),[e.fixtures,t.id]),r=I.useMemo(()=>{const g=new Map;for(const m of n){const x=m.compType==="playoff"?`${m.label}`:`Matchday ${m.round}`;g.has(x)||g.set(x,[]),g.get(x).push(m)}return[...g.entries()]},[n]),a=r.findIndex(([,g])=>g.some(m=>!m.played)),[i,l]=I.useState(Math.max(0,a===-1?r.length-1:a));if(!r.length)return o.jsx("div",{className:"p-4 text-ink-300 text-sm",children:"No fixtures."});const d=Math.min(i,r.length-1),[c,h]=r[d];return o.jsxs("div",{children:[o.jsxs("div",{className:"flex items-center justify-between px-2 py-1.5 bg-ink-850 border-b border-ink-700",children:[o.jsx("button",{className:"btn-ghost !p-1",onClick:()=>l(Math.max(0,d-1)),disabled:d===0,"aria-label":"Previous round",children:o.jsx(Xd,{size:20})}),o.jsxs("div",{className:"text-center",children:[o.jsx("div",{className:"font-bold text-sm",children:c}),o.jsx("div",{className:"text-[11px] text-ink-300",children:Wd(h[0].date)})]}),o.jsx("button",{className:"btn-ghost !p-1",onClick:()=>l(Math.min(r.length-1,d+1)),disabled:d===r.length-1,"aria-label":"Next round",children:o.jsx(os,{size:20})})]}),h.map(g=>o.jsx(Dg,{w:e,f:g},g.id))]})}function BM({w:e}){const t=e.manager.clubId,n=e.fixtures.filter(l=>l.home===t||l.away===t),r=n.filter(l=>l.played).map(l=>Yd(l,t)),a=r.filter(l=>l==="W").length,i=r.filter(l=>l==="D").length;return o.jsxs("div",{children:[o.jsxs("div",{className:"px-3 py-2 text-sm bg-ink-850 border-b border-ink-700 flex items-center justify-between",children:[o.jsxs("span",{children:["W",a," D",i," L",r.length-a-i]}),o.jsx(Zi,{form:r.slice(-6)})]}),n.map(l=>o.jsx(Dg,{w:e,f:l,showDate:!0},l.id))]})}function IM({w:e,lg:t}){var h;const n=Qe(),r=I.useMemo(()=>Object.values(e.players).filter(g=>g.clubId!=null&&t.clubIds.includes(g.clubId)),[e.players,t.clubIds]),a=[...r].filter(g=>g.stats.goals>0).sort((g,m)=>m.stats.goals-g.stats.goals||g.stats.apps-m.stats.apps).slice(0,15),i=[...r].filter(g=>g.stats.assists>0).sort((g,m)=>m.stats.assists-g.stats.assists).slice(0,10),l=Math.max(3,Math.floor(((h=$a(e,t.id)[0])==null?void 0:h.p)*.4||0)),d=[...r].filter(g=>g.stats.apps>=l).sort((g,m)=>(Ra(m)??0)-(Ra(g)??0)).slice(0,10),c=(g,m,x)=>o.jsxs("div",{children:[o.jsx("div",{className:"panel-head",children:g}),m.length===0&&o.jsx("div",{className:"p-3 text-sm text-ink-300",children:"No data yet."}),m.map((C,b)=>o.jsxs("button",{className:"row-tap w-full text-left text-sm",onClick:()=>n(`/game/player/${C.id}`),children:[o.jsx("span",{className:"w-5 text-ink-400",children:b+1}),o.jsx(rt,{club:e.clubs[C.clubId],size:20}),o.jsx("span",{className:"flex-1 truncate",children:C.name}),o.jsx("span",{className:"font-bold",children:x(C)})]},C.id))]});return o.jsxs("div",{children:[c("Top scorers",a,g=>g.stats.goals),c("Assists",i,g=>g.stats.assists),c(`Average rating (min ${l} apps)`,d,g=>o.jsx(gr,{r:Ra(g)}))]})}function OM(){var h,g;const{id:e}=as(),t=Ie(),n=Qe(),r=t.clubs[Number(e)];if(!r)return o.jsx(ut,{title:"Club not found"});const a=t.leagues.find(m=>m.id===r.leagueId),i=$a(t,a.id),l=i.findIndex(m=>m.clubId===r.id)+1,d=He(t,r.id).sort((m,x)=>x.ability-m.ability),c=t.fixtures.filter(m=>m.played&&(m.home===r.id||m.away===r.id)).slice(-5);return o.jsxs("div",{className:"pb-6",children:[o.jsx(ut,{title:r.name,sub:a.name}),o.jsxs("div",{className:"p-3 flex items-center gap-3 bg-ink-900 border-b border-ink-800",children:[o.jsx(rt,{club:r,size:52}),o.jsxs("div",{className:"flex-1 min-w-0",children:[o.jsx("div",{className:"text-sm text-ink-300",children:r.stadium}),o.jsxs("div",{className:"text-xs text-ink-400",children:["Capacity ",r.capacity.toLocaleString()]}),o.jsx("div",{className:"mt-1",children:o.jsx(In,{value:xl(r.reputation),size:12})})]})]}),o.jsxs("div",{className:"p-3 space-y-3",children:[o.jsxs(xe,{children:[o.jsxs("div",{className:"flex divide-x divide-ink-700",children:[o.jsx(fn,{label:"Position",value:(h=i[l-1])!=null&&h.p?Cl(l):"-",sub:`${((g=i[l-1])==null?void 0:g.pts)??0} pts`}),o.jsx(fn,{label:"Formation",value:r.tactics.formation}),o.jsx(fn,{label:"Balance",value:oe(r.finances.balance)})]}),c.length>0&&o.jsxs("div",{className:"px-3 py-2 border-t border-ink-700 flex items-center gap-2 text-sm",children:[o.jsx("span",{className:"text-ink-300",children:"Form"}),o.jsx(Zi,{form:c.map(m=>Yd(m,r.id))})]})]}),o.jsx(xe,{title:`Squad (${d.length})`,children:d.map(m=>o.jsxs("button",{className:"row-tap w-full text-left",onClick:()=>n(`/game/player/${m.id}`),children:[o.jsx(nn,{pos:m.positions[0]}),o.jsxs("div",{className:"flex-1 min-w-0",children:[o.jsxs("div",{className:"flex items-center gap-1.5",children:[o.jsx("span",{className:"truncate",children:m.name}),o.jsx(ls,{p:m})]}),o.jsxs("div",{className:"text-[11px] text-ink-300",children:[m.age,"y · ",m.nat," · ",oe(m.value)]})]}),o.jsx(In,{value:Fa(m),size:10})]},m.id))})]})]})}const _M=[["","Any position"],["GK","Goalkeeper"],["CB","Centre-back"],["FB","Full-back / wing-back"],["DM","Defensive mid"],["CM","Central mid"],["WM","Wide mid"],["AM","Attacking mid"],["W","Winger"],["ST","Striker"]];function KM(){const e=Ie(),[t,n]=I.useState("search"),r=e.clubs[e.manager.clubId];return o.jsxs("div",{children:[o.jsxs("div",{className:"px-3 py-2 bg-ink-900 text-xs text-ink-300 flex justify-between",children:[o.jsxs("span",{children:["Budget ",o.jsx("b",{className:"text-white",children:oe(r.finances.transferBudget)})]}),o.jsx("span",{className:pr(e.date)?"text-gold font-bold":"",children:pr(e.date)?"Window open":"Window closed"})]}),o.jsx(Wa,{value:t,onChange:n,tabs:[{value:"search",label:"Search"},{value:"shortlist",label:`Shortlist (${e.shortlist.length})`},{value:"offers",label:"Offers"},{value:"listed",label:"Listed"}]}),t==="search"&&o.jsx(zM,{w:e}),t==="shortlist"&&o.jsx(zc,{w:e,players:e.shortlist.map(a=>e.players[a]).filter(Boolean),empty:"Tap the star on a player's profile to shortlist him."}),t==="offers"&&o.jsx($M,{w:e}),t==="listed"&&o.jsx(zc,{w:e,players:Object.values(e.players).filter(a=>a.transferListed&&a.clubId!==e.manager.clubId).sort((a,i)=>i.ability-a.ability).slice(0,100),empty:"No players are currently transfer listed."})]})}function zM({w:e}){const[t,n]=I.useState(""),[r,a]=I.useState(""),[i,l]=I.useState(""),[d,c]=I.useState(40),[h,g]=I.useState(0),[m,x]=I.useState(0),[C,b]=I.useState("stars"),R=I.useMemo(()=>{const E=t.trim().toLowerCase(),M=Object.values(e.players).filter(A=>!(A.clubId===e.manager.clubId||E&&!A.name.toLowerCase().includes(E)||r&&Ft(A.positions[0])!==r&&!A.positions.some(D=>Ft(D)===r)||i==="free"&&A.clubId!=null||i&&i!=="free"&&(A.clubId==null||e.clubs[A.clubId].leagueId!==i)||A.age>d||h&&A.value>h||m&&Fa(A)<m));return M.sort((A,D)=>C==="value"?D.value-A.value:C==="age"?A.age-D.age||D.ability-A.ability:C==="potential"?D.potential-A.potential:D.ability-A.ability),M.slice(0,100)},[e.players,e.manager.clubId,e.clubs,t,r,i,d,h,m,C]);return o.jsxs("div",{children:[o.jsxs("div",{className:"p-3 space-y-2 bg-ink-850 border-b border-ink-700",children:[o.jsxs("div",{className:"relative",children:[o.jsx(QC,{size:16,className:"absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-400"}),o.jsx("input",{className:"w-full !pl-8",placeholder:"Search by name",value:t,onChange:E=>n(E.target.value)})]}),o.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[o.jsx("select",{value:r,onChange:E=>a(E.target.value),children:_M.map(([E,M])=>o.jsx("option",{value:E,children:M},E))}),o.jsxs("select",{value:i,onChange:E=>l(E.target.value),children:[o.jsx("option",{value:"",children:"All leagues"}),e.leagues.map(E=>o.jsx("option",{value:E.id,children:E.name},E.id)),o.jsx("option",{value:"free",children:"Free agents"})]}),o.jsx("select",{value:d,onChange:E=>c(+E.target.value),children:[40,30,27,25,23,21,19].map(E=>o.jsx("option",{value:E,children:E===40?"Any age":`Age ≤ ${E}`},E))}),o.jsx("select",{value:h,onChange:E=>g(+E.target.value),children:[0,5e5,2e6,5e6,1e7,2e7,4e7,8e7].map(E=>o.jsx("option",{value:E,children:E===0?"Any value":`Value ≤ ${oe(E)}`},E))}),o.jsx("select",{value:m,onChange:E=>x(+E.target.value),children:[0,2,2.5,3,3.5,4,4.5].map(E=>o.jsx("option",{value:E,children:E===0?"Any ability":`${E}+ stars`},E))}),o.jsxs("select",{value:C,onChange:E=>b(E.target.value),children:[o.jsx("option",{value:"stars",children:"Sort: ability"}),o.jsx("option",{value:"potential",children:"Sort: potential"}),o.jsx("option",{value:"value",children:"Sort: value"}),o.jsx("option",{value:"age",children:"Sort: youngest"})]})]})]}),o.jsx(zc,{w:e,players:R,empty:"No players match your search."})]})}function zc({w:e,players:t,empty:n}){const r=Qe();return t.length?o.jsx("div",{children:t.map(a=>{const i=a.clubId!=null?e.clubs[a.clubId]:null;return o.jsxs("button",{className:"row-tap w-full text-left",onClick:()=>r(`/game/player/${a.id}`),children:[o.jsx(nn,{pos:a.positions[0]}),o.jsxs("div",{className:"flex-1 min-w-0",children:[o.jsxs("div",{className:"flex items-center gap-1.5",children:[o.jsx("span",{className:"truncate font-bold",children:a.name}),o.jsx(ls,{p:a})]}),o.jsxs("div",{className:"text-[11px] text-ink-300 truncate",children:[a.age,"y · ",a.nat," · ",i?i.name:"Free agent"]})]}),o.jsxs("div",{className:"flex flex-col items-end gap-0.5",children:[o.jsx(In,{value:Fa(a),size:10}),o.jsx("span",{className:"text-xs font-bold tabular-nums",children:oe(a.value)})]}),i&&o.jsx(rt,{club:i,size:22})]},a.id)})}):o.jsx(Kc,{children:n})}function $M({w:e}){const t=Qe(),n=[...e.offers].filter(l=>l.userBuying).reverse(),r=[...e.offers].filter(l=>!l.userBuying).reverse(),a=l=>e.news.find(d=>d.offerId===l),i=l=>{const d=e.players[l.playerId];if(!d)return null;const c=l.userBuying?l.fromClub!=null?e.clubs[l.fromClub].name:"Free agent":e.clubs[l.toClub].name,h=a(l.id),g=l.userBuying&&(l.status==="accepted"||l.status==="countered")||!l.userBuying&&l.status==="pending";return o.jsxs("button",{className:"row-tap w-full text-left",onClick:()=>t(h?`/game/news/${h.id}`:`/game/player/${d.id}`),children:[o.jsx(nn,{pos:d.positions[0]}),o.jsxs("div",{className:"flex-1 min-w-0",children:[o.jsx("div",{className:"truncate font-bold",children:d.name}),o.jsxs("div",{className:"text-[11px] text-ink-300 truncate",children:[c," · ",oe(l.status==="countered"?l.counterFee??l.fee:l.fee)]})]}),o.jsx("span",{className:`chip ${g?"bg-gold text-black":l.status==="completed"?"bg-win text-black":l.status==="rejected"||l.status==="collapsed"?"bg-ink-600":"bg-ink-700"}`,children:g?"ACTION":l.status.toUpperCase()})]},l.id)};return o.jsxs("div",{children:[o.jsx("div",{className:"panel-head",children:"Your bids"}),n.length?n.map(i):o.jsx(Kc,{children:"No bids made."}),o.jsx("div",{className:"panel-head",children:"Bids for your players"}),r.length?r.map(i):o.jsx(Kc,{children:"No offers received."})]})}function UM(){const e=Ie(),t=Se(a=>a.live),n=Se(a=>a.lastMatch),r=Qe();return I.useEffect(()=>{e.pendingMatch==null&&!t&&!n&&r("/game/inbox",{replace:!0})},[e.pendingMatch,t,n,r]),t?o.jsx(HM,{eng:t}):n&&e.pendingMatch==null?o.jsx(ZM,{eng:n}):e.pendingMatch!=null?o.jsx(WM,{}):null}function WM(){const e=Ie(),t=Qe(),n=Se(x=>x.mutate),r=Se(x=>x.startLiveMatch),a=Se(x=>x.quickMatch),i=e.fixtures.find(x=>x.id===e.pendingMatch),l=e.clubs[e.manager.clubId],d=i.home===l.id?i.away:i.home,c=e.clubs[d],h=h2(e,l),g=x=>e.fixtures.filter(C=>C.played&&(C.home===x||C.away===x)).slice(-5).map(C=>Yd(C,x)),m=e.leagues.find(x=>x.id===l.leagueId);return o.jsxs("div",{className:"h-full flex flex-col safe-top",children:[o.jsxs("div",{className:"bg-ink-900 border-b border-ink-700 p-4 text-center relative",children:[o.jsx("button",{className:"btn-ghost !p-1 absolute left-2 top-2",onClick:()=>t("/game/inbox"),"aria-label":"Back",children:o.jsx(Xd,{size:22})}),o.jsxs("div",{className:"text-xs text-ink-300",children:[i.label??m.name," · ",Ur(i.date)]}),o.jsxs("div",{className:"flex items-center justify-center gap-4 mt-3",children:[o.jsx(bp,{w:e,id:i.home}),o.jsx("div",{className:"text-ink-400 font-black text-xl",children:"v"}),o.jsx(bp,{w:e,id:i.away})]}),o.jsx("div",{className:"text-xs text-ink-400 mt-2",children:i.neutral?"Wembley Stadium":e.clubs[i.home].stadium})]}),o.jsxs("div",{className:"flex-1 overflow-y-auto p-3 space-y-3",children:[o.jsxs(xe,{title:"Form guide",children:[o.jsxs("div",{className:"row",children:[o.jsx("span",{className:"flex-1 truncate",children:l.name}),o.jsx(Zi,{form:g(l.id)})]}),o.jsxs("div",{className:"row",children:[o.jsx("span",{className:"flex-1 truncate",children:c.name}),o.jsx(Zi,{form:g(c.id)})]})]}),h.length>0&&o.jsxs("div",{className:"rounded-md bg-loss/15 border border-loss/50 p-3 text-sm space-y-2",children:[o.jsx("div",{className:"font-bold",children:"Team selection problems"}),h.slice(0,4).map((x,C)=>o.jsxs("div",{children:["• ",x]},C)),o.jsx("button",{className:"btn-secondary w-full",onClick:()=>n(x=>Fc(x,x.clubs[l.id])),children:"Let the assistant fix it"})]}),o.jsx(xe,{title:`Your XI (${l.tactics.formation}, ${l.tactics.mentality})`,right:o.jsx("button",{className:"normal-case text-gold",onClick:()=>t("/game/tactics"),children:"Edit"}),children:l.tactics.lineup.map((x,C)=>{var R,E;const b=x!=null?e.players[x]:null;return b?o.jsxs("div",{className:"row text-sm",children:[o.jsx("span",{className:"w-6 text-right text-ink-400",children:b.squadNo}),o.jsx(nn,{pos:((E=(R=Ut[l.tactics.formation])==null?void 0:R[C])==null?void 0:E.pos)??b.positions[0]}),o.jsx("span",{className:"flex-1 truncate",children:b.name}),o.jsx(mr,{value:b.condition})]},C):null})})]}),o.jsxs("div",{className:"p-3 grid grid-cols-2 gap-2 bg-ink-900 border-t border-ink-700 safe-bottom",children:[o.jsxs("button",{className:"btn-secondary !py-3",onClick:()=>a(),children:[o.jsx(ZC,{size:16})," Instant result"]}),o.jsxs("button",{className:"btn-primary !py-3",onClick:()=>{h.length&&n(x=>Fc(x,x.clubs[l.id]),{save:!1}),r()},children:[o.jsx(ef,{size:16})," Play match"]})]})]})}function bp({w:e,id:t}){const n=e.clubs[t];return o.jsxs("div",{className:"flex flex-col items-center gap-1 w-28",children:[o.jsx(rt,{club:n,size:48}),o.jsx("div",{className:"font-bold text-sm leading-tight",children:n.name})]})}const JM={slow:900,normal:380,fast:120,turbo:25};function HM({eng:e}){const t=Ie(),n=Se(A=>A.finishLiveMatch),[,r]=I.useState(0),[a,i]=I.useState(!0),[l,d]=I.useState("normal"),[c,h]=I.useState("comm"),[g,m]=I.useState(0),x=e.sides[0].isUser?0:1,C=I.useRef(e.events.length);I.useEffect(()=>{if(!a||e.finished)return;const A=setInterval(()=>{const D=e.step();D.some(_=>_.type==="goal")&&m(_=>_+1),D.some(_=>_.type==="halftime"||_.type==="fulltime"||_.type==="period"&&_.text.includes("extra time"))&&i(!1),D.some(_=>_.type==="injury"&&_.side===x)&&l!=="turbo"&&i(!1),r(_=>_+1)},JM[l]);return()=>clearInterval(A)},[a,l,e,x]),I.useEffect(()=>{C.current=e.events.length});const[b,R]=e.sides,E=e.possession(),M=e.finished?"FT":e.period===1&&e.minute>45?`45+${e.minute-45}`:e.period===2&&e.minute>90?`90+${e.minute-90}`:`${e.minute}'`;return o.jsxs("div",{className:"h-full flex flex-col safe-top bg-ink-950",children:[o.jsxs("div",{className:`bg-ink-900 border-b border-ink-700 px-3 pt-3 pb-2 ${g?"goal-flash":""}`,children:[o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsxs("div",{className:"flex-1 flex items-center gap-2 min-w-0",children:[o.jsx(rt,{club:t.clubs[b.clubId],size:30}),o.jsx("span",{className:"font-bold truncate text-sm",children:b.name})]}),o.jsxs("div",{className:"text-center",children:[o.jsxs("div",{className:"text-3xl font-black tabular-nums tracking-wider",children:[b.goals,"-",R.goals]}),o.jsx("div",{className:"text-xs font-bold text-gold tabular-nums",children:M})]}),o.jsxs("div",{className:"flex-1 flex items-center gap-2 justify-end min-w-0",children:[o.jsx("span",{className:"font-bold truncate text-sm text-right",children:R.name}),o.jsx(rt,{club:t.clubs[R.clubId],size:30})]})]}),o.jsx(Ng,{eng:e}),o.jsx(VM,{eng:e}),o.jsxs("div",{className:"flex items-center justify-between mt-2 text-[11px] text-ink-300",children:[o.jsxs("span",{children:[E[0],"%"]}),o.jsx("span",{children:"possession"}),o.jsxs("span",{children:[E[1],"%"]})]})]},g),o.jsx(Wa,{value:c,onChange:h,tabs:[{value:"comm",label:"Commentary"},{value:"stats",label:"Stats"},{value:"ratings",label:"Ratings"},{value:"team",label:"My Team"}]}),o.jsxs("div",{className:"flex-1 overflow-y-auto scroll-thin",children:[c==="comm"&&o.jsx(qM,{eng:e}),c==="stats"&&o.jsx(jg,{eng:e}),c==="ratings"&&o.jsx(Tg,{eng:e,w:t}),c==="team"&&o.jsx(QM,{eng:e,side:x,onChange:()=>r(A=>A+1)})]}),o.jsx("div",{className:"bg-ink-900 border-t border-ink-700 p-2 safe-bottom",children:e.finished?o.jsx("button",{className:"btn-primary w-full !py-3",onClick:n,children:"Full time: see match report"}):o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsx("button",{className:"btn-primary !px-4 !py-2.5",onClick:()=>i(A=>!A),"aria-label":a?"Pause":"Play",children:a?o.jsx(HC,{size:18}):o.jsx(ef,{size:18})}),o.jsx("div",{className:"flex-1",children:o.jsx(Mn,{small:!0,value:l,onChange:d,options:[{value:"slow",label:"Slow"},{value:"normal",label:"Normal"},{value:"fast",label:"Fast"},{value:"turbo",label:"Turbo"}]})}),o.jsx("button",{className:"btn-secondary !px-3 !py-2.5","aria-label":"Skip to end",onClick:()=>{e.simulateToEnd(),r(A=>A+1)},children:o.jsx(BC,{size:18})})]})})]})}function Ng({eng:e}){const t=Ie(),n=e.fx.goals;if(!n.length)return null;const r=a=>n.filter(i=>i.side===a).map(i=>{var l;return`${((l=t.players[i.playerId])==null?void 0:l.short)??"?"} ${i.minute}'${i.pen?" (p)":""}`}).join(", ");return o.jsxs("div",{className:"flex justify-between gap-4 text-[11px] text-ink-300 mt-1",children:[o.jsx("span",{className:"flex-1 truncate",children:r(0)}),o.jsx("span",{className:"flex-1 truncate text-right",children:r(1)})]})}function VM({eng:e}){const[t,n]=e.sides;return o.jsxs("div",{className:"relative mt-2 h-7 rounded bg-pitch-600 border border-white/30 overflow-hidden",children:[o.jsx("div",{className:"absolute left-1/2 top-0 bottom-0 border-l border-white/40"}),o.jsx("div",{className:"absolute left-0 top-1/4 bottom-1/4 w-[8%] border border-l-0 border-white/40"}),o.jsx("div",{className:"absolute right-0 top-1/4 bottom-1/4 w-[8%] border border-r-0 border-white/40"}),o.jsx("div",{className:"absolute top-0 bottom-0 w-1 left-0",style:{background:t.colors[0]}}),o.jsx("div",{className:"absolute top-0 bottom-0 w-1 right-0",style:{background:n.colors[0]}}),o.jsx("div",{className:"absolute top-1/2 w-3 h-3 -mt-1.5 -ml-1.5 rounded-full bg-white shadow transition-all duration-300",style:{left:`${Math.max(3,Math.min(97,e.zone))}%`}})]})}function wg(e){switch(e.type){case"goal":return"text-gold font-black";case"red":return"text-loss font-bold";case"yellow":return"text-yellow-300";case"injury":return"text-orange-300 font-bold";case"halftime":case"fulltime":case"period":case"kickoff":return"text-white font-bold";case"penalty":return"text-white font-bold";case"sub":case"tactic":return"text-sky-300";case"save":case"miss":case"woodwork":case"chance":return"text-ink-100";default:return"text-ink-300"}}function qM({eng:e}){const t=e.events.slice(-80).reverse();return o.jsx("div",{className:"divide-y divide-ink-850",children:t.map((n,r)=>o.jsxs("div",{className:`flex gap-2 px-3 py-1.5 text-[13px] ${n.type==="goal"?"bg-gold/10":""}`,children:[o.jsxs("span",{className:"w-8 shrink-0 text-right text-ink-400 tabular-nums",children:[n.minute,"'"]}),n.side!==-1&&o.jsx("span",{className:"w-1 shrink-0 rounded",style:{background:e.sides[n.side].colors[0]}}),o.jsx("span",{className:wg(n),children:n.text})]},e.events.length-r))})}function jg({eng:e}){const[t,n]=e.sides,r=e.possession(),a=[["Possession",`${r[0]}%`,`${r[1]}%`],["Shots",t.shots,n.shots],["On target",t.onTarget,n.onTarget],["Expected goals",t.xg.toFixed(2),n.xg.toFixed(2)],["Corners",t.corners,n.corners],["Fouls",t.fouls,n.fouls],["Offsides",t.offsides,n.offsides],["Yellow cards",Object.values(t.yellows).reduce((i,l)=>i+Math.min(1,l),0),Object.values(n.yellows).reduce((i,l)=>i+Math.min(1,l),0)],["Red cards",t.reds.length,n.reds.length]];return o.jsxs("div",{className:"p-3",children:[o.jsxs("div",{className:"flex justify-between font-bold text-sm mb-2",children:[o.jsx("span",{children:t.short}),o.jsx("span",{children:n.short})]}),a.map(([i,l,d])=>{const c=parseFloat(String(l)),h=parseFloat(String(d)),g=c+h||1;return o.jsxs("div",{className:"mb-2.5",children:[o.jsxs("div",{className:"flex justify-between text-sm",children:[o.jsx("span",{className:"font-bold tabular-nums",children:l}),o.jsx("span",{className:"text-ink-300 text-xs",children:i}),o.jsx("span",{className:"font-bold tabular-nums",children:d})]}),o.jsxs("div",{className:"flex h-1.5 mt-1 rounded overflow-hidden bg-ink-700",children:[o.jsx("div",{style:{width:`${c/g*100}%`,background:t.colors[0]}}),o.jsx("div",{style:{width:`${h/g*100}%`,background:n.colors[0]===t.colors[0]?n.colors[1]:n.colors[0]}})]})]},i)})]})}function YM(e,t){return e.appeared.map(n=>{const r=t.players[n],a=e.onPitch.find(i=>i.id===n);return{id:n,p:r,on:a,r:e.ratings[n],off:e.left[n]!=null,g:e.goalsBy[n]??0,as:e.assistsBy[n]??0}})}function Tg({eng:e,w:t}){return o.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2",children:e.sides.map((n,r)=>o.jsxs("div",{children:[o.jsx("div",{className:"panel-head",children:n.name}),YM(n,t).map(a=>o.jsxs("div",{className:`row text-sm ${a.off?"opacity-50":""}`,children:[a.on?o.jsx(nn,{pos:a.on.pos}):o.jsx("span",{className:"chip bg-ink-700 min-w-[34px] justify-center",children:"OFF"}),o.jsxs("span",{className:"flex-1 truncate",children:[a.p.short,a.g>0&&" ⚽".repeat(a.g),n.yellows[a.id]?" 🟨":"",n.reds.includes(a.id)?" 🟥":""]}),o.jsx(mr,{value:n.cond[a.id]??100}),o.jsx(gr,{r:Math.round((a.r??6.6)*10)/10})]},a.id))]},r))})}function QM({eng:e,side:t,onChange:n}){var g;const r=Ie(),a=e.sides[t],[i,l]=I.useState(null),d=a.bench.map(m=>r.players[m]),c=i!=null?(g=a.onPitch.find(m=>m.id===i))==null?void 0:g.pos:void 0,h=I.useMemo(()=>c?[...d].sort((m,x)=>Qt(x,c)-Qt(m,c)):d,[d,c]);return o.jsxs("div",{className:"p-3 space-y-3",children:[o.jsxs(xe,{title:"Mentality",children:[o.jsx("div",{className:"p-2",children:o.jsx(Mn,{small:!0,value:a.mentality,onChange:m=>{e.setMentality(t,m),n()},options:[{value:"defensive",label:"Defend"},{value:"cautious",label:"Cautious"},{value:"balanced",label:"Balanced"},{value:"attacking",label:"Attack"},{value:"all-out",label:"All-out"}]})}),o.jsxs("div",{className:"px-2 pb-2 grid grid-cols-2 gap-2",children:[o.jsx(Mn,{small:!0,value:a.pressing,onChange:m=>{e.setInstruction(t,"pressing",m),n()},options:[{value:"low",label:"Sit"},{value:"normal",label:"Press"},{value:"high",label:"High"}]}),o.jsx(Mn,{small:!0,value:a.passing,onChange:m=>{e.setInstruction(t,"passing",m),n()},options:[{value:"short",label:"Short"},{value:"mixed",label:"Mixed"},{value:"direct",label:"Direct"}]})]}),o.jsxs("label",{className:"flex items-center gap-2 px-3 pb-3 text-sm",children:[o.jsx("input",{type:"checkbox",className:"w-5 h-5",checked:a.autoSubs,onChange:m=>{a.autoSubs=m.target.checked,n()}}),"Let my assistant make substitutions"]})]}),o.jsxs(xe,{title:`On the pitch · subs used ${a.subsMade}/5`,children:[a.onPitch.map(m=>{const x=r.players[m.id];return o.jsxs("button",{className:"row-tap w-full text-left",onClick:()=>l(m.id),disabled:a.subsMade>=5||e.finished,children:[o.jsx(nn,{pos:m.pos}),o.jsxs("span",{className:"flex-1 truncate",children:[x.short,a.yellows[m.id]?" 🟨":"",a.injured.includes(m.id)?" 🚑":""]}),o.jsx(mr,{value:a.cond[m.id]??100}),o.jsx(gr,{r:Math.round((a.ratings[m.id]??6.6)*10)/10})]},m.id)}),o.jsxs("div",{className:"px-3 py-2 text-[11px] text-ink-400 flex items-center gap-1",children:[o.jsx(dg,{size:12})," Tap a player to substitute him."]})]}),o.jsxs(Ua,{open:i!=null,onClose:()=>l(null),title:i!=null?`Replace ${r.players[i].short}`:"",children:[h.length===0&&o.jsx("div",{className:"p-4 text-ink-300 text-sm",children:"No substitutes left on the bench."}),h.map(m=>o.jsxs("button",{className:"row-tap w-full text-left",onClick:()=>{i!=null&&e.substitute(t,i,m.id),l(null),n()},children:[o.jsx(nn,{pos:m.positions[0]}),o.jsx("span",{className:"flex-1 truncate",children:m.name}),o.jsx(mr,{value:m.condition}),c&&o.jsx("span",{className:"w-8 text-right font-bold text-sm",children:Math.round(Qt(m,c))})]},m.id))]})]})}function ZM({eng:e}){var x;const t=Ie(),n=Qe(),r=Se(C=>C.clearLastMatch),[a,i]=e.sides,l=e.motm(),d=e.fx,c=t.fixtures.filter(C=>C.date===d.date&&C.id!==d.id&&C.comp===d.comp&&C.played),[h,g]=I.useState("report"),m=()=>{r(),n("/game/inbox",{replace:!0})};return o.jsxs("div",{className:"h-full flex flex-col safe-top",children:[o.jsxs("div",{className:"bg-ink-900 border-b border-ink-700 p-4",children:[o.jsxs("div",{className:"text-center text-xs text-ink-300 font-bold uppercase",children:["Full time",d.aet?" (aet)":""]}),o.jsxs("div",{className:"flex items-center gap-2 mt-2",children:[o.jsxs("div",{className:"flex-1 flex flex-col items-center gap-1 min-w-0",children:[o.jsx(rt,{club:t.clubs[a.clubId],size:40}),o.jsx("span",{className:"font-bold text-sm text-center truncate max-w-full",children:a.name})]}),o.jsxs("div",{className:"text-4xl font-black tabular-nums",children:[a.goals,"-",i.goals]}),o.jsxs("div",{className:"flex-1 flex flex-col items-center gap-1 min-w-0",children:[o.jsx(rt,{club:t.clubs[i.clubId],size:40}),o.jsx("span",{className:"font-bold text-sm text-center truncate max-w-full",children:i.name})]})]}),e.pens&&o.jsxs("div",{className:"text-center text-sm text-gold mt-1",children:["Penalties ",e.pens[0],"-",e.pens[1]]}),o.jsx(Ng,{eng:e})]}),o.jsx(Wa,{value:h,onChange:g,tabs:[{value:"report",label:"Report"},{value:"stats",label:"Stats"},{value:"ratings",label:"Ratings"},{value:"results",label:"Other results"}]}),o.jsxs("div",{className:"flex-1 overflow-y-auto scroll-thin",children:[h==="report"&&o.jsxs("div",{className:"p-3 space-y-3",children:[l&&o.jsx(xe,{title:"Man of the match",children:o.jsxs("div",{className:"row",children:[o.jsxs("span",{className:"flex-1 font-bold",children:[(x=t.players[l.id])==null?void 0:x.name," ",o.jsxs("span",{className:"text-ink-300 font-normal",children:["(",e.sides[l.side].short,")"]})]}),o.jsx(gr,{r:e.sides[l.side].ratings[l.id]})]})}),o.jsx(xe,{title:"Key moments",children:e.events.filter(C=>["goal","red","injury","penalty","sub","halftime","fulltime"].includes(C.type)).map((C,b)=>o.jsxs("div",{className:"flex gap-2 px-3 py-1.5 text-[13px] border-b border-ink-800",children:[o.jsxs("span",{className:"w-8 text-right text-ink-400",children:[C.minute,"'"]}),o.jsx("span",{className:wg(C),children:C.text})]},b))}),d.attendance&&o.jsxs("div",{className:"text-center text-xs text-ink-400",children:["Attendance: ",d.attendance.toLocaleString()]})]}),h==="stats"&&o.jsx(jg,{eng:e}),h==="ratings"&&o.jsx(Tg,{eng:e,w:t}),h==="results"&&o.jsxs("div",{children:[c.length===0&&o.jsx("div",{className:"p-4 text-sm text-ink-300",children:"No other matches in this competition today."}),c.map(C=>o.jsxs("div",{className:"flex items-center gap-2 px-3 py-2 border-b border-ink-800 text-sm",children:[o.jsx("span",{className:"flex-1 text-right truncate",children:t.clubs[C.home].name}),o.jsxs("span",{className:"w-12 text-center font-bold bg-ink-700 rounded",children:[C.hg,"-",C.ag]}),o.jsx("span",{className:"flex-1 truncate",children:t.clubs[C.away].name})]},C.id))]})]}),o.jsx("div",{className:"p-3 bg-ink-900 border-t border-ink-700 safe-bottom",children:o.jsx("button",{className:"btn-primary w-full !py-3",onClick:m,children:"Continue"})})]})}function XM(){return o.jsxs(_d,{children:[o.jsx(Te,{index:!0,element:o.jsx(eb,{})}),o.jsx(Te,{path:"finances",element:o.jsx(tb,{})}),o.jsx(Te,{path:"training",element:o.jsx(rb,{})}),o.jsx(Te,{path:"manager",element:o.jsx(ab,{})}),o.jsx(Te,{path:"history",element:o.jsx(ib,{})})]})}function eb(){const e=Ie(),t=Qe(),n=Se(d=>d.save),r=Se(d=>d.quit),a=Se(d=>d.showToast),i=e.clubs[e.manager.clubId],l=(d,c,h,g)=>o.jsxs("button",{className:"row-tap w-full text-left !py-3",onClick:()=>t(h),children:[d,o.jsxs("div",{className:"flex-1",children:[o.jsx("div",{className:"font-bold",children:c}),g&&o.jsx("div",{className:"text-xs text-ink-300",children:g})]}),o.jsx(os,{size:18,className:"text-ink-400"})]});return o.jsxs("div",{className:"p-3 space-y-3",children:[o.jsxs(xe,{children:[l(o.jsx(TC,{size:20}),i.name,`/game/club/${i.id}`,`${i.stadium} · ${i.capacity.toLocaleString()} seats`),l(o.jsx(wC,{size:20}),"Finances","/game/more/finances",`Balance ${oe(i.finances.balance)}`),l(o.jsx(GC,{size:20}),"Training","/game/more/training",`Focus: ${i.training}`),l(o.jsx(tM,{size:20}),"Manager & Board","/game/more/manager",`Board: ${Zd(i.boardConfidence)}`),l(o.jsx(VC,{size:20}),"History","/game/more/history",`${e.history.length} completed season${e.history.length===1?"":"s"}`)]}),o.jsxs(xe,{children:[o.jsxs("button",{className:"row-tap w-full text-left !py-3",onClick:async()=>{await n(),a("Game saved")},children:[o.jsx(YC,{size:20}),o.jsx("span",{className:"flex-1 font-bold",children:"Save game"})]}),o.jsxs("button",{className:"row-tap w-full text-left !py-3",onClick:async()=>{await n(),r(),t("/",{replace:!0})},children:[o.jsx(UC,{size:20}),o.jsx("span",{className:"flex-1 font-bold",children:"Save & exit to main menu"})]})]}),o.jsx("p",{className:"text-[11px] text-ink-400 text-center px-4",children:"The game autosaves after every Continue and every match."})]})}function tb(){const e=Ie(),t=e.clubs[e.manager.clubId],n=t.finances,r=za(e,t),a=n.seasonIncome,i=n.seasonExpense,l=a.gate+a.tv+a.commercial+a.transfers+a.prize,d=i.wages+i.transfers+i.other,c=(h,g,m=!1)=>o.jsxs("div",{className:"row text-sm",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:h}),o.jsx("b",{className:m?"text-loss":"",children:oe(g)})]});return o.jsxs("div",{className:"pb-6",children:[o.jsx(ut,{title:"Finances",sub:Xt(e.season)}),o.jsxs("div",{className:"p-3 space-y-3",children:[o.jsxs(xe,{children:[o.jsxs("div",{className:"flex divide-x divide-ink-700",children:[o.jsx(fn,{label:"Balance",value:o.jsx("span",{className:n.balance<0?"text-loss":"",children:oe(n.balance)})}),o.jsx(fn,{label:"Transfer budget",value:oe(n.transferBudget)})]}),o.jsxs("div",{className:"flex divide-x divide-ink-700 border-t border-ink-700",children:[o.jsx(fn,{label:"Wage bill",value:`${oe(r)}/wk`}),o.jsx(fn,{label:"Wage budget",value:`${oe(n.wageBudget)}/wk`,sub:r>n.wageBudget?"Over budget!":`${oe(n.wageBudget-r)} spare`})]})]}),o.jsxs(xe,{title:"Income this season",children:[c("Gate receipts",a.gate),c("TV money",a.tv),c("Commercial & sponsorship",a.commercial),c("Prize money",a.prize),c("Player sales",a.transfers),c("Total",l)]}),o.jsxs(xe,{title:"Expenditure this season",children:[c("Wages",i.wages,!0),c("Transfer fees",i.transfers,!0),c("Other (pay-offs etc.)",i.other,!0),c("Total",d,!0)]}),o.jsx("p",{className:"text-[11px] text-ink-400 px-1",children:`Sales add ${Math.round(.8*100)}% of the fee to your transfer budget. Budgets are reset by the board at the start of each season.`})]})]})}const nb=[{value:"balanced",label:"Balanced",desc:"All-round development."},{value:"technical",label:"Technical",desc:"Slightly faster development of young players."},{value:"physical",label:"Physical",desc:"Harder sessions: slower recovery between games."},{value:"attacking",label:"Attacking",desc:"Work on movement and finishing patterns."},{value:"defending",label:"Defending",desc:"Work on shape and concentration."},{value:"rest",label:"Light / recovery",desc:"Faster recovery of condition, slower development."}];function rb(){const e=Ie(),t=Se(r=>r.mutate),n=e.clubs[e.manager.clubId];return o.jsxs("div",{children:[o.jsx(ut,{title:"Training",sub:`Facilities ${n.facilities}/20 · Youth ${n.youthRating}/20`}),o.jsx("div",{className:"p-3",children:o.jsx(xe,{title:"Team focus",children:nb.map(r=>o.jsxs("button",{className:"row-tap w-full text-left",onClick:()=>t(a=>a.clubs[n.id].training=r.value),children:[o.jsx("span",{className:`w-4 h-4 rounded-full border-2 ${n.training===r.value?"bg-gold border-gold":"border-ink-400"}`}),o.jsxs("div",{className:"flex-1",children:[o.jsx("div",{className:"font-bold",children:r.label}),o.jsx("div",{className:"text-xs text-ink-300",children:r.desc})]})]},r.value))})})]})}function ab(){var a,i;const e=Ie(),t=e.manager,n=e.clubs[t.clubId],r=t.wins+t.draws+t.losses;return o.jsxs("div",{children:[o.jsx(ut,{title:t.name,sub:`${Qi[t.nat]??t.nat} · Manager of ${n.name}`}),o.jsxs("div",{className:"p-3 space-y-3",children:[o.jsx(xe,{title:"Board",children:o.jsxs("div",{className:"p-3",children:[o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsx("span",{className:"font-bold",children:Zd(n.boardConfidence)}),o.jsxs("span",{className:"text-ink-300 text-sm",children:[Math.round(n.boardConfidence),"%"]})]}),o.jsx("div",{className:"h-2 rounded-full bg-ink-700 mt-2 overflow-hidden",children:o.jsx("div",{className:`h-full ${n.boardConfidence>=55?"bg-win":n.boardConfidence>=30?"bg-yellow-400":"bg-loss"}`,style:{width:`${n.boardConfidence}%`}})}),o.jsxs("div",{className:"text-sm text-ink-200 mt-3",children:["Target: ",o.jsx("b",{children:(a=t.target)==null?void 0:a.text})," (",Cl(((i=t.target)==null?void 0:i.pos)??0)," or better)"]})]})}),o.jsxs(xe,{title:"Record",children:[o.jsxs("div",{className:"flex divide-x divide-ink-700",children:[o.jsx(fn,{label:"Games",value:r}),o.jsx(fn,{label:"Won",value:t.wins}),o.jsx(fn,{label:"Drawn",value:t.draws}),o.jsx(fn,{label:"Lost",value:t.losses})]}),o.jsxs("div",{className:"px-3 py-2 border-t border-ink-700 text-sm text-ink-300",children:["Win rate ",r?Math.round(t.wins/r*100):0,"%"]})]}),o.jsxs(xe,{title:"Honours",children:[t.trophies.length===0&&o.jsx("div",{className:"p-3 text-sm text-ink-300",children:"No trophies yet."}),t.trophies.map((l,d)=>o.jsxs("div",{className:"row text-sm",children:["🏆 ",l]},d))]}),o.jsx(xe,{title:"Club reputation",children:o.jsxs("div",{className:"p-3 flex items-center gap-3",children:[o.jsx(rt,{club:n}),o.jsx(In,{value:xl(n.reputation)})]})})]})]})}function ib(){const e=Ie();return o.jsxs("div",{children:[o.jsx(ut,{title:"History"}),o.jsxs("div",{className:"p-3 space-y-3",children:[e.history.length===0&&o.jsx("div",{className:"text-sm text-ink-300 p-3",children:"Complete a season to build your history."}),[...e.history].reverse().map(t=>{var n;return o.jsxs(xe,{title:Xt(t.season),children:[o.jsxs("div",{className:"row text-sm",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:"Your finish"}),o.jsxs("b",{children:[Cl(t.userPos)," · ",(n=e.clubs[t.userClub])==null?void 0:n.name]})]}),e.leagues.map(r=>{var a;return t.champions[r.id]!=null?o.jsxs("div",{className:"row text-sm",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:r.name}),o.jsx("b",{children:(a=e.clubs[t.champions[r.id]])==null?void 0:a.name})]},r.id):null}),t.promoted.length>0&&o.jsxs("div",{className:"row text-sm",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:"Promoted"}),o.jsx("span",{className:"text-right",children:t.promoted.map(r=>{var a;return(a=e.clubs[r])==null?void 0:a.short}).join(", ")})]}),t.relegated.length>0&&o.jsxs("div",{className:"row text-sm",children:[o.jsx("span",{className:"flex-1 text-ink-300",children:"Relegated"}),o.jsx("span",{className:"text-right",children:t.relegated.map(r=>{var a;return(a=e.clubs[r])==null?void 0:a.short}).join(", ")})]})]},t.season)})]})]})}const sb=["GK","DR","DC","DL","WBR","WBL","DM","MR","MC","ML","AMR","AMC","AML","ST"];function Lg(e){const t=e.potential&&e.potential>e.ability?`${e.ability}/${e.potential}`:`${e.ability}`,n=e.traits.length?`|${e.traits.join(",")}`:"";return`${e.name.replace(/\|/g,"")}|${e.positions.join("/")}|${e.age}|${e.nat}|${t}${n}`}function Ap(e){const t=[],n=[];for(const r of e.players.split(`
`)){const a=r.trim();if(a)try{const i=Hd(a);t.push({...i,traits:i.traits??[]})}catch{n.push(a)}}return{players:t,bad:n}}function Sp(e,t=[]){return`
`+[...e.map(Lg),...t].join(`
`)+`
`}function ob(){const[e,t]=I.useState(null),[n,r]=I.useState(!1),a=I.useRef(null);I.useEffect(()=>{Eg().then(({db:c,custom:h})=>{t(ro(c)),r(h)})},[]);const i=I.useCallback(c=>{t(h=>{if(!h)return h;const g=ro(h);return c(g),g.name.includes("(edited)")||(g.name=`${g.name} (edited)`),a.current&&clearTimeout(a.current),a.current=setTimeout(()=>void wu(g),400),g}),r(!0)},[]),l=I.useCallback(async()=>{await wu(null),t(ro(Rg)),r(!1)},[]),d=I.useCallback(async c=>{await wu(c),t(ro(c)),r(!0)},[]);return{db:e,custom:n,update:i,reset:l,replace:d}}function lb(){const e=ob();return e.db?o.jsx("div",{className:"min-h-full safe-top",children:o.jsxs(_d,{children:[o.jsx(Te,{index:!0,element:o.jsx(ub,{...e,db:e.db})}),o.jsx(Te,{path:":league",element:o.jsx(cb,{db:e.db})}),o.jsx(Te,{path:":league/:club",element:o.jsx(db,{db:e.db,update:e.update})})]})}):o.jsx(ut,{title:"Database Editor",sub:"Loading…"})}function ub({db:e,custom:t,reset:n,replace:r}){const a=Qe(),i=I.useRef(null),[l,d]=I.useState(null),[c,h]=I.useState(!1),g=I.useMemo(()=>dp(e),[e]),m=e.leagues.reduce((b,R)=>b+R.clubs.reduce((E,M)=>E+M.players.split(`
`).filter(A=>A.trim()).length,0),0),x=()=>{const b=new Blob([JSON.stringify(e,null,1)],{type:"application/json"}),R=document.createElement("a");R.href=URL.createObjectURL(b),R.download=`gaffer05-database-${new Date().toISOString().slice(0,10)}.json`,R.click(),setTimeout(()=>URL.revokeObjectURL(R.href),2e3)},C=async b=>{try{const R=JSON.parse(await b.text());if(!Array.isArray(R.leagues)||!R.leagues.length||typeof R.season!="number")throw new Error("Not a Gaffer database file");for(const M of R.leagues)if(!M.id||!Array.isArray(M.clubs))throw new Error("Malformed league");await r(R);const E=dp(R);d(`Imported "${R.name}"${E.length?` with ${E.length} invalid player lines (they will be skipped)`:""}.`)}catch(R){d(`Import failed: ${R.message}`)}};return o.jsxs("div",{className:"pb-8",children:[o.jsx(ut,{title:"Database Editor",sub:`${e.name} · ${m.toLocaleString()} players`}),o.jsxs("div",{className:"p-3 space-y-3",children:[o.jsx("p",{className:"text-sm text-ink-300",children:"Edit clubs and players before starting a new game. Changes are saved on this device and used for every new game. Existing saves are not affected."}),o.jsxs("div",{className:"grid grid-cols-3 gap-2",children:[o.jsxs("button",{className:"btn-secondary !py-2.5 text-xs",onClick:x,children:[o.jsx(FC,{size:16})," Export"]}),o.jsxs("button",{className:"btn-secondary !py-2.5 text-xs",onClick:()=>{var b;return(b=i.current)==null?void 0:b.click()},children:[o.jsx(eM,{size:16})," Import"]}),c?o.jsx("button",{className:"btn-danger !py-2.5 text-xs",onClick:async()=>{await n(),h(!1),d("Restored the bundled 2025/26 database.")},children:"Confirm"}):o.jsxs("button",{className:"btn-secondary !py-2.5 text-xs",onClick:()=>h(!0),disabled:!t,children:[o.jsx(qC,{size:16})," Reset"]})]}),o.jsx("input",{ref:i,type:"file",accept:"application/json,.json",className:"hidden",onChange:b=>{var E;const R=(E=b.target.files)==null?void 0:E[0];R&&C(R),b.target.value=""}}),l&&o.jsx("div",{className:"text-sm text-gold",children:l}),g.length>0&&o.jsx(xe,{title:`${g.length} problems`,children:g.slice(0,10).map((b,R)=>o.jsxs("div",{className:"row text-xs",children:[o.jsx("span",{className:"flex-1 truncate",children:b.line}),o.jsx("span",{className:"text-loss",children:b.error})]},R))}),o.jsx(xe,{title:"Leagues",children:e.leagues.map(b=>o.jsxs("button",{className:"row-tap w-full text-left !py-3",onClick:()=>a(`/editor/${b.id}`),children:[o.jsxs("div",{className:"flex-1",children:[o.jsx("div",{className:"font-bold",children:b.name}),o.jsxs("div",{className:"text-xs text-ink-300",children:[b.clubs.length," clubs"]})]}),o.jsx(os,{size:18,className:"text-ink-400"})]},b.id))})]})]})}function cb({db:e}){const{league:t}=as(),n=Qe(),r=e.leagues.find(a=>a.id===t);return r?o.jsxs("div",{children:[o.jsx(ut,{title:r.name,sub:`${r.clubs.length} clubs`}),r.clubs.map((a,i)=>o.jsxs("button",{className:"row-tap w-full text-left",onClick:()=>n(`/editor/${r.id}/${i}`),children:[o.jsx(rt,{club:{colors:a.colors,short:a.short},size:30}),o.jsxs("div",{className:"flex-1 min-w-0",children:[o.jsx("div",{className:"font-bold truncate",children:a.name}),o.jsxs("div",{className:"text-xs text-ink-300",children:[a.players.split(`
`).filter(l=>l.trim()).length," players · rep ",a.rep]})]}),o.jsx(os,{size:18,className:"text-ink-400"})]},i))]}):o.jsx(ut,{title:"League not found"})}function db({db:e,update:t}){var x;const{league:n,club:r}=as(),a=e.leagues.findIndex(C=>C.id===n),i=Number(r),l=(x=e.leagues[a])==null?void 0:x.clubs[i],d=I.useMemo(()=>l?Ap(l):{players:[],bad:[]},[l]),[c,h]=I.useState(null);if(!l)return o.jsx(ut,{title:"Club not found"});const g=C=>t(b=>C(b.leagues[a].clubs[i])),m=C=>g(b=>b.players=Sp(C,d.bad));return o.jsxs("div",{className:"pb-8",children:[o.jsx(ut,{title:l.name,sub:e.leagues[a].name}),o.jsxs("div",{className:"p-3 space-y-3",children:[o.jsx(xe,{title:"Club",children:o.jsxs("div",{className:"p-3 grid grid-cols-2 gap-2",children:[o.jsx(St,{label:"Name",span:!0,children:o.jsx("input",{className:"w-full",value:l.name,onChange:C=>g(b=>b.name=C.target.value)})}),o.jsx(St,{label:"Short name",children:o.jsx("input",{className:"w-full",maxLength:4,value:l.short,onChange:C=>g(b=>b.short=C.target.value.toUpperCase())})}),o.jsx(St,{label:"Reputation (1-100)",children:o.jsx("input",{className:"w-full",type:"number",min:1,max:100,value:l.rep,onChange:C=>g(b=>b.rep=Co(+C.target.value,1,100))})}),o.jsx(St,{label:"Stadium",span:!0,children:o.jsx("input",{className:"w-full",value:l.stadium,onChange:C=>g(b=>b.stadium=C.target.value)})}),o.jsx(St,{label:"Capacity",children:o.jsx("input",{className:"w-full",type:"number",value:l.capacity,onChange:C=>g(b=>b.capacity=Co(+C.target.value,1e3,12e4))})}),o.jsx(St,{label:"Bank (£m)",children:o.jsx("input",{className:"w-full",type:"number",value:l.money,onChange:C=>g(b=>b.money=Co(+C.target.value,-500,5e3))})}),o.jsx(St,{label:"Colours",children:o.jsxs("div",{className:"flex gap-2",children:[o.jsx("input",{type:"color",className:"h-9 w-full !p-0.5",value:l.colors[0],onChange:C=>g(b=>b.colors=[C.target.value,b.colors[1]])}),o.jsx("input",{type:"color",className:"h-9 w-full !p-0.5",value:l.colors[1],onChange:C=>g(b=>b.colors=[b.colors[0],C.target.value])})]})})]})}),o.jsxs(xe,{title:`Players (${d.players.length})`,right:o.jsxs("button",{className:"normal-case text-gold flex items-center gap-1",onClick:()=>h("new"),children:[o.jsx(tf,{size:14})," Add"]}),children:[d.players.map((C,b)=>o.jsxs("button",{className:"row-tap w-full text-left",onClick:()=>h(b),children:[o.jsx(nn,{pos:C.positions[0]}),o.jsxs("div",{className:"flex-1 min-w-0",children:[o.jsx("div",{className:"truncate",children:C.name}),o.jsxs("div",{className:"text-[11px] text-ink-300",children:[C.age,"y · ",C.nat," · ",C.positions.join("/"),C.traits.length?` · ${C.traits.join(", ")}`:""]})]}),o.jsxs("span",{className:"text-sm font-bold tabular-nums",children:[C.ability,C.potential?o.jsxs("span",{className:"text-ink-400",children:["/",C.potential]}):null]})]},b)),d.bad.length>0&&o.jsxs("div",{className:"px-3 py-2 text-xs text-loss",children:[d.bad.length," invalid lines kept as-is."]})]})]}),c!=null&&o.jsx(fb,{db:e,initial:c==="new"?{name:"",positions:["MC"],age:22,nat:"ENG",ability:65,traits:[]}:d.players[c],onClose:()=>h(null),onSave:(C,b)=>{if(b&&c!=="new")t(R=>{const E=R.leagues[a].clubs[i],M=Ap(E);M.players.splice(c,1),E.players=Sp(M.players,M.bad);const[A,D]=b.split(":"),_=R.leagues.find(z=>z.id===A).clubs[+D];_.players=_.players.replace(/\s*$/,"")+`
`+Lg(C)+`
`});else{const R=[...d.players];c==="new"?R.push(C):R[c]=C,m(R)}h(null)},onDelete:c==="new"?void 0:()=>{const C=d.players.filter((b,R)=>R!==c);m(C),h(null)}})]})}function St({label:e,children:t,span:n}){return o.jsxs("label",{className:`block ${n?"col-span-2":""}`,children:[o.jsx("span",{className:"text-[11px] uppercase font-bold text-ink-300",children:e}),o.jsx("div",{className:"mt-0.5",children:t})]})}const Co=(e,t,n)=>Number.isFinite(e)?Math.max(t,Math.min(n,Math.round(e))):t;function fb({db:e,initial:t,onClose:n,onSave:r,onDelete:a}){const[i,l]=I.useState({...t,positions:[...t.positions],traits:[...t.traits]}),[d,c]=I.useState(""),[h,g]=I.useState(!1),m=I.useMemo(()=>Object.entries(Qi).sort((b,R)=>b[1].localeCompare(R[1])),[]),x=b=>l(R=>{const M=R.positions.includes(b)?R.positions.filter(A=>A!==b):[...R.positions,b];return{...R,positions:M.length?M:R.positions}}),C=i.name.trim().length>1&&i.positions.length>0;return o.jsx(Ua,{open:!0,onClose:n,title:t.name||"New player",children:o.jsxs("div",{className:"p-4 space-y-3",children:[o.jsx(St,{label:"Name",children:o.jsx("input",{className:"w-full",value:i.name,onChange:b=>l({...i,name:b.target.value})})}),o.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[o.jsx(St,{label:"Age",children:o.jsx("input",{className:"w-full",type:"number",value:i.age,onChange:b=>l({...i,age:Co(+b.target.value,15,45)})})}),o.jsx(St,{label:"Nationality",children:o.jsxs("select",{className:"w-full",value:i.nat,onChange:b=>l({...i,nat:b.target.value}),children:[!Qi[i.nat]&&o.jsx("option",{value:i.nat,children:i.nat}),m.map(([b,R])=>o.jsx("option",{value:b,children:R},b))]})})]}),o.jsx(St,{label:"Positions (first selected is natural position)",children:o.jsx("div",{className:"flex flex-wrap gap-1.5",children:sb.map(b=>{const R=i.positions.indexOf(b);return o.jsx("button",{type:"button",onClick:()=>x(b),className:`chip !px-2 !leading-7 ${R>=0?R===0?"bg-gold text-black":"bg-ink-400 text-black":"bg-ink-700 text-ink-300"}`,children:b},b)})})}),o.jsx(St,{label:`Ability: ${i.ability}`,children:o.jsx("input",{className:"w-full !p-0 !border-0",type:"range",min:30,max:99,value:i.ability,onChange:b=>l({...i,ability:+b.target.value,potential:i.potential&&i.potential<+b.target.value?+b.target.value:i.potential})})}),o.jsx(St,{label:`Potential: ${i.potential??"auto (from age)"}`,children:o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsx("input",{className:"flex-1 !p-0 !border-0",type:"range",min:i.ability,max:99,value:i.potential??i.ability,onChange:b=>l({...i,potential:+b.target.value})}),o.jsx("button",{type:"button",className:"btn-ghost text-xs",onClick:()=>l({...i,potential:void 0}),children:"Auto"})]})}),o.jsx(St,{label:"Style traits",children:o.jsx("div",{className:"flex flex-wrap gap-1.5",children:Object.keys($d).map(b=>{const R=i.traits.includes(b);return o.jsx("button",{type:"button",onClick:()=>l({...i,traits:R?i.traits.filter(E=>E!==b):[...i.traits,b]}),className:`chip !px-2 !leading-7 ${R?"bg-sky-600 text-white":"bg-ink-700 text-ink-300"}`,children:b},b)})})}),a&&o.jsx(St,{label:"Move to another club",children:o.jsxs("select",{className:"w-full",value:d,onChange:b=>c(b.target.value),children:[o.jsx("option",{value:"",children:"Keep at this club"}),e.leagues.map(b=>o.jsx("optgroup",{label:b.name,children:b.clubs.map((R,E)=>o.jsx("option",{value:`${b.id}:${E}`,children:R.name},E))},b.id))]})}),o.jsxs("div",{className:"flex gap-2 pt-2",children:[a&&(h?o.jsx("button",{className:"btn-danger",onClick:a,children:"Delete?"}):o.jsx("button",{className:"btn-secondary",onClick:()=>g(!0),"aria-label":"Delete player",children:o.jsx(gg,{size:16})})),o.jsx("button",{className:"btn-primary flex-1 !py-3",disabled:!C,onClick:()=>r({...i,name:i.name.trim()},d||void 0),children:"Save player"})]})]})})}function hb(){const e=Ie(),t=Se(i=>i.mutate),n=Se(i=>i.quit),r=Qe(),a=e.manager.jobOffers??[];return e.manager.sacked?o.jsxs("div",{className:"p-4 space-y-4",children:[o.jsxs("div",{className:"text-center pt-6",children:[o.jsx("div",{className:"text-5xl",children:"📰"}),o.jsx("h1",{className:"text-2xl font-black mt-2",children:"You're fired!"}),o.jsxs("p",{className:"text-ink-300 text-sm mt-1",children:["The board of ",e.clubs[e.manager.clubId].name," have relieved you of your duties."]})]}),a.length>0?o.jsx(xe,{title:"Job offers",children:a.map(i=>{const l=e.clubs[i],d=e.leagues.find(c=>c.id===l.leagueId);return o.jsxs("button",{className:"row-tap w-full text-left !py-3",onClick:()=>{t(c=>Qx(c,i)),r("/game/inbox",{replace:!0})},children:[o.jsx(rt,{club:l,size:34}),o.jsxs("div",{className:"flex-1",children:[o.jsx("div",{className:"font-bold",children:l.name}),o.jsx("div",{className:"text-xs text-ink-300",children:d.name})]}),o.jsx(In,{value:xl(l.reputation),size:12})]},i)})}):o.jsx("div",{className:"text-center text-ink-300 text-sm",children:"No clubs are interested right now."}),o.jsx("button",{className:"btn-secondary w-full !py-3",onClick:()=>{n(),r("/",{replace:!0})},children:"Retire to the main menu"})]}):o.jsx(Mi,{to:"/game/inbox",replace:!0})}function pb(){const e=Se(t=>t.toast);return e?o.jsx("div",{className:"fixed left-0 right-0 bottom-24 z-[60] flex justify-center px-4 pointer-events-none",children:o.jsx("div",{className:"max-w-md bg-ink-100 text-ink-950 font-bold text-sm rounded-lg px-4 py-2.5 shadow-xl animate-fade",children:e})}):null}function mb(){const e=Se(t=>t.world!=null);return o.jsxs(o.Fragment,{children:[o.jsxs(_d,{children:[o.jsx(Te,{path:"/",element:o.jsx(oM,{})}),o.jsx(Te,{path:"/new",element:o.jsx(pM,{})}),o.jsx(Te,{path:"/editor/*",element:o.jsx(lb,{})}),o.jsxs(Te,{path:"/game",element:e?o.jsx(mM,{}):o.jsx(Mi,{to:"/",replace:!0}),children:[o.jsx(Te,{index:!0,element:o.jsx(Mi,{to:"inbox",replace:!0})}),o.jsx(Te,{path:"inbox",element:o.jsx(yM,{})}),o.jsx(Te,{path:"news/:id",element:o.jsx(vM,{})}),o.jsx(Te,{path:"squad",element:o.jsx(CM,{})}),o.jsx(Te,{path:"player/:id",element:o.jsx(bM,{})}),o.jsx(Te,{path:"tactics",element:o.jsx(wM,{})}),o.jsx(Te,{path:"comps",element:o.jsx(LM,{})}),o.jsx(Te,{path:"club/:id",element:o.jsx(OM,{})}),o.jsx(Te,{path:"transfers",element:o.jsx(KM,{})}),o.jsx(Te,{path:"more/*",element:o.jsx(XM,{})}),o.jsx(Te,{path:"sacked",element:o.jsx(hb,{})})]}),o.jsx(Te,{path:"/match",element:e?o.jsx(UM,{}):o.jsx(Mi,{to:"/",replace:!0})}),o.jsx(Te,{path:"*",element:o.jsx(Mi,{to:"/",replace:!0})})]}),o.jsx(pb,{})]})}Lu.createRoot(document.getElementById("root")).render(o.jsx(oa.StrictMode,{children:o.jsx(I7,{children:o.jsx(mb,{})})}));var kp;(kp=navigator.storage)!=null&&kp.persist&&navigator.storage.persist();
