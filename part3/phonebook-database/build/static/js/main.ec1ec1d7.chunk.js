(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(17),a=t.n(c),o=t(8),s=t(4),u=t(3),r=t.n(u),i=t(2),l="/api/persons",d=function(){return r.a.get(l)},m=function(e){return r.a.post(l,e).then((function(e){return e.data}))},h=function(e,n){return r.a.put("".concat(l,"/").concat(e),n).then((function(e){return e.data}))},f=t(0),b=function(e){var n=e.notification;return null===n.message?null:Object(f.jsx)("div",{className:n.style,children:n.message})},j=function(e){return Object(f.jsxs)("div",{children:["filter shown with",Object(f.jsx)("input",{value:e.show,onChange:e.handleShowChange})]})},O=function(e){return Object(f.jsxs)("form",{onSubmit:e.addName,children:[Object(f.jsxs)("div",{children:["name:",Object(f.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(f.jsxs)("div",{children:["number:",Object(f.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{type:"submit",children:"add"})})]})},g=function(e){return e.name.includes(e.show)?Object(f.jsx)("div",{children:Object(f.jsxs)("p",{children:[e.name," "," ",e.number,Object(f.jsx)("button",{onClick:function(){return e.deletePerson(e.id)},children:"delete"})]})}):Object(f.jsx)("p",{children:" "})},p=function(){var e=Object(i.useState)([]),n=Object(s.a)(e,2),t=n[0],c=n[1],a=Object(i.useState)(""),u=Object(s.a)(a,2),l=u[0],p=u[1],x=Object(i.useState)(""),v=Object(s.a)(x,2),w=v[0],y=v[1],N=Object(i.useState)(""),C=Object(s.a)(N,2),S=C[0],k=C[1],T=Object(i.useState)({message:null,style:null}),I=Object(s.a)(T,2),P=I[0],A=I[1];Object(i.useEffect)((function(){d().then((function(e){c(e.data)})).catch((function(e){console.log(e)}))}),[]);var D=function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&r.a.delete("/api/persons/".concat(e)).then((function(n){return c(t.filter((function(n){return n.id!==e})))})).catch((function(e){A({message:"Information about ".concat(n.name," already deleted from the server"),style:"error"}),setTimeout((function(){A({message:null,style:null})}),5e3),c(t.filter((function(e){return e.id!==n.id})))}))};return Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"Phonebook"}),Object(f.jsx)(b,{notification:P}),Object(f.jsx)(j,{show:S,handleShowChange:function(e){k(e.target.value)}}),Object(f.jsx)("h3",{children:"Add a new"}),Object(f.jsx)(O,{addName:function(e){if(e.preventDefault(),t.map((function(e){return e.name})).includes(l)){window.confirm("".concat(l," is already added to phonebook, replace the old number?"));var n=t.find((function(e){return e.name===l})),a=Object(o.a)(Object(o.a)({},n),{},{number:w});console.log(a),h(n.id,a).then((function(e){c(t.map((function(t){return t.id!==n.id?t:e}))),p(""),y(""),A({message:"Updated ".concat(l),style:"success"}),setTimeout((function(){A({message:null,style:null})}),5e3)})).catch((function(e){A({message:"Information of ".concat(l," already deleted from the server"),style:"error"}),setTimeout((function(){A({message:null,style:null})}),5e3),c(t.filter((function(e){return e.id!==n.id})))}))}else{m({name:l,number:w}).then((function(e){c(t.concat(e)),p(""),y(""),A({message:"Added ".concat(l),style:"success"}),setTimeout((function(){A({message:null,style:null})}),5e3)})).catch((function(e){console.log(e.response.data),A({message:"".concat(e.response.data),style:"error"}),setTimeout((function(){A({message:null,style:null})}),5e3)}))}},newName:l,handleNameChange:function(e){p(e.target.value)},newNumber:w,handleNumberChange:function(e){y(e.target.value)}}),Object(f.jsx)("h3",{children:"Numbers"}),t.map((function(e){return Object(f.jsx)(g,{name:e.name,number:e.number,show:S,id:e.id,deletePerson:D},e.name)}))]})};t(41);a.a.render(Object(f.jsx)(p,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.ec1ec1d7.chunk.js.map