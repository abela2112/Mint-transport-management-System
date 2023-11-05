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
    default: Date.now(),
  },
});

module.exports = mongoose.model("Driver", driverSchema);

