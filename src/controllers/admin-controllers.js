const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Teams = require("../models/Team");
const Leauges = require("../models/Leauge");
const path = require("path");
const key = process.env.SECRET_KEY;
const Plays = require("../models/Plays");

const {
  loginForAdminValid,
  playsForAdminValid,
  addTeamValid,
} = require("../utils/Joi");
const loginForAdmin = async (req, res) => {
  const { error, value } = loginForAdminValid.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check if admin exists
  const { username, password } = value;
  console.log(username, password);

  if (
    !username === process.env.ADMIN_USERNAME &&
    !password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const user = await Admin.findOne({ username });

  if (!user || user.isDeleted === true) {
    return res.status(404).json({ message: "User not found." });
  }

  res.status(201).json({
    message: "success login",
  });
};

// Method:     GET
// Descr:      Get all
const getAllPlays = async (req, res) => {
  const plays = await Plays.find();
  console.log(typeof plays[0]._id);
  res.status(200).json(plays);
};

// //Method:     GET
// //Descr:      Get one country by id
// const getTravelById = async (req, res) => {
//   const travel = await Travel.findById(req.params.id);

//   if ((travel && travel.isDeleted === true) || !travel) {
//     return res.status(404).json({
//       message: "Not found",
//     });
//   }

//   return res.status(200).json({
//     message: "success",
//     travel,
//   });
// };

//Method:     POST
//Descr:      Add new  country
const addPlays = async (req, res) => {
  const { error, value } = playsForAdminValid.validate(req.body);
  const { first, second, thir } = req.params;

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { play_date_time, play_score } = value;
  const playScoreArray = play_score.split(",").map(Number);
  const findFirstTeam = Teams.findById(JSON.parse(first));
  const findSecondTeam = Teams.findById(second);

  // const newPlays = await Plays.create({
  //   play_first_team,
  //   play_second_team,
  //   play_date_time,
  //   play_league,
  //   play_score: playScoreArray,
  // });

  res.status(201).json({ findFirstTeam });
};

const addTeams = async (req, res) => {
  const { team_image } = req.files;

  const { error, value } = addTeamValid.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const filename = team_image.name;

  const uploadPath = `./uploads/images/${filename}`;

  await team_image.mv(uploadPath);

  const {
    team_name,
    team_league,
    team_played,
    team_collective_account,
    team_goals_scored,
    team_goals_conceded,
    team_achievement_count,
    team_lose_count,
    team_collective_drawn_account,
    team_games,
  } = value;

  const newTeams = await Teams.create({
    team_name,
    team_image: `http://localhost:5000/images/${filename}`,
    team_league,
    team_played,
    team_collective_account,
    team_goals_scored,
    team_goals_conceded,
    team_achievement_count,
    team_lose_count,
    team_collective_drawn_account,
    team_games: [],
  });

  res.status(201).json({
    message: "success",
  });
};

const addLegue = async (req, res) => {
  const Leauge = {
    league_name: "LaLiga",
    league_image: `http://localhost:5000/images/back.jpg`,
    league_teams: [],
    league_games: [],
  };

  const newTeams = await Leauges.create(Leauge);

  res.status(201).json({
    message: newTeams,
  });
};

// //Method:     PUT
// //Descr:      Edit travel country by its ID
// const updateTravelBook = async (req, res) => {
//   const { photo, country, price, information, language } = req.body;

//   const targetTraavel = await Travel.findById(req.params.id);
//   console.log(targetTraavel);
//   if ((targetTraavel && targetTraavel.isDeleted === true) || !targetTraavel) {
//     return res.status(404).json({ message: "Not found" });
//   }

//   const updatedTravel = await Travel.findByIdAndUpdate(req.params.id, {
//     photo,
//     country,
//     price,
//     information,
//     language,
//   });

//   res.status(200).json({
//     message: "success",
//     updatedTravel,
//   });
// };

// //Method:     DELETE
// //Descr:      Removing travel country by ID
// const removeTravelBook = async (req, res) => {
//   const target = await Travel.findById(req.params.id);
//   if ((target && target.isDeleted === true) || !target) {
//     return res.status(404).json({ message: "Not found" });
//   }
//   target.isDeleted = true; // set isDeleted to true
//   await target.save();

//   res.status(200).json({
//     message: "Deleted",
//     target: target,
//   });
// };

module.exports = {
  loginForAdmin,
  addPlays,
  addTeams,
  addLegue,
  getAllPlays,
};
