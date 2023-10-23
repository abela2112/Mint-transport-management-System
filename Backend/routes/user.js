const express = require("express");
const isAdmin=require('../middleware/isAdmin')
const router = express.Router();
const { login, register ,updateUser,getAllUsers} = require("../controller/user");
const auth = require("../middleware/auth");
router.get('/',getAllUsers)
router.post("/login", login);
router.post("/register", register);
router.patch('/:id',auth,updateUser)

module.exports = router;
