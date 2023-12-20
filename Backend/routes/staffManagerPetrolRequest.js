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

router.post('/staff-petrol-request',verifyTokenAndStaffManager,postRequest)
router.get('/:id/getOne',verifyTokenAndAccessToTransportManager,getrequestOneRequest)
router.get('/getAll',verifyTokenAndAccessToTransportManager,getAllRequest)
router.put('/:id',verifyTokenAndAccessToTransportManager,updateAPetrolRequest)
module.exports=router
