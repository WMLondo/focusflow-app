import{j as e,r as c}from"./index-da7f7843.js";const a="_title_nehxw_1",n={title:a},l=()=>e.jsx("h1",{className:n.title,children:"Focusflow"}),o="_header_pwn4z_1",i={header:o},h="_clock_he2vh_1",u={clock:h},d=()=>{const[t,s]=c.useState("");return c.useEffect(()=>{s(new Date().toLocaleTimeString());const r=setInterval(()=>{s(new Date().toLocaleTimeString())},1e3);return()=>clearInterval(r)},[t]),e.jsx("span",{className:u.clock,children:t})},x=()=>e.jsxs("header",{className:i.header,children:[e.jsx(l,{}),e.jsx(d,{})]});export{x as default};
