const mongoose = require("mongoose");

const LeaugeSchema = new mongoose.Schema({
  league_name: {
    type: String,
    required: true,
    unique: true,
  },
  league_teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teams",
    },
  ],
  league_games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plays",
    },
  ],
});

const Leauge = mongoose.model("Leauge", LeaugeSchema);

module.exports = Leauge;
