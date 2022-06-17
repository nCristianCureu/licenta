const router = require("express").Router();
const multer = require("multer");
const {
  createPlayer,
  getPlayers,
  getPlayerById,
  deletePlayer,
  updatePlayer
} = require("../controllers/playersControllers");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../frontend-react/public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({storage: storage});

router.post("/admin/add-player", upload.single("playerImage"), createPlayer);
router.get("/admin/view-players", getPlayers);
router.get("/admin/players/:playerId", getPlayerById);
router.delete("/admin/players/:playerId", deletePlayer);
router.put("/admin/edit-player/:playerId", updatePlayer);

module.exports = router;
