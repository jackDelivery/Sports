const jwt = require("jsonwebtoken");
const { cricketPlayerModel } = require("../../../models/CricketPlayerModel");
const { swimingPlayerModel } = require("../../../models/SwimmingPlayer");
const { cricketOrganizationModel } = require("../../../models/CricketOrganization");
const expressAsyncHandler = require("express-async-handler");



// patient middleware

const CricketauthMiddleware = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            if (token) {
                const decoded = jwt.verify(token, process.env.JWT);

                // find the user by id
                const user = await cricketPlayerModel.findById(decoded?._id);

                // attach the user to the request
                req.user = user;
                console.log(req.user);
                next();
            } else {
                res.status(404).send("There is no token attached to the header");
            }
        } catch (error) {
            res.status(401).send("No authorized token expired, login again");
        }
    } else {
        res.status(400).send("There is no token attached to the header");
    }
});



// swiming middleware
const swimingauthMiddleware = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            if (token) {
                const decoded = jwt.verify(token, process.env.JWT);

                // find the user by id
                const user = await swimingPlayerModel.findById(decoded?._id);

                // attach the user to the request
                req.user = user;
                console.log(req.user);
                next();
            } else {
                res.status(404).send("There is no token attached to the header");
            }
        } catch (error) {
            res.status(401).send("No authorized token expired, login again");
        }
    } else {
        res.status(400).send("There is no token attached to the header");
    }
});




// cricket player Admin Handle Logic


const CricketisAdmin = expressAsyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await cricketPlayerModel.findOne({ email });

    if (adminUser.role !== "admin") {
        throw new Error("You are not admin!");
    } else {
        next();
    }
});


// swimming player Admin Handle Logic

const SwimmingisAdmin = expressAsyncHandler(async (req, res, next) => {
    const { email } = req.body;

    try {
        const adminUser = await swimingPlayerModel.findOne({ email });

        // Check if user is found and has the "admin" role:
        if (!adminUser || adminUser.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized: You are not an admin!" });
        }

        next(); // Proceed if user is a verified admin
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Server Error: Something went wrong!" });
    }
});




// approved cricket player

const CricketisAdminApproved = async (req, res, next) => {
    const { email } = req.body; // Use req.user to get the logged-in user's email
    try {
        const adminUser = await cricketPlayerModel.findOne({ email });

        if (!adminUser) {
            throw new Error("User not found");
        }

        if (adminUser.isApproved !== true) {
            throw new Error("Admin not approved yet");
        }

        next(); // If everything is fine, proceed to the next middleware or route
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};


// cricket organization
const CricketOrganizationisAdminApproved = async (req, res, next) => {
    const { email } = req.body; // Use req.user to get the logged-in user's email
    try {
        const adminUser = await cricketOrganizationModel.findOne({ email });

        if (!adminUser) {
            throw new Error("User not found");
        }

        if (adminUser.isApproved !== true) {
            throw new Error("Admin not approved yet");
        }

        next(); // If everything is fine, proceed to the next middleware or route
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};





// swimming player approved

const SwimmingisAdminApproved = async (req, res, next) => {
    const { email } = req.body; // Use req.user to get the logged-in user's email
    try {
        const adminUser = await swimingPlayerModel.findOne({ email });

        if (!adminUser) {
            throw new Error("User not found");
        }

        if (adminUser.isApproved !== true) {
            throw new Error("Admin not approved yet");
        }

        next(); // If everything is fine, proceed to the next middleware or route
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};


module.exports = { CricketauthMiddleware, swimingauthMiddleware, CricketisAdmin, SwimmingisAdmin, CricketisAdminApproved, SwimmingisAdminApproved, CricketOrganizationisAdminApproved };