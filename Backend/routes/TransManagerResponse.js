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
    verifyTokenAndAccessToTarnsManager
  }=require('../middleware/auth')


  

router.get("/", verifyTokenAndAccessToRequest, getAllResponses);
router.get("/:id", verifyTokenAndAccessToRequest, getResponseById);
router.post("/add-new-response", verifyTokenAndAccessToRequest, addNewResponse);
router.patch("/:id", verifyTokenAndAccessToTarnsManager, updateResponse);
router.delete("/:id", verifyTokenAndAccessToTarnsManager, deleteResponse);



module.exports=router