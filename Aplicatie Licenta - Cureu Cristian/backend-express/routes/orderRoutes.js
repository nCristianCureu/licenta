const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getAllOrders,
  getMonthlyIncome,
} = require("../controllers/orderControllers");

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthorization, getOrders);
router.get("/", verifyTokenAndAdmin, getAllOrders);
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

module.exports = router;
