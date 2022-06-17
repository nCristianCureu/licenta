const Match = require("../../models/Tickets/Match");

const createMatch = async (req, res) => {
  const newMatch = new Match(req.body);
  try {
    const savedMatch = await newMatch.save();
    res.status(200).json(savedMatch);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL MATCHES
const getAllMatches = async (req, res) => {
  const qNew = req.query.new;
  try {
    let matches;
    if (qNew) {
      //NEXT FIVE MATCHES
      matches = await Match.find().sort({ date: 1 }).limit(1);
    } else {
      // ALL MATCHES
      matches = await Match.find();
    }
    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    res.status(200).json(match);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateMatch = async (req, res) => {
  try {
    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMatch);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteMatch = async (req, res) => {
  try {
    await Match.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
};
