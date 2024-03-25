const express = require("express");
const { createOrganizationPlayer, login } = require("../Controllers/CricketOrganizationController");
const { imagePhotoUpload, ImgResize, nicImgResize } = require("../middleware/utils/UploadImage");
const router = express.Router();
const { CricketOrganizationisAdminApproved } = require("../middleware/utils/Auth/authMiddleware");
const { loginAdmin } = require("../Controllers/SwimingPlayerController");







router.route("/createcricketorganization").post(createOrganizationPlayer);
router.route("/logincricketorganization").post(CricketOrganizationisAdminApproved, login);



module.exports = router