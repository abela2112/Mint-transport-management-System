const Request=require('../models/request')

const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../error");


const getALLRequests = async(req,res)=>{
   
    try{
         const requests=await Request.find({})
         res.status(StatusCodes.OK).json(requests)
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json(error)
    }
    
}

const getRequest= async(res,req)=>{
    const {id} =req.params;
     try{
        
         const request=await Request.findById(id)
         res.status(StatusCodes.OK).json(request)
     }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json(error)
     }
    
}

const postRequest = async(req,res)=>{
    try{
         const request=await Request.create({...req.body})
         res.status(StatusCodes.CREATED).json(request)
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json(error)
    }
   
}

const updateRequest=async(req,res)=>{
       const {id} =req.params
    try{
        const request=await  request.findByIdAndUpdate(id, { ...req.body }, { new: true })
        res.status(StatusCodes.OK).json(request)
    }catch(error){
       res.status(StatusCodes.BAD_REQUEST).json(error)
    }
}

const delateRequest=async(req,res)=>{
     const {id} =req.params
     try{
         const request=await Request.findByIdAndDelete(id)
         res.status(StatusCodes.OK).json(request)
     }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json(error)
     }
}

module.exports={getRequest,getALLRequests,postRequest,updateRequest,delateRequest}