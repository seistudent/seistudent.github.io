const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const Users = require("../models/users.js");

sessions.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

sessions.get("/logout", (req, res) => {
  res.render("sessions/logout.ejs");
});

sessions.post("/", (req, res) => {
  Users.findOne({ name: req.body.name }, (err, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      //   res.send(req.body);
      res.redirect("/");
    } else {
      res.send('<a href="/">wrong password</a>');
    }
  });
});

sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = sessions;
