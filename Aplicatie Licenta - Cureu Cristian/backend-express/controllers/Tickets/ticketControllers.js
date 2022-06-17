const Ticket = require("../../models/Tickets/Ticket");

const createTicket = async (req, res) => {
  const newTicket = new Ticket(req.body);
  try {
    const savedTicket = await newTicket.save();
    res.status(200).json(savedTicket);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET TICKETs BY MATCH ID
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ matchId: req.params.matchId });
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createTicket, getTickets };
