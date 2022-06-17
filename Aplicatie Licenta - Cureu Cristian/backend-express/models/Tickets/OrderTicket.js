const mongoose = require("mongoose");

const OrderTicketSchema = new mongoose.Schema(
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
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderTicket", OrderTicketSchema);
