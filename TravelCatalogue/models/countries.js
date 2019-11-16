const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countriesSchema = mongoose.Schema({
  Country: String,
  City: String,
  Date: Number
  // user: { type: Schema.Types.ObjectId, ref: "user" }
});

const Countries = mongoose.model("Countries", countriesSchema);

module.exports = Countries;
