(function(e){function t(t){for(var r,c,o=t[0],u=t[1],s=t[2],h=0,l=[];h<o.length;h++)c=o[h],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&l.push(a[c][0]),a[c]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);p&&p(t);while(l.length)l.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==a[u]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},i=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=t,o=o.slice();for(var s=0;s<o.length;s++)t(o[s]);var p=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{style:e.styleScale,attrs:{id:"app"}},[e.isShowStage?n("Stage",{attrs:{options:{width:e.width,height:e.height}}}):e._e()],1)},i=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("canvas",{ref:"stage",attrs:{width:e.width,height:e.height}})])},o=[],u=(n("96cf"),n("1da1")),s=(n("d3b7"),n("3ca3"),n("ddb0"),n("3835")),p=n("5530");function h(e,t){return new Promise((function(n){var r=new createjs.Bitmap(e);t&&r.set(t),r.image.onload=function(){return n(r)}}))}function l(e){e.currentTarget.offset={x:this.x-e.stageX,y:this.y-e.stageY}}function d(e,t){0}function f(e,t){e.on("click",(function(n){window.disabledClick||t&&t.call(e,n)}))}function g(e){return function(t){t.currentTarget.x=t.stageX+t.currentTarget.offset.x,t.currentTarget.y=t.stageY+t.currentTarget.offset.y,console.log("evt.currentTarget.parent",t.currentTarget.parent.getBounds()),console.log("evt.currentTarget",t.currentTarget.getBounds()),e&&e.update()}}n("4160");var w,m,v=n("2ef0"),x=n.n(v),b="static/resource/audio/m4a/",y="static/resource/audio/mp3/",j=["egg.m4a","ha.m4a","hatch.m4a","intro1.m4a","intro3.m4a","sound_a.m4a"],O=["ding.mp3","dong.mp3"];function k(e,t){var n=x.a.camelCase(t);return createjs.Sound.registerSound(e+t,n),n}function R(e){var t=x.a.camelCase(e);return createjs.Sound.play(t)}function S(e){return C.apply(this,arguments)}function C(){return C=Object(u["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=x.a.camelCase(t),e.abrupt("return",new Promise((function(e){return createjs.Sound.play(n).on("complete",(function(t){return e(t)}))})));case 2:case"end":return e.stop()}}),e)}))),C.apply(this,arguments)}j.forEach((function(e){return k(b,e)})),O.forEach((function(e){return k(y,e)}));var T,P,E,_,B,M,$,I,X,F="static/resource/pic/egg.png",Y="static/resource/pic/hatch.png",A="static/resource/pic/letter_a.png",H="static/resource/pic/mouth.png",J="static/resource/pic/right.png",L="static/resource/pic/wrong.png",W=(F="static/resource/pic/egg.png",Y="static/resource/pic/hatch.png",A="static/resource/pic/letter_a.png",H="static/resource/pic/mouth.png",J="static/resource/pic/right.png",L="static/resource/pic/wrong.png",0),z=0,U=500;function q(e){function t(){var e=document.documentElement.clientWidth,t=document.documentElement.clientHeight;return e>=t?(m.x=0,m.rotation=0):(m.x=z,m.rotation=90),[e,t]}W=e.width,z=e.height,T={scaleX:W/1920,scaleY:W/1920},m=new createjs.Stage(e),createjs.Touch.enable(m),m.enableMouseOver(!0),m.mouseMoveOutside=!0,window.onresize=t,t()}function D(e){return G.apply(this,arguments)}function G(){return G=Object(u["a"])(regeneratorRuntime.mark((function e(t){var n,r,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return q(t),n=new createjs.Text("Click to Play","bold  48px Arial","#F00"),n.x=n.y=10,n.backgroundColor="#ff0000",r=n.getBounds(),a=new createjs.Shape,a.cursor="pointer",a.graphics.beginFill("#000").drawRect(r.x,r.y,r.width+20,r.height+10),a.shadow=new createjs.Shadow("#000000",5,5,10),m.addChild(a),f(a,(function(){n.visible=!1,a.visible=!1,K()})),m.addChild(n),E=new createjs.Container,d(E),e.next=16,h(H);case 16:return B=e.sent,e.next=19,h(A);case 19:_=e.sent,d(_),E.addChild(B),E.addChild(_),f(E),i=E.getBounds(),_.set({cursor:"pointer",x:80,y:350}),i=E.getBounds(),E.set({x:(W-i.width)/2,y:(z-i.height)/2}),m.addChild(E),m.addChild(w),createjs.Ticker.framerate=50,createjs.Ticker.addEventListener("tick",m);case 32:case"end":return e.stop()}}),e)}))),G.apply(this,arguments)}function K(){return N.apply(this,arguments)}function N(){return N=Object(u["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,te(B,"ha.m4a");case 2:createjs.Tween.get(E,{loop:!1}).to(Object(p["a"])({x:0},T),U,createjs.Ease.getPowInOut(2)).call((function(){var e=E.getBounds();re(e),Q()}));case 3:case"end":return e.stop()}}),e)}))),N.apply(this,arguments)}function Q(){return V.apply(this,arguments)}function V(){return V=Object(u["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([h(Y),h(F)]);case 2:return t=e.sent,n=Object(s["a"])(t,2),M=n[0],$=n[1],d(M),d($),I=W/3,X=2*I,P=1e3*Math.random()%3-2>0,M.set({x:P?I:X,y:(z-M.getBounds().height)/2}),$.set({x:P?X:I,y:(z-$.getBounds().height)/2}),f(M,oe),f($,se),m.addChild(M),m.addChild($),e.next=19,Z();case 19:case"end":return e.stop()}}),e)}))),V.apply(this,arguments)}function Z(){return ee.apply(this,arguments)}function ee(){return ee=Object(u["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!P){e.next=7;break}return e.next=3,te(M,"hatch.m4a");case 3:return e.next=5,te($,"egg.m4a");case 5:e.next=11;break;case 7:return e.next=9,te($,"egg.m4a");case 9:return e.next=11,te(M,"hatch.m4a");case 11:case"end":return e.stop()}}),e)}))),ee.apply(this,arguments)}function te(e,t){return ne.apply(this,arguments)}function ne(){return ne=Object(u["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return ae(t),e.next=3,S(n);case 3:case"end":return e.stop()}}),e)}))),ne.apply(this,arguments)}function re(e){var t=new createjs.Shape;t.graphics.beginFill("#000").drawRect(e.width*T.scaleX,0,2,z),t.shadow=new createjs.Shadow("#000000",5,5,10),m.addChild(t)}function ae(e,t){var n=createjs.Tween.get(e,{loop:!1}).to({alpha:0},U,createjs.Ease.getPowInOut(2)).to({alpha:1},U,createjs.Ease.getPowInOut(2));t&&n.call(t)}function ie(e){return ce.apply(this,arguments)}function ce(){return ce=Object(u["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){var n=t.getBounds();createjs.Tween.get(t,{loop:!1}).to({x:I+(X-n.width)/2},U,createjs.Ease.getPowInOut(2)).call(e)})));case 1:case"end":return e.stop()}}),e)}))),ce.apply(this,arguments)}function oe(){return ue.apply(this,arguments)}function ue(){return ue=Object(u["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this,window.disabledClick=!0,e.next=4,te(M,"hatch.m4a");case 4:return e.next=6,Promise.all([de(t),S("ding.mp3")]);case 6:return $.visible=!1,e.next=9,ie(M);case 9:return e.next=11,te(B,"ha.m4a");case 11:return e.next=13,te(B,"ha.m4a");case 13:return e.next=15,te(M,"hatch.m4a");case 15:window.disabledClick=!1;case 16:case"end":return e.stop()}}),e,this)}))),ue.apply(this,arguments)}function se(){return pe.apply(this,arguments)}function pe(){return pe=Object(u["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this,window.disabledClick=!0,e.next=4,Promise.all([he(t),S("dong.mp3")]);case 4:return e.next=6,te(B,"ha.m4a");case 6:return e.next=8,Z();case 8:window.disabledClick=!1;case 9:case"end":return e.stop()}}),e,this)}))),pe.apply(this,arguments)}function he(e){return le.apply(this,arguments)}function le(){return le=Object(u["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,ge(he,t,L);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),le.apply(this,arguments)}function de(e){return fe.apply(this,arguments)}function fe(){return fe=Object(u["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,ge(de,t,J);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),fe.apply(this,arguments)}function ge(e,t,n){return we.apply(this,arguments)}function we(){return we=Object(u["a"])(regeneratorRuntime.mark((function e(t,n,r){var a,i,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.shape){e.next=6;break}return e.next=3,h(r);case 3:t.shape=e.sent,d(t.shape),m.addChild(t.shape);case 6:return a=n.getBounds(),i=t.shape.getBounds(),c={x:n.x+(a.width-i.width)/2,y:n.y+(a.width+i.width/2)},t.shape.set(c),t.shape.visible=!0,e.abrupt("return",new Promise((function(e){ae(t.shape,(function(){t.shape.visible=!1,e()}))})));case 12:case"end":return e.stop()}}),e)}))),we.apply(this,arguments)}window.disabledClick=!1,K.count=0;var me={props:["options"],data:function(){return{soundContent:j,soundUtil:O}},computed:{width:function(){return this.options.width},height:function(){return this.options.height}},mounted:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.$refs.stage,t.next=3,D(n);case 3:case"end":return t.stop()}}),t)})))()},methods:{playSound:R,play:function(){K()}}},ve=me,xe=(n("825f"),n("2877")),be=Object(xe["a"])(ve,c,o,!1,null,null,null),ye=be.exports,je=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("canvas",{ref:"stage",attrs:{width:e.width,height:e.height}})])},Oe=[],ke={props:["options"],data:function(){return{}},computed:{width:function(){return this.options.width},height:function(){return this.options.height}},mounted:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var n,r,a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=new createjs.Stage(e.$refs.stage),r=new createjs.Container,r.x=300,r.y=300,r.regX=100,r.regY=100,t.next=8,h(path,{});case 8:return a=t.sent,t.next=11,h(path2);case 11:i=t.sent,a.on("mousedown",l),a.on("pressmove",g(n)),createjs.Tween.get(a,{loop:!0}).to({alpha:.5,y:10},1e3,createjs.Ease.getPowInOut(2)).to({alpha:1,y:0},1e3,createjs.Ease.getPowInOut(2)),i.on("mousedown",l),i.on("pressmove",g(n)),r.addChild(a),r.addChild(i),n.addChild(r),createjs.Ticker.setFPS(40),createjs.Ticker.addEventListener("tick",n);case 22:case"end":return t.stop()}}),t)})))()},methods:{}},Re=ke,Se=Object(xe["a"])(Re,je,Oe,!1,null,null,null),Ce=Se.exports,Te={components:{Stage:ye,StageBitmap:Ce},data:function(){return{width:500,height:300,isShowStage:!1,scale:1}},name:"App",computed:{styleScale:function(){return{transform:"{transform:'scale(".concat(this.scale,")'}")}}},mounted:function(){var e=this,t=document.documentElement.clientWidth,n=document.documentElement.clientHeight;this.width=t,this.height=n,this.scale=t/1920,this.$nextTick((function(){console.log("App",t,n),e.isShowStage=!0}))}},Pe=Te,Ee=(n("034f"),Object(xe["a"])(Pe,a,i,!1,null,null,null)),_e=Ee.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(_e)}}).$mount("#app")},"825f":function(e,t,n){"use strict";n("9afd")},"85ec":function(e,t,n){},"9afd":function(e,t,n){}});
//# sourceMappingURL=app.af06a233.js.map