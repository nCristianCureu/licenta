const NewsLike = require("../models/NewsLikes");

const addNewsLike = async (req, res) => {
  const likeExists = await NewsLike.findOne({ userId: req.body.userId });
  if (likeExists) {
    res.status(400);
    throw new Error("Like already exists!");
  }
  const newsLike = await NewsLike.create({
    userId: req.body.userId,
    newsId: req.body.newsId,
  });
  if (newsLike) {
    res.status(201).json({
      _id: newsLike._id,
      userId: newsLike.userId,
      newsId: newsLike.newsId,
    });
  } else {
    res.status(401);
    throw new Error("Error occured!");
  }
};

//GET USER CART, GET CART BY USER ID
const getLikesByNewsId = async (req, res) => {
  try {
    const likes = await NewsLike.find({ newsId: req.params.newsId });
    res.status(200).json(likes);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { addNewsLike, getLikesByNewsId };
