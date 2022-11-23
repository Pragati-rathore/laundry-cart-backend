const mongoose =require("mongoose")
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // tokens:{
    //     type:String,
    //     required:true
    // }
    
    // tokens:[{
    //     token:{
    //         type:String,
    //         required:true
    //     }
    // }]
})



//hashing bycript
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,12);
        // this.cpassword= await bcrypt.hash(this.cpassword,12);
    }
    next()
})
  userSchema.methods.generateAuthToken=async function(){
    try{
        let token= jwt.sign({_id:this._id},process.env.SECRET_KEY )
        // this.tokens = this.tokens.concat({token: token})
        // this.tokens=token
    //    await this.save()
    //    console.log(token)
       return token
    }catch(err){
        console.log(err)
    }
  }
  


const Usercol =mongoose.model("usercol",userSchema)
module.exports= Usercol