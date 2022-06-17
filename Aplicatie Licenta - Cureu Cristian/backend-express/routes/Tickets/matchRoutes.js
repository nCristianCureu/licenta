const { createMatch, getAllMatches, getMatchById, updateMatch, deleteMatch } = require("../../controllers/Tickets/matchControllers");
const { verifyTokenAndAdmin } = require("../../middlewares/verifyToken");

const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, createMatch);
router.get("/", getAllMatches);
router.get("/:id", getMatchById);
router.put("/edit-match/:id", updateMatch);
router.delete("/:id", deleteMatch);

module.exports = router;
