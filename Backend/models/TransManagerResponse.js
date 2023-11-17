const mongoose = require("mongoose");

const TResponseSchema = new mongoose.Schema(
  {
    PlateNumber: {
      type: String,
      required: [true, "you must provide plate number"],
    },
    DriverName: {
      type: String,
      required: [true, "You must provide Driver name"],
    },
    DriverPhone: {
      type: String,
      required: [true, "You must provide driver phone"],
    },
    CarModel: {
      type: String,
      required: [true, "You must provide car model"],
    },
    ReturnDate: {
      type: Date,
      required: [true, "You must privide return date "],
    },
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
      unique: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("TResponse", TResponseSchema);
