const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,})
    }catch(e){
        console.log(e.message,"cant connect to db")
        process.exit(0)
    }}
    module.exports=connectDB