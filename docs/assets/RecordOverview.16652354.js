import{b as C,i as O,v as U,c as x}from"./v4.6627ac39.js";import{p as N}from"./index.5ff6eeb4.js";import{_ as B}from"./index.87f993cf.js";import{d as F,C as u,M as P,N as $,O as j,K as J,L as z,m as A,A as L,P as M,Q as G,R as Y,B as K,S as Q,T as W,U as q,r as g,V as H,W as X,c as Z,a,h as e,w as n,G as ee,s as oe,D as te,i as r,F as ae,o as k,e as _,t as ne,p as se,b as le}from"./vendor.4ddb49f8.js";import"./manifest.06f50b31.js";const de=F({name:"RecordOverview",components:{ElMessage:u,ElDropdown:P,ElDropdownMenu:$,ElDropdownItem:j,ElTable:J,ElTableColumn:z,ElDialog:A,ElInput:L,ElInputNumber:M,ElRadioGroup:G,ElRadioButton:Y,ElButton:K,ElTag:Q,ElPagination:W},setup(){const o=()=>{V.value&&V.value.doLayout()};window.addEventListener("resize",o),q(()=>{window.removeEventListener("resize",o)});const t=te("userState"),v=g(!1),V=g(null),R=g(1),S=g(1),p=g([]),c=g([]),E=H(()=>c.value.slice(R.value*30-30,R.value*30)),D=()=>{t.value.login?(v.value=!0,C(t.value.userToken).then(i=>{p.value=JSON.parse(JSON.stringify(i)),c.value=JSON.parse(JSON.stringify(i)),v.value=!1}).catch(i=>{i.toString()==="Error: ENotFound"?(u({type:"info",message:"This is the first login, the database will automatically created in few seconds"}),O(t.value.userToken).then(()=>{u({type:"info",message:"Database created successfully"}),v.value=!1}).catch(w=>{u({type:"error",message:w.toString()}),v.value=!1})):(u({type:"error",message:i.toString()}),v.value=!1)})):u({type:"info",message:"You are not logged in, please log in first"})};D();const f=i=>{const[w,m]=i.split(",");switch(w){case"reset":c.value=JSON.parse(JSON.stringify(p.value));break;case"value":c.value.sort((h,y)=>(parseFloat(h.value+"")-parseFloat(y.value+""))*(m==="asc"?1:-1));break;case"date":c.value.sort((h,y)=>(N(h.date)-N(y.date))*(m==="asc"?1:-1));break}},b=g(!1),d=X({value:0,date:N(Date.now()),flow:"IN",type:"",note:""});return{loading:v,tableRef:V,handleSort:f,newRecord:d,handleNew:i=>{if(i==="show")d.value=0,d.date=N(Date.now()),d.flow="IN",d.type="",d.note="",b.value=!0;else if(i==="create"){if(b.value=!1,d.value===0){u({type:"info",message:"Value cannot be 0"});return}if(!t.value.login){u({type:"info",message:"You are not logged in, please log in first"});return}const w={uuid:U(),value:d.value+"",date:d.date,flow:d.flow,type:d.type,note:d.note};u({type:"info",message:"Adding new record"}),x(t.value.userToken,w).then(()=>{u({type:"info",message:"Reloading record list"}),D()}).catch(m=>{u({type:"error",message:m.toString()})})}},newRecordDialogVisible:b,tableData:E,currentPage:R,totalPage:S}}}),l=o=>(se("data-v-16dcbd52"),o=o(),le(),o),ie={id:"record-overview"},re={class:"overview-banner-container"},ce=l(()=>a("i",{class:"iconfont icon-sort"},null,-1)),ue=l(()=>a("span",{style:{"margin-left":"5px"}},"sort",-1)),pe=l(()=>a("i",{class:"iconfont icon-iconasc"},null,-1)),_e=_(" value"),fe=l(()=>a("i",{class:"iconfont icon-iconsort"},null,-1)),me=_(" value"),ve=l(()=>a("i",{class:"iconfont icon-iconasc"},null,-1)),we=_(" date"),ge=l(()=>a("i",{class:"iconfont icon-iconsort"},null,-1)),be=_(" date"),he=l(()=>a("i",{class:"iconfont icon-record"},null,-1)),ye=_(" reset"),Ve=l(()=>a("i",{class:"iconfont icon-filter-fill"},null,-1)),Re=l(()=>a("span",{style:{"margin-left":"5px"}},"filter",-1)),De=l(()=>a("i",{class:"iconfont icon-add"},null,-1)),Ne=l(()=>a("span",{style:{"margin-left":"5px"}},"new",-1)),Ee={class:"overview-table-container"},Se=_("Edit"),Te=_("Delete"),ke={class:"new-record-dialog"},Ie={class:"value"},Ce=l(()=>a("span",{class:"info-text"},"Value",-1)),Oe={class:"flow"},Ue=l(()=>a("span",{class:"info-text"},"Flow",-1)),xe={class:"date"},Be=l(()=>a("span",{class:"info-text"},"Date",-1)),Fe={class:"type"},Pe=l(()=>a("span",{class:"info-text"},"Type",-1)),$e={class:"note"},je=l(()=>a("span",{class:"info-text"},"Note",-1)),Je={class:"btn-group"},ze=_("Cancel"),Ae=_("Create"),Le={class:"overview-pager-container"};function Me(o,t,v,V,R,S){const p=r("el-button"),c=r("el-dropdown-item"),E=r("el-dropdown-menu"),D=r("el-dropdown"),f=r("el-table-column"),b=r("el-tag"),d=r("el-table"),T=r("el-input-number"),i=r("el-radio-button"),w=r("el-radio-group"),m=r("el-input"),h=r("el-dialog"),y=r("el-pagination"),I=ae("loading");return k(),Z("div",ie,[a("div",re,[e(D,{onCommand:o.handleSort},{dropdown:n(()=>[e(E,null,{default:n(()=>[e(c,{command:"value,asc"},{default:n(()=>[pe,_e]),_:1}),e(c,{command:"value,desc"},{default:n(()=>[fe,me]),_:1}),e(c,{command:"date,asc"},{default:n(()=>[ve,we]),_:1}),e(c,{command:"date,desc"},{default:n(()=>[ge,be]),_:1}),e(c,{command:"reset,none",divided:""},{default:n(()=>[he,ye]),_:1})]),_:1})]),default:n(()=>[e(p,{type:"info",plain:""},{default:n(()=>[ce,ue]),_:1})]),_:1},8,["onCommand"]),e(p,{type:"info",plain:"",disabled:""},{default:n(()=>[Ve,Re]),_:1}),e(p,{type:"info",plain:"",onClick:t[0]||(t[0]=s=>o.handleNew("show"))},{default:n(()=>[De,Ne]),_:1})]),a("div",Ee,[ee((k(),oe(d,{ref:"tableRef",data:o.tableData,height:"100%",border:"",stripe:"","empty-text":"No Record"},{default:n(()=>[e(f,{width:"50px",type:"index",label:"No.",fixed:"left"}),e(f,{width:"100px",prop:"value",label:"Value"}),e(f,{width:"200px",prop:"date",label:"Date"}),e(f,{width:"60px",label:"Flow"},{default:n(s=>[e(b,{type:s.row.flow==="IN"?"success":"danger"},{default:n(()=>[_(ne(s.row.flow==="IN"?"\u5165":"\u51FA"),1)]),_:2},1032,["type"])]),_:1}),e(f,{width:"150px",prop:"type",label:"Type"}),e(f,{prop:"note",label:"Note"}),e(f,{width:"100px",label:"Operate",fixed:"right"},{default:n(()=>[e(p,{type:"text",size:"small",disabled:""},{default:n(()=>[Se]),_:1}),e(p,{type:"text",size:"small",disabled:""},{default:n(()=>[Te]),_:1})]),_:1})]),_:1},8,["data"])),[[I,o.loading]]),e(h,{modelValue:o.newRecordDialogVisible,"onUpdate:modelValue":t[8]||(t[8]=s=>o.newRecordDialogVisible=s),width:"300px"},{default:n(()=>[a("div",ke,[a("div",Ie,[Ce,e(T,{class:"item-value",modelValue:o.newRecord.value,"onUpdate:modelValue":t[1]||(t[1]=s=>o.newRecord.value=s),type:"number"},null,8,["modelValue"])]),a("div",Oe,[Ue,e(w,{class:"item-value",modelValue:o.newRecord.flow,"onUpdate:modelValue":t[2]||(t[2]=s=>o.newRecord.flow=s)},{default:n(()=>[e(i,{label:"IN"}),e(i,{label:"OUT"})]),_:1},8,["modelValue"])]),a("div",xe,[Be,e(m,{class:"item-value",modelValue:o.newRecord.date,"onUpdate:modelValue":t[3]||(t[3]=s=>o.newRecord.date=s),disabled:""},null,8,["modelValue"])]),a("div",Fe,[Pe,e(m,{class:"item-value",modelValue:o.newRecord.type,"onUpdate:modelValue":t[4]||(t[4]=s=>o.newRecord.type=s)},null,8,["modelValue"])]),a("div",$e,[je,e(m,{class:"item-value",modelValue:o.newRecord.note,"onUpdate:modelValue":t[5]||(t[5]=s=>o.newRecord.note=s)},null,8,["modelValue"])]),a("div",Je,[e(p,{type:"info",onClick:t[6]||(t[6]=s=>o.newRecordDialogVisible=!1)},{default:n(()=>[ze]),_:1}),e(p,{type:"primary",onClick:t[7]||(t[7]=s=>o.handleNew("create"))},{default:n(()=>[Ae]),_:1})])])]),_:1},8,["modelValue"])]),a("div",Le,[e(y,{background:"",layout:"prev, pager, next","page-size":30,total:o.totalPage,"current-page":o.currentPage,"onUpdate:current-page":t[9]||(t[9]=s=>o.currentPage=s)},null,8,["total","current-page"])])])}var qe=B(de,[["render",Me],["__scopeId","data-v-16dcbd52"]]);export{qe as default};
