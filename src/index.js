// const mongoose =require("mongoose")
const express =require ("express")
const dotenv =require("dotenv")
const app= express();
dotenv.config({path:"./config.env"})
// require("./db/conn")
require("../db/conn")
app.use(require("./routes/register"))
app.use(require("./routes/login"))
// const User= require("./models/userSchema")
const Usercol = require("./models/User")
const port=process.env.PORT
const middleware=(req,res,next)=>{
    console.log("hello middleware")
    next();
}
// middleware()

app.get("/", (req,res)=>{
    res.send("hello from ")
})
app.get("/home", (req,res)=>{

    res.send("hello from ")
})
app.get("/pricing", (req,res)=>{
    res.cookie("test1", "user")
    res.send("hello from ")
})
app.get("/signin", (req,res)=>{
    res.send("hello from ")
})
app.get("/signup", (req,res)=>{
    res.send("hello from ")
})
app.get("/career", (req,res)=>{
    res.send("hello from ")
})

app.listen(port,()=>{
    console.log(`server is up at ${port} `)
})