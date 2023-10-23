const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
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
 
  UserSchema.pre('save',async function(next){
    const salt =await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    if (!this.isModified("password")) return next();
})

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
  }

  UserSchema.methods.createJWT=function(){
    return jwt.sign({userID:this._id,First_name:this.First_name},
        process.env.JWT_SECRET ,
        {expiresIn: process.env.JWT_LIFETIME} )
}

module.exports=mongoose.model('User',UserSchema)
