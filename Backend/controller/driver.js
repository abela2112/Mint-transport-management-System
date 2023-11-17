const express=require('express')

const Driver =require("../models/driver")

const addNewDriver = async (req, res) => {
    if (!req.body) throw new BadRequestError("there is no any data to be added");
    const driver = await Driver.create({ ...req.body });
    res.status(200).json(driver);
  };
  
  const updateDriver = async (req, res) => {
    const { id } = req.params;
    const driver = await Driver.findByIdAndUpdate(id, { ...req.body }, { new: true });
    res.status(200).json(driver);
  };
  const deleteDriver = async (req, res) => {
    const { id } = req.params;
    const driver = await Driver.findByIdAndDelete(id);
    res.status(200).json({ message: "Car deleted successfully" });
  };
  
  const getAllDriver = async (req, res) => {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  };
  
  const getDriverById = async (req, res) => {
    const { id } = req.params;
    const driver = await Driver.findById(id);
    res.status(200).json(driver);
  };
  
  module.exports = {
    addNewDriver,
    updateDriver,
    deleteDriver,
    getAllDriver,
    getDriverById,
  };
  