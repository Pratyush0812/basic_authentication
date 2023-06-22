import express from 'express'
import path from 'path'

const app = express()

app.get("/",(req,res)=>{
    
    const pathlocation = path.resolve()  //basically __dirname doesnt work with "type" : "module" it should be "commonjs"
    //res.sendFile(pathlocation + "/index.html")
    res.sendFile(path.join(pathlocation,"index.html"))
    //res.status(400).send("Meri marzi")
    // res.json({
    //     success : true,
    //     products : []
    // })
    //res.sendStatus(400)
    //res.send("Hi") //send is a function available only in express.js
})
app.listen(5000,()=>{
    console.log('Server is working')
})