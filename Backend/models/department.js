const  mongoose=require('mongoose')

const DeptSchema=new  mongoose.Schema({
      deptName:{
        type:String,
        required:[true,"department name must be provided"],
        unique: true,
      },
      staffManager:{
        type:String,
        required:[true,"staff manager must be provided"]
      }
},{ timestamps: true })





module.exports=mongoose.model("Dept",DeptSchema)