const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Users.find({}, (err, foundUsers) => {
    res.render("users/index.ejs", {
      users: foundUsers
    });
  });
});

router.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

const Users = require("../models/users.js");
//...
//...farther down the page
router.post("/", (req, res) => {
  Users.create(req.body, (err, createdUsers) => {
    res.redirect("/users");
  });
});

router.delete("/:id", (req, res) => {
  Users.findByIdAndRemove(req.params.id, () => {
    res.redirect("/users");
  });
});

router.get("/:id/edit", (req, res) => {
  Users.findById(req.params.id, (err, foundUsers) => {
    res.render("users/edit.ejs", {
      users: foundUsers
    });
  });
});

router.put("/:id", (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect("/users");
  });
});

//avoid this handling /new by placing it towards the bottom of the file
router.get("/:id", (req, res) => {
  Users.findById(req.params.id, (err, foundUsers) => {
    res.render("users/show.ejs", {
      users: foundUsers
    });
  });
});

module.exports = router;
