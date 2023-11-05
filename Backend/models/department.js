const mongoose =require('mongoose');


const DeptSchema=new mongoose.Schema({

      deptName:{
        type:String,
        required:[true,"You must provide department name"]
      },
      

},{timestamps:true})


module.exports=mongoose.model("Dept",DeptSchema);