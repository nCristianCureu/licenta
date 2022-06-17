const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MatchSchema = new Schema(
  {
    opponent: { type: String, required: true},
    stadium: { type: String, required: true },
    date: {type: Date, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", MatchSchema);


