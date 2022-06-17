const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TicketSchema = new Schema(
  {
    matchId: { type: String, required: true },
    sector: {type: String, required: true},
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);
