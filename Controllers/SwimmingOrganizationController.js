const asyncHandler = require('express-async-handler')
const { swimmingOrganizationModel } = require("../models/SwimmingOrganization");
const { cricketOrganizationModel } = require("../models/CricketOrganization");

const { sendToken } = require('../middleware/utils/SentToken');




const createOrganizationPlayer = asyncHandler(async (req, res) => {
    try {

        const { name, email, password, number, address, country, type } = req.body;

        if (!name && !email && !password && !number && !address && !type && !country) {
            return res.status(400).json({ error: "All fields are required" });
        }


        const user = await swimmingOrganizationModel.findOne({ email });
        const user2 = await cricketOrganizationModel.findOne({ email });

        if (user !== user2) {
            throw new Error("user with this email already exit as cricket organization or swimming organization")
        }


        if (user) {
            res.status(404).json({ message: 'Email already exits' });
            return;
        }

        const User = new swimmingOrganizationModel({
            name: name,
            email: email,
            password: password,
            number: number,
            address: address,
            type: type,
            country: country,
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


        const user = await swimmingOrganizationModel.findOne({ email });

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




module.exports = { createOrganizationPlayer, login }
