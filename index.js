require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;



cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.API_key,
    api_secret: process.env.API_secret,
})


// 
const createcricketPlayer = require("./routes/CricketPlayerRoute");
const createswimmingPlayer = require("./routes/SwimingRoute");
const cricketorganization = require("./routes/CricketOrganizationRoute");
const swimingorganization = require("./routes/SwimingOrganizationRoute");

// middleware calling here
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use("*", cors());





app.use(createcricketPlayer)
app.use(createswimmingPlayer)
app.use(cricketorganization)
app.use(swimingorganization)


app.get("/", (req, res) => {
    res.status(200).send("Sports Backend Working")
})

// server start here

app.use("*", (req, res, next) => {
    res.status(400).send("Page Not Found!");
    next()
})


// database connect

const mongoURI = process.env.MONGODB;

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Database Connected");
    })
    .catch(error => {
        console.error("Error connecting to the database:", error.message);
    });

// server running

app.listen(process.env.PORT, () => {
    console.log(`Your Server is Running on this! ${PORT}`);
});