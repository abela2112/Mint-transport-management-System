const { BadRequestError } = require("../error");
const Dept = require("../models/department");
const addNewDept = async (req, res) => {
  if (!req.body) throw new BadRequestError("there is no any data to be added");
  const dept = await Dept.create({ ...req.body });
  res.status(200).json(dept);
};

const updateDept = async (req, res) => {
  const { id } = req.params;
  const dept = await Dept.findByIdAndUpdate(id, { ...req.body }, { new: true });
  res.status(200).json(dept);
};

const deleteDept = async (req, res) => {
  const { id } = req.params;
  const dept = await Dept.findByIdAndDelete(id);
  res.status(200).json({ message: "Car deleted successfully" });
};

const getAllDepts = async (req, res) => {
  const depts = await Dept.find();
  res.status(200).json(depts);
};

const getDeptById = async (req, res) => {
  const { id } = req.params;
  const dept = await Dept.findById(id);
  res.status(200).json(dept);
};

module.exports = {
  addNewDept,
  updateDept,
  deleteDept,
  getAllDepts,
  getDeptById,
};
