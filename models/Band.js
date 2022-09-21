const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bandSchema = new Schema({
  name: String,
  id: Number,
  required: true,
});

const Band = mongoose.model("Band", bandSchema);

module.exports = Band;
