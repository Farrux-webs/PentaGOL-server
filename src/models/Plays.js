const mongoose = require("mongoose");

const PlaysSchema = new mongoose.Schema(
  {
    play_first_team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teams",
      default: [],
    },
    play_second_team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teams",
      default: [],
    },
    play_date_time: {
      type: Date,
      required: true,
    },
    play_league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leauge",
      default:[]
    },
    play_score: {
      type: [Number],
      default: [0, 0]
    },
  },
  { timestamps: true }
);

const Plays = mongoose.model("Plays", PlaysSchema);

module.exports = Plays;
