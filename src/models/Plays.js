const mongoose = require("mongoose");

const PlaysSchema = new mongoose.Schema({
  play_first_team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teams",
    required: true,
  },
  play_second_team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teams",
    required: true,
  },
  play_first_team_image: {
    type: String,
    required: true,
  },
  play_second_team_image: {
    type: String,
    required: true,
  },
  play_isDoneDate: {
    type: Date,
  },

  play_expected_date: {
    type: Date,
    required: true,
  },
  play_league: {
    type: String,
    required: true,
  },
  play_score: {
    type: [Number],
  },
  timestamps: true,
});

const Plays = mongoose.model("Plays", PlaysSchema);

module.exports = Plays;
