(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[706],{8183:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/player",function(){return t(3332)}])},3332:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return r}});var o=t(5893),a=t(7294);function r(){let[e]=(0,a.useState)([]),[n,t]=(0,a.useState)(null);console.log("audio",n);let r=(0,a.useCallback)(e=>{var n;null===(n=window.parent)||void 0===n||n.postMessage(e,"*")},[]);return(0,a.useEffect)(()=>{if(!n)return;let e=e=>{console.log("onPlay event",e),r({type:"play"})},t=e=>{console.log("onTimeUpdate event",e),r({type:"timeupdate",currentTime:e.currentTarget.currentTime})},o=e=>{console.log("onPause event",e),r({type:"pause"})},a=e=>{console.log("onVolumeChange event",e),r({type:"volumechange",volume:e.currentTarget.volume})},s=e=>{console.log("onSeeded event",e)};return n.addEventListener("play",e),n.addEventListener("pause",o),n.addEventListener("timeupdate",t),n.addEventListener("seeked",s),n.addEventListener("volumechange",a),()=>{n.removeEventListener("play",e),n.removeEventListener("pause",o),n.removeEventListener("timeupdate",t),n.removeEventListener("seeked",s),n.removeEventListener("volumechange",a)}},[n,r]),(0,a.useEffect)(()=>{if(!n)return;setTimeout(()=>{r({type:"loaded",duration:n.duration,volume:n.volume})},1e3);let e=e=>{switch(console.log("iFrame window message event",e),console.log("iFrame window message type",e.data.type),e.data.type){case"play":n.play();break;case"pause":n.pause();break;case"volume":n.volume=e.data.volume;break;case"seed":n.currentTime=e.data.currentTime}};return window.addEventListener("message",e),()=>{window.removeEventListener("message",e)}},[n,r]),(0,o.jsxs)("div",{children:[(0,o.jsx)("audio",{ref:t,controls:!0,src:"https://actions.google.com/sounds/v1/ambiences/arcade_room.ogg"}),(0,o.jsx)("pre",{children:e.length?JSON.stringify(e,void 0,2):null})]})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8183)}),_N_E=e.O()}]);