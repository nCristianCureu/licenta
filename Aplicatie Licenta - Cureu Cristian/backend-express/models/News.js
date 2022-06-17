const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    newsPhoto: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    likes: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
