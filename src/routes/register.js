const { Router, json } = require("express")
const express =require ("express")
// const bcrypt = require("bcrypt")
// const jwt= require("jsonwebtoken")
const router= express.Router()
// const User= require("..models/User")
const Usercol =require("../models/User")
router.use(express.json())
router.get("/", (req,res)=>{
    res.send("hello from router ")
})
router.post("/register", async (req,res)=>{

         
    

        const  {name,email,phone,district,pincode,address,password,cpassword}= req.body
        if(!name||!email||!phone||!district ||!pincode ||!address ||!password|| !cpassword){
              return res.status(422).json({error:"fil all data properly"})
        }

        try{
           const userExist= await Usercol.findOne({email:email}  )
           if(userExist){
            return res.status(422).json({error:"email or phone already present use different one"})

        }else if(password!=cpassword){
            return res.status(422).json({error:"password not matching"})
        }
        const userdata=  new Usercol({name,email,phone,district,pincode,address,password})
        //bycript

          const userRegis=  await userdata.save()
             if(userRegis){
                res.json({
                        messege:"success",})
             }
            // await userdata.save()
            // res.status(201).json({userdata})
          
        
    }
              
            // .then((userExist)=>{
            //     if(userExist){
            //         return res.status(422).json({error:"email already present use different one"})
            //     }
            // })
            
            // const userdata= new Usercol({name,email,phone,district,pincode,address,password})
            // console.log(userdata)
    
            // userdata.save().then(()=>{
            //     res.json({messege:"user register succesfully"})
            // })

        
        catch(err){
            console.log(err)
        }


    //   console.log(req.body)
    //   const userdata= req.body
    //   res.json({
    //     messege:"success",
    //     userdata
    //   })
    //   res.send("puk puk")
})
//login



module.exports=router