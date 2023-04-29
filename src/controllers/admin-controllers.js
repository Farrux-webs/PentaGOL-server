const jwt = require("jsonwebtoken");
const User = require("../models/admin");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const key = process.env.SECRET_KEY;
const Travel = require("../models/Travel.model");
const { travelPost } = require("../utils/joi");

const loginForAdmin = async (req, res) => {
  const { username, password } = req.body;

  // Check if admin exists
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Generate JWT token and store it in the session

    User.findOne({ username }, "_id isAdmin", (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const token = jwt.sign({ id: user._id, role: user.isAdmin }, key, {
        expiresIn: "1h",
      });
      res.cookie("token", token);

      res.status(201).json({
        message: "success",
        token: token,
      });
    });
  } else {
    res.json({ message: "Invalid username or password" });
  }
};

//Method:     GET
//Descr:      Get all
const getAllTravels = async (req, res) => {
  const travels = await Travel.find();
  const all = travels.filter((e)=>{
    if(e.isDeleted === false){
      return e;
    }
  })

  res.status(200).json({
    message: "success",
    travels: all.reverse(),
  });
};

//Method:     GET
//Descr:      Get one country by id
const getTravelById = async (req, res) => {
  const travel = await Travel.findById(req.params.id);

  if ((travel && travel.isDeleted === true) || !travel) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  return res.status(200).json({
    message: "success",
    travel,
  });
};

//Method:     POST
//Descr:      Add new  country
const addTravelCountry = async (req, res) => {
  const image = req.files.photo;

  const { error, value } = travelPost.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { photo, country, price, information, language } = value;

  const checkCountry = await Travel.findOne({ country });

  if (checkCountry) {
    return res.status(400).json({ message: "This Country is already in use" });
  }
  const filename = uuidv4();
  const uploadPath = `${path.join(__dirname)}/../uploads/${filename}${
    image.name
  }`;
  await image.mv(uploadPath);

  const newTravel = await Travel.create({
    photo: `${filename}${image.name}`,
    country,
    price,
    information,
    language,
    isDeleted: false,
  });

  res.status(201).json({
    message: "success",
    newTravel,
  });
};

//Method:     PUT
//Descr:      Edit travel country by its ID
const updateTravelBook = async (req, res) => {
  const { photo, country, price, information, language } = req.body;

  const targetTraavel = await Travel.findById(req.params.id);
  console.log(targetTraavel);
  if ((targetTraavel && targetTraavel.isDeleted === true) || !targetTraavel) {
    return res.status(404).json({ message: "Not found" });
  }

  const updatedTravel = await Travel.findByIdAndUpdate(req.params.id, {
    photo,
    country,
    price,
    information,
    language,
  });

  res.status(200).json({
    message: "success",
    updatedTravel,
  });
};

//Method:     DELETE
//Descr:      Removing travel country by ID
const removeTravelBook = async (req, res) => {
  const target = await Travel.findById(req.params.id);
  if ((target && target.isDeleted === true) || !target) {
    return res.status(404).json({ message: "Not found" });
  }
  target.isDeleted = true; // set isDeleted to true
  await target.save();

  res.status(200).json({
    message: "Deleted",
    target: target,
  });
};

module.exports = {
  loginForAdmin,
  getAllTravels,
  getTravelById,
  addTravelCountry,
  updateTravelBook,
  removeTravelBook,
};
