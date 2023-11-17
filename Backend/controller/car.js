const { BadRequestError } = require("../error");
const Car = require("../models/cars");
const addNewCar = async (req, res) => {
  if (!req.body) throw new BadRequestError("there is no any data to be added");
  const car = await Car.create({ ...req.body });
  res.status(200).json(car);
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  console.log("req",req.body)
  console.log("id",id)
  const car = await Car.findByIdAndUpdate(id, { ...req.body }, { new: true });
  res.status(200).json(car);
  console.log(car);
};

const deleteCar = async (req, res) => {
  const { id } = req.params;
  const car = await Car.findByIdAndDelete(id);
  res.status(200).json({ message: "Car deleted successfully" });
};

const getAllcars = async (req, res) => {
  const cars = await Car.find();
  res.status(200).json(cars);
};

const getAvailableCar = async (req, res) => {
  try {
    const availableCars = await Car.find({ status: "available" });
    console.log("Available cars:", availableCars);
    res.status(200).json(availableCars);
  } catch (error) {
    console.error("Error retrieving available cars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const getCarById = async (req, res) => {
  const { id } = req.params;
  const car = await Car.findById(id);
  res.status(200).json(car);
};

module.exports = {
  addNewCar,
  updateCar,
  deleteCar,
  getAllcars,
  getCarById,
  getAvailableCar,
};
