const express = require("express");
const { CreateCricketPlayer, login, createNicPdf, AdminApproved, AdminDeleteUsers, adminApprovedGet, users } = require("../Controllers/CricketPlayerController");
const { imagePhotoUpload, ImgResize, nicImgResize } = require("../middleware/utils/UploadImage");
const router = express.Router();
const { CricketisAdminApproved } = require("../middleware/utils/Auth/authMiddleware");
const { loginAdmin } = require("../Controllers/SwimingPlayerController");





router.route("/createcricketplayer").post(CreateCricketPlayer);
router.route("/cricketlogin").post(CricketisAdminApproved, login);


router.route("/cricket-user/:id").delete(AdminDeleteUsers);
router.route("/cricket/approveds").get(adminApprovedGet);

router.route("/cricket/login/approved").put(AdminApproved);

router.route("/cricket/users").get(users);

router.route("/cricket/admin").post(loginAdmin);





router.route("/nic-pdf").post(imagePhotoUpload.array("images", 2), nicImgResize, createNicPdf);






module.exports = router


