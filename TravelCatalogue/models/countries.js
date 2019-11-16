const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countriesSchema = mongoose.Schema({
  Country: String,
  City: String,
  Date: String,
  Memories: String,
  Travellers: [{ type: Schema.Types.ObjectId, ref: "Users" }]
});

const Countries = mongoose.model("Countries", countriesSchema);

module.exports = Countries;

// [{ type: Schema.Types.ObjectId, ref: "Users" }]
