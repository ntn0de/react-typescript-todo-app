const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'))

app.use("/",(req,res,next)=>{
    res.sendFile(path.join(__dirname,"public",'index.html'));
})

app.listen(3001,()=>{
    console.log("server started in port 3000");
})



