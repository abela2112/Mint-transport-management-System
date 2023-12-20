const express = require("express");

const router = express.Router();
const {
  login,
  register,
  updateUser,
  getAllUsers,
  getAUser,
  deleteUser,
  deleteNotification,
  updateNotification,
} = require("../controller/user");

const {
  auth,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} = require("../middleware/auth");
router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/:id", verifyTokenAndAuth, getAUser);
router.post("/login", login);
router.post("/register", register);
router.patch("/:id", verifyTokenAndAuth, updateUser);
router.delete("/:id", verifyTokenAndAuth, deleteUser);
router.delete("/notification/:id", auth, deleteNotification);
router.patch("/notification/:id", auth, updateNotification);

module.exports = router;
