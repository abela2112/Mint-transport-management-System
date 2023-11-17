const express=require('express')
const router=express.Router()

const {
  addNewResponse,
  updateResponse,
  deleteResponse,
  getAllResponses,
  getResponseById,
  getUserRequestResponse,
 
} = require("../controller/TransManagerResponse");

const {
  auth,
  verifyTokenAndStaffManager,
  verifyTokenAndAdmin,
  verifyTokenAndAccessToRequest,
  verifyTokenAndAuth,


  verifyTokenAndAccessToTransportManager,
} = require("../middleware/auth");



router.get("/", verifyTokenAndAccessToTransportManager, getAllResponses);
router.get("/:id", auth, getResponseById);
router.get("/user/:userId", auth, getUserRequestResponse);
router.post("/add-new-response", verifyTokenAndAccessToRequest, addNewResponse);
router.patch("/:id", auth, updateResponse);
//router.patch("/notify/:responseId", auth, notify);
router.delete("/:id", verifyTokenAndAccessToTransportManager, deleteResponse);



module.exports=router