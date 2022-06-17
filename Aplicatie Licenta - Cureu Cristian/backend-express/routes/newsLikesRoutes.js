const router = require("express").Router();
const { addNewsLike, getLikesByNewsId } = require("../controllers/newsLikesControllers");

router.post("/", addNewsLike);
router.get("/:newsId", getLikesByNewsId);

module.exports = router;
