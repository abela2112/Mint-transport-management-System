const mongoose =require('mongoose')

const RequestSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  phoneNumber: {
    type: String,
    require: true,
  },

  pickUpDate: {
    type: Date,
    require: true,
  },
  ReturnDate: {
    type: Date,
    require: true,
  },

  destination: {
    type: String,
    require: true,
  },

  Passangers: {
    type: Array,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },
  userCreated: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    enum: ["approved", "rejected", "pending"],
    default: "pending",
  },
});

module.exports = mongoose.model("Request", RequestSchema);