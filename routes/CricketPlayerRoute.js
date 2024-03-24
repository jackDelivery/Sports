const express = require("express");
const { CreateCricketPlayer, login } = require("../Controllers/CricketPlayerController");
const router = express.Router();




router.route("/createcricketplayer").post(CreateCricketPlayer);
router.route("/login").post(login);




module.exports = router


