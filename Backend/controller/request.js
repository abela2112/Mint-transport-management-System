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

const getRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findById(id);
    res.status(StatusCodes.OK).json(request);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};
const getUserRequests = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.find({ userCreated: id });
    res.status(StatusCodes.OK).json(request);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};
const postRequest = async (req, res) => {
  try {
    console.log(req.body);
    const request = await Request.create({
      ...req.body,
      userCreated: req?.user?.userID,
    });
    res.status(StatusCodes.CREATED).json(request);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const updateRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await request.findByIdAndUpdate(id);
    res.status(StatusCodes.OK).json(request);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const delateRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json(request);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

module.exports = {
  getRequest,
  getALLRequests,
  postRequest,
  updateRequest,
  delateRequest,
  getUserRequests,
};