
const User=require('../models/user')
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
    res.status(StatusCodes.OK).json({ data: user, token });
  } else {
    throw new BadRequestError("user not  approved please check your admin");
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
    { ...req.body, newPassword },
    { new: true }
  );
  res
    .status(StatusCodes.OK)
    .json({ user: user, message: "updated successfully" });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users: users });
};

const getAUser = async (req, res) => {
  const { id } = req.params;
  const users = await User.findById(id);
  res.status(StatusCodes.OK).json({ users: users });
};


module.exports = {
  login,
  register,
  updateUser,
  getAllUsers,
  getAUser,
  getAUser,
};

