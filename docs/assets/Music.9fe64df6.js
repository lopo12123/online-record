var b=Object.defineProperty;var r=Object.getOwnPropertySymbols;var g=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var _=(e,t,o)=>t in e?b(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,m=(e,t)=>{for(var o in t||(t={}))g.call(t,o)&&_(e,o,t[o]);if(r)for(var o of r(t))v.call(t,o)&&_(e,o,t[o]);return e};import{_ as C,m as x}from"./index.ff65fe25.js";import{d as k,B as y,C as D,D as E,r as z,c as S,a as u,e as s,w as l,F as $,p as B,j as N,i,o as I,A as h}from"./vendor.5a35aa0c.js";var M="./assets/pointAndLine.5f8be24a.png";const T=k({name:"Music",components:{ElTable:y,ElTableColumn:D,ElButton:E},setup(){const e=z([]);let t=[];return x.forEach(n=>{e.value.push(m({},n))}),{listData:e,checkChanged:n=>{t=n.map(d=>d.path)},doDownload:(n,d)=>{if(n==="selected")$({type:"warning",message:"not support yet"}),console.log(t);else{const a=document.createElement("a");a.download=d+".mp3",a.target="_blank",a.href=n,a.click()}}}}}),j=e=>(B("data-v-7ed2bf81"),e=e(),N(),e),V={id:"music"},A=j(()=>u("img",{class:"music-bg",src:M,alt:""},null,-1)),L={class:"music-list-container"},F=h("download selected"),q=h("download this one");function G(e,t,o,f,n,d){const a=i("el-table-column"),p=i("el-button"),w=i("el-table");return I(),S("div",V,[A,u("div",L,[s(w,{height:"100%","row-class-name":"my-table-row",size:"small",data:e.listData,onSelectionChange:e.checkChanged},{default:l(()=>[s(a,{type:"selection",width:"50px"}),s(a,{type:"index",label:"No.",width:"80px"}),s(a,{prop:"name",label:"Name",width:"200px"}),s(a,{prop:"size",label:"Size",width:"120px"}),s(a,{width:"150px"},{header:l(()=>[s(p,{size:"small",type:"text",onClick:t[0]||(t[0]=c=>e.doDownload("selected","zipped"))},{default:l(()=>[F]),_:1})]),default:l(c=>[s(p,{size:"small",type:"text",onClick:H=>e.doDownload(c.row.path,c.row.name)},{default:l(()=>[q]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data","onSelectionChange"])])])}var P=C(T,[["render",G],["__scopeId","data-v-7ed2bf81"]]);export{P as default};
