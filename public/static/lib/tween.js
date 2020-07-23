/**
 * Minified by jsDelivr using UglifyJS v3.4.1.
 * Original file: /npm/tween.js@16.6.0/src/Tween.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var TWEEN=TWEEN||function(){var i=[];return{getAll:function(){return i},removeAll:function(){i=[]},add:function(n){i.push(n)},remove:function(n){var t=i.indexOf(n);-1!==t&&i.splice(t,1)},update:function(n,t){if(0===i.length)return!1;var r=0;for(n=void 0!==n?n:TWEEN.now();r<i.length;)i[r].update(n)||t?r++:i.splice(r,1);return!0}}}();"undefined"==typeof window&&"undefined"!=typeof process?TWEEN.now=function(){var n=process.hrtime();return 1e3*n[0]+n[1]/1e6}:"undefined"!=typeof window&&void 0!==window.performance&&void 0!==window.performance.now?TWEEN.now=window.performance.now.bind(window.performance):void 0!==Date.now?TWEEN.now=Date.now:TWEEN.now=function(){return(new Date).getTime()},TWEEN.Tween=function(n){var c,s=n,h={},l={},E={},p=1e3,d=0,w=!1,r=!1,v=!1,I=0,M=null,T=TWEEN.Easing.Linear.None,N=TWEEN.Interpolation.Linear,W=[],O=null,m=!1,g=null,y=null,t=null;this.to=function(n,t){return l=n,void 0!==t&&(p=t),this},this.start=function(n){for(var t in TWEEN.add(this),m=!(r=!0),M=void 0!==n?n:TWEEN.now(),M+=I,l){if(l[t]instanceof Array){if(0===l[t].length)continue;l[t]=[s[t]].concat(l[t])}void 0!==s[t]&&(h[t]=s[t],h[t]instanceof Array==!1&&(h[t]*=1),E[t]=h[t]||0)}return this},this.stop=function(){return r&&(TWEEN.remove(this),r=!1,null!==t&&t.call(s,s),this.stopChainedTweens()),this},this.end=function(){return this.update(M+p),this},this.stopChainedTweens=function(){for(var n=0,t=W.length;n<t;n++)W[n].stop()},this.delay=function(n){return I=n,this},this.repeat=function(n){return d=n,this},this.repeatDelay=function(n){return c=n,this},this.yoyo=function(n){return w=n,this},this.easing=function(n){return T=n,this},this.interpolation=function(n){return N=n,this},this.chain=function(){return W=arguments,this},this.onStart=function(n){return O=n,this},this.onUpdate=function(n){return g=n,this},this.onComplete=function(n){return y=n,this},this.onStop=function(n){return t=n,this},this.update=function(n){var t,r,i;if(n<M)return!0;for(t in!1===m&&(null!==O&&O.call(s,s),m=!0),i=T(r=1<(r=(n-M)/p)?1:r),l)if(void 0!==h[t]){var u=h[t]||0,e=l[t];e instanceof Array?s[t]=N(e,i):("string"==typeof e&&(e="+"===e.charAt(0)||"-"===e.charAt(0)?u+parseFloat(e):parseFloat(e)),"number"==typeof e&&(s[t]=u+(e-u)*i))}if(null!==g&&g.call(s,i),1===r){if(0<d){for(t in isFinite(d)&&d--,E){if("string"==typeof l[t]&&(E[t]=E[t]+parseFloat(l[t])),w){var o=E[t];E[t]=l[t],l[t]=o}h[t]=E[t]}return w&&(v=!v),M=void 0!==c?n+c:n+I,!0}null!==y&&y.call(s,s);for(var a=0,f=W.length;a<f;a++)W[a].start(M+p);return!1}return!0}},TWEEN.Easing={Linear:{None:function(n){return n}},Quadratic:{In:function(n){return n*n},Out:function(n){return n*(2-n)},InOut:function(n){return(n*=2)<1?.5*n*n:-.5*(--n*(n-2)-1)}},Cubic:{In:function(n){return n*n*n},Out:function(n){return--n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n:.5*((n-=2)*n*n+2)}},Quartic:{In:function(n){return n*n*n*n},Out:function(n){return 1- --n*n*n*n},InOut:function(n){return(n*=2)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2)}},Quintic:{In:function(n){return n*n*n*n*n},Out:function(n){return--n*n*n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2)}},Sinusoidal:{In:function(n){return 1-Math.cos(n*Math.PI/2)},Out:function(n){return Math.sin(n*Math.PI/2)},InOut:function(n){return.5*(1-Math.cos(Math.PI*n))}},Exponential:{In:function(n){return 0===n?0:Math.pow(1024,n-1)},Out:function(n){return 1===n?1:1-Math.pow(2,-10*n)},InOut:function(n){return 0===n?0:1===n?1:(n*=2)<1?.5*Math.pow(1024,n-1):.5*(2-Math.pow(2,-10*(n-1)))}},Circular:{In:function(n){return 1-Math.sqrt(1-n*n)},Out:function(n){return Math.sqrt(1- --n*n)},InOut:function(n){return(n*=2)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1)}},Elastic:{In:function(n){return 0===n?0:1===n?1:-Math.pow(2,10*(n-1))*Math.sin(5*(n-1.1)*Math.PI)},Out:function(n){return 0===n?0:1===n?1:Math.pow(2,-10*n)*Math.sin(5*(n-.1)*Math.PI)+1},InOut:function(n){return 0===n?0:1===n?1:(n*=2)<1?-.5*Math.pow(2,10*(n-1))*Math.sin(5*(n-1.1)*Math.PI):.5*Math.pow(2,-10*(n-1))*Math.sin(5*(n-1.1)*Math.PI)+1}},Back:{In:function(n){return n*n*(2.70158*n-1.70158)},Out:function(n){return--n*n*(2.70158*n+1.70158)+1},InOut:function(n){var t=2.5949095;return(n*=2)<1?n*n*((t+1)*n-t)*.5:.5*((n-=2)*n*((t+1)*n+t)+2)}},Bounce:{In:function(n){return 1-TWEEN.Easing.Bounce.Out(1-n)},Out:function(n){return n<1/2.75?7.5625*n*n:n<2/2.75?7.5625*(n-=1.5/2.75)*n+.75:n<2.5/2.75?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},InOut:function(n){return n<.5?.5*TWEEN.Easing.Bounce.In(2*n):.5*TWEEN.Easing.Bounce.Out(2*n-1)+.5}}},TWEEN.Interpolation={Linear:function(n,t){var r=n.length-1,i=r*t,u=Math.floor(i),e=TWEEN.Interpolation.Utils.Linear;return t<0?e(n[0],n[1],i):1<t?e(n[r],n[r-1],r-i):e(n[u],n[r<u+1?r:u+1],i-u)},Bezier:function(n,t){for(var r=0,i=n.length-1,u=Math.pow,e=TWEEN.Interpolation.Utils.Bernstein,o=0;o<=i;o++)r+=u(1-t,i-o)*u(t,o)*n[o]*e(i,o);return r},CatmullRom:function(n,t){var r=n.length-1,i=r*t,u=Math.floor(i),e=TWEEN.Interpolation.Utils.CatmullRom;return n[0]===n[r]?(t<0&&(u=Math.floor(i=r*(1+t))),e(n[(u-1+r)%r],n[u],n[(u+1)%r],n[(u+2)%r],i-u)):t<0?n[0]-(e(n[0],n[0],n[1],n[1],-i)-n[0]):1<t?n[r]-(e(n[r],n[r],n[r-1],n[r-1],i-r)-n[r]):e(n[u?u-1:0],n[u],n[r<u+1?r:u+1],n[r<u+2?r:u+2],i-u)},Utils:{Linear:function(n,t,r){return(t-n)*r+n},Bernstein:function(n,t){var r=TWEEN.Interpolation.Utils.Factorial;return r(n)/r(t)/r(n-t)},Factorial:function(){var i=[1];return function(n){var t=1;if(i[n])return i[n];for(var r=n;1<r;r--)t*=r;return i[n]=t}}(),CatmullRom:function(n,t,r,i,u){var e=.5*(r-n),o=.5*(i-t),a=u*u;return(2*t-2*r+e+o)*(u*a)+(-3*t+3*r-2*e-o)*a+e*u+t}}},function(n){"function"==typeof define&&define.amd?define([],function(){return TWEEN}):"undefined"!=typeof module&&"object"==typeof exports?module.exports=TWEEN:void 0!==n&&(n.TWEEN=TWEEN)}(this);
//# sourceMappingURL=/sm/761d9579dd6e541875b59d6d3aaa09689daf1881899454e4e8a930fba055dad0.map