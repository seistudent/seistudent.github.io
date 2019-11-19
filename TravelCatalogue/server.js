// Dependencies
const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// Configuration
const PORT = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

// Database
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
// mongoose.connect("mongodb://localhost:27017/TravelCatalogue");

////////////////
// Middleware
////////////////

// allows us to use put and delete methods
app.use(methodOverride("_method"));
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.static(__dirname + "/"));

const usersController = require("./controllers/users.js");
const sessionsController = require("./controllers/sessions.js");
const countriesController = require("./controllers/countries.js");

// Use contollers
app.use("/users", usersController);
app.use("/sessions", sessionsController);
app.use("/countries", countriesController);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Listen
app.listen(PORT, () => console.log("auth happening on port", PORT));
