const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newsLikesSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    newsId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewsLikes", newsLikesSchema);
