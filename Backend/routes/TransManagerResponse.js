const express=require('express')
const router=express.Router()

const {
    addNewResponse,
    updateResponse,
    deleteResponse,
    getAllResponses,
    getResponseById,
}=require('../controller/TransManagerResponse')

const  {
    auth,
    verifyTokenAndStaffManager,
    verifyTokenAndAdmin,
    verifyTokenAndAccessToRequest,
    verifyTokenAndAuth,
    verifyTokenAndAccessToTransportManager
  }=require('../middleware/auth')


  

router.get("/", verifyTokenAndAccessToTransportManager, getAllResponses);
router.get("/:id", verifyTokenAndAccessToRequest, getResponseById);
router.post("/add-new-response", verifyTokenAndAccessToRequest, addNewResponse);
router.patch("/:id", verifyTokenAndAccessToTransportManager, updateResponse);
router.delete("/:id", verifyTokenAndAccessToTransportManager, deleteResponse);



module.exports=router