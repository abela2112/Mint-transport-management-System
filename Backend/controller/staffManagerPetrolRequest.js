const { StatusCodes } = require('http-status-codes');
const StaffRequest =require('../models/staffManagerPetrolRequest')

const postRequest=async(req,res)=>{
    if (!req.body) throw new BadRequestError("there is no any data to be added");
    const request=await StaffRequest.create({...req.body})
    res.status(200).json(request);
   
}
const getrequestOneRequest=async(req,res)=>{
    const { id } = req.params;
    const request = await StaffRequest.findById(id);
    res.status(200).json(request);
}

const getAllRequest=async(req,res)=>{
    const request=await StaffRequest.find()
    res.status(200).json(request);
}
const updateAPetrolRequest=async(req,res)=>{
   
        const { id } = req.params;
      
        try {
          const request = await StaffRequest.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
          );
       
          res.status(StatusCodes.OK).json(request);
        } catch (error) {
         
          res.status(StatusCodes.BAD_REQUEST).json(error);
        }

}

module.exports={postRequest,getrequestOneRequest,getAllRequest,updateAPetrolRequest}