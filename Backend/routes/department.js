const express =require('express')

const router=express.Router()

const {
    addNewDept,
    updateDept,
    deleteDept,
    getAllDepts,
    getDeptById,
    getAll
  }=require('../controller/department')


  const {
    auth,
    verifyTokenAndAdmin,
    verifyTokenAndAuth,
  } = require("../middleware/auth");
  
  router.get("/getAll",getAll);
  router.get("/", verifyTokenAndAdmin, getAllDepts);
  router.get("/:id", verifyTokenAndAdmin, getDeptById);
  router.post("/add-department", verifyTokenAndAdmin, addNewDept);
  router.patch("/:id", verifyTokenAndAdmin, updateDept);
  router.delete("/:id", verifyTokenAndAdmin, deleteDept);
  
  

module.exports=router
