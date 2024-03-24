const asyncHandler = require('express-async-handler')
// const nodemailer = require("nodemailer");
// const randomString = require("randomstring");
const { cricketPlayerModel } = require("../models/CricketPlayerModel");
const { sendToken } = require('../middleware/utils/SentToken');
const CloudUploadImage = require("../utils/Cloudinary");
const fs = require("fs")

// create cricket player here

const CreateCricketPlayer = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, dateofbirth, number, address, organizationcurrentlyaffliated, category, country, gender } = req.body;

        if (!name && !email && !password && !dateofbirth && !number && !address && !organizationcurrentlyaffliated && !category && !country && !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }


        const user = await cricketPlayerModel.findOne({ email });

        if (user) {
            res.status(404).json({ message: 'Email already exits' });
            return;
        }


        const User = new cricketPlayerModel({
            name: name,
            email: email,
            password: password,
            dateofbirth: dateofbirth,
            number: number,
            address: address,
            organizationcurrentlyaffliated: organizationcurrentlyaffliated,
            category: category,
            country: country,
            gender: gender
        });

        if (!User) {
            throw new Error("User not created")
        }

        await User.save()

        res.status(201).send(User)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



// login


const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email && !password) {
            return res.status(400).json({ error: "All fields are required" });
        }


        const user = await cricketPlayerModel.findOne({ email });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Compare entered password with the password in the database
        if (password !== user.password) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }

        sendToken(res, user, 200, "Login Successfully");

        // res.status(200).send("dkljddh")

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



// create nic image or pdf here

const createNicPdf = asyncHandler(async (req, res) => {
    const { email } = req.body
    try {
        const uploader = (path) => CloudUploadImage.cloudinaryUploadImg(path, 'images');


        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        }

        console.log("urls", urls)

        const existingUser = await cricketPlayerModel.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        existingUser.Cnicurls = urls

        await existingUser.save();

        res.status(201).send("Nic or Pdf Updated")
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})




module.exports = { CreateCricketPlayer, login, createNicPdf }