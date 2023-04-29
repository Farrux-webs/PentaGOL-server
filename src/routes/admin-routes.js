const { Router } = require("express");

const router = Router();

const { loginForAdmin, addPlays } = require("../controllers/admin-controllers");

router.post("/login", loginForAdmin);
router.post("/add/plays", addPlays);

module.exports = router;
