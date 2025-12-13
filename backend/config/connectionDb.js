const mongoose=require("mongoose")

const connectDB= async()=>{
   await mongoose.connect(process.env.connection_string)
   .then(()=>console.log("mongoDb is connect"))
}

module.exports=connectDB