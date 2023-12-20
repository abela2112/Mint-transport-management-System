const mongoose =require('mongoose')

const RequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "you have to provide the full name"],
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    pickUpDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    Passangers: {
      type: Array,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    userCreated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
