const Request=require('../models/request')

const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../error");


const getALLRequests = async (req, res) => {
  const { checked, all, department } = req.query;
  let requests;
  try {
    if (checked) {
      requests = await Request.find({ isChecked: true });
    } else if (all) {
      requests = await Request.find();
    } else if (department) {
      console.log("department", department);
      requests = await Request.aggregate([
        {
          $match: {
            isChecked: false, // or false, depending on what you are looking for
          },
        },
        {
          $lookup: {
            from: "users", // The collection to join with
            localField: "userCreated", // The field from the requests collection
            foreignField: "_id", // The field from the users collection
            as: "userDetails", // The array field that will contain the joined information
          },
        },
        {
          $unwind: "$userDetails", // Deconstruct the userDetails array
        },
        {
          $match: {
            "userDetails.department": `${department}`, // The specific property to filter by
          },
        },
      ]);
    }
  
    res.status(StatusCodes.OK).json({ data: requests });
  } catch (error) {
    
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const getRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findById(id);
    console.log("request", request);
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
    const request = await Request.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
 
    res.status(StatusCodes.OK).json(request);
  } catch (error) {
   
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const deleteRequest = async (req, res) => {
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
  deleteRequest,
  getUserRequests,
};