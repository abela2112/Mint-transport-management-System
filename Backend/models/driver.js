const mongoose = require("mongoose");
const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "full name brand must be provided"],
  },
  phoneNumber: {
    type: String,
    required: [true, "phone  must be provided"],
  },
  registeredDate: {
    type: Date,
    required:[true, "date must be provided"],
    default: Date.now(),
  },
}, { timestamps: true });

module.exports = mongoose.model("Driver", driverSchema);

