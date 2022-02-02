import{d as k,r as c,c as g,a as r,t as v,o as _,E,b as z,u as B,e as f,n as L,f as C,g as T,w as M,h as H,i as p,p as j,j as x,k as R,l as V,m as A,q as F}from"./vendor.9b42aaa6.js";const J=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}};J();const q="modulepreload",I={},G="./",O=function(e,n){return!n||n.length===0?e():Promise.all(n.map(a=>{if(a=`${G}${a}`,a in I)return;I[a]=!0;const o=a.endsWith(".css"),s=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${s}`))return;const i=document.createElement("link");if(i.rel=o?"stylesheet":q,o||(i.as="script",i.crossOrigin=""),i.href=a,document.head.appendChild(i),o)return new Promise((u,l)=>{i.addEventListener("load",u),i.addEventListener("error",l)})})).then(()=>e())};var $=(t,e)=>{const n=t.__vccOpts||t;for(const[a,o]of e)n[a]=o;return n};const W=k({name:"DateTimeBox",setup(){const t=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],e=c(""),n=c(""),a=c(""),o=()=>{e.value=new Date().toLocaleDateString("zh-cn").split("/").map(s=>parseInt(s)<10?"0"+s:s).join("-"),n.value=new Date().toLocaleTimeString("zh-cn",{hour12:!1}),a.value=t[new Date().getDay()]};return o(),setInterval(o,1e3),{dateStr:e,timeStr:n,dayStr:a}}}),K={id:"date-time-box"},Q={class:"time-str"},U={class:"date-str"},X={class:"day-str"};function Z(t,e,n,a,o,s){return _(),g("div",K,[r("span",Q,v(t.timeStr),1),r("span",U,v(t.dateStr),1),r("span",X,v(t.dayStr),1)])}var Y=$(W,[["render",Z],["__scopeId","data-v-d1dd9810"]]);const Oe="lopo12123",De="lopo12123-back",Ee="OcJzsZRQDKwO4g8Cfi0pTOT2pf4hcJ0gqDiX",b=[{name:"beauty",path:"./music/beauty.mp3",size:"3.08MB"},{name:"calling",path:"./music/calling.mp3",size:"2.97MB"},{name:"dark&moody",path:"./music/dark&moody.mp3",size:"3.04MB"},{name:"forgiven",path:"./music/forgiven.mp3",size:"3.01MB"},{name:"holy",path:"./music/holy.mp3",size:"3.15MB"},{name:"paradise",path:"./music/paradise.mp3",size:"2.83MB"},{name:"preasure",path:"./music/preasure.mp3",size:"3.13MB"},{name:"run",path:"./music/run.mp3",size:"3.13MB"},{name:"the_one",path:"./music/the_one.mp3",size:"2.66MB"},{name:"the_otherside",path:"./music/the_otherside.mp3",size:"3.33MB"},{name:"youth",path:"./music/youth.mp3",size:"3.11MB"}];const ee=k({name:"MusicPlayer",components:{ElProgress:E,ElDialog:z},setup(){const t=B();let e=0;const n=c(null),a=c(b[0].path),o=c("Pause"),s=c(0),i=d=>{s.value=parseInt((d.target.currentTime*100/d.target.duration).toFixed(0)),s.value=isNaN(s.value)?0:s.value},u=d=>{if(!!n.value)switch(d){case"Jump":t.push({name:"Music"});break;case"Prev":e=e===0?b.length-1:e-1,a.value=b[e].path;break;case"Pause":n.value.pause(),o.value="Pause";break;case"Play":o.value="Playing",n.value.play();break;case"Next":e=e===b.length-1?0:e+1,s.value=0,n.value.src=b[e].path;break}},l=c(!0),w=c(""),S=c(""),N=localStorage.getItem("oneNote");try{if(!N)throw new Error("no storage");const d=JSON.parse(N);if(d.dateString!==new Date().toLocaleDateString())throw new Error("out of date");let{hitokoto:h,from:y,from_who:m}=d;w.value=h,S.value=(y?"-- "+y:"")+(m?"\u300A"+m+"\u300B":""),l.value=!0}catch{fetch("https://v1.hitokoto.cn?c=d&c=k").then(h=>h.json()).then(h=>{let{hitokoto:y,from:m,from_who:P}=h;w.value=y,S.value=(m?"-- "+m:"")+(P?"\u300A"+P+"\u300B":""),l.value=!0,localStorage.setItem("oneNote",JSON.stringify({dateString:new Date().toLocaleDateString(),hitokoto:y,from:m,from_who:P}))}).catch(()=>{})}return{audioRef:n,audioSrc:a,playState:o,playProgress:s,updateProgress:i,doOperate:u,visible:l,noteStr:w,fromStr:S,oneNoteClose:()=>{}}}}),D=t=>(j("data-v-32ebe578"),t=t(),x(),t),te={id:"music-player"},oe=["src"],se={class:"show-progress"},ne={class:"one-note"},ae=D(()=>r("br",null,null,-1)),re={style:{"text-align":"right"}},ie=D(()=>r("div",{class:"close-info"}," Click anywhere else to close. ",-1));function le(t,e,n,a,o,s){const i=p("el-progress"),u=p("el-dialog");return _(),g("div",te,[r("audio",{ref:"audioRef",src:t.audioSrc,onTimeupdate:e[0]||(e[0]=(...l)=>t.updateProgress&&t.updateProgress(...l)),onEnded:e[1]||(e[1]=l=>t.doOperate("Next")),style:{display:"none"}},null,40,oe),r("div",se,[f(i,{percentage:t.playProgress,color:"#00ffff","stroke-width":3,"show-text":!1,style:L(`opacity: ${t.playState==="Playing"?"0.8":"0.5"}`)},null,8,["percentage","style"])]),r("span",{class:"player-logo",title:"\u70B9\u51FB\u524D\u5F80\u97F3\u4E50\u754C\u9762",onClick:e[2]||(e[2]=l=>t.doOperate("Jump"))},"lopo"),r("i",{class:"iconfont icon-shangyishoushangyige",onClick:e[3]||(e[3]=l=>t.doOperate("Prev"))}),r("i",{class:C(["iconfont","icon-24gl-pause",{"i-active":t.playState==="Pause"}]),onClick:e[4]||(e[4]=l=>t.doOperate("Pause"))},null,2),r("i",{class:C(["iconfont","icon-24gl-play",{"i-active":t.playState==="Playing"}]),onClick:e[5]||(e[5]=l=>t.doOperate("Play"))},null,2),r("i",{class:"iconfont icon-shangyishoushangyige1",onClick:e[6]||(e[6]=l=>t.doOperate("Next"))}),t.visible?(_(),T(u,{key:0,modelValue:t.visible,"onUpdate:modelValue":e[7]||(e[7]=l=>t.visible=l),width:"fit-content","show-close":!1,"destroy-on-close":!0,onClose:t.oneNoteClose},{footer:M(()=>[ie]),default:M(()=>[r("div",ne,[r("div",null,v(t.noteStr),1),ae,r("div",re,v(t.fromStr),1)])]),_:1},8,["modelValue","onClose"])):H("",!0)])}var ce=$(ee,[["render",le],["__scopeId","data-v-32ebe578"]]);const ue="1.0.2-beta";const de=k({name:"NavBar",components:{DateTimeBox:Y,MusicPlayer:ce},setup(){const t=B();return{version:ue,goto:n=>{switch(n){case"Home":t.push({name:"Home"});break;case"GitHub":window.open("https://github.com/lopo12123");break;case"NPM":window.open("https://www.npmjs.com/~lopo12123","_blank");break}}}}}),pe={id:"nav-bar"},me={class:"version-info"};function ve(t,e,n,a,o,s){const i=p("music-player"),u=p("date-time-box");return _(),g("div",pe,[r("div",me," v "+v(t.version),1),f(i),f(u),r("div",{class:"nav-bar-button",onClick:e[0]||(e[0]=l=>t.goto("Home"))}," Home "),r("div",{class:"nav-bar-button",onClick:e[1]||(e[1]=l=>t.goto("GitHub"))}," GitHub "),r("div",{class:"nav-bar-button",onClick:e[2]||(e[2]=l=>t.goto("NPM"))}," NPM ")])}var _e=$(de,[["render",ve],["__scopeId","data-v-578c0cfc"]]);const fe=k({name:"Index",components:{NavBar:_e}}),he={id:"index"},ye={class:"nav-bar-container"},ge={class:"body-container"};function $e(t,e,n,a,o,s){const i=p("nav-bar"),u=p("router-view");return _(),g("div",he,[r("div",ye,[f(i)]),r("div",ge,[f(u)])])}var be=$(fe,[["render",$e],["__scopeId","data-v-4b24180d"]]);const ke=[{path:"/",redirect:{name:"Index"}},{path:"/index",name:"Index",component:be,redirect:{name:"Home"},children:[{path:"home",name:"Home",component:()=>O(()=>import("./Home.699e1905.js"),["assets/Home.699e1905.js","assets/Home.8910e718.css","assets/vendor.9b42aaa6.js"])},{path:"music",name:"Music",component:()=>O(()=>import("./Music.01bc6bf3.js"),["assets/Music.01bc6bf3.js","assets/Music.0c3d913c.css","assets/vendor.9b42aaa6.js"])}]}],we={history:R(),routes:ke},Se={},Pe={id:"app"};function Ne(t,e){const n=p("router-view");return _(),g("div",Pe,[f(n)])}var Be=$(Se,[["render",Ne]]);const Ce=V(we);A(Be).use(Ce).use(F).mount("#app");export{$ as _,b as m,De as r,Ee as t,Oe as u};