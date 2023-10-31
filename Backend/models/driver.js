const mongoose = require("mongoose");
const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "full name brand must be provided"],
  },
  phoneNumber: {
    type: String,
    require: [true, "phone  must be provided"],
  },
  registeredDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("driver", driverSchema);
