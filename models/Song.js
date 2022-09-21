const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: String,
  id: Number,
  band: String,
  artist_id: Array,
  link: String,
  required: true,
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
