const asyncHandler = require("express-async-handler");
const News = require("../models/News");

const addNews = asyncHandler(async (req, res) => {
  const news = await News.create({
    title: req.body.title,
    description: req.body.description,
    newsPhoto: req.body.newsPhoto,
    date: req.body.date,
  });
  if (news) {
    res.status(201).json({
      _id: news._id,
      title: news.title,
      description: news.description,
      newsPhoto: news.newsPhoto,
      date: news.date,
    });
  } else {
    res.status(400);
    throw new Error("Error occured!");
  }
});

const getNews = asyncHandler(async (req, res) => {
  const news = await News.find();
  if (news) {
    res.status(201).json(news);
  } else {
    res.status(400);
    throw new Error("Error occured!");
  }
});

const getNewsById = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.newsId);
  if (news) {
    res.status(201).json(news);
  } else {
    res.status(400);
    throw new Error("Error occured!");
  }
});

const deleteNews = asyncHandler(async (req, res) => {
  const removedNews = await News.remove({ _id: req.params.newsId });
  if (removedNews) {
    res.status(201).json(removedNews);
  } else {
    res.status(400);
    throw new Error("Error occured!");
  }
});

const updateNews = asyncHandler(async (req, res) => {
  try {
    News.findByIdAndUpdate({ _id: req.params.newsId }, req.body).then(() => {
      News.findOne({ _id: req.params.newsId }).then((updatedNews) => {
        res.status(201).json(updatedNews);
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
const likeNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.newsId);

    //Check if the news has already been liked
    if (
      news.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "News already liked" });
    }
    news.likes.unshift({ user: req.user.id });
    await news.save();
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const unlikeNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.newsId);

    //Check if the news has already been liked
    if (
      news.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "News has not yet been liked" });
    }

    // Get remove index
    const removeIndex = news.likes.map((like) =>
      like.user.toString().indexOf(req.user.id)
    );
    news.likes.splice(removeIndex, 1); //remove 1 element from a specific index
    await news.save();
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addNews,
  getNews,
  getNewsById,
  deleteNews,
  updateNews,
  likeNews,
  unlikeNews,
};
