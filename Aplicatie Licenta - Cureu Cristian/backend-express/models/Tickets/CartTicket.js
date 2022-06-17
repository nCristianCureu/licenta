const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartTicketSchema = Schema(
  {
    userId: { type: String, required: true },
    tickets: [
      {
        ticketId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartTicket", CartTicketSchema);
