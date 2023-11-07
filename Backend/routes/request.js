const express =require('express')

const router =express.Router()
const {
  auth,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
  verifyTokenAndAccessToRequest,
} = require("../middleware/auth");



    
const {
  getRequest,
  getALLRequests,
  postRequest,
  updateRequest,
  getUserRequests,
  deleteRequest,
} = require("../controller/request");

router.get("/", verifyTokenAndAccessToRequest, getALLRequests);
router.get("/user/:id", auth, getUserRequests);
router.get("/:id", auth, getRequest);


router.post("/reqPost", auth, postRequest);
router.patch(
  "/updateRequest/:id",
  verifyTokenAndAccessToRequest,
  updateRequest
);
router.delete("/deleteRequest/:id", verifyTokenAndAdmin, deleteRequest);

module.exports=router