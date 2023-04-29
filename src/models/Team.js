const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  team_name: {
    type: String,
    required: true,
    unique: true,
  },
  team_image: {
    type: String,
    required: true,
  },
  team_league: {
    type: String,
    required: true,
  },
  team_played: {
    type: Number,
    default: 0,
  },
  team_collective_account: {
    type: Number,
    default: 0,
  },
  team_goals_scored: {
    type: Number,
    default: 0,
  },
  team_goals_conceded: {
    type: Number,
    default: 0,
  },
  team_goals_ratio: {
    type: Number,
    default: 0,
  },
  team_achievement_count: {
    type: Number,
    default: 0,
  },
  team_lose_count: {
    type: Number,
    default: 0,
  },
  team_collective_drawn_account: {
    type: Number,
    default: 0,
  },
  team_games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plays",
    },
  ],
});

const Team = mongoose.model("Teams", teamSchema);

module.exports = Team;
