(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"2u47":function(e){e.exports=JSON.parse("{}")},N82c:function(e){e.exports=JSON.parse("{}")},QEXP:function(e,t,n){e.exports=n.p+"static/loading.aee5f6fb.svg"},R1Dz:function(e,t,n){"use strict";var a=n("q1tI");t["a"]=Object(a["createContext"])()},"S/9j":function(e,t,n){"use strict";function a(e){var t=e.split("/").filter((e=>e));return t.map(((e,n)=>"/".concat(t.slice(0,n+1).join("/"))))}n.d(t,"a",(function(){return a}))},kiEm:function(e,t,n){"use strict";n.r(t);n("+L6B");var a=n("2/Rp"),o=n("q1tI"),r=n("9kvl"),c=n("THqM"),s=(n("Pwec"),n("CtXQ")),i=(n("5NDa"),n("5rEg")),l=n("k1fw"),u=n("9og8"),b=n("tJVT"),d=n("WmNS"),j=n.n(d),h=n("nkYg"),p=n("+Ri4"),g=n.n(p),O=(n("+n12"),n("Z6YE")),x=n("jUKV"),m=n("O/14"),v=(n("2u47"),n("N82c"),n("GUrf")),f=n("4218"),w=n("cUlj"),k=n("nKUr");function y(e,t){return T.apply(this,arguments)}function T(){return T=Object(u["a"])(j.a.mark((function e(t,n){var a,o,r,c,s,i,l,b,d,h,p,g,O,x,k,y,T,C,S,E,N,I,A,P,q=arguments;return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=q.length>2&&void 0!==q[2]?q[2]:m["c"],o=!(q.length>3&&void 0!==q[3])||q[3],r=q.length>4?q[4]:void 0,c=q.length>5?q[5]:void 0,s=q.length>6?q[6]:void 0,i=q.length>7?q[7]:void 0,l=q.length>8?q[8]:void 0,b=q.length>9?q[9]:void 0,d=q.length>10?q[10]:void 0,h=q.length>11?q[11]:void 0,p=q.length>12?q[12]:void 0,g=q.length>13?q[13]:void 0,O=q.length>14?q[14]:void 0,x=q.length>15?q[15]:void 0,k=q.length>16?q[16]:void 0,y=q.length>17?q[17]:void 0,T=q.length>18?q[18]:void 0,C=q.length>19?q[19]:void 0,S=q.length>20?q[20]:void 0,E=q.length>21?q[21]:void 0,N=q.length>22?q[22]:void 0,I=q.length>23?q[23]:void 0,A=q.length>24?q[24]:void 0,e.next=25,Object(u["a"])(j.a.mark((function e(){var u,P,q,L,H,D,R,U,W,F,B,M,Y,K,Q,z,G,J,V,X,Z,_,$,ee,te,ne,ae,oe,re,ce,se,ie,le,ue,be,de,je;return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(b(!1),d(!1),h("0"),p("0"),g(!1),O(!1),x(""),k("Loading..."),y(!1),T(""),console.log(v["c"]),u=Object(m["p"])(c,s),.01*a,P=t.address,q=t.symbol,L=t.decimals,H=t.amount,D=n.address,R=n.symbol,U=n.decimals,W=n.amount,H=H||"0",W=W||"0",s&&c){e.next=19;break}return e.abrupt("return",new m["a"]("Connect to your wallet"));case 19:if(t.symbol&&n.symbol){e.next=21;break}return e.abrupt("return",new m["a"]("Please choose tokens"));case 21:if(!o||"0"!=H){e.next=23;break}return e.abrupt("return",new m["a"]("Please enter amount"));case 23:if(o||"0"!=W){e.next=25;break}return e.abrupt("return",new m["a"]("Please enter amount"));case 25:if(!o||""!=H){e.next=27;break}return e.abrupt("return",new m["a"]("Please enter amount"));case 27:if(o||""!=W){e.next=29;break}return e.abrupt("return",new m["a"]("Please enter amount"));case 29:if(!o||!isNaN(parseFloat(H))){e.next=31;break}return e.abrupt("return",new m["a"]("Please enter amount"));case 31:if(o||!isNaN(parseFloat(W))){e.next=33;break}return e.abrupt("return",new m["a"]("Please enter amount"));case 33:if(F="ETH"===q,B="ETH"===R,console.log(t),console.log(n),!F||!B){e.next=41;break}return k("Doesn't support ETH to ETH"),y(!1),e.abrupt("return",new m["a"]("Doesn't support ETH to ETH"));case 41:if(!(F&&"WETH"===R||"WETH"===q&&B)){e.next=45;break}return k("Invalid pair WETH/ETH"),y(!1),e.abrupt("return",new m["a"]("Invalid pair WETH/ETH"));case 45:if(console.log("ADD LIQUIDITY"),console.log("------------------ CONSTRUCT TOKEN ------------------"),M=F?v["n"][r]:new v["j"](r,P,L,q),Y=B?v["n"][r]:new v["j"](r,D,U,R),!M.equals(Y)){e.next=53;break}return k("Equal tokens"),y(!1),e.abrupt("return",new m["a"]("Equal tokens!"));case 53:return e.next=55,v["d"].fetchPairData(M,Y,c).then((e=>(console.log(e.reserve0.raw.toString()),console.log(e.reserve1.raw.toString()),e))).catch((e=>new m["a"]("".concat(M.symbol," - ").concat(Y.symbol," pool does not exist. Create one?"))));case 55:K=e.sent,console.log("pair"),console.log(K),C(K),Q=!1,K instanceof m["a"]&&(Q=!0),S(Q),console.log("------------------ PARSE AMOUNT ------------------"),e.prev=63,z=o?new v["k"](M,Object(w["b"])(H,L)):new v["k"](Y,Object(w["b"])(W,U)),e.next=77;break;case 67:if(e.prev=67,e.t0=e["catch"](63),console.log("parsedAmount"),console.log(e.t0),y(!1),"underflow"!==e.t0.fault){e.next=75;break}return k("Value too small"),e.abrupt("return",new m["a"](e.t0.fault));case 75:return k(Q?"Enter both values":"Unhandled error"),e.abrupt("return",new m["a"]("Amount error"));case 77:if(Q){e.next=124;break}if(console.log("estimated dependent amount"),!o){e.next=101;break}V=K.priceOf(M).quote(z),e.prev=81,X=new v["k"](M,Object(w["b"])(H,L)),e.next=95;break;case 85:if(e.prev=85,e.t1=e["catch"](81),y(!1),"underflow"!==e.t1.fault){e.next=93;break}return k(e.t1.fault),e.abrupt("return",new m["a"](e.t1.fault));case 93:return k("Token or amount missing"),e.abrupt("return",new m["a"]("Token or amount missing"));case 95:G=M===v["b"]?v["a"].ether(X.raw):X,J=Y===v["b"]?v["a"].ether(V.raw):V,l(V.toFixed(5)),W=V.toExact(),e.next=122;break;case 101:V=K.priceOf(Y).quote(z),e.prev=102,Z=new v["k"](Y,Object(w["b"])(W,U)),e.next=118;break;case 106:if(e.prev=106,e.t2=e["catch"](102),console.log("token0TokenAmount"),console.log(e.t2),y(!1),"underflow"!==e.t2.fault){e.next=116;break}return k(e.t2.fault),e.abrupt("return",new m["a"](e.t2.fault));case 116:return k("Token or amount missing"),e.abrupt("return",new m["a"]("Token or amount missing"));case 118:G=M===v["b"]?v["a"].ether(V.raw):V,J=Y===v["b"]?v["a"].ether(Z.raw):Z,i(V.toFixed(5)),H=V.toExact();case 122:e.next=151;break;case 124:if("0"!==H&&"0"!==W){e.next=134;break}if(!Q){e.next=131;break}return y(!1),k("Create new pool"),e.abrupt("return",new m["a"]("Creating a new pool, please enter both amounts"));case 131:return y(!1),k("Add liquidity"),e.abrupt("return",new m["a"]("One field is empty, it's probably a new pool"));case 134:e.prev=134,G=new v["k"](M,Object(w["b"])(H,L)),J=new v["k"](Y,Object(w["b"])(W,U)),e.next=151;break;case 139:if(e.prev=139,e.t3=e["catch"](134),console.log("parsedToken0Amount and parsedToken1Amount"),console.log(e.t3),y(!1),"underflow"!==e.t3.fault){e.next=149;break}return k(e.t3.fault),e.abrupt("return",new m["a"](e.t3.fault));case 149:return k("Value must be a number"),e.abrupt("return",new m["a"]("Value must be a number"));case 151:return E(G),N(J),console.log("------------------ CHECK BALANCE ------------------"),e.next=156,Object(m["t"])(F?v["b"]:new v["j"](r,P,L,q),s,c);case 156:return _=e.sent,e.next=159,Object(m["t"])(B?v["b"]:new v["j"](r,D,U,R),s,c);case 159:$=e.sent,console.log("token0 balance"),console.log(_),console.log("token1 balance"),console.log($),e.prev=164,ee=_.gte(Object(w["b"])(H,L))&&$.gte(Object(w["b"])(W,U)),e.next=180;break;case 168:if(e.prev=168,e.t4=e["catch"](164),console.log(ee),console.log(e.t4),y(!1),"underflow"!==e.t4.fault){e.next=178;break}return k(e.t4.fault),e.abrupt("return",new m["a"](e.t4.fault));case 178:return k("userHasSufficientBalance"),e.abrupt("return",new m["a"]("unknow error"));case 180:if(ee){e.next=184;break}return k("Not enough balance"),y(!1),e.abrupt("return",new m["a"]("Not enough balance"));case 184:if(console.log("------------------ BREAKDOWN ------------------"),Q){e.next=208;break}return e.next=188,Object(m["r"])(K.liquidityToken,c,s);case 188:te=e.sent,console.log("Liquidity Minted"),console.log(K.liquidityToken),e.prev=191,ne=K.getLiquidityMinted(te,G,J),ae=new v["g"](ne.raw,te.add(ne).raw).toFixed(4),x(["Pool reserve: ".concat(K.reserve0.toFixed(3)," ").concat(K.token0.symbol," + ").concat(K.reserve1.toFixed(3)," ").concat(K.token1.symbol),"Pool share: ".concat(ae,"%")]),e.next=206;break;case 197:if(e.prev=197,e.t5=e["catch"](191),!(e.t5 instanceof v["e"])){e.next=203;break}return k("Insufficient reserve!"),y(!1),e.abrupt("return",new m["a"]("Insufficient reserve!"));case 203:return k("Unhandled exception!"),y(!1),e.abrupt("return",new m["a"]("Unhandled exception!"));case 206:e.next=209;break;case 208:x(["Ready to create ".concat(q," ").concat(R," liquidity pool.")]);case 209:if(console.log("------------------ ALLOWANCE ------------------"),oe=0,F){e.next=218;break}return e.next=214,Object(m["i"])(P,G.raw.toString(),c,s);case 214:re=e.sent,console.log("token 0 approved?"),console.log(re),re||(console.log("Not enough allowance"),h(G.raw.toString()),b(!0),g(!0),oe+=1);case 218:if(B){e.next=226;break}return console.log("Inside addLiquidity, amount needed: ".concat(J.raw.toString())),e.next=222,Object(m["i"])(D,J.raw.toString(),c,s);case 222:ce=e.sent,console.log("token 1 approved?"),console.log(ce),ce||(console.log("Not enough allowance for token1"),p(J.raw.toString()),d(!0),O(!0),oe+=2);case 226:if(!(oe>0)){e.next=230;break}return y(!1),k("Need approval"),e.abrupt("return",new m["a"]("Need approve ".concat(1===oe?q:2===oe?R:"".concat(q," and ").concat(R))));case 230:y(!0),k(Q?"Create a new pool":"Add liquidity"),console.log("------------------ PREPARE ADD LIQUIDITY ------------------"),console.log("parsed token 0 amount"),console.log(G.raw),console.log("parsed token 1 amount"),console.log(J.raw),console.log("slippage"),console.log(a),F||B?(se=u.estimateGas.addLiquidityETH,ie=u.addLiquidityETH,be=F?Y:M,de=F?J:G,je=F?Object(m["h"])(G,Q?0:a)[0].toString():Object(m["h"])(J,Q?0:a)[0].toString(),le=[be.address,de.raw.toString(),Object(m["h"])(de,Q?0:a)[0].toString(),je,s,"0x".concat((Math.floor((new Date).getTime()/1e3)+60).toString(16))],ue=f["a"].from((B?J:G).raw.toString()),console.log(ue)):(se=u.estimateGas.addLiquidity,ie=u.addLiquidity,le=[P,D,G.raw.toString(),J.raw.toString(),Object(m["h"])(G,Q?0:a)[0].toString(),Object(m["h"])(J,Q?0:a)[0].toString(),s,"0x".concat((Math.floor((new Date).getTime()/1e3)+60).toString(16))],ue=null),console.log("args"),console.log(le),console.log("estimate"),console.log(se),console.log("method"),console.log(ie),console.log("value"),console.log(ue),I(le),A(ue);case 250:case"end":return e.stop()}}),e,null,[[63,67],[81,85],[102,106],[134,139],[164,168],[191,197]])})))();case 25:P=e.sent,P instanceof m["a"]?k(P.getErrorText()):console.log(P);case 27:case"end":return e.stop()}}),e)}))),T.apply(this,arguments)}function C(e,t){return S.apply(this,arguments)}function S(){return S=Object(u["a"])(j.a.mark((function e(t,n){var a,o,r,c,s,i,b,d,h,p,g,O,x,f,w=arguments;return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=w.length>2&&void 0!==w[2]?w[2]:m["c"],!(w.length>3&&void 0!==w[3])||w[3],o=w.length>4?w[4]:void 0,r=w.length>5?w[5]:void 0,c=w.length>6?w[6]:void 0,s=w.length>7?w[7]:void 0,i=w.length>8?w[8]:void 0,b=w.length>9?w[9]:void 0,d=w.length>10?w[10]:void 0,h=w.length>11?w[11]:void 0,p=w.length>12?w[12]:void 0,g=w.length>13?w[13]:void 0,O=w.length>14?w[14]:void 0,e.next=15,Object(u["a"])(j.a.mark((function e(){var u,g,O,x,f,w,k,y,T,C,S,E,N,I;return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log(v["c"]),u=Object(m["p"])(r,c),g=t.address,O=t.symbol,x=t.decimals,t.amount,f=n.address,w=n.symbol,k=n.decimals,n.amount,y="ETH"===O,T="ETH"===w,console.log("------------------ RECEIVED TOKEN ------------------"),console.log("token0"),console.log(t),console.log("token1"),console.log(n),!y||!T){e.next=13;break}return e.abrupt("return",new m["a"]("Doesn't support ETH to ETH"));case 13:if(!(y&&"WETH"===w||"WETH"===O&&T)){e.next=15;break}return e.abrupt("return",new m["a"]("Invalid pair WETH/ETH"));case 15:if(console.log("ADD LIQUIDITY"),console.log("------------------ CONSTRUCT TOKEN ------------------"),C=y?v["n"][o]:new v["j"](o,g,x,O),S=T?v["n"][o]:new v["j"](o,f,k,w),!C.equals(S)){e.next=21;break}return e.abrupt("return",new m["a"]("Equal tokens!"));case 21:return console.log("------------------ CONSTRUCT PAIR ------------------"),console.log("FETCH pair"),console.log(s),console.log(i),console.log("------------------ PARSE AMOUNT ------------------"),console.log(b),console.log(d),console.log("------------------ CHECK BALANCE ------------------"),console.log("------------------ BREAKDOWN ------------------"),console.log("------------------ ALLOWANCE ------------------"),console.log("------------------ PREPARE ADD LIQUIDITY ------------------"),y||T?(E=u.estimateGas.addLiquidityETH,N=u.addLiquidityETH,console.log(h),console.log(p)):(E=u.estimateGas.addLiquidity,N=u.addLiquidity,console.log(h),console.log(p)),console.log("parsed token 0 amount"),console.log(b.raw),console.log("parsed token 1 amount"),console.log(d.raw),console.log("slippage"),console.log(a),console.log(E),console.log(N),console.log(h),console.log(p),e.next=45,E(...h,p?{value:p}:{}).then((e=>N(...h,Object(l["a"])(Object(l["a"])({},p?{value:p}:{}),{},{gasLimit:Object(m["g"])(e)})).catch((e=>new m["a"]("CustomError in transaction")))));case 45:return I=e.sent,e.abrupt("return",I);case 47:case"end":return e.stop()}}),e)})))();case 15:return x=e.sent,x instanceof m["a"]?g(x.getErrorText()):(console.log("status"),console.log(x),f="https://rinkeby.etherscan.io/tx/"+x.hash,O(x),g(Object(k["jsx"])("a",{href:f,target:"_blank",children:"View it on etherscan"}))),e.abrupt("return");case 18:case"end":return e.stop()}}),e)}))),S.apply(this,arguments)}var E,N,I=n("QEXP"),A=n.n(I),P=n("wd/R"),q=n.n(P),L=c["t"].AcyTabPane,H=e=>{var t=e.dispatch,n=e.onLoggedIn,r=Object(o["useState"])(null),d=Object(b["a"])(r,2),p=d[0],v=d[1],f=Object(o["useState"])(!0),w=Object(b["a"])(f,2),T=w[0],S=w[1],E=Object(o["useState"])(h["a"][0]),N=Object(b["a"])(E,2),I=N[0],P=N[1],H=Object(o["useState"])(h["a"][1]),D=Object(b["a"])(H,2),R=D[0],U=D[1],W=Object(o["useState"])("0"),F=Object(b["a"])(W,2),B=F[0],M=F[1],Y=Object(o["useState"])("0"),K=Object(b["a"])(Y,2),Q=K[0],z=K[1],G=Object(o["useState"])(),J=Object(b["a"])(G,2),V=J[0],X=J[1],Z=Object(o["useState"])(),_=Object(b["a"])(Z,2),$=_[0],ee=_[1],te=Object(o["useState"])(!1),ne=Object(b["a"])(te,2),ae=ne[0],oe=ne[1],re=Object(o["useState"])(!1),ce=Object(b["a"])(re,2),se=ce[0],ie=ce[1],le=Object(o["useState"])(!0),ue=Object(b["a"])(le,2),be=ue[0],de=ue[1],je=Object(o["useState"])(m["c"]/100),he=Object(b["a"])(je,2),pe=he[0],ge=he[1],Oe=Object(o["useState"])(m["c"]/100),xe=Object(b["a"])(Oe,2),me=xe[0],ve=xe[1],fe=Object(o["useState"])(""),we=Object(b["a"])(fe,2),ke=we[0],ye=we[1],Te=Object(o["useState"])(!1),Ce=Object(b["a"])(Te,2),Se=Ce[0],Ee=Ce[1],Ne=Object(o["useState"])(!1),Ie=Object(b["a"])(Ne,2),Ae=Ie[0],Pe=Ie[1],qe=Object(o["useState"])("0"),Le=Object(b["a"])(qe,2),He=Le[0],De=Le[1],Re=Object(o["useState"])("0"),Ue=Object(b["a"])(Re,2),We=Ue[0],Fe=Ue[1],Be=Object(o["useState"])(!1),Me=Object(b["a"])(Be,2),Ye=Me[0],Ke=Me[1],Qe=Object(o["useState"])(!1),ze=Object(b["a"])(Qe,2),Ge=ze[0],Je=ze[1],Ve=Object(o["useState"])(),Xe=Object(b["a"])(Ve,2),Ze=Xe[0],_e=Xe[1],$e=Object(o["useState"])("Connect to wallet"),et=Object(b["a"])($e,2),tt=et[0],nt=et[1],at=Object(o["useState"])(!0),ot=Object(b["a"])(at,2),rt=ot[0],ct=ot[1],st=Object(o["useState"])(),it=Object(b["a"])(st,2),lt=it[0],ut=it[1],bt=Object(o["useState"])(),dt=Object(b["a"])(bt,2),jt=dt[0],ht=dt[1],pt=Object(o["useState"])(),gt=Object(b["a"])(pt,2),Ot=gt[0],xt=gt[1],mt=Object(o["useState"])(),vt=Object(b["a"])(mt,2),ft=vt[0],wt=vt[1],kt=Object(o["useState"])(),yt=Object(b["a"])(kt,2),Tt=yt[0],Ct=yt[1],St=Object(o["useState"])(),Et=Object(b["a"])(St,2),Nt=Et[0],It=Et[1],At=Object(o["useState"])(),Pt=Object(b["a"])(At,2),qt=Pt[0],Lt=Pt[1],Ht=Object(o["useState"])(""),Dt=Object(b["a"])(Ht,2),Rt=Dt[0],Ut=Dt[1],Wt=Object(o["useState"])(h["a"]),Ft=Object(b["a"])(Wt,2),Bt=Ft[0],Mt=Ft[1],Yt=Object(o["useState"])(!1),Kt=Object(b["a"])(Yt,2),Qt=Kt[0],zt=Kt[1],Gt=Object(o["useState"])(!1),Jt=Object(b["a"])(Gt,2),Vt=Jt[0],Xt=Jt[1],Zt=e=>{Ut(e.target.value),Mt(h["a"].filter((t=>t.symbol.includes(e.target.value.toUpperCase()))))},_t=Object(o["useState"])([]),$t=Object(b["a"])(_t,2),en=($t[0],$t[1],Object(O["b"])()),tn=en.account,nn=en.chainId,an=en.library,on=en.activate,rn=new x["a"]({supportedChainIds:[1,3,4,5,42,80001]});Object(o["useEffect"])((()=>{on(rn)}),[tn]);var cn=Object(o["useCallback"])(Object(u["a"])(j.a.mark((function e(){return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(I&&R){e.next=2;break}return e.abrupt("return");case 2:if(be){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,y(Object(l["a"])(Object(l["a"])({},I),{},{amount:V}),Object(l["a"])(Object(l["a"])({},R),{},{amount:$}),100*pe,be,nn,an,tn,X,ee,Ee,Pe,De,Fe,Ke,Je,_e,nt,ct,ut,ht,xt,wt,Ct,It,Lt);case 6:case"end":return e.stop()}}),e)}))),[I,R,V,$,pe,be,nn,an,tn]),sn=Object(o["useCallback"])(Object(u["a"])(j.a.mark((function e(){return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(I&&R){e.next=2;break}return e.abrupt("return");case 2:if(!be){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,y(Object(l["a"])(Object(l["a"])({},I),{},{amount:V}),Object(l["a"])(Object(l["a"])({},R),{},{amount:$}),100*pe,be,nn,an,tn,X,ee,Ee,Pe,De,Fe,Ke,Je,_e,nt,ct,ut,ht,xt,wt,Ct,It,Lt);case 6:case"end":return e.stop()}}),e)}))),[I,R,V,$,pe,be,nn,an,tn]);Object(o["useEffect"])((()=>{cn()}),[I,R,V,$,pe,be,nn,an,tn]),Object(o["useEffect"])((()=>{sn()}),[I,R,V,$,pe,be,nn,an,tn]),Object(o["useEffect"])((()=>{void 0==tn?(ct(!0),nt("Connect to Wallet")):(nt("Choose tokens and amount"),ct(!1),n())}),[nn,an,tn]),Object(o["useEffect"])((()=>{var e=()=>document.getElementById("liquidity-token-search-input").focus();!0===p&&setTimeout(e,100)}),[p]);var ln=()=>{v(!0)},un=()=>{v(!1)};Object(o["useEffect"])((()=>{function e(){return t.apply(this,arguments)}function t(){return t=Object(u["a"])(j.a.mark((function e(){return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return oe(!0),ie(!0),e.t0=M,e.next=5,Object(m["s"])(I,nn,tn,an);case 5:return e.t1=e.sent,(0,e.t0)(e.t1),e.t2=z,e.next=10,Object(m["s"])(R,nn,tn,an);case 10:e.t3=e.sent,(0,e.t2)(e.t3);case 12:case"end":return e.stop()}}),e)}))),t.apply(this,arguments)}tn&&nn&&an&&(console.log("get balances in liquidity"),e())}),[tn,nn,an,I,R]);var bn=function(){var e=Object(u["a"])(j.a.mark((function e(t){return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(un(),!T){e.next=15;break}if(void 0!=tn){e.next=6;break}alert("Please connect to your account"),e.next=13;break;case 6:return P(t),e.t0=M,e.next=10,Object(m["s"])(t,nn,tn,an);case 10:e.t1=e.sent,(0,e.t0)(e.t1),oe(!0);case 13:e.next=26;break;case 15:if(void 0!=tn){e.next=19;break}alert("Please connect to your account"),e.next=26;break;case 19:return U(t),e.t2=z,e.next=23,Object(m["s"])(t,nn,tn,an);case 23:e.t3=e.sent,(0,e.t2)(e.t3),ie(!0);case 26:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),dn=Object(o["useState"])([]),jn=Object(b["a"])(dn,2),hn=jn[0],pn=jn[1],gn=e=>{pn((t=>{var n=[...t];return n.push(Bt[e]),n}))},On=n=>{console.log("test status:",n);var a=e.transaction.transactions,o=a.filter((e=>e.hash==n.hash)).length;console.log("is current dispatched? ",o),0==o&&t({type:"transaction/addTransaction",payload:{transactions:[...a,{hash:n.hash}]}});var r=setInterval((()=>{an.getTransactionReceipt(n.hash).then(function(){var e=Object(u["a"])(j.a.mark((function e(o){var c,s;return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log("receipt ",o),!o){e.next=11;break}return clearInterval(r),e.next=5,an.getBlock(o.logs[0].blockNumber).then((e=>{c=q()(parseInt(1e3*e.timestamp)).format("YYYY-MM-DD HH:mm:ss"),console.log("test transactionTime: ",c)}));case 5:s=a.filter((e=>e.hash!=n.hash)),t({type:"transaction/addTransaction",payload:{transactions:[...s,{hash:n.hash,transactionTime:c}]}}),ct(!0),console.log(tt),nt(tt),console.log("state should be updated to : ",[...s,{hash:n.hash,transactionTime:c}]);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),500)},xn=e.liquidity;return Object(o["useEffect"])(Object(u["a"])(j.a.mark((function e(){var t,n;return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=xn.token0,n=xn.token1,console.log("new tokens to set in addComponent, ",t,n),!t||!n){e.next=20;break}return t=Bt.filter((e=>e.symbol===t.symbol))[0],n=Bt.filter((e=>e.symbol===n.symbol))[0],console.log("fetched token ds",t,n),P(t),e.t0=M,e.next=10,Object(m["s"])(t,nn,tn,an);case 10:return e.t1=e.sent,(0,e.t0)(e.t1),oe(!0),U(n),e.t2=z,e.next=17,Object(m["s"])(n,nn,tn,an);case 17:e.t3=e.sent,(0,e.t2)(e.t3),ie(!0);case 20:case"end":return e.stop()}}),e)}))),[xn]),Object(k["jsxs"])("div",{children:[Object(k["jsx"])(c["j"],{icon:"eth",title:ae&&"Balance: ".concat(parseFloat(B).toFixed(5)),logoURI:I&&I.logoURI,coin:I&&I.symbol||"Select",yuan:"566.228",dollar:"".concat(B),token:V,onChoseToken:Object(u["a"])(j.a.mark((function e(){return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:ln(),S(!0);case 2:case"end":return e.stop()}}),e)}))),onChangeToken:e=>{console.log("onChangeToken"),de(!0),X(e)}}),Object(k["jsx"])("div",{style:{margin:"12px auto",textAlign:"center"},children:Object(k["jsx"])(c["l"],{width:21.5,name:"plus_light"})}),Object(k["jsx"])(c["j"],{icon:"eth",title:se&&"Balance: ".concat(parseFloat(Q).toFixed(5)),logoURI:R&&R.logoURI,coin:R&&R.symbol||"Select",yuan:"566.228",dollar:"".concat(Q),token:$,onChoseToken:Object(u["a"])(j.a.mark((function e(){return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:ln(),S(!1);case 2:case"end":return e.stop()}}),e)}))),onChangeToken:e=>{de(!1),ee(e)}}),Object(k["jsx"])(c["k"],{children:Ze&&Object(k["jsxs"])(k["Fragment"],{children:[Object(k["jsx"])("div",{className:g.a.breakdownTopContainer,children:Object(k["jsxs"])("div",{className:g.a.slippageContainer,children:[Object(k["jsx"])("span",{style:{fontWeight:600},children:"Slippage tolerance"}),Object(k["jsxs"])("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"7px"},children:[Object(k["jsx"])(a["a"],{type:"link",style:{marginRight:"5px"},children:"Auto"}),Object(k["jsx"])(i["a"],{value:me||"",onChange:e=>{ve(e.target.value)},suffix:Object(k["jsx"])("strong",{children:"%"})}),Object(k["jsx"])(a["a"],{type:"primary",style:{marginLeft:"10px",background:"#2e3032",borderColor:"transparent"},onClick:()=>{isNaN(me)?ye("Please input valid slippage value!"):(ye(""),ge(parseFloat(me)))},children:"Set"})]}),ke.length>0&&Object(k["jsx"])("span",{style:{fontWeight:600,color:"#c6224e"},children:ke})]})}),Object(k["jsx"])("div",{className:g.a.acyDescriptionContainer,children:Ze.map((e=>Object(k["jsx"])(c["k"].Item,{children:Object(k["jsx"])("div",{className:g.a.acyDescriptionItem,children:e})})))})]})}),1==Ye&&Object(k["jsxs"])("div",{children:[Object(k["jsxs"])(c["d"],{variant:"warning",onClick:Object(u["a"])(j.a.mark((function e(){var t;return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return zt(!0),Ee(!1),e.next=4,Object(m["e"])(I.address,He,an,tn);case 4:if(t=e.sent,Ee(!0),zt(!1),1!=t){e.next=12;break}return Ee(!1),e.next=11,y(Object(l["a"])(Object(l["a"])({},I),{},{amount:V}),Object(l["a"])(Object(l["a"])({},R),{},{amount:$}),100*pe,be,nn,an,tn,X,ee,Ee,Pe,De,Fe,Ke,Je,_e,nt,ct,ut,ht,xt,wt,Ct,It,Lt);case 11:0==Ae&&(Ot?ct("Create new pool"):nt("Add liquidity"),ct(!0));case 12:case"end":return e.stop()}}),e)}))),disabled:!Se,children:["Approve ",I&&I.symbol,Qt&&Object(k["jsx"])("img",{style:{width:30,height:30,marginLeft:"1%"},src:A.a,className:g.a.spinner,alt:"spinner"})]})," "]}),1==Ge&&Object(k["jsx"])("div",{children:Object(k["jsxs"])(c["d"],{variant:"warning",onClick:Object(u["a"])(j.a.mark((function e(){var t;return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return Xt(!0),Pe(!1),e.next=4,Object(m["e"])(R.address,We,an,tn);case 4:if(t=e.sent,Pe(!0),Xt(!1),1!=t){e.next=12;break}return Pe(!1),e.next=11,y(Object(l["a"])(Object(l["a"])({},I),{},{amount:V}),Object(l["a"])(Object(l["a"])({},R),{},{amount:$}),100*pe,be,nn,an,tn,X,ee,Ee,Pe,De,Fe,Ke,Je,_e,nt,ct,ut,ht,xt,wt,Ct,It,Lt);case 11:0==Se&&(Ot?ct("Create new pool"):nt("Add liquidity"),ct(!0));case 12:case"end":return e.stop()}}),e)}))),disabled:!Ae,children:["Approve ",R&&R.symbol,Vt&&Object(k["jsx"])("img",{style:{width:30,height:30,marginLeft:"1%"},src:A.a,className:g.a.spinner,alt:"spinner"})]})}),Object(k["jsx"])(c["d"],{variant:"success",disabled:!rt,onClick:Object(u["a"])(j.a.mark((function e(){return j.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(void 0!=tn){e.next=6;break}on(rn),nt("Choose tokens and amount"),ct(!1),e.next=10;break;case 6:return ct(!1),nt(Object(k["jsxs"])(k["Fragment"],{children:["Processing ",Object(k["jsx"])(s["a"],{type:"loading"})]})),e.next=10,C(Object(l["a"])(Object(l["a"])({},I),{},{amount:V}),Object(l["a"])(Object(l["a"])({},R),{},{amount:$}),100*pe,be,nn,an,tn,jt,Ot,ft,Tt,Nt,qt,ut,On);case 10:case"end":return e.stop()}}),e)}))),children:tt}),Object(k["jsx"])(c["k"],{children:lt&&Object(k["jsx"])(c["k"].Item,{children:lt})}),Object(k["jsxs"])(c["p"],{onCancel:un,width:400,visible:p,children:[Object(k["jsx"])("div",{className:g.a.title,children:"Select a token"}),Object(k["jsx"])("div",{className:g.a.search,children:Object(k["jsx"])(i["a"],{size:"large",style:{backgroundColor:"#373739",borderRadius:"40px"},placeholder:"Enter the token symbol or address",value:Rt,onChange:Zt,id:"liquidity-token-search-input"})}),Object(k["jsx"])("div",{className:g.a.coinList,children:Object(k["jsxs"])(c["t"],{children:[Object(k["jsx"])(L,{tab:"All",children:Bt.map(((e,t)=>Object(k["jsx"])(c["g"],{data:e,customIcon:!1,setAsFav:()=>gn(t),selectToken:()=>{bn(e)}},t)))},"1"),Object(k["jsx"])(L,{tab:"Favorite",children:hn.map(((e,t)=>Object(k["jsx"])(c["g"],{data:e,selectToken:()=>gn(t),customIcon:!1,index:t,setAsFav:()=>gn(t),hideFavButton:!0},t)))},"2")]})})]})]})},D=Object(r["b"])((e=>{var t=e.global,n=e.transaction,a=e.loading,o=e.liquidity;return{global:t,transaction:n,loading:a.global,liquidity:o}}))(H),R=n("zHco"),U=n("EYsQ"),W=n.n(U),F=c["t"].AcyTabPane,B=(E=Object(r["b"])((e=>{var t=e.profile,n=e.loading;return{profile:t,loading:n.effects["profile/fetchBasic"]}})),E(N=class extends o["Component"]{constructor(){super(...arguments),this.state={visible:!1,visibleConfirmOrder:!1,visibleLoading:!1,tabIndex:1,loggedIn:!1},this.lineTitleRender=()=>[Object(k["jsxs"])("div",{children:[Object(k["jsxs"])("div",{className:W.a.maintitle,children:[Object(k["jsx"])("span",{className:W.a.lighttitle,children:"ETH"}),"/BTC"]}),Object(k["jsxs"])("div",{className:W.a.secondarytitle,children:[Object(k["jsx"])("span",{className:W.a.lighttitle,children:"212.123"})," ",Object(k["jsx"])("span",{className:W.a.percentage,children:"+12.45%"})," 2021.07.11"]})]}),Object(k["jsx"])(c["q"],{onhandPeriodTimeChoose:this.onhandPeriodTimeChoose,className:W.a.pt,times:["1D","7D","1M","1Y","All"]})],this.onhandPeriodTimeChoose=e=>{console.log(e)},this.onClickCoin=()=>{this.setState({visible:!0})},this.onCancel=()=>{this.setState({visible:!1})},this.onHandModalConfirmOrder=e=>{this.setState({visibleConfirmOrder:!!e})},this.onChangeTabs=e=>{this.setState({tabIndex:e})},this.onLoggedIn=()=>{this.setState({loggedIn:!0})}}componentDidMount(){}render(){var e=this.state,t=e.visible,n=e.visibleConfirmOrder,o=e.visibleLoading,r=(e.tabIndex,e.loggedIn);return Object(k["jsxs"])(R["a"],{children:[Object(k["jsxs"])("div",{className:r?W.a.main:W.a.main_notLoggedIn,children:[Object(k["jsx"])("div",{children:r&&Object(k["jsx"])(c["o"],{})}),Object(k["jsx"])("div",{children:Object(k["jsx"])(c["e"],{style:{backgroundColor:"#0e0304",padding:"10px"},children:Object(k["jsx"])("div",{className:W.a.addLiquidity,children:Object(k["jsx"])(D,{onLoggedIn:this.onLoggedIn})})})})]}),Object(k["jsxs"])(c["p"],{onCancel:this.onCancel,width:600,visible:t,children:[Object(k["jsxs"])("div",{className:W.a.title,children:[Object(k["jsx"])(c["l"],{name:"back"})," Select a token"]}),Object(k["jsx"])("div",{className:W.a.search,children:Object(k["jsx"])(c["m"],{placeholder:"Enter the token symbol or address",suffix:Object(k["jsx"])(c["l"],{name:"search"})})}),Object(k["jsx"])("div",{className:W.a.coinList,children:Object(k["jsxs"])(c["t"],{children:[Object(k["jsxs"])(F,{tab:"All",children:[Object(k["jsx"])(c["g"],{}),Object(k["jsx"])(c["g"],{}),Object(k["jsx"])(c["g"],{}),Object(k["jsx"])(c["g"],{})]},"1"),Object(k["jsx"])(F,{tab:"Favorite"},"2"),Object(k["jsx"])(F,{tab:"Index"},"3"),Object(k["jsx"])(F,{tab:"Synth"},"4")]})})]}),Object(k["jsx"])(c["h"],{onCancel:this.onHandModalConfirmOrder,title:"Comfirm Order",visible:n,children:Object(k["jsxs"])("div",{className:W.a.confirm,children:[Object(k["jsx"])("p",{children:"ETH\uff1a 566.228"}),Object(k["jsx"])("p",{children:"BTC\uff1a2.669"}),Object(k["jsx"])("p",{children:"Price\uff1a212.123"}),Object(k["jsx"])("p",{children:"Price Impact\uff1a2.232%"}),Object(k["jsx"])("p",{children:"Liquidity Provide Fee: 0.321%"}),Object(k["jsx"])("p",{children:"Alpha: 0.371%"}),Object(k["jsx"])("p",{children:"Maximum sold: 566.221"}),Object(k["jsx"])(a["a"],{size:"large",type:"primary",children:"Confirm"})]})}),Object(k["jsx"])(c["b"],{onCancel:()=>this.setState({visibleLoading:!1}),visible:o})]})}})||N);t["default"]=B},zHco:function(e,t,n){"use strict";var a=n("PpiC"),o=n("q1tI"),r=(n("cWXX"),n("/ezw"),n("k1fw"),n("Znn+"),n("ZTPi")),c=(n("TSYQ"),n("PCKb"),n("sPJy"),n("bE4q"),n("vRGJ"),n("S/9j"),n("nKUr"));o["PureComponent"];r["a"].TabPane;o["PureComponent"];var s=n("9kvl"),i=n("GvbY"),l=n.n(i);class u extends o["PureComponent"]{render(){var e=this.props,t=e.contentWidth,n=e.children,a="".concat(l.a.main);return"Fixed"===t&&(a="".concat(l.a.main," ").concat(l.a.wide)),Object(c["jsx"])("div",{className:a,children:n})}}var b=Object(s["b"])((e=>{var t=e.setting;return{contentWidth:t.contentWidth}}))(u),d=n("U0CE"),j=n.n(d),h=(n("R1Dz"),e=>{var t=e.children,n=(e.contentWidth,e.wrapperClassName),o=e.top;Object(a["a"])(e,["children","contentWidth","wrapperClassName","top"]);return Object(c["jsxs"])("div",{style:{margin:"-24px -24px 0"},className:n,children:[o,t?Object(c["jsx"])("div",{className:j.a.content,children:Object(c["jsx"])(b,{children:t})}):null]})});t["a"]=Object(s["b"])((e=>{var t=e.setting;return{contentWidth:t.contentWidth}}))(h)}}]);