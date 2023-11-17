const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "name must be provided"],
    },
    lastName: {
      type: String,
      required: [true, "name must be provided"],
    },
    email: {
      type: String,
      required: [true, "email must be provided"],

      match: [/^[\w.-]+@mint\.gov\.et$/, "please provide valid email"],
      unique: true,
    },
    position: {
      type: String,
      required: [true, "position must be provided"],
      enum: ["CEO", "Desk", "Expert"],
      default: "EXPERT",
    },


    password: {
      type: String,
      required: [true, "password must be provided"],
    },

    // password: {
    //   type: String,
    //   required: [true, "password must be provided"],
    //   validate: [
    //     {
    //       validator: function (password) {
    //         // The regular expression pattern to enforce password requirements
    //         const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;
    
    //         return pattern.test(password);
    //       },
    //       message: "password must contain at least one letter, one number, and one special character",
    //     },
    //     {
    //       validator: function (password) {
    //         return password.length >= 5;
    //       },
    //       message: "password must be at least 5 characters long",
    //     },
    //   ],
    // },

    department: {
      type: String,
      required: [true, "department must be provided"],
    },
    // phoneNumber: {
    //   type: String,
    //   required: [true, "phone number  must be provided"],
    // },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (value) {
          // Remove any non-digit characters
          const phoneNumberDigits = value.replace(/\D/g, "");

          // Check if the resulting string has exactly 10 digits and consists of only numeric characters
          return (
            /^\d{10}$/.test(phoneNumberDigits) &&
            phoneNumberDigits.length === 10
          );
        },
        message: "Phone number must be a 10-digit number",
      },
      required: [true, "Phone number must be provided"],
    },

    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
    role: {
      type: String,
      enum: ["staff", "staff-manager", "transport-manager", "admin"],
      default: "staff",
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "pending",
    },
    notifications: [
      {
        to: { type: String },
        from: { type: String },
        notificationType: { type: String },
        messageId: { type: String },
        id: {
          type: String,
          default: uuidv4, // Using uuid to generate a unique ID
        },
        message: { type: String },
        seen: {
          type: Boolean,
          default: false,
        },
        time: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  if (!this.isModified) {
    next();
  }
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

module.exports = mongoose.model("User", UserSchema);
//match: [/^[\w.-]+@MinT\.gov\.et$/, "please provide valid email"],
