
const User = require('../models/user')
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../error");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Invalid email or password");
  }

  const user = await User.findOne({ email });
  if (!user) throw new BadRequestError("user not found");
  if (user.status === "approved" || user.isAdmin) {
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new BadRequestError("Incorrect  password");
    }
    const token = user.createJWT();
    const { password, ...newUser } = user;
    res.status(StatusCodes.OK).json({ data: newUser, token });
  } else {
    throw new BadRequestError("User not  approved please check your admin");
  }
};


const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(200).json({ user: user });
};
const updateUser = async (req, res) => {
  let newPassword;
  const { id } = req.params;
  console.log(req.user);
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(req.body.password, salt);
    // if (!this.isModified("password")) return next();
  }
  const user = await User.findByIdAndUpdate(
    id,
    { ...req.body, password: newPassword },
    { new: true }
  );
  res
    .status(StatusCodes.OK)
    .json({ user: user, message: "updated successfully" });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json(users);
};

const getAUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("please provide valid id");
  }
  console.log("get user", id);
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(StatusCodes.OK).json(user);
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const users = await User.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ message: "deleted successfully" });
};
const updateNotification = async (req, res) => {
  const { id } = req.params;
  console.log(`Update notification`, id);
  const user = await User.findOneAndUpdate(
    {
      $and: [
        { _id: req.user.userID }, // Match the user's email
        { "notifications._id": id }, // Match the notification id
      ],
    },
    {
      $set: {
        "notifications.$.seen": true, // Update the 'seen' field to true
      },
    },
    {
      returnOriginal: false, // Return the updated document
    }
  );
  res.status(StatusCodes.OK).json(user);
};
const deleteNotification = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndUpdate(
    {
      _id: req.user.userID, // Use the user's email as a filter
    },
    {
      $pull: {
        notifications: { _id: id },
      },
    },
    {
      returnOriginal: false, // Return the updated document
    }
  );
  console.log("delete notif0", "id", user);

  res.status(StatusCodes.OK).json({ message: "deleted successfully" });
};

module.exports = {
  login,
  register,
  updateUser,
  getAllUsers,
  getAUser,
  deleteNotification,
  updateNotification,
  deleteUser,
};

