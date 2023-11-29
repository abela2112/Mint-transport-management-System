const router = require("express").Router();
const {
  addNewCar,
  updateCar,
  deleteCar,
  getAllcars,
  getCarById,
  getAvailableCar,
} = require("../controller/car");



const {

  auth,
  verifyTokenAndStaffManager,
  verifyTokenAndAccessToTransportManager,
  verifyTokenAndAdmin,
  verifyTokenAndAccessToRequest,
  verifyTokenAndAuth,
} = require("../middleware/auth");



router.get("/", verifyTokenAndAccessToTransportManager, getAllcars);
router.get("/available", verifyTokenAndAccessToTransportManager,getAvailableCar)
router.patch("/update/:id", verifyTokenAndAccessToTransportManager, updateCar);
router.get("/:id", verifyTokenAndAccessToTransportManager, getCarById);
router.post("/add-new-car", verifyTokenAndAccessToTransportManager, addNewCar);

router.delete("/:id", verifyTokenAndAccessToTransportManager, deleteCar);

module.exports = router;