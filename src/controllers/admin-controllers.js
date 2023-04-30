const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const path = require("path");
const key = process.env.SECRET_KEY;
const Plays = require("../models/Plays");

const { loginForAdminValid } = require("../utils/Joi");
const loginForAdmin = async (req, res) => {
  const { error, value } = loginForAdminValid.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check if admin exists
  const { username, password } = value;

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

//Method:     GET
//Descr:      Get all
// const getAllTravels = async (req, res) => {
//   const travels = await Travel.find();
//   const all = travels.filter((e)=>{
//     if(e.isDeleted === false){
//       return e;
//     }
//   })

//   res.status(200).json({
//     message: "success",
//     travels: all.reverse(),
//   });
// };

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
  const { play_first_team_image, play_second_team_image } = req.files;

  // const { error, value } = travelPost.validate(req.body);

  // if (error) {
  //   return res.status(400).json({ error: error.details[0].message });
  // }

  const {
    play_first_team,
    play_second_team,
    play_isDoneDate,
    play_expected_date,
    play_league,
    play_score,
  } = req.body;

  const filename = play_first_team_image.name;
  const secfilename = play_second_team_image.name;

  const uploadPath = `./uploads/images/${filename}`;

  await play_first_team_image.mv(uploadPath);

  const uploadPath2 = `./uploads/images/${secfilename}`;
  await play_second_team_image.mv(uploadPath2);

  const newPlays = await Plays.create({
    play_first_team_image: `${filename}`,
    play_second_team_image: `${secfilename}`,
    play_first_team: [play_first_team],
    play_second_team,
    play_isDoneDate,
    play_expected_date,
    play_league,
    play_score,
  });

  res.status(201).json({
    message: "success",
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
};
