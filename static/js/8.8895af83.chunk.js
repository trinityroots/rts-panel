(this["webpackJsonprts-panel"]=this["webpackJsonprts-panel"]||[]).push([[8],{252:function(e,t,n){"use strict";var r=n(20),a=n(0),o=n(280),c=n(272),i=n(1),s=Object(a.forwardRef)((function(e,t){var n,a,s,u,l=e.children,d=e.type,b=e.direction,j=e.offset,f=e.scale;switch(b){case"up":case"left":s=j,u=0;break;default:s=0,u=j}var m=Object(o.a)(s,u),h=Object(r.a)(m,2),p=h[0],O=h[1],v=Object(o.a)(s,u),x=Object(r.a)(v,2),g=x[0],y=x[1];switch(d){case"rotate":return Object(i.jsx)(c.a.div,{ref:t,animate:{rotate:360},transition:{repeat:1/0,repeatType:"loop",duration:2,repeatDelay:0},children:l});case"slide":return"up"===b||"down"===b?Object(i.jsx)(c.a.div,{ref:t,animate:{y:void 0!==g?g:""},onHoverEnd:function(){return y()},onHoverStart:function(){return y()},children:l}):Object(i.jsx)(c.a.div,{ref:t,animate:{x:void 0!==p?p:""},onHoverEnd:function(){return O()},onHoverStart:function(){return O()},children:l});default:return"number"===typeof f&&(f={hover:f,tap:f}),Object(i.jsx)(c.a.div,{ref:t,whileHover:{scale:null===(n=f)||void 0===n?void 0:n.hover},whileTap:{scale:null===(a=f)||void 0===a?void 0:a.tap},children:l})}}));s.defaultProps={type:"scale",offset:10,direction:"right",scale:{hover:1,tap:.9}},t.a=s},257:function(e,t,n){"use strict";var r=n(20),a=n(9),o=n(8),c=n(3),i=n(0),s=(n(16),n(11)),u=n(180),l=n(12),d=n(94),b=n(14),j=n(10),f=n(15),m=n(80),h=n(22),p=n(189),O=n(136),v=n(181);function x(e){return Object(O.a)("MuiLink",e)}var g=Object(v.a)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),y=n(1),w=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant"],A={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},S=Object(j.a)(p.a,{name:"MuiLink",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["underline".concat(Object(b.a)(n.underline))],"button"===n.component&&t.button]}})((function(e){var t=e.theme,n=e.ownerState,r=Object(l.b)(t,"palette.".concat(function(e){return A[e]||e}(n.color)))||n.color;return Object(c.a)({},"none"===n.underline&&{textDecoration:"none"},"hover"===n.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===n.underline&&{textDecoration:"underline",textDecorationColor:"inherit"!==r?Object(d.a)(r,.4):void 0,"&:hover":{textDecorationColor:"inherit"}},"button"===n.component&&Object(a.a)({position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"}},"&.".concat(g.focusVisible),{outline:"auto"}))})),k=i.forwardRef((function(e,t){var n=Object(f.a)({props:e,name:"MuiLink"}),a=n.className,l=n.color,d=void 0===l?"primary":l,j=n.component,p=void 0===j?"a":j,O=n.onBlur,v=n.onFocus,g=n.TypographyClasses,A=n.underline,k=void 0===A?"always":A,C=n.variant,F=void 0===C?"inherit":C,T=Object(o.a)(n,w),R=Object(m.a)(),W=R.isFocusVisibleRef,D=R.onBlur,H=R.onFocus,E=R.ref,M=i.useState(!1),V=Object(r.a)(M,2),B=V[0],L=V[1],N=Object(h.a)(t,E),P=Object(c.a)({},n,{color:d,component:p,focusVisible:B,underline:k,variant:F}),z=function(e){var t=e.classes,n=e.component,r=e.focusVisible,a=e.underline,o={root:["root","underline".concat(Object(b.a)(a)),"button"===n&&"button",r&&"focusVisible"]};return Object(u.a)(o,x,t)}(P);return Object(y.jsx)(S,Object(c.a)({className:Object(s.a)(z.root,a),classes:g,color:d,component:p,onBlur:function(e){D(e),!1===W.current&&L(!1),O&&O(e)},onFocus:function(e){H(e),!0===W.current&&L(!0),v&&v(e)},ref:N,ownerState:P,variant:F},T))}));t.a=k},271:function(e,t,n){"use strict";n.r(t);var r=n(5),a=n.n(r),o=n(62),c=n(20),i=n(27),s=n(77),u=n(232),l=n(0),d=n(28),b=n(111),j=n(277),f=n(275),m=n(274),h=n(189),p=n(257),O=n(238),v=n(252),x=n(1);t.default=function(){var e=Object(l.useState)(""),t=Object(c.a)(e,2),n=t[0],r=t[1],g=Object(l.useState)(""),y=Object(c.a)(g,2),w=y[0],A=y[1],S=Object(l.useState)(""),k=Object(c.a)(S,2),C=k[0],F=k[1],T=Object(l.useState)(""),R=Object(c.a)(T,2),W=R[0],D=R[1],H=Object(d.c)((function(e){return e.account})),E=Object(d.c)((function(e){return e.event})),M=function(){var e=Object(o.a)(a.a.mark((function e(){var t,r,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(n.length),!H.accountAddress||42!==n.length){e.next=9;break}return t=new s.a.providers.Web3Provider(window.ethereum),r=new s.a.Contract(i.g,i.f,t),e.next=6,r.allowance(n,H.accountAddress);case 6:o=e.sent,o=s.a.utils.formatEther(o).toString(),D(o);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(l.useEffect)((function(){H.accountAddress?(console.log("Calculating Allowance"),M()):D("-")}),[H.accountAddress,E.transfer]),Object(l.useEffect)((function(){M()}),[n]),Object(x.jsx)(b.a,{title:"Transfer RTS",children:Object(x.jsxs)(u.a,{container:!0,spacing:i.d,children:[Object(x.jsx)(u.a,{item:!0,xs:0,sm:0,md:4,lg:4}),Object(x.jsx)(u.a,{item:!0,xs:12,sm:12,md:4,lg:4,children:Object(x.jsxs)(u.a,{container:!0,direction:"column",spacing:1,children:[Object(x.jsx)(u.a,{item:!0,children:Object(x.jsxs)(j.a,{fullWidth:!0,children:[Object(x.jsx)(f.a,{htmlFor:"outlined-adornment-transfer-from-account",children:"From Address"}),Object(x.jsx)(m.a,{id:"outlined-adornment-transfer-from-account",type:"string",name:"transfer-from-account",onChange:function(e){r(e.target.value)},label:"From Address",value:n})]})}),Object(x.jsx)(u.a,{item:!0,children:Object(x.jsxs)(j.a,{fullWidth:!0,children:[Object(x.jsx)(f.a,{htmlFor:"outlined-adornment-transfer-account",children:"To Address"}),Object(x.jsx)(m.a,{id:"outlined-adornment-transfer-account",type:"string",name:"transfer-account",onChange:function(e){A(e.target.value)},label:"To Address",value:w})]})}),Object(x.jsx)(u.a,{item:!0,children:Object(x.jsxs)(h.a,{children:["Allowance: ",W," RTS ",Object(x.jsx)(p.a,{onClick:function(){H.accountAddress&&F(W)},children:"Use Max"})]})}),Object(x.jsx)(u.a,{item:!0,children:Object(x.jsxs)(j.a,{fullWidth:!0,children:[Object(x.jsx)(f.a,{htmlFor:"outlined-adornment-transfer-amount",children:"Amount"}),Object(x.jsx)(m.a,{id:"outlined-adornment-transfer-amount",type:"string",name:"transfer-amount",onChange:function(e){F(e.target.value)},label:"Amount",value:C})]})}),Object(x.jsx)(u.a,{item:!0,children:Object(x.jsx)(v.a,{children:Object(x.jsx)(O.a,{disableElevation:!0,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"secondary",onClick:function(){if(H.accountAddress){var e=new s.a.providers.Web3Provider(window.ethereum).getSigner(),t=new s.a.Contract(i.g,i.f,e);if(!(parseFloat(C.match(/^-?\d*(\.\d+)?$/))>=0))return alert("Input must be a float greater than 0 e.g. 0.01"),!1;var r=s.a.utils.parseUnits(C,18);t.transferFrom(n,w,r).then(console.log).catch((function(e){return alert(e.data.message)}))}else alert("You must first sign in!")},children:"Send"})})})]})}),Object(x.jsx)(u.a,{item:!0,xs:0,sm:0,md:4,lg:4})]})})}}}]);
//# sourceMappingURL=8.8895af83.chunk.js.map