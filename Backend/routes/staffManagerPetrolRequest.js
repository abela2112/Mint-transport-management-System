const express=require('express')
const router=express.Router()

const {

    auth,
    verifyTokenAndStaffManager,
    verifyTokenAndAccessToTransportManager,
    verifyTokenAndAdmin,
    verifyTokenAndAccessToRequest,
    verifyTokenAndAuth,
  } = require("../middleware/auth");
  

const {postRequest,getrequestOneRequest,getAllRequest,updateAPetrolRequest}=require('../controller/staffManagerPetrolRequest')

router.post("/", verifyTokenAndStaffManager, postRequest);
router.get("/", verifyTokenAndAccessToTransportManager, getAllRequest);
router.get(
  "/:id",
  verifyTokenAndAccessToTransportManager,
  getrequestOneRequest
);
router.put('/:id',verifyTokenAndAccessToTransportManager,updateAPetrolRequest)
module.exports=router
