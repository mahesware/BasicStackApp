const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.get("/", (req, res) => res.type('html').send(html));
let stack = [];
let maxsize = 0;

app.post("/setStackSize",(req,res)=>{
 if(req.body && req.body.value){
  if(req.body.value <=0) return res.status(400).send('invalid size')
  else{
   maxsize = req.body.value;
   stack = [];
   return res.json({message:`Stack size set to ${req.body.value}`});
  }
 }
 else return res.status(400).send("please pass a value");
});
app.post("/push",(req,res)=>{
 console.log('request for push:');
 console.log(req.body);
 if(req.body && req.body.value){
  if(maxsize ==0) return res.status(400).send('Define the stack size before pushing the values');
  if(stack.length >= maxsize)  return res.status(400).send("Stack overflow: Maxsize reached!");
  else {
   stack.push(req.body.value)
   return res.json({stack})
  }
 }
 else return res.status(400).send("please pass a value");
});
app.post("/pop",(req,res) => {
 if(stack.length == 0){
	 return  res.status(400).send("Stack is empty");
 }
 const value = stack.pop();
 res.json({popped:value,stack:stack});
});
app.get("/stack",(req,res) => {
 res.json({stack});
});
app.get("/getStackSize",(req,res)=>{
	res.json({maxsize});
});
app.get("/resetSize",(req,res)=>{
	maxsize = 0;
	stack= [];
	res.json({maxsize,stack});
});

module.exports = app;
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
      

 body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
      background: #f9f9f9;
    }

    .container {
      background: white;
      padding: 20px 30px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      width: 400px;
    }

    h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
    }

    label {
      font-weight: bold;
      margin-bottom: 5px;
    }

    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 5px;
      background: #007BFF;
      color: white;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s;
    }

    button:hover {
      background: #0056b3;
    }

    .stack-display {
      margin-top: 20px;
      padding: 10px;
      background: #f1f1f1;
      border-radius: 5px;
      min-height: 50px;
    }
    </style>
	
  </head>
  <body>
    <div class="container">
    <h1>Stack Operations</h1>

    <div class="form-group">
      <label for="size">Stack Size:</label>
      <input type="number" id="size" placeholder="Enter Stack Size">
      <button id="setSize">Set The Size</button>
	  <!-- <button id="resetSize">Reset the Size</button> -->
    </div>

    <div class="form-group">
      <label for="value">Value:</label>
      <input type="text" id="value" placeholder="Enter a value to push">
    </div>

    <div class="buttons">
      <button id="push">Push</button>
      <button id="pop">Pop</button>
    </div>

    <div class="form-group">
      <label>Stack:</label>
      <div id="stack" class="stack-display"></div>
    </div>
  </div>
    <script>
	document.addEventListener("DOMContentLoaded", async () => {
	const stackSizeRes = await fetch("/getStackSize",{method:"GET"});
     if(!stackSizeRes.ok){
	  const errorText = await stackSizeRes.text();
      console.log('Failed fetching latest StackSize ',errorText);
	 }	
	 else{
		 const stackSize = await stackSizeRes.json();
		 console.log('setting the stack size',stackSize.maxsize);
		 document.getElementById("size").value = stackSize.maxsize;
	 }
	 const res = await fetch("/stack",{method:"GET"});
	 if(!res.ok){
      const errorText = await res.text();
      console.log('Failed fetching latest Stackdata: ',errorText);
     }
     else{
		 const data = await res.json();
		 document.getElementById("stack").innerText ="Stack: "+data.stack.join(", ");
	 }
	});
	/*document.getElementById("resetSize").addEventListener("click",async(e) =>{
		const res = await fetch("/resetSize",{method:"GET"});
		if(res.ok){
			alert('sucess');
		}
	});*/
     document.getElementById("push").addEventListener("click",async(e) =>{
     const value = document.getElementById("value").value.trim();
     console.log('user has tried to push the data..',value);
     const res = await fetch("/push",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({value})});
     if(!res.ok){
      const errorText = await res.text();
      console.log('error: ',errorText);
	  alert(errorText);
	  document.getElementById("value").value = '';
     }else{
      const data = await res.json();
	  document.getElementById("value").value = '';
      document.getElementById("stack").innerText ="Stack: "+data.stack.join(", ");
     }
     })
     document.getElementById("pop").addEventListener("click",async(e) =>{
     const res = await fetch("/stack",{method:"GET"});
     if(!res.ok){
      const errorText = await res.text();
      console.log('Failed fetching latest data: ',errorText);
     }
     else{
     const data = await res.json();
     if(data.stack && data.stack.length>0){
     const popRes = await fetch("/pop",{method:"POST"});
	 if(!res.ok){
		 const errorText = await popRes.text();
		 alert(errorText);
	 }else{
		const poppedVal = await popRes.json();
		document.getElementById("stack").innerText =
          "Stack: " + poppedVal.stack.join(", ");
	 }
     }
     else {
     alert('no elements in stack, pop is not applicable');
     }
     }
     })
	  document.getElementById("setSize").addEventListener("click",async(e) =>{
		 const value = document.getElementById("size").value.trim();
		 const res = await fetch("/setStackSize",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({value})});
		 if(!res.ok){
		  const errorText = await res.text();
		  console.log('error: ',errorText);
		  alert(errorText);
		  document.getElementById("value").value = '';
		 }else{
		  const data = await res.json();
		  alert(data.message);
		 }  
	  });
    </script>
  </body>
</html>
`
