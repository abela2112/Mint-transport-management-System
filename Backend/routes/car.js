const router = require("express").Router();
const {
  addNewCar,
  updateCar,
  deleteCar,
  getAllcars,
  getCarById,
} = require("../controller/car");
const  {
  auth,
  verifyTokenAndStaffManager,
  verifyTokenAndAdmin,
  verifyTokenAndAccessToRequest,
  verifyTokenAndAuth,
}=require('../middleware/auth')

router.get("/", verifyTokenAndAdmin, getAllcars);
router.get("/:id", verifyTokenAndAdmin, getCarById);
router.post("/add-new-car", verifyTokenAndAdmin, addNewCar);
router.patch("/:id", verifyTokenAndAdmin, updateCar);
router.delete("/:id", verifyTokenAndAdmin, deleteCar);
module.exports = router;
