const router = require("express").Router();

const {
  addNews,
  getNews,
  getNewsById,
  deleteNews,
  updateNews,
  likeNews,
  unlikeNews
} = require("../controllers/newsControllers");
const { verifyToken } = require("../middlewares/verifyToken");


router.post("/add-news", addNews);
router.get("/view-news", getNews);
router.get("/news/:newsId", getNewsById);
router.delete("/news/:newsId", deleteNews);
router.put("/edit-news/:newsId", updateNews);
router.put("/like/:newsId", verifyToken, likeNews);
router.put("/unlike/:newsId", verifyToken, unlikeNews);

module.exports = router;
