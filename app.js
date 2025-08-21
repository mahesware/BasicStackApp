const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send(html));
let stack = [];
app.post("/push",(req,res)=>{
 if(req.body && req.body.value){
  stack.push(req.body.value)
  return res.json({stack})
 }
 else return res.status(400).send("please pass a value");
});
app.post("/pop",(req,res) => {
 if(stack.length == 0) return 
 res.status(400).send("Stack is empty");
 const value = stack.pop();
 res.json({popped:value,stack:stack});
});
app.get("/stack",(req,res) => {
 res.json({stack});
});


const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
    <form id="stackAppForm">
    <label> Stack Size:</label>
    <input type="text" id="size"  placeholder="Enter Stack Size" required/> 
    <br/>
    <label> Value:</label>
    <input type="text" id="value" placeholder="Enter a value to push in to the stack" />
    <br/>
    <button type="button" id="push" >Push</button>
    <br/>
    <button type="button" id="pop" > Pop</button>
    <div id="stack"></div>
    </form>
    </section>
    <script>
     document.getElementById("push").addEventListener("click",async(e) =>{
     const value = document.getElementById("value").value.trim();
     console.log('user has tried to push the data..',value);
     const res = await fetch("/push",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify{value}});
     const data = await res.json();
     document.getElementById("stack").innerText ="Stack: "+data.stack.join(", ");
     })
     document.getElementById("pop").addEventListener("click",async(e) =>{
     alert('user has tried to pop the data..');
     })
    </script>
  </body>
</html>
`
