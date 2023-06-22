// import http from "http"
// import gfName,{generateLovePercent} from "./features.js" // extension is imp
const server = http.createServer((req,res)=>{
    console.log(req.method)
    
    if(req.url==="/about"){
        res.end(`<h1>Love is ${generateLovePercent()}</h1>`)
    }
    else if(req.url==="/"){
        res.end("<h1>Home</h1>")
    }
    else{
        res.end("<h1>Page Not Found</h1>")
    }
})
server.listen(5000,()=>{
    console.log("server is working")
})