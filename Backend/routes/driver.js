const express=require('express')
const  router=express.Router()

const {
    addNewDriver,
    updateDriver,
    deleteDriver,
    getAllDriver,
    getDriverById,
  }=require('../controller/driver')

  const {
    auth,
    verifyTokenAndAdmin,
    verifyTokenAndAuth,
  } = require("../middleware/auth");
  
  router.get("/", verifyTokenAndAdmin, getAllDriver);
  router.get("/:id", verifyTokenAndAdmin, getDriverById);
  router.post("/add-new-driver", verifyTokenAndAdmin, addNewDriver);
  router.patch("/:id", verifyTokenAndAdmin, updateDriver);
  router.delete("/:id", verifyTokenAndAdmin, deleteDriver);
  
  module.exports = router;
  
