
const User=require('../models/user')

const {StatusCodes}=require('http-status-codes')
const { BadRequestError } = require('../error');


const login = async (req, res) => {
     const {email, password} = req.body
     if(!email || !password){
      throw new BadRequestError('Invalid email or password')
     }

     const user = await User.findOne({email})
   
     const isPasswordCorrect=await user.comparePassword(password)
     if(!isPasswordCorrect){
      throw new BadRequestError('Incorrect  password')
     }
     const token= user.createJWT()
     res.status(StatusCodes.OK).json({user:user,token:token})
};

const register = async (req, res) => {
    
     const user=await User.create({...req.body})
     res.status(200).json({user:user})
};
const updateUser = async (req, res) => {
  const {id}=req.params
  console.log(req?.user)
  const user=await User.findByIdAndUpdate(id,{...req.body},{new:true})
res.status(StatusCodes.OK).json({user:user,message:'updated successfully'})
}
const getAllUsers= async (req, res) =>{
  const users=await User.find({})
  res.status(StatusCodes.OK).json({users:users})
}
module.exports = {
  login,
  register,
  updateUser,
  getAllUsers
};
