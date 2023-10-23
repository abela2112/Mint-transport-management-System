const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
  }
};

const register = async (req, res) => {};

module.exports = {
  login,
  register,
};
