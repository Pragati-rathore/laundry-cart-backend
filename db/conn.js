const mongoose =require("mongoose")
const dotenv =require("dotenv")
dotenv.config({path:"./config.env"})
const DB= process.env.DATABAASE

 mongoose.connect(DB).then(()=>{
    console.log("sever connected")
})
.catch((err)=>{
    console.log("not connected some error hapening")
})