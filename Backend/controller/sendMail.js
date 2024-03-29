const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../error");
var nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
const { verifyTokenAndAccessToRequest } = require("../middleware/auth");
const poster = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const oldUser = await User.findOne({ email: email });
    if (!oldUser) {
      return res.status(400).json({ message: " user not exists" });
    }
    const SECRET = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}   `;

    var transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.HOST,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var mailOptions = {
      from: process.env.HOST,
      to: `${email}`,
      subject: "Password reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    console.log(link);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getter = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.status(400).json({ error: "user not exists" });
  }
  const SECRET = process.env.JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, SECRET);
    res.send("verified");
  } catch (e) {
    res.send("Not verified");
  }
};

const postback = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log(req.params);
  console.log({ id: id, token: token });
  const oldUser = await User.findById(id);
  if (!oldUser) {
    return res.status(400).json({ error: "User not exists" });
  }
  const SECRET = process.env.JWT_SECRET + oldUser.password;
  // console.log("password",oldUser.password)
  try {
    const verify = jwt.verify(token, SECRET);
    console.log(verify);
    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.status(200).json({ message: "password updated successfully!" });
  } catch (e) {
    res.json({ error: e.message });
    res.json({ status: "something went wrong" });
  }
};

module.exports = {
  poster,
  getter,
  postback,
};
