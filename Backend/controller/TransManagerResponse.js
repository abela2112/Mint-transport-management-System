const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../error");
const TResponse = require("../models/TransManagerResponse");
const Request = require("../models/request");
const addNewResponse = async (req, res) => {
  if (!req.body) throw new BadRequestError("there is no any data to be added");
  const response = await TResponse.create({ ...req.body });
  res.status(200).json(response);
};

const updateResponse = async (req, res) => {
  const { id } = req.params;

  const response = await TResponse.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  res.status(200).json(response);
};
// const notify = async (req, res) => {
//   const { responseId } = req.params;
//   const { userId } = req.body;
//   const seenedResponse = await TResponse.findById(responseId);
//   console.log(">>>", seenedResponse);
//   seenedResponse?.seenBy.set(userId, true);
//   const updateResponse = await TResponse.findByIdAndUpdate(
//     responseId,
//     { seenBy: seenedResponse.seenBy },
//     { new: true }
//   );
//   res.status(200).json({ message: "success" });


// };
const deleteResponse = async (req, res) => {
  const { id } = req.params;
  const response = await TResponse.findByIdAndDelete(id);
  res.status(200).json({ message: "Car deleted successfully" });
};

const getAllResponses = async (req, res) => {
  const responses = await TResponse.find();
  res.status(200).json(responses);
};
const getUserRequestResponse = async (req, res) => {
  const { userId } = req.params;
  const requests = await Request.find({ userCreated: userId });
  console.log(">>>>", requests);
  const response = await Promise.all(
    requests.map(({ _id }) => TResponse.findOne({ requestId: _id }))
  );
  const notification = async (req, res) => {};
  console.log(">>>>", response);

  const filteredResponse = response?.filter((item) => item !== null);
  res.status(StatusCodes.OK).json(filteredResponse);
};
const getResponseById = async (req, res) => {
  const { id } = req.params;
  const response = await TResponse.findById(id);
  res.status(200).json(response);
};

module.exports = {
  addNewResponse,
  updateResponse,
  deleteResponse,
  getAllResponses,
  getResponseById,
  getUserRequestResponse,
  
};
