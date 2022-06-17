const router = require("express").Router();
const {
  createTicket,
  getTickets,
} = require("../../controllers/Tickets/ticketControllers");
const { verifyTokenAndAdmin } = require("../../middlewares/verifyToken");

router.post("/", verifyTokenAndAdmin, createTicket);
router.get("/find/:matchId", getTickets);

module.exports = router;
