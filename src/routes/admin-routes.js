const { Router } = require("express");
const isAdmin = require("../midllewares/isAdmin");

const router = Router();

const {
  loginForAdmin,
  addTravelCountry,
  updateTravelBook,
  getAllTravels,
  getTravelById,
  removeTravelBook,
} = require("../controllers/admin-controllers");
const { verif_Token } = require("../midllewares/verif");

router.post("/login", loginForAdmin);
router.post("/create/country", verif_Token, isAdmin, addTravelCountry);
router.get("/", verif_Token, isAdmin, getAllTravels);
router.get("/:id", verif_Token, isAdmin, getTravelById);
router.put("/update/:id", verif_Token, isAdmin, updateTravelBook);
router.delete("/delete/:id", verif_Token, isAdmin, removeTravelBook);

module.exports = router;
