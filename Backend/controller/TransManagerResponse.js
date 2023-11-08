const { BadRequestError } = require("../error");
const TResponse = require("../models/TransManagerResponse");

const addNewResponse = async (req, res) => {
  if (!req.body) throw new BadRequestError("there is no any data to be added");
  const response = await TResponse.create({ ...req.body });
  res.status(200).json(response);
};

const updateResponse = async (req, res) => {
  const { id } = req.params;
  const response = await TResponse.findByIdAndUpdate(id, { ...req.body }, { new: true });
  res.status(200).json(response);
};
const deleteResponse = async (req, res) => {
  const { id } = req.params;
  const response = await TResponse.findByIdAndDelete(id);
  res.status(200).json({ message: "Car deleted successfully" });
};

const getAllResponses = async (req, res) => {
  const responses = await TResponse.find();
  res.status(200).json(responses);
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
};
