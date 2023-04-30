const Joi = require("joi");

const loginForAdminValid = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const playsForAdminValid = Joi.object({
  play_date_time: Joi.date().required(),
  play_score: Joi.required(),
});

const addTeamValid = Joi.object({
  team_name: Joi.string().required(),
  team_image: Joi.string(),
  team_league: Joi.string().required(),
  team_played: Joi.number().default(0),
  team_collective_account: Joi.number().default(0),
  team_goals_scored: Joi.number().default(0),
  team_goals_conceded: Joi.number().default(0),
  team_achievement_count: Joi.number().default(0),
  team_lose_count: Joi.number().default(0),
  team_collective_drawn_account: Joi.number().default(0),
  team_games_count: Joi.required(),
});

const addLegueValid = Joi.object({
  leauge_name: Joi.string().required(),
  leauge_image: Joi.string(),
  team_league: Joi.string().required(),
  team_played: Joi.number().default(0),
  team_collective_account: Joi.number().default(0),
  team_goals_scored: Joi.number().default(0),
  team_goals_conceded: Joi.number().default(0),
  team_achievement_count: Joi.number().default(0),
  team_lose_count: Joi.number().default(0),
  team_collective_drawn_account: Joi.number().default(0),
  team_games_count: Joi.required(),
});

module.exports = {
  loginForAdminValid,
  playsForAdminValid,
  addTeamValid,
};
