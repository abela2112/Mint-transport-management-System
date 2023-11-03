const express =require('express')

const router =express.Router()
const   { auth, verifyTokenAndAdmin, verifyTokenAndAuth }=require('../middleware/auth')



    
const {
  getRequest,
  getALLRequests,
  postRequest,
  updateRequest,
  getUserRequests,
  deleteRequest,
} = require("../controller/request");

router.get("/", verifyTokenAndAdmin, getALLRequests);
router.get("/user/:id", auth, getUserRequests);
router.get("/:id", verifyTokenAndAuth, getRequest);


router.post("/reqPost", auth, postRequest);
router.patch("/updateRequest/:id", verifyTokenAndAdmin, updateRequest);
router.delete("/deleteRequest/:id", verifyTokenAndAdmin, deleteRequest);

module.exports=router