const express = require("express");
const { CreateSwimingPlayer, login, createNicPdf } = require("../Controllers/SwimingPlayerController");
const { imagePhotoUpload, ImgResize, nicImgResize } = require("../middleware/utils/UploadImage");
const router = express.Router();
// const multer = require('multer');
// const uuid = require("uuidv4")





// const serviceAccount = require('../firebase-config.json'); // Replace with your file path
// const admin = require("firebase-admin");


// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: 'gs://sports-backend-e8196.appspot.com' // Replace with your bucket name
// });











router.route("/createswimmingplayer").post(CreateSwimingPlayer);
router.route("/swimminglogin").post(login);
router.route("/nic-pdf").post(imagePhotoUpload.array("images", 2), nicImgResize, createNicPdf);

// router.route("/pdf").post(upload.single("file"), createPdf)





// Configure Multer for single file upload (adjust storage destination as needed)
// const upload = multer({ dest: 'upload/' }); // Optional temporary storage location

// router.post('/upload-pdf', upload.single('pdfFile'), async (req, res) => {

//     async function downloadPDF(url) {
//         try {
//             const response = await fetch(url);
//             const blob = await response.blob();
//             const link = document.createElement('a');
//             link.href = URL.createObjectURL(blob);
//             link.download = req.file.filename; // Replace with desired filename
//             link.click();
//         } catch (error) {
//             console.error(error);
//             // Handle download error (e.g., display an error message to the user)
//         }
//     }


//     try {
//         const file = req.file;

//         if (!file) {
//             return res.status(400).send('No PDF file uploaded!');
//         }

//         const filename = file.originalname;
//         const bucket = admin.storage().bucket();
//         const fileRef = bucket.file(filename);

//         await fileRef.save(file.path);

//         const publicUrl = await fileRef.getSignedUrl({
//             action: 'read',
//             expires: '03-24-2025' // Set a reasonable expiration time (adjust as needed)
//         });

//         let result = downloadPDF(publicUrl);

//         console.log(result)

//         res.status(200).json({ message: 'PDF uploaded successfully!', url: result });
//     } catch (error) {
//         console.error(error);

//         // Handle potential errors (e.g., file type validation, storage errors)
//         if (error.code === 'ENOENT') { // Handle file not found error
//             return res.status(400).send('Invalid file uploaded. Please upload a PDF.');
//         } else {
//             return res.status(500).send('An error occurred during PDF upload.');
//         }
//     }
// });

// const bucket = admin.storage().bucket(); // Access bucket after initialization


// router.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).send('No image file uploaded!');
//         }

//         const metadata = {
//             metadata: {
//                 // Consider using a more secure method for generating download tokens
//                 // firebaseStorageDownloadTokens: uuid // Replace with a secure token generation mechanism
//             },
//             contentType: req.file.mimetype,
//             cacheControl: 'public, max-age=31536000'
//         };

//         const blob = bucket.file(req.file.originalname);
//         const blobStream = blob.createWriteStream({
//             metadata,
//             gzip: true
//         });

//         blobStream.on('error', (err) => {
//             console.error('Error uploading image:', err);
//             return res.status(500).json({ error: 'Unable to upload image' });
//         });

//         blobStream.on('finish', () => {
//             const imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//             res.status(201).send({ imageUrl });
//         });

//         blobStream.end(req.file.buffer);
//     } catch (error) {
//         console.error('Error during upload:', error);
//         res.status(500).json({ error: 'An error occurred during image upload' });
//     }
// });



module.exports = router


