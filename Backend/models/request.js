const mongoose =require('mongoose')

const RequestSchema=mongoose.Schema({
      FullName:{
        type:String,
        require:true,
      },

      Phone:{
        type:String,
        require:true
      },
     
      pickUpDate:{
        type:Date,
        require:true
      }
      ,
      ReturnDate:{
        type:Date,
        require:true 
      },

      destination:{
        type:String,
        require:true
      },

      NumberOfPassanger:{
        type:String,
        require:true
      },

      Discription:{
        type:String,
        require:true
      },
      
})

module.export=mongoose.model("Request",RequestSchema)