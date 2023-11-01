const mongoose =require('mongoose')

const RequestSchema=mongoose.Schema({
      FullName:{
        type:String,
        require:[true,"you have to provide the full name"],
      },

      Phone:{
        type:String,
        require:[true,"you have to provide the phone"]
      },
     
      pickUpDate:{
        type:Date,
        require:[true,"you have to provide the pick Up date"]
      }
      ,
      ReturnDate:{
        type:Date,
        require:[true,"you have to provide the return date"]
      },

      destination:{
        type:String,
        require:[true,"you have to provide the destination"]
      },

      NumberOfPassanger:{
        type:String,
        require:[true,"you have to provide the number of passanger"]
      },

      Discription:{
        type:String,
        require:[true,"youb have to provide the description "]
      },
      
})

module.export=mongoose.model("Request",RequestSchema)