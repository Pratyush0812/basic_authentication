import express from 'express'
import path from 'path'

const app = express()
const users = []

//Using middlewares
app.use(express.static(path.join(path.resolve(),"public"))) //middle wares to be enclosed in app.use
app.use(express.urlencoded({ extended:true }))
//Setting up View Engine
app.set("view engine","ejs")
app.get("/success",(req,res)=>{
    res.render("success")
})
app.get("/",(req,res)=>{
    res.render("index",{name : "Abhishek"})  //{}->can be accessed as "locals" object in html
    //  res.sendFile("index.html")
})

app.post("/",(req,res)=>{
    users.push({userName : req.body.name, email : req.body.email})
    res.redirect("/success")
})

app.get("/users",(req,res)=>{
    res.json({
        users,
    })
})
app.listen(5000,()=>{
    console.log('Server is working')
})