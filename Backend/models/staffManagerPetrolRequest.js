const mongoose =require('mongoose')

const staffRequestSchema=new mongoose.Schema({
    name:{
      type:String,
       required:true
    },
    phoneNumber:{
       type:String,
       required:true 
    }
    ,
    requestDate:{
          type:String,
           required:true
    },
   discription:{
        type:String,
        required:true
   },
   status:{
      type:String,
      default:"pending",
      enum:["pending","approved","reject"]
   }
},{timeStamp:true})

module.exports=mongoose.model('StaffRequest',staffRequestSchema)