const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Ek regular expression to validate email addresses
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



const SwimingPlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true, // Yeh to make sure ke email unique hai
        lowercase: true, // Yeh to make sure ke email case-insensitive hai
        validate: {
            validator: function (v) {
                return emailRegex.test(v); // Email address ko validate karne ke liye regular expression use kiya gaya hai
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        trim: true,
    },
    dateofbirth: {
        type: String,
    },
    number: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true
    },
    organizationcurrentlyaffliated: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    Cnicurls: [],
    nicNumber: {
        type: String,
        trim: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "user"
    },
    pdf: String

})



SwimingPlayerSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT, {
        expiresIn: "24h", // expires in 24 hours
    });
};



const swimingPlayerModel = mongoose.model("SWIMINGPLAYER", SwimingPlayerSchema);

module.exports = { swimingPlayerModel }