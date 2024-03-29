const Request=require('../models/request')

const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../error");


const getALLRequests = async (req, res) => {
  const { checked, all, department } = req.query;
  let requests;
  try {
    if (checked) {
      requests = await Request.find({ isChecked: true }).sort({
        updatedAt: -1,
      });
    } else if (all) {
      requests = await Request.find().sort({ updatedAt: -1 });
    } else if (department) {
      // console.log("department", department);
      requests = await Request.aggregate([
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
      ]).sort({ updatedAt: -1 });
    }

    res.status(StatusCodes.OK).json(requests);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
};

const getRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findOne({ _id: id }).populate(
      "userCreated",
      "firstName lastName email position department role"
    );

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
   console.log("request", req.body);
    const request = await Request.create({
      ...req.body,
      userCreated: req?.user?.userID,
    });
    res.status(StatusCodes.CREATED).json(request);
  } catch (error) {
    console.error('error creating',error)
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