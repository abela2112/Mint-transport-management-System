const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    require: [true, "car's brand must be provided"],
  },
  model: {
    type: String,
    require: [true, "model must be provided"],
  },
  licencePlateNumber: {
    type: String,
    required: [true, "licence must be provided must be provided"],
  },
  owend: {
    type: String,
    enum: ["rental", "own"],
  },
  status: {
    type: String,
    enum: ["available", "taken", "for minister"],
    default: "available",
  },
  DriverName: {
    type: String,
  },
  RegisteredDate: {
    type: Date,
    default: Date.now(),
  },
  DriverPhoneNumber: {
    type: String,
  },
});

module.exports = mongoose.model("car", carSchema);
