const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Countries.find({}, (err, foundCountries) => {
    if (req.session.currentUser) {
      res.render("countries/index.ejs", {
        countries: foundCountries,
        user: req.session.currentUser
      });
    } else {
      res.redirect("/sessions/new");
    }
  });
});

const Users = require("../models/users.js");

router.get("/new", (req, res) => {
  Users.find({}, (err, foundUsers) => {
    res.render("countries/new.ejs", {
      users: foundUsers,
      user: req.session.currentUser
    });
  });
});

const Countries = require("../models/countries.js");
//...
//...farther down the page
router.post("/", (req, res) => {
  Countries.create(req.body, (err, foundCountries) => {
    res.redirect("/countries");
    // res.send(req.body);
  });
});

router.delete("/:id", (req, res) => {
  Countries.findByIdAndRemove(req.params.id, () => {
    res.redirect("/countries");
  });
});

// router.get("/:id/edit", (req, res) => {
//   Countries.findById(req.params.id, (err, foundCountries) => {
//     res.render("countries/edit.ejs", {
//       countries: foundCountries
//     });
//   });
// });

router.get("/:id/edit", (req, res) => {
  Users.find({}, (err, foundUsers) => {
    Countries.findById(req.params.id, (err, foundCountries) => {
      res.render("countries/edit.ejs", {
        countries: foundCountries,
        users: foundUsers
      });
    });
  });
});

router.put("/:id", (req, res) => {
  Countries.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect("/countries");
  });
});

//avoid this handling /new by placing it towards the bottom of the file
router.get("/:id", (req, res) => {
  Countries.findById(req.params.id)
    .populate("travellers")
    .exec((error, foundCountries) => {
      //dynamically switch out any ids with the objects they reference
      // console.log(foundCountries);
      res.render("countries/show.ejs", {
        countries: foundCountries
      });
      //mongoose.connection.close();
    });
});

module.exports = router;
