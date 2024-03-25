const asyncHandler = require('express-async-handler')
// const nodemailer = require("nodemailer");
// const randomString = require("randomstring");
const { cricketPlayerModel } = require("../models/CricketPlayerModel");
const { swimingPlayerModel } = require("../models/SwimmingPlayer");

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
        const user2 = await swimingPlayerModel.findOne({ email });

        if (user !== user2) {
            throw new Error("user with this email already exit as swimming player or cricket player")
        }




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
    const { email, pdf } = req.body
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
        existingUser.pdf = pdf

        await existingUser.save();

        res.status(201).send("Nic or Pdf Updated")
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})





// admin approved

const AdminApproved = asyncHandler(async (req, res) => {

    const { isApproved, _id } = req.body;

    try {

        const approved = await cricketPlayerModel.findByIdAndUpdate(_id, {
            isApproved: isApproved
        }, { new: true })

        if (!approved) {
            throw new Error("User Not Found")
        }


        res.status(200).json({ message: "Admin Approved Your Account", approved: approved });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


const adminApprovedGet = asyncHandler(async (req, res) => {
    try {

        let result = await cricketPlayerModel.find({});

        if (!result) {
            throw new Error("user not found!")
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


// delete activate users

const AdminDeleteUsers = asyncHandler(async (req, res) => {
    const { id } = req.params; // Assuming id is passed as a parameter

    try {
        const deletedUser = await cricketPlayerModel.findByIdAndDelete(id); // Using id parameter to find and delete user

        if (!deletedUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // Send response if user is successfully deleted
        res.status(200).json({ message: "Admin has deleted the user account" });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





// users

const users = asyncHandler(async (req, res) => {
    try {

        const users = await cricketPlayerModel.find({});


        if (!users) {
            throw new Error("user not found");
        }

        res.status(200).send(users)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if user with given email exists
    const findAdmin = await cricketPlayerModel.findOne({ email });

    // If no user found, or user is not admin, throw an error
    if (!findAdmin) {
        throw new Error("User not found");
    } else if (findAdmin.role !== "admin") {
        throw new Error("You are not Admin");
    }

    // If user is admin, compare passwords
    if (password === findAdmin.password) {
        // Passwords match, send token and success response
        sendToken(res, findAdmin, 200, "Login Successfully");
        res.status(200).send(findAdmin);
    } else {
        // Passwords don't match, throw an error
        throw new Error("Invalid Credentials");
    }
});







module.exports = { CreateCricketPlayer, login, createNicPdf, users, AdminApproved, AdminDeleteUsers, adminApprovedGet }