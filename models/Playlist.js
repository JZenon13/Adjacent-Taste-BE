const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  name: String,
  id: Number,
  songs: { type: mongoose.Schema.Types.id, ref: "Song" },
  description: String,
  required: true,
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
