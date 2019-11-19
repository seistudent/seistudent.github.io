const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countriesSchema = mongoose.Schema({
  country: String,
  city: String,
  date: String,
  memories: String,
  travellers: [{ type: Schema.Types.ObjectId, ref: "Users" }]
});

const Countries = mongoose.model("Countries", countriesSchema);

module.exports = Countries;

// [{ type: Schema.Types.ObjectId, ref: "Users" }]
