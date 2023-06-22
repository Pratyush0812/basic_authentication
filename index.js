import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

mongoose
.connect("mongodb://127.0.0.1:27017",{
    dbName: "backend",
}).then(()=>console.log("db connected")).catch((e)=>console.log(e))

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
})

const User = mongoose.model("User",userSchema)   //collection name, schema ->model is nothing but document
const app = express()


//Using middlewares
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(),"public"))) //middle wares to be enclosed in app.use
app.use(express.urlencoded({ extended:true }))
//Setting up View Engine
app.set("view engine","ejs")

const isAuthenticated= async (req,res,next)=>{
    const token = req.cookies.token;
    if(token){
        const decoded = jwt.verify(token,"sdjasddjsakdfasdfajjfd")
        req.user = await User.findById(decoded._id)
        next()
    }else{
        res.redirect('/login')
    }
}

app.get('/',isAuthenticated,(req,res)=>{
    const {name,email} = req.user
    res.render("logout",{name:name})
})

app.post("/login", async(req,res)=>{
    const {email,password} = req.body

    let user = await User.findOne({email:email})
    if(!user){
        return res.redirect("/register")  
    }
    const isMatch = await bcrypt.compare(password,user.password) //password given and password from backend
    if(!isMatch) return res.render('login',{email,message : 'Incorrect password.Try Again'})

    const token = jwt.sign({_id:user._id},"sdjasddjsakdfasdfajjfd")

    res.cookie('token',token,{
        httpOnly: true,
        expires: new Date(Date.now()+60*1000)
    })
    res.redirect("/")
})

app.get("/login",(req,res)=>{
    res.render('login')
})
app.get("/logout",(req,res)=>{
    res.cookie('token',null,{
        httpOnly: true,
        expires: new Date(Date.now()) //expire right now
    })
    res.redirect("/")
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register", async(req,res)=>{
    
    let user = await User.findOne({email:req.body.email})
    if(user){
        return res.redirect("/login")  
    }
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const userData = {name : req.body.name, email : req.body.email,password : hashedPassword}
    user = await User.create(userData)

    const token = jwt.sign({_id:user._id},"sdjasddjsakdfasdfajjfd")

    res.cookie('token',token,{
        httpOnly: true,
        expires: new Date(Date.now()+60*1000)
    })
    res.redirect("/")
})
app.listen(5000,()=>{
    console.log('Server is working')
})