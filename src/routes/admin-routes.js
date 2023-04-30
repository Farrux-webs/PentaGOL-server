const { Router } = require("express");

const router = Router();

const {
  loginForAdmin,
  addPlays,
  addTeams,
  addLegue,
  getAllPlays
} = require("../controllers/admin-controllers");

router.post("/login", loginForAdmin);
router.post("/add/plays/:first/:second/:thir", addPlays);
router.post("/add/teams", addTeams);
router.post("/add/leg", addLegue);


router.get("/all/plays", getAllPlays)

module.exports = router;
