const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");

///////////////////////////////////////////////////
const ATLAS_URI = process.env.ATLAS_URI;
const PROJECT_NAME = process.env.PROJECT_NAME;
//////////////////////////////////////////////////

MongoClient.connect(ATLAS_URI, {
  useUnifiedTopology: true,
}).then((client, result) => {
  const db = client.db(PROJECT_NAME);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.listen(5000, function () {
    console.log("listening on 5000");
  });

  app.post("/songs", async (req, res) => {
    try {
      const newItem = { id: uuidv4(), ...req.body };
      await db.collection("songs").insertOne(newItem);
      return res.json({ success: true, data: newItem });
    } catch (error) {
      throw error;
    }
  });

  app.get("/songs", async (req, res) => {
    try {
      const songBank = await db.collection("songs").find().toArray();
      return res.json(songBank);
    } catch (error) {
      throw error;
    }
  });
  app.put("/songs/:id", async (req, res) => {
    try {
      await db.collection("songs").findOneAndUpdate(
        { id: req.body.id },
        {
          $set: {
            band: req.body.band,
            songs: req.body.songs,
            artist_id: req.body.artist_id,
            link: req.body.link,
            id: req.body.id,
          },
        },
        {
          upsert: true,
        }
      );

      return res.json("Success");
    } catch (error) {
      throw error;
    }
  });
  app.delete(`/songs/:id`, async (req, res) => {
    try {
      await db.collection("songs").deleteOne({ id: req.params.id });
      return res.json("Deleted Song");
    } catch (error) {
      throw error;
    }
  });

  app.get("/song/:id", async (req, res) => {
    try {
      const song = await db.collection("songs").findOne({ id: req.params.id });

      return res.json(song);
    } catch (error) {
      throw error;
    }
  });
  ///////////////////////////////////////////////////////
  app.post("/band", async (req, res) => {
    try {
      const newItem = { id: uuidv4(), ...req.body };
      await db.collection("band").insertOne(newItem);
      return res.json({ success: true, data: newItem });
    } catch (error) {
      throw error;
    }
  });

  app.get("/", async (req, res) => {
    try {
      const bandBank = await db.collection("band").find().toArray();
      return res.json(bandBank);
    } catch (error) {
      throw error;
    }
  });
  app.put("/band/:id", async (req, res) => {
    try {
      await db.collection("band").findOneAndUpdate(
        { id: req.body.id },

        {
          $set: {
            name: req.body.name,
            id: req.body.id,
          },
        },
        {
          upsert: true,
        }
      );
      return res.json("Success");
    } catch (error) {
      throw error;
    }
  });
  app.delete(`/band/:id`, async (req, res) => {
    try {
      await db.collection("band").deleteOne({ id: req.params.id });
      return res.json("Deleted band");
    } catch (error) {
      throw error;
    }
  });

  app.get("/band/:id", async (req, res) => {
    try {
      const band = await db.collection("band").findOne({ id: req.params.id });

      return res.json(band);
    } catch (error) {
      throw error;
    }
  });
  app.post("/band", async (req, res) => {
    try {
      const newItem = { id: uuidv4(), ...req.body };
      await db.collection("band").insertOne(newItem);
      return res.json({ success: true, data: newItem });
    } catch (error) {
      throw error;
    }
  });
  //////////////////////////////////////////////////////////////
  app.post("/playlist", async (req, res) => {
    try {
      const newItem = { id: uuidv4(), ...req.body };
      await db.collection("playlists").insertOne(newItem);
      return res.json({ success: true, data: newItem });
    } catch (error) {
      throw error;
    }
  });

  app.get("/playlist", async (req, res) => {
    try {
      const playlistBank = await db.collection("playlists").find().toArray();
      return res.json(playlistBank);
    } catch (error) {
      throw error;
    }
  });
  app.get("/playlist/:song_id", async (req, res) => {
    const { song_id } = req.params;
    try {
      const allInstances = await db
        .collection("playlists")
        .find({ "songs.id": song_id })
        .toArray();

      return res.json(allInstances);
    } catch (error) {
      throw error;
    }
  });
  app.get("/playlists/:artist_ID", async (req, res) => {
    const { artist_ID } = req.params;
    try {
      const allInstances = await db
        .collection("playlists")
        .find({ "songs.artist_id": artist_ID })
        .toArray();

      return res.json(allInstances);
    } catch (error) {
      throw error;
    }
  });
  app.get("/playlistss/:id", async (req, res) => {
    try {
      const onePlaylist = await db
        .collection("playlists")
        .findOne({ id: req.params.id });

      return res.json(onePlaylist);
    } catch (error) {
      throw error;
    }
  });

  app.put("/playlist/:id", async (req, res) => {
    try {
      await db.collection("playlists").findOneAndUpdate(
        { id: req.body.id },

        {
          $set: {
            name: req.body.name,
            songs: req.body.songs,
            description: req.body.description,
            id: req.body.id,
          },
        },
        {
          upsert: true,
        }
      );
      return res.json("Success");
    } catch (error) {
      throw error;
    }
  });
  app.delete(`/playlist/:id`, async (req, res) => {
    try {
      await db.collection("playlists").deleteOne({ id: req.params.id });
      return res.json("Deleted playlist");
    } catch (error) {
      throw error;
    }
  });
  app.delete(`/playlist/:id/:song_id`, async (req, res) => {
    const { id, song_id } = req.params;
    try {
      await db
        .collection("playlists")
        .updateOne({ id }, { $pull: { songs: { id: song_id } } });
      return res.json("Updated playlist");
    } catch (error) {
      throw error;
    }
  });
});
