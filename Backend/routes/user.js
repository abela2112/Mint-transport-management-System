const express = require("express");

const router = express.Router();
const {
  login,
  register,
  updateUser,
  getAllUsers,
  getAUser,
} = require("../controller/user");

const {
  auth,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} = require("../middleware/auth");
router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/:id", verifyTokenAndAdmin, getAUser);
router.post("/login", login);
router.post("/register", register);
router.patch("/:id", verifyTokenAndAuth, updateUser);

module.exports = router;
