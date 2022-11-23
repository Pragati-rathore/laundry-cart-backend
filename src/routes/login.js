const { Router, json } = require("express")
const express =require ("express")
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")
const router= express.Router()
// const User= require("../models/userSchema")
const Usercol= require("../models/User")
router.use(express.json())
router.get("/", (req,res)=>{
    res.send("hello from router ")
})

//login
router.post("/signin",async (req,res)=>{
        try{
            const {email,password} = req.body
            if(!email || !password){
                return res.status(404).json({
                    error:"please fill the data properly"})
            }
            const userLogin= await Usercol.findOne({email:email})

           if(userLogin){
            const passMatch= await bcrypt.compare(password,userLogin.password)
               const token= await userLogin.generateAuthToken();
               res.cookie("jswcookie",token,{
                expires:new Date(Date.now()+3580000000),
                httpOnly:true
               })
            if(!passMatch){
                res.json({messege:"password didnt match"})
            }else{
                res.json({messege: "user log in suceesfully"})
            }
           }else{
            res.json({messege:"email  didnt match"})
           }

          
            
        }
        catch{
          console.log("error")
        }
})


module.exports=router