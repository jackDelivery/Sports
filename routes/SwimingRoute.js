const express = require("express");
const { CreateSwimingPlayer, login, createNicPdf, AdminDeleteUsers, AdminApproved, adminApprovedGet, loginAdmin, users } = require("../Controllers/SwimingPlayerController");
const { imagePhotoUpload, ImgResize, nicImgResize } = require("../middleware/utils/UploadImage");
const router = express.Router();
const { SwimmingisAdminApproved, SwimmingisAdmin } = require("../middleware/utils/Auth/authMiddleware");









router.route("/createswimmingplayer").post(CreateSwimingPlayer);
router.route("/swimminglogin").post(SwimmingisAdminApproved, login);

router.route("/swimming-user/:id").delete(AdminDeleteUsers);
router.route("/swimming/approveds").get(adminApprovedGet);

router.route("/swimming/login/approved").put(AdminApproved);

router.route("/swimming/users").get(users);

router.route("/swimming/admin").post(loginAdmin);


router.route("/nic-pdf").post(imagePhotoUpload.array("images", 2), nicImgResize, createNicPdf);








module.exports = router


