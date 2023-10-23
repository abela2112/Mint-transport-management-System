const mongoose=require('mongoose')

const UserSchema =new mongoose.Schema({
    First_name:{
        type:String,
        require:[true,'name must be provided'],

    },
    Last_name:{
        type:String,
        require:[true,'name must be provided'],

    },
    email:{
        type:String,
        required:[true,'email must be provided'],
       
        match:[
            /^[\w.-]+@MinT\.gov\.et$/,
           'please provide valid email'

        ],
        unique:true

       },
  position:{
      type:String,
      required:[true,'position must be provided'],
      enum:['CEO','DESK','EXPERT'],
      default:'EXPERT'
     },
  password:{
        type:String,
         require:[true,'password must be provided'],
         
    } ,
    department:{
        type:String,
        require:true,

    },
    phoneNumber:{
        type:String,
        require:true
    }

  })

module.exports=mongoose.model('User',UserSchema)