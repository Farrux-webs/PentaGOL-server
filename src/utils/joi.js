const Joi = require("joi");

const travelPost = Joi.object({
  photo: Joi.string(),
  country: Joi.string().required(),
  price: Joi.number().required(),
  information: Joi.string().required(),
  language: Joi.string().valid('en', 'fr', 'es')  
});



module.exports = {
  travelPost,
};
