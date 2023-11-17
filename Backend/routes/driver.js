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
    verifyTokenAndAccessToTransportManager
  } = require("../middleware/auth");
  
  router.get("/", verifyTokenAndAccessToTransportManager, getAllDriver);
  router.get("/:id", verifyTokenAndAccessToTransportManager, getDriverById);
  router.post("/add-new-driver", verifyTokenAndAccessToTransportManager, addNewDriver);
  router.patch("/:id", verifyTokenAndAccessToTransportManager, updateDriver);
  router.delete("/:id", verifyTokenAndAccessToTransportManager, deleteDriver);
  
  module.exports = router;
  
