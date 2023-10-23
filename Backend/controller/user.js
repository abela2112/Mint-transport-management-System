
const User=require('../models/user')
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");


const login = async (req, res) => {
     const {email, password} = req.body
     if(!email || !password){

     }

};

const register = async (req, res) => {
    
     const user=await User.create({...req.body})
     const token=user.createJWT
     res.status(200).json({user:user,token})
};

module.exports = {
  login,
  register,
};
