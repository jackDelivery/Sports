const express = require("express");
const { createOrganizationPlayer, login } = require("../Controllers/SwimmingOrganizationController");
const { imagePhotoUpload, ImgResize, nicImgResize } = require("../middleware/utils/UploadImage");
const router = express.Router();
const { SwimingOrganizationisAdminApproved } = require("../middleware/utils/Auth/authMiddleware");
const { loginAdmin } = require("../Controllers/SwimingPlayerController");







router.route("/createswimingorganization").post(createOrganizationPlayer);
router.route("/loginswimingorganization").post(SwimingOrganizationisAdminApproved, login);



module.exports = router