const asyncHandler = require("express-async-handler");
const Player = require("../models/Player");

const createPlayer = asyncHandler(async (req, res) => {
  const player = await Player.create({
    name: req.body.name,
    team: req.body.team,
    number: req.body.number,
    position: req.body.position,
    nationality: req.body.nationality,
    age: req.body.age,
    playerImage: req.file.originalname,
  });
  if (player) {
    res.status(201).json({
      name: player.name,
      team: player.team,
      number: player.number,
      position: player.position,
      nationality: player.nationality,
      age: player.age,
      playerImage: req.body.playerImage,
    });
  } else {
    res.status(400);
    throw new Error("Error occured!");
  }
});

const getPlayers = asyncHandler(async (req, res) => {
  const players = await Player.find();
  if (players) {
    res.status(201).json(players);
  } else {
    res.status(400);
    throw new Error("Error occured!");
  }
});

const getPlayerById = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.playerId);
  if (player) {
    res.status(201).json(player);
  } else {
    res.status(400);
    throw new Error("Error occured!");
  }
});

const deletePlayer = asyncHandler(async (req, res) => {
  const removedPlayer = await Player.remove({ _id: req.params.playerId });
  if (removedPlayer) {
    res.status(201).json(removedPlayer);
  } else {
    res.status(400);
    throw new Error("Error occured!");
  }
});

const updatePlayer = asyncHandler(async (req, res) => {
  try {
    Player.findByIdAndUpdate({ _id: req.params.playerId }, req.body).then(
      () => {
        Player.findOne({ _id: req.params.playerId }).then((updatedPlayer) => {
          res.status(201).json(updatedPlayer);
        });
      }
    );
  } catch(err) {
    res.status(400).json(err);
  }
  // const player = await Player.findById(req.params.playerId);
  // if (player) {
  //   player.name = req.body.name;
  //   player.team = req.body.team;
  //   player.number = req.body.number;
  //   player.nationality = req.body.nationality;
  //   player.age = req.body.age;
  //   res
  //     .status(201)
  //     .json({
  //       name: player.name,
  //       number: player.number,
  //       team: player.team,
  //       nationality: player.nationality,
  //       age: player.age,
  //       playerImage: req.body.playerImage,
  //     });
  // } else {
  //   res.status(400);
  //   throw new Error("Error occured!");
  // }
});

module.exports = {
  createPlayer,
  getPlayers,
  getPlayerById,
  deletePlayer,
  updatePlayer,
};
