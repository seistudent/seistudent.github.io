const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  Name: String,
  Password: String
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
