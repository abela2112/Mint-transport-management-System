const mongoose=require('mongoose')

const UserSchema =new mongoose.Schema({
    name:{
        type:String,
        require:[true,'name must be provided'],

    },
    email:{
        type:String,
        required:[true,'email must be provided'],
        unique:true,
        match:
    }
})

module.exports=mongoose.model('User',UserSchema)