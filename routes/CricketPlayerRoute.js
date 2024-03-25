const express = require("express");
const { CreateCricketPlayer, login, createNicPdf, createPdf } = require("../Controllers/CricketPlayerController");
const { imagePhotoUpload, ImgResize, nicImgResize } = require("../middleware/utils/UploadImage");
const router = express.Router();
// const multer = require('multer');






router.route("/createcricketplayer").post(CreateCricketPlayer);
router.route("/cricketlogin").post(login);
router.route("/nic-pdf").post(imagePhotoUpload.array("images", 2), nicImgResize, createNicPdf);






module.exports = router


