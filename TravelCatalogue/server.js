const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");

//...farther down the page
mongoose.connect("mongodb://localhost:27017/blog");

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

const usersController = require("./controllers/users.js");
const countriesController = require("./controllers/countries.js");

//middleware
// allows us to use put and delete methods
app.use(methodOverride("_method"));
//body parser
app.use(express.urlencoded({ extended: false }));

// Use contollers
app.use("/users", usersController);
app.use("/countries", countriesController);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("listening....");
});
